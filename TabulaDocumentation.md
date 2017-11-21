# Tabula 
###### Alexis Gauba & Zubin Koticha 

Tabula is a solution to address land registry needs. Land ownership documentation is often inconsistent, hard to access, and susceptible to malicious alterations. Tabula presents way to create an organizational system providing both transparency and accesibility.  

There are two major components to Tabula: 
	1. A centralized database of digitized land records 
	2. Smart contracts hosted on a blockchain containing transaction hashes representing parties signing off on a particular land transaction 

To resolve organizational and accesibility issues, Tabula creates a central database storing the bulk of specific land documentation. This set of data is referenced by a particular transaction hash that exists on the blockchain. The on chain transaction contains the ID for a the plot of land it refers to and the verified signatures of parties involved in the land transaction. In this way, we minimize the amount of data that needs to be stored on chain, just presenting the signatures in a public, immutable way, confirming the validity of the transaction while the complex documentation is stored off chain. 

We will be implementing the decentralized component of this solution and building a UI for interactions with the on chain verifications. 

## LandPlot
### Summary

This smart contract contains the identifier for a specific plot of land and the owner and buyer signatures. It also records a history of previous owners. 

### Contract Details 

#### Storage
```javascript address owner``` is the address of the owner of the LandPlot 

```javascript uint256 value``` is the price of a particular LandPlot

```javascript bytes32 ID``` is the land identifier of the LandPlot 

```javascript mapping (address =>  address) history``` is a mapping of the address the current owner to that of the previous owner  

#### Functions 

##### LandPlot() 
Constructs the LandPlot object and instantiates its owner

```javascript
function LandPlot(uint256 price, bytes32 _id) public {
  owner = msg.sender;
  value = price;
  ID = _id;
}
```

##### updateOwner() 
Updates the owner of the LandPlot

```javascript
function updateOwner(address newOwner) public {
  owner = newOwner; 
  history[newOwner] = owner; 
  UpdatedOwner(newOwner);
}
```

##### getPreviousOwner() 
Gets the previous owner of the LandPlot

```javascript
function getPreviousOwner(address oldOwner) public returns(address) {
  return history[oldOwner];
}
```

#### Event
```event UpdatedOwner(address newOwner);``` This is emitted when a LandPlot's owner is updated.

## Registry 
### Summary

This smart contract keeps track of all of the LandPlots, allowing for LandPlots to be added and transacted. 

#### Storage
```javascript mapping (bytes32 => LandPlot) plots``` is a mapping of each LandPlot's ID to the corresponding LandPlot to keep track of all LandPlots

#### Mofidier

##### checkValue()
This modifier ensures that the amount being paid is the cost of the LandPlot

```javascript modifier checkValue(uint amount) {
  require(amount == msg.sender.balance;
  _;
}
```

#### Functions 

##### Registry() 
Initializes a Registry 

```javascript
function Registry public {
}
```

##### addPlot() 
Adds a Plot to the registry 

```javascript
function addPlot(uint256 _price, bytes32 _id) public {
	LandPlot _plot = new LandPlot(_price, _id);
	plots[_id] = _plot;
}
```

##### buyPlot()
Allows a buyer to purchase a Plot.

```javascript
function buyPlot(bytes32 _id) checkValue(msg.sender.balance) public {
  p = plots[_id]
  p.history[p.getPreviousOwner(_id)] = p.address
  LogSold(msg.sender, id);
}
```

#### Event
```event LogSold(address newOwner, uint256 id);``` This is emitted when a LandPlot is purchased

## Frontend & UPort Integration 
The frontend interface will use React.js and present a UI for buyers and sellers view plots of land, add plots of land, purchase plots of land, and sign transactions using UPort. 


Consider the following flow for a buyer using Tabula: 

In the case that a specific LandPlot is not already stored in the database, the seller would add all of the relevant documentation. The seller is incentivized to upload accurate information, otherwise the buyer would not sign off on the transaction, meaning it would be invalid in the eyes of users on the platform who are looking for signatures from the buyers and sellers to confirm the validity of data. In this way, LandPlots would get added to the database, so eventually it would be likely a LandPlot that a purchaser wanted to purchase would already be in the system, making the purchasing process simple and seamless. 

![Diagram](https://lh3.googleusercontent.com/ddHOH4ROuOfwYEHZWVnaFN6Ep6p4EmbZHteEjj2ERaZHtXWCH6N2NFeqdFskdtHugTiVwmKOZm7HJvR1FUjpPIREMVxkiifOOG2vVvMVD15qzIFTjmhK5qzb4PdLJQA8wlgIw5PNe2RSyXo-FO8g9UeQmwMw6Cy2PK1xGNPKtso-OgSm8N4TCzja0d-Nlm2ckjmWhxhzECnxNt7Y5rksYw2-KINFWhvhZaMLNBDtoL1hXdEHQWBYMlub2XmCw3NEPS3pv7BLSmRr9q-doqG90hCcWKr1ZeQQUHxZjV440tmLM8fZIsVFx3yZco3I_I1L5gzHQh_85JEOz5xScoH_OS4VpSsQo4fnDlqaipOmukhmFkqlidJIue8QH2fkt9asVEV3cMWMLNTB5cfOnO8lxFG3V2Zb2cIAiufhrcLjVI8nymbeL4rl1fOuMPrikV9W0nyLrzSKwkul2ydzfVNHA6IsvzJuc21oEn95NqEeOHe0vilwukKacG7RAJuMGJKLb0rMLNCaW9GsMQzwg3YWe_BU60pcNJ4H6ZTs8SAPRl_M-zB05kDK9ryEzKzQFqqr=w2394-h1488)




