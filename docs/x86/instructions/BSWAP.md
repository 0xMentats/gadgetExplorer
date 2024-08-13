<b>BSWAP</b> — Byte Swap
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
		<td>0F C8+rd</td>
		<td>BSWAP r32</td>
		<td>O</td>
		<td>Valid*</td>
		<td>Valid</td>
		<td>Reverses the byte order of a 32-bit register.</td>
	</tr>
	<tr>
		<td>REX.W + 0F C8+rd</td>
		<td>BSWAP r64</td>
		<td>O</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Reverses the byte order of a 64-bit register.</td>
	</tr>
</table>

\* See IA-32 Architecture Compatibility section below.

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
		<td>O</td>
		<td>opcode + rd (r, w)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Reverses the byte order of a 32-bit or 64-bit (destination) register. This instruction is provided for converting little-
endian values to big-endian format and vice versa. To swap bytes in a word value (16-bit register), use the XCHG
instruction. When the BSWAP instruction references a 16-bit register, the result is undefined.

In 64-bit mode, the instruction’s default operation size is 32 bits. Using a REX prefix in the form of REX.R permits
access to additional registers (R8-R15). Using a REX prefix in the form of REX.W promotes operation to 64 bits. See
the summary chart at the beginning of this section for encoding data and limits.

IA-32 Architecture Legacy Compatibility

The BSWAP instruction is not supported on IA-32 processors earlier than the Intel486™ processor family. For
compatibility with this instruction, software should include functionally equivalent code for execution on Intel
processors earlier than the Intel486 processor family.

### Operation

```java
TEMP ← DEST
IF 64-bit mode AND OperandSize = 64
    THEN
        DEST[7:0] ← TEMP[63:56];
        DEST[15:8] ← TEMP[55:48];
        DEST[23:16] ← TEMP[47:40];
        DEST[31:24] ← TEMP[39:32];
        DEST[39:32] ← TEMP[31:24];
        DEST[47:40] ← TEMP[23:16];
        DEST[55:48] ← TEMP[15:8];
        DEST[63:56] ← TEMP[7:0];
    ELSE
        DEST[7:0] ← TEMP[31:24];
        DEST[15:8] ← TEMP[23:16];
        DEST[23:16] ← TEMP[15:8];
        DEST[31:24] ← TEMP[7:0];
FI;
```
### Flags Affected

None.

### Exceptions (All Operating Modes)

<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
