<b>VSCALEFPD</b> — Scale Packed Float64 Values With Float64 Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F38.W1 2C /r VSCALEFPD xmm1 {k1}{z}, xmm2, xmm3/m128/m64bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Scale the packed double-precision floating-point values in xmm2 using values from xmm3/m128/m64bcst. Under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F38.W1 2C /r VSCALEFPD ymm1 {k1}{z}, ymm2, ymm3/m256/m64bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Scale the packed double-precision floating-point values in ymm2 using values from ymm3/m256/m64bcst. Under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F38.W1 2C /r VSCALEFPD zmm1 {k1}{z}, zmm2, zmm3/m512/m64bcst{er}</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Scale the packed double-precision floating-point values in zmm2 using values from zmm3/m512/m64bcst. Under writemask k1.</td>
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
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
Performs a floating-point scale of the packed double-precision floating-point values in the first source operand by
multiplying it by 2 power of the double-precision floating-point values in second source operand.

The equation of this operation is given by:
zmm1 := zmm2\*2floor(zmm3).
Floor(zmm3) means maximum integer value ≤ zmm3.

If the result cannot be represented in double precision, then the proper overflow response (for positive scaling
operand), or the proper underflow response (for negative scaling operand) is issued. The overflow and underflow
responses are dependent on the rounding mode (for IEEE-compliant rounding), as well as on other settings in
MXCSR (exception mask bits, FTZ bit), and on the SAE bit.

The first source operand is a ZMM/YMM/XMM register. The second source operand is a ZMM/YMM/XMM register, a
512/256/128-bit memory location or a 512/256/128-bit vector broadcasted from a 64-bit memory location. The
destination operand is a ZMM/YMM/XMM register conditionally updated with writemask k1.

Handling of special-case input values are listed in Table 5-30 and Table 5-31.

Table 5-30. \VSCALEFPD/SD/PS/SS Special Cases
<table>
	<tr>
		<td><b></b></td>
		<td><b></b></td>
		<td colspan=4><b>Src2</b></td>
		<td><b>Set IE</b></td>
	</tr>
	<tr>
		<td></td>
		<td></td>
		<td>±NaN</td>
		<td>+Inf</td>
		<td>-Inf</td>
		<td>0/Denorm/Norm</td>
		<td></td>
	</tr>
	<tr>
		<td>Src1</td>
		<td>±QNaN</td>
		<td>QNaN(Src1)</td>
		<td>+INF</td>
		<td>+0</td>
		<td>QNaN(Src1)</td>
		<td>IF either source is SNAN</td>
	</tr>
	<tr>
		<td></td>
		<td>±SNaN</td>
		<td>QNaN(Src1)</td>
		<td>QNaN(Src1)</td>
		<td>QNaN(Src1)</td>
		<td>QNaN(Src1)</td>
		<td>YES</td>
	</tr>
	<tr>
		<td></td>
		<td>±Inf</td>
		<td>QNaN(Src2)</td>
		<td>Src1</td>
		<td>QNaN_Indefinite</td>
		<td>Src1</td>
		<td>IF Src2 is SNAN or -INF</td>
	</tr>
	<tr>
		<td></td>
		<td>±0</td>
		<td>QNaN(Src2)</td>
		<td>QNaN_Indefinite</td>
		<td>Src1</td>
		<td>Src1</td>
		<td>IF Src2 is SNAN or +INF</td>
	</tr>
	<tr>
		<td></td>
		<td>Denorm/Norm QNaN(Src2)</td>
		<td></td>
		<td>±INF (Src1 sign)</td>
		<td>±0 (Src1 sign)</td>
		<td>Compute Result</td>
		<td>IF Src2 is SNAN</td>
	</tr>
</table>

Table 5-31. Additional VSCALEFPD/SD Special Cases
<table>
	<tr>
		<td><b>Special Case</b></td>
		<td><b>Returned value</b></td>
		<td><b>Faults</b></td>
	</tr>
	<tr>
		<td>|result| < 2-1074</td>
		<td>±0 or ±Min-Denormal (Src1 sign)</td>
		<td>Underflow</td>
	</tr>
	<tr>
		<td>|result| ≥ 21024</td>
		<td>±INF (Src1 sign) or ±Max-normal (Src1 sign)</td>
		<td>Overflow</td>
	</tr>
</table>


### Operation

```java
SCALE(SRC1, SRC2)
{
TMP_SRC2 ← SRC2
TMP_SRC1 ← SRC1
IF (SRC2 is denormal AND MXCSR.DAZ) THEN TMP_SRC2=0
IF (SRC1 is denormal AND MXCSR.DAZ) THEN TMP_SRC1=0
/* SRC2 is a 64 bits floating-point value */
DEST[63:0] ← TMP_SRC1[63:0] * POW(2, Floor(TMP_SRC2[63:0]))
}
```
#### VSCALEFPD (EVEX encoded versions)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
IF (VL = 512) AND (EVEX.b = 1) AND (SRC2 *is register*)
    THEN
        SET_RM(EVEX.RC);
    ELSE 
        SET_RM(MXCSR.RM);
FI;
FOR j ← 0 TO KL-1
    i ← j * 64
    IF k1[j] OR *no writemask* THEN
            IF (EVEX.b = 1) AND (SRC2 *is memory*)
                THEN DEST[i+63:i] ← SCALE(SRC1[i+63:i], SRC2[63:0]);
                ELSE DEST[i+63:i] ← SCALE(SRC1[i+63:i], SRC2[i+63:i]);
            FI;
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+63:i] remains unchanged*
                ELSE 
                            ; zeroing-masking
                    DEST[i+63:i] ← 0
            FI
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VSCALEFPD __m512d _mm512_scalef_round_pd(__m512d a, __m512d b, int rounding);
VSCALEFPD __m512d _mm512_mask_scalef_round_pd(__m512d s, __mmask8 k, __m512d a, __m512d b, int rounding);
VSCALEFPD __m512d _mm512_maskz_scalef_round_pd(__mmask8 k, __m512d a, __m512d b, int rounding);
VSCALEFPD __m512d _mm512_scalef_pd(__m512d a, __m512d b);
VSCALEFPD __m512d _mm512_mask_scalef_pd(__m512d s, __mmask8 k, __m512d a, __m512d b);
VSCALEFPD __m512d _mm512_maskz_scalef_pd(__mmask8 k, __m512d a, __m512d b);
VSCALEFPD __m256d _mm256_scalef_pd(__m256d a, __m256d b);
VSCALEFPD __m256d _mm256_mask_scalef_pd(__m256d s, __mmask8 k, __m256d a, __m256d b);
VSCALEFPD __m256d _mm256_maskz_scalef_pd(__mmask8 k, __m256d a, __m256d b);
VSCALEFPD __m128d _mm_scalef_pd(__m128d a, __m128d b);
VSCALEFPD __m128d _mm_mask_scalef_pd(__m128d s, __mmask8 k, __m128d a, __m128d b);
VSCALEFPD __m128d _mm_maskz_scalef_pd(__mmask8 k, __m128d a, __m128d b);
```
### SIMD Floating-Point Exceptions
Overflow, Underflow, Invalid, Precision, Denormal (for Src1).
Denormal is not reported for Src2.

### Other Exceptions

See Exceptions Type E2.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
