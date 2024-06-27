import { Children, ElementType, ReactNode, useState } from 'react';
import { Button, ButtonProps } from '../shared/Button';
import { ButtonBaseProps } from '../shared/ButtonBase';
export const On = ({ children }: { children: ReactNode }) => <>{children}</>;
export const Off = ({ children }: { children: ReactNode }) => <>{children}</>;


type ToggleButtonProps<T extends ElementType = 'button'> = ButtonProps<T> & {
    beforeToggle?: (toggleState: boolean) => void;
    afterToggle?: (toggleState: boolean) => void;
    children: ReactNode;
}

export const ToggleButton = <T extends ElementType = "button">(
    {
        color = "light",
        pill = true,
        size = "xs",
        icon = true,
        onClick,
        beforeToggle,
        afterToggle,
        children,
        ...props
    }: ToggleButtonProps<T>) => {

    const [toggle, setToggle] = useState(false)

    const handleToggle = () => {
        if (beforeToggle) {
            beforeToggle(toggle);
        }
        const newToggleState = !toggle;
        setToggle(newToggleState);
        if (onClick) {
            onClick(newToggleState);
        }
        if (afterToggle) {
            afterToggle(newToggleState);
        }
    };

    const renderChild = (type: string) => Children.map(children, child => {
        const childProps: any = child
        return childProps.props['data-type'] === type && child
    })

    const theirProps = props as ButtonBaseProps<T>;
    return <Button onClick={handleToggle} color={color} size={size} pill={pill} icon={icon} {...theirProps} >
        {toggle ? renderChild("on") : renderChild("off")}
    </Button>
};
