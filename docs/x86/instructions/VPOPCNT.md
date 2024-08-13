<b>VPOPCNTB / VPOPCNTW / VPOPCNTD / VPOPCNTQ </b> —  Return the Count of Number of Bits Set to 1 in BYTE/WORD/DWORD/QWORD
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W0 54 /r VPOPCNTB xmm1{k1}{z}, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_BITALG AVX512VL</td>
		<td>Counts the number of bits set to one in xmm2/m128 and puts the result in xmm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W0 54 /r VPOPCNTB ymm1{k1}{z}, ymm2/m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_BITALG AVX512VL</td>
		<td>Counts the number of bits set to one in ymm2/m256 and puts the result in ymm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W0 54 /r VPOPCNTB zmm1{k1}{z}, zmm2/m512</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_BITALG</td>
		<td>Counts the number of bits set to one in zmm2/m512 and puts the result in zmm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W1 54 /r VPOPCNTW xmm1{k1}{z}, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_BITALG AVX512VL</td>
		<td>Counts the number of bits set to one in xmm2/m128 and puts the result in xmm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W1 54 /r VPOPCNTW ymm1{k1}{z}, ymm2/m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_BITALG AVX512VL</td>
		<td>Counts the number of bits set to one in ymm2/m256 and puts the result in ymm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W1 54 /r VPOPCNTW zmm1{k1}{z}, zmm2/m512</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_BITALG</td>
		<td>Counts the number of bits set to one in zmm2/m512 and puts the result in zmm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W0 55 /r VPOPCNTD xmm1{k1}{z}, xmm2/m128/m32bcst</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VPOPCNTDQ AVX512VL</td>
		<td>Counts the number of bits set to one in xmm2/m128/m32bcst and puts the result in xmm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W0 55 /r VPOPCNTD ymm1{k1}{z}, ymm2/m256/m32bcst</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VPOPCNTDQ AVX512VL</td>
		<td>Counts the number of bits set to one in ymm2/m256/m32bcst and puts the result in ymm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W0 55 /r VPOPCNTD zmm1{k1}{z}, zmm2/m512/m32bcst</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VPOPCNTDQ</td>
		<td>Counts the number of bits set to one in zmm2/m512/m32bcst and puts the result in zmm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W1 55 /r VPOPCNTQ xmm1{k1}{z}, xmm2/m128/m64bcst</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VPOPCNTDQ AVX512VL</td>
		<td>Counts the number of bits set to one in xmm2/m128/m32bcst and puts the result in xmm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W1 55 /r VPOPCNTQ ymm1{k1}{z}, ymm2/m256/m64bcst</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VPOPCNTDQ AVX512VL</td>
		<td>Counts the number of bits set to one in ymm2/m256/m32bcst and puts the result in ymm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W1 55 /r VPOPCNTQ zmm1{k1}{z}, zmm2/m512/m64bcst</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VPOPCNTDQ</td>
		<td>Counts the number of bits set to one in zmm2/m512/m64bcst and puts the result in zmm1 with writemask k1.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Tuple</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand 2</b></td>
		<td><b>Operand 3</b></td>
		<td><b>Operand 4</b></td>
	</tr>
	<tr>
		<td>A</td>
		<td>Full Mem</td>
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
This instruction counts the number of bits set to one in each byte, word, dword or qword element of its source (e.g.,
zmm2 or memory) and places the results in the destination register (zmm1). This instruction supports memory
fault suppression.


### Operation


#### VPOPCNTB
```java
(KL, VL) = (16, 128), (32, 256), (64, 512)
FOR j ← 0 TO KL-1:
    IF MaskBit(j) OR *no writemask*:
        DEST.byte[j] ← POPCNT(SRC.byte[j])
    ELSE IF *merging-masking*:
        *DEST.byte[j] remains unchanged*
    ELSE:
        DEST.byte[j] ← 0
DEST[MAX_VL-1:VL] ← 0
```
#### VPOPCNTW
```java
(KL, VL) = (8, 128), (16, 256), (32, 512)
FOR j ← 0 TO KL-1:
    IF MaskBit(j) OR *no writemask*:
        DEST.word[j] ← POPCNT(SRC.word[j])
    ELSE IF *merging-masking*:
        *DEST.word[j] remains unchanged*
    ELSE:
        DEST.word[j] ← 0
DEST[MAX_VL-1:VL] ← 0
```
#### VPOPCNTD
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
FOR j ← 0 TO KL-1:
    IF MaskBit(j) OR *no writemask*:
        IF SRC is broadcast memop:
            t ← SRC.dword[0]
        ELSE:
            t ← SRC.dword[j]
        DEST.dword[j] ← POPCNT(t)
    ELSE IF *merging-masking*:
        *DEST..dword[j] remains unchanged*
    ELSE:
        DEST..dword[j] ← 0
