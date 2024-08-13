<b>MOVNTQ</b> — Store of Quadword Using Non-Temporal Hint
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F E7 /r</td>
		<td>MOVNTQ m64, mm</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move quadword from mm to m64 using non- temporal hint.</td>
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
		<td>MR</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Moves the quadword in the source operand (second operand) to the destination operand (first operand) using a
non-temporal hint to minimize cache pollution during the write to memory. The source operand is an MMX tech-
nology register, which is assumed to contain packed integer data (packed bytes, words, or doublewords). The
destination operand is a 64-bit memory location.

The non-temporal hint is implemented by using a write combining (WC) memory type protocol when writing the
data to memory. Using this protocol, the processor does not write the data into the cache hierarchy, nor does it
fetch the corresponding cache line from memory into the cache hierarchy. The memory type of the region being
written to can override the non-temporal hint, if the memory address specified for the non-temporal store is in an
uncacheable (UC) or write protected (WP) memory region. For more information on non-temporal stores, see
“Caching of Temporal vs. Non-Temporal Data” in Chapter 10 in the Intel® 64 and IA-32 Architectures Software
Developer’s Manual, Volume 1.

Because the WC protocol uses a weakly-ordered memory consistency model, a fencing operation implemented with
the SFENCE or MFENCE instruction should be used in conjunction with MOVNTQ instructions if multiple processors
might use different memory types to read/write the destination memory locations.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
DEST ← SRC;
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
MOVNTQ:
void _mm_stream_pi(__m64 * p, __m64 a)
```
### SIMD Floating-Point Exceptions

None.

### Other Exceptions

See Table 22-8, “Exception Conditions for Legacy SIMD/MMX Instructions without FP Exception,” in the Intel® 64
and IA-32 Architectures Software Developer’s Manual, Volume 3A.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
