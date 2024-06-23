import { ElementType, ReactNode, forwardRef } from "react";
import { Theme, ThemeBoolean, ThemeColors, ThemeGradientColors, ThemeGradientDuoToneColors, ThemeSizes } from "../..//core";
import { PolymorphicComponentPropWithRef, PolymorphicRef, cn } from "../../utils";
import { ButtonBase, type ButtonBaseProps } from "./ButtonBase";

export interface ButtonTheme {
    base: string;
    fullSized: string;
    color: ThemeColors;
    disabled: string;
    isProcessing: string;
    spinnerSlot: string;
    spinnerLeftPosition: ButtonSizes;
    gradient: ButtonGradientColors;
    gradientDuoTone: ButtonGradientDuoToneColors;
    inner: ThemeButtonInnerTheme;
    label: string;
    outline: ThemeButtonOutlineTheme;
    pill: ThemeBoolean;
    size: ButtonSizes;
}

export interface ThemeButtonInnerTheme {
    base: string;
    outline: string;
    isProcessingPadding: ButtonSizes;
}

export interface ThemeButtonOutlineTheme extends ThemeBoolean {
    color: ButtonOutlineColors;
    pill: ThemeBoolean;
}

export interface ButtonColors
    extends Pick<ThemeColors, "dark" | "failure" | "gray" | "info" | "light" | "purple" | "success" | "warning"> {
    [key: string]: string;
}

export interface ButtonGradientColors extends ThemeGradientColors {
    [key: string]: string;
}

export interface ButtonGradientDuoToneColors extends ThemeGradientDuoToneColors {
    [key: string]: string;
}

export interface ButtonOutlineColors extends Pick<ThemeColors, "gray"> {
    [key: string]: string;
}

export interface ButtonSizes extends Pick<ThemeSizes, "xs" | "sm" | "lg" | "xl"> {
    [key: string]: string;
}

export type ButtonProps<T extends ElementType = "button"> = PolymorphicComponentPropWithRef<
    T,
    {
        href?: string;
        color?: keyof ButtonColors;
        fullSized?: boolean;
        gradientDuoTone?: keyof ButtonGradientDuoToneColors;
        gradientMonochrome?: keyof ButtonGradientColors;
        target?: string;
        isProcessing?: boolean;
        processingLabel?: string;
        processingSpinner?: ReactNode;
        label?: ReactNode;
        outline?: boolean;
        pill?: boolean;
        size?: keyof ButtonSizes;
    }
>;

type ButtonComponentType = (<C extends ElementType = "button">(props: ButtonProps<C>) => JSX.Element) & {
    displayName?: string;
};

const ButtonComponent = forwardRef(
    <T extends ElementType = "button">(
        {
            children,
            className,
            color = "light",
            disabled,
            fullSized,
            isProcessing = false,
            processingLabel = "Loading...",
            processingSpinner,
            gradientDuoTone,
            gradientMonochrome,
            label,
            outline = false,
            pill = false,
            size = "md",
            ...props
        }: ButtonProps<T>,
        ref: PolymorphicRef<T>,
    ) => {
        const theme = Theme

        const theirProps = props as ButtonBaseProps<T>;

        return (
            <ButtonBase
                ref={ref}
                disabled={disabled}
                className={cn(
                    theme.base,
                    disabled && theme.disabled,
                    !gradientDuoTone && !gradientMonochrome && theme.color[color],
                    gradientDuoTone && !gradientMonochrome && theme.gradientDuoTone[gradientDuoTone],
                    !gradientDuoTone && gradientMonochrome && theme.gradient[gradientMonochrome],
                    outline && (theme.outline.color[color] ?? theme.outline.color.default),
                    theme.pill[pill ? "on" : "off"],
                    fullSized && theme.fullSized,
                    className,
                )}
                {...theirProps}
            >
                <span
                    className={cn(
                        theme.inner.base,
                        theme.outline[outline ? "on" : "off"],
                        theme.outline.pill[outline && pill ? "on" : "off"],
                        theme.size[size],
                        outline && !theme.outline.color[color] && theme.inner.outline,
                        isProcessing && theme.isProcessing,
                        isProcessing && theme.inner.isProcessingPadding[size],
                    )}
                >
                    <>
                        {isProcessing && (
                            <span className={cn(theme.spinnerSlot, theme.spinnerLeftPosition[size])}>
                                {processingSpinner ||
                                    // <Spinner size={size} />
                                    <>Spinner</>
                                }
                            </span>
                        )}
                        {typeof children !== "undefined" ? (
                            children
                        ) : (
                            <span data-testid="Theme-button-label" className={cn(theme.label)}>
                                {isProcessing ? processingLabel : label}
                            </span>
                        )}
                    </>
                </span>
            </ButtonBase>
        );
    },
) as ButtonComponentType;

ButtonComponent.displayName = "Button";

export const Button = (ButtonComponent)