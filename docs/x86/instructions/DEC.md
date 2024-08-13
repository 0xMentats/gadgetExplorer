<b>DEC</b> — Decrement by 1
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
		<td>FE /1</td>
		<td>DEC r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Decrement r/m8 by 1.</td>
	</tr>
	<tr>
		<td>REX + FE /1</td>
		<td>DEC r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Decrement r/m8 by 1.</td>
	</tr>
	<tr>
		<td>FF /1</td>
		<td>DEC r/m16</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Decrement r/m16 by 1.</td>
	</tr>
	<tr>
		<td>FF /1</td>
		<td>DEC r/m32</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Decrement r/m32 by 1.</td>
	</tr>
	<tr>
		<td>REX.W + FF /1</td>
		<td>DEC r/m64</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Decrement r/m64 by 1.</td>
	</tr>
	<tr>
		<td>48+rw</td>
		<td>DEC r16</td>
		<td>O</td>
		<td>N.E.</td>
		<td>Valid</td>
		<td>Decrement r16 by 1.</td>
	</tr>
	<tr>
		<td>48+rd</td>
		<td>DEC r32</td>
		<td>O</td>
		<td>N.E.</td>
		<td>Valid</td>
		<td>Decrement r32 by 1.</td>
	</tr>
</table>

\* In 64-bit mode, r/m8 can not be encoded to access the following byte registers if a REX prefix is used: AH, BH, CH, DH.

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
Subtracts 1 from the destination operand, while preserving the state of the CF flag. The destination operand can be
a register or a memory location. This instruction allows a loop counter to be updated without disturbing the CF flag.
(To perform a decrement operation that updates the CF flag, use a SUB instruction with an immediate operand of
1.)

This instruction can be used with a LOCK prefix to allow the instruction to be executed atomically.

In 64-bit mode, DEC r16 and DEC r32 are not encodable (because opcodes 48H through 4FH are REX prefixes).
Otherwise, the instruction’s 64-bit mode default operation size is 32 bits. Use of the REX.R prefix permits access to
additional registers (R8-R15). Use of the REX.W prefix promotes operation to 64 bits.

See the summary chart at the beginning of this section for encoding data and limits.

### Operation

```java
DEST ← DEST – 1;
```
### Flags Affected

The CF flag is not affected. The OF, SF, ZF, AF, and PF flags are set according to the result.

### Protected Mode Exceptions

<p>#GP(0)
If the destination operand is located in a non-writable segment.
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register contains a NULL segment selector.
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