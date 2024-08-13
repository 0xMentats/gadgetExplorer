<b>CLWB</b> — Cache Line Write Back
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F AE /6 CLWB m8</td>
		<td>M</td>
		<td>V/V</td>
		<td>CLWB</td>
		<td>Writes back modified cache line containing m8, and may retain the line in cache hierarchy in non-modified state.</td>
	</tr>
</table>

Instruction Operand Encoding1
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
Writes back to memory the cache line (if modified) that contains the linear address specified with the memory
operand from any level of the cache hierarchy in the cache coherence domain. The line may be retained in the
cache hierarchy in non-modified state. Retaining the line in the cache hierarchy is a performance optimization
(treated as a hint by hardware) to reduce the possibility of cache miss on a subsequent access. Hardware may
choose to retain the line at any of the levels in the cache hierarchy, and in some cases, may invalidate the line from
the cache hierarchy. The source operand is a byte memory location.

The availability of CLWB instruction is indicated by the presence of the CPUID feature flag CLWB (bit 24 of the EBX
register, see “CPUID — CPU Identification” in this chapter). The aligned cache line size affected is also indicated
with the CPUID instruction (bits 8 through 15 of the EBX register when the initial value in the EAX register is 1).

The memory attribute of the page containing the affected line has no effect on the behavior of this instruction. It
should be noted that processors are free to speculatively fetch and cache data from system memory regions that
are assigned a memory-type allowing for speculative reads (such as, the WB, WC, and WT memory types).
PREFETCHh instructions can be used to provide the processor with hints for this speculative behavior. Because this
speculative fetching can occur at any time and is not tied to instruction execution, the CLWB instruction is not
ordered with respect to PREFETCHh instructions or any of the speculative fetching mechanisms (that is, data can
be speculatively loaded into a cache line just before, during, or after the execution of a CLWB instruction that references the cache line).

CLWB instruction is ordered only by store-fencing operations. For example, software can use an SFENCE, MFENCE,
XCHG, or LOCK-prefixed instructions to ensure that previous stores are included in the write-back. CLWB instruction
 need not be ordered by another CLWB or CLFLUSHOPT instruction. CLWB is implicitly ordered with older stores
executed by the logical processor to the same address.

For usages that require only writing back modified data from cache lines to memory (do not require the line to be
invalidated), and expect to subsequently access the data, software is recommended to use CLWB (with appropriate
fencing) instead of CLFLUSH or CLFLUSHOPT for improved performance.

The CLWB instruction can be used at all privilege levels and is subject to all permission checking and faults associated with a byte load. Like a load, the CLWB instruction sets the accessed flag but not the dirty flag in the page
tables.

In some implementations, the CLWB instruction may always cause transactional abort with Transactional Synchronization Extensions (TSX). CLWB instruction is not expected to be commonly used inside typical transactional
regions. However, programmers must not rely on CLWB instruction to force a transactional abort, since whether
they cause transactional abort is implementation dependent.

### Operation

```java
Cache_Line_Write_Back(m8);
```
### Flags Affected

None.

1. ModRM.MOD != 011B

### C/C++ Compiler Intrinsic Equivalent
```c
CLWB void _mm_clwb(void const *p);
```
### Protected Mode Exceptions
<p>#UD
If the LOCK prefix is used.
If CPUID.(EAX=07H, ECX=0H):EBX.CLWB[bit 24] = 0.
<p>#GP(0)
For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.
<p>#SS(0)
For an illegal address in the SS segment.
<p>#PF(fault-code)
For a page fault.

### Real-Address Mode Exceptions

<p>#UD
If the LOCK prefix is used.
If CPUID.(EAX=07H, ECX=0H):EBX.CLWB[bit 24] = 0.
<p>#GP
If any part of the operand lies outside the effective address space from 0 to FFFFH.

### Virtual-8086 Mode Exceptions

Same exceptions as in real address mode.
<p>#PF(fault-code)
For a page fault.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#UD
If the LOCK prefix is used.
If CPUID.(EAX=07H, ECX=0H):EBX.CLWB[bit 24] = 0.
<p>#SS(0)
If a memory address referencing the SS segment is in a non-canonical form.
<p>#GP(0)
If the memory address is in a non-canonical form.
<p>#PF(fault-code)
For a page fault.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
