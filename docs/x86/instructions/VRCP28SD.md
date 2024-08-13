INSTRUCTION SET REFERENCE UNIQUE TO INTEL® XEON PHI™ PROCESSORS
<b>VRCP28SD</b> — Approximation to the Reciprocal of Scalar Double-Precision Floating-Point Value

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
		<td>EVEX.NDS.LIG.66.0F38.W1 CB /r VRCP28SD xmm1 {k1}{z}, xmm2, xmm3/m64 {sae}</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512ER</td>
		<td>Computes the approximate reciprocal ( < 2^-28 relative error) of the scalar double-precision floating-point value in xmm3/m64 and stores the results in xmm1. Under writemask. Also, upper double-precision floating-point value (bits[127:64]) from xmm2 is copied to xmm1[127:64].</td>
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
Computes the reciprocal approximation of the low float64 value in the second source operand (the third operand)
and store the result to the destination operand (the first operand). The approximate reciprocal is evaluated with
less than 2^-28 of maximum relative error. The result is written into the low float64 element of the destination
operand according to the writemask k1. Bits 127:64 of the destination is copied from the corresponding bits of the
first source operand (the second operand).

A denormal input value is treated as zero and does not signal \#DE, irrespective of MXCSR.DAZ. A denormal result
is flushed to zero and does not signal \#UE, irrespective of MXCSR.FTZ.

If any source element is NaN, the quietized NaN source value is returned for that element. If any source element is
±∞, ±0.0 is returned for that element. Also, if any source element is ±0.0, ±∞ is returned for that element.

The first source operand is an XMM register. The second source operand is an XMM register or a 64-bit memory
location. The destination operand is a XMM register, conditionally updated using writemask k1.

A numerically exact implementation of VRCP28xx can be found at https://software.intel.com/en-us/articles/refer-
ence-implementations-for-IA-approximation-instructions-vrcp14-vrsqrt14-vrcp28-vrsqrt28-vexp2.

### Operation


#### VRCP28SD ((EVEX encoded versions)
```java
IF k1[0] OR *no writemask* THEN
            DEST[63: 0] ← RCP_28_DP(1.0/SRC2[63: 0]);
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
#### Table 6-36. VRCP28SD Special Cases
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
		<td>0 ≤ X < 2-1022</td>
		<td>INF</td>
		<td>Positive input denormal or zero; #Z</td>
	</tr>
	<tr>
		<td>-2-1022 < X ≤ -0</td>
		<td>-INF</td>
		<td>Negative input denormal or zero; #Z</td>
	</tr>
	<tr>
		<td>X > 21022</td>
		<td>+0.0f</td>
		<td></td>
	</tr>
	<tr>
		<td>X < -21022</td>
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
VRCP28SD __m128d _mm_rcp28_round_sd ( __m128d a, __m128d b, int sae);
VRCP28SD __m128d _mm_mask_rcp28_round_sd(__m128d s, __mmask8 m, __m128d a, __m128d b, int sae);
VRCP28SD __m128d _mm_maskz_rcp28_round_sd(__mmask8 m, __m128d a, __m128d b, int sae);
```
### SIMD Floating-Point Exceptions
Invalid (if SNaN input), Divide-by-zero

### Other Exceptions

See Exceptions Type E3.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
