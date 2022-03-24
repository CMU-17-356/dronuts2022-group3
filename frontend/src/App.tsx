import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Cart from './components/Customer/Cart';
import CustomerMenu from './components/Customer/CustomerMenu';
import { CustomerSignUp } from './components/Customer/CustomerSignUp';
import TrackOrder from './components/Customer/TrackOrder';
import { Donut } from './components/Dronut/Donut';
import Donuts from './components/Dronut/Donuts';
import DonutList from './components/Dronut/DonutList';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';
import Orders from './components/Order/Orders';
import OrderList from './components/Order/OrderList';
import Order from './components/Order/Order';
import Home from './components/Home/Home';
import Login from './components/Home/Login';
import ResponsiveAppBar from './components/Home/ResponsiveAppBar';
import theme from './components/Theme/Theme';

function App() {
  let navigate = useNavigate();
  const { pathname } = useLocation();
  const donutOnClick = (donut) => {
    console.log('donut clicked' + donut);
    navigate(pathname + '/' + donut._id);
  };
  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResponsiveAppBar></ResponsiveAppBar>
      <Routes>
        <Route path="/customer" element={<CustomerMenu />} />
        <Route path="/order" element={<TrackOrder />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<CustomerSignUp />}/>
        <Route path="/employee" element={<EmployeeDashboard />}>
          <Route path="dashboard" element={<Orders />} />
          <Route path="orders" element={<Orders />}>
            <Route path="" element={<OrderList />} />
            <Route path=":id" element={<Order />} />
          </Route>
          <Route path="donuts" element={<Donuts />}>
            <Route path=":id" element={<Donut />} />
            <Route
              path=""
              element={<DonutList onClick={donutOnClick} text="View" />}
            />
          </Route>
        </Route>
        <Route path="" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;