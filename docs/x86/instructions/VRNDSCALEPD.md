<b>VRNDSCALEPD</b> — Round Packed Float64 Values To Include A Given Number Of Fraction Bits
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F3A.W1 09 /r ib VRNDSCALEPD xmm1 {k1}{z}, xmm2/m128/m64bcst, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Rounds packed double-precision floating point values in xmm2/m128/m64bcst to a number of fraction bits specified by the imm8 field. Stores the result in xmm1 register. Under writemask.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F3A.W1 09 /r ib VRNDSCALEPD ymm1 {k1}{z}, ymm2/m256/m64bcst, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Rounds packed double-precision floating point values in ymm2/m256/m64bcst to a number of fraction bits specified by the imm8 field. Stores the result in ymm1 register. Under writemask.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F3A.W1 09 /r ib VRNDSCALEPD zmm1 {k1}{z}, zmm2/m512/m64bcst{sae}, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Rounds packed double-precision floating-point values in zmm2/m512/m64bcst to a number of fraction bits specified by the imm8 field. Stores the result in zmm1 register using writemask k1.</td>
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
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>Imm8</td>
		<td>NA</td>
	</tr>
</table>


### Description
Round the double-precision floating-point values in the source operand by the rounding mode specified in the
immediate operand (see Figure 5-29) and places the result in the destination operand.

The destination operand (the first operand) is a ZMM/YMM/XMM register conditionally updated according to the
writemask. The source operand (the second operand) can be a ZMM/YMM/XMM register, a 512/256/128-bit
memory location, or a 512/256/128-bit vector broadcasted from a 64-bit memory location.

The rounding process rounds the input to an integral value, plus number bits of fraction that are specified by
imm8[7:4] (to be included in the result) and returns the result as a double-precision floating-point value.

It should be noticed that no overflow is induced while executing this instruction (although the source is scaled by
the imm8[7:4] value).

The immediate operand also specifies control fields for the rounding operation, three bit fields are defined and
shown in the “Immediate Control Description” figure below. Bit 3 of the immediate byte controls the processor
behavior for a precision exception, bit 2 selects the source of rounding mode control. Bits 1:0 specify a non-sticky
rounding-mode value (Immediate control table below lists the encoded values for rounding-mode field).

The Precision Floating-Point Exception is signaled according to the immediate operand. If any source operand is an
SNaN then it will be converted to a QNaN. If DAZ is set to ‘1 then denormals will be converted to zero before
rounding.

The sign of the result of this instruction is preserved, including the sign of zero.

The formula of the operation on each data element for VRNDSCALEPD is
ROUND(x) = 2-M\*Round_to_INT(x\*2M, round_ctrl),

round_ctrl = imm[3:0];

M=imm[7:4];
The operation of x\*2M is computed as if the exponent range is unlimited (i.e. no overflow ever occurs).
VRNDSCALEPD is a more general form of the VEX-encoded VROUNDPD instruction. In VROUNDPD, the formula of
the operation on each element is

ROUND(x) = Round_to_INT(x, round_ctrl),

round_ctrl = imm[3:0];

Note: EVEX.vvvv is reserved and must be 1111b, otherwise instructions will \#UD.
<table>
	<tr>
		<td colspan=6 rowspan=3><b>7 6 5 4 imm8 Fixed point length 3 SPE 2 RS 1 0 Round Control Override Imm8[7:4] : Number of fixed points to preserve Suppress Precision Exception: Imm8[3] Imm8[3] = 0b : Use MXCSR exception mask Imm8[3] = 1b : Suppress Round Select: Imm8[2] Imm8[2] = 0b : Use Imm8[1:0] Imm8[2] = 1b : Use MXCSR Imm8[1:0] = 00b : Round nearest even Imm8[1:0] = 01b : Round down Imm8[1:0] = 10b : Round up Imm8[1:0] = 11b : Truncate</b></td>
	</tr>
	<tr>
		<td>Fixed point length</td>
		<td>SPE</td>
		<td>RS</td>
		<td>Round Control Override</td>
	</tr>
	<tr>
	</tr>
</table>

Figure 5-29.  Imm8 Controls for VRNDSCALEPD/SD/PS/SS

