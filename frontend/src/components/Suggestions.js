import React, { useState } from 'react';


// export const Suggestions = () => {
const Suggestions = () => {

    const [evaluation, setEvaluation] = useState(5);

    const evaluUp = () => {
        setEvaluation(evaluation + 1)
    }

    const evaluDown = () => {
        // e.preventDefaul()
        setEvaluation(prevEvaluation => prevEvaluation - 1);
    }

    return (
        <>
            <h1>Current Evalutation {evaluation}</h1>
            <div className="col-md-4">
                <button className='btn btn-info' onClick={evaluDown}>-</button>
                <span> </span>
                <button className='btn btn-info' onClick={evaluUp}>+</button>
            </div>
        </>
    );
}

export default Suggestions;
