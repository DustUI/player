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

    const { audioTrack, isAvailable, changeAudioTrack } = useAudioTrack()

    return isAvailable && <div className='relative group'>
        <Button {...{ color, size, pill, props }} >
            <span className="vjs-icon-audio" />
        </Button>
        <ul className='absolute w-40 flex flex-col bottom-full left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100'>
            {
                audioTrack.map((textTrack, index) => {
                    return <li key={index}>
                        <Button color="info" className='w-full rounded-none' outline={textTrack.enabled} onClick={() => changeAudioTrack(index)}>
                            {textTrack.label}
                        </Button>
                    </li>
                })
            }
        </ul>
    </div>
};
