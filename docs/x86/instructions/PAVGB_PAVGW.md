<b>PAVGB / PAVGW</b> — Average Packed Integers
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F E0 /r1 PAVGB mm1, mm2/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Average packed unsigned byte integers from mm2/m64 and mm1 with rounding.</td>
	</tr>
	<tr>
		<td>66 0F E0, /r PAVGB xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Average packed unsigned byte integers from xmm2/m128 and xmm1 with rounding.</td>
	</tr>
	<tr>
		<td>NP 0F E3 /r1 PAVGW mm1, mm2/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Average packed unsigned word integers from mm2/m64 and mm1 with rounding.</td>
	</tr>
	<tr>
		<td>66 0F E3 /r PAVGW xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Average packed unsigned word integers from xmm2/m128 and xmm1 with rounding.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.WIG E0 /r VPAVGB xmm1, xmm2, xmm3/m128</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Average packed unsigned byte integers from xmm3/m128 and xmm2 with rounding.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.WIG E3 /r VPAVGW xmm1, xmm2, xmm3/m128</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Average packed unsigned word integers from xmm3/m128 and xmm2 with rounding.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F.WIG E0 /r VPAVGB ymm1, ymm2, ymm3/m256</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Average packed unsigned byte integers from ymm2, and ymm3/m256 with rounding and store to ymm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F.WIG E3 /r VPAVGW ymm1, ymm2, ymm3/m256</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Average packed unsigned word integers from ymm2, ymm3/m256 with rounding to ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F.WIG E0 /r VPAVGB xmm1 {k1}{z}, xmm2, xmm3/m128</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Average packed unsigned byte integers from xmm2, and xmm3/m128 with rounding and store to xmm1 under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F.WIG E0 /r VPAVGB ymm1 {k1}{z}, ymm2, ymm3/m256</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Average packed unsigned byte integers from ymm2, and ymm3/m256 with rounding and store to ymm1 under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F.WIG E0 /r VPAVGB zmm1 {k1}{z}, zmm2, zmm3/m512</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512BW </td>
		<td>Average packed unsigned byte integers from zmm2, and zmm3/m512 with rounding and store to zmm1 under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F.WIG E3 /r VPAVGW xmm1 {k1}{z}, xmm2, xmm3/m128</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Average packed unsigned word integers from xmm2, xmm3/m128 with rounding to xmm1 under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F.WIG E3 /r VPAVGW ymm1 {k1}{z}, ymm2, ymm3/m256</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Average packed unsigned word integers from ymm2, ymm3/m256 with rounding to ymm1 under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F.WIG E3 /r VPAVGW zmm1 {k1}{z}, zmm2, zmm3/m512</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Average packed unsigned word integers from zmm2, zmm3/m512 with rounding to zmm1 under writemask k1.</td>
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
Performs a SIMD average of the packed unsigned integers from the source operand (second operand) and the
destination operand (first operand), and stores the results in the destination operand. For each corresponding pair
of data elements in the first and second operands, the elements are added together, a 1 is added to the temporary
sum, and that result is shifted right one bit position.

The (V)PAVGB instruction operates on packed unsigned bytes and the (V)PAVGW instruction operates on packed
unsigned words.

In 64-bit mode and not encoded with VEX/EVEX, using a REX prefix in the form of REX.R permits this instruction to
access additional registers (XMM8-XMM15).

Legacy SSE instructions: The source operand can be an MMX technology register or a 64-bit memory location. The
destination operand can be an MMX technology register.

128-bit Legacy SSE version: The first source operand is an XMM register. The second operand can be an XMM
register or an 128-bit memory location. The destination is not distinct from the first source XMM register and the
upper bits (MAXVL-1:128) of the corresponding register destination are unmodified.

EVEX.512 encoded version: The first source operand is a ZMM register. The second source operand is a ZMM
register or a 512-bit memory location. The destination operand is a ZMM register.

VEX.256 and EVEX.256 encoded versions: The first source operand is a YMM register. The second source operand
is a YMM register or a 256-bit memory location. The destination operand is a YMM register.

VEX.128 and EVEX.128 encoded versions: The first source operand is an XMM register. The second source operand
is an XMM register or 128-bit memory location. The destination operand is an XMM register. The upper bits (MAXVL-
1:128) of the corresponding register destination are zeroed.

### Operation


