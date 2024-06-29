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
  const [isAvailable, setAvailable] = useState(false);
  const [tracks, setAudioTrack] = useState<AudioTrackItem[]>([]);

  const player: any = videoPlayer.player;

  const handleAudioTrack = () => {
    var tracks = videoPlayer?.getAudioTracks();
    if (tracks && tracks.length > 0) {
      setAudioTrack(tracks);
      setAvailable(true);
    }
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      handleAudioTrack();
    };
    videoPlayer?.on("loadedmetadata", handleTimeUpdate);
  }, [videoPlayer]);

  useEffect(() => {
    if (!player) return;
    handleAudioTrack();
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
    tracks,
    changeAudioTrack,
  };
};
