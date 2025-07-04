import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Divider, Typography, Tooltip } from 'antd';
import {
  VideoCameraOutlined,
  SoundOutlined,
  FontSizeOutlined,
  StarOutlined,
  RightOutlined
} from '@ant-design/icons';

// 确保导入 Timeline 的类型定义，这里直接导入 Timeline 组件本身
import { Timeline, TimelineRow, TimelineEffect, TimelineAction, TimelineEditor, TimelineState } from '@xzdarcy/react-timeline-editor';

import { formatDuration } from '../../utils/helpers';
import { trackTypeIcons as trackTypeIconNames } from '../../utils/helpers';
import styles from './styles.module.css'; // Your existing CSS module
import { ScriptStatus } from '../../interface/script';

import { CustomRender } from './custom';
const { Text } = Typography;

// Map icon names to actual Ant Design icon components
const iconComponents: { [key: string]: JSX.Element } = {
  VideoCameraOutlined: <VideoCameraOutlined />,
  SoundOutlined: <SoundOutlined />,
  FontSizeOutlined: <FontSizeOutlined />,
  StarOutlined: <StarOutlined />,
  RightOutlined: <RightOutlined />
};

interface TimelineProps {
  scriptStatus: ScriptStatus;
  handleItemClick: (item: any, type: string, extraData?: any) => void;
}

