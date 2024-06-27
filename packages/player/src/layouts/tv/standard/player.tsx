import { MouseEvent } from 'react';
import { MediaPlayer, MediaPlayerProps, TimeText, TimelineProgress, ToggleFullscreen, TogglePlay, Volume } from '../../../components';
import { ToggleButton } from '../../../components/button/favoriteButton';
import { OverlaySetting } from './settings';

interface PlayerProps extends MediaPlayerProps {
    onController?: (e: boolean) => void;
    onButtonClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function STVControlStandard({ options, onReady }: MediaPlayerProps) {

    return (
        <div className="w-screen h-screen relative">
            <MediaPlayer options={options} onReady={onReady} className='h-screen' />

            {options.controls && <div className="absolute w-full h-full bottom-0 left-0 p-6 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                    <OverlaySetting size={"xl"} icon />
                </div>
                <div className="flex flex-col space-y-4">
                    <div className="flex space-x-2 items-center">
                        <div className='flex-1'>
                            <TimelineProgress activeColor={"pink"} className="h-4" />
                        </div>
                        <div >
                            <TimeText className="px-0 bg-transparent dark:bg-transparent border-none" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex space-x-4">
                            <TogglePlay className='bg-opacity-30' size={"xl"} icon />
                            <Volume size={"xl"} icon outline />
                            <ToggleButton size={"xl"} icon>
                                <span data-type="on">&#9829;</span>
                                <span data-type="off">&#9825;</span>
                            </ToggleButton>
                        </div>
                        <div className="flex space-x-4">
                            <ToggleFullscreen size={"xl"} icon={true} />
                        </div>
                    </div>
                </div>

            </div>}
        </div>
    );
}
