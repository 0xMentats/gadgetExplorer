<b>CVTTSS2SI</b> — Convert with Truncation Scalar Single-Precision Floating-Point Value to Integer
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F3 0F 2C /r CVTTSS2SI r32, xmm1/m32</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Convert one single-precision floating-point value from xmm1/m32 to one signed doubleword integer in r32 using truncation.</td>
	</tr>
	<tr>
		<td>F3 REX.W 0F 2C /r CVTTSS2SI r64, xmm1/m32</td>
		<td>A</td>
		<td>V/N.E.</td>
		<td>SSE</td>
		<td>Convert one single-precision floating-point value from xmm1/m32 to one signed quadword integer in r64 using truncation.</td>
	</tr>
	<tr>
		<td>VEX.LIG.F3.0F.W0 2C /r 1 VCVTTSS2SI r32, xmm1/m32</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Convert one single-precision floating-point value from xmm1/m32 to one signed doubleword integer in r32 using truncation.</td>
	</tr>
	<tr>
		<td>VEX.LIG.F3.0F.W1 2C /r 1 VCVTTSS2SI r64, xmm1/m32</td>
		<td>A</td>
		<td>V/N.E.2</td>
		<td>AVX</td>
		<td>Convert one single-precision floating-point value from xmm1/m32 to one signed quadword integer in r64 using truncation.</td>
	</tr>
	<tr>
		<td>EVEX.LIG.F3.0F.W0 2C /r VCVTTSS2SI r32, xmm1/m32{sae}</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Convert one single-precision floating-point value from xmm1/m32 to one signed doubleword integer in r32 using truncation.</td>
	</tr>
	<tr>
		<td>EVEX.LIG.F3.0F.W1 2C /r VCVTTSS2SI r64, xmm1/m32{sae}</td>
		<td>B</td>
		<td>V/N.E.2</td>
		<td>AVX512F</td>
		<td>Convert one single-precision floating-point value from xmm1/m32 to one signed quadword integer in r64 using truncation.</td>
	</tr>
</table>

NOTES:
1. Software should ensure VCVTTSS2SI is encoded with VEX.L=0. Encoding VCVTTSS2SI with VEX.L=1 may
encounter unpredictable behavior across different processor generations.
2. For this specific instruction, VEX.W/EVEX.W in non-64 bit is ignored; the instructions behaves as if the W0 ver-
sion is used.

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
Converts a single-precision floating-point value in the source operand (the second operand) to a signed doubleword
integer (or signed quadword integer if operand size is 64 bits) in the destination operand (the first operand). The
source operand can be an XMM register or a 32-bit memory location. The destination operand is a general purpose
register. When the source operand is an XMM register, the single-precision floating-point value is contained in the
low doubleword of the register.

When a conversion is inexact, a truncated (round toward zero) result is returned. If a converted result is larger than
the maximum signed doubleword integer, the floating-point invalid exception is raised. If this exception is masked,
the indefinite integer value (80000000H or 80000000_00000000H if operand size is 64 bits) is returned.

Legacy SSE instructions: In 64-bit mode, Use of the REX.W prefix promotes the instruction to 64-bit operation. See
the summary chart at the beginning of this section for encoding data and limits.

VEX.W1 and EVEX.W1 versions: promotes the instruction to produce 64-bit data in 64-bit mode.

Note: VEX.vvvv and EVEX.vvvv are reserved and must be 1111b, otherwise instructions will \#UD.

Software should ensure VCVTTSS2SI is encoded with VEX.L=0. Encoding VCVTTSS2SI with VEX.L=1 may
encounter unpredictable behavior across different processor generations.

### Operation


#### (V)CVTTSS2SI (All versions)
```java
IF 64-Bit Mode and OperandSize = 64
THEN
    DEST[63:0] ← Convert_Single_Precision_Floating_Point_To_Integer_Truncate(SRC[31:0]);
ELSE
    DEST[31:0] ← Convert_Single_Precision_Floating_Point_To_Integer_Truncate(SRC[31:0]);
FI;
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VCVTTSS2SI int _mm_cvttss_i32( __m128 a);
VCVTTSS2SI int _mm_cvtt_roundss_i32( __m128 a, int sae);
VCVTTSS2SI __int64 _mm_cvttss_i64( __m128 a);
VCVTTSS2SI __int64 _mm_cvtt_roundss_i64( __m128 a, int sae);
CVTTSS2SI int _mm_cvttss_si32( __m128 a);
CVTTSS2SI __int64 _mm_cvttss_si64( __m128 a);
```
### SIMD Floating-Point Exceptions
Invalid, Precision

### Other Exceptions

See Exceptions Type 3; additionally
<p>#UD
If VEX.vvvv != 1111B.
EVEX-encoded instructions, see Exceptions Type E3NF.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
