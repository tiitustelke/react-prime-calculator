import './App.css';
import React, {useState} from "react";
import {getSumAndIsPrimeNumber, getIsPrimeNumber} from '../../hooks/ApiHooks'

function App() {
    const [value, setValue] = useState("");
    const [result, setResult] = useState("");

    const handleInputChange = (event) => {
        const re = /^[,0-9\b]+$/;
        const value = event.target.value;
        let arr;

        if (value.length === 0) {
            arr = [];
            setValue(value);
        }

        if ((value === '' || re.test(value)) && parseInt(value) !== 0) {
            setValue(value);
            arr = value.replace(/, +/g, ",").split(",").map(Number);
            if (arr.length === 1 && !isNaN(arr[0]) && arr[0] !== 0) {
                onNumberIsSet(arr[0]);
            } else {
                if (value) {
                    onNumbersAreSet(arr);
                } else {
                    setResult("");
                }
            }
        }
    }

    const onNumberIsSet = async (number) => {
        const isPrime = (await getIsPrimeNumber(number)).isPrime;
        if (isPrime === true) {
            setResult(`Number ${number} is a prime number`);
        } else {
            setResult(`Number ${number} is not a prime number`);
        }
    }

    const onNumbersAreSet = async (numbers) => {
        const resp = await getSumAndIsPrimeNumber(numbers);
        if (resp.isPrime === true) {
            setResult(`Result ${resp.result} is a prime number`);
        } else {
            setResult(`Result ${resp.result} is not a prime number`);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    Prime calculator
                </h1>
            </header>
            <main>
                <p>
                    Please enter number(s) separated by commas.
                </p>
                <div className="Input-container">
                    <label className="Num-label">
                        Numbers:
                    <input
                        id="nums"
                        type="text"
                        value={value}
                        onChange={handleInputChange.bind(this)}
                    />
                    </label>
                </div>
                <p className="Result-text" data-testid="result">{result}</p>
            </main>
        </div>
    );
}

export default App;
