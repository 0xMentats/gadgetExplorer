<b>ROUNDPD</b> —  Round Packed Double Precision Floating-Point Values
<table>
	<tr>
		<td><b>Opcode*/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 3A 09 /r ib ROUNDPD xmm1, xmm2/m128, imm8</td>
		<td>RMI V/V</td>
		<td></td>
		<td>SSE4_1</td>
		<td>Round packed double precision floating-point values in xmm2/m128 and place the result in xmm1. The rounding mode is determined by imm8.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F3A.WIG 09 /r ib VROUNDPD xmm1, xmm2/m128, imm8</td>
		<td>RMI V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Round packed double-precision floating-point values in xmm2/m128 and place the result in xmm1. The rounding mode is determined by imm8.</td>
	</tr>
	<tr>
		<td>VEX.256.66.0F3A.WIG 09 /r ib VROUNDPD ymm1, ymm2/m256, imm8</td>
		<td>RMI V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Round packed double-precision floating-point values in ymm2/m256 and place the result in ymm1. The rounding mode is determined by imm8.</td>
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
		<td>RMI</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8</td>
		<td>NA</td>
	</tr>
</table>


### Description
Round the 2 double-precision floating-point values in the source operand (second operand) using the rounding
mode specified in the immediate operand (third operand) and place the results in the destination operand (first
operand). The rounding process rounds each input floating-point value to an integer value and returns the integer
result as a double-precision floating-point value.

The immediate operand specifies control fields for the rounding operation, three bit fields are defined and shown in
Figure 4-24. Bit 3 of the immediate byte controls processor behavior for a precision exception, bit 2 selects the
source of rounding mode control. Bits 1:0 specify a non-sticky rounding-mode value (Table 4-18 lists the encoded
values for rounding-mode field).

The Precision Floating-Point Exception is signaled according to the immediate operand. If any source operand is an
SNaN then it will be converted to a QNaN. If DAZ is set to ‘1 then denormals will be converted to zero before
rounding.

128-bit Legacy SSE version: The second source can be an XMM register or 128-bit memory location. The destination
 is not distinct from the first source XMM register and the upper bits (MAXVL-1:128) of the corresponding YMM
register destination are unmodified.

VEX.128 encoded version: the source operand second source operand or a 128-bit memory location. The destination
 operand is an XMM register. The upper bits (MAXVL-1:128) of the corresponding YMM register destination are
zeroed.

VEX.256 encoded version: The source operand is a YMM register or a 256-bit memory location. The destination
operand is a YMM register.

Note: In VEX-encoded versions, VEX.vvvv is reserved and must be 1111b, otherwise instructions will \#UD.
<table>
	<tr>
		<td colspan=9 rowspan=6><b>8 3 2 1 0 Reserved P — Precision Mask; 0: normal, 1: inexact RS — Rounding select; 1: MXCSR.RC, 0: Imm8.RC RC — Rounding mode</b></td>
	</tr>
	<tr>
		<td>Reserved</td>
		<td colspan=2></td>
		<td colspan=2></td>
		<td colspan=2></td>
	</tr>
	<tr>
		<td colspan=2 rowspan=2></td>
		<td colspan=2 rowspan=3></td>
		<td colspan=2 rowspan=4></td>
	</tr>
	<tr>
	</tr>
	<tr>
	</tr>
	<tr>
	</tr>
</table>

Figure 4-24.  Bit Control Fields of Immediate Byte for ROUNDxx Instruction

Table 4-18.  Rounding Modes and Encoding of Rounding Control (RC) Field
<table>
	<tr>
		<td><b>Rounding Mode</b></td>
		<td><b>RC Field Setting</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>Round to nearest (even)</td>
		<td>00B</td>
		<td>Rounded result is the closest to the infinitely precise result. If two values are equally close, the result is the even value (i.e., the integer value with the least-significant bit of zero).</td>
	</tr>
	<tr>
		<td>Round down (toward −∞)</td>
		<td>01B</td>
		<td>Rounded result is closest to but no greater than the infinitely precise result.</td>
	</tr>
	<tr>
		<td>Round up (toward +∞)</td>
		<td>10B</td>
		<td>Rounded result is closest to but no less than the infinitely precise result.</td>
	</tr>
	<tr>
		<td>Round toward zero (Truncate)</td>
		<td>11B</td>
		<td>Rounded result is closest to but no greater in absolute value than the infinitely precise result.</td>
	</tr>
</table>


### Operation

```java
IF (imm[2] = ‘1) 
    THEN 
            // rounding mode is determined by MXCSR.RC 
        DEST[63:0] ← ConvertDPFPToInteger_M(SRC[63:0]);
        DEST[127:64] ← ConvertDPFPToInteger_M(SRC[127:64]);
    ELSE
            // rounding mode is determined by IMM8.RC
        DEST[63:0] ← ConvertDPFPToInteger_Imm(SRC[63:0]);
        DEST[127:64] ← ConvertDPFPToInteger_Imm(SRC[127:64]);
FI
```
#### ROUNDPD (128-bit Legacy SSE version)
```java
DEST[63:0] ← RoundToInteger(SRC[63:0]], ROUND_CONTROL)
DEST[127:64] ← RoundToInteger(SRC[127:64]], ROUND_CONTROL)
DEST[MAXVL-1:128] (Unmodified)
```
#### VROUNDPD (VEX.128 encoded version)
```java
DEST[63:0] ← RoundToInteger(SRC[63:0]], ROUND_CONTROL)
DEST[127:64] ← RoundToInteger(SRC[127:64]], ROUND_CONTROL)
DEST[MAXVL-1:128] ← 0
```
#### VROUNDPD (VEX.256 encoded version)
```java
DEST[63:0] ← RoundToInteger(SRC[63:0], ROUND_CONTROL)
DEST[127:64] ← RoundToInteger(SRC[127:64]], ROUND_CONTROL)
DEST[191:128] ← RoundToInteger(SRC[191:128]], ROUND_CONTROL)
DEST[255:192] ← RoundToInteger(SRC[255:192] ], ROUND_CONTROL)
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
__m128 _mm_round_pd(__m128d s1, int iRoundMode);
__m128 _mm_floor_pd(__m128d s1);
__m128 _mm_ceil_pd(__m128d s1)
__m256 _mm256_round_pd(__m256d s1, int iRoundMode);
__m256 _mm256_floor_pd(__m256d s1);
__m256 _mm256_ceil_pd(__m256d s1)
```
### SIMD Floating-Point Exceptions
Invalid (signaled only if SRC = SNaN)

Precision (signaled only if imm[3] = ‘0; if imm[3] = ‘1, then the Precision Mask in the MXSCSR is ignored and precision
 exception is not signaled.)

Note that Denormal is not signaled by ROUNDPD.

### Other Exceptions

See Exceptions Type 2; additionally
<p>#UD
If VEX.vvvv ≠ 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
