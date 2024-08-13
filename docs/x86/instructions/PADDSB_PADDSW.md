<b>PADDSB / PADDSW</b> — Add Packed Signed Integers with Signed Saturation
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F EC /r1 PADDSB mm, mm/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>MMX</td>
		<td>Add packed signed byte integers from mm/m64 and mm and saturate the results.</td>
	</tr>
	<tr>
		<td>66 0F EC /r PADDSB xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Add packed signed byte integers from xmm2/m128 and xmm1 saturate the results.</td>
	</tr>
	<tr>
		<td>NP 0F ED /r1 PADDSW mm, mm/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>MMX</td>
		<td>Add packed signed word integers from mm/m64 and mm and saturate the results.</td>
	</tr>
	<tr>
		<td>66 0F ED /r PADDSW xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Add packed signed word integers from xmm2/m128 and xmm1 and saturate the results.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.WIG EC /r VPADDSB xmm1, xmm2, xmm3/m128</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Add packed signed byte integers from xmm3/m128 and xmm2 saturate the results.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.WIG ED /r VPADDSW xmm1, xmm2, xmm3/m128</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Add packed signed word integers from xmm3/m128 and xmm2 and saturate the results.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F.WIG EC /r VPADDSB ymm1, ymm2, ymm3/m256</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Add packed signed byte integers from ymm2, and ymm3/m256 and store the saturated results in ymm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F.WIG ED /r VPADDSW ymm1, ymm2, ymm3/m256</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Add packed signed word integers from ymm2, and ymm3/m256 and store the saturated results in ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F.WIG EC /r VPADDSB xmm1 {k1}{z}, xmm2, xmm3/m128</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Add packed signed byte integers from xmm2, and xmm3/m128 and store the saturated results in xmm1 under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F.WIG EC /r VPADDSB ymm1 {k1}{z}, ymm2, ymm3/m256</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Add packed signed byte integers from ymm2, and ymm3/m256 and store the saturated results in ymm1 under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F.WIG EC /r VPADDSB zmm1 {k1}{z}, zmm2, zmm3/m512</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512BW </td>
		<td>Add packed signed byte integers from zmm2, and zmm3/m512 and store the saturated results in zmm1 under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F.WIG ED /r VPADDSW xmm1 {k1}{z}, xmm2, xmm3/m128</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Add packed signed word integers from xmm2, and xmm3/m128 and store the saturated results in xmm1 under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F.WIG ED /r VPADDSW ymm1 {k1}{z}, ymm2, ymm3/m256</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Add packed signed word integers from ymm2, and ymm3/m256 and store the saturated results in ymm1 under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F.WIG ED /r VPADDSW zmm1 {k1}{z}, zmm2, zmm3/m512</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512BW </td>
		<td>Add packed signed word integers from zmm2, and zmm3/m512 and store the saturated results in zmm1 under writemask k1.</td>
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
		<td>Full Mem</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
Performs a SIMD add of the packed signed integers from the source operand (second operand) and the destination
operand (first operand), and stores the packed integer results in the destination operand. See Figure 9-4 in the
Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 1, for an illustration of a SIMD operation.
Overflow is handled with signed saturation, as described in the following paragraphs.

(V)PADDSB performs a SIMD add of the packed signed integers with saturation from the first source operand and
second source operand and stores the packed integer results in the destination operand. When an individual byte
result is beyond the range of a signed byte integer (that is, greater than 7FH or less than 80H), the saturated value
of 7FH or 80H, respectively, is written to the destination operand.

(V)PADDSW performs a SIMD add of the packed signed word integers with saturation from the first source operand
and second source operand and stores the packed integer results in the destination operand. When an individual
word result is beyond the range of a signed word integer (that is, greater than 7FFFH or less than 8000H), the satu-
rated value of 7FFFH or 8000H, respectively, is written to the destination operand.

EVEX encoded versions: The first source operand is an ZMM/YMM/XMM register. The second source operand is an
ZMM/YMM/XMM register or a memory location. The destination operand is an ZMM/YMM/XMM register.

VEX.256 encoded version: The first source operand is a YMM register. The second source operand is a YMM register
or a 256-bit memory location. The destination operand is a YMM register.

VEX.128 encoded version: The first source operand is an XMM register. The second source operand is an XMM
register or 128-bit memory location. The destination operand is an XMM register. The upper bits (MAXVL-1:128) of
the corresponding register destination are zeroed.

128-bit Legacy SSE version: The first source operand is an XMM register. The second operand can be an XMM
register or an 128-bit memory location. The destination is not distinct from the first source XMM register and the
upper bits (MAXVL-1:128) of the corresponding register destination are unmodified.

### Operation


