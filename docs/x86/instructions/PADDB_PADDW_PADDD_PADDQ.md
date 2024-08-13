<b>PADDB / PADDW / PADDD / PADDQ</b> — Add Packed Integers
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F FC /r1 PADDB mm, mm/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>MMX</td>
		<td>Add packed byte integers from mm/m64 and mm.</td>
	</tr>
	<tr>
		<td>NP 0F FD /r1 PADDW mm, mm/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>MMX</td>
		<td>Add packed word integers from mm/m64 and mm.</td>
	</tr>
	<tr>
		<td>NP 0F FE /r1 PADDD mm, mm/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>MMX</td>
		<td>Add packed doubleword integers from mm/m64 and mm.</td>
	</tr>
	<tr>
		<td>NP 0F D4 /r1 PADDQ mm, mm/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>MMX</td>
		<td>Add packed quadword integers from mm/m64 and mm.</td>
	</tr>
	<tr>
		<td>66 0F FC /r PADDB xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Add packed byte integers from xmm2/m128 and xmm1.</td>
	</tr>
	<tr>
		<td>66 0F FD /r PADDW xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Add packed word integers from xmm2/m128 and xmm1.</td>
	</tr>
	<tr>
		<td>66 0F FE /r PADDD xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Add packed doubleword integers from xmm2/m128 and xmm1.</td>
	</tr>
	<tr>
		<td>66 0F D4 /r PADDQ xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Add packed quadword integers from xmm2/m128 and xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.WIG FC /r VPADDB xmm1, xmm2, xmm3/m128</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Add packed byte integers from xmm2, and xmm3/m128 and store in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.WIG FD /r VPADDW xmm1, xmm2, xmm3/m128</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Add packed word integers from xmm2, xmm3/m128 and store in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.WIG FE /r VPADDD xmm1, xmm2, xmm3/m128</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Add packed doubleword integers from xmm2, xmm3/m128 and store in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.WIG D4 /r VPADDQ xmm1, xmm2, xmm3/m128</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Add packed quadword integers from xmm2, xmm3/m128 and store in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F.WIG FC /r VPADDB ymm1, ymm2, ymm3/m256</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Add packed byte integers from ymm2, and ymm3/m256 and store in ymm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F.WIG FD /r VPADDW ymm1, ymm2, ymm3/m256</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Add packed word integers from ymm2, ymm3/m256 and store in ymm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F.WIG FE /r VPADDD ymm1, ymm2, ymm3/m256</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Add packed doubleword integers from ymm2, ymm3/m256 and store in ymm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F.WIG D4 /r VPADDQ ymm1, ymm2, ymm3/m256</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Add packed quadword integers from ymm2, ymm3/m256 and store in ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F.WIG FC /r VPADDB xmm1 {k1}{z}, xmm2, xmm3/m128</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Add packed byte integers from xmm2, and xmm3/m128 and store in xmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F.WIG FD /r VPADDW xmm1 {k1}{z}, xmm2, xmm3/m128</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Add packed word integers from xmm2, and xmm3/m128 and store in xmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F.W0 FE /r VPADDD xmm1 {k1}{z}, xmm2, xmm3/m128/m32bcst</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Add packed doubleword integers from xmm2, and xmm3/m128/m32bcst and store in xmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F.W1 D4 /r VPADDQ xmm1 {k1}{z}, xmm2, xmm3/m128/m64bcst</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Add packed quadword integers from xmm2, and xmm3/m128/m64bcst and store in xmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F.WIG FC /r VPADDB ymm1 {k1}{z}, ymm2, ymm3/m256</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Add packed byte integers from ymm2, and ymm3/m256 and store in ymm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F.WIG FD /r VPADDW ymm1 {k1}{z}, ymm2, ymm3/m256</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Add packed word integers from ymm2, and ymm3/m256 and store in ymm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F.W0 FE /r VPADDD ymm1 {k1}{z}, ymm2, ymm3/m256/m32bcst</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Add packed doubleword integers from ymm2, ymm3/m256/m32bcst and store in ymm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F.W1 D4 /r VPADDQ ymm1 {k1}{z}, ymm2, ymm3/m256/m64bcst</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Add packed quadword integers from ymm2, ymm3/m256/m64bcst and store in ymm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F.WIG FC /r VPADDB zmm1 {k1}{z}, zmm2, zmm3/m512</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512BW </td>
		<td>Add packed byte integers from zmm2, and zmm3/m512 and store in zmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F.WIG FD /r VPADDW zmm1 {k1}{z}, zmm2, zmm3/m512</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512BW </td>
		<td>Add packed word integers from zmm2, and zmm3/m512 and store in zmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F.W0 FE /r VPADDD zmm1 {k1}{z}, zmm2, zmm3/m512/m32bcst</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Add packed doubleword integers from zmm2, zmm3/m512/m32bcst and store in zmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F.W1 D4 /r VPADDQ zmm1 {k1}{z}, zmm2, zmm3/m512/m64bcst</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Add packed quadword integers from zmm2, zmm3/m512/m64bcst and store in zmm1 using writemask k1.</td>
	</tr>
