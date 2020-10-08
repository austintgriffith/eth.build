const { ethers } = require("ethers");

function assemble(ASM) {
    let opcodes = [];
    ASM.split("\n").filter((l) => (l.substring(0, 1) !== ";" && l.trim() !== "")).forEach((line) => {
        line.split(" ").forEach((opcode) => {
            opcodes.push(opcode);
        });
    });
    return ethers.utils.hexlify(ethers.utils.concat(opcodes));
}

let BootstrapAsm = `
; sighash("getPendingRuntimeCode()") => 0x94198df1
; mstore(0x00, 0x94198df1) (sighash("getPendingRuntimeCode()"))
0x63
0x94198df1
0x60
0x00
0x52
; push 0x03ff (returnLength)
0x61
0x03ff
; push 0x20 (returnOffset)
0x60
0x20
; push 0x04 (argsLength)
0x60
0x04
; push 0x1c (argsOffset)
0x60
0x1c
; caller (address)
0x33
; gas
0x5a
; staticcall(gas, addr, argsOffset, argsLength, returnOffset, returnLength);
0xfa
; mload(0x40) (return length)
0x60
0x40
0x51
; push 0x60 (0x20 + 0x20 + 0x20) (return offset);
0x60
0x60
; return
0xf3
`;

function WispBootstrap() {
  this.addOutput("initcode","string")
  this.size[0] = 210
}

WispBootstrap.title = "Wisp Bootstrap";

WispBootstrap.prototype.onExecute = function() {
  this.setOutputData(0,assemble(BootstrapAsm))
};

export default WispBootstrap
