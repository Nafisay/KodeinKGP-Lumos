import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
  function App() {
    const [data, setData] = useState(0);
    function getQuote(){
      try {
        fetch('https://api.quotable.io/random').then(
        response => response.json()).then(
          (quote)=>{
            setData(quote);
          }
        )
      } catch (error) {
        console.log(error.message)
      }
      
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className='Title'>Random Quote Generator</h1>
          <h3 className='Quote'>"{data.content}"</h3>
          <h5 className='Author'>Author: {data.author}</h5>
          <button onClick={getQuote} className='Button'>Get Quote</button>
        </header>
      </div>
    );
  }
  export default App;