<b>KNOTW / KNOTB / KNOTQ / KNOTD</b> — NOT Mask Register
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.L0.0F.W0 44 /r KNOTW k1, k2</td>
		<td>RR</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Bitwise NOT of 16 bits mask k2.</td>
	</tr>
	<tr>
		<td>VEX.L0.66.0F.W0 44 /r KNOTB k1, k2</td>
		<td>RR</td>
		<td>V/V</td>
		<td>AVX512DQ</td>
		<td>Bitwise NOT of 8 bits mask k2.</td>
	</tr>
	<tr>
		<td>VEX.L0.0F.W1 44 /r KNOTQ k1, k2</td>
		<td>RR</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Bitwise NOT of 64 bits mask k2.</td>
	</tr>
	<tr>
		<td>VEX.L0.66.0F.W1 44 /r KNOTD k1, k2</td>
		<td>RR</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Bitwise NOT of 32 bits mask k2.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand 2</b></td>
	</tr>
	<tr>
		<td>RR</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r, ModRM:[7:6] must be 11b)</td>
	</tr>
</table>


### Description
Performs a bitwise NOT of vector mask k2 and writes the result into vector mask k1.

### Operation


#### KNOTW
```java
DEST[15:0] ← BITWISE NOT SRC[15:0]
DEST[MAX_KL-1:16] ← 0
```
#### KNOTB
```java
DEST[7:0] ← BITWISE NOT SRC[7:0]
DEST[MAX_KL-1:8] ← 0
```
#### KNOTQ
```java
DEST[63:0] ← BITWISE NOT SRC[63:0]
DEST[MAX_KL-1:64] ← 0
```
#### KNOTD
```java
DEST[31:0] ← BITWISE NOT SRC[31:0]
DEST[MAX_KL-1:32] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
KNOTW __mmask16 _mm512_knot(__mmask16 a);
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