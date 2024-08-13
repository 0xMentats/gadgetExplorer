<b>VRANGEPD</b> — Range Restriction Calculation For Packed Pairs of Float64 Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F3A.W1 50 /r ib VRANGEPD xmm1 {k1}{z}, xmm2, xmm3/m128/m64bcst, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512DQ</td>
		<td>Calculate two RANGE operation output value from 2 pairs of double-precision floating-point values in xmm2 and xmm3/m128/m32bcst, store the results to xmm1 under the writemask k1. Imm8 specifies the comparison and sign of the range operation.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F3A.W1 50 /r ib VRANGEPD ymm1 {k1}{z}, ymm2, ymm3/m256/m64bcst, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512DQ</td>
		<td>Calculate four RANGE operation output value from 4pairs of double-precision floating-point values in ymm2 and ymm3/m256/m32bcst, store the results to ymm1 under the writemask k1. Imm8 specifies the comparison and sign of the range operation.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F3A.W1 50 /r ib VRANGEPD zmm1 {k1}{z}, zmm2, zmm3/m512/m64bcst{sae}, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512DQ</td>
		<td>Calculate eight RANGE operation output value from 8 pairs of double-precision floating-point values in zmm2 and zmm3/m512/m32bcst, store the results to zmm1 under the writemask k1. Imm8 specifies the comparison and sign of the range operation.</td>
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
		<td>Imm8</td>
	</tr>
</table>


### Description
This instruction calculates 2/4/8 range operation outputs from two sets of packed input double-precision FP values
in the first source operand (the second operand) and the second source operand (the third operand). The range
outputs are written to the destination operand (the first operand) under the writemask k1.

Bits7:4 of imm8 byte must be zero. The range operation output is performed in two parts, each configured by a
two-bit control field within imm8[3:0]:

 * Imm8[1:0] specifies the initial comparison operation to be one of max, min, max absolute value or min
absolute value of the input value pair. Each comparison of two input values produces an intermediate result that
combines with the sign selection control (Imm8[3:2]) to determine the final range operation output.

 * Imm8[3:2] specifies the sign of the range operation output to be one of the following: from the first input
value, from the comparison result, set or clear.

The encodings of Imm8[1:0] and Imm8[3:2] are shown in Figure 5-27.
<table>
	<tr>
		<td colspan=5 rowspan=3><b>7 6 5 4 3 2 1 0 imm8 Must Be Zero Sign Control (SC) Compare Operation Select Imm8[3:2] = 00b : Select sign(SRC1) Imm8[3:2] = 01b : Select sign(Compare_Result) Imm8[3:2] = 10b : Set sign to 0 Imm8[3:2] = 11b : Set sign to 1 Imm8[1:0] = 00b : Select Min value Imm8[1:0] = 01b : Select Max value Imm8[1:0] = 10b : Select Min-Abs value Imm8[1:0] = 11b : Select Max-Abs value</b></td>
	</tr>
	<tr>
		<td>Must Be Zero</td>
		<td>Sign Control (SC)</td>
		<td>Compare Operation Select</td>
	</tr>
	<tr>
	</tr>
</table>

