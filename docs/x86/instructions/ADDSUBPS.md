<b>ADDSUBPS</b> — Packed Single-FP Add/Subtract
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32-bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F2 0F D0 /r ADDSUBPS xmm1, xmm2/m128</td>
		<td>RM</td>
		<td>V/V</td>
		<td>SSE3</td>
		<td>Add/subtract single-precision floating-point values from xmm2/m128 to xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.F2.0F.WIG D0 /r VADDSUBPS xmm1, xmm2, xmm3/m128</td>
		<td>RVM</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Add/subtract single-precision floating-point values from xmm3/mem to xmm2 and stores result in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.F2.0F.WIG D0 /r VADDSUBPS ymm1, ymm2, ymm3/m256</td>
		<td>RVM</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Add / subtract single-precision floating-point values from ymm3/mem to ymm2 and stores result in ymm1.</td>
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
Adds odd-numbered single-precision floating-point values of the first source operand (second operand) with the
corresponding single-precision floating-point values from the second source operand (third operand); stores the
result in the odd-numbered values of the destination operand (first operand). Subtracts the even-numbered
single-precision floating-point values from the second source operand from the corresponding single-precision
floating values in the first source operand; stores the result into the even-numbered values of the destination
operand.

In 64-bit mode, using a REX prefix in the form of REX.R permits this instruction to access additional registers
(XMM8-XMM15).

128-bit Legacy SSE version: The second source can be an XMM register or an 128-bit memory location. The destination
 is not distinct from the first source XMM register and the upper bits (MAXVL-1:128) of the corresponding
YMM register destination are unmodified. See Figure 3-4.

VEX.128 encoded version: the first source operand is an XMM register or 128-bit memory location. The destination
operand is an XMM register. The upper bits (MAXVL-1:128) of the corresponding YMM register destination are
zeroed.

VEX.256 encoded version: The first source operand is a YMM register. The second source operand can be a YMM
register or a 256-bit memory location. The destination operand is a YMM register.

<table>
ADDSUBPS xmm1, xmm2/m128
	<tr>
		<td>[127:96]</td>
		<td>[95:64]</td>
		<td>[63:32]</td>
		<td>[31:0]</td>
		<td>xmm2/m128</td>
	</tr>
	<tr>
		<td>xmm1[127:96] + xmm2/m128[127:96]</td>
		<td>xmm1[95:64] - xmm2/m128[95:64]</td>
		<td>xmm1[63:32] + xmm2/m128[63:32]</td>
		<td>xmm1[31:0] - xmm2/m128[31:0]</td>
		<td>RESULT: xmm1</td>
	</tr>
</table>
Figure 3-4.  ADDSUBPS—Packed Single-FP Add/Subtract

### Operation


#### ADDSUBPS (128-bit Legacy SSE version)
```java
DEST[31:0] ← DEST[31:0] - SRC[31:0]
DEST[63:32] ← DEST[63:32] + SRC[63:32]
DEST[95:64] ← DEST[95:64] - SRC[95:64]
DEST[127:96] ← DEST[127:96] + SRC[127:96]
DEST[MAXVL-1:128] (Unmodified)
```
#### VADDSUBPS (VEX.128 encoded version)
```java
DEST[31:0] ← SRC1[31:0] - SRC2[31:0]
DEST[63:32] ← SRC1[63:32] + SRC2[63:32]
DEST[95:64] ← SRC1[95:64] - SRC2[95:64]
DEST[127:96] ← SRC1[127:96] + SRC2[127:96]
DEST[MAXVL-1:128] ← 0
```
#### VADDSUBPS (VEX.256 encoded version)
```java
DEST[31:0] ← SRC1[31:0] - SRC2[31:0]
DEST[63:32] ← SRC1[63:32] + SRC2[63:32]
DEST[95:64] ← SRC1[95:64] - SRC2[95:64]
DEST[127:96] ← SRC1[127:96] + SRC2[127:96]
DEST[159:128] ← SRC1[159:128] - SRC2[159:128]
DEST[191:160]← SRC1[191:160] + SRC2[191:160]
DEST[223:192] ← SRC1[223:192] - SRC2[223:192]
DEST[255:224] ← SRC1[255:224] + SRC2[255:224].
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
ADDSUBPS:
__m128 _mm_addsub_ps(__m128 a, __m128 b)
VADDSUBPS:
__m256 _mm256_addsub_ps (__m256 a, __m256 b)
```
### Exceptions

When the source operand is a memory operand, the operand must be aligned on a 16-byte boundary or a general-protection exception (\#GP) will be generated.

### SIMD Floating-Point Exceptions
Overflow, Underflow, Invalid, Precision, Denormal.

### Other Exceptions

See Exceptions Type 2.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
