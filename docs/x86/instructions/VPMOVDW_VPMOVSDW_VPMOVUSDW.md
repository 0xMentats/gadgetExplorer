<b>VPMOVDW / VPMOVSDW / VPMOVUSDW</b> — Down Convert DWord to Word
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.F3.0F38.W0 33 /r VPMOVDW xmm1/m64 {k1}{z}, xmm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Converts 4 packed double-word integers from xmm2 into 4 packed word integers in xmm1/m64 with truncation under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.F3.0F38.W0 23 /r VPMOVSDW xmm1/m64 {k1}{z}, xmm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Converts 4 packed signed double-word integers from xmm2 into 4 packed signed word integers in ymm1/m64 using signed saturation under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.F3.0F38.W0 13 /r VPMOVUSDW xmm1/m64 {k1}{z}, xmm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Converts 4 packed unsigned double-word integers from xmm2 into 4 packed unsigned word integers in xmm1/m64 using unsigned saturation under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.F3.0F38.W0 33 /r VPMOVDW xmm1/m128 {k1}{z}, ymm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Converts 8 packed double-word integers from ymm2 into 8 packed word integers in xmm1/m128 with truncation under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.F3.0F38.W0 23 /r VPMOVSDW xmm1/m128 {k1}{z}, ymm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Converts 8 packed signed double-word integers from ymm2 into 8 packed signed word integers in xmm1/m128 using signed saturation under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.F3.0F38.W0 13 /r VPMOVUSDW xmm1/m128 {k1}{z}, ymm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Converts 8 packed unsigned double-word integers from ymm2 into 8 packed unsigned word integers in xmm1/m128 using unsigned saturation under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.F3.0F38.W0 33 /r VPMOVDW ymm1/m256 {k1}{z}, zmm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Converts 16 packed double-word integers from zmm2 into 16 packed word integers in ymm1/m256 with truncation under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.F3.0F38.W0 23 /r VPMOVSDW ymm1/m256 {k1}{z}, zmm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Converts 16 packed signed double-word integers from zmm2 into 16 packed signed word integers in ymm1/m256 using signed saturation under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.F3.0F38.W0 13 /r VPMOVUSDW ymm1/m256 {k1}{z}, zmm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Converts 16 packed unsigned double-word integers from zmm2 into 16 packed unsigned word integers in ymm1/m256 using unsigned saturation under writemask k1.</td>
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
		<td>Half Mem</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
VPMOVDW down converts 32-bit integer elements in the source operand (the second operand) into packed words
using truncation. VPMOVSDW converts signed 32-bit integers into packed signed words using signed saturation.
VPMOVUSDW convert unsigned double-word values into unsigned word values using unsigned saturation.

The source operand is a ZMM/YMM/XMM register. The destination operand is a YMM/XMM/XMM register or a
256/128/64-bit memory location.

Down-converted word elements are written to the destination operand (the first operand) from the least-significant
word. Word elements of the destination operand are updated according to the writemask. Bits (MAXVL-
1:256/128/64) of the register destination are zeroed.

EVEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.

### Operation


