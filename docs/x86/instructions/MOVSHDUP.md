<b>MOVSHDUP</b> — Replicate Single FP Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F3 0F 16 /r MOVSHDUP xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE3</td>
		<td>Move odd index single-precision floating-point values from xmm2/mem and duplicate each element into xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.F3.0F.WIG 16 /r VMOVSHDUP xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move odd index single-precision floating-point values from xmm2/mem and duplicate each element into xmm1.</td>
	</tr>
	<tr>
		<td>VEX.256.F3.0F.WIG 16 /r VMOVSHDUP ymm1, ymm2/m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move odd index single-precision floating-point values from ymm2/mem and duplicate each element into ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.128.F3.0F.W0 16 /r VMOVSHDUP xmm1 {k1}{z}, xmm2/m128</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move odd index single-precision floating-point values from xmm2/m128 and duplicate each element into xmm1 under writemask.</td>
	</tr>
	<tr>
		<td>EVEX.256.F3.0F.W0 16 /r VMOVSHDUP ymm1 {k1}{z}, ymm2/m256</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move odd index single-precision floating-point values from ymm2/m256 and duplicate each element into ymm1 under writemask.</td>
	</tr>
	<tr>
		<td>EVEX.512.F3.0F.W0 16 /r VMOVSHDUP zmm1 {k1}{z}, zmm2/m512</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move odd index single-precision floating-point values from zmm2/m512 and duplicate each element into zmm1 under writemask.</td>
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
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>B</td>
		<td>Full Mem</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Duplicates odd-indexed single-precision floating-point values from the source operand (the second operand) to
adjacent element pair in the destination operand (the first operand). See Figure 4-3. The source operand is an
XMM, YMM or ZMM register or 128, 256 or 512-bit memory location and the destination operand is an XMM, YMM
or ZMM register.

128-bit Legacy SSE version: Bits (MAXVL-1:128) of the corresponding destination register remain unchanged.

VEX.128 encoded version: Bits (MAXVL-1:128) of the destination register are zeroed.

VEX.256 encoded version: Bits (MAXVL-1:256) of the destination register are zeroed.

EVEX encoded version: The destination operand is updated at 32-bit granularity according to the writemask.

Note: VEX.vvvv and EVEX.vvvv are reserved and must be 1111b otherwise instructions will \#UD.
<table>
	<tr>
		<td colspan=10 rowspan=4><b>SRC X7 X6 X5 X4 X3 X2 X1 X0 DEST X7 X7 X5 X5 X3 X3 X1 X1</b></td>
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
	</tr>
</table>

Figure 4-3.  MOVSHDUP Operation

### Operation


#### VMOVSHDUP (EVEX encoded versions)
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
TMP_SRC[31:0] ← SRC[63:32]
TMP_SRC[63:32] ← SRC[63:32]
TMP_SRC[95:64] ← SRC[127:96]
TMP_SRC[127:96] ← SRC[127:96]
IF VL >= 256
    TMP_SRC[159:128] ← SRC[191:160]
    TMP_SRC[191:160] ← SRC[191:160]
    TMP_SRC[223:192] ← SRC[255:224]
    TMP_SRC[255:224] ← SRC[255:224]
FI;
IF VL >= 512
    TMP_SRC[287:256] ← SRC[319:288]
    TMP_SRC[319:288] ← SRC[319:288]
    TMP_SRC[351:320] ← SRC[383:352]
    TMP_SRC[383:352] ← SRC[383:352]
    TMP_SRC[415:384] ← SRC[447:416]
    TMP_SRC[447:416] ← SRC[447:416]
    TMP_SRC[479:448] ← SRC[511:480]
    TMP_SRC[511:480] ← SRC[511:480]
FI;
FOR j ← 0 TO KL-1
    i ← j * 32
    IF k1[j] OR *no writemask*
        THEN DEST[i+31:i] ← TMP_SRC[i+31:i]
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+31:i] remains unchanged*
                ELSE 
                            ; zeroing-masking
                    DEST[i+31:i] ← 0 
            FI
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
#### VMOVSHDUP (VEX.256 encoded version)
```java
DEST[31:0] ← SRC[63:32]
DEST[63:32] ← SRC[63:32]
DEST[95:64] ← SRC[127:96]
DEST[127:96] ← SRC[127:96]
DEST[159:128] ← SRC[191:160]
DEST[191:160] ← SRC[191:160]
DEST[223:192] ← SRC[255:224]
DEST[255:224] ← SRC[255:224]
DEST[MAXVL-1:256] ← 0
```
#### VMOVSHDUP (VEX.128 encoded version)
```java
DEST[31:0] ← SRC[63:32]
DEST[63:32] ← SRC[63:32]
DEST[95:64] ← SRC[127:96]
DEST[127:96] ← SRC[127:96]
DEST[MAXVL-1:128] ← 0
```
#### MOVSHDUP (128-bit Legacy SSE version)
```java
DEST[31:0] ←SRC[63:32]
DEST[63:32] ←SRC[63:32]
DEST[95:64] ←SRC[127:96]
DEST[127:96] ←SRC[127:96]
DEST[MAXVL-1:128] (Unmodified)
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VMOVSHDUP __m512 _mm512_movehdup_ps( __m512 a);
VMOVSHDUP __m512 _mm512_mask_movehdup_ps(__m512 s, __mmask16 k, __m512 a);
VMOVSHDUP __m512 _mm512_maskz_movehdup_ps( __mmask16 k, __m512 a);
VMOVSHDUP __m256 _mm256_mask_movehdup_ps(__m256 s, __mmask8 k, __m256 a);
VMOVSHDUP __m256 _mm256_maskz_movehdup_ps( __mmask8 k, __m256 a);
VMOVSHDUP __m128 _mm_mask_movehdup_ps(__m128 s, __mmask8 k, __m128 a);
VMOVSHDUP __m128 _mm_maskz_movehdup_ps( __mmask8 k, __m128 a);
VMOVSHDUP __m256 _mm256_movehdup_ps (__m256 a);
VMOVSHDUP __m128 _mm_movehdup_ps (__m128 a);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

Non-EVEX-encoded instruction, see Exceptions Type 4;
EVEX-encoded instruction, see Exceptions Type E4NF.nb.
<p>#UD
If EVEX.vvvv != 1111B or VEX.vvvv != 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
