<b>SHA1NEXTE</b> — Calculate SHA1 State Variable E after Four Rounds
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 38 C8 /r SHA1NEXTE xmm1, xmm2/m128</td>
		<td>RM</td>
		<td>V/V</td>
		<td>SHA</td>
		<td>Calculates SHA1 state variable E after four rounds of operation from the current SHA1 state variable A in xmm1. The calculated value of the SHA1 state variable E is added to the scheduled dwords in xmm2/m128, and stored with some of the scheduled dwords in xmm1.</td>
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
The SHA1NEXTE calculates the SHA1 state variable E after four rounds of operation from the current SHA1 state
variable A in the destination operand. The calculated value of the SHA1 state variable E is added to the source
operand, which contains the scheduled dwords.

### Operation


#### SHA1NEXTE
```java
TMP ← (SRC1[127:96] ROL 30); 
DEST[127:96] ← SRC2[127:96] + TMP; 
DEST[95:64] ← SRC2[95:64]; 
DEST[63:32] ← SRC2[63:32]; 
DEST[31:0] ← SRC2[31:0]; 
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
SHA1NEXTE: __m128i _mm_sha1nexte_epu32(__m128i, __m128i);
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