<b>CVTPS2DQ</b> — Convert Packed Single-Precision Floating-Point Values to Packed Signed
Doubleword Integer Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 5B /r CVTPS2DQ xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Convert four packed single-precision floating-point values from xmm2/mem to four packed signed doubleword values in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F.WIG 5B /r VCVTPS2DQ xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Convert four packed single-precision floating-point values from xmm2/mem to four packed signed doubleword values in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.256.66.0F.WIG 5B /r VCVTPS2DQ ymm1, ymm2/m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Convert eight packed single-precision floating-point values from ymm2/mem to eight packed signed doubleword values in ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F.W0 5B /r VCVTPS2DQ xmm1 {k1}{z}, xmm2/m128/m32bcst</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Convert four packed single precision floating-point values from xmm2/m128/m32bcst to four packed signed doubleword values in xmm1 subject to writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F.W0 5B /r VCVTPS2DQ ymm1 {k1}{z}, ymm2/m256/m32bcst</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Convert eight packed single precision floating-point values from ymm2/m256/m32bcst to eight packed signed doubleword values in ymm1 subject to writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F.W0 5B /r VCVTPS2DQ zmm1 {k1}{z}, zmm2/m512/m32bcst{er}</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Convert sixteen packed single-precision floating-point values from zmm2/m512/m32bcst to sixteen packed signed doubleword values in zmm1 subject to writemask k1.</td>
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
Converts four, eight or sixteen packed single-precision floating-point values in the source operand to four, eight or
sixteen signed doubleword integers in the destination operand.

When a conversion is inexact, the value returned is rounded according to the rounding control bits in the MXCSR
register or the embedded rounding control bits. If a converted result cannot be represented in the destination
format, the floating-point invalid exception is raised, and if this exception is masked, the indefinite integer value
(2w-1, where w represents the number of bits in the destination format) is returned.

EVEX encoded versions: The source operand is a ZMM register, a 512-bit memory location or a 512-bit vector
broadcasted from a 32-bit memory location. The destination operand is a ZMM register conditionally updated with
writemask k1.

VEX.256 encoded version: The source operand is a YMM register or 256- bit memory location. The destination
operand is a YMM register. The upper bits (MAXVL-1:256) of the corresponding ZMM register destination are
zeroed.

VEX.128 encoded version: The source operand is an XMM register or 128- bit memory location. The destination
operand is a XMM register. The upper bits (MAXVL-1:128) of the corresponding ZMM register destination are
zeroed.

128-bit Legacy SSE version: The source operand is an XMM register or 128- bit memory location. The destination
operand is an XMM register. The upper bits (MAXVL-1:128) of the corresponding ZMM register destination are
unmodified.

VEX.vvvv and EVEX.vvvv are reserved and must be 1111b otherwise instructions will \#UD.

### Operation


#### VCVTPS2DQ (encoded versions) when src operand is a register
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
IF (VL = 512) AND (EVEX.b = 1) 
    THEN
        SET_RM(EVEX.RC);
    ELSE 
        SET_RM(MXCSR.RM);
FI;
FOR j ← 0 TO KL-1
    i ← j * 32
    IF k1[j] OR *no writemask*
        THEN DEST[i+31:i] ←
            Convert_Single_Precision_Floating_Point_To_Integer(SRC[i+31:i])
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
DEST[MAXVL-1:VL] ← 0
```
#### VCVTPS2DQ (EVEX encoded versions) when src operand is a memory source
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
FOR j ← 0 TO 15
    i ← j * 32
    IF k1[j] OR *no writemask*
        THEN 
            IF (EVEX.b = 1) 
                THEN
                    DEST[i+31:i] ←
            Convert_Single_Precision_Floating_Point_To_Integer(SRC[31:0])
                ELSE 
                    DEST[i+31:i] ←
            Convert_Single_Precision_Floating_Point_To_Integer(SRC[i+31:i])
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
DEST[MAXVL-1:VL] ← 0
```
#### VCVTPS2DQ (VEX.256 encoded version)
```java
DEST[31:0] ←Convert_Single_Precision_Floating_Point_To_Integer(SRC[31:0])
DEST[63:32] ←Convert_Single_Precision_Floating_Point_To_Integer(SRC[63:32])
DEST[95:64] ←Convert_Single_Precision_Floating_Point_To_Integer(SRC[95:64])
DEST[127:96] ←Convert_Single_Precision_Floating_Point_To_Integer(SRC[127:96)
DEST[159:128] ←Convert_Single_Precision_Floating_Point_To_Integer(SRC[159:128])
DEST[191:160] ←Convert_Single_Precision_Floating_Point_To_Integer(SRC[191:160])
DEST[223:192] ←Convert_Single_Precision_Floating_Point_To_Integer(SRC[223:192])
DEST[255:224] ←Convert_Single_Precision_Floating_Point_To_Integer(SRC[255:224])
```
#### VCVTPS2DQ (VEX.128 encoded version)
```java
DEST[31:0] ←Convert_Single_Precision_Floating_Point_To_Integer(SRC[31:0])
DEST[63:32] ←Convert_Single_Precision_Floating_Point_To_Integer(SRC[63:32])
DEST[95:64] ←Convert_Single_Precision_Floating_Point_To_Integer(SRC[95:64])
DEST[127:96] ←Convert_Single_Precision_Floating_Point_To_Integer(SRC[127:96])
DEST[MAXVL-1:128] ←0
```
#### CVTPS2DQ (128-bit Legacy SSE version)
```java
DEST[31:0] ←Convert_Single_Precision_Floating_Point_To_Integer(SRC[31:0])
DEST[63:32] ←Convert_Single_Precision_Floating_Point_To_Integer(SRC[63:32])
DEST[95:64] ←Convert_Single_Precision_Floating_Point_To_Integer(SRC[95:64])
DEST[127:96] ←Convert_Single_Precision_Floating_Point_To_Integer(SRC[127:96])
DEST[MAXVL-1:128] (unmodified)
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VCVTPS2DQ __m512i _mm512_cvtps_epi32( __m512 a);
VCVTPS2DQ __m512i _mm512_mask_cvtps_epi32( __m512i s, __mmask16 k, __m512 a);
VCVTPS2DQ __m512i _mm512_maskz_cvtps_epi32( __mmask16 k, __m512 a);
VCVTPS2DQ __m512i _mm512_cvt_roundps_epi32( __m512 a, int r);
VCVTPS2DQ __m512i _mm512_mask_cvt_roundps_epi32( __m512i s, __mmask16 k, __m512 a, int r);
VCVTPS2DQ __m512i _mm512_maskz_cvt_roundps_epi32( __mmask16 k, __m512 a, int r);
VCVTPS2DQ __m256i _mm256_mask_cvtps_epi32( __m256i s, __mmask8 k, __m256 a);
VCVTPS2DQ __m256i _mm256_maskz_cvtps_epi32( __mmask8 k, __m256 a);
VCVTPS2DQ __m128i _mm_mask_cvtps_epi32( __m128i s, __mmask8 k, __m128 a);
VCVTPS2DQ __m128i _mm_maskz_cvtps_epi32( __mmask8 k, __m128 a);
VCVTPS2DQ __ m256i _mm256_cvtps_epi32 (__m256 a)
CVTPS2DQ __m128i _mm_cvtps_epi32 (__m128 a)
```
### SIMD Floating-Point Exceptions
Invalid, Precision

### Other Exceptions

VEX-encoded instructions, see Exceptions Type 2;

EVEX-encoded instructions, see Exceptions Type E2.
<p>#UD
If VEX.vvvv != 1111B or EVEX.vvvv != 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