</table>
NOTES: 1. See note in Section 2.4, “AVX and SSE Instruction Exception Specification” in the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 2A and Section 22.25.3, “Exception Conditions of Legacy SIMD Instructions Operating on MMX Registers” in the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 3A.


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
	<tr>
		<td>D</td>
		<td>Full</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
Performs a SIMD add of the packed integers from the source operand (second operand) and the destination
operand (first operand), and stores the packed integer results in the destination operand. See Figure 9-4 in the
Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 1, for an illustration of a SIMD operation.
Overflow is handled with wraparound, as described in the following paragraphs.

The PADDB and VPADDB instructions add packed byte integers from the first source operand and second source
operand and store the packed integer results in the destination operand. When an individual result is too large to
be represented in 8 bits (overflow), the result is wrapped around and the low 8 bits are written to the destination
operand (that is, the carry is ignored).

The PADDW and VPADDW instructions add packed word integers from the first source operand and second source
operand and store the packed integer results in the destination operand. When an individual result is too large to
be represented in 16 bits (overflow), the result is wrapped around and the low 16 bits are written to the destination
operand (that is, the carry is ignored).

The PADDD and VPADDD instructions add packed doubleword integers from the first source operand and second
source operand and store the packed integer results in the destination operand. When an individual result is too
large to be represented in 32 bits (overflow), the result is wrapped around and the low 32 bits are written to the
destination operand (that is, the carry is ignored).

The PADDQ and VPADDQ instructions add packed quadword integers from the first source operand and second
source operand and store the packed integer results in the destination operand. When a quadword result is too
large to be represented in 64 bits (overflow), the result is wrapped around and the low 64 bits are written to the
destination operand (that is, the carry is ignored).

