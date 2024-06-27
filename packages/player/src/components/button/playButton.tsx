import { ElementType, useEffect, useState } from 'react';
import { videoPlayer } from '../../core';
import { Button, ButtonProps } from '../shared/Button';

export const TogglePlay = <T extends ElementType = "button">(
    {
        color = "light",
        pill = true,
        size = "xs",
        icon = false,
        ...props
    }: ButtonProps<T>) => {

    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        const handleTimeUpdate = () => {
            setIsPlaying(!videoPlayer?.player?.paused())
        }
        videoPlayer?.player?.on("timeupdate", handleTimeUpdate);
    }, [])

    const playToggle = () => {
        videoPlayer.togglePlayPause()
    }

    return <Button {...{ color, size, pill, icon, props }} onClick={playToggle}>
        {!isPlaying ?
            <span className="vjs-icon-play" />
            :
            <span className="vjs-icon-pause" />
        }
    </Button>
};
