import { extendTheme } from 'native-base';

export const theme = extendTheme({
    colors: {
        gallery: {
            DEFAULT: '#EBEBEB',
            '50': '#FFFFFF',
            '100': '#FFFFFF',
            '200': '#FFFFFF',
            '300': '#FFFFFF',
            '400': '#FFFFFF',
            '500': '#EBEBEB',
            '600': '#CFCFCF',
            '700': '#B3B3B3',
            '800': '#979797',
            '900': '#7B7B7B',
        },
        tango: {
            DEFAULT: '#F37124',
            50: '#FFFEFE',
            100: '#FEEEE5',
            200: '#FBCFB5',
            300: '#F8B085',
            400: '#F69054',
            500: '#F37124',
            600: '#D8580C',
            700: '#A84409',
            800: '#773107',
            900: '#471D04',
        },
    },
    fontConfig: {
        SFText: {
            400: {
                normal: 'SFTextRegular',
            },

            500: {
                normal: 'SFTextMedium',
            },
            600: {
                normal: 'SFTextSemibold',
            },
            700: {
                normal: 'SFTextBold',
            },
        },
    },
    fonts: {
        heading: 'SFText',
        body: 'SFText',
        mono: 'SFText',
    },
});
