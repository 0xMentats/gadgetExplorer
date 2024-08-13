<b>VPMOVM2B / VPMOVM2W / VPMOVM2D / VPMOVM2Q</b> — Convert a Mask Register to a Vector
Register
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.F3.0F38.W0 28 /r VPMOVM2B xmm1, k1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Sets each byte in XMM1 to all 1’s or all 0’s based on the value of the corresponding bit in k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.F3.0F38.W0 28 /r VPMOVM2B ymm1, k1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Sets each byte in YMM1 to all 1’s or all 0’s based on the value of the corresponding bit in k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.F3.0F38.W0 28 /r VPMOVM2B zmm1, k1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Sets each byte in ZMM1 to all 1’s or all 0’s based on the value of the corresponding bit in k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.F3.0F38.W1 28 /r VPMOVM2W xmm1, k1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Sets each word in XMM1 to all 1’s or all 0’s based on the value of the corresponding bit in k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.F3.0F38.W1 28 /r VPMOVM2W ymm1, k1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Sets each word in YMM1 to all 1’s or all 0’s based on the value of the corresponding bit in k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.F3.0F38.W1 28 /r VPMOVM2W zmm1, k1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Sets each word in ZMM1 to all 1’s or all 0’s based on the value of the corresponding bit in k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.F3.0F38.W0 38 /r VPMOVM2D xmm1, k1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512VL AVX512DQ</td>
		<td>Sets each doubleword in XMM1 to all 1’s or all 0’s based on the value of the corresponding bit in k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.F3.0F38.W0 38 /r VPMOVM2D ymm1, k1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512VL AVX512DQ</td>
		<td>Sets each doubleword in YMM1 to all 1’s or all 0’s based on the value of the corresponding bit in k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.F3.0F38.W0 38 /r VPMOVM2D zmm1, k1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512DQ</td>
		<td>Sets each doubleword in ZMM1 to all 1’s or all 0’s based on the value of the corresponding bit in k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.F3.0F38.W1 38 /r VPMOVM2Q xmm1, k1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512VL AVX512DQ</td>
		<td>Sets each quadword in XMM1 to all 1’s or all 0’s based on the value of the corresponding bit in k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.F3.0F38.W1 38 /r VPMOVM2Q ymm1, k1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512VL AVX512DQ</td>
		<td>Sets each quadword in YMM1 to all 1’s or all 0’s based on the value of the corresponding bit in k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.F3.0F38.W1 38 /r VPMOVM2Q zmm1, k1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512DQ</td>
		<td>Sets each quadword in ZMM1 to all 1’s or all 0’s based on the value of the corresponding bit in k1.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand 2</b></td>
		<td><b>Operand 3</b></td>
		<td><b>Operand 4</b></td>
	</tr>
	<tr>
		<td>RM</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Converts a mask register to a vector register. Each element in the destination register is set to all 1’s or all 0’s
depending on the value of the corresponding bit in the source mask register.

The source operand is a mask register. The destination operand is a ZMM/YMM/XMM register.

EVEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.

### Operation


#### VPMOVM2B (EVEX encoded versions)
```java
(KL, VL) = (16, 128), (32, 256), (64, 512)
FOR j ← 0 TO KL-1
    i ← j * 8
    IF SRC[j]
        THEN 
                DEST[i+7:i] ← -1 
        ELSE 
                DEST[i+7:i] ← 0
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
#### VPMOVM2W (EVEX encoded versions)
```java
(KL, VL) = (8, 128), (16, 256), (32, 512)
FOR j ← 0 TO KL-1
    i ← j * 16
    IF SRC[j]
        THEN 
                DEST[i+15:i] ← -1 
        ELSE 
                DEST[i+15:i] ← 0
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
#### VPMOVM2D (EVEX encoded versions)
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
FOR j ← 0 TO KL-1
    i ← j * 32
    IF SRC[j]
        THEN 
                DEST[i+31:i] ← -1 
        ELSE 
                DEST[i+31:i] ← 0
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
#### VPMOVM2Q (EVEX encoded versions)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 64
    IF SRC[j]
        THEN 
                DEST[i+63:i] ← -1 
        ELSE 
                DEST[i+63:i] ← 0
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
#### Intel C/C++ Compiler Intrinsic Equivalents
```java
VPMOVM2B __m512i _mm512_movm_epi8(__mmask64 );
VPMOVM2D __m512i _mm512_movm_epi32(__mmask8 );
VPMOVM2Q __m512i _mm512_movm_epi64(__mmask16 );
VPMOVM2W __m512i _mm512_movm_epi16(__mmask32 );
VPMOVM2B __m256i _mm256_movm_epi8(__mmask32 );
VPMOVM2D __m256i _mm256_movm_epi32(__mmask8 );
VPMOVM2Q __m256i _mm256_movm_epi64(__mmask8 );
VPMOVM2W __m256i _mm256_movm_epi16(__mmask16 );
VPMOVM2B __m128i _mm_movm_epi8(__mmask16 );
VPMOVM2D __m128i _mm_movm_epi32(__mmask8 );
VPMOVM2Q __m128i _mm_movm_epi64(__mmask8 );
VPMOVM2W __m128i _mm_movm_epi16(__mmask8 );
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

EVEX-encoded instruction, see Exceptions Type E7NM
<p>#UD
If EVEX.vvvv != 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
