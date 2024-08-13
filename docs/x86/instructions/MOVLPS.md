<b>MOVLPS</b> — Move Low Packed Single-Precision Floating-Point Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 12 /r MOVLPS xmm1, m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Move two packed single-precision floating-point values from m64 to low quadword of xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.0F.WIG 12 /r VMOVLPS xmm2, xmm1, m64</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Merge two packed single-precision floating-point values from m64 and the high quadword of xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.0F.W0 12 /r VMOVLPS xmm2, xmm1, m64</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Merge two packed single-precision floating-point values from m64 and the high quadword of xmm1.</td>
	</tr>
	<tr>
		<td>0F 13/r MOVLPS m64, xmm1</td>
		<td>C</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Move two packed single-precision floating-point values from low quadword of xmm1 to m64.</td>
	</tr>
	<tr>
		<td>VEX.128.0F.WIG 13/r VMOVLPS m64, xmm1</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move two packed single-precision floating-point values from low quadword of xmm1 to m64.</td>
	</tr>
	<tr>
		<td>EVEX.128.0F.W0 13/r VMOVLPS m64, xmm1</td>
		<td>E</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move two packed single-precision floating-point values from low quadword of xmm1 to m64.</td>
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
		<td>Tuple2</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>E</td>
		<td>Tuple2</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
This instruction cannot be used for register to register or memory to memory moves.
128-bit Legacy SSE load:

Moves two packed single-precision floating-point values from the source 64-bit memory operand and stores them
in the low 64-bits of the destination XMM register. The upper 64bits of the XMM register are preserved. Bits
(MAXVL-1:128) of the corresponding destination register are preserved.
VEX.128 & EVEX encoded load:

Loads two packed single-precision floating-point values from the source 64-bit memory operand (the third
operand), merges them with the upper 64-bits of the first source operand (the second operand), and stores them
in the low 128-bits of the destination register (the first operand). Bits (MAXVL-1:128) of the corresponding destination
 register are zeroed.
128-bit store:

Loads two packed single-precision floating-point values from the low 64-bits of the XMM register source (second
operand) to the 64-bit memory location (first operand).

Note: VMOVLPS (store) (VEX.128.0F 13 /r) is legal and has the same behavior as the existing 0F 13 store. For
VMOVLPS (store) VEX.vvvv and EVEX.vvvv are reserved and must be 1111b otherwise instruction will \#UD.

If VMOVLPS is encoded with VEX.L or EVEX.L’L= 1, an attempt to execute the instruction encoded with VEX.L or
EVEX.L’L= 1 will cause an \#UD exception.

### Operation


#### MOVLPS (128-bit Legacy SSE load)
```java
DEST[63:0] ← SRC[63:0]
DEST[MAXVL-1:64] (Unmodified)
```
#### VMOVLPS (VEX.128 & EVEX encoded load)
```java
DEST[63:0] ← SRC2[63:0]
DEST[127:64] ← SRC1[127:64]
DEST[MAXVL-1:128] ← 0
```
#### VMOVLPS (store)
```java
DEST[63:0] ← SRC[63:0]
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
MOVLPS __m128 _mm_loadl_pi ( __m128 a, __m64 *p)
MOVLPS void _mm_storel_pi (__m64 *p, __m128 a)
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