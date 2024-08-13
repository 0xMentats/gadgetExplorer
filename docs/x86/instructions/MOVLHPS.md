<b>MOVLHPS</b> — Move Packed Single-Precision Floating-Point Values Low to High
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 16 /r MOVLHPS xmm1, xmm2</td>
		<td>RM</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Move two packed single-precision floating-point values from low quadword of xmm2 to high quadword of xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.0F.WIG 16 /r VMOVLHPS xmm1, xmm2, xmm3</td>
		<td>RVM V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Merge two packed single-precision floating-point values from low quadword of xmm3 and low quadword of xmm2.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.0F.W0 16 /r VMOVLHPS xmm1, xmm2, xmm3</td>
		<td>RVM V/V</td>
		<td></td>
		<td>AVX512F</td>
		<td>Merge two packed single-precision floating-point values from low quadword of xmm3 and low quadword of xmm2.</td>
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

Moves two packed single-precision floating-point values from the low quadword of the second XMM argument
(second operand) to the high quadword of the first XMM register (first argument). The low quadword of the destination
 operand is left unchanged. Bits (MAXVL-1:128) of the corresponding destination register are unmodified.
128-bit three-argument forms:

Moves two packed single-precision floating-point values from the low quadword of the third XMM argument (third
operand) to the high quadword of the destination (first operand). Copies the low quadword from the second XMM
argument (second operand) to the low quadword of the destination (first operand). Bits (MAXVL-1:128) of the
corresponding destination register are zeroed.

If VMOVLHPS is encoded with VEX.L or EVEX.L’L= 1, an attempt to execute the instruction encoded with VEX.L or
EVEX.L’L= 1 will cause an \#UD exception.

### Operation


#### MOVLHPS (128-bit two-argument form)
```java
DEST[63:0] (Unmodified)
DEST[127:64] ← SRC[63:0]
DEST[MAXVL-1:128] (Unmodified)
```
#### VMOVLHPS (128-bit three-argument form - VEX & EVEX)
```java
DEST[63:0] ← SRC1[63:0]
DEST[127:64] ← SRC2[63:0]
DEST[MAXVL-1:128] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
MOVLHPS __m128 _mm_movelh_ps(__m128 a, __m128 b)
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