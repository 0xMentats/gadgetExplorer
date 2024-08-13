<b>PSHUFHW</b> — Shuffle Packed High Words
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F3 0F 70 /r ib PSHUFHW xmm1, xmm2/m128, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Shuffle the high words in xmm2/m128 based on the encoding in imm8 and store the result in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.F3.0F.WIG 70 /r ib VPSHUFHW xmm1, xmm2/m128, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Shuffle the high words in xmm2/m128 based on the encoding in imm8 and store the result in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.256.F3.0F.WIG 70 /r ib VPSHUFHW ymm1, ymm2/m256, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Shuffle the high words in ymm2/m256 based on the encoding in imm8 and store the result in ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.128.F3.0F.WIG 70 /r ib VPSHUFHW xmm1 {k1}{z}, xmm2/m128, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Shuffle the high words in xmm2/m128 based on the encoding in imm8 and store the result in xmm1 under write mask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.F3.0F.WIG 70 /r ib VPSHUFHW ymm1 {k1}{z}, ymm2/m256, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Shuffle the high words in ymm2/m256 based on the encoding in imm8 and store the result in ymm1 under write mask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.F3.0F.WIG 70 /r ib VPSHUFHW zmm1 {k1}{z}, zmm2/m512, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Shuffle the high words in zmm2/m512 based on the encoding in imm8 and store the result in zmm1 under write mask k1.</td>
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
		<td>NA</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>B</td>
		<td>Full Mem</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>Imm8</td>
		<td>NA</td>
	</tr>
</table>


### Description
Copies words from the high quadword of a 128-bit lane of the source operand and inserts them in the high quad-
word of the destination operand at word locations (of the respective lane) selected with the immediate operand.
This 256-bit operation is similar to the in-lane operation used by the 256-bit VPSHUFD instruction, which is illus-
trated in Figure 4-16. For 128-bit operation, only the low 128-bit lane is operative. Each 2-bit field in the immediate
operand selects the contents of one word location in the high quadword of the destination operand. The binary
encodings of the immediate operand fields select words (0, 1, 2 or 3, 4) from the high quadword of the source
operand to be copied to the destination operand. The low quadword of the source operand is copied to the low
quadword of the destination operand, for each 128-bit lane.

Note that this instruction permits a word in the high quadword of the source operand to be copied to more than one
word location in the high quadword of the destination operand.

In 64-bit mode and not encoded with VEX/EVEX, using a REX prefix in the form of REX.R permits this instruction to
access additional registers (XMM8-XMM15).

128-bit Legacy SSE version: The destination operand is an XMM register. The source operand can be an XMM
register or a 128-bit memory location. Bits (MAXVL-1:128) of the corresponding YMM destination register remain
unchanged.

VEX.128 encoded version: The destination operand is an XMM register. The source operand can be an XMM register
or a 128-bit memory location. Bits (MAXVL-1:128) of the destination YMM register are zeroed. VEX.vvvv is
reserved and must be 1111b, VEX.L must be 0, otherwise the instruction will \#UD.

VEX.256 encoded version: The destination operand is an YMM register. The source operand can be an YMM register
or a 256-bit memory location.
EVEX encoded version: The destination operand is a ZMM/YMM/XMM registers. The source operand can be a
ZMM/YMM/XMM register, a 512/256/128-bit memory location. The destination is updated according to the
writemask.

Note: In VEX encoded versions, VEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.

### Operation