Note that the (V)PADDB, (V)PADDW, (V)PADDD and (V)PADDQ instructions can operate on either unsigned or
signed (two's complement notation) packed integers; however, it does not set bits in the EFLAGS register to indi-
cate overflow and/or a carry. To prevent undetected overflow conditions, software must control the ranges of
values operated on.

EVEX encoded VPADDD/Q: The first source operand is a ZMM/YMM/XMM register. The second source operand is a
ZMM/YMM/XMM register, a 512/256/128-bit memory location or a 512/256/128-bit vector broadcasted from a
32/64-bit memory location. The destination operand is a ZMM/YMM/XMM register updated according to the
writemask.

EVEX encoded VPADDB/W: The first source operand is a ZMM/YMM/XMM register. The second source operand is a
ZMM/YMM/XMM register, a 512/256/128-bit memory location. The destination operand is a ZMM/YMM/XMM
register updated according to the writemask.

VEX.256 encoded version: The first source operand is a YMM register. The second source operand is a YMM register
or a 256-bit memory location. The destination operand is a YMM register. the upper bits (MAXVL-1:256) of the
destination are cleared.

VEX.128 encoded version: The first source operand is an XMM register. The second source operand is an XMM
register or 128-bit memory location. The destination operand is an XMM register. The upper bits (MAXVL-1:128) of
the corresponding ZMM register destination are zeroed.

128-bit Legacy SSE version: The first source operand is an XMM register. The second operand can be an XMM
register or an 128-bit memory location. The destination is not distinct from the first source XMM register and the
upper bits (MAXVL-1:128) of the corresponding ZMM register destination are unmodified.

### Operation


#### PADDB (with 64-bit operands)
```java
    DEST[7:0] ← DEST[7:0] + SRC[7:0]; 
    (* Repeat add operation for 2nd through 7th byte *)
    DEST[63:56] ← DEST[63:56] + SRC[63:56];
```
#### PADDW (with 64-bit operands)
```java
    DEST[15:0] ← DEST[15:0] + SRC[15:0];
    (* Repeat add operation for 2nd and 3th word *)
    DEST[63:48] ← DEST[63:48] + SRC[63:48];
```
#### PADDD (with 64-bit operands)
```java
    DEST[31:0] ← DEST[31:0] + SRC[31:0];
    DEST[63:32] ← DEST[63:32] + SRC[63:32];
```
#### PADDQ (with 64-Bit operands)
```java
    DEST[63:0] ← DEST[63:0] + SRC[63:0];
```
#### PADDB (Legacy SSE instruction)
```java
    DEST[7:0]← DEST[7:0] + SRC[7:0]; 
    (* Repeat add operation for 2nd through 15th byte *)
    DEST[127:120]← DEST[127:120] + SRC[127:120];
    DEST[MAXVL-1:128] (Unmodified)
```
#### PADDW (Legacy SSE instruction)
```java
    DEST[15:0] ← DEST[15:0] + SRC[15:0];
    (* Repeat add operation for 2nd through 7th word *)
    DEST[127:112]← DEST[127:112] + SRC[127:112];
    DEST[MAXVL-1:128] (Unmodified)
```
#### PADDD (Legacy SSE instruction)
```java
    DEST[31:0]← DEST[31:0]  + SRC[31:0];
    (* Repeat add operation for 2nd and 3th doubleword *)
    DEST[127:96]← DEST[127:96] + SRC[127:96];
    DEST[MAXVL-1:128] (Unmodified)
```
#### PADDQ (Legacy SSE instruction)
```java
    DEST[63:0]← DEST[63:0]  + SRC[63:0];
    DEST[127:64]← DEST[127:64] + SRC[127:64];
    DEST[MAXVL-1:128] (Unmodified)
```
#### VPADDB (VEX.128 encoded instruction)
```java
    DEST[7:0]← SRC1[7:0] + SRC2[7:0]; 
    (* Repeat add operation for 2nd through 15th byte *)
    DEST[127:120]← SRC1[127:120] + SRC2[127:120];
    DEST[MAXVL-1:128] ← 0;
```
#### VPADDW (VEX.128 encoded instruction)
```java
    DEST[15:0] ← SRC1[15:0] + SRC2[15:0];
    (* Repeat add operation for 2nd through 7th word *)
    DEST[127:112]← SRC1[127:112] + SRC2[127:112];
    DEST[MAXVL-1:128] ← 0;
```
#### VPADDD (VEX.128 encoded instruction)
```java
    DEST[31:0]← SRC1[31:0]  + SRC2[31:0];
    (* Repeat add operation for 2nd and 3th doubleword *)
    DEST[127:96] ← SRC1[127:96] + SRC2[127:96];
    DEST[MAXVL-1:128] ← 0;
```
#### VPADDQ (VEX.128 encoded instruction)
```java
    DEST[63:0]← SRC1[63:0]  + SRC2[63:0];
    DEST[127:64] ← SRC1[127:64] + SRC2[127:64];
    DEST[MAXVL-1:128] ← 0;
```
#### VPADDB (VEX.256 encoded instruction)
```java
    DEST[7:0]← SRC1[7:0] + SRC2[7:0]; 
    (* Repeat add operation for 2nd through 31th byte *)
    DEST[255:248]← SRC1[255:248] + SRC2[255:248];
```
#### VPADDW (VEX.256 encoded instruction)
```java
    DEST[15:0] ← SRC1[15:0] + SRC2[15:0];
    (* Repeat add operation for 2nd through 15th word *)
    DEST[255:240]← SRC1[255:240] + SRC2[255:240];
```
#### VPADDD (VEX.256 encoded instruction)
```java
    DEST[31:0]← SRC1[31:0]  + SRC2[31:0];
    (* Repeat add operation for 2nd and 7th doubleword *)
    DEST[255:224] ← SRC1[255:224] + SRC2[255:224];
```
#### VPADDQ (VEX.256 encoded instruction)
```java
    DEST[63:0]← SRC1[63:0]  + SRC2[63:0];
    DEST[127:64] ← SRC1[127:64] + SRC2[127:64];
    DEST[191:128]← SRC1[191:128]  + SRC2[191:128];
    DEST[255:192] ← SRC1[255:192] + SRC2[255:192];
```
#### VPADDB (EVEX encoded versions)
```java
(KL, VL) = (16, 128), (32, 256), (64, 512)
FOR j ← 0 TO KL-1
    i ← j * 8
    IF k1[j] OR *no writemask*
        THEN DEST[i+7:i] ← SRC1[i+7:i] + SRC2[i+7:i]
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
#### VPADDW (EVEX encoded versions)
```java
(KL, VL) = (8, 128), (16, 256), (32, 512)
FOR j ← 0 TO KL-1
    i ← j * 16
    IF k1[j] OR *no writemask*
        THEN DEST[i+15:i] ← SRC1[i+15:i] + SRC2[i+15:i]
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
#### VPADDD (EVEX encoded versions)
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
FOR j ← 0 TO KL-1
    i ← j * 32
    IF k1[j] OR *no writemask*
        THEN 
            IF (EVEX.b = 1) AND (SRC2 *is memory*)
                THEN DEST[i+31:i] ← SRC1[i+31:i] + SRC2[31:0]
                ELSE DEST[i+31:i] ← SRC1[i+31:i] + SRC2[i+31:i]
            FI;
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+31:i] remains unchanged*
                ELSE *zeroing-masking*
                            ; zeroing-masking
                    DEST[i+31:i] ← 0
            FI
    FI;
