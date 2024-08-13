<b>MOVHPD</b> — Move High Packed Double-Precision Floating-Point Value
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 16 /r MOVHPD xmm1, m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Move double-precision floating-point value from m64 to high quadword of xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.WIG 16 /r VMOVHPD xmm2, xmm1, m64</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Merge double-precision floating-point value from m64 and the low quadword of xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F.W1 16 /r VMOVHPD xmm2, xmm1, m64</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Merge double-precision floating-point value from m64 and the low quadword of xmm1.</td>
	</tr>
	<tr>
		<td>66 0F 17 /r MOVHPD m64, xmm1</td>
		<td>C</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Move double-precision floating-point value from high quadword of xmm1 to m64.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F.WIG 17 /r VMOVHPD m64, xmm1</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move double-precision floating-point value from high quadword of xmm1 to m64.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F.W1 17 /r VMOVHPD m64, xmm1</td>
		<td>E</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move double-precision floating-point value from high quadword of xmm1 to m64.</td>
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
		<td>ModRM:reg (r, w)</td>
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
		<td>NA</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>D</td>
		<td>Tuple1 Scalar</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>E</td>
		<td>Tuple1 Scalar</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
This instruction cannot be used for register to register or memory to memory moves.
128-bit Legacy SSE load:

Moves a double-precision floating-point value from the source 64-bit memory operand and stores it in the high 64-bit
s of the destination XMM register. The lower 64bits of the XMM register are preserved. Bits (MAXVL-1:128) of the
corresponding destination register are preserved.
VEX.128 & EVEX encoded load:

Loads a double-precision floating-point value from the source 64-bit memory operand (the third operand) and
stores it in the upper 64-bits of the destination XMM register (first operand). The low 64-bits from the first source
operand (second operand) are copied to the low 64-bits of the destination. Bits (MAXVL-1:128) of the corresponding
 destination register are zeroed.
128-bit store:

Stores a double-precision floating-point value from the high 64-bits of the XMM register source (second operand)
to the 64-bit memory location (first operand).

Note: VMOVHPD (store) (VEX.128.66.0F 17 /r) is legal and has the same behavior as the existing 66 0F 17 store.
For VMOVHPD (store) VEX.vvvv and EVEX.vvvv are reserved and must be 1111b otherwise instruction will \#UD.

If VMOVHPD is encoded with VEX.L or EVEX.L’L= 1, an attempt to execute the instruction encoded with VEX.L or
EVEX.L’L= 1 will cause an \#UD exception.

### Operation


#### MOVHPD (128-bit Legacy SSE load)
```java
DEST[63:0] (Unmodified)
DEST[127:64] ← SRC[63:0]
DEST[MAXVL-1:128] (Unmodified)
```
#### VMOVHPD (VEX.128 & EVEX encoded load)
```java
DEST[63:0] ← SRC1[63:0]
DEST[127:64] ← SRC2[63:0]
DEST[MAXVL-1:128] ← 0
```
#### VMOVHPD (store)
```java
DEST[63:0] ← SRC[127:64]
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
MOVHPD __m128d _mm_loadh_pd ( __m128d a, double *p)
MOVHPD void _mm_storeh_pd (double *p, __m128d a)
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

Non-EVEX-encoded instruction, see Exceptions Type 5; additionally
<p>#UD
If VEX.L = 1.
EVEX-encoded instruction, see Exceptions Type E9NF.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
