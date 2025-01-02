 
 // SPDX-License-Identifier: MIT
 pragma solidity ^0.8.26;

 contract Greeting {

     constructor(){}

     function Say_hello(string memory _name)public pure returns (string memory){
          return string(abi.encodePacked("Hello",_name));
     }
 }