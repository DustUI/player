import { MouseEvent, useEffect } from 'react';
import { MediaPlayerProps } from '../../components';
import { STVControlOverlay } from './overlay';
import { STVControlStandard } from './standard';

interface PlayerProps extends MediaPlayerProps {
    theme?: "default" | "overlay" | "grid" | "mini" | "sidebar"
    onController?: (e: boolean) => void;
    onButtonClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function STVPlayer({ onButtonClick, theme = "default", ...rest }: PlayerProps) {

    useEffect(() => {
        const defaultControl = document.querySelector(".vjs-control-bar")
        if (defaultControl) defaultControl.remove()
    }, [])

    return (
        <>
            {theme === 'default' && <STVControlStandard {...rest} />}
            {theme === 'overlay' && <STVControlOverlay {...rest} />}
        </>
    );
}
