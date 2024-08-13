<b>VREDUCEPD</b> — Perform Reduction Transformation on Packed Float64 Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F3A.W1 56 /r ib VREDUCEPD xmm1 {k1}{z}, xmm2/m128/m64bcst, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512DQ</td>
		<td>Perform reduction transformation on packed double-precision floating point values in xmm2/m128/m32bcst by subtracting a number of fraction bits specified by the imm8 field. Stores the result in xmm1 register under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F3A.W1 56 /r ib VREDUCEPD ymm1 {k1}{z}, ymm2/m256/m64bcst, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512DQ</td>
		<td>Perform reduction transformation on packed double-precision floating point values in ymm2/m256/m32bcst by subtracting a number of fraction bits specified by the imm8 field. Stores the result in ymm1 register under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F3A.W1 56 /r ib VREDUCEPD zmm1 {k1}{z}, zmm2/m512/m64bcst{sae}, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512DQ</td>
		<td>Perform reduction transformation on double-precision floating point values in zmm2/m512/m32bcst by subtracting a number of fraction bits specified by the imm8 field. Stores the result in zmm1 register under writemask k1.</td>
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
Perform reduction transformation of the packed binary encoded double-precision FP values in the source operand
(the second operand) and store the reduced results in binary FP format to the destination operand (the first
operand) under the writemask k1.

The reduction transformation subtracts the integer part and the leading M fractional bits from the binary FP source
value, where M is a unsigned integer specified by imm8[7:4], see Figure 5-28. Specifically, the reduction transfor-
mation can be expressed as:
dest = src – (ROUND(2M\*src))\*2-M;

where “Round()” treats “src”, “2M”, and their product as binary FP numbers with normalized significand and bi-
ased exponents.
The magnitude of the reduced result can be expressed by considering src= 2p\*man2,
where ‘man2’ is the normalized significand and ‘p’ is the unbiased exponent
Then if RC = RNE: 0<=|Reduced Result|<=2p-M-1

Then if RC ≠ RNE: 0<=|Reduced Result|<2p-M

This instruction might end up with a precision exception set. However, in case of SPE set (i.e. Suppress Precision
Exception, which is imm8[3]=1), no precision exception is reported.

EVEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.
<table>
	<tr>
		<td colspan=6 rowspan=3><b>7 6 5 4 imm8 Fixed point length 3 SPE 2 RS 1 0 Round Control Override Imm8[7:4] : Number of fixed points to subtract Suppress Precision Exception: Imm8[3] Imm8[3] = 0b : Use MXCSR exception mask Imm8[3] = 1b : Suppress Round Select: Imm8[2] Imm8[2] = 0b : Use Imm8[1:0] Imm8[2] = 1b : Use MXCSR Imm8[1:0] = 00b : Round nearest even Imm8[1:0] = 01b : Round down Imm8[1:0] = 10b : Round up Imm8[1:0] = 11b : Truncate</b></td>
	</tr>
	<tr>
		<td>Fixed point length</td>
		<td>SPE</td>
		<td>RS</td>
		<td>Round Control Override</td>
	</tr>
	<tr>
	</tr>
</table>

Figure 5-28.  Imm8 Controls for VREDUCEPD/SD/PS/SS
Handling of special case of input values are listed in Table 5-24.

Table 5-24. VREDUCEPD/SD/PS/SS Special Cases
<table>
	<tr>
		<td><b></b></td>
		<td><b>Round Mode</b></td>
		<td><b>Returned value</b></td>
	</tr>
	<tr>
		<td>|Src1| < 2-M-1</td>
		<td>RNE</td>
		<td>Src1</td>
	</tr>
	<tr>
		<td rowspan=4>|Src1| < 2-M</td>
		<td>RPI, Src1 > 0</td>
		<td>Round (Src1-2-M) *</td>
	</tr>
	<tr>
		<td>RPI, Src1 ≤ 0</td>
		<td>Src1</td>
	</tr>
	<tr>
		<td>RNI, Src1 ≥ 0</td>
		<td>Src1</td>
	</tr>
	<tr>
		<td>RNI, Src1 < 0</td>
		<td>Round (Src1+2-M) *</td>
	</tr>
	<tr>
		<td rowspan=2>Src1 = ±0, or Dest = ±0 (Src1!=INF)</td>
		<td>NOT RNI</td>
		<td>+0.0</td>
	</tr>
	<tr>
		<td>RNI</td>
		<td>-0.0</td>
	</tr>
	<tr>
		<td>Src1 = ±INF</td>
		<td>any</td>
		<td>+0.0</td>
	</tr>
	<tr>
		<td>Src1= ±NAN</td>
		<td>n/a</td>
		<td>QNaN(Src1)</td>
	</tr>
</table>

\* Round control = (imm8.MS1)? MXCSR.RC: imm8.RC

### Operation

```java
ReduceArgumentDP(SRC[63:0], imm8[7:0])
{
    // Check for NaN
    IF (SRC [63:0] = NAN) THEN
        RETURN (Convert SRC[63:0] to QNaN); FI;
    M ← imm8[7:4]; // Number of fraction bits of the normalized significand to be subtracted
    RC ← imm8[1:0];// Round Control for ROUND() operation
    RC source ← imm[2];
    SPE ← 0;// Suppress Precision Exception
    TMP[63:0] ← 2-M *{ROUND(2M*SRC[63:0], SPE, RC_source, RC)}; // ROUND() treats SRC and 2M as standard binary FP values
    TMP[63:0] ← SRC[63:0] – TMP[63:0]; // subtraction under the same RC,SPE controls
    RETURN TMP[63:0]; // binary encoded FP with biased exponent and normalized significand
}
```
#### VREDUCEPD
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 64
    IF k1[j] OR *no writemask* THEN
            IF (EVEX.b == 1) AND (SRC *is memory*)
                THEN DEST[i+63:i] ← ReduceArgumentDP(SRC[63:0], imm8[7:0]);
                ELSE DEST[i+63:i] ← ReduceArgumentDP(SRC[i+63:i], imm8[7:0]);
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
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VREDUCEPD __m512d _mm512_mask_reduce_pd( __m512d a, int imm, int sae)
VREDUCEPD __m512d _mm512_mask_reduce_pd(__m512d s, __mmask8 k, __m512d a, int imm, int sae)
VREDUCEPD __m512d _mm512_maskz_reduce_pd(__mmask8 k, __m512d a, int imm, int sae)
VREDUCEPD __m256d _mm256_mask_reduce_pd( __m256d a, int imm)
VREDUCEPD __m256d _mm256_mask_reduce_pd(__m256d s, __mmask8 k, __m256d a, int imm)
VREDUCEPD __m256d _mm256_maskz_reduce_pd(__mmask8 k, __m256d a, int imm)
VREDUCEPD __m128d _mm_mask_reduce_pd( __m128d a, int imm)
VREDUCEPD __m128d _mm_mask_reduce_pd(__m128d s, __mmask8 k, __m128d a, int imm)
VREDUCEPD __m128d _mm_maskz_reduce_pd(__mmask8 k, __m128d a, int imm)
```
### SIMD Floating-Point Exceptions
Invalid, Precision

If SPE is enabled, precision exception is not reported (regardless of MXCSR exception mask).

### Other Exceptions

See Exceptions Type E2, additionally
<p>#UD
If EVEX.vvvv != 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
