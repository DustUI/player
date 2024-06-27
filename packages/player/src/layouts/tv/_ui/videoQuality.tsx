import { ElementType, useEffect, useState } from 'react';
import { Button, ButtonBaseProps, ButtonProps } from '../../../components/shared';
import { useQualityTrack } from '../../../hooks';
import { SettingsClickItem } from '../overlay/settings';



type VideoQualityProps<T extends ElementType = "button"> = ButtonProps<T> & {
    onClick: (e: SettingsClickItem) => void
    show?: boolean
}

export const VideoQuality = <T extends ElementType = "button">(
    {
        color = "light",
        size = "xl",
        icon = false,
        onClick,
        show: stateShow = false,
        ...props
    }: VideoQualityProps<T>) => {

    const theirProps = props as ButtonBaseProps<T>;
    const { tracks, changeQualityTrack, selectedQuality, isAuto, setAutoQuality } = useQualityTrack()

    const [show, setShow] = useState(stateShow)

    useEffect(() => {
        setShow(stateShow)
    }, [stateShow])

    const onClickHandler = () => {
        const updated = !show
        setShow(updated)
        if (onClick) onClick({
            show: updated,
            title: 'Video Quality',
            key: 'quality'
        })
    }

    const renderActiveLabel = () => {
        const activeLabel = tracks.length > 0 ? tracks.find(track => track.id === selectedQuality) : undefined
        return `${isAuto ? `Auto ${activeLabel?.height ? `(${activeLabel?.height}p)` : ''}` : activeLabel?.height + "p"}`
    }

    return (
        tracks.length > 0 && <>
            {!show && <Button onClick={onClickHandler} color={color} size={size} className="flex justify-start items-center space-x-3" {...theirProps} >
                <div className='flex items-start justify-center text-3xl'>
                    <span className="vjs-icon-hd" />
                </div>
                <div className='flex flex-col items-start'>
                    <span>Video Quality</span>
                    <small>{renderActiveLabel()}</small>
                </div>
            </Button>}
            {
                show && <ul className='w-full flex flex-col space-y-1'>
                    <li className='flex flex-col'>
                        <Button color="info" className='w-full items-start' outline={isAuto} onClick={setAutoQuality}>
                            Auto
                        </Button>
                    </li>
                    {
                        tracks.map((track, index) => {
                            return <li key={index} className='flex flex-col'>
                                <Button color="info" className='w-full' outline={!isAuto && (track.id === selectedQuality)} onClick={() => changeQualityTrack(track.id)}>
                                    {track.height}p
                                </Button>
                            </li>
                        })
                    }
                </ul>
            }
        </>
    );
}
