<b>HADDPD</b> — Packed Double-FP Horizontal Add
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32-bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 7C /r HADDPD xmm1, xmm2/m128</td>
		<td>RM V/V</td>
		<td></td>
		<td>SSE3</td>
		<td>Horizontal add packed double-precision floating-point values from xmm2/m128 to xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.WIG 7C /r VHADDPD xmm1,xmm2, xmm3/m128</td>
		<td>RVM V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Horizontal add packed double-precision floating-point values from xmm2 and xmm3/mem.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F.WIG 7C /r VHADDPD ymm1, ymm2, ymm3/m256</td>
		<td>RVM V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Horizontal add packed double-precision floating-point values from ymm2 and ymm3/mem.</td>
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
Adds the double-precision floating-point values in the high and low quadwords of the destination operand and
stores the result in the low quadword of the destination operand.

Adds the double-precision floating-point values in the high and low quadwords of the source operand and stores the
result in the high quadword of the destination operand.

In 64-bit mode, use of the REX.R prefix permits this instruction to access additional registers (XMM8-XMM15).

See Figure 3-16 for HADDPD; see Figure 3-17 for VHADDPD.

HADDPD xmm1, xmm2/m128

xmm2
[127:64]
[63:0]
/m128

xmm1
[127:64]
[63:0]

Result:
xmm2/m128[63:0] +
xmm1[63:0] + xmm1[127:64]
xmm1
xmm2/m128[127:64]

[127:64]
[63:0]

OM15993

Figure 3-16.  HADDPD—Packed Double-FP Horizontal Add
<table>
	<tr>
		<td><b>X3</b></td>
		<td><b>X2</b></td>
		<td><b>X1</b></td>
		<td><b>X0</b></td>
	</tr>
</table>

<table>
	<tr>
		<td><b>Y3</b></td>
		<td><b>Y2</b></td>
		<td><b>Y1</b></td>
		<td><b>Y0</b></td>
	</tr>
</table>

<table>
	<tr>
		<td><b>Y2 + Y3</b></td>
		<td><b>X2 + X3</b></td>
		<td><b>Y0 + Y1</b></td>
		<td><b>X0 + X1</b></td>
	</tr>
</table>

Figure 3-17.  VHADDPD operation

128-bit Legacy SSE version: The second source can be an XMM register or an 128-bit memory location. The destination
 is not distinct from the first source XMM register and the upper bits (MAXVL-1:128) of the corresponding
YMM register destination are unmodified.

VEX.128 encoded version: the first source operand is an XMM register or 128-bit memory location. The destination
operand is an XMM register. The upper bits (MAXVL-1:128) of the corresponding YMM register destination are
zeroed.

VEX.256 encoded version: The first source operand is a YMM register. The second source operand can be a YMM
register or a 256-bit memory location. The destination operand is a YMM register.

### Operation


#### HADDPD (128-bit Legacy SSE version)
```java
DEST[63:0] ← SRC1[127:64] + SRC1[63:0]
DEST[127:64] ← SRC2[127:64] + SRC2[63:0]
DEST[MAXVL-1:128] (Unmodified)
```
#### VHADDPD (VEX.128 encoded version)
```java
DEST[63:0] ← SRC1[127:64] + SRC1[63:0]
DEST[127:64] ← SRC2[127:64] + SRC2[63:0]
DEST[MAXVL-1:128] ← 0
```
#### VHADDPD (VEX.256 encoded version)
```java
DEST[63:0] ← SRC1[127:64] + SRC1[63:0]
DEST[127:64] ← SRC2[127:64] + SRC2[63:0]
DEST[191:128] ← SRC1[255:192] + SRC1[191:128]
DEST[255:192] ← SRC2[255:192] + SRC2[191:128]
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VHADDPD: __m256d _mm256_hadd_pd (__m256d a, __m256d b);
HADDPD:
__m128d _mm_hadd_pd (__m128d a, __m128d b);
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