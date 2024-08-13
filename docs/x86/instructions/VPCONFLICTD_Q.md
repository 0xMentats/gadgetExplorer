<b>VPCONFLICTD / VPCONFLICTQ</b> — Detect Conflicts Within a Vector of Packed Dword/Qword Values into Dense
Memory/ Register
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W0 C4 /r VPCONFLICTD xmm1 {k1}{z}, xmm2/m128/m32bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512CD</td>
		<td>Detect duplicate double-word values in xmm2/m128/m32bcst using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W0 C4 /r VPCONFLICTD ymm1 {k1}{z}, ymm2/m256/m32bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512CD</td>
		<td>Detect duplicate double-word values in ymm2/m256/m32bcst using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W0 C4 /r VPCONFLICTD zmm1 {k1}{z}, zmm2/m512/m32bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512CD</td>
		<td>Detect duplicate double-word values in zmm2/m512/m32bcst using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W1 C4 /r VPCONFLICTQ xmm1 {k1}{z}, xmm2/m128/m64bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512CD</td>
		<td>Detect duplicate quad-word values in xmm2/m128/m64bcst using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W1 C4 /r VPCONFLICTQ ymm1 {k1}{z}, ymm2/m256/m64bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512CD</td>
		<td>Detect duplicate quad-word values in ymm2/m256/m64bcst using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W1 C4 /r VPCONFLICTQ zmm1 {k1}{z}, zmm2/m512/m64bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512CD</td>
		<td>Detect duplicate quad-word values in zmm2/m512/m64bcst using writemask k1.</td>
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
Test each dword/qword element of the source operand (the second operand) for equality with all other elements in
the source operand closer to the least significant element. Each element’s comparison results form a bit vector,
which is then zero extended and written to the destination according to the writemask.

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


#### VPCONFLICTD
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
FOR j ← 0 TO KL-1
    i ← j*32
    IF MaskBit(j) OR *no writemask*THEN 
        FOR k ← 0 TO j-1
            m ← k*32
            IF ((SRC[i+31:i] = SRC[m+31:m])) THEN 
                DEST[i+k] ← 1
            ELSE 
                DEST[i+k] ← 0
            FI
        ENDFOR
        DEST[i+31:i+j] ← 0
    ELSE
        IF *merging-masking* THEN 
            *DEST[i+31:i] remains unchanged*
        ELSE 
            DEST[i+31:i] ← 0
        FI
    FI
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
#### VPCONFLICTQ
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j*64
    IF MaskBit(j) OR *no writemask*THEN 
        FOR k ← 0 TO j-1
            m ← k*64
            IF ((SRC[i+63:i] = SRC[m+63:m])) THEN 
                DEST[i+k] ← 1
            ELSE 
                DEST[i+k] ← 0
            FI
        ENDFOR
        DEST[i+63:i+j] ← 0
    ELSE
        IF *merging-masking* THEN 
            *DEST[i+63:i] remains unchanged*
        ELSE
            DEST[i+63:i] ← 0
         FI
    FI
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPCONFLICTD __m512i _mm512_conflict_epi32( __m512i a);
VPCONFLICTD __m512i _mm512_mask_conflict_epi32(__m512i s, __mmask16 m, __m512i a);
VPCONFLICTD __m512i _mm512_maskz_conflict_epi32(__mmask16 m, __m512i a);
VPCONFLICTQ __m512i _mm512_conflict_epi64( __m512i a);
VPCONFLICTQ __m512i _mm512_mask_conflict_epi64(__m512i s, __mmask8 m, __m512i a);
VPCONFLICTQ __m512i _mm512_maskz_conflict_epi64(__mmask8 m, __m512i a);
VPCONFLICTD __m256i _mm256_conflict_epi32( __m256i a);
VPCONFLICTD __m256i _mm256_mask_conflict_epi32(__m256i s, __mmask8 m, __m256i a);
VPCONFLICTD __m256i _mm256_maskz_conflict_epi32(__mmask8 m, __m256i a);
VPCONFLICTQ __m256i _mm256_conflict_epi64( __m256i a);
VPCONFLICTQ __m256i _mm256_mask_conflict_epi64(__m256i s, __mmask8 m, __m256i a);
VPCONFLICTQ __m256i _mm256_maskz_conflict_epi64(__mmask8 m, __m256i a);
VPCONFLICTD __m128i _mm_conflict_epi32( __m128i a);
VPCONFLICTD __m128i _mm_mask_conflict_epi32(__m128i s, __mmask8 m, __m128i a);
VPCONFLICTD __m128i _mm_maskz_conflict_epi32(__mmask8 m, __m128i a);
VPCONFLICTQ __m128i _mm_conflict_epi64( __m128i a);
VPCONFLICTQ __m128i _mm_mask_conflict_epi64(__m128i s, __mmask8 m, __m128i a);
VPCONFLICTQ __m128i _mm_maskz_conflict_epi64(__mmask8 m, __m128i a);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

EVEX-encoded instruction, see Exceptions Type E4NF.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
