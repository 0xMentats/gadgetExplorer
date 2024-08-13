<b>MOVDQA / VMOVDQA / VMOVDQA32 / VMOVDQA64</b> — Move Aligned Packed Integer Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 6F /r MOVDQA xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Move aligned packed integer values from xmm2/mem to xmm1.</td>
	</tr>
	<tr>
		<td>66 0F 7F /r MOVDQA xmm2/m128, xmm1</td>
		<td>B</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Move aligned packed integer values from xmm1 to xmm2/mem.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F.WIG 6F /r VMOVDQA xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move aligned packed integer values from xmm2/mem to xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F.WIG 7F /r VMOVDQA xmm2/m128, xmm1</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move aligned packed integer values from xmm1 to xmm2/mem.</td>
	</tr>
	<tr>
		<td>VEX.256.66.0F.WIG 6F /r VMOVDQA ymm1, ymm2/m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move aligned packed integer values from ymm2/mem to ymm1.</td>
	</tr>
	<tr>
		<td>VEX.256.66.0F.WIG 7F /r VMOVDQA ymm2/m256, ymm1</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move aligned packed integer values from ymm1 to ymm2/mem.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F.W0 6F /r VMOVDQA32 xmm1 {k1}{z}, xmm2/m128</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move aligned packed doubleword integer values from xmm2/m128 to xmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F.W0 6F /r VMOVDQA32 ymm1 {k1}{z}, ymm2/m256</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move aligned packed doubleword integer values from ymm2/m256 to ymm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F.W0 6F /r VMOVDQA32 zmm1 {k1}{z}, zmm2/m512</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move aligned packed doubleword integer values from zmm2/m512 to zmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F.W0 7F /r VMOVDQA32 xmm2/m128 {k1}{z}, xmm1</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move aligned packed doubleword integer values from xmm1 to xmm2/m128 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F.W0 7F /r VMOVDQA32 ymm2/m256 {k1}{z}, ymm1</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move aligned packed doubleword integer values from ymm1 to ymm2/m256 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F.W0 7F /r VMOVDQA32 zmm2/m512 {k1}{z}, zmm1</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move aligned packed doubleword integer values from zmm1 to zmm2/m512 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F.W1 6F /r VMOVDQA64 xmm1 {k1}{z}, xmm2/m128</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move aligned quadword integer values from xmm2/m128 to xmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F.W1 6F /r VMOVDQA64 ymm1 {k1}{z}, ymm2/m256</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move aligned quadword integer values from ymm2/m256 to ymm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F.W1 6F /r VMOVDQA64 zmm1 {k1}{z}, zmm2/m512</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move aligned packed quadword integer values from zmm2/m512 to zmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F.W1 7F /r VMOVDQA64 xmm2/m128 {k1}{z}, xmm1</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move aligned packed quadword integer values from xmm1 to xmm2/m128 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F.W1 7F /r VMOVDQA64 ymm2/m256 {k1}{z}, ymm1</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move aligned packed quadword integer values from ymm1 to ymm2/m256 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F.W1 7F /r VMOVDQA64 zmm2/m512 {k1}{z}, zmm1</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move aligned packed quadword integer values from zmm1 to zmm2/m512 using writemask k1.</td>
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
Note: VEX.vvvv and EVEX.vvvv are reserved and must be 1111b otherwise instructions will \#UD.

EVEX encoded versions:

