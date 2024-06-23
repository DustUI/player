"use client"
import "@dust/player/styles.css";

import { AudioTrack, MediaPlayer, QualityTrack, TextTrack, TimeText, TimelineProgress, ToggleButton, ToggleFullscreen, Volume } from "@dust/player";

export default function Player() {
    const options = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        liveui: true,
        // src: "https://live-hls-abr-cdn.livepush.io/live/bigbuckbunnyclip/index.m3u8",
        sources: [
            {
                src: "https://d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8",
                // src: 'https://bitmovin-a.akamaihd.net/content/playhouse-vr/mpds/105560.mpd',
                // type: "application/x-mpegURL"
            },
        ],
    }

    return (
        <div className="w-screen h-screen">
            <MediaPlayer options={options} />
            <div className="flex">
                <ToggleButton />
                <Volume />
                <TextTrack />
                <AudioTrack />
                <ToggleFullscreen />
                <QualityTrack />
            </div>
            <TimelineProgress className="h-2" />
            <TimeText className="px-0" />
        </div>
    );
}
