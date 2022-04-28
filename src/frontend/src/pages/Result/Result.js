import './Result.css'
import axios from 'axios'
import { 
    searchValidation1, 
    searchValidation2,
    searchValidation3,
} from '../../utils/SearchValidation';
import { useState, useEffect } from 'react';

function Result() {
    const [searchValue, setSearchValue] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getResults = async () => {
        try {
            // route: http://localhost:8080/api/v1/search
            const response = await axios.post('http://localhost:8080/api/v1/search', {});
            setResults(response.data.data);
            console.log(response.data.data);
        } catch (err) {
            console.error(err);
        }
        setIsLoading(false);
    }

    useEffect(function () {
        document.title='Test Results | Algeo Comeback';
        getResults();
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
                        onChange={ (e) => setSearchValue(e.target.value) }
                        name="inputResult"
                        className="input-result my-1 px-3 py-2 shadow-lg 
                            focus:border-color-1 focus:ring-color-1 focus:ring-2 
                            placeholder:italic transition" 
                        placeholder="search..."
                    />
                </div>
                <div className="flex flex-col my-7 gap-y-4 text-color-1">
                    { 
                        isLoading ? 
                            <div className="result-loading flex justify-center text-center p-5">
                                <h2> - LOADING - </h2>
                            </div>
                        : 
                            results.length > 0 ? 
                                results.filter((val) => {
                                    if(searchValue === "") {
                                        return val
                                    } else if (searchValidation1(searchValue, val)) {
                                        return val
                                    } else if (searchValidation2(searchValue, val)) {
                                        return val
                                    } else if (searchValidation3(searchValue, val)) {
                                        return val
                                    } 
                                    }).map((item, key) => {
                                        return (
                                            <div key={ key } className="result-item flex justify-center text-center p-5">
                                                <h2>
                                                    { key + 1 }. { item.tanggal_prediksi } - { item.nama_pasien } - { item.penyakit_prediksi } - { item.accuracy }% - { item.status_prediksi ? 'True' : 'False' }
                                                </h2>
                                            </div>
                                        );
                                })
                            : 
                                <div className="result-item flex justify-center text-center p-5">
                                    <h2>EMPTY TEST RESULT</h2>
                                </div>
                    }
                </div>
           </div>
        </>
    );
}

export default Result;
