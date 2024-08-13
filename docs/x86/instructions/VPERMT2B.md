<b>VPERMT2B</b> — Full Permute of Bytes from Two Tables Overwriting a Table
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.DDS.128.66.0F38.W0 7D /r VPERMT2B xmm1 {k1}{z}, xmm2, xmm3/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512_VBMI</td>
		<td>Permute bytes in xmm3/m128 and xmm1 using byte indexes in xmm2 and store the byte results in xmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F38.W0 7D /r VPERMT2B ymm1 {k1}{z}, ymm2, ymm3/m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512_VBMI</td>
		<td>Permute bytes in ymm3/m256 and ymm1 using byte indexes in ymm2 and store the byte results in ymm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F38.W0 7D /r VPERMT2B zmm1 {k1}{z}, zmm2, zmm3/m512</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_VBMI</td>
		<td>Permute bytes in zmm3/m512 and zmm1 using byte indexes in zmm2 and store the byte results in zmm1 using writemask k1.</td>
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
		<td>Full Mem</td>
		<td>ModRM:reg (r, w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
Permutes byte values from two tables, comprising of the first operand (also the destination operand) and the third
operand (the second source operand). The second operand (the first source operand) provides byte indices to
select byte results from the two tables. The selected byte elements are written to the destination at byte granu-
larity under the writemask k1.

The first and second operands are ZMM/YMM/XMM registers. The second operand contains input indices to select
elements from the two input tables in the 1st and 3rd operands. The first operand is also the destination of the
result. The second source operand can be a ZMM/YMM/XMM register, or a 512/256/128-bit memory location. In
each index byte, the id bit for table selection is bit 6/5/4, and bits [5:0]/[4:0]/[3:0] selects element within each
input table.

Note that these instructions permit a byte value in the source operands to be copied to more than one location in
the destination operand. Also, the second table and the indices can be reused in subsequent iterations, but the first
table is overwritten.

Bits (MAX_VL-1:256/128) of the destination are zeroed for VL=256,128.

### Operation


#### VPERMT2B (EVEX encoded versions)
```java
(KL, VL) = (16, 128), (32, 256), (64, 512)
IF VL = 128:
    id ← 3;
ELSE IF VL = 256:
    id ← 4;
ELSE IF VL = 512:
    id ← 5;
FI;
TMP_DEST[VL-1:0] ← DEST[VL-1:0];
FOR j ← 0 TO KL-1
    off ← 8*SRC1[j*8 + id: j*8] ;
    IF k1[j] OR *no writemask*:
        DEST[j*8 + 7: j*8] ← SRC1[j*8+id+1]? SRC2[off+7:off] : TMP_DEST[off+7:off];
    ELSE IF *zeroing-masking*
        DEST[j*8 + 7: j*8] ← 0;
    *ELSE 
        DEST[j*8 + 7: j*8] remains unchanged*
    FI;
ENDFOR
DEST[MAX_VL-1:VL] ← 0;
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPERMT2B __m512i _mm512_permutex2var_epi8(__m512i a, __m512i idx, __m512i b);
VPERMT2B __m512i _mm512_mask_permutex2var_epi8(__m512i a, __mmask64 k, __m512i idx, __m512i b);
VPERMT2B __m512i _mm512_maskz_permutex2var_epi8(__mmask64 k, __m512i a, __m512i idx, __m512i b);
VPERMT2B __m256i _mm256_permutex2var_epi8(__m256i a, __m256i idx, __m256i b);
VPERMT2B __m256i _mm256_mask_permutex2var_epi8(__m256i a, __mmask32 k, __m256i idx, __m256i b);
VPERMT2B __m256i _mm256_maskz_permutex2var_epi8(__mmask32 k, __m256i a, __m256i idx, __m256i b);
VPERMT2B __m128i _mm_permutex2var_epi8(__m128i a, __m128i idx, __m128i b);
VPERMT2B __m128i _mm_mask_permutex2var_epi8(__m128i a, __mmask16 k, __m128i idx, __m128i b);
VPERMT2B __m128i _mm_maskz_permutex2var_epi8(__mmask16 k, __m128i a, __m128i idx, __m128i b);
```
### SIMD Floating-Point Exceptions
None.

### Other Exceptions

See Exceptions Type E4NF.nb.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
