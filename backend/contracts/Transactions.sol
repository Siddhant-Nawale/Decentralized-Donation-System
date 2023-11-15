// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

contract Transactions {
    uint256 transactionCounter;

    event Transfer(address from, address reciever,uint amount, string message,uint256 timestamp,string keyword);

    struct TransferStruct {
        address sender;
        address reciever;
        uint amount;
        string message;
        uint256 timestamp;
    }
    TransferStruct[] transactions;
    address owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier validateTransferAmount(uint amount) {
        require(amount > 0, 'Transfer amount has to be greater than 0.');
        _;
    }

    modifier restrictToOwner() {
        require(msg.sender == owner, 'Method available only to the to the user that deployed the contract');
        _;
    }

    function addtoblockchain(address payable reciever,uint amount ,string memory message,string memory keyword) public validateTransferAmount(amount) restrictToOwner() {
        transactionCounter+=1;
        transactions.push(TransferStruct(msg.sender,reciever,amount,message,block.timestamp));

        emit Transfer(msg.sender, reciever, amount, message, block.timestamp, keyword);
    } 
    function getalltransaction() public view returns (TransferStruct[] memory) {
        return transactions;
    } 
    function getTransactioncount() public view returns (uint256) {
        return transactionCounter;
    }
}