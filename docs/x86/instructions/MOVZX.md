<b>MOVZX</b> — Move with Zero-Extend
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
		<td>0F B6 /r</td>
		<td>MOVZX r16, r/m8</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move byte to word with zero-extension.</td>
	</tr>
	<tr>
		<td>0F B6 /r</td>
		<td>MOVZX r32, r/m8</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move byte to doubleword, zero-extension.</td>
	</tr>
	<tr>
		<td>REX.W + 0F B6 /r</td>
		<td>MOVZX r64, r/m8*</td>
		<td>RM</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Move byte to quadword, zero-extension.</td>
	</tr>
	<tr>
		<td>0F B7 /r</td>
		<td>MOVZX r32, r/m16</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move word to doubleword, zero-extension.</td>
	</tr>
	<tr>
		<td>REX.W + 0F B7 /r</td>
		<td>MOVZX r64, r/m16</td>
		<td>RM</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Move word to quadword, zero-extension.</td>
	</tr>
</table>

\* In 64-bit mode, r/m8 can not be encoded to access the following byte registers if the REX prefix is used: AH, BH, CH, DH.

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
		<td>RM</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Copies the contents of the source operand (register or memory location) to the destination operand (register) and
zero extends the value. The size of the converted value depends on the operand-size attribute.

In 64-bit mode, the instruction’s default operation size is 32 bits. Use of the REX.R prefix permits access to additional
 registers (R8-R15). Use of the REX.W prefix promotes operation to 64 bit operands. See the summary chart
at the beginning of this section for encoding data and limits.

### Operation

```java
DEST ← ZeroExtend(SRC);
```
### Flags Affected

None.

### Protected Mode Exceptions

<p>#GP(0)
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
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#GP
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS
If a memory operand effective address is outside the SS segment limit.
<p>#UD
If the LOCK prefix is used.

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
If the LOCK prefix is used.

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
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
