pragma solidity >=0.4.21 <=0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyTokens is ERC20 {
    constructor(uint256 initialSupply) public ERC20("Kasper", "KASP") {
        _mint(msg.sender, initialSupply);
    }
}
