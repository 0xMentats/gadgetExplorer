INSTRUCTION SET REFERENCE UNIQUE TO INTEL® XEON PHI™ PROCESSORS
<b>VRSQRT28PS</b> — Approximation to the Reciprocal Square Root of Packed Single-Precision

Floating-Point Values with Less Than 2^-28 Relative Error
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W0 CC /r VRSQRT28PS zmm1 {k1}{z}, zmm2/m512/m32bcst {sae}</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512ER</td>
		<td>Computes approximations to the Reciprocal square root (<2^-28 relative error) of the packed single-precision floating-point values from zmm2/m512/m32bcst and stores result in zmm1with writemask k1.</td>
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
Computes the reciprocal square root of the float32 values in the source operand (the second operand) and store
the results to the destination operand (the first operand). The approximate reciprocal is evaluated with less than
2^-28 of maximum relative error prior to final rounding. The final results is rounded to < 2^-23 relative error
before written to the destination.

If any source element is NaN, the quietized NaN source value is returned for that element. Negative (non-zero)
source numbers, as well as -∞, return the canonical NaN and set the Invalid Flag (\#I).

A value of -0 must return -∞ and set the DivByZero flags (\#Z). Negative numbers should return NaN and set the
Invalid flag (\#I). Note however that the instruction flush input denormals to zero of the same sign, so negative
denormals return -∞ and set the DivByZero flag.

The source operand is a ZMM register, a 512-bit memory location, or a 512-bit vector broadcasted from a 32-bit
memory location. The destination operand is a ZMM register, conditionally updated using writemask k1.

EVEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.

A numerically exact implementation of VRSQRT28xx can be found at https://software.intel.com/en-us/arti-
cles/reference-implementations-for-IA-approximation-instructions-vrcp14-vrsqrt14-vrcp28-vrsqrt28-vexp2.

### Operation


#### VRSQRT28PS (EVEX encoded versions)
```java
(KL, VL) = (16, 512)
FOR j ← 0 TO KL-1
    i ← j * 32
    IF k1[j] OR *no writemask* THEN
            IF (EVEX.b = 1) AND (SRC *is memory*)
                THEN DEST[i+31:i] ← (1.0/ SQRT(SRC[31:0]));
                ELSE DEST[i+31:i] ← (1.0/ SQRT(SRC[i+31:i]));
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
                            INSTRUCTION SET REFERENCE UNIQUE TO INTEL® XEON PHI™ PROCESSORS
```
#### Table 6-41. VRSQRT28PS Special Cases
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
VRSQRT28PS __m512 _mm512_rsqrt28_round_ps(__m512 a, int sae);
VRSQRT28PS __m512 _mm512_mask_rsqrt28_round_ps(__m512 s, __mmask16 m,__m512 a, int sae);
VRSQRT28PS __m512 _mm512_maskz_rsqrt28_round_ps(__mmask16 m,__m512 a, int sae);
```
### SIMD Floating-Point Exceptions
Invalid (if SNaN input), Divide-by-zero

### Other Exceptions

See Exceptions Type E2.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
