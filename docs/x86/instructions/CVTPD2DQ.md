<b>CVTPD2DQ</b> — Convert Packed Double-Precision Floating-Point Values to Packed Doubleword
Integers
<table>
	<tr>
		<td><b>Opcode Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F2 0F E6 /r CVTPD2DQ xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Convert two packed double-precision floating-point values in xmm2/mem to two signed doubleword integers in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.F2.0F.WIG E6 /r VCVTPD2DQ xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Convert two packed double-precision floating-point values in xmm2/mem to two signed doubleword integers in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.256.F2.0F.WIG E6 /r VCVTPD2DQ xmm1, ymm2/m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Convert four packed double-precision floating-point values in ymm2/mem to four signed doubleword integers in xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.128.F2.0F.W1 E6 /r VCVTPD2DQ xmm1 {k1}{z}, xmm2/m128/m64bcst</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Convert two packed double-precision floating-point values in xmm2/m128/m64bcst to two signed doubleword integers in xmm1 subject to writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.F2.0F.W1 E6 /r VCVTPD2DQ xmm1 {k1}{z}, ymm2/m256/m64bcst</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Convert four packed double-precision floating-point values in ymm2/m256/m64bcst to four signed doubleword integers in xmm1 subject to writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.F2.0F.W1 E6 /r VCVTPD2DQ ymm1 {k1}{z}, zmm2/m512/m64bcst{er}</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Convert eight packed double-precision floating-point values in zmm2/m512/m64bcst to eight signed doubleword integers in ymm1 subject to writemask k1.</td>
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
		<td>NA</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>B</td>
		<td>Full</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Converts packed double-precision floating-point values in the source operand (second operand) to packed signed
doubleword integers in the destination operand (first operand).

When a conversion is inexact, the value returned is rounded according to the rounding control bits in the MXCSR
register or the embedded rounding control bits. If a converted result cannot be represented in the destination
format, the floating-point invalid exception is raised, and if this exception is masked, the indefinite integer value
(2w-1, where w represents the number of bits in the destination format) is returned.

EVEX encoded versions: The source operand is a ZMM/YMM/XMM register, a 512-bit memory location, or a 512-bit
vector broadcasted from a 64-bit memory location. The destination operand is a ZMM/YMM/XMM register condi-
tionally updated with writemask k1. The upper bits (MAXVL-1:256/128/64) of the corresponding destination are
zeroed.

VEX.256 encoded version: The source operand is a YMM register or 256- bit memory location. The destination
operand is an XMM register. The upper bits (MAXVL-1:128) of the corresponding ZMM register destination are
zeroed.

VEX.128 encoded version: The source operand is an XMM register or 128- bit memory location. The destination
operand is a XMM register. The upper bits (MAXVL-1:64) of the corresponding ZMM register destination are zeroed.

128-bit Legacy SSE version: The source operand is an XMM register or 128- bit memory location. The destination
operand is an XMM register. Bits[127:64] of the destination XMM register are zeroed. However, the upper bits
(MAXVL-1:128) of the corresponding ZMM register destination are unmodified.

VEX.vvvv and EVEX.vvvv are reserved and must be 1111b, otherwise instructions will \#UD.
<table>
	<tr>
		<td colspan=9 rowspan=5><b>SRC X3 X2 X1 X0 DEST 0 X3 X2 X1 X0</b></td>
	</tr>
	<tr>
		<td colspan=2>X3</td>
		<td>X2</td>
		<td colspan=2>X1</td>
		<td colspan=2>X0</td>
	</tr>
	<tr>
	</tr>
	<tr>
		<td colspan=2>0</td>
		<td>X3</td>
		<td>X2</td>
		<td>X1</td>
		<td>X0</td>
	</tr>
	<tr>
	</tr>
</table>

Figure 3-12.  VCVTPD2DQ (VEX.256 encoded version)

### Operation


#### VCVTPD2DQ (EVEX encoded versions) when src operand is a register
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
IF (VL = 512) AND (EVEX.b = 1) 
    THEN
        SET_RM(EVEX.RC);
    ELSE 
        SET_RM(MXCSR.RM);
