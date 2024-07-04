import { ElementType } from 'react';
import { useMediaPlayer } from '../../hooks';
import { ButtonBaseProps } from '../shared';
import { Button, ButtonProps } from '../shared/Button';

type SkipButtonProps<T extends ElementType = "button"> = ButtonProps<T> & {
    seek: 5 | 10 | 30 | -5 | -10 | -30
}

export const SkipButton = <T extends ElementType = "button">(
    {
        color = "light",
        pill = true,
        size = "xs",
        icon = false,
        seek = 10,
        ...props
    }: SkipButtonProps<T>) => {
    const theirProps = props as ButtonBaseProps<T>;
    const { videoPlayer } = useMediaPlayer()

    const playToggle = () => {
        videoPlayer.seek(seek)
    }

    return <Button icon={icon} color={color} size={size} pill={pill} onClick={playToggle} {...theirProps} >
        {
            seek > 0 ?
                <span className={"vjs-icon-forward-" + seek} />
                :
                <span className={"vjs-icon-replay" + seek} />
        }
    </Button>
};
