<b>VRCP14PD</b> — Compute Approximate Reciprocals of Packed Float64 Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W1 4C /r VRCP14PD xmm1 {k1}{z}, xmm2/m128/m64bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Computes the approximate reciprocals of the packed double- precision floating-point values in xmm2/m128/m64bcst and stores the results in xmm1. Under writemask.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W1 4C /r VRCP14PD ymm1 {k1}{z}, ymm2/m256/m64bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Computes the approximate reciprocals of the packed double- precision floating-point values in ymm2/m256/m64bcst and stores the results in ymm1. Under writemask.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W1 4C /r VRCP14PD zmm1 {k1}{z}, zmm2/m512/m64bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Computes the approximate reciprocals of the packed double- precision floating-point values in zmm2/m512/m64bcst and stores the results in zmm1. Under writemask.</td>
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
This instruction performs a SIMD computation of the approximate reciprocals of eight/four/two packed double-
precision floating-point values in the source operand (the second operand) and stores the packed double-precision
floating-point results in the destination operand. The maximum relative error for this approximation is less than 2-
14.

The source operand can be a ZMM register, a 512-bit memory location, or a 512-bit vector broadcasted from a 64-bit
 memory location. The destination operand is a ZMM register conditionally updated according to the writemask.

The VRCP14PD instruction is not affected by the rounding control bits in the MXCSR register. When a source value
is a 0.0, an ∞ with the sign of the source value is returned. A denormal source value will be treated as zero only in
case of DAZ bit set in MXCSR. Otherwise it is treated correctly (i.e. not as a 0.0). Underflow results are flushed to
zero only in case of FTZ bit set in MXCSR. Otherwise it will be treated correctly (i.e. correct underflow result is
written) with the sign of the operand. When a source value is a SNaN or QNaN, the SNaN is converted to a QNaN
or the source QNaN is returned.

EVEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.

MXCSR exception flags are not affected by this instruction and floating-point exceptions are not reported.

Table 5-22. VRCP14PD/VRCP14SD Special Cases
<table>
	<tr>
		<td><b>Input value</b></td>
		<td><b>Result value</b></td>
		<td><b>Comments</b></td>
	</tr>
	<tr>
		<td>0 ≤ X ≤ 2-1024</td>
		<td>INF</td>
		<td>Very small denormal</td>
	</tr>
	<tr>
		<td>-2-1024 ≤ X ≤ -0</td>
		<td>-INF</td>
		<td>Very small denormal</td>
	</tr>
	<tr>
		<td>X > 21022</td>
		<td>Underflow</td>
		<td>Up to 18 bits of fractions are returned*</td>
	</tr>
	<tr>
		<td>X < -21022</td>
		<td>-Underflow</td>
		<td>Up to 18 bits of fractions are returned*</td>
	</tr>
	<tr>
		<td>X = 2-n</td>
		<td>2n</td>
		<td></td>
	</tr>
	<tr>
		<td>X = -2-n</td>
		<td>-2n</td>
		<td></td>
	</tr>
</table>

\* in this case the mantissa is shifted right by one or two bits

A numerically exact implementation of VRCP14xx can be found at https://software.intel.com/en-us/articles/refer-
ence-implementations-for-IA-approximation-instructions-vrcp14-vrsqrt14-vrcp28-vrsqrt28-vexp2.

### Operation


#### VRCP14PD ((EVEX encoded versions)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 64
    IF k1[j] OR *no writemask* THEN
            IF (EVEX.b = 1) AND (SRC *is memory*)
                THEN DEST[i+63:i] ← APPROXIMATE(1.0/SRC[63:0]);
                ELSE DEST[i+63:i] ← APPROXIMATE(1.0/SRC[i+63:i]);
            FI;
    ELSE 
        IF *merging-masking*
                            ; merging-masking
            THEN *DEST[i+63:i] remains unchanged*
            ELSE 
                            ; zeroing-masking
                DEST[i+63:i] ← 0
        FI;
    FI;
ENDFOR;
DEST[MAXVL-1:VL] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VRCP14PD __m512d _mm512_rcp14_pd( __m512d a);
VRCP14PD __m512d _mm512_mask_rcp14_pd(__m512d s, __mmask8 k, __m512d a);
VRCP14PD __m512d _mm512_maskz_rcp14_pd( __mmask8 k, __m512d a);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

See Exceptions Type E4.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
