<b>PSRAW / PSRAD / PSRAQ</b> — Shift Packed Data Right Arithmetic
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F E1 /r1 PSRAW mm, mm/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>MMX</td>
		<td>Shift words in mm right by mm/m64 while shifting in sign bits.</td>
	</tr>
	<tr>
		<td>66 0F E1 /r PSRAW xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Shift words in xmm1 right by xmm2/m128 while shifting in sign bits.</td>
	</tr>
	<tr>
		<td>NP 0F 71 /4 ib1 PSRAW mm, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>MMX</td>
		<td>Shift words in mm right by imm8 while shifting in sign bits</td>
	</tr>
	<tr>
		<td>66 0F 71 /4 ib PSRAW xmm1, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Shift words in xmm1 right by imm8 while shifting in sign bits</td>
	</tr>
	<tr>
		<td>NP 0F E2 /r1 PSRAD mm, mm/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>MMX</td>
		<td>Shift doublewords in mm right by mm/m64 while shifting in sign bits.</td>
	</tr>
	<tr>
		<td>66 0F E2 /r PSRAD xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Shift doubleword in xmm1 right by xmm2 /m128 while shifting in sign bits.</td>
	</tr>
	<tr>
		<td>NP 0F 72 /4 ib1 PSRAD mm, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>MMX</td>
		<td>Shift doublewords in mm right by imm8 while shifting in sign bits.</td>
	</tr>
	<tr>
		<td>66 0F 72 /4 ib PSRAD xmm1, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Shift doublewords in xmm1 right by imm8 while shifting in sign bits.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.WIG E1 /r VPSRAW xmm1, xmm2, xmm3/m128</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Shift words in xmm2 right by amount specified in xmm3/m128 while shifting in sign bits.</td>
	</tr>
	<tr>
		<td>VEX.NDD.128.66.0F.WIG 71 /4 ib VPSRAW xmm1, xmm2, imm8</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Shift words in xmm2 right by imm8 while shifting in sign bits.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.WIG E2 /r VPSRAD xmm1, xmm2, xmm3/m128</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Shift doublewords in xmm2 right by amount specified in xmm3/m128 while shifting in sign bits.</td>
	</tr>
	<tr>
		<td>VEX.NDD.128.66.0F.WIG 72 /4 ib VPSRAD xmm1, xmm2, imm8</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Shift doublewords in xmm2 right by imm8 while shifting in sign bits.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F.WIG E1 /r VPSRAW ymm1, ymm2, xmm3/m128</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Shift words in ymm2 right by amount specified in xmm3/m128 while shifting in sign bits.</td>
	</tr>
	<tr>
		<td>VEX.NDD.256.66.0F.WIG 71 /4 ib VPSRAW ymm1, ymm2, imm8</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Shift words in ymm2 right by imm8 while shifting in sign bits.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F.WIG E2 /r VPSRAD ymm1, ymm2, xmm3/m128</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Shift doublewords in ymm2 right by amount specified in xmm3/m128 while shifting in sign bits.</td>
	</tr>
	<tr>
		<td>VEX.NDD.256.66.0F.WIG 72 /4 ib VPSRAD ymm1, ymm2, imm8</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Shift doublewords in ymm2 right by imm8 while shifting in sign bits.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F.WIG E1 /r VPSRAW xmm1 {k1}{z}, xmm2, xmm3/m128</td>
		<td>G</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Shift words in xmm2 right by amount specified in xmm3/m128 while shifting in sign bits using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F.WIG E1 /r VPSRAW ymm1 {k1}{z}, ymm2, xmm3/m128</td>
		<td>G</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Shift words in ymm2 right by amount specified in xmm3/m128 while shifting in sign bits using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F.WIG E1 /r VPSRAW zmm1 {k1}{z}, zmm2, xmm3/m128</td>
		<td>G</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Shift words in zmm2 right by amount specified in xmm3/m128 while shifting in sign bits using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDD.128.66.0F.WIG 71 /4 ib VPSRAW xmm1 {k1}{z}, xmm2/m128, imm8</td>
		<td>E</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Shift words in xmm2/m128 right by imm8 while shifting in sign bits using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDD.256.66.0F.WIG 71 /4 ib VPSRAW ymm1 {k1}{z}, ymm2/m256, imm8</td>
		<td>E</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Shift words in ymm2/m256 right by imm8 while shifting in sign bits using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDD.512.66.0F.WIG 71 /4 ib VPSRAW zmm1 {k1}{z}, zmm2/m512, imm8</td>
		<td>E</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Shift words in zmm2/m512 right by imm8 while shifting in sign bits using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F.W0 E2 /r VPSRAD xmm1 {k1}{z}, xmm2, xmm3/m128</td>
		<td>G</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Shift doublewords in xmm2 right by amount specified in xmm3/m128 while shifting in sign bits using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F.W0 E2 /r VPSRAD ymm1 {k1}{z}, ymm2, xmm3/m128</td>
		<td>G</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Shift doublewords in ymm2 right by amount specified in xmm3/m128 while shifting in sign bits using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F.W0 E2 /r VPSRAD zmm1 {k1}{z}, zmm2, xmm3/m128</td>
		<td>G</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Shift doublewords in zmm2 right by amount specified in xmm3/m128 while shifting in sign bits using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDD.128.66.0F.W0 72 /4 ib VPSRAD xmm1 {k1}{z}, xmm2/m128/m32bcst, imm8</td>
		<td>F</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Shift doublewords in xmm2/m128/m32bcst right by imm8 while shifting in sign bits using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDD.256.66.0F.W0 72 /4 ib VPSRAD ymm1 {k1}{z}, ymm2/m256/m32bcst, imm8</td>
		<td>F</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Shift doublewords in ymm2/m256/m32bcst right by imm8 while shifting in sign bits using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDD.512.66.0F.W0 72 /4 ib VPSRAD zmm1 {k1}{z}, zmm2/m512/m32bcst, imm8</td>
		<td>F</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Shift doublewords in zmm2/m512/m32bcst right by imm8 while shifting in sign bits using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F.W1 E2 /r VPSRAQ xmm1 {k1}{z}, xmm2, xmm3/m128</td>
		<td>G</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Shift quadwords in xmm2 right by amount specified in xmm3/m128 while shifting in sign bits using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F.W1 E2 /r VPSRAQ ymm1 {k1}{z}, ymm2, xmm3/m128</td>
		<td>G</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Shift quadwords in ymm2 right by amount specified in xmm3/m128 while shifting in sign bits using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F.W1 E2 /r VPSRAQ zmm1 {k1}{z}, zmm2, xmm3/m128</td>
		<td>G</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Shift quadwords in zmm2 right by amount specified in xmm3/m128 while shifting in sign bits using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDD.128.66.0F.W1 72 /4 ib VPSRAQ xmm1 {k1}{z}, xmm2/m128/m64bcst, imm8</td>
		<td>F</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Shift quadwords in xmm2/m128/m64bcst right by imm8 while shifting in sign bits using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDD.256.66.0F.W1 72 /4 ib VPSRAQ ymm1 {k1}{z}, ymm2/m256/m64bcst, imm8</td>
		<td>F</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Shift quadwords in ymm2/m256/m64bcst right by imm8 while shifting in sign bits using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDD.512.66.0F.W1 72 /4 ib VPSRAQ zmm1 {k1}{z}, zmm2/m512/m64bcst, imm8</td>
		<td>F</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Shift quadwords in zmm2/m512/m64bcst right by imm8 while shifting in sign bits using writemask k1.</td>
	</tr>
