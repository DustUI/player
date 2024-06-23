import videojs from "video.js";
import {
  VideoJsPlayer,
  VideoJsPlayerEvent,
  VideoJsPlayerOptions,
} from "../types/player";

class VideoPlayer {
  player: VideoJsPlayer | any = null;
  private onTimelineUpdate:
    | ((info: {
        currentTime: number;
        duration: number;
        percentage: number;
      }) => void)
    | null = null;

  init(
    elementId: HTMLElement,
    options?: VideoJsPlayerOptions,
    callback?: () => void
  ) {
    this.player = videojs(elementId, options, callback);
    this.player?.ready(() => {
      this.keyDownHandler();
      this.initializeEvents();
      this.setIcons();
    });
    return this.player;
  }

  // Initialize event listeners
  private initializeEvents() {
    this.player?.on("timeupdate", this.handleTimeUpdate);
  }

  // Handle time update event
  private handleTimeUpdate = () => {
    if (this.onTimelineUpdate) {
      this.onTimelineUpdate(this.getTimelineInfo());
    }
  };

  // Play the video
  play() {
    this.player?.play();
  }

  // Pause the video
  pause() {
    this.player?.pause();
  }

  // Toggle play/pause
  togglePlayPause() {
    if (!this.player) return;
    if (this.player?.paused()) {
      this.play();
      this.activeIcons("pause");
    } else {
      this.pause();
      this.activeIcons("play");
    }
  }

  // Seek video
  seek(seconds: number) {
    const currentTime = this.player?.currentTime() || 0;
    this.player?.currentTime(currentTime + seconds);
  }

  // Get current time
  getCurrentTime(): number {
    return this.player?.currentTime() || 0;
  }

  // Set current time
  setCurrentTime(seconds: number) {
    this.player?.currentTime(seconds);
  }

  // Get duration
  getDuration(): number {
    return this.player?.duration() || 0;
  }

  // Get volume
  getVolume(): number {
    return this.player?.volume() || 0;
  }

  // Set volume
  setVolume(volume: number) {
    this.player?.volume(volume);
  }

  // Change volume
  changeVolume(amount: number) {
    const currentVolume = this.player?.volume() || 0;
    let newVolume = currentVolume + amount;
    if (newVolume > 1) newVolume = 1;
    if (newVolume < 0) newVolume = 0;
    this.player?.volume(newVolume);
  }

  // Mute
  mute() {
    this.player?.muted(true);
  }

  // Unmute
  unmute() {
    this.player?.muted(false);
  }

  // Toggle mute
  toggleMute() {
    const isMuted = (this.player && this.player?.muted()) || false;
    this.player?.muted(!isMuted);
  }

  // Toggle fullscreen
  toggleFullscreen() {
    if (this.player?.isFullscreen()) {
      this.player?.exitFullscreen();
    } else {
      this.player?.requestFullscreen();
    }
  }

  // Get quality levels
  getQualityLevels() {
    const qualityLevels = this.player?.qualityLevels();
    if (qualityLevels) {
      return Array.from(qualityLevels.levels_).map((level: any) => ({
        id: level.id,
        height: level.height,
        width: level.width,
        bitrate: level.bitrate,
      }));
    }
    return [];
  }

  // Set quality level
  setQualityLevel(index: number) {
    const qualityLevels = this.player?.qualityLevels();
    if (qualityLevels && qualityLevels.levels_[index]) {
      qualityLevels.levels_.forEach((level: any, i: number) => {
        level.enabled = i === index;
      });
    }
  }

  // Get audio tracks
  getAudioTracks() {
    const audioTracks = this.player?.audioTracks();
    if (audioTracks) {
      return Array.from(audioTracks).map((track: any) => ({
        id: track.id,
        label: track.label,
        language: track.language,
        enabled: track.enabled,
      }));
    }
    return [];
  }

  // Set audio track
  setAudioTrack(index: number) {
    const audioTracks = this.player?.audioTracks();
    if (audioTracks) {
      Array.from(audioTracks).forEach((track: any, i) => {
        track.enabled = i === index;
      });
    }
  }

