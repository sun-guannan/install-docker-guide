/**
 * 定义脚本状态的完整接口。
 * 包含了画布配置、时间线轨道、素材等所有相关数据。
 */
export interface ScriptStatus {
  canvas_config: CanvasConfig;
  color_space: number;
  config: ProjectConfig;
  cover: any | null; // 封面信息，根据实际情况可能需要更详细的定义
  create_time: number; // 创建时间戳
  duration: number; // 项目总时长，微秒
  extra_info: any | null; // 额外信息，根据实际情况可能需要更详细的定义
  fps: number; // 帧率
  free_render_index_mode_on: boolean;
  group_container: any | null; // 组容器信息，根据实际情况可能需要更详细的定义
  id: string; // 项目ID
  keyframe_graph_list: any[]; // 关键帧图列表，根据实际情况可能需要更详细的定义
  keyframes: KeyframesData; // 关键帧数据集合
  last_modified_platform: PlatformInfo; // 最后修改平台信息
  materials: MaterialsData; // 素材数据集合
  mutable_config: any | null; // 可变配置，根据实际情况可能需要更详细的定义
  name: string; // 项目名称
  new_version: string; // 新版本号
  relationships: any[]; // 关系列表，根据实际情况可能需要更详细的定义
  render_index_track_mode_on: boolean;
  retouch_cover: any | null; // 修饰封面信息，根据实际情况可能需要更详细的定义
  source: string; // 来源
  static_cover_image_path: string; // 静态封面图片路径
  time_marks: any | null; // 时间标记，根据实际情况可能需要更详细的定义
  tracks: Track[]; // 轨道列表
  update_time: number; // 更新时间戳
  version: number; // 版本号
}

/**
 * 画布配置接口。
 */
export interface CanvasConfig {
  width: number;
  height: number;
  ratio: string;
}

/**
 * 项目配置接口。
 * 注意：此接口中的属性可能需要根据实际数据进一步细化。
 */
export interface ProjectConfig {
  adjust_max_index: number;
  attachment_info: any[];
  combination_max_index: number;
  export_range: any | null;
  extract_audio_last_index: number;
  lyrics_recognition_id: string;
  lyrics_sync: boolean;
  lyrics_taskinfo: any[];
  maintrack_adsorb: boolean;
  material_save_mode: number;
  multi_language_current: string;
  multi_language_list: any[];
  multi_language_main: string;
  multi_language_mode: string;
  original_sound_last_index: number;
  record_audio_last_index: number;
  sticker_max_index: number;
  subtitle_keywords_config: any | null;
  subtitle_recognition_id: string;
  subtitle_sync: boolean;
  subtitle_taskinfo: any[];
  system_font_list: any[];
  video_mute: boolean;
  zoom_info_params: any | null;
}

/**
 * 平台信息接口。
 */
export interface PlatformInfo {
  app_id: number;
  app_source: string;
  app_version: string;
  os: string;
}

/**
 * 素材数据集合接口。
 * 各类型素材都是一个数组。
 * 注意：此接口中的属性可能需要根据实际数据进一步细化。
 */
export interface MaterialsData {
  ai_translates?: any[];
  audio_balances?: any[];
  audio_effects?: any[];
  audio_fades?: any[];
  audio_track_indexes?: any[];
  audios?: AudioMaterial[];
  beats?: any[];
  canvases?: any[];
  chromas?: any[];
  color_curves?: any[];
  digital_humans?: any[];
  drafts?: any[];
  effects?: any[];
  flowers?: any[];
  green_screens?: any[];
  handwrites?: any[];
  hsl?: any[];
  images?: ImageMaterial[]; // 如果图片单独作为一种素材类型
  log_color_wheels?: any[];
  loudnesses?: any[];
  manual_deformations?: any[];
  masks?: any[];
  material_animations?: MaterialAnimation[];
  material_colors?: any[];
  multi_language_refs?: any[];
  placeholders?: any[];
  plugin_effects?: any[];
  primary_color_wheels?: any[];
  realtime_denoises?: any[];
  shapes?: any[];
  smart_crops?: any[];
  smart_relights?: any[];
  sound_channel_mappings?: any[];
  speeds?: SpeedMaterial[]; // 注意：你的示例中 speed 也是 material，但它的 type 是 "speed"
  stickers?: any[];
  tail_leaders?: any[];
  text_templates?: any[];
  texts?: TextMaterial[];
  time_marks?: any[];
  transitions?: any[];
  video_effects?: any[];
  video_trackings?: any[];
  videos?: VideoMaterial[];
  vocal_beautifys?: any[];
  vocal_separations?: any[];
}

