import React, { FC } from 'react';
import { TimelineAction, TimelineRow, Keyframe } from '@xzdarcy/react-timeline-editor';

import WaveformPNG from '/img/sound_wave.png';
import VideoHolderPNG from '/img/video_holder.png'; // 假设有视频占位图
import ImagePNG from '/img/image_holder.png';
import TextPNG from '/img/text.png';
import stikerPNG from '/img/sticker.png';
import effectPNG from '/img/effect.png';


import styles from './styles.module.css';
import { formatDurationHHMMSS } from '../../utils/helpers'; // <--- 引入 formatDuration

// 渲染关键帧
const renderKeyframes = (
    action: TimelineAction, 
    onKeyframeClick?: (action: TimelineAction, keyframe: Keyframe, index: number) => void
) => {

    if (!action.keyframes || action.keyframes.length === 0) return null;
    return action.keyframes.map((keyframe: Keyframe, index: number) => {
        // 计算关键帧相对于start的位置（百分比）
        const actionDuration = (action.end - action.start) * 1_000_000;
        const position = (keyframe.time_stamp / actionDuration) * 100;

        return (
            <div
                key={`keyframe-${index}`}
                className={styles.keyframe}
                style={{
                    left: `${position}%`,
                    backgroundColor: 'white',
                    transform: 'rotate(45deg)', // 旋转45度形成菱形
                    top: 'calc(50% - 5px)', // 上下居中（考虑到keyframe高度为10px）
                    zIndex: 10,
                }}
                title={`${keyframe.property_type}: ${keyframe.property_value}`}
                onClick={(e) => {
                    // 阻止事件冒泡，防止触发父元素的点击事件
                    e.stopPropagation();
                    // 如果提供了回调函数，则调用它
                    if (onKeyframeClick) {
                        onKeyframeClick(action, keyframe, index);
                    }
                }}
            />
        );
    });
};

