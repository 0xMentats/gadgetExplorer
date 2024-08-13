<b>VP4DPWSSD</b> —  Dot Product of Signed Words with Dword Accumulation (4-iterations)
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.DDS.512.F2.0F38.W0 52 /r VP4DPWSSD zmm1{k1}{z}, zmm2+3, m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_4VNNIW</td>
		<td>Multiply signed words from source register block indicated by zmm2 by signed words from m128 and accumulate resulting signed dwords in zmm1.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En Tuple Operand 1 Operand 2 Operand 3 Operand 4</b></td>
	</tr>
	<tr>
		<td>A Tuple1_4X ModRM:reg (r, w) EVEX.vvvv (r) ModRM:r/m (r) NA</td>
	</tr>
</table>


### Description
This instruction computes 4 sequential register source-block dot-products of two signed word operands with
doubleword accumulation; see Figure 7-1 below. The memory operand is sequentially selected in each of the four
steps.

In the above box, the notation of “+3”' is used to denote that the instruction accesses 4 source registers based on
that operand; sources are consecutive, start in a multiple of 4 boundary, and contain the encoded register operand.

This instruction supports memory fault suppression. The entire memory operand is loaded if any bit of the lowest
16-bits of the mask is set to 1 or if a “no masking” encoding is used.

The tuple type Tuple1_4X implies that four 32-bit elements (16 bytes) are referenced by the memory operation
portion of this instruction.
<table>
	<tr>
		<td rowspan=3><b>16b a3 b1 16b a2 b0 32b c1 16b a1 b1 16b a0 b0 32b c0 c1=c1+a2*b0+a3*b1 c0=c0+a0*b0+a1*b1 32b 32b</b></td>
	</tr>
	<tr>
	</tr>
	<tr>
	</tr>
</table>

Figure 7-1.  Register Source-Block Dot Product of Two Signed Word Operands with Doubleword Accumulation1

NOTES:
1. For illustration purposes, one source-block dot product instance is shown out of
the four.

### Operation

```java
src_reg_id is the 5 bit index of the vector register specified in the instruction as the src1 register.
VP4DPWSSD dest, src1, src2
(KL,VL) = (16,512)
N ← 4
ORIGDEST ← DEST
src_base ← src_reg_id & ~ (N-1) // for src1 operand
FOR i ← 0 to KL-1:
    IF k1[i] or *no writemask*:
        FOR m ← 0 to N-1:
            t ← SRC2.dword[m]
            p1dword ← reg[src_base+m].word[2*i] * t.word[0]
            p2dword ← reg[src_base+m].word[2*i+1] * t.word[1]
            DEST.dword[i] ← DEST.dword[i] + p1dword + p2dword
    ELSE IF *zeroing*:
        DEST.dword[i] ← 0
    ELSE
        DEST.dword[i] ← ORIGDEST.dword[i]
DEST[MAX_VL-1:VL] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VP4DPWSSD __m512i _mm512_4dpwssd_epi32(__m512i, __m512ix4, __m128i *);
VP4DPWSSD __m512i _mm512_mask_4dpwssd_epi32(__m512i, __mmask16, __m512ix4, __m128i *);
VP4DPWSSD __m512i _mm512_maskz_4dpwssd_epi32(__mmask16, __m512i, __m512ix4, __m128i *);
```
### SIMD Floating-Point Exceptions

None.

### Other Exceptions

See Type E4; additionally
<p>#UD
If the EVEX broadcast bit is set to 1.
<p>#UD
If the MODRM.mod = 0b11.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
