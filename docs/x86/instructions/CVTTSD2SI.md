<b>CVTTSD2SI</b> — Convert with Truncation Scalar Double-Precision Floating-Point Value to Signed
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
		<td>F2 0F 2C /r CVTTSD2SI r32, xmm1/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Convert one double-precision floating-point value from xmm1/m64 to one signed doubleword integer in r32 using truncation.</td>
	</tr>
	<tr>
		<td>F2 REX.W 0F 2C /r CVTTSD2SI r64, xmm1/m64</td>
		<td>A</td>
		<td>V/N.E.</td>
		<td>SSE2</td>
		<td>Convert one double-precision floating-point value from xmm1/m64 to one signed quadword integer in r64 using truncation.</td>
	</tr>
	<tr>
		<td>VEX.LIG.F2.0F.W0 2C /r 1 VCVTTSD2SI r32, xmm1/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Convert one double-precision floating-point value from xmm1/m64 to one signed doubleword integer in r32 using truncation.</td>
	</tr>
	<tr>
		<td>VEX.LIG.F2.0F.W1 2C /r 1 VCVTTSD2SI r64, xmm1/m64</td>
		<td>B</td>
		<td>V/N.E.2</td>
		<td>AVX</td>
		<td>Convert one double-precision floating-point value from xmm1/m64 to one signed quadword integer in r64 using truncation.</td>
	</tr>
	<tr>
		<td>EVEX.LIG.F2.0F.W0 2C /r VCVTTSD2SI r32, xmm1/m64{sae}</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Convert one double-precision floating-point value from xmm1/m64 to one signed doubleword integer in r32 using truncation.</td>
	</tr>
	<tr>
		<td>EVEX.LIG.F2.0F.W1 2C /r VCVTTSD2SI r64, xmm1/m64{sae}</td>
		<td>B</td>
		<td>V/N.E.2</td>
		<td>AVX512F</td>
		<td>Convert one double-precision floating-point value from xmm1/m64 to one signed quadword integer in r64 using truncation.</td>
	</tr>
</table>

NOTES:
1. Software should ensure VCVTTSD2SI is encoded with VEX.L=0. Encoding VCVTTSD2SI with VEX.L=1 may
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
Converts a double-precision floating-point value in the source operand (the second operand) to a signed double-
word integer (or signed quadword integer if operand size is 64 bits) in the destination operand (the first operand).
The source operand can be an XMM register or a 64-bit memory location. The destination operand is a general
purpose register. When the source operand is an XMM register, the double-precision floating-point value is
contained in the low quadword of the register.

When a conversion is inexact, the value returned is rounded according to the rounding control bits in the MXCSR
register.

If a converted result exceeds the range limits of signed doubleword integer (in non-64-bit modes or 64-bit mode
with REX.W/VEX.W/EVEX.W=0), the floating-point invalid exception is raised, and if this exception is masked, the
indefinite integer value (80000000H) is returned.

If a converted result exceeds the range limits of signed quadword integer (in 64-bit mode and
REX.W/VEX.W/EVEX.W = 1), the floating-point invalid exception is raised, and if this exception is masked, the
indefinite integer value (80000000_00000000H) is returned.

Legacy SSE instructions: In 64-bit mode, Use of the REX.W prefix promotes the instruction to 64-bit operation. See
the summary chart at the beginning of this section for encoding data and limits.

VEX.W1 and EVEX.W1 versions: promotes the instruction to produce 64-bit data in 64-bit mode.
Note: VEX.vvvv and EVEX.vvvv are reserved and must be 1111b, otherwise instructions will \#UD.

Software should ensure VCVTTSD2SI is encoded with VEX.L=0. Encoding VCVTTSD2SI with VEX.L=1 may
encounter unpredictable behavior across different processor generations.

### Operation


#### (V)CVTTSD2SI (All versions)
```java
IF 64-Bit Mode and OperandSize = 64
THEN
    DEST[63:0] ← Convert_Double_Precision_Floating_Point_To_Integer_Truncate(SRC[63:0]);
ELSE
    DEST[31:0] ← Convert_Double_Precision_Floating_Point_To_Integer_Truncate(SRC[63:0]);
FI;
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VCVTTSD2SI int _mm_cvttsd_i32( __m128d a);
VCVTTSD2SI int _mm_cvtt_roundsd_i32( __m128d a, int sae);
VCVTTSD2SI __int64 _mm_cvttsd_i64( __m128d a);
VCVTTSD2SI __int64 _mm_cvtt_roundsd_i64( __m128d a, int sae);
CVTTSD2SI int _mm_cvttsd_si32( __m128d a);
CVTTSD2SI __int64 _mm_cvttsd_si64( __m128d a);
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