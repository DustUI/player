import { MouseEvent } from 'react';
import { MediaPlayer, MediaPlayerProps, TimeText, TimelineProgress, TogglePlay } from '../../../components';
import { ToggleButton } from '../../../components/button/toggleButton';
import { cn } from '../../../utils';
import { OverlaySetting } from './settings';

interface PlayerProps extends MediaPlayerProps {
    onController?: (e: boolean) => void;
    onButtonClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function STVControlOverlay({ options, onReady, className }: MediaPlayerProps) {

    return (
        <div className={cn("dp-w-screen dp-h-screen dp-relative", className)}>
            <MediaPlayer options={options} onReady={onReady} className='dp-h-full' />

            {options.controls && <div className="dp-absolute dp-w-full dp-bottom-0 dp-left-0 dp-p-6 dp-flex dp-flex-col dp-space-y-3">
                <div className="dp-flex dp-space-x-4">
                    <TogglePlay color={"pink"} size={"xl"} icon />
                    <ToggleButton size={"xl"} icon>
                        <span data-type="on">&#9829;</span>
                        <span data-type="off">&#9825;</span>
                    </ToggleButton>
                    <OverlaySetting size={"xl"} icon />
                </div>
                <div className="dp-flex dp-flex-col dp-space-y-2">
                    <TimelineProgress activeColor={"pink"} className="dp-h-4" />
                    <div className="dp-self-end">
                        <TimeText className="dp-px-0 dp-bg-transparent dp-dark:bg-transparent dp-border-none" />
                    </div>
                </div>
            </div>}
        </div>
    );
}