#### PAVGB (with 64-bit operands)
```java
    DEST[7:0] ← (SRC[7:0] + DEST[7:0] + 1) >> 1; (* Temp sum before shifting is 9 bits *)
    (* Repeat operation performed for bytes 2 through 6 *)
    DEST[63:56] ← (SRC[63:56] + DEST[63:56] + 1) >> 1;
```
#### PAVGW (with 64-bit operands)
```java
    DEST[15:0] ← (SRC[15:0] + DEST[15:0] + 1) >> 1; (* Temp sum before shifting is 17 bits *)
    (* Repeat operation performed for words 2 and 3 *)
    DEST[63:48] ← (SRC[63:48] + DEST[63:48] + 1) >> 1;
```
#### PAVGB (with 128-bit operands)
```java
    DEST[7:0] ← (SRC[7:0] + DEST[7:0] + 1) >> 1; (* Temp sum before shifting is 9 bits *)
    (* Repeat operation performed for bytes 2 through 14 *)
    DEST[127:120] ← (SRC[127:120] + DEST[127:120] + 1) >> 1;
```
#### PAVGW (with 128-bit operands)
```java
    DEST[15:0] ← (SRC[15:0] + DEST[15:0] + 1) >> 1; (* Temp sum before shifting is 17 bits *)
    (* Repeat operation performed for words 2 through 6 *)
    DEST[127:112] ← (SRC[127:112] + DEST[127:112] + 1) >> 1;
```
#### VPAVGB (VEX.128 encoded version)
```java
    DEST[7:0] ← (SRC1[7:0] + SRC2[7:0] + 1) >> 1; 
    (* Repeat operation performed for bytes 2 through 15 *)
    DEST[127:120] ← (SRC1[127:120] + SRC2[127:120] + 1) >> 1
    DEST[MAXVL-1:128] ← 0
```
#### VPAVGW (VEX.128 encoded version)
```java
    DEST[15:0] ← (SRC1[15:0] + SRC2[15:0] + 1) >> 1; 
    (* Repeat operation performed for 16-bit words 2 through 7 *)
    DEST[127:112] ← (SRC1[127:112] + SRC2[127:112] + 1) >> 1
    DEST[MAXVL-1:128] ← 0
```
#### VPAVGB (VEX.256 encoded instruction)
```java
    DEST[7:0] ← (SRC1[7:0] + SRC2[7:0] + 1) >> 1; (* Temp sum before shifting is 9 bits *)
    (* Repeat operation performed for bytes 2 through 31)
    DEST[255:248] ← (SRC1[255:248] + SRC2[255:248] + 1) >> 1;
```
#### VPAVGW (VEX.256 encoded instruction)
```java
    DEST[15:0] ← (SRC1[15:0] + SRC2[15:0] + 1) >> 1; (* Temp sum before shifting is 17 bits *)
    (* Repeat operation performed for words 2 through 15)
    DEST[255:14]) ← (SRC1[255:240] + SRC2[255:240] + 1) >> 1;
VPAVGB (EVEX encoded versions)
(KL, VL) = (16, 128), (32, 256), (64, 512)
FOR j ← 0 TO KL-1
    i ← j * 8
    IF k1[j] OR *no writemask*
        THEN DEST[i+7:i] ← (SRC1[i+7:i] + SRC2[i+7:i] + 1) >> 1; (* Temp sum before shifting is 9 bits *)
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
#### VPAVGW (EVEX encoded versions)
```java
(KL, VL) = (8, 128), (16, 256), (32, 512)
FOR j ← 0 TO KL-1
    i ← j * 16
    IF k1[j] OR *no writemask*
        THEN DEST[i+15:i] ← (SRC1[i+15:i] + SRC2[i+15:i] + 1) >> 1
                            ; (* Temp sum before shifting is 17 bits *)
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
VPAVGB __m512i _mm512_avg_epu8( __m512i a, __m512i b);
VPAVGW __m512i _mm512_avg_epu16( __m512i a, __m512i b);
VPAVGB __m512i _mm512_mask_avg_epu8(__m512i s, __mmask64 m, __m512i a, __m512i b);
VPAVGW __m512i _mm512_mask_avg_epu16(__m512i s, __mmask32 m, __m512i a, __m512i b);
VPAVGB __m512i _mm512_maskz_avg_epu8( __mmask64 m, __m512i a, __m512i b);
VPAVGW __m512i _mm512_maskz_avg_epu16( __mmask32 m, __m512i a, __m512i b);
VPAVGB __m256i _mm256_mask_avg_epu8(__m256i s, __mmask32 m, __m256i a, __m256i b);
VPAVGW __m256i _mm256_mask_avg_epu16(__m256i s, __mmask16 m, __m256i a, __m256i b);
VPAVGB __m256i _mm256_maskz_avg_epu8( __mmask32 m, __m256i a, __m256i b);
VPAVGW __m256i _mm256_maskz_avg_epu16( __mmask16 m, __m256i a, __m256i b);
VPAVGB __m128i _mm_mask_avg_epu8(__m128i s, __mmask16 m, __m128i a, __m128i b);
VPAVGW __m128i _mm_mask_avg_epu16(__m128i s, __mmask8 m, __m128i a, __m128i b);
VPAVGB __m128i _mm_maskz_avg_epu8( __mmask16 m, __m128i a, __m128i b);
VPAVGW __m128i _mm_maskz_avg_epu16( __mmask8 m, __m128i a, __m128i b);
PAVGB: __m64 _mm_avg_pu8 (__m64 a, __m64 b)
PAVGW: __m64 _mm_avg_pu16 (__m64 a, __m64 b)
(V)PAVGB: __m128i _mm_avg_epu8 ( __m128i a, __m128i b)
(V)PAVGW: __m128i _mm_avg_epu16 ( __m128i a, __m128i b)
VPAVGB:
                __m256i _mm256_avg_epu8 ( __m256i a, __m256i b)
VPAVGW:
                __m256i _mm256_avg_epu16 ( __m256i a, __m256i b)
```
### Flags Affected
None.

### Numeric Exceptions

None.

### Other Exceptions

Non-EVEX-encoded instruction, see Exceptions Type 4.
EVEX-encoded instruction, see Exceptions Type E4.nb.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
