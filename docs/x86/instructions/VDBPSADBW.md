<b>VDBPSADBW</b> — Double Block Packed Sum-Absolute-Differences (SAD) on Unsigned Bytes
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F3A.W0 42 /r ib VDBPSADBW xmm1 {k1}{z}, xmm2, xmm3/m128, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Compute packed SAD word results of unsigned bytes in dword block from xmm2 with unsigned bytes of dword blocks transformed from xmm3/m128 using the shuffle controls in imm8. Results are written to xmm1 under the writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F3A.W0 42 /r ib VDBPSADBW ymm1 {k1}{z}, ymm2, ymm3/m256, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Compute packed SAD word results of unsigned bytes in dword block from ymm2 with unsigned bytes of dword blocks transformed from ymm3/m256 using the shuffle controls in imm8. Results are written to ymm1 under the writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F3A.W0 42 /r ib VDBPSADBW zmm1 {k1}{z}, zmm2, zmm3/m512, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Compute packed SAD word results of unsigned bytes in dword block from zmm2 with unsigned bytes of dword blocks transformed from zmm3/m512 using the shuffle controls in imm8. Results are written to zmm1 under the writemask k1.</td>
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
		<td>Full Mem</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv</td>
		<td>ModRM:r/m (r)</td>
		<td>Imm8</td>
	</tr>
</table>


### Description
Compute packed SAD (sum of absolute differences) word results of unsigned bytes from two 32-bit dword
elements. Packed SAD word results are calculated in multiples of qword superblocks, producing 4 SAD word results
in each 64-bit superblock of the destination register.

Within each super block of packed word results, the SAD results from two 32-bit dword elements are calculated as
follows:

 * The lower two word results are calculated each from the SAD operation between a sliding dword element within
a qword superblock from an intermediate vector with a stationary dword element in the corresponding qword
superblock of the first source operand. The intermediate vector, see “Tmp1” in Figure 5-8, is constructed from
the second source operand the imm8 byte as shuffle control to select dword elements within a 128-bit lane of
the second source operand. The two sliding dword elements in a qword superblock of Tmp1 are located at byte
offset 0 and 1 within the superblock, respectively. The stationary dword element in the qword superblock from
the first source operand is located at byte offset 0.

 * The next two word results are calculated each from the SAD operation between a sliding dword element within
a qword superblock from the intermediate vector Tmp1 with a second stationary dword element in the corresponding
 qword superblock of the first source operand. The two sliding dword elements in a qword superblock
of Tmp1 are located at byte offset 2and 3 within the superblock, respectively. The stationary dword element in
the qword superblock from the first source operand is located at byte offset 4.

 * The intermediate vector is constructed in 128-bits lanes. Within each 128-bit lane, each dword element of the
intermediate vector is selected by a two-bit field within the imm8 byte on the corresponding 128-bits of the
second source operand. The imm8 byte serves as dword shuffle control within each 128-bit lanes of the inter-
mediate vector and the second source operand, similarly to PSHUFD.

