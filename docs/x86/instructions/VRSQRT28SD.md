INSTRUCTION SET REFERENCE UNIQUE TO INTEL® XEON PHI™ PROCESSORS
<b>VRSQRT28SD</b> — Approximation to the Reciprocal Square Root of Scalar Double-Precision

Floating-Point Value with Less Than 2^-28 Relative Error
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.NDS.LIG.66.0F38.W1 CD /r VRSQRT28SD xmm1 {k1}{z}, xmm2, xmm3/m64 {sae}</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512ER</td>
		<td>Computes approximate reciprocal square root (<2^-28 relative error) of the scalar double-precision floating-point value from xmm3/m64 and stores result in xmm1with writemask k1. Also, upper double-precision floating-point value (bits[127:64]) from xmm2 is copied to xmm1[127:64].</td>
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
Computes the reciprocal square root of the low float64 value in the second source operand (the third operand) and
store the result to the destination operand (the first operand). The approximate reciprocal square root is evaluated
with less than 2^-28 of maximum relative error. The result is written into the low float64 element of xmm1
according to the writemask k1. Bits 127:64 of the destination is copied from the corresponding bits of the first source operand (the
second operand).
If any source element is NaN, the quietized NaN source value is returned for that element. Negative (non-zero)
source numbers, as well as -∞, return the canonical NaN and set the Invalid Flag (\#I).

A value of -0 must return -∞ and set the DivByZero flags (\#Z). Negative numbers should return NaN and set the
Invalid flag (\#I). Note however that the instruction flush input denormals to zero of the same sign, so negative
denormals return -∞ and set the DivByZero flag.

The first source operand is an XMM register. The second source operand is an XMM register or a 64-bit memory
location. The destination operand is a XMM register.

A numerically exact implementation of VRSQRT28xx can be found at https://software.intel.com/en-us/arti-
cles/reference-implementations-for-IA-approximation-instructions-vrcp14-vrsqrt14-vrcp28-vrsqrt28-vexp2.

### Operation


#### VRSQRT28SD (EVEX encoded versions)
```java
    IF k1[0] OR *no writemask* THEN
             DEST[63: 0] ← (1.0/ SQRT(SRC[63: 0]));
    ELSE 
        IF *merging-masking*
                            ; merging-masking
            THEN *DEST[63: 0] remains unchanged*
            ELSE 
                            ; zeroing-masking
                DEST[63: 0] ← 0
        FI;
    FI;
ENDFOR;
DEST[127:64] ← SRC1[127: 64]
DEST[MAXVL-1:128] ← 0
                            INSTRUCTION SET REFERENCE UNIQUE TO INTEL® XEON PHI™ PROCESSORS
```
#### Table 6-40. VRSQRT28SD Special Cases
```java
<table>
	<tr>
		<td><b>Input value</b></td>
		<td><b>Result value</b></td>
		<td><b>Comments</b></td>
	</tr>
	<tr>
		<td>NAN</td>
		<td>QNAN(input)</td>
		<td>If (SRC = SNaN) then #I</td>
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
		<td>X = -0 or negative denormal</td>
		<td>-INF</td>
		<td>#Z</td>
	</tr>
	<tr>
		<td>X = +0 or positive denormal</td>
		<td>+INF</td>
		<td>#Z</td>
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
VRSQRT28SD __m128d _mm_rsqrt28_round_sd(__m128d a, __m128d b, int rounding);
VRSQRT28SD __m128d _mm_mask_rsqrt28_round_sd(__m128d s, __mmask8 m,__m128d a, __m128d b, int rounding);
VRSQRT28SD __m128d _mm_maskz_rsqrt28_round_sd( __mmask8 m,__m128d a, __m128d b, int rounding);
```
### SIMD Floating-Point Exceptions
Invalid (if SNaN input), Divide-by-zero

### Other Exceptions

See Exceptions Type E3.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
