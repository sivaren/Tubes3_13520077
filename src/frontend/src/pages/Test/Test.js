import { useState, useEffect } from 'react';
import './Test.css'

function Test() {
    const [patientName, setPatientName] = useState('');
    const [patientDna, setPatiendna] = useState('');
    const [diseasePrediction, setDiseasePrediction] = useState('');

    useEffect(function () {
        document.title='Test DNA | Algeo Comeback';
    }, []);

    function fileHandler(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            setPatiendna(reader.result);
        }
        reader.onerror = () => {
            console.log('file error', reader.error);
        }
    }

    return (
        <>
            <div className="test-page container flex flex-col pl-10 w-4/5 bg-red-400">
                <div className="flex-wrap py-4">
                    <h1 className="text-white drop-shadow-lg">TEST DNA</h1>
                </div>
                <div className="flex-wrap">
                    <form>
                        <div className="flex">
                            <div className="flex-col basis-1/2">
                                <h2 className="text-color-1 drop-shadow-md">Patient Name</h2>
                                <input 
                                    type="text"
                                    onChange={(event) => setPatientName(event.target.value)}
                                    className="input-patient my-1 px-3 py-2 shadow-lg 
                                    focus:border-color-1 focus:ring-color-1 focus:ring-2 transition" 
                                    name="inputPatient"
                                    required
                                />
                            </div>
                            <div className="flex-col basis-1/2">
                                <h2 className="text-color-1 drop-shadow-md">Disease Prediction</h2>
                                <input 
                                    type="text"
                                    onChange={(event) => setDiseasePrediction(event.target.value)}
                                    className="input-prediction my-1 px-3 py-2 shadow-lg 
                                    focus:border-color-1 focus:ring-color-1 focus:ring-2 transition" 
                                    name="inputPrediction"
                                    required
                                />
                            </div>
                        </div>

                        <h2 className="text-color-1 drop-shadow-md mt-2 mb-1">Sequence DNA</h2>
                        <input 
                            type="file" 
                            onChange={(event) => fileHandler(event)}
                            className="input-txt text-color-1
                            file:mt-1 file:mb-2 file:py-2 file:px-4
                            file:rounded-lg file:shadow-lg file:border-0
                            file:bg-bcolor-1"
                            name="inputTxt"
                            required
                        />
                        <button className="test-btn flex justify-center my-8 py-3 bg-bcolor-2">
                            <h2>SUBMIT</h2>
                        </button>
                    </form>
                </div>
                <div className="test-css flex flex-col mr-10 items-center justify-center py-5 bg-slate-400">
                    <div>{ patientName }</div>
                    <div>{ patientDna }</div>
                    <div>{ diseasePrediction }</div>
                </div>
           </div>
        </>
    );
}

export default Test;