#### PADDSB (with 64-bit operands)
```java
    DEST[7:0] ← SaturateToSignedByte(DEST[7:0] + SRC (7:0]);
    (* Repeat add operation for 2nd through 7th bytes *)
    DEST[63:56] ← SaturateToSignedByte(DEST[63:56] + SRC[63:56] );
```
#### PADDSB (with 128-bit operands)
```java
    DEST[7:0] ←SaturateToSignedByte (DEST[7:0] + SRC[7:0]);
    (* Repeat add operation for 2nd through 14th bytes *)
    DEST[127:120] ← SaturateToSignedByte (DEST[111:120] + SRC[127:120]);
```
#### VPADDSB (VEX.128 encoded version)
```java
    DEST[7:0] ← SaturateToSignedByte (SRC1[7:0] + SRC2[7:0]);
    (* Repeat subtract operation for 2nd through 14th bytes *)
    DEST[127:120] ← SaturateToSignedByte (SRC1[111:120] + SRC2[127:120]);
    DEST[MAXVL-1:128] ← 0
```
#### VPADDSB (VEX.256 encoded version)
```java
    DEST[7:0] ← SaturateToSignedByte (SRC1[7:0] + SRC2[7:0]);
    (* Repeat add operation for 2nd through 31st bytes *)
    DEST[255:248]← SaturateToSignedByte (SRC1[255:248] + SRC2[255:248]);
```
#### VPADDSB (EVEX encoded versions)
```java
(KL, VL) = (16, 128), (32, 256), (64, 512)
FOR j ← 0 TO KL-1
    i ← j * 8
    IF k1[j] OR *no writemask*
        THEN DEST[i+7:i] ← SaturateToSignedByte (SRC1[i+7:i] + SRC2[i+7:i])
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+7:i] remains unchanged*
                ELSE *zeroing-masking*
                            ; zeroing-masking
                    DEST[i+7:i] = 0
            FI
    FI;
ENDFOR;
DEST[MAXVL-1:VL] ← 0
```
#### PADDSW (with 64-bit operands)
```java
    DEST[15:0] ← SaturateToSignedWord(DEST[15:0] + SRC[15:0] );
    (* Repeat add operation for 2nd and 7th words *)
    DEST[63:48] ← SaturateToSignedWord(DEST[63:48] + SRC[63:48] );
```
#### PADDSW (with 128-bit operands)
```java
    DEST[15:0]  ← SaturateToSignedWord (DEST[15:0] + SRC[15:0]);
    (* Repeat add operation for 2nd through 7th words *)
    DEST[127:112] ← SaturateToSignedWord (DEST[127:112] + SRC[127:112]);
```
#### VPADDSW (VEX.128 encoded version)
```java
    DEST[15:0] ← SaturateToSignedWord (SRC1[15:0] + SRC2[15:0]);
    (* Repeat subtract operation for 2nd through 7th words *)
    DEST[127:112] ← SaturateToSignedWord (SRC1[127:112] + SRC2[127:112]);
    DEST[MAXVL-1:128] ← 0
```
#### VPADDSW (VEX.256 encoded version)
```java
    DEST[15:0] ← SaturateToSignedWord (SRC1[15:0] + SRC2[15:0]);
    (* Repeat add operation for 2nd through 15th words *)
    DEST[255:240] ← SaturateToSignedWord (SRC1[255:240] + SRC2[255:240])
```
#### VPADDSW (EVEX encoded versions)
```java
(KL, VL) = (8, 128), (16, 256), (32, 512)
FOR j ← 0 TO KL-1
    i ← j * 16
    IF k1[j] OR *no writemask*
        THEN DEST[i+15:i] ← SaturateToSignedWord (SRC1[i+15:i] + SRC2[i+15:i])
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+15:i] remains unchanged*
                ELSE *zeroing-masking*
                            ; zeroing-masking
                    DEST[i+15:i] = 0
            FI
    FI;
ENDFOR;
DEST[MAXVL-1:VL] ← 0
```
#### Intel C/C++ Compiler Intrinsic Equivalents
```java
PADDSB:
                 __m64 _mm_adds_pi8(__m64 m1, __m64 m2)
(V)PADDSB:
                 __m128i _mm_adds_epi8 ( __m128i a, __m128i b)
VPADDSB:
                __m256i _mm256_adds_epi8 ( __m256i a, __m256i b)
PADDSW:
                 __m64 _mm_adds_pi16(__m64 m1, __m64 m2)
(V)PADDSW:
                 __m128i _mm_adds_epi16 ( __m128i a, __m128i b)
VPADDSW:
                __m256i _mm256_adds_epi16 ( __m256i a, __m256i b)
VPADDSB__m512i _mm512_adds_epi8 ( __m512i a, __m512i b)
VPADDSW__m512i _mm512_adds_epi16 ( __m512i a, __m512i b)
VPADDSB__m512i _mm512_mask_adds_epi8 ( __m512i s, __mmask64 m, __m512i a, __m512i b)
VPADDSW__m512i _mm512_mask_adds_epi16 ( __m512i s, __mmask32 m, __m512i a, __m512i b)
VPADDSB__m512i _mm512_maskz_adds_epi8 (__mmask64 m, __m512i a, __m512i b)
VPADDSW__m512i _mm512_maskz_adds_epi16 (__mmask32 m, __m512i a, __m512i b)
VPADDSB__m256i _mm256_mask_adds_epi8 (__m256i s, __mmask32 m, __m256i a, __m256i b)
VPADDSW__m256i _mm256_mask_adds_epi16 (__m256i s, __mmask16 m, __m256i a, __m256i b)
VPADDSB__m256i _mm256_maskz_adds_epi8 (__mmask32 m, __m256i a, __m256i b)
VPADDSW__m256i _mm256_maskz_adds_epi16 (__mmask16 m, __m256i a, __m256i b)
VPADDSB__m128i _mm_mask_adds_epi8 (__m128i s, __mmask16 m, __m128i a, __m128i b)
VPADDSW__m128i _mm_mask_adds_epi16 (__m128i s, __mmask8 m, __m128i a, __m128i b)
VPADDSB__m128i _mm_maskz_adds_epi8 (__mmask16 m, __m128i a, __m128i b)
VPADDSW__m128i _mm_maskz_adds_epi16 (__mmask8 m, __m128i a, __m128i b)
```
### Flags Affected
None.

### SIMD Floating-Point Exceptions

None.

### Other Exceptions

Non-EVEX-encoded instruction, see Exceptions Type 4.

EVEX-encoded instruction, see Exceptions Type E4.nb.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
