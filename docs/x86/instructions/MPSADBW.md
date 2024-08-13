<b>MPSADBW</b> —  Compute Multiple Packed Sums of Absolute Difference
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32-bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 3A 42 /r ib MPSADBW xmm1, xmm2/m128, imm8</td>
		<td>RMI</td>
		<td>V/V</td>
		<td>SSE4_1</td>
		<td>Sums absolute 8-bit integer difference of adjacent groups of 4 byte integers in xmm1 and xmm2/m128 and writes the results in xmm1. Starting offsets within xmm1 and xmm2/m128 are determined by imm8.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F3A.WIG 42 /r ib VMPSADBW xmm1, xmm2, xmm3/m128, imm8</td>
		<td>RVMI V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Sums absolute 8-bit integer difference of adjacent groups of 4 byte integers in xmm2 and xmm3/m128 and writes the results in xmm1. Starting offsets within xmm2 and xmm3/m128 are determined by imm8.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F3A.WIG 42 /r ib VMPSADBW ymm1, ymm2, ymm3/m256, imm8</td>
		<td>RVMI V/V</td>
		<td></td>
		<td>AVX2</td>
		<td>Sums absolute 8-bit integer difference of adjacent groups of 4 byte integers in xmm2 and ymm3/m128 and writes the results in ymm1. Starting offsets within ymm2 and xmm3/m128 are determined by imm8.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand 2</b></td>
		<td><b>Operand 3</b></td>
		<td><b>Operand 4</b></td>
	</tr>
	<tr>
		<td>RMI</td>
		<td>ModRM:reg (r, w)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>RVMI</td>
		<td>ModRM:reg (w)</td>
		<td>VEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8</td>
	</tr>
</table>


### Description
(V)MPSADBW calculates packed word results of sum-absolute-difference (SAD) of unsigned bytes from two blocks
of 32-bit dword elements, using two select fields in the immediate byte to select the offsets of the two blocks within
the first source operand and the second operand. Packed SAD word results are calculated within each 128-bit lane.
Each SAD word result is calculated between a stationary block_2 (whose offset within the second source operand
is selected by a two bit select control, multiplied by 32 bits) and a sliding block_1 at consecutive byte-granular posi-
tion within the first source operand. The offset of the first 32-bit block of block_1 is selectable using a one bit select
control, multiplied by 32 bits.

128-bit Legacy SSE version: Imm8[1:0]\*32 specifies the bit offset of block_2 within the second source operand.
Imm[2]\*32 specifies the initial bit offset of the block_1 within the first source operand. The first source operand
and destination operand are the same. The first source and destination operands are XMM registers. The second
source operand is either an XMM register or a 128-bit memory location. Bits (MAXVL-1:128) of the corresponding
YMM destination register remain unchanged. Bits 7:3 of the immediate byte are ignored.

VEX.128 encoded version: Imm8[1:0]\*32 specifies the bit offset of block_2 within the second source operand.
Imm[2]\*32 specifies the initial bit offset of the block_1 within the first source operand. The first source and destination
 operands are XMM registers. The second source operand is either an XMM register or a 128-bit memory
location. Bits (127:128) of the corresponding YMM register are zeroed. Bits 7:3 of the immediate byte are ignored.

VEX.256 encoded version: The sum-absolute-difference (SAD) operation is repeated 8 times for MPSADW between
the same block_2 (fixed offset within the second source operand) and a variable block_1 (offset is shifted by 8 bits
for each SAD operation) in the first source operand. Each 16-bit result of eight SAD operations between block_2
and block_1 is written to the respective word in the lower 128 bits of the destination operand.

Additionally, VMPSADBW performs another eight SAD operations on block_4 of the second source operand and
block_3 of the first source operand. (Imm8[4:3]\*32 + 128) specifies the bit offset of block_4 within the second
source operand. (Imm[5]\*32+128) specifies the initial bit offset of the block_3 within the first source operand.
Each 16-bit result of eight SAD operations between block_4 and block_3 is written to the respective word in the
upper 128 bits of the destination operand.
The first source operand is a YMM register. The second source register can be a YMM register or a 256-bit memory
location. The destination operand is a YMM register. Bits 7:6 of the immediate byte are ignored.

