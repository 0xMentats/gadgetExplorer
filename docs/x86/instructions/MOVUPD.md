<b>MOVUPD</b> — Move Unaligned Packed Double-Precision Floating-Point Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 10 /r MOVUPD xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Move unaligned packed double-precision floating- point from xmm2/mem to xmm1.</td>
	</tr>
	<tr>
		<td>66 0F 11 /r MOVUPD xmm2/m128, xmm1</td>
		<td>B</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Move unaligned packed double-precision floating- point from xmm1 to xmm2/mem.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F.WIG 10 /r VMOVUPD xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move unaligned packed double-precision floating- point from xmm2/mem to xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F.WIG 11 /r VMOVUPD xmm2/m128, xmm1</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move unaligned packed double-precision floating- point from xmm1 to xmm2/mem.</td>
	</tr>
	<tr>
		<td>VEX.256.66.0F.WIG 10 /r VMOVUPD ymm1, ymm2/m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move unaligned packed double-precision floating- point from ymm2/mem to ymm1.</td>
	</tr>
	<tr>
		<td>VEX.256.66.0F.WIG 11 /r VMOVUPD ymm2/m256, ymm1</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move unaligned packed double-precision floating- point from ymm1 to ymm2/mem.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F.W1 10 /r VMOVUPD xmm1 {k1}{z}, xmm2/m128</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move unaligned packed double-precision floating- point from xmm2/m128 to xmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F.W1 11 /r VMOVUPD xmm2/m128 {k1}{z}, xmm1</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move unaligned packed double-precision floating- point from xmm1 to xmm2/m128 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F.W1 10 /r VMOVUPD ymm1 {k1}{z}, ymm2/m256</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move unaligned packed double-precision floating- point from ymm2/m256 to ymm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F.W1 11 /r VMOVUPD ymm2/m256 {k1}{z}, ymm1</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move unaligned packed double-precision floating- point from ymm1 to ymm2/m256 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F.W1 10 /r VMOVUPD zmm1 {k1}{z}, zmm2/m512</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move unaligned packed double-precision floating- point values from zmm2/m512 to zmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F.W1 11 /r VMOVUPD zmm2/m512 {k1}{z}, zmm1</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move unaligned packed double-precision floating- point values from zmm1 to zmm2/m512 using writemask k1.</td>
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
		<td>NA</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>C</td>
		<td>Full Mem</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>D</td>
		<td>Full Mem</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Note: VEX.vvvv and EVEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.
EVEX.512 encoded version:

Moves 512 bits of packed double-precision floating-point values from the source operand (second operand) to the
destination operand (first operand). This instruction can be used to load a ZMM register from a float64 memory
location, to store the contents of a ZMM register into a memory. The destination operand is updated according to
the writemask.
VEX.256 encoded version:

Moves 256 bits of packed double-precision floating-point values from the source operand (second operand) to the
destination operand (first operand). This instruction can be used to load a YMM register from a 256-bit memory
location, to store the contents of a YMM register into a 256-bit memory location, or to move data between two YMM
registers. Bits (MAXVL-1:256) of the destination register are zeroed.

128-bit versions:

Moves 128 bits of packed double-precision floating-point values from the source operand (second operand) to the
destination operand (first operand). This instruction can be used to load an XMM register from a 128-bit memory
location, to store the contents of an XMM register into a 128-bit memory location, or to move data between two
XMM registers.
128-bit Legacy SSE version: Bits (MAXVL-1:128) of the corresponding destination register remain unchanged.

When the source or destination operand is a memory operand, the operand may be unaligned on a 16-byte
boundary without causing a general-protection exception (\#GP) to be generated
VEX.128 and EVEX.128 encoded versions: Bits (MAXVL-1:128) of the destination register are zeroed.

### Operation


#### VMOVUPD (EVEX encoded versions, register-copy form)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 64
    IF k1[j] OR *no writemask*
        THEN DEST[i+63:i] ← SRC[i+63:i]
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+63:i] remains unchanged*
                ELSE  DEST[i+63:i] ← 0 
                            ; zeroing-masking
            FI
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
#### VMOVUPD (EVEX encoded versions, store-form)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 64
    IF k1[j] OR *no writemask*
        THEN DEST[i+63:i]← SRC[i+63:i]
        ELSE *DEST[i+63:i] remains unchanged*
                            ; merging-masking
    FI;
ENDFOR;
```
#### VMOVUPD (EVEX encoded versions, load-form)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 64
    IF k1[j] OR *no writemask*
        THEN DEST[i+63:i] ← SRC[i+63:i]
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+63:i] remains unchanged*
                ELSE  DEST[i+63:i] ← 0 
                            ; zeroing-masking
            FI
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0
VMOVUPD (VEX.256 encoded version, load - and register copy)
DEST[255:0] ← SRC[255:0]
DEST[MAXVL-1:256] ← 0
```
#### VMOVUPD (VEX.256 encoded version, store-form)
```java
DEST[255:0] ← SRC[255:0]
```
#### VMOVUPD (VEX.128 encoded version)
```java
DEST[127:0] ← SRC[127:0]
DEST[MAXVL-1:128] ← 0
```
#### MOVUPD (128-bit load- and register-copy- form Legacy SSE version)
```java
DEST[127:0] ← SRC[127:0]
DEST[MAXVL-1:128] (Unmodified)
```
#### (V)MOVUPD (128-bit store-form version)
```java
DEST[127:0] ← SRC[127:0]
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VMOVUPD __m512d _mm512_loadu_pd( void * s);
VMOVUPD __m512d _mm512_mask_loadu_pd(__m512d a, __mmask8 k, void * s);
VMOVUPD __m512d _mm512_maskz_loadu_pd( __mmask8 k, void * s);
VMOVUPD void _mm512_storeu_pd( void * d, __m512d a);
VMOVUPD void _mm512_mask_storeu_pd( void * d, __mmask8 k, __m512d a);
VMOVUPD __m256d _mm256_mask_loadu_pd(__m256d s, __mmask8 k, void * m);
VMOVUPD __m256d _mm256_maskz_loadu_pd( __mmask8 k, void * m);
VMOVUPD void _mm256_mask_storeu_pd( void * d, __mmask8 k, __m256d a);
VMOVUPD __m128d _mm_mask_loadu_pd(__m128d s, __mmask8 k, void * m);
VMOVUPD __m128d _mm_maskz_loadu_pd( __mmask8 k, void * m);
VMOVUPD void _mm_mask_storeu_pd( void * d, __mmask8 k, __m128d a);
MOVUPD __m256d _mm256_loadu_pd (double * p);
MOVUPD void _mm256_storeu_pd( double *p, __m256d a);
MOVUPD __m128d _mm_loadu_pd (double * p);
MOVUPD void _mm_storeu_pd( double *p, __m128d a);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions
Non-EVEX-encoded instruction, see Exceptions Type 4.
Note treatment of <p>#AC varies; additionally
<p>#UD
If VEX.vvvv != 1111B.
EVEX-encoded instruction, see Exceptions Type E4.nb.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
