<b>VPCLMULQDQ</b> —  Carry-Less Multiplication Quadword
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.256.66.0F3A.WIG 44 /r /ib VPCLMULQDQ ymm1, ymm2, ymm3/m256, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>VPCLMULQDQ</td>
		<td>Carry-less multiplication of one quadword of ymm2 by one quadword of ymm3/m256, stores the 128-bit result in ymm1. The immediate is used to determine which quadwords of ymm2 and ymm3/m256 should be used.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F3A.WIG 44 /r /ib VPCLMULQDQ xmm1, xmm2, xmm3/m128, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL VPCLMULQDQ</td>
		<td>Carry-less multiplication of one quadword of xmm2 by one quadword of xmm3/m128, stores the 128-bit result in xmm1. The immediate is used to determine which quadwords of xmm2 and xmm3/m128 should be used.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F3A.WIG 44 /r /ib VPCLMULQDQ ymm1, ymm2, ymm3/m256, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL VPCLMULQDQ</td>
		<td>Carry-less multiplication of one quadword of ymm2 by one quadword of ymm3/m256, stores the 128-bit result in ymm1. The immediate is used to determine which quadwords of ymm2 and ymm3/m256 should be used.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F3A.WIG 44 /r /ib VPCLMULQDQ zmm1, zmm2, zmm3/m512, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512F VPCLMULQDQ</td>
		<td>Carry-less multiplication of one quadword of zmm2 by one quadword of zmm3/m512, stores the 128-bit result in zmm1. The immediate is used to determine which quadwords of zmm2 and zmm3/m512 should be used.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Tuple</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand 2</b></td>
		<td><b>Operand 3</b></td>
		<td><b>Operand 4</b></td>
	</tr>
	<tr>
		<td>A</td>
		<td>NA</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8 (r)</td>
	</tr>
	<tr>
		<td>B</td>
		<td>Full Mem</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8 (r)</td>
	</tr>
</table>


### Description
Performs a carry-less multiplication of two quadwords, selected from the first source and second source operand
according to the value of the immediate byte. Bits 4 and 0 are used to select which 64-bit half of each operand to
use according to the table below, other bits of the immediate byte are ignored.

The EVEX encoded form of this instruction does not support memory fault suppression.

Table 2-7.  PCLMULQDQ Quadword Selection of Immediate Byte
<table>
	<tr>
		<td><b>imm[4]</b></td>
		<td><b>imm[0]</b></td>
		<td><b>PCLMULQDQ Operation</b></td>
	</tr>
	<tr>
		<td>0</td>
		<td>0</td>
		<td>CL_MUL( SRC2[63:0], SRC1[63:0] )</td>
	</tr>
	<tr>
		<td>0</td>
		<td>1</td>
		<td>CL_MUL( SRC2[63:0], SRC1[127:64] )</td>
	</tr>
	<tr>
		<td>1</td>
		<td>0</td>
		<td>CL_MUL( SRC2[127:64], SRC1[63:0] )</td>
	</tr>
	<tr>
		<td>1</td>
		<td>1</td>
		<td>CL_MUL( SRC2[127:64], SRC1[127:64] )</td>
	</tr>
</table>

NOTES:
SRC2 denotes the second source operand, which can be a register or memory; SRC1 denotes the first source and
destination operand.

The first source operand and the destination operand are the same and must be a ZMM/YMM/XMM register. The
second source operand can be a ZMM/YMM/XMM register or a 512/256/128-bit memory location. Bits (VL_MAX-
1:128) of the corresponding YMM destination register remain unchanged.

Compilers and assemblers may implement the following pseudo-op syntax to simply programming and emit the
required encoding for imm8.

Table 2-8.  Pseudo-Op and PCLMULQDQ Implementation
<table>
	<tr>
		<td><b>Pseudo-Op</b></td>
		<td><b>Imm8 Encoding</b></td>
	</tr>
	<tr>
		<td>PCLMULLQLQDQ xmm1, xmm2</td>
		<td>0000_0000B</td>
	</tr>
	<tr>
		<td>PCLMULHQLQDQ xmm1, xmm2</td>
		<td>0000_0001B</td>
	</tr>
	<tr>
		<td>PCLMULLQHQDQ xmm1, xmm2</td>
		<td>0001_0000B</td>
	</tr>
	<tr>
		<td>PCLMULHQHQDQ xmm1, xmm2</td>
		<td>0001_0001B</td>
	</tr>
</table>


### Operation

```java
define PCLMUL128(X,Y): 
                            // helper function
    FOR i ← 0 to 63:
        TMP [ i ] ← X[ 0 ] and Y[ i ]
        FOR j ← 1 to i:
            TMP [ i ] ← TMP [ i ] xor (X[ j ] and Y[ i - j ])
        DEST[ i ] ← TMP[ i ]
    FOR i ← 64 to 126:
        TMP [ i ] ← 0
        FOR j ← i - 63 to 63:
            TMP [ i ] ← TMP [ i ] xor (X[ j ] and Y[ i - j ])
        DEST[ i ] ← TMP[ i ]
    DEST[127] ← 0;
    RETURN DEST 
                            // 128b vector
```
#### PCLMULQDQ (SSE version)
```java
IF Imm8[0] = 0:
    TEMP1 ← SRC1.qword[0]
ELSE:
    TEMP1 ← SRC1.qword[1]
IF Imm8[4] = 0:
    TEMP2 ← SRC2.qword[0]
ELSE:
    TEMP2 ← SRC2.qword[1]
DEST[127:0] ← PCLMUL128(TEMP1, TEMP2)
DEST[MAXVL-1:128] (Unmodified)
```
#### VPCLMULQDQ (128b and 256b VEX encoded versions)
```java
(KL,VL) = (1,128), (2,256)
FOR i= 0 to KL-1:
    IF Imm8[0] = 0:
        TEMP1 ← SRC1.xmm[i].qword[0]
    ELSE:
        TEMP1 ← SRC1.xmm[i].qword[1]
    IF Imm8[4] = 0:
        TEMP2 ← SRC2.xmm[i].qword[0]
    ELSE:
        TEMP2 ← SRC2.xmm[i].qword[1]
    DEST.xmm[i] ← PCLMUL128(TEMP1, TEMP2)
DEST[MAXVL-1:VL] ← 0
```
#### VPCLMULQDQ (EVEX encoded version)
```java
(KL,VL) = (1,128), (2,256), (4,512)
FOR i = 0 to KL-1:
    IF Imm8[0] = 0:
        TEMP1 ← SRC1.xmm[i].qword[0]
    ELSE:
        TEMP1 ← SRC1.xmm[i].qword[1]
    IF Imm8[4] = 0:
        TEMP2 ← SRC2.xmm[i].qword[0]
    ELSE:
        TEMP2 ← SRC2.xmm[i].qword[1]
    DEST.xmm[i] ← PCLMUL128(TEMP1, TEMP2)
DEST[MAXVL-1:VL] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPCLMULQDQ __m256i _mm256_clmulepi64_epi128(__m256i, __m256i, const int);
VPCLMULQDQ __m512i _mm512_clmulepi64_epi128(__m512i, __m512i, const int);
```
### SIMD Floating-Point Exceptions
None.

### Other Exceptions

VEX-encoded: Exceptions Type 4.
EVEX-encoded: See Exceptions Type E4NF.

 --- 
<p align="right"><i>Source: Intel® Architecture Instruction Set Extensions and Future Features Programming Reference (May 2019)<br>Generated: 28-5-2019</i></p>