<b>SHA1MSG1</b> — Perform an Intermediate Calculation for the Next Four SHA1 Message Dwords
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 38 C9 /r SHA1MSG1 xmm1, xmm2/m128</td>
		<td>RM</td>
		<td>V/V</td>
		<td>SHA</td>
		<td>Performs an intermediate calculation for the next four SHA1 message dwords using previous message dwords from xmm1 and xmm2/m128, storing the result in xmm1.</td>
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
The SHA1MSG1 instruction is one of two SHA1 message scheduling instructions. The instruction performs an inter-
mediate calculation for the next four SHA1 message dwords.

### Operation


#### SHA1MSG1
```java
W0 ← SRC1[127:96] ; 
W1 ← SRC1[95:64] ; 
W2 ← SRC1[63: 32] ; 
W3 ← SRC1[31: 0] ; 
W4 ← SRC2[127:96] ; 
W5 ← SRC2[95:64] ; 
DEST[127:96] ← W2 XOR W0; 
DEST[95:64] ← W3 XOR W1; 
DEST[63:32] ← W4 XOR W2; 
DEST[31:0] ← W5 XOR W3; 
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
SHA1MSG1: __m128i _mm_sha1msg1_epu32(__m128i, __m128i);
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