<b>MAXSS</b> — Return Maximum Scalar Single-Precision Floating-Point Value
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F3 0F 5F /r MAXSS xmm1, xmm2/m32</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Return the maximum scalar single-precision floating-point value between xmm2/m32 and xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.LIG.F3.0F.WIG 5F /r VMAXSS xmm1, xmm2, xmm3/m32</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Return the maximum scalar single-precision floating-point value between xmm3/m32 and xmm2.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.LIG.F3.0F.W0 5F /r VMAXSS xmm1 {k1}{z}, xmm2, xmm3/m32{sae}</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Return the maximum scalar single-precision floating-point value between xmm3/m32 and xmm2.</td>
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
Compares the low single-precision floating-point values in the first source operand and the second source operand,
and returns the maximum value to the low doubleword of the destination operand.

If the values being compared are both 0.0s (of either sign), the value in the second source operand is returned. If
a value in the second source operand is an SNaN, that SNaN is returned unchanged to the destination (that is, a
QNaN version of the SNaN is not returned).

If only one value is a NaN (SNaN or QNaN) for this instruction, the second source operand, either a NaN or a valid
floating-point value, is written to the result. If instead of this behavior, it is required that the NaN from either source
operand be returned, the action of MAXSS can be emulated using a sequence of instructions, such as, a comparison
followed by AND, ANDN and OR.

The second source operand can be an XMM register or a 32-bit memory location. The first source and destination
operands are XMM registers.

128-bit Legacy SSE version: The destination and first source operand are the same. Bits (MAXVL:32) of the corresponding
 destination register remain unchanged.

VEX.128 and EVEX encoded version: The first source operand is an xmm register encoded by VEX.vvvv. Bits
(127:32) of the XMM register destination are copied from corresponding bits in the first source operand. Bits
(MAXVL:128) of the destination register are zeroed.

EVEX encoded version: The low doubleword element of the destination operand is updated according to the
writemask.

Software should ensure VMAXSS is encoded with VEX.L=0. Encoding VMAXSS with VEX.L=1 may encounter 
unpredictable behavior across different processor generations.

### Operation

```java
MAX(SRC1, SRC2)
{
    IF ((SRC1 = 0.0) and (SRC2 = 0.0)) THEN DEST ←SRC2;
        ELSE IF (SRC1 = SNaN) THEN DEST ←SRC2; FI;
        ELSE IF (SRC2 = SNaN) THEN DEST ←SRC2; FI;
        ELSE IF (SRC1 > SRC2) THEN DEST ←SRC1;
        ELSE DEST ←SRC2; 
    FI; 
}
```
#### VMAXSS (EVEX encoded version)
```java
IF k1[0] or *no writemask*
    THEN
            DEST[31:0] ← MAX(SRC1[31:0], SRC2[31:0])
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
#### VMAXSS (VEX.128 encoded version)
```java
DEST[31:0] ←MAX(SRC1[31:0], SRC2[31:0])
DEST[127:32] ←SRC1[127:32]
DEST[MAXVL-1:128] ←0
```
#### MAXSS (128-bit Legacy SSE version)
```java
DEST[31:0] ←MAX(DEST[31:0], SRC[31:0])
DEST[MAXVL-1:32] (Unmodified)
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VMAXSS __m128 _mm_max_round_ss( __m128 a, __m128 b, int);
VMAXSS __m128 _mm_mask_max_round_ss(__m128 s, __mmask8 k, __m128 a, __m128 b, int);
VMAXSS __m128 _mm_maskz_max_round_ss( __mmask8 k, __m128 a, __m128 b, int);
MAXSS __m128 _mm_max_ss(__m128 a, __m128 b)
```
### SIMD Floating-Point Exceptions
Invalid (Including QNaN Source Operand), Denormal

### Other Exceptions

Non-EVEX-encoded instruction, see Exceptions Type 3.
EVEX-encoded instruction, see Exceptions Type E3.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
