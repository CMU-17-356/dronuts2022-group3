// <palette>
//   <color name="Raw Sienna" hex="D47F53" r="212" g="127" b="83" />
//   <color name="Slate Gray" hex="6F7D8C" r="111" g="125" b="140" />
//   <color name="China Pink" hex="ED71AB" r="237" g="113" b="171" />
//   <color name="Amaranth Pink" hex="F190BD" r="241" g="144" b="189" />
//   <color name="Cultured" hex="F0F0F0" r="240" g="240" b="240" />
//   <color name="White" hex="FEFEFE" r="254" g="254" b="254" />
// </palette>

import { createTheme } from '@mui/material/styles';


const theme = createTheme({
palette: {
    primary: {
        main: '#6f7d8c',
    },
    secondary: {
        main: '#f190bd',
    },
    error: {
        main: '#d47f53',
    },
    success: {
        main: '#fefefe',
    },
    info: {
        main: '#f0f0f0',
    },
    background: {
        default: '#fafafa',
    },
    warning: {
        main: '#d47f53',
    },
    },
});

export default theme;