<b>KUNPCKBW / KUNPCKWD / KUNPCKDQ</b> — Unpack for Mask Registers
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.NDS.L1.66.0F.W0 4B /r KUNPCKBW k1, k2, k3</td>
		<td>RVR</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Unpack and interleave 8 bits masks in k2 and k3 and write word result in k1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.L1.0F.W0 4B /r KUNPCKWD k1, k2, k3</td>
		<td>RVR</td>
		<td>V/V</td>
		<td>AVX512BW </td>
		<td>Unpack and interleave 16 bits in k2 and k3 and write double-word result in k1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.L1.0F.W1 4B /r KUNPCKDQ k1, k2, k3</td>
		<td>RVR</td>
		<td>V/V</td>
		<td>AVX512BW </td>
		<td>Unpack and interleave 32 bits masks in k2 and k3 and write quadword result in k1.</td>
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
		<td>RVR</td>
		<td>ModRM:reg (w)</td>
		<td>VEX.1vvv (r)</td>
		<td>ModRM:r/m (r, ModRM:[7:6] must be 11b)</td>
	</tr>
</table>


### Description
Unpacks the lower 8/16/32 bits of the second and third operands (source operands) into the low part of the first
operand (destination operand), starting from the low bytes. The result is zero-extended in the destination.

### Operation


#### KUNPCKBW
```java
DEST[7:0] ← SRC2[7:0]
DEST[15:8] ← SRC1[7:0]
DEST[MAX_KL-1:16] ← 0
```
#### KUNPCKWD
```java
DEST[15:0] ← SRC2[15:0]
DEST[31:16] ← SRC1[15:0]
DEST[MAX_KL-1:32] ← 0
```
#### KUNPCKDQ
```java
DEST[31:0] ← SRC2[31:0]
DEST[63:32] ← SRC1[31:0]
DEST[MAX_KL-1:64] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
KUNPCKBW __mmask16 _mm512_kunpackb(__mmask16 a, __mmask16 b);
KUNPCKDQ __mmask64 _mm512_kunpackd(__mmask64 a, __mmask64 b);
KUNPCKWD __mmask32 _mm512_kunpackw(__mmask32 a, __mmask32 b);
```
### Flags Affected

None

### SIMD Floating-Point Exceptions

None

### Other Exceptions

See Exceptions Type K20.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
