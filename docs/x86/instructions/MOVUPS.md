<b>MOVUPS</b> — Move Unaligned Packed Single-Precision Floating-Point Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 10 /r MOVUPS xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Move unaligned packed single-precision floating-point from xmm2/mem to xmm1.</td>
	</tr>
	<tr>
		<td>NP 0F 11 /r MOVUPS xmm2/m128, xmm1</td>
		<td>B</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Move unaligned packed single-precision floating-point from xmm1 to xmm2/mem.</td>
	</tr>
	<tr>
		<td>VEX.128.0F.WIG 10 /r VMOVUPS xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move unaligned packed single-precision floating-point from xmm2/mem to xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.0F.WIG 11 /r VMOVUPS xmm2/m128, xmm1</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move unaligned packed single-precision floating-point from xmm1 to xmm2/mem.</td>
	</tr>
	<tr>
		<td>VEX.256.0F.WIG 10 /r VMOVUPS ymm1, ymm2/m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move unaligned packed single-precision floating-point from ymm2/mem to ymm1.</td>
	</tr>
	<tr>
		<td>VEX.256.0F.WIG 11 /r VMOVUPS ymm2/m256, ymm1</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move unaligned packed single-precision floating-point from ymm1 to ymm2/mem.</td>
	</tr>
	<tr>
		<td>EVEX.128.0F.W0 10 /r VMOVUPS xmm1 {k1}{z}, xmm2/m128</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move unaligned packed single-precision floating-point values from xmm2/m128 to xmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.0F.W0 10 /r VMOVUPS ymm1 {k1}{z}, ymm2/m256</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move unaligned packed single-precision floating-point values from ymm2/m256 to ymm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.0F.W0 10 /r VMOVUPS zmm1 {k1}{z}, zmm2/m512</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move unaligned packed single-precision floating-point values from zmm2/m512 to zmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.0F.W0 11 /r VMOVUPS xmm2/m128 {k1}{z}, xmm1</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move unaligned packed single-precision floating-point values from xmm1 to xmm2/m128 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.0F.W0 11 /r VMOVUPS ymm2/m256 {k1}{z}, ymm1</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move unaligned packed single-precision floating-point values from ymm1 to ymm2/m256 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.0F.W0 11 /r VMOVUPS zmm2/m512 {k1}{z}, zmm1</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move unaligned packed single-precision floating-point values from zmm1 to zmm2/m512 using writemask k1.</td>
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

Moves 512 bits of packed single-precision floating-point values from the source operand (second operand) to the
destination operand (first operand). This instruction can be used to load a ZMM register from a 512-bit float32
memory location, to store the contents of a ZMM register into memory. The destination operand is updated
according to the writemask.
VEX.256 and EVEX.256 encoded versions:

Moves 256 bits of packed single-precision floating-point values from the source operand (second operand) to the
destination operand (first operand). This instruction can be used to load a YMM register from a 256-bit memory
location, to store the contents of a YMM register into a 256-bit memory location, or to move data between two YMM
registers. Bits (MAXVL-1:256) of the destination register are zeroed.

128-bit versions:

Moves 128 bits of packed single-precision floating-point values from the source operand (second operand) to the
destination operand (first operand). This instruction can be used to load an XMM register from a 128-bit memory
location, to store the contents of an XMM register into a 128-bit memory location, or to move data between two
XMM registers.
128-bit Legacy SSE version: Bits (MAXVL-1:128) of the corresponding destination register remain unchanged.

When the source or destination operand is a memory operand, the operand may be unaligned without causing a
general-protection exception (\#GP) to be generated.
VEX.128 and EVEX.128 encoded versions: Bits (MAXVL-1:128) of the destination register are zeroed.

### Operation


#### VMOVUPS (EVEX encoded versions, register-copy form)
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
FOR j ← 0 TO KL-1
    i ← j * 32
    IF k1[j] OR *no writemask*
        THEN DEST[i+31:i] ← SRC[i+31:i]
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+31:i] remains unchanged*
                ELSE  DEST[i+31:i] ← 0 
                            ; zeroing-masking
            FI
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
#### VMOVUPS (EVEX encoded versions, store-form)
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
FOR j ← 0 TO KL-1
    i ← j * 32
    IF k1[j] OR *no writemask*
        THEN DEST[i+31:i]← SRC[i+31:i]
        ELSE *DEST[i+31:i] remains unchanged*
                            ; merging-masking
    FI;
ENDFOR;
```
#### VMOVUPS (EVEX encoded versions, load-form)
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
FOR j ← 0 TO KL-1
    i ← j * 32
    IF k1[j] OR *no writemask*
        THEN DEST[i+31:i] ← SRC[i+31:i]
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+31:i] remains unchanged*
                ELSE  DEST[i+31:i] ← 0 
                            ; zeroing-masking
            FI
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
#### VMOVUPS (VEX.256 encoded version, load - and register copy)
```java
DEST[255:0] ← SRC[255:0]
DEST[MAXVL-1:256] ← 0
```
#### VMOVUPS (VEX.256 encoded version, store-form)
```java
DEST[255:0] ← SRC[255:0]
```
#### VMOVUPS (VEX.128 encoded version)
```java
DEST[127:0] ← SRC[127:0]
DEST[MAXVL-1:128] ← 0
```
#### MOVUPS (128-bit load- and register-copy- form Legacy SSE version)
```java
DEST[127:0] ← SRC[127:0]
DEST[MAXVL-1:128] (Unmodified)
```
#### (V)MOVUPS (128-bit store-form version)
```java
DEST[127:0] ← SRC[127:0]
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VMOVUPS __m512 _mm512_loadu_ps( void * s);
VMOVUPS __m512 _mm512_mask_loadu_ps(__m512 a, __mmask16 k, void * s);
VMOVUPS __m512 _mm512_maskz_loadu_ps( __mmask16 k, void * s);
VMOVUPS void _mm512_storeu_ps( void * d, __m512 a);
VMOVUPS void _mm512_mask_storeu_ps( void * d, __mmask8 k, __m512 a);
VMOVUPS __m256 _mm256_mask_loadu_ps(__m256 a, __mmask8 k, void * s);
VMOVUPS __m256 _mm256_maskz_loadu_ps( __mmask8 k, void * s);
VMOVUPS void _mm256_mask_storeu_ps( void * d, __mmask8 k, __m256 a);
VMOVUPS __m128 _mm_mask_loadu_ps(__m128 a, __mmask8 k, void * s);
VMOVUPS __m128 _mm_maskz_loadu_ps( __mmask8 k, void * s);
VMOVUPS void _mm_mask_storeu_ps( void * d, __mmask8 k, __m128 a);
MOVUPS __m256 _mm256_loadu_ps ( float * p);
MOVUPS void _mm256 _storeu_ps( float *p, __m256 a);
MOVUPS __m128 _mm_loadu_ps ( float * p);
MOVUPS void _mm_storeu_ps( float *p, __m128 a);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions
Non-EVEX-encoded instruction, see Exceptions Type 4.
Note treatment of <p>#AC varies;

EVEX-encoded instruction, see Exceptions Type E4.nb.
<p>#UD
If EVEX.vvvv != 1111B or VEX.vvvv != 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