#### PSHUFHW (128-bit Legacy SSE version)
```java
DEST[63:0] ← SRC[63:0]
DEST[79:64] ← (SRC >> (imm[1:0] *16))[79:64]
DEST[95:80] ← (SRC >> (imm[3:2] * 16))[79:64]
DEST[111:96] ← (SRC >> (imm[5:4] * 16))[79:64]
DEST[127:112] ← (SRC >> (imm[7:6] * 16))[79:64]
DEST[MAXVL-1:128] (Unmodified)
```
#### VPSHUFHW (VEX.128 encoded version)
```java
DEST[63:0] ← SRC1[63:0]
DEST[79:64] ← (SRC1 >> (imm[1:0] *16))[79:64]
DEST[95:80] ← (SRC1 >> (imm[3:2] * 16))[79:64]
DEST[111:96] ← (SRC1 >> (imm[5:4] * 16))[79:64]
DEST[127:112] ← (SRC1 >> (imm[7:6] * 16))[79:64]
DEST[MAXVL-1:128] ← 0
```
#### VPSHUFHW (VEX.256 encoded version)
```java
DEST[63:0] ← SRC1[63:0]
DEST[79:64] ← (SRC1 >> (imm[1:0] *16))[79:64]
DEST[95:80] ← (SRC1 >> (imm[3:2] * 16))[79:64]
DEST[111:96] ← (SRC1 >> (imm[5:4] * 16))[79:64]
DEST[127:112] ← (SRC1 >> (imm[7:6] * 16))[79:64]
DEST[191:128] ← SRC1[191:128]
DEST[207192] ← (SRC1 >> (imm[1:0] *16))[207:192]
DEST[223:208] ← (SRC1 >> (imm[3:2] * 16))[207:192]
DEST[239:224] ← (SRC1 >> (imm[5:4] * 16))[207:192]
DEST[255:240] ← (SRC1 >> (imm[7:6] * 16))[207:192]
DEST[MAXVL-1:256] ← 0
```
#### VPSHUFHW (EVEX encoded versions)
```java
(KL, VL) = (8, 128), (16, 256), (32, 512)
IF VL >= 128
    TMP_DEST[63:0] ← SRC1[63:0]
    TMP_DEST[79:64] ← (SRC1 >> (imm[1:0] *16))[79:64]
    TMP_DEST[95:80] ← (SRC1 >> (imm[3:2] * 16))[79:64]
    TMP_DEST[111:96] ← (SRC1 >> (imm[5:4] * 16))[79:64]
    TMP_DEST[127:112] ← (SRC1 >> (imm[7:6] * 16))[79:64]
FI;
IF VL >= 256
    TMP_DEST[191:128] ← SRC1[191:128]
    TMP_DEST[207:192] ← (SRC1 >> (imm[1:0] *16))[207:192]
    TMP_DEST[223:208] ← (SRC1 >> (imm[3:2] * 16))[207:192]
    TMP_DEST[239:224] ← (SRC1 >> (imm[5:4] * 16))[207:192]
    TMP_DEST[255:240] ← (SRC1 >> (imm[7:6] * 16))[207:192]
FI;
IF VL >= 512
    TMP_DEST[319:256] ← SRC1[319:256]
    TMP_DEST[335:320] ← (SRC1 >> (imm[1:0] *16))[335:320]
    TMP_DEST[351:336] ← (SRC1 >> (imm[3:2] * 16))[335:320]
    TMP_DEST[367:352] ← (SRC1 >> (imm[5:4] * 16))[335:320]
    TMP_DEST[383:368] ← (SRC1 >> (imm[7:6] * 16))[335:320]
    TMP_DEST[447:384] ← SRC1[447:384]
    TMP_DEST[463:448] ← (SRC1 >> (imm[1:0] *16))[463:448]
    TMP_DEST[479:464] ← (SRC1 >> (imm[3:2] * 16))[463:448]
    TMP_DEST[495:480] ← (SRC1 >> (imm[5:4] * 16))[463:448]
    TMP_DEST[511:496] ← (SRC1 >> (imm[7:6] * 16))[463:448]
FI;
FOR j ← 0 TO KL-1
    i ← j * 16
    IF k1[j] OR *no writemask*
        THEN DEST[i+15:i] ← TMP_DEST[i+15:i];
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+15:i] remains unchanged*
                ELSE *zeroing-masking*
                            ; zeroing-masking
                    DEST[i+15:i] ← 0
            FI
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0 
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPSHUFHW __m512i _mm512_shufflehi_epi16(__m512i a, int n);
VPSHUFHW __m512i _mm512_mask_shufflehi_epi16(__m512i s, __mmask16 k, __m512i a, int n );
VPSHUFHW __m512i _mm512_maskz_shufflehi_epi16( __mmask16 k, __m512i a, int n );
VPSHUFHW __m256i _mm256_mask_shufflehi_epi16(__m256i s, __mmask8 k, __m256i a, int n );
VPSHUFHW __m256i _mm256_maskz_shufflehi_epi16( __mmask8 k, __m256i a, int n );
VPSHUFHW __m128i _mm_mask_shufflehi_epi16(__m128i s, __mmask8 k, __m128i a, int n );
VPSHUFHW __m128i _mm_maskz_shufflehi_epi16( __mmask8 k, __m128i a, int n );
(V)PSHUFHW:__m128i _mm_shufflehi_epi16(__m128i a, int n)
VPSHUFHW:__m256i _mm256_shufflehi_epi16(__m256i a, const int n)
```
### Flags Affected
None.

### SIMD Floating-Point Exceptions

None.

### Other Exceptions

Non-EVEX-encoded instruction, see Exceptions Type 4;
EVEX-encoded instruction, see Exceptions Type E4NF.nb
<p>#UD
If VEX.vvvv != 1111B, or EVEX.vvvv != 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
