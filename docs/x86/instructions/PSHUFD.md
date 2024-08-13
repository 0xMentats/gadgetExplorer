<b>PSHUFD</b> — Shuffle Packed Doublewords
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 70 /r ib PSHUFD xmm1, xmm2/m128, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Shuffle the doublewords in xmm2/m128 based on the encoding in imm8 and store the result in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F.WIG 70 /r ib VPSHUFD xmm1, xmm2/m128, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Shuffle the doublewords in xmm2/m128 based on the encoding in imm8 and store the result in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.256.66.0F.WIG 70 /r ib VPSHUFD ymm1, ymm2/m256, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Shuffle the doublewords in ymm2/m256 based on the encoding in imm8 and store the result in ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F.W0 70 /r ib VPSHUFD xmm1 {k1}{z}, xmm2/m128/m32bcst, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Shuffle the doublewords in xmm2/m128/m32bcst based on the encoding in imm8 and store the result in xmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F.W0 70 /r ib VPSHUFD ymm1 {k1}{z}, ymm2/m256/m32bcst, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Shuffle the doublewords in ymm2/m256/m32bcst based on the encoding in imm8 and store the result in ymm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F.W0 70 /r ib VPSHUFD zmm1 {k1}{z}, zmm2/m512/m32bcst, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Shuffle the doublewords in zmm2/m512/m32bcst based on the encoding in imm8 and store the result in zmm1 using writemask k1.</td>
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
		<td>Full</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>Imm8</td>
		<td>NA</td>
	</tr>
</table>


### Description
Copies doublewords from source operand (second operand) and inserts them in the destination operand (first
operand) at the locations selected with the order operand (third operand). Figure 4-16 shows the operation of the
256-bit VPSHUFD instruction and the encoding of the order operand. Each 2-bit field in the order operand selects
the contents of one doubleword location within a 128-bit lane and copy to the target element in the destination
operand. For example, bits 0 and 1 of the order operand targets the first doubleword element in the low and high
128-bit lane of the destination operand for 256-bit VPSHUFD. The encoded value of bits 1:0 of the order operand
(see the field encoding in Figure 4-16) determines which doubleword element (from the respective 128-bit lane) of
the source operand will be copied to doubleword 0 of the destination operand.

For 128-bit operation, only the low 128-bit lane are operative. The source operand can be an XMM register or a
128-bit memory location. The destination operand is an XMM register. The order operand is an 8-bit immediate.
Note that this instruction permits a doubleword in the source operand to be copied to more than one doubleword
location in the destination operand.
<table>
	<tr>
		<td><b>X7</b></td>
		<td><b>X6</b></td>
		<td><b>X5</b></td>
		<td><b>X4</b></td>
		<td><b>X3</b></td>
		<td><b>X2</b></td>
		<td><b>X1</b></td>
		<td><b>X0</b></td>
	</tr>
</table>

<table>
	<tr>
		<td><b>Y7</b></td>
		<td><b>Y6</b></td>
		<td><b>Y5</b></td>
		<td><b>Y4</b></td>
		<td><b>Y3</b></td>
		<td><b>Y2</b></td>
		<td><b>Y1</b></td>
		<td><b>Y0</b></td>
	</tr>
</table>

<table>
	<tr>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
	</tr>
</table>

11B - X3
Operand

Figure 4-16.  256-bit VPSHUFD Instruction Operation

The source operand can be an XMM register or a 128-bit memory location. The destination operand is an XMM
register. The order operand is an 8-bit immediate. Note that this instruction permits a doubleword in the source
operand to be copied to more than one doubleword location in the destination operand.

In 64-bit mode and not encoded in VEX/EVEX, using REX.R permits this instruction to access XMM8-XMM15.

128-bit Legacy SSE version: Bits (MAXVL-1:128) of the corresponding YMM destination register remain
unchanged.

VEX.128 encoded version: The source operand can be an XMM register or a 128-bit memory location. The destination
 operand is an XMM register. Bits (MAXVL-1:128) of the corresponding ZMM register are zeroed.

VEX.256 encoded version: The source operand can be an YMM register or a 256-bit memory location. The destination
 operand is an YMM register. Bits (MAXVL-1:256) of the corresponding ZMM register are zeroed. Bits (255-
1:128) of the destination stores the shuffled results of the upper 16 bytes of the source operand using the imme-
diate byte as the order operand.

EVEX encoded version: The source operand can be an ZMM/YMM/XMM register, a 512/256/128-bit memory location
, or a 512/256/128-bit vector broadcasted from a 32-bit memory location. The destination operand is a
ZMM/YMM/XMM register updated according to the writemask.

Each 128-bit lane of the destination stores the shuffled results of the respective lane of the source operand using
the immediate byte as the order operand.

Note: EVEX.vvvv and VEX.vvvv are reserved and must be 1111b otherwise instructions will \#UD.

### Operation


