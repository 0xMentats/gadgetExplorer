<b>VPMOVQW / VPMOVSQW / VPMOVUSQW</b> — Down Convert QWord to Word
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.F3.0F38.W0 34 /r VPMOVQW xmm1/m32 {k1}{z}, xmm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Converts 2 packed quad-word integers from xmm2 into 2 packed word integers in xmm1/m32 with truncation under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.F3.0F38.W0 24 /r VPMOVSQW xmm1/m32 {k1}{z}, xmm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Converts 8 packed signed quad-word integers from zmm2 into 8 packed signed word integers in xmm1/m32 using signed saturation under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.F3.0F38.W0 14 /r VPMOVUSQW xmm1/m32 {k1}{z}, xmm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Converts 2 packed unsigned quad-word integers from xmm2 into 2 packed unsigned word integers in xmm1/m32 using unsigned saturation under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.F3.0F38.W0 34 /r VPMOVQW xmm1/m64 {k1}{z}, ymm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Converts 4 packed quad-word integers from ymm2 into 4 packed word integers in xmm1/m64 with truncation under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.F3.0F38.W0 24 /r VPMOVSQW xmm1/m64 {k1}{z}, ymm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Converts 4 packed signed quad-word integers from ymm2 into 4 packed signed word integers in xmm1/m64 using signed saturation under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.F3.0F38.W0 14 /r VPMOVUSQW xmm1/m64 {k1}{z}, ymm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Converts 4 packed unsigned quad-word integers from ymm2 into 4 packed unsigned word integers in xmm1/m64 using unsigned saturation under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.F3.0F38.W0 34 /r VPMOVQW xmm1/m128 {k1}{z}, zmm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Converts 8 packed quad-word integers from zmm2 into 8 packed word integers in xmm1/m128 with truncation under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.F3.0F38.W0 24 /r VPMOVSQW xmm1/m128 {k1}{z}, zmm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Converts 8 packed signed quad-word integers from zmm2 into 8 packed signed word integers in xmm1/m128 using signed saturation under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.F3.0F38.W0 14 /r VPMOVUSQW xmm1/m128 {k1}{z}, zmm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Converts 8 packed unsigned quad-word integers from zmm2 into 8 packed unsigned word integers in xmm1/m128 using unsigned saturation under writemask k1.</td>
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
		<td>Quarter Mem</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
VPMOVQW down converts 64-bit integer elements in the source operand (the second operand) into packed words
using truncation. VPMOVSQW converts signed 64-bit integers into packed signed words using signed saturation.
VPMOVUSQW convert unsigned quad-word values into unsigned word values using unsigned saturation.

The source operand is a ZMM/YMM/XMM register. The destination operand is a XMM register or a 128/64/32-bit
memory location.

Down-converted word elements are written to the destination operand (the first operand) from the least-significant
word. Word elements of the destination operand are updated according to the writemask. Bits (MAXVL-
1:128/64/32) of the register destination are zeroed.

EVEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.

### Operation


