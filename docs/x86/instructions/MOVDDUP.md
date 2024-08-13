<b>MOVDDUP</b> — Replicate Double FP Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F2 0F 12 /r MOVDDUP xmm1, xmm2/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE3</td>
		<td>Move double-precision floating-point value from xmm2/m64 and duplicate into xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.F2.0F.WIG 12 /r VMOVDDUP xmm1, xmm2/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move double-precision floating-point value from xmm2/m64 and duplicate into xmm1.</td>
	</tr>
	<tr>
		<td>VEX.256.F2.0F.WIG 12 /r VMOVDDUP ymm1, ymm2/m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move even index double-precision floating-point values from ymm2/mem and duplicate each element into ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.128.F2.0F.W1 12 /r VMOVDDUP xmm1 {k1}{z}, xmm2/m64</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move double-precision floating-point value from xmm2/m64 and duplicate each element into xmm1 subject to writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.F2.0F.W1 12 /r VMOVDDUP ymm1 {k1}{z}, ymm2/m256</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move even index double-precision floating-point values from ymm2/m256 and duplicate each element into ymm1 subject to writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.F2.0F.W1 12 /r VMOVDDUP zmm1 {k1}{z}, zmm2/m512</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move even index double-precision floating-point values from zmm2/m512 and duplicate each element into zmm1 subject to writemask k1.</td>
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
		<td>MOVDDUP</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
For 256-bit or higher versions: Duplicates even-indexed double-precision floating-point values from the source
operand (the second operand) and into adjacent pair and store to the destination operand (the first operand).

For 128-bit versions: Duplicates the low double-precision floating-point value from the source operand (the second
operand) and store to the destination operand (the first operand).

128-bit Legacy SSE version: Bits (MAXVL-1:128) of the corresponding destination register are unchanged. The
source operand is XMM register or a 64-bit memory location.

VEX.128 and EVEX.128 encoded version: Bits (MAXVL-1:128) of the destination register are zeroed. The source
operand is XMM register or a 64-bit memory location. The destination is updated conditionally under the writemask
for EVEX version.

VEX.256 and EVEX.256 encoded version: Bits (MAXVL-1:256) of the destination register are zeroed. The source
operand is YMM register or a 256-bit memory location. The destination is updated conditionally under the
writemask for EVEX version.

EVEX.512 encoded version: The destination is updated according to the writemask. The source operand is ZMM
register or a 512-bit memory location.

Note: VEX.vvvv and EVEX.vvvv are reserved and must be 1111b otherwise instructions will \#UD.
<table>
	<tr>
		<td colspan=6 rowspan=4><b>SRC X3 DEST X2 X2 X2 X1 X0 X0 X0</b></td>
	</tr>
	<tr>
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

Figure 4-2.  VMOVDDUP Operation

### Operation


#### VMOVDDUP (EVEX encoded versions)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
TMP_SRC[63:0] ← SRC[63:0] 
TMP_SRC[127:64] ← SRC[63:0]
IF VL >= 256
    TMP_SRC[191:128] ← SRC[191:128]
    TMP_SRC[255:192] ← SRC[191:128]
FI;
IF VL >= 512
    TMP_SRC[319:256] ← SRC[319:256]
    TMP_SRC[383:320] ← SRC[319:256]
    TMP_SRC[477:384] ← SRC[477:384]
    TMP_SRC[511:484] ← SRC[477:384]
FI;
FOR j ← 0 TO KL-1
    i ← j * 64
    IF k1[j] OR *no writemask*
        THEN DEST[i+63:i] ← TMP_SRC[i+63:i]
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+63:i] remains unchanged*
                ELSE 
                            ; zeroing-masking
                    DEST[i+63:i] ← 0 
                            ; zeroing-masking
            FI
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
#### VMOVDDUP (VEX.256 encoded version)
```java
DEST[63:0] ←SRC[63:0]
DEST[127:64] ←SRC[63:0]
DEST[191:128] ←SRC[191:128]
DEST[255:192] ←SRC[191:128]
DEST[MAXVL-1:256] ←0
```
#### VMOVDDUP (VEX.128 encoded version)
```java
DEST[63:0] ←SRC[63:0]
DEST[127:64] ←SRC[63:0]
DEST[MAXVL-1:128] ←0
```
#### MOVDDUP (128-bit Legacy SSE version)
```java
DEST[63:0] ←SRC[63:0]
DEST[127:64] ←SRC[63:0]
DEST[MAXVL-1:128] (Unmodified)
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VMOVDDUP __m512d _mm512_movedup_pd( __m512d a);
VMOVDDUP __m512d _mm512_mask_movedup_pd(__m512d s, __mmask8 k, __m512d a);
VMOVDDUP __m512d _mm512_maskz_movedup_pd( __mmask8 k, __m512d a);
VMOVDDUP __m256d _mm256_mask_movedup_pd(__m256d s, __mmask8 k, __m256d a);
VMOVDDUP __m256d _mm256_maskz_movedup_pd( __mmask8 k, __m256d a);
VMOVDDUP __m128d _mm_mask_movedup_pd(__m128d s, __mmask8 k, __m128d a);
VMOVDDUP __m128d _mm_maskz_movedup_pd( __mmask8 k, __m128d a);
MOVDDUP __m256d _mm256_movedup_pd (__m256d a);
MOVDDUP __m128d _mm_movedup_pd (__m128d a);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

Non-EVEX-encoded instruction, see Exceptions Type 5;
EVEX-encoded instruction, see Exceptions Type E5NF.
<p>#UD
If EVEX.vvvv != 1111B or VEX.vvvv != 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
