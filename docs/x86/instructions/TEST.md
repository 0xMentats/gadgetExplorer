<b>TEST</b> — Logical Compare
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
		<td>A8 ib</td>
		<td>TEST AL, imm8</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>AND imm8 with AL; set SF, ZF, PF according to result.</td>
	</tr>
	<tr>
		<td>A9 iw</td>
		<td>TEST AX, imm16</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>AND imm16 with AX; set SF, ZF, PF according to result.</td>
	</tr>
	<tr>
		<td>A9 id</td>
		<td>TEST EAX, imm32</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>AND imm32 with EAX; set SF, ZF, PF according to result.</td>
	</tr>
	<tr>
		<td>REX.W + A9 id</td>
		<td>TEST RAX, imm32</td>
		<td>I</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>AND imm32 sign-extended to 64-bits with RAX; set SF, ZF, PF according to result.</td>
	</tr>
	<tr>
		<td>F6 /0 ib</td>
		<td>TEST r/m8, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>AND imm8 with r/m8; set SF, ZF, PF according to result.</td>
	</tr>
	<tr>
		<td>REX + F6 /0 ib</td>
		<td>TEST r/m8*, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>AND imm8 with r/m8; set SF, ZF, PF according to result.</td>
	</tr>
	<tr>
		<td>F7 /0 iw</td>
		<td>TEST r/m16, imm16</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>AND imm16 with r/m16; set SF, ZF, PF according to result.</td>
	</tr>
	<tr>
		<td>F7 /0 id</td>
		<td>TEST r/m32, imm32</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>AND imm32 with r/m32; set SF, ZF, PF according to result.</td>
	</tr>
	<tr>
		<td>REX.W + F7 /0 id</td>
		<td>TEST r/m64, imm32</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>AND imm32 sign-extended to 64-bits with r/m64; set SF, ZF, PF according to result.</td>
	</tr>
	<tr>
		<td>84 /r</td>
		<td>TEST r/m8, r8</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>AND r8 with r/m8; set SF, ZF, PF according to result.</td>
	</tr>
	<tr>
		<td>REX + 84 /r</td>
		<td>TEST r/m8*, r8*</td>
		<td>MR</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>AND r8 with r/m8; set SF, ZF, PF according to result.</td>
	</tr>
	<tr>
		<td>85 /r</td>
		<td>TEST r/m16, r16</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>AND r16 with r/m16; set SF, ZF, PF according to result.</td>
	</tr>
	<tr>
		<td>85 /r</td>
		<td>TEST r/m32, r32</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>AND r32 with r/m32; set SF, ZF, PF according to result.</td>
	</tr>
	<tr>
		<td>REX.W + 85 /r</td>
		<td>TEST r/m64, r64</td>
		<td>MR</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>AND r64 with r/m64; set SF, ZF, PF according to result.</td>
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
		<td>ModRM:r/m (r)</td>
		<td>imm8/16/32</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>MR</td>
		<td>ModRM:r/m (r)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Computes the bit-wise logical AND of first operand (source 1 operand) and the second operand (source 2 operand)
and sets the SF, ZF, and PF status flags according to the result. The result is then discarded.

In 64-bit mode, using a REX prefix in the form of REX.R permits access to additional registers (R8-R15). Using a
REX prefix in the form of REX.W promotes operation to 64 bits. See the summary chart at the beginning of this
section for encoding data and limits.

### Operation

```java
TEMP ← SRC1 AND SRC2;
SF ← MSB(TEMP);
IF TEMP = 0
    THEN ZF ← 1;
    ELSE ZF ← 0;
FI:
PF ← BitwiseXNOR(TEMP[0:7]);
CF ← 0;
OF ← 0;
(* AF is undefined *)
```
### Flags Affected
The OF and CF flags are set to 0. The SF, ZF, and PF flags are set according to the result (see the “Operation” section
above). The state of the AF flag is undefined.

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