#### VPMOVDW instruction (EVEX encoded versions) when dest is a register
```java
    (KL, VL) = (4, 128), (8, 256), (16, 512)
    FOR j ← 0 TO KL-1
        i ← j * 16
        m ← j * 32
        IF k1[j] OR *no writemask*
            THEN DEST[i+15:i] ← TruncateDoubleWordToWord (SRC[m+31:m])
            ELSE 
                IF *merging-masking*
                            ; merging-masking
                    THEN *DEST[i+15:i] remains unchanged*
                    ELSE *zeroing-masking*
                            ; zeroing-masking
                        DEST[i+15:i] ← 0
                FI
        FI;
    ENDFOR
    DEST[MAXVL-1:VL/2] ← 0;
```
#### VPMOVDW instruction (EVEX encoded versions) when dest is memory
```java
    (KL, VL) = (4, 128), (8, 256), (16, 512)
    FOR j ← 0 TO KL-1
        i ← j * 16
        m ← j * 32
        IF k1[j] OR *no writemask*
            THEN DEST[i+15:i] ← TruncateDoubleWordToWord (SRC[m+31:m])
            ELSE 
                *DEST[i+15:i] remains unchanged*
                            ; merging-masking
        FI;
    ENDFOR
```
#### VPMOVSDW instruction (EVEX encoded versions) when dest is a register
```java
    (KL, VL) = (4, 128), (8, 256), (16, 512)
    FOR j ← 0 TO KL-1
        i ← j * 16
        m ← j * 32
        IF k1[j] OR *no writemask*
            THEN DEST[i+15:i] ← SaturateSignedDoubleWordToWord (SRC[m+31:m])
            ELSE 
                IF *merging-masking*
                            ; merging-masking
                    THEN *DEST[i+15:i] remains unchanged*
                    ELSE *zeroing-masking*
                            ; zeroing-masking
                        DEST[i+15:i] ← 0
                FI
        FI;
    ENDFOR
    DEST[MAXVL-1:VL/2] ← 0;
```
#### VPMOVSDW instruction (EVEX encoded versions) when dest is memory
```java
    (KL, VL) = (4, 128), (8, 256), (16, 512)
    FOR j ← 0 TO KL-1
        i ← j * 16
        m ← j * 32
        IF k1[j] OR *no writemask*
            THEN DEST[i+15:i] ← SaturateSignedDoubleWordToWord (SRC[m+31:m])
            ELSE 
                *DEST[i+15:i] remains unchanged*
                            ; merging-masking
        FI;
    ENDFOR
```
#### VPMOVUSDW instruction (EVEX encoded versions) when dest is a register
```java
    (KL, VL) = (4, 128), (8, 256), (16, 512)
    FOR j ← 0 TO KL-1
        i ← j * 16
        m ← j * 32
        IF k1[j] OR *no writemask*
            THEN DEST[i+15:i] ← SaturateUnsignedDoubleWordToWord (SRC[m+31:m])
            ELSE 
                IF *merging-masking*
                            ; merging-masking
                    THEN *DEST[i+15:i] remains unchanged*
                    ELSE *zeroing-masking*
                            ; zeroing-masking
                        DEST[i+15:i] ← 0
                FI
        FI;
    ENDFOR
    DEST[MAXVL-1:VL/2] ← 0;
```
#### VPMOVUSDW instruction (EVEX encoded versions) when dest is memory
```java
    (KL, VL) = (4, 128), (8, 256), (16, 512)
    FOR j ← 0 TO KL-1
        i ← j * 16
        m ← j * 32
        IF k1[j] OR *no writemask*
            THEN DEST[i+15:i] ← SaturateUnsignedDoubleWordToWord (SRC[m+31:m])
            ELSE 
                *DEST[i+15:i] remains unchanged*
                            ; merging-masking
        FI;
    ENDFOR
```
#### Intel C/C++ Compiler Intrinsic Equivalents
```java
VPMOVDW __m256i _mm512_cvtepi32_epi16( __m512i a);
VPMOVDW __m256i _mm512_mask_cvtepi32_epi16(__m256i s, __mmask16 k, __m512i a);
VPMOVDW __m256i _mm512_maskz_cvtepi32_epi16( __mmask16 k, __m512i a);
VPMOVDW void _mm512_mask_cvtepi32_storeu_epi16(void * d, __mmask16 k, __m512i a);
VPMOVSDW __m256i _mm512_cvtsepi32_epi16( __m512i a);
VPMOVSDW __m256i _mm512_mask_cvtsepi32_epi16(__m256i s, __mmask16 k, __m512i a);
VPMOVSDW __m256i _mm512_maskz_cvtsepi32_epi16( __mmask16 k, __m512i a);
VPMOVSDW void _mm512_mask_cvtsepi32_storeu_epi16(void * d, __mmask16 k, __m512i a);
VPMOVUSDW __m256i _mm512_cvtusepi32_epi16 __m512i a);
VPMOVUSDW __m256i _mm512_mask_cvtusepi32_epi16(__m256i s, __mmask16 k, __m512i a);
VPMOVUSDW __m256i _mm512_maskz_cvtusepi32_epi16( __mmask16 k, __m512i a);
VPMOVUSDW void _mm512_mask_cvtusepi32_storeu_epi16(void * d, __mmask16 k, __m512i a);
VPMOVUSDW __m128i _mm256_cvtusepi32_epi16(__m256i a);
VPMOVUSDW __m128i _mm256_mask_cvtusepi32_epi16(__m128i a, __mmask8 k, __m256i b);
VPMOVUSDW __m128i _mm256_maskz_cvtusepi32_epi16( __mmask8 k, __m256i b);
VPMOVUSDW void _mm256_mask_cvtusepi32_storeu_epi16(void * , __mmask8 k, __m256i b);
VPMOVUSDW __m128i _mm_cvtusepi32_epi16(__m128i a);
VPMOVUSDW __m128i _mm_mask_cvtusepi32_epi16(__m128i a, __mmask8 k, __m128i b);
VPMOVUSDW __m128i _mm_maskz_cvtusepi32_epi16( __mmask8 k, __m128i b);
VPMOVUSDW void _mm_mask_cvtusepi32_storeu_epi16(void * , __mmask8 k, __m128i b);
VPMOVSDW __m128i _mm256_cvtsepi32_epi16(__m256i a);
VPMOVSDW __m128i _mm256_mask_cvtsepi32_epi16(__m128i a, __mmask8 k, __m256i b);
VPMOVSDW __m128i _mm256_maskz_cvtsepi32_epi16( __mmask8 k, __m256i b);
VPMOVSDW void _mm256_mask_cvtsepi32_storeu_epi16(void * , __mmask8 k, __m256i b);
VPMOVSDW __m128i _mm_cvtsepi32_epi16(__m128i a);
VPMOVSDW __m128i _mm_mask_cvtsepi32_epi16(__m128i a, __mmask8 k, __m128i b);
VPMOVSDW __m128i _mm_maskz_cvtsepi32_epi16( __mmask8 k, __m128i b);
VPMOVSDW void _mm_mask_cvtsepi32_storeu_epi16(void * , __mmask8 k, __m128i b);
VPMOVDW __m128i _mm256_cvtepi32_epi16(__m256i a);
VPMOVDW __m128i _mm256_mask_cvtepi32_epi16(__m128i a, __mmask8 k, __m256i b);
VPMOVDW __m128i _mm256_maskz_cvtepi32_epi16( __mmask8 k, __m256i b);
VPMOVDW void _mm256_mask_cvtepi32_storeu_epi16(void * , __mmask8 k, __m256i b);
VPMOVDW __m128i _mm_cvtepi32_epi16(__m128i a);
VPMOVDW __m128i _mm_mask_cvtepi32_epi16(__m128i a, __mmask8 k, __m128i b);
VPMOVDW __m128i _mm_maskz_cvtepi32_epi16( __mmask8 k, __m128i b);
VPMOVDW void _mm_mask_cvtepi32_storeu_epi16(void * , __mmask8 k, __m128i b);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

EVEX-encoded instruction, see Exceptions Type E6.
<p>#UD
If EVEX.vvvv != 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
