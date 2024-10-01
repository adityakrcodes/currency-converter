import React, { useState, useEffect } from 'react';
import Footer from '../components/footer';

const All: React.FC = () => {
    const [amount, setAmount] = useState<number>(1);
    const [fromCurrency, setFromCurrency] = useState<string>('USD');
    const [toCurrency, setToCurrency] = useState<string>('INR');
    const [exchangeRate, setExchangeRate] = useState<number>(1);
    const [currencies, setCurrencies] = useState<string[]>([]);

    useEffect(() => {
        fetch('https://api.exchangerate-api.com/v4/latest/USD')
            .then(response => response.json())
            .then(data => {
                setCurrencies(Object.keys(data.rates));
                setExchangeRate(data.rates[toCurrency]);
            });
    }, [toCurrency]);

    useEffect(() => {
        if (currencies.length > 0) {
            fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
                .then(response => response.json())
                .then(data => {
                    setExchangeRate(data.rates[toCurrency]);
                });
        }
    }, [fromCurrency, toCurrency, currencies]);
    
    const convert = (amount: number, rate: number) => {
        return (amount * rate).toFixed(2);
    };

    return (
        <>
            <div className="App flex flex-col justify-center items-center h-screen bg-slate-950 text-white">
                <h1 className='text-3xl font-bold my-5'>Currency Exchange</h1>
                <div>
                    <p className='text-center my-5'>
                        This software converts money from US$ to <br />
                        the currency from one of the countries in the world.
                    </p>
                </div>
                <div className='flex gap-5 justify-center items-center'>
                    <input
                        className='text-black p-1 rounded-lg text-center w-20'
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                    />
                    <select
                        className='text-black p-1 rounded-lg'
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                    >
                        {currencies.map(currency => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                    <span> to </span>
                    <select
                        className='text-black p-1 rounded-lg'
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                    >
                        {currencies.map(currency => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </div>
                <h2 className='text-4xl font-bold my-3'>
                    {amount} {fromCurrency} = {convert(amount, exchangeRate)} {toCurrency}
                </h2>
            </div>
            <Footer></Footer>
        </>
    );
};

export default All;