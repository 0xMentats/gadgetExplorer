<b>ADD</b> — Add
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
		<td>04 ib</td>
		<td>ADD AL, imm8</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add imm8 to AL.</td>
	</tr>
	<tr>
		<td>05 iw</td>
		<td>ADD AX, imm16</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add imm16 to AX.</td>
	</tr>
	<tr>
		<td>05 id</td>
		<td>ADD EAX, imm32</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add imm32 to EAX.</td>
	</tr>
	<tr>
		<td>REX.W + 05 id</td>
		<td>ADD RAX, imm32</td>
		<td>I</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Add imm32 sign-extended to 64-bits to RAX.</td>
	</tr>
	<tr>
		<td>80 /0 ib</td>
		<td>ADD r/m8, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add imm8 to r/m8.</td>
	</tr>
	<tr>
		<td>REX + 80 /0 ib</td>
		<td>ADD r/m8*, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Add sign-extended imm8 to r/m8.</td>
	</tr>
	<tr>
		<td>81 /0 iw</td>
		<td>ADD r/m16, imm16</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add imm16 to r/m16.</td>
	</tr>
	<tr>
		<td>81 /0 id</td>
		<td>ADD r/m32, imm32</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add imm32 to r/m32.</td>
	</tr>
	<tr>
		<td>REX.W + 81 /0 id</td>
		<td>ADD r/m64, imm32</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Add imm32 sign-extended to 64-bits to r/m64.</td>
	</tr>
	<tr>
		<td>83 /0 ib</td>
		<td>ADD r/m16, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add sign-extended imm8 to r/m16.</td>
	</tr>
	<tr>
		<td>83 /0 ib</td>
		<td>ADD r/m32, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add sign-extended imm8 to r/m32.</td>
	</tr>
	<tr>
		<td>REX.W + 83 /0 ib</td>
		<td>ADD r/m64, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Add sign-extended imm8 to r/m64.</td>
	</tr>
	<tr>
		<td>00 /r</td>
		<td>ADD r/m8, r8</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add r8 to r/m8.</td>
	</tr>
	<tr>
		<td>REX + 00 /r</td>
		<td>ADD r/m8*, r8*</td>
		<td>MR</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Add r8 to r/m8.</td>
	</tr>
	<tr>
		<td>01 /r</td>
		<td>ADD r/m16, r16</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add r16 to r/m16.</td>
	</tr>
	<tr>
		<td>01 /r</td>
		<td>ADD r/m32, r32</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add r32 to r/m32.</td>
	</tr>
	<tr>
		<td>REX.W + 01 /r</td>
		<td>ADD r/m64, r64</td>
		<td>MR</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Add r64 to r/m64.</td>
	</tr>
	<tr>
		<td>02 /r</td>
		<td>ADD r8, r/m8</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Add r/m8 to r8.</td>
	</tr>
	<tr>
		<td>REX + 02 /r</td>
		<td>ADD r8*, r/m8*</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Add r/m8 to r8.</td>
	</tr>
	<tr>
		<td>03 /r</td>
		<td>ADD r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Add r/m16 to r16.</td>
	</tr>
	<tr>
		<td>03 /r</td>
		<td>ADD r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Add r/m32 to r32.</td>
	</tr>
	<tr>
		<td>REX.W + 03 /r</td>
		<td>ADD r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Add r/m64 to r64.</td>
	</tr>
</table>

\*In 64-bit mode, r/m8 can not be encoded to access the following byte registers if a REX prefix is used: AH, BH, CH, DH.

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
		<td>ModRM:reg (r, w)</td>
		<td>ModRM:r/m (r)</td>
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
		<td>MI</td>
		<td>ModRM:r/m (r, w)</td>
		<td>imm8/16/32</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>I</td>
		<td>AL/AX/EAX/RAX</td>
		<td>imm8/16/32</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Adds the destination operand (first operand) and the source operand (second operand) and then stores the result
in the destination operand. The destination operand can be a register or a memory location; the source operand
can be an immediate, a register, or a memory location. (However, two memory operands cannot be used in one
instruction.) When an immediate value is used as an operand, it is sign-extended to the length of the destination
operand format.

The ADD instruction performs integer addition. It evaluates the result for both signed and unsigned integer operands
 and sets the CF and OF flags to indicate a carry (overflow) in the signed or unsigned result, respectively. The
SF flag indicates the sign of the signed result.
This instruction can be used with a LOCK prefix to allow the instruction to be executed atomically.

In 64-bit mode, the instruction’s default operation size is 32 bits. Using a REX prefix in the form of REX.R permits
access to additional registers (R8-R15). Using a REX prefix in the form of REX.W promotes operation to 64 bits. See
the summary chart at the beginning of this section for encoding data and limits.

### Operation

```java
DEST ← DEST + SRC;
```
### Flags Affected

The OF, SF, ZF, AF, CF, and PF flags are set according to the result.

### Protected Mode Exceptions

<p>#GP(0)
If the destination is located in a non-writable segment.
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register is used to access memory and it contains a NULL segment
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