<b>MOVSS</b> — Move or Merge Scalar Single-Precision Floating-Point Value
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F3 0F 10 /r MOVSS xmm1, xmm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Merge scalar single-precision floating-point value from xmm2 to xmm1 register.</td>
	</tr>
	<tr>
		<td>F3 0F 10 /r MOVSS xmm1, m32</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Load scalar single-precision floating-point value from m32 to xmm1 register.</td>
	</tr>
	<tr>
		<td>VEX.NDS.LIG.F3.0F.WIG 10 /r VMOVSS xmm1, xmm2, xmm3</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Merge scalar single-precision floating-point value from xmm2 and xmm3 to xmm1 register</td>
	</tr>
	<tr>
		<td>VEX.LIG.F3.0F.WIG 10 /r VMOVSS xmm1, m32</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Load scalar single-precision floating-point value from m32 to xmm1 register.</td>
	</tr>
	<tr>
		<td>F3 0F 11 /r MOVSS xmm2/m32, xmm1</td>
		<td>C</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Move scalar single-precision floating-point value from xmm1 register to xmm2/m32.</td>
	</tr>
	<tr>
		<td>VEX.NDS.LIG.F3.0F.WIG 11 /r VMOVSS xmm1, xmm2, xmm3</td>
		<td>E</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move scalar single-precision floating-point value from xmm2 and xmm3 to xmm1 register.</td>
	</tr>
	<tr>
		<td>VEX.LIG.F3.0F.WIG 11 /r VMOVSS m32, xmm1</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move scalar single-precision floating-point value from xmm1 register to m32.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.LIG.F3.0F.W0 10 /r VMOVSS xmm1 {k1}{z}, xmm2, xmm3</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move scalar single-precision floating-point value from xmm2 and xmm3 to xmm1 register under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.LIG.F3.0F.W0 10 /r VMOVSS xmm1 {k1}{z}, m32</td>
		<td>F</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move scalar single-precision floating-point values from m32 to xmm1 under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.LIG.F3.0F.W0 11 /r VMOVSS xmm1 {k1}{z}, xmm2, xmm3</td>
		<td>E</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move scalar single-precision floating-point value from xmm2 and xmm3 to xmm1 register under writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.LIG.F3.0F.W0 11 /r VMOVSS m32 {k1}, xmm1</td>
		<td>G</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move scalar single-precision floating-point values from xmm1 to m32 under writemask k1.</td>
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
Moves a scalar single-precision floating-point value from the source operand (second operand) to the destination
operand (first operand). The source and destination operands can be XMM registers or 32-bit memory locations.
This instruction can be used to move a single-precision floating-point value to and from the low doubleword of an
XMM register and a 32-bit memory location, or to move a single-precision floating-point value between the low
doublewords of two XMM registers. The instruction cannot be used to transfer data between memory locations.

Legacy version: When the source and destination operands are XMM registers, bits (MAXVL-1:32) of the corresponding
 destination register are unmodified. When the source operand is a memory location and destination
operand is an XMM registers, Bits (127:32) of the destination operand is cleared to all 0s, bits MAXVL:128 of the
destination operand remains unchanged.

VEX and EVEX encoded register-register syntax: Moves a scalar single-precision floating-point value from the
second source operand (the third operand) to the low doubleword element of the destination operand (the first
operand). Bits 127:32 of the destination operand are copied from the first source operand (the second operand).
Bits (MAXVL-1:128) of the corresponding destination register are zeroed.

VEX and EVEX encoded memory load syntax: When the source operand is a memory location and destination
operand is an XMM registers, bits MAXVL:32 of the destination operand is cleared to all 0s.

EVEX encoded versions: The low doubleword of the destination is updated according to the writemask.

Note: For memory store form instruction “VMOVSS m32, xmm1”, VEX.vvvv is reserved and must be 1111b other-
wise instruction will \#UD. For memory store form instruction “VMOVSS mv {k1}, xmm1”, EVEX.vvvv is reserved
and must be 1111b otherwise instruction will \#UD.

