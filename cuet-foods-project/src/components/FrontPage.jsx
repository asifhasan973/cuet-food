


import { Outlet } from 'react-router-dom';
import Navbar from './Shared/Navbar';
import Footer from './Shared/Footer';

const FrontPage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
           <Footer></Footer>
        </div>
    );
};

export default FrontPage;