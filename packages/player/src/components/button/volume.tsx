import { ElementType, useState } from 'react';
import { videoPlayer } from '../../core';
import { Button, ButtonProps } from '../shared/Button';

export const Volume = <T extends ElementType = "button">(
    {
        color = "light",
        pill = true,
        size = "xs",
        ...props
    }: ButtonProps<T>) => {

    const [isMute, setIsMute] = useState(false)

    const handleTimeUpdate = () => {
        setIsMute(videoPlayer?.player?.muted() as boolean)
    }
    videoPlayer?.on("volumechange", handleTimeUpdate);

    const playToggle = () => {
        videoPlayer.toggleMute()
    }

    return <Button {...{ color, size, pill, props }} onClick={playToggle}>
        {!isMute ?
            <span className="vjs-icon-volume-high" />
            :
            <span className="vjs-icon-volume-mute" />
        }
    </Button>
};