// 定义一个映射，根据 renderType 返回不同的子组件或配置 
const RenderTypeMap: Record<string, FC<{ 
  action: TimelineAction;
  onKeyframeClick
}>> = { 
    // 音频类型渲染器
    'audio': ({ action, onKeyframeClick }) => {
        // 音频渲染器负责渲染自己的最外层 div，并根据 selected 状态应用背景色
        const audioRootClassNames = `${styles.customRenderAudioWaveform} ${action.selected ? styles.customRenderAudioWaveformSelected : styles.customRenderAudioWaveformUnselected}`;
    
        return (
            <div className={audioRootClassNames}>
                <div className={styles.labelsContainer}>
                    <div className={styles.customRenderAudioLabel}>
                        {action.remote_url}
                    </div>
                    <div className={styles.customRenderAudioLabel}>
                        {formatDurationHHMMSS(action.duration)}
                    </div>
                </div>
                <div
                    className={styles.audioWaveformBackground}
                    style={{ backgroundImage: `url(${WaveformPNG})` }}
                >
                    {renderKeyframes(action, onKeyframeClick)}
                </div>
            </div>
        );
    },
    // 图片类型渲染器 (修改这里，使其背景色独立响应 selected 状态)
    'photo': ({ action, onKeyframeClick }) => {
        // *** 关键修改：图片类型使用自己的选中/未选中背景类 ***
        const imageRootClassNames = `${styles.customRenderAudioWaveform} ${action.selected ? styles.customRenderImageformSelected : styles.customRenderImageformUnselected}`;

        return (
            <div className={imageRootClassNames}>
                <div className={styles.labelsContainer}>
                    {/* 图片标签 */}
                    <img
                        src={ImagePNG}
                        alt="Image"
                        style={{
                            height: '32px', // 图标高度为容器的80%
                            width: 'auto',
                            margin: '8px',
                            marginLeft: '16px'
                        }}
                    />
                    {/* 图片标签 1：左上角 */}
                    <div className={styles.customRenderAudioLabel}>
                        {action.remote_url}
                    </div>
                    {/* 图片标签 2：右上角 */}
                    <div className={styles.customRenderAudioLabel}>
                        {formatDurationHHMMSS(action.duration)}
                    </div>
                </div>
                <div
                    className={styles.imageContentFlex}
                >
                    {renderKeyframes(action, onKeyframeClick)}
                </div>
            </div>
        );
    },
    'video': ({ action, onKeyframeClick }) => {
        const videoRootClassNames = `${styles.customRenderAudioWaveform} ${action.selected ? styles.customRenderVideoformSelected : styles.customRenderVideoformUnselected}`;

        return (
            <div className={videoRootClassNames}>
                <div className={styles.labelsContainer}>
                    {/* 视频标签 */}
                    <img
                        src={VideoHolderPNG}
                        alt="Video"
                        style={{
                            height: '32px', // 图标高度为容器的80%
                            width: 'auto',
                            margin: '10px',
                            marginLeft: '16px'
                        }}
                    />
                    {/* 图片标签 1：左上角 */}
                    <div className={styles.customRenderAudioLabel}>
                        {action.remote_url}
                    </div>
                    {/* 图片标签 2：右上角 */}
                    <div className={styles.customRenderAudioLabel}>
                        {formatDurationHHMMSS(action.duration)}
                    </div>
                </div>
                <div
                    className={styles.imageContentFlex}
                >
                    {renderKeyframes(action, onKeyframeClick)}
                </div>
            </div>
        );
    },
    'text': ({ action, onKeyframeClick }) => {
        const videoRootClassNames = `${styles.customRenderAudioWaveform} ${action.selected ? styles.customRenderTextformSelected : styles.customRenderTextformUnselected}`;

        return (
            <div className={videoRootClassNames}>
                <div className={styles.labelsContainer}>
                    {/* 文本标签 */}
                    <img
                        src={TextPNG}
                        alt="Text"
                        style={{
                            height: '26px', // 图标高度为容器的80%
                            width: 'auto',
                            margin: '4px',
                            marginLeft: '16px'
                        }}
                    />
                    {/* 图片标签 1：左上角 */}
                    <div className={styles.customRenderAudioLabel}>
                        {action.meterial_name}
                    </div>
                    {/* 图片标签 2：右上角 */}
                    <div className={styles.customRenderAudioLabel}>
                        {formatDurationHHMMSS(action.duration)}
                    </div>
                </div>
                <div
                    className={styles.imageContentFlex}
                >
                    {renderKeyframes(action, onKeyframeClick)}
                </div>
            </div>
        );
    },
    'stiker': ({ action, onKeyframeClick }) => {
        const videoRootClassNames = `${styles.customRenderAudioWaveform} ${action.selected ? styles.customRenderStikerformSelected : styles.customRenderStikerformUnselected}`;

        return (
            <div className={videoRootClassNames}>
                <div className={styles.labelsContainer}>
                    {/* 贴纸标签 */}
                    <img
                        src={stikerPNG}
                        alt="stiker"
                        style={{
                            height: '26px', // 图标高度为容器的80%
                            width: 'auto',
                            margin: '4px',
                            marginLeft: '16px'
                        }}
                    />
                    {/* 图片标签 1：左上角 */}
                    <div className={styles.customRenderAudioLabel}>
                        {action.meterial_name}
                    </div>
                    {/* 图片标签 2：右上角 */}
                    <div className={styles.customRenderAudioLabel}>
                        {formatDurationHHMMSS(action.duration)}
                    </div>
                </div>
                <div
                    className={styles.imageContentFlex}
                >
                    {renderKeyframes(action, onKeyframeClick)}
                </div>
            </div>
        );
    },
    'effect': ({ action, onKeyframeClick }) => {
        const videoRootClassNames = `${styles.customRenderAudioWaveform} ${action.selected ? styles.customRenderEffectformSelected : styles.customRenderEffectformUnselected}`;

        return (
            <div className={videoRootClassNames}>
                <div className={styles.labelsContainer}>
                    {/* 特效标签 */}
                    <img
                        src={effectPNG}
                        alt="Effect"
                        style={{
                            height: '26px', // 图标高度为容器的80%
                            width: 'auto',
                            margin: '4px',
                            marginLeft: '16px'
                        }}
                    />
                    {/* 图片标签 1：左上角 */}
                    <div className={styles.customRenderAudioLabel}>
                        {action.meterial_name}
                    </div>
                    {/* 图片标签 2：右上角 */}
                    <div className={styles.customRenderAudioLabel}>
                        {formatDurationHHMMSS(action.duration)}
                    </div>
                </div>
                <div
                    className={styles.imageContentFlex}
                >
                    {renderKeyframes(action, onKeyframeClick)}
                </div>
            </div>
        );
    }
};

export const CustomRender: FC<{ 
  action: TimelineAction; 
  row: TimelineRow;
  onKeyframeClick?: (action: TimelineAction, keyframe: Keyframe, index: number) => void;
}> = ({ action, row, onKeyframeClick }) => {
    const { effectId } = action;


    const SpecificRenderComponent = RenderTypeMap[effectId] || RenderTypeMap['default'];

    // 创建一个包含renderKeyframes函数的props对象
    const componentProps = {
        action,
        onKeyframeClick: onKeyframeClick
    };

    return (
        <SpecificRenderComponent {...componentProps} />
    );
};