import { ElementType, useEffect, useState } from 'react';
import { Button, ButtonBaseProps, ButtonProps } from '../../../components/shared';
import { useAudioTrack } from '../../../hooks';
import { SettingsClickItem } from '../overlay/settings';

type AudioProps<T extends ElementType = "button"> = ButtonProps<T> & {
    onClick: (e: SettingsClickItem) => void
    show?: boolean
}

const title = "Audio Track"

export const Audio = <T extends ElementType = "button">(
    {
        color = "light",
        size = "xl",
        icon = false,
        onClick,
        show: stateShow = false,
        ...props
    }: AudioProps<T>) => {

    const theirProps = props as ButtonBaseProps<T>;
    const { tracks, isAvailable, changeAudioTrack } = useAudioTrack()

    const [show, setShow] = useState(stateShow)

    useEffect(() => {
        setShow(stateShow)
    }, [stateShow])

    const onClickHandler = () => {
        const updated = !show
        setShow(updated)
        if (onClick) onClick({
            show: updated,
            title: title,
            key: 'audio'
        })
    }

    const renderActiveLabel = () => {
        const activeLabel = tracks.length > 0 ? tracks.find(track => track.enabled === true) : undefined
        return activeLabel?.label || ""
    }

    return (
        isAvailable && <>
            {!show && <Button onClick={onClickHandler} color={color} size={size} className="flex justify-start items-center space-x-3" {...theirProps} >
                <div className='flex items-start justify-center text-3xl'>
                    <span className="vjs-icon-audio" />
                </div>
                <div className='flex flex-col items-start'>
                    <span>{title}</span>
                    <small>{renderActiveLabel()}</small>
                </div>
            </Button>}
            {
                show && <ul className='w-full flex flex-col space-y-1'>
                    {
                        tracks.map((track, index) => {
                            return <li key={index} className='flex flex-col'>
                                <Button color="info" className='w-full' outline={track.enabled} onClick={() => changeAudioTrack(index)}>
                                    {track.label}
                                </Button>
                            </li>
                        })
                    }
                </ul>
            }
        </>
    );
}
