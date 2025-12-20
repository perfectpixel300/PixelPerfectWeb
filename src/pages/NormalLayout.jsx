import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ScrollToTop from "../components/ScrollToTop"
import HoverButton from "../components/HoverButton"

const NormalLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <HoverButton />
            <ScrollToTop />
            {children}

            <Footer />
        </>
    )
}

export default NormalLayout