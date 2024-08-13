<b>CBW / CWDE / CDQE</b> — Convert Byte to Word/Convert Word to Doubleword/Convert Doubleword to
Quadword
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
		<td>98</td>
		<td>CBW</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>AX ← sign-extend of AL.</td>
	</tr>
	<tr>
		<td>98</td>
		<td>CWDE</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>EAX ← sign-extend of AX.</td>
	</tr>
	<tr>
		<td>REX.W + 98</td>
		<td>CDQE</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>RAX ← sign-extend of EAX.</td>
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
Double the size of the source operand by means of sign extension. The CBW (convert byte to word) instruction
copies the sign (bit 7) in the source operand into every bit in the AH register. The CWDE (convert word to double-
word) instruction copies the sign (bit 15) of the word in the AX register into the high 16 bits of the EAX register.

CBW and CWDE reference the same opcode. The CBW instruction is intended for use when the operand-size attri-
bute is 16; CWDE is intended for use when the operand-size attribute is 32. Some assemblers may force the
operand size. Others may treat these two mnemonics as synonyms (CBW/CWDE) and use the setting of the
operand-size attribute to determine the size of values to be converted.

In 64-bit mode, the default operation size is the size of the destination register. Use of the REX.W prefix promotes
this instruction (CDQE when promoted) to operate on 64-bit operands. In which case, CDQE copies the sign (bit
31) of the doubleword in the EAX register into the high 32 bits of RAX.

### Operation

```java
IF OperandSize = 16 (* Instruction = CBW *)
    THEN 
        AX ← SignExtend(AL);
    ELSE IF (OperandSize = 32, Instruction = CWDE)
        EAX ← SignExtend(AX); FI;
    ELSE (* 64-Bit Mode, OperandSize = 64, Instruction = CDQE*)
        RAX ← SignExtend(EAX);
FI;
```
### Flags Affected

None.

### Exceptions (All Operating Modes)

<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
