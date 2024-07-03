import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Theme, ThemeColors, videoPlayer } from '../../core';
import { cn } from '../../utils';
import { ButtonProps, ButtonSizes, ButtonTheme } from '../shared/Button';

const sizeType: { [key in keyof ButtonSizes]: string } = {
    xs: "h-2 p-0",
    sm: "h-3 p-0",
    md: "h-4 p-0",
    lg: "h-5 p-0",
    xl: "h-6 p-0",
};

interface TimelineProgressProps extends ButtonProps {
    activeColor?: keyof ThemeColors;
    dotStyle?: string;
}

export const TimelineProgress = ({
    children,
    className,
    color = "light",
    activeColor = "info",
    disabled,
    fullSized,
    isProcessing = false,
    processingLabel = "Loading...",
    processingSpinner,
    gradientDuoTone,
    gradientMonochrome,
    label,
    outline = false,
    pill = false,
    size = "xs",
    dotStyle = "",
    ...props
}: TimelineProgressProps) => {
    const theme: ButtonTheme = Theme;
    const [timelineInfo, setTimelineInfo] = useState({ currentTime: 0, duration: 0, percentage: 0 });
    const [tooltip, setTooltip] = useState({ visible: false, position: 0, time: 0 });
    const progressContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        videoPlayer.onTimelineCallback((info) => {
            setTimelineInfo(info);
        });
    }, []);

    const handleMouseMove = (e: MouseEvent) => {
        if (progressContainerRef.current && timelineInfo.duration) {
            const rect = progressContainerRef.current.getBoundingClientRect();
            const position = e.clientX - rect.left;
            const percentage = position / rect.width;
            const time = percentage * timelineInfo.duration;

            setTooltip({
                visible: true,
                position: percentage * 100,
                time,
            });
        }
    };

    const handleMouseLeave = () => {
        setTooltip({ ...tooltip, visible: false });
    };

    const handleClick = (e: MouseEvent) => {
        if (progressContainerRef.current && timelineInfo.duration) {
            const rect = progressContainerRef.current.getBoundingClientRect();
            const position = e.clientX - rect.left;
            const percentage = position / rect.width;
            const time = percentage * timelineInfo.duration;

            videoPlayer.setCurrentTime(time);
        }
    };

    return (
        videoPlayer?.player && !videoPlayer.isLive() && (
            <div className='dp-flex-1'>
                <div
                    ref={progressContainerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    className={cn(
                        theme.base,
                        disabled && theme.disabled,
                        !gradientDuoTone && !gradientMonochrome && theme.color[color],
                        gradientDuoTone && !gradientMonochrome && theme.gradientDuoTone[gradientDuoTone],
                        !gradientDuoTone && gradientMonochrome && theme.gradient[gradientMonochrome],
                        outline && (theme.outline.color[color] ?? theme.outline.color.default),
                        theme.pill[pill ? "on" : "off"],
                        fullSized && theme.fullSized,
                        sizeType[size],
                        "dp-relative dp-block dp-px-0",
                        className
                    )}
                >
                    <div
                        className={cn(
                            theme.inner.base,
                            theme.color[activeColor],
                            theme.outline[outline ? "on" : "off"],
                            theme.outline.pill[outline && pill ? "on" : "off"],
                            outline && !theme.outline.color[color] && theme.inner.outline,
                            isProcessing && theme.isProcessing,
                            isProcessing && theme.inner.isProcessingPadding[size],
                            "dp-relative dp-block dp-h-full"
                        )}
                        style={{ width: `${timelineInfo.percentage}%` }}
                    >
                        <div
                            className={cn(
                                'dp-h-1 dp-w-1 dp-rounded-full dp-block dp-absolute dp-right-0 dp-top-1/2 dp-bottom-1/2 -dp-translate-y-1/2 dp-bg-gray-100 dp-scale-[3]',
                                dotStyle
                            )}
                            onMouseMove={handleClick}
                        />
                        {tooltip.visible && (
                            <div
                                className="dp-bg-gray-100 dp-rounded dp-absolute dp-top-[-2.5em] dp-right-[-1.5em] dp-px-2 dp-py-1 dp-text-black"
                                aria-hidden="true"
                            >
                                {(timelineInfo.currentTime / 60).toFixed(2)}
                            </div>
                        )}
                    </div>
                    {tooltip.visible && (
                        <div
                            className="dp-absolute dp-bottom-[115%] dp-bg-black dp-text-white dp-rounded dp-px-2"
                            style={{ left: `${tooltip.position}%` }}
                        >
                            {tooltip.time.toFixed(2)}s
                        </div>
                    )}
                </div>
            </div>
        )
    );
};
