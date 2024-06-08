// src/components/StockForm.jsx
import React, { useState, useContext } from 'react';
import { StockContext } from '../context/StockContext';

const StockForm = () => {
    const { stocks, setStocks } = useContext(StockContext);
    const [symbol, setSymbol] = useState('');
    const [quantity, setQuantity] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!symbol || !quantity || !purchasePrice) return;

        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=VDSE7DPLCFEL99C0`);
            const data = await response.json();
            const quote = data['Global Quote'];

            if (quote && quote['01. symbol']) {
                const newStock = {
                    symbol: quote['01. symbol'],
                    quantity: parseInt(quantity),
                    purchasePrice: parseFloat(purchasePrice),
                    currentPrice: parseFloat(quote['05. price']),
                };
                setStocks([...stocks, newStock]);
                setSymbol('');
                setQuantity('');
                setPurchasePrice('');
            } else {
                alert('Invalid stock symbol');
            }
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Stock Symbol"
            />
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
            />
            <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                placeholder="Purchase Price"
            />
            <button type="submit">Add Stock</button>
        </form>
    );
};

export default StockForm;

