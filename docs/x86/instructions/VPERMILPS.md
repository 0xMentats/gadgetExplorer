<b>VPERMILPS</b> — Permute In-Lane of Quadruples of Single-Precision Floating-Point Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F38.W0 0C /r VPERMILPS xmm1, xmm2, xmm3/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Permute single-precision floating-point values in xmm2 using controls from xmm3/m128 and store result in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F3A.W0 04 /r ib VPERMILPS xmm1, xmm2/m128, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Permute single-precision floating-point values in xmm2/m128 using controls from imm8 and store result in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F38.W0 0C /r VPERMILPS ymm1, ymm2, ymm3/m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Permute single-precision floating-point values in ymm2 using controls from ymm3/m256 and store result in ymm1.</td>
	</tr>
	<tr>
		<td>VEX.256.66.0F3A.W0 04 /r ib VPERMILPS ymm1, ymm2/m256, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Permute single-precision floating-point values in ymm2/m256 using controls from imm8 and store result in ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F38.W0 0C /r VPERMILPS xmm1 {k1}{z}, xmm2, xmm3/m128/m32bcst</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Permute single-precision floating-point values xmm2 using control from xmm3/m128/m32bcst and store the result in xmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F38.W0 0C /r VPERMILPS ymm1 {k1}{z}, ymm2, ymm3/m256/m32bcst</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Permute single-precision floating-point values ymm2 using control from ymm3/m256/m32bcst and store the result in ymm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F38.W0 0C /r VPERMILPS zmm1 {k1}{z}, zmm2, zmm3/m512/m32bcst</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Permute single-precision floating-point values zmm2 using control from zmm3/m512/m32bcst and store the result in zmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F3A.W0 04 /r ib VPERMILPS xmm1 {k1}{z}, xmm2/m128/m32bcst, imm8</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Permute single-precision floating-point values xmm2/m128/m32bcst using controls from imm8 and store the result in xmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F3A.W0 04 /r ib VPERMILPS ymm1 {k1}{z}, ymm2/m256/m32bcst, imm8</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Permute single-precision floating-point values ymm2/m256/m32bcst using controls from imm8 and store the result in ymm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F3A.W0 04 /r ib VPERMILPS zmm1 {k1}{z}, zmm2/m512/m32bcst, imm8</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Permute single-precision floating-point values zmm2/m512/m32bcst using controls from imm8 and store the result in zmm1 using writemask k1.</td>
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
		<td>ModRM:reg (w)</td>
		<td>VEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>B</td>
		<td>NA</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>C</td>
		<td>Full</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>D</td>
		<td>Full</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
(variable control version)

Permute quadruples of single-precision floating-point values in the first source operand (second operand), each
quadruplet using a 2-bit control field in the corresponding dword element of the second source operand. Permuted
results are stored in the destination operand (first operand).

The 2-bit control fields are located at the low two bits of each dword element (see Figure 5-26). Each control deter-
mines which of the source element in an input quadruple is selected for the destination element. Each quadruple of
source elements must lie in the same 128-bit region as the destination.

EVEX version: The second source operand (third operand) is a ZMM/YMM/XMM register, a 512/256/128-bit
memory location or a 512/256/128-bit vector broadcasted from a 32-bit memory location. Permuted results are
written to the destination under the writemask.
<table>
	<tr>
		<td colspan=10 rowspan=5><b>SRC1 X7 X6 X5 X4 X3 X2 X1 X0 DEST X7 .. X4 X7 .. X4 X7 .. X4 X7 .. X4 X3 ..X0 X3 ..X0 X3 .. X0 X3 .. X0</b></td>
	</tr>
	<tr>
		<td>X7</td>
		<td>X6</td>
		<td>X5</td>
		<td>X4</td>
		<td>X3</td>
		<td>X2</td>
		<td>X1</td>
		<td>X0</td>
	</tr>
	<tr>
	</tr>
	<tr>
		<td>X7 .. X4</td>
		<td>X7 .. X4</td>
		<td>X7 .. X4</td>
		<td>X7 .. X4</td>
		<td>X3 ..X0</td>
		<td>X3 ..X0</td>
		<td>X3 .. X0</td>
		<td>X3 .. X0</td>
	</tr>
	<tr>
	</tr>
