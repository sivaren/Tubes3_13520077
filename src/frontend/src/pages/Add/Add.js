import './Add.css'
import { ValidDNA } from '../../utils/ValidDNA'
import { useState, useEffect } from 'react';

function Add() {
    const [diseaseName, setDiseaseName] = useState('');
    const [sequenceDna, setSequenceDna] = useState('');
    const [validDna, setValidDna] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(function () {
        document.title='Add Disease | Algeo Comeback';
    }, []);

    function fileHandler(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            setSequenceDna(reader.result);
        }
        reader.onerror = () => {
            console.log('file error', reader.error);
        }
    }

    function submitHandler(event) {
        event.preventDefault();
        if (ValidDNA.test(sequenceDna)) {
            setValidDna(true)
        }
        else {
            setValidDna(false)
        }
        setSubmitted(true);
    }

    return (
        <>
           <div className="main-page container flex flex-col pl-10 w-4/5">
                <div className="flex-wrap py-4">
                    <h1>ADD DISEASE</h1>
                </div>
                <div className="flex-wrap">
                    <form className="flex flex-col" onSubmit={(event) => submitHandler(event)}>
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
                            onChange={(event) => fileHandler(event)}
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
                    submitted &&
                    <div className="test-css flex flex-col mr-10 items-center justify-center py-5 bg-slate-400">
                        <div>{ diseaseName }</div>
                        <div>{ sequenceDna }</div>
                        <div>{ validDna ? 'Valid' : 'Invalid' } DNA</div>
                        <div>{ 'Submitted' }</div>
                    </div>
                }
           </div>
        </>
    );
}

export default Add;
