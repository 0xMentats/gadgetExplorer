<b>HSUBPS</b> — Packed Single-FP Horizontal Subtract
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32-bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F2 0F 7D /r HSUBPS xmm1, xmm2/m128</td>
		<td>RM V/V</td>
		<td></td>
		<td>SSE3</td>
		<td>Horizontal subtract packed single-precision floating-point values from xmm2/m128 to xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.F2.0F.WIG 7D /r VHSUBPS xmm1, xmm2, xmm3/m128</td>
		<td>RVM V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Horizontal subtract packed single-precision floating-point values from xmm2 and xmm3/mem.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.F2.0F.WIG 7D /r VHSUBPS ymm1, ymm2, ymm3/m256</td>
		<td>RVM V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Horizontal subtract packed single-precision floating-point values from ymm2 and ymm3/mem.</td>
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
		<td>ModRM:reg (r, w)</td>
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
Subtracts the single-precision floating-point value in the second dword of the destination operand from the first
dword of the destination operand and stores the result in the first dword of the destination operand.

Subtracts the single-precision floating-point value in the fourth dword of the destination operand from the third
dword of the destination operand and stores the result in the second dword of the destination operand.

Subtracts the single-precision floating-point value in the second dword of the source operand from the first dword
of the source operand and stores the result in the third dword of the destination operand.

Subtracts the single-precision floating-point value in the fourth dword of the source operand from the third dword
of the source operand and stores the result in the fourth dword of the destination operand.

In 64-bit mode, use of the REX.R prefix permits this instruction to access additional registers (XMM8-XMM15).

See Figure 3-22 for HSUBPS; see Figure 3-23 for VHSUBPS.
HSUBPS xmm1, xmm2/m128

xmm2/
[127:96]
[95:64]
[63:32]
[31:0]
m128

xmm1
[127:96]
[95:64]
[63:32]
[31:0]

xmm2/m128
xmm2/m128
RESULT:
xmm1[95:64] -
xmm1[31:0] -
[95:64] - xmm2/
[31:0] - xmm2/
xmm1
xmm1[127:96]
xmm1[63:32]
m128[127:96]
m128[63:32]

[127:96]
[95:64]
[63:32]
[31:0]

OM15996

Figure 3-22.  HSUBPS—Packed Single-FP Horizontal Subtract
<table>
	<tr>
		<td><b>X7</b></td>
		<td><b>X6</b></td>
		<td><b>X5</b></td>
		<td><b>X4</b></td>
		<td><b>X3</b></td>
		<td><b>X2</b></td>
		<td><b>X1</b></td>
		<td><b>X0</b></td>
	</tr>
</table>

<table>
	<tr>
		<td><b>Y7</b></td>
		<td><b>Y6</b></td>
		<td><b>Y5</b></td>
		<td><b>Y4</b></td>
		<td><b>Y3</b></td>
		<td><b>Y2</b></td>
		<td><b>Y1</b></td>
		<td><b>Y0</b></td>
	</tr>
</table>

<table>
	<tr>
		<td><b>Y6-Y7</b></td>
		<td><b>Y4-Y5</b></td>
		<td><b>X6-X7</b></td>
		<td><b>X4-X5</b></td>
		<td><b>Y2-Y3</b></td>
		<td><b>Y0-Y1</b></td>
		<td><b>X2-X3</b></td>
		<td><b>X0-X1</b></td>
	</tr>
</table>

Figure 3-23.  VHSUBPS operation

128-bit Legacy SSE version: The second source can be an XMM register or an 128-bit memory location. The destination
 is not distinct from the first source XMM register and the upper bits (MAXVL-1:128) of the corresponding
YMM register destination are unmodified.

VEX.128 encoded version: the first source operand is an XMM register or 128-bit memory location. The destination
operand is an XMM register. The upper bits (MAXVL-1:128) of the corresponding YMM register destination are
zeroed.

VEX.256 encoded version: The first source operand is a YMM register. The second source operand can be a YMM
register or a 256-bit memory location. The destination operand is a YMM register.

### Operation


#### HSUBPS (128-bit Legacy SSE version)
```java
DEST[31:0] ← SRC1[31:0] - SRC1[63:32]
DEST[63:32] ← SRC1[95:64] - SRC1[127:96]
DEST[95:64] ← SRC2[31:0] - SRC2[63:32]
DEST[127:96] ← SRC2[95:64] - SRC2[127:96] 
DEST[MAXVL-1:128] (Unmodified)
```
#### VHSUBPS (VEX.128 encoded version)
```java
DEST[31:0] ← SRC1[31:0] - SRC1[63:32]
DEST[63:32] ← SRC1[95:64] - SRC1[127:96]
DEST[95:64] ← SRC2[31:0] - SRC2[63:32]
DEST[127:96] ← SRC2[95:64] - SRC2[127:96] 
DEST[MAXVL-1:128] ← 0
```
#### VHSUBPS (VEX.256 encoded version)
```java
DEST[31:0] ← SRC1[31:0] - SRC1[63:32]
DEST[63:32] ← SRC1[95:64] - SRC1[127:96]
DEST[95:64] ← SRC2[31:0] - SRC2[63:32]
DEST[127:96] ← SRC2[95:64] - SRC2[127:96] 
DEST[159:128] ← SRC1[159:128] - SRC1[191:160]
DEST[191:160] ← SRC1[223:192] - SRC1[255:224]
DEST[223:192] ← SRC2[159:128] - SRC2[191:160]
DEST[255:224] ← SRC2[223:192] - SRC2[255:224]
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
HSUBPS:
__m128 _mm_hsub_ps(__m128 a, __m128 b);
VHSUBPS: __m256 _mm256_hsub_ps (__m256 a, __m256 b);
```
### Exceptions
When the source operand is a memory operand, the operand must be aligned on a 16-byte boundary or a general-
protection exception (<p>#GP) will be generated.

### Numeric Exceptions

Overflow, Underflow, Invalid, Precision, Denormal

### Other Exceptions

See Exceptions Type 2.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
