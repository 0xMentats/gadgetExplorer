<b>CVTPS2PD</b> — Convert Packed Single-Precision Floating-Point Values to Packed Double-Precision
Floating-Point Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 5A /r CVTPS2PD xmm1, xmm2/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Convert two packed single-precision floating-point values in xmm2/m64 to two packed double-precision floating-point values in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.0F.WIG 5A /r VCVTPS2PD xmm1, xmm2/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Convert two packed single-precision floating-point values in xmm2/m64 to two packed double-precision floating-point values in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.256.0F.WIG 5A /r VCVTPS2PD ymm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Convert four packed single-precision floating-point values in xmm2/m128 to four packed double-precision floating- point values in ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.128.0F.W0 5A /r VCVTPS2PD xmm1 {k1}{z}, xmm2/m64/m32bcst</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Convert two packed single-precision floating-point values in xmm2/m64/m32bcst to packed double-precision floating- point values in xmm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.0F.W0 5A /r VCVTPS2PD ymm1 {k1}{z}, xmm2/m128/m32bcst</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL</td>
		<td>Convert four packed single-precision floating-point values in xmm2/m128/m32bcst to packed double-precision floating-point values in ymm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.0F.W0 5A /r VCVTPS2PD zmm1 {k1}{z}, ymm2/m256/m32bcst{sae}</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Convert eight packed single-precision floating-point values in ymm2/m256/b32bcst to eight packed double-precision floating-point values in zmm1 with writemask k1.</td>
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
		<td>Half</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Converts two, four or eight packed single-precision floating-point values in the source operand (second operand)
to two, four or eight packed double-precision floating-point values in the destination operand (first operand).

EVEX encoded versions: The source operand is a YMM/XMM/XMM (low 64-bits) register, a 256/128/64-bit memory
location or a 256/128/64-bit vector broadcasted from a 32-bit memory location. The destination operand is a
ZMM/YMM/XMM register conditionally updated with writemask k1.

VEX.256 encoded version: The source operand is an XMM register or 128- bit memory location. The destination
operand is a YMM register. Bits (MAXVL-1:256) of the corresponding destination ZMM register are zeroed.

VEX.128 encoded version: The source operand is an XMM register or 64- bit memory location. The destination
operand is a XMM register. The upper Bits (MAXVL-1:128) of the corresponding ZMM register destination are
zeroed.

128-bit Legacy SSE version: The source operand is an XMM register or 64- bit memory location. The destination
operand is an XMM register. The upper Bits (MAXVL-1:128) of the corresponding ZMM register destination are
unmodified.

Note: VEX.vvvv and EVEX.vvvv are reserved and must be 1111b otherwise instructions will \#UD.
<table>
	<tr>
		<td colspan=8 rowspan=5><b>SRC X3 X2 X1 X0 DEST X3 X2 X1 X0</b></td>
	</tr>
	<tr>
		<td>X3</td>
		<td>X2</td>
		<td>X1</td>
		<td>X0</td>
	</tr>
	<tr>
	</tr>
	<tr>
		<td>X3</td>
		<td>X2</td>
		<td colspan=2>X1</td>
		<td colspan=2>X0</td>
	</tr>
	<tr>
	</tr>
</table>

Figure 3-14.  CVTPS2PD (VEX.256 encoded version)

### Operation


#### VCVTPS2PD (EVEX encoded versions) when src operand is a register
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 64
    k ← j * 32
    IF k1[j] OR *no writemask*
        THEN DEST[i+63:i] ←
            Convert_Single_Precision_To_Double_Precision_Floating_Point(SRC[k+31:k])
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
#### VCVTPS2PD (EVEX encoded versions) when src operand is a memory source
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 64
    k ← j * 32
    IF k1[j] OR *no writemask*
        THEN 
            IF (EVEX.b = 1) 
                THEN
                    DEST[i+63:i] ←
            Convert_Single_Precision_To_Double_Precision_Floating_Point(SRC[31:0])
                ELSE 
                    DEST[i+63:i] ←
            Convert_Single_Precision_To_Double_Precision_Floating_Point(SRC[k+31:k])
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
#### VCVTPS2PD (VEX.256 encoded version)
```java
DEST[63:0] ← Convert_Single_Precision_To_Double_Precision_Floating_Point(SRC[31:0])
DEST[127:64] ← Convert_Single_Precision_To_Double_Precision_Floating_Point(SRC[63:32])
DEST[191:128] ← Convert_Single_Precision_To_Double_Precision_Floating_Point(SRC[95:64])
DEST[255:192] ← Convert_Single_Precision_To_Double_Precision_Floating_Point(SRC[127:96)
DEST[MAXVL-1:256] ← 0
```
#### VCVTPS2PD (VEX.128 encoded version)
```java
DEST[63:0] ← Convert_Single_Precision_To_Double_Precision_Floating_Point(SRC[31:0])
DEST[127:64] ← Convert_Single_Precision_To_Double_Precision_Floating_Point(SRC[63:32])
DEST[MAXVL-1:128] ← 0
```
#### CVTPS2PD (128-bit Legacy SSE version)
```java
DEST[63:0] ← Convert_Single_Precision_To_Double_Precision_Floating_Point(SRC[31:0])
DEST[127:64] ← Convert_Single_Precision_To_Double_Precision_Floating_Point(SRC[63:32])
DEST[MAXVL-1:128] (unmodified)
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VCVTPS2PD __m512d _mm512_cvtps_pd( __m256 a);
VCVTPS2PD __m512d _mm512_mask_cvtps_pd( __m512d s, __mmask8 k, __m256 a);
VCVTPS2PD __m512d _mm512_maskz_cvtps_pd( __mmask8 k, __m256 a);
VCVTPS2PD __m512d _mm512_cvt_roundps_pd( __m256 a, int sae);
VCVTPS2PD __m512d _mm512_mask_cvt_roundps_pd( __m512d s, __mmask8 k, __m256 a, int sae);
VCVTPS2PD __m512d _mm512_maskz_cvt_roundps_pd( __mmask8 k, __m256 a, int sae);
VCVTPS2PD __m256d _mm256_mask_cvtps_pd( __m256d s, __mmask8 k, __m128 a);
VCVTPS2PD __m256d _mm256_maskz_cvtps_pd( __mmask8 k, __m128a);
VCVTPS2PD __m128d _mm_mask_cvtps_pd( __m128d s, __mmask8 k, __m128 a);
VCVTPS2PD __m128d _mm_maskz_cvtps_pd( __mmask8 k, __m128 a);
VCVTPS2PD __m256d _mm256_cvtps_pd (__m128 a)
CVTPS2PD __m128d _mm_cvtps_pd (__m128 a)
```
### SIMD Floating-Point Exceptions
Invalid, Denormal

### Other Exceptions

VEX-encoded instructions, see Exceptions Type 3;

EVEX-encoded instructions, see Exceptions Type E3.
<p>#UD
If VEX.vvvv != 1111B or EVEX.vvvv != 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
