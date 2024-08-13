<b>VRCP14SD</b> — Compute Approximate Reciprocal of Scalar Float64 Value
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.NDS.LIG.66.0F38.W1 4D /r VRCP14SD xmm1 {k1}{z}, xmm2, xmm3/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Computes the approximate reciprocal of the scalar double- precision floating-point value in xmm3/m64 and stores the result in xmm1 using writemask k1. Also, upper double- precision floating-point value (bits[127:64]) from xmm2 is copied to xmm1[127:64].</td>
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
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
This instruction performs a SIMD computation of the approximate reciprocal of the low double-precision floating-
point value in the second source operand (the third operand) stores the result in the low quadword element of the
destination operand (the first operand) according to the writemask k1. Bits (127:64) of the XMM register destination
 are copied from corresponding bits in the first source operand (the second operand). The maximum relative
error for this approximation is less than 2-14. The source operand can be an XMM register or a 64-bit memory location
. The destination operand is an XMM register.

The VRCP14SD instruction is not affected by the rounding control bits in the MXCSR register. When a source value
is a 0.0, an ∞ with the sign of the source value is returned. A denormal source value will be treated as zero only in
case of DAZ bit set in MXCSR. Otherwise it is treated correctly (i.e. not as a 0.0). Underflow results are flushed to
zero only in case of FTZ bit set in MXCSR. Otherwise it will be treated correctly (i.e. correct underflow result is
written) with the sign of the operand. When a source value is a SNaN or QNaN, the SNaN is converted to a QNaN
or the source QNaN is returned. See Table 5-22 for special-case input values.

MXCSR exception flags are not affected by this instruction and floating-point exceptions are not reported.

A numerically exact implementation of VRCP14xx can be found at https://software.intel.com/en-us/articles/refer-
ence-implementations-for-IA-approximation-instructions-vrcp14-vrsqrt14-vrcp28-vrsqrt28-vexp2.

### Operation


#### VRCP14SD (EVEX version)
```java
IF k1[0] OR *no writemask*
        THEN DEST[63:0] ← APPROXIMATE(1.0/SRC2[63:0]);
    ELSE 
        IF *merging-masking*
                            ; merging-masking
            THEN *DEST[63:0] remains unchanged*
            ELSE 
                            ; zeroing-masking
                DEST[63:0] ← 0
        FI;
FI;
DEST[127:64] ← SRC1[127:64]
DEST[MAXVL-1:128] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VRCP14SD __m128d _mm_rcp14_sd( __m128d a, __m128d b);
VRCP14SD __m128d _mm_mask_rcp14_sd(__m128d s, __mmask8 k, __m128d a, __m128d b);
VRCP14SD __m128d _mm_maskz_rcp14_sd( __mmask8 k, __m128d a, __m128d b);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

See Exceptions Type E5.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
