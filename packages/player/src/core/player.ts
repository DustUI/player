import "@videojs/http-streaming";
import videojs from "video.js";
import "videojs-contrib-eme";
import {
  VideoJsPlayer,
  VideoJsPlayerEvent,
  VideoJsPlayerOptions,
} from "../types/player";

export class VideoPlayer {
  player: VideoJsPlayer | any = null;
  isLoading: boolean = true;
  isReady: boolean = false;

  private onTimeline:
    | ((info: {
        currentTime: number;
        duration: number;
        percentage: number;
      }) => void)
    | null = null;

  init(
    elementId: HTMLElement | Element,
    options?: VideoJsPlayerOptions,
    callback?: () => void
  ) {
    if (elementId) {
      this.isLoading = true;

      const player: any = videojs(elementId, options, callback);
      this.player = player;
      player?.ready(() => {
        this.isLoading = false;
        this.isReady = true;

        if (player?.eme()) player?.eme();
        this.keyDownHandler();
        this.initializeEvents();
        this.setIcons();
      });
      return player;
    }
  }

  // Initialize event listeners
  private initializeEvents() {
    this.player?.on("timeupdate", this.handleTimeUpdate);
  }

  // Handle time update event
  private handleTimeUpdate = () => {
    if (this.onTimeline) {
      this.onTimeline(this.getTimeline());
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

  // Mute
  mute() {
    this.player?.muted(true);
  }

  // Unmute
  unmute() {
    this.player?.muted(false);
  }

  // Seek video
  seek(seconds: number) {
    const currentTime = this.player?.currentTime() || 0;
    if (seconds > 0) {
      this.activeIcons("forward-" + seconds);
    } else {
      this.activeIcons("replay" + seconds);
    }
    this.player?.currentTime(currentTime + seconds);
  }

  // Enter fullscreen
  enterFullscreen() {
    this.player?.requestFullscreen();
  }

  // Enter fullscreen
  exitFullscreen() {
    if (this.player?.isFullscreen()) {
      this.player?.exitFullscreen();
    }
  }

  // Stream is live
  isLive(): boolean {
    const duration = this.player?.duration();
    return duration === Infinity;
  }

  getTextTrack() {
    if (!this.player) return;

    var tracks = this.player.textTracks();

    if (tracks && tracks.length > 0) {
      const trackList = Array.from(tracks)
        .map((track: any, i) => ({
          index: i,
          id: track.id,
          label: track.label,
          language: track.language,
          mode: track.mode,
          default: track.default,
          kind: track.kind,
        }))
        .filter(
          (track) => track.mode !== "hidden" && track.kind !== "metadata"
        );

      // Remove duplicate tracks by id
      const uniqueTracks =
        trackList.length > 0 &&
        trackList.filter(
          (track, index, self) =>
            index === self.findIndex((t) => t?.id === track?.id)
        );

      return uniqueTracks;
    }
    return [];
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

  // Toggle mute
  toggleMute() {
    const isMuted = (this.player && this.player?.muted()) || false;
    this.player?.muted(!isMuted);
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

  // Toggle fullscreen
  toggleFullscreen() {
    if (this.player?.isFullscreen()) {
      this.player?.exitFullscreen();
    } else {
      this.player?.requestFullscreen();
    }
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

  // Get quality levels
  getQualityTracks() {
    const qualityLevels = this.player?.qualityLevels();
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
  setQualityTrack(id: string) {
    const qualityLevels = this.player?.qualityLevels();
    if (qualityLevels && qualityLevels.length > 0) {
      qualityLevels.levels_.forEach((level: any) => {
        level.enabled = level.id === id;
      });
    }
  }

  // Get audio tracks
  getAudioTracks() {
    const audioTracks = this.player?.audioTracks();
    if (audioTracks) {
      return Array.from(audioTracks).map((track: any, i) => ({
        index: i,
        id: track.id,
        label: track.label,
        language: track.language,
        enabled: track.enabled,
        kind: track.kind,
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
  getProgress(): number {
    const currentTime = this.getCurrentTime();
    const duration = this.getDuration();
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  }

  // Get timeline info
  getTimeline() {
    const currentTime = this.getCurrentTime();
    const duration = this.getDuration();
    const percentage = this.getProgress();
    return {
      currentTime,
      duration,
      percentage,
    };
  }

  // Set callback for timeline updates
  onTimelineCallback(
    callback: (info: {
      currentTime: number;
      duration: number;
      percentage: number;
    }) => void
  ) {
    this.onTimeline = callback;
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
          break;
        case "ArrowRight":
          this.seek(5);
          break;
        case "ArrowUp":
          this.changeVolume(0.1);
          break;
        case "ArrowDown":
          this.changeVolume(-0.1);
          break;
        case "m":
          this.toggleMute();
          break;
        case "f":
          this.toggleFullscreen();
          break;
        case "c":
          this.toggleCaptions();
          break;

        default:
          break;
      }
    });
  }
}

export const videoPlayer = new VideoPlayer();
export type VideoPlayerInstance = InstanceType<typeof VideoPlayer>;
