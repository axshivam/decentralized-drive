// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract DecentralizedDrive is Initializable, UUPSUpgradeable {
    address private admin;

    struct Access {
        address user;
        bool access;
    }
    mapping(address => string[]) value;
    mapping(address => mapping(address => bool)) ownership;
    mapping(address => Access[]) accessList;
    mapping(address => mapping(address => bool)) previousData;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __UUPSUpgradeable_init();

        admin = msg.sender;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyAdmin {}

    function add(address _user, string memory url) external {
        value[_user].push(url);
    }

    function allow(address user) external {
        //def
        ownership[msg.sender][user] = true;
        if (previousData[msg.sender][user]) {
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == user) {
                    accessList[msg.sender][i].access = true;
                }
            }
        } else {
            accessList[msg.sender].push(Access(user, true));
            previousData[msg.sender][user] = true;
        }
    }

    function disallow(address user) public {
        ownership[msg.sender][user] = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = false;
            }
        }
    }

    function display(address _user) external view returns (string[] memory) {
        require(
            _user == msg.sender || ownership[_user][msg.sender],
            "You don't have access"
        );
        return value[_user];
    }

    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }

    modifier onlyAdmin() {
        require(
            msg.sender == admin,
            "Unauthorized!, Only admin can perform this operation!"
        );
        _;
    }
}
