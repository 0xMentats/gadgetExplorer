<b>VPBROADCASTB / VPBROADCASTW / VPBROADCASTD / VPBROADCASTQ</b> — Load with Broadcast Integer Data from General Purpose Register
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W0 7A /r VPBROADCASTB xmm1 {k1}{z}, reg</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Broadcast an 8-bit value from a GPR to all bytes in the 128-bit destination subject to writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W0 7A /r VPBROADCASTB ymm1 {k1}{z}, reg</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Broadcast an 8-bit value from a GPR to all bytes in the 256-bit destination subject to writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W0 7A /r VPBROADCASTB zmm1 {k1}{z}, reg</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Broadcast an 8-bit value from a GPR to all bytes in the 512-bit destination subject to writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W0 7B /r VPBROADCASTW xmm1 {k1}{z}, reg</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Broadcast a 16-bit value from a GPR to all words in the 128-bit destination subject to writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W0 7B /r VPBROADCASTW ymm1 {k1}{z}, reg</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Broadcast a 16-bit value from a GPR to all words in the 256-bit destination subject to writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W0 7B /r VPBROADCASTW zmm1 {k1}{z}, reg</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Broadcast a 16-bit value from a GPR to all words in the 512-bit destination subject to writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W0 7C /r VPBROADCASTD xmm1 {k1}{z}, r32</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Broadcast a 32-bit value from a GPR to all double-words in the 128-bit destination subject to writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W0 7C /r VPBROADCASTD ymm1 {k1}{z}, r32</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Broadcast a 32-bit value from a GPR to all double-words in the 256-bit destination subject to writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W0 7C /r VPBROADCASTD zmm1 {k1}{z}, r32</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Broadcast a 32-bit value from a GPR to all double-words in the 512-bit destination subject to writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W1 7C /r VPBROADCASTQ xmm1 {k1}{z}, r64</td>
		<td>A</td>
		<td>V/N.E.1</td>
		<td>AVX512VL AVX512F</td>
		<td>Broadcast a 64-bit value from a GPR to all quad-words in the 128-bit destination subject to writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W1 7C /r VPBROADCASTQ ymm1 {k1}{z}, r64</td>
		<td>A</td>
		<td>V/N.E.1</td>
		<td>AVX512VL AVX512F</td>
		<td>Broadcast a 64-bit value from a GPR to all quad-words in the 256-bit destination subject to writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W1 7C /r VPBROADCASTQ zmm1 {k1}{z}, r64</td>
		<td>A</td>
		<td>V/N.E.1</td>
		<td>AVX512F</td>
		<td>Broadcast a 64-bit value from a GPR to all quad-words in the 512-bit destination subject to writemask k1.</td>
	</tr>
</table>

NOTES:
1. EVEX.W in non-64 bit is ignored; the instructions behaves as if the W0 version is used.

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
		<td>Tuple1 Scalar</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Broadcasts a 8-bit, 16-bit, 32-bit or 64-bit value from a general-purpose register (the second operand) to all the
locations in the destination vector register (the first operand) using the writemask k1.

EVEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.

### Operation


#### VPBROADCASTB (EVEX encoded versions)
```java
(KL, VL) = (16, 128), (32, 256), (64, 512)
FOR j ← 0 TO KL-1
    i ←j * 8
    IF k1[j] OR *no writemask*
        THEN DEST[i+7:i] ← SRC[7:0]
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+7:i] remains unchanged*
                ELSE 
                            ; zeroing-masking
                    DEST[i+7:i] ← 0
            FI
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
#### VPBROADCASTW (EVEX encoded versions)
```java
(KL, VL) = (8, 128), (16, 256), (32, 512)
FOR j ← 0 TO KL-1
    i ←j * 16
    IF k1[j] OR *no writemask*
        THEN DEST[i+15:i] ← SRC[15:0]
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+15:i] remains unchanged*
                ELSE 
                            ; zeroing-masking
                    DEST[i+15:i] ← 0
            FI
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
#### VPBROADCASTD (EVEX encoded versions)
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
FOR j ← 0 TO KL-1
    i ←j * 32
    IF k1[j] OR *no writemask*
        THEN DEST[i+31:i] ← SRC[31:0]
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+31:i] remains unchanged*
                ELSE 
                            ; zeroing-masking
                    DEST[i+31:i] ← 0
            FI
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
#### VPBROADCASTQ (EVEX encoded versions)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ←j * 64
    IF k1[j] OR *no writemask*
        THEN DEST[i+63:i] ← SRC[63:0]
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+63:i] remains unchanged*
                ELSE 
                            ; zeroing-masking
                    DEST[i+63:i] ← 0
            FI
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPBROADCASTB __m512i _mm512_mask_set1_epi8(__m512i s, __mmask64 k, int a);
VPBROADCASTB __m512i _mm512_maskz_set1_epi8( __mmask64 k, int a);
VPBROADCASTB __m256i _mm256_mask_set1_epi8(__m256i s, __mmask32 k, int a);
VPBROADCASTB __m256i _mm256_maskz_set1_epi8( __mmask32 k, int a);
VPBROADCASTB __m128i _mm_mask_set1_epi8(__m128i s, __mmask16 k, int a);
VPBROADCASTB __m128i _mm_maskz_set1_epi8( __mmask16 k, int a);
VPBROADCASTD __m512i _mm512_mask_set1_epi32(__m512i s, __mmask16 k, int a);
VPBROADCASTD __m512i _mm512_maskz_set1_epi32( __mmask16 k, int a);
VPBROADCASTD __m256i _mm256_mask_set1_epi32(__m256i s, __mmask8 k, int a);
VPBROADCASTD __m256i _mm256_maskz_set1_epi32( __mmask8 k, int a);
VPBROADCASTD __m128i _mm_mask_set1_epi32(__m128i s, __mmask8 k, int a);
VPBROADCASTD __m128i _mm_maskz_set1_epi32( __mmask8 k, int a);
VPBROADCASTQ __m512i _mm512_mask_set1_epi64(__m512i s, __mmask8 k, __int64 a);
VPBROADCASTQ __m512i _mm512_maskz_set1_epi64( __mmask8 k, __int64 a);
VPBROADCASTQ __m256i _mm256_mask_set1_epi64(__m256i s, __mmask8 k, __int64 a);
VPBROADCASTQ __m256i _mm256_maskz_set1_epi64( __mmask8 k, __int64 a);
VPBROADCASTQ __m128i _mm_mask_set1_epi64(__m128i s, __mmask8 k, __int64 a);
VPBROADCASTQ __m128i _mm_maskz_set1_epi64( __mmask8 k, __int64 a);
VPBROADCASTW __m512i _mm512_mask_set1_epi16(__m512i s, __mmask32 k, int a);
VPBROADCASTW __m512i _mm512_maskz_set1_epi16( __mmask32 k, int a);
VPBROADCASTW __m256i _mm256_mask_set1_epi16(__m256i s, __mmask16 k, int a);
VPBROADCASTW __m256i _mm256_maskz_set1_epi16( __mmask16 k, int a);
VPBROADCASTW __m128i _mm_mask_set1_epi16(__m128i s, __mmask8 k, int a);
VPBROADCASTW __m128i _mm_maskz_set1_epi16( __mmask8 k, int a);
```
### Exceptions
EVEX-encoded instructions, see Exceptions Type E7NM.
<p>#UD
If EVEX.vvvv != 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
