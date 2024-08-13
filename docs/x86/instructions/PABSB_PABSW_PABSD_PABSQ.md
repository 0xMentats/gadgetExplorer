<b>PABSB / PABSW / PABSD / PABSQ</b> —  Packed Absolute Value
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 38 1C /r1 PABSB mm1, mm2/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSSE3</td>
		<td>Compute the absolute value of bytes in mm2/m64 and store UNSIGNED result in mm1.</td>
	</tr>
	<tr>
		<td>66 0F 38 1C /r PABSB xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSSE3</td>
		<td>Compute the absolute value of bytes in xmm2/m128 and store UNSIGNED result in xmm1.</td>
	</tr>
	<tr>
		<td>NP 0F 38 1D /r1 PABSW mm1, mm2/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSSE3</td>
		<td>Compute the absolute value of 16-bit integers in mm2/m64 and store UNSIGNED result in mm1.</td>
	</tr>
	<tr>
		<td>66 0F 38 1D /r PABSW xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSSE3</td>
		<td>Compute the absolute value of 16-bit integers in xmm2/m128 and store UNSIGNED result in xmm1.</td>
	</tr>
	<tr>
		<td>NP 0F 38 1E /r1 PABSD mm1, mm2/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSSE3</td>
		<td>Compute the absolute value of 32-bit integers in mm2/m64 and store UNSIGNED result in mm1.</td>
	</tr>
	<tr>
		<td>66 0F 38 1E /r PABSD xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSSE3</td>
		<td>Compute the absolute value of 32-bit integers in xmm2/m128 and store UNSIGNED result in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F38.WIG 1C /r VPABSB xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Compute the absolute value of bytes in xmm2/m128 and store UNSIGNED result in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F38.WIG 1D /r VPABSW xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Compute the absolute value of 16- bit integers in xmm2/m128 and store UNSIGNED result in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F38.WIG 1E /r VPABSD xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Compute the absolute value of 32- bit integers in xmm2/m128 and store UNSIGNED result in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.256.66.0F38.WIG 1C /r VPABSB ymm1, ymm2/m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Compute the absolute value of bytes in ymm2/m256 and store UNSIGNED result in ymm1.</td>
	</tr>
	<tr>
		<td>VEX.256.66.0F38.WIG 1D /r VPABSW ymm1, ymm2/m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Compute the absolute value of 16-bit integers in ymm2/m256 and store UNSIGNED result in ymm1.</td>
	</tr>
	<tr>
		<td>VEX.256.66.0F38.WIG 1E /r VPABSD ymm1, ymm2/m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Compute the absolute value of 32-bit integers in ymm2/m256 and store UNSIGNED result in ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.WIG 1C /r VPABSB xmm1 {k1}{z}, xmm2/m128</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Compute the absolute value of bytes in xmm2/m128 and store UNSIGNED result in xmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.WIG 1C /r VPABSB ymm1 {k1}{z}, ymm2/m256</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Compute the absolute value of bytes in ymm2/m256 and store UNSIGNED result in ymm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.WIG 1C /r VPABSB zmm1 {k1}{z}, zmm2/m512</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512BW </td>
		<td>Compute the absolute value of bytes in zmm2/m512 and store UNSIGNED result in zmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.WIG 1D /r VPABSW xmm1 {k1}{z}, xmm2/m128</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Compute the absolute value of 16-bit integers in xmm2/m128 and store UNSIGNED result in xmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.WIG 1D /r VPABSW ymm1 {k1}{z}, ymm2/m256</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Compute the absolute value of 16-bit integers in ymm2/m256 and store UNSIGNED result in ymm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.WIG 1D /r VPABSW zmm1 {k1}{z}, zmm2/m512</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Compute the absolute value of 16-bit integers in zmm2/m512 and store UNSIGNED result in zmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W0 1E /r VPABSD xmm1 {k1}{z}, xmm2/m128/m32bcst</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Compute the absolute value of 32-bit integers in xmm2/m128/m32bcst and store UNSIGNED result in xmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W0 1E /r VPABSD ymm1 {k1}{z}, ymm2/m256/m32bcst</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Compute the absolute value of 32-bit integers in ymm2/m256/m32bcst and store UNSIGNED result in ymm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>VPABSD zmm1 {k1}{z}, zmm2/m512/m32bcst</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Compute the absolute value of 32-bit integers in zmm2/m512/m32bcst and store UNSIGNED result in zmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W1 1F /r VPABSQ xmm1 {k1}{z}, xmm2/m128/m64bcst</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Compute the absolute value of 64-bit integers in xmm2/m128/m64bcst and store UNSIGNED result in xmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W1 1F /r VPABSQ ymm1 {k1}{z}, ymm2/m256/m64bcst</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Compute the absolute value of 64-bit integers in ymm2/m256/m64bcst and store UNSIGNED result in ymm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W1 1F /r VPABSQ zmm1 {k1}{z}, zmm2/m512/m64bcst</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Compute the absolute value of 64-bit integers in zmm2/m512/m64bcst and store UNSIGNED result in zmm1 using writemask k1.</td>
	</tr>
