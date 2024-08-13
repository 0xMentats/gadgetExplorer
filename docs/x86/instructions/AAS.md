<b>AAS</b> — ASCII Adjust AL After Subtraction
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
		<td>3F</td>
		<td>AAS</td>
		<td>ZO</td>
		<td>Invalid</td>
		<td>Valid</td>
		<td>ASCII adjust AL after subtraction.</td>
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
Adjusts the result of the subtraction of two unpacked BCD values to create a unpacked BCD result. The AL register
is the implied source and destination operand for this instruction. The AAS instruction is only useful when it follows
a SUB instruction that subtracts (binary subtraction) one unpacked BCD value from another and stores a byte
result in the AL register. The AAA instruction then adjusts the contents of the AL register to contain the correct 1-
digit unpacked BCD result.

If the subtraction produced a decimal carry, the AH register decrements by 1, and the CF and AF flags are set. If no
decimal carry occurred, the CF and AF flags are cleared, and the AH register is unchanged. In either case, the AL
register is left with its top four bits set to 0.

This instruction executes as described in compatibility mode and legacy mode. It is not valid in 64-bit mode.

### Operation

```java
IF 64-bit mode
    THEN
        #UD;
    ELSE
        IF ((AL AND 0FH) > 9) or (AF = 1)
            THEN
                AX ← AX – 6;
                AH ← AH – 1;
                AF ← 1;
                CF ← 1;
                AL ← AL AND 0FH;
            ELSE
                CF ← 0;
                AF ← 0;
                AL ← AL AND 0FH;
        FI;
FI;
```
### Flags Affected

The AF and CF flags are set to 1 if there is a decimal borrow; otherwise, they are cleared to 0. The OF, SF, ZF, and
PF flags are undefined.

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