<b>PSRLDQ</b> — Shift Double Quadword Right Logical
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 73 /3 ib PSRLDQ xmm1, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Shift xmm1 right by imm8 while shifting in 0s.</td>
	</tr>
	<tr>
		<td>VEX.NDD.128.66.0F.WIG 73 /3 ib VPSRLDQ xmm1, xmm2, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Shift xmm2 right by imm8 bytes while shifting in 0s.</td>
	</tr>
	<tr>
		<td>VEX.NDD.256.66.0F.WIG 73 /3 ib VPSRLDQ ymm1, ymm2, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Shift ymm1 right by imm8 bytes while shifting in 0s.</td>
	</tr>
	<tr>
		<td>EVEX.NDD.128.66.0F.WIG 73 /3 ib VPSRLDQ xmm1, xmm2/m128, imm8</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Shift xmm2/m128 right by imm8 bytes while shifting in 0s and store result in xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.NDD.256.66.0F.WIG 73 /3 ib VPSRLDQ ymm1, ymm2/m256, imm8</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Shift ymm2/m256 right by imm8 bytes while shifting in 0s and store result in ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.NDD.512.66.0F.WIG 73 /3 ib VPSRLDQ zmm1, zmm2/m512, imm8</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Shift zmm2/m512 right by imm8 bytes while shifting in 0s and store result in zmm1.</td>
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
		<td>ModRM:r/m (r, w)</td>
		<td>imm8</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>B</td>
		<td>NA</td>
		<td>VEX.vvvv (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>C</td>
		<td>Full Mem</td>
		<td>EVEX.vvvv (w)</td>
		<td>ModRM:r/m (R)</td>
		<td>Imm8</td>
		<td>NA</td>
	</tr>
</table>


### Description
Shifts the destination operand (first operand) to the right by the number of bytes specified in the count operand
(second operand). The empty high-order bytes are cleared (set to all 0s). If the value specified by the count
operand is greater than 15, the destination operand is set to all 0s. The count operand is an 8-bit immediate.

In 64-bit mode and not encoded with VEX/EVEX, using a REX prefix in the form of REX.R permits this instruction to
access additional registers (XMM8-XMM15).

128-bit Legacy SSE version: The source and destination operands are the same. Bits (MAXVL-1:128) of the corresponding
 YMM destination register remain unchanged.

VEX.128 encoded version: The source and destination operands are XMM registers. Bits (MAXVL-1:128) of the
destination YMM register are zeroed.

VEX.256 encoded version: The source operand is a YMM register. The destination operand is a YMM register. The
count operand applies to both the low and high 128-bit lanes.

VEX.256 encoded version: The source operand is YMM register. The destination operand is an YMM register. Bits
(MAXVL-1:256) of the corresponding ZMM register are zeroed. The count operand applies to both the low and high
128-bit lanes.

EVEX encoded versions: The source operand is a ZMM/YMM/XMM register or a 512/256/128-bit memory location.
The destination operand is a ZMM/YMM/XMM register. The count operand applies to each 128-bit lanes.

Note: VEX.vvvv/EVEX.vvvv encodes the destination register.

### Operation


#### VPSRLDQ (EVEX.512 encoded version)
```java
TEMP ← COUNT
IF (TEMP > 15) THEN TEMP ← 16; FI
DEST[127:0] ← SRC[127:0] >> (TEMP * 8)
DEST[255:128] ← SRC[255:128] >> (TEMP * 8)
DEST[383:256] ← SRC[383:256] >> (TEMP * 8)
DEST[511:384] ← SRC[511:384] >> (TEMP * 8)
DEST[MAXVL-1:512] ← 0;
```
#### VPSRLDQ (VEX.256 and EVEX.256 encoded version)
```java
TEMP ← COUNT
IF (TEMP > 15) THEN TEMP ← 16; FI
DEST[127:0] ← SRC[127:0] >> (TEMP * 8)
DEST[255:128] ← SRC[255:128] >> (TEMP * 8)
DEST[MAXVL-1:256] ← 0;
```
#### VPSRLDQ (VEX.128 and EVEX.128 encoded version)
```java
TEMP ← COUNT
IF (TEMP > 15) THEN TEMP ← 16; FI
DEST ← SRC >> (TEMP * 8)
DEST[MAXVL-1:128] ← 0;
```
#### PSRLDQ(128-bit Legacy SSE version)
```java
TEMP ← COUNT
IF (TEMP > 15) THEN TEMP ← 16; FI
DEST ← DEST >> (TEMP * 8)
DEST[MAXVL-1:128] (Unmodified)
```
#### Intel C/C++ Compiler Intrinsic Equivalents
```java
(V)PSRLDQ __m128i _mm_srli_si128 ( __m128i a, int imm)
VPSRLDQ __m256i _mm256_bsrli_epi128 ( __m256i, const int)
VPSRLDQ __m512i _mm512_bsrli_epi128 ( __m512i, int)
```
### Flags Affected
None.

### Numeric Exceptions

None.

### Other Exceptions

Non-EVEX-encoded instruction, see Exceptions Type 7.
EVEX-encoded instruction, see Exceptions Type E4NF.nb.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