</table>

1. See note in Section 2.4, “AVX and SSE Instruction Exception Specification” in the Intel® 64 and IA-32 Architectures Software
Developer’s Manual, Volume 2A and Section 22.25.3, “Exception Conditions of Legacy SIMD Instructions Operating on MMX Registers”
in the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 3A.

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
		<td>Full Mem</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>C</td>
		<td>Full</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
PABSB/W/D computes the absolute value of each data element of the source operand (the second operand) and
stores the UNSIGNED results in the destination operand (the first operand). PABSB operates on signed bytes,
PABSW operates on signed 16-bit words, and PABSD operates on signed 32-bit integers.

EVEX encoded VPABSD/Q: The source operand is a ZMM/YMM/XMM register, a 512/256/128-bit memory location,
or a 512/256/128-bit vector broadcasted from a 32/64-bit memory location. The destination operand is a
ZMM/YMM/XMM register updated according to the writemask.

EVEX encoded VPABSB/W: The source operand is a ZMM/YMM/XMM register, or a 512/256/128-bit memory location
. The destination operand is a ZMM/YMM/XMM register updated according to the writemask.

VEX.256 encoded versions: The source operand is a YMM register or a 256-bit memory location. The destination
operand is a YMM register. The upper bits (MAXVL-1:256) of the corresponding register destination are zeroed.

VEX.128 encoded versions: The source operand is an XMM register or 128-bit memory location. The destination
operand is an XMM register. The upper bits (MAXVL-1:128) of the corresponding register destination are zeroed.
128-bit Legacy SSE version: The source operand can be an XMM register or an 128-bit memory location. The destination
 is an XMM register. The upper bits (VL_MAX-1:128) of the corresponding register destination are unmodi-
fied.

VEX.vvvv and EVEX.vvvv are reserved and must be 1111b otherwise instructions will \#UD.

### Operation


