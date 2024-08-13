<b>MOVHPS</b> — Move High Packed Single-Precision Floating-Point Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 16 /r MOVHPS xmm1, m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Move two packed single-precision floating-point values from m64 to high quadword of xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.0F.WIG 16 /r VMOVHPS xmm2, xmm1, m64</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Merge two packed single-precision floating-point values from m64 and the low quadword of xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.0F.W0 16 /r VMOVHPS xmm2, xmm1, m64</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Merge two packed single-precision floating-point values from m64 and the low quadword of xmm1.</td>
	</tr>
	<tr>
		<td>NP 0F 17 /r MOVHPS m64, xmm1</td>
		<td>C</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Move two packed single-precision floating-point values from high quadword of xmm1 to m64.</td>
	</tr>
	<tr>
		<td>VEX.128.0F.WIG 17 /r VMOVHPS m64, xmm1</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move two packed single-precision floating-point values from high quadword of xmm1 to m64.</td>
	</tr>
	<tr>
		<td>EVEX.128.0F.W0 17 /r VMOVHPS m64, xmm1</td>
		<td>E</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move two packed single-precision floating-point values from high quadword of xmm1 to m64.</td>
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
in the high 64-bits of the destination XMM register. The lower 64bits of the XMM register are preserved. Bits
(MAXVL-1:128) of the corresponding destination register are preserved.
VEX.128 & EVEX encoded load:

Loads two single-precision floating-point values from the source 64-bit memory operand (the third operand) and
stores it in the upper 64-bits of the destination XMM register (first operand). The low 64-bits from the first source
operand (the second operand) are copied to the lower 64-bits of the destination. Bits (MAXVL-1:128) of the corresponding
 destination register are zeroed.
128-bit store:

Stores two packed single-precision floating-point values from the high 64-bits of the XMM register source (second
operand) to the 64-bit memory location (first operand).

Note: VMOVHPS (store) (VEX.NDS.128.0F 17 /r) is legal and has the same behavior as the existing 0F 17 store.
For VMOVHPS (store) VEX.vvvv and EVEX.vvvv are reserved and must be 1111b otherwise instruction will \#UD.

If VMOVHPS is encoded with VEX.L or EVEX.L’L= 1, an attempt to execute the instruction encoded with VEX.L or
EVEX.L’L= 1 will cause an \#UD exception.

### Operation


#### MOVHPS (128-bit Legacy SSE load)
```java
DEST[63:0] (Unmodified)
DEST[127:64] ← SRC[63:0]
DEST[MAXVL-1:128] (Unmodified)
```
#### VMOVHPS (VEX.128 and EVEX encoded load)
```java
DEST[63:0] ← SRC1[63:0]
DEST[127:64] ← SRC2[63:0]
DEST[MAXVL-1:128] ← 0
```
#### VMOVHPS (store)
```java
DEST[63:0] ← SRC[127:64]
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
MOVHPS __m128 _mm_loadh_pi ( __m128 a, __m64 *p)
MOVHPS void _mm_storeh_pi (__m64 *p, __m128 a)
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