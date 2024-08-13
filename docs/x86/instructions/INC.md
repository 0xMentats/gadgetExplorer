<b>INC</b> — Increment by 1
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
		<td>FE /0</td>
		<td>INC r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Increment r/m byte by 1.</td>
	</tr>
	<tr>
		<td>REX + FE /0</td>
		<td>INC r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Increment r/m byte by 1.</td>
	</tr>
	<tr>
		<td>FF /0</td>
		<td>INC r/m16</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Increment r/m word by 1.</td>
	</tr>
	<tr>
		<td>FF /0</td>
		<td>INC r/m32</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Increment r/m doubleword by 1.</td>
	</tr>
	<tr>
		<td>REX.W + FF /0</td>
		<td>INC r/m64</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Increment r/m quadword by 1.</td>
	</tr>
	<tr>
		<td>40+ rw**</td>
		<td>INC r16</td>
		<td>O</td>
		<td>N.E.</td>
		<td>Valid</td>
		<td>Increment word register by 1.</td>
	</tr>
	<tr>
		<td>40+ rd</td>
		<td>INC r32</td>
		<td>O</td>
		<td>N.E.</td>
		<td>Valid</td>
		<td>Increment doubleword register by 1.</td>
	</tr>
</table>

\* In 64-bit mode, r/m8 can not be encoded to access the following byte registers if a REX prefix is used: AH, BH, CH, DH.
\*\* 40H through 47H are REX prefixes in 64-bit mode.

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
		<td>M</td>
		<td>ModRM:r/m (r, w)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>O</td>
		<td>opcode + rd (r, w)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Adds 1 to the destination operand, while preserving the state of the CF flag. The destination operand can be a
register or a memory location. This instruction allows a loop counter to be updated without disturbing the CF flag.
(Use a ADD instruction with an immediate operand of 1 to perform an increment operation that does updates the
CF flag.)

This instruction can be used with a LOCK prefix to allow the instruction to be executed atomically.

In 64-bit mode, INC r16 and INC r32 are not encodable (because opcodes 40H through 47H are REX prefixes).
Otherwise, the instruction’s 64-bit mode default operation size is 32 bits. Use of the REX.R prefix permits access to
additional registers (R8-R15). Use of the REX.W prefix promotes operation to 64 bits.

### Operation

```java
DEST ← DEST + 1;
```
#### AFlags Affected
```java
The CF flag is not affected. The OF, SF, ZF, AF, and PF flags are set according to the result.
```
### Protected Mode Exceptions

<p>#GP(0)
If the destination operand is located in a non-writable segment.
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register is used to access memory and it contains a NULLsegment
selector.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.
<p>#UD
If the LOCK prefix is used but the destination is not a memory operand.

### Real-Address Mode Exceptions
<p>#GP
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS
If a memory operand effective address is outside the SS segment limit.
<p>#UD
If the LOCK prefix is used but the destination is not a memory operand.

### Virtual-8086 Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made.
<p>#UD
If the LOCK prefix is used but the destination is not a memory operand.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#SS(0)
If a memory address referencing the SS segment is in a non-canonical form.
<p>#GP(0)
If the memory address is in a non-canonical form.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.
<p>#UD
If the LOCK prefix is used but the destination is not a memory operand.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
