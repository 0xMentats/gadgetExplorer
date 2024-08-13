<b>VPLZCNTD / VPLZCNTQ</b> — Count the Number of Leading Zero Bits for Packed Dword, Packed Qword Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W0 44 /r VPLZCNTD xmm1 {k1}{z}, xmm2/m128/m32bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512CD</td>
		<td>Count the number of leading zero bits in each dword element of xmm2/m128/m32bcst using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W0 44 /r VPLZCNTD ymm1 {k1}{z}, ymm2/m256/m32bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512CD</td>
		<td>Count the number of leading zero bits in each dword element of ymm2/m256/m32bcst using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W0 44 /r VPLZCNTD zmm1 {k1}{z}, zmm2/m512/m32bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512CD</td>
		<td>Count the number of leading zero bits in each dword element of zmm2/m512/m32bcst using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W1 44 /r VPLZCNTQ xmm1 {k1}{z}, xmm2/m128/m64bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512CD</td>
		<td>Count the number of leading zero bits in each qword element of xmm2/m128/m64bcst using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W1 44 /r VPLZCNTQ ymm1 {k1}{z}, ymm2/m256/m64bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512CD</td>
		<td>Count the number of leading zero bits in each qword element of ymm2/m256/m64bcst using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W1 44 /r VPLZCNTQ zmm1 {k1}{z}, zmm2/m512/m64bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512CD</td>
		<td>Count the number of leading zero bits in each qword element of zmm2/m512/m64bcst using writemask k1.</td>
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
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Counts the number of leading most significant zero bits in each dword or qword element of the source operand (the
second operand) and stores the results in the destination register (the first operand) according to the writemask.
If an element is zero, the result for that element is the operand size of the element.

EVEX.512 encoded version: The source operand is a ZMM register, a 512-bit memory location, or a 512-bit vector
broadcasted from a 32/64-bit memory location. The destination operand is a ZMM register, conditionally updated
using writemask k1.

EVEX.256 encoded version: The source operand is a YMM register, a 256-bit memory location, or a 256-bit vector
broadcasted from a 32/64-bit memory location. The destination operand is a YMM register, conditionally updated
using writemask k1.

EVEX.128 encoded version: The source operand is a XMM register, a 128-bit memory location, or a 128-bit vector
broadcasted from a 32/64-bit memory location. The destination operand is a XMM register, conditionally updated
using writemask k1.

EVEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.

### Operation


#### VPLZCNTD
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
FOR j ← 0 TO KL-1
    i ← j*32
    IF MaskBit(j) OR *no writemask*
        THEN 
   
            temp ← 32
   
            DEST[i+31:i] ← 0
   
            WHILE (temp > 0) AND (SRC[i+temp-1] = 0)
           
            DO
                temp ← temp – 1
                DEST[i+31:i] ← DEST[i+31:i] + 1
            OD
        ELSE
           IF *merging-masking* 
            THEN *DEST[i+31:i] remains unchanged*
            ELSE DEST[i+31:i] ← 0
           FI
    FI
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
#### VPLZCNTQ
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j*64
    IF MaskBit(j) OR *no writemask*
        THEN
   
            temp ← 64
   
            DEST[i+63:i] ← 0
   
            WHILE (temp > 0) AND (SRC[i+temp-1] = 0)
          
            DO
                temp ← temp – 1
                DEST[i+63:i] ← DEST[i+63:i] + 1
            OD
        ELSE
           IF *merging-masking* 
            THEN *DEST[i+63:i] remains unchanged*
            ELSE DEST[i+63:i] ← 0
           FI
    FI
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPLZCNTD __m512i _mm512_lzcnt_epi32(__m512i a);
VPLZCNTD __m512i _mm512_mask_lzcnt_epi32(__m512i s, __mmask16 m, __m512i a);
VPLZCNTD __m512i _mm512_maskz_lzcnt_epi32( __mmask16 m, __m512i a);
VPLZCNTQ __m512i _mm512_lzcnt_epi64(__m512i a);
VPLZCNTQ __m512i _mm512_mask_lzcnt_epi64(__m512i s, __mmask8 m, __m512i a);
VPLZCNTQ __m512i _mm512_maskz_lzcnt_epi64(__mmask8 m, __m512i a);
VPLZCNTD __m256i _mm256_lzcnt_epi32(__m256i a);
VPLZCNTD __m256i _mm256_mask_lzcnt_epi32(__m256i s, __mmask8 m, __m256i a);
VPLZCNTD __m256i _mm256_maskz_lzcnt_epi32( __mmask8 m, __m256i a);
VPLZCNTQ __m256i _mm256_lzcnt_epi64(__m256i a);
VPLZCNTQ __m256i _mm256_mask_lzcnt_epi64(__m256i s, __mmask8 m, __m256i a);
VPLZCNTQ __m256i _mm256_maskz_lzcnt_epi64(__mmask8 m, __m256i a);
VPLZCNTD __m128i _mm_lzcnt_epi32(__m128i a);
VPLZCNTD __m128i _mm_mask_lzcnt_epi32(__m128i s, __mmask8 m, __m128i a);
VPLZCNTD __m128i _mm_maskz_lzcnt_epi32( __mmask8 m, __m128i a);
VPLZCNTQ __m128i _mm_lzcnt_epi64(__m128i a);
VPLZCNTQ __m128i _mm_mask_lzcnt_epi64(__m128i s, __mmask8 m, __m128i a);
VPLZCNTQ __m128i _mm_maskz_lzcnt_epi64(__mmask8 m, __m128i a);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

EVEX-encoded instruction, see Exceptions Type E4.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
