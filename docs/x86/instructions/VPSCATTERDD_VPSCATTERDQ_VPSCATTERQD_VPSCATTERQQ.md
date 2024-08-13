<b>VPSCATTERDD / VPSCATTERDQ / VPSCATTERQD / VPSCATTERQQ</b> — Scatter Packed Dword, Packed
Qword with Signed Dword, Signed Qword Indices
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W0 A0 /vsib VPSCATTERDD vm32x {k1}, xmm1</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Using signed dword indices, scatter dword values to memory using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W0 A0 /vsib VPSCATTERDD vm32y {k1}, ymm1</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Using signed dword indices, scatter dword values to memory using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W0 A0 /vsib VPSCATTERDD vm32z {k1}, zmm1</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Using signed dword indices, scatter dword values to memory using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W1 A0 /vsib VPSCATTERDQ vm32x {k1}, xmm1</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Using signed dword indices, scatter qword values to memory using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W1 A0 /vsib VPSCATTERDQ vm32x {k1}, ymm1</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Using signed dword indices, scatter qword values to memory using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W1 A0 /vsib VPSCATTERDQ vm32y {k1}, zmm1</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Using signed dword indices, scatter qword values to memory using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W0 A1 /vsib VPSCATTERQD vm64x {k1}, xmm1</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Using signed qword indices, scatter dword values to memory using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W0 A1 /vsib VPSCATTERQD vm64y {k1}, xmm1</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Using signed qword indices, scatter dword values to memory using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W0 A1 /vsib VPSCATTERQD vm64z {k1}, ymm1</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Using signed qword indices, scatter dword values to memory using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F38.W1 A1 /vsib VPSCATTERQQ vm64x {k1}, xmm1</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Using signed qword indices, scatter qword values to memory using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F38.W1 A1 /vsib VPSCATTERQQ vm64y {k1}, ymm1</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Using signed qword indices, scatter qword values to memory using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F38.W1 A1 /vsib VPSCATTERQQ vm64z {k1}, zmm1</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Using signed qword indices, scatter qword values to memory using writemask k1.</td>
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
		<td>Tuple1 Scalar</td>
		<td>BaseReg (R): VSIB:base, VectorReg(R): VSIB:index</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Stores up to 16 elements (8 elements for qword indices) in doubleword vector or 8 elements in quadword vector to
the memory locations pointed by base address BASE_ADDR and index vector VINDEX, with scale SCALE. The
elements are specified via the VSIB (i.e., the index register is a vector register, holding packed indices). Elements
will only be stored if their corresponding mask bit is one. The entire mask register will be set to zero by this instruction
 unless it triggers an exception.

This instruction can be suspended by an exception if at least one element is already scattered (i.e., if the exception
is triggered by an element other than the rightmost one with its mask bit set). When this happens, the destination
register and the mask register are partially updated. If any traps or interrupts are pending from already scattered
elements, they will be delivered in lieu of the exception; in this case, EFLAG.RF is set to one so an instruction
breakpoint is not re-triggered when the instruction is continued.

Note that:

 *  Only writes to overlapping vector indices are guaranteed to be ordered with respect to each other (from LSB to

MSB of the source registers). Note that this also include partially overlapping vector indices. Writes that are not
overlapped may happen in any order. Memory ordering with other instructions follows the Intel-64 memory
ordering model. Note that this does not account for non-overlapping indices that map into the same physical
address locations.

 * If two or more destination indices completely overlap, the “earlier” write(s) may be skipped.

 * Faults are delivered in a right-to-left manner. That is, if a fault is triggered by an element and delivered, all
elements closer to the LSB of the destination ZMM will be completed (and non-faulting). Individual elements
closer to the MSB may or may not be completed. If a given element triggers multiple faults, they are delivered
in the conventional order.

 * Elements may be scattered in any order, but faults must be delivered in a right-to left order; thus, elements to
the left of a faulting one may be gathered before the fault is delivered. A given implementation of this
instruction is repeatable - given the same input values and architectural state, the same set of elements to the
left of the faulting one will be gathered.

 * This instruction does not perform AC checks, and so will never deliver an AC fault.

 *  Not valid with 16-bit effective addresses. Will deliver a \#UD fault.

 * If this instruction overwrites itself and then takes a fault, only a subset of elements may be completed before
the fault is delivered (as described above). If the fault handler completes and attempts to re-execute this
instruction, the new instruction will be executed, and the scatter will not complete.

Note that the presence of VSIB byte is enforced in this instruction. Hence, the instruction will \#UD fault if
ModRM.rm is different than 100b.

This instruction has special disp8\*N and alignment rules. N is considered to be the size of a single vector element.

The scaled index may require more bits to represent than the address bits used by the processor (e.g., in 32-bit
mode, if the scale is greater than one). In this case, the most significant bits beyond the number of address bits are
ignored.

The instruction will \#UD fault if the k0 mask register is specified.

The instruction will \#UD fault if EVEX.Z = 1.

### Operation