#### VPMOVQW instruction (EVEX encoded versions) when dest is a register
```java
    (KL, VL) = (2, 128), (4, 256), (8, 512)
    FOR j ← 0 TO KL-1
        i ← j * 16
        m ← j * 64
        IF k1[j] OR *no writemask*
            THEN DEST[i+15:i] ← TruncateQuadWordToWord (SRC[m+63:m])
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
    DEST[MAXVL-1:VL/4] ← 0;
```
#### VPMOVQW instruction (EVEX encoded versions) when dest is memory
```java
    (KL, VL) = (2, 128), (4, 256), (8, 512)
    FOR j ← 0 TO KL-1
        i ← j * 16
        m ← j * 64
        IF k1[j] OR *no writemask*
            THEN DEST[i+15:i] ← TruncateQuadWordToWord (SRC[m+63:m])
            ELSE 
                *DEST[i+15:i] remains unchanged*
                            ; merging-masking
        FI;
    ENDFOR
```
#### VPMOVSQW instruction (EVEX encoded versions) when dest is a register
```java
    (KL, VL) = (2, 128), (4, 256), (8, 512)
    FOR j ← 0 TO KL-1
        i ← j * 16
        m ← j * 64
        IF k1[j] OR *no writemask*
            THEN DEST[i+15:i] ← SaturateSignedQuadWordToWord (SRC[m+63:m])
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
    DEST[MAXVL-1:VL/4] ← 0;
```
#### VPMOVSQW instruction (EVEX encoded versions) when dest is memory
```java
    (KL, VL) = (2, 128), (4, 256), (8, 512)
    FOR j ← 0 TO KL-1
        i ← j * 16
        m ← j * 64
        IF k1[j] OR *no writemask*
            THEN DEST[i+15:i] ← SaturateSignedQuadWordToWord (SRC[m+63:m])
            ELSE 
                *DEST[i+15:i] remains unchanged*
                            ; merging-masking
        FI;
    ENDFOR
```
#### VPMOVUSQW instruction (EVEX encoded versions) when dest is a register
```java
    (KL, VL) = (2, 128), (4, 256), (8, 512)
    FOR j ← 0 TO KL-1
        i ← j * 16
        m ← j * 64
        IF k1[j] OR *no writemask*
            THEN DEST[i+15:i] ← SaturateUnsignedQuadWordToWord (SRC[m+63:m])
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
    DEST[MAXVL-1:VL/4] ← 0;
```
#### VPMOVUSQW instruction (EVEX encoded versions) when dest is memory
```java
    (KL, VL) = (2, 128), (4, 256), (8, 512)
    FOR j ← 0 TO KL-1
        i ← j * 16
        m ← j * 64
        IF k1[j] OR *no writemask*
            THEN DEST[i+15:i] ← SaturateUnsignedQuadWordToWord (SRC[m+63:m])
            ELSE 
                *DEST[i+15:i] remains unchanged*
                            ; merging-masking
        FI;
    ENDFOR
```
#### Intel C/C++ Compiler Intrinsic Equivalents
```java
VPMOVQW __m128i _mm512_cvtepi64_epi16( __m512i a);
VPMOVQW __m128i _mm512_mask_cvtepi64_epi16(__m128i s, __mmask8 k, __m512i a);
VPMOVQW __m128i _mm512_maskz_cvtepi64_epi16( __mmask8 k, __m512i a);
VPMOVQW void _mm512_mask_cvtepi64_storeu_epi16(void * d, __mmask8 k, __m512i a);
VPMOVSQW __m128i _mm512_cvtsepi64_epi16( __m512i a);
VPMOVSQW __m128i _mm512_mask_cvtsepi64_epi16(__m128i s, __mmask8 k, __m512i a);
VPMOVSQW __m128i _mm512_maskz_cvtsepi64_epi16( __mmask8 k, __m512i a);
VPMOVSQW void _mm512_mask_cvtsepi64_storeu_epi16(void * d, __mmask8 k, __m512i a);
VPMOVUSQW __m128i _mm512_cvtusepi64_epi16( __m512i a);
VPMOVUSQW __m128i _mm512_mask_cvtusepi64_epi16(__m128i s, __mmask8 k, __m512i a);
VPMOVUSQW __m128i _mm512_maskz_cvtusepi64_epi16( __mmask8 k, __m512i a);
VPMOVUSQW void _mm512_mask_cvtusepi64_storeu_epi16(void * d, __mmask8 k, __m512i a);
VPMOVUSQD __m128i _mm256_cvtusepi64_epi32(__m256i a);
VPMOVUSQD __m128i _mm256_mask_cvtusepi64_epi32(__m128i a, __mmask8 k, __m256i b);
VPMOVUSQD __m128i _mm256_maskz_cvtusepi64_epi32( __mmask8 k, __m256i b);
VPMOVUSQD void _mm256_mask_cvtusepi64_storeu_epi32(void * , __mmask8 k, __m256i b);
VPMOVUSQD __m128i _mm_cvtusepi64_epi32(__m128i a);
VPMOVUSQD __m128i _mm_mask_cvtusepi64_epi32(__m128i a, __mmask8 k, __m128i b);
VPMOVUSQD __m128i _mm_maskz_cvtusepi64_epi32( __mmask8 k, __m128i b);
VPMOVUSQD void _mm_mask_cvtusepi64_storeu_epi32(void * , __mmask8 k, __m128i b);
VPMOVSQD __m128i _mm256_cvtsepi64_epi32(__m256i a);
VPMOVSQD __m128i _mm256_mask_cvtsepi64_epi32(__m128i a, __mmask8 k, __m256i b);
VPMOVSQD __m128i _mm256_maskz_cvtsepi64_epi32( __mmask8 k, __m256i b);
VPMOVSQD void _mm256_mask_cvtsepi64_storeu_epi32(void * , __mmask8 k, __m256i b);
VPMOVSQD __m128i _mm_cvtsepi64_epi32(__m128i a);
VPMOVSQD __m128i _mm_mask_cvtsepi64_epi32(__m128i a, __mmask8 k, __m128i b);
VPMOVSQD __m128i _mm_maskz_cvtsepi64_epi32( __mmask8 k, __m128i b);
VPMOVSQD void _mm_mask_cvtsepi64_storeu_epi32(void * , __mmask8 k, __m128i b);
VPMOVQD __m128i _mm256_cvtepi64_epi32(__m256i a);
VPMOVQD __m128i _mm256_mask_cvtepi64_epi32(__m128i a, __mmask8 k, __m256i b);
VPMOVQD __m128i _mm256_maskz_cvtepi64_epi32( __mmask8 k, __m256i b);
VPMOVQD void _mm256_mask_cvtepi64_storeu_epi32(void * , __mmask8 k, __m256i b);
VPMOVQD __m128i _mm_cvtepi64_epi32(__m128i a);
VPMOVQD __m128i _mm_mask_cvtepi64_epi32(__m128i a, __mmask8 k, __m128i b);
VPMOVQD __m128i _mm_maskz_cvtepi64_epi32( __mmask8 k, __m128i b);
VPMOVQD void _mm_mask_cvtepi64_storeu_epi32(void * , __mmask8 k, __m128i b);
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