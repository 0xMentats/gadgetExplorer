<b>STMXCSR</b> — Store MXCSR Register State
<table>
	<tr>
		<td><b>Opcode*/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F AE /3 STMXCSR m32</td>
		<td>M</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Store contents of MXCSR register to m32.</td>
	</tr>
	<tr>
		<td>VEX.LZ.0F.WIG AE /3 VSTMXCSR m32</td>
		<td>M</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Store contents of MXCSR register to m32.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand 2</b></td>
		<td><b>Operand 3</b></td>
		<td><b>Operand 4</b></td>
	</tr>
	<tr>
		<td>M</td>
		<td>ModRM:r/m (w)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Stores the contents of the MXCSR control and status register to the destination operand. The destination operand
is a 32-bit memory location. The reserved bits in the MXCSR register are stored as 0s.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

VEX.L must be 0, otherwise instructions will \#UD.

Note: In VEX-encoded versions, VEX.vvvv is reserved and must be 1111b, otherwise instructions will \#UD.

### Operation

```java
m32 ← MXCSR;
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
_mm_getcsr(void)
```
### SIMD Floating-Point Exceptions

None.

### Other Exceptions

See Exceptions Type 5; additionally
<p>#UD
If VEX.L= 1,
If VEX.vvvv ≠ 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
