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
            {!show && <Button onClick={onClickHandler} color={color} size={size} className="dp-flex dp-justify-start dp-items-center dp-space-x-3" {...theirProps} >
                <div className='dp-flex dp-items-start dp-justify-center dp-text-3xl'>
                    <span className="vjs-icon-audio" />
                </div>
                <div className='dp-flex dp-flex-col dp-items-start'>
                    <span>{title}</span>
                    <small>{renderActiveLabel()}</small>
                </div>
            </Button>}
            {
                show && <ul className='dp-w-full dp-flex dp-flex-col dp-space-y-1'>
                    {
                        tracks.map((track, index) => {
                            return <li key={index} className='dp-flex dp-flex-col'>
                                <Button color="info" className='dp-w-full' outline={track.enabled} onClick={() => changeAudioTrack(index)}>
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
