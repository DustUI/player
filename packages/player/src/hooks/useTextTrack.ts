import { useEffect, useState } from "react";
import { videoPlayer } from "../core";

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
  const [availableTextTrack, setAvailableTextTrack] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [textTracks, setTextTracks] = useState<TextTrackItem[]>([]);

  const player: any = videoPlayer.player;

  const handleTextTrack = (player: any) => {
    var tracks = player?.textTracks();
    if (tracks && tracks.length > 0) {
      let trackList = [];
      for (var i = 0; i < tracks.length; i++) {
        const track: TextTrackItem = tracks[i];
        if (track.mode !== "hidden" && track.kind !== "metadata") {
          const tl = {
            index: i,
            id: track.id,
            label: track.label,
            language: track.language,
            mode: track.mode,
            default: track.default,
            kind: track.kind,
          };
          trackList.push(tl);
        }
      }
      setTextTracks(trackList);
      setAvailableTextTrack(true);
    }
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      handleTextTrack(videoPlayer?.player);
    };
    videoPlayer?.on("texttrackchange", handleTimeUpdate);
  }, [videoPlayer]);

  useEffect(() => {
    if (!player) return;
    handleTextTrack(player);
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
    availableTextTrack,
    textTracks,
    disableTextTrack,
    enableTextTrack,
    isDisable,
  };
};
