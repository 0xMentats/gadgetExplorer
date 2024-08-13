<b>VPSHUFBITQMB</b> —  Shuffle Bits from Quadword Elements Using Byte Indexes into Mask
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W0 8F /r VPSHUFBITQMB k1{k2}, xmm2, xmm3/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_BITALG AVX512VL</td>
		<td>Extract values in xmm2 using control bits of xmm3/m128 with writemask k2 and leave the result in mask register k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W0 8F /r VPSHUFBITQMB k1{k2}, ymm2, ymm3/m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_BITALG AVX512VL</td>
		<td>Extract values in ymm2 using control bits of ymm3/m256 with writemask k2 and leave the result in mask register k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W0 8F /r VPSHUFBITQMB k1{k2}, zmm2, zmm3/m512</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_BITALG</td>
		<td>Extract values in zmm2 using control bits of zmm3/m512 with writemask k2 and leave the result in mask register k1.</td>
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
		<td>Full Mem</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
The VPSHUFBITQMB instruction performs a bit gather select using second source as control and first source as
data. Each bit uses 6 control bits (2nd source operand) to select which data bit is going to be gathered (first source
operand). A given bit can only access 64 different bits of data (first 64 destination bits can access first 64 data bits,
second 64 destination bits can access second 64 data bits, etc.).

Control data for each output bit is stored in 8 bit elements of SRC2, but only the 6 least significant bits of each
element are used.

This instruction uses write masking (zeroing only). This instruction supports memory fault suppression.

The first source operand is a ZMM register. The second source operand is a ZMM register or a memory location. The
destination operand is a mask register.

### Operation


#### VPSHUFBITQMB DEST, SRC1, SRC2
```java
(KL, VL) = (16,128), (32,256), (64, 512)
FOR i ← 0 TO KL/8-1: 
                            //Qword
    FOR j ← 0 to 7: 
                            // Byte
        IF k2[i*8+j] or *no writemask*:
            m ← SRC2.qword[i].byte[j] & 0x3F
            k1[i*8+j] ← SRC1.qword[i].bit[m]
        ELSE:
            k1[i*8+j] ← 0
k1[MAX_KL-1:KL] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPSHUFBITQMB __mmask16 _mm_bitshuffle_epi64_mask(__m128i, __m128i);
VPSHUFBITQMB __mmask16 _mm_mask_bitshuffle_epi64_mask(__mmask16, __m128i, __m128i);
VPSHUFBITQMB __mmask32 _mm256_bitshuffle_epi64_mask(__m256i, __m256i);
VPSHUFBITQMB __mmask32 _mm256_mask_bitshuffle_epi64_mask(__mmask32, __m256i, __m256i);
VPSHUFBITQMB __mmask64 _mm512_bitshuffle_epi64_mask(__m512i, __m512i);
VPSHUFBITQMB __mmask64 _mm512_mask_bitshuffle_epi64_mask(__mmask64, __m512i, __m512i);
```
 --- 
<p align="right"><i>Source: Intel® Architecture Instruction Set Extensions and Future Features Programming Reference (May 2019)<br>Generated: 28-5-2019</i></p>