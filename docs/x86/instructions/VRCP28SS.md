INSTRUCTION SET REFERENCE UNIQUE TO INTEL® XEON PHI™ PROCESSORS
<b>VRCP28SS</b> — Approximation to the Reciprocal of Scalar Single-Precision Floating-Point Value

with Less Than 2^-28 Relative Error
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.NDS.LIG.66.0F38.W0 CB /r VRCP28SS xmm1 {k1}{z}, xmm2, xmm3/m32 {sae}</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512ER</td>
		<td>Computes the approximate reciprocal ( < 2^-28 relative error) of the scalar single-precision floating-point value in xmm3/m32 and stores the results in xmm1. Under writemask. Also, upper 3 single-precision floating-point values (bits[127:32]) from xmm2 is copied to xmm1[127:32].</td>
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
		<td>EVEX.vvvv</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
Computes the reciprocal approximation of the low float32 value in the second source operand (the third operand)
and store the result to the destination operand (the first operand). The approximate reciprocal is evaluated with
less than 2^-28 of maximum relative error prior to final rounding. The final result is rounded to < 2^-23 relative
error before written into the low float32 element of the destination according to writemask k1. Bits 127:32 of the
destination is copied from the corresponding bits of the first source operand (the second operand).
A denormal input value is treated as zero and does not signal \#DE, irrespective of MXCSR.DAZ. A denormal result
is flushed to zero and does not signal \#UE, irrespective of MXCSR.FTZ.

If any source element is NaN, the quietized NaN source value is returned for that element. If any source element is
±∞, ±0.0 is returned for that element. Also, if any source element is ±0.0, ±∞ is returned for that element.

The first source operand is an XMM register. The second source operand is an XMM register or a 32-bit memory
location. The destination operand is a XMM register, conditionally updated using writemask k1.

A numerically exact implementation of VRCP28xx can be found at https://software.intel.com/en-us/articles/refer-
ence-implementations-for-IA-approximation-instructions-vrcp14-vrsqrt14-vrcp28-vrsqrt28-vexp2.

### Operation


#### VRCP28SS ((EVEX encoded versions)
```java
IF k1[0] OR *no writemask* THEN
            DEST[31: 0] ← RCP_28_SP(1.0/SRC2[31: 0]);
ELSE 
        IF *merging-masking*
                            ; merging-masking
            THEN *DEST[31: 0] remains unchanged*
            ELSE 
                            ; zeroing-masking
                DEST[31: 0] ← 0
        FI;
FI;
ENDFOR;
DEST[127:32] ← SRC1[127: 32]
DEST[MAXVL-1:128] ← 0
                            INSTRUCTION SET REFERENCE UNIQUE TO INTEL® XEON PHI™ PROCESSORS
```
#### Table 6-38. VRCP28SS Special Cases
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
		<td>0 ≤ X < 2-126</td>
		<td>INF</td>
		<td>Positive input denormal or zero; #Z</td>
	</tr>
	<tr>
		<td>-2-126 < X ≤ -0</td>
		<td>-INF</td>
		<td>Negative input denormal or zero; #Z</td>
	</tr>
	<tr>
		<td>X > 2126</td>
		<td>+0.0f</td>
		<td></td>
	</tr>
	<tr>
		<td>X < -2126</td>
		<td>-0.0f</td>
		<td></td>
	</tr>
	<tr>
		<td>X = +∞</td>
		<td>+0.0f</td>
		<td></td>
	</tr>
	<tr>
		<td>X = -∞</td>
		<td>-0.0f</td>
		<td></td>
	</tr>
	<tr>
		<td>X = 2-n</td>
		<td>2n</td>
		<td>Exact result (unless input/output is a denormal)</td>
	</tr>
	<tr>
		<td>X = -2-n</td>
		<td>-2n</td>
		<td>Exact result (unless input/output is a denormal)</td>
	</tr>
</table>

```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VRCP28SS __m128 _mm_rcp28_round_ss ( __m128 a, __m128 b, int sae);
VRCP28SS __m128 _mm_mask_rcp28_round_ss(__m128 s, __mmask8 m, __m128 a, __m128 b, int sae);
VRCP28SS __m128 _mm_maskz_rcp28_round_ss(__mmask8 m, __m128 a, __m128 b, int sae);
```
### SIMD Floating-Point Exceptions
Invalid (if SNaN input), Divide-by-zero

### Other Exceptions

See Exceptions Type E3.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