</table>

Figure 5-25.  VPERMILPS Operation
<table>
	<tr>
		<td colspan=7 rowspan=3><b>255 226 225 224 63 34 33 32 31 ignored sel . . . ignored sel ignored Bit 0 1 sel Control Field 7 Control Field 2 Control Field 1</b></td>
	</tr>
	<tr>
		<td>ignored</td>
		<td>ignored</td>
		<td>ignored</td>
	</tr>
	<tr>
	</tr>
</table>

Figure 5-26.  VPERMILPS Shuffle Control

(immediate control version)

Permute quadruples of single-precision floating-point values in the first source operand (second operand), each
quadruplet using a 2-bit control field in the imm8 byte. Each 128-bit lane in the destination operand (first operand)
use the four control fields of the same imm8 byte.

VEX version: The source operand is a YMM/XMM register or a 256/128-bit memory location and the destination
operand is a YMM/XMM register.

EVEX version: The source operand (second operand) is a ZMM/YMM/XMM register, a 512/256/128-bit memory
location or a 512/256/128-bit vector broadcasted from a 32-bit memory location. Permuted results are written to
the destination under the writemask.

Note: For the imm8 version, VEX.vvvv and EVEX.vvvv are reserved and must be 1111b otherwise instruction will
\#UD.

### Operation

```java
Select4(SRC, control) {
CASE (control[1:0]) OF
    0:  TMP ←SRC[31:0];
    1:  TMP ←SRC[63:32];
    2:  TMP ←SRC[95:64];
    3:  TMP ←SRC[127:96];
ESAC;
RETURN TMP
}
```
#### VPERMILPS (EVEX immediate versions)
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
FOR j ← 0 TO KL-1
    i ← j * 32
    IF (EVEX.b = 1) AND (SRC1 *is memory*)
        THEN TMP_SRC1[i+31:i] ← SRC1[31:0];
        ELSE TMP_SRC1[i+31:i] ← SRC1[i+31:i];
    FI;
ENDFOR;
TMP_DEST[31:0] ← Select4(TMP_SRC1[127:0], imm8[1:0]);
TMP_DEST[63:32] ← Select4(TMP_SRC1[127:0], imm8[3:2]);
TMP_DEST[95:64] ← Select4(TMP_SRC1[127:0], imm8[5:4]);
TMP_DEST[127:96] ← Select4(TMP_SRC1[127:0], imm8[7:6]); FI;
IF VL >= 256
    TMP_DEST[159:128] ← Select4(TMP_SRC1[255:128], imm8[1:0]); FI;
    TMP_DEST[191:160] ← Select4(TMP_SRC1[255:128], imm8[3:2]); FI;
    TMP_DEST[223:192] ← Select4(TMP_SRC1[255:128], imm8[5:4]); FI;
    TMP_DEST[255:224] ← Select4(TMP_SRC1[255:128], imm8[7:6]); FI; 
FI;
IF VL >= 512
    TMP_DEST[287:256] ← Select4(TMP_SRC1[383:256], imm8[1:0]); FI;
    TMP_DEST[319:288] ← Select4(TMP_SRC1[383:256], imm8[3:2]); FI;
    TMP_DEST[351:320] ← Select4(TMP_SRC1[383:256], imm8[5:4]); FI;
    TMP_DEST[383:352] ← Select4(TMP_SRC1[383:256], imm8[7:6]); FI;
    TMP_DEST[415:384] ← Select4(TMP_SRC1[511:384], imm8[1:0]); FI;
    TMP_DEST[447:416] ← Select4(TMP_SRC1[511:384], imm8[3:2]); FI;
    TMP_DEST[479:448] ← Select4(TMP_SRC1[511:384], imm8[5:4]); FI;
    TMP_DEST[511:480] ← Select4(TMP_SRC1[511:384], imm8[7:6]); FI;
