import stationery from '../assets/stationery.jpg'
import gifts from '../assets/gifts.png'
import studio from '../assets/studio.png'

const HeroSlider = ({imageCount , className}) => {
    if(imageCount == 0){
        return <img className={className} src={stationery} alt="image 1" />
    }
    else if(imageCount == 1){
        return <img className={className} src={gifts} alt="image 2" />
    }
    else if(imageCount == 2){
        return <img className={className} src={studio} alt="image 3" />
    }
}

export default HeroSlider