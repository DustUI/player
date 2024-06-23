import { ElementType, useEffect, useState } from 'react';
import { videoPlayer } from '../../core';
import { Button, ButtonProps } from '../shared/Button';

export const ToggleFullscreen = <T extends ElementType = "button">(
    {
        color = "light",
        pill = true,
        size = "xs",
        ...props
    }: ButtonProps<T>) => {

    const [isFullscreen, setIsFullscreen] = useState(false)

    useEffect(() => {
        const handleTimeUpdate = () => {
            setIsFullscreen(!videoPlayer?.player?.isFullscreen())
        }
        videoPlayer?.player?.on("fullscreenchange", handleTimeUpdate);
    }, [])

    const fullscreenToggle = () => {
        videoPlayer.toggleFullscreen()
    }

    return <Button {...{ color, size, pill, props }} onClick={fullscreenToggle}>
        {!isFullscreen ?
            <span className="vjs-icon-fullscreen-enter" />
            :
            <span className="vjs-icon-fullscreen-exit" />
        }
    </Button>
};