  // Get timeline progress
  getTimelineProgress(): number {
    const currentTime = this.getCurrentTime();
    const duration = this.getDuration();
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  }

  // Get timeline info
  getTimelineInfo() {
    const currentTime = this.getCurrentTime();
    const duration = this.getDuration();
    const percentage = this.getTimelineProgress();
    return {
      currentTime,
      duration,
      percentage,
    };
  }

  // Set callback for timeline updates
  setOnTimelineUpdate(
    callback: (info: {
      currentTime: number;
      duration: number;
      percentage: number;
    }) => void
  ) {
    this.onTimelineUpdate = callback;
  }

  // Toggle captions
  toggleCaptions() {
    if (!this.player) return;

    var tracks = this.player.textTracks();

    if (tracks.length > 0) {
      let activeTrack = true;
      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        if (track.mode === "showing") {
          track.mode = "disabled";
          activeTrack = false;
          break;
        }
      }

      if (activeTrack) {
        this.enableTextTrack();
      }
    }
  }

  disableTextTrack() {
    if (!this.player) return;

    var tracks = this.player.textTracks();

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      if (track.mode === "showing") {
        track.mode = "disabled";
        break;
      }
    }
  }

  enableTextTrack() {
    if (!this.player) return;

    var tracks = this.player.textTracks();

    var track;
    for (var i = 0; i < tracks.length; i++) {
      if (tracks[i].mode !== "hidden") {
        track = tracks[i];
        break;
      }
    }

    if (track) {
      track.mode = "showing";
    }
  }

  changeTextTrack(id: number) {
    if (!this.player) return;

    var tracks = this.player.textTracks();

    if (tracks.length > 0 && id !== undefined) {
      const track = tracks[id];
      track.mode = "showing";
    }
  }

  // Add event listener
  on(event: VideoJsPlayerEvent, callback: () => void) {
    this.player?.on(event, callback);
  }

  // Remove event listener
  off(event: VideoJsPlayerEvent, callback: () => void) {
    this.player?.off(event, callback);
  }

  // Dispose the player
  dispose() {
    this.player?.off("timeupdate", this.handleTimeUpdate);
    this.player?.dispose();
  }

  // Add Icons when pressing events
  setIcons() {
    const playIcon = document.createElement("span");
    playIcon.setAttribute("id", "vjs-icon");

    const iconsContainer = document.createElement("div");
    iconsContainer.classList.add("vdt-player-osd");
    iconsContainer.appendChild(playIcon);

    const playerContainer = this.player?.el();
    playerContainer.appendChild(iconsContainer);
  }
  // Add Icons when pressing events
  activeIcons(className: string = "play") {
    const playIcon = document.getElementById("vjs-icon");
    playIcon?.setAttribute("class", "");
    playIcon?.classList.add(`vjs-icon-${className}`);

    const iconsContainer = document.getElementsByClassName("vdt-player-osd");
    iconsContainer[0].classList.add("active");

    setTimeout(() => {
      iconsContainer[0].classList.remove("active");
    }, 200);
  }

  // Keydown event handler
  keyDownHandler() {
    window.addEventListener("keydown", (event) => {
      if (!this.player) return;
      switch (event.key) {
        case "Enter":
        case " ":
          this.togglePlayPause();
          break;
        case "ArrowLeft":
          this.seek(-5);
          this.activeIcons("replay-5");
          break;
        case "ArrowRight":
          this.seek(5);
          this.activeIcons("forward-5");
          break;
        case "ArrowUp":
          this.changeVolume(0.1); // Increase volume by 10%
          break;
        case "ArrowDown":
          this.changeVolume(-0.1); // Decrease volume by 10%
          break;
        case "m":
          this.toggleMute(); // Toggle mute
          break;
        case "f":
          this.toggleFullscreen(); // Toggle fullscreen
          break;
        case "c":
          this.toggleCaptions(); // Toggle captions
          break;

        default:
          break;
      }
    });
  }
}

export const videoPlayer = new VideoPlayer();
export type VideoPlayerType = InstanceType<typeof VideoPlayer>;
