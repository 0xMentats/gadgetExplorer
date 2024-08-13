<b>MOVNTI</b> — Store Doubleword Using Non-Temporal Hint
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
		<td>NP 0F C3 /r</td>
		<td>MOVNTI m32, r32</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move doubleword from r32 to m32 using non- temporal hint.</td>
	</tr>
	<tr>
		<td>NP REX.W + 0F C3 /r</td>
		<td>MOVNTI m64, r64</td>
		<td>MR</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Move quadword from r64 to m64 using non- temporal hint.</td>
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
Moves the doubleword integer in the source operand (second operand) to the destination operand (first operand)
using a non-temporal hint to minimize cache pollution during the write to memory. The source operand is a
general-purpose register. The destination operand is a 32-bit memory location.

The non-temporal hint is implemented by using a write combining (WC) memory type protocol when writing the
data to memory. Using this protocol, the processor does not write the data into the cache hierarchy, nor does it
fetch the corresponding cache line from memory into the cache hierarchy. The memory type of the region being
written to can override the non-temporal hint, if the memory address specified for the non-temporal store is in an
uncacheable (UC) or write protected (WP) memory region. For more information on non-temporal stores, see
“Caching of Temporal vs. Non-Temporal Data” in Chapter 10 in the Intel® 64 and IA-32 Architectures Software
Developer’s Manual, Volume 1.

Because the WC protocol uses a weakly-ordered memory consistency model, a fencing operation implemented with
the SFENCE or MFENCE instruction should be used in conjunction with MOVNTI instructions if multiple processors
might use different memory types to read/write the destination memory locations.

In 64-bit mode, the instruction’s default operation size is 32 bits. Use of the REX.R prefix permits access to additional
 registers (R8-R15). Use of the REX.W prefix promotes operation to 64 bits. See the summary chart at the
beginning of this section for encoding data and limits.

### Operation

```java
DEST ← SRC;
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
MOVNTI:
void _mm_stream_si32 (int *p, int a)
MOVNTI:
void _mm_stream_si64(__int64 *p, __int64 a)
```
### SIMD Floating-Point Exceptions

None.

### Protected Mode Exceptions

<p>#GP(0)
For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.
<p>#SS(0)
For an illegal address in the SS segment.
<p>#PF(fault-code)
For a page fault.
<p>#UD
If CPUID.01H:EDX.SSE2[bit 26] = 0.
If the LOCK prefix is used.

### Real-Address Mode Exceptions
<p>#GP
If any part of the operand lies outside the effective address space from 0 to FFFFH.
<p>#UD
If CPUID.01H:EDX.SSE2[bit 26] = 0.
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

Same exceptions as in real address mode.
<p>#PF(fault-code)
For a page fault.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#SS(0)
If a memory address referencing the SS segment is in a non-canonical form.
<p>#GP(0)
If the memory address is in a non-canonical form.
<p>#PF(fault-code)
For a page fault.
<p>#UD
If CPUID.01H:EDX.SSE2[bit 26] = 0.
If the LOCK prefix is used.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
