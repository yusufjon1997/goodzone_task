import React, { useState, useEffect } from 'react';
import './FibonacciTable.css';


function FibonacciTable() {
  const [numCells, setNumCells] = useState(14); // Initial number of cells
  const [fibonacciSequence, setFibonacciSequence] = useState([]);
  const [inputValue, setInputValue] = useState('14'); // Initial input value
  const [debouncedInputValue, setDebouncedInputValue] = useState('14');

  useEffect(() => {
    // Debounce the input value changes
    const timeoutId = setTimeout(() => {
      setNumCells(parseInt(debouncedInputValue));
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(timeoutId);
  }, [debouncedInputValue]);

  useEffect(() => {
    // Calculate the Fibonacci sequence when the numCells value changes
    calculateFibonacci(numCells);
  }, [numCells]);

  const handleNumCellsChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    // Update the debounced value after a delay
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(value);
    }, 500); // Adjust the delay as needed
    return () => clearTimeout(timeoutId);
  };

  const calculateFibonacci = (n) => {
    const memo = {};
    const sequence = [0, 1];
    for (let i = 2; i < n; i++) {
      const nextValue = memo[i - 1] + memo[i - 2] || sequence[i - 1] + sequence[i - 2];
      sequence.push(nextValue);
      memo[i] = nextValue;
    }
    setFibonacciSequence(sequence);
  };

  return (
    <div className='container'>
      <h2>Fibonacci Sequence Table</h2>
      <input
        type="number"
        placeholder="Enter the number of cells"
        value={inputValue}
        onChange={handleNumCellsChange}
      />
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Fibonacci Number</th>
          </tr>
        </thead>
        <tbody>
          {fibonacciSequence.map((num, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{num}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FibonacciTable;
