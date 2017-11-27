pragma solidity ^0.4.17;

import "./LandPlot.sol";

contract Registry {
    mapping (bytes32 => Plot) plots;

    struct Plot {
        bytes32 ID; 
        address owner; 
        address newOwner; 
        uint256 value;
    }

    modifier checkValue(uint amount) {
        require(amount == msg.sender.balance);
        _;
    }

    function Registry() public {
    }

    function addPlot(uint256 _price, bytes32 _id, address _owner, address _newOwner) public {
	    plots[_id] = Plot(_id, _owner, _newOwner, _price);
    } 

    function buyPlot(bytes32 _id) checkValue(msg.sender.balance) public {
      plots[_id].owner.transfer(msg.value);
      plots[_id].newOwner = msg.sender;
      LandPlot p = new LandPlot(plots[_id].value, plots[_id].ID);
      p.updateOwner(plots[_id].newOwner);
      LogSold(plots[_id].newOwner, plots[_id].ID);
    }

    event LogSold(address newOwner, bytes32 id);

} 