import './Test.css'
import { dnaValidation } from '../../utils/DNAValidation';
import Switch from '../../components/Switch/Switch'
import { useState, useEffect } from 'react';
import axios from 'axios';

function Test() {
    const [patientName, setPatientName] = useState('');
    const [patientDna, setPatiendna] = useState('');
    const [diseasePrediction, setDiseasePrediction] = useState('');
    const [isKMP, setIsKMP] = useState(false);
    const [validDna, setValidDna] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fileHandler = (e) => { 
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            setPatiendna(reader.result);
        }
        reader.onerror = () => {
            console.log('file error', reader.error);
        }
    }

    const testDna = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setIsLoading(true);

        if (dnaValidation(patientDna)) {
            setValidDna(true)
            var method = 'KMP';
            if(!isKMP) {
                method = 'Boyer Moore'
            } 

            const data = {
                nama_pasien: patientName,
                penyakit_prediksi: diseasePrediction,
                method: method,
                text: patientDna,
            };
            
            try {
                // http://localhost:8080/api/v1/test
                const response = await axios.post('http://localhost:8080/api/v1/test', data);
                console.log('Ini return dari POST: ');
                console.log(response.data.data);
            } catch (err) {
                console.error(err);
                // error handling
            }
            setIsLoading(false);
        }
        else {
            setValidDna(false)
        }
    }

    useEffect(function () {
        document.title='Test DNA | Algeo Comeback';
    }, []);

    return (
        <>
            <div className="main-page container flex flex-col pl-10 w-4/5">
                <div className="flex-wrap py-4">
                    <h1>TEST DNA</h1>
                </div>
                <div className="flex-wrap">
                    <form onSubmit={ testDna }>
                        <div className="flex">
                            <div className="flex-col basis-1/2">
                                <h2 className="text-color-1 h2-shadow">Patient Name</h2>
                                <input 
                                    type="text"
                                    onChange={(event) => setPatientName(event.target.value)}
                                    value={patientName}
                                    className="input-text double-text my-1 px-3 py-2 shadow-lg 
                                    focus:border-color-1 focus:ring-color-1 focus:ring-2 transition" 
                                    name="inputPatient"
                                    required
                                />
                            </div>
                            <div className="flex-col basis-1/2">
                                <h2 className="text-color-1 h2-shadow">Disease Prediction</h2>
                                <input 
                                    type="text"
                                    onChange={(event) => setDiseasePrediction(event.target.value)}
                                    value={diseasePrediction}
                                    className="input-text double-text my-1 px-3 py-2 shadow-lg 
                                    focus:border-color-1 focus:ring-color-1 focus:ring-2 transition" 
                                    name="inputPrediction"
                                    required
                                />
                            </div>
                        </div>

                        <h2 className="text-color-1 h2-shadow mt-2 mb-1">Sequence DNA</h2>
                        <input 
                            type="file" 
                            onChange={ fileHandler }
                            className="input-file text-color-1
                            file:mt-1 file:mb-2 file:py-2 file:px-4
                            file:rounded-lg file:shadow-lg file:border-0
                            file:bg-bcolor-1"
                            name="inputFile"
                            required
                        />
                        <div className="flex items-center mt-6 gap-x-5">
                            <p className="text-2xl text-white">Boyer Moore</p>
                            <Switch isToggled={isKMP} onToggle={() => setIsKMP(!isKMP)}/>
                            <p className="text-2xl text-white">KMP</p>
                        </div>
                        <button type="submit" className="submit-btn flex justify-center my-8 py-3 bg-bcolor-2">
                            <h2>SUBMIT</h2>
                        </button>
                    </form>
                </div>
                { 
                    submitted && (
                        validDna ? (
                            isLoading ? 
                                <div className="alert-loading test-css flex flex-col mb-10 mr-10 items-center justify-center py-5">
                                    <h2> - LOADING - </h2>
                                </div>
                            :
                                <div className="alert-success flex flex-col mb-10 mr-10 p-5 items-center justify-center text-center">
                                    <h2>28 April 2022 - Fulan - Herpes - False</h2>
                                </div>
                        )
                        :
                        <div className="alert-danger test-css flex flex-col mb-10 mr-10 p-5 items-center text-center justify-center">
                            <h2> - INVALID DNA - </h2>
                        </div>
                    )
                }
           </div>
        </>
    );
}

export default Test;
