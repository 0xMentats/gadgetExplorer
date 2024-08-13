<b>VPSHRDW / VPSHRDD / VPSHRDQ</b> —  Concatenate and Shift Packed Data Right Logical
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F3A.W1 72 /r /ib VPSHRDW xmm1{k1}{z}, xmm2, xmm3/m128, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_VBMI2 AVX512VL</td>
		<td>Concatenate destination and source operands, extract result shifted to the right by constant value in imm8 into xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F3A.W1 72 /r /ib VPSHRDW ymm1{k1}{z}, ymm2, ymm3/m256, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_VBMI2 AVX512VL</td>
		<td>Concatenate destination and source operands, extract result shifted to the right by constant value in imm8 into ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F3A.W1 72 /r /ib VPSHRDW zmm1{k1}{z}, zmm2, zmm3/m512, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_VBMI2</td>
		<td>Concatenate destination and source operands, extract result shifted to the right by constant value in imm8 into zmm1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F3A.W0 73 /r /ib VPSHRDD xmm1{k1}{z}, xmm2, xmm3/m128/m32bcst, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VBMI2 AVX512VL</td>
		<td>Concatenate destination and source operands, extract result shifted to the right by constant value in imm8 into xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F3A.W0 73 /r /ib VPSHRDD ymm1{k1}{z}, ymm2, ymm3/m256/m32bcst, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VBMI2 AVX512VL</td>
		<td>Concatenate destination and source operands, extract result shifted to the right by constant value in imm8 into ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F3A.W0 73 /r /ib VPSHRDD zmm1{k1}{z}, zmm2, zmm3/m512/m32bcst, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VBMI2</td>
		<td>Concatenate destination and source operands, extract result shifted to the right by constant value in imm8 into zmm1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F3A.W1 73 /r /ib VPSHRDQ xmm1{k1}{z}, xmm2, xmm3/m128/m64bcst, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VBMI2 AVX512VL</td>
		<td>Concatenate destination and source operands, extract result shifted to the right by constant value in imm8 into xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F3A.W1 73 /r /ib VPSHRDQ ymm1{k1}{z}, ymm2, ymm3/m256/m64bcst, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VBMI2 AVX512VL</td>
		<td>Concatenate destination and source operands, extract result shifted to the right by constant value in imm8 into ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F3A.W1 73 /r /ib VPSHRDQ zmm1{k1}{z}, zmm2, zmm3/m512/m64bcst, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VBMI2</td>
		<td>Concatenate destination and source operands, extract result shifted to the right by constant value in imm8 into zmm1.</td>
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
		<td>EVEX.vvvv</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8 (r)</td>
	</tr>
	<tr>
		<td>B</td>
		<td>Full</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8 (r)</td>
	</tr>
</table>


### Description
Concatenate packed data, extract result shifted to the right by constant value.

This instruction supports memory fault suppression.


### Operation


#### VPSHRDW DEST, SRC2, SRC3, imm8
```java
(KL, VL) = (8, 128), (16, 256), (32, 512)
FOR j ← 0 TO KL-1:
    IF MaskBit(j) OR *no writemask*:
        DEST.word[j] ← concat(SRC3.word[j], SRC2.word[j]) >> (imm8 & 15)
    ELSE IF *zeroing*:
        DEST.word[j] ← 0
    *ELSE DEST.word[j] remains unchanged*
DEST[MAX_VL-1:VL] ← 0
```
#### VPSHRDD DEST, SRC2, SRC3, imm8
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
FOR j ← 0 TO KL-1:
    IF SRC3 is broadcast memop:
        tsrc3 ← SRC3.dword[0]
    ELSE:
        tsrc3 ← SRC3.dword[j]
    IF MaskBit(j) OR *no writemask*:
        DEST.dword[j] ← concat(tsrc3, SRC2.dword[j]) >> (imm8 & 31)
    ELSE IF *zeroing*:
        DEST.dword[j] ← 0
    *ELSE DEST.dword[j] remains unchanged*
