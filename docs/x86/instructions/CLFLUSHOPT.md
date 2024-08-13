<b>CLFLUSHOPT</b> — Flush Cache Line Optimized
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
		<td>66 0F AE /7</td>
		<td>CLFLUSHOPT m8</td>
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

The availability of CLFLUSHOPT is indicated by the presence of the CPUID feature flag CLFLUSHOPT
(CPUID.(EAX=7,ECX=0):EBX[bit 23]). The aligned cache line size affected is also indicated with the CPUID instruction
 (bits 8 through 15 of the EBX register when the initial value in the EAX register is 1).

The memory attribute of the page containing the affected line has no effect on the behavior of this instruction. It
should be noted that processors are free to speculatively fetch and cache data from system memory regions
assigned a memory-type allowing for speculative reads (such as, the WB, WC, and WT memory types). PREFETCHh
instructions can be used to provide the processor with hints for this speculative behavior. Because this speculative
fetching can occur at any time and is not tied to instruction execution, the CLFLUSH instruction is not ordered with
respect to PREFETCHh instructions or any of the speculative fetching mechanisms (that is, data can be specula-
tively loaded into a cache line just before, during, or after the execution of a CLFLUSH instruction that references
the cache line).

Executions of the CLFLUSHOPT instruction are ordered with respect to fence instructions and to locked read-
modify-write instructions; they are also ordered with respect to the following accesses to the cache line being inval-
idated: writes, executions of CLFLUSH, and executions of CLFLUSHOPT. They are not ordered with respect to
writes, executions of CLFLUSH, or executions of CLFLUSHOPT that access other cache lines; to enforce ordering
with such an operation, software can insert an SFENCE instruction between CFLUSHOPT and that operation.

The CLFLUSHOPT instruction can be used at all privilege levels and is subject to all permission checking and faults
associated with a byte load (and in addition, a CLFLUSHOPT instruction is allowed to flush a linear address in an
execute-only segment). Like a load, the CLFLUSHOPT instruction sets the A bit but not the D bit in the page tables.

In some implementations, the CLFLUSHOPT instruction may always cause transactional abort with Transactional
Synchronization Extensions (TSX). The CLFLUSHOPT instruction is not expected to be commonly used inside typical
transactional regions. However, programmers must not rely on CLFLUSHOPT instruction to force a transactional
abort, since whether they cause transactional abort is implementation dependent.

CLFLUSHOPT operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
Flush_Cache_Line_Optimized(SRC);
```
#### Intel C/C++ Compiler Intrinsic Equivalents
```java
CLFLUSHOPT:void _mm_clflushopt(void const *p)
```
### Protected Mode Exceptions
<p>#GP(0)
For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.
<p>#SS(0)
For an illegal address in the SS segment.
<p>#PF(fault-code)
For a page fault.
<p>#UD
If CPUID.(EAX=7,ECX=0):EBX.CLFLUSHOPT[bit 23] = 0.
If the LOCK prefix is used.
If an instruction prefix F2H or F3H is used.

### Real-Address Mode Exceptions

<p>#GP
If any part of the operand lies outside the effective address space from 0 to FFFFH.
<p>#UD
If CPUID.(EAX=7,ECX=0):EBX.CLFLUSHOPT[bit 23] = 0.
If the LOCK prefix is used.
If an instruction prefix F2H or F3H is used.

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
If CPUID.(EAX=7,ECX=0):EBX.CLFLUSHOPT[bit 23] = 0.
If the LOCK prefix is used.
If an instruction prefix F2H or F3H is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
