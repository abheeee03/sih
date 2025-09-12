// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TouristRegistry is Ownable {


    constructor() Ownable(msg.sender){

    }

    struct Tourist {
        string name;          
        bytes32 passportHash; 
        bytes32 aadhaarHash;  
        bytes32 visaHash;     
        address issuer;       
    }

    mapping(uint256 => Tourist) private tourists;
    uint256 public touristCount;

    event TouristCreated(
        uint256 indexed touristId,
        string name,
        address indexed issuer
    );

    event TouristUpdated(
        uint256 indexed touristId,
        string name,
        address indexed updater
    );

    function createTourist(
        string memory _name,
        bytes32 _passportHash,
        bytes32 _aadhaarHash,
        bytes32 _visaHash
    ) external onlyOwner {
        touristCount += 1;

        tourists[touristCount] = Tourist({
            name: _name,
            passportHash: _passportHash,
            aadhaarHash: _aadhaarHash,
            visaHash: _visaHash,
            issuer: msg.sender
        });

        emit TouristCreated(touristCount, _name, msg.sender);
    }

    function updateTourist(
        uint256 _touristId,
        string memory _name,
        bytes32 _passportHash,
        bytes32 _aadhaarHash,
        bytes32 _visaHash
    ) external onlyOwner {
        require(_touristId > 0 && _touristId <= touristCount, "Invalid tourist ID");

        Tourist storage t = tourists[_touristId];
        t.name = _name;
        t.passportHash = _passportHash;
        t.aadhaarHash = _aadhaarHash;
        t.visaHash = _visaHash;
        t.issuer = msg.sender;

        emit TouristUpdated(_touristId, _name, msg.sender);
    }

    function getTourist(uint256 _touristId) external view returns (
        string memory name,
        bytes32 passportHash,
        bytes32 aadhaarHash,
        bytes32 visaHash,
        address issuer
    ) {
        require(_touristId > 0 && _touristId <= touristCount, "Invalid tourist ID");
        Tourist memory t = tourists[_touristId];
        return (
            t.name,
            t.passportHash,
            t.aadhaarHash,
            t.visaHash,
            t.issuer
        );
    }

    function getTouristName(uint256 _touristId) external view returns (string memory) {
        require(_touristId > 0 && _touristId <= touristCount, "Invalid tourist ID");
        return tourists[_touristId].name;
    }

    function getTouristIssuer(uint256 _touristId) external view returns (address) {
        require(_touristId > 0 && _touristId <= touristCount, "Invalid tourist ID");
        return tourists[_touristId].issuer;
    }
}
