import { VideoPlayerInstance, videoPlayer } from "./player";

export class QualityLevel {
  //   protected _videoPlayer: VideoPlayer;
  _isAuto = true;
  _qualityLevels: any;
  _qualitySelected = "";

  constructor(private videoPlayer: VideoPlayerInstance) {
    this.initEvents();
  }

  protected initEvents() {
    this._qualityLevels?.on("change", () => {
      console.log("change fired");
      this._isAuto = false;
      this._qualitySelected = this._qualityLevels.selectedIndex;
    });
  }

  getAuto() {
    return this._isAuto;
  }

  get qualitySelected() {
    return this._qualitySelected;
  }

  // Get quality levels
  getLevels() {
    const qualityLevels = this.videoPlayer?.player?.qualityLevels();
    this._qualityLevels = qualityLevels;
    this.initEvents();
    if (qualityLevels) {
      const labels = qualityLevels.levels_;

      return Array.from(labels)
        .map((level: any, i) => ({
          id: level.id,
          height: level.height,
          width: level.width,
          bitrate: level.bitrate,
          frameRate: level.frameRate,
          enabled: level.enabled,
        }))
        .sort((a, b) => b.height - a.height);
    }
    return [];
  }

  // Set quality level
  set level(id: string) {
    if (this._qualityLevels && this._qualityLevels.length > 0) {
      this._qualityLevels.levels_.forEach((level: any) => {
        level.enabled = level.id === id;
      });
    }
  }
}

export const qualityLevel = new QualityLevel(videoPlayer);
export type qualityLevelType = InstanceType<typeof QualityLevel>;
