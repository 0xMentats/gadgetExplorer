<b>VP2INTERSECTD / VP2INTERSECTQ</b> —  Compute Intersection Between DWORDS/QUADWORDS to
a Pair of Mask Registers
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.F2.0F38.W0 68 /r VP2INTERSECTD k1+1, xmm2, xmm3/m128/m32bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512_VP2INTERSECT</td>
		<td>Store, in an even/odd pair of mask registers, the indicators of the locations of value matches between dwords in xmm3/m128/m32bcst and xmm2.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.F2.0F38.W0 68 /r VP2INTERSECTD k1+1, ymm2, ymm3/m256/m32bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512_VP2INTERSECT</td>
		<td>Store, in an even/odd pair of mask registers, the indicators of the locations of value matches between dwords in ymm3/m256/m32bcst and ymm2.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.F2.0F38.W0 68 /r VP2INTERSECTD k1+1, zmm2, zmm3/m512/m32bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F AVX512_VP2INTERSECT</td>
		<td>Store, in an even/odd pair of mask registers, the indicators of the locations of value matches between dwords in zmm3/m512/m32bcst and zmm2.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.F2.0F38.W1 68 /r VP2INTERSECTQ k1+1, xmm2, xmm3/m128/m64bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512_VP2INTERSECT</td>
		<td>Store, in an even/odd pair of mask registers, the indicators of the locations of value matches between quadwords in xmm3/m128/m64bcst and xmm2.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.F2.0F38.W1 68 /r VP2INTERSECTQ k1+1, ymm2, ymm3/m256/m64bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512_VP2INTERSECT</td>
		<td>Store, in an even/odd pair of mask registers, the indicators of the locations of value matches between quadwords in ymm3/m256/m64bcst and ymm2.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.F2.0F38.W1 68 /r VP2INTERSECTQ k1+1, zmm2, zmm3/m512/m64bcst</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F AVX512_VP2INTERSECT</td>
		<td>Store, in an even/odd pair of mask registers, the indicators of the locations of value matches between quadwords in zmm3/m512/m64bcst and zmm2.</td>
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
		<td>Full</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
This instruction writes an even/odd pair of mask registers. The mask register destination indicated in the
MODRM.REG field is used to form the basis of the register pair. The low bit of that field is masked off (set to zero)
to create the first register of the pair.
EVEX.aaa and EVEX.z must be zero.

### Operation


#### VP2INTERSECTD destmask, src1, src2
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
// dest_mask_reg_id is the register id specified in the instruction for destmask
dest_base ← dest_mask_reg_id & ~1
// maskregs[ ] is an array representing the mask registers
maskregs[dest_base+0][MAX_KL-1:0] ← 0
maskregs[dest_base+1][MAX_KL-1:0] ← 0
FOR i ← 0 to KL-1:
    FOR j ← 0 to KL-1:
        match ← (src1.dword[i] == src2.dword[j])
        maskregs[dest_base+0].bit[i] |= match
        maskregs[dest_base+1].bit[j] |= match
```
#### VP2INTERSECTQ destmask, src1, src2
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
// dest_mask_reg_id is the register id specified in the instruction for destmask
dest_base ← dest_mask_reg_id & ~1
// maskregs[ ] is an array representing the mask registers
maskregs[dest_base+0][MAX_KL-1:0] ← 0
maskregs[dest_base+1][MAX_KL-1:0] ← 0
FOR i = 0 to KL-1:
    FOR j = 0 to KL-1:
        match ← (src1.qword[i] == src2.qword[j])
        maskregs[dest_base+0].bit[i] |=  match
        maskregs[dest_base+1].bit[j] |=  match
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VP2INTERSECTD void _mm_2intersect_epi32(__m128i, __m128i, __mmask8 *, __mmask8 *);
VP2INTERSECTD void _mm256_2intersect_epi32(__m256i, __m256i, __mmask8 *, __mmask8 *);
VP2INTERSECTD void _mm512_2intersect_epi32(__m512i, __m512i, __mmask16 *, __mmask16 *);
VP2INTERSECTQ void _mm_2intersect_epi64(__m128i, __m128i, __mmask8 *, __mmask8 *);
VP2INTERSECTQ void _mm256_2intersect_epi64(__m256i, __m256i, __mmask8 *, __mmask8 *);
VP2INTERSECTQ void _mm512_2intersect_epi64(__m512i, __m512i, __mmask8 *, __mmask8 *);
```
### SIMD Floating-Point Exceptions
None.

### Other Exceptions

See Exceptions Type E4NF.

 --- 
<p align="right"><i>Source: Intel® Architecture Instruction Set Extensions and Future Features Programming Reference (May 2019)<br>Generated: 28-5-2019</i></p>