/**
 * 音频素材接口。
 */
export interface AudioMaterial {
  app_id: number;
  category_id: string;
  category_name: string;
  check_flag: number;
  copyright_limit_type: string;
  duration: number; // 微秒
  effect_id: string;
  formula_id: string;
  id: string;
  intensifies_path: string;
  is_ai_clone_tone: boolean;
  is_text_edit_overdub: boolean;
  is_ugc: boolean;
  local_material_id: string;
  music_id: string;
  name: string;
  path: string;
  remote_url: string;
  query: string;
  request_id: string;
  resource_id: string;
  search_id: string;
  source_from: string;
  source_platform: number;
  team_id: string;
  text_id: string;
  tone_category_id: string;
  tone_category_name: string;
  tone_effect_id: string;
  tone_effect_name: string;
  tone_platform: string;
  tone_second_category_id: string;
  tone_second_category_name: string;
  tone_speaker: string;
  tone_type: string;
  type: string; // 例如 "extract_music"
  video_id: string;
  wave_points: any[];
}

/**
 * 视频素材接口。
 * 注意：你的示例中的 "videos" 数组包含了一个 type 为 "photo" 的素材，可能需要更通用的 `VisualMaterial` 接口。
 */
export interface VideoMaterial {
  audio_fade: any | null;
  category_id: string;
  category_name: string;
  check_flag: number;
  crop: CropInfo;
  crop_ratio: string;
  crop_scale: number;
  duration: number; // 微秒
  height: number;
  id: string;
  local_material_id: string;
  material_id: string;
  material_name: string;
  media_path: string;
  path: string;
  remote_url: string;
  type: string; // 例如 "photo", "video"
  width: number;
}

/**
 * 图片素材接口 (如果单独定义)。
 * 注意：你的示例中图片素材是放在 videos 数组里的，这里为清晰可单独定义。
 */
export interface ImageMaterial extends VideoMaterial {
  // ImageMaterial 可以继承 VideoMaterial，或者根据实际情况有自己的独立属性
}

/**
 * 文本素材接口。
 */
export interface TextMaterial {
  id: string;
  content: string; // 包含 JSON 字符串的文本内容，需要进一步解析
  typesetting: number;
  alignment: number;
  letter_spacing: number;
  line_spacing: number;
  line_feed: number;
  line_max_width: number;
  force_apply_line_max_width: boolean;
  check_flag: number;
  type: string; // 例如 "text"
  fixed_width: number;
  fixed_height: number;
}

/**
 * 速度素材接口。
 */
export interface SpeedMaterial {
  curve_speed: any | null;
  id: string;
  mode: number;
  speed: number | null;
  type: string; // 例如 "speed"
}

/**
 * 裁剪信息接口。
 */
export interface CropInfo {
  upper_left_x: number;
  upper_left_y: number;
  upper_right_x: number;
  upper_right_y: number;
  lower_left_x: number;
  lower_left_y: number;
  lower_right_x: number;
  lower_right_y: number;
}

/**
 * 素材动画接口。
 */
export interface MaterialAnimation {
  id: string;
  type: string; // 例如 "sticker_animation"
  multi_language_current: string;
  animations: AnimationItem[];
}

/**
 * 动画项接口。
 */
