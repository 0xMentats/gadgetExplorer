<b>PSADBW</b> — Compute Sum of Absolute Differences
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F F6 /r1 PSADBW mm1, mm2/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Computes the absolute differences of the packed unsigned byte integers from mm2 /m64 and mm1; differences are then summed to produce an unsigned word integer result.</td>
	</tr>
	<tr>
		<td>66 0F F6 /r PSADBW xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Computes the absolute differences of the packed unsigned byte integers from xmm2 /m128 and xmm1; the 8 low differences and 8 high differences are then summed separately to produce two unsigned word integer results.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.WIG F6 /r VPSADBW xmm1, xmm2, xmm3/m128</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Computes the absolute differences of the packed unsigned byte integers from xmm3 /m128 and xmm2; the 8 low differences and 8 high differences are then summed separately to produce two unsigned word integer results.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F.WIG F6 /r VPSADBW ymm1, ymm2, ymm3/m256</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Computes the absolute differences of the packed unsigned byte integers from ymm3 /m256 and ymm2; then each consecutive 8 differences are summed separately to produce four unsigned word integer results.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F.WIG F6 /r VPSADBW xmm1, xmm2, xmm3/m128</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Computes the absolute differences of the packed unsigned byte integers from xmm3 /m128 and xmm2; then each consecutive 8 differences are summed separately to produce four unsigned word integer results.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F.WIG F6 /r VPSADBW ymm1, ymm2, ymm3/m256</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Computes the absolute differences of the packed unsigned byte integers from ymm3 /m256 and ymm2; then each consecutive 8 differences are summed separately to produce four unsigned word integer results.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F.WIG F6 /r VPSADBW zmm1, zmm2, zmm3/m512</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Computes the absolute differences of the packed unsigned byte integers from zmm3 /m512 and zmm2; then each consecutive 8 differences are summed separately to produce four unsigned word integer results.</td>
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
		<td>EVEX.vvvv</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
Computes the absolute value of the difference of 8 unsigned byte integers from the source operand (second
operand) and from the destination operand (first operand). These 8 differences are then summed to produce an
unsigned word integer result that is stored in the destination operand. Figure 4-14 shows the operation of the
PSADBW instruction when using 64-bit operands.

When operating on 64-bit operands, the word integer result is stored in the low word of the destination operand,
and the remaining bytes in the destination operand are cleared to all 0s.

When operating on 128-bit operands, two packed results are computed. Here, the 8 low-order bytes of the source
and destination operands are operated on to produce a word result that is stored in the low word of the destination
operand, and the 8 high-order bytes are operated on to produce a word result that is stored in bits 64 through 79
of the destination operand. The remaining bytes of the destination operand are cleared.

For 256-bit version, the third group of 8 differences are summed to produce an unsigned word in bits[143:128] of
the destination register and the fourth group of 8 differences are summed to produce an unsigned word in
bits[207:192] of the destination register. The remaining words of the destination are set to 0.

For 512-bit version, the fifth group result is stored in bits [271:256] of the destination. The result from the sixth
group is stored in bits [335:320]. The results for the seventh and eighth group are stored respectively in bits
[399:384] and bits [463:447], respectively. The remaining bits in the destination are set to 0.

In 64-bit mode and not encoded by VEX/EVEX prefix, using a REX prefix in the form of REX.R permits this instruction
 to access additional registers (XMM8-XMM15).

Legacy SSE version: The source operand can be an MMX technology register or a 64-bit memory location. The
destination operand is an MMX technology register.

128-bit Legacy SSE version: The first source operand and destination register are XMM registers. The second
source operand is an XMM register or a 128-bit memory location. Bits (MAXVL-1:128) of the corresponding ZMM
destination register remain unchanged.

VEX.128 and EVEX.128 encoded versions: The first source operand and destination register are XMM registers. The
second source operand is an XMM register or a 128-bit memory location. Bits (MAXVL-1:128) of the corresponding
ZMM register are zeroed.

VEX.256 and EVEX.256 encoded versions: The first source operand and destination register are YMM registers. The
second source operand is an YMM register or a 256-bit memory location. Bits (MAXVL-1:256) of the corresponding
ZMM register are zeroed.

EVEX.512 encoded version: The first source operand and destination register are ZMM registers. The second
source operand is a ZMM register or a 512-bit memory location.
<table>
	<tr>
		<td colspan=11 rowspan=8><b>SRC DEST TEMP DEST X7 Y7 X6 Y6 X5 Y5 X4 Y4 X3 Y3 X2 Y2 X1 Y1 X0 Y0 ABS(X7:Y7) ABS(X6:Y6) ABS(X5:Y5) ABS(X4:Y4) ABS(X3:Y3) ABS(X2:Y2) ABS(X1:Y1) ABS(X0:Y0) 00H 00H 00H 00H 00H 00H SUM(TEMP7...TEMP0)</b></td>
	</tr>
	<tr>
		<td>X7</td>
		<td>X6</td>
		<td>X5</td>
		<td>X4</td>
		<td>X3</td>
		<td>X2</td>
		<td>X1</td>
		<td colspan=2>X0</td>
	</tr>
	<tr>
	</tr>
	<tr>
		<td>Y7</td>
		<td>Y6</td>
		<td>Y5</td>
		<td>Y4</td>
		<td>Y3</td>
		<td>Y2</td>
		<td>Y1</td>
		<td colspan=2>Y0</td>
	</tr>
	<tr>
	</tr>
	<tr>
		<td>ABS(X7:Y7) ABS(X6:Y6) ABS(X5:Y5) ABS(X4:Y4) ABS(X3:Y3) ABS(X2:Y2) ABS(X1:Y1)</td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td colspan=2>ABS(X0:Y0)</td>
	</tr>
	<tr>
	</tr>
	<tr>
	</tr>
