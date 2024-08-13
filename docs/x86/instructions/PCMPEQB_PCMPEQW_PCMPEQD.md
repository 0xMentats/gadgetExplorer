<b>PCMPEQB / PCMPEQW / PCMPEQD</b> —  Compare Packed Data for Equal
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En 64/32 bit</b></td>
		<td><b>Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 74 /r1 PCMPEQB mm, mm/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>MMX</td>
		<td>Compare packed bytes in mm/m64 and mm for equality.</td>
	</tr>
	<tr>
		<td>66 0F 74 /r PCMPEQB xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Compare packed bytes in xmm2/m128 and xmm1 for equality.</td>
	</tr>
	<tr>
		<td>NP 0F 75 /r1 PCMPEQW mm, mm/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>MMX</td>
		<td>Compare packed words in mm/m64 and mm for equality.</td>
	</tr>
	<tr>
		<td>66 0F 75 /r PCMPEQW xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Compare packed words in xmm2/m128 and xmm1 for equality.</td>
	</tr>
	<tr>
		<td>NP 0F 76 /r1 PCMPEQD mm, mm/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>MMX</td>
		<td>Compare packed doublewords in mm/m64 and mm for equality.</td>
	</tr>
	<tr>
		<td>66 0F 76 /r PCMPEQD xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Compare packed doublewords in xmm2/m128 and xmm1 for equality.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.WIG 74 /r VPCMPEQB xmm1, xmm2, xmm3/m128</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Compare packed bytes in xmm3/m128 and xmm2 for equality.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.WIG 75 /r VPCMPEQW xmm1, xmm2, xmm3/m128</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Compare packed words in xmm3/m128 and xmm2 for equality.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.WIG 76 /r VPCMPEQD xmm1, xmm2, xmm3/m128</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Compare packed doublewords in xmm3/m128 and xmm2 for equality.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F.WIG 74 /r VPCMPEQB ymm1, ymm2, ymm3 /m256</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Compare packed bytes in ymm3/m256 and ymm2 for equality.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F.WIG 75 /r VPCMPEQW ymm1, ymm2, ymm3 /m256</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Compare packed words in ymm3/m256 and ymm2 for equality.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F.WIG 76 /r VPCMPEQD ymm1, ymm2, ymm3 /m256</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Compare packed doublewords in ymm3/m256 and ymm2 for equality.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F.W0 76 /r VPCMPEQD k1 {k2}, xmm2, xmm3/m128/m32bcst</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Compare Equal between int32 vector xmm2 and int32 vector xmm3/m128/m32bcst, and set vector mask k1 to reflect the zero/nonzero status of each element of the result, under writemask.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F.W0 76 /r VPCMPEQD k1 {k2}, ymm2, ymm3/m256/m32bcst</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Compare Equal between int32 vector ymm2 and int32 vector ymm3/m256/m32bcst, and set vector mask k1 to reflect the zero/nonzero status of each element of the result, under writemask.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F.W0 76 /r VPCMPEQD k1 {k2}, zmm2, zmm3/m512/m32bcst</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Compare Equal between int32 vectors in zmm2 and zmm3/m512/m32bcst, and set destination k1 according to the comparison results under writemask k2.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F.WIG 74 /r VPCMPEQB k1 {k2}, xmm2, xmm3 /m128</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Compare packed bytes in xmm3/m128 and xmm2 for equality and set vector mask k1 to reflect the zero/nonzero status of each element of the result, under writemask.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F.WIG 74 /r VPCMPEQB k1 {k2}, ymm2, ymm3 /m256</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Compare packed bytes in ymm3/m256 and ymm2 for equality and set vector mask k1 to reflect the zero/nonzero status of each element of the result, under writemask.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F.WIG 74 /r VPCMPEQB k1 {k2}, zmm2, zmm3 /m512</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Compare packed bytes in zmm3/m512 and zmm2 for equality and set vector mask k1 to reflect the zero/nonzero status of each element of the result, under writemask.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F.WIG 75 /r VPCMPEQW k1 {k2}, xmm2, xmm3 /m128</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Compare packed words in xmm3/m128 and xmm2 for equality and set vector mask k1 to reflect the zero/nonzero status of each element of the result, under writemask.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F.WIG 75 /r VPCMPEQW k1 {k2}, ymm2, ymm3 /m256</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Compare packed words in ymm3/m256 and ymm2 for equality and set vector mask k1 to reflect the zero/nonzero status of each element of the result, under writemask.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F.WIG 75 /r VPCMPEQW k1 {k2}, zmm2, zmm3 /m512</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Compare packed words in zmm3/m512 and zmm2 for equality and set vector mask k1 to reflect the zero/nonzero status of each element of the result, under writemask.</td>
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
		<td>ModRM:reg (r, w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>B</td>
		<td>NA</td>
		<td>ModRM:reg (w)</td>
		<td>VEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>C</td>
		<td>Full</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>D</td>
		<td>Full Mem</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
Performs a SIMD compare for equality of the packed bytes, words, or doublewords in the destination operand (first
operand) and the source operand (second operand). If a pair of data elements is equal, the corresponding data
element in the destination operand is set to all 1s; otherwise, it is set to all 0s.

The (V)PCMPEQB instruction compares the corresponding bytes in the destination and source operands; the
(V)PCMPEQW instruction compares the corresponding words in the destination and source operands; and the
(V)PCMPEQD instruction compares the corresponding doublewords in the destination and source operands.

In 64-bit mode and not encoded with VEX/EVEX, using a REX prefix in the form of REX.R permits this instruction to
access additional registers (XMM8-XMM15).

Legacy SSE instructions: The source operand can be an MMX technology register or a 64-bit memory location. The
destination operand can be an MMX technology register.

128-bit Legacy SSE version: The second source operand can be an XMM register or a 128-bit memory location. The
first source and destination operands are XMM registers. Bits (MAXVL-1:128) of the corresponding YMM destination
register remain unchanged.

VEX.128 encoded version: The second source operand can be an XMM register or a 128-bit memory location. The
first source and destination operands are XMM registers. Bits (MAXVL-1:128) of the corresponding YMM register
are zeroed.
VEX.256 encoded version: The first source operand is a YMM register. The second source operand is a YMM register
or a 256-bit memory location. The destination operand is a YMM register.

EVEX encoded VPCMPEQD: The first source operand (second operand) is a ZMM/YMM/XMM register. The second
source operand can be a ZMM/YMM/XMM register, a 512/256/128-bit memory location or a 512/256/128-bit vector
broadcasted from a 32-bit memory location. The destination operand (first operand) is a mask register updated
according to the writemask k2.

EVEX encoded VPCMPEQB/W: The first source operand (second operand) is a ZMM/YMM/XMM register. The second
source operand can be a ZMM/YMM/XMM register, a 512/256/128-bit memory location. The destination operand
(first operand) is a mask register updated according to the writemask k2.

### Operation


#### PCMPEQB (with 64-bit operands)
```java
    IF DEST[7:0] = SRC[7:0]
        THEN DEST[7:0) ← FFH; 
        ELSE DEST[7:0] ← 0; FI;
    (* Continue comparison of 2nd through 7th bytes in DEST and SRC *)
    IF DEST[63:56] = SRC[63:56]
        THEN DEST[63:56] ← FFH;
        ELSE DEST[63:56] ← 0; FI;
```
#### COMPARE_BYTES_EQUAL (SRC1, SRC2)
```java
    IF SRC1[7:0] = SRC2[7:0]
    THEN DEST[7:0] ←FFH;
    ELSE DEST[7:0] ←0; FI;
(* Continue comparison of 2nd through 15th bytes in SRC1 and SRC2 *)
    IF SRC1[127:120] = SRC2[127:120]
    THEN DEST[127:120] ←FFH;
    ELSE DEST[127:120] ←0; FI;
```
#### COMPARE_WORDS_EQUAL (SRC1, SRC2)
```java
    IF SRC1[15:0] = SRC2[15:0]
    THEN DEST[15:0] ←FFFFH;
    ELSE DEST[15:0] ←0; FI;
(* Continue comparison of 2nd through 7th 16-bit words in SRC1 and SRC2 *)
    IF SRC1[127:112] = SRC2[127:112]
    THEN DEST[127:112] ←FFFFH;
    ELSE DEST[127:112] ←0; FI;
```
#### COMPARE_DWORDS_EQUAL (SRC1, SRC2)
```java
    IF SRC1[31:0] = SRC2[31:0]
    THEN DEST[31:0] ←FFFFFFFFH;
    ELSE DEST[31:0] ←0; FI;
(* Continue comparison of 2nd through 3rd 32-bit dwords in SRC1 and SRC2 *)
    IF SRC1[127:96] = SRC2[127:96]
    THEN DEST[127:96] ←FFFFFFFFH;
    ELSE DEST[127:96] ←0; FI;
```
#### PCMPEQB (with 128-bit operands)
```java
DEST[127:0] ←COMPARE_BYTES_EQUAL(DEST[127:0],SRC[127:0])
DEST[MAXVL-1:128] (Unmodified)
```
#### VPCMPEQB (VEX.128 encoded version)
```java
DEST[127:0] ←COMPARE_BYTES_EQUAL(SRC1[127:0],SRC2[127:0])
DEST[MAXVL-1:128] ← 0
```
#### VPCMPEQB (VEX.256 encoded version)
```java
DEST[127:0] ←COMPARE_BYTES_EQUAL(SRC1[127:0],SRC2[127:0])
DEST[255:128] ←COMPARE_BYTES_EQUAL(SRC1[255:128],SRC2[255:128])
DEST[MAXVL-1:256] ← 0
```
#### VPCMPEQB (EVEX encoded versions)
```java
(KL, VL) = (16, 128), (32, 256), (64, 512)
FOR j ← 0 TO KL-1
    i ← j * 8
    IF k2[j] OR *no writemask*
        THEN 
            /* signed comparison */
            CMP ← SRC1[i+7:i] == SRC2[i+7:i];
            IF CMP = TRUE
                THEN DEST[j] ← 1;
                ELSE DEST[j] ← 0; FI;
        ELSE 
                DEST[j] ← 0
                            ; zeroing-masking onlyFI;
    FI;
ENDFOR
DEST[MAX_KL-1:KL] ← 0
```
#### PCMPEQW (with 64-bit operands)
```java
    IF DEST[15:0] = SRC[15:0] 
        THEN DEST[15:0] ← FFFFH;
        ELSE DEST[15:0] ← 0; FI;
    (* Continue comparison of 2nd and 3rd words in DEST and SRC *)
    IF DEST[63:48] = SRC[63:48]
        THEN DEST[63:48] ← FFFFH;
        ELSE DEST[63:48] ← 0; FI;
```
#### PCMPEQW (with 128-bit operands)
```java
DEST[127:0] ←COMPARE_WORDS_EQUAL(DEST[127:0],SRC[127:0])
DEST[MAXVL-1:128] (Unmodified)
```
#### VPCMPEQW (VEX.128 encoded version)
```java
DEST[127:0] ←COMPARE_WORDS_EQUAL(SRC1[127:0],SRC2[127:0])
DEST[MAXVL-1:128] ← 0
```
#### VPCMPEQW (VEX.256 encoded version)
```java
DEST[127:0] ←COMPARE_WORDS_EQUAL(SRC1[127:0],SRC2[127:0])
DEST[255:128] ←COMPARE_WORDS_EQUAL(SRC1[255:128],SRC2[255:128])
DEST[MAXVL-1:256] ← 0
```
#### VPCMPEQW (EVEX encoded versions)
```java
(KL, VL) = (8, 128), (16, 256), (32, 512)
FOR j ← 0 TO KL-1
    i ← j * 16
    IF k2[j] OR *no writemask*
        THEN 
            /* signed comparison */
            CMP ← SRC1[i+15:i] == SRC2[i+15:i];
            IF CMP = TRUE
                THEN DEST[j] ← 1;
                ELSE DEST[j] ← 0; FI;
        ELSE 
                DEST[j] ← 0
                            ; zeroing-masking onlyFI;
    FI;
ENDFOR
DEST[MAX_KL-1:KL] ← 0
```
#### PCMPEQD (with 64-bit operands)
```java
    IF DEST[31:0] = SRC[31:0]
        THEN DEST[31:0] ← FFFFFFFFH; 
        ELSE DEST[31:0] ← 0; FI;
    IF DEST[63:32] = SRC[63:32]
        THEN DEST[63:32] ← FFFFFFFFH;
        ELSE DEST[63:32] ← 0; FI;
```
#### PCMPEQD (with 128-bit operands)
```java
DEST[127:0] ←COMPARE_DWORDS_EQUAL(DEST[127:0],SRC[127:0])
DEST[MAXVL-1:128] (Unmodified)
```
#### VPCMPEQD (VEX.128 encoded version)
```java
DEST[127:0] ←COMPARE_DWORDS_EQUAL(SRC1[127:0],SRC2[127:0])
DEST[MAXVL-1:128] ← 0
```
#### VPCMPEQD (VEX.256 encoded version)
```java
DEST[127:0] ←COMPARE_DWORDS_EQUAL(SRC1[127:0],SRC2[127:0])
DEST[255:128] ←COMPARE_DWORDS_EQUAL(SRC1[255:128],SRC2[255:128])
DEST[MAXVL-1:256] ← 0
```
#### VPCMPEQD (EVEX encoded versions)
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
FOR j ← 0 TO KL-1
    i ← j * 32
    IF k2[j] OR *no writemask*
        THEN 
            /* signed comparison */
            IF (EVEX.b = 1) AND (SRC2 *is memory*)
                THEN CMP ← SRC1[i+31:i] = SRC2[31:0];
                ELSE CMP ← SRC1[i+31:i] = SRC2[i+31:i];
            FI;
            IF CMP = TRUE
                THEN DEST[j] ← 1;
                ELSE DEST[j] ← 0; FI;
        ELSE 
                DEST[j] ← 0
                            ; zeroing-masking only
    FI;
ENDFOR
DEST[MAX_KL-1:KL] ← 0
```
#### Intel C/C++ Compiler Intrinsic Equivalents
```java
VPCMPEQB __mmask64 _mm512_cmpeq_epi8_mask(__m512i a, __m512i b);
VPCMPEQB __mmask64 _mm512_mask_cmpeq_epi8_mask(__mmask64 k, __m512i a, __m512i b);
VPCMPEQB __mmask32 _mm256_cmpeq_epi8_mask(__m256i a, __m256i b);
VPCMPEQB __mmask32 _mm256_mask_cmpeq_epi8_mask(__mmask32 k, __m256i a, __m256i b);
VPCMPEQB __mmask16 _mm_cmpeq_epi8_mask(__m128i a, __m128i b);
VPCMPEQB __mmask16 _mm_mask_cmpeq_epi8_mask(__mmask16 k, __m128i a, __m128i b);
VPCMPEQW __mmask32 _mm512_cmpeq_epi16_mask(__m512i a, __m512i b);
VPCMPEQW __mmask32 _mm512_mask_cmpeq_epi16_mask(__mmask32 k, __m512i a, __m512i b);
VPCMPEQW __mmask16 _mm256_cmpeq_epi16_mask(__m256i a, __m256i b);
VPCMPEQW __mmask16 _mm256_mask_cmpeq_epi16_mask(__mmask16 k, __m256i a, __m256i b);
VPCMPEQW __mmask8 _mm_cmpeq_epi16_mask(__m128i a, __m128i b);
VPCMPEQW __mmask8 _mm_mask_cmpeq_epi16_mask(__mmask8 k, __m128i a, __m128i b);
VPCMPEQD __mmask16 _mm512_cmpeq_epi32_mask( __m512i a, __m512i b);
VPCMPEQD __mmask16 _mm512_mask_cmpeq_epi32_mask(__mmask16 k, __m512i a, __m512i b);
VPCMPEQD __mmask8 _mm256_cmpeq_epi32_mask(__m256i a, __m256i b);
VPCMPEQD __mmask8 _mm256_mask_cmpeq_epi32_mask(__mmask8 k, __m256i a, __m256i b);
VPCMPEQD __mmask8 _mm_cmpeq_epi32_mask(__m128i a, __m128i b);
VPCMPEQD __mmask8 _mm_mask_cmpeq_epi32_mask(__mmask8 k, __m128i a, __m128i b);
PCMPEQB: __m64 _mm_cmpeq_pi8 (__m64 m1, __m64 m2)
PCMPEQW: __m64 _mm_cmpeq_pi16 (__m64 m1, __m64 m2)
PCMPEQD: __m64 _mm_cmpeq_pi32 (__m64 m1, __m64 m2)
(V)PCMPEQB: __m128i _mm_cmpeq_epi8 ( __m128i a, __m128i b)
(V)PCMPEQW: __m128i _mm_cmpeq_epi16 ( __m128i a, __m128i b)
(V)PCMPEQD: __m128i _mm_cmpeq_epi32 ( __m128i a, __m128i b)
VPCMPEQB:
                __m256i _mm256_cmpeq_epi8 ( __m256i a, __m256i b)
VPCMPEQW:
                __m256i _mm256_cmpeq_epi16 ( __m256i a, __m256i b)
VPCMPEQD:
                __m256i _mm256_cmpeq_epi32 ( __m256i a, __m256i b)
```
### Flags Affected
None.

### SIMD Floating-Point Exceptions

None.

### Other Exceptions

Non-EVEX-encoded instruction, see Exceptions Type 4.
EVEX-encoded VPCMPEQD, see Exceptions Type E4.
EVEX-encoded VPCMPEQB/W, see Exceptions Type E4.nb.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
