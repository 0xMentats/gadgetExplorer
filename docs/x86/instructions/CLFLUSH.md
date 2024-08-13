<b>CLFLUSH</b> — Flush Cache Line
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64-bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F AE /7</td>
		<td>CLFLUSH m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Flushes cache line containing m8.</td>
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
		<td>M</td>
		<td>ModRM:r/m (w)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Invalidates from every level of the cache hierarchy in the cache coherence domain the cache line that contains the
linear address specified with the memory operand. If that cache line contains modified data at any level of the
cache hierarchy, that data is written back to memory. The source operand is a byte memory location.

The availability of CLFLUSH is indicated by the presence of the CPUID feature flag CLFSH
(CPUID.01H:EDX[bit 19]). The aligned cache line size affected is also indicated with the CPUID instruction (bits 8
through 15 of the EBX register when the initial value in the EAX register is 1).

The memory attribute of the page containing the affected line has no effect on the behavior of this instruction. It
should be noted that processors are free to speculatively fetch and cache data from system memory regions
assigned a memory-type allowing for speculative reads (such as, the WB, WC, and WT memory types). PREFETCHh
instructions can be used to provide the processor with hints for this speculative behavior. Because this speculative
fetching can occur at any time and is not tied to instruction execution, the CLFLUSH instruction is not ordered with
respect to PREFETCHh instructions or any of the speculative fetching mechanisms (that is, data can be speculatively loaded into a cache line just before, during, or after the execution of a CLFLUSH instruction that references
the cache line).

Executions of the CLFLUSH instruction are ordered with respect to each other and with respect to writes, locked
read-modify-write instructions, fence instructions, and executions of CLFLUSHOPT to the same cache line.<sup>1</sup> They
are not ordered with respect to executions of CLFLUSHOPT to different cache lines.

The CLFLUSH instruction can be used at all privilege levels and is subject to all permission checking and faults 
associated with a byte load (and in addition, a CLFLUSH instruction is allowed to flush a linear address in an 
execute-only segment). Like a load, the CLFLUSH instruction sets the A bit but not the D bit in the page tables.

In some implementations, the CLFLUSH instruction may always cause transactional abort with Transactional
Synchronization Extensions (TSX). The CLFLUSH instruction is not expected to be commonly used inside typical
transactional regions. However, programmers must not rely on CLFLUSH instruction to force a transactional abort,
since whether they cause transactional abort is implementation dependent.

The CLFLUSH instruction was introduced with the SSE2 extensions; however, because it has its own CPUID feature
flag, it can be implemented in IA-32 processors that do not include the SSE2 extensions. Also, detecting the presence of the SSE2 extensions with the CPUID instruction does not guarantee that the CLFLUSH instruction is implemented in the processor.

CLFLUSH operation is the same in non-64-bit modes and 64-bit mode.

<sup>1</sup>. Earlier versions of this manual specified that executions of the CLFLUSH instruction were ordered only by the MFENCE instruction. All processors implementing the CLFLUSH instruction also order it relative to the other operations enumerated above.

### Operation

```java
Flush_Cache_Line(SRC);
```
#### Intel C/C++ Compiler Intrinsic Equivalents
```java
CLFLUSH:    void _mm_clflush(void const *p)
```
### Protected Mode Exceptions
<p>#GP(0)
For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.
<p>#SS(0)
For an illegal address in the SS segment.
<p>#PF(fault-code)
For a page fault.
<p>#UD
If CPUID.01H:EDX.CLFSH[bit 19] = 0.
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#GP
If any part of the operand lies outside the effective address space from 0 to FFFFH.
<p>#UD
If CPUID.01H:EDX.CLFSH[bit 19] = 0.
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
If CPUID.01H:EDX.CLFSH[bit 19] = 0.
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
