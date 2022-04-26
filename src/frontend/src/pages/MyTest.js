import '../App.css'
import hero from '../assets/hero.png'
import favicon from '../assets/favicon.png'
import { useState, useEffect } from 'react'
import axios from 'axios'

function MyTest() {
  const [flight, setFlight] = useState([]);

  const getFlights = async () => {
    const response = await axios.get('https://api.spaceflightnewsapi.net/v3/articles');
    
    setFlight(response.data);
  } 

  useEffect(() => {
    getFlights();
  }, []);

  return (
    <div className="">
     {/* <div className="flex items-center justify-center h-20 bg-slate-600">
      <div className="test">
        AlgeoComeback!
      </div>
     </div> */}
     <div className="flex justify-center my-5 gap-x-5 ">
      <div className="flex basis-1/4 items-center justify-center h-20 bg-color-1 rounded-lg">
          Color1
      </div>
      <div className="flex basis-1/4 items-center justify-center h-20 bg-bcolor-1 rounded-lg">
          bColor1
      </div>
      <div className="flex basis-1/4 items-center justify-center h-20 bg-bcolor-2 rounded-lg">
          bColor2
      </div>
     </div>
      <div className="flex justify-center mt-3">
        <img src={hero} alt=""></img>
        <img src={favicon} alt=""></img>
      </div>
     {flight.map((item, idx) => {
       return (
        <a key={idx} href={item.url}  target="_blank" rel="noopener noreferrer" className="box flex flex-col items-center justify-center bg-green-600 shadow-lg hover:bg-slate-600 hover:text-white">
          <div>{item.id}</div>
          <div>{item.title}</div>
        </a>
       );
     })}

    </div>
  );
}

export default MyTest;
