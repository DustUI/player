import { useContext } from "react";
import { MediaPlayerContext } from "../components";

export const useMediaPlayer = () => {
  const context = useContext(MediaPlayerContext);

  if (!context) {
    throw new Error(
      `useMediaPlayer hook must be used within a MediaPlayerContext`
    );
  }

  return context;
};
