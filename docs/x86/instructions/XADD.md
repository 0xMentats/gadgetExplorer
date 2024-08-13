<b>XADD</b> — Exchange and Add
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
		<td>0F C0 /r</td>
		<td>XADD r/m8, r8</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Exchange r8 and r/m8; load sum into r/m8.</td>
	</tr>
	<tr>
		<td>REX + 0F C0 /r</td>
		<td>XADD r/m8*, r8*</td>
		<td>MR</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Exchange r8 and r/m8; load sum into r/m8.</td>
	</tr>
	<tr>
		<td>0F C1 /r</td>
		<td>XADD r/m16, r16</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Exchange r16 and r/m16; load sum into r/m16.</td>
	</tr>
	<tr>
		<td>0F C1 /r</td>
		<td>XADD r/m32, r32</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Exchange r32 and r/m32; load sum into r/m32.</td>
	</tr>
	<tr>
		<td>REX.W + 0F C1 /r</td>
		<td>XADD r/m64, r64</td>
		<td>MR</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Exchange r64 and r/m64; load sum into r/m64.</td>
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
		<td>MR</td>
		<td>ModRM:r/m (r, w)</td>
		<td>ModRM:reg (r, w)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Exchanges the first operand (destination operand) with the second operand (source operand), then loads the sum
of the two values into the destination operand. The destination operand can be a register or a memory location; the
source operand is a register.

In 64-bit mode, the instruction’s default operation size is 32 bits. Using a REX prefix in the form of REX.R permits
access to additional registers (R8-R15). Using a REX prefix in the form of REX.W promotes operation to 64 bits. See
the summary chart at the beginning of this section for encoding data and limits.

This instruction can be used with a LOCK prefix to allow the instruction to be executed atomically.

### IA-32 Architecture Compatibility

IA-32 processors earlier than the Intel486 processor do not recognize this instruction. If this instruction is used,
you should provide an equivalent code sequence that runs on earlier processors.

### Operation

```java
TEMP ← SRC + DEST;
SRC ← DEST;
DEST ← TEMP;
```
### Flags Affected

The CF, PF, AF, SF, ZF, and OF flags are set according to the result of the addition, which is stored in the destination
operand.

### Protected Mode Exceptions

<p>#GP(0)
If the destination is located in a non-writable segment.
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