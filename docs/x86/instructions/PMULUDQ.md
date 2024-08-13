<b>PMULUDQ</b> — Multiply Packed Unsigned Doubleword Integers
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F F4 /r1 PMULUDQ mm1, mm2/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Multiply unsigned doubleword integer in mm1 by unsigned doubleword integer in mm2/m64, and store the quadword result in mm1.</td>
	</tr>
	<tr>
		<td>66 0F F4 /r PMULUDQ xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Multiply packed unsigned doubleword integers in xmm1 by packed unsigned doubleword integers in xmm2/m128, and store the quadword results in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.WIG F4 /r VPMULUDQ xmm1, xmm2, xmm3/m128</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Multiply packed unsigned doubleword integers in xmm2 by packed unsigned doubleword integers in xmm3/m128, and store the quadword results in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F.WIG F4 /r VPMULUDQ ymm1, ymm2, ymm3/m256</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Multiply packed unsigned doubleword integers in ymm2 by packed unsigned doubleword integers in ymm3/m256, and store the quadword results in ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F.W1 F4 /r VPMULUDQ xmm1 {k1}{z}, xmm2, xmm3/m128/m64bcst</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Multiply packed unsigned doubleword integers in xmm2 by packed unsigned doubleword integers in xmm3/m128/m64bcst, and store the quadword results in xmm1 under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F.W1 F4 /r VPMULUDQ ymm1 {k1}{z}, ymm2, ymm3/m256/m64bcst</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Multiply packed unsigned doubleword integers in ymm2 by packed unsigned doubleword integers in ymm3/m256/m64bcst, and store the quadword results in ymm1 under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F.W1 F4 /r VPMULUDQ zmm1 {k1}{z}, zmm2, zmm3/m512/m64bcst</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Multiply packed unsigned doubleword integers in zmm2 by packed unsigned doubleword integers in zmm3/m512/m64bcst, and store the quadword results in zmm1 under writemask k1.</td>
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
</table>


### Description
Multiplies the first operand (destination operand) by the second operand (source operand) and stores the result in
the destination operand.

In 64-bit mode and not encoded with VEX/EVEX, using a REX prefix in the form of REX.R permits this instruction to
access additional registers (XMM8-XMM15).

Legacy SSE version 64-bit operand: The source operand can be an unsigned doubleword integer stored in the low
doubleword of an MMX technology register or a 64-bit memory location. The destination operand can be an
unsigned doubleword integer stored in the low doubleword an MMX technology register. The result is an unsigned
quadword integer stored in the destination an MMX technology register. When a quadword result is too large to be
represented in 64 bits (overflow), the result is wrapped around and the low 64 bits are written to the destination
element (that is, the carry is ignored).

For 64-bit memory operands, 64 bits are fetched from memory, but only the low doubleword is used in the compu-
tation.

128-bit Legacy SSE version: The second source operand is two packed unsigned doubleword integers stored in the
first (low) and third doublewords of an XMM register or a 128-bit memory location. For 128-bit memory operands,
128 bits are fetched from memory, but only the first and third doublewords are used in the computation. The first
source operand is two packed unsigned doubleword integers stored in the first and third doublewords of an XMM
register. The destination contains two packed unsigned quadword integers stored in an XMM register. Bits (MAXVL-
1:128) of the corresponding YMM destination register remain unchanged.

VEX.128 encoded version: The second source operand is two packed unsigned doubleword integers stored in the
first (low) and third doublewords of an XMM register or a 128-bit memory location. For 128-bit memory operands,
128 bits are fetched from memory, but only the first and third doublewords are used in the computation. The first
source operand is two packed unsigned doubleword integers stored in the first and third doublewords of an XMM
register. The destination contains two packed unsigned quadword integers stored in an XMM register. Bits (MAXVL-
1:128) of the destination YMM register are zeroed.