FI;
FOR j ← 0 TO KL-1
    i ← j * 32
    IF k1[j] OR *no writemask*
        THEN DEST[i+31:i] ← TMP_DEST[i+31:i]
        ELSE 
            IF *merging-masking*
                THEN *DEST[i+31:i] remains unchanged*
                ELSE DEST[i+31:i] ← 0
                            ;zeroing-masking
            FI;
    FI;
ENDFOR
DEST[MAXVL-1:VL] ←0
```
#### VPERMILPS (256-bit immediate version)
```java
DEST[31:0] ←Select4(SRC1[127:0], imm8[1:0]);
DEST[63:32] ←Select4(SRC1[127:0], imm8[3:2]);
DEST[95:64] ←Select4(SRC1[127:0], imm8[5:4]);
DEST[127:96] ←Select4(SRC1[127:0], imm8[7:6]);
DEST[159:128] ←Select4(SRC1[255:128], imm8[1:0]);
DEST[191:160] ←Select4(SRC1[255:128], imm8[3:2]);
DEST[223:192] ←Select4(SRC1[255:128], imm8[5:4]);
DEST[255:224] ←Select4(SRC1[255:128], imm8[7:6]);
```
#### VPERMILPS (128-bit immediate version)
```java
DEST[31:0] ←Select4(SRC1[127:0], imm8[1:0]);
DEST[63:32] ←Select4(SRC1[127:0], imm8[3:2]);
DEST[95:64] ←Select4(SRC1[127:0], imm8[5:4]);
DEST[127:96] ←Select4(SRC1[127:0], imm8[7:6]);
DEST[MAXVL-1:128]←0
```
#### VPERMILPS (EVEX variable versions)
```java
(KL, VL) = (16, 512)
FOR j ← 0 TO KL-1
    i ← j * 32
    IF (EVEX.b = 1) AND (SRC2 *is memory*)
        THEN TMP_SRC2[i+31:i] ← SRC2[31:0];
        ELSE TMP_SRC2[i+31:i] ← SRC2[i+31:i];
    FI;
ENDFOR;
TMP_DEST[31:0] ← Select4(SRC1[127:0], TMP_SRC2[1:0]);
TMP_DEST[63:32] ← Select4(SRC1[127:0], TMP_SRC2[33:32]);
TMP_DEST[95:64] ← Select4(SRC1[127:0], TMP_SRC2[65:64]);
TMP_DEST[127:96] ← Select4(SRC1[127:0], TMP_SRC2[97:96]);
IF VL >= 256
    TMP_DEST[159:128] ← Select4(SRC1[255:128], TMP_SRC2[129:128]);
    TMP_DEST[191:160] ← Select4(SRC1[255:128], TMP_SRC2[161:160]);
    TMP_DEST[223:192] ← Select4(SRC1[255:128], TMP_SRC2[193:192]);
    TMP_DEST[255:224] ← Select4(SRC1[255:128], TMP_SRC2[225:224]);
FI;
IF VL >= 512
    TMP_DEST[287:256] ← Select4(SRC1[383:256], TMP_SRC2[257:256]);
    TMP_DEST[319:288] ← Select4(SRC1[383:256], TMP_SRC2[289:288]);
    TMP_DEST[351:320] ← Select4(SRC1[383:256], TMP_SRC2[321:320]);
    TMP_DEST[383:352] ← Select4(SRC1[383:256], TMP_SRC2[353:352]);
    TMP_DEST[415:384] ← Select4(SRC1[511:384], TMP_SRC2[385:384]);
    TMP_DEST[447:416] ← Select4(SRC1[511:384], TMP_SRC2[417:416]);
    TMP_DEST[479:448] ← Select4(SRC1[511:384], TMP_SRC2[449:448]);
    TMP_DEST[511:480] ← Select4(SRC1[511:384], TMP_SRC2[481:480]);
