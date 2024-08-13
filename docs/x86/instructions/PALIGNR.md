<b>PALIGNR</b> —  Packed Align Right
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 3A 0F /r ib1 PALIGNR mm1, mm2/m64, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSSE3</td>
		<td>Concatenate destination and source operands, extract byte-aligned result shifted to the right by constant value in imm8 into mm1.</td>
	</tr>
	<tr>
		<td>66 0F 3A 0F /r ib PALIGNR xmm1, xmm2/m128, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSSE3</td>
		<td>Concatenate destination and source operands, extract byte-aligned result shifted to the right by constant value in imm8 into xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F3A.WIG 0F /r ib VPALIGNR xmm1, xmm2, xmm3/m128, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Concatenate xmm2 and xmm3/m128, extract byte aligned result shifted to the right by constant value in imm8 and result is stored in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F3A.WIG 0F /r ib VPALIGNR ymm1, ymm2, ymm3/m256, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Concatenate pairs of 16 bytes in ymm2 and ymm3/m256 into 32-byte intermediate result, extract byte-aligned, 16-byte result shifted to the right by constant values in imm8 from each intermediate result, and two 16-byte results are stored in ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F3A.WIG 0F /r ib VPALIGNR xmm1 {k1}{z}, xmm2, xmm3/m128, imm8</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Concatenate xmm2 and xmm3/m128 into a 32- byte intermediate result, extract byte aligned result shifted to the right by constant value in imm8 and result is stored in xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F3A.WIG 0F /r ib VPALIGNR ymm1 {k1}{z}, ymm2, ymm3/m256, imm8</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Concatenate pairs of 16 bytes in ymm2 and ymm3/m256 into 32-byte intermediate result, extract byte-aligned, 16-byte result shifted to the right by constant values in imm8 from each intermediate result, and two 16-byte results are stored in ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F3A.WIG 0F /r ib VPALIGNR zmm1 {k1}{z}, zmm2, zmm3/m512, imm8</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Concatenate pairs of 16 bytes in zmm2 and zmm3/m512 into 32-byte intermediate result, extract byte-aligned, 16-byte result shifted to the right by constant values in imm8 from each intermediate result, and four 16-byte results are stored in zmm1.</td>
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
		<td>imm8</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>B</td>
		<td>NA</td>
		<td>ModRM:reg (w)</td>
		<td>VEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8</td>
	</tr>
	<tr>
		<td>C</td>
		<td>Full Mem</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8</td>
	</tr>
</table>


