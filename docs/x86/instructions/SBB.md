<b>SBB</b> — Integer Subtraction with Borrow
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
		<td>1C ib</td>
		<td>SBB AL, imm8</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract with borrow imm8 from AL.</td>
	</tr>
	<tr>
		<td>1D iw</td>
		<td>SBB AX, imm16</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract with borrow imm16 from AX.</td>
	</tr>
	<tr>
		<td>1D id</td>
		<td>SBB EAX, imm32</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract with borrow imm32 from EAX.</td>
	</tr>
	<tr>
		<td>REX.W + 1D id</td>
		<td>SBB RAX, imm32</td>
		<td>I</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Subtract with borrow sign-extended imm.32 to 64-bits from RAX.</td>
	</tr>
	<tr>
		<td>80 /3 ib</td>
		<td>SBB r/m8, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract with borrow imm8 from r/m8.</td>
	</tr>
	<tr>
		<td>REX + 80 /3 ib</td>
		<td>SBB r/m8*, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Subtract with borrow imm8 from r/m8.</td>
	</tr>
	<tr>
		<td>81 /3 iw</td>
		<td>SBB r/m16, imm16</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract with borrow imm16 from r/m16.</td>
	</tr>
	<tr>
		<td>81 /3 id</td>
		<td>SBB r/m32, imm32</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract with borrow imm32 from r/m32.</td>
	</tr>
	<tr>
		<td>REX.W + 81 /3 id</td>
		<td>SBB r/m64, imm32</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Subtract with borrow sign-extended imm32 to 64-bits from r/m64.</td>
	</tr>
	<tr>
		<td>83 /3 ib</td>
		<td>SBB r/m16, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract with borrow sign-extended imm8 from r/m16.</td>
	</tr>
	<tr>
		<td>83 /3 ib</td>
		<td>SBB r/m32, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract with borrow sign-extended imm8 from r/m32.</td>
	</tr>
	<tr>
		<td>REX.W + 83 /3 ib</td>
		<td>SBB r/m64, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Subtract with borrow sign-extended imm8 from r/m64.</td>
	</tr>
	<tr>
		<td>18 /r</td>
		<td>SBB r/m8, r8</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract with borrow r8 from r/m8.</td>
	</tr>
	<tr>
		<td>REX + 18 /r</td>
		<td>SBB r/m8*, r8</td>
		<td>MR</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Subtract with borrow r8 from r/m8.</td>
	</tr>
	<tr>
		<td>19 /r</td>
		<td>SBB r/m16, r16</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract with borrow r16 from r/m16.</td>
	</tr>
	<tr>
		<td>19 /r</td>
		<td>SBB r/m32, r32</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract with borrow r32 from r/m32.</td>
	</tr>
	<tr>
		<td>REX.W + 19 /r</td>
		<td>SBB r/m64, r64</td>
		<td>MR</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Subtract with borrow r64 from r/m64.</td>
	</tr>
	<tr>
		<td>1A /r</td>
		<td>SBB r8, r/m8</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Subtract with borrow r/m8 from r8.</td>
	</tr>
	<tr>
		<td>REX + 1A /r</td>
		<td>SBB r8*, r/m8*</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Subtract with borrow r/m8 from r8.</td>
	</tr>
	<tr>
		<td>1B /r</td>
		<td>SBB r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Subtract with borrow r/m16 from r16.</td>
	</tr>
	<tr>
		<td>1B /r</td>
		<td>SBB r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Subtract with borrow r/m32 from r32.</td>
	</tr>
	<tr>
		<td>REX.W + 1B /r</td>
		<td>SBB r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Subtract with borrow r/m64 from r64.</td>
	</tr>
</table>

\*  In 64-bit mode, r/m8 can not be encoded to access the following byte registers if a REX prefix is used: AH, BH, CH, DH.

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
		<td>ModRM:r/m (w)</td>
		<td>imm8/16/32</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>MR</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
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
Adds the source operand (second operand) and the carry (CF) flag, and subtracts the result from the destination
operand (first operand). The result of the subtraction is stored in the destination operand. The destination operand
can be a register or a memory location; the source operand can be an immediate, a register, or a memory location.
(However, two memory operands cannot be used in one instruction.) The state of the CF flag represents a borrow
from a previous subtraction.

When an immediate value is used as an operand, it is sign-extended to the length of the destination operand
format.

The SBB instruction does not distinguish between signed or unsigned operands. Instead, the processor evaluates
the result for both data types and sets the OF and CF flags to indicate a borrow in the signed or unsigned result,
respectively. The SF flag indicates the sign of the signed result.

The SBB instruction is usually executed as part of a multibyte or multiword subtraction in which a SUB instruction
is followed by a SBB instruction.

This instruction can be used with a LOCK prefix to allow the instruction to be executed atomically.

In 64-bit mode, the instruction’s default operation size is 32 bits. Using a REX prefix in the form of REX.R permits
access to additional registers (R8-R15). Using a REX prefix in the form of REX.W promotes operation to 64 bits. See
the summary chart at the beginning of this section for encoding data and limits.

### Operation

```java
DEST ← (DEST – (SRC + CF));
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
SBB:
extern unsigned char _subborrow_u8(unsigned char c_in, unsigned char src1, unsigned char src2, unsigned char *diff_out);
SBB:
extern unsigned char _subborrow_u16(unsigned char c_in, unsigned short src1, unsigned short src2, unsigned short 
*diff_out);
SBB:
extern unsigned char _subborrow_u32(unsigned char c_in, unsigned int src1, unsigned char int, unsigned int *diff_out);
SBB:
extern unsigned char _subborrow_u64(unsigned char c_in, unsigned __int64 src1, unsigned __int64 src2, unsigned 
__int64 *diff_out);
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