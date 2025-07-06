// src/components/PreviewPanel/index.tsx
import React from 'react';
import { Card, Descriptions, Divider, Typography } from 'antd';
import { formatDuration, renderJsonSafely } from '../../utils/helpers'; // 导入辅助函数
import styles from './styles.module.css';

const { Text, Title } = Typography; // 导入 Title

interface PreviewPanelProps {
  selectedItem: any; // 选中项的数据
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ selectedItem }) => {
  
  // 将 Descriptions 项转换为数组格式
  const getDescriptionItems = () => {
    if (!selectedItem) return [];
    
    const items = [
      {
        key: 'type',
        label: '类型',
        children: <Text strong>{selectedItem.type}</Text>,
      },
    ];


    // 片段 (Segment) 特有详情
    if (selectedItem.type === 'segment' && selectedItem.target_timerange) {
      items.push(
        {
          key: 'start_time',
          label: '开始时间',
          children: formatDuration(selectedItem.target_timerange.start),
        },
        {
          key: 'end_time',
          label: '结束时间',
          children: formatDuration(selectedItem.target_timerange.start + selectedItem.target_timerange.duration),
        },
        {
          key: 'duration',
          label: '持续时间',
          children: formatDuration(selectedItem.target_timerange.duration),
        }
      );
    }

    // 文本素材详情
    if (selectedItem.type === 'text') {
      const content:string = selectedItem.remote_url;
      items.push(
        {
          key: 'text_content',
          label: '文本内容',
          children: content,
        },
        {
          key: 'text_start_time',
          label: '开始时间',
          children: formatDuration(selectedItem.start * 1_000_000),
        },
        {
          key: 'text_end_time',
          label: '结束时间',
          children: formatDuration(selectedItem.end * 1_000_000),
        },
        {
          key: 'text_duration',
          label: '持续时长',
          children: formatDuration(selectedItem.duration),
        }
      );
    }

    // 图片素材详情
    if (selectedItem.type === 'photo') {
      const content:string = selectedItem.remote_url;
      items.push(
        {
          key: 'image_url',
          label: '图片链接',
          children: selectedItem.remote_url ? (
            <a href={selectedItem.remote_url} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {selectedItem.remote_url}
            </a>
          ) : 'N/A',
        },
        {
          key: 'image_start_time',
          label: '开始时间',
          children: formatDuration(selectedItem.start * 1_000_000),
        },
        {
          key: 'image_end_time',
          label: '结束时间',
          children: formatDuration(selectedItem.end * 1_000_000),
        },
        {
          key: 'image_duration',
          label: '持续时长',
          children: formatDuration(selectedItem.duration),
        }
      );
    }

    // 音频素材详情
    if (selectedItem.type === 'audio') {
      items.push(
        {
          key: 'audio_url',
          label: '音频播放链接',
          children: selectedItem.remote_url ? (
            <a href={selectedItem.remote_url} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {selectedItem.remote_url}
            </a>
          ) : 'N/A',
        },
        {
          key: 'audio_start_time',
          label: '开始时间',
          children: formatDuration(selectedItem.start * 1_000_000),
        },
        {
          key: 'audio_end_time',
          label: '结束时间',
          children: formatDuration(selectedItem.end * 1_000_000),
        },
        {
          key: 'audio_duration',
          label: '播放时长',
          children: formatDuration(selectedItem.duration),
        }
      );
    }

    // 视频素材详情
    if (selectedItem.type === 'video') {
      items.push(
        {
          key: 'video_url',
          label: '视频播放链接',
          children: selectedItem.remote_url ? (
            <a href={selectedItem.remote_url} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {selectedItem.remote_url}
            </a>
          ) : 'N/A',
        },
        {
          key: 'video_start_time',
          label: '开始时间',
          children: formatDuration(selectedItem.start * 1_000_000),
        },
        {
          key: 'video_end_time',
          label: '结束时间',
          children: formatDuration(selectedItem.end * 1_000_000),
        },
        {
          key: 'video_duration',
          label: '播放时长',
          children: formatDuration(selectedItem.duration),
        }
      );
    }

    // 特效素材详情
    if (selectedItem.type === 'effect') {
      const content:string = selectedItem.remote_url;
      items.push(
        {
          key: 'effect_name',
          label: '特效名称',
          children: content
        },
        {
          key: 'effect_start_time',
          label: '开始时间',
          children: formatDuration(selectedItem.start * 1_000_000),
        },
        {
          key: 'effect_end_time',
          label: '结束时间',
          children: formatDuration(selectedItem.end * 1_000_000),
        },
        {
          key: 'effect_duration',
          label: '持续时长',
          children: formatDuration(selectedItem.duration),
        }
      );
    }


    // 特效素材详情
    if (selectedItem.type === 'material_animation' && 
        selectedItem.resolvedMaterial.animations && 
        selectedItem.resolvedMaterial.animations.length > 0) {
      items.push(
        {
          key: 'effect_name',
          label: '特效名称',
          children: selectedItem.resolvedMaterial.animations[0].name || 'N/A',
        },
        {
          key: 'effect_start',
          label: '开始时间 (特效内部)',
          children: formatDuration(selectedItem.resolvedMaterial.animations[0].start),
        },
        {
          key: 'effect_duration',
          label: '持续时间 (特效内部)',
          children: formatDuration(selectedItem.resolvedMaterial.animations[0].duration),
        }
      );
    }

    // 关键帧 (Keyframe) 特有详情
    if (selectedItem.type === 'keyframe') {
      items.push(
        {
          key: 'time_offset',
          label: '相对时间',
          children: formatDuration(selectedItem.keyframe.time_stamp),
        },
        {
          key: 'property_type',
          label: '关键帧类型',
          children: selectedItem.keyframe.property_type || 'N/A',
        },
        {
          key: 'values',
          label: '值',
          children: selectedItem.keyframe.property_value || 'N/A',
        }
      );
    }

    return items;
  };

  return (
    <Card
      title={<Title level={4} className={styles.panelTitle}>详细信息</Title>}
      className={styles.previewCard}
      bodyStyle={{ padding: '12px', width: '100%', height: '100%', overflowY: 'auto' }}
    >
      {selectedItem ? (
        <>
          <Descriptions 
            title="" 
            items={getDescriptionItems()} 
            column={1} 
            size="small" 
            layout="horizontal" 
            className={styles.descriptions}
          />
        </>
      ) : (
        <Text type="secondary" className={styles.secondaryText}>点击下方轨道上的素材或关键帧，在此查看其详细信息。</Text>
      )}
    </Card>
  );
};

export default PreviewPanel;