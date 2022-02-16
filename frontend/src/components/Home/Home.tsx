
import ResponsiveAppBar from './ResponsiveAppBar';
import TrackOrder from '../Customer/TrackOrder';

function App() {
  return TrackOrder();
}


export default function Home() {
    return (
        <>
            <ResponsiveAppBar></ResponsiveAppBar>
            <TrackOrder></TrackOrder>
        </>
    );
}

