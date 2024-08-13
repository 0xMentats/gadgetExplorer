<b>VCVTSS2USI</b> — Convert Scalar Single-Precision Floating-Point Value to Unsigned Doubleword
Integer
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.LIG.F3.0F.W0 79 /r VCVTSS2USI r32, xmm1/m32{er}</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Convert one single-precision floating-point value from xmm1/m32 to one unsigned doubleword integer in r32.</td>
	</tr>
	<tr>
		<td>EVEX.LIG.F3.0F.W1 79 /r VCVTSS2USI r64, xmm1/m32{er}</td>
		<td>A</td>
		<td>V/N.E.1</td>
		<td>AVX512F</td>
		<td>Convert one single-precision floating-point value from xmm1/m32 to one unsigned quadword integer in r64.</td>
	</tr>
</table>

NOTES:
1. EVEX.W1 in non-64 bit is ignored; the instructions behaves as if the W0 version is used.

### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Tuple Type</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand 2</b></td>
		<td><b>Operand 3</b></td>
		<td><b>Operand 4</b></td>
	</tr>
	<tr>
		<td>A</td>
		<td>Tuple1 Fixed</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Converts a single-precision floating-point value in the source operand (the second operand) to an unsigned double-
word integer (or unsigned quadword integer if operand size is 64 bits) in the destination operand (the first
operand). The source operand can be an XMM register or a memory location. The destination operand is a general-
purpose register. When the source operand is an XMM register, the single-precision floating-point value is contained
in the low doubleword of the register.

When a conversion is inexact, the value returned is rounded according to the rounding control bits in the MXCSR
register or the embedded rounding control bits. If a converted result cannot be represented in the destination
format, the floating-point invalid exception is raised, and if this exception is masked, the integer value 2w – 1 is
returned, where w represents the number of bits in the destination format.

VEX.W1 and EVEX.W1 versions: promotes the instruction to produce 64-bit data in 64-bit mode.

Note: EVEX.vvvv is reserved and must be 1111b, otherwise instructions will \#UD.

### Operation


#### VCVTSS2USI (EVEX encoded version)
```java
IF (SRC *is register*) AND (EVEX.b = 1) 
    THEN
        SET_RM(EVEX.RC);
    ELSE 
        SET_RM(MXCSR.RM);
FI;
IF 64-bit Mode and OperandSize = 64
THEN
    DEST[63:0] ← Convert_Single_Precision_Floating_Point_To_UInteger(SRC[31:0]);
ELSE
    DEST[31:0] ← Convert_Single_Precision_Floating_Point_To_UInteger(SRC[31:0]);
FI;
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VCVTSS2USI unsigned _mm_cvtss_u32( __m128 a);
VCVTSS2USI unsigned _mm_cvt_roundss_u32( __m128 a, int r);
VCVTSS2USI unsigned __int64 _mm_cvtss_u64( __m128 a);
VCVTSS2USI unsigned __int64 _mm_cvt_roundss_u64( __m128 a, int r);
```
### SIMD Floating-Point Exceptions
Invalid, Precision

### Other Exceptions

EVEX-encoded instructions, see Exceptions Type E3NF.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
