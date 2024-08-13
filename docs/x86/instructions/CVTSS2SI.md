<b>CVTSS2SI</b> — Convert Scalar Single-Precision Floating-Point Value to Doubleword Integer
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F3 0F 2D /r CVTSS2SI r32, xmm1/m32</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Convert one single-precision floating-point value from xmm1/m32 to one signed doubleword integer in r32.</td>
	</tr>
	<tr>
		<td>F3 REX.W 0F 2D /r CVTSS2SI r64, xmm1/m32</td>
		<td>A</td>
		<td>V/N.E.</td>
		<td>SSE</td>
		<td>Convert one single-precision floating-point value from xmm1/m32 to one signed quadword integer in r64.</td>
	</tr>
	<tr>
		<td>VEX.LIG.F3.0F.W0 2D /r 1 VCVTSS2SI r32, xmm1/m32</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Convert one single-precision floating-point value from xmm1/m32 to one signed doubleword integer in r32.</td>
	</tr>
	<tr>
		<td>VEX.LIG.F3.0F.W1 2D /r 1 VCVTSS2SI r64, xmm1/m32</td>
		<td>A</td>
		<td>V/N.E.2</td>
		<td>AVX</td>
		<td>Convert one single-precision floating-point value from xmm1/m32 to one signed quadword integer in r64.</td>
	</tr>
	<tr>
		<td>EVEX.LIG.F3.0F.W0 2D /r VCVTSS2SI r32, xmm1/m32{er}</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Convert one single-precision floating-point value from xmm1/m32 to one signed doubleword integer in r32.</td>
	</tr>
	<tr>
		<td>EVEX.LIG.F3.0F.W1 2D /r VCVTSS2SI r64, xmm1/m32{er}</td>
		<td>B</td>
		<td>V/N.E.2</td>
		<td>AVX512F</td>
		<td>Convert one single-precision floating-point value from xmm1/m32 to one signed quadword integer in r64.</td>
	</tr>
</table>

NOTES:
1. Software should ensure VCVTSS2SI is encoded with VEX.L=0. Encoding VCVTSS2SI with VEX.L=1 may
encounter unpredictable behavior across different processor generations.
2. VEX.W1/EVEX.W1 in non-64 bit is ignored; the instructions behaves as if the W0 version is used.

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
		<td>NA</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>B</td>
		<td>Tuple1 Fixed</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Converts a single-precision floating-point value in the source operand (the second operand) to a signed double-
word integer (or signed quadword integer if operand size is 64 bits) in the destination operand (the first operand).
The source operand can be an XMM register or a memory location. The destination operand is a general-purpose
register. When the source operand is an XMM register, the single-precision floating-point value is contained in the
low doubleword of the register.

When a conversion is inexact, the value returned is rounded according to the rounding control bits in the MXCSR
register or the embedded rounding control bits. If a converted result cannot be represented in the destination
format, the floating-point invalid exception is raised, and if this exception is masked, the indefinite integer value
(2w-1, where w represents the number of bits in the destination format) is returned.

Legacy SSE instructions: In 64-bit mode, Use of the REX.W prefix promotes the instruction to produce 64-bit data.
See the summary chart at the beginning of this section for encoding data and limits.

VEX.W1 and EVEX.W1 versions: promotes the instruction to produce 64-bit data in 64-bit mode.

Note: VEX.vvvv and EVEX.vvvv are reserved and must be 1111b, otherwise instructions will \#UD.

Software should ensure VCVTSS2SI is encoded with VEX.L=0. Encoding VCVTSS2SI with VEX.L=1 may encounter
unpredictable behavior across different processor generations.

### Operation


#### VCVTSS2SI (EVEX encoded version)
```java
IF (SRC *is register*) AND (EVEX.b = 1) 
    THEN
        SET_RM(EVEX.RC);
    ELSE 
        SET_RM(MXCSR.RM);
FI;
IF 64-bit Mode and OperandSize = 64
THEN
    DEST[63:0] ← Convert_Single_Precision_Floating_Point_To_Integer(SRC[31:0]);
ELSE
    DEST[31:0] ← Convert_Single_Precision_Floating_Point_To_Integer(SRC[31:0]);
FI;
```
#### (V)CVTSS2SI (Legacy and VEX.128 encoded version)
```java
IF 64-bit Mode and OperandSize = 64
THEN
    DEST[63:0] ←Convert_Single_Precision_Floating_Point_To_Integer(SRC[31:0]);
ELSE
    DEST[31:0] ←Convert_Single_Precision_Floating_Point_To_Integer(SRC[31:0]);
FI;
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VCVTSS2SI int _mm_cvtss_i32( __m128 a);
VCVTSS2SI int _mm_cvt_roundss_i32( __m128 a, int r);
VCVTSS2SI __int64 _mm_cvtss_i64( __m128 a);
VCVTSS2SI __int64 _mm_cvt_roundss_i64( __m128 a, int r);
```
### SIMD Floating-Point Exceptions
Invalid, Precision

### Other Exceptions

VEX-encoded instructions, see Exceptions Type 3; additionally
<p>#UD
If VEX.vvvv != 1111B.
EVEX-encoded instructions, see Exceptions Type E3NF.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
