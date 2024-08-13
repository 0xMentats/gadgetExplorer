<b>AESDECLAST</b> — Perform Last Round of an AES Decryption Flow
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32-bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 38 DF /r AESDECLAST xmm1, xmm2/m128</td>
		<td>RM V/V</td>
		<td></td>
		<td>AES</td>
		<td>Perform the last round of an AES decryption flow, using the Equivalent Inverse Cipher, operating on a 128-bit data (state) from xmm1 with a 128-bit round key from xmm2/m128.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F38.WIG DF /r VAESDECLAST xmm1, xmm2, xmm3/m128</td>
		<td>RVM V/V</td>
		<td></td>
		<td>Both AES and AVX flags</td>
		<td>Perform the last round of an AES decryption flow, using the Equivalent Inverse Cipher, operating on a 128-bit data (state) from xmm2 with a 128-bit round key from xmm3/m128; store the result in xmm1.</td>
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
		<td>RM</td>
		<td>ModRM:reg (r, w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>RVM</td>
		<td>ModRM:reg (w)</td>
		<td>VEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
This instruction performs the last round of the AES decryption flow using the Equivalent Inverse Cipher, with the
round key from the second source operand, operating on a 128-bit data (state) from the first source operand, and
store the result in the destination operand.

128-bit Legacy SSE version: The first source operand and the destination operand are the same and must be an
XMM register. The second source operand can be an XMM register or a 128-bit memory location. Bits (MAXVL-
1:128) of the corresponding YMM destination register remain unchanged.

VEX.128 encoded version: The first source operand and the destination operand are XMM registers. The second
source operand can be an XMM register or a 128-bit memory location. Bits (MAXVL-1:128) of the destination YMM
register are zeroed.

### Operation


#### AESDECLAST
```java
STATE ← SRC1;
RoundKey ← SRC2;
STATE ← InvShiftRows( STATE );
STATE ← InvSubBytes( STATE );
DEST[127:0] ← STATE XOR RoundKey;
DEST[MAXVL-1:128] (Unmodified)
```
#### VAESDECLAST
```java
STATE ← SRC1;
RoundKey ← SRC2;
STATE ← InvShiftRows( STATE );
STATE ← InvSubBytes( STATE );
DEST[127:0] ← STATE XOR RoundKey;
DEST[MAXVL-1:128] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
(V)AESDECLAST:
__m128i _mm_aesdeclast (__m128i, __m128i)
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

See Exceptions Type 4.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