Note: If VMPSADBW is encoded with VEX.L= 1, an attempt to execute the instruction encoded with VEX.L= 1 will
cause an \#UD exception.
<table>
	<tr>
		<td colspan=66 rowspan=21><b>255 224 192 Imm[4:3]*32+128 128 Src2 Src1 255 Destination Abs. Diff. Imm[5]*32+128 Sum 144 128 127 96 64 Imm[1:0]*32 0 Src2 Src1 127 Destination Abs. Diff. Imm[2]*32 Sum 16 0</b></td>
	</tr>
	<tr>
		<td colspan=10></td>
		<td colspan=15></td>
		<td colspan=5></td>
		<td colspan=6></td>
		<td colspan=8></td>
		<td colspan=4></td>
		<td colspan=14></td>
		<td colspan=3 rowspan=20>0 0</td>
	</tr>
	<tr>
	</tr>
	<tr>
		<td colspan=9></td>
		<td colspan=4></td>
		<td colspan=4 rowspan=2></td>
		<td colspan=5 rowspan=2></td>
		<td rowspan=2></td>
		<td colspan=2 rowspan=2></td>
		<td colspan=8 rowspan=18>128 0 Imm[2]*32 16 0</td>
	</tr>
	<tr>
		<td colspan=4></td>
		<td colspan=6></td>
		<td colspan=8></td>
		<td colspan=6></td>
		<td colspan=8></td>
	</tr>
	<tr>
		<td colspan=5></td>
		<td colspan=5></td>
		<td colspan=3></td>
		<td colspan=6></td>
		<td colspan=9></td>
		<td colspan=25 rowspan=16>Sum 144 128 Imm[1:0]*32 0 Abs. Diff. Imm[2]*32 Sum 16 0</td>
	</tr>
	<tr>
		<td colspan=4 rowspan=2></td>
		<td colspan=4 rowspan=2></td>
		<td colspan=4></td>
		<td colspan=5></td>
		<td colspan=4></td>
		<td colspan=40 rowspan=15>Sum 144 128 Imm[1:0]*32 0 Abs. Diff. Imm[2]*32 Sum 16 0</td>
	</tr>
	<tr>
		<td colspan=49 rowspan=14>Sum 144 128 64 Imm[1:0]*32 0 Abs. Diff. Imm[2]*32 Sum 16 0</td>
	</tr>
	<tr>
	</tr>
	<tr>
		<td colspan=4></td>
		<td colspan=7></td>
		<td colspan=7></td>
		<td colspan=8></td>
		<td colspan=12></td>
		<td colspan=10></td>
		<td colspan=8></td>
		<td colspan=3></td>
		<td colspan=4 rowspan=12>0 0</td>
	</tr>
	<tr>
	</tr>
	<tr>
		<td colspan=10></td>
		<td colspan=16></td>
		<td colspan=4></td>
		<td colspan=8></td>
		<td colspan=6></td>
		<td colspan=6></td>
		<td colspan=13></td>
	</tr>
	<tr>
	</tr>
	<tr>
		<td colspan=9></td>
		<td colspan=3></td>
		<td colspan=6 rowspan=2></td>
		<td colspan=3 rowspan=2></td>
		<td rowspan=2></td>
		<td colspan=3 rowspan=2></td>
		<td colspan=6 rowspan=8>0</td>
	</tr>
	<tr>
		<td colspan=4></td>
		<td colspan=6></td>
		<td colspan=8></td>
		<td colspan=5></td>
		<td colspan=8></td>
	</tr>
	<tr>
		<td colspan=5></td>
		<td colspan=5></td>
		<td colspan=3></td>
		<td colspan=6></td>
		<td colspan=9></td>
		<td colspan=23 rowspan=6>Sum 16 0</td>
	</tr>
	<tr>
		<td colspan=4 rowspan=2></td>
		<td colspan=5 rowspan=2></td>
		<td colspan=4></td>
		<td colspan=5></td>
		<td colspan=4></td>
		<td colspan=38 rowspan=5>Sum 16 0</td>
	</tr>
	<tr>
		<td colspan=47 rowspan=4>Sum 16 0</td>
	</tr>
	<tr>
	</tr>
	<tr>
		<td colspan=4></td>
		<td colspan=8></td>
		<td colspan=6></td>
		<td colspan=8></td>
		<td colspan=13></td>
		<td colspan=11></td>
		<td colspan=7></td>
		<td colspan=3></td>
		<td colspan=2 rowspan=2></td>
	</tr>
	<tr>
	</tr>
</table>

Figure 4-5.  256-bit VMPSADBW Operation

### Operation


