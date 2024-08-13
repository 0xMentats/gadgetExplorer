<b>MOVMSKPS</b> — Extract Packed Single-Precision Floating-Point Sign Mask
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32-bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 50 /r MOVMSKPS reg, xmm</td>
		<td>RM V/V</td>
		<td></td>
		<td>SSE</td>
		<td>Extract 4-bit sign mask from xmm and store in reg. The upper bits of r32 or r64 are filled with zeros.</td>
	</tr>
	<tr>
		<td>VEX.128.0F.WIG 50 /r VMOVMSKPS reg, xmm2</td>
		<td>RM V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Extract 4-bit sign mask from xmm2 and store in reg. The upper bits of r32 or r64 are zeroed.</td>
	</tr>
	<tr>
		<td>VEX.256.0F.WIG 50 /r VMOVMSKPS reg, ymm2</td>
		<td>RM V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Extract 8-bit sign mask from ymm2 and store in reg. The upper bits of r32 or r64 are zeroed.</td>
	</tr>
</table>

Instruction Operand Encoding1
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
</table>


### Description
Extracts the sign bits from the packed single-precision floating-point values in the source operand (second
operand), formats them into a 4- or 8-bit mask, and stores the mask in the destination operand (first operand). The
source operand is an XMM or YMM register, and the destination operand is a general-purpose register. The mask is
stored in the 4 or 8 low-order bits of the destination operand. The upper bits of the destination operand beyond the
mask are filled with zeros.

In 64-bit mode, the instruction can access additional registers (XMM8-XMM15, R8-R15) when used with a REX.R
prefix. The default operand size is 64-bit in 64-bit mode.

128-bit versions: The source operand is a YMM register. The destination operand is a general purpose register.

VEX.256 encoded version: The source operand is a YMM register. The destination operand is a general purpose
register.

Note: In VEX-encoded versions, VEX.vvvv is reserved and must be 1111b, otherwise instructions will \#UD.

### Operation

```java
DEST[0] ← SRC[31]; 
DEST[1] ← SRC[63]; 
DEST[2] ← SRC[95]; 
DEST[3] ← SRC[127]; 
IF DEST = r32
    THEN DEST[31:4] ← ZeroExtend;
    ELSE DEST[63:4] ← ZeroExtend;
FI;
1. ModRM.MOD = 011B required
```
#### (V)MOVMSKPS (128-bit version)
```java
DEST[0] ← SRC[31]
DEST[1] ← SRC[63]
DEST[2] ← SRC[95]
DEST[3] ← SRC[127]
IF DEST = r32
    THEN DEST[31:4] ← 0;
    ELSE DEST[63:4] ← 0;
FI
```
#### VMOVMSKPS (VEX.256 encoded version)
```java
DEST[0] ← SRC[31]
DEST[1] ← SRC[63]
DEST[2] ← SRC[95]
DEST[3] ← SRC[127]
DEST[4] ← SRC[159]
DEST[5] ← SRC[191]
DEST[6] ← SRC[223]
DEST[7] ← SRC[255]
IF DEST = r32
    THEN DEST[31:8] ← 0;
    ELSE DEST[63:8] ← 0;
FI
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
int _mm_movemask_ps(__m128 a)
int _mm256_movemask_ps(__m256 a)
```
### SIMD Floating-Point Exceptions
None.

### Other Exceptions

See Exceptions Type 7; additionally
<p>#UD
If VEX.vvvv ≠ 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