export interface AnimationItem {
  anim_adjust_params: any | null;
  platform: string;
  panel: string;
  material_type: string;
  name: string;
  id: string;
  type: string; // 例如 "out", "in", "loop"
  resource_id: string;
  start: number; // 微秒
  duration: number; // 微秒
}

/**
 * 关键帧数据集合接口。
 * 注意：你的示例中这些数组是空的，如果未来它们有数据，需要更详细的定义。
 * 当前我们主要从 Segment 的 common_keyframes 中提取关键帧。
 */
export interface KeyframesData {
  adjusts: any[];
  audios: any[];
  effects: any[];
  filters: any[];
  handwrites: any[];
  stickers: any[];
  texts: any[];
  videos: any[];
  // ... 其他可能的关键帧类型，例如：
  // positions?: KeyframeItem[]; // 假设如果 type 是 "KFTypePositionY"，可能对应一个 "positions" 数组
  // volumes?: KeyframeItem[]; // 假设如果 type 是 "volume"，可能对应一个 "volumes" 数组
}

/**
 * 轨道接口。
 */
export interface Track {
  attribute: number;
  flag: number;
  id: string;
  is_default_name: boolean;
  name: string;
  segments: Segment[]; // 轨道中的片段
  type: 'video' | 'audio' | 'text' | 'image'; // 轨道类型
}

/**
 * 片段接口。
 */
export interface Segment {
  enable_adjust: boolean;
  enable_color_correct_adjust: boolean;
  enable_color_curves: boolean;
  enable_color_match_adjust: boolean;
  enable_color_wheels: boolean;
  enable_lut: boolean;
  enable_smart_color_adjust: boolean;
  last_nonzero_volume: number;
  reverse: boolean;
  track_attribute: number;
  track_render_index: number;
  visible: boolean;
  id: string; // 片段ID
  material_id: string; // 关联的素材ID
  target_timerange: TimeRange | null; // 片段在时间线上的范围
  common_keyframes?: CommonKeyframeRef[]; // 片段的公共关键帧引用
  keyframe_refs?: string[]; // 其他关键帧引用，如果存在
  source_timerange: TimeRange | null; // 素材在源文件中的范围
  speed: number | null; // 播放速度
  volume: number; // 音量
  extra_material_refs: string[]; // 额外素材引用，例如速度曲线的ID
  clip: ClipInfo | null; // 裁剪/变换信息
  uniform_scale?: { on: boolean; value: number } | null;
  hdr_settings?: HdrSettings | null;
  render_index: number;
}

/**
 * 时间范围接口（微秒）。
 */
export interface TimeRange {
  start: number; // 微秒
  duration: number; // 微秒
}

/**
 * 公共关键帧引用接口。
 */
export interface CommonKeyframeRef {
  id: string;
  keyframe_list: KeyframeItem[]; // 具体的关键帧列表
  material_id: string; // 可能关联的素材ID
  property_type: string; // 关键帧控制的属性类型，例如 "KFTypePositionY", "volume"
}

/**
 * 单个关键帧数据项接口。
 */
export interface KeyframeItem {
  id: string;
  time_offset: number; // 相对于片段起始时间的偏移量，微秒
  values: number[]; // 关键帧的值，例如位置的 x, y 坐标，或音量值
  curveType?: string; // 曲线类型，例如 "Line"
  graphID?: string;
  left_control?: ControlPoint;
  right_control?: ControlPoint;
}

/**
 * 控制点接口 (用于贝塞尔曲线)。
 */
export interface ControlPoint {
  x: number;
  y: number;
}

/**
 * 裁剪/变换信息接口。
 */
export interface ClipInfo {
  alpha: number;
  flip: {
    horizontal: boolean;
    vertical: boolean;
  };
  rotation: number;
  scale: {
    x: number;
    y: number;
  };
  transform: {
    x: number;
    y: number;
  };
}

/**
 * HDR 设置接口。
 */
export interface HdrSettings {
  intensity: number;
  mode: number;
  nits: number;
}