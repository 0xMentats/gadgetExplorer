<b>ADDSS</b> — Add Scalar Single-Precision Floating-Point Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F3 0F 58 /r ADDSS xmm1, xmm2/m32</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Add the low single-precision floating-point value from xmm2/mem to xmm1 and store the result in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.LIG.F3.0F.WIG 58 /r VADDSS xmm1,xmm2, xmm3/m32</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Add the low single-precision floating-point value from xmm3/mem to xmm2 and store the result in xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.LIG.F3.0F.W0 58 /r VADDSS xmm1{k1}{z}, xmm2, xmm3/m32{er}</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Add the low single-precision floating-point value from xmm3/m32 to xmm2 and store the result in xmm1with writemask k1.</td>
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
		<td>Tuple1 Scalar</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
Adds the low single-precision floating-point values from the second source operand and the first source operand,
and stores the double-precision floating-point result in the destination operand.

The second source operand can be an XMM register or a 64-bit memory location. The first source and destination
operands are XMM registers.

128-bit Legacy SSE version: The first source and destination operands are the same. Bits (MAXVL-1:32) of the
corresponding the destination register remain unchanged.

EVEX and VEX.128 encoded version: The first source operand is encoded by EVEX.vvvv/VEX.vvvv. Bits (127:32) of
the XMM register destination are copied from corresponding bits in the first source operand. Bits (MAXVL-1:128) of
the destination register are zeroed.

EVEX version: The low doubleword element of the destination is updated according to the writemask.

Software should ensure VADDSS is encoded with VEX.L=0. Encoding VADDSS with VEX.L=1 may encounter 
unpredictable behavior across different processor generations.

### Operation


#### VADDSS (EVEX encoded versions)
```java
IF (EVEX.b = 1) AND SRC2 *is a register*
    THEN
        SET_RM(EVEX.RC);
    ELSE 
        SET_RM(MXCSR.RM);
FI;
IF k1[0] or *no writemask*
    THEN
            DEST[31:0] ← SRC1[31:0] + SRC2[31:0]
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
#### VADDSS DEST, SRC1, SRC2 (VEX.128 encoded version)
```java
DEST[31:0] ←SRC1[31:0] + SRC2[31:0]
DEST[127:32] ←SRC1[127:32]
DEST[MAXVL-1:128] ←0
```
#### ADDSS DEST, SRC (128-bit Legacy SSE version)
```java
DEST[31:0] ←DEST[31:0] + SRC[31:0]
DEST[MAXVL-1:32] (Unmodified)
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VADDSS __m128 _mm_mask_add_ss (__m128 s, __mmask8 k, __m128 a, __m128 b);
VADDSS __m128 _mm_maskz_add_ss (__mmask8 k, __m128 a, __m128 b);
VADDSS __m128 _mm_add_round_ss (__m128 a, __m128 b, int);
VADDSS __m128 _mm_mask_add_round_ss (__m128 s, __mmask8 k, __m128 a, __m128 b, int);
VADDSS __m128 _mm_maskz_add_round_ss (__mmask8 k, __m128 a, __m128 b, int);
ADDSS __m128 _mm_add_ss (__m128 a, __m128 b);
```
### SIMD Floating-Point Exceptions
Overflow, Underflow, Invalid, Precision, Denormal

### Other Exceptions

VEX-encoded instruction, see Exceptions Type 3.

EVEX-encoded instruction, see Exceptions Type E3.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
