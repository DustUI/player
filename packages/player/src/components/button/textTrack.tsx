import { ElementType } from 'react';
import { useTextTrack } from '../../hooks';
import { Button, ButtonProps } from '../shared/Button';

export const TextTrack = <T extends ElementType = "button">(
    {
        color = "light",
        pill = true,
        size = "xs",
        ...props
    }: ButtonProps<T>) => {

    const { isAvailable, disableTextTrack, enableTextTrack, tracks, isDisable } = useTextTrack()

    return isAvailable && <div className='dp-relative dp-group'>
        <Button {...{ color, size, pill, props }} >
            <span className="vjs-icon-captions" />
        </Button>
        <ul className='dp-absolute dp-w-40 dp-flex dp-flex-col dp-bottom-full dp-left-0 dp-invisible dp-opacity-0 dp-group-hover:visible dp-group-hover:opacity-100'>
            <li className=''>
                <Button color="info" className='dp-w-full dp-rounded-none' outline={isDisable} onClick={() => disableTextTrack()}>
                    Captions off
                </Button>
            </li>
            {
                tracks.map((textTrack, index) => {
                    return <li key={index}>
                        <Button color="info" className='dp-w-full dp-rounded-none' outline={textTrack.mode === "showing"} onClick={() => enableTextTrack(textTrack.id)}>
                            {textTrack.label}
                        </Button>
                    </li>
                })
            }
        </ul>
    </div>
};
