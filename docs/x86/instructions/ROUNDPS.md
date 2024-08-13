<b>ROUNDPS</b> —  Round Packed Single Precision Floating-Point Values
<table>
	<tr>
		<td><b>Opcode*/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 3A 08 /r ib ROUNDPS xmm1, xmm2/m128, imm8</td>
		<td>RMI V/V</td>
		<td></td>
		<td>SSE4_1</td>
		<td>Round packed single precision floating-point values in xmm2/m128 and place the result in xmm1.  The rounding mode is determined by imm8.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F3A.WIG 08 /r ib VROUNDPS xmm1, xmm2/m128, imm8</td>
		<td>RMI V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Round packed single-precision floating-point values in xmm2/m128 and place the result in xmm1. The rounding mode is determined by imm8.</td>
	</tr>
	<tr>
		<td>VEX.256.66.0F3A.WIG 08 /r ib VROUNDPS ymm1, ymm2/m256, imm8</td>
		<td>RMI V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Round packed single-precision floating-point values in ymm2/m256 and place the result in ymm1. The rounding mode is determined by imm8.</td>
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
Round the 4 single-precision floating-point values in the source operand (second operand) using the rounding
mode specified in the immediate operand (third operand) and place the results in the destination operand (first
operand). The rounding process rounds each input floating-point value to an integer value and returns the integer
result as a single-precision floating-point value.

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

Note: In VEX-encoded versions, VEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.

### Operation

```java
IF (imm[2] = ‘1) 
    THEN 
            // rounding mode is determined by MXCSR.RC 
        DEST[31:0] ← ConvertSPFPToInteger_M(SRC[31:0]);
        DEST[63:32] ← ConvertSPFPToInteger_M(SRC[63:32]);
        DEST[95:64] ← ConvertSPFPToInteger_M(SRC[95:64]);
        DEST[127:96] ← ConvertSPFPToInteger_M(SRC[127:96]);
    ELSE
            // rounding mode is determined by IMM8.RC
        DEST[31:0] ← ConvertSPFPToInteger_Imm(SRC[31:0]);
        DEST[63:32] ← ConvertSPFPToInteger_Imm(SRC[63:32]);
        DEST[95:64] ← ConvertSPFPToInteger_Imm(SRC[95:64]);
        DEST[127:96] ← ConvertSPFPToInteger_Imm(SRC[127:96]);
FI;
```
#### ROUNDPS(128-bit Legacy SSE version)
```java
DEST[31:0] ← RoundToInteger(SRC[31:0], ROUND_CONTROL)
DEST[63:32] ← RoundToInteger(SRC[63:32], ROUND_CONTROL)
DEST[95:64] ← RoundToInteger(SRC[95:64]], ROUND_CONTROL)
DEST[127:96] ← RoundToInteger(SRC[127:96]], ROUND_CONTROL)
DEST[MAXVL-1:128] (Unmodified)
```
#### VROUNDPS (VEX.128 encoded version)
```java
DEST[31:0] ← RoundToInteger(SRC[31:0], ROUND_CONTROL)
DEST[63:32] ← RoundToInteger(SRC[63:32], ROUND_CONTROL)
DEST[95:64] ← RoundToInteger(SRC[95:64]], ROUND_CONTROL)
DEST[127:96] ← RoundToInteger(SRC[127:96]], ROUND_CONTROL)
DEST[MAXVL-1:128] ← 0
```
#### VROUNDPS (VEX.256 encoded version)
```java
DEST[31:0] ← RoundToInteger(SRC[31:0], ROUND_CONTROL)
DEST[63:32] ← RoundToInteger(SRC[63:32], ROUND_CONTROL)
DEST[95:64] ← RoundToInteger(SRC[95:64]], ROUND_CONTROL)
DEST[127:96] ← RoundToInteger(SRC[127:96]], ROUND_CONTROL)
DEST[159:128] ← RoundToInteger(SRC[159:128]], ROUND_CONTROL)
DEST[191:160] ← RoundToInteger(SRC[191:160]], ROUND_CONTROL)
DEST[223:192] ← RoundToInteger(SRC[223:192] ], ROUND_CONTROL)
DEST[255:224] ← RoundToInteger(SRC[255:224] ], ROUND_CONTROL)
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
__m128 _mm_round_ps(__m128 s1, int iRoundMode);
__m128 _mm_floor_ps(__m128 s1);
__m128 _mm_ceil_ps(__m128 s1)
__m256 _mm256_round_ps(__m256 s1, int iRoundMode);
__m256 _mm256_floor_ps(__m256 s1);
__m256 _mm256_ceil_ps(__m256 s1)
```
### SIMD Floating-Point Exceptions
Invalid (signaled only if SRC = SNaN)

Precision (signaled only if imm[3] = ‘0; if imm[3] = ‘1, then the Precision Mask in the MXSCSR is ignored and precision
 exception is not signaled.)

Note that Denormal is not signaled by ROUNDPS.

### Other Exceptions

See Exceptions Type 2; additionally
<p>#UD
If VEX.vvvv ≠ 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
