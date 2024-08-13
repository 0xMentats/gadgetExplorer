<b>VPCOMPRESSB / VPCOMPRESSW</b> —  Store Sparse Packed Byte/Word Integer Values into Dense Memory/Register
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W0 63 /r VPCOMPRESSB m128{k1}, xmm1</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_VBMI2 AVX512VL</td>
		<td>Compress up to 128 bits of packed byte values from xmm1 to m128 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W0 63 /r VPCOMPRESSB xmm1{k1}{z}, xmm2</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VBMI2 AVX512VL</td>
		<td>Compress up to 128 bits of packed byte values from xmm2 to xmm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W0 63 /r VPCOMPRESSB m256{k1}, ymm1</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_VBMI2 AVX512VL</td>
		<td>Compress up to 256 bits of packed byte values from ymm1 to m256 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W0 63 /r VPCOMPRESSB ymm1{k1}{z}, ymm2</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VBMI2 AVX512VL</td>
		<td>Compress up to 256 bits of packed byte values from ymm2 to ymm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W0 63 /r VPCOMPRESSB m512{k1}, zmm1</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_VBMI2</td>
		<td>Compress up to 512 bits of packed byte values from zmm1 to m512 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W0 63 /r VPCOMPRESSB zmm1{k1}{z}, zmm2</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VBMI2</td>
		<td>Compress up to 512 bits of packed byte values from zmm2 to zmm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W1 63 /r VPCOMPRESSW m128{k1}, xmm1</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_VBMI2 AVX512VL</td>
		<td>Compress up to 128 bits of packed word values from xmm1 to m128 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W1 63 /r VPCOMPRESSW xmm1{k1}{z}, xmm2</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VBMI2 AVX512VL</td>
		<td>Compress up to 128 bits of packed word values from xmm2 to xmm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W1 63 /r VPCOMPRESSW m256{k1}, ymm1</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_VBMI2 AVX512VL</td>
		<td>Compress up to 256 bits of packed word values from ymm1 to m256 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W1 63 /r VPCOMPRESSW ymm1{k1}{z}, ymm2</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VBMI2 AVX512VL</td>
		<td>Compress up to 256 bits of packed word values from ymm2 to ymm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W1 63 /r VPCOMPRESSW m512{k1}, zmm1</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_VBMI2</td>
		<td>Compress up to 512 bits of packed word values from zmm1 to m512 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W1 63 /r VPCOMPRESSW zmm1{k1}{z}, zmm2</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512_VBMI2</td>
		<td>Compress up to 512 bits of packed word values from zmm2 to zmm1 with writemask k1.</td>
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
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>B</td>
		<td>NA</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Compress (stores) up to 64 byte values or 32 word values from the source operand (second operand) to the destination
 operand (first operand), based on the active elements determined by the writemask operand. Note:
EVEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.

Moves up to 512 bits of packed byte values from the source operand (second operand) to the destination operand
(first operand). This instruction is used to store partial contents of a vector register into a byte vector or single
memory location using the active elements in operand writemask.

Memory destination version: Only the contiguous vector is written to the destination memory location. EVEX.z
must be zero.

Register destination version: If the vector length of the contiguous vector is less than that of the input vector in the
source operand, the upper bits of the destination register are unmodified if EVEX.z is not set, otherwise the upper
bits are zeroed.

This instruction supports memory fault suppression.

Note that the compressed displacement assumes a pre-scaling (N) corresponding to the size of one single element
instead of the size of the full vector.

### Operation


#### VPCOMPRESSB store form
```java
(KL, VL) = (16, 128), (32, 256), (64, 512)
k ← 0
FOR j ← 0 TO KL-1:
    IF k1[j] OR *no writemask*:
        DEST.byte[k] ← SRC.byte[j]
        k ← k +1
```
#### VPCOMPRESSB reg-reg form
```java
(KL, VL) = (16, 128), (32, 256), (64, 512)
k ← 0
FOR j ← 0 TO KL-1:
    IF k1[j] OR *no writemask*:
        DEST.byte[k] ← SRC.byte[j]
        k ← k + 1
IF *merging-masking*:
    *DEST[VL-1:k*8] remains unchanged*
    ELSE DEST[VL-1:k*8] ← 0
DEST[MAX_VL-1:VL] ← 0
```
#### VPCOMPRESSW store form
```java
(KL, VL) = (8, 128), (16, 256), (32, 512)
k ← 0
FOR j ← 0 TO KL-1:
    IF k1[j] OR *no writemask*:
        DEST.word[k] ← SRC.word[j]
        k ← k + 1
```
#### VPCOMPRESSW reg-reg form
```java
(KL, VL) = (8, 128), (16, 256), (32, 512)
k ← 0
FOR j ← 0 TO KL-1:
    IF k1[j] OR *no writemask*:
        DEST.word[k] ← SRC.word[j]
        k ← k + 1
IF *merging-masking*:
    *DEST[VL-1:k*16] remains unchanged*
    ELSE DEST[VL-1:k*16] ← 0
DEST[MAX_VL-1:VL] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPCOMPRESSB __m128i _mm_mask_compress_epi8(__m128i, __mmask16, __m128i);
VPCOMPRESSB __m128i _mm_maskz_compress_epi8(__mmask16, __m128i);
VPCOMPRESSB __m256i _mm256_mask_compress_epi8(__m256i, __mmask32, __m256i);
VPCOMPRESSB __m256i _mm256_maskz_compress_epi8(__mmask32, __m256i);
VPCOMPRESSB __m512i _mm512_mask_compress_epi8(__m512i, __mmask64, __m512i);
VPCOMPRESSB __m512i _mm512_maskz_compress_epi8(__mmask64, __m512i);
VPCOMPRESSB  void _mm_mask_compressstoreu_epi8(void*, __mmask16, __m128i);
VPCOMPRESSB  void _mm256_mask_compressstoreu_epi8(void*, __mmask32, __m256i);
VPCOMPRESSB  void _mm512_mask_compressstoreu_epi8(void*, __mmask64, __m512i);
VPCOMPRESSW  __m128i  _mm_mask_compress_epi16(__m128i, __mmask8, __m128i);
VPCOMPRESSW  __m128i  _mm_maskz_compress_epi16(__mmask8, __m128i); 
VPCOMPRESSW  __m256i  _mm256_mask_compress_epi16(__m256i, __mmask16, __m256i);
VPCOMPRESSW  __m256i  _mm256_maskz_compress_epi16(__mmask16, __m256i);
VPCOMPRESSW  __m512i  _mm512_mask_compress_epi16(__m512i, __mmask32, __m512i);
VPCOMPRESSW  __m512i  _mm512_maskz_compress_epi16(__mmask32, __m512i);
VPCOMPRESSW  void  _mm_mask_compressstoreu_epi16(void*, __mmask8, __m128i);
VPCOMPRESSW  void  _mm256_mask_compressstoreu_epi16(void*, __mmask16, __m256i);
VPCOMPRESSW  void  _mm512_mask_compressstoreu_epi16(void*, __mmask32, __m512i);
```
### SIMD Floating-Point Exceptions
None.

### Other Exceptions

See Exceptions Type E4.

 --- 
<p align="right"><i>Source: Intel® Architecture Instruction Set Extensions and Future Features Programming Reference (May 2019)<br>Generated: 28-5-2019</i></p>