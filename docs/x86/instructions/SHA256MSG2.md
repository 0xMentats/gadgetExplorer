<b>SHA256MSG2</b> — Perform a Final Calculation for the Next Four SHA256 Message Dwords
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 38 CD /r SHA256MSG2 xmm1, xmm2/m128</td>
		<td>RM</td>
		<td>V/V</td>
		<td>SHA</td>
		<td>Performs the final calculation for the next four SHA256 message dwords using previous message dwords from xmm1 and xmm2/m128, storing the result in xmm1.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand 2</b></td>
		<td><b>Operand 3</b></td>
	</tr>
	<tr>
		<td>RM</td>
		<td>ModRM:reg (r, w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
The SHA256MSG2 instruction is one of two SHA2 message scheduling instructions. The instruction performs the
final calculation for the next four SHA256 message dwords.

### Operation


#### SHA256MSG2
```java
W14 ← SRC2[95:64] ; 
W15 ← SRC2[127:96] ; 
W16 ← SRC1[31: 0] + σ1( W14) ; 
W17 ← SRC1[63: 32] + σ1( W15) ; 
W18 ← SRC1[95: 64] + σ1( W16) ; 
W19 ← SRC1[127: 96] + σ1( W17) ; 
DEST[127:96] ← W19 ; 
DEST[95:64] ← W18 ; 
DEST[63:32] ← W17 ; 
DEST[31:0] ← W16; 
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
SHA256MSG2 : __m128i _mm_sha256msg2_epu32(__m128i, __m128i);
```
### Flags Affected

None

### SIMD Floating-Point Exceptions

None

### Other Exceptions

See Exceptions Type 4.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
