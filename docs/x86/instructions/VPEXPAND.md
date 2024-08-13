<b>VPEXPAND</b> —  Expand Byte/Word Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W0 62 /r VPEXPANDB xmm1{k1}{z}, m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_VBMI2 AVX512VL</td>
		<td>Expands up to 128 bits of packed byte values from m128 to xmm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W0 62 /r VPEXPANDB xmm1{k1}{z}, xmm2</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VBMI2 AVX512VL</td>
		<td>Expands up to 128 bits of packed byte values from xmm2 to xmm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W0 62 /r VPEXPANDB ymm1{k1}{z}, m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_VBMI2 AVX512VL</td>
		<td>Expands up to 256 bits of packed byte values from m256 to ymm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W0 62 /r VPEXPANDB ymm1{k1}{z}, ymm2</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VBMI2 AVX512VL</td>
		<td>Expands up to 256 bits of packed byte values from ymm2 to ymm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W0 62 /r VPEXPANDB zmm1{k1}{z}, m512</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_VBMI2</td>
		<td>Expands up to 512 bits of packed byte values from m512 to zmm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W0 62 /r VPEXPANDB zmm1{k1}{z}, zmm2</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VBMI2</td>
		<td>Expands up to 512 bits of packed byte values from zmm2 to zmm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W1 62 /r VPEXPANDW xmm1{k1}{z}, m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_VBMI2 AVX512VL</td>
		<td>Expands up to 128 bits of packed word values from m128 to xmm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W1 62 /r VPEXPANDW xmm1{k1}{z}, xmm2</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VBMI2 AVX512VL</td>
		<td>Expands up to 128 bits of packed word values from xmm2 to xmm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W1 62 /r VPEXPANDW ymm1{k1}{z}, m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_VBMI2 AVX512VL</td>
		<td>Expands up to 256 bits of packed word values from m256 to ymm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W1 62 /r VPEXPANDW ymm1{k1}{z}, ymm2</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VBMI2 AVX512VL</td>
		<td>Expands up to 256 bits of packed word values from ymm2 to ymm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W1 62 /r VPEXPANDW zmm1{k1}{z}, m512</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_VBMI2</td>
		<td>Expands up to 512 bits of packed word values from m512 to zmm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W1 62 /r VPEXPANDW zmm1{k1}{z}, zmm2</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VBMI2</td>
		<td>Expands up to 512 bits of packed byte integer values from zmm2 to zmm1 with writemask k1.</td>
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
		<td>Tuple1 Scalar</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>B</td>
		<td>NA</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Expands (loads) up to 64 byte integer values or 32 word integer values from the source operand (memory
operand) to the destination operand (register operand), based on the active elements determined by the
writemask operand.

Note: EVEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.

Moves 128, 256 or 512 bits of packed byte integer values from the source operand (memory operand) to the destination
 operand (register operand). This instruction is used to load from an int8 vector register or memory location
while inserting the data into sparse elements of destination vector register using the active elements pointed out
by the operand writemask.

This instruction supports memory fault suppression.

Note that the compressed displacement assumes a pre-scaling (N) corresponding to the size of one single element
instead of the size of the full vector.

### Operation


#### VPEXPANDB
```java
(KL, VL) = (16, 128), (32, 256), (64, 512)
k ← 0
FOR j ← 0 TO KL-1:
    IF k1[j] OR *no writemask*:
        DEST.byte[j] ← SRC.byte[k];
        k ← k + 1
        ELSE:
            IF *merging-masking*:
                *DEST.byte[j] remains unchanged*
                ELSE: 
                            ; zeroing-masking
                    DEST.byte[j] ← 0
DEST[MAX_VL-1:VL] ← 0
```
#### VPEXPANDW
```java
(KL, VL) = (8,128), (16,256), (32, 512)
k ← 0
FOR j ← 0 TO KL-1:
    IF k1[j] OR *no writemask*:
        DEST.word[j] ← SRC.word[k];
        k ← k + 1
        ELSE:
            IF *merging-masking*:
                *DEST.word[j] remains unchanged*
                ELSE:
                             ; zeroing-masking
                    DEST.word[j] ← 0
DEST[MAX_VL-1:VL] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPEXPAND __m128i _mm_mask_expand_epi8(__m128i, __mmask16, __m128i);
VPEXPAND __m128i _mm_maskz_expand_epi8(__mmask16, __m128i);
VPEXPAND __m128i _mm_mask_expandloadu_epi8(__m128i, __mmask16, const void*);
VPEXPAND __m128i _mm_maskz_expandloadu_epi8(__mmask16, const void*);
VPEXPAND __m256i _mm256_mask_expand_epi8(__m256i, __mmask32, __m256i);
VPEXPAND __m256i _mm256_maskz_expand_epi8(__mmask32, __m256i);
VPEXPAND __m256i _mm256_mask_expandloadu_epi8(__m256i, __mmask32, const void*);
VPEXPAND __m256i _mm256_maskz_expandloadu_epi8(__mmask32, const void*);
VPEXPAND __m512i _mm512_mask_expand_epi8(__m512i, __mmask64, __m512i);
VPEXPAND __m512i _mm512_maskz_expand_epi8(__mmask64, __m512i);
VPEXPAND __m512i _mm512_mask_expandloadu_epi8(__m512i, __mmask64, const void*);
VPEXPAND __m512i _mm512_maskz_expandloadu_epi8(__mmask64, const void*);
VPEXPANDW __m128i _mm_mask_expand_epi16(__m128i, __mmask8, __m128i);
VPEXPANDW __m128i _mm_maskz_expand_epi16(__mmask8, __m128i);
VPEXPANDW __m128i _mm_mask_expandloadu_epi16(__m128i, __mmask8, const void*);
VPEXPANDW __m128i _mm_maskz_expandloadu_epi16(__mmask8, const void *);
VPEXPANDW __m256i _mm256_mask_expand_epi16(__m256i, __mmask16, __m256i);
VPEXPANDW __m256i _mm256_maskz_expand_epi16(__mmask16, __m256i);
VPEXPANDW __m256i _mm256_mask_expandloadu_epi16(__m256i, __mmask16, const void*);
VPEXPANDW __m256i _mm256_maskz_expandloadu_epi16(__mmask16, const void*);
VPEXPANDW __m512i _mm512_mask_expand_epi16(__m512i, __mmask32, __m512i);
VPEXPANDW __m512i _mm512_maskz_expand_epi16(__mmask32, __m512i);
VPEXPANDW __m512i _mm512_mask_expandloadu_epi16(__m512i, __mmask32, const void*);
VPEXPANDW __m512i _mm512_maskz_expandloadu_epi16(__mmask32, const void*);
```
### SIMD Floating-Point Exceptions
None.

### Other Exceptions

See Exceptions Type E4.


 --- 
<p align="right"><i>Source: Intel® Architecture Instruction Set Extensions and Future Features Programming Reference (May 2019)<br>Generated: 28-5-2019</i></p>