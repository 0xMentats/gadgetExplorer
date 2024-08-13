<b>VFMADD132SS / VFMADD213SS / VFMADD231SS</b> — Fused Multiply-Add of Scalar Single-Precision
Floating-Point Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.DDS.LIG.66.0F38.W0 99 /r VFMADD132SS xmm1, xmm2, xmm3/m32</td>
		<td>A</td>
		<td>V/V</td>
		<td>FMA</td>
		<td>Multiply scalar single-precision floating-point value from xmm1 and xmm3/m32, add to xmm2 and put result in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.DDS.LIG.66.0F38.W0 A9 /r VFMADD213SS xmm1, xmm2, xmm3/m32</td>
		<td>A</td>
		<td>V/V</td>
		<td>FMA</td>
		<td>Multiply scalar single-precision floating-point value from xmm1 and xmm2, add to xmm3/m32 and put result in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.DDS.LIG.66.0F38.W0 B9 /r VFMADD231SS xmm1, xmm2, xmm3/m32</td>
		<td>A</td>
		<td>V/V</td>
		<td>FMA</td>
		<td>Multiply scalar single-precision floating-point value from xmm2 and xmm3/m32, add to xmm1 and put result in xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.DDS.LIG.66.0F38.W0 99 /r VFMADD132SS xmm1 {k1}{z}, xmm2, xmm3/m32{er}</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Multiply scalar single-precision floating-point value from xmm1 and xmm3/m32, add to xmm2 and put result in xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.DDS.LIG.66.0F38.W0 A9 /r VFMADD213SS xmm1 {k1}{z}, xmm2, xmm3/m32{er}</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Multiply scalar single-precision floating-point value from xmm1 and xmm2, add to xmm3/m32 and put result in xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.DDS.LIG.66.0F38.W0 B9 /r VFMADD231SS xmm1 {k1}{z}, xmm2, xmm3/m32{er}</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Multiply scalar single-precision floating-point value from xmm2 and xmm3/m32, add to xmm1 and put result in xmm1.</td>
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
		<td>VEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>B</td>
		<td>Tuple1 Scalar</td>
		<td>ModRM:reg (r, w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
Performs a SIMD multiply-add computation on single-precision floating-point values using three source operands
and writes the multiply-add results in the destination operand. The destination operand is also the first source
operand. The first and second operands are XMM registers. The third source operand can be a XMM register or a
32-bit memory location.

VFMADD132SS: Multiplies the low single-precision floating-point value from the first source operand to the low
single-precision floating-point value in the third source operand, adds the infinite precision intermediate result to
the low single-precision floating-point value in the second source operand, performs rounding and stores the
resulting single-precision floating-point value to the destination operand (first source operand).

VFMADD213SS: Multiplies the low single-precision floating-point value from the second source operand to the low
single-precision floating-point value in the first source operand, adds the infinite precision intermediate result to
the low single-precision floating-point value in the third source operand, performs rounding and stores the
resulting single-precision floating-point value to the destination operand (first source operand).

VFMADD231SS: Multiplies the low single-precision floating-point value from the second source operand to the low
single-precision floating-point value in the third source operand, adds the infinite precision intermediate result to
the low single-precision floating-point value in the first source operand, performs rounding and stores the resulting
single-precision floating-point value to the destination operand (first source operand).

VEX.128 and EVEX encoded version: The destination operand (also first source operand) is encoded in reg_field.
The second source operand is encoded in VEX.vvvv/EVEX.vvvv. The third source operand is encoded in rm_field.
Bits 127:32 of the destination are unchanged. Bits MAXVL-1:128 of the destination register are zeroed.
EVEX encoded version: The low doubleword element of the destination is updated according to the writemask.

Compiler tools may optionally support a complementary mnemonic for each instruction mnemonic listed in the
opcode/instruction column of the summary table. The behavior of the complementary mnemonic in situations
involving NANs are governed by the definition of the instruction mnemonic defined in the opcode/instruction
column.

### Operation

```java
In the operations below, “*” and “+” symbols represent multiplication and addition with infinite precision inputs and outputs (no 
rounding).
```
#### VFMADD132SS DEST, SRC2, SRC3 (EVEX encoded version)
```java
IF (EVEX.b = 1) and SRC3 *is a register*
    THEN
        SET_RM(EVEX.RC);
    ELSE 
        SET_RM(MXCSR.RM);
FI;
IF k1[0] or *no writemask*
    THEN
            DEST[31:0] ← RoundFPControl(DEST[31:0]*SRC3[31:0] + SRC2[31:0])
    ELSE 
        IF *merging-masking*
                            ; merging-masking
            THEN *DEST[31:0] remains unchanged*
            ELSE 
                            ; zeroing-masking
                THEN DEST[31:0] ← 0
        FI;
FI;
DEST[127:32] ← DEST[127:32]
DEST[MAXVL-1:128] ← 0
```
#### VFMADD213SS DEST, SRC2, SRC3 (EVEX encoded version)
```java
IF (EVEX.b = 1) and SRC3 *is a register*
    THEN
        SET_RM(EVEX.RC);
    ELSE 
        SET_RM(MXCSR.RM);
FI;
IF k1[0] or *no writemask*
    THEN
            DEST[31:0] ← RoundFPControl(SRC2[31:0]*DEST[31:0] + SRC3[31:0])
    ELSE 
        IF *merging-masking*
                            ; merging-masking
            THEN *DEST[31:0] remains unchanged*
            ELSE 
                            ; zeroing-masking
                THEN DEST[31:0] ← 0
        FI;
FI;
DEST[127:32] ← DEST[127:32]
DEST[MAXVL-1:128] ← 0
```
#### VFMADD231SS DEST, SRC2, SRC3 (EVEX encoded version)
```java
IF (EVEX.b = 1) and SRC3 *is a register*
    THEN
        SET_RM(EVEX.RC);
    ELSE 
        SET_RM(MXCSR.RM);
FI;
IF k1[0] or *no writemask*
    THEN
            DEST[31:0] ← RoundFPControl(SRC2[31:0]*SRC3[31:0] + DEST[31:0])
    ELSE 
        IF *merging-masking*
                            ; merging-masking
            THEN *DEST[31:0]] remains unchanged*
            ELSE 
                            ; zeroing-masking
                THEN DEST[31:0] ← 0
        FI;
FI;
DEST[127:32] ← DEST[127:32]
DEST[MAXVL-1:128] ← 0
```
#### VFMADD132SS DEST, SRC2, SRC3 (VEX encoded version)
```java
DEST[31:0] ←RoundFPControl_MXCSR(DEST[31:0]*SRC3[31:0] + SRC2[31:0])
DEST[127:32] ←DEST[127:32]
DEST[MAXVL-1:128] ←0
```
#### VFMADD213SS DEST, SRC2, SRC3 (VEX encoded version)
```java
DEST[31:0] ←RoundFPControl_MXCSR(SRC2[31:0]*DEST[31:0] + SRC3[31:0])
DEST[127:32] ←DEST[127:32]
DEST[MAXVL-1:128] ←0
```
#### VFMADD231SS DEST, SRC2, SRC3 (VEX encoded version)
```java
DEST[31:0] ←RoundFPControl_MXCSR(SRC2[31:0]*SRC3[31:0] + DEST[31:0])
DEST[127:32] ←DEST[127:32]
DEST[MAXVL-1:128] ←0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VFMADDxxxSS __m128 _mm_fmadd_round_ss(__m128 a, __m128 b, __m128 c, int r);
VFMADDxxxSS __m128 _mm_mask_fmadd_ss(__m128 a, __mmask8 k, __m128 b, __m128 c);
VFMADDxxxSS __m128 _mm_maskz_fmadd_ss(__mmask8 k, __m128 a, __m128 b, __m128 c);
VFMADDxxxSS __m128 _mm_mask3_fmadd_ss(__m128 a, __m128 b, __m128 c, __mmask8 k);
VFMADDxxxSS __m128 _mm_mask_fmadd_round_ss(__m128 a, __mmask8 k, __m128 b, __m128 c, int r);
VFMADDxxxSS __m128 _mm_maskz_fmadd_round_ss(__mmask8 k, __m128 a, __m128 b, __m128 c, int r);
VFMADDxxxSS __m128 _mm_mask3_fmadd_round_ss(__m128 a, __m128 b, __m128 c, __mmask8 k, int r);
VFMADDxxxSS __m128 _mm_fmadd_ss (__m128 a, __m128 b, __m128 c);
```
### SIMD Floating-Point Exceptions
Overflow, Underflow, Invalid, Precision, Denormal

### Other Exceptions

VEX-encoded instructions, see Exceptions Type 3.

EVEX-encoded instructions, see Exceptions Type E3.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
