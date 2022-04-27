import './Home.css'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
           <div className="home-title flex items-center pl-10 w-4/5 bg-red-400">
                <div className="flex flex-wrap w-1/2">
                    <h1>DNA PATTERN MATCHING</h1>
                </div>
           </div>
           <div className="flex justify-center items-center pb-7 w-full bg-red-400">
                <Link to="/test-dna" className="get-started rounded-lg shadow-lg bg-bcolor-2 transition">
                    <h2>GET STARTED</h2>
                </Link>
           </div>
        </>
    );
}

export default Home;
