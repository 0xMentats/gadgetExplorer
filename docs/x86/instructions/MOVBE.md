<b>MOVBE</b> — Move Data After Swapping Bytes
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
		<td>0F 38 F0 /r </td>
		<td>MOVBE r16, m16</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Reverse byte order in m16 and move to r16.</td>
	</tr>
	<tr>
		<td>0F 38 F0 /r </td>
		<td>MOVBE r32, m32</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Reverse byte order in m32 and move to r32.</td>
	</tr>
	<tr>
		<td>REX.W + 0F 38 F0 /r </td>
		<td>MOVBE r64, m64</td>
		<td>MR</td>
		<td>Valid</td>
		<td>N.E. </td>
		<td>Reverse byte order in m64 and move to r64.</td>
	</tr>
	<tr>
		<td>0F 38 F1 /r </td>
		<td>MOVBE m16, r16</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Reverse byte order in r16 and move to m16.</td>
	</tr>
	<tr>
		<td>0F 38 F1 /r </td>
		<td>MOVBE m32, r32</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Reverse byte order in r32 and move to m32.</td>
	</tr>
	<tr>
		<td>REX.W + 0F 38 F1 /r </td>
		<td>MOVBE m64, r64</td>
		<td>MR</td>
		<td>Valid</td>
		<td>N.E. </td>
		<td>Reverse byte order in r64 and move to m64.</td>
	</tr>
</table>

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
	<tr>
		<td>MR</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Performs a byte swap operation on the data copied from the second operand (source operand) and store the result
in the first operand (destination operand). The source operand can be a general-purpose register, or memory location;
the destination register can be a general-purpose register, or a memory location; however, both operands can
not be registers, and only one operand can be a memory location. Both operands must be the same size, which can
be a word, a doubleword or quadword.

The MOVBE instruction is provided for swapping the bytes on a read from memory or on a write to memory; thus
providing support for converting little-endian values to big-endian format and vice versa.

In 64-bit mode, the instruction's default operation size is 32 bits. Use of the REX.R prefix permits access to additional
 registers (R8-R15). Use of the REX.W prefix promotes operation to 64 bits. See the summary chart at the
beginning of this section for encoding data and limits.

### Operation

```java
TEMP ← SRC
IF ( OperandSize = 16)
    THEN
        DEST[7:0] ← TEMP[15:8];
        DEST[15:8] ← TEMP[7:0];
    ELES IF ( OperandSize = 32) 
        DEST[7:0] ← TEMP[31:24];
        DEST[15:8] ← TEMP[23:16];
        DEST[23:16] ← TEMP[15:8];
        DEST[31:23] ← TEMP[7:0];
    ELSE IF ( OperandSize = 64) 
        DEST[7:0] ← TEMP[63:56];
        DEST[15:8] ← TEMP[55:48];
        DEST[23:16] ← TEMP[47:40];
        DEST[31:24] ← TEMP[39:32];
        DEST[39:32] ← TEMP[31:24];
        DEST[47:40] ← TEMP[23:16];
        DEST[55:48] ← TEMP[15:8];
        DEST[63:56] ← TEMP[7:0];
FI;
```
### Flags Affected
None

### Protected Mode Exceptions

<p>#GP(0)
If the destination operand is in a non-writable segment.
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
If CPUID.01H:ECX.MOVBE[bit 22] = 0.
If the LOCK prefix is used.
If REP (F3H) prefix is used.

### Real-Address Mode Exceptions

<p>#GP
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS
If a memory operand effective address is outside the SS segment limit.
<p>#UD
If CPUID.01H:ECX.MOVBE[bit 22] = 0.
If the LOCK prefix is used.
If REP (F3H) prefix is used.

### Virtual-8086 Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.
<p>#UD
If CPUID.01H:ECX.MOVBE[bit 22] = 0.
If the LOCK prefix is used.
If REP (F3H) prefix is used.
If REPNE (F2H) prefix is used and CPUID.01H:ECX.SSE4_2[bit 20] = 0.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#GP(0)
If the memory address is in a non-canonical form.
<p>#SS(0)
If the stack address is in a non-canonical form.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.
<p>#UD
If CPUID.01H:ECX.MOVBE[bit 22] = 0.
If the LOCK prefix is used.
If REP (F3H) prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
