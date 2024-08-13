<b>RSQRTSS</b> — Compute Reciprocal of Square Root of Scalar Single-Precision Floating-Point Value
<table>
	<tr>
		<td><b>Opcode*/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F3 0F 52 /r RSQRTSS xmm1, xmm2/m32</td>
		<td>RM V/V</td>
		<td></td>
		<td>SSE</td>
		<td>Computes the approximate reciprocal of the square root of the low single-precision floating-point value in xmm2/m32 and stores the results in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.LIG.F3.0F.WIG 52 /r VRSQRTSS xmm1, xmm2, xmm3/m32</td>
		<td>RVM V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Computes the approximate reciprocal of the square root of the low single precision floating-point value in xmm3/m32 and stores the results in xmm1. Also, upper single precision floating-point values (bits[127:32]) from xmm2 are copied to xmm1[127:32].</td>
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
	<tr>
		<td>RVM</td>
		<td>ModRM:reg (w)</td>
		<td>VEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
Computes an approximate reciprocal of the square root of the low single-precision floating-point value in the
source operand (second operand) stores the single-precision floating-point result in the destination operand. The
source operand can be an XMM register or a 32-bit memory location. The destination operand is an XMM register.
The three high-order doublewords of the destination operand remain unchanged. See Figure 10-6 in the Intel® 64
and IA-32 Architectures Software Developer’s Manual, Volume 1, for an illustration of a scalar single-precision
floating-point operation.

The relative error for this approximation is:

|Relative Error| ≤ 1.5 ∗ 2−12

The RSQRTSS instruction is not affected by the rounding control bits in the MXCSR register. When a source value is
a 0.0, an ∞ of the sign of the source value is returned. A denormal source value is treated as a 0.0 (of the same
sign). When a source value is a negative value (other than −0.0), a floating-point indefinite is returned. When a
source value is an SNaN or QNaN, the SNaN is converted to a QNaN or the source QNaN is returned.

In 64-bit mode, using a REX prefix in the form of REX.R permits this instruction to access additional registers
(XMM8-XMM15).

128-bit Legacy SSE version: The first source operand and the destination operand are the same. Bits (MAXVL-
1:32) of the corresponding YMM destination register remain unchanged.

VEX.128 encoded version: Bits (MAXVL-1:128) of the destination YMM register are zeroed.

### Operation


#### RSQRTSS (128-bit Legacy SSE version)
```java
DEST[31:0] ← APPROXIMATE(1/SQRT(SRC2[31:0]))
DEST[MAXVL-1:32] (Unmodified)
```
#### VRSQRTSS (VEX.128 encoded version)
```java
DEST[31:0] ← APPROXIMATE(1/SQRT(SRC2[31:0]))
DEST[127:32] ← SRC1[127:32]
DEST[MAXVL-1:128] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
RSQRTSS:
__m128 _mm_rsqrt_ss(__m128 a)
```
### SIMD Floating-Point Exceptions
None.

### Other Exceptions

See Exceptions Type 5.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