#### PABSB with 128 bit operands:
```java
    Unsigned DEST[7:0] ←ABS(SRC[7: 0]) 
    Repeat operation for 2nd through 15th bytes 
    Unsigned DEST[127:120] ←ABS(SRC[127:120])
```
#### VPABSB with 128 bit operands:
```java
    Unsigned DEST[7:0] ←ABS(SRC[7: 0]) 
    Repeat operation for 2nd through 15th bytes 
    Unsigned DEST[127:120]←ABS(SRC[127:120])
```
#### VPABSB with 256 bit operands:
```java
    Unsigned DEST[7:0]←ABS(SRC[7: 0]) 
    Repeat operation for 2nd through 31st bytes 
    Unsigned DEST[255:248]←ABS(SRC[255:248]) 
```
#### VPABSB (EVEX encoded versions)
```java
    (KL, VL) = (16, 128), (32, 256), (64, 512)
FOR j ← 0 TO KL-1
    i ← j * 8
    IF k1[j] OR *no writemask*
        THEN 
            Unsigned DEST[i+7:i] ← ABS(SRC[i+7:i])
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+7:i] remains unchanged*
                ELSE *zeroing-masking*
                            ; zeroing-masking
                    DEST[i+7:i] ← 0
            FI
    FI;
ENDFOR;
DEST[MAXVL-1:VL] ← 0
```
#### PABSW with 128 bit operands:
```java
    Unsigned DEST[15:0]←ABS(SRC[15:0]) 
    Repeat operation for 2nd through 7th 16-bit words 
    Unsigned DEST[127:112]←ABS(SRC[127:112]) 
```
#### VPABSW with 128 bit operands:
```java
    Unsigned DEST[15:0] ←ABS(SRC[15:0]) 
    Repeat operation for 2nd through 7th 16-bit words 
    Unsigned DEST[127:112]←ABS(SRC[127:112]) 
```
#### VPABSW with 256 bit operands:
```java
    Unsigned DEST[15:0]←ABS(SRC[15:0]) 
    Repeat operation for 2nd through 15th 16-bit words 
    Unsigned DEST[255:240] ←ABS(SRC[255:240]) 
```
#### VPABSW (EVEX encoded versions)
```java
    (KL, VL) = (8, 128), (16, 256), (32, 512)
FOR j ← 0 TO KL-1
    i ← j * 16
    IF k1[j] OR *no writemask*
        THEN 
            Unsigned DEST[i+15:i] ← ABS(SRC[i+15:i])
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+15:i] remains unchanged*
                ELSE *zeroing-masking*
                            ; zeroing-masking
                    DEST[i+15:i] ← 0
            FI
    FI;
ENDFOR;
DEST[MAXVL-1:VL] ← 0
```
#### PABSD with 128 bit operands:
```java
    Unsigned DEST[31:0]←ABS(SRC[31:0]) 
    Repeat operation for 2nd through 3rd 32-bit double words 
    Unsigned DEST[127:96]←ABS(SRC[127:96]) 
```
#### VPABSD with 128 bit operands:
```java
    Unsigned DEST[31:0]←ABS(SRC[31:0]) 
    Repeat operation for 2nd through 3rd 32-bit double words 
    Unsigned DEST[127:96]←ABS(SRC[127:96]) 
```
#### VPABSD with 256 bit operands:
```java
    Unsigned DEST[31:0] ←ABS(SRC[31:0]) 
    Repeat operation for 2nd through 7th 32-bit double words 
    Unsigned DEST[255:224] ←ABS(SRC[255:224]) 
```
#### VPABSD (EVEX encoded versions)
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
FOR j ← 0 TO KL-1
    i ← j * 32
    IF k1[j] OR *no writemask*
        THEN 
            IF (EVEX.b = 1) AND (SRC *is memory*)
                THEN
                    Unsigned DEST[i+31:i] ← ABS(SRC[31:0])
                ELSE 
                    Unsigned DEST[i+31:i] ← ABS(SRC[i+31:i])
            FI;
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+31:i] remains unchanged*
                ELSE *zeroing-masking*
                            ; zeroing-masking
                    DEST[i+31:i] ← 0
            FI
    FI;
