<b>PCLMULQDQ</b> —  Carry-Less Multiplication Quadword
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 3A 44 /r ib PCLMULQDQ xmm1, xmm2/m128, imm8</td>
		<td>RMI</td>
		<td>V/V</td>
		<td>PCLMULQDQ</td>
		<td>Carry-less multiplication of one quadword of xmm1 by one quadword of xmm2/m128, stores the 128-bit result in xmm1. The immediate is used to determine which quadwords of xmm1 and xmm2/m128 should be used.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F3A.WIG 44 /r ib VPCLMULQDQ xmm1, xmm2, xmm3/m128, imm8</td>
		<td>RVMI</td>
		<td>V/V</td>
		<td>Both PCLMULQDQ and AVX flags</td>
		<td>Carry-less multiplication of one quadword of xmm2 by one quadword of xmm3/m128, stores the 128-bit result in xmm1. The immediate is used to determine which quadwords of xmm2 and xmm3/m128 should be used.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand2</b></td>
		<td><b>Operand3</b></td>
		<td><b>Operand4</b></td>
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
Performs a carry-less multiplication of two quadwords, selected from the first source and second source operand
according to the value of the immediate byte. Bits 4 and 0 are used to select which 64-bit half of each operand to
use according to Table 4-13, other bits of the immediate byte are ignored.

Table 4-13.  PCLMULQDQ Quadword Selection of Immediate Byte
<table>
	<tr>
		<td><b>Imm[4]</b></td>
		<td><b>Imm[0]</b></td>
		<td><b>PCLMULQDQ Operation</b></td>
	</tr>
	<tr>
		<td>0</td>
		<td>0</td>
		<td>CL_MUL( SRC2<sup>1</sup>[63:0], SRC1[63:0] )</td>
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
1. SRC2 denotes the second source operand, which can be a register or memory; SRC1 denotes the first source and destination operand.

The first source operand and the destination operand are the same and must be an XMM register. The second
source operand can be an XMM register or a 128-bit memory location. Bits (MAXVL-1:128) of the corresponding
YMM destination register remain unchanged.

Compilers and assemblers may implement the following pseudo-op syntax to simply programming and emit the
required encoding for Imm8.

Table 4-14.  Pseudo-Op and PCLMULQDQ Implementation
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


#### PCLMULQDQ
```java
IF (Imm8[0] = 0 ) 
    THEN
        TEMP1 ← SRC1 [63:0];
    ELSE
        TEMP1 ← SRC1 [127:64];
FI
IF (Imm8[4] = 0 ) 
    THEN
        TEMP2 ← SRC2 [63:0];
    ELSE
        TEMP2 ← SRC2 [127:64];
FI
For i = 0 to 63 {
    TmpB [ i ] ← (TEMP1[ 0 ] and TEMP2[ i ]);
    For j = 1 to i {
        TmpB [ i ] ← TmpB [ i ] xor (TEMP1[ j ] and TEMP2[ i - j ])
    }
    DEST[ i ] ← TmpB[ i ];
}
For i = 64 to 126 {
    TmpB [ i ] ← 0;
    For j = i - 63 to 63 {
        TmpB [ i ] ← TmpB [ i ] xor (TEMP1[ j ] and TEMP2[ i - j ])
    }
    DEST[ i ] ← TmpB[ i ];
}
DEST[127] ← 0;
DEST[MAXVL-1:128] (Unmodified)
```
#### VPCLMULQDQ
```java
IF (Imm8[0] = 0 ) 
    THEN
        TEMP1 ← SRC1 [63:0];
    ELSE
        TEMP1 ← SRC1 [127:64];
FI
IF (Imm8[4] = 0 ) 
    THEN
        TEMP2 ← SRC2 [63:0];
    ELSE
        TEMP2 ← SRC2 [127:64];
FI
For i = 0 to 63 {
    TmpB [ i ] ← (TEMP1[ 0 ] and TEMP2[ i ]);
    For j = 1 to i {
        TmpB [i] ← TmpB [i] xor (TEMP1[ j ] and TEMP2[ i - j ])
    }
    DEST[i] ← TmpB[i];
}
For i = 64 to 126 {
    TmpB [ i ] ← 0;
    For j = i - 63 to 63 {
        TmpB [i] ← TmpB [i] xor (TEMP1[ j ] and TEMP2[ i - j ])
    }
    DEST[i] ← TmpB[i];
}
DEST[MAXVL-1:127] ← 0;
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
(V)PCLMULQDQ:
 __m128i  _mm_clmulepi64_si128 (__m128i, __m128i, const int)
```
### SIMD Floating-Point Exceptions
None.

### Other Exceptions

See Exceptions Type 4, additionally
<p>#UD
If VEX.L = 1.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
