<b>LDMXCSR</b> — Load MXCSR Register
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32-bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F AE /2 LDMXCSR m32</td>
		<td>M</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Load MXCSR register from m32.</td>
	</tr>
	<tr>
		<td>VEX.LZ.0F.WIG AE /2 VLDMXCSR m32</td>
		<td>M</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Load MXCSR register from m32.</td>
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
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Loads the source operand into the MXCSR control/status register. The source operand is a 32-bit memory location.
See “MXCSR Control and Status Register” in Chapter 10, of the Intel® 64 and IA-32 Architectures Software Devel-
oper’s Manual, Volume 1, for a description of the MXCSR register and its contents.

The LDMXCSR instruction is typically used in conjunction with the (V)STMXCSR instruction, which stores the
contents of the MXCSR register in memory.

The default MXCSR value at reset is 1F80H.

If a (V)LDMXCSR instruction clears a SIMD floating-point exception mask bit and sets the corresponding exception
flag bit, a SIMD floating-point exception will not be immediately generated. The exception will be generated only
upon the execution of the next instruction that meets both conditions below:

 * the instruction must operate on an XMM or YMM register operand,

 * the instruction causes that particular SIMD floating-point exception to be reported.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

If VLDMXCSR is encoded with VEX.L= 1, an attempt to execute the instruction encoded with VEX.L= 1 will cause
an \#UD exception.

Note: In VEX-encoded versions, VEX.vvvv is reserved and must be 1111b, otherwise instructions will \#UD.

### Operation

```java
MXCSR ← m32;
```
### C/C++ Compiler Intrinsic Equivalent
```c
_mm_setcsr(unsigned int i)
```
### Numeric Exceptions

None

### Other Exceptions

See Exceptions Type 5; additionally
<p>#GP
For an attempt to set reserved bits in MXCSR.
<p>#UD
If VEX.vvvv ≠ 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
