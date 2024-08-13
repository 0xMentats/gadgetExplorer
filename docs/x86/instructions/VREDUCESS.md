<b>VREDUCESS</b> — Perform a Reduction Transformation on a Scalar Float32 Value
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.NDS.LIG.66.0F3A.W0 57 /r /ib VREDUCESS xmm1 {k1}{z}, xmm2, xmm3/m32{sae}, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512DQ</td>
		<td>Perform a reduction transformation on a scalar single-precision floating point value in xmm3/m32 by subtracting a number of fraction bits specified by the imm8 field. Also, upper single precision floating-point values (bits[127:32]) from xmm2 are copied to xmm1[127:32]. Stores the result in xmm1 register.</td>
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
		<td>Tuple1 Scalar</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
Perform a reduction transformation of the binary encoded single-precision FP value in the low dword element of the
second source operand (the third operand) and store the reduced result in binary FP format to the low dword
element of the destination operand (the first operand) under the writemask k1. Bits 127:32 of the destination
operand are copied from respective dword elements of the first source operand (the second operand).

The reduction transformation subtracts the integer part and the leading M fractional bits from the binary FP source
value, where M is a unsigned integer specified by imm8[7:4], see Figure 5-28. Specifically, the reduction transfor-
mation can be expressed as:
dest = src – (ROUND(2M\*src))\*2-M;

where “Round()” treats “src”, “2M”, and their product as binary FP numbers with normalized significand and bi-
ased exponents.
The magnitude of the reduced result can be expressed by considering src= 2p\*man2,
where ‘man2’ is the normalized significand and ‘p’ is the unbiased exponent
Then if RC = RNE: 0<=|Reduced Result|<=2p-M-1

Then if RC ≠ RNE: 0<=|Reduced Result|<2p-M

This instruction might end up with a precision exception set. However, in case of SPE set (i.e. Suppress Precision
Exception, which is imm8[3]=1), no precision exception is reported.

Handling of special case of input values are listed in Table 5-24.

### Operation

```java
ReduceArgumentSP(SRC[31:0], imm8[7:0])
{
    // Check for NaN
    IF (SRC [31:0] = NAN) THEN
        RETURN (Convert SRC[31:0] to QNaN); FI
    M ← imm8[7:4]; // Number of fraction bits of the normalized significand to be subtracted
    RC ← imm8[1:0];// Round Control for ROUND() operation
    RC source ← imm[2];
    SPE ← 0;// Suppress Precision Exception
    TMP[31:0] ← 2-M *{ROUND(2M*SRC[31:0], SPE, RC_source, RC)}; // ROUND() treats SRC and 2M as standard binary FP values
    TMP[31:0] ← SRC[31:0] – TMP[31:0]; // subtraction under the same RC,SPE controls
RETURN TMP[31:0]; // binary encoded FP with biased exponent and normalized significand
}
```
#### VREDUCESS
```java
IF k1[0] or *no writemask*
    THEN
            DEST[31:0] ← ReduceArgumentSP(SRC2[31:0], imm8[7:0])
    ELSE 
        IF *merging-masking*
                            ; merging-masking
            THEN *DEST[31:0] remains unchanged*
            ELSE 
                            ; zeroing-masking
                THEN DEST[31:0] = 0
        FI;
FI;
DEST[127:32] ← SRC1[127:32]
DEST[MAXVL-1:128] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VREDUCESS __m128 _mm_mask_reduce_ss( __m128 a, __m128 b, int imm, int sae)
VREDUCESS __m128 _mm_mask_reduce_ss(__m128 s, __mmask16 k, __m128 a, __m128 b, int imm, int sae)
VREDUCESS __m128 _mm_maskz_reduce_ss(__mmask16 k, __m128 a, __m128 b, int imm, int sae)
```
### SIMD Floating-Point Exceptions
Invalid, Precision

If SPE is enabled, precision exception is not reported (regardless of MXCSR exception mask).

### Other Exceptions

See Exceptions Type E3.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
