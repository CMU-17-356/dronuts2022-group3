import './App.css';

import Home from './components/Home/Home';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from "./components/Theme/Theme";

import ResponsiveAppBar from './components/Home/ResponsiveAppBar';
import CustomerMenu from './components/Customer/CustomerMenu';
import TrackOrder from './components/Customer/TrackOrder';
import Cart from './components/Customer/Cart';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';

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
          <Route path="/customer" element={<CustomerMenu />} />
          <Route path="/order" element={<TrackOrder />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </Router>

  );
}

export default App;