</table>

1. See note in Section 2.4, “AVX and SSE Instruction Exception Specification” in the Intel® 64 and IA-32 Architectures Software
Developer’s Manual, Volume 2A and Section 22.25.3, “Exception Conditions of Legacy SIMD Instructions Operating on MMX Registers” in
the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 3A.

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
		<td>ModRM:r/m (r, w)</td>
		<td>imm8</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>C</td>
		<td>NA</td>
		<td>ModRM:reg (w)</td>
		<td>VEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>D</td>
		<td>NA</td>
		<td>VEX.vvvv (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>E</td>
		<td>Full Mem</td>
		<td>EVEX.vvvv (w)</td>
		<td>ModRM:r/m (R)</td>
		<td>Imm8</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>F</td>
		<td>Full</td>
		<td>EVEX.vvvv (w)</td>
		<td>ModRM:r/m (R)</td>
		<td>Imm8</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>G</td>
		<td>Mem128</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
Shifts the bits in the individual data elements (words, doublewords or quadwords) in the destination operand (first
operand) to the right by the number of bits specified in the count operand (second operand). As the bits in the data
elements are shifted right, the empty high-order bits are filled with the initial value of the sign bit of the data
element. If the value specified by the count operand is greater than 15 (for words), 31 (for doublewords), or 63 (for
quadwords), each destination data element is filled with the initial value of the sign bit of the element. (Figure 4-18
gives an example of shifting words in a 64-bit operand.)
<table>
	<tr>
		<td colspan=14 rowspan=6><b>Pre-Shift DEST Shift Right with Sign Extension Post-Shift DEST X3 X2 X1 X0 X3 >> COUNT X2 >> COUNT X1 >> COUNT X0 >> COUNT</b></td>
	</tr>
	<tr>
		<td colspan=3>X3</td>
		<td colspan=3>X2</td>
		<td colspan=3>X1</td>
		<td colspan=3>X0</td>
	</tr>
	<tr>
		<td colspan=3 rowspan=4>X2 >> COUNT</td>
		<td colspan=3 rowspan=4>X1 >> COUNT</td>
		<td colspan=3 rowspan=4>X0 >> COUNT</td>
		<td colspan=3 rowspan=4></td>
	</tr>
	<tr>
	</tr>
	<tr>
		<td colspan=3>X3 >> COUNT</td>
		<td colspan=3>X2 >> COUNT</td>
		<td colspan=3>X1 >> COUNT</td>
		<td colspan=3>X0 >> COUNT</td>
	</tr>
	<tr>
	</tr>
</table>

Figure 4-18.  PSRAW and PSRAD Instruction Operation Using a 64-bit Operand

Note that only the first 64-bits of a 128-bit count operand are checked to compute the count. If the second source
operand is a memory address, 128 bits are loaded.

The (V)PSRAW instruction shifts each of the words in the destination operand to the right by the number of bits
specified in the count operand, and the (V)PSRAD instruction shifts each of the doublewords in the destination
operand.

In 64-bit mode and not encoded with VEX/EVEX, using a REX prefix in the form of REX.R permits this instruction to
access additional registers (XMM8-XMM15).

Legacy SSE instructions 64-bit operand: The destination operand is an MMX technology register; the count
operand can be either an MMX technology register or an 64-bit memory location.

128-bit Legacy SSE version: The destination and first source operands are XMM registers. Bits (MAXVL-1:128) of
the corresponding YMM destination register remain unchanged. The count operand can be either an XMM register
or a 128-bit memory location or an 8-bit immediate. If the count operand is a memory address, 128 bits are loaded
but the upper 64 bits are ignored.

VEX.128 encoded version: The destination and first source operands are XMM registers. Bits (MAXVL-1:128) of the
destination YMM register are zeroed. The count operand can be either an XMM register or a 128-bit memory location
 or an 8-bit immediate. If the count operand is a memory address, 128 bits are loaded but the upper 64 bits are
ignored.

VEX.256 encoded version: The destination operand is a YMM register. The source operand is a YMM register or a
memory location. The count operand can come either from an XMM register or a memory location or an 8-bit
immediate. Bits (MAXVL-1:256) of the corresponding ZMM register are zeroed.
EVEX encoded versions: The destination operand is a ZMM register updated according to the writemask. The count
operand is either an 8-bit immediate (the immediate count version) or an 8-bit value from an XMM register or a
memory location (the variable count version). For the immediate count version, the source operand (the second
operand) can be a ZMM register, a 512-bit memory location or a 512-bit vector broadcasted from a 32/64-bit
memory location. For the variable count version, the first source operand (the second operand) is a ZMM register,
the second source operand (the third operand, 8-bit variable count) can be an XMM register or a memory location.

Note: In VEX/EVEX encoded versions of shifts with an immediate count, vvvv of VEX/EVEX encode the destination
register, and VEX.B/EVEX.B + ModRM.r/m encodes the source register.

Note: For shifts with an immediate count (VEX.128.66.0F 71-73 /4, EVEX.128.66.0F 71-73 /4),
VEX.vvvv/EVEX.vvvv encodes the destination register.

### Operation


#### PSRAW (with 64-bit operand)
```java
    IF (COUNT > 15)
        THEN COUNT ← 16;
    FI;
    DEST[15:0] ← SignExtend(DEST[15:0] >> COUNT);
    (* Repeat shift operation for 2nd and 3rd words *)
    DEST[63:48] ← SignExtend(DEST[63:48] >> COUNT);
```
#### PSRAD (with 64-bit operand)
```java
    IF (COUNT > 31)
        THEN COUNT ← 32;
    FI;
    DEST[31:0] ← SignExtend(DEST[31:0] >> COUNT);
    DEST[63:32] ← SignExtend(DEST[63:32] >> COUNT);
ARITHMETIC_RIGHT_SHIFT_DWORDS1(SRC, COUNT_SRC)
COUNT ← COUNT_SRC[63:0];
IF (COUNT > 31)
THEN
    DEST[31:0] ← SignBit
ELSE
    DEST[31:0] ← SignExtend(SRC[31:0] >> COUNT);
FI;
ARITHMETIC_RIGHT_SHIFT_QWORDS1(SRC, COUNT_SRC)
COUNT ← COUNT_SRC[63:0];
IF (COUNT > 63)
THEN
    DEST[63:0] ← SignBit
ELSE
    DEST[63:0] ← SignExtend(SRC[63:0] >> COUNT);
FI;
ARITHMETIC_RIGHT_SHIFT_WORDS_256b(SRC, COUNT_SRC)
COUNT ← COUNT_SRC[63:0];
IF (COUNT > 15)
    THEN
            COUNT ← 16;
FI;
DEST[15:0] ← SignExtend(SRC[15:0] >> COUNT);
    (* Repeat shift operation for 2nd through 15th words *)
DEST[255:240] ← SignExtend(SRC[255:240] >> COUNT);
ARITHMETIC_RIGHT_SHIFT_DWORDS_256b(SRC, COUNT_SRC)
COUNT ← COUNT_SRC[63:0];
IF (COUNT > 31)
    THEN
            COUNT ← 32;
FI;
DEST[31:0] ← SignExtend(SRC[31:0] >> COUNT);
    (* Repeat shift operation for 2nd through 7th words *)
DEST[255:224] ← SignExtend(SRC[255:224] >> COUNT);
ARITHMETIC_RIGHT_SHIFT_QWORDS(SRC, COUNT_SRC, VL) 
                            ; VL: 128b, 256b or 512b
COUNT ← COUNT_SRC[63:0];
IF (COUNT > 63)
    THEN
            COUNT ← 64;
FI;
DEST[63:0] ← SignExtend(SRC[63:0] >> COUNT);
    (* Repeat shift operation for 2nd through 7th words *)
DEST[VL-1:VL-64] ← SignExtend(SRC[VL-1:VL-64] >> COUNT);
ARITHMETIC_RIGHT_SHIFT_WORDS(SRC, COUNT_SRC)
COUNT ← COUNT_SRC[63:0];
IF (COUNT > 15)
    THEN
            COUNT ← 16;
FI;
DEST[15:0] ← SignExtend(SRC[15:0] >> COUNT);
    (* Repeat shift operation for 2nd through 7th words *)
DEST[127:112] ← SignExtend(SRC[127:112] >> COUNT);
ARITHMETIC_RIGHT_SHIFT_DWORDS(SRC, COUNT_SRC)
COUNT ← COUNT_SRC[63:0];
IF (COUNT > 31)
    THEN
            COUNT ← 32;
FI;
DEST[31:0] ← SignExtend(SRC[31:0] >> COUNT);
    (* Repeat shift operation for 2nd through 3rd words *)
DEST[127:96] ← SignExtend(SRC[127:96] >> COUNT);
```
#### VPSRAW (EVEX versions, xmm/m128)
```java
(KL, VL) = (8, 128), (16, 256), (32, 512)
IF VL = 128
    TMP_DEST[127:0] ← ARITHMETIC_RIGHT_SHIFT_WORDS_128b(SRC1[127:0], SRC2)
FI;
IF VL = 256
    TMP_DEST[255:0] ← ARITHMETIC_RIGHT_SHIFT_WORDS_256b(SRC1[255:0], SRC2)
FI;
IF VL = 512
    TMP_DEST[255:0] ← ARITHMETIC_RIGHT_SHIFT_WORDS_256b(SRC1[255:0], SRC2)
    TMP_DEST[511:256] ← ARITHMETIC_RIGHT_SHIFT_WORDS_256b(SRC1[511:256], SRC2)
FI;
FOR j ← 0 TO KL-1
    i ← j * 16
    IF k1[j] OR *no writemask*
        THEN DEST[i+15:i] ← TMP_DEST[i+15:i]
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+15:i] remains unchanged*
                ELSE *zeroing-masking*
                            ; zeroing-masking 
                    DEST[i+15:i] = 0
            FI
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
#### VPSRAW (EVEX versions, imm8)
```java
(KL, VL) = (8, 128), (16, 256), (32, 512)
IF VL = 128
    TMP_DEST[127:0] ← ARITHMETIC_RIGHT_SHIFT_WORDS_128b(SRC1[127:0], imm8)
FI;
IF VL = 256
    TMP_DEST[255:0] ← ARITHMETIC_RIGHT_SHIFT_WORDS_256b(SRC1[255:0], imm8)
FI;
IF VL = 512
    TMP_DEST[255:0] ← ARITHMETIC_RIGHT_SHIFT_WORDS_256b(SRC1[255:0], imm8)
    TMP_DEST[511:256] ← ARITHMETIC_RIGHT_SHIFT_WORDS_256b(SRC1[511:256], imm8)
FI;
FOR j ← 0 TO KL-1
    i ← j * 16
    IF k1[j] OR *no writemask*
        THEN DEST[i+15:i] ← TMP_DEST[i+15:i]
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+15:i] remains unchanged*
                ELSE *zeroing-masking*
                            ; zeroing-masking 
                    DEST[i+15:i] = 0
            FI
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
#### VPSRAW (ymm, ymm, xmm/m128) - VEX
```java
DEST[255:0] ← ARITHMETIC_RIGHT_SHIFT_WORDS_256b(SRC1, SRC2)
DEST[MAXVL-1:256] ← 0
```
#### VPSRAW (ymm, imm8) - VEX
```java
DEST[255:0] ← ARITHMETIC_RIGHT_SHIFT_WORDS_256b(SRC1, imm8)
DEST[MAXVL-1:256] ← 0
```
#### VPSRAW (xmm, xmm, xmm/m128) - VEX
```java
DEST[127:0] ← ARITHMETIC_RIGHT_SHIFT_WORDS(SRC1, SRC2)
DEST[MAXVL-1:128] ← 0
```
#### VPSRAW (xmm, imm8) - VEX
```java
DEST[127:0] ← ARITHMETIC_RIGHT_SHIFT_WORDS(SRC1, imm8)
DEST[MAXVL-1:128] ← 0
```
#### PSRAW (xmm, xmm, xmm/m128)
```java
DEST[127:0] ←ARITHMETIC_RIGHT_SHIFT_WORDS(DEST, SRC)
DEST[MAXVL-1:128] (Unmodified)
```
#### PSRAW (xmm, imm8)
```java
DEST[127:0] ←ARITHMETIC_RIGHT_SHIFT_WORDS(DEST, imm8)
DEST[MAXVL-1:128] (Unmodified)
```
#### VPSRAD (EVEX versions, imm8)
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
FOR j ← 0 TO KL-1
    i ← j * 32
    IF k1[j] OR *no writemask* THEN
            IF (EVEX.b = 1) AND (SRC1 *is memory*)
                THEN DEST[i+31:i] ← ARITHMETIC_RIGHT_SHIFT_DWORDS1(SRC1[31:0], imm8)
                ELSE DEST[i+31:i] ← ARITHMETIC_RIGHT_SHIFT_DWORDS1(SRC1[i+31:i], imm8)
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
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
#### VPSRAD (EVEX versions, xmm/m128)
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
IF VL = 128
    TMP_DEST[127:0] ← ARITHMETIC_RIGHT_SHIFT_DWORDS_128b(SRC1[127:0], SRC2)
