<b>MOVSD</b> — Move or Merge Scalar Double-Precision Floating-Point Value
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F2 0F 10 /r MOVSD xmm1, xmm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Move scalar double-precision floating-point value from xmm2 to xmm1 register.</td>
	</tr>
	<tr>
		<td>F2 0F 10 /r MOVSD xmm1, m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Load scalar double-precision floating-point value from m64 to xmm1 register.</td>
	</tr>
	<tr>
		<td>F2 0F 11 /r MOVSD xmm1/m64, xmm2</td>
		<td>C</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Move scalar double-precision floating-point value from xmm2 register to xmm1/m64.</td>
	</tr>
	<tr>
		<td>VEX.NDS.LIG.F2.0F.WIG 10 /r VMOVSD xmm1, xmm2, xmm3</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Merge scalar double-precision floating-point value from xmm2 and xmm3 to xmm1 register.</td>
	</tr>
	<tr>
		<td>VEX.LIG.F2.0F.WIG 10 /r VMOVSD xmm1, m64</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Load scalar double-precision floating-point value from m64 to xmm1 register.</td>
	</tr>
	<tr>
		<td>VEX.NDS.LIG.F2.0F.WIG 11 /r VMOVSD xmm1, xmm2, xmm3</td>
		<td>E</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Merge scalar double-precision floating-point value from xmm2 and xmm3 registers to xmm1.</td>
	</tr>
	<tr>
		<td>VEX.LIG.F2.0F.WIG 11 /r VMOVSD m64, xmm1</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Store scalar double-precision floating-point value from xmm1 register to m64.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.LIG.F2.0F.W1 10 /r VMOVSD xmm1 {k1}{z}, xmm2, xmm3</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Merge scalar double-precision floating-point value from xmm2 and xmm3 registers to xmm1 under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.LIG.F2.0F.W1 10 /r VMOVSD xmm1 {k1}{z}, m64</td>
		<td>F</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Load scalar double-precision floating-point value from m64 to xmm1 register under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.LIG.F2.0F.W1 11 /r VMOVSD xmm1 {k1}{z}, xmm2, xmm3</td>
		<td>E</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Merge scalar double-precision floating-point value from xmm2 and xmm3 registers to xmm1 under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.LIG.F2.0F.W1 11 /r VMOVSD m64 {k1}, xmm1</td>
		<td>G</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Store scalar double-precision floating-point value from xmm1 register to m64 under writemask k1.</td>
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
		<td>NA</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>D</td>
		<td>NA</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>E</td>
		<td>NA</td>
		<td>ModRM:r/m (w)</td>
		<td>vvvv (r)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>F</td>
		<td>Tuple1 Scalar</td>
		<td>ModRM:reg (r, w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>G</td>
		<td>Tuple1 Scalar</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Moves a scalar double-precision floating-point value from the source operand (second operand) to the destination
operand (first operand). The source and destination operands can be XMM registers or 64-bit memory locations.
This instruction can be used to move a double-precision floating-point value to and from the low quadword of an
XMM register and a 64-bit memory location, or to move a double-precision floating-point value between the low
quadwords of two XMM registers. The instruction cannot be used to transfer data between memory locations.

Legacy version: When the source and destination operands are XMM registers, bits MAXVL:64 of the destination
operand remains unchanged. When the source operand is a memory location and destination operand is an XMM
registers, the quadword at bits 127:64 of the destination operand is cleared to all 0s, bits MAXVL:128 of the destination
 operand remains unchanged.

VEX and EVEX encoded register-register syntax: Moves a scalar double-precision floating-point value from the
second source operand (the third operand) to the low quadword element of the destination operand (the first
operand). Bits 127:64 of the destination operand are copied from the first source operand (the second operand).
Bits (MAXVL-1:128) of the corresponding destination register are zeroed.

VEX and EVEX encoded memory store syntax: When the source operand is a memory location and destination
operand is an XMM registers, bits MAXVL:64 of the destination operand is cleared to all 0s.

EVEX encoded versions: The low quadword of the destination is updated according to the writemask.

Note: For VMOVSD (memory store and load forms), VEX.vvvv and EVEX.vvvv are reserved and must be 1111b,
otherwise instruction will \#UD.

### Operation


#### VMOVSD (EVEX.NDS.LIG.F2.0F 10 /r: VMOVSD xmm1, m64 with support for 32 registers)
```java
IF k1[0] or *no writemask*
    THEN
            DEST[63:0] ← SRC[63:0]
    ELSE 
        IF *merging-masking*
                            ; merging-masking
            THEN *DEST[63:0] remains unchanged*
            ELSE 
                            ; zeroing-masking
                THEN DEST[63:0] ← 0
        FI;
FI;
DEST[MAXVL-1:64] ← 0
```
#### VMOVSD (EVEX.NDS.LIG.F2.0F 11 /r: VMOVSD m64, xmm1 with support for 32 registers)
```java
IF k1[0] or *no writemask*
    THEN
            DEST[63:0] ← SRC[63:0]
    ELSE
            *DEST[63:0] remains unchanged* 
                            ; merging-masking
FI;
```
#### VMOVSD (EVEX.NDS.LIG.F2.0F 11 /r: VMOVSD xmm1, xmm2, xmm3)
```java
IF k1[0] or *no writemask*
    THEN
            DEST[63:0] ← SRC2[63:0]
    ELSE 
        IF *merging-masking*
                            ; merging-masking
            THEN *DEST[63:0] remains unchanged*
            ELSE 
                            ; zeroing-masking
                THEN DEST[63:0] ← 0
        FI;
FI;
DEST[127:64] ← SRC1[127:64]
DEST[MAXVL-1:128] ← 0
```
#### MOVSD (128-bit Legacy SSE version: MOVSD XMM1, XMM2)
```java
DEST[63:0] ←SRC[63:0]
DEST[MAXVL-1:64] (Unmodified)
```
#### VMOVSD (VEX.NDS.128.F2.0F 11 /r: VMOVSD xmm1, xmm2, xmm3)
```java
DEST[63:0] ←SRC2[63:0]
DEST[127:64] ←SRC1[127:64]
DEST[MAXVL-1:128] ←0
```
#### VMOVSD (VEX.NDS.128.F2.0F 10 /r: VMOVSD xmm1, xmm2, xmm3)
```java
DEST[63:0] ←SRC2[63:0]
DEST[127:64] ←SRC1[127:64]
DEST[MAXVL-1:128] ←0
```
#### VMOVSD (VEX.NDS.128.F2.0F 10 /r: VMOVSD xmm1, m64)
```java
DEST[63:0] ←SRC[63:0]
DEST[MAXVL-1:64] ←0
```
#### MOVSD/VMOVSD (128-bit versions: MOVSD m64, xmm1 or VMOVSD m64, xmm1)
```java
DEST[63:0] ←SRC[63:0]
```
#### MOVSD (128-bit Legacy SSE version: MOVSD XMM1, m64)
```java
DEST[63:0] ←SRC[63:0]
DEST[127:64] ←0
DEST[MAXVL-1:128] (Unmodified)
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VMOVSD __m128d _mm_mask_load_sd(__m128d s, __mmask8 k, double * p); 
VMOVSD __m128d _mm_maskz_load_sd( __mmask8 k, double * p); 
VMOVSD __m128d _mm_mask_move_sd(__m128d sh, __mmask8 k, __m128d sl, __m128d a); 
VMOVSD __m128d _mm_maskz_move_sd( __mmask8 k, __m128d s, __m128d a); 
VMOVSD void _mm_mask_store_sd(double * p, __mmask8 k, __m128d s); 
MOVSD __m128d _mm_load_sd (double *p)
MOVSD void _mm_store_sd (double *p, __m128d a)
MOVSD __m128d _mm_move_sd ( __m128d a, __m128d b)
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

Non-EVEX-encoded instruction, see Exceptions Type 5; additionally
<p>#UD
If VEX.vvvv != 1111B.
EVEX-encoded instruction, see Exceptions Type E10.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
