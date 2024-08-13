<b>BLENDPD</b> —  Blend Packed Double Precision Floating-Point Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32-bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 3A 0D /r ib BLENDPD xmm1, xmm2/m128, imm8</td>
		<td>RMI</td>
		<td>V/V</td>
		<td>SSE4_1</td>
		<td>Select packed DP-FP values from xmm1 and xmm2/m128 from mask specified in imm8 and store the values into xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F3A.WIG 0D /r ib VBLENDPD xmm1, xmm2, xmm3/m128, imm8</td>
		<td>RVMI V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Select packed double-precision floating-point Values from xmm2 and xmm3/m128 from mask in imm8 and store the values in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F3A.WIG 0D /r ib VBLENDPD ymm1, ymm2, ymm3/m256, imm8</td>
		<td>RVMI V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Select packed double-precision floating-point Values from ymm2 and ymm3/m256 from mask in imm8 and store the values in ymm1.</td>
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
		<td>RMI</td>
		<td>ModRM:reg (r, w)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>RVMI</td>
		<td>ModRM:reg (w)</td>
		<td>VEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8[3:0]</td>
	</tr>
</table>


### Description
Double-precision floating-point values from the second source operand (third operand) are conditionally merged
with values from the first source operand (second operand) and written to the destination operand (first operand).
The immediate bits [3:0] determine whether the corresponding double-precision floating-point value in the destination
 is copied from the second source or first source. If a bit in the mask, corresponding to a word, is ”1”, then
the double-precision floating-point value in the second source operand is copied, else the value in the first source
operand is copied.

128-bit Legacy SSE version: The second source can be an XMM register or an 128-bit memory location. The destination
 is not distinct from the first source XMM register and the upper bits (MAXVL-1:128) of the corresponding
YMM register destination are unmodified.

VEX.128 encoded version: the first source operand is an XMM register. The second source operand is an XMM
register or 128-bit memory location. The destination operand is an XMM register. The upper bits (MAXVL-1:128) of
the corresponding YMM register destination are zeroed.

VEX.256 encoded version: The first source operand is a YMM register. The second source operand can be a YMM
register or a 256-bit memory location. The destination operand is a YMM register.

### Operation


#### BLENDPD (128-bit Legacy SSE version)
```java
IF (IMM8[0] = 0)THEN DEST[63:0] ← DEST[63:0]
        ELSE DEST [63:0] ← SRC[63:0] FI
IF (IMM8[1] = 0) THEN DEST[127:64] ← DEST[127:64]
        ELSE DEST [127:64] ← SRC[127:64] FI
DEST[MAXVL-1:128] (Unmodified)
```
#### VBLENDPD (VEX.128 encoded version)
```java
IF (IMM8[0] = 0)THEN DEST[63:0] ← SRC1[63:0]
        ELSE DEST [63:0] ← SRC2[63:0] FI
IF (IMM8[1] = 0) THEN DEST[127:64] ← SRC1[127:64]
        ELSE DEST [127:64] ← SRC2[127:64] FI
DEST[MAXVL-1:128] ← 0
```
#### VBLENDPD (VEX.256 encoded version)
```java
IF (IMM8[0] = 0)THEN DEST[63:0] ← SRC1[63:0]
        ELSE DEST [63:0] ← SRC2[63:0] FI
IF (IMM8[1] = 0) THEN DEST[127:64] ← SRC1[127:64]
        ELSE DEST [127:64] ← SRC2[127:64] FI
IF (IMM8[2] = 0) THEN DEST[191:128] ← SRC1[191:128]
        ELSE DEST [191:128] ← SRC2[191:128] FI
IF (IMM8[3] = 0) THEN DEST[255:192] ← SRC1[255:192]
        ELSE DEST [255:192] ← SRC2[255:192] FI
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
BLENDPD:
__m128d _mm_blend_pd (__m128d v1, __m128d v2, const int mask);
VBLENDPD:
__m256d _mm256_blend_pd (__m256d a, __m256d b, const int mask);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

See Exceptions Type 4.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
