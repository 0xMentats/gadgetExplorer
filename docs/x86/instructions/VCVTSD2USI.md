<b>VCVTSD2USI</b> — Convert Scalar Double-Precision Floating-Point Value to Unsigned Doubleword
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
		<td>EVEX.LIG.F2.0F.W0 79 /r VCVTSD2USI r32, xmm1/m64{er}</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Convert one double-precision floating-point value from xmm1/m64 to one unsigned doubleword integer r32.</td>
	</tr>
	<tr>
		<td>EVEX.LIG.F2.0F.W1 79 /r VCVTSD2USI r64, xmm1/m64{er}</td>
		<td>A</td>
		<td>V/N.E.1</td>
		<td>AVX512F</td>
		<td>Convert one double-precision floating-point value from xmm1/m64 to one unsigned quadword integer zero- extended into r64.</td>
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
Converts a double-precision floating-point value in the source operand (the second operand) to an unsigned
doubleword integer in the destination operand (the first operand). The source operand can be an XMM register or
a 64-bit memory location. The destination operand is a general-purpose register. When the source operand is an
XMM register, the double-precision floating-point value is contained in the low quadword of the register.

When a conversion is inexact, the value returned is rounded according to the rounding control bits in the MXCSR
register or the embedded rounding control bits. If a converted result cannot be represented in the destination
format, the floating-point invalid exception is raised, and if this exception is masked, the integer value 2w – 1 is
returned, where w represents the number of bits in the destination format.

### Operation


#### VCVTSD2USI (EVEX encoded version)
```java
IF (SRC *is register*) AND (EVEX.b = 1) 
    THEN
        SET_RM(EVEX.RC);
    ELSE 
        SET_RM(MXCSR.RM);
FI;
IF 64-Bit Mode and OperandSize = 64
    THEN
            DEST[63:0] ← Convert_Double_Precision_Floating_Point_To_UInteger(SRC[63:0]);
    ELSE
            DEST[31:0] ← Convert_Double_Precision_Floating_Point_To_UInteger(SRC[63:0]);
FI
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VCVTSD2USI unsigned int _mm_cvtsd_u32(__m128d);
VCVTSD2USI unsigned int _mm_cvt_roundsd_u32(__m128d, int r);
VCVTSD2USI unsigned __int64 _mm_cvtsd_u64(__m128d);
VCVTSD2USI unsigned __int64 _mm_cvt_roundsd_u64(__m128d, int r);
```
### SIMD Floating-Point Exceptions

Invalid, Precision

### Other Exceptions

EVEX-encoded instructions, see Exceptions Type E3NF.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
