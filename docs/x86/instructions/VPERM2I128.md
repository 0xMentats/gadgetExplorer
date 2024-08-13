<b>VPERM2I128</b> —  Permute Integer Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 -bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F3A.W0 46 /r ib VPERM2I128 ymm1, ymm2, ymm3/m256, imm8</td>
		<td>RVMI</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Permute 128-bit integer data in ymm2 and ymm3/mem using controls from imm8 and store result in ymm1.</td>
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
		<td>RVMI</td>
		<td>ModRM:reg (w)</td>
		<td>VEX.vvvv</td>
		<td>ModRM:r/m (r)</td>
		<td>Imm8</td>
	</tr>
</table>


### Description
Permute 128 bit integer data from the first source operand (second operand) and second source operand (third
operand) using bits in the 8-bit immediate and store results in the destination operand (first operand). The first
source operand is a YMM register, the second source operand is a YMM register or a 256-bit memory location, and
the destination operand is a YMM register.
<table>
	<tr>
		<td><b>Y1</b></td>
		<td><b>Y0</b></td>
	</tr>
</table>

<table>
	<tr>
		<td><b>X1</b></td>
		<td><b>X0</b></td>
	</tr>
</table>

<table>
	<tr>
		<td><b>X0, X1, Y0, or Y1</b></td>
		<td><b>X0, X1, Y0, or Y1</b></td>
	</tr>
</table>

Figure 5-22.  VPERM2I128 Operation

Imm8[1:0] select the source for the first destination 128-bit field, imm8[5:4] select the source for the second
destination field. If imm8[3] is set, the low 128-bit field is zeroed. If imm8[7] is set, the high 128-bit field is zeroed.

VEX.L must be 1, otherwise the instruction will \#UD.

### Operation


#### VPERM2I128
```java
CASE IMM8[1:0] of 
0: DEST[127:0] ← SRC1[127:0]
1: DEST[127:0] ← SRC1[255:128]
2: DEST[127:0] ← SRC2[127:0]
3: DEST[127:0] ← SRC2[255:128]
ESAC
CASE IMM8[5:4] of 
0: DEST[255:128] ← SRC1[127:0]
1: DEST[255:128] ← SRC1[255:128]
2: DEST[255:128] ← SRC2[127:0]
3: DEST[255:128] ← SRC2[255:128]
ESAC
IF (imm8[3])
DEST[127:0] ← 0
FI
IF (imm8[7])
DEST[255:128] ← 0
FI
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPERM2I128: __m256i _mm256_permute2x128_si256 (__m256i a, __m256i b, int control)
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

See Exceptions Type 6; additionally
<p>#UD
If VEX.L = 0,
If VEX.W = 1.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
