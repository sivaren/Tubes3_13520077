import './Test.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Switch from '../../components/Switch/Switch';
import { dnaValidation } from '../../utils/DNAValidation';

function Test() {
    // input operations
    const [patientName, setPatientName] = useState('');
    const [patientDna, setPatienDna] = useState('');
    const [diseasePrediction, setDiseasePrediction] = useState('');
    const [isKMP, setIsKMP] = useState(false);
    // after submit operations
    const [validDna, setValidDna] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(true);
    const [predictionResult, setPredictionResult] = useState({});

    const fileHandler = (e) => { 
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            setPatienDna(reader.result);
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
            // conditional turn boolean isKMP into String
            var method = 'KMP';
            if(!isKMP) {
                method = 'Boyer Moore'
            } 

            // construct data send to backend
            const data = {
                nama_pasien: patientName,
                penyakit_prediksi: diseasePrediction,
                method: method,
                text: patientDna,
            };
            
            // route: http://localhost:8080/api/v1/test
            await axios.post('http://localhost:8080/api/v1/test', data)
                .then(response => {
                    console.log('POST Return: ');
                    console.log(response.data);
                    if(response.data.message === 400) {
                        setIsSuccess(false);
                    } 
                    else {
                        setIsSuccess(true);
                        setPredictionResult(response.data.data);
                    }
                })
                .catch(err => {
                    console.log(err);
                    setIsSuccess(false);
                });
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
                                    onChange={ (e) => setPatientName(e.target.value) }
                                    value={ patientName }
                                    name="inputPatient"
                                    className="input-text double-text my-1 px-3 py-2 shadow-lg 
                                        focus:border-color-1 focus:ring-color-1 focus:ring-2 transition" 
                                    required
                                />
                            </div>
                            <div className="flex-col basis-1/2">
                                <h2 className="text-color-1 h2-shadow">Disease Prediction</h2>
                                <input 
                                    type="text"
                                    onChange={ (e) => setDiseasePrediction(e.target.value) }
                                    value={ diseasePrediction }
                                    name="inputPrediction"
                                    className="input-text double-text my-1 px-3 py-2 shadow-lg 
                                        focus:border-color-1 focus:ring-color-1 focus:ring-2 transition" 
                                    required
                                />
                            </div>
                        </div>

                        <h2 className="text-color-1 h2-shadow mt-2 mb-1">Sequence DNA</h2>
                        <input 
                            type="file" 
                            onChange={ fileHandler }
                            name="inputFile"
                            className="input-file text-color-1
                                file:mt-1 file:mb-2 file:py-2 file:px-4
                                file:rounded-lg file:shadow-lg file:border-0
                                file:bg-bcolor-1"
                            required
                        />

                        <div className="flex items-center mt-6 gap-x-5">
                            <p className="text-2xl text-white">Boyer Moore</p>
                            <Switch isToggled={ isKMP } onToggle={ () => setIsKMP(!isKMP) }/>
                            <p className="text-2xl text-white">KMP</p>
                        </div>

                        <button type="submit" className="submit-btn flex justify-center my-8 py-3 bg-bcolor-2">
                            <h2>SUBMIT</h2>
                        </button>
                    </form>
                </div>
                { 
                    submitted && (
                        validDna ? 
                            isLoading ? 
                                <div className="alert alert-loading alert-space flex flex-col items-center justify-center mb-10 mr-10 py-5">
                                    <h2> - LOADING - </h2>
                                </div>
                            :
                                isSuccess ?
                                    <div className="alert alert-success flex flex-col items-center justify-center mb-10 mr-10 p-5 text-center">
                                        <h2>
                                            { predictionResult.tanggal_prediksi } - { predictionResult.nama_pasien } - { predictionResult.penyakit_prediksi } - { predictionResult.accuracy }% - { predictionResult.status_prediksi ? 'True' : 'False' }
                                        </h2>
                                    </div>
                                :
                                    <div className="alert alert-danger alert-space flex flex-col items-center justify-center mb-10 mr-10 py-5">
                                        <h2> - DISEASE NOT FOUND - </h2>
                                    </div>
                        :
                            <div className="alert alert-danger alert-space flex flex-col items-center justify-center mb-10 mr-10 p-5 text-center">
                                <h2> - INVALID DNA - </h2>
                            </div>
                    )
                }
           </div>
        </>
    );
}

export default Test;
