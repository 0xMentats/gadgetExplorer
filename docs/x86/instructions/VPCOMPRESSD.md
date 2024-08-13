<b>VPCOMPRESSD</b> — Store Sparse Packed Doubleword Integer Values into Dense Memory/Register
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W0 8B /r VPCOMPRESSD xmm1/m128 {k1}{z}, xmm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Compress packed doubleword integer values from xmm2 to xmm1/m128 using controlmask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W0 8B /r VPCOMPRESSD ymm1/m256 {k1}{z}, ymm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Compress packed doubleword integer values from ymm2 to ymm1/m256 using controlmask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W0 8B /r VPCOMPRESSD zmm1/m512 {k1}{z}, zmm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Compress packed doubleword integer values from zmm2 to zmm1/m512 using controlmask k1.</td>
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
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Compress (store) up to 16/8/4 doubleword integer values from the source operand (second operand) to the destination
 operand (first operand). The source operand is a ZMM/YMM/XMM register, the destination operand can be a
ZMM/YMM/XMM register or a 512/256/128-bit memory location.

The opmask register k1 selects the active elements (partial vector or possibly non-contiguous if less than 16 active
elements) from the source operand to compress into a contiguous vector. The contiguous vector is written to the
destination starting from the low element of the destination operand.

Memory destination version: Only the contiguous vector is written to the destination memory location. EVEX.z
must be zero.

Register destination version: If the vector length of the contiguous vector is less than that of the input vector in the
source operand, the upper bits of the destination register are unmodified if EVEX.z is not set, otherwise the upper
bits are zeroed.

Note: EVEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.

Note that the compressed displacement assumes a pre-scaling (N) corresponding to the size of one single element
instead of the size of the full vector.

### Operation


#### VPCOMPRESSD (EVEX encoded versions) store form
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
SIZE ←32
k ← 0
FOR j ← 0 TO KL-1
    i ← j * 32
    IF k1[j] OR *no controlmask*
        THEN 
            DEST[k+SIZE-1:k]← SRC[i+31:i]
            k ← k + SIZE 
    FI;
ENDFOR;
```
#### VPCOMPRESSD (EVEX encoded versions) reg-reg form
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
SIZE ←32
k ← 0
FOR j ← 0 TO KL-1
    i ← j * 32
    IF k1[j] OR *no controlmask*
        THEN 
            DEST[k+SIZE-1:k]← SRC[i+31:i]
            k ← k + SIZE
    FI;
ENDFOR
IF *merging-masking* 
        THEN *DEST[VL-1:k] remains unchanged*
        ELSE DEST[VL-1:k] ← 0
FI
DEST[MAXVL-1:VL] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPCOMPRESSD __m512i _mm512_mask_compress_epi32(__m512i s, __mmask16 c, __m512i a);
VPCOMPRESSD __m512i _mm512_maskz_compress_epi32( __mmask16 c, __m512i a);
VPCOMPRESSD void _mm512_mask_compressstoreu_epi32(void * a, __mmask16 c, __m512i s);
VPCOMPRESSD __m256i _mm256_mask_compress_epi32(__m256i s, __mmask8 c, __m256i a);
VPCOMPRESSD __m256i _mm256_maskz_compress_epi32( __mmask8 c, __m256i a);
VPCOMPRESSD void _mm256_mask_compressstoreu_epi32(void * a, __mmask8 c, __m256i s);
VPCOMPRESSD __m128i _mm_mask_compress_epi32(__m128i s, __mmask8 c, __m128i a);
VPCOMPRESSD __m128i _mm_maskz_compress_epi32( __mmask8 c, __m128i a);
VPCOMPRESSD void _mm_mask_compressstoreu_epi32(void * a, __mmask8 c, __m128i s);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

EVEX-encoded instruction, see Exceptions Type E4.nb.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
