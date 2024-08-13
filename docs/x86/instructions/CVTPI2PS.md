<b>CVTPI2PS</b> — Convert Packed Dword Integers to Packed Single-Precision FP Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 2A /r CVTPI2PS xmm, mm/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Convert two signed doubleword integers from mm/m64 to two single-precision floating-point values in xmm.</td>
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
		<td>RM</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Converts two packed signed doubleword integers in the source operand (second operand) to two packed 
single-precision floating-point values in the destination operand (first operand).

The source operand can be an MMX technology register or a 64-bit memory location. The destination operand is an
XMM register. The results are stored in the low quadword of the destination operand, and the high quadword
remains unchanged. When a conversion is inexact, the value returned is rounded according to the rounding control
bits in the MXCSR register.

This instruction causes a transition from x87 FPU to MMX technology operation (that is, the x87 FPU top-of-stack
pointer is set to 0 and the x87 FPU tag word is set to all 0s [valid]). If this instruction is executed while an x87 FPU
floating-point exception is pending, the exception is handled before the CVTPI2PS instruction is executed.

In 64-bit mode, use of the REX.R prefix permits this instruction to access additional registers (XMM8-XMM15).

### Operation

```java
DEST[31:0] ← Convert_Integer_To_Single_Precision_Floating_Point(SRC[31:0]);
DEST[63:32] ← Convert_Integer_To_Single_Precision_Floating_Point(SRC[63:32]);
(* High quadword of destination unchanged *)
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
CVTPI2PS:
__m128 _mm_cvtpi32_ps(__m128 a, __m64 b)
```
### SIMD Floating-Point Exceptions

Precision

### Other Exceptions

See Table 22-5, “Exception Conditions for Legacy SIMD/MMX Instructions with XMM and FP Exception,” in the
Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 3B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