The first source operand is a ZMM/YMM/XMM register. The second source operand is a ZMM/YMM/XMM register, or
a 512/256/128-bit memory location. The destination operand is conditionally updated based on writemask k1 at
16-bit word granularity.
<table>
	<tr>
		<td colspan=55 rowspan=22><b>128-bit Lane of Src2 DW3 DW2 DW1 DW0 127+128*n 95+128*n 63+128*n 31+128*n 128*n imm8 shuffle control 7 5 3 1 0 00B: DW0 01B: DW1 10B: DW2 11B: DW3 127+128*n 95+128*n 63+128*n 31+128*n 128*n 128-bit Lane of Tmp1 Tmp1 qword superblock 55 47 39 31 24 39 31 23 15 8 Tmp1 sliding dword Src1 stationary dword 1 63 55 47 39 32 _ abs _ abs _ abs _ abs Tmp1 sliding dword Src1 stationary dword 0 31 23 15 7 0 _ abs _ abs _ abs _ abs + 47 39 31 23 16 Tmp1 sliding dword Src1 stationary dword 1 63 55 47 39 32 _ abs _ abs _ abs _ abs + 31 23 15 31 23 15 7 7 0 0 Tmp1 sliding dword Src1 stationary dword 0 _ abs _ abs _ abs _ abs Destination qword superblock 63 + 47 31 15 + 0</b></td>
	</tr>
	<tr>
		<td colspan=10>DW3</td>
		<td colspan=8>DW2</td>
		<td colspan=13>DW1</td>
		<td colspan=14>DW0</td>
	</tr>
	<tr>
	</tr>
	<tr>
		<td colspan=4></td>
		<td></td>
		<td colspan=3></td>
		<td colspan=3></td>
		<td colspan=20 rowspan=19>01B: DW1 10B: DW2 11B: DW3 31+128*n 128*n 23 15 8 Tmp1 sliding dword Src1 stationary dword 0 15 7 0 _ abs _ abs 31 23 15 31 23 15 7 7 0 0 Tmp1 sliding dword Src1 stationary dword 0 _ abs _ abs _ abs _ abs 15 + 0</td>
	</tr>
	<tr>
	</tr>
	<tr>
		<td colspan=10></td>
		<td colspan=8></td>
		<td colspan=13></td>
		<td colspan=14></td>
		<td colspan=2 rowspan=17>Tmp1 sliding dword Src1 stationary dword 0</td>
	</tr>
	<tr>
	</tr>
	<tr>
	</tr>
	<tr>
		<td colspan=2></td>
		<td colspan=2></td>
		<td colspan=5></td>
		<td colspan=2></td>
		<td colspan=3></td>
		<td colspan=3></td>
		<td colspan=6></td>
		<td colspan=4></td>
		<td colspan=9 rowspan=14>Tmp1 sliding dword Src1 stationary dword 0 23 15 23 15 7 7 0 0 Tmp1 sliding dword Src1 stationary dword 0 _ abs _ abs _ abs + 0</td>
	</tr>
	<tr>
		<td colspan=2>55</td>
		<td colspan=3>47</td>
		<td colspan=4>39</td>
		<td colspan=20 rowspan=11>Src1 stationary dword 1 32 31 _ abs 47 39 31 23 16 Tmp1 sliding dword Src1 stationary dword 1 63 55 47 39 32 _ abs _ abs _ abs _ abs + 47 31</td>
		<td colspan=3>23</td>
		<td colspan=4>15</td>
		<td colspan=6>7</td>
		<td colspan=11 rowspan=13>Src1 stationary dword 0 0 23 15 23 15 7 7 0 0 Tmp1 sliding dword Src1 stationary dword 0 _ abs _ abs _ abs + 0</td>
	</tr>
	<tr>
		<td colspan=2>63</td>
		<td colspan=2>55</td>
		<td colspan=5>47</td>
		<td colspan=2>39 32</td>
		<td colspan=3>_</td>
		<td colspan=3>_</td>
		<td colspan=6>_</td>
		<td colspan=4>_</td>
		<td colspan=9 rowspan=12>Src1 stationary dword 0 23 15 23 15 7 7 0 0 Tmp1 sliding dword Src1 stationary dword 0 _ abs _ abs _ abs + 0</td>
	</tr>
	<tr>
	</tr>
	<tr>
		<td colspan=2></td>
		<td colspan=2></td>
		<td colspan=5></td>
		<td colspan=2></td>
		<td colspan=3></td>
		<td colspan=3></td>
		<td colspan=6></td>
		<td colspan=4></td>
		<td colspan=9 rowspan=10>23 15 23 15 7 7 0 0 Tmp1 sliding dword Src1 stationary dword 0 _ abs _ abs _ abs + 0</td>
	</tr>
	<tr>
	</tr>
	<tr>
		<td colspan=6 rowspan=2>55 47</td>
		<td colspan=2 rowspan=2>39</td>
		<td colspan=19 rowspan=6>Tmp1 sliding dword Src1 stationary dword 1 32 31 15</td>
		<td colspan=4></td>
		<td colspan=3></td>
		<td colspan=2></td>
		<td colspan=3></td>
		<td colspan=2 rowspan=8>Tmp1 sliding dword Src1 stationary dword 0</td>
	</tr>
	<tr>
		<td colspan=4>23</td>
		<td colspan=2>15</td>
		<td colspan=3>7</td>
		<td colspan=3 rowspan=7>0 Src1 stationary dword 0</td>
	</tr>
	<tr>
		<td colspan=4>_</td>
		<td colspan=3>_</td>
		<td colspan=2>_</td>
		<td colspan=3>_</td>
		<td colspan=2 rowspan=6>Src1 stationary dword 0</td>
	</tr>
	<tr>
	</tr>
	<tr>
		<td colspan=4></td>
		<td colspan=3></td>
		<td colspan=2></td>
		<td colspan=3></td>
		<td colspan=2 rowspan=4></td>
	</tr>
	<tr>
	</tr>
	<tr>
		<td colspan=10></td>
		<td colspan=9></td>
		<td colspan=12></td>
		<td colspan=14></td>
		<td colspan=4 rowspan=2></td>
	</tr>
	<tr>
	</tr>
