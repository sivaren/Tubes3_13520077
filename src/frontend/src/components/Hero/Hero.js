import { Link } from 'react-router-dom';
import './Hero.css'
import hero from '../../assets/hero.png'

function Hero() {

    return (
        <>
            <div className="hero z-40 flex items-center">
                <div className="ml-5">
                    <Link to='/'>
                        <img src={hero} alt ="hero" /> 
                    </Link>
                </div>
            </div>
            <div className="h-24 w-100"></div>
        </>
    );
}
  
export default Hero;
