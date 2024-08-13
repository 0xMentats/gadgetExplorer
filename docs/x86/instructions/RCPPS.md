<b>RCPPS</b> — Compute Reciprocals of Packed Single-Precision Floating-Point Values
<table>
	<tr>
		<td><b>Opcode*/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 53 /r RCPPS xmm1, xmm2/m128</td>
		<td>RM V/V</td>
		<td></td>
		<td>SSE</td>
		<td>Computes the approximate reciprocals of the packed single-precision floating-point values in xmm2/m128 and stores the results in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.0F.WIG 53 /r VRCPPS xmm1, xmm2/m128</td>
		<td>RM V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Computes the approximate reciprocals of packed single-precision values in xmm2/mem and stores the results in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.256.0F.WIG 53 /r VRCPPS ymm1, ymm2/m256</td>
		<td>RM V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Computes the approximate reciprocals of packed single-precision values in ymm2/mem and stores the results in ymm1.</td>
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
Performs a SIMD computation of the approximate reciprocals of the four packed single-precision floating-point
values in the source operand (second operand) stores the packed single-precision floating-point results in the
destination operand. The source operand can be an XMM register or a 128-bit memory location. The destination
operand is an XMM register. See Figure 10-5 in the Intel® 64 and IA-32 Architectures Software Developer’s
Manual, Volume 1, for an illustration of a SIMD single-precision floating-point operation.

The relative error for this approximation is:

|Relative Error| ≤ 1.5 ∗ 2−12

The RCPPS instruction is not affected by the rounding control bits in the MXCSR register. When a source value is a
0.0, an ∞ of the sign of the source value is returned. A denormal source value is treated as a 0.0 (of the same sign).
Tiny results (see Section 4.9.1.5, “Numeric Underflow Exception (\#U)” in Intel® 64 and IA-32 Architectures Soft-
ware Developer’s Manual, Volume 1) are always flushed to 0.0, with the sign of the operand. (Input values greater
than or equal to |1.11111111110100000000000B∗2125| are guaranteed to not produce tiny results; input values
less than or equal to |1.00000000000110000000001B\*2126| are guaranteed to produce tiny results, which are in
turn flushed to 0.0; and input values in between this range may or may not produce tiny results, depending on the
implementation.) When a source value is an SNaN or QNaN, the SNaN is converted to a QNaN or the source QNaN
is returned.

In 64-bit mode, using a REX prefix in the form of REX.R permits this instruction to access additional registers
(XMM8-XMM15).

128-bit Legacy SSE version: The second source can be an XMM register or an 128-bit memory location. The destination
 is not distinct from the first source XMM register and the upper bits (MAXVL-1:128) of the corresponding
YMM register destination are unmodified.

VEX.128 encoded version: the first source operand is an XMM register or 128-bit memory location. The destination
operand is an XMM register. The upper bits (MAXVL-1:128) of the corresponding YMM register destination are
zeroed.

VEX.256 encoded version: The first source operand is a YMM register. The second source operand can be a YMM
register or a 256-bit memory location. The destination operand is a YMM register.

Note: In VEX-encoded versions, VEX.vvvv is reserved and must be 1111b, otherwise instructions will \#UD.

### Operation


#### RCPPS (128-bit Legacy SSE version)
```java
DEST[31:0] ← APPROXIMATE(1/SRC[31:0])
DEST[63:32] ← APPROXIMATE(1/SRC[63:32])
DEST[95:64] ← APPROXIMATE(1/SRC[95:64])
DEST[127:96] ← APPROXIMATE(1/SRC[127:96])
DEST[MAXVL-1:128] (Unmodified)
```
#### VRCPPS (VEX.128 encoded version)
```java
DEST[31:0] ← APPROXIMATE(1/SRC[31:0])
DEST[63:32] ← APPROXIMATE(1/SRC[63:32])
DEST[95:64] ← APPROXIMATE(1/SRC[95:64])
DEST[127:96] ← APPROXIMATE(1/SRC[127:96])
DEST[MAXVL-1:128] ← 0
```
#### VRCPPS (VEX.256 encoded version)
```java
DEST[31:0] ← APPROXIMATE(1/SRC[31:0])
DEST[63:32] ← APPROXIMATE(1/SRC[63:32])
DEST[95:64] ← APPROXIMATE(1/SRC[95:64])
DEST[127:96] ← APPROXIMATE(1/SRC[127:96])
DEST[159:128] ← APPROXIMATE(1/SRC[159:128])
DEST[191:160] ← APPROXIMATE(1/SRC[191:160])
DEST[223:192] ← APPROXIMATE(1/SRC[223:192])
DEST[255:224] ← APPROXIMATE(1/SRC[255:224])
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
RCCPS:
__m128 _mm_rcp_ps(__m128 a)
RCPPS:
 __m256 _mm256_rcp_ps (__m256 a);
```
### SIMD Floating-Point Exceptions
None.

### Other Exceptions

See Exceptions Type 4; additionally
<p>#UD
If VEX.vvvv ≠ 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
