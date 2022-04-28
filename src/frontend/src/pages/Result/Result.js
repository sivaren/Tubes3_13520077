import './Result.css'
import { useState, useEffect } from 'react';
import axios from 'axios'

function Result() {
    const [searchValue, setSearchValue] = useState('');
    const [results, setResults] = useState([
        {
            date: '13 April 2022',
            name: 'Fulan',
            disease: 'HIV',
            prediction: 'True'
        },
        {
            date: '26 Januari 2023',
            name: 'Fulin',
            disease: 'Anemia',
            prediction: 'False'
        }
    ]);

    const getResults = async () => {
        const response = await axios.get('link-here');
        setResults(response.data);
    }

    useEffect(function () {
        document.title='Test Results | Algeo Comeback';
    }, []);
    

    return (
        <>
            <div className="main-page container flex flex-col pl-10 w-4/5">
                <div className="flex-wrap py-4">
                    <h1 className="text-white drop-shadow-lg">TEST RESULTS</h1>
                </div>
                <div className="flex-wrap">
                    <input 
                        type="text"
                        onChange={(event) => setSearchValue(event.target.value)}
                        className="input-result my-1 px-3 py-2 shadow-lg 
                        focus:border-color-1 focus:ring-color-1 focus:ring-2 
                        placeholder:italic transition" 
                        placeholder="search..."
                        name="inputResult"
                    />
                </div>
                <div className="flex flex-col my-7 gap-y-4 text-color-1">
                    { results.length > 0 ? 
                        results.map((item, key) => {
                            return(
                                <div key={key} className="result-item flex justify-center text-center p-5">
                                    <h2>{key+1}. {item.date} - {item.name} - {item.disease} - {item.prediction}</h2>
                                </div>
                            );
                        })
                    : 
                        <div className="result-item flex justify-center text-center p-5">
                            <h2>EMPTY TEST RESULT</h2>
                        </div>
                    }
                </div>
                <div className="test-css flex flex-col my-5 mr-10 items-center justify-center py-5 bg-slate-400">
                    <div>{ searchValue }</div>
                </div>
           </div>
        </>
    );
}

export default Result;
