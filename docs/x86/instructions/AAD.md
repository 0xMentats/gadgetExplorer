<b>AAD</b> — ASCII Adjust AX Before Division
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64-bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D5 0A</td>
		<td>AAD</td>
		<td>ZO</td>
		<td>Invalid</td>
		<td>Valid</td>
		<td>ASCII adjust AX before division.</td>
	</tr>
	<tr>
		<td>D5 ib</td>
		<td>AAD imm8</td>
		<td>ZO</td>
		<td>Invalid</td>
		<td>Valid</td>
		<td>Adjust AX before division to number base imm8.</td>
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
Adjusts two unpacked BCD digits (the least-significant digit in the AL register and the most-significant digit in the
AH register) so that a division operation performed on the result will yield a correct unpacked BCD value. The AAD
instruction is only useful when it precedes a DIV instruction that divides (binary division) the adjusted value in the
AX register by an unpacked BCD value.
The AAD instruction sets the value in the AL register to (AL + (10 \* AH)), and then clears the AH register to 00H.
The value in the AX register is then equal to the binary equivalent of the original unpacked two-digit (base 10)
number in registers AH and AL.

The generalized version of this instruction allows adjustment of two unpacked digits of any number base (see the
“Operation” section below), by setting the imm8 byte to the selected number base (for example, 08H for octal, 0AH
for decimal, or 0CH for base 12 numbers). The AAD mnemonic is interpreted by all assemblers to mean adjust
ASCII (base 10) values. To adjust values in another number base, the instruction must be hand coded in machine
code (D5 imm8).

This instruction executes as described in compatibility mode and legacy mode. It is not valid in 64-bit mode.

### Operation

```java
IF 64-Bit Mode
    THEN
        #UD;
    ELSE
        tempAL ← AL;
        tempAH ← AH;
        AL ← (tempAL + (tempAH ∗ imm8)) AND FFH; 
        (* imm8 is set to 0AH for the AAD mnemonic.*)
        AH ← 0;
FI;
The immediate value (imm8) is taken from the second byte of the instruction.
```
### Flags Affected

The SF, ZF, and PF flags are set according to the resulting binary value in the AL register; the OF, AF, and CF flags
are undefined.

### Protected Mode Exceptions

<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

Same exceptions as protected mode.

### Virtual-8086 Mode Exceptions
Same exceptions as protected mode.

### Compatibility Mode Exceptions

Same exceptions as protected mode.

### 64-Bit Mode Exceptions

<p>#UD
If in 64-bit mode.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
