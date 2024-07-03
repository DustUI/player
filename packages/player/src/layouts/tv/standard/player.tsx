import { MediaPlayer, MediaPlayerProps, SkipButton, TimeText, TimelineProgress, ToggleButton, ToggleFullscreen, TogglePlay, Volume } from '../../../components';
import { Button } from '../../../components/shared';
import { cn } from '../../../utils';
import { OverlaySetting } from './settings';

interface PlayerProps extends MediaPlayerProps {
}

export function STVControlStandard({ options, className, onReady }: PlayerProps) {

    return (
        <div className={cn("dp-w-screen dp-h-screen dp-relative", className)}>
            <MediaPlayer options={options} onReady={onReady} className='dp-h-full' />

            {options.controls && <div className="dp-absolute dp-w-full dp-h-full dp-bottom-0 dp-left-0 dp-p-6 dp-flex dp-flex-col dp-justify-between dp-space-y-3">
                <div className="dp-flex dp-items-center dp-justify-between">
                    <Button className='dp-bg-transparent dark:dp-bg-transparent dp-rotate-180 dp-text-white' pill icon size={"xl"}>&#10140;</Button>
                    <OverlaySetting className='dp-bg-transparent dark:dp-bg-transparent dp-text-white' size={"xl"} icon />
                </div>
                <div className="dp-flex dp-flex-col dp-space-y-4">
                    <div className="dp-flex dp-space-x-2 dp-items-center">
                        <TimelineProgress activeColor={"pink"} className="dp-h-4" />
                        <div >
                            <TimeText className="dp-px-0 dp-bg-transparent dark:dp-bg-transparent dp-border-none dp-text-white" />
                        </div>
                    </div>
                    <div className="dp-flex dp-items-center dp-justify-between">
                        <div className="dp-flex dp-space-x-4">
                            <TogglePlay className='dp-bg-transparent dark:dp-bg-transparent dp-text-white' size={"xl"} icon />
                            <SkipButton seek={-10} className='dp-bg-transparent dark:dp-bg-transparent dp-text-white' size={"xl"} icon />
                            <SkipButton seek={10} className='dp-bg-transparent dark:dp-bg-transparent dp-text-white' size={"xl"} icon />
                            <Volume className='dp-bg-transparent dark:dp-bg-transparent dp-text-white' size={"xl"} icon pill />
                        </div>
                        <div className="dp-flex dp-space-x-4">
                            <ToggleButton className='dp-bg-transparent dark:dp-bg-transparent dp-text-white' size={"xl"} icon pill>
                                <span data-type="on">&#9829;</span>
                                <span data-type="off">&#9825;</span>
                            </ToggleButton>
                            <ToggleFullscreen className='dp-bg-transparent dark:dp-bg-transparent dp-text-white' size={"xl"} icon={true} pill />
                        </div>
                    </div>
                </div>

            </div>}
        </div>
    );
}
