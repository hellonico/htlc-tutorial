// SPDX-License-Identifier: MIT
pragma solidity >=0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CToken is ERC20 {
    constructor() ERC20("Calvin Test Token", "CTK") {
        _mint(msg.sender, 3000000 * (10 ** decimals()));
    }
}