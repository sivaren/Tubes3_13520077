import './Add.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { dnaValidation } from '../../utils/DNAValidation';

function Add() {
    // input operations
    const [diseaseName, setDiseaseName] = useState('');
    const [sequenceDna, setSequenceDna] = useState('');
    // after submit operations
    const [validDna, setValidDna] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(true);

    const fileHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            setSequenceDna(reader.result);
        }
        reader.onerror = () => {
            console.log('file error', reader.error);
        }
    }

    const addDisease = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setIsLoading(true);

        if (dnaValidation(sequenceDna)) {
            setValidDna(true);
            // construct data send to backend
            const data = {
                nama_penyakit: diseaseName,
                rantai_dna: sequenceDna
            };
            
            // route: http://localhost:8080/api/v1/add/disease
            await axios
                .post('http://localhost:8080/api/v1/add/disease', data)
                .then(response => {
                    console.log('POST Return: ');
                    console.log(response.data);
                    if(response.data.message === 400) {
                        setIsSuccess(false);
                    }
                    else {
                        setIsSuccess(true);
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
        document.title='Add Disease | Algeo Comeback';
    }, []);

    return (
        <>
           <div className="main-page container flex flex-col pl-10 w-4/5">
                <div className="flex-wrap py-4">
                    <h1>ADD DISEASE</h1>
                </div>
                <div className="flex-wrap">
                    <form className="flex flex-col" onSubmit={ addDisease }>
                        <h2 className="text-color-1 h2-shadow">Disease Name</h2>
                        <input 
                            type="text"
                            onChange={ (e) => setDiseaseName(e.target.value) }
                            value={ diseaseName }
                            name="inputDisease"
                            id="inputDisease"
                            className="input-text single-text my-1 px-3 py-2 shadow-lg 
                                focus:border-color-1 focus:ring-color-1 focus:ring-2 transition" 
                            required
                        />

                        <h2 className="text-color-1 h2-shadow-md mt-2 mb-1">Sequence DNA</h2>
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

                        <button type="submit" className="submit-btn flex justify-center my-8 py-3 bg-bcolor-2">
                            <h2>SUBMIT</h2>
                        </button>
                    </form>
                </div>
                {
                    submitted && (
                        validDna ? 
                            isLoading ?
                                <div className="alert alert-loading alert-space flex flex-col items-center justify-center mb-10 mr-10  py-5">
                                    <h2> - LOADING - </h2>
                                </div>
                            :
                                isSuccess ?
                                    <div className="alert alert-success alert-space flex flex-col items-center justify-center mb-10 mr-10 py-5">
                                        <h2> - ADD DISEASE SUCCESSFUL - </h2>
                                    </div>
                                :
                                    <div className="alert alert-danger alert-space flex flex-col items-center justify-center mb-10 mr-10 py-5">
                                        <h2> - DISEASE ALREADY IN DATABASE - </h2>
                                    </div>
                        :
                            <div className="alert alert-danger alert-space flex flex-col items-center justify-center mb-10 mr-10 py-5">
                                <h2> - INVALID DNA - </h2>                       
                            </div>
                    )
                }
           </div>
        </>
    );
}

export default Add;
