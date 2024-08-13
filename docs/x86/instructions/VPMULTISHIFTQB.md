<b>VPMULTISHIFTQB</b> — Select Packed Unaligned Bytes from Quadword Sources
<table>
	<tr>
		<td><b>Opcode / Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F38.W1 83 /r VPMULTISHIFTQB xmm1 {k1}{z}, xmm2,xmm3/m128/m64bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_VBMI AVX512VL</td>
		<td>Select unaligned bytes from qwords in xmm3/m128/m64bcst using control bytes in xmm2, write byte results to xmm1 under k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F38.W1 83 /r VPMULTISHIFTQB ymm1 {k1}{z}, ymm2,ymm3/m256/m64bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_VBMI AVX512VL</td>
		<td>Select unaligned bytes from qwords in ymm3/m256/m64bcst using control bytes in ymm2, write byte results to ymm1 under k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F38.W1 83 /r VPMULTISHIFTQB zmm1 {k1}{z}, zmm2,zmm3/m512/m64bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_VBMI</td>
		<td>Select unaligned bytes from qwords in zmm3/m512/m64bcst using control bytes in zmm2, write byte results to zmm1 under k1.</td>
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
		<td>Full</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
This instruction selects eight unaligned bytes from each input qword element of the second source operand (the
third operand) and writes eight assembled bytes for each qword element in the destination operand (the first
operand). Each byte result is selected using a byte-granular shift control within the corresponding qword element
of the first source operand (the second operand). Each byte result in the destination operand is updated under the
writemask k1.

Only the low 6 bits of each control byte are used to select an 8-bit slot to extract the output byte from the qword
data in the second source operand. The starting bit of the 8-bit slot can be unaligned relative to any byte boundary
and is extracted from the input qword source at the location specified in the low 6-bit of the control byte. If the 8-
bit slot would exceed the qword boundary, the out-of-bound portion of the 8-bit slot is wrapped back to start from
bit 0 of the input qword element.

The first source operand is a ZMM/YMM/XMM register. The second source operand can be a ZMM/YMM/XMM register, a 512/256/128-bit memory location or a 512/256/128-bit vector broadcasted from a 64-bit memory location. The destination operand is a ZMM/YMM/XMM register.

### Operation


#### VPMULTISHIFTQB DEST, SRC1, SRC2 (EVEX encoded version)
```java
(KL, VL) = (2, 128),(4, 256), (8, 512)
FOR i ← 0 TO KL-1
    IF EVEX.b=1 AND src2 is memory THEN
            tcur ← src2.qword[0]; //broadcasting
    ELSE
            tcur ← src2.qword[i];
    FI;
    FOR j ← 0 to 7 
        ctrl ← src1.qword[i].byte[j] & 63;
        FOR k ← 0 to 7 
            res.bit[k] ← tcur.bit[ (ctrl+k) mod 64 ];
        ENDFOR
        IF k1[i*8+j] or no writemask THEN
            DEST.qword[i].byte[j] ← res;
        ELSE IF zeroing-masking THEN
            DEST.qword[i].byte[j] ← 0;
    ENDFOR
ENDFOR
DEST.qword[MAX_VL-1:VL] ← 0;
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPMULTISHIFTQB __m512i _mm512_multishift_epi64_epi8( __m512i a, __m512i b);
VPMULTISHIFTQB __m512i _mm512_mask_multishift_epi64_epi8(__m512i s, __mmask64 k, __m512i a, __m512i b);
VPMULTISHIFTQB __m512i _mm512_maskz_multishift_epi64_epi8( __mmask64 k, __m512i a, __m512i b);
VPMULTISHIFTQB __m256i _mm256_multishift_epi64_epi8( __m256i a, __m256i b);
VPMULTISHIFTQB __m256i _mm256_mask_multishift_epi64_epi8(__m256i s, __mmask32 k, __m256i a, __m256i b);
VPMULTISHIFTQB __m256i _mm256_maskz_multishift_epi64_epi8( __mmask32 k, __m256i a, __m256i b);
VPMULTISHIFTQB __m128i _mm_multishift_epi64_epi8( __m128i a, __m128i b);
VPMULTISHIFTQB __m128i _mm_mask_multishift_epi64_epi8(__m128i s, __mmask8 k, __m128i a, __m128i b);
VPMULTISHIFTQB __m128i _mm_maskz_multishift_epi64_epi8( __mmask8 k, __m128i a, __m128i b);
```
### SIMD Floating-Point Exceptions
None.

### Other Exceptions

See Exceptions Type E4NF.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
