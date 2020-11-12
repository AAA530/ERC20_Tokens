pragma solidity >=0.4.21 <=0.7.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract KycContract is Ownable {
    mapping(address => bool) allowed;

    function SetKycCompleted(address _addr) public onlyOwner {
        allowed[_addr] = true;
    }

    function SetKycRevoked(address _addr) public onlyOwner {
        allowed[_addr] = false;
    }

    function checkKyc(address _addr) public view returns (bool) {
        return allowed[_addr];
    }
}
