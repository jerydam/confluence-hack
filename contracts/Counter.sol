// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title ConfluenceHack
 * @notice A simple vault where the withdrawal key is publicly visible.
 * @dev Vulnerable to key extraction (via bytecode) and fund drainage.
 */
contract ConfluenceHack {
    // 🔑 The "secret" key required for withdrawal.
    // This value must be solved by the CTF player!
    string private constant WITHDRAWAL_KEY = ""; // <-- NEW KEY FOR THE CIPHER CHALLENGE

    // 💰 This function allows anyone to deposit Ether to fund the contract.
    function deposit(uint256 amount) public payable {}

    // 💀 The vulnerable function: it checks the key and transfers all funds.
    function withdraw(string memory _key) public {
        // 1. Check the provided key against the hardcoded secret.
        if (keccak256(abi.encodePacked(_key)) == keccak256(abi.encodePacked(WITHDRAWAL_KEY))) {
            
            // 2. The Interaction: Transfer all the contract's Ether to the sender.
            uint256 balance = address(this).balance;
            require(balance > 0, "Vault is empty");
            
            (bool success, ) = msg.sender.call{value: balance}("");
            require(success, "Transfer failed");

        } else {
            revert("Incorrect withdrawal key!");
        }
    }

    // Helper function to check the total Ether held by this contract.
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}