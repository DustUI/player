export const Theme = {
  base: "dp-group dp-relative dp-flex dp-text-center dp-font-medium dp-transition-all focus:dp-z-10 focus:dp-outline-none",
  fullSized: "dp-w-full",
  color: {
    dark: "dp-border dp-border-gray-800 dp-bg-gray-800 dp-text-white focus:dp-ring-4 focus:dp-ring-gray-300 enabled:hover:dp-bg-gray-900 enabled:hover:dp-text-white dark:dp-border-gray-700 dark:dp-bg-gray-800 dark:focus:dp-ring-gray-800 dark:enabled:hover:dp-bg-gray-700",
    failure:
      "dp-border dp-border-red-700 dp-bg-red-700 dp-text-white focus:dp-ring-4 focus:dp-ring-red-300 enabled:hover:dp-bg-red-800 enabled:hover:dp-text-white dark:dp-bg-red-600 dark:focus:dp-ring-red-900 dark:enabled:hover:dp-bg-red-700",
    gray: "dp-border dp-border-gray-200 dp-bg-gray-200 dp-text-gray-900 focus:dp-text-cyan-700 focus:dp-ring-4 enabled:hover:dp-bg-gray-100 enabled:hover:dp-text-cyan-700 dark:dp-border-gray-600 dark:bg-transparent dark:text-gray-400 dark:enabled:hover:dp-bg-gray-700 dark:enabled:hover:dp-text-white",
    info: "dp-border dp-border-cyan-700 dp-bg-cyan-700 dp-text-white focus:dp-ring-4 focus:dp-ring-cyan-300 enabled:hover:dp-bg-cyan-800 enabled:hover:dp-text-white dark:dp-bg-cyan-600 dark:focus:dp-ring-cyan-800 dark:enabled:hover:dp-bg-cyan-700",
    light:
      "dp-border dp-border-gray-400 dp-bg-gray-400 dp-text-gray-900 focus:dp-ring-4 focus:dp-ring-[#FF3988] enabled:hover:dp-bg-[#FF3988] dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:focus:dp-ring-gray-700 dark:enabled:hover:dp-border-gray-700 dark:enabled:hover:dp-bg-gray-700",
    purple:
      "dp-border dp-border-purple-700 dp-bg-purple-700 dp-text-white focus:dp-ring-4 focus:dp-ring-purple-300 enabled:hover:dp-bg-purple-600 enabled:hover:dp-text-white dark:dp-bg-purple-600 dark:focus:dp-ring-purple-900 dark:enabled:hover:dp-bg-purple-700",
    success:
      "dp-border dp-border-green-700 dp-bg-green-700 dp-text-white focus:dp-ring-4 focus:dp-ring-green-300 enabled:hover:dp-bg-green-800 enabled:hover:dp-text-white dark:dp-bg-green-600 dark:focus:dp-ring-green-800 dark:enabled:hover:dp-bg-green-700",
    warning:
      "dp-border dp-border-yellow-400 dp-bg-yellow-400 dp-text-white focus:dp-ring-4 focus:dp-ring-yellow-300 enabled:hover:dp-bg-yellow-500 dark:focus:dp-ring-yellow-900",
    blue: "dp-border dp-border-blue-700 dp-bg-blue-700 dp-text-white focus:dp-ring-4 focus:dp-ring-blue-300 enabled:hover:dp-bg-blue-800 enabled:hover:dp-text-white dark:dp-bg-blue-600 dark:hover:bg-blue-700 dark:focus:dp-ring-blue-800",
    cyan: "dp-border dp-border-cyan-300 dp-bg-cyan-300 dp-text-cyan-900 focus:dp-ring-4 focus:dp-ring-cyan-300 enabled:hover:dp-bg-cyan-600 enabled:hover:dp-text-white dark:dp-border-cyan-600 dark:bg-cyan-600 dark:text-white dark:focus:dp-ring-cyan-700 dark:enabled:hover:dp-border-cyan-700 dark:enabled:hover:dp-bg-cyan-700",
    green:
      "dp-border dp-border-green-300 dp-bg-green-300 dp-text-green-900 focus:dp-ring-4 focus:dp-ring-green-300 enabled:hover:dp-bg-green-100 dark:border-green-600 dark:bg-green-600 dark:text-white dark:focus:dp-ring-green-700 dark:enabled:hover:dp-border-green-700 dark:enabled:hover:dp-bg-green-700",
    indigo:
      "dp-border dp-border-indigo-300 dp-bg-indigo-300 dp-text-indigo-900 focus:dp-ring-4 focus:dp-ring-indigo-300 enabled:hover:dp-bg-indigo-100 dark:border-indigo-600 dark:bg-indigo-600 dark:text-white dark:focus:dp-ring-indigo-700 dark:enabled:hover:dp-border-indigo-700 dark:enabled:hover:dp-bg-indigo-700",
    lime: "dp-border dp-border-lime-300 dp-bg-lime-300 dp-text-lime-900 focus:dp-ring-4 focus:dp-ring-lime-300 enabled:hover:dp-bg-lime-100 dark:border-lime-600 dark:bg-lime-600 dark:text-white dark:focus:dp-ring-lime-700 dark:enabled:hover:dp-border-lime-700 dark:enabled:hover:dp-bg-lime-700",
    pink: "dp-border dp-border-[#FF3988] dp-bg-[#FF3988] dp-text-white focus:dp-ring-4 focus:dp-ring-[#FF3988] enabled:hover:dp-bg-pink-600 dark:border-pink-600 dark:bg-pink-600 dark:text-white dark:focus:dp-ring-pink-700 dark:enabled:hover:dp-border-pink-700 dark:enabled:hover:dp-bg-pink-700",
    red: "dp-border dp-border-red-300 dp-bg-red-300 dp-text-red-900 focus:dp-ring-4 focus:dp-ring-red-300 enabled:hover:dp-bg-red-100 dark:border-red-600 dark:bg-red-600 dark:text-white dark:focus:dp-ring-red-700 dark:enabled:hover:dp-border-red-700 dark:enabled:hover:dp-bg-red-700",
    teal: "dp-border dp-border-teal-300 dp-bg-teal-300 dp-text-teal-900 focus:dp-ring-4 focus:dp-ring-teal-300 enabled:hover:dp-bg-teal-100 dark:border-teal-600 dark:bg-teal-600 dark:text-white dark:focus:dp-ring-teal-700 dark:enabled:hover:dp-border-teal-700 dark:enabled:hover:dp-bg-teal-700",
    yellow:
      "dp-border dp-border-yellow-300 dp-bg-yellow-300 dp-text-yellow-900 focus:dp-ring-4 focus:dp-ring-yellow-300 enabled:hover:dp-bg-yellow-100 dark:border-yellow-600 dark:bg-yellow-600 dark:text-white dark:focus:dp-ring-yellow-700 dark:enabled:hover:dp-border-yellow-700 dark:enabled:hover:dp-bg-yellow-700",
  },
  disabled: "dp-cursor-not-allowed dp-opacity-50",
  isProcessing: "dp-cursor-wait",
  spinnerSlot: "dp-absolute dp-top-0 dp-flex dp-h-full dp-items-center",
  spinnerLeftPosition: {
    xs: "dp-left-2",
    sm: "dp-left-3",
    md: "dp-left-4",
    lg: "dp-left-5",
    xl: "dp-left-6",
  },
  gradient: {
    cyan: "dp-bg-gradient-to-r dp-from-cyan-400 dp-via-cyan-500 dp-to-cyan-600 dp-text-white focus:dp-ring-4 focus:dp-ring-cyan-300 enabled:hover:dp-bg-gradient-to-br dark:focus:dp-ring-cyan-800",
    failure:
      "dp-bg-gradient-to-r dp-from-red-400 dp-via-red-500 dp-to-red-600 dp-text-white focus:dp-ring-4 focus:dp-ring-red-300 enabled:hover:dp-bg-gradient-to-br dark:focus:dp-ring-red-800",
    info: "dp-bg-gradient-to-r dp-from-cyan-500 dp-via-cyan-600 dp-to-cyan-700 dp-text-white focus:dp-ring-4 focus:dp-ring-cyan-300 enabled:hover:dp-bg-gradient-to-br dark:focus:dp-ring-cyan-800 ",
    lime: "dp-bg-gradient-to-r dp-from-lime-200 dp-via-lime-400 dp-to-lime-500 dp-text-gray-900 focus:dp-ring-4 focus:dp-ring-lime-300 enabled:hover:dp-bg-gradient-to-br dark:focus:dp-ring-lime-800",
    pink: "dp-bg-gradient-to-r dp-from-pink-400 dp-via-pink-500 dp-to-pink-600 dp-text-white focus:dp-ring-4 focus:dp-ring-[#FF3988] enabled:hover:dp-bg-gradient-to-br dark:focus:dp-ring-pink-800",
    purple:
      "dp-bg-gradient-to-r dp-from-purple-500 dp-via-purple-600 dp-to-purple-700 dp-text-white focus:dp-ring-4 focus:dp-ring-purple-300 enabled:hover:dp-bg-gradient-to-br dark:focus:dp-ring-purple-800",
    success:
      "dp-bg-gradient-to-r dp-from-green-400 dp-via-green-500 dp-to-green-600 dp-text-white focus:dp-ring-4 focus:dp-ring-green-300 enabled:hover:dp-bg-gradient-to-br dark:focus:dp-ring-green-800",
    teal: "dp-bg-gradient-to-r dp-from-teal-400 dp-via-teal-500 dp-to-teal-600 dp-text-white focus:dp-ring-4 focus:dp-ring-teal-300 enabled:hover:dp-bg-gradient-to-br dark:focus:dp-ring-teal-800",
  },
  gradientDuoTone: {
    cyanToBlue:
      "dp-bg-gradient-to-r dp-from-cyan-500 dp-to-cyan-500 dp-text-white focus:dp-ring-4 focus:dp-ring-cyan-300 enabled:hover:dp-bg-gradient-to-bl dark:focus:dp-ring-cyan-800",
    greenToBlue:
      "dp-bg-gradient-to-br dp-from-green-400 dp-to-cyan-600 dp-text-white focus:dp-ring-4 focus:dp-ring-green-200 enabled:hover:dp-bg-gradient-to-bl dark:focus:dp-ring-green-800",
    pinkToOrange:
      "dp-bg-gradient-to-br dp-from-pink-500 dp-to-orange-400 dp-text-white focus:dp-ring-4 focus:dp-ring-pink-200 enabled:hover:dp-bg-gradient-to-bl dark:focus:dp-ring-pink-800",
    purpleToBlue:
      "dp-bg-gradient-to-br dp-from-purple-600 dp-to-cyan-500 dp-text-white focus:dp-ring-4 focus:dp-ring-cyan-300 enabled:hover:dp-bg-gradient-to-bl dark:focus:dp-ring-cyan-800",
    purpleToPink:
      "dp-bg-gradient-to-r dp-from-purple-500 dp-to-pink-500 dp-text-white focus:dp-ring-4 focus:dp-ring-purple-200 enabled:hover:dp-bg-gradient-to-l dark:focus:dp-ring-purple-800",
    redToYellow:
      "dp-bg-gradient-to-r dp-from-red-200 dp-via-red-300 dp-to-yellow-200 dp-text-gray-900 focus:dp-ring-4 focus:dp-ring-red-100 enabled:hover:dp-bg-gradient-to-bl dark:focus:dp-ring-red-400",
    tealToLime:
      "dp-bg-gradient-to-r dp-from-teal-200 dp-to-lime-200 dp-text-gray-900 focus:dp-ring-4 focus:dp-ring-lime-200 enabled:hover:dp-bg-gradient-to-l enabled:hover:dp-from-teal-200 enabled:hover:dp-to-lime-200 enabled:hover:dp-text-gray-900 dark:focus:dp-ring-teal-700",
  },
  inner: {
    base: "dp-flex dp-transition-all dp-duration-200",
    position: {
      none: "",
      start: "dp-rounded-r-none",
      middle: "dp-rounded-none",
      end: "dp-rounded-l-none",
    },
    outline: "dp-border dp-border-transparent",
    isProcessingPadding: {
      xs: "dp-pl-8",
      sm: "dp-pl-10",
      md: "dp-pl-12",
      lg: "dp-pl-16",
      xl: "dp-pl-20",
    },
  },
  label:
    "dp-ml-2 dp-inline-flex dp-h-4 dp-w-4 dp-items-center dp-justify-center dp-rounded-full dp-bg-cyan-200 dp-text-xs dp-font-semibold dp-text-cyan-800",
  outline: {
    color: {
      gray: "dp-border dp-border-gray-900 dark:dp-border-white",
      default: "dp-border-0",
      light: "",
    },
    off: "",
    on: "dp-bg-white dp-text-gray-900 dp-transition-all dp-duration-75 dp-ease-in group-enabled:group-hover:dp-bg-opacity-0 group-enabled:group-hover:dp-text-inherit dark:dp-bg-gray-900 dark:dp-text-white",
    pill: {
      off: "dp-rounded-md",
      on: "dp-rounded-full",
    },
  },
  pill: {
    off: "dp-rounded-lg",
    on: "dp-rounded-full",
  },
  size: {
    xs: "dp-px-2 dp-py-1 dp-text-xs",
    sm: "dp-px-3 dp-py-1.5 dp-text-sm",
    md: "dp-px-4 dp-py-2 dp-text-sm",
    lg: "dp-px-5 dp-py-2.5 dp-text-base",
    xl: "dp-px-6 dp-py-3 dp-text-base",
  },
  icon: {
    xs: "dp-w-6 dp-h-6 dp-text-base dp-flex dp-items-center dp-justify-center",
    sm: "dp-w-8 dp-h-8 dp-text-lg dp-flex dp-items-center dp-justify-center",
    md: "dp-w-10 dp-h-10 dp-text-lg dp-flex dp-items-center dp-justify-center",
    lg: "dp-w-12 dp-h-12 dp-text-2xl dp-flex dp-items-center dp-justify-center",
    xl: "dp-w-16 dp-h-16 dp-text-3xl dp-flex dp-items-center dp-justify-center",
  },
};

