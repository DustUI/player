import { useEffect, useState } from "react";
import { videoPlayer } from "../../core";
import { buildTimeString } from "../../utils";
import { Button, ButtonProps } from "../shared/Button";


interface TimeProps extends ButtonProps {
    reverse?: boolean
}

export function TimeText(
    {
        pill = true,
        size = "xs",
        reverse = false,
        ...props
    }: TimeProps) {
    const [timelineInfo, setTimelineInfo] = useState({ currentTime: 0, duration: 0, percentage: 0 });

    useEffect(() => {
        const handleTimeUpdate = () => {
            const info = videoPlayer.getTimelineInfo();
            setTimelineInfo(info);
        }
        videoPlayer?.player?.on("timeupdate", handleTimeUpdate);
    }, [videoPlayer]);

    return (
        timelineInfo.currentTime > 0 && <Button {...{ pill, size, ...props }}>
            {
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
            }
        </Button>
    );
}
