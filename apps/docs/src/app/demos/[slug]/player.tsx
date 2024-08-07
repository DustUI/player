"use client"
import "@dust/player/styles.css";

import { STVPlayer } from "@dust/player";
import { useState } from "react";

export default function Player({ slug }: { slug: string }) {
    const [ready, setReady] = useState(false)
    const options = {
        autoplay: true,
        controls: true,
        responsive: true,
        sources: [
            {
                src: "https://d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8",
            },
        ],
    }

    const handleOnReady = () => {
        console.log('Player Ready')
        setReady(true)
    }

    return (
        <STVPlayer options={options} onReady={handleOnReady} className="!w-auto !h-[650px]" />
    );
}