export interface ThemeBoolean {
  off: string;
  on: string;
}

export interface ThemeStateColors {
  info: string;
  failure: string;
  success: string;
  warning: string;
}

export interface ThemeColors extends ThemeStateColors {
  [key: string]: string;
  blue: string;
  cyan: string;
  dark: string;
  gray: string;
  green: string;
  indigo: string;
  light: string;
  lime: string;
  pink: string;
  purple: string;
  red: string;
  teal: string;
  yellow: string;
}

export interface ThemeGradientColors extends Omit<ThemeStateColors, "warning"> {
  [key: string]: string;
  cyan: string;
  lime: string;
  pink: string;
  purple: string;
  teal: string;
}

export interface ThemeGradientDuoToneColors {
  cyanToBlue: string;
  greenToBlue: string;
  pinkToOrange: string;
  purpleToBlue: string;
  purpleToPink: string;
  redToYellow: string;
  tealToLime: string;
}

export type ThemeHeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface ThemePositions {
  "bottom-left": string;
  "bottom-right": string;
  "bottom-center": string;
  "top-left": string;
  "top-center": string;
  "top-right": string;
  "center-left": string;
  center: string;
  "center-right": string;
}

export interface ThemeSizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
  "5xl": string;
  "6xl": string;
  "7xl": string;
}

export interface ThemeContentPositions {
  center: string;
}
