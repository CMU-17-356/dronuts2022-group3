import './App.css';

import Home from './components/Home/Home';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from "./components/Theme/Theme";
import Orders from './components/Dashboard/Orders';
import Dashboard from './components/Dashboard/Dashboard';

import ResponsiveAppBar from './components/Home/ResponsiveAppBar';
import TrackOrder from './components/Customer/TrackOrder';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useMatch,
    useParams
  } from "react-router-dom";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ResponsiveAppBar></ResponsiveAppBar>
        <Routes>
          <Route path="/customer" element={<TrackOrder />} />
          <Route path="/employee" element={<Dashboard />} />
          <Route path="" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </Router>

  );
}

export default App;
