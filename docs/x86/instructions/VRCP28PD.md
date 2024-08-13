INSTRUCTION SET REFERENCE UNIQUE TO INTEL® XEON PHI™ PROCESSORS
<b>VRCP28PD</b> — Approximation to the Reciprocal of Packed Double-Precision Floating-Point Values

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
		<td>EVEX.512.66.0F38.W1 CA /r VRCP28PD zmm1 {k1}{z}, zmm2/m512/m64bcst {sae}</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512ER</td>
		<td>Computes the approximate reciprocals ( < 2^-28 relative error) of the packed double-precision floating-point values in zmm2/m512/m64bcst and stores the results in zmm1. Under writemask.</td>
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
Computes the reciprocal approximation of the float64 values in the source operand (the second operand) and store
the results to the destination operand (the first operand). The approximate reciprocal is evaluated with less than
2^-28 of maximum relative error.

Denormal input values are treated as zeros and do not signal \#DE, irrespective of MXCSR.DAZ. Denormal results
are flushed to zeros and do not signal \#UE, irrespective of MXCSR.FTZ.

If any source element is NaN, the quietized NaN source value is returned for that element. If any source element is
±∞, ±0.0 is returned for that element. Also, if any source element is ±0.0, ±∞ is returned for that element.

The source operand is a ZMM register, a 512-bit memory location or a 512-bit vector broadcasted from a 64-bit
memory location. The destination operand is a ZMM register, conditionally updated using writemask k1.

EVEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.

A numerically exact implementation of VRCP28xx can be found at https://software.intel.com/en-us/articles/refer-
ence-implementations-for-IA-approximation-instructions-vrcp14-vrsqrt14-vrcp28-vrsqrt28-vexp2.

### Operation


#### VRCP28PD (EVEX encoded versions)
```java
(KL, VL) = (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 64
    IF k1[j] OR *no writemask* THEN
            IF (EVEX.b = 1) AND (SRC *is memory*)
                THEN DEST[i+63:i] ← RCP_28_DP(1.0/SRC[63:0]);
                ELSE DEST[i+63:i] ← RCP_28_DP(1.0/SRC[i+63:i]);
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
                            INSTRUCTION SET REFERENCE UNIQUE TO INTEL® XEON PHI™ PROCESSORS
```
#### Table 6-35. VRCP28PD Special Cases
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
VRCP28PD __m512d _mm512_rcp28_round_pd ( __m512d a, int sae);
VRCP28PD __m512d _mm512_mask_rcp28_round_pd(__m512d a, __mmask8 m, __m512d b, int sae);
VRCP28PD __m512d _mm512_maskz_rcp28_round_pd( __mmask8 m, __m512d b, int sae);
```
### SIMD Floating-Point Exceptions
Invalid (if SNaN input), Divide-by-zero

### Other Exceptions

See Exceptions Type E2.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
