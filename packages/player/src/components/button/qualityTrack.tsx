import { ElementType } from 'react';
import { useQualityTrack } from '../../hooks';
import { Button, ButtonProps } from '../shared/Button';
import { qualityLevel } from '../../core';

export const QualityTrack = <T extends ElementType = "button">(
    {
        color = "light",
        pill = true,
        size = "xs",
        ...props
    }: ButtonProps<T>) => {

    const { tracks, changeQualityTrack, selectedQuality, isAuto, setAutoQuality } = useQualityTrack()

    return tracks.length > 0 && <div className='relative group'>
        <Button {...{ color, size, pill, props }} >
            <span className="vjs-icon-cog" />
        </Button>
        <ul className='absolute w-40 flex flex-col bottom-full left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100'>
            <li>
                <Button color="info" className='w-full rounded-none' outline={isAuto} onClick={setAutoQuality}>
                    Auto
                </Button>
            </li>
            {
                tracks.map((track, index) => {
                    return <li key={index}>
                        <Button color="info" className='w-full rounded-none' outline={!isAuto && (track.id === selectedQuality)} onClick={() => changeQualityTrack(track.id)}>
                            {track.height}p
                        </Button>
                    </li>
                })
            }
        </ul>
    </div>
};
