import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

const App: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);
    const [fromCurrency] = useState<string>('USD');
    const [toCurrency, setToCurrency] = useState<string>('INR');
    const [exchangeRate, setExchangeRate] = useState<number>(0);
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [convertedAmount, setConvertedAmount] = useState<string>('0');

    useEffect(() => {
        fetch('https://api.exchangerate-api.com/v4/latest/USD')
            .then(response => response.json())
            .then(data => {
                setCurrencies([data.base, ...Object.keys(data.rates)]);
                setExchangeRate(data.rates[toCurrency]);
            });
    }, []);

    useEffect(() => {
        if (currencies.length > 0) {
            fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
                .then(response => response.json())
                .then(data => {
                    setExchangeRate(data.rates[toCurrency]);
                });
        }
    }, [fromCurrency, toCurrency, currencies]);

    const convertCurrency = (amount: number, rate: number) => {
        return (amount * rate).toFixed(2);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseFloat(e.target.value));
    };

    // const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setFromCurrency(e.target.value);
    // };

    const handleToCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setToCurrency(e.target.value);
    };

    const handleConvert = () => {
        setConvertedAmount(convertCurrency(amount, exchangeRate));
    };

    return (
        <>
        <Navbar />
        <div className="App flex flex-col justify-center items-center h-screen bg-slate-950 text-white ">
            <h1 className='text-3xl font-bold my-5'>Currency Exchange</h1>
            <div>
                <p className='text-center'>
                    This software converts money from US$ to <br />
                    the currency from one of the countries in the world.
                </p>
            </div>
            <div>
                <div className='flex justify-center items-center gap-3'>
                    <p>Enter amount in US$</p>
                    <input className='text-black p-1 rounded-lg font-bold' type="number" value={amount} onChange={handleAmountChange} />
                </div>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-col'>
                        <label className='p-5'>
                            <input
                                type="radio"
                                value="BRL"
                                checked={toCurrency === 'BRL'}
                                onChange={handleToCurrencyChange}
                                className='m-2'
                            />
                            Brazil
                        </label>
                        <label className='p-5'>
                            <input
                                type="radio"
                                value="CAD"
                                checked={toCurrency === 'CAD'}
                                onChange={handleToCurrencyChange}
                                className='m-2'
                            />
                            Canada
                        </label>
                    </div>
                    <div className='flex flex-col'>
                        <label className='p-5'>
                            <input
                                type="radio"
                                value="EUR"
                                checked={toCurrency === 'EUR'}
                                onChange={handleToCurrencyChange}
                                className='m-2'
                            />
                            European Community
                        </label>
                        <label className='p-5'>
                            <input
                                type="radio"
                                value="JPY"
                                checked={toCurrency === 'JPY'}
                                onChange={handleToCurrencyChange}
                                className='m-2'
                            />
                            Japan
                        </label>
                    </div>
                </div>
            </div>
            <h2 className='font-black text-4xl'>
                {amount} {fromCurrency} = {convertedAmount} {toCurrency}
            </h2>
            <div className='btns'>
                <button className='rounded-xl p-2 bg-blue-600 m-2 w-40' onClick={handleConvert}>Convert</button>
                <button className='rounded-xl p-2 bg-blue-600 m-2 w-40' onClick={() => setAmount(0)}>Clear</button>
                <Link to="/thanks" className='rounded-xl px-14 py-3 bg-blue-600 m-2'>
                    Quit
                </Link>
            </div>
        </div>
        <Footer/>
    </>
    );
};

export default App;