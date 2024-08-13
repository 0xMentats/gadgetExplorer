<b>MOVHLPS</b> — Move Packed Single-Precision Floating-Point Values High to Low
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 12 /r MOVHLPS xmm1, xmm2</td>
		<td>RM</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Move two packed single-precision floating-point values from high quadword of xmm2 to low quadword of xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.0F.WIG 12 /r VMOVHLPS xmm1, xmm2, xmm3</td>
		<td>RVM</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Merge two packed single-precision floating-point values from high quadword of xmm3 and low quadword of xmm2.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.0F.W0 12 /r VMOVHLPS xmm1, xmm2, xmm3</td>
		<td>RVM</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Merge two packed single-precision floating-point values from high quadword of xmm3 and low quadword of xmm2.</td>
	</tr>
</table>

Instruction Operand Encoding1
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
		<td>vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
This instruction cannot be used for memory to register moves.
128-bit two-argument form:

Moves two packed single-precision floating-point values from the high quadword of the second XMM argument
(second operand) to the low quadword of the first XMM register (first argument). The quadword at bits 127:64 of
the destination operand is left unchanged. Bits (MAXVL-1:128) of the corresponding destination register remain
unchanged.
128-bit and EVEX three-argument form

Moves two packed single-precision floating-point values from the high quadword of the third XMM argument (third
operand) to the low quadword of the destination (first operand). Copies the high quadword from the second XMM
argument (second operand) to the high quadword of the destination (first operand). Bits (MAXVL-1:128) of the
corresponding destination register are zeroed.

If VMOVHLPS is encoded with VEX.L or EVEX.L’L= 1, an attempt to execute the instruction encoded with VEX.L or
EVEX.L’L= 1 will cause an \#UD exception.

### Operation


#### MOVHLPS (128-bit two-argument form)
```java
DEST[63:0] ← SRC[127:64]
DEST[MAXVL-1:64] (Unmodified)
```
#### VMOVHLPS (128-bit three-argument form - VEX & EVEX)
```java
DEST[63:0] ← SRC2[127:64]
DEST[127:64] ← SRC1[127:64]
DEST[MAXVL-1:128] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
MOVHLPS __m128 _mm_movehl_ps(__m128 a, __m128 b)
```
### SIMD Floating-Point Exceptions

None

1. ModRM.MOD = 011B required

### Other Exceptions
Non-EVEX-encoded instruction, see Exceptions Type 7; additionally
<p>#UD
If VEX.L = 1.
EVEX-encoded instruction, see Exceptions Type E7NM.128.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
