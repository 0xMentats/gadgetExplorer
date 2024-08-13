<b>SHA256MSG1</b> — Perform an Intermediate Calculation for the Next Four SHA256 Message
Dwords
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 38 CC /r SHA256MSG1 xmm1, xmm2/m128</td>
		<td>RM</td>
		<td>V/V</td>
		<td>SHA</td>
		<td>Performs an intermediate calculation for the next four SHA256 message dwords using previous message dwords from xmm1 and xmm2/m128, storing the result in xmm1.</td>
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
The SHA256MSG1 instruction is one of two SHA256 message scheduling instructions. The instruction performs an
intermediate calculation for the next four SHA256 message dwords.

### Operation


#### SHA256MSG1
```java
W4 ← SRC2[31: 0] ; 
W3 ← SRC1[127:96] ; 
W2 ← SRC1[95:64] ; 
W1 ← SRC1[63: 32] ; 
W0 ← SRC1[31: 0] ; 
DEST[127:96] ← W3 + σ0( W4); 
DEST[95:64] ← W2 + σ0( W3); 
DEST[63:32] ← W1 + σ0( W2); 
DEST[31:0] ← W0 + σ0( W1); 
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
SHA256MSG1: __m128i _mm_sha256msg1_epu32(__m128i, __m128i);
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