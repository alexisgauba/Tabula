pragma solidity ^0.4.17;

contract LandPlot {
  address owner;
  uint256 value; 
  bytes32 ID; 
  mapping (address => address) history; 

  function LandPlot(uint256 price, bytes32 _id) public {
  owner = msg.sender;
  value = price;
  ID = _id;
}

  function updateOwner(address _newOwner) public returns(address) {
    owner = _newOwner; 
    history[_newOwner] = owner; 
    return _newOwner; 
    UpdatedOwner(_newOwner);
  }

function getPreviousOwner(address currentOwner) public returns(address) {
  return history[currentOwner];
}

event UpdatedOwner(address newOwner);

}
