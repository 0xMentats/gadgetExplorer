<b>VRSQRT14PS</b> — Compute Approximate Reciprocals of Square Roots of Packed Float32 Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W0 4E /r VRSQRT14PS xmm1 {k1}{z}, xmm2/m128/m32bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Computes the approximate reciprocal square roots of the packed single-precision floating-point values in xmm2/m128/m32bcst and stores the results in xmm1. Under writemask.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W0 4E /r VRSQRT14PS ymm1 {k1}{z}, ymm2/m256/m32bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Computes the approximate reciprocal square roots of the packed single-precision floating-point values in ymm2/m256/m32bcst and stores the results in ymm1. Under writemask.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W0 4E /r VRSQRT14PS zmm1 {k1}{z}, zmm2/m512/m32bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Computes the approximate reciprocal square roots of the packed single-precision floating-point values in zmm2/m512/m32bcst and stores the results in zmm1. Under writemask.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Tuple Type</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand 2</b></td>
		<td><b>Operand 3</b></td>
		<td><b>Operand 4</b></td>
	</tr>
	<tr>
		<td>A</td>
		<td>Full</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
This instruction performs a SIMD computation of the approximate reciprocals of the square roots of 16 packed
single-precision floating-point values in the source operand (the second operand) and stores the packed 
single-precision floating-point results in the destination operand (the first operand) according to the writemask. The
maximum relative error for this approximation is less than 2-14.

EVEX.512 encoded version: The source operand can be a ZMM register, a 512-bit memory location or a 512-bit
vector broadcasted from a 32-bit memory location. The destination operand is a ZMM register, conditionally
updated using writemask k1.

EVEX.256 encoded version: The source operand is a YMM register, a 256-bit memory location, or a 256-bit vector
broadcasted from a 32-bit memory location. The destination operand is a YMM register, conditionally updated using
writemask k1.

EVEX.128 encoded version: The source operand is a XMM register, a 128-bit memory location, or a 128-bit vector
broadcasted from a 32-bit memory location. The destination operand is a XMM register, conditionally updated using
writemask k1.

The VRSQRT14PS instruction is not affected by the rounding control bits in the MXCSR register. When a source
value is a 0.0, an ∞ with the sign of the source value is returned. When the source operand is an +∞ then +ZERO
value is returned. A denormal source value is treated as zero only if DAZ bit is set in MXCSR. Otherwise it is treated
correctly and performs the approximation with the specified masked response. When a source value is a negative
value (other than 0.0) a floating-point QNaN_indefinite is returned. When a source value is an SNaN or QNaN, the
SNaN is converted to a QNaN or the source QNaN is returned.

MXCSR exception flags are not affected by this instruction and floating-point exceptions are not reported.

Note: EVEX.vvvv is reserved and must be 1111b, otherwise instructions will \#UD.

A numerically exact implementation of VRSQRT14xx can be found at https://software.intel.com/en-us/arti-
cles/reference-implementations-for-IA-approximation-instructions-vrcp14-vrsqrt14-vrcp28-vrsqrt28-vexp2.

### Operation


#### VRSQRT14PS (EVEX encoded versions)
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
FOR j ← 0 TO KL-1
    i ← j * 32
    IF k1[j] OR *no writemask* THEN
            IF (EVEX.b = 1) AND (SRC *is memory*)
                THEN DEST[i+31:i] ← APPROXIMATE(1.0/ SQRT(SRC[31:0]));
                ELSE DEST[i+31:i] ← APPROXIMATE(1.0/ SQRT(SRC[i+31:i]));
            FI;
    ELSE 
        IF *merging-masking*
                            ; merging-masking
            THEN *DEST[i+31:i] remains unchanged*
            ELSE 
                            ; zeroing-masking
                DEST[i+31:i] ← 0
        FI;
    FI;
ENDFOR;
DEST[MAXVL-1:VL] ← 0
```
#### Table 5-28. VRSQRT14PS Special Cases
```java
<table>
	<tr>
		<td><b>Input value</b></td>
		<td><b>Result value</b></td>
		<td><b>Comments</b></td>
	</tr>
	<tr>
		<td>Any denormal</td>
		<td>Normal</td>
		<td>Cannot generate overflow</td>
	</tr>
	<tr>
		<td>X = 2-2n</td>
		<td>2n</td>
		<td></td>
	</tr>
	<tr>
		<td>X < 0</td>
		<td>QNaN_Indefinite</td>
		<td>Including -INF</td>
	</tr>
	<tr>
		<td>X = -0</td>
		<td>-INF</td>
		<td></td>
	</tr>
	<tr>
		<td>X = +0</td>
		<td>+INF</td>
		<td></td>
	</tr>
	<tr>
		<td>X = +INF</td>
		<td>+0</td>
		<td></td>
	</tr>
</table>

```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VRSQRT14PS __m512 _mm512_rsqrt14_ps( __m512 a);
VRSQRT14PS __m512 _mm512_mask_rsqrt14_ps(__m512 s, __mmask16 k, __m512 a);
VRSQRT14PS __m512 _mm512_maskz_rsqrt14_ps( __mmask16 k, __m512 a);
VRSQRT14PS __m256 _mm256_rsqrt14_ps( __m256 a);
VRSQRT14PS __m256 _mm256_mask_rsqrt14_ps(__m256 s, __mmask8 k, __m256 a);
VRSQRT14PS __m256 _mm256_maskz_rsqrt14_ps( __mmask8 k, __m256 a);
VRSQRT14PS __m128 _mm_rsqrt14_ps( __m128 a);
VRSQRT14PS __m128 _mm_mask_rsqrt14_ps(__m128 s, __mmask8 k, __m128 a);
VRSQRT14PS __m128 _mm_maskz_rsqrt14_ps( __mmask8 k, __m128 a);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

See Exceptions Type 4.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
