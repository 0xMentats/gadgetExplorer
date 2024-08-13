<b>VGETMANTPD</b> — Extract Float64 Vector of Normalized Mantissas from Float64 Vector
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F3A.W1 26 /r ib VGETMANTPD xmm1 {k1}{z}, xmm2/m128/m64bcst, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Get Normalized Mantissa from float64 vector xmm2/m128/m64bcst and store the result in xmm1, using imm8 for sign control and mantissa interval normalization, under writemask.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F3A.W1 26 /r ib VGETMANTPD ymm1 {k1}{z}, ymm2/m256/m64bcst, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Get Normalized Mantissa from float64 vector ymm2/m256/m64bcst and store the result in ymm1, using imm8 for sign control and mantissa interval normalization, under writemask.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F3A.W1 26 /r ib VGETMANTPD zmm1 {k1}{z}, zmm2/m512/m64bcst{sae}, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Get Normalized Mantissa from float64 vector zmm2/m512/m64bcst and store the result in zmm1, using imm8 for sign control and mantissa interval normalization, under writemask.</td>
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
		<td>Imm8</td>
		<td>NA</td>
	</tr>
</table>


### Description
Convert double-precision floating values in the source operand (the second operand) to DP FP values with the
mantissa normalization and sign control specified by the imm8 byte, see Figure 5-15. The converted results are
written to the destination operand (the first operand) using writemask k1. The normalized mantissa is specified by
interv (imm8[1:0]) and the sign control (sc) is specified by bits 3:2 of the immediate byte.

The destination operand is a ZMM/YMM/XMM register updated under the writemask. The source operand can be a
ZMM/YMM/XMM register, a 512/256/128-bit memory location, or a 512/256/128-bit vector broadcasted from a 64-bit
 memory location.
<table>
	<tr>
		<td colspan=5 rowspan=3><b>7 6 5 4 3 2 1 0 imm8 Must Be Zero Sign Control (SC) Normaiization Interval Imm8[3:2] = 00b : sign(SRC) Imm8[3:2] = 01b : 0 Imm8[3] = 1b : qNan_Indefinite if sign(SRC) != 0, regardless of imm8[2]. Imm8[1:0] = 00b : Interval is [ 1, 2) Imm8[1:0] = 01b : Interval is [1/2, 2) Imm8[1:0] = 10b : Interval is [ 1/2, 1) Imm8[1:0] = 11b : Interval is [3/4, 3/2)</b></td>
	</tr>
	<tr>
		<td>Must Be Zero</td>
		<td>Sign Control (SC)</td>
		<td>Normaiization Interval</td>
	</tr>
	<tr>
	</tr>
</table>

Figure 5-15.  Imm8 Controls for VGETMANTPD/SD/PS/SS

For each input DP FP value x, The conversion operation is:

GetMant(x) = ±2k|x.significand|

where:

1 <= |x.significand| < 2

Unbiased exponent k depends on the interval range defined by interv and whether the exponent of the source is
even or odd. The sign of the final result is determined by sc and the source sign.
If interv != 0 then k = -1, otherwise K = 0. The encoded value of imm8[1:0] and sign control are shown in
Figure 5-15.
Each converted DP FP result is encoded according to the sign control, the unbiased exponent k (adding bias) and a
mantissa normalized to the range specified by interv.

The GetMant() function follows Table 5-16 when dealing with floating-point special numbers.

This instruction is writemasked, so only those elements with the corresponding bit set in vector mask register k1
are computed and stored into the destination. Elements in zmm1 with the corresponding bit clear in k1 retain their
previous values.

Note: EVEX.vvvv is reserved and must be 1111b; otherwise instructions will \#UD.