FI;
FOR j ← 0 TO KL-1
    i ← j * 32
    k ← j * 64
    IF k1[j] OR *no writemask*
        THEN DEST[i+31:i] ←
            Convert_Double_Precision_Floating_Point_To_Integer(SRC[k+63:k])
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+31:i] remains unchanged*
                ELSE 
                            ; zeroing-masking
                    DEST[i+31:i] ← 0
            FI
    FI;
ENDFOR
DEST[MAXVL-1:VL/2] ← 0
```
#### VCVTPD2DQ (EVEX encoded versions) when src operand is a memory source
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 32
    k ← j * 64
    IF k1[j] OR *no writemask*
        THEN 
            IF (EVEX.b = 1) 
                THEN
                    DEST[i+31:i] ←
            Convert_Double_Precision_Floating_Point_To_Integer(SRC[63:0])
                ELSE 
                    DEST[i+31:i] ←
            Convert_Double_Precision_Floating_Point_To_Integer(SRC[k+63:k])
            FI;
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+31:i] remains unchanged*
                ELSE 
                            ; zeroing-masking
                    DEST[i+31:i] ← 0
            FI
    FI;
ENDFOR
DEST[MAXVL-1:VL/2] ← 0
```
#### VCVTPD2DQ (VEX.256 encoded version)
```java
DEST[31:0] ←Convert_Double_Precision_Floating_Point_To_Integer(SRC[63:0])
DEST[63:32] ←Convert_Double_Precision_Floating_Point_To_Integer(SRC[127:64])
DEST[95:64] ←Convert_Double_Precision_Floating_Point_To_Integer(SRC[191:128])
DEST[127:96] ←Convert_Double_Precision_Floating_Point_To_Integer(SRC[255:192)
DEST[MAXVL-1:128]←0
```
#### VCVTPD2DQ (VEX.128 encoded version)
```java
DEST[31:0] ←Convert_Double_Precision_Floating_Point_To_Integer(SRC[63:0])
DEST[63:32] ←Convert_Double_Precision_Floating_Point_To_Integer(SRC[127:64])
DEST[MAXVL-1:64]←0
```
#### CVTPD2DQ (128-bit Legacy SSE version)
```java
DEST[31:0] ←Convert_Double_Precision_Floating_Point_To_Integer(SRC[63:0])
DEST[63:32] ←Convert_Double_Precision_Floating_Point_To_Integer(SRC[127:64])
DEST[127:64] ←0
DEST[MAXVL-1:128] (unmodified)
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VCVTPD2DQ __m256i _mm512_cvtpd_epi32( __m512d a);
VCVTPD2DQ __m256i _mm512_mask_cvtpd_epi32( __m256i s, __mmask8 k, __m512d a);
VCVTPD2DQ __m256i _mm512_maskz_cvtpd_epi32( __mmask8 k, __m512d a);
VCVTPD2DQ __m256i _mm512_cvt_roundpd_epi32( __m512d a, int r);
VCVTPD2DQ __m256i _mm512_mask_cvt_roundpd_epi32( __m256i s, __mmask8 k, __m512d a, int r);
VCVTPD2DQ __m256i _mm512_maskz_cvt_roundpd_epi32( __mmask8 k, __m512d a, int r);
VCVTPD2DQ __m128i _mm256_mask_cvtpd_epi32( __m128i s, __mmask8 k, __m256d a);
VCVTPD2DQ __m128i _mm256_maskz_cvtpd_epi32( __mmask8 k, __m256d a);
VCVTPD2DQ __m128i _mm_mask_cvtpd_epi32( __m128i s, __mmask8 k, __m128d a);
VCVTPD2DQ __m128i _mm_maskz_cvtpd_epi32( __mmask8 k, __m128d a);
VCVTPD2DQ __m128i _mm256_cvtpd_epi32 (__m256d src)
CVTPD2DQ __m128i _mm_cvtpd_epi32 (__m128d src)
```
### SIMD Floating-Point Exceptions
Invalid, Precision

### Other Exceptions

See Exceptions Type 2; additionally

EVEX-encoded instructions, see Exceptions Type E2.
<p>#UD
If VEX.vvvv != 1111B or EVEX.vvvv != 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