const TimelinePanel: React.FC<TimelineProps> = ({
  scriptStatus,
  handleItemClick,
}) => {
  // 添加内部状态来管理选中项
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const timelineData = useMemo(() => {
    if (!scriptStatus || !scriptStatus.tracks) {
      return [];
    }

    const tracksData: TimelineRow[] = scriptStatus.tracks.map(track => {
      const actions: TimelineAction[] = track.segments
        .map(segment => {
          // 确保 segment 有 target_timerange
          if (!segment.target_timerange) {
            return null;
          }

          // 在 materials 中找到对应的素材
          const materialList = scriptStatus.materials[`${track.type}s`]; // e.g., materials.videos, materials.audios
          if (!materialList) {
            return null;
          }

          const material = materialList.find(m => m.id === segment.material_id);
          if (!material) {
            return null;
          }

          let materialName = material.name || material.material_name || '未知素材';
          let remoteUrl = material.remote_url || '';

          // 特殊处理文本类型，从 content JSON 中获取文本
          if (track.type === 'text' && material.content) {
            try {
              const contentData = JSON.parse(material.content);
              materialName = contentData.text || materialName;
              remoteUrl = contentData.text || materialName; // 文本类型没有远程 URL，用其内容代替
            } catch (e) {
              console.error("解析文本素材 content 失败:", e);
            }
          }


          const start = segment.target_timerange.start / 1000000; // 微秒转秒
          const duration = segment.target_timerange.duration / 1000000;
          const end = start + duration;
          
          // 核心：根据 selectedItem.id 判断是否应该选中
          const isSelected = selectedItem && selectedItem.id === segment.id;

          // 提取关键帧信息
          const segmentKeyframes: ActionKeyframe[] = [];
          // debugger;
          if (segment.common_keyframes && segment.common_keyframes.length > 0) {
            // 创建property_type到keyframes键的映射
            const propertyTypeToKeyMap: Record<string, string> = {
              'KFTypePositionX': 'positionX', // 位置X映射到positionX
              'KFTypePositionY': 'positionY', // 位置Y映射到positionY
              'KFTypeRotation': 'rotation', // 旋转映射到rotation
              'KFTypeScaleX': 'scaleX', // 缩放X映射到scaleX
              'KFTypeScaleY': 'scaleY', // 缩放Y映射到scaleY
              'UNIFORM_SCALE': 'scale', // 统一缩放映射到scale
              'KFTypeAlpha': 'alpha', // 不透明度映射到alpha
              'KFTypeSaturation': 'saturation', // 饱和度映射saturation
              'KFTypeContrast': 'contrast', // 对比度映射到contrast
              'KFTypeBrightness': 'brightness', // 亮度映射到brightness
              'KFTypeVolume': 'volume', // 音量映射到volum
            };
            
            segment.common_keyframes.forEach(commonKfRef => {
              // 使用映射表获取正确的keyframes键
              const keyframesKey = propertyTypeToKeyMap[commonKfRef.property_type];
              
              commonKfRef.keyframe_list.forEach(kfItem => {
                segmentKeyframes.push({
                  time_stamp: kfItem.time_offset, // time_offset 已经是微秒
                  property_type: keyframesKey,
                  property_value: kfItem.values[0] !== undefined ? kfItem.values[0] : '未知值', // 假设 values 数组只有一个值
                });
              });
            });
          }

          return {
            id: segment.id,
            start: start,
            end: end,
            effectId: material.type, // 将track.type改为material.type
            flexible: false,
            duration: segment.target_timerange.duration,
            remote_url: remoteUrl,
            meterial_name: materialName,
            // 直接设置内置的 selected 属性
            selected: isSelected,
            keyframes: segmentKeyframes, // 添加关键帧信息
          };
        })
        .filter((action): action is TimelineAction => action !== null);

      return {
        id: track.id,
        actions,
        rowHeight: track.type === 'video' || track.type === 'image' ? 70 : 50, // 可以根据类型设置不同行高
      };
    }).filter(row => row.actions.length > 0); // 过滤掉没有有效 actions 的行

    return tracksData;
  }, [scriptStatus, selectedItem]);


  const mockEffect: Record<string, TimelineEffect> = {
    effect0: {
      id: "effect0",
      name: "效果0",
    },
    effect1: {
      id: "effect1",
      name: "效果1",
    },
  };

  const mockData: TimelineRow[] = [
    {
      id: "0",
      actions: [
        {
          id: "action00",
          start: 0,
          end: 20,
          effectId: "audio",
          flexible: false,
          duration: 5000000,
          remote_url: "https://example.com/audio.mp3",
          meterial_name: "audio.mp3",
          keyframes:[
            {
              time_stamp: 10*1_000_000,
              property_type: 'volume',
              property_value: '0.5'
            }
          ]
        },
        {
          id: "action02",
          start: 20,
          end: 25,
          effectId: "audio",
          flexible: false,
          duration: 5000000,
          remote_url: "https://example.com/audio3.mp3",
          meterial_name: "audio.mp3",
        },
      ],
      rowHeight: 50,
    },
    {
      id: "1",
      actions: [
        {
          id: "action01",
          start: 5,
          end: 15,
          effectId: "audio",
          flexible: false,
          selected: true,
          duration: 10000000,
          remote_url: "https://example.com/audio2.mp3",
          meterial_name: "audio2.mp3",
        },
        {
          id: "action02",
          start: 21,
          end: 26,
          effectId: "audio",
          flexible: false,
          duration: 5000000,
          remote_url: "https://example.com/audio3.mp3",
          meterial_name: "audio.mp3",
        },
      ],
      rowHeight: 50,
    }, {
      id: "2",
      actions: [
        {
          id: "action00",
          start: 0,
          end: 20,
          effectId: "image",
          flexible: false,
          duration: 2000000,
          remote_url: "https://example.com/image.png",
          meterial_name: "image.png",
        },
        {
          id: "action00",
          start: 31,
          end: 38,
          effectId: "image",
          flexible: false,
          duration: 2000000,
          remote_url: "https://example.com/image.png",
          meterial_name: "image.png",
        },
      ],
      rowHeight: 70,
    },
    {
      id: "3",
      actions: [
        {
          id: "action01",
          start: 0,
          end: 20,
          effectId: "image",
          flexible: false,
          selected: true,
          duration: 20000000,
          remote_url: "https://example.com/image2.jpg",
          meterial_name: "image2.jpg",
        },
        {
          id: "action01",
          start: 40,
          end: 60,
          effectId: "image",
          flexible: false,
          selected: true,
          duration: 20000000,
          remote_url: "https://example.com/image2.jpg",
          meterial_name: "image2.jpg",
        },
      ],
      rowHeight: 70,
    }, {
      id: "4",
      actions: [
        {
          id: "action00",
          start: 0,
          end: 20,
          effectId: "video",
          flexible: false,
          duration: 2000000,
          remote_url: "https://example.com/video.mp4",
          meterial_name: "video.mp4",
        },
      ],
      rowHeight: 70,
    },
    {
      id: "5",
      actions: [
        {
          id: "action01",
          start: 0,
          end: 20,
          effectId: "video",
          flexible: false,
          selected: true,
          duration: 20000000,
          remote_url: "https://example.com/video2.ts",
          meterial_name: "video2.ts",
        },
      ],
      rowHeight: 70,
    }, {
      id: "6",
      actions: [
        {
          id: "action00",
          start: 0,
          end: 20,
          effectId: "text",
          flexible: false,
          duration: 2000000,
          remote_url: "你好，这是测试字幕",
          meterial_name: "你好，这是测试字幕",
        },
      ],
      rowHeight: 50,
    },
    {
      id: "7",
      actions: [
        {
          id: "action01",
          start: 0,
          end: 20,
          effectId: "text",
          flexible: false,
          selected: true,
          duration: 20000000,
          remote_url: "你好，这是测试字幕2",
          meterial_name: "你好，这是测试字幕2",
        },
      ],
      rowHeight: 50,
    }, {
      id: "8",
      actions: [
        {
          id: "action00",
          start: 0,
          end: 20,
          effectId: "stiker",
          flexible: false,
          duration: 2000000,
          remote_url: "测试贴纸1",
          meterial_name: "测试贴纸1",
        },
      ],
      rowHeight: 50,
    },
    {
      id: "9",
      actions: [
        {
          id: "action01",
          start: 0,
          end: 20,
          effectId: "stiker",
          flexible: false,
          selected: true,
          duration: 20000000,
          remote_url: "测试贴纸2",
          meterial_name: "测试贴纸2",
        },
      ],
      rowHeight: 50,
    }, {
      id: "10",
      actions: [
        {
          id: "action00",
          start: 0,
          end: 20,
          effectId: "effect",
          flexible: false,
          duration: 2000000,
          remote_url: "测试特效1",
          meterial_name: "测试特效1",
        },
      ],
      rowHeight: 50,
    },
    {
      id: "11",
      actions: [
        {
          id: "action01",
          start: 0,
          end: 20,
          effectId: "effect",
          flexible: false,
          selected: true,
          duration: 20000000,
          remote_url: "测试特效2",
          meterial_name: "测试特效2",
        },
      ],
      rowHeight: 50,
    }
  ];

  const CustomScale = (props: { scale: number }) => {
    const { scale } = props;
    const min = parseInt(scale / 60 + '');
    const second = (scale % 60 + '').padStart(2, '0');

    return (
      <span style={{ color: 'white' }}> {/* 添加一个 span 元素并应用白色字体颜色 */}
        {`${min}:${second}`}
      </span>
    );
  }

  return (
    <div className={styles.timelineContainer}>
      {timelineData.length > 0 ? (
        <Timeline
          editorData={timelineData}
          disableDrag={true}
          scale={5}
          hideCursor={true}
          getScaleRender={(scale) => <CustomScale scale={scale} />}
          getActionRender={(action, row) => {
            // @ts-ignore
            return <CustomRender 
              action={action} 
              row={row} 
              onKeyframeClick={(action, keyframe, index) => {
                console.log('Keyframe clicked:', keyframe);
                // 创建包含关键帧信息的选中项对象
                const keyframeData = {
                  id: action.id,
                  keyframe: keyframe,
                  keyframeIndex: index,
                  type: 'keyframe'
                };
                
                // 更新内部状态
                setSelectedItem(keyframeData);
                
                // 调用父组件的handleItemClick，传递关键帧数据
                handleItemClick(keyframeData, 'keyframe', {
                  action: action,
                  keyframe: keyframe,
                  index: index
                });
              }}
            />
          }}
          onClickAction={(e, param) => {
            // 从param中获取被点击的action信息
            const clickedAction = param.action;
            
            // 创建选中项对象
            const newSelectedItem = {
              id: clickedAction.id
            };
            
            // 更新内部状态
            setSelectedItem(newSelectedItem);
            
            // 调用父组件的handleItemClick，保持向上通知
            handleItemClick(newSelectedItem, clickedAction.effectId, clickedAction);
          }}
        />
      ) : (
        <Text type="secondary" className={styles.secondaryText}>无轨道信息可展示。</Text>
      )}
    </div>
  );
};

export default TimelinePanel;