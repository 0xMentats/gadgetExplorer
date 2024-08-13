<b>VCOMPRESSPD</b> — Store Sparse Packed Double-Precision Floating-Point Values into Dense
Memory
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W1 8A /r VCOMPRESSPD xmm1/m128 {k1}{z}, xmm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Compress packed double-precision floating-point values from xmm2 to xmm1/m128 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W1 8A /r VCOMPRESSPD ymm1/m256 {k1}{z}, ymm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Compress packed double-precision floating-point values from ymm2 to ymm1/m256 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W1 8A /r VCOMPRESSPD zmm1/m512 {k1}{z}, zmm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Compress packed double-precision floating-point values from zmm2 using control mask k1 to zmm1/m512.</td>
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
Compress (store) up to 8 double-precision floating-point values from the source operand (the second operand) as
a contiguous vector to the destination operand (the first operand) The source operand is a ZMM/YMM/XMM register,
the destination operand can be a ZMM/YMM/XMM register or a 512/256/128-bit memory location.

The opmask register k1 selects the active elements (partial vector or possibly non-contiguous if less than 8 active
elements) from the source operand to compress into a contiguous vector. The contiguous vector is written to the
destination starting from the low element of the destination operand.

Memory destination version: Only the contiguous vector is written to the destination memory location. EVEX.z
must be zero.

Register destination version: If the vector length of the contiguous vector is less than that of the input vector in the
source operand, the upper bits of the destination register are unmodified if EVEX.z is not set, otherwise the upper
bits are zeroed.

EVEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.

Note that the compressed displacement assumes a pre-scaling (N) corresponding to the size of one single element
instead of the size of the full vector.

### Operation


#### VCOMPRESSPD (EVEX encoded versions) store form
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
SIZE ←64
k ← 0
FOR j ← 0 TO KL-1
    i ← j * 64
    IF k1[j] OR *no writemask*
        THEN 
            DEST[k+SIZE-1:k]← SRC[i+63:i]
            k ← k + SIZE
    FI;
ENDFOR
```
#### VCOMPRESSPD (EVEX encoded versions) reg-reg form
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
SIZE ←64
k ← 0
FOR j ← 0 TO KL-1
    i ← j * 64
    IF k1[j] OR *no writemask*
        THEN 
            DEST[k+SIZE-1:k]← SRC[i+63:i]
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
VCOMPRESSPD __m512d _mm512_mask_compress_pd( __m512d s, __mmask8 k, __m512d a);
VCOMPRESSPD __m512d _mm512_maskz_compress_pd( __mmask8 k, __m512d a);
VCOMPRESSPD void _mm512_mask_compressstoreu_pd( void * d, __mmask8 k, __m512d a);
VCOMPRESSPD __m256d _mm256_mask_compress_pd( __m256d s, __mmask8 k, __m256d a);
VCOMPRESSPD __m256d _mm256_maskz_compress_pd( __mmask8 k, __m256d a);
VCOMPRESSPD void _mm256_mask_compressstoreu_pd( void * d, __mmask8 k, __m256d a);
VCOMPRESSPD __m128d _mm_mask_compress_pd( __m128d s, __mmask8 k, __m128d a);
VCOMPRESSPD __m128d _mm_maskz_compress_pd( __mmask8 k, __m128d a);
VCOMPRESSPD void _mm_mask_compressstoreu_pd( void * d, __mmask8 k, __m128d a);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

EVEX-encoded instructions, see Exceptions Type E4.nb.
<p>#UD
If EVEX.vvvv != 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
