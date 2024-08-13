<b>MOVAPS</b> — Move Aligned Packed Single-Precision Floating-Point Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 28 /r MOVAPS xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Move aligned packed single-precision floating-point values from xmm2/mem to xmm1.</td>
	</tr>
	<tr>
		<td>NP 0F 29 /r MOVAPS xmm2/m128, xmm1</td>
		<td>B</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Move aligned packed single-precision floating-point values from xmm1 to xmm2/mem.</td>
	</tr>
	<tr>
		<td>VEX.128.0F.WIG 28 /r VMOVAPS xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move aligned packed single-precision floating-point values from xmm2/mem to xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.0F.WIG 29 /r VMOVAPS xmm2/m128, xmm1</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move aligned packed single-precision floating-point values from xmm1 to xmm2/mem.</td>
	</tr>
	<tr>
		<td>VEX.256.0F.WIG 28 /r VMOVAPS ymm1, ymm2/m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move aligned packed single-precision floating-point values from ymm2/mem to ymm1.</td>
	</tr>
	<tr>
		<td>VEX.256.0F.WIG 29 /r VMOVAPS ymm2/m256, ymm1</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move aligned packed single-precision floating-point values from ymm1 to ymm2/mem.</td>
	</tr>
	<tr>
		<td>EVEX.128.0F.W0 28 /r VMOVAPS xmm1 {k1}{z}, xmm2/m128</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move aligned packed single-precision floating-point values from xmm2/m128 to xmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.0F.W0 28 /r VMOVAPS ymm1 {k1}{z}, ymm2/m256</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move aligned packed single-precision floating-point values from ymm2/m256 to ymm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.0F.W0 28 /r VMOVAPS zmm1 {k1}{z}, zmm2/m512</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move aligned packed single-precision floating-point values from zmm2/m512 to zmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.0F.W0 29 /r VMOVAPS xmm2/m128 {k1}{z}, xmm1</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move aligned packed single-precision floating-point values from xmm1 to xmm2/m128 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.0F.W0 29 /r VMOVAPS ymm2/m256 {k1}{z}, ymm1</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move aligned packed single-precision floating-point values from ymm1 to ymm2/m256 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.0F.W0 29 /r VMOVAPS zmm2/m512 {k1}{z}, zmm1</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move aligned packed single-precision floating-point values from zmm1 to zmm2/m512 using writemask k1.</td>
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
Moves 4, 8 or 16 single-precision floating-point values from the source operand (second operand) to the destination
 operand (first operand). This instruction can be used to load an XMM, YMM or ZMM register from an 128-bit,
256-bit or 512-bit memory location, to store the contents of an XMM, YMM or ZMM register into a 128-bit, 256-bit
or 512-bit memory location, or to move data between two XMM, two YMM or two ZMM registers.

