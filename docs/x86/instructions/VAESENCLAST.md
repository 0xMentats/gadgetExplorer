<b>VAESENCLAST</b> —  Perform Last Round of an AES Encryption Flow
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.256.66.0F38.WIG DD /r VAESENCLAST ymm1, ymm2, ymm3/m256</td>
		<td>A</td>
		<td>V/V</td>
		<td>VAES</td>
		<td>Perform the last round of an AES encryption flow, operating on a 128-bit data (state) from ymm2 with a 128 bit round key from ymm3/m256; store the result in ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.WIG DD /r VAESENCLAST xmm1, xmm2, xmm3/m128</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL VAES</td>
		<td>Perform the last round of an AES encryption flow, operating on a 128-bit data (state) from xmm2 with a 128 bit round key from xmm3/m128; store the result in xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.WIG DD /r VAESENCLAST ymm1, ymm2, ymm3/m256</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL VAES</td>
		<td>Perform the last round of an AES encryption flow, operating on a 128-bit data (state) from ymm2 with a 128 bit round key from ymm3/m256; store the result in ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.WIG DD /r VAESENCLAST zmm1, zmm2, zmm3/m512</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512F VAES</td>
		<td>Perform the last round of an AES encryption flow, operating on a 128-bit data (state) from zmm2 with a 128 bit round key from zmm3/m512; store the result in zmm1.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Tuple</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand 2</b></td>
		<td><b>Operand 3</b></td>
		<td><b>Operand 4</b></td>
	</tr>
	<tr>
		<td>A</td>
		<td>NA</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>B</td>
		<td>Full Mem</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
This instruction performs the last round of an AES encryption flow using a round key from the second source
operand, operating on 128-bit data (state) from the first source operand, and store the result in the destination
operand.

VEX and EVEX encoded versions of the instruction allows 3-operand (non-destructive) operation. The legacy
encoded versions of the instruction require that the first source operand and the destination operand are the same
and must be an XMM register.

The EVEX encoded form of this instruction does not support memory fault suppression.

### Operation


#### AESENCLAST
```java
STATE ← SRC1
RoundKey ← SRC2
STATE ← ShiftRows( STATE )
STATE ← SubBytes( STATE )
DEST[127:0] ← STATE XOR RoundKey
DEST[MAXVL-1:128] (Unmodified)
```
#### VAESENCLAST (128b and 256b VEX encoded versions)
```java
(KL, VL) = (1,128), (2,256)
FOR I=0 to KL-1:
    STATE ← SRC1.xmm[i]
    RoundKey ← SRC2.xmm[i]
    STATE ← ShiftRows( STATE )
    STATE ← SubBytes( STATE )
    DEST.xmm[i]← STATE XOR RoundKey
DEST[MAXVL-1:VL] ← 0
```
#### VAESENCLAST (EVEX encoded version)
```java
(KL,VL) = (1,128), (2,256), (4,512)
FOR i = 0 to KL-1:
    STATE ← SRC1.xmm[i]
    RoundKey ← SRC2.xmm[i]
    STATE ← ShiftRows( STATE )
    STATE ← SubBytes( STATE )
    DEST.xmm[i] ← STATE XOR RoundKey
DEST[MAXVL-1:VL] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VAESENCLAST __m256i _mm256_aesenclast_epi128(__m256i, __m256i);
VAESENCLAST __m512i _mm512_aesenclast_epi128(__m512i, __m512i);
```
### SIMD Floating-Point Exceptions
None.

### Other Exceptions

VEX-encoded: Exceptions Type 4.
EVEX-encoded: See Exceptions Type E4NF.


 --- 
<p align="right"><i>Source: Intel® Architecture Instruction Set Extensions and Future Features Programming Reference (May 2019)<br>Generated: 28-5-2019</i></p>