Moves 128, 256 or 512 bits of packed doubleword/quadword integer values from the source operand (the second
operand) to the destination operand (the first operand). This instruction can be used to load a vector register from
an int32/int64 memory location, to store the contents of a vector register into an int32/int64 memory location, or
to move data between two ZMM registers. When the source or destination operand is a memory operand, the
operand must be aligned on a 16 (EVEX.128)/32(EVEX.256)/64(EVEX.512)-byte boundary or a general-protection
exception (\#GP) will be generated. To move integer data to and from unaligned memory locations, use the
VMOVDQU instruction.

The destination operand is updated at 32-bit (VMOVDQA32) or 64-bit (VMOVDQA64) granularity according to the
writemask.

VEX.256 encoded version:

Moves 256 bits of packed integer values from the source operand (second operand) to the destination operand
(first operand). This instruction can be used to load a YMM register from a 256-bit memory location, to store the
contents of a YMM register into a 256-bit memory location, or to move data between two YMM registers.

When the source or destination operand is a memory operand, the operand must be aligned on a 32-byte boundary
or a general-protection exception (\#GP) will be generated. To move integer data to and from unaligned memory
locations, use the VMOVDQU instruction. Bits (MAXVL-1:256) of the destination register are zeroed.

128-bit versions:

Moves 128 bits of packed integer values from the source operand (second operand) to the destination operand
(first operand). This instruction can be used to load an XMM register from a 128-bit memory location, to store the
contents of an XMM register into a 128-bit memory location, or to move data between two XMM registers.

When the source or destination operand is a memory operand, the operand must be aligned on a 16-byte boundary
or a general-protection exception (\#GP) will be generated. To move integer data to and from unaligned memory
locations, use the VMOVDQU instruction.

128-bit Legacy SSE version: Bits (MAXVL-1:128) of the corresponding ZMM destination register remain
unchanged.

VEX.128 encoded version: Bits (MAXVL-1:128) of the destination register are zeroed.

### Operation


#### VMOVDQA32 (EVEX encoded versions, register-copy form)
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
#### VMOVDQA32 (EVEX encoded versions, store-form)
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
#### VMOVDQA32 (EVEX encoded versions, load-form)
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
#### VMOVDQA64 (EVEX encoded versions, register-copy form)
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
#### VMOVDQA64 (EVEX encoded versions, store-form)
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
#### VMOVDQA64 (EVEX encoded versions, load-form)
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
#### VMOVDQA (VEX.256 encoded version, load - and register copy)
```java
DEST[255:0] ← SRC[255:0]
DEST[MAXVL-1:256] ← 0
```
#### VMOVDQA (VEX.256 encoded version, store-form)
```java
DEST[255:0] ← SRC[255:0]
```
#### VMOVDQA (VEX.128 encoded version)
```java
DEST[127:0] ← SRC[127:0]
DEST[MAXVL-1:128] ← 0
```
#### VMOVDQA (128-bit load- and register-copy- form Legacy SSE version)
```java
DEST[127:0] ← SRC[127:0]
DEST[MAXVL-1:128] (Unmodified)
```
#### (V)MOVDQA (128-bit store-form version)
```java
DEST[127:0] ← SRC[127:0]
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VMOVDQA32 __m512i _mm512_load_epi32( void * sa); 
VMOVDQA32 __m512i _mm512_mask_load_epi32(__m512i s, __mmask16 k, void * sa); 
VMOVDQA32 __m512i _mm512_maskz_load_epi32( __mmask16 k, void * sa); 
VMOVDQA32 void _mm512_store_epi32(void * d, __m512i a); 
VMOVDQA32 void _mm512_mask_store_epi32(void * d, __mmask16 k, __m512i a); 
VMOVDQA32 __m256i _mm256_mask_load_epi32(__m256i s, __mmask8 k, void * sa); 
VMOVDQA32 __m256i _mm256_maskz_load_epi32( __mmask8 k, void * sa); 
VMOVDQA32 void _mm256_store_epi32(void * d, __m256i a); 
VMOVDQA32 void _mm256_mask_store_epi32(void * d, __mmask8 k, __m256i a); 
VMOVDQA32 __m128i _mm_mask_load_epi32(__m128i s, __mmask8 k, void * sa); 
VMOVDQA32 __m128i _mm_maskz_load_epi32( __mmask8 k, void * sa); 
VMOVDQA32 void _mm_store_epi32(void * d, __m128i a); 
VMOVDQA32 void _mm_mask_store_epi32(void * d, __mmask8 k, __m128i a); 
VMOVDQA64 __m512i _mm512_load_epi64( void * sa); 
VMOVDQA64 __m512i _mm512_mask_load_epi64(__m512i s, __mmask8 k, void * sa); 
VMOVDQA64 __m512i _mm512_maskz_load_epi64( __mmask8 k, void * sa); 
VMOVDQA64 void _mm512_store_epi64(void * d, __m512i a); 
VMOVDQA64 void _mm512_mask_store_epi64(void * d, __mmask8 k, __m512i a); 
VMOVDQA64 __m256i _mm256_mask_load_epi64(__m256i s, __mmask8 k, void * sa); 
VMOVDQA64 __m256i _mm256_maskz_load_epi64( __mmask8 k, void * sa); 
VMOVDQA64 void _mm256_store_epi64(void * d, __m256i a); 
VMOVDQA64 void _mm256_mask_store_epi64(void * d, __mmask8 k, __m256i a); 
VMOVDQA64 __m128i _mm_mask_load_epi64(__m128i s, __mmask8 k, void * sa); 
VMOVDQA64 __m128i _mm_maskz_load_epi64( __mmask8 k, void * sa); 
VMOVDQA64 void _mm_store_epi64(void * d, __m128i a); 
VMOVDQA64 void _mm_mask_store_epi64(void * d, __mmask8 k, __m128i a); 
MOVDQA void __m256i _mm256_load_si256 (__m256i * p);
MOVDQA _mm256_store_si256(_m256i *p, __m256i a);
MOVDQA __m128i _mm_load_si128 (__m128i * p);
MOVDQA void _mm_store_si128(__m128i *p, __m128i a);
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