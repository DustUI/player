import { MouseEvent } from 'react';
import { MediaPlayer, MediaPlayerProps, SkipButton, TimeText, TimelineProgress, ToggleButton, ToggleFullscreen, TogglePlay, Volume } from '../../../components';
import { Button } from '../../../components/shared';
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
                    <Button className='bg-transparent dark:bg-transparent border-none rotate-180' pill icon size={"xl"}>&#10140;</Button>
                    <OverlaySetting size={"xl"} icon />
                </div>
                <div className="flex flex-col space-y-4">
                    <div className="flex space-x-2 items-center">
                        <TimelineProgress activeColor={"pink"} className="h-4" />
                        <div >
                            <TimeText className="px-0 bg-transparent dark:bg-transparent border-none" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex space-x-4">
                            <TogglePlay className='bg-transparent dark:bg-transparent' size={"xl"} icon />
                            <SkipButton seek={-10} className='bg-transparent dark:bg-transparent' size={"xl"} icon />
                            <SkipButton seek={10} className='bg-transparent dark:bg-transparent' size={"xl"} icon />
                            <Volume className='bg-transparent dark:bg-transparent' size={"xl"} icon pill />
                        </div>
                        <div className="flex space-x-4">
                            <ToggleButton className='bg-transparent dark:bg-transparent' size={"xl"} icon pill>
                                <span data-type="on">&#9829;</span>
                                <span data-type="off">&#9825;</span>
                            </ToggleButton>
                            <ToggleFullscreen className='bg-transparent dark:bg-transparent' size={"xl"} icon={true} pill />
                        </div>
                    </div>
                </div>

            </div>}
        </div>
    );
}
