import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import './App.css';
import Cart from './components/Customer/Cart';
import CustomerMenu from './components/Customer/CustomerMenu';
import TrackOrder from './components/Customer/TrackOrder';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';
import Home from './components/Home/Home';
import ResponsiveAppBar from './components/Home/ResponsiveAppBar';
import theme from "./components/Theme/Theme";




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