VEX.256 encoded version: The second source operand is four packed unsigned doubleword integers stored in the
first (low), third, fifth and seventh doublewords of a YMM register or a 256-bit memory location. For 256-bit
memory operands, 256 bits are fetched from memory, but only the first, third, fifth and seventh doublewords are
used in the computation. The first source operand is four packed unsigned doubleword integers stored in the first,
third, fifth and seventh doublewords of an YMM register. The destination contains four packed unaligned quadword
integers stored in an YMM register.

EVEX encoded version: The input unsigned doubleword integers are taken from the even-numbered elements of
the source operands. The first source operand is a ZMM/YMM/XMM registers. The second source operand can be an
ZMM/YMM/XMM register, a 512/256/128-bit memory location or a 512/256/128-bit vector broadcasted from a 64-bit
 memory location. The destination is a ZMM/YMM/XMM register, and updated according to the writemask at 64-bit
 granularity.

### Operation


#### PMULUDQ (with 64-Bit operands)
```java
    DEST[63:0] ← DEST[31:0] ∗ SRC[31:0];
```
#### PMULUDQ (with 128-Bit operands)
```java
    DEST[63:0] ← DEST[31:0] ∗ SRC[31:0];
    DEST[127:64] ← DEST[95:64] ∗ SRC[95:64];
```
#### VPMULUDQ (VEX.128 encoded version)
```java
DEST[63:0] ← SRC1[31:0] * SRC2[31:0]
DEST[127:64] ← SRC1[95:64] * SRC2[95:64]
DEST[MAXVL-1:128] ← 0
```
#### VPMULUDQ (VEX.256 encoded version)
```java
DEST[63:0] ← SRC1[31:0] * SRC2[31:0]
DEST[127:64] ← SRC1[95:64] * SRC2[95:64
DEST[191:128] ← SRC1[159:128] * SRC2[159:128]
DEST[255:192] ← SRC1[223:192] * SRC2[223:192]
DEST[MAXVL-1:256] ← 0
```
#### VPMULUDQ (EVEX encoded versions)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 64
    IF k1[j] OR *no writemask* THEN
            IF (EVEX.b = 1) AND (SRC2 *is memory*)
                THEN DEST[i+63:i] ← ZeroExtend64( SRC1[i+31:i]) * ZeroExtend64( SRC2[31:0] )
                ELSE DEST[i+63:i] ← ZeroExtend64( SRC1[i+31:i]) * ZeroExtend64( SRC2[i+31:i] )
            FI;
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+63:i] remains unchanged*
                ELSE *zeroing-masking*
                            ; zeroing-masking
                    DEST[i+63:i] ← 0
            FI
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPMULUDQ __m512i _mm512_mul_epu32(__m512i a, __m512i b);
VPMULUDQ __m512i _mm512_mask_mul_epu32(__m512i s, __mmask8 k, __m512i a, __m512i b);
VPMULUDQ __m512i _mm512_maskz_mul_epu32( __mmask8 k, __m512i a, __m512i b);
VPMULUDQ __m256i _mm256_mask_mul_epu32(__m256i s, __mmask8 k, __m256i a, __m256i b);
VPMULUDQ __m256i _mm256_maskz_mul_epu32( __mmask8 k, __m256i a, __m256i b);
VPMULUDQ __m128i _mm_mask_mul_epu32(__m128i s, __mmask8 k, __m128i a, __m128i b);
VPMULUDQ __m128i _mm_maskz_mul_epu32( __mmask8 k, __m128i a, __m128i b);
PMULUDQ:__m64 _mm_mul_su32 (__m64 a, __m64 b)
(V)PMULUDQ:__m128i _mm_mul_epu32 ( __m128i a, __m128i b)
VPMULUDQ:__m256i _mm256_mul_epu32( __m256i a, __m256i b);
```
### Flags Affected
None.

### SIMD Floating-Point Exceptions

None.

### Other Exceptions

Non-EVEX-encoded instruction, see Exceptions Type 4.

EVEX-encoded instruction, see Exceptions Type E4.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