Software should ensure VMOVSS is encoded with VEX.L=0. Encoding VMOVSS with VEX.L=1 may encounter
unpredictable behavior across different processor generations.

### Operation


#### VMOVSS (EVEX.NDS.LIG.F3.0F.W0 11 /r when the source operand is memory and the destination is an XMM register)
```java
IF k1[0] or *no writemask*
    THEN
            DEST[31:0] ← SRC[31:0]
    ELSE 
        IF *merging-masking*
                            ; merging-masking
            THEN *DEST[31:0] remains unchanged*
            ELSE 
                            ; zeroing-masking
                THEN DEST[31:0] ← 0
        FI;
FI;
DEST[MAXVL-1:32] ← 0
```
#### VMOVSS (EVEX.NDS.LIG.F3.0F.W0 10 /r when the source operand is an XMM register and the destination is memory)
```java
IF k1[0] or *no writemask*
    THEN
            DEST[31:0] ← SRC[31:0]
    ELSE
            *DEST[31:0] remains unchanged* 
                            ; merging-masking
FI;
```
#### VMOVSS (EVEX.NDS.LIG.F3.0F.W0 10/11 /r where the source and destination are XMM registers)
```java
IF k1[0] or *no writemask*
    THEN
            DEST[31:0] ← SRC2[31:0]
    ELSE 
        IF *merging-masking*
                            ; merging-masking
            THEN *DEST[31:0] remains unchanged*
            ELSE 
                            ; zeroing-masking
                THEN DEST[31:0] ← 0
        FI;
FI;
DEST[127:32] ← SRC1[127:32]
DEST[MAXVL-1:128] ← 0
```
#### MOVSS (Legacy SSE version when the source and destination operands are both XMM registers)
```java
DEST[31:0] ←SRC[31:0]
DEST[MAXVL-1:32] (Unmodified)
```
#### VMOVSS (VEX.NDS.128.F3.0F 11 /r where the destination is an XMM register)
```java
DEST[31:0] ←SRC2[31:0]
DEST[127:32] ←SRC1[127:32]
DEST[MAXVL-1:128] ←0
```
#### VMOVSS (VEX.NDS.128.F3.0F 10 /r where the source and destination are XMM registers)
```java
DEST[31:0] ←SRC2[31:0]
DEST[127:32] ←SRC1[127:32]
DEST[MAXVL-1:128] ←0
```
#### VMOVSS (VEX.NDS.128.F3.0F 10 /r when the source operand is memory and the destination is an XMM register)
```java
DEST[31:0] ←SRC[31:0]
DEST[MAXVL-1:32] ←0
```
#### MOVSS/VMOVSS (when the source operand is an XMM register and the destination is memory)
```java
DEST[31:0] ←SRC[31:0]
```
#### MOVSS (Legacy SSE version when the source operand is memory and the destination is an XMM register)
```java
DEST[31:0] ←SRC[31:0]
DEST[127:32] ←0
DEST[MAXVL-1:128] (Unmodified)
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VMOVSS __m128 _mm_mask_load_ss(__m128 s, __mmask8 k, float * p); 
VMOVSS __m128 _mm_maskz_load_ss( __mmask8 k, float * p); 
VMOVSS __m128 _mm_mask_move_ss(__m128 sh, __mmask8 k, __m128 sl, __m128 a); 
VMOVSS __m128 _mm_maskz_move_ss( __mmask8 k, __m128 s, __m128 a); 
VMOVSS void _mm_mask_store_ss(float * p, __mmask8 k, __m128 a); 
MOVSS __m128 _mm_load_ss(float * p)
MOVSS void_mm_store_ss(float * p, __m128 a)
MOVSS __m128 _mm_move_ss(__m128 a, __m128 b)
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