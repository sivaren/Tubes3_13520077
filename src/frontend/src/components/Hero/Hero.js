import './Hero.css'
import hero from '../../assets/hero.png'

function Hero() {

    return (
        <>
            <div className="hero flex items-center">
                <div className="ml-5">
                    <img src={hero} alt ="hero" /> 
                </div>
            </div>
            <div className="h-24 w-100"></div>
        </>
    );
}
  
export default Hero;
