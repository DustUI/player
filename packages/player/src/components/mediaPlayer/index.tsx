import { useEffect, useRef } from 'react';
import { videoPlayer } from '../../core';
import { VideoJsPlayerOptions } from '../../types/player';

export interface MediaPlayerProps {
    options: VideoJsPlayerOptions,
    onReady?: () => void
    className?: string
}

export function MediaPlayer({ options, className, onReady }: MediaPlayerProps) {

    const playerRef = useRef<any>(null);
    const videoRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            const videoElement = document.createElement("video-js");

            videoElement.classList.add('vjs-big-play-centered');
            videoElement.classList.add('w-full');
            if (className) {
                let classList: string[] = []
                if (typeof className === "string") {
                    classList = className.split(" ")
                }
                if (Array.isArray(className)) {
                    classList = className
                }
                classList.forEach(item => {
                    videoElement.classList.add(item)
                })
            }
            if (videoRef.current) videoRef.current.appendChild(videoElement);

            const player = playerRef.current = videoPlayer.init(videoElement, options, onReady);

        } else {
            const player = playerRef.current;

            player.autoplay(options.autoplay);
            player.src(options.sources);
        }
    }, [options, videoRef]);

    useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <div data-vjs-player>
            <div ref={videoRef} />
        </div>
    )
}
