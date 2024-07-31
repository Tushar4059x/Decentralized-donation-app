// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [amount, setAmount] = useState('');
  const [donorAddress, setDonorAddress] = useState('');

  const handleDonate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/donate', {
        amount: amount,
        donorAddress: donorAddress,
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="App">
      <h1>Donate with Algorand</h1>
      <form onSubmit={handleDonate}>
        <input
          type="text"
          placeholder="Amount (ALGO)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Your Algorand Address"
          value={donorAddress}
          onChange={(e) => setDonorAddress(e.target.value)}
          required
        />
        <button type="submit">Donate</button>
      </form>
    </div>
  );
}

export default App;
