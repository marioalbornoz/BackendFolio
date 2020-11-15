import { useState } from 'react';


export const usePagination = ( initialState = 1 ) => {
    
    const [counter, setCounter] = useState(initialState); 

    const reset = () => {
        setCounter( initialState );
    }

    const increment = () => {
        setCounter( counter + 1 );
    }

    const decrement = () => {
        setCounter( counter - 1 );
    }

    return {
        counter,
        increment,
        decrement,
        reset
    };

}