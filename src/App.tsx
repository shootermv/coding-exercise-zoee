import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import dataStream from './data';
import { toArray, take } from 'rxjs';

function App() {
  const [items, setItems] = useState([])
  useEffect(() => {
    const subscription = dataStream.pipe(
       take(200),
       toArray()
      ).subscribe((data: any) => {
      setItems(data)
    })
    return () => subscription.unsubscribe();
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
