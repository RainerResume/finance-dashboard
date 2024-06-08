// src/components/StockList.jsx
import React, { useContext, useEffect } from 'react';
import { StockContext } from '../context/StockContext';

const StockList = () => {
    const { stocks, setStocks } = useContext(StockContext);

    useEffect(() => {
        const fetchCurrentPrices = async () => {
            const updatedStocks = await Promise.all(stocks.map(async (stock) => {
                const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=VDSE7DPLCFEL99C0`);
                const data = await response.json();
                const quote = data['Global Quote'];
                return {
                    ...stock,
                    currentPrice: parseFloat(quote['05. price']),
                };
            }));
            setStocks(updatedStocks);
        };

        fetchCurrentPrices();
    }, [stocks.length]);

    if (stocks.length === 0) {
        return <p>No stocks available.</p>;
    }

    return (
        <ul>
            {stocks.map((stock, index) => (
                <li key={index}>
                    {stock.symbol}: {stock.quantity} shares at ${stock.purchasePrice} each.
                    Current Price: ${stock.currentPrice || 'Fetching...'}
                    Profit/Loss: ${stock.currentPrice ? ((stock.currentPrice - stock.purchasePrice) * stock.quantity).toFixed(2) : 'Calculating...'}
                </li>
            ))}
        </ul>
    );
};

export default StockList;
