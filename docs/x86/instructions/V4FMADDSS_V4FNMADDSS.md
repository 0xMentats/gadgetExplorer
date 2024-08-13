<b>V4FMADDSS / V4FNMADDSS</b> — Scalar Single-Precision Floating-Point Fused Multiply-Add
(4-iterations)
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.DDS.LLIG.F2.0F38.W0 9B /r V4FMADDSS xmm1{k1}{z}, xmm2+3, m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_4FMAPS</td>
		<td>Multiply scalar single-precision floating-point values from source register block indicated by xmm2 by values from m128 and accumulate the result in xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.DDS.LLIG.F2.0F38.W0 AB /r V4FNMADDSS xmm1{k1}{z}, xmm2+3, m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512_4FMAPS</td>
		<td>Multiply and negate scalar single-precision floating-point values from source register block indicated by xmm2 by values from m128 and accumulate the result in xmm1.</td>
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
This instruction computes 4 sequential scalar fused single-precision floating-point multiply-add instructions with a
sequentially selected memory operand in each of the four steps.

In the above box, the notation of “+3” is used to denote that the instruction accesses 4 source registers based that
operand; sources are consecutive, start in a multiple of 4 boundary, and contain the encoded register operand.

This instruction supports memory fault suppression. The entire memory operand is loaded if the least significant
mask bit is set to 1 or if a “no masking” encoding is used.

The tuple type Tuple1_4X implies that four 32-bit elements (16 bytes) are referenced by the memory operation
portion of this instruction.

Rounding is performed at every FMA boundary. Exceptions are also taken sequentially. Pre- and post-computa-
tional exceptions of the first FMA take priority over the pre- and post-computational exceptions of the second FMA,
etc.

### Operation

```java
src_reg_id is the 5 bit index of the vector register specified in the instruction as the src1 register.
define NFMA_SS(vl, dest, k1, msrc, regs_loaded, src_base, posneg):
    tmpdest ← dest
    // reg[] is an array representing the SIMD register file.
    IF k1[0] or *no writemask*:
        FOR j ← 0 to regs_loaded - 1:
            IF posneg = 0:
                tmpdest.single[0] ← RoundFPControl_MXCSR(tmpdest.single[0] - reg[src_base + j ].single[0] * msrc.single[j])
            ELSE:
                tmpdest.single[0] ← RoundFPControl_MXCSR(tmpdest.single[0] + reg[src_base + j ].single[0] * msrc.single[j])
    ELSE IF *zeroing*:
        tmpdest.single[0] ← 0
    dest ← tmpdst
    dest[MAX_VL-1:VL] ← 0

V4FMADDSS and V4FNMADDSS dest{k1}, src1, msrc (AVX512)
VL = 128
regs_loaded ← 4
src_base ← src_reg_id & ~3 // for src1 operand
posneg ← 0 if negative form, 1 otherwise
NFMA_SS(vl, dest, k1, msrc, regs_loaded, src_base, posneg)
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
V4FMADDSS __m128 _mm_4fmadd_ss(__m128, __m128x4, __m128 *);
V4FMADDSS __m128 _mm_mask_4fmadd_ss(__m128, __mmask8, __m128x4, __m128 *);
V4FMADDSS __m128 _mm_maskz_4fmadd_ss(__mmask8, __m128, __m128x4, __m128 *);
V4FNMADDSS __m128 _mm_4fnmadd_ss(__m128, __m128x4, __m128 *);
V4FNMADDSS __m128 _mm_mask_4fnmadd_ss(__m128, __mmask8, __m128x4, __m128 *);
V4FNMADDSS __m128 _mm_maskz_4fnmadd_ss(__mmask8, __m128, __m128x4, __m128 *);
```
### SIMD Floating-Point Exceptions
Overflow, Underflow, Invalid, Precision, Denormal.

### Other Exceptions

See Type E2; additionally
<p>#UD
If the EVEX broadcast bit is set to 1.
<p>#UD
If the MODRM.mod = 0b11.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
