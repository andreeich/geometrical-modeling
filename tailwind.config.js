// eslint-disable-next-line no-undef
const daisyuiThemes = require("daisyui/src/theming/themes");

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    // ? disable all colors
    themes: ["wireframe"],
    // ? default light and dark themes
    // themes: false,
    // ? customizing themes
    // themes: [
    //   {
    //     light: {
    //       ...daisyuiThemes["[data-theme=light]"],
    //       // ? colors
    //       primary: "#2563eb",
    //       secondary: "#c026d3",
    //       // accent: '#1fb2a6',
    //       // neutral: '#2a323c',
    //       // 'base-100': '#1d232a',
    //       // 'base-200': 'optional',
    //       // 'base-300': 'optional',
    //       // 'info': '#3abff8',
    //       success: "#36d399",
    //       // 'warning': '#fbbd23',
    //       error: "#f87272",

    //       // ? border radius rounded-box utility class, used in card and other large boxes
    //       // '--rounded-box': '1rem',
    //       // ? border radius rounded-btn utility class, used in buttons and similar element
    //       // '--rounded-btn': '0.5rem',
    //       // ? border radius rounded-badge utility class, used in badges and similar
    //       // '--rounded-badge': '1.9rem',
    //       // ? duration of animation when you click on button
    //       // '--animation-btn': '0.25s',
    //       // ? duration of animation for inputs like checkbox, toggle, radio, etc
    //       // '--animation-input': '0.2s',
    //       // ? set default text transform for buttons
    //       // '--btn-text-case': 'uppercase',
    //       // ? scale transform of button when you focus on it
    //       // '--btn-focus-scale': '0.95',
    //       // ? border width of buttons
    //       // '--border-btn': '1px',
    //       // ? border width of tabs
    //       // '--tab-border': '1px',
    //       // ? border radius of tabs
    //       // '--tab-radius': '0.5rem',
    //       // ? components
    //       // '.btn': {
    //       //   'border-radius': '0px',
    //       // },
    //     },
    //     // dark: {
    //     //   ...daisyuiThemes['[data-theme=dark]'],
    //     //   // ? colors
    //     //   primary: '#2563eb',
    //     //   secondary: '#c026d3',
    //     // },
    //   },
    //   // ? default dark mode
    //   // 'dark',
    // ],
    // ? name of one of the included themes for dark mode
    // darkTheme: 'dark',
    // ? applies background color and foreground color for root element by default
    // base: false,
    // ? include daisyUI colors and design decisions for all components
    // styled: false,
    // ? adds responsive and modifier utility classes html tag and install `
    // ? tailwindcss-flip` plugin for Tailwind CSS.
    // utils: false,
    // ? prefix for daisyUI classnames
    // ? (components, modifiers and responsive class names. Not colors)
    // prefix: 'dl-',
    // ? Shows info about daisyUI version and used config in the console when building your CSS
    // logs: false,
  },
};