#### PSHUFD (128-bit Legacy SSE version)
```java
DEST[31:0] ← (SRC >> (ORDER[1:0] * 32))[31:0];
DEST[63:32] ← (SRC >> (ORDER[3:2] * 32))[31:0];
DEST[95:64] ← (SRC >> (ORDER[5:4] * 32))[31:0];
DEST[127:96] ← (SRC >> (ORDER[7:6] * 32))[31:0];
DEST[MAXVL-1:128] (Unmodified)
```
#### VPSHUFD (VEX.128 encoded version)
```java
DEST[31:0] ← (SRC >> (ORDER[1:0] * 32))[31:0];
DEST[63:32] ← (SRC >> (ORDER[3:2] * 32))[31:0];
DEST[95:64] ← (SRC >> (ORDER[5:4] * 32))[31:0];
DEST[127:96] ← (SRC >> (ORDER[7:6] * 32))[31:0];
DEST[MAXVL-1:128] ← 0
```
#### VPSHUFD (VEX.256 encoded version)
```java
DEST[31:0] ← (SRC[127:0] >> (ORDER[1:0] * 32))[31:0];
DEST[63:32] ← (SRC[127:0] >> (ORDER[3:2] * 32))[31:0];
DEST[95:64] ← (SRC[127:0] >> (ORDER[5:4] * 32))[31:0];
DEST[127:96] ← (SRC[127:0] >> (ORDER[7:6] * 32))[31:0];
DEST[159:128] ← (SRC[255:128] >> (ORDER[1:0] * 32))[31:0];
DEST[191:160] ← (SRC[255:128] >> (ORDER[3:2] * 32))[31:0];
DEST[223:192] ← (SRC[255:128] >> (ORDER[5:4] * 32))[31:0];
DEST[255:224] ← (SRC[255:128] >> (ORDER[7:6] * 32))[31:0];
DEST[MAXVL-1:256] ← 0
```
#### VPSHUFD (EVEX encoded versions)
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
FOR j ← 0 TO KL-1
    i ← j * 32
    IF (EVEX.b = 1) AND (SRC *is memory*)
        THEN TMP_SRC[i+31:i] ← SRC[31:0]
        ELSE TMP_SRC[i+31:i] ← SRC[i+31:i]
    FI;
ENDFOR;
IF VL >= 128
    TMP_DEST[31:0] ← (TMP_SRC[127:0] >> (ORDER[1:0] * 32))[31:0];
    TMP_DEST[63:32] ← (TMP_SRC[127:0] >> (ORDER[3:2] * 32))[31:0];
    TMP_DEST[95:64] ← (TMP_SRC[127:0] >> (ORDER[5:4] * 32))[31:0];
    TMP_DEST[127:96] ← (TMP_SRC[127:0] >> (ORDER[7:6] * 32))[31:0];
FI;
IF VL >= 256
    TMP_DEST[159:128] ← (TMP_SRC[255:128] >> (ORDER[1:0] * 32))[31:0];
    TMP_DEST[191:160] ← (TMP_SRC[255:128] >> (ORDER[3:2] * 32))[31:0];
    TMP_DEST[223:192] ← (TMP_SRC[255:128] >> (ORDER[5:4] * 32))[31:0];
    TMP_DEST[255:224] ← (TMP_SRC[255:128] >> (ORDER[7:6] * 32))[31:0];
FI;
IF VL >= 512
    TMP_DEST[287:256] ← (TMP_SRC[383:256] >> (ORDER[1:0] * 32))[31:0];
    TMP_DEST[319:288] ← (TMP_SRC[383:256] >> (ORDER[3:2] * 32))[31:0];
    TMP_DEST[351:320] ← (TMP_SRC[383:256] >> (ORDER[5:4] * 32))[31:0];
    TMP_DEST[383:352] ← (TMP_SRC[383:256] >> (ORDER[7:6] * 32))[31:0];
    TMP_DEST[415:384] ← (TMP_SRC[511:384] >> (ORDER[1:0] * 32))[31:0];
    TMP_DEST[447:416] ← (TMP_SRC[511:384] >> (ORDER[3:2] * 32))[31:0];
    TMP_DEST[479:448] ←(TMP_SRC[511:384] >> (ORDER[5:4] * 32))[31:0];
    TMP_DEST[511:480] ← (TMP_SRC[511:384] >> (ORDER[7:6] * 32))[31:0];
FI;
FOR j ← 0 TO KL-1
    i ← j * 32
    IF k1[j] OR *no writemask*
        THEN DEST[i+31:i] ← TMP_DEST[i+31:i]
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+31:i] remains unchanged*
                ELSE *zeroing-masking*
                            ; zeroing-masking
                    DEST[i+31:i] ← 0
            FI
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0 
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPSHUFD __m512i _mm512_shuffle_epi32(__m512i a, int n );
VPSHUFD __m512i _mm512_mask_shuffle_epi32(__m512i s, __mmask16 k, __m512i a, int n );
VPSHUFD __m512i _mm512_maskz_shuffle_epi32( __mmask16 k, __m512i a, int n );
VPSHUFD __m256i _mm256_mask_shuffle_epi32(__m256i s, __mmask8 k, __m256i a, int n );
VPSHUFD __m256i _mm256_maskz_shuffle_epi32( __mmask8 k, __m256i a, int n );
VPSHUFD __m128i _mm_mask_shuffle_epi32(__m128i s, __mmask8 k, __m128i a, int n );
VPSHUFD __m128i _mm_maskz_shuffle_epi32( __mmask8 k, __m128i a, int n );
(V)PSHUFD:__m128i _mm_shuffle_epi32(__m128i a, int n)
VPSHUFD:__m256i _mm256_shuffle_epi32(__m256i a, const int n)
```
### Flags Affected
None.

### SIMD Floating-Point Exceptions

None.

### Other Exceptions

Non-EVEX-encoded instruction, see Exceptions Type 4.
EVEX-encoded instruction, see Exceptions Type E4NF.
<p>#UD
If VEX.vvvv ≠ 1111B or EVEX.vvvv ≠ 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
