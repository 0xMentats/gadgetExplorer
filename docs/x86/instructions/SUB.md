<b>SUB</b> — Subtract
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
		<td>2C ib</td>
		<td>SUB AL, imm8</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract imm8 from AL.</td>
	</tr>
	<tr>
		<td>2D iw</td>
		<td>SUB AX, imm16</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract imm16 from AX.</td>
	</tr>
	<tr>
		<td>2D id</td>
		<td>SUB EAX, imm32</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract imm32 from EAX.</td>
	</tr>
	<tr>
		<td>REX.W + 2D id</td>
		<td>SUB RAX, imm32</td>
		<td>I</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Subtract imm32 sign-extended to 64-bits from RAX.</td>
	</tr>
	<tr>
		<td>80 /5 ib</td>
		<td>SUB r/m8, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract imm8 from r/m8.</td>
	</tr>
	<tr>
		<td>REX + 80 /5 ib</td>
		<td>SUB r/m8*, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Subtract imm8 from r/m8.</td>
	</tr>
	<tr>
		<td>81 /5 iw</td>
		<td>SUB r/m16, imm16</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract imm16 from r/m16.</td>
	</tr>
	<tr>
		<td>81 /5 id</td>
		<td>SUB r/m32, imm32</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract imm32 from r/m32.</td>
	</tr>
	<tr>
		<td>REX.W + 81 /5 id</td>
		<td>SUB r/m64, imm32</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Subtract imm32 sign-extended to 64-bits from r/m64.</td>
	</tr>
	<tr>
		<td>83 /5 ib</td>
		<td>SUB r/m16, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract sign-extended imm8 from r/m16.</td>
	</tr>
	<tr>
		<td>83 /5 ib</td>
		<td>SUB r/m32, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract sign-extended imm8 from r/m32.</td>
	</tr>
	<tr>
		<td>REX.W + 83 /5 ib</td>
		<td>SUB r/m64, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Subtract sign-extended imm8 from r/m64.</td>
	</tr>
	<tr>
		<td>28 /r</td>
		<td>SUB r/m8, r8</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract r8 from r/m8.</td>
	</tr>
	<tr>
		<td>REX + 28 /r</td>
		<td>SUB r/m8*, r8*</td>
		<td>MR</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Subtract r8 from r/m8.</td>
	</tr>
	<tr>
		<td>29 /r</td>
		<td>SUB r/m16, r16</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract r16 from r/m16.</td>
	</tr>
	<tr>
		<td>29 /r</td>
		<td>SUB r/m32, r32</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract r32 from r/m32.</td>
	</tr>
	<tr>
		<td>REX.W + 29 /r</td>
		<td>SUB r/m64, r64</td>
		<td>MR</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Subtract r64 from r/m64.</td>
	</tr>
	<tr>
		<td>2A /r</td>
		<td>SUB r8, r/m8</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Subtract r/m8 from r8.</td>
	</tr>
	<tr>
		<td>REX + 2A /r</td>
		<td>SUB r8*, r/m8*</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Subtract r/m8 from r8.</td>
	</tr>
	<tr>
		<td>2B /r</td>
		<td>SUB r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Subtract r/m16 from r16.</td>
	</tr>
	<tr>
		<td>2B /r</td>
		<td>SUB r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Subtract r/m32 from r32.</td>
	</tr>
	<tr>
		<td>REX.W + 2B /r</td>
		<td>SUB r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Subtract r/m64 from r64.</td>
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
Subtracts the second operand (source operand) from the first operand (destination operand) and stores the result
in the destination operand. The destination operand can be a register or a memory location; the source operand
can be an immediate, register, or memory location. (However, two memory operands cannot be used in one
instruction.) When an immediate value is used as an operand, it is sign-extended to the length of the destination
operand format.
The SUB instruction performs integer subtraction. It evaluates the result for both signed and unsigned integer
operands and sets the OF and CF flags to indicate an overflow in the signed or unsigned result, respectively. The SF
flag indicates the sign of the signed result.

In 64-bit mode, the instruction’s default operation size is 32 bits. Using a REX prefix in the form of REX.R permits
access to additional registers (R8-R15). Using a REX prefix in the form of REX.W promotes operation to 64 bits. See
the summary chart at the beginning of this section for encoding data and limits.

This instruction can be used with a LOCK prefix to allow the instruction to be executed atomically.

### Operation

```java
DEST ← (DEST – SRC);
```
### Flags Affected

The OF, SF, ZF, AF, PF, and CF flags are set according to the result.

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