```java
BASE_ADDR stands for the memory operand base address (a GPR); may not exist
VINDEX stands for the memory operand vector of indices (a ZMM register)
SCALE stands for the memory operand scalar (1, 2, 4 or 8)
DISP is the optional 1, 2 or 4 byte displacement
```
#### VPSCATTERDD (EVEX encoded versions)
```java
(KL, VL)= (4, 128), (8, 256), (16, 512)
FOR j ← 0 TO KL-1
    i ← j * 32
    IF k1[j] OR *no writemask*
        THEN MEM[BASE_ADDR +SignExtend(VINDEX[i+31:i]) * SCALE + DISP] ←SRC[i+31:i]
            k1[j] ← 0
    FI;
ENDFOR
k1[MAX_KL-1:KL] ← 0
```
#### VPSCATTERDQ (EVEX encoded versions)
```java
(KL, VL)= (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 64
    k ← j * 32
    IF k1[j] OR *no writemask*
        THEN MEM[BASE_ADDR +SignExtend(VINDEX[k+31:k]) * SCALE + DISP] ←SRC[i+63:i]
            k1[j] ← 0
    FI;
ENDFOR
k1[MAX_KL-1:KL] ← 0
```
#### VPSCATTERQD (EVEX encoded versions)
```java
(KL, VL)= (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 32
    k ← j * 64
    IF k1[j] OR *no writemask*
        THEN MEM[BASE_ADDR + (VINDEX[k+63:k]) * SCALE + DISP] ←SRC[i+31:i]
            k1[j] ← 0
    FI;
ENDFOR
k1[MAX_KL-1:KL] ← 0
```
#### VPSCATTERQQ (EVEX encoded versions)
```java
(KL, VL)= (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 64
    IF k1[j] OR *no writemask*
        THEN MEM[BASE_ADDR + (VINDEX[j+63:j]) * SCALE + DISP] ←SRC[i+63:i]
    FI;
ENDFOR
k1[MAX_KL-1:KL] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VPSCATTERDD void _mm512_i32scatter_epi32(void * base, __m512i vdx, __m512i a, int scale);
VPSCATTERDD void _mm256_i32scatter_epi32(void * base, __m256i vdx, __m256i a, int scale);
VPSCATTERDD void _mm_i32scatter_epi32(void * base, __m128i vdx, __m128i a, int scale);
VPSCATTERDD void _mm512_mask_i32scatter_epi32(void * base, __mmask16 k, __m512i vdx, __m512i a, int scale);
VPSCATTERDD void _mm256_mask_i32scatter_epi32(void * base, __mmask8 k, __m256i vdx, __m256i a, int scale);
VPSCATTERDD void _mm_mask_i32scatter_epi32(void * base, __mmask8 k, __m128i vdx, __m128i a, int scale);
VPSCATTERDQ void _mm512_i32scatter_epi64(void * base, __m256i vdx, __m512i a, int scale);
VPSCATTERDQ void _mm256_i32scatter_epi64(void * base, __m128i vdx, __m256i a, int scale);
VPSCATTERDQ void _mm_i32scatter_epi64(void * base, __m128i vdx, __m128i a, int scale);
VPSCATTERDQ void _mm512_mask_i32scatter_epi64(void * base, __mmask8 k, __m256i vdx, __m512i a, int scale);
VPSCATTERDQ void _mm256_mask_i32scatter_epi64(void * base, __mmask8 k, __m128i vdx, __m256i a, int scale);
VPSCATTERDQ void _mm_mask_i32scatter_epi64(void * base, __mmask8 k, __m128i vdx, __m128i a, int scale);
VPSCATTERQD void _mm512_i64scatter_epi32(void * base, __m512i vdx, __m256i a, int scale);
VPSCATTERQD void _mm256_i64scatter_epi32(void * base, __m256i vdx, __m128i a, int scale);
VPSCATTERQD void _mm_i64scatter_epi32(void * base, __m128i vdx, __m128i a, int scale);
VPSCATTERQD void _mm512_mask_i64scatter_epi32(void * base, __mmask8 k, __m512i vdx, __m256i a, int scale);
VPSCATTERQD void _mm256_mask_i64scatter_epi32(void * base, __mmask8 k, __m256i vdx, __m128i a, int scale);
VPSCATTERQD void _mm_mask_i64scatter_epi32(void * base, __mmask8 k, __m128i vdx, __m128i a, int scale);
VPSCATTERQQ void _mm512_i64scatter_epi64(void * base, __m512i vdx, __m512i a, int scale);
VPSCATTERQQ void _mm256_i64scatter_epi64(void * base, __m256i vdx, __m256i a, int scale);
VPSCATTERQQ void _mm_i64scatter_epi64(void * base, __m128i vdx, __m128i a, int scale);
VPSCATTERQQ void _mm512_mask_i64scatter_epi64(void * base, __mmask8 k, __m512i vdx, __m512i a, int scale);
VPSCATTERQQ void _mm256_mask_i64scatter_epi64(void * base, __mmask8 k, __m256i vdx, __m256i a, int scale);
VPSCATTERQQ void _mm_mask_i64scatter_epi64(void * base, __mmask8 k, __m128i vdx, __m128i a, int scale);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions
See Exceptions Type E12.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