FI;
FOR j ← 0 TO KL-1
    i ← j * 32
    IF k1[j] OR *no writemask*
        THEN DEST[i+31:i] ← TMP_DEST[i+31:i]
        ELSE 
            IF *merging-masking*
                THEN *DEST[i+31:i] remains unchanged*
                ELSE DEST[i+31:i] ← 0
                            ;zeroing-masking
            FI;
    FI;
ENDFOR
DEST[MAXVL-1:VL] ←0
```
#### VPERMILPS (256-bit variable version)
```java
DEST[31:0] ←Select4(SRC1[127:0], SRC2[1:0]);
DEST[63:32] ←Select4(SRC1[127:0], SRC2[33:32]);
DEST[95:64] ←Select4(SRC1[127:0], SRC2[65:64]);
DEST[127:96] ←Select4(SRC1[127:0], SRC2[97:96]);
DEST[159:128] ←Select4(SRC1[255:128], SRC2[129:128]);
DEST[191:160] ←Select4(SRC1[255:128], SRC2[161:160]);
DEST[223:192] ←Select4(SRC1[255:128], SRC2[193:192]);
DEST[255:224] ←Select4(SRC1[255:128], SRC2[225:224]);
DEST[MAXVL-1:256]←0
```
#### VPERMILPS (128-bit variable version)
```java
DEST[31:0] ←Select4(SRC1[127:0], SRC2[1:0]);
DEST[63:32] ←Select4(SRC1[127:0], SRC2[33:32]);
DEST[95:64] ←Select4(SRC1[127:0], SRC2[65:64]);
DEST[127:96] ←Select4(SRC1[127:0], SRC2[97:96]);
DEST[MAXVL-1:128]←0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPERMILPS __m512 _mm512_permute_ps( __m512 a, int imm);
VPERMILPS __m512 _mm512_mask_permute_ps(__m512 s, __mmask16 k, __m512 a, int imm);
VPERMILPS __m512 _mm512_maskz_permute_ps( __mmask16 k, __m512 a, int imm);
VPERMILPS __m256 _mm256_mask_permute_ps(__m256 s, __mmask8 k, __m256 a, int imm);
VPERMILPS __m256 _mm256_maskz_permute_ps( __mmask8 k, __m256 a, int imm);
VPERMILPS __m128 _mm_mask_permute_ps(__m128 s, __mmask8 k, __m128 a, int imm);
VPERMILPS __m128 _mm_maskz_permute_ps( __mmask8 k, __m128 a, int imm);
VPERMILPS __m512 _mm512_permutevar_ps( __m512i i, __m512 a);
VPERMILPS __m512 _mm512_mask_permutevar_ps(__m512 s, __mmask16 k, __m512i i, __m512 a);
VPERMILPS __m512 _mm512_maskz_permutevar_ps( __mmask16 k, __m512i i, __m512 a);
VPERMILPS __m256 _mm256_mask_permutevar_ps(__m256 s, __mmask8 k, __m256 i, __m256 a);
VPERMILPS __m256 _mm256_maskz_permutevar_ps( __mmask8 k, __m256 i, __m256 a);
VPERMILPS __m128 _mm_mask_permutevar_ps(__m128 s, __mmask8 k, __m128 i, __m128 a);
VPERMILPS __m128 _mm_maskz_permutevar_ps( __mmask8 k, __m128 i, __m128 a);
VPERMILPS __m128 _mm_permute_ps (__m128 a, int control);
VPERMILPS __m256 _mm256_permute_ps (__m256 a, int control);
VPERMILPS __m128 _mm_permutevar_ps (__m128 a, __m128i control);
VPERMILPS __m256 _mm256_permutevar_ps (__m256 a, __m256i control);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

Non-EVEX-encoded instruction, see Exceptions Type 4;
<p>#UD
If VEX.W = 1.
EVEX-encoded instruction, see Exceptions Type E4NF.
<p>#UD
If either (E)VEX.vvvv != 1111B and with imm8.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
