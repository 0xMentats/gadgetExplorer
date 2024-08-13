<b>VCOMPRESSPS</b> — Store Sparse Packed Single-Precision Floating-Point Values into Dense Memory
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W0 8A /r VCOMPRESSPS xmm1/m128 {k1}{z}, xmm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Compress packed single-precision floating-point values from xmm2 to xmm1/m128 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W0 8A /r VCOMPRESSPS ymm1/m256 {k1}{z}, ymm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Compress packed single-precision floating-point values from ymm2 to ymm1/m256 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W0 8A /r VCOMPRESSPS zmm1/m512 {k1}{z}, zmm2</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Compress packed single-precision floating-point values from zmm2 using control mask k1 to zmm1/m512.</td>
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
Compress (stores) up to 16 single-precision floating-point values from the source operand (the second operand) to
the destination operand (the first operand). The source operand is a ZMM/YMM/XMM register, the destination
operand can be a ZMM/YMM/XMM register or a 512/256/128-bit memory location.

The opmask register k1 selects the active elements (a partial vector or possibly non-contiguous if less than 16
active elements) from the source operand to compress into a contiguous vector. The contiguous vector is written to
the destination starting from the low element of the destination operand.

Memory destination version: Only the contiguous vector is written to the destination memory location. EVEX.z
must be zero.

Register destination version: If the vector length of the contiguous vector is less than that of the input vector in the
source operand, the upper bits of the destination register are unmodified if EVEX.z is not set, otherwise the upper
bits are zeroed.

EVEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.

Note that the compressed displacement assumes a pre-scaling (N) corresponding to the size of one single element
instead of the size of the full vector.

### Operation


#### VCOMPRESSPS (EVEX encoded versions) store form
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
SIZE ←32
k ← 0
FOR j ← 0 TO KL-1
    i ← j * 32
    IF k1[j] OR *no writemask*
        THEN 
            DEST[k+SIZE-1:k]← SRC[i+31:i]
            k ← k + SIZE 
    FI;
ENDFOR;
```
#### VCOMPRESSPS (EVEX encoded versions) reg-reg form
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
SIZE ←32
k ← 0
FOR j ← 0 TO KL-1
    i ← j * 32
    IF k1[j] OR *no writemask*
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
VCOMPRESSPS __m512 _mm512_mask_compress_ps( __m512 s, __mmask16 k, __m512 a);
VCOMPRESSPS __m512 _mm512_maskz_compress_ps( __mmask16 k, __m512 a);
VCOMPRESSPS void _mm512_mask_compressstoreu_ps( void * d, __mmask16 k, __m512 a);
VCOMPRESSPS __m256 _mm256_mask_compress_ps( __m256 s, __mmask8 k, __m256 a);
VCOMPRESSPS __m256 _mm256_maskz_compress_ps( __mmask8 k, __m256 a);
VCOMPRESSPS void _mm256_mask_compressstoreu_ps( void * d, __mmask8 k, __m256 a);
VCOMPRESSPS __m128 _mm_mask_compress_ps( __m128 s, __mmask8 k, __m128 a);
VCOMPRESSPS __m128 _mm_maskz_compress_ps( __mmask8 k, __m128 a);
VCOMPRESSPS void _mm_mask_compressstoreu_ps( void * d, __mmask8 k, __m128 a);
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