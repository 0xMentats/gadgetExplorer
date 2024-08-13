<b>PUSHA / PUSHAD</b> — Push All General-Purpose Registers
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
		<td>60</td>
		<td>PUSHA</td>
		<td>ZO</td>
		<td>Invalid</td>
		<td>Valid</td>
		<td>Push AX, CX, DX, BX, original SP, BP, SI, and DI.</td>
	</tr>
	<tr>
		<td>60</td>
		<td>PUSHAD</td>
		<td>ZO</td>
		<td>Invalid</td>
		<td>Valid</td>
		<td>Push EAX, ECX, EDX, EBX, original ESP, EBP, ESI, and EDI.</td>
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
Pushes the contents of the general-purpose registers onto the stack. The registers are stored on the stack in the
following order: EAX, ECX, EDX, EBX, ESP (original value), EBP, ESI, and EDI (if the current operand-size attribute
is 32) and AX, CX, DX, BX, SP (original value), BP, SI, and DI (if the operand-size attribute is 16). These instructions
 perform the reverse operation of the POPA/POPAD instructions. The value pushed for the ESP or SP register is
its value before prior to pushing the first register (see the “Operation” section below).

The PUSHA (push all) and PUSHAD (push all double) mnemonics reference the same opcode. The PUSHA instruction
 is intended for use when the operand-size attribute is 16 and the PUSHAD instruction for when the operand-
size attribute is 32. Some assemblers may force the operand size to 16 when PUSHA is used and to 32 when
PUSHAD is used. Others may treat these mnemonics as synonyms (PUSHA/PUSHAD) and use the current setting
of the operand-size attribute to determine the size of values to be pushed from the stack, regardless of the
mnemonic used.

In the real-address mode, if the ESP or SP register is 1, 3, or 5 when PUSHA/PUSHAD executes: an \#SS exception
is generated but not delivered (the stack error reported prevents \#SS delivery). Next, the processor generates a
\#DF exception and enters a shutdown state as described in the \#DF discussion in Chapter 6 of the Intel® 64 and
IA-32 Architectures Software Developer’s Manual, Volume 3A.

This instruction executes as described in compatibility mode and legacy mode. It is not valid in 64-bit mode.

### Operation

```java
IF 64-bit Mode 
    THEN #UD
FI;
IF OperandSize = 32 (* PUSHAD instruction *)
    THEN
        Temp ← (ESP);
        Push(EAX);
        Push(ECX);
        Push(EDX);
        Push(EBX);
        Push(Temp);
        Push(EBP);
        Push(ESI);
        Push(EDI);
    ELSE (* OperandSize = 16, PUSHA instruction *)
        Temp ← (SP);
        Push(AX);
        Push(CX);
        Push(DX);
        Push(BX);
        Push(Temp);
        Push(BP);
        Push(SI);
        Push(DI);
FI;
```
### Flags Affected
None.

### Protected Mode Exceptions

<p>#SS(0)
If the starting or ending stack address is outside the stack segment limit.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If an unaligned memory reference is made while the current privilege level is 3 and alignment
checking is enabled.
<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#GP
If the ESP or SP register contains 7, 9, 11, 13, or 15.
<p>#UD
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

<p>#GP(0)
If the ESP or SP register contains 7, 9, 11, 13, or 15.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If an unaligned memory reference is made while alignment checking is enabled.
<p>#UD
If the LOCK prefix is used.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#UD
If in 64-bit mode.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
