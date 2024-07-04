import { useEffect, useState } from "react";
import { useMediaPlayer } from "./useMediaPlayer";

interface TextTrackItem {
  index: number;
  id: number;
  label: string;
  language: string;
  mode: string;
  default: boolean;
  kind: string;
  [key: string]: any;
}

export const useTextTrack = () => {
  const { videoPlayer } = useMediaPlayer();
  const [isAvailable, setAvailable] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [tracks, setTextTracks] = useState<TextTrackItem[]>([]);

  const player: any = videoPlayer.player;

  const handleTextTrack = () => {
    var tracks = videoPlayer?.getTextTrack();
    if (tracks && tracks.length > 0) {
      setTextTracks(tracks);
      setAvailable(true);
    }
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      handleTextTrack();
    };
    videoPlayer?.on("texttrackchange", handleTimeUpdate);
  }, [videoPlayer]);

  useEffect(() => {
    if (!player) return;
    handleTextTrack();
  }, [player]);

  const disableTextTrack = () => {
    if (!player) return;

    var tracks = player.textTracks();

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      if (track.mode === "showing") {
        track.mode = "disabled";
        setIsDisable(true);
      }
    }
  };

  const enableTextTrack = (id: number) => {
    if (!player) return;

    var tracks = player.textTracks();

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      if (track.id === id) {
        track.mode = "showing";
        setIsDisable(false);
      } else {
        track.mode = "disabled";
      }
    }
  };

  return {
    isAvailable,
    tracks,
    disableTextTrack,
    enableTextTrack,
    isDisable,
  };
};
