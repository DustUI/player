import { ElementType, useEffect, useState } from 'react';
import { videoPlayer } from '../../core';
import { ButtonBaseProps } from '../shared';
import { Button, ButtonProps } from '../shared/Button';

export const TogglePlay = <T extends ElementType = "button">(
    {
        color = "light",
        pill = true,
        size = "xs",
        icon = false,
        ...props
    }: ButtonProps<T>) => {
    const theirProps = props as ButtonBaseProps<T>;

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

    return <Button icon={icon} color={color} size={size} pill={pill} onClick={playToggle} {...theirProps} >
        {!isPlaying ?
            <span className="vjs-icon-play" />
            :
            <span className="vjs-icon-pause" />
        }
    </Button>
};
