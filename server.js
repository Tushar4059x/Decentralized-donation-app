// server.js
const express = require('express');
const algosdk = require('algosdk');

const app = express();
const port = 3000;

app.use(express.json());

// Algorand configuration
const algodToken = 'YOUR_ALGOD_TOKEN';
const algodServer = 'http://localhost'; // or your Algorand node address
const algodPort = 4001; // or your Algorand node port
const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

const donationAccount = algosdk.mnemonicToSecretKey('YOUR_MNEMONIC_PHRASE'); // Your Algorand account

app.post('/donate', async (req, res) => {
  const { amount, donorAddress } = req.body;

  try {
    const params = await algodClient.getTransactionParams().do();
    const txn = {
      "from": donorAddress,
      "to": donationAccount.addr,
      "fee": algosdk.ALGORAND_MIN_TX_FEE,
      "amount": algosdk.algosToMicroalgos(amount),
      "firstRound": params.firstRound,
      "lastRound": params.lastRound,
      "genesisID": params.genesisID,
      "genesisHash": params.genesishashb64,
      "note": new Uint8Array(0)
    };

    const signedTxn = algosdk.signTransaction(txn, donationAccount.sk);
    await algodClient.sendRawTransaction(signedTxn.blob).do();

    res.send({ message: 'Donation successful' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
