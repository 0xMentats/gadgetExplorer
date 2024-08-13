<b>PSIGNB / PSIGNW / PSIGND</b> —  Packed SIGN
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 38 08 /r1 PSIGNB mm1, mm2/m64</td>
		<td>RM</td>
		<td>V/V</td>
		<td>SSSE3</td>
		<td>Negate/zero/preserve packed byte integers in mm1 depending on the corresponding sign in mm2/m64.</td>
	</tr>
	<tr>
		<td>66 0F 38 08 /r PSIGNB xmm1, xmm2/m128</td>
		<td>RM</td>
		<td>V/V</td>
		<td>SSSE3</td>
		<td>Negate/zero/preserve packed byte integers in xmm1 depending on the corresponding sign in xmm2/m128.</td>
	</tr>
	<tr>
		<td>NP 0F 38 09 /r1 PSIGNW mm1, mm2/m64</td>
		<td>RM</td>
		<td>V/V</td>
		<td>SSSE3</td>
		<td>Negate/zero/preserve packed word integers in mm1 depending on the corresponding sign in mm2/m128.</td>
	</tr>
	<tr>
		<td>66 0F 38 09 /r PSIGNW xmm1, xmm2/m128</td>
		<td>RM</td>
		<td>V/V</td>
		<td>SSSE3</td>
		<td>Negate/zero/preserve packed word integers in xmm1 depending on the corresponding sign in xmm2/m128.</td>
	</tr>
	<tr>
		<td>NP 0F 38 0A /r1 PSIGND mm1, mm2/m64</td>
		<td>RM</td>
		<td>V/V</td>
		<td>SSSE3</td>
		<td>Negate/zero/preserve packed doubleword integers in mm1 depending on the corresponding sign in mm2/m128.</td>
	</tr>
	<tr>
		<td>66 0F 38 0A /r PSIGND xmm1, xmm2/m128</td>
		<td>RM</td>
		<td>V/V</td>
		<td>SSSE3</td>
		<td>Negate/zero/preserve packed doubleword integers in xmm1 depending on the corresponding sign in xmm2/m128.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F38.WIG 08 /r VPSIGNB xmm1, xmm2, xmm3/m128</td>
		<td>RVM</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Negate/zero/preserve packed byte integers in xmm2 depending on the corresponding sign in xmm3/m128.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F38.WIG 09 /r VPSIGNW xmm1, xmm2, xmm3/m128</td>
		<td>RVM</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Negate/zero/preserve packed word integers in xmm2 depending on the corresponding sign in xmm3/m128.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F38.WIG 0A /r VPSIGND xmm1, xmm2, xmm3/m128</td>
		<td>RVM</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Negate/zero/preserve packed doubleword integers in xmm2 depending on the corresponding sign in xmm3/m128.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F38.WIG 08 /r VPSIGNB ymm1, ymm2, ymm3/m256</td>
		<td>RVM</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Negate packed byte integers in ymm2 if the corresponding sign in ymm3/m256 is less than zero.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F38.WIG 09 /r VPSIGNW ymm1, ymm2, ymm3/m256</td>
		<td>RVM</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Negate packed 16-bit integers in ymm2 if the corresponding sign in ymm3/m256 is less than zero.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F38.WIG 0A /r VPSIGND ymm1, ymm2, ymm3/m256</td>
		<td>RVM</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Negate packed doubleword integers in ymm2 if the corresponding sign in ymm3/m256 is less than zero.</td>
	</tr>