Table 5-16. GetMant() Special Float Values Behavior
<table>
	<tr>
		<td><b>Input</b></td>
		<td><b>Result</b></td>
		<td><b>Exceptions / Comments</b></td>
	</tr>
	<tr>
		<td>NaN</td>
		<td>QNaN(SRC)</td>
		<td>Ignore interv If (SRC = SNaN) then #IE</td>
	</tr>
	<tr>
		<td>+∞</td>
		<td>1.0</td>
		<td>Ignore interv</td>
	</tr>
	<tr>
		<td>+0</td>
		<td>1.0</td>
		<td>Ignore interv</td>
	</tr>
	<tr>
		<td>-0</td>
		<td>IF (SC[0]) THEN +1.0 ELSE -1.0</td>
		<td>Ignore interv</td>
	</tr>
	<tr>
		<td>-∞</td>
		<td>IF (SC[1]) THEN {QNaN_Indefinite} ELSE { IF (SC[0]) THEN +1.0 ELSE -1.0</td>
		<td>Ignore interv If (SC[1]) then #IE</td>
	</tr>
	<tr>
		<td>negative</td>
		<td>SC[1] ? QNaN_Indefinite : Getmant(SRC)</td>
		<td>If (SC[1]) then #IE</td>
	</tr>
</table>


### Operation

```java
GetNormalizeMantissaDP(SRC[63:0], SignCtrl[1:0], Interv[1:0])
{
    // Extracting the SRC sign, exponent and mantissa fields
    Dst.sign ← SignCtrl[0] ? 0 : Src[63];
                            // Get sign bit
    Dst.exp ← SRC[62:52]; ; Get original exponent value
    Dst.fraction ← SRC[51:0];; Get original fraction value
    ZeroOperand ← (Dst.exp = 0) AND (Dst.fraction = 0);
    DenormOperand ← (Dst.exp = 0h) AND (Dst.fraction != 0);
    InfiniteOperand ← (Dst.exp = 07FFh) AND (Dst.fraction = 0);
    NaNOperand ← (Dst.exp = 07FFh) AND (Dst.fraction != 0);
    // Check for NAN operand
    IF (NaNOperand) 
    { 
        IF (SRC = SNaN) {Set #IE;}
        Return QNAN(SRC);
    }
    // Check for Zero and Infinite operands
    IF ((ZeroOperand) OR (InfiniteOperand) 
    {
        Dst.exp ← 03FFh;
                            // Override exponent with BIAS
        Return ((Dst.sign<<63) | (Dst.exp<<52) | (Dst.fraction));
    }
    // Check for negative operand (including -0.0)
    IF ((Src[63] = 1) AND SignCtrl[1]) 
    {
        Set #IE;
        Return QNaN_Indefinite;
    }
    // Checking for denormal operands
    IF (DenormOperand) 
    {
        IF (MXCSR.DAZ=1) Dst.fraction ← 0;// Zero out fraction
        ELSE 
        {
            // Jbit is the hidden integral bit. Zero in case of denormal operand.
            Src.Jbit ← 0;
                            // Zero Src Jbit
            Dst.exp ← 03FFh;
                            // Override exponent with BIAS
            WHILE (Src.Jbit = 0) {
                            // normalize mantissa
                Src.Jbit ← Dst.fraction[51];
                            // Get the fraction MSB
                Dst.fraction ← (Dst.fraction << 1);
                            // Start normalizing the mantissa
                Dst.exp--;
                            // Adjust the exponent
            }
            SET #DE;
                            // Set DE bit
        }
    } 
            // At this point, Dst.fraction is normalized.
    // Checking for exponent response
    Unbiased.exp ← Dst.exp – 03FFh; 
                            // subtract the bias from exponent
    IsOddExp ← Unbiased.exp[0];
                            // recognized unbiased ODD exponent
    SignalingBit ← Dst.fraction[51];
    CASE (interv[1:0]) 
        00: Dst.exp ← 03FFh;
                            // This is the bias
        01: Dst.exp ← (IsOddExp) ? 03FEh : 03FFh;
                            // either bias-1, or bias
        10: Dst.exp ← 03FEh;
                            // bias-1
        11: Dst.exp ← (SignalingBit) ? 03FEh : 03FFh;
                            // either bias-1, or bias
    ESAC
    // At this point Dst.exp has the correct result. Form the final destination
    DEST[63:0] ← (Dst.sign << 63) OR (Dst.exp << 52) OR (Dst.fraction);
    Return (DEST);
}
```
#### VGETMANTPD (EVEX encoded versions)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
SignCtrl[1:0] ← IMM8[3:2];
Interv[1:0] ← IMM8[1:0];
FOR j ← 0 TO KL-1
    i ← j * 64
    IF k1[j] OR *no writemask*
        THEN 
            IF (EVEX.b = 1) AND (SRC *is memory*)
                THEN
                    DEST[i+63:i] ←GetNormalizedMantissaDP(SRC[63:0], SignCtrl, Interv)
                ELSE 
                    DEST[i+63:i] ←GetNormalizedMantissaDP(SRC[i+63:i], SignCtrl, Interv)
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
VGETMANTPD __m512d _mm512_getmant_pd( __m512d a, enum intv, enum sgn);
VGETMANTPD __m512d _mm512_mask_getmant_pd(__m512d s, __mmask8 k, __m512d a, enum intv, enum sgn);
VGETMANTPD __m512d _mm512_maskz_getmant_pd( __mmask8 k, __m512d a, enum intv, enum sgn);
VGETMANTPD __m512d _mm512_getmant_round_pd( __m512d a, enum intv, enum sgn, int r);
VGETMANTPD __m512d _mm512_mask_getmant_round_pd(__m512d s, __mmask8 k, __m512d a, enum intv, enum sgn, int r);
VGETMANTPD __m512d _mm512_maskz_getmant_round_pd( __mmask8 k, __m512d a, enum intv, enum sgn, int r);
VGETMANTPD __m256d _mm256_getmant_pd( __m256d a, enum intv, enum sgn);
VGETMANTPD __m256d _mm256_mask_getmant_pd(__m256d s, __mmask8 k, __m256d a, enum intv, enum sgn);
VGETMANTPD __m256d _mm256_maskz_getmant_pd( __mmask8 k, __m256d a, enum intv, enum sgn);
VGETMANTPD __m128d _mm_getmant_pd( __m128d a, enum intv, enum sgn);
VGETMANTPD __m128d _mm_mask_getmant_pd(__m128d s, __mmask8 k, __m128d a, enum intv, enum sgn);
VGETMANTPD __m128d _mm_maskz_getmant_pd( __mmask8 k, __m128d a, enum intv, enum sgn);
```
### SIMD Floating-Point Exceptions
Denormal, Invalid

### Other Exceptions

See Exceptions Type E2.
<p>#UD
If EVEX.vvvv != 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
