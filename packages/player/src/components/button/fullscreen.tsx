import { ElementType, useEffect, useState } from 'react';
import { videoPlayer } from '../../core';
import { ButtonBaseProps } from '../shared';
import { Button, ButtonProps } from '../shared/Button';

export const ToggleFullscreen = <T extends ElementType = "button">(
    {
        color = "light",
        pill = true,
        size = "xs",
        icon = false,
        ...props
    }: ButtonProps<T>) => {
    const theirProps = props as ButtonBaseProps<T>;

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

    return <Button icon={icon} color={color} size={size} pill={pill} onClick={fullscreenToggle} {...theirProps} >
        {!isFullscreen ?
            <span className="vjs-icon-fullscreen-enter" />
            :
            <span className="vjs-icon-fullscreen-exit" />
        }
    </Button>
};
