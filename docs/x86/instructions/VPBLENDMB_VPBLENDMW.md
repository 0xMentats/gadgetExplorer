<b>VPBLENDMB / VPBLENDMW</b> — Blend Byte/Word Vectors Using an Opmask Control
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F38.W0 66 /r VPBLENDMB xmm1 {k1}{z}, xmm2, xmm3/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Blend byte integer vector xmm2 and byte vector xmm3/m128 and store the result in xmm1, under control mask.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F38.W0 66 /r VPBLENDMB ymm1 {k1}{z}, ymm2, ymm3/m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Blend byte integer vector ymm2 and byte vector ymm3/m256 and store the result in ymm1, under control mask.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F38.W0 66 /r VPBLENDMB zmm1 {k1}{z}, zmm2, zmm3/m512</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Blend byte integer vector zmm2 and byte vector zmm3/m512 and store the result in zmm1, under control mask.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F38.W1 66 /r VPBLENDMW xmm1 {k1}{z}, xmm2, xmm3/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Blend word integer vector xmm2 and word vector xmm3/m128 and store the result in xmm1, under control mask.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F38.W1 66 /r VPBLENDMW ymm1 {k1}{z}, ymm2, ymm3/m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Blend word integer vector ymm2 and word vector ymm3/m256 and store the result in ymm1, under control mask.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F38.W1 66 /r VPBLENDMW zmm1 {k1}{z}, zmm2, zmm3/m512</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Blend word integer vector zmm2 and word vector zmm3/m512 and store the result in zmm1, under control mask.</td>
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
		<td>Full Mem</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
Performs an element-by-element blending of byte/word elements between the first source operand byte vector
register and the second source operand byte vector from memory or register, using the instruction mask as
selector. The result is written into the destination byte vector register.

The destination and first source operands are ZMM/YMM/XMM registers. The second source operand can be a
ZMM/YMM/XMM register, a 512/256/128-bit memory location or a 512/256/128-bit memory location.

The mask is not used as a writemask for this instruction. Instead, the mask is used as an element selector: every
element of the destination is conditionally selected between first source or second source using the value of the
related mask bit (0 for first source, 1 for second source).

### Operation


#### VPBLENDMB (EVEX encoded versions)
```java
(KL, VL) = (16, 128), (32, 256), (64, 512)
FOR j ← 0 TO KL-1
    i ← j * 8
    IF k1[j] OR *no writemask*
        THEN DEST[i+7:i] ← SRC2[i+7:i]
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN DEST[i+7:i] ← SRC1[i+7:i]
                ELSE 
                            ; zeroing-masking
                    DEST[i+7:i] ← 0
            FI;
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0;
```
#### VPBLENDMW (EVEX encoded versions)
```java
(KL, VL) = (8, 128), (16, 256), (32, 512)
FOR j ← 0 TO KL-1
    i ← j * 16
    IF k1[j] OR *no writemask*
        THEN DEST[i+15:i] ← SRC2[i+15:i]
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN DEST[i+15:i] ← SRC1[i+15:i]
                ELSE 
                            ; zeroing-masking
                    DEST[i+15:i] ← 0
            FI;
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPBLENDMB __m512i _mm512_mask_blend_epi8(__mmask64 m, __m512i a, __m512i b);
VPBLENDMB __m256i _mm256_mask_blend_epi8(__mmask32 m, __m256i a, __m256i b);
VPBLENDMB __m128i _mm_mask_blend_epi8(__mmask16 m, __m128i a, __m128i b);
VPBLENDMW __m512i _mm512_mask_blend_epi16(__mmask32 m, __m512i a, __m512i b);
VPBLENDMW __m256i _mm256_mask_blend_epi16(__mmask16 m, __m256i a, __m256i b);
VPBLENDMW __m128i _mm_mask_blend_epi16(__mmask8 m, __m128i a, __m128i b);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

See Exceptions Type E4.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