DEST[MAX_VL-1:VL] ← 0
```
#### VPOPCNTQ
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1:
    IF MaskBit(j) OR *no writemask*:
        IF SRC is broadcast memop:
            t ← SRC.qword[0]
        ELSE:
            t ← SRC.qword[j]
        DEST.qword[j] ← POPCNT(t)
    ELSE IF *merging-masking*:
        *DEST..qword[j] remains unchanged*
    ELSE:
        DEST..qword[j] ← 0
DEST[MAX_VL-1:VL] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPOPCNTW __m128i _mm_popcnt_epi16(__m128i);
VPOPCNTW __m128i _mm_mask_popcnt_epi16(__m128i, __mmask8, __m128i);
VPOPCNTW __m128i _mm_maskz_popcnt_epi16(__mmask8, __m128i);
VPOPCNTW __m256i _mm256_popcnt_epi16(__m256i);
VPOPCNTW __m256i _mm256_mask_popcnt_epi16(__m256i, __mmask16, __m256i);
VPOPCNTW __m256i _mm256_maskz_popcnt_epi16(__mmask16, __m256i);
VPOPCNTW __m512i _mm512_popcnt_epi16(__m512i);
VPOPCNTW __m512i _mm512_mask_popcnt_epi16(__m512i, __mmask32, __m512i);
VPOPCNTW __m512i  _mm512_maskz_popcnt_epi16(__mmask32, __m512i);
VPOPCNTQ __m128i  _mm_popcnt_epi64(__m128i);
VPOPCNTQ __m128i  _mm_mask_popcnt_epi64(__m128i, __mmask8, __m128i);
VPOPCNTQ __m128i  _mm_maskz_popcnt_epi64(__mmask8, __m128i);
VPOPCNTQ __m256i  _mm256_popcnt_epi64(__m256i);
VPOPCNTQ __m256i  _mm256_mask_popcnt_epi64(__m256i, __mmask8, __m256i);
VPOPCNTQ __m256i  _mm256_maskz_popcnt_epi64(__mmask8, __m256i);
VPOPCNTQ __m512i  _mm512_popcnt_epi64(__m512i);
VPOPCNTQ __m512i  _mm512_mask_popcnt_epi64(__m512i, __mmask8, __m512i);
VPOPCNTQ __m512i  _mm512_maskz_popcnt_epi64(__mmask8, __m512i);
VPOPCNTD __m128i  _mm_popcnt_epi32(__m128i);
VPOPCNTD __m128i  _mm_mask_popcnt_epi32(__m128i, __mmask8, __m128i);
VPOPCNTD __m128i  _mm_maskz_popcnt_epi32(__mmask8, __m128i);
VPOPCNTD __m256i  _mm256_popcnt_epi32(__m256i);
VPOPCNTD __m256i  _mm256_mask_popcnt_epi32(__m256i, __mmask8, __m256i);
VPOPCNTD __m256i  _mm256_maskz_popcnt_epi32(__mmask8, __m256i);
VPOPCNTD __m512i  _mm512_popcnt_epi32(__m512i);
VPOPCNTD __m512i  _mm512_mask_popcnt_epi32(__m512i, __mmask16, __m512i);
VPOPCNTD __m512i  _mm512_maskz_popcnt_epi32(__mmask16, __m512i);
VPOPCNTB __m128i  _mm_popcnt_epi8(__m128i);
VPOPCNTB __m128i  _mm_mask_popcnt_epi8(__m128i, __mmask16, __m128i);
VPOPCNTB __m128i  _mm_maskz_popcnt_epi8(__mmask16, __m128i);
VPOPCNTB __m256i  _mm256_popcnt_epi8(__m256i);
VPOPCNTB __m256i  _mm256_mask_popcnt_epi8(__m256i, __mmask32, __m256i);
VPOPCNTB __m256i  _mm256_maskz_popcnt_epi8(__mmask32, __m256i);
VPOPCNTB __m512i  _mm512_popcnt_epi8(__m512i);
VPOPCNTB __m512i  _mm512_mask_popcnt_epi8(__m512i, __mmask64, __m512i);
VPOPCNTB __m512i  _mm512_maskz_popcnt_epi8(__mmask64, __m512i);
```
### SIMD Floating-Point Exceptions
None.

### Other Exceptions

See Type E4.


 --- 
<p align="right"><i>Source: Intel® Architecture Instruction Set Extensions and Future Features Programming Reference (May 2019)<br>Generated: 28-5-2019</i></p>