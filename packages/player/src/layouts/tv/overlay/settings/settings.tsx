import { ElementType, useState } from 'react';
import { Button, ButtonBaseProps, ButtonProps, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from '../../../../components/shared';
import { Audio, Subtitle, VideoQuality } from '../../_ui';

export type SettingsClickItem = {
    key: 'quality' | 'subtitle' | 'audio' | undefined
    show: boolean,
    title: string
}

export const OverlaySetting = <T extends ElementType = "button">(
    {
        color = "light",
        pill = true,
        size = "xs",
        icon = false,
        ...props
    }: ButtonProps<T>) => {

    const theirProps = props as ButtonBaseProps<T>;

    const [onChange, setOnChange] = useState<SettingsClickItem>({
        show: false,
        key: undefined,
        title: ""
    })

    return (
        <>
            <Sidebar position="right" className='w-96'>
                <SidebarTrigger asChild>
                    <Button color={color} size={size} pill={pill} icon={icon} {...theirProps}>
                        <span className="vjs-icon-cog" />
                    </Button>
                </SidebarTrigger>
                <SidebarContent>
                    <SidebarHeader close={false}>
                        <div className="flex items-center space-x-3">
                            {
                                onChange.show && <Button onClick={() => setOnChange({
                                    show: false,
                                    title: "",
                                    key: undefined,
                                })}>{`<`}</Button>
                            }
                            <h1 className="text-xl">{onChange.title || 'Settings'}</h1>
                        </div>
                    </SidebarHeader>
                    <div className="grid gap-4 p-4">
                        {(onChange.key === "quality" || !onChange.show) && <VideoQuality onClick={(e: any) => setOnChange(e)} show={onChange.show} />}
                        {(onChange.key === "subtitle" || !onChange.show) && <Subtitle onClick={(e: any) => setOnChange(e)} show={onChange.show} />}
                        {(onChange.key === "audio" || !onChange.show) && <Audio onClick={(e: any) => setOnChange(e)} show={onChange.show} />}
                    </div>
                </SidebarContent>
            </Sidebar>
        </>
    );
}
