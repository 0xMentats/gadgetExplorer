<b>PSHUFB</b> —  Packed Shuffle Bytes
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 38 00 /r1 PSHUFB mm1, mm2/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSSE3</td>
		<td>Shuffle bytes in mm1 according to contents of mm2/m64.</td>
	</tr>
	<tr>
		<td>66 0F 38 00 /r PSHUFB xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSSE3</td>
		<td>Shuffle bytes in xmm1 according to contents of xmm2/m128.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F38.WIG 00 /r VPSHUFB xmm1, xmm2, xmm3/m128</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Shuffle bytes in xmm2 according to contents of xmm3/m128.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F38.WIG 00 /r VPSHUFB ymm1, ymm2, ymm3/m256</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Shuffle bytes in ymm2 according to contents of ymm3/m256.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F38.WIG 00 /r VPSHUFB xmm1 {k1}{z}, xmm2, xmm3/m128</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Shuffle bytes in xmm2 according to contents of xmm3/m128 under write mask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F38.WIG 00 /r VPSHUFB ymm1 {k1}{z}, ymm2, ymm3/m256</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Shuffle bytes in ymm2 according to contents of ymm3/m256 under write mask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F38.WIG 00 /r VPSHUFB zmm1 {k1}{z}, zmm2, zmm3/m512</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Shuffle bytes in zmm2 according to contents of zmm3/m512 under write mask k1.</td>
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
PSHUFB performs in-place shuffles of bytes in the destination operand (the first operand) according to the shuffle
control mask in the source operand (the second operand). The instruction permutes the data in the destination
operand, leaving the shuffle mask unaffected. If the most significant bit (bit[7]) of each byte of the shuffle control
mask is set, then constant zero is written in the result byte. Each byte in the shuffle control mask forms an index
to permute the corresponding byte in the destination operand. The value of each index is the least significant 4 bits
(128-bit operation) or 3 bits (64-bit operation) of the shuffle control byte. When the source operand is a 128-bit
memory operand, the operand must be aligned on a 16-byte boundary or a general-protection exception (\#GP) will
be generated.

In 64-bit mode and not encoded with VEX/EVEX, use the REX prefix to access XMM8-XMM15 registers.

Legacy SSE version 64-bit operand: Both operands can be MMX registers.

128-bit Legacy SSE version: The first source operand and the destination operand are the same. Bits (MAXVL-
1:128) of the corresponding YMM destination register remain unchanged.

VEX.128 encoded version: The destination operand is the first operand, the first source operand is the second
operand, the second source operand is the third operand. Bits (MAXVL-1:128) of the destination YMM register are
zeroed.

VEX.256 encoded version: Bits (255:128) of the destination YMM register stores the 16-byte shuffle result of the
upper 16 bytes of the first source operand, using the upper 16-bytes of the second source operand as control mask.
The value of each index is for the high 128-bit lane is the least significant 4 bits of the respective shuffle control
byte. The index value selects a source data element within each 128-bit lane.

EVEX encoded version: The second source operand is an ZMM/YMM/XMM register or an 512/256/128-bit memory
location. The first source operand and destination operands are ZMM/YMM/XMM registers. The destination is condi-
tionally updated with writemask k1.

EVEX and VEX encoded version: Four/two in-lane 128-bit shuffles.

### Operation


#### PSHUFB (with 64 bit operands)
```java
TEMP ← DEST
for i = 0 to 7 { 
    if (SRC[(i * 8)+7] = 1 ) then
        DEST[(i*8)+7...(i*8)+0] ← 0;
    else 
        index[2..0] ← SRC[(i*8)+2 .. (i*8)+0];
        DEST[(i*8)+7...(i*8)+0] ← TEMP[(index*8+7)..(index*8+0)];
    endif;
}
```
#### PSHUFB (with 128 bit operands)
```java
TEMP ← DEST
for i = 0 to 15 { 
    if (SRC[(i * 8)+7] = 1 ) then
        DEST[(i*8)+7..(i*8)+0] ← 0;
     else 
        index[3..0] ← SRC[(i*8)+3 .. (i*8)+0];
        DEST[(i*8)+7..(i*8)+0] ← TEMP[(index*8+7)..(index*8+0)];
    endif
}
```
#### VPSHUFB (VEX.128 encoded version)
```java
for i = 0 to 15 {
    if (SRC2[(i * 8)+7] = 1) then
        DEST[(i*8)+7..(i*8)+0] ← 0;
        else
        index[3..0] ← SRC2[(i*8)+3 .. (i*8)+0];
        DEST[(i*8)+7..(i*8)+0] ← SRC1[(index*8+7)..(index*8+0)];
    endif
}
DEST[MAXVL-1:128] ← 0
```
#### VPSHUFB (VEX.256 encoded version)
```java
for i = 0 to 15 {
    if (SRC2[(i * 8)+7] == 1 ) then
        DEST[(i*8)+7..(i*8)+0] ← 0;
        else
        index[3..0] ← SRC2[(i*8)+3 .. (i*8)+0];
        DEST[(i*8)+7..(i*8)+0] ← SRC1[(index*8+7)..(index*8+0)];
    endif
    if (SRC2[128 + (i * 8)+7] == 1 ) then
        DEST[128 + (i*8)+7..(i*8)+0] ← 0;
        else
        index[3..0] ← SRC2[128 + (i*8)+3 .. (i*8)+0];
        DEST[128 + (i*8)+7..(i*8)+0] ← SRC1[128 + (index*8+7)..(index*8+0)];
    endif
}
```
#### VPSHUFB (EVEX encoded versions)
```java
(KL, VL) = (16, 128), (32, 256), (64, 512)
jmask ← (KL-1) & ~0xF 
                            // 0x00, 0x10, 0x30 depending on the VL
FOR j = 0 TO KL-1
                            // dest
    IF kl[ i ] or no_masking
        index ← src.byte[ j ];
        IF index & 0x80
            Dest.byte[ j ] ← 0;
        ELSE
            index ← (index & 0xF) + (j & jmask);
                            // 16-element in-lane lookup
            Dest.byte[ j ] ← src.byte[ index ];
    ELSE if zeroing
        Dest.byte[ j ] ← 0;
DEST[MAXVL-1:VL] ← 0;
<table>
	<tr>
		<td><b>07H         07H              FFH               80H               01H           00H               00H            00H MM2 04H         01H              07H               03H               02H           02H               FFH            01H MM1 04H         04H              00H               00H               FFH           01H               01H            01H MM1</b></td>
	</tr>
</table>

```
#### Figure 4-15.  PSHUFB with 64-Bit Operands
```java
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPSHUFB __m512i _mm512_shuffle_epi8(__m512i a, __m512i b);
VPSHUFB __m512i _mm512_mask_shuffle_epi8(__m512i s, __mmask64 k, __m512i a, __m512i b);
VPSHUFB __m512i _mm512_maskz_shuffle_epi8( __mmask64 k, __m512i a, __m512i b);
VPSHUFB __m256i _mm256_mask_shuffle_epi8(__m256i s, __mmask32 k, __m256i a, __m256i b);
VPSHUFB __m256i _mm256_maskz_shuffle_epi8( __mmask32 k, __m256i a, __m256i b);
VPSHUFB __m128i _mm_mask_shuffle_epi8(__m128i s, __mmask16 k, __m128i a, __m128i b);
VPSHUFB __m128i _mm_maskz_shuffle_epi8( __mmask16 k, __m128i a, __m128i b);
PSHUFB: __m64 _mm_shuffle_pi8 (__m64 a, __m64 b)
(V)PSHUFB: __m128i _mm_shuffle_epi8 (__m128i a, __m128i b)
VPSHUFB:__m256i _mm256_shuffle_epi8(__m256i a, __m256i b)
```
### SIMD Floating-Point Exceptions
None.

### Other Exceptions
Non-EVEX-encoded instruction, see Exceptions Type 4.
EVEX-encoded instruction, see Exceptions Type E4NF.nb.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
