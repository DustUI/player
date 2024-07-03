import { ElementType, useEffect, useState } from "react";
import { Theme, videoPlayer } from "../../core";
import { buildTimeString, cn } from "../../utils";
import { ButtonProps, ButtonTheme } from "../shared/Button";


type TimeProps<T extends ElementType = "div"> = ButtonProps<T> & {
    reverse?: boolean
}

export const TimeText = <T extends ElementType = "div">(
    {
        reverse = false,
        className,
        ...props
    }: TimeProps<T>) => {

    const [timelineInfo, setTimelineInfo] = useState({ currentTime: 0, duration: 0, percentage: 0 });

    useEffect(() => {
        const handleTimeUpdate = () => {
            const info = videoPlayer.getTimeline();
            setTimelineInfo(info);
        }
        videoPlayer?.player?.on("timeupdate", handleTimeUpdate);
    }, [videoPlayer]);

    const theme: ButtonTheme = Theme;

    return (
        videoPlayer.player && <div className={cn(
            theme.color.light,
            className
        )}
            {...props}
        >
            {
                !videoPlayer.isLive() ?
                    reverse ?
                        <>
                            <span>
                                -{buildTimeString(timelineInfo.duration - timelineInfo.currentTime, timelineInfo.duration > 3600)}
                            </span>
                        </>
                        :
                        <>
                            <span>
                                {buildTimeString(timelineInfo.currentTime, timelineInfo.duration > 3600)}
                            </span>
                            <span>/</span>
                            <span>{buildTimeString(timelineInfo.duration, timelineInfo.duration > 3600)}</span>
                        </>
                    :
                    <div className="dp-flex dp-items-center dp-justify-center">
                        <span className="vjs-icon-circle dp-text-red-400"></span>
                        <span>Live</span>
                    </div>
            }
        </div>
    );
}
