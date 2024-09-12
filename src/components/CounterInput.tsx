import React, {useState} from 'react';

function CounterInput({counter, handleCounter}:  any) {

  return (
    <div className='counter-input'>
      <button className='primary-button small-btn' onClick={() => handleCounter('decrement')}>-</button>
      <input type="number" className='input-counter' value={counter} disabled={true}/>
      <button className='primary-button small-btn' onClick={() => handleCounter('increment')}>+</button>
    </div>
  );
}

export default CounterInput;