<b>AESIMC</b> — Perform the AES InvMixColumn Transformation
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32-bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 38 DB /r AESIMC xmm1, xmm2/m128</td>
		<td>RM V/V</td>
		<td></td>
		<td>AES</td>
		<td>Perform the InvMixColumn transformation on a 128-bit round key from xmm2/m128 and store the result in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F38.WIG DB /r VAESIMC xmm1, xmm2/m128</td>
		<td>RM V/V</td>
		<td></td>
		<td>Both AES and AVX flags</td>
		<td>Perform the InvMixColumn transformation on a 128-bit round key from xmm2/m128 and store the result in xmm1.</td>
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
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Perform the InvMixColumns transformation on the source operand and store the result in the destination operand.
The destination operand is an XMM register. The source operand can be an XMM register or a 128-bit memory location
.

Note: the AESIMC instruction should be applied to the expanded AES round keys (except for the first and last round
key) in order to prepare them for decryption using the “Equivalent Inverse Cipher” (defined in FIPS 197).

128-bit Legacy SSE version: Bits (MAXVL-1:128) of the corresponding YMM destination register remain unchanged.

VEX.128 encoded version: Bits (MAXVL-1:128) of the destination YMM register are zeroed.

Note: In VEX-encoded versions, VEX.vvvv is reserved and must be 1111b, otherwise instructions will \#UD.

### Operation


#### AESIMC
```java
DEST[127:0] ← InvMixColumns( SRC );
DEST[MAXVL-1:128] (Unmodified)
```
#### VAESIMC
```java
DEST[127:0] ← InvMixColumns( SRC );
DEST[MAXVL-1:128] ← 0;
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
(V)AESIMC:
__m128i _mm_aesimc (__m128i)
```
### SIMD Floating-Point Exceptions

None

### Other Exceptions

See Exceptions Type 4; additionally
<p>#UD
If VEX.vvvv ≠ 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
