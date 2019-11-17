pragma solidity ^0.5.0;
contract Example{
  address public owner;
  constructor() public {
    owner = msg.sender;
  }
  function setOwner(address _owner) public {
    owner = _owner;
  }
}
