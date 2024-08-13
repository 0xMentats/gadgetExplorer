<b>ROUNDSD</b> —  Round Scalar Double Precision Floating-Point Values
<table>
	<tr>
		<td><b>Opcode*/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 3A 0B /r ib ROUNDSD xmm1, xmm2/m64, imm8</td>
		<td>RMI</td>
		<td>V/V</td>
		<td>SSE4_1</td>
		<td>Round the low packed double precision floating-point value in xmm2/m64 and place the result in xmm1. The rounding mode is determined by imm8.</td>
	</tr>
	<tr>
		<td>VEX.NDS.LIG.66.0F3A.WIG 0B /r ib VROUNDSD xmm1, xmm2, xmm3/m64, imm8</td>
		<td>RVMI V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Round the low packed double precision floating-point value in xmm3/m64 and place the result in xmm1. The rounding mode is determined by imm8. Upper packed double precision floating-point value (bits[127:64]) from xmm2 is copied to xmm1[127:64].</td>
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
	<tr>
		<td>RVMI</td>
		<td>ModRM:reg (w)</td>
		<td>VEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8</td>
	</tr>
</table>


### Description
Round the DP FP value in the lower qword of the source operand (second operand) using the rounding mode spec-
ified in the immediate operand (third operand) and place the result in the destination operand (first operand). The
rounding process rounds a double-precision floating-point input to an integer value and returns the integer result
as a double precision floating-point value in the lowest position. The upper double precision floating-point value in
the destination is retained.

The immediate operand specifies control fields for the rounding operation, three bit fields are defined and shown in
Figure 4-24. Bit 3 of the immediate byte controls processor behavior for a precision exception, bit 2 selects the
source of rounding mode control. Bits 1:0 specify a non-sticky rounding-mode value (Table 4-18 lists the encoded
values for rounding-mode field).

The Precision Floating-Point Exception is signaled according to the immediate operand. If any source operand is an
SNaN then it will be converted to a QNaN. If DAZ is set to ‘1 then denormals will be converted to zero before
rounding.

128-bit Legacy SSE version: The first source operand and the destination operand are the same. Bits (MAXVL-
1:64) of the corresponding YMM destination register remain unchanged.

VEX.128 encoded version: Bits (MAXVL-1:128) of the destination YMM register are zeroed.

### Operation

```java
IF (imm[2] = ‘1) 
    THEN 
            // rounding mode is determined by MXCSR.RC 
        DEST[63:0] ← ConvertDPFPToInteger_M(SRC[63:0]);
    ELSE
            // rounding mode is determined by IMM8.RC
        DEST[63:0] ← ConvertDPFPToInteger_Imm(SRC[63:0]);
FI;
DEST[127:63] remains unchanged ;
```
#### ROUNDSD (128-bit Legacy SSE version)
```java
DEST[63:0] ← RoundToInteger(SRC[63:0], ROUND_CONTROL)
DEST[MAXVL-1:64] (Unmodified)
```
#### VROUNDSD (VEX.128 encoded version)
```java
DEST[63:0] ← RoundToInteger(SRC2[63:0], ROUND_CONTROL)
DEST[127:64] ← SRC1[127:64]
DEST[MAXVL-1:128] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
ROUNDSD:
__m128d mm_round_sd(__m128d dst, __m128d s1, int iRoundMode);
__m128d mm_floor_sd(__m128d dst, __m128d s1);
__m128d mm_ceil_sd(__m128d dst, __m128d s1);
```
### SIMD Floating-Point Exceptions
Invalid (signaled only if SRC = SNaN)

Precision (signaled only if imm[3] = ‘0; if imm[3] = ‘1, then the Precision Mask in the MXSCSR is ignored and precision
 exception is not signaled.)

Note that Denormal is not signaled by ROUNDSD.

### Other Exceptions

See Exceptions Type 3.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
