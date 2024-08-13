<b>VPMADD52HUQ</b> — Packed Multiply of Unsigned 52-bit Unsigned Integers and Add High 52-bit
Products to 64-bit Accumulators
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>32/64 bit Mode Support</b></td>
		<td><b>CPUID</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.DDS.128.66.0F38.W1 B5 /r VPMADD52HUQ xmm1 {k1}{z}, xmm2, xmm3/m128/m64bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_IFMA AVX512VL</td>
		<td>Multiply unsigned 52-bit integers in xmm2 and xmm3/m128 and add the high 52 bits of the 104- bit product to the qword unsigned integers in xmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.DDS.256.66.0F38.W1 B5 /r VPMADD52HUQ ymm1 {k1}{z}, ymm2, ymm3/m256/m64bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_IFMA AVX512VL</td>
		<td>Multiply unsigned 52-bit integers in ymm2 and ymm3/m128 and add the high 52 bits of the 104- bit product to the qword unsigned integers in ymm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.DDS.512.66.0F38.W1 B5 /r VPMADD52HUQ zmm1 {k1}{z}, zmm2, zmm3/m512/m64bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_IFMA</td>
		<td>Multiply unsigned 52-bit integers in zmm2 and zmm3/m128 and add the high 52 bits of the 104- bit product to the qword unsigned integers in zmm1 using writemask k1.</td>
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
		<td>Full</td>
		<td>ModRM:reg (r, w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m(r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
Multiplies packed unsigned 52-bit integers in each qword element of the first source operand (the second oper-
and) with the packed unsigned 52-bit integers in the corresponding elements of the second source operand (the
third operand) to form packed 104-bit intermediate results. The high 52-bit, unsigned integer of each 104-bit
product is added to the corresponding qword unsigned integer of the destination operand (the first operand)
under the writemask k1.

The first source operand is a ZMM/YMM/XMM register. The second source operand can be a ZMM/YMM/XMM reg-
ister, a 512/256/128-bit memory location or a 512/256/128-bit vector broadcasted from a 64-bit memory location
. The destination operand is a ZMM/YMM/XMM register conditionally updated with writemask k1 at 64-bit
granularity.

### Operation


#### VPMADD52HUQ (EVEX encoded)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 64;
    IF k1[j] OR *no writemask* THEN
        IF src2 is Memory AND EVEX.b=1 THEN
            tsrc2[63:0] ← ZeroExtend64(src2[51:0]);
        ELSE
            tsrc2[63:0] ← ZeroExtend64(src2[i+51:i];
        FI;
        Temp128[127:0] ← ZeroExtend64(src1[i+51:i]) * tsrc2[63:0];
        Temp2[63:0] ← DEST[i+63:i] + ZeroExtend64(temp128[103:52]) ;
        DEST[i+63:i] ← Temp2[63:0];
    ELSE 
        IF *zeroing-masking* THEN
            DEST[i+63:i] ← 0;
        ELSE *merge-masking*
            DEST[i+63:i] is unchanged;
        FI;
    FI;
ENDFOR
DEST[MAX_VL-1:VL] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPMADD52HUQ __m512i _mm512_madd52hi_epu64( __m512i a, __m512i b, __m512i c);
VPMADD52HUQ __m512i _mm512_mask_madd52hi_epu64(__m512i s, __mmask8 k, __m512i a, __m512i b, __m512i c);
VPMADD52HUQ __m512i _mm512_maskz_madd52hi_epu64( __mmask8 k, __m512i a, __m512i b, __m512i c);
VPMADD52HUQ __m256i _mm256_madd52hi_epu64( __m256i a, __m256i b, __m256i c);
VPMADD52HUQ __m256i _mm256_mask_madd52hi_epu64(__m256i s, __mmask8 k, __m256i a, __m256i b, __m256i c);
VPMADD52HUQ __m256i _mm256_maskz_madd52hi_epu64( __mmask8 k, __m256i a, __m256i b, __m256i c);
VPMADD52HUQ __m128i _mm_madd52hi_epu64( __m128i a, __m128i b, __m128i c);
VPMADD52HUQ __m128i _mm_mask_madd52hi_epu64(__m128i s, __mmask8 k, __m128i a, __m128i b, __m128i c);
VPMADD52HUQ __m128i _mm_maskz_madd52hi_epu64( __mmask8 k, __m128i a, __m128i b, __m128i c);
```
### Flags Affected
None.

### SIMD Floating-Point Exceptions

None

### Other Exceptions

See Exceptions Type E4.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
