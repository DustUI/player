import { createContext, useEffect, useMemo, useRef } from 'react';
import { VideoPlayer, VideoPlayerInstance } from '../../core';
import { VideoJsPlayer, VideoJsPlayerOptions } from '../../types/player';

export interface MediaPlayerProps {
    options: VideoJsPlayerOptions,
    onReady?: () => void
    className?: string
    children?: React.ReactNode
}

export interface MediaPlayerContextInterface {
    videoPlayer: VideoPlayerInstance
}

export const MediaPlayerContext = createContext<MediaPlayerContextInterface | null>(null)

export function MediaPlayer({ options, className, onReady, children }: MediaPlayerProps) {

    const playerRef = useRef<VideoJsPlayer | null>(null);
    const videoRef = useRef<HTMLDivElement | null>(null);
    const videoPlayer = useRef<VideoPlayerInstance>(new VideoPlayer());

    useEffect(() => {

        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            const videoElement = document.createElement("video-js");

            videoElement.classList.add('vjs-big-play-centered');
            videoElement.classList.add('dp-w-full');
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

            const player = playerRef.current = videoPlayer.current.init(videoElement, options, onReady);

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

    const defaultContext = useMemo(
        () => ({
            videoPlayer: videoPlayer.current
        }),
        [videoPlayer]
    );


    return (
        <MediaPlayerContext.Provider value={defaultContext}>
            <div data-vjs-player className='dp-h-full'>
                <div ref={videoRef} className='dp-h-full' />
                {children}
            </div>
        </MediaPlayerContext.Provider>
    )
}
