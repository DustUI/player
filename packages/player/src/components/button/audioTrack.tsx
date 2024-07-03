import { ElementType } from 'react';
import { useAudioTrack } from '../../hooks';
import { Button, ButtonProps } from '../shared/Button';

export const AudioTrack = <T extends ElementType = "button">(
    {
        color = "light",
        pill = true,
        size = "xs",
        ...props
    }: ButtonProps<T>) => {

    const { tracks, isAvailable, changeAudioTrack } = useAudioTrack()

    return isAvailable && <div className='dp-relative dp-group'>
        <Button {...{ color, size, pill, props }} >
            <span className="vjs-icon-audio" />
        </Button>
        <ul className='dp-absolute dp-w-40 dp-flex dp-flex-col dp-bottom-full dp-left-0 dp-invisible dp-opacity-0 dp-group-hover:visible dp-group-hover:opacity-100'>
            {
                tracks.map((textTrack, index) => {
                    return <li key={index}>
                        <Button color="info" className='dp-w-full dp-rounded-none' outline={textTrack.enabled} onClick={() => changeAudioTrack(index)}>
                            {textTrack.label}
                        </Button>
                    </li>
                })
            }
        </ul>
    </div>
};