DEST[MAX_VL-1:VL] ← 0
```
#### VPSHRDQ DEST, SRC2, SRC3, imm8
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1:
    IF SRC3 is broadcast memop:
        tsrc3 ← SRC3.qword[0]
    ELSE:
        tsrc3 ← SRC3.qword[j]
    IF MaskBit(j) OR *no writemask*:
        DEST.qword[j] ← concat(tsrc3, SRC2.qword[j]) >> (imm8 & 63)
    ELSE IF *zeroing*:
        DEST.qword[j] ← 0
    *ELSE DEST.qword[j] remains unchanged*
DEST[MAX_VL-1:VL] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPSHRDQ __m128i  _mm_shrdi_epi64(__m128i, __m128i, int);
VPSHRDQ __m128i  _mm_mask_shrdi_epi64(__m128i, __mmask8, __m128i, __m128i, int);
VPSHRDQ __m128i  _mm_maskz_shrdi_epi64(__mmask8, __m128i, __m128i, int);
VPSHRDQ __m256i  _mm256_shrdi_epi64(__m256i, __m256i, int);
VPSHRDQ __m256i  _mm256_mask_shrdi_epi64(__m256i, __mmask8, __m256i, __m256i, int);
VPSHRDQ __m256i  _mm256_maskz_shrdi_epi64(__mmask8, __m256i, __m256i, int);
VPSHRDQ __m512i  _mm512_shrdi_epi64(__m512i, __m512i, int);
VPSHRDQ __m512i  _mm512_mask_shrdi_epi64(__m512i, __mmask8, __m512i, __m512i, int);
VPSHRDQ __m512i  _mm512_maskz_shrdi_epi64(__mmask8, __m512i, __m512i, int);
VPSHRDD __m128i _mm_shrdi_epi32(__m128i, __m128i, int);
VPSHRDD __m128i _mm_mask_shrdi_epi32(__m128i, __mmask8, __m128i, __m128i, int);
VPSHRDD __m128i _mm_maskz_shrdi_epi32(__mmask8, __m128i, __m128i, int);
VPSHRDD __m256i _mm256_shrdi_epi32(__m256i, __m256i, int);
VPSHRDD __m256i _mm256_mask_shrdi_epi32(__m256i, __mmask8, __m256i, __m256i, int);
VPSHRDD __m256i _mm256_maskz_shrdi_epi32(__mmask8, __m256i, __m256i, int);
VPSHRDD __m512i _mm512_shrdi_epi32(__m512i, __m512i, int);
VPSHRDD __m512i _mm512_mask_shrdi_epi32(__m512i, __mmask16, __m512i, __m512i, int);
VPSHRDD __m512i _mm512_maskz_shrdi_epi32(__mmask16, __m512i, __m512i, int);
VPSHRDW __m128i _mm_shrdi_epi16(__m128i, __m128i, int);
VPSHRDW __m128i _mm_mask_shrdi_epi16(__m128i, __mmask8, __m128i, __m128i, int);
VPSHRDW __m128i _mm_maskz_shrdi_epi16(__mmask8, __m128i, __m128i, int);
VPSHRDW __m256i _mm256_shrdi_epi16(__m256i, __m256i, int);
VPSHRDW __m256i _mm256_mask_shrdi_epi16(__m256i, __mmask16, __m256i, __m256i, int);
VPSHRDW __m256i _mm256_maskz_shrdi_epi16(__mmask16, __m256i, __m256i, int);
VPSHRDW __m512i _mm512_shrdi_epi16(__m512i, __m512i, int);
VPSHRDW __m512i _mm512_mask_shrdi_epi16(__m512i, __mmask32, __m512i, __m512i, int);
VPSHRDW __m512i _mm512_maskz_shrdi_epi16(__mmask32, __m512i, __m512i, int);
```
### SIMD Floating-Point Exceptions
None.

### Other Exceptions

See Type E4.


 --- 
<p align="right"><i>Source: Intel® Architecture Instruction Set Extensions and Future Features Programming Reference (May 2019)<br>Generated: 28-5-2019</i></p>