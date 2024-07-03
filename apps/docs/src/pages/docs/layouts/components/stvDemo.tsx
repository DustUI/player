import { STVPlayer } from '@dust/player';
import { useState } from 'react';

type theme = "default" | "overlay" | "grid" | "mini" | "sidebar"

const STVDemo = () => {
    const [theme, setTheme] = useState<theme>("overlay")
    const onReadyHandler = () => {
        const defaultControl = document.querySelector(".vjs-control-bar")
        if (defaultControl) defaultControl.remove()
    }
    return (
        <div>
            <div className="flex justify-end items-center">
                <select onChange={(e) => setTheme(e.target.value as theme)} value={theme}>
                    <option value="default">Default</option>
                    <option value="overlay">overlay</option>
                    <option value="grid">grid</option>
                    <option value="mini">mini</option>
                    <option value="sidebar">sidebar</option>
                </select>
            </div>
            <STVPlayer options={{
                autoplay: true,
                controls: true,
                responsive: true,
                sources: [
                    {
                        src: "https://d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8",
                    },
                ],
            }}
                theme={theme}
                className="!w-auto !h-[650px]"
                onReady={onReadyHandler}
            />
        </div>
    );
};

export default STVDemo;