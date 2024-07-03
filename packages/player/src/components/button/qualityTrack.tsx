import { ElementType } from 'react';
import { useQualityTrack } from '../../hooks';
import { Button, ButtonProps } from '../shared/Button';

export const QualityTrack = <T extends ElementType = "button">(
    {
        color = "light",
        pill = true,
        size = "xs",
        ...props
    }: ButtonProps<T>) => {

    const { tracks, changeQualityTrack, selectedQuality, isAuto, setAutoQuality } = useQualityTrack()

    return tracks.length > 0 && <div className='dp-relative dp-group'>
        <Button {...{ color, size, pill, props }} >
            <span className="vjs-icon-cog" />
        </Button>
        <ul className='dp-absolute dp-w-40 dp-flex dp-flex-col dp-bottom-full dp-left-0 dp-invisible dp-opacity-0 dp-group-hover:visible dp-group-hover:opacity-100'>
            <li>
                <Button color="info" className='dp-w-full dp-rounded-none' outline={isAuto} onClick={setAutoQuality}>
                    Auto
                </Button>
            </li>
            {
                tracks.map((track, index) => {
                    return <li key={index}>
                        <Button color="info" className='dp-w-full dp-rounded-none' outline={!isAuto && (track.id === selectedQuality)} onClick={() => changeQualityTrack(track.id)}>
                            {track.height}p
                        </Button>
                    </li>
                })
            }
        </ul>
    </div>
};
