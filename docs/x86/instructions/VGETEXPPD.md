<b>VGETEXPPD</b> — Convert Exponents of Packed DP FP Values to DP FP Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W1 42 /r VGETEXPPD xmm1 {k1}{z}, xmm2/m128/m64bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Convert the exponent of packed double-precision floating-point values in the source operand to DP FP results representing unbiased integer exponents and stores the results in the destination register.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W1 42 /r VGETEXPPD ymm1 {k1}{z}, ymm2/m256/m64bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Convert the exponent of packed double-precision floating-point values in the source operand to DP FP results representing unbiased integer exponents and stores the results in the destination register.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W1 42 /r VGETEXPPD zmm1 {k1}{z}, zmm2/m512/m64bcst{sae}</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Convert the exponent of packed double-precision floating-point values in the source operand to DP FP results representing unbiased integer exponents and stores the results in the destination under writemask k1.</td>
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
Extracts the biased exponents from the normalized DP FP representation of each qword data element of the source
operand (the second operand) as unbiased signed integer value, or convert the denormal representation of input
data to unbiased negative integer values. Each integer value of the unbiased exponent is converted to double-
precision FP value and written to the corresponding qword elements of the destination operand (the first operand)
as DP FP numbers.

The destination operand is a ZMM/YMM/XMM register and updated under the writemask. The source operand can
be a ZMM/YMM/XMM register, a 512/256/128-bit memory location, or a 512/256/128-bit vector broadcasted from
a 64-bit memory location.

EVEX.vvvv is reserved and must be 1111b, otherwise instructions will \#UD.

Each GETEXP operation converts the exponent value into a FP number (permitting input value in denormal repre-
sentation). Special cases of input values are listed in Table 5-14.

The formula is:
GETEXP(x) = floor(log2(|x|))
Notation floor(x) stands for the greatest integer not exceeding real number x.

Table 5-14. VGETEXPPD/SD Special Cases
<table>
	<tr>
		<td><b>Input Operand</b></td>
		<td><b>Result</b></td>
		<td><b>Comments</b></td>
	</tr>
	<tr>
		<td>src1 = NaN</td>
		<td>QNaN(src1)</td>
		<td rowspan=4>If (SRC = SNaN) then #IE If (SRC = denormal) then #DE</td>
	</tr>
	<tr>
		<td>0 < |src1| < INF</td>
		<td>floor(log2(|src1|))</td>
	</tr>
	<tr>
		<td>| src1| = +INF</td>
		<td>+INF</td>
	</tr>
	<tr>
		<td>| src1| = 0</td>
		<td>-INF</td>
	</tr>
</table>


### Operation

```java
NormalizeExpTinyDPFP(SRC[63:0])
{
    // Jbit is the hidden integral bit of a FP number. In case of denormal number it has the value of ZERO.
    Src.Jbit ← 0;
    Dst.exp ← 1; 
    Dst.fraction ← SRC[51:0];
    WHILE(Src.Jbit = 0)
    {
        Src.Jbit ← Dst.fraction[51];
                            // Get the fraction MSB
        Dst.fraction ← Dst.fraction << 1 ;
                            // One bit shift left
        Dst.exp-- ;
                            // Decrement the exponent
    }
    Dst.fraction ← 0;
                            // zero out fraction bits
    Dst.sign ← 1;
                            // Return negative sign
    TMP[63:0] ← MXCSR.DAZ? 0 : (Dst.sign << 63) OR (Dst.exp << 52) OR (Dst.fraction) ;
    Return (TMP[63:0]);
}
ConvertExpDPFP(SRC[63:0])
{
    Src.sign ← 0;
                            // Zero out sign bit
    Src.exp ← SRC[62:52];
    Src.fraction ← SRC[51:0];
    // Check for NaN
    IF (SRC = NaN) 
    {
        IF ( SRC = SNAN ) SET IE;
        Return QNAN(SRC);
    }
    // Check for +INF
    IF (SRC = +INF) Return (SRC);
    // check if zero operand
    IF ((Src.exp = 0) AND ((Src.fraction = 0) OR (MXCSR.DAZ = 1))) Return (-INF);
    }
    ELSE 
                // check if denormal operand (notice that MXCSR.DAZ = 0)
    {
        IF ((Src.exp = 0) AND (Src.fraction != 0)) 
        {
            TMP[63:0] ← NormalizeExpTinyDPFP(SRC[63:0]) ;
                            // Get Normalized Exponent
            Set #DE
        }
        ELSE
                    // exponent value is correct
        {
            TMP[63:0] ← (Src.sign << 63) OR (Src.exp << 52) OR (Src.fraction) ;
        }
        TMP ← SAR(TMP, 52) ;
                            // Shift Arithmetic Right
        TMP ← TMP – 1023;
                            // Subtract Bias
        Return CvtI2D(TMP);
                            // Convert INT to Double-Precision FP number
    }
}
```
#### VGETEXPPD (EVEX encoded versions)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 64
    IF k1[j] OR *no writemask*
        THEN 
            IF (EVEX.b = 1) AND (SRC *is memory*)
                THEN
                    DEST[i+63:i] ←
            ConvertExpDPFP(SRC[63:0])
                ELSE 
                    DEST[i+63:i] ←
            ConvertExpDPFP(SRC[i+63:i])
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
VGETEXPPD __m512d _mm512_getexp_pd(__m512d a);
VGETEXPPD __m512d _mm512_mask_getexp_pd(__m512d s, __mmask8 k, __m512d a);
VGETEXPPD __m512d _mm512_maskz_getexp_pd( __mmask8 k, __m512d a);
VGETEXPPD __m512d _mm512_getexp_round_pd(__m512d a, int sae);
VGETEXPPD __m512d _mm512_mask_getexp_round_pd(__m512d s, __mmask8 k, __m512d a, int sae);
VGETEXPPD __m512d _mm512_maskz_getexp_round_pd( __mmask8 k, __m512d a, int sae);
VGETEXPPD __m256d _mm256_getexp_pd(__m256d a);
VGETEXPPD __m256d _mm256_mask_getexp_pd(__m256d s, __mmask8 k, __m256d a);
VGETEXPPD __m256d _mm256_maskz_getexp_pd( __mmask8 k, __m256d a);
VGETEXPPD __m128d _mm_getexp_pd(__m128d a);
VGETEXPPD __m128d _mm_mask_getexp_pd(__m128d s, __mmask8 k, __m128d a);
VGETEXPPD __m128d _mm_maskz_getexp_pd( __mmask8 k, __m128d a);
```
### SIMD Floating-Point Exceptions
Invalid, Denormal

### Other Exceptions

See Exceptions Type E2.
<p>#UD
If EVEX.vvvv != 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
