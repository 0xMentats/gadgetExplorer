<b>CMP</b> — Compare Two Operands
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
		<td>3C ib</td>
		<td>CMP AL, imm8</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare imm8 with AL.</td>
	</tr>
	<tr>
		<td>3D iw</td>
		<td>CMP AX, imm16</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare imm16 with AX.</td>
	</tr>
	<tr>
		<td>3D id</td>
		<td>CMP EAX, imm32</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare imm32 with EAX.</td>
	</tr>
	<tr>
		<td>REX.W + 3D id</td>
		<td>CMP RAX, imm32</td>
		<td>I</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Compare imm32 sign-extended to 64-bits with RAX.</td>
	</tr>
	<tr>
		<td>80 /7 ib</td>
		<td>CMP r/m8, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare imm8 with r/m8.</td>
	</tr>
	<tr>
		<td>REX + 80 /7 ib</td>
		<td>CMP r/m8*, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Compare imm8 with r/m8.</td>
	</tr>
	<tr>
		<td>81 /7 iw</td>
		<td>CMP r/m16, imm16</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare imm16 with r/m16.</td>
	</tr>
	<tr>
		<td>81 /7 id</td>
		<td>CMP r/m32, imm32</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare imm32 with r/m32.</td>
	</tr>
	<tr>
		<td>REX.W + 81 /7 id</td>
		<td>CMP r/m64, imm32</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Compare imm32 sign-extended to 64-bits with r/m64.</td>
	</tr>
	<tr>
		<td>83 /7 ib</td>
		<td>CMP r/m16, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare imm8 with r/m16.</td>
	</tr>
	<tr>
		<td>83 /7 ib</td>
		<td>CMP r/m32, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare imm8 with r/m32.</td>
	</tr>
	<tr>
		<td>REX.W + 83 /7 ib</td>
		<td>CMP r/m64, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Compare imm8 with r/m64.</td>
	</tr>
	<tr>
		<td>38 /r</td>
		<td>CMP r/m8, r8</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare r8 with r/m8.</td>
	</tr>
	<tr>
		<td>REX + 38 /r</td>
		<td>CMP r/m8*, r8*</td>
		<td>MR</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Compare r8 with r/m8.</td>
	</tr>
	<tr>
		<td>39 /r</td>
		<td>CMP r/m16, r16</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare r16 with r/m16.</td>
	</tr>
	<tr>
		<td>39 /r</td>
		<td>CMP r/m32, r32</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare r32 with r/m32.</td>
	</tr>
	<tr>
		<td>REX.W + 39 /r</td>
		<td>CMP r/m64,r64</td>
		<td>MR</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Compare r64 with r/m64.</td>
	</tr>
	<tr>
		<td>3A /r</td>
		<td>CMP r8, r/m8</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Compare r/m8 with r8.</td>
	</tr>
	<tr>
		<td>REX + 3A /r</td>
		<td>CMP r8*, r/m8*</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Compare r/m8 with r8.</td>
	</tr>
	<tr>
		<td>3B /r</td>
		<td>CMP r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Compare r/m16 with r16.</td>
	</tr>
	<tr>
		<td>3B /r</td>
		<td>CMP r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Compare r/m32 with r32.</td>
	</tr>
	<tr>
		<td>REX.W + 3B /r</td>
		<td>CMP r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Compare r/m64 with r64.</td>
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
		<td>RM</td>
		<td>ModRM:reg (r)</td>
		<td>ModRM:r/m (r)</td>
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
	<tr>
		<td>MI</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8/16/32</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>I</td>
		<td>AL/AX/EAX/RAX (r)</td>
		<td>imm8/16/32</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Compares the first source operand with the second source operand and sets the status flags in the EFLAGS register
according to the results. The comparison is performed by subtracting the second operand from the first operand
and then setting the status flags in the same manner as the SUB instruction. When an immediate value is used as
an operand, it is sign-extended to the length of the first operand.

The condition codes used by the Jcc, CMOVcc, and SETcc instructions are based on the results of a CMP instruction.
Appendix B, “EFLAGS Condition Codes,” in the Intel® 64 and IA-32 Architectures Software Developer’s Manual,
Volume 1, shows the relationship of the status flags and the condition codes.
In 64-bit mode, the instruction’s default operation size is 32 bits. Use of the REX.R prefix permits access to additional
 registers (R8-R15). Use of the REX.W prefix promotes operation to 64 bits. See the summary chart at the
beginning of this section for encoding data and limits.

### Operation

```java
temp ← SRC1 − SignExtend(SRC2); 
ModifyStatusFlags; (* Modify status flags in the same manner as the SUB instruction*)
```
### Flags Affected

The CF, OF, SF, ZF, AF, and PF flags are set according to the result.

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