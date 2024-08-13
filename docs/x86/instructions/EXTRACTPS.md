<b>EXTRACTPS</b> — Extract Packed Floating-Point Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 3A 17 /r ib EXTRACTPS reg/m32, xmm1, imm8</td>
		<td>A</td>
		<td>VV</td>
		<td>SSE4_1</td>
		<td>Extract one single-precision floating-point value from xmm1 at the offset specified by imm8 and store the result in reg or m32. Zero extend the results in 64-bit register if applicable.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F3A.WIG 17 /r ib VEXTRACTPS reg/m32, xmm1, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Extract one single-precision floating-point value from xmm1 at the offset specified by imm8 and store the result in reg or m32. Zero extend the results in 64-bit register if applicable.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F3A.WIG 17 /r ib VEXTRACTPS reg/m32, xmm1, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Extract one single-precision floating-point value from xmm1 at the offset specified by imm8 and store the result in reg or m32. Zero extend the results in 64-bit register if applicable.</td>
	</tr>
</table>


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
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>Imm8</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>B</td>
		<td>Tuple1 Scalar</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>Imm8</td>
		<td>NA</td>
	</tr>
</table>


### Description
Extracts a single-precision floating-point value from the source operand (second operand) at the 32-bit offset spec-
ified from imm8. Immediate bits higher than the most significant offset for the vector length are ignored.

The extracted single-precision floating-point value is stored in the low 32-bits of the destination operand

In 64-bit mode, destination register operand has default operand size of 64 bits. The upper 32-bits of the register
are filled with zero. REX.W is ignored.

VEX.128 and EVEX encoded version: When VEX.W1 or EVEX.W1 form is used in 64-bit mode with a general
purpose register (GPR) as a destination operand, the packed single quantity is zero extended to 64 bits.

VEX.vvvv/EVEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.

128-bit Legacy SSE version: When a REX.W prefix is used in 64-bit mode with a general purpose register (GPR) as
a destination operand, the packed single quantity is zero extended to 64 bits.

The source register is an XMM register. Imm8[1:0] determine the starting DWORD offset from which to extract the
32-bit floating-point value.

If VEXTRACTPS is encoded with VEX.L= 1, an attempt to execute the instruction encoded with VEX.L= 1 will cause
an \#UD exception.

### Operation


#### VEXTRACTPS (EVEX and VEX.128 encoded version)
```java
SRC_OFFSET ← IMM8[1:0]
IF (64-Bit Mode and DEST is register)
    DEST[31:0] ← (SRC[127:0] >> (SRC_OFFSET*32)) AND 0FFFFFFFFh
    DEST[63:32] ← 0
ELSE
    DEST[31:0] ← (SRC[127:0] >> (SRC_OFFSET*32)) AND 0FFFFFFFFh
FI
```
#### EXTRACTPS (128-bit Legacy SSE version)
```java
SRC_OFFSET ←IMM8[1:0]
IF (64-Bit Mode and DEST is register)
    DEST[31:0] ←(SRC[127:0] >> (SRC_OFFSET*32)) AND 0FFFFFFFFh
    DEST[63:32] ←0
ELSE
    DEST[31:0] ←(SRC[127:0] >> (SRC_OFFSET*32)) AND 0FFFFFFFFh
FI
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
EXTRACTPS int _mm_extract_ps (__m128 a, const int nidx);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

VEX-encoded instructions, see Exceptions Type 5; Additionally
EVEX-encoded instructions, see Exceptions Type E9NF.
<p>#UD
IF VEX.L = 0.
<p>#UD
If VEX.vvvv != 1111B or EVEX.vvvv != 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
