
🛠 [ETH.Build](https://eth.build)

---

```
  npm install
  npm start
```

---


[![image](https://user-images.githubusercontent.com/2653167/82834217-b3087d00-9e7d-11ea-8846-e844c5ac8afc.png)](https://youtu.be/30pa790tIIA)


---

🛠️ETH.Build
An Educational Sandbox For Web3... And Much More.

👉Drag-and-Drop Programming
🧩Open Source Building Blocks
🧐Visually Understand How Ethereum Works

---


[Hash Function](https://youtu.be/QJ010l-pBpE)
Think of it like a fingerprint of any given input data.
Input can be any size, output is always the same size (64 hex chars).
Deterministic, you will always get the same hash for a specific input.
One directional, given a hash it is impossible to guess the seed.


[Key Pair](https://youtu.be/9LtBDy67Tho)
Consists of a public key derived from a private key.
Your address where you send value is derived from your public key.
Can be used to sign a message and anyone can recover the signer's address.
Anyone can generate an Ethereum account by just generating a random private key.


[Look Ahead: Transactions](https://youtu.be/mhwSGYRmkEU)
Users can sign messages that go on-chain to send and receive value.
No decimals! Amounts are integers, in Wei. 1 ETH is 10^18 Wei.
You can generate accounts by just randomly generating private keys.


[Side Quest: Encryption](https://youtu.be/LGEBqz1uG1U)
Asymmetric encryption with Ethereum key pairs.
A small amount of data can be encrypted with a public key.
The private key is used to decrypt the data.
Not the best way to encrypt data!


[Distributed Ledger](https://youtu.be/z11wj9OcA4U)
Once we have key pairs and we can sign messages, our messages can be objects with to, from, value, etc.
A ledger keeps track of everyone's balance and new transactions are added to it.
Everyone keeps a copy of the same ledger.
Need a 'nonce' to prevent replay attacks.
Problems with network topology and consensus...


[Byzantine Generals](https://youtu.be/c7yvOlwBPoQ)
Coordination problem arises without a centralized authority.
Network (communication) is public and untrusted.
Generals prove their ability to wage war to other generals in messages.
Proof of work!


[Blockchain](https://youtu.be/zcX7OJ-L8XQ)
Proof of work is brute forcing a one-way hash function.
Miners with special hardware work to secure blocks of transactions.
Each block references the previous block to make a chain.
Longest chain wins and your weird uncle shows up to help with security.


[Transactions](https://youtu.be/er-0ihqFQB0)
Send value by signing an object with the details like 'to', 'value', 'data'.
'From' address is cryptographically recovered from the signature.
No decimals! Amounts are integers, in Wei. 1 ETH is 10^18 Wei.
Miners are incentivized with a fee to package transactions into blocks.
This fee is called the gas price and you 'bid' to get mined.

[Smart Contracts](https://youtu.be/-6aYBdnJ-nM)
Send 'machine code' as data in a transaction without a 'to' address.
Deployed code has an address just like an "externally owned account" with a private key.
Reading data is cheap and can come from any node on the network.
Storage and execution are relatively expensive. All nodes have to run and store everything.
Call a function on a contract by sending it a transaction with the function args in the data.



![image](https://user-images.githubusercontent.com/2653167/67598285-64013a80-f72a-11e9-916b-491687d3b6ca.png)


---

## ⚙ Components in eth.build
Components in eth.build generally accept one or more inputs, and most provide one or more outputs
### 🟦 INPUT components

#### 🟦 Button (Input/Button)
##### accepts:
* 🔲 event/action
##### emits:
* 🔲 event/action
* ⚪ the integer value of the button's `count` property
##### usage:
* each time the button is clicked, its `count` property is incremented by one (visible under its 🖱 Properties)
* you can change the initial `click me` inner text of the button via its 🖱 Properties 

#### 🟦 Number (Input/Number)
##### accepts:
* ⚪ number
##### emits:
* ⚪ number
##### usage:
* if you send it a non-numerical value (like the letter "a"), the Number component will simply have no value
* use this component to "hardcode" a numerical value in your test builds

#### 🟦 Text (Input/Text)
##### accepts:
* ⚪ anything
##### emits:
* ⚪ text (string)
##### usage:
* generally accepts anything as an input
* use this component to "hardcode" a string/text value in your test builds

#### 🟦 Upload (Input/Upload)
##### accepts:
* NOTHING
##### emits:
* ⚪ the binary data of the uploaded file
##### usage:
* use this component to "hardcode" a string that simulates a mnemonic for hashing into key/pair generation
* use this component to include a file in the data input for a Transaction component

#### 🟦 Password (Input/Password)
##### accepts:
* TBD
##### emits:
* ⚪ TBD
##### usage:
* TBD

#### 🟦 PIN (Input/PIN)
##### accepts:
* TBD
##### emits:
* ⚪ TBD
##### usage:
* TBD

#### 🟦 QR (Input/QR)
##### accepts:
* TBD
##### emits:
* ⚪ TBD
##### usage:
* TBD

#### 🟦 Code (Input/Code)
##### accepts:
* ⚪ text (string)
##### emits:
* ⚪ text (string) of the code
##### usage:
* Used to define the code for publishing a smart contact

### 🟩 DISPLAY components
