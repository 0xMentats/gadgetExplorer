<b>ADDSUBPD</b> — Packed Double-FP Add/Subtract
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32-bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F D0 /r ADDSUBPD xmm1, xmm2/m128</td>
		<td>RM</td>
		<td>V/V</td>
		<td>SSE3</td>
		<td>Add/subtract double-precision floating-point values from xmm2/m128 to xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.WIG D0 /r VADDSUBPD xmm1, xmm2, xmm3/m128</td>
		<td>RVM</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Add/subtract packed double-precision floating-point values from xmm3/mem to xmm2 and stores result in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F.WIG D0 /r VADDSUBPD ymm1, ymm2, ymm3/m256</td>
		<td>RVM</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Add / subtract packed double-precision floating-point values from ymm3/mem to ymm2 and stores result in ymm1.</td>
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
		<td>ModRM:reg (r, w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>RVM</td>
		<td>ModRM:reg (w)</td>
		<td>VEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
Adds odd-numbered double-precision floating-point values of the first source operand (second operand) with the
corresponding double-precision floating-point values from the second source operand (third operand); stores the
result in the odd-numbered values of the destination operand (first operand). Subtracts the even-numbered
double-precision floating-point values from the second source operand from the corresponding double-precision
floating values in the first source operand; stores the result into the even-numbered values of the destination
operand.

In 64-bit mode, using a REX prefix in the form of REX.R permits this instruction to access additional registers
(XMM8-XMM15).

128-bit Legacy SSE version: The second source can be an XMM register or an 128-bit memory location. The destination is not distinct from the first source XMM register and the upper bits (MAXVL-1:128) of the corresponding YMM register destination are unmodified. See Figure 3-3.

VEX.128 encoded version: the first source operand is an XMM register or 128-bit memory location. The destination
operand is an XMM register. The upper bits (MAXVL-1:128) of the corresponding YMM register destination are
zeroed.

VEX.256 encoded version: The first source operand is a YMM register. The second source operand can be a YMM
register or a 256-bit memory location. The destination operand is a YMM register.
ADDSUBPD xmm1, xmm2/m128

xmm2/m128
[127:64]
[63:0]

RESULT:
xmm1[127:64] + xmm2/m128[127:64]
xmm1[63:0] - xmm2/m128[63:0]
xmm1

[127:64]
[63:0]

Figure 3-3.  ADDSUBPD—Packed Double-FP Add/Subtract

### Operation


#### ADDSUBPD (128-bit Legacy SSE version)
```java
DEST[63:0] ← DEST[63:0] - SRC[63:0]
DEST[127:64] ← DEST[127:64] + SRC[127:64]
DEST[MAXVL-1:128] (Unmodified)
```
#### VADDSUBPD (VEX.128 encoded version)
```java
DEST[63:0] ← SRC1[63:0] - SRC2[63:0]
DEST[127:64] ← SRC1[127:64] + SRC2[127:64]
DEST[MAXVL-1:128] ← 0
```
#### VADDSUBPD (VEX.256 encoded version)
```java
DEST[63:0] ← SRC1[63:0] - SRC2[63:0]
DEST[127:64] ← SRC1[127:64] + SRC2[127:64]
DEST[191:128] ← SRC1[191:128] - SRC2[191:128]
DEST[255:192] ← SRC1[255:192] + SRC2[255:192]
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
ADDSUBPD:
__m128d _mm_addsub_pd(__m128d a, __m128d b)
VADDSUBPD:
__m256d _mm256_addsub_pd(__m256d a, __m256d b)
```
### Exceptions

When the source operand is a memory operand, it must be aligned on a 16-byte boundary or a general-protection
exception (\#GP) will be generated.

### SIMD Floating-Point Exceptions

Overflow, Underflow, Invalid, Precision, Denormal.

### Other Exceptions

See Exceptions Type 2.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
