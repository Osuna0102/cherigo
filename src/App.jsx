import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] max-h-screen h-16">
      <Header />
      <div className="flex flex-col h-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;