#### VMPSADBW (VEX.256 encoded version)
```java
BLK2_OFFSET ← imm8[1:0]*32
BLK1_OFFSET ← imm8[2]*32
SRC1_BYTE0 ← SRC1[BLK1_OFFSET+7:BLK1_OFFSET]
SRC1_BYTE1 ← SRC1[BLK1_OFFSET+15:BLK1_OFFSET+8]
SRC1_BYTE2 ← SRC1[BLK1_OFFSET+23:BLK1_OFFSET+16]
SRC1_BYTE3 ← SRC1[BLK1_OFFSET+31:BLK1_OFFSET+24]
SRC1_BYTE4 ←SRC1[BLK1_OFFSET+39:BLK1_OFFSET+32]
SRC1_BYTE5 ← SRC1[BLK1_OFFSET+47:BLK1_OFFSET+40]
SRC1_BYTE6 ← SRC1[BLK1_OFFSET+55:BLK1_OFFSET+48]
SRC1_BYTE7 ← SRC1[BLK1_OFFSET+63:BLK1_OFFSET+56]
SRC1_BYTE8 ← SRC1[BLK1_OFFSET+71:BLK1_OFFSET+64]
SRC1_BYTE9 ← SRC1[BLK1_OFFSET+79:BLK1_OFFSET+72]
SRC1_BYTE10 ← SRC1[BLK1_OFFSET+87:BLK1_OFFSET+80]
SRC2_BYTE0 ←SRC2[BLK2_OFFSET+7:BLK2_OFFSET]
SRC2_BYTE1 ← SRC2[BLK2_OFFSET+15:BLK2_OFFSET+8]
SRC2_BYTE2 ← SRC2[BLK2_OFFSET+23:BLK2_OFFSET+16]
SRC2_BYTE3 ← SRC2[BLK2_OFFSET+31:BLK2_OFFSET+24]
TEMP0 ← ABS(SRC1_BYTE0 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE1 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE2 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE3 - SRC2_BYTE3)
DEST[15:0] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS(SRC1_BYTE1 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE2 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE3 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE4 - SRC2_BYTE3)
DEST[31:16] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS(SRC1_BYTE2 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE3 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE4 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE5 - SRC2_BYTE3)
DEST[47:32] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS(SRC1_BYTE3 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE4 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE5 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE6 - SRC2_BYTE3)
DEST[63:48] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS(SRC1_BYTE4 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE5 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE6 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE7 - SRC2_BYTE3)
DEST[79:64] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS(SRC1_BYTE5 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE6 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE7 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE8 - SRC2_BYTE3)
DEST[95:80] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS(SRC1_BYTE6 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE7 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE8 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE9 - SRC2_BYTE3)
DEST[111:96] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS(SRC1_BYTE7 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE8 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE9 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE10 - SRC2_BYTE3)
DEST[127:112] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
BLK2_OFFSET ← imm8[4:3]*32 + 128
BLK1_OFFSET ← imm8[5]*32 + 128
SRC1_BYTE0 ← SRC1[BLK1_OFFSET+7:BLK1_OFFSET]
SRC1_BYTE1 ← SRC1[BLK1_OFFSET+15:BLK1_OFFSET+8]
SRC1_BYTE2 ← SRC1[BLK1_OFFSET+23:BLK1_OFFSET+16]
SRC1_BYTE3 ← SRC1[BLK1_OFFSET+31:BLK1_OFFSET+24]
SRC1_BYTE4 ← SRC1[BLK1_OFFSET+39:BLK1_OFFSET+32]
SRC1_BYTE5 ← SRC1[BLK1_OFFSET+47:BLK1_OFFSET+40]
SRC1_BYTE6 ← SRC1[BLK1_OFFSET+55:BLK1_OFFSET+48]
SRC1_BYTE7 ← SRC1[BLK1_OFFSET+63:BLK1_OFFSET+56]
SRC1_BYTE8 ← SRC1[BLK1_OFFSET+71:BLK1_OFFSET+64]
SRC1_BYTE9 ← SRC1[BLK1_OFFSET+79:BLK1_OFFSET+72]
SRC1_BYTE10 ← SRC1[BLK1_OFFSET+87:BLK1_OFFSET+80]
SRC2_BYTE0 ←SRC2[BLK2_OFFSET+7:BLK2_OFFSET]
SRC2_BYTE1 ← SRC2[BLK2_OFFSET+15:BLK2_OFFSET+8]
SRC2_BYTE2 ← SRC2[BLK2_OFFSET+23:BLK2_OFFSET+16]
SRC2_BYTE3 ← SRC2[BLK2_OFFSET+31:BLK2_OFFSET+24]
TEMP0 ← ABS(SRC1_BYTE0 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE1 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE2 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE3 - SRC2_BYTE3)
DEST[143:128] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ←ABS(SRC1_BYTE1 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE2 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE3 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE4 - SRC2_BYTE3)
DEST[159:144] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS(SRC1_BYTE2 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE3 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE4 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE5 - SRC2_BYTE3)
DEST[175:160] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ←ABS(SRC1_BYTE3 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE4 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE5 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE6 - SRC2_BYTE3)
DEST[191:176] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS(SRC1_BYTE4 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE5 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE6 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE7 - SRC2_BYTE3)
DEST[207:192] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS(SRC1_BYTE5 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE6 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE7 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE8 - SRC2_BYTE3)
DEST[223:208] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS(SRC1_BYTE6 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE7 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE8 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE9 - SRC2_BYTE3)
DEST[239:224] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS(SRC1_BYTE7 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE8 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE9 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE10 - SRC2_BYTE3)
DEST[255:240] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
```
#### VMPSADBW (VEX.128 encoded version)
```java
BLK2_OFFSET ← imm8[1:0]*32
BLK1_OFFSET ← imm8[2]*32
SRC1_BYTE0 ← SRC1[BLK1_OFFSET+7:BLK1_OFFSET]
SRC1_BYTE1 ← SRC1[BLK1_OFFSET+15:BLK1_OFFSET+8]
SRC1_BYTE2 ← SRC1[BLK1_OFFSET+23:BLK1_OFFSET+16]
SRC1_BYTE3 ← SRC1[BLK1_OFFSET+31:BLK1_OFFSET+24]
SRC1_BYTE4 ← SRC1[BLK1_OFFSET+39:BLK1_OFFSET+32]
SRC1_BYTE5 ← SRC1[BLK1_OFFSET+47:BLK1_OFFSET+40]
SRC1_BYTE6 ← SRC1[BLK1_OFFSET+55:BLK1_OFFSET+48]
SRC1_BYTE7 ← SRC1[BLK1_OFFSET+63:BLK1_OFFSET+56]
SRC1_BYTE8 ← SRC1[BLK1_OFFSET+71:BLK1_OFFSET+64]
SRC1_BYTE9 ← SRC1[BLK1_OFFSET+79:BLK1_OFFSET+72]
SRC1_BYTE10 ← SRC1[BLK1_OFFSET+87:BLK1_OFFSET+80]
SRC2_BYTE0 ←SRC2[BLK2_OFFSET+7:BLK2_OFFSET]
SRC2_BYTE1 ← SRC2[BLK2_OFFSET+15:BLK2_OFFSET+8]
SRC2_BYTE2 ← SRC2[BLK2_OFFSET+23:BLK2_OFFSET+16]
SRC2_BYTE3 ← SRC2[BLK2_OFFSET+31:BLK2_OFFSET+24]
TEMP0 ← ABS(SRC1_BYTE0 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE1 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE2 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE3 - SRC2_BYTE3)
DEST[15:0] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS(SRC1_BYTE1 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE2 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE3 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE4 - SRC2_BYTE3)
DEST[31:16] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS(SRC1_BYTE2 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE3 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE4 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE5 - SRC2_BYTE3)
DEST[47:32] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS(SRC1_BYTE3 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE4 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE5 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE6 - SRC2_BYTE3)
DEST[63:48] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS(SRC1_BYTE4 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE5 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE6 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE7 - SRC2_BYTE3)
DEST[79:64] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS(SRC1_BYTE5 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE6 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE7 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE8 - SRC2_BYTE3)
DEST[95:80] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS(SRC1_BYTE6 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE7 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE8 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE9 - SRC2_BYTE3)
DEST[111:96] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS(SRC1_BYTE7 - SRC2_BYTE0)
TEMP1 ← ABS(SRC1_BYTE8 - SRC2_BYTE1)
TEMP2 ← ABS(SRC1_BYTE9 - SRC2_BYTE2)
TEMP3 ← ABS(SRC1_BYTE10 - SRC2_BYTE3)
DEST[127:112] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
DEST[MAXVL-1:128] ← 0
```
#### MPSADBW (128-bit Legacy SSE version)
```java
SRC_OFFSET ← imm8[1:0]*32
DEST_OFFSET ← imm8[2]*32
DEST_BYTE0 ← DEST[DEST_OFFSET+7:DEST_OFFSET]
DEST_BYTE1 ← DEST[DEST_OFFSET+15:DEST_OFFSET+8]
DEST_BYTE2 ← DEST[DEST_OFFSET+23:DEST_OFFSET+16]
DEST_BYTE3 ← DEST[DEST_OFFSET+31:DEST_OFFSET+24]
DEST_BYTE4 ← DEST[DEST_OFFSET+39:DEST_OFFSET+32]
DEST_BYTE5 ← DEST[DEST_OFFSET+47:DEST_OFFSET+40]
DEST_BYTE6 ← DEST[DEST_OFFSET+55:DEST_OFFSET+48]
DEST_BYTE7 ← DEST[DEST_OFFSET+63:DEST_OFFSET+56]
DEST_BYTE8 ← DEST[DEST_OFFSET+71:DEST_OFFSET+64]
DEST_BYTE9 ← DEST[DEST_OFFSET+79:DEST_OFFSET+72]
DEST_BYTE10 ← DEST[DEST_OFFSET+87:DEST_OFFSET+80]
SRC_BYTE0 ← SRC[SRC_OFFSET+7:SRC_OFFSET]
SRC_BYTE1 ← SRC[SRC_OFFSET+15:SRC_OFFSET+8]
SRC_BYTE2 ← SRC[SRC_OFFSET+23:SRC_OFFSET+16]
SRC_BYTE3 ← SRC[SRC_OFFSET+31:SRC_OFFSET+24]
TEMP0 ← ABS( DEST_BYTE0 - SRC_BYTE0) 
TEMP1 ← ABS( DEST_BYTE1 - SRC_BYTE1) 
TEMP2 ← ABS( DEST_BYTE2 - SRC_BYTE2) 
TEMP3 ← ABS( DEST_BYTE3 - SRC_BYTE3) 
DEST[15:0] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS( DEST_BYTE1 - SRC_BYTE0) 
TEMP1 ← ABS( DEST_BYTE2 - SRC_BYTE1) 
TEMP2 ← ABS( DEST_BYTE3 - SRC_BYTE2) 
TEMP3 ← ABS( DEST_BYTE4 - SRC_BYTE3) 
DEST[31:16] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS( DEST_BYTE2 - SRC_BYTE0) 
TEMP1 ← ABS( DEST_BYTE3 - SRC_BYTE1) 
TEMP2 ← ABS( DEST_BYTE4 - SRC_BYTE2) 
TEMP3 ← ABS( DEST_BYTE5 - SRC_BYTE3) 
DEST[47:32] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS( DEST_BYTE3 - SRC_BYTE0) 
TEMP1 ← ABS( DEST_BYTE4 - SRC_BYTE1) 
TEMP2 ← ABS( DEST_BYTE5 - SRC_BYTE2) 
TEMP3 ← ABS( DEST_BYTE6 - SRC_BYTE3) 
DEST[63:48] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS( DEST_BYTE4 - SRC_BYTE0) 
TEMP1 ← ABS( DEST_BYTE5 - SRC_BYTE1) 
TEMP2 ← ABS( DEST_BYTE6 - SRC_BYTE2) 
TEMP3 ← ABS( DEST_BYTE7 - SRC_BYTE3) 
DEST[79:64] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS( DEST_BYTE5 - SRC_BYTE0) 
TEMP1 ← ABS( DEST_BYTE6 - SRC_BYTE1) 
TEMP2 ← ABS( DEST_BYTE7 - SRC_BYTE2) 
TEMP3 ← ABS( DEST_BYTE8 - SRC_BYTE3) 
DEST[95:80] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS( DEST_BYTE6 - SRC_BYTE0) 
TEMP1 ← ABS( DEST_BYTE7 - SRC_BYTE1) 
TEMP2 ← ABS( DEST_BYTE8 - SRC_BYTE2) 
TEMP3 ← ABS( DEST_BYTE9 - SRC_BYTE3) 
DEST[111:96] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
TEMP0 ← ABS( DEST_BYTE7 - SRC_BYTE0) 
TEMP1 ← ABS( DEST_BYTE8 - SRC_BYTE1) 
TEMP2 ← ABS( DEST_BYTE9 - SRC_BYTE2) 
TEMP3 ← ABS( DEST_BYTE10 - SRC_BYTE3) 
DEST[127:112] ← TEMP0 + TEMP1 + TEMP2 + TEMP3
DEST[MAXVL-1:128] (Unmodified)
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
(V)MPSADBW:
 __m128i _mm_mpsadbw_epu8 (__m128i s1, __m128i s2, const int mask);
VMPSADBW:
 __m256i _mm256_mpsadbw_epu8 (__m256i s1, __m256i s2, const int mask);
```
### Flags Affected
None

### Other Exceptions

See Exceptions Type 4; additionally
<p>#UD
If VEX.L = 1.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
