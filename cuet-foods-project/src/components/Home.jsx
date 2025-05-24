import Banner from "./Banner";
import AvailableVendors from "./Pages/AvailableVendors";



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className="my-10">
                <AvailableVendors></AvailableVendors>
            </div>
            
            
        </div>
    );
};

export default Home;