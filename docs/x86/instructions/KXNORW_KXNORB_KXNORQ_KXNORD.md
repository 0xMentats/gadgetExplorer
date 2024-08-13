<b>KXNORW / KXNORB / KXNORQ / KXNORD</b> — Bitwise Logical XNOR Masks
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.NDS.L1.0F.W0 46 /r KXNORW k1, k2, k3</td>
		<td>RVR</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Bitwise XNOR 16 bits masks k2 and k3 and place result in k1.</td>
	</tr>
	<tr>
		<td>VEX.L1.66.0F.W0 46 /r KXNORB k1, k2, k3</td>
		<td>RVR</td>
		<td>V/V</td>
		<td>AVX512DQ</td>
		<td>Bitwise XNOR 8 bits masks k2 and k3 and place result in k1.</td>
	</tr>
	<tr>
		<td>VEX.L1.0F.W1 46 /r KXNORQ k1, k2, k3</td>
		<td>RVR</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Bitwise XNOR 64 bits masks k2 and k3 and place result in k1.</td>
	</tr>
	<tr>
		<td>VEX.L1.66.0F.W1 46 /r KXNORD k1, k2, k3</td>
		<td>RVR</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Bitwise XNOR 32 bits masks k2 and k3 and place result in k1.</td>
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
Performs a bitwise XNOR between the vector mask k2 and the vector mask k3, and writes the result into vector
mask k1 (three-operand form).

### Operation


#### KXNORW
```java
DEST[15:0] ← NOT (SRC1[15:0] BITWISE XOR SRC2[15:0])
DEST[MAX_KL-1:16] ← 0
```
#### KXNORB
```java
DEST[7:0] ← NOT (SRC1[7:0] BITWISE XOR SRC2[7:0])
DEST[MAX_KL-1:8] ← 0
```
#### KXNORQ
```java
DEST[63:0] ← NOT (SRC1[63:0] BITWISE XOR SRC2[63:0])
DEST[MAX_KL-1:64] ← 0
```
#### KXNORD
```java
DEST[31:0] ← NOT (SRC1[31:0] BITWISE XOR SRC2[31:0])
DEST[MAX_KL-1:32] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
KXNORW __mmask16 _mm512_kxnor(__mmask16 a, __mmask16 b);
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