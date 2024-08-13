<b>CVTTPS2PI</b> — Convert with Truncation Packed Single-Precision FP Values to Packed Dword
Integers
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 2C /r CVTTPS2PI mm, xmm/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Convert two single-precision floating-point values from xmm/m64 to two signed doubleword signed integers in mm using truncation.</td>
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
Converts two packed single-precision floating-point values in the source operand (second operand) to two packed
signed doubleword integers in the destination operand (first operand). The source operand can be an XMM register
or a 64-bit memory location. The destination operand is an MMX technology register. When the source operand is
an XMM register, the two single-precision floating-point values are contained in the low quadword of the register.

When a conversion is inexact, a truncated (round toward zero) result is returned. If a converted result is larger
than the maximum signed doubleword integer, the floating-point invalid exception is raised, and if this exception is
masked, the indefinite integer value (80000000H) is returned.

This instruction causes a transition from x87 FPU to MMX technology operation (that is, the x87 FPU top-of-stack
pointer is set to 0 and the x87 FPU tag word is set to all 0s [valid]). If this instruction is executed while an x87 FPU
floating-point exception is pending, the exception is handled before the CVTTPS2PI instruction is executed.

In 64-bit mode, use of the REX.R prefix permits this instruction to access additional registers (XMM8-XMM15).

### Operation

```java
DEST[31:0] ← Convert_Single_Precision_Floating_Point_To_Integer_Truncate(SRC[31:0]);
DEST[63:32] ← Convert_Single_Precision_Floating_Point_To_Integer_Truncate(SRC[63:32]);
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
CVTTPS2PI:
__m64 _mm_cvttps_pi32(__m128 a)
```
### SIMD Floating-Point Exceptions

Invalid, Precision

### Other Exceptions

See Table 22-5, “Exception Conditions for Legacy SIMD/MMX Instructions with XMM and FP Exception,” in the
Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 3B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
