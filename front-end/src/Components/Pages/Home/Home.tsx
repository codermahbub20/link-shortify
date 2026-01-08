import FeaturesAndCTASection from "../FeaturesSection/FeaturesSection";
import Navbar from "../Navbar/Navbar";
import UrlShortenerSection from "../UrlShortenerSection/UrlShortenerSection";


const Home = () => {
    return (
        <div>
            <Navbar/>
            <UrlShortenerSection/>
            <FeaturesAndCTASection/>
           
        </div>
    );
};

export default Home;