<b>VRSQRT14SS</b> — Compute Approximate Reciprocal of Square Root of Scalar Float32 Value
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.NDS.LIG.66.0F38.W0 4F /r VRSQRT14SS xmm1 {k1}{z}, xmm2, xmm3/m32</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Computes the approximate reciprocal square root of the scalar single-precision floating-point value in xmm3/m32 and stores the result in the low doubleword element of xmm1 using writemask k1. Bits[127:32] of xmm2 is copied to xmm1[127:32].</td>
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
		<td>Tuple1 Scalar</td>
		<td>ModRM:reg (w)</td>
		<td>VEX.vvvv</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
Computes of the approximate reciprocal of the square root of the scalar single-precision floating-point value in the
low doubleword element of the source operand (the second operand) and stores the result in the low doubleword
element of the destination operand (the first operand) according to the writemask. The maximum relative error for
this approximation is less than 2-14. The source operand can be an XMM register or a 32-bit memory location. The
destination operand is an XMM register.

Bits (127:32) of the XMM register destination are copied from corresponding bits in the first source operand. Bits
(MAXVL-1:128) of the destination register are zeroed.

The VRSQRT14SS instruction is not affected by the rounding control bits in the MXCSR register. When a source
value is a 0.0, an ∞ with the sign of the source value is returned. When the source operand is an ∞, zero with the
sign of the source value is returned. A denormal source value is treated as zero only if DAZ bit is set in MXCSR.
Otherwise it is treated correctly and performs the approximation with the specified masked response. When a
source value is a negative value (other than 0.0) a floating-point indefinite is returned. When a source value is an
SNaN or QNaN, the SNaN is converted to a QNaN or the source QNaN is returned.

MXCSR exception flags are not affected by this instruction and floating-point exceptions are not reported.

A numerically exact implementation of VRSQRT14xx can be found at https://software.intel.com/en-us/arti-
cles/reference-implementations-for-IA-approximation-instructions-vrcp14-vrsqrt14-vrcp28-vrsqrt28-vexp2.

### Operation


#### VRSQRT14SS (EVEX version)
```java
IF k1[0] or *no writemask*
    THEN
            DEST[31:0] ← APPROXIMATE(1.0/ SQRT(SRC2[31:0]))
    ELSE 
        IF *merging-masking*
                            ; merging-masking
            THEN *DEST[31:0] remains unchanged*
            ELSE 
                            ; zeroing-masking
                THEN DEST[31:0] ← 0
        FI;
FI;
DEST[127:32] ← SRC1[127:32]
DEST[MAXVL-1:128] ← 0
```
#### Table 5-29. VRSQRT14SS Special Cases
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
VRSQRT14SS __m128 _mm_rsqrt14_ss( __m128 a, __m128 b);
VRSQRT14SS __m128 _mm_mask_rsqrt14_ss(__m128 s, __mmask8 k, __m128 a, __m128 b);
VRSQRT14SS __m128 _mm_maskz_rsqrt14_ss( __mmask8 k, __m128 a, __m128 b);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

See Exceptions Type E5.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
