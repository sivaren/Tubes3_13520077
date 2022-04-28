import './Home.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
    useEffect(function () {
        document.title='Home | Algeo Comeback'
    }, []);

    return (
        <>
           <div className="home-title flex items-center pl-10 w-4/5 ">
                <div className="flex flex-wrap w-1/2">
                    <h1>DNA PATTERN MATCHING</h1>
                </div>
           </div>
           <div className="flex justify-center h-40 w-full ">
                <Link to="/test-dna" className="get-started py-8 rounded-lg bg-bcolor-2 transition">
                    <h2>GET STARTED</h2>
                </Link>
           </div>
        </>
    );
}

export default Home;
