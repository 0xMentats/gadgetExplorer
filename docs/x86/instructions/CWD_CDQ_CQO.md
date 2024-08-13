<b>CWD / CDQ / CQO</b> — Convert Word to Doubleword/Convert Doubleword to Quadword
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>99</td>
		<td>CWD</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>DX:AX ← sign-extend of AX.</td>
	</tr>
	<tr>
		<td>99</td>
		<td>CDQ</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>EDX:EAX ← sign-extend of EAX.</td>
	</tr>
	<tr>
		<td>REX.W + 99</td>
		<td>CQO</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>RDX:RAX ← sign-extend of RAX.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand 2</b></td>
		<td><b>Operand 3</b></td>
		<td><b>Operand 4</b></td>
	</tr>
	<tr>
		<td>ZO</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Doubles the size of the operand in register AX, EAX, or RAX (depending on the operand size) by means of sign
extension and stores the result in registers DX:AX, EDX:EAX, or RDX:RAX, respectively. The CWD instruction
copies the sign (bit 15) of the value in the AX register into every bit position in the DX register. The CDQ instruction
copies the sign (bit 31) of the value in the EAX register into every bit position in the EDX register. The CQO instruction
 (available in 64-bit mode only) copies the sign (bit 63) of the value in the RAX register into every bit position
in the RDX register.

The CWD instruction can be used to produce a doubleword dividend from a word before word division. The CDQ
instruction can be used to produce a quadword dividend from a doubleword before doubleword division. The CQO
instruction can be used to produce a double quadword dividend from a quadword before a quadword division.

The CWD and CDQ mnemonics reference the same opcode. The CWD instruction is intended for use when the
operand-size attribute is 16 and the CDQ instruction for when the operand-size attribute is 32. Some assemblers
may force the operand size to 16 when CWD is used and to 32 when CDQ is used. Others may treat these
mnemonics as synonyms (CWD/CDQ) and use the current setting of the operand-size attribute to determine the
size of values to be converted, regardless of the mnemonic used.

In 64-bit mode, use of the REX.W prefix promotes operation to 64 bits. The CQO mnemonics reference the same
opcode as CWD/CDQ. See the summary chart at the beginning of this section for encoding data and limits.

### Operation

```java
IF OperandSize = 16 (* CWD instruction *)
    THEN 
        DX ← SignExtend(AX);
    ELSE IF OperandSize = 32 (* CDQ instruction *)
        EDX ← SignExtend(EAX); FI;
    ELSE IF 64-Bit Mode and OperandSize = 64 (* CQO instruction*)
        RDX ← SignExtend(RAX); FI;
FI;
```
### Flags Affected

None

### Exceptions (All Operating Modes)

<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
