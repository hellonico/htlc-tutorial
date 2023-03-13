// SPDX-License-Identifier: MIT
pragma solidity >=0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NToken is ERC20 {
    constructor() ERC20("Nico Test Token", "NTT") {
        _mint(msg.sender, 3000000 * (10 ** decimals()));
    }
}