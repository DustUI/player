import { useEffect, useRef } from 'react';
import "video.js/dist/video-js.css";
import { videoPlayer } from '../../core';
import { VideoJsPlayerOptions } from '../../types/player';

export function MediaPlayer({ options }: { options: VideoJsPlayerOptions }) {

    const playerRef = useRef<any>(null);
    const videoRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (videoRef.current) {
            const videoElement = document.createElement("video-js");

            videoElement.classList.add('vjs-big-play-centered');
            videoRef.current?.appendChild(videoElement);


            playerRef.current = videoPlayer.init(videoElement, options, () => {
                console.log('Player Ready')
            });

            return () => {
                videoPlayer?.dispose();
            };
        }
    }, []);

    return (
        <div data-vjs-player>
            <div ref={videoRef} />
        </div>
    )
}
