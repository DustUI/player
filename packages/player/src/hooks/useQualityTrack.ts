import { useEffect, useState } from "react";
import { videoPlayer } from "../core";

interface QualityLevel {
  id: string;
  height: number;
  width: number;
  bitrate: number;
  frameRate: number;
  enabled: boolean;
}

export function useQualityTrack() {
  const [tracks, setTracks] = useState<QualityLevel[]>(
    videoPlayer.getQualityLevels() || []
  );
  const [selectedQuality, setSelectedQuality] = useState<string | null>(null);
  const [isAuto, setIsAuto] = useState(true);
  const player: any = videoPlayer.player;

  useEffect(() => {
    const updateTracks = () => {
      const qualityLevels = videoPlayer.getQualityLevels();
      if (qualityLevels.length > 0) {
        setTracks(qualityLevels);
        const autoTrack = qualityLevels.find((t) => t.enabled);
        if (autoTrack) {
          setSelectedQuality(autoTrack.id);
          setIsAuto(true);
        }
      }
    };

    // Listen for metadata and update tracks
    videoPlayer?.on("loadedmetadata", updateTracks);

    return () => {
      videoPlayer?.off("loadedmetadata", updateTracks);
    };
  }, [videoPlayer]);

  useEffect(() => {
    const qualityLevels = player?.qualityLevels();
    if (qualityLevels) {
      const handleQualityChange = () => {
        const selectedIndex = qualityLevels.selectedIndex;
        if (selectedIndex >= 0) {
          const newSelectedLevel = qualityLevels[selectedIndex];
          setSelectedQuality(newSelectedLevel.id);
          setIsAuto(false);
        }
      };

      qualityLevels.on("change", handleQualityChange);

      return () => {
        qualityLevels.off("change", handleQualityChange);
      };
    }
  }, [player]);

  const changeQualityTrack = (id: string) => {
    if (!player) return;
    setIsAuto(false);
    setSelectedQuality(id);
    videoPlayer.setQualityLevel(id);
  };

  const setAutoQuality = () => {
    if (!player) return;
    const qualityLevels = player?.qualityLevels();
    if (qualityLevels) {
      for (let i = 0; i < qualityLevels.length; i++) {
        qualityLevels[i].enabled = false;
      }
    }
    setIsAuto(true);
  };

  return {
    tracks,
    selectedQuality,
    isAuto,
    changeQualityTrack,
    setAutoQuality,
  };
}