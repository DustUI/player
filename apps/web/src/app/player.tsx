"use client"
import "@dust/player/styles.css";

import { STVPlayer } from "@dust/player";
import { useState } from "react";

export default function Player() {
    const [ready, setReady] = useState(false)
    const options = {
        autoplay: true,
        controls: true,
        responsive: true,
        sources: [
            {
                src: "https://d2zihajmogu5jn.cloudfront.net/hls-webvtt/master.m3u8",
                // src: "https://d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8",
                // src: 'https://livesim.dashif.org/livesim/mup_30/testpic_2s/Manifest.mpd',
                // type: "application/x-mpegURL"
            },
        ],
    }

    const handleOnReady = () => {
        console.log('Player Ready')
        setReady(true)
    }

    return (<div className="flex">
        <STVPlayer options={options} onReady={handleOnReady} theme="overlay" />
    </div>
    );
}
