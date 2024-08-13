<b>CVTSI2SS</b> — Convert Doubleword Integer to Scalar Single-Precision Floating-Point Value
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F3 0F 2A /r CVTSI2SS xmm1, r/m32</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Convert one signed doubleword integer from r/m32 to one single-precision floating-point value in xmm1.</td>
	</tr>
	<tr>
		<td>F3 REX.W 0F 2A /r CVTSI2SS xmm1, r/m64</td>
		<td>A</td>
		<td>V/N.E.</td>
		<td>SSE</td>
		<td>Convert one signed quadword integer from r/m64 to one single-precision floating-point value in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.LIG.F3.0F.W0 2A /r VCVTSI2SS xmm1, xmm2, r/m32</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Convert one signed doubleword integer from r/m32 to one single-precision floating-point value in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.LIG.F3.0F.W1 2A /r VCVTSI2SS xmm1, xmm2, r/m64</td>
		<td>B</td>
		<td>V/N.E.1</td>
		<td>AVX</td>
		<td>Convert one signed quadword integer from r/m64 to one single-precision floating-point value in xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.LIG.F3.0F.W0 2A /r VCVTSI2SS xmm1, xmm2, r/m32{er}</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Convert one signed doubleword integer from r/m32 to one single-precision floating-point value in xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.LIG.F3.0F.W1 2A /r VCVTSI2SS xmm1, xmm2, r/m64{er}</td>
		<td>C</td>
		<td>V/N.E.1</td>
		<td>AVX512F</td>
		<td>Convert one signed quadword integer from r/m64 to one single-precision floating-point value in xmm1.</td>
	</tr>
</table>

NOTES:
1. VEX.W1/EVEX.W1 in non-64 bit is ignored; the instructions behaves as if the W0 version is used.

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
		<td>NA</td>
		<td>ModRM:reg (w)</td>
		<td>VEX.vvvv</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>C</td>
		<td>Tuple1 Scalar</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
Converts a signed doubleword integer (or signed quadword integer if operand size is 64 bits) in the “convert-from”
source operand to a single-precision floating-point value in the destination operand (first operand). The “convert-
from” source operand can be a general-purpose register or a memory location. The destination operand is an XMM
register. The result is stored in the low doubleword of the destination operand, and the upper three doublewords
are left unchanged. When a conversion is inexact, the value returned is rounded according to the rounding control
bits in the MXCSR register or the embedded rounding control bits.

128-bit Legacy SSE version: In 64-bit mode, Use of the REX.W prefix promotes the instruction to use 64-bit input
value. The “convert-from” source operand (the second operand) is a general-purpose register or memory location.
Bits (MAXVL-1:32) of the corresponding destination register remain unchanged.

VEX.128 and EVEX encoded versions: The “convert-from” source operand (the third operand) can be a general-
purpose register or a memory location. The first source and destination operands are XMM registers. Bits (127:32)
of the XMM register destination are copied from corresponding bits in the first source operand. Bits (MAXVL-1:128)
of the destination register are zeroed.

EVEX encoded version: the converted result in written to the low doubleword element of the destination under the
writemask.

Software should ensure VCVTSI2SS is encoded with VEX.L=0. Encoding VCVTSI2SS with VEX.L=1 may encounter
unpredictable behavior across different processor generations.

### Operation


#### VCVTSI2SS (EVEX encoded version)
```java
IF (SRC2 *is register*) AND (EVEX.b = 1) 
    THEN
        SET_RM(EVEX.RC);
    ELSE 
        SET_RM(MXCSR.RM);
FI;
IF 64-Bit Mode And OperandSize = 64
THEN
    DEST[31:0] ← Convert_Integer_To_Single_Precision_Floating_Point(SRC[63:0]);
ELSE
    DEST[31:0] ← Convert_Integer_To_Single_Precision_Floating_Point(SRC[31:0]);
FI;
DEST[127:32] ← SRC1[127:32]
DEST[MAXVL-1:128] ← 0
```
#### VCVTSI2SS (VEX.128 encoded version)
```java
IF 64-Bit Mode And OperandSize = 64
THEN
    DEST[31:0] ←Convert_Integer_To_Single_Precision_Floating_Point(SRC[63:0]);
ELSE
    DEST[31:0] ←Convert_Integer_To_Single_Precision_Floating_Point(SRC[31:0]);
FI;
DEST[127:32] ←SRC1[127:32]
DEST[MAXVL-1:128] ←0
```
#### CVTSI2SS (128-bit Legacy SSE version)
```java
IF 64-Bit Mode And OperandSize = 64
THEN
    DEST[31:0] ←Convert_Integer_To_Single_Precision_Floating_Point(SRC[63:0]);
ELSE
    DEST[31:0] ←Convert_Integer_To_Single_Precision_Floating_Point(SRC[31:0]);
FI;
DEST[MAXVL-1:32] (Unmodified)
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VCVTSI2SS __m128 _mm_cvti32_ss(__m128 s, int a);
VCVTSI2SS __m128 _mm_cvt_roundi32_ss(__m128 s, int a, int r);
VCVTSI2SS __m128 _mm_cvti64_ss(__m128 s, __int64 a);
VCVTSI2SS __m128 _mm_cvt_roundi64_ss(__m128 s, __int64 a, int r);
CVTSI2SS __m128 _mm_cvtsi64_ss(__m128 s, __int64 a);
CVTSI2SS __m128 _mm_cvtsi32_ss(__m128 a, int b);
```
### SIMD Floating-Point Exceptions
Precision

### Other Exceptions

VEX-encoded instructions, see Exceptions Type 3.
EVEX-encoded instructions, see Exceptions Type E3NF.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
