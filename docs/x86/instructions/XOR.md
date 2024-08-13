<b>XOR</b> — Logical Exclusive OR
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
		<td>34 ib</td>
		<td>XOR AL, imm8</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>AL XOR imm8.</td>
	</tr>
	<tr>
		<td>35 iw</td>
		<td>XOR AX, imm16</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>AX XOR imm16.</td>
	</tr>
	<tr>
		<td>35 id</td>
		<td>XOR EAX, imm32</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>EAX XOR imm32.</td>
	</tr>
	<tr>
		<td>REX.W + 35 id</td>
		<td>XOR RAX, imm32</td>
		<td>I</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>RAX XOR imm32 (sign-extended).</td>
	</tr>
	<tr>
		<td>80 /6 ib</td>
		<td>XOR r/m8, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>r/m8 XOR imm8.</td>
	</tr>
	<tr>
		<td>REX + 80 /6 ib</td>
		<td>XOR r/m8*, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>r/m8 XOR imm8.</td>
	</tr>
	<tr>
		<td>81 /6 iw</td>
		<td>XOR r/m16, imm16</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>r/m16 XOR imm16.</td>
	</tr>
	<tr>
		<td>81 /6 id</td>
		<td>XOR r/m32, imm32</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>r/m32 XOR imm32.</td>
	</tr>
	<tr>
		<td>REX.W + 81 /6 id</td>
		<td>XOR r/m64, imm32</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>r/m64 XOR imm32 (sign-extended).</td>
	</tr>
	<tr>
		<td>83 /6 ib</td>
		<td>XOR r/m16, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>r/m16 XOR imm8 (sign-extended).</td>
	</tr>
	<tr>
		<td>83 /6 ib</td>
		<td>XOR r/m32, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>r/m32 XOR imm8 (sign-extended).</td>
	</tr>
	<tr>
		<td>REX.W + 83 /6 ib</td>
		<td>XOR r/m64, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>r/m64 XOR imm8 (sign-extended).</td>
	</tr>
	<tr>
		<td>30 /r</td>
		<td>XOR r/m8, r8</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>r/m8 XOR r8.</td>
	</tr>
	<tr>
		<td>REX + 30 /r</td>
		<td>XOR r/m8*, r8*</td>
		<td>MR</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>r/m8 XOR r8.</td>
	</tr>
	<tr>
		<td>31 /r</td>
		<td>XOR r/m16, r16</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>r/m16 XOR r16.</td>
	</tr>
	<tr>
		<td>31 /r</td>
		<td>XOR r/m32, r32</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>r/m32 XOR r32.</td>
	</tr>
	<tr>
		<td>REX.W + 31 /r</td>
		<td>XOR r/m64, r64</td>
		<td>MR</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>r/m64 XOR r64.</td>
	</tr>
	<tr>
		<td>32 /r</td>
		<td>XOR r8, r/m8</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>r8 XOR r/m8.</td>
	</tr>
	<tr>
		<td>REX + 32 /r</td>
		<td>XOR r8*, r/m8*</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>r8 XOR r/m8.</td>
	</tr>
	<tr>
		<td>33 /r</td>
		<td>XOR r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>r16 XOR r/m16.</td>
	</tr>
	<tr>
		<td>33 /r</td>
		<td>XOR r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>r32 XOR r/m32.</td>
	</tr>
	<tr>
		<td>REX.W + 33 /r</td>
		<td>XOR r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>r64 XOR r/m64.</td>
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
		<td>I</td>
		<td>AL/AX/EAX/RAX</td>
		<td>imm8/16/32</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>MI</td>
		<td>ModRM:r/m (r, w)</td>
		<td>imm8/16/32</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>MR</td>
		<td>ModRM:r/m (r, w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>RM</td>
		<td>ModRM:reg (r, w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Performs a bitwise exclusive OR (XOR) operation on the destination (first) and source (second) operands and
stores the result in the destination operand location. The source operand can be an immediate, a register, or a
memory location; the destination operand can be a register or a memory location. (However, two memory operands
 cannot be used in one instruction.) Each bit of the result is 1 if the corresponding bits of the operands are
different; each bit is 0 if the corresponding bits are the same.

This instruction can be used with a LOCK prefix to allow the instruction to be executed atomically.
In 64-bit mode, using a REX prefix in the form of REX.R permits access to additional registers (R8-R15). Using a
REX prefix in the form of REX.W promotes operation to 64 bits. See the summary chart at the beginning of this
section for encoding data and limits.

### Operation

```java
DEST ← DEST XOR SRC;
```
### Flags Affected

The OF and CF flags are cleared; the SF, ZF, and PF flags are set according to the result. The state of the AF flag is
undefined.

### Protected Mode Exceptions

<p>#GP(0)
If the destination operand points to a non-writable segment.
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