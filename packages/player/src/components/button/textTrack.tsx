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

    const { availableTextTrack, disableTextTrack, enableTextTrack, textTracks, isDisable } = useTextTrack()

    return availableTextTrack && <div className='relative group'>
        <Button {...{ color, size, pill, props }} >
            <span className="vjs-icon-captions" />
        </Button>
        <ul className='absolute w-40 flex flex-col bottom-full left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100'>
            <li className=''>
                <Button color="info" className='w-full rounded-none' outline={isDisable} onClick={() => disableTextTrack()}>
                    Captions off
                </Button>
            </li>
            {
                textTracks.map((textTrack, index) => {
                    return <li key={index}>
                        <Button color="info" className='w-full rounded-none' outline={textTrack.mode === "showing"} onClick={() => enableTextTrack(textTrack.id)}>
                            {textTrack.label}
                        </Button>
                    </li>
                })
            }
        </ul>
    </div>
};
