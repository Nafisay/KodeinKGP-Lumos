import React, {useState, useEffect} from 'react';
import './App.css';
import {ethers} from 'ethers';
import abi from './abi.json';

function App() {
  const [contract, setContract] = useState();
  const [todoCount, setTodoCount] = useState(0);
  const [inputItem, setInputItem] = useState();
  const [inputListItem, setInputListItem] = useState();
  const [inputListItemRes, setInputListItemRes] = useState();

  const contractExecution = async() => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const Contract = new ethers.Contract("0x01AeC87EB494942D6f396f3EdAC9D6dC03e6ae9a", abi, signer)
    setContract(Contract)
  }

  const getTodoCount = async () => {
    if(contract){
      const res = await contract.count();
      setTodoCount(Number(res));
    }
  }

  useEffect (() => {
    contractExecution();
  }, [])

  const handleChange = (e) => {
    setInputItem(e.target.value)
  }

  const handleSubmit = async () => {
    const res = await contract.getTodo(inputItem);
  }

  const handleGetTodoList = async () => {
    const res = await contract.todoList(inputListItem-1);
    setInputListItemRes(res);
  }

  const handleTodoList = (e) => {
    setInputListItem(e.target.value);
  }

  return (
    <main className='App-header'>
    <div className='App'>
      <button className='Button' onClick = {getTodoCount}>Get Count</button>
      <h1 className='Title'> 
        Count of ToDo: {todoCount}
      </h1>
      <div className='Text'>
        Enter the input value
        <input className='Input' onChange={handleChange}></input>
        <button className='Button' onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <input className='Input' onChange={handleTodoList}></input>
        <button className='Button' onClick = {handleGetTodoList}>Get ToDo List</button>
        <h3>{inputListItemRes}</h3>
      </div>
    </div>
    </main>
  )
}

export default App