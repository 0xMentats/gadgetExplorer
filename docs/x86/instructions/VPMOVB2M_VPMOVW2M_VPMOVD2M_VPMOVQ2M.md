<b>VPMOVB2M / VPMOVW2M / VPMOVD2M / VPMOVQ2M</b> — Convert a Vector Register to a Mask
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.F3.0F38.W0 29 /r VPMOVB2M k1, xmm1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Sets each bit in k1 to 1 or 0 based on the value of the most significant bit of the corresponding byte in XMM1.</td>
	</tr>
	<tr>
		<td>EVEX.256.F3.0F38.W0 29 /r VPMOVB2M k1, ymm1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Sets each bit in k1 to 1 or 0 based on the value of the most significant bit of the corresponding byte in YMM1.</td>
	</tr>
	<tr>
		<td>EVEX.512.F3.0F38.W0 29 /r VPMOVB2M k1, zmm1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Sets each bit in k1 to 1 or 0 based on the value of the most significant bit of the corresponding byte in ZMM1.</td>
	</tr>
	<tr>
		<td>EVEX.128.F3.0F38.W1 29 /r VPMOVW2M k1, xmm1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Sets each bit in k1 to 1 or 0 based on the value of the most significant bit of the corresponding word in XMM1.</td>
	</tr>
	<tr>
		<td>EVEX.256.F3.0F38.W1 29 /r VPMOVW2M k1, ymm1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Sets each bit in k1 to 1 or 0 based on the value of the most significant bit of the corresponding word in YMM1.</td>
	</tr>
	<tr>
		<td>EVEX.512.F3.0F38.W1 29 /r VPMOVW2M k1, zmm1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Sets each bit in k1 to 1 or 0 based on the value of the most significant bit of the corresponding word in ZMM1.</td>
	</tr>
	<tr>
		<td>EVEX.128.F3.0F38.W0 39 /r VPMOVD2M k1, xmm1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512VL AVX512DQ</td>
		<td>Sets each bit in k1 to 1 or 0 based on the value of the most significant bit of the corresponding doubleword in XMM1.</td>
	</tr>
	<tr>
		<td>EVEX.256.F3.0F38.W0 39 /r VPMOVD2M k1, ymm1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512VL AVX512DQ</td>
		<td>Sets each bit in k1 to 1 or 0 based on the value of the most significant bit of the corresponding doubleword in YMM1.</td>
	</tr>
	<tr>
		<td>EVEX.512.F3.0F38.W0 39 /r VPMOVD2M k1, zmm1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512DQ</td>
		<td>Sets each bit in k1 to 1 or 0 based on the value of the most significant bit of the corresponding doubleword in ZMM1.</td>
	</tr>
	<tr>
		<td>EVEX.128.F3.0F38.W1 39 /r VPMOVQ2M k1, xmm1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512VL AVX512DQ</td>
		<td>Sets each bit in k1 to 1 or 0 based on the value of the most significant bit of the corresponding quadword in XMM1.</td>
	</tr>
	<tr>
		<td>EVEX.256.F3.0F38.W1 39 /r VPMOVQ2M k1, ymm1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512VL AVX512DQ</td>
		<td>Sets each bit in k1 to 1 or 0 based on the value of the most significant bit of the corresponding quadword in YMM1.</td>
	</tr>
	<tr>
		<td>EVEX.512.F3.0F38.W1 39 /r VPMOVQ2M k1, zmm1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512DQ</td>
		<td>Sets each bit in k1 to 1 or 0 based on the value of the most significant bit of the corresponding quadword in ZMM1.</td>
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
Converts a vector register to a mask register. Each element in the destination register is set to 1 or 0 depending on
the value of most significant bit of the corresponding element in the source register.

The source operand is a ZMM/YMM/XMM register. The destination operand is a mask register.

EVEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.

### Operation


#### VPMOVB2M (EVEX encoded versions)
```java
(KL, VL) = (16, 128), (32, 256), (64, 512)
FOR j ← 0 TO KL-1
    i ← j * 8
    IF SRC[i+7]
        THEN 
                DEST[j] ← 1 
        ELSE 
                DEST[j] ← 0
    FI;
ENDFOR
DEST[MAX_KL-1:KL] ← 0
```
#### VPMOVW2M (EVEX encoded versions)
```java
(KL, VL) = (8, 128), (16, 256), (32, 512)
FOR j ← 0 TO KL-1
    i ← j * 16
    IF SRC[i+15]
        THEN 
                DEST[j] ← 1 
        ELSE 
                DEST[j] ← 0
    FI;
ENDFOR
DEST[MAX_KL-1:KL] ← 0
```
#### VPMOVD2M (EVEX encoded versions)
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
FOR j ← 0 TO KL-1
    i ← j * 32
    IF SRC[i+31]
        THEN 
                DEST[j] ← 1 
        ELSE 
                DEST[j] ← 0
    FI;
ENDFOR
DEST[MAX_KL-1:KL] ← 0
```
#### VPMOVQ2M (EVEX encoded versions)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 64
    IF SRC[i+63]
        THEN 
                DEST[j] ← 1 
        ELSE 
                DEST[j] ← 0
    FI;
ENDFOR
DEST[MAX_KL-1:KL] ← 0
```
#### Intel C/C++ Compiler Intrinsic Equivalents
```java
VPMPOVB2M __mmask64 _mm512_movepi8_mask( __m512i );
VPMPOVD2M __mmask16 _mm512_movepi32_mask( __m512i );
VPMPOVQ2M __mmask8 _mm512_movepi64_mask( __m512i );
VPMPOVW2M __mmask32 _mm512_movepi16_mask( __m512i );
VPMPOVB2M __mmask32 _mm256_movepi8_mask( __m256i );
VPMPOVD2M __mmask8 _mm256_movepi32_mask( __m256i );
VPMPOVQ2M __mmask8 _mm256_movepi64_mask( __m256i );
VPMPOVW2M __mmask16 _mm256_movepi16_mask( __m256i );
VPMPOVB2M __mmask16 _mm_movepi8_mask( __m128i );
VPMPOVD2M __mmask8 _mm_movepi32_mask( __m128i );
VPMPOVQ2M __mmask8 _mm_movepi64_mask( __m128i );
VPMPOVW2M __mmask8 _mm_movepi16_mask( __m128i );
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