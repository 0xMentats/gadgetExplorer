<b>MOVAPD</b> — Move Aligned Packed Double-Precision Floating-Point Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 28 /r MOVAPD xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Move aligned packed double-precision floating- point values from xmm2/mem to xmm1.</td>
	</tr>
	<tr>
		<td>66 0F 29 /r MOVAPD xmm2/m128, xmm1</td>
		<td>B</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Move aligned packed double-precision floating- point values from xmm1 to xmm2/mem.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F.WIG 28 /r VMOVAPD xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move aligned packed double-precision floating- point values from xmm2/mem to xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F.WIG 29 /r VMOVAPD xmm2/m128, xmm1</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move aligned packed double-precision floating- point values from xmm1 to xmm2/mem.</td>
	</tr>
	<tr>
		<td>VEX.256.66.0F.WIG 28 /r VMOVAPD ymm1, ymm2/m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move aligned packed double-precision floating- point values from ymm2/mem to ymm1.</td>
	</tr>
	<tr>
		<td>VEX.256.66.0F.WIG 29 /r VMOVAPD ymm2/m256, ymm1</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move aligned packed double-precision floating- point values from ymm1 to ymm2/mem.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F.W1 28 /r VMOVAPD xmm1 {k1}{z}, xmm2/m128</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move aligned packed double-precision floating- point values from xmm2/m128 to xmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F.W1 28 /r VMOVAPD ymm1 {k1}{z}, ymm2/m256</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move aligned packed double-precision floating- point values from ymm2/m256 to ymm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F.W1 28 /r VMOVAPD zmm1 {k1}{z}, zmm2/m512</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move aligned packed double-precision floating- point values from zmm2/m512 to zmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F.W1 29 /r VMOVAPD xmm2/m128 {k1}{z}, xmm1</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move aligned packed double-precision floating- point values from xmm1 to xmm2/m128 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F.W1 29 /r VMOVAPD ymm2/m256 {k1}{z}, ymm1</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move aligned packed double-precision floating- point values from ymm1 to ymm2/m256 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F.W1 29 /r VMOVAPD zmm2/m512 {k1}{z}, zmm1</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move aligned packed double-precision floating- point values from zmm1 to zmm2/m512 using writemask k1.</td>
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
Moves 2, 4 or 8 double-precision floating-point values from the source operand (second operand) to the destination
operand (first operand). This instruction can be used to load an XMM, YMM or ZMM register from an 128-bit, 256-
bit or 512-bit memory location, to store the contents of an XMM, YMM or ZMM register into a 128-bit, 256-bit or
512-bit memory location, or to move data between two XMM, two YMM or two ZMM registers.

