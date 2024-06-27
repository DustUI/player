import { MouseEvent } from 'react';
import { MediaPlayer, MediaPlayerProps, TimeText, TimelineProgress, TogglePlay } from '../../../components';
import { ToggleButton } from '../../../components/button/favoriteButton';
import { OverlaySetting } from './settings';

interface PlayerProps extends MediaPlayerProps {
    onController?: (e: boolean) => void;
    onButtonClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function STVControlOverlay({ options, onReady }: MediaPlayerProps) {

    return (
        <div className="w-screen h-screen relative">
            <MediaPlayer options={options} onReady={onReady} className='h-screen' />

            {options.controls && <div className="absolute w-full bottom-0 left-0 p-6 flex flex-col space-y-3">
                <div className="flex space-x-4">
                    <TogglePlay color={"pink"} size={"xl"} icon />
                    <ToggleButton size={"xl"} icon>
                        <span data-type="on">&#9829;</span>
                        <span data-type="off">&#9825;</span>
                    </ToggleButton>
                    <OverlaySetting size={"xl"} icon />
                </div>
                <div className="flex flex-col space-y-2">
                    <TimelineProgress activeColor={"pink"} className="h-4" />
                    <div className="self-end">
                        <TimeText className="px-0 bg-transparent dark:bg-transparent border-none" />
                    </div>
                </div>
            </div>}
        </div>
    );
}
