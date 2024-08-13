<b>VCVTNEPS2BF16</b> —  Convert Packed Single Data to Packed BF16 Data
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.F3.0F38.W0 72 /r VCVTNEPS2BF16 xmm1{k1}{z}, xmm2/m128/m32bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512_BF16</td>
		<td>Convert packed single data from xmm2/m128 to packed BF16 data in xmm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.F3.0F38.W0 72 /r VCVTNEPS2BF16 xmm1{k1}{z}, ymm2/m256/m32bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512_BF16</td>
		<td>Convert packed single data from ymm2/m256 to packed BF16 data in xmm1 with writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.F3.0F38.W0 72 /r VCVTNEPS2BF16 ymm1{k1}{z}, zmm2/m512/m32bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F AVX512_BF16</td>
		<td>Convert packed single data from zmm2/m512 to packed BF16 data in ymm1 with writemask k1.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Tuple</b></td>
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
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
This instruction converts one SIMD register of packed single data into a single register of packed BF16 data.

“Round to nearest even” rounding mode is used. Output denormals are always flushed to zero and input denormals
are always treated as zero. MXCSR is not consulted nor updated.

As the instruction operand encoding table shows, the EVEX.vvvv field is not used for encoding an operand.
EVEX.vvvv is reserved and must be 0b1111 otherwise instructions will \#UD.

### Operation

```java
Define convert_fp32_to_bfloat16(x):
    IF x is zero or denormal:
        dest[15] ← x[31] // sign preserving zero (denormal go to zero)
        dest[14:0] ← 0
    ELSE IF x is infinity:
        dest[15:0] ← x[31:16]
    ELSE IF x is NAN:
        dest[15:0] ← x[31:16] // truncate and set MSB of the mantisa force QNAN
        dest[6] ← 1
    ELSE // normal number
        LSB ← x[16]
        rounding_bias ← 0x00007FFF + LSB
        temp[31:0] ← x[31:0] + rounding_bias // integer add
        dest[15:0] ← temp[31:16]
    RETURN dest
```
#### VCVTNEPS2BF16 dest, src
```java
VL = (128, 256, 512)
KL = VL/16
origdest ← dest
FOR i ← 0 to KL/2-1:
    IF k1[ i ] or *no writemask*:
        IF src is memory and evex.b == 1:
            t ← src.fp32[0]
        ELSE:
            t ← src.fp32[ i ]
        dest.word[i] ← convert_fp32_to_bfloat16(t)
    ELSE IF *zeroing*:
        dest.word[ i ] ← 0
    ELSE:  // merge masking, dest element unchanged
        dest.word[ i ] ← origdest.word[ i ]
DEST[MAXVL-1:VL/2] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VCVTNEPS2BF16 __m128bh _mm_cvtneps_pbh (__m128);
VCVTNEPS2BF16 __m128bh _mm_mask_cvtneps_pbh (__m128bh, __mmask8, __m128);
VCVTNEPS2BF16 __m128bh _mm_maskz_cvtneps_pbh (__mmask8, __m128);
VCVTNEPS2BF16 __m128bh _mm256_cvtneps_pbh (__m256);
VCVTNEPS2BF16 __m128bh _mm256_mask_cvtneps_pbh (__m128bh, __mmask8, __m256);
VCVTNEPS2BF16 __m128bh _mm256_maskz_cvtneps_pbh (__mmask8, __m256);
VCVTNEPS2BF16 __m256bh _mm512_cvtneps_pbh (__m512);
VCVTNEPS2BF16 __m256bh _mm512_mask_cvtneps_pbh (__m256bh, __mmask16, __m512);
VCVTNEPS2BF16 __m256bh _mm512_maskz_cvtneps_pbh (__mmask16, __m512);
```
### SIMD Floating-Point Exceptions
None.

### Other Exceptions

See Exceptions Type E4.

 --- 
<p align="right"><i>Source: Intel® Architecture Instruction Set Extensions and Future Features Programming Reference (May 2019)<br>Generated: 28-5-2019</i></p>
