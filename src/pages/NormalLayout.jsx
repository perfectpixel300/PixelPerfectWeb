import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ScrollToTop from "../components/ScrollToTop"
import HoverButton from "../components/HoverButton"
import HeroSlider from "../components/HeroSlider"

const NormalLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <HoverButton />
            <ScrollToTop />
            {children}
            <div className="mt-10">
                <HeroSlider />
            </div>

            <Footer />
        </>
    )
}

export default NormalLayout