</table>

Figure 4-14.  PSADBW Instruction Operation Using 64-bit Operands

### Operation


#### VPSADBW (EVEX encoded versions)
```java
VL = 128, 256, 512
TEMP0 ← ABS(SRC1[7:0] - SRC2[7:0])
(* Repeat operation for bytes 1 through 15 *)
TEMP15 ← ABS(SRC1[127:120] - SRC2[127:120])
DEST[15:0] ←SUM(TEMP0:TEMP7)
DEST[63:16] ← 000000000000H
DEST[79:64] ← SUM(TEMP8:TEMP15)
DEST[127:80] ← 00000000000H
IF VL >= 256
    (* Repeat operation for bytes 16 through 31*)
    TEMP31 ← ABS(SRC1[255:248] - SRC2[255:248])
    DEST[143:128] ←SUM(TEMP16:TEMP23)
    DEST[191:144] ← 000000000000H
    DEST[207:192] ← SUM(TEMP24:TEMP31)
    DEST[223:208] ← 00000000000H
FI;
IF VL >= 512
(* Repeat operation for bytes 32 through 63*)
    TEMP63 ← ABS(SRC1[511:504] - SRC2[511:504])
    DEST[271:256] ←SUM(TEMP0:TEMP7)
    DEST[319:272] ← 000000000000H
    DEST[335:320] ← SUM(TEMP8:TEMP15)
    DEST[383:336] ← 00000000000H
    DEST[399:384] ←SUM(TEMP16:TEMP23)
    DEST[447:400] ← 000000000000H
    DEST[463:448] ← SUM(TEMP24:TEMP31)
    DEST[511:464] ← 00000000000H
FI;
DEST[MAXVL-1:VL] ← 0
```
#### VPSADBW (VEX.256 encoded version)
```java
TEMP0 ← ABS(SRC1[7:0] - SRC2[7:0])
(* Repeat operation for bytes 2 through 30*)
TEMP31 ← ABS(SRC1[255:248] - SRC2[255:248])
DEST[15:0] ←SUM(TEMP0:TEMP7)
DEST[63:16] ← 000000000000H
DEST[79:64] ← SUM(TEMP8:TEMP15)
DEST[127:80] ← 00000000000H
DEST[143:128] ←SUM(TEMP16:TEMP23)
DEST[191:144] ← 000000000000H
DEST[207:192] ← SUM(TEMP24:TEMP31)
DEST[223:208] ← 00000000000H
DEST[MAXVL-1:256] ← 0
```
#### VPSADBW (VEX.128 encoded version)
```java
TEMP0 ← ABS(SRC1[7:0] - SRC2[7:0])
(* Repeat operation for bytes 2 through 14 *)
TEMP15 ← ABS(SRC1[127:120] - SRC2[127:120])
DEST[15:0] ←SUM(TEMP0:TEMP7)
DEST[63:16] ← 000000000000H
DEST[79:64] ← SUM(TEMP8:TEMP15)
DEST[127:80] ← 00000000000H
DEST[MAXVL-1:128] ← 0
```
#### PSADBW (128-bit Legacy SSE version)
```java
TEMP0 ← ABS(DEST[7:0] - SRC[7:0])
(* Repeat operation for bytes 2 through 14 *)
TEMP15 ← ABS(DEST[127:120] - SRC[127:120])
DEST[15:0] ←SUM(TEMP0:TEMP7)
DEST[63:16] ← 000000000000H
DEST[79:64] ← SUM(TEMP8:TEMP15)
DEST[127:80] ← 00000000000
DEST[MAXVL-1:128] (Unmodified)
```
#### PSADBW (64-bit operand)
```java
TEMP0 ← ABS(DEST[7:0] - SRC[7:0])
(* Repeat operation for bytes 2 through 6 *)
TEMP7 ← ABS(DEST[63:56] - SRC[63:56])
DEST[15:0] ←SUM(TEMP0:TEMP7)
DEST[63:16] ← 000000000000H
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPSADBW __m512i _mm512_sad_epu8( __m512i a, __m512i b)
PSADBW:__m64 _mm_sad_pu8(__m64 a,__m64 b)
(V)PSADBW:__m128i _mm_sad_epu8(__m128i a, __m128i b)
VPSADBW:__m256i _mm256_sad_epu8( __m256i a, __m256i b)
```
### Flags Affected
None.

### SIMD Floating-Point Exceptions

None.

### Other Exceptions

Non-EVEX-encoded instruction, see Exceptions Type 4.
EVEX-encoded instruction, see Exceptions Type E4NF.nb.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
