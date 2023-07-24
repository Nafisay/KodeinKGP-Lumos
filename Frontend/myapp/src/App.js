import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

  function App() {
    const [quote, setQuote] = useState()
    const [quoteAuthor, setQuoteAuthor] = useState()
    const [quoteString, setQuoteString] = useState()
    const [submit, setSubmit] = useState()

    useEffect(() => {
      axios.get('http://localhost:5050/quote')
      .then((res) => {
        setQuote(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }, [submit])

    const handleSubmit = async () => {
      try{
        const res = axios.post('http://localhost:5050/quote',{
          "author" : quoteAuthor,
          "quote" : quoteString
        });
        setSubmit(res);
      }
      catch{
        alert("Something Went Wrong")
      }
    }

    return (
      <div className = "App"> 
          <header className = "App-header">
          <h1 className = "Title">Today's Quotes are:</h1>
          {quote && quote.map((item) => (<div> <p className = "Quote">"{item.quote}"</p><p className = "Author">-- {item.author}</p> </div>))}
          
          <div>
            <h3 className = "Text">Go ahead and your add custom quote!</h3>
            <div>
              <label className = "Label">Your Name: </label>
              <input onChange = {(e) => {setQuoteAuthor(e.target.value)}}/>
            </div>
          <div>
            <label className = "Label">Your Quote: </label>
            <input onChange = {(e) => {setQuoteString(e.target.value)}}/>
          </div>
          <button className = "Button" onClick = {handleSubmit}>Submit</button>
          </div>
        </header>
      </div>
    );
  }

  export default App;