When the source or destination operand is a memory operand, the operand must be aligned on a 16-byte (128-bit
version), 32-byte (VEX.256 encoded version) or 64-byte (EVEX.512 encoded version) boundary or a general-
protection exception (\#GP) will be generated. For EVEX.512 encoded versions, the operand must be aligned to the
size of the memory operand. To move single-precision floating-point values to and from unaligned memory locations
, use the VMOVUPS instruction.
Note: VEX.vvvv and EVEX.vvvv are reserved and must be 1111b otherwise instructions will \#UD.

EVEX.512 encoded version:

Moves 512 bits of packed single-precision floating-point values from the source operand (second operand) to the
destination operand (first operand). This instruction can be used to load a ZMM register from a 512-bit float32
memory location, to store the contents of a ZMM register into a float32 memory location, or to move data between
two ZMM registers. When the source or destination operand is a memory operand, the operand must be aligned on
a 64-byte boundary or a general-protection exception (\#GP) will be generated. To move single-precision floating-
point values to and from unaligned memory locations, use the VMOVUPS instruction.

VEX.256 and EVEX.256 encoded version:

Moves 256 bits of packed single-precision floating-point values from the source operand (second operand) to the
destination operand (first operand). This instruction can be used to load a YMM register from a 256-bit memory
location, to store the contents of a YMM register into a 256-bit memory location, or to move data between two YMM
registers. When the source or destination operand is a memory operand, the operand must be aligned on a 32-byte
boundary or a general-protection exception (\#GP) will be generated.

128-bit versions:

Moves 128 bits of packed single-precision floating-point values from the source operand (second operand) to the
destination operand (first operand). This instruction can be used to load an XMM register from a 128-bit memory
location, to store the contents of an XMM register into a 128-bit memory location, or to move data between two
XMM registers. When the source or destination operand is a memory operand, the operand must be aligned on a
16-byte boundary or a general-protection exception (\#GP) will be generated. To move single-precision floating-
point values to and from unaligned memory locations, use the VMOVUPS instruction.

128-bit Legacy SSE version: Bits (MAXVL-1:128) of the corresponding ZMM destination register remain
unchanged.

(E)VEX.128 encoded version: Bits (MAXVL-1:128) of the destination ZMM register are zeroed.

### Operation


#### VMOVAPS (EVEX encoded versions, register-copy form)
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
#### VMOVAPS (EVEX encoded versions, store-form)
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
FOR j ← 0 TO KL-1
    i ← j * 32
    IF k1[j] OR *no writemask*
        THEN DEST[i+31:i]← 
            SRC[i+31:i]
        ELSE *DEST[i+31:i] remains unchanged*
                            ; merging-masking
    FI;
ENDFOR;
```
#### VMOVAPS (EVEX encoded versions, load-form)
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
#### VMOVAPS (VEX.256 encoded version, load - and register copy)
```java
DEST[255:0] ← SRC[255:0]
DEST[MAXVL-1:256] ← 0
```
#### VMOVAPS (VEX.256 encoded version, store-form)
```java
DEST[255:0] ← SRC[255:0]
```
#### VMOVAPS (VEX.128 encoded version, load - and register copy)
```java
DEST[127:0] ← SRC[127:0]
DEST[MAXVL-1:128] ← 0
```
#### MOVAPS (128-bit load- and register-copy- form Legacy SSE version)
```java
DEST[127:0] ← SRC[127:0]
DEST[MAXVL-1:128] (Unmodified)
```
#### (V)MOVAPS (128-bit store-form version)
```java
DEST[127:0] ← SRC[127:0]
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VMOVAPS __m512 _mm512_load_ps( void * m);
VMOVAPS __m512 _mm512_mask_load_ps(__m512 s, __mmask16 k, void * m);
VMOVAPS __m512 _mm512_maskz_load_ps( __mmask16 k, void * m);
VMOVAPS void _mm512_store_ps( void * d, __m512 a);
VMOVAPS void _mm512_mask_store_ps( void * d, __mmask16 k, __m512 a);
VMOVAPS __m256 _mm256_mask_load_ps(__m256 a, __mmask8 k, void * s);
VMOVAPS __m256 _mm256_maskz_load_ps( __mmask8 k, void * s);
VMOVAPS void _mm256_mask_store_ps( void * d, __mmask8 k, __m256 a);
VMOVAPS __m128 _mm_mask_load_ps(__m128 a, __mmask8 k, void * s);
VMOVAPS __m128 _mm_maskz_load_ps( __mmask8 k, void * s);
VMOVAPS void _mm_mask_store_ps( void * d, __mmask8 k, __m128 a);
MOVAPS __m256 _mm256_load_ps (float * p);
MOVAPS void _mm256_store_ps(float * p, __m256 a);
MOVAPS __m128 _mm_load_ps (float * p);
MOVAPS void _mm_store_ps(float * p, __m128 a);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions
Non-EVEX-encoded instruction, see Exceptions Type1.SSE; additionally
<p>#UD
If VEX.vvvv != 1111B.
EVEX-encoded instruction, see Exceptions Type E1.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