</table>
NOTES: 1. See note in Section 2.4, “AVX and SSE Instruction Exception Specification” in the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 2A and Section 22.25.3, “Exception Conditions of Legacy SIMD Instructions Operating on MMX Registers” in the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 3A.


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
		<td>ModRM:reg (r, w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>RVM</td>
		<td>ModRM:reg (w)</td>
		<td>VEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
(V)PSIGNB/(V)PSIGNW/(V)PSIGND negates each data element of the destination operand (the first operand) if the
signed integer value of the corresponding data element in the source operand (the second operand) is less than
zero. If the signed integer value of a data element in the source operand is positive, the corresponding data
element in the destination operand is unchanged. If a data element in the source operand is zero, the corresponding
 data element in the destination operand is set to zero.

(V)PSIGNB operates on signed bytes. (V)PSIGNW operates on 16-bit signed words. (V)PSIGND operates on signed
32-bit integers. When the source operand is a 128bit memory operand, the operand must be aligned on a 16-byte
boundary or a general-protection exception (\#GP) will be generated.

Legacy SSE instructions: Both operands can be MMX registers. In 64-bit mode, use the REX prefix to access additional
 registers.

128-bit Legacy SSE version: The first source and destination operands are XMM registers. The second source
operand is an XMM register or a 128-bit memory location. Bits (MAXVL-1:128) of the corresponding YMM destination
 register remain unchanged.

VEX.128 encoded version: The first source and destination operands are XMM registers. The second source
operand is an XMM register or a 128-bit memory location. Bits (MAXVL-1:128) of the destination YMM register are
zeroed. VEX.L must be 0, otherwise instructions will \#UD.

VEX.256 encoded version: The first source and destination operands are YMM registers. The second source
operand is an YMM register or a 256-bit memory location.

### Operation


#### PSIGNB (with 64 bit operands)
```java
    IF (SRC[7:0] < 0 ) 
        DEST[7:0] ← Neg(DEST[7:0]) 
    ELSEIF (SRC[7:0] = 0 ) 
        DEST[7:0] ← 0 
    ELSEIF (SRC[7:0] > 0 ) 
        DEST[7:0] ← DEST[7:0] 
    Repeat operation for 2nd through 7th bytes 
    IF (SRC[63:56] < 0 )
        DEST[63:56] ← Neg(DEST[63:56]) 
    ELSEIF (SRC[63:56] = 0 ) 
        DEST[63:56] ← 0 
    ELSEIF (SRC[63:56] > 0 ) 
        DEST[63:56] ← DEST[63:56] 
```
#### PSIGNB (with 128 bit operands)
```java
    IF (SRC[7:0] < 0 ) 
        DEST[7:0] ← Neg(DEST[7:0]) 
    ELSEIF (SRC[7:0] = 0 )
        DEST[7:0] ← 0 
    ELSEIF (SRC[7:0] > 0 ) 
        DEST[7:0] ← DEST[7:0] 
    Repeat operation for 2nd through 15th bytes 
    IF (SRC[127:120] < 0 ) 
        DEST[127:120] ← Neg(DEST[127:120]) 
    ELSEIF (SRC[127:120] = 0 ) 
        DEST[127:120] ← 0 
    ELSEIF (SRC[127:120] > 0 ) 
        DEST[127:120] ← DEST[127:120] 
```
#### VPSIGNB (VEX.128 encoded version)
```java
DEST[127:0] ←BYTE_SIGN(SRC1, SRC2)
DEST[MAXVL-1:128] ← 0
```
#### VPSIGNB (VEX.256 encoded version)
```java
DEST[255:0] ←BYTE_SIGN_256b(SRC1, SRC2)
```
#### PSIGNW (with 64 bit operands)
```java
    IF (SRC[15:0] < 0 ) 
        DEST[15:0] ← Neg(DEST[15:0]) 
    ELSEIF (SRC[15:0] = 0 ) 
        DEST[15:0] ← 0 
    ELSEIF (SRC[15:0] > 0 ) 
        DEST[15:0] ← DEST[15:0] 
Repeat operation for 2nd through 3rd words 
    IF (SRC[63:48] < 0 ) 
        DEST[63:48] ← Neg(DEST[63:48]) 
    ELSEIF (SRC[63:48] = 0 ) 
        DEST[63:48] ← 0 
    ELSEIF (SRC[63:48] > 0 ) 
        DEST[63:48] ← DEST[63:48] 
```
#### PSIGNW (with 128 bit operands)
```java
    IF (SRC[15:0] < 0 ) 
        DEST[15:0] ← Neg(DEST[15:0])
    ELSEIF (SRC[15:0] = 0 ) 
        DEST[15:0] ← 0 
    ELSEIF (SRC[15:0] > 0 ) 
        DEST[15:0] ← DEST[15:0] 
    Repeat operation for 2nd through 7th words 
    IF (SRC[127:112] < 0 ) 
        DEST[127:112] ← Neg(DEST[127:112]) 
    ELSEIF (SRC[127:112] = 0 ) 
        DEST[127:112] ← 0 
    ELSEIF (SRC[127:112] > 0 ) 
        DEST[127:112] ← DEST[127:112] 
```
#### VPSIGNW (VEX.128 encoded version)
```java
DEST[127:0] ←WORD_SIGN(SRC1, SRC2)
DEST[MAXVL-1:128] ← 0
```
#### VPSIGNW (VEX.256 encoded version)
```java
DEST[255:0] ←WORD_SIGN(SRC1, SRC2)
```
#### PSIGND (with 64 bit operands)
```java
    IF (SRC[31:0] < 0 ) 
        DEST[31:0] ← Neg(DEST[31:0]) 
    ELSEIF (SRC[31:0] = 0 ) 
        DEST[31:0] ← 0 
    ELSEIF (SRC[31:0] > 0 ) 
        DEST[31:0] ← DEST[31:0]
    IF (SRC[63:32] < 0 ) 
        DEST[63:32] ← Neg(DEST[63:32]) 
    ELSEIF (SRC[63:32] = 0 ) 
        DEST[63:32] ← 0 
    ELSEIF (SRC[63:32] > 0 ) 
        DEST[63:32] ← DEST[63:32] 
```
#### PSIGND (with 128 bit operands)
```java
    IF (SRC[31:0] < 0 ) 
        DEST[31:0] ← Neg(DEST[31:0]) 
    ELSEIF (SRC[31:0] = 0 ) 
        DEST[31:0] ← 0 
    ELSEIF (SRC[31:0] > 0 ) 
        DEST[31:0] ← DEST[31:0] 
    Repeat operation for 2nd through 3rd double words 
    IF (SRC[127:96] < 0 ) 
        DEST[127:96] ← Neg(DEST[127:96]) 
    ELSEIF (SRC[127:96] = 0 ) 
        DEST[127:96] ← 0 
    ELSEIF (SRC[127:96] > 0 ) 
        DEST[127:96] ← DEST[127:96] 
```
#### VPSIGND (VEX.128 encoded version)
```java
DEST[127:0] ←DWORD_SIGN(SRC1, SRC2)
DEST[MAXVL-1:128] ← 0
```
#### VPSIGND (VEX.256 encoded version)
```java
DEST[255:0] ←DWORD_SIGN(SRC1, SRC2)
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
PSIGNB:
 __m64 _mm_sign_pi8 (__m64 a, __m64 b)
(V)PSIGNB:
 __m128i _mm_sign_epi8 (__m128i a, __m128i b)
VPSIGNB:
__m256i _mm256_sign_epi8 (__m256i a, __m256i b)
PSIGNW:
 __m64 _mm_sign_pi16 (__m64 a, __m64 b)
(V)PSIGNW:
 __m128i _mm_sign_epi16 (__m128i a, __m128i b)
VPSIGNW:
__m256i _mm256_sign_epi16 (__m256i a, __m256i b)
PSIGND:
 __m64 _mm_sign_pi32 (__m64 a, __m64 b)
(V)PSIGND:
 __m128i _mm_sign_epi32 (__m128i a, __m128i b)
VPSIGND:
__m256i _mm256_sign_epi32 (__m256i a, __m256i b)
```
### SIMD Floating-Point Exceptions
None.

### Other Exceptions

See Exceptions Type 4; additionally
<p>#UD
If VEX.L = 1.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
