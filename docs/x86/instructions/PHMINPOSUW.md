<b>PHMINPOSUW</b> —  Packed Horizontal Word Minimum
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 38 41 /r PHMINPOSUW xmm1, xmm2/m128</td>
		<td>RM</td>
		<td>V/V</td>
		<td>SSE4_1</td>
		<td>Find the minimum unsigned word in xmm2/m128 and place its value in the low word of xmm1 and its index in the second- lowest word of xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F38.WIG 41 /r VPHMINPOSUW xmm1, xmm2/m128</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Find the minimum unsigned word in xmm2/m128 and place its value in the low word of xmm1 and its index in the second- lowest word of xmm1.</td>
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
		<td>RM</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Determine the minimum unsigned word value in the source operand (second operand) and place the unsigned
word in the low word (bits 0-15) of the destination operand (first operand). The word index of the minimum value
is stored in bits 16-18 of the destination operand. The remaining upper bits of the destination are set to zero.

128-bit Legacy SSE version: Bits (MAXVL-1:128) of the corresponding XMM destination register remain
unchanged.

VEX.128 encoded version: Bits (MAXVL-1:128) of the destination XMM register are zeroed. VEX.vvvv is reserved
and must be 1111b, VEX.L must be 0, otherwise the instruction will \#UD.

### Operation


#### PHMINPOSUW (128-bit Legacy SSE version)
```java
INDEX ← 0;
MIN ← SRC[15:0]
IF (SRC[31:16] < MIN) 
    THEN INDEX ← 1;  MIN ← SRC[31:16]; FI;
IF (SRC[47:32] < MIN) 
    THEN INDEX ← 2;  MIN ← SRC[47:32]; FI;
* Repeat operation for words 3 through 6
IF (SRC[127:112] < MIN) 
    THEN INDEX ← 7;  MIN ← SRC[127:112]; FI;
DEST[15:0] ← MIN;
DEST[18:16] ← INDEX;
DEST[127:19] ← 0000000000000000000000000000H;
```
#### VPHMINPOSUW (VEX.128 encoded version)
```java
INDEX ← 0
MIN ← SRC[15:0]
IF (SRC[31:16] < MIN) THEN INDEX ← 1; MIN ← SRC[31:16]
IF (SRC[47:32] < MIN) THEN INDEX ← 2; MIN ← SRC[47:32]
* Repeat operation for words 3 through 6
IF (SRC[127:112] < MIN) THEN INDEX ← 7; MIN ← SRC[127:112]
DEST[15:0] ← MIN
DEST[18:16] ← INDEX
DEST[127:19] ← 0000000000000000000000000000H
DEST[MAXVL-1:128] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
PHMINPOSUW:
__m128i _mm_minpos_epu16( __m128i packed_words);
```
### Flags Affected
None.

### SIMD Floating-Point Exceptions

None.

### Other Exceptions

See Exceptions Type 4; additionally
<p>#UD
If VEX.L = 1.
If VEX.vvvv ≠ 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
