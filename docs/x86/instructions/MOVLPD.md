<b>MOVLPD</b> — Move Low Packed Double-Precision Floating-Point Value
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 12 /r MOVLPD xmm1, m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Move double-precision floating-point value from m64 to low quadword of xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.WIG 12 /r VMOVLPD xmm2, xmm1, m64</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Merge double-precision floating-point value from m64 and the high quadword of xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F.W1 12 /r VMOVLPD xmm2, xmm1, m64</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Merge double-precision floating-point value from m64 and the high quadword of xmm1.</td>
	</tr>
	<tr>
		<td>66 0F 13/r MOVLPD m64, xmm1</td>
		<td>C</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Move double-precision floating-point value from low quadword of xmm1 to m64.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F.WIG 13/r VMOVLPD m64, xmm1</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move double-precision floating-point value from low quadword of xmm1 to m64.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F.W1 13/r VMOVLPD m64, xmm1</td>
		<td>E</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move double-precision floating-point value from low quadword of xmm1 to m64.</td>
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
		<td>ModRM:r/m (r)</td>
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

Moves a double-precision floating-point value from the source 64-bit memory operand and stores it in the low 64-bit
s of the destination XMM register. The upper 64bits of the XMM register are preserved. Bits (MAXVL-1:128) of the
corresponding destination register are preserved.
VEX.128 & EVEX encoded load:

Loads a double-precision floating-point value from the source 64-bit memory operand (third operand), merges it
with the upper 64-bits of the first source XMM register (second operand), and stores it in the low 128-bits of the
destination XMM register (first operand). Bits (MAXVL-1:128) of the corresponding destination register are zeroed.
128-bit store:

Stores a double-precision floating-point value from the low 64-bits of the XMM register source (second operand) to
the 64-bit memory location (first operand).

Note: VMOVLPD (store) (VEX.128.66.0F 13 /r) is legal and has the same behavior as the existing 66 0F 13 store.
For VMOVLPD (store) VEX.vvvv and EVEX.vvvv are reserved and must be 1111b otherwise instruction will \#UD.

If VMOVLPD is encoded with VEX.L or EVEX.L’L= 1, an attempt to execute the instruction encoded with VEX.L or
EVEX.L’L= 1 will cause an \#UD exception.

### Operation


#### MOVLPD (128-bit Legacy SSE load)
```java
DEST[63:0] ← SRC[63:0]
DEST[MAXVL-1:64] (Unmodified)
```
#### VMOVLPD (VEX.128 & EVEX encoded load)
```java
DEST[63:0] ← SRC2[63:0]
DEST[127:64] ← SRC1[127:64]
DEST[MAXVL-1:128] ← 0
```
#### VMOVLPD (store)
```java
DEST[63:0] ← SRC[63:0]
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
MOVLPD __m128d _mm_loadl_pd ( __m128d a, double *p)
MOVLPD void _mm_storel_pd (double *p, __m128d a)
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