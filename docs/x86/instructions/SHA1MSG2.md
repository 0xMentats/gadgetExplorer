<b>SHA1MSG2</b> — Perform a Final Calculation for the Next Four SHA1 Message Dwords
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 38 CA /r SHA1MSG2 xmm1, xmm2/m128</td>
		<td>RM</td>
		<td>V/V</td>
		<td>SHA</td>
		<td>Performs the final calculation for the next four SHA1 message dwords using intermediate results from xmm1 and the previous message dwords from xmm2/m128, storing the result in xmm1.</td>
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
The SHA1MSG2 instruction is one of two SHA1 message scheduling instructions. The instruction performs the final
calculation to derive the next four SHA1 message dwords.

### Operation


#### SHA1MSG2
```java
W13 ← SRC2[95:64] ; 
W14 ← SRC2[63: 32] ; 
W15 ← SRC2[31: 0] ; 
W16 ← (SRC1[127:96] XOR W13 ) ROL 1; 
W17 ← (SRC1[95:64] XOR W14) ROL 1; 
W18 ← (SRC1[63: 32] XOR W15) ROL 1; 
W19 ← (SRC1[31: 0] XOR W16) ROL 1; 
DEST[127:96] ← W16; 
DEST[95:64] ← W17; 
DEST[63:32] ← W18; 
DEST[31:0] ← W19; 
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
SHA1MSG2: __m128i _mm_sha1msg2_epu32(__m128i, __m128i);
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