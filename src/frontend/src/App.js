import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [flight, setFlight] = useState([]);

  const getFlights = async () => {
    const response = await axios.get('https://api.spaceflightnewsapi.net/v3/articles');
    
    setFlight(response.data);
  } 

  useEffect(() => {
    getFlights();
  }, []);

  return (
    <div className="App">
     <div className="flex items-center justify-center h-20 bg-slate-600">
      <div className="test">
        AlgeoComeback!
      </div>
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

export default App;