</table>

Figure 5-8.  64-bit Super Block of SAD Operation in VDBPSADBW

### Operation


#### VDBPSADBW (EVEX encoded versions)
```java
(KL, VL) = (8, 128), (16, 256), (32, 512)
Selection of quadruplets:
FOR I = 0 to VL step 128
    TMP1[I+31:I] ← select (SRC2[I+127: I], imm8[1:0])
    TMP1[I+63: I+32] ← select (SRC2[I+127: I], imm8[3:2])
    TMP1[I+95: I+64] ← select (SRC2[I+127: I], imm8[5:4])
    TMP1[I+127: I+96]← select (SRC2[I+127: I], imm8[7:6])
END FOR
SAD of quadruplets:
FOR I =0 to VL step 64
    TMP_DEST[I+15:I] ← ABS(SRC1[I+7: I] - TMP1[I+7: I]) +
        ABS(SRC1[I+15: I+8]- TMP1[I+15: I+8]) +
        ABS(SRC1[I+23: I+16]- TMP1[I+23: I+16]) +
        ABS(SRC1[I+31: I+24]- TMP1[I+31: I+24]) 
    TMP_DEST[I+31: I+16] ←ABS(SRC1[I+7: I] - TMP1[I+15: I+8]) +
        ABS(SRC1[I+15: I+8]- TMP1[I+23: I+16]) +
        ABS(SRC1[I+23: I+16]- TMP1[I+31: I+24]) +
        ABS(SRC1[I+31: I+24]- TMP1[I+39: I+32])
    TMP_DEST[I+47: I+32] ←ABS(SRC1[I+39: I+32] - TMP1[I+23: I+16]) +
        ABS(SRC1[I+47: I+40]- TMP1[I+31: I+24]) +
        ABS(SRC1[I+55: I+48]- TMP1[I+39: I+32]) +
        ABS(SRC1[I+63: I+56]- TMP1[I+47: I+40]) 
    TMP_DEST[I+63: I+48] ←ABS(SRC1[I+39: I+32] - TMP1[I+31: I+24]) +
        ABS(SRC1[I+47: I+40] - TMP1[I+39: I+32]) +
        ABS(SRC1[I+55: I+48] - TMP1[I+47: I+40]) +
        ABS(SRC1[I+63: I+56] - TMP1[I+55: I+48])
ENDFOR
FOR j ← 0 TO KL-1
    i ←  j * 16
    IF k1[j] OR *no writemask*
        THEN DEST[i+15:i] ← TMP_DEST[i+15:i]
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+15:i] remains unchanged*
                ELSE 
                            ; zeroing-masking
                    DEST[i+15:i] ← 0
            FI
    FI;
ENDFOR
DEST[MAXVL-1:VL] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VDBPSADBW __m512i _mm512_dbsad_epu8(__m512i a, __m512i b);
VDBPSADBW __m512i _mm512_mask_dbsad_epu8(__m512i s, __mmask32 m, __m512i a, __m512i b);
VDBPSADBW __m512i _mm512_maskz_dbsad_epu8(__mmask32 m, __m512i a, __m512i b);
VDBPSADBW __m256i _mm256_dbsad_epu8(__m256i a, __m256i b);
VDBPSADBW __m256i _mm256_mask_dbsad_epu8(__m256i s, __mmask16 m, __m256i a, __m256i b);
VDBPSADBW __m256i _mm256_maskz_dbsad_epu8(__mmask16 m, __m256i a, __m256i b);
VDBPSADBW __m128i _mm_dbsad_epu8(__m128i a, __m128i b);
VDBPSADBW __m128i _mm_mask_dbsad_epu8(__m128i s, __mmask8 m, __m128i a, __m128i b);
VDBPSADBW __m128i _mm_maskz_dbsad_epu8(__mmask8 m, __m128i a, __m128i b);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

See Exceptions Type E4NF.nb.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