ENDFOR;
DEST[MAXVL-1:VL] ← 0
```
#### VPABSQ (EVEX encoded versions)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 64
    IF k1[j] OR *no writemask*
        THEN 
            IF (EVEX.b = 1) AND (SRC *is memory*)
                THEN
                    Unsigned DEST[i+63:i] ← ABS(SRC[63:0])
                ELSE 
                    Unsigned DEST[i+63:i] ← ABS(SRC[i+63:i])
            FI;
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+63:i] remains unchanged*
                ELSE *zeroing-masking*
                            ; zeroing-masking
                    DEST[i+63:i] ← 0
            FI
    FI;
ENDFOR;
DEST[MAXVL-1:VL] ← 0
```
#### Intel C/C++ Compiler Intrinsic Equivalents
```java
VPABSB__m512i _mm512_abs_epi8 ( __m512i a)
VPABSW__m512i _mm512_abs_epi16 ( __m512i a)
VPABSB__m512i _mm512_mask_abs_epi8 ( __m512i s, __mmask64 m, __m512i a)
VPABSW__m512i _mm512_mask_abs_epi16 ( __m512i s, __mmask32 m, __m512i a)
VPABSB__m512i _mm512_maskz_abs_epi8 (__mmask64 m, __m512i a)
VPABSW__m512i _mm512_maskz_abs_epi16 (__mmask32 m, __m512i a)
VPABSB__m256i _mm256_mask_abs_epi8 (__m256i s, __mmask32 m, __m256i a)
VPABSW__m256i _mm256_mask_abs_epi16 (__m256i s, __mmask16 m, __m256i a)
VPABSB__m256i _mm256_maskz_abs_epi8 (__mmask32 m, __m256i a)
VPABSW__m256i _mm256_maskz_abs_epi16 (__mmask16 m, __m256i a)
VPABSB__m128i _mm_mask_abs_epi8 (__m128i s, __mmask16 m, __m128i a)
VPABSW__m128i _mm_mask_abs_epi16 (__m128i s, __mmask8 m, __m128i a)
VPABSB__m128i _mm_maskz_abs_epi8 (__mmask16 m, __m128i a)
VPABSW__m128i _mm_maskz_abs_epi16 (__mmask8 m, __m128i a)
VPABSD __m256i _mm256_mask_abs_epi32(__m256i s, __mmask8 k, __m256i a);
VPABSD __m256i _mm256_maskz_abs_epi32( __mmask8 k, __m256i a);
VPABSD __m128i _mm_mask_abs_epi32(__m128i s, __mmask8 k, __m128i a);
VPABSD __m128i _mm_maskz_abs_epi32( __mmask8 k, __m128i a);
VPABSD  __m512i _mm512_abs_epi32( __m512i a);
VPABSD  __m512i _mm512_mask_abs_epi32(__m512i s, __mmask16 k, __m512i a);
VPABSD  __m512i _mm512_maskz_abs_epi32( __mmask16 k, __m512i a);
VPABSQ __m512i _mm512_abs_epi64( __m512i a);
VPABSQ __m512i _mm512_mask_abs_epi64(__m512i s, __mmask8 k, __m512i a);
VPABSQ __m512i _mm512_maskz_abs_epi64( __mmask8 k, __m512i a);
VPABSQ __m256i _mm256_mask_abs_epi64(__m256i s, __mmask8 k, __m256i a);
VPABSQ __m256i _mm256_maskz_abs_epi64( __mmask8 k, __m256i a);
VPABSQ __m128i _mm_mask_abs_epi64(__m128i s, __mmask8 k, __m128i a);
VPABSQ __m128i _mm_maskz_abs_epi64( __mmask8 k, __m128i a);
PABSB __m128i _mm_abs_epi8 (__m128i a)
VPABSB __m128i _mm_abs_epi8 (__m128i a)
VPABSB __m256i _mm256_abs_epi8 (__m256i a)
PABSW __m128i _mm_abs_epi16 (__m128i a)
VPABSW __m128i _mm_abs_epi16 (__m128i a)
VPABSW __m256i _mm256_abs_epi16 (__m256i a)
PABSD __m128i _mm_abs_epi32 (__m128i a)
VPABSD __m128i _mm_abs_epi32 (__m128i a)
VPABSD __m256i _mm256_abs_epi32 (__m256i a)
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

Non-EVEX-encoded instruction, see Exceptions Type 4.
EVEX-encoded VPABSD/Q, see Exceptions Type E4.
EVEX-encoded VPABSB/W, see Exceptions Type E4.nb.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
