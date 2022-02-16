import './App.css';

import Home from './components/Home/Home';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from "./components/Theme/Theme";

function App() {
  return (<ThemeProvider theme={theme}>
    <CssBaseline />
    <Home />
  </ThemeProvider>);
}

export default App;
