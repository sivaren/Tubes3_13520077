import './Add.css'
import { dnaValidation } from '../../utils/DNAValidation';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Add() {
    const [diseaseName, setDiseaseName] = useState('');
    const [sequenceDna, setSequenceDna] = useState('');
    const [validDna, setValidDna] = useState(false);
    const [submitted, setSubmitted] = useState(false);

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

        if (dnaValidation(sequenceDna)) {
            setValidDna(true)
            const data = {
                nama_penyakit: diseaseName,
                rantai_dna: sequenceDna
            };
            console.log(data);
            
            const response = await axios.post('http://localhost:8080/api/v1/add/disease', data);
            console.log('Ini return dari POST: ');
            console.log(response.data);
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
                            onChange={(event) => setDiseaseName(event.target.value)}
                            value={diseaseName}
                            id="inputDisease"
                            className="input-text single-text my-1 px-3 py-2 shadow-lg 
                            focus:border-color-1 focus:ring-color-1 focus:ring-2 transition" 
                            name="inputDisease"
                            required
                        />

                        <h2 className="text-color-1 h2-shadow-md mt-2 mb-1">Sequence DNA</h2>
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
                        <button type="submit" className="submit-btn flex justify-center my-8 py-3 bg-bcolor-2">
                            <h2>SUBMIT</h2>
                        </button>
                    </form>
                </div>
                {
                    submitted && (
                        validDna ?
                        <div className="alert-success test-css flex flex-col mb-10 mr-10 items-center justify-center py-5">
                            {/* <div>{ diseaseName }</div>
                            <div>{ sequenceDna }</div>
                            <div>{ validDna ? 'Valid' : 'Invalid' } DNA</div>
                            <div>{ 'Submitted' }</div> */}
                            <h2> - ADD DISEASE SUCCESSFUL - </h2>
                        </div>
                        :
                        <div className="alert-danger test-css flex flex-col mb-10 mr-10 items-center justify-center py-5">
                            {/* <div>{ diseaseName }</div>
                            <div>{ sequenceDna }</div>
                            <div>{ validDna ? 'Valid' : 'Invalid' } DNA</div>
                            <div>{ 'Submitted' }</div> */}
                            <h2> - INVALID DNA - </h2>
                        </div>
                    )
                }
           </div>
        </>
    );
}

export default Add;
