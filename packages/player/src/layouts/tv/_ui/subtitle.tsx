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
    const { availableTextTrack, disableTextTrack, enableTextTrack, textTracks, isDisable } = useTextTrack()

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
        const activeLabel = textTracks.length > 0 ? textTracks.find(track => track.mode === "showing") : undefined
        return activeLabel?.label || "Off"
    }

    return (
        availableTextTrack && <>
            {!show && <Button onClick={onClickHandler} color={color} size={size} className="flex justify-start items-center space-x-3" {...theirProps} >
                <div className='flex items-start justify-center text-3xl'>
                    <span className="vjs-icon-captions" />
                </div>
                <div className='flex flex-col items-start'>
                    <span>{title}</span>
                    <small>{renderActiveLabel()}</small>
                </div>
            </Button>}
            {
                show && <ul className='w-full flex flex-col space-y-1'>
                    <li className='flex flex-col'>
                        <Button color="info" className='w-full items-start' outline={isDisable} onClick={() => disableTextTrack()}>
                            Captions off
                        </Button>
                    </li>
                    {
                        textTracks.map((track, index) => {
                            return <li key={index} className='flex flex-col'>
                                <Button color="info" className='w-full' outline={track.mode === "showing"} onClick={() => enableTextTrack(track.id)}>
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
