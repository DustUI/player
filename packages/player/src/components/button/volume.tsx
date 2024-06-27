import { ElementType, useState } from 'react';
import { videoPlayer } from '../../core';
import { ButtonBaseProps } from '../shared';
import { Button, ButtonProps } from '../shared/Button';

export const Volume = <T extends ElementType = "button">(
    {
        color = "light",
        pill = true,
        size = "xs",
        icon = false,
        ...props
    }: ButtonProps<T>) => {
    const theirProps = props as ButtonBaseProps<T>;

    const [isMute, setIsMute] = useState(false)

    const handleTimeUpdate = () => {
        setIsMute(videoPlayer?.player?.muted() as boolean)
    }
    videoPlayer?.on("volumechange", handleTimeUpdate);

    const playToggle = () => {
        videoPlayer.toggleMute()
    }

    return <Button icon={icon} color={color} size={size} pill={pill} onClick={playToggle} {...theirProps} >
        {!isMute ?
            <span className="vjs-icon-volume-high" />
            :
            <span className="vjs-icon-volume-mute" />
        }
    </Button>
};
