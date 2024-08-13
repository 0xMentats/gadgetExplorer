<b>VPBROADCASTMB2Q / VPBROADCASTMW2D</b> — Broadcast Mask to Vector Register
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.F3.0F38.W1 2A /r VPBROADCASTMB2Q xmm1, k1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512VL AVX512CD</td>
		<td>Broadcast low byte value in k1 to two locations in xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.256.F3.0F38.W1 2A /r VPBROADCASTMB2Q ymm1, k1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512VL AVX512CD</td>
		<td>Broadcast low byte value in k1 to four locations in ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.512.F3.0F38.W1 2A /r VPBROADCASTMB2Q zmm1, k1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512CD</td>
		<td>Broadcast low byte value in k1 to eight locations in zmm1.</td>
	</tr>
	<tr>
		<td>EVEX.128.F3.0F38.W0 3A /r VPBROADCASTMW2D xmm1, k1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512VL AVX512CD</td>
		<td>Broadcast low word value in k1 to four locations in xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.256.F3.0F38.W0 3A /r VPBROADCASTMW2D ymm1, k1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512VL AVX512CD</td>
		<td>Broadcast low word value in k1 to eight locations in ymm1.</td>
	</tr>
	<tr>
		<td>EVEX.512.F3.0F38.W0 3A /r VPBROADCASTMW2D zmm1, k1</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512CD</td>
		<td>Broadcast low word value in k1 to sixteen locations in zmm1.</td>
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
Broadcasts the zero-extended 64/32 bit value of the low byte/word of the source operand (the second operand) to
each 64/32 bit element of the destination operand (the first operand). The source operand is an opmask register.
The destination operand is a ZMM register (EVEX.512), YMM register (EVEX.256), or XMM register (EVEX.128).

EVEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.

### Operation


#### VPBROADCASTMB2Q
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j*64
    DEST[i+63:i] ← ZeroExtend(SRC[7:0])
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
#### VPBROADCASTMW2D
```java
(KL, VL) = (4, 128), (8, 256),(16, 512)
FOR j ← 0 TO KL-1
    i ← j*32
    DEST[i+31:i] ← ZeroExtend(SRC[15:0])
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPBROADCASTMB2Q __m512i _mm512_broadcastmb_epi64( __mmask8);
VPBROADCASTMW2D __m512i _mm512_broadcastmw_epi32( __mmask16);
VPBROADCASTMB2Q __m256i _mm256_broadcastmb_epi64( __mmask8);
VPBROADCASTMW2D __m256i _mm256_broadcastmw_epi32( __mmask8);
VPBROADCASTMB2Q __m128i _mm_broadcastmb_epi64( __mmask8);
VPBROADCASTMW2D __m128i _mm_broadcastmw_epi32( __mmask8);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

EVEX-encoded instruction, see Exceptions Type E6NF.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
