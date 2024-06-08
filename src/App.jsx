// src/App.jsx
import React from 'react';
import { StockProvider } from './context/StockContext';
import StockForm from './components/StockForm';
import StockList from './components/StockList';
import './App.css';

const App = () => {
    return (
        <StockProvider>
            <div className="App">
                <h1>Finance Dashboard</h1>
                <StockForm />
                <StockList />
            </div>
        </StockProvider>
    );
};

export default App;

