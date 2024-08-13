<b>MOVSLDUP</b> — Replicate Single FP Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F3 0F 12 /r MOVSLDUP xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE3</td>
		<td>Move even index single-precision floating-point values from xmm2/mem and duplicate each element into xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.F3.0F.WIG 12 /r VMOVSLDUP xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move even index single-precision floating-point values from xmm2/mem and duplicate each element into xmm1.</td>
	</tr>
	<tr>
		<td>VEX.256.F3.0F.WIG 12 /r VMOVSLDUP ymm1, ymm2/m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move even index single-precision floating-point values from ymm2/mem and duplicate each element into ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.128.F3.0F.W0 12 /r VMOVSLDUP xmm1 {k1}{z}, xmm2/m128</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move even index single-precision floating-point values from xmm2/m128 and duplicate each element into xmm1 under writemask.</td>
	</tr>
	<tr>
		<td>EVEX.256.F3.0F.W0 12 /r VMOVSLDUP ymm1 {k1}{z}, ymm2/m256</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move even index single-precision floating-point values from ymm2/m256 and duplicate each element into ymm1 under writemask.</td>
	</tr>
	<tr>
		<td>EVEX.512.F3.0F.W0 12 /r VMOVSLDUP zmm1 {k1}{z}, zmm2/m512</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move even index single-precision floating-point values from zmm2/m512 and duplicate each element into zmm1 under writemask.</td>
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
Duplicates even-indexed single-precision floating-point values from the source operand (the second operand). See
Figure 4-4. The source operand is an XMM, YMM or ZMM register or 128, 256 or 512-bit memory location and the
destination operand is an XMM, YMM or ZMM register.

128-bit Legacy SSE version: Bits (MAXVL-1:128) of the corresponding destination register remain unchanged.

VEX.128 encoded version: Bits (MAXVL-1:128) of the destination register are zeroed.

VEX.256 encoded version: Bits (MAXVL-1:256) of the destination register are zeroed.

EVEX encoded version: The destination operand is updated at 32-bit granularity according to the writemask.

Note: VEX.vvvv and EVEX.vvvv are reserved and must be 1111b otherwise instructions will \#UD.
<table>
	<tr>
		<td colspan=10 rowspan=5><b>SRC X7 X6 X5 X4 X3 X2 X1 X0 DEST X6 X6 X4 X4 X2 X2 X0 X0</b></td>
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
		<td>X6</td>
		<td>X6</td>
		<td>X4</td>
		<td>X4</td>
		<td>X2</td>
		<td>X2</td>
		<td>X0</td>
		<td>X0</td>
	</tr>
	<tr>
	</tr>
</table>

Figure 4-4.  MOVSLDUP Operation

### Operation


#### VMOVSLDUP (EVEX encoded versions)
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
TMP_SRC[31:0] ← SRC[31:0]
TMP_SRC[63:32] ← SRC[31:0]
TMP_SRC[95:64] ← SRC[95:64]
TMP_SRC[127:96] ← SRC[95:64]
IF VL >= 256
    TMP_SRC[159:128] ← SRC[159:128]
    TMP_SRC[191:160] ← SRC[159:128]
    TMP_SRC[223:192] ← SRC[223:192]
    TMP_SRC[255:224] ← SRC[223:192]
FI;
IF VL >= 512
    TMP_SRC[287:256] ← SRC[287:256]
    TMP_SRC[319:288] ← SRC[287:256]
    TMP_SRC[351:320] ← SRC[351:320]
    TMP_SRC[383:352] ← SRC[351:320]
    TMP_SRC[415:384] ← SRC[415:384]
    TMP_SRC[447:416] ← SRC[415:384]
    TMP_SRC[479:448] ← SRC[479:448]
    TMP_SRC[511:480] ← SRC[479:448]
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
#### VMOVSLDUP (VEX.256 encoded version)
```java
DEST[31:0] ← SRC[31:0]
DEST[63:32] ← SRC[31:0]
DEST[95:64] ← SRC[95:64]
DEST[127:96] ← SRC[95:64]
DEST[159:128] ← SRC[159:128]
DEST[191:160] ← SRC[159:128]
DEST[223:192] ← SRC[223:192]
DEST[255:224] ← SRC[223:192]
DEST[MAXVL-1:256] ← 0
```
#### VMOVSLDUP (VEX.128 encoded version)
```java
DEST[31:0] ← SRC[31:0]
DEST[63:32] ← SRC[31:0]
DEST[95:64] ← SRC[95:64]
DEST[127:96] ← SRC[95:64]
DEST[MAXVL-1:128] ← 0
```
#### MOVSLDUP (128-bit Legacy SSE version)
```java
DEST[31:0] ←SRC[31:0]
DEST[63:32] ←SRC[31:0]
DEST[95:64] ←SRC[95:64]
DEST[127:96] ←SRC[95:64]
DEST[MAXVL-1:128] (Unmodified)
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VMOVSLDUP __m512 _mm512_moveldup_ps( __m512 a);
VMOVSLDUP __m512 _mm512_mask_moveldup_ps(__m512 s, __mmask16 k, __m512 a);
VMOVSLDUP __m512 _mm512_maskz_moveldup_ps( __mmask16 k, __m512 a);
VMOVSLDUP __m256 _mm256_mask_moveldup_ps(__m256 s, __mmask8 k, __m256 a);
VMOVSLDUP __m256 _mm256_maskz_moveldup_ps( __mmask8 k, __m256 a);
VMOVSLDUP __m128 _mm_mask_moveldup_ps(__m128 s, __mmask8 k, __m128 a);
VMOVSLDUP __m128 _mm_maskz_moveldup_ps( __mmask8 k, __m128 a);
VMOVSLDUP __m256 _mm256_moveldup_ps (__m256 a);
VMOVSLDUP __m128 _mm_moveldup_ps (__m128 a);
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