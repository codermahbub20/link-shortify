import FeaturesAndCTASection from "../FeaturesSection/FeaturesSection";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import UrlShortenerSection from "../UrlShortenerSection/UrlShortenerSection";


const Home = () => {
    return (
        <div>
          <Navbar/>
            <UrlShortenerSection/>
            <FeaturesAndCTASection/>
           <Footer/>
        </div>
    );
};

export default Home;