<b>MULSD</b> — Multiply Scalar Double-Precision Floating-Point Value
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F2 0F 59 /r MULSD xmm1,xmm2/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Multiply the low double-precision floating-point value in xmm2/m64 by low double-precision floating-point value in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.LIG.F2.0F.WIG 59 /r VMULSD xmm1,xmm2, xmm3/m64</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Multiply the low double-precision floating-point value in xmm3/m64 by low double-precision floating-point value in xmm2.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.LIG.F2.0F.W1 59 /r VMULSD xmm1 {k1}{z}, xmm2, xmm3/m64 {er}</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Multiply the low double-precision floating-point value in xmm3/m64 by low double-precision floating-point value in xmm2.</td>
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
		<td>VEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>C</td>
		<td>Tuple1 Scalar</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
Multiplies the low double-precision floating-point value in the second source operand by the low double-precision
floating-point value in the first source operand, and stores the double-precision floating-point result in the destination
 operand. The second source operand can be an XMM register or a 64-bit memory location. The first source
operand and the destination operands are XMM registers.

128-bit Legacy SSE version: The first source operand and the destination operand are the same. Bits (MAXVL-
1:64) of the corresponding destination register remain unchanged.

VEX.128 and EVEX encoded version: The quadword at bits 127:64 of the destination operand is copied from the
same bits of the first source operand. Bits (MAXVL-1:128) of the destination register are zeroed.

EVEX encoded version: The low quadword element of the destination operand is updated according to the
writemask.

Software should ensure VMULSD is encoded with VEX.L=0. Encoding VMULSD with VEX.L=1 may encounter 
unpredictable behavior across different processor generations.

### Operation


#### VMULSD (EVEX encoded version)
```java
IF (EVEX.b = 1) AND SRC2 *is a register*
    THEN
        SET_RM(EVEX.RC);
    ELSE 
        SET_RM(MXCSR.RM);
FI;
IF k1[0] or *no writemask*
    THEN
            DEST[63:0] ← SRC1[63:0] * SRC2[63:0]
    ELSE 
        IF *merging-masking*
                            ; merging-masking
            THEN *DEST[63:0] remains unchanged*
            ELSE 
                            ; zeroing-masking
                THEN DEST[63:0] ← 0
            FI
    FI;
ENDFOR
DEST[127:64] ← SRC1[127:64]
DEST[MAXVL-1:128] ← 0
```
#### VMULSD (VEX.128 encoded version)
```java
DEST[63:0] ←SRC1[63:0] * SRC2[63:0]
DEST[127:64] ←SRC1[127:64]
DEST[MAXVL-1:128] ←0
```
#### MULSD (128-bit Legacy SSE version)
```java
DEST[63:0] ←DEST[63:0] * SRC[63:0]
DEST[MAXVL-1:64] (Unmodified)
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VMULSD __m128d _mm_mask_mul_sd(__m128d s, __mmask8 k, __m128d a, __m128d b);
VMULSD __m128d _mm_maskz_mul_sd( __mmask8 k, __m128d a, __m128d b);
VMULSD __m128d _mm_mul_round_sd( __m128d a, __m128d b, int);
VMULSD __m128d _mm_mask_mul_round_sd(__m128d s, __mmask8 k, __m128d a, __m128d b, int);
VMULSD __m128d _mm_maskz_mul_round_sd( __mmask8 k, __m128d a, __m128d b, int);
MULSD __m128d _mm_mul_sd (__m128d a, __m128d b)
```
### SIMD Floating-Point Exceptions
Overflow, Underflow, Invalid, Precision, Denormal

### Other Exceptions

Non-EVEX-encoded instruction, see Exceptions Type 3.
EVEX-encoded instruction, see Exceptions Type E3.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