Handling of special case of input values are listed in Table 5-25.

Table 5-25. VRNDSCALEPD/SD/PS/SS Special Cases
<table>
	<tr>
		<td><b></b></td>
		<td><b>Returned value</b></td>
	</tr>
	<tr>
		<td>Src1=±inf</td>
		<td>Src1</td>
	</tr>
	<tr>
		<td>Src1=±NAN</td>
		<td>Src1 converted to QNAN</td>
	</tr>
	<tr>
		<td>Src1=±0</td>
		<td>Src1</td>
	</tr>
</table>


### Operation

```java
RoundToIntegerDP(SRC[63:0], imm8[7:0]) {
    if (imm8[2] = 1)
        rounding_direction ← MXCSR:RC
                            ; get round control from MXCSR
    else
        rounding_direction ← imm8[1:0]
                            ; get round control from imm8[1:0]
    FI
    M ← imm8[7:4]
                        ; get the scaling factor
    case (rounding_direction)
    00: TMP[63:0] ← round_to_nearest_even_integer(2M*SRC[63:0])
    01: TMP[63:0] ← round_to_equal_or_smaller_integer(2M*SRC[63:0])
    10: TMP[63:0] ← round_to_equal_or_larger_integer(2M*SRC[63:0])
    11: TMP[63:0] ← round_to_nearest_smallest_magnitude_integer(2M*SRC[63:0])
    ESAC
    Dest[63:0] ← 2-M* TMP[63:0] 
                            ; scale down back to 2-M
    if (imm8[3] = 0) Then ; check SPE
        if (SRC[63:0] != Dest[63:0]) Then
                            ; check precision lost
            set_precision()
                            ; set #PE
        FI;
    FI;
    return(Dest[63:0])
}
```
#### VRNDSCALEPD (EVEX encoded versions)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
IF *src is a memory operand*
    THEN TMP_SRC ← BROADCAST64(SRC, VL, k1)
    ELSE TMP_SRC ← SRC
FI;
FOR j ← 0 TO KL-1
    i ← j * 64
    IF k1[j] OR *no writemask*
        THEN DEST[i+63:i] ← RoundToIntegerDP((TMP_SRC[i+63:i], imm8[7:0])
    ELSE 
        IF *merging-masking*
                            ; merging-masking
            THEN *DEST[i+63:i] remains unchanged*
            ELSE 
                            ; zeroing-masking
                DEST[i+63:i] ← 0
        FI;
    FI;
ENDFOR;
DEST[MAXVL-1:VL] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VRNDSCALEPD __m512d _mm512_roundscale_pd( __m512d a, int imm);
VRNDSCALEPD __m512d _mm512_roundscale_round_pd( __m512d a, int imm, int sae);
VRNDSCALEPD __m512d _mm512_mask_roundscale_pd(__m512d s, __mmask8 k, __m512d a, int imm);
VRNDSCALEPD __m512d _mm512_mask_roundscale_round_pd(__m512d s, __mmask8 k, __m512d a, int imm, int sae);
VRNDSCALEPD __m512d _mm512_maskz_roundscale_pd( __mmask8 k, __m512d a, int imm);
VRNDSCALEPD __m512d _mm512_maskz_roundscale_round_pd( __mmask8 k, __m512d a, int imm, int sae);
VRNDSCALEPD __m256d _mm256_roundscale_pd( __m256d a, int imm);
VRNDSCALEPD __m256d _mm256_mask_roundscale_pd(__m256d s, __mmask8 k, __m256d a, int imm);
VRNDSCALEPD __m256d _mm256_maskz_roundscale_pd( __mmask8 k, __m256d a, int imm);
VRNDSCALEPD __m128d _mm_roundscale_pd( __m128d a, int imm);
VRNDSCALEPD __m128d _mm_mask_roundscale_pd(__m128d s, __mmask8 k, __m128d a, int imm);
VRNDSCALEPD __m128d _mm_maskz_roundscale_pd( __mmask8 k, __m128d a, int imm);
```
### SIMD Floating-Point Exceptions
Invalid, Precision

If SPE is enabled, precision exception is not reported (regardless of MXCSR exception mask).

### Other Exceptions

See Exceptions Type E2.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