Figure 5-27.  Imm8 Controls for VRANGEPD/SD/PS/SS
When one or more of the input value is a NAN, the comparison operation may signal invalid exception (IE). Details
with one of more input value is NAN is listed in Table 5-19. If the comparison raises an IE, the sign select control
(Imm8[3:2] has no effect to the range operation output, this is indicated also in Table 5-19.

When both input values are zeros of opposite signs, the comparison operation of MIN/MAX in the range compare
operation is slightly different from the conceptually similar FP MIN/MAX operation that are found in the instructions
VMAXPD/VMINPD. The details of MIN/MAX/MIN_ABS/MAX_ABS operation for VRANGEPD/PS/SD/SS for magni-
tude-0, opposite-signed input cases are listed in Table 5-20.

Additionally, non-zero, equal-magnitude with opposite-sign input values perform MIN_ABS or MAX_ABS compar-
ison operation with result listed in Table 5-21.

Table 5-19. Signaling of Comparison Operation of One or More NaN Input Values and Effect of Imm8[3:2]
<table>
	<tr>
		<td><b>Src1</b></td>
		<td><b>Src2</b></td>
		<td><b>Result</b></td>
		<td><b>IE Signaling Due to Comparison</b></td>
		<td><b>Imm8[3:2] Effect to Range Output</b></td>
	</tr>
	<tr>
		<td>sNaN1</td>
		<td>sNaN2</td>
		<td>Quiet(sNaN1)</td>
		<td>Yes</td>
		<td>Ignored</td>
	</tr>
	<tr>
		<td>sNaN1</td>
		<td>qNaN2</td>
		<td>Quiet(sNaN1)</td>
		<td>Yes</td>
		<td>Ignored</td>
	</tr>
	<tr>
		<td>sNaN1</td>
		<td>Norm2</td>
		<td>Quiet(sNaN1)</td>
		<td>Yes</td>
		<td>Ignored</td>
	</tr>
	<tr>
		<td>qNaN1</td>
		<td>sNaN2</td>
		<td>Quiet(sNaN2)</td>
		<td>Yes</td>
		<td>Ignored</td>
	</tr>
	<tr>
		<td>qNaN1</td>
		<td>qNaN2</td>
		<td>qNaN1</td>
		<td>No</td>
		<td>Applicable</td>
	</tr>
	<tr>
		<td>qNaN1</td>
		<td>Norm2</td>
		<td>Norm2</td>
		<td>No</td>
		<td>Applicable</td>
	</tr>
	<tr>
		<td>Norm1</td>
		<td>sNaN2</td>
		<td>Quiet(sNaN2)</td>
		<td>Yes</td>
		<td>Ignored</td>
	</tr>
	<tr>
		<td>Norm1</td>
		<td>qNaN2</td>
		<td>Norm1</td>
		<td>No</td>
		<td>Applicable</td>
	</tr>
</table>

Table 5-20. Comparison Result for Opposite-Signed Zero Cases for MIN, MIN_ABS and MAX, MAX_ABS
<table>
	<tr>
		<td colspan=3><b>MIN and MIN_ABS</b></td>
		<td colspan=3><b>MAX and MAX_ABS</b></td>
	</tr>
	<tr>
		<td>Src1</td>
		<td>Src2</td>
		<td>Result</td>
		<td>Src1</td>
		<td>Src2</td>
		<td>Result</td>
	</tr>
	<tr>
		<td>+0</td>
		<td>-0</td>
		<td>-0</td>
		<td>+0</td>
		<td>-0</td>
		<td>+0</td>
	</tr>
	<tr>
		<td>-0</td>
		<td>+0</td>
		<td>-0</td>
		<td>-0</td>
		<td>+0</td>
		<td>+0</td>
	</tr>
</table>

Table 5-21. Comparison Result of Equal-Magnitude Input Cases for MIN_ABS and MAX_ABS, (|a| = |b|, a>0, b<0)
<table>
	<tr>
		<td colspan=3><b>MIN_ABS (|a| = |b|, a>0, b<0)</b></td>
		<td colspan=3><b>MAX_ABS (|a| = |b|, a>0, b<0)</b></td>
	</tr>
	<tr>
		<td>Src1</td>
		<td>Src2</td>
		<td>Result</td>
		<td>Src1</td>
		<td>Src2</td>
		<td>Result</td>
	</tr>
	<tr>
		<td>a</td>
		<td>b</td>
		<td>b</td>
		<td>a</td>
		<td>b</td>
		<td>a</td>
	</tr>
	<tr>
		<td>b</td>
		<td>a</td>
		<td>b</td>
		<td>b</td>
		<td>a</td>
		<td>a</td>
	</tr>
</table>


### Operation

```java
RangeDP(SRC1[63:0], SRC2[63:0], CmpOpCtl[1:0], SignSelCtl[1:0])
{
    // Check if SNAN and report IE, see also Table 5-19
    IF (SRC1 = SNAN) THEN RETURN (QNAN(SRC1), set IE);
    IF (SRC2 = SNAN) THEN RETURN (QNAN(SRC2), set IE);
    Src1.exp ← SRC1[62:52];
    Src1.fraction ← SRC1[51:0];
    IF ((Src1.exp = 0 ) and (Src1.fraction != 0)) THEN// Src1 is a denormal number
        IF DAZ THEN Src1.fraction ← 0;
        ELSE IF (SRC2 <> QNAN) Set DE; FI;
    FI;
    Src2.exp ← SRC2[62:52];
    Src2.fraction ← SRC2[51:0];
    IF ((Src2.exp = 0) and (Src2.fraction !=0 )) THEN// Src2 is a denormal number
        IF DAZ THEN Src2.fraction ← 0;
        ELSE IF (SRC1 <> QNAN) Set DE; FI;
    FI;
    IF 
        (SRC2 = QNAN) THEN{TMP[63:0] ← SRC1[63:0]}
    ELSE IF(SRC1 = QNAN) THEN{TMP[63:0] ← SRC2[63:0]}
    ELSE IF (Both SRC1, SRC2 are magnitude-0 and opposite-signed) TMP[63:0] ← from Table 5-20
    ELSE IF (Both SRC1, SRC2 are magnitude-equal and opposite-signed and CmpOpCtl[1:0] > 01) TMP[63:0] ← from Table 5-21
    ELSE 
        Case(CmpOpCtl[1:0])
        00: TMP[63:0] ← (SRC1[63:0] ≤ SRC2[63:0]) ? SRC1[63:0] : SRC2[63:0];
        01: TMP[63:0] ← (SRC1[63:0] ≤ SRC2[63:0]) ? SRC2[63:0] : SRC1[63:0];
        10: TMP[63:0] ← (ABS(SRC1[63:0]) ≤ ABS(SRC2[63:0])) ? SRC1[63:0] : SRC2[63:0];
        11: TMP[63:0] ← (ABS(SRC1[63:0]) ≤ ABS(SRC2[63:0])) ? SRC2[63:0] : SRC1[63:0];
        ESAC;
    FI;
    Case(SignSelCtl[1:0])
    00: dest ← (SRC1[63] << 63) OR (TMP[62:0]);// Preserve Src1 sign bit
    01: dest ← TMP[63:0];// Preserve sign of compare result
    10: dest ← (0 << 63) OR (TMP[62:0]);// Zero out sign bit
    11: dest ← (1 << 63) OR (TMP[62:0]);// Set the sign bit
    ESAC;
    RETURN dest[63:0];
}
CmpOpCtl[1:0]= imm8[1:0];
SignSelCtl[1:0]=imm8[3:2];
```
#### VRANGEPD (EVEX encoded versions)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 64
    IF k1[j] OR *no writemask* THEN
            IF (EVEX.b == 1) AND (SRC2 *is memory*)
                THEN DEST[i+63:i] ← RangeDP (SRC1[i+63:i], SRC2[63:0], CmpOpCtl[1:0], SignSelCtl[1:0]);
                ELSE DEST[i+63:i] ← RangeDP (SRC1[i+63:i], SRC2[i+63:i], CmpOpCtl[1:0], SignSelCtl[1:0]);
            FI;
    ELSE 
        IF *merging-masking*
                            ; merging-masking
            THEN *DEST[i+63:i] remains unchanged*
            ELSE 
                            ; zeroing-masking
                DEST[i+63:i] = 0
        FI;
    FI;
ENDFOR;
DEST[MAXVL-1:VL] ← 0
The following example describes a common usage of this instruction for checking that the input operand is
bounded between ±1023.
VRANGEPD zmm_dst, zmm_src, zmm_1023, 02h;
Where:
        zmm_dst is the destination operand.
        zmm_src is the input operand to compare against ±1023 (this is SRC1).
        zmm_1023 is the reference operand, contains the value of 1023 (and this is SRC2).
        IMM=02(imm8[1:0]='10) selects the Min Absolute value operation with selection of SRC1.sign.
In case |zmm_src| < 1023 (i.e. SRC1 is smaller than 1023 in magnitude), then its value will be written into
zmm_dst. Otherwise, the value stored in zmm_dst will get the value of 1023 (received on zmm_1023, which is
SRC2).
However, the sign control (imm8[3:2]='00) instructs to select the sign of SRC1 received from zmm_src. So, even
in the case of |zmm_src| ≥ 1023, the selected sign of SRC1 is kept. 
Thus, if zmm_src < -1023, the result of VRANGEPD will be the minimal value of -1023 while if zmm_src > +1023,
the result of VRANGE will be the maximal value of +1023.
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VRANGEPD __m512d _mm512_range_pd ( __m512d a, __m512d b, int imm);
VRANGEPD __m512d _mm512_range_round_pd ( __m512d a, __m512d b, int imm, int sae);
VRANGEPD __m512d _mm512_mask_range_pd (__m512 ds, __mmask8 k, __m512d a, __m512d b, int imm);
VRANGEPD __m512d _mm512_mask_range_round_pd (__m512d s, __mmask8 k, __m512d a, __m512d b, int imm, int sae);
VRANGEPD __m512d _mm512_maskz_range_pd ( __mmask8 k, __m512d a, __m512d b, int imm);
VRANGEPD __m512d _mm512_maskz_range_round_pd ( __mmask8 k, __m512d a, __m512d b, int imm, int sae);
VRANGEPD __m256d _mm256_range_pd ( __m256d a, __m256d b, int imm);
VRANGEPD __m256d _mm256_mask_range_pd (__m256d s, __mmask8 k, __m256d a, __m256d b, int imm);
VRANGEPD __m256d _mm256_maskz_range_pd ( __mmask8 k, __m256d a, __m256d b, int imm);
VRANGEPD __m128d _mm_range_pd ( __m128 a, __m128d b, int imm);
VRANGEPD __m128d _mm_mask_range_pd (__m128 s, __mmask8 k, __m128d a, __m128d b, int imm);
VRANGEPD __m128d _mm_maskz_range_pd ( __mmask8 k, __m128d a, __m128d b, int imm);
```
### SIMD Floating-Point Exceptions
Invalid, Denormal

### Other Exceptions

See Exceptions Type E2.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
