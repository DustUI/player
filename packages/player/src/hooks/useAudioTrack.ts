import { useEffect, useState } from "react";
import { videoPlayer } from "../core";

interface AudioTrackItem {
  index: number;
  id: number;
  label: string;
  language: string;
  enabled: boolean;
  kind: string;
  [key: string]: any;
}

export const useAudioTrack = () => {
  const [isAvailable, setAvailableAudioTrack] = useState(false);
  const [audioTrack, setAudioTrack] = useState<AudioTrackItem[]>([]);

  const player: any = videoPlayer.player;

  const handleAudioTrack = (player: any) => {
    var tracks = player?.audioTracks();
    if (tracks && tracks.length > 0) {
      let trackList = [];
      for (var i = 0; i < tracks.length; i++) {
        const track: AudioTrackItem = tracks[i];
        const tl = {
          index: i,
          id: track.id,
          label: track.label,
          language: track.language,
          enabled: track.enabled,
          kind: track.kind,
        };
        trackList.push(tl);
      }
      setAudioTrack(trackList);
      setAvailableAudioTrack(true);
    }
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      handleAudioTrack(videoPlayer?.player);
    };
    videoPlayer?.on("loadedmetadata", handleTimeUpdate);
  }, [videoPlayer]);

  useEffect(() => {
    if (!player) return;
    handleAudioTrack(player);
  }, [player]);

  const changeAudioTrack = (index: number) => {
    if (!player) return;

    var tracks = player.audioTracks();
    if (tracks) {
      Array.from(tracks).forEach((track: any, i) => {
        track.enabled = i === index;
      });
    }
  };

  return {
    isAvailable,
    audioTrack,
    changeAudioTrack,
  };
};
