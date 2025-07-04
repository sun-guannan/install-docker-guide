// src/utils/helpers.ts

export const formatDuration = (microseconds: number | null | undefined): string => {
  if (typeof microseconds !== 'number' || microseconds < 0) {
    return 'N/A';
  }
  return `${(microseconds / 1000000).toFixed(2)}s`;
};

export const formatTimeRange = (timerange: any): string => {
  if (!timerange) return 'N/A';
  return `[${formatDuration(timerange.start)}, ${formatDuration(timerange.start + timerange.duration)}] (Duration: ${formatDuration(timerange.duration)})`;
};

export const renderJsonSafely = (data: any): string => {
  try {
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error("Error stringifying JSON:", error);
    return "无法解析的数据";
  }
};

export const trackTypeIcons = {
  'video': 'VideoCameraOutlined',
  'audio': 'SoundOutlined',
  'text': 'FontSizeOutlined',
  'effect': 'StarOutlined',
};

export const formatDurationHHMMSS = (totalMillSeconds: number): string => {
  const totalSeconds = totalMillSeconds / 1000_000;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const pad = (num: number) => num.toString().padStart(2, '0');

  // 如果总时长超过1小时，显示 hh:mm:ss，否则显示 mm:ss
  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  } else {
    return `${pad(minutes)}:${pad(seconds)}`;
  }
};