FI;
IF VL = 256
    TMP_DEST[255:0] ← ARITHMETIC_RIGHT_SHIFT_DWORDS_256b(SRC1[255:0], SRC2)
FI;
IF VL = 512
    TMP_DEST[255:0] ← ARITHMETIC_RIGHT_SHIFT_DWORDS_256b(SRC1[255:0], SRC2)
    TMP_DEST[511:256] ← ARITHMETIC_RIGHT_SHIFT_DWORDS_256b(SRC1[511:256], SRC2)
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
#### VPSRAD (ymm, ymm, xmm/m128) - VEX
```java
DEST[255:0] ←ARITHMETIC_RIGHT_SHIFT_DWORDS_256b(SRC1, SRC2)
DEST[MAXVL-1:256] ← 0
```
#### VPSRAD (ymm, imm8) - VEX
```java
DEST[255:0] ←ARITHMETIC_RIGHT_SHIFT_DWORDS_256b(SRC1, imm8)
DEST[MAXVL-1:256] ← 0
```
#### VPSRAD (xmm, xmm, xmm/m128) - VEX
```java
DEST[127:0] ←ARITHMETIC_RIGHT_SHIFT_DWORDS(SRC1, SRC2)
DEST[MAXVL-1:128] ←0
```
#### VPSRAD (xmm, imm8) - VEX
```java
DEST[127:0] ←ARITHMETIC_RIGHT_SHIFT_DWORDS(SRC1, imm8)
DEST[MAXVL-1:128] ←0
```
#### PSRAD (xmm, xmm, xmm/m128)
```java
DEST[127:0] ←ARITHMETIC_RIGHT_SHIFT_DWORDS(DEST, SRC)
DEST[MAXVL-1:128] (Unmodified)
```
#### PSRAD (xmm, imm8)
```java
DEST[127:0] ←ARITHMETIC_RIGHT_SHIFT_DWORDS(DEST, imm8)
DEST[MAXVL-1:128] (Unmodified)
```
#### VPSRAQ (EVEX versions, imm8)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 64
    IF k1[j] OR *no writemask* THEN
            IF (EVEX.b = 1) AND (SRC1 *is memory*)
                THEN DEST[i+63:i] ← ARITHMETIC_RIGHT_SHIFT_QWORDS1(SRC1[63:0], imm8)
                ELSE DEST[i+63:i] ← ARITHMETIC_RIGHT_SHIFT_QWORDS1(SRC1[i+63:i], imm8)
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
#### VPSRAQ (EVEX versions, xmm/m128)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
TMP_DEST[VL-1:0] ← ARITHMETIC_RIGHT_SHIFT_QWORDS(SRC1[VL-1:0], SRC2, VL)
FOR j ← 0 TO 7
    i ← j * 64
    IF k1[j] OR *no writemask*
        THEN DEST[i+63:i] ← TMP_DEST[i+63:i]
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
#### Intel C/C++ Compiler Intrinsic Equivalents
```java
VPSRAD __m512i _mm512_srai_epi32(__m512i a, unsigned int imm);
VPSRAD __m512i _mm512_mask_srai_epi32(__m512i s, __mmask16 k, __m512i a, unsigned int imm);
VPSRAD __m512i _mm512_maskz_srai_epi32( __mmask16 k, __m512i a, unsigned int imm);
VPSRAD __m256i _mm256_mask_srai_epi32(__m256i s, __mmask8 k, __m256i a, unsigned int imm);
VPSRAD __m256i _mm256_maskz_srai_epi32( __mmask8 k, __m256i a, unsigned int imm);
VPSRAD __m128i _mm_mask_srai_epi32(__m128i s, __mmask8 k, __m128i a, unsigned int imm);
VPSRAD __m128i _mm_maskz_srai_epi32( __mmask8 k, __m128i a, unsigned int imm);
VPSRAD __m512i _mm512_sra_epi32(__m512i a, __m128i cnt);
VPSRAD __m512i _mm512_mask_sra_epi32(__m512i s, __mmask16 k, __m512i a, __m128i cnt);
VPSRAD __m512i _mm512_maskz_sra_epi32( __mmask16 k, __m512i a, __m128i cnt);
VPSRAD __m256i _mm256_mask_sra_epi32(__m256i s, __mmask8 k, __m256i a, __m128i cnt);
VPSRAD __m256i _mm256_maskz_sra_epi32( __mmask8 k, __m256i a, __m128i cnt);
VPSRAD __m128i _mm_mask_sra_epi32(__m128i s, __mmask8 k, __m128i a, __m128i cnt);
VPSRAD __m128i _mm_maskz_sra_epi32( __mmask8 k, __m128i a, __m128i cnt);
VPSRAQ __m512i _mm512_srai_epi64(__m512i a, unsigned int imm);
VPSRAQ __m512i _mm512_mask_srai_epi64(__m512i s, __mmask8 k, __m512i a, unsigned int imm)
VPSRAQ __m512i _mm512_maskz_srai_epi64( __mmask8 k, __m512i a, unsigned int imm)
VPSRAQ __m256i _mm256_mask_srai_epi64(__m256i s, __mmask8 k, __m256i a, unsigned int imm);
VPSRAQ __m256i _mm256_maskz_srai_epi64( __mmask8 k, __m256i a, unsigned int imm);
VPSRAQ __m128i _mm_mask_srai_epi64(__m128i s, __mmask8 k, __m128i a, unsigned int imm);
VPSRAQ __m128i _mm_maskz_srai_epi64( __mmask8 k, __m128i a, unsigned int imm);
VPSRAQ __m512i _mm512_sra_epi64(__m512i a, __m128i cnt);
VPSRAQ __m512i _mm512_mask_sra_epi64(__m512i s, __mmask8 k, __m512i a, __m128i cnt)
VPSRAQ __m512i _mm512_maskz_sra_epi64( __mmask8 k, __m512i a, __m128i cnt)
VPSRAQ __m256i _mm256_mask_sra_epi64(__m256i s, __mmask8 k, __m256i a, __m128i cnt);
VPSRAQ __m256i _mm256_maskz_sra_epi64( __mmask8 k, __m256i a, __m128i cnt);
VPSRAQ __m128i _mm_mask_sra_epi64(__m128i s, __mmask8 k, __m128i a, __m128i cnt);
VPSRAQ __m128i _mm_maskz_sra_epi64( __mmask8 k, __m128i a, __m128i cnt);
VPSRAW __m512i _mm512_srai_epi16(__m512i a, unsigned int imm);
VPSRAW __m512i _mm512_mask_srai_epi16(__m512i s, __mmask32 k, __m512i a, unsigned int imm);
VPSRAW __m512i _mm512_maskz_srai_epi16( __mmask32 k, __m512i a, unsigned int imm);
VPSRAW __m256i _mm256_mask_srai_epi16(__m256i s, __mmask16 k, __m256i a, unsigned int imm);
VPSRAW __m256i _mm256_maskz_srai_epi16( __mmask16 k, __m256i a, unsigned int imm);
VPSRAW __m128i _mm_mask_srai_epi16(__m128i s, __mmask8 k, __m128i a, unsigned int imm);
VPSRAW __m128i _mm_maskz_srai_epi16( __mmask8 k, __m128i a, unsigned int imm);
VPSRAW __m512i _mm512_sra_epi16(__m512i a, __m128i cnt);
VPSRAW __m512i _mm512_mask_sra_epi16(__m512i s, __mmask16 k, __m512i a, __m128i cnt);
VPSRAW __m512i _mm512_maskz_sra_epi16( __mmask16 k, __m512i a, __m128i cnt);
VPSRAW __m256i _mm256_mask_sra_epi16(__m256i s, __mmask8 k, __m256i a, __m128i cnt);
VPSRAW __m256i _mm256_maskz_sra_epi16( __mmask8 k, __m256i a, __m128i cnt);
VPSRAW __m128i _mm_mask_sra_epi16(__m128i s, __mmask8 k, __m128i a, __m128i cnt);
VPSRAW __m128i _mm_maskz_sra_epi16( __mmask8 k, __m128i a, __m128i cnt);
PSRAW:__m64 _mm_srai_pi16 (__m64 m, int count)
PSRAW:__m64 _mm_sra_pi16 (__m64 m, __m64 count)
(V)PSRAW:__m128i _mm_srai_epi16(__m128i m, int  count)
(V)PSRAW:__m128i _mm_sra_epi16(__m128i m, __m128i count)
VPSRAW:__m256i _mm256_srai_epi16 (__m256i m, int count)
VPSRAW:__m256i _mm256_sra_epi16 (__m256i m, __m128i count)
PSRAD:__m64 _mm_srai_pi32 (__m64 m, int count)
PSRAD:__m64 _mm_sra_pi32 (__m64 m, __m64 count)
(V)PSRAD:__m128i _mm_srai_epi32 (__m128i m, int  count)
(V)PSRAD:__m128i _mm_sra_epi32 (__m128i m, __m128i count)
VPSRAD:__m256i _mm256_srai_epi32 (__m256i m, int count)
VPSRAD:__m256i _mm256_sra_epi32 (__m256i m, __m128i count)
```
### Flags Affected
None.

### Numeric Exceptions

None.

### Other Exceptions

VEX-encoded instructions:

Syntax with RM/RVM operand encoding (A/C in the operand encoding table), see Exceptions Type 4.

Syntax with MI/VMI operand encoding (B/D in the operand encoding table), see Exceptions Type 7.

EVEX-encoded VPSRAW (E in the operand encoding table), see Exceptions Type E4NF.nb.

EVEX-encoded VPSRAD/Q:

Syntax with Mem128 tuple type (G in the operand encoding table), see Exceptions Type E4NF.nb.

Syntax with Full tuple type (F in the operand encoding table), see Exceptions Type E4.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