### Description
(V)PALIGNR concatenates the destination operand (the first operand) and the source operand (the second
operand) into an intermediate composite, shifts the composite at byte granularity to the right by a constant imme-
diate, and extracts the right-aligned result into the destination. The first and the second operands can be an MMX,
XMM or a YMM register. The immediate value is considered unsigned. Immediate shift counts larger than the 2L
(i.e. 32 for 128-bit operands, or 16 for 64-bit operands) produce a zero result. Both operands can be MMX registers
, XMM registers or YMM registers. When the source operand is a 128-bit memory operand, the operand must
be aligned on a 16-byte boundary or a general-protection exception (\#GP) will be generated.

In 64-bit mode and not encoded by VEX/EVEX prefix, use the REX prefix to access additional registers.

128-bit Legacy SSE version: Bits (MAXVL-1:128) of the corresponding YMM destination register remain unchanged.

EVEX.512 encoded version: The first source operand is a ZMM register and contains four 16-byte blocks. The
second source operand is a ZMM register or a 512-bit memory location containing four 16-byte block. The destination
 operand is a ZMM register and contain four 16-byte results. The imm8[7:0] is the common shift count

used for each of the four successive 16-byte block sources. The low 16-byte block of the two source operands
produce the low 16-byte result of the destination operand, the high 16-byte block of the two source operands
produce the high 16-byte result of the destination operand and so on for the blocks in the middle.

VEX.256 and EVEX.256 encoded versions: The first source operand is a YMM register and contains two 16-byte
blocks. The second source operand is a YMM register or a 256-bit memory location containing two 16-byte block.
The destination operand is a YMM register and contain two 16-byte results. The imm8[7:0] is the common shift
count used for the two lower 16-byte block sources and the two upper 16-byte block sources. The low 16-byte
block of the two source operands produce the low 16-byte result of the destination operand, the high 16-byte block
of the two source operands produce the high 16-byte result of the destination operand. The upper bits (MAXVL-
1:256) of the corresponding ZMM register destination are zeroed.

VEX.128 and EVEX.128 encoded versions: The first source operand is an XMM register. The second source operand
is an XMM register or 128-bit memory location. The destination operand is an XMM register. The upper bits (MAXVL-
1:128) of the corresponding ZMM register destination are zeroed.

Concatenation is done with 128-bit data in the first and second source operand for both 128-bit and 256-bit
instructions. The high 128-bits of the intermediate composite 256-bit result came from the 128-bit data from the
first source operand; the low 128-bits of the intermediate result came from the 128-bit data of the second source
operand.

Note: VEX.L must be 0, otherwise the instruction will \#UD.

0
127
0
127
<table>
	<tr>
		<td><b></b></td>
		<td><b></b></td>
		<td colspan=2><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td colspan=2><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
	</tr>
</table>

<table>
</table>

128
255
128
255
<table>
	<tr>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
	</tr>
</table>

<table>
</table>

127
0
128
255
<table>
	<tr>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
	</tr>
</table>

Figure 4-7.  256-bit VPALIGN Instruction Operation

### Operation


#### PALIGNR (with 64-bit operands)
```java
    temp1[127:0] = CONCATENATE(DEST,SRC)>>(imm8*8) 
    DEST[63:0] = temp1[63:0] 
```
#### PALIGNR (with 128-bit operands)
```java
temp1[255:0] ← ((DEST[127:0] << 128) OR SRC[127:0])>>(imm8*8);
DEST[127:0] ← temp1[127:0]
DEST[MAXVL-1:128] (Unmodified)
```
#### VPALIGNR (VEX.128 encoded version)
```java
temp1[255:0] ← ((SRC1[127:0] << 128) OR SRC2[127:0])>>(imm8*8);
DEST[127:0] ← temp1[127:0]
DEST[MAXVL-1:128] ← 0
```
#### VPALIGNR (VEX.256 encoded version)
```java
temp1[255:0] ← ((SRC1[127:0] << 128) OR SRC2[127:0])>>(imm8[7:0]*8);
DEST[127:0] ← temp1[127:0]
temp1[255:0] ← ((SRC1[255:128] << 128) OR SRC2[255:128])>>(imm8[7:0]*8);
DEST[MAXVL-1:128] ← temp1[127:0]
```
#### VPALIGNR (EVEX encoded versions)
```java
(KL, VL) = (16, 128), (32, 256), (64, 512)
FOR l ← 0 TO VL-1 with increments of 128
    temp1[255:0] ← ((SRC1[l+127:l] << 128) OR SRC2[l+127:l])>>(imm8[7:0]*8);
    TMP_DEST[l+127:l] ← temp1[127:0]
ENDFOR;
FOR j ← 0 TO KL-1
    i ← j * 8
    IF k1[j] OR *no writemask*
        THEN DEST[i+7:i] ← TMP_DEST[i+7:i]
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
#### Intel C/C++ Compiler Intrinsic Equivalents
```java
PALIGNR:
                 __m64 _mm_alignr_pi8 (__m64 a, __m64 b, int n)
(V)PALIGNR:
                 __m128i _mm_alignr_epi8 (__m128i a, __m128i b, int n)
VPALIGNR:
                 __m256i _mm256_alignr_epi8 (__m256i a, __m256i b, const int n)
VPALIGNR __m512i _mm512_alignr_epi8 (__m512i a, __m512i b, const int n)
VPALIGNR __m512i _mm512_mask_alignr_epi8 (__m512i s, __mmask64 m, __m512i a, __m512i b, const int n)
VPALIGNR __m512i _mm512_maskz_alignr_epi8 ( __mmask64 m, __m512i a, __m512i b, const int n)
VPALIGNR __m256i _mm256_mask_alignr_epi8 (__m256i s, __mmask32 m, __m256i a, __m256i b, const int n)
VPALIGNR __m256i _mm256_maskz_alignr_epi8 (__mmask32 m, __m256i a, __m256i b, const int n)
VPALIGNR __m128i _mm_mask_alignr_epi8 (__m128i s, __mmask16 m, __m128i a, __m128i b, const int n)
VPALIGNR __m128i _mm_maskz_alignr_epi8 (__mmask16 m, __m128i a, __m128i b, const int n)
```
### SIMD Floating-Point Exceptions
None.

### Other Exceptions
Non-EVEX-encoded instruction, see Exceptions Type 4.

EVEX-encoded instruction, see Exceptions Type E4NF.nb.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
