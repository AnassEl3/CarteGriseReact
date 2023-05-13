/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/preline/dist/*.js",
    ],
    // force classes to be included in build file
    safelist: [
        {
            pattern: /text-(xs|sm|md|lg|xl)/,
            variants: ['hover', 'focus', 'dark'],
        },
        {
            pattern: /bg-(primary|secondary|success|warning|danger)/,
            variants: ['hover', 'focus', 'dark'],
        },
        {
            pattern: /bg-(primary|secondary|success|warning|danger)-(50|100|200|300|400|500|600|700|800|900|950)/,
            variants: ['hover', 'focus', 'dark'],
        },
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    ...colors.purple,
                    DEFAULT: colors.purple[800],
                },
                secondary: {
                    ...colors.stone,
                    DEFAULT: colors.stone[800],
                },
                tertiary: {
                    ...colors.amber,
                    DEFAULT: colors.amber[300],
                },
                info: {
                    ...colors.purple,
                    DEFAULT: colors.purple[800],
                },
                success: {
                    ...colors.green,
                    DEFAULT: colors.green[600],
                },
                warning: {
                    ...colors.yellow,
                    DEFAULT: colors.yellow[600],
                },
                danger: {
                    ...colors.rose,
                    DEFAULT: colors.rose[600],
                },
            },
        },
    },
    darkMode: "class",
    plugins: [require("preline/plugin")],
};
