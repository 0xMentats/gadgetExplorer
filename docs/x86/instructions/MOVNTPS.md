<b>MOVNTPS</b> — Store Packed Single-Precision Floating-Point Values Using Non-Temporal Hint
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 2B /r MOVNTPS m128, xmm1</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Move packed single-precision values xmm1 to mem using non-temporal hint.</td>
	</tr>
	<tr>
		<td>VEX.128.0F.WIG 2B /r VMOVNTPS m128, xmm1</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move packed single-precision values xmm1 to mem using non-temporal hint.</td>
	</tr>
	<tr>
		<td>VEX.256.0F.WIG 2B /r VMOVNTPS m256, ymm1</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move packed single-precision values ymm1 to mem using non-temporal hint.</td>
	</tr>
	<tr>
		<td>EVEX.128.0F.W0 2B /r VMOVNTPS m128, xmm1</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move packed single-precision values in xmm1 to m128 using non-temporal hint.</td>
	</tr>
	<tr>
		<td>EVEX.256.0F.W0 2B /r VMOVNTPS m256, ymm1</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Move packed single-precision values in ymm1 to m256 using non-temporal hint.</td>
	</tr>
	<tr>
		<td>EVEX.512.0F.W0 2B /r VMOVNTPS m512, zmm1</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move packed single-precision values in zmm1 to m512 using non-temporal hint.</td>
	</tr>
</table>

Instruction Operand Encoding1
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
		<td>NA</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>B</td>
		<td>Full Mem</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Moves the packed single-precision floating-point values in the source operand (second operand) to the destination
operand (first operand) using a non-temporal hint to prevent caching of the data during the write to memory. The
source operand is an XMM register, YMM register or ZMM register, which is assumed to contain packed single-precision
, floating-pointing. The destination operand is a 128-bit, 256-bit or 512-bit memory location. The memory
operand must be aligned on a 16-byte (128-bit version), 32-byte (VEX.256 encoded version) or 64-byte (EVEX.512
encoded version) boundary otherwise a general-protection exception (\#GP) will be generated.

The non-temporal hint is implemented by using a write combining (WC) memory type protocol when writing the
data to memory. Using this protocol, the processor does not write the data into the cache hierarchy, nor does it
fetch the corresponding cache line from memory into the cache hierarchy. The memory type of the region being
written to can override the non-temporal hint, if the memory address specified for the non-temporal store is in an
uncacheable (UC) or write protected (WP) memory region. For more information on non-temporal stores, see
“Caching of Temporal vs. Non-Temporal Data” in Chapter 10 in the IA-32 Intel Architecture Software Developer’s
Manual, Volume 1.

Because the WC protocol uses a weakly-ordered memory consistency model, a fencing operation implemented with
the SFENCE or MFENCE instruction should be used in conjunction with MOVNTPS instructions if multiple processors
might use different memory types to read/write the destination memory locations.

Note: VEX.vvvv and EVEX.vvvv are reserved and must be 1111b otherwise instructions will \#UD.

### Operation


#### VMOVNTPS (EVEX encoded versions)
```java
VL = 128, 256, 512
DEST[VL-1:0] ← SRC[VL-1:0]
DEST[MAXVL-1:VL] ← 0
1. ModRM.MOD = 011B required
```
#### MOVNTPS
```java
DEST ← SRC
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VMOVNTPS void _mm512_stream_ps(float * p, __m512d a);
MOVNTPS void _mm_stream_ps (float * p, __m128d a);
VMOVNTPS void _mm256_stream_ps (float * p, __m256 a);
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

Non-EVEX-encoded instruction, see Exceptions Type1.SSE; additionally
EVEX-encoded instruction, see Exceptions Type E1NF.
<p>#UD
If VEX.vvvv != 1111B or EVEX.vvvv != 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