When the source or destination operand is a memory operand, the operand must be aligned on a 16-byte (128-bit
versions), 32-byte (256-bit version) or 64-byte (EVEX.512 encoded version) boundary or a general-protection
exception (\#GP) will be generated. For EVEX encoded versions, the operand must be aligned to the size of the
memory operand. To move double-precision floating-point values to and from unaligned memory locations, use the
VMOVUPD instruction.

Note: VEX.vvvv and EVEX.vvvv are reserved and must be 1111b otherwise instructions will \#UD.

EVEX.512 encoded version:

Moves 512 bits of packed double-precision floating-point values from the source operand (second operand) to the
destination operand (first operand). This instruction can be used to load a ZMM register from a 512-bit float64
memory location, to store the contents of a ZMM register into a 512-bit float64 memory location, or to move data
between two ZMM registers. When the source or destination operand is a memory operand, the operand must be
aligned on a 64-byte boundary or a general-protection exception (\#GP) will be generated. To move single-precision
floating-point values to and from unaligned memory locations, use the VMOVUPD instruction.

VEX.256 and EVEX.256 encoded versions:

Moves 256 bits of packed double-precision floating-point values from the source operand (second operand) to the
destination operand (first operand). This instruction can be used to load a YMM register from a 256-bit memory
location, to store the contents of a YMM register into a 256-bit memory location, or to move data between two YMM
registers. When the source or destination operand is a memory operand, the operand must be aligned on a 32-byte
boundary or a general-protection exception (\#GP) will be generated. To move double-precision floating-point
values to and from unaligned memory locations, use the VMOVUPD instruction.

128-bit versions:

Moves 128 bits of packed double-precision floating-point values from the source operand (second operand) to the
destination operand (first operand). This instruction can be used to load an XMM register from a 128-bit memory
location, to store the contents of an XMM register into a 128-bit memory location, or to move data between two
XMM registers. When the source or destination operand is a memory operand, the operand must be aligned on a
16-byte boundary or a general-protection exception (\#GP) will be generated. To move single-precision floating-
point values to and from unaligned memory locations, use the VMOVUPD instruction.

128-bit Legacy SSE version: Bits (MAXVL-1:128) of the corresponding ZMM destination register remain
unchanged.

(E)VEX.128 encoded version: Bits (MAXVL-1:128) of the destination ZMM register destination are zeroed.

### Operation


#### VMOVAPD (EVEX encoded versions, register-copy form)
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
#### VMOVAPD (EVEX encoded versions, store-form)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 64
    IF k1[j] OR *no writemask*
        THEN DEST[i+63:i]← SRC[i+63:i]
        ELSE 
        ELSE *DEST[i+63:i] remains unchanged*
                            ; merging-masking
    FI;
ENDFOR;
```
#### VMOVAPD (EVEX encoded versions, load-form)
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
#### VMOVAPD (VEX.256 encoded version, load - and register copy)
```java
DEST[255:0] ← SRC[255:0]
DEST[MAXVL-1:256] ← 0
```
#### VMOVAPD (VEX.256 encoded version, store-form)
```java
DEST[255:0] ← SRC[255:0]
```
#### VMOVAPD (VEX.128 encoded version, load - and register copy)
```java
DEST[127:0] ← SRC[127:0]
DEST[MAXVL-1:128] ← 0
```
#### MOVAPD (128-bit load- and register-copy- form Legacy SSE version)
```java
DEST[127:0] ← SRC[127:0]
DEST[MAXVL-1:128] (Unmodified)
```
#### (V)MOVAPD (128-bit store-form version)
```java
DEST[127:0] ← SRC[127:0]
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VMOVAPD __m512d _mm512_load_pd( void * m);
VMOVAPD __m512d _mm512_mask_load_pd(__m512d s, __mmask8 k, void * m);
VMOVAPD __m512d _mm512_maskz_load_pd( __mmask8 k, void * m);
VMOVAPD void _mm512_store_pd( void * d, __m512d a);
VMOVAPD void _mm512_mask_store_pd( void * d, __mmask8 k, __m512d a);
VMOVAPD __m256d _mm256_mask_load_pd(__m256d s, __mmask8 k, void * m);
VMOVAPD __m256d _mm256_maskz_load_pd( __mmask8 k, void * m);
VMOVAPD void _mm256_mask_store_pd( void * d, __mmask8 k, __m256d a);
VMOVAPD __m128d _mm_mask_load_pd(__m128d s, __mmask8 k, void * m);
VMOVAPD __m128d _mm_maskz_load_pd( __mmask8 k, void * m);
VMOVAPD void _mm_mask_store_pd( void * d, __mmask8 k, __m128d a);
MOVAPD __m256d _mm256_load_pd (double * p);
MOVAPD void _mm256_store_pd(double * p, __m256d a);
MOVAPD __m128d _mm_load_pd (double * p);
MOVAPD void _mm_store_pd(double * p, __m128d a);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

Non-EVEX-encoded instruction, see Exceptions Type1.SSE2;
EVEX-encoded instruction, see Exceptions Type E1.
<p>#UD
If EVEX.vvvv != 1111B or VEX.vvvv != 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
