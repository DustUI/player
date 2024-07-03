import { ElementType, useEffect, useState } from 'react';
import { Button, ButtonBaseProps, ButtonProps } from '../../../components/shared';
import { useTextTrack } from '../../../hooks';
import { SettingsClickItem } from '../overlay/settings';

const title = "Subtitle/CC"

type SubtitleProps<T extends ElementType = "button"> = ButtonProps<T> & {
    onClick: (e: SettingsClickItem) => void
    show?: boolean
}

export const Subtitle = <T extends ElementType = "button">(
    {
        color = "light",
        size = "xl",
        icon = false,
        onClick,
        show: stateShow = false,
        ...props
    }: SubtitleProps<T>) => {

    const theirProps = props as ButtonBaseProps<T>;
    const { isAvailable, disableTextTrack, enableTextTrack, tracks, isDisable } = useTextTrack()

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
            key: 'subtitle'
        })
    }

    const renderActiveLabel = () => {
        const activeLabel = tracks.length > 0 ? tracks.find(track => track.mode === "showing") : undefined
        return activeLabel?.label || "Off"
    }

    return (
        isAvailable && <>
            {!show && <Button onClick={onClickHandler} color={color} size={size} className="dp-flex dp-justify-start dp-items-center dp-space-x-3" {...theirProps} >
                <div className='dp-flex dp-items-start dp-justify-center dp-text-3xl'>
                    <span className="vjs-icon-captions" />
                </div>
                <div className='dp-flex dp-flex-col dp-items-start'>
                    <span>{title}</span>
                    <small>{renderActiveLabel()}</small>
                </div>
            </Button>}
            {
                show && <ul className='dp-w-full dp-flex dp-flex-col dp-space-y-1'>
                    <li className='dp-flex dp-flex-col'>
                        <Button color="info" className='dp-w-full dp-items-start' outline={isDisable} onClick={() => disableTextTrack()}>
                            Captions off
                        </Button>
                    </li>
                    {
                        tracks.map((track, index) => {
                            return <li key={index} className='dp-flex dp-flex-col'>
                                <Button color="info" className='dp-w-full' outline={track.mode === "showing"} onClick={() => enableTextTrack(track.id)}>
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
