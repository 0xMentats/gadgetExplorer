<b>ADC</b> — Add with Carry
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
		<td>14 ib</td>
		<td>ADC AL, imm8</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add with carry imm8 to AL.</td>
	</tr>
	<tr>
		<td>15 iw</td>
		<td>ADC AX, imm16</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add with carry imm16 to AX.</td>
	</tr>
	<tr>
		<td>15 id</td>
		<td>ADC EAX, imm32</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add with carry imm32 to EAX.</td>
	</tr>
	<tr>
		<td>REX.W + 15 id</td>
		<td>ADC RAX, imm32</td>
		<td>I</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Add with carry imm32 sign extended to 64-bits to RAX.</td>
	</tr>
	<tr>
		<td>80 /2 ib</td>
		<td>ADC r/m8, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add with carry imm8 to r/m8.</td>
	</tr>
	<tr>
		<td>REX + 80 /2 ib</td>
		<td>ADC r/m8*, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Add with carry imm8 to r/m8.</td>
	</tr>
	<tr>
		<td>81 /2 iw</td>
		<td>ADC r/m16, imm16</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add with carry imm16 to r/m16.</td>
	</tr>
	<tr>
		<td>81 /2 id</td>
		<td>ADC r/m32, imm32</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add with CF imm32 to r/m32.</td>
	</tr>
	<tr>
		<td>REX.W + 81 /2 id</td>
		<td>ADC r/m64, imm32</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Add with CF imm32 sign extended to 64-bits to r/m64.</td>
	</tr>
	<tr>
		<td>83 /2 ib</td>
		<td>ADC r/m16, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add with CF sign-extended imm8 to r/m16.</td>
	</tr>
	<tr>
		<td>83 /2 ib</td>
		<td>ADC r/m32, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add with CF sign-extended imm8 into r/m32.</td>
	</tr>
	<tr>
		<td>REX.W + 83 /2 ib</td>
		<td>ADC r/m64, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Add with CF sign-extended imm8 into r/m64.</td>
	</tr>
	<tr>
		<td>10 /r</td>
		<td>ADC r/m8, r8</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add with carry byte register to r/m8.</td>
	</tr>
	<tr>
		<td>REX + 10 /r</td>
		<td>ADC r/m8*, r8*</td>
		<td>MR</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Add with carry byte register to r/m64.</td>
	</tr>
	<tr>
		<td>11 /r</td>
		<td>ADC r/m16, r16</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add with carry r16 to r/m16.</td>
	</tr>
	<tr>
		<td>11 /r</td>
		<td>ADC r/m32, r32</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add with CF r32 to r/m32.</td>
	</tr>
	<tr>
		<td>REX.W + 11 /r</td>
		<td>ADC r/m64, r64</td>
		<td>MR</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Add with CF r64 to r/m64.</td>
	</tr>
	<tr>
		<td>12 /r</td>
		<td>ADC r8, r/m8</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add with carry r/m8 to byte register.</td>
	</tr>
	<tr>
		<td>REX + 12 /r</td>
		<td>ADC r8*, r/m8*</td>
		<td>RM</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Add with carry r/m64 to byte register.</td>
	</tr>
	<tr>
		<td>13 /r</td>
		<td>ADC r16, r/m16</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add with carry r/m16 to r16.</td>
	</tr>
	<tr>
		<td>13 /r</td>
		<td>ADC r32, r/m32</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add with CF r/m32 to r32.</td>
	</tr>
	<tr>
		<td>REX.W + 13 /r</td>
		<td>ADC r64, r/m64</td>
		<td>RM</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Add with CF r/m64 to r64.</td>
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
Adds the destination operand (first operand), the source operand (second operand), and the carry (CF) flag and
stores the result in the destination operand. The destination operand can be a register or a memory location; the
source operand can be an immediate, a register, or a memory location. (However, two memory operands cannot be
used in one instruction.) The state of the CF flag represents a carry from a previous addition. When an immediate
value is used as an operand, it is sign-extended to the length of the destination operand format.
The ADC instruction does not distinguish between signed or unsigned operands. Instead, the processor evaluates
the result for both data types and sets the OF and CF flags to indicate a carry in the signed or unsigned result,
respectively. The SF flag indicates the sign of the signed result.

The ADC instruction is usually executed as part of a multibyte or multiword addition in which an ADD instruction is
followed by an ADC instruction.

This instruction can be used with a LOCK prefix to allow the instruction to be executed atomically.

In 64-bit mode, the instruction’s default operation size is 32 bits. Using a REX prefix in the form of REX.R permits
access to additional registers (R8-R15). Using a REX prefix in the form of REX.W promotes operation to 64 bits. See
the summary chart at the beginning of this section for encoding data and limits.

### Operation

```java
DEST ← DEST + SRC + CF;
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
ADC:
extern unsigned char _addcarry_u8(unsigned char c_in, unsigned char src1, unsigned char src2, unsigned char *sum_out);
ADC:
extern unsigned char _addcarry_u16(unsigned char c_in, unsigned short src1, unsigned short src2, unsigned short 
*sum_out);
ADC:
extern unsigned char _addcarry_u32(unsigned char c_in, unsigned int src1, unsigned char int, unsigned int *sum_out);
ADC:
extern unsigned char _addcarry_u64(unsigned char c_in, unsigned __int64 src1, unsigned __int64 src2, unsigned __int64 
*sum_out);
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