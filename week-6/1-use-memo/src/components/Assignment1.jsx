import { useState, useMemo } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
    const [input, setInput] = useState(1);
    const [val, setVal] = useState(0);
    // Your solution starts here

    const expensiveValue = useMemo(() => {
        console.log('calculating fact for,', val);
        return computeFactorial(val);
    }, [val]);
    // Your solution ends here

    return (
        <div>
            <input 
                type="number" 
                value={input} 
                onChange={(e) => setInput(Number(e.target.value))} 
            />
            <button onClick={() => setVal(input)}>Compute</button>
            <p>Calculated Value: {expensiveValue}</p>
        </div>
    );
}

function computeFactorial(num) {
    if (num <= 1) return 1;
    return num * computeFactorial(num - 1);
}