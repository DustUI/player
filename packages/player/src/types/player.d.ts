// import type { VideoJsPlayer as Player } from "video.js";
import Player from "video.js/dist/types/player";
import AudioTrack from "video.js/dist/types/tracks/audio-track";

export type VideoJsPlayerEvent =
  | "abort"
  | "canplay"
  | "canplaythrough"
  | "durationchange"
  | "emptied"
  | "ended"
  | "error"
  | "loadeddata"
  | "loadedmetadata"
  | "loadstart"
  | "pause"
  | "play"
  | "playing"
  | "progress"
  | "ratechange"
  | "resize"
  | "seeked"
  | "seeking"
  | "stalled"
  | "suspend"
  | "timeupdate"
  | "volumechange"
  | "waiting"
  | "useractive"
  | "userinactive"
  | "fullscreenchange"
  | "qualitychange"
  | "texttrackchange"
  | "audiochange"
  | "videochange"
  | "dispose";

// Define types for QualityLevels and AudioTracks
interface QualityLevels {
  // Add methods and properties according to Video.js documentation
  levels(): QualityLevel[];
  selectedIndex: number;
  [key: string]: any;
}

interface QualityLevel {
  bitrate: number;
  height: number;
  width: number;
  id: string;
  [key: string]: any;
}

export interface VideoJsPlayer extends Player {
  // https://docs.videojs.com/player#playbackRates
  playbackRates(newRates?: number[]): number[];

  // Add type for qualityLevels method
  qualityLevels?(): QualityLevels;

  // Add type for audioTracks method
  audioTracks?(): AudioTrack;
}

export interface VideoJsPlayerOptions extends videojs.ComponentOptions {
  aspectRatio?: string | undefined;
  autoplay?: videojs.Autoplay | undefined;
  bigPlayButton?: boolean | undefined;
  controlBar?: videojs.ControlBarOptions | false | undefined;
  textTrackSettings?: videojs.TextTrackSettingsOptions | undefined;
  controls?: boolean | undefined;
  defaultVolume?: number | undefined;
  fill?: boolean | undefined;
  fluid?: boolean | undefined;
  height?: number | undefined;
  html5?: any;
  inactivityTimeout?: number | undefined;
  language?: string | undefined;
  languages?: { [code: string]: videojs.LanguageTranslations } | undefined;
  liveui?: boolean | undefined;
  loop?: boolean | undefined;
  muted?: boolean | undefined;
  nativeControlsForTouch?: boolean | undefined;
  notSupportedMessage?: string | undefined;
  playbackRates?: number[] | undefined;
  playsinline?: boolean | undefined;
  noUITitleAttributes?: boolean | undefined;
  plugins?: Partial<VideoJsPlayerPluginOptions> | undefined;
  poster?: string | undefined;
  preload?: videojs.Preload | undefined;
  responsive?: boolean | undefined;
  sourceOrder?: boolean | undefined;
  sources?: videojs.Tech.SourceObject[] | undefined;
  src?: string | undefined;
  techOrder?: string[] | undefined;
  tracks?: videojs.TextTrackOptions[] | undefined;
  userActions?: videojs.UserActions | undefined;
  width?: number | undefined;

  audioOnlyMode?: boolean | undefined;
  audioPosterMode?: boolean | undefined;
  autoSetup?: boolean | undefined;
  breakpoints?: Partial<videojs.Breakpoint> | undefined;
  fullscreen?: { options: { navigationUI: "hide" } } | undefined;
  id?: string | undefined;
  liveTracker?:
    | {
        trackingThreshold?: number | undefined;
        liveTolerance?: number | undefined;
      }
    | undefined;
  normalizeAutoplay?: boolean | undefined;
  preferFullWindow?: boolean | undefined;
  restoreEl?: boolean | Element | undefined;
  suppressNotSupportedError?: boolean | undefined;
  techCanOverridePoster?: boolean | undefined;
  "vtt.js"?: string | undefined;
  disablePictureInPicture?: boolean | undefined;
  enableSourceset?: boolean | undefined;
  retryOnError?: boolean | undefined;
}