ENDFOR;
DEST[MAXVL-1:VL] ← 0
```
#### VPADDQ (EVEX encoded versions)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 64
    IF k1[j] OR *no writemask*
        THEN 
            IF (EVEX.b = 1) AND (SRC2 *is memory*)
                THEN DEST[i+63:i] ← SRC1[i+63:i] + SRC2[63:0]
                ELSE DEST[i+63:i] ← SRC1[i+63:i] + SRC2[i+63:i]
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
ENDFOR;
DEST[MAXVL-1:VL] ← 0
```
#### Intel C/C++ Compiler Intrinsic Equivalents
```java
VPADDB__m512i _mm512_add_epi8 ( __m512i a, __m512i b)
VPADDW__m512i _mm512_add_epi16 ( __m512i a, __m512i b)
VPADDB__m512i _mm512_mask_add_epi8 ( __m512i s, __mmask64 m, __m512i a, __m512i b)
VPADDW__m512i _mm512_mask_add_epi16 ( __m512i s, __mmask32 m, __m512i a, __m512i b)
VPADDB__m512i _mm512_maskz_add_epi8 (__mmask64 m, __m512i a, __m512i b)
VPADDW__m512i _mm512_maskz_add_epi16 (__mmask32 m, __m512i a, __m512i b)
VPADDB__m256i _mm256_mask_add_epi8 (__m256i s, __mmask32 m, __m256i a, __m256i b)
VPADDW__m256i _mm256_mask_add_epi16 (__m256i s, __mmask16 m, __m256i a, __m256i b)
VPADDB__m256i _mm256_maskz_add_epi8 (__mmask32 m, __m256i a, __m256i b)
VPADDW__m256i _mm256_maskz_add_epi16 (__mmask16 m, __m256i a, __m256i b)
VPADDB__m128i _mm_mask_add_epi8 (__m128i s, __mmask16 m, __m128i a, __m128i b)
VPADDW__m128i _mm_mask_add_epi16 (__m128i s, __mmask8 m, __m128i a, __m128i b)
VPADDB__m128i _mm_maskz_add_epi8 (__mmask16 m, __m128i a, __m128i b)
VPADDW__m128i _mm_maskz_add_epi16 (__mmask8 m, __m128i a, __m128i b)
VPADDD __m512i _mm512_add_epi32( __m512i a, __m512i b);
VPADDD __m512i _mm512_mask_add_epi32(__m512i s, __mmask16 k, __m512i a, __m512i b);
VPADDD __m512i _mm512_maskz_add_epi32( __mmask16 k, __m512i a, __m512i b);
VPADDD __m256i _mm256_mask_add_epi32(__m256i s, __mmask8 k, __m256i a, __m256i b);
VPADDD __m256i _mm256_maskz_add_epi32( __mmask8 k, __m256i a, __m256i b);
VPADDD __m128i _mm_mask_add_epi32(__m128i s, __mmask8 k, __m128i a, __m128i b);
VPADDD __m128i _mm_maskz_add_epi32( __mmask8 k, __m128i a, __m128i b);
VPADDQ __m512i _mm512_add_epi64( __m512i a, __m512i b);
VPADDQ __m512i _mm512_mask_add_epi64(__m512i s, __mmask8 k, __m512i a, __m512i b);
VPADDQ __m512i _mm512_maskz_add_epi64( __mmask8 k, __m512i a, __m512i b);
VPADDQ __m256i _mm256_mask_add_epi64(__m256i s, __mmask8 k, __m256i a, __m256i b);
VPADDQ __m256i _mm256_maskz_add_epi64( __mmask8 k, __m256i a, __m256i b);
VPADDQ __m128i _mm_mask_add_epi64(__m128i s, __mmask8 k, __m128i a, __m128i b);
VPADDQ __m128i _mm_maskz_add_epi64( __mmask8 k, __m128i a, __m128i b);
PADDB __m128i _mm_add_epi8 (__m128i a,__m128i b );
PADDW __m128i _mm_add_epi16 ( __m128i a, __m128i b);
PADDD  __m128i _mm_add_epi32 ( __m128i a, __m128i b);
PADDQ __m128i _mm_add_epi64 ( __m128i a, __m128i b);
VPADDB __m256i _mm256_add_epi8 (__m256ia,__m256i b );
VPADDW __m256i _mm256_add_epi16 ( __m256i a, __m256i b);
VPADDD __m256i _mm256_add_epi32 ( __m256i a, __m256i b);
VPADDQ __m256i _mm256_add_epi64 ( __m256i a, __m256i b);
PADDB __m64 _mm_add_pi8(__m64 m1, __m64 m2)
PADDW __m64 _mm_add_pi16(__m64 m1, __m64 m2)
PADDD __m64 _mm_add_pi32(__m64 m1, __m64 m2)
PADDQ __m64 _mm_add_si64(__m64 m1, __m64 m2)
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

Non-EVEX-encoded instruction, see Exceptions Type 4.

EVEX-encoded VPADDD/Q, see Exceptions Type E4.

EVEX-encoded VPADDB/W, see Exceptions Type E4.nb.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
