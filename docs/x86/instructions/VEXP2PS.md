INSTRUCTION SET REFERENCE UNIQUE TO INTEL® XEON PHI™ PROCESSORS
<b>VEXP2PS</b> — Approximation to the Exponential 2^x of Packed Single-Precision Floating-Point

Values with Less Than 2^-23 Relative Error
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W0 C8 /r VEXP2PS zmm1 {k1}{z}, zmm2/m512/m32bcst {sae}</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512ER</td>
		<td>Computes approximations to the exponential 2^x (with less than 2^-23 of maximum relative error) of the packed single-precision floating-point values from zmm2/m512/m32bcst and stores the floating-point result in zmm1with writemask k1.</td>
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
		<td>Full</td>
		<td>ModRM:reg (r, w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Computes the approximate base-2 exponential evaluation of the single-precision floating-point values in the source
operand (the second operand) and store the results in the destination operand (the first operand) using the
writemask k1. The approximate base-2 exponential is evaluated with less than 2^-23 of relative error.

Denormal input values are treated as zeros and do not signal \#DE, irrespective of MXCSR.DAZ. Denormal results
are flushed to zeros and do not signal \#UE, irrespective of MXCSR.FTZ.

The source operand is a ZMM register, a 512-bit memory location, or a 512-bit vector broadcasted from a 32-bit
memory location. The destination operand is a ZMM register, conditionally updated using writemask k1.

EVEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.

A numerically exact implementation of VEXP2xx can be found at https://software.intel.com/en-us/articles/refer-
ence-implementations-for-IA-approximation-instructions-vrcp14-vrsqrt14-vrcp28-vrsqrt28-vexp2.

### Operation


#### VEXP2PS
```java
(KL, VL) = (16, 512)
FOR j ← 0 TO KL-1
    i ← j * 32
    IF k1[j] OR *no writemask* THEN
            IF (EVEX.b = 1) AND (SRC *is memory*)
                THEN DEST[i+31:i] ← EXP2_23_SP(SRC[31:0])
                ELSE DEST[i+31:i] ← EXP2_23_SP(SRC[i+31:i])
            FI;
    ELSE 
        IF *merging-masking*
                            ; merging-masking
            THEN *DEST[i+31:i] remains unchanged*
            ELSE 
                            ; zeroing-masking
                DEST[i+31:i] ← 0
        FI;
    FI;
ENDFOR;
                            INSTRUCTION SET REFERENCE UNIQUE TO INTEL® XEON PHI™ PROCESSORS
```
#### Table 6-34. Special Values Behavior
```java
<table>
	<tr>
		<td><b>Source Input</b></td>
		<td><b>Result</b></td>
		<td><b>Comments</b></td>
	</tr>
	<tr>
		<td>NaN</td>
		<td>QNaN(src)</td>
		<td>If (SRC = SNaN) then #I</td>
	</tr>
	<tr>
		<td>+∞</td>
		<td>+∞</td>
		<td></td>
	</tr>
	<tr>
		<td>+/-0</td>
		<td>1.0f</td>
		<td>Exact result</td>
	</tr>
	<tr>
		<td>-∞</td>
		<td>+0.0f</td>
		<td></td>
	</tr>
	<tr>
		<td>Integral value N</td>
		<td>2^ (N)</td>
		<td>Exact result</td>
	</tr>
</table>

```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VEXP2PS __m512 _mm512_exp2a23_round_ps (__m512 a, int sae);
VEXP2PS __m512 _mm512_mask_exp2a23_round_ps (__m512 a, __mmask16 m, __m512 b, int sae);
VEXP2PS __m512 _mm512_maskz_exp2a23_round_ps (__mmask16 m, __m512 b, int sae);
```
### SIMD Floating-Point Exceptions
Invalid (if SNaN input), Overflow

### Other Exceptions

See Exceptions Type E2.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
