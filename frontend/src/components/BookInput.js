import React, {Fragment} from 'react';

const BookInput = () => 
(
    
    <Fragment>  
        {/* TODO add a submit button */}
        <input 
            type='text' 
            value='About Hello World'>
        </input>

        <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input 
              type="number" 
              id="amount" 
            //   value={enteredAmount}
            //   onChange={e => setAmount(e.target.value)}
            >
            </input>

        </div>

    </Fragment>
    )

export default BookInput;