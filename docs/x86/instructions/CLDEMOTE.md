<b>CLDEMOTE</b> — Cache Line Demote
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 1C /0 CLDEMOTE m8</td>
		<td>A</td>
		<td>V/V</td>
		<td>CLDEMOTE</td>
		<td>Hint to hardware to move the cache line containing m8 to a more distant level of the cache without writing back to memory.</td>
	</tr>
</table>

<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand 2</b></td>
		<td><b>Operand 3</b></td>
		<td><b>Operand 4</b></td>
	</tr>
	<tr>
		<td>A</td>
		<td>ModRM:r/m (w)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Hints to hardware that the cache line that contains the linear address specified with the memory operand should be
moved (“demoted”) from the cache(s) closest to the processor core to a level more distant from the processor core.
This may accelerate subsequent accesses to the line by other cores in the same coherence domain, especially if the
line was written by the core that demotes the line. Moving the line in such a manner is a performance optimization,
i.e., it is a hint which does not modify architectural state. Hardware may choose which level in the cache hierarchy
to retain the line (e.g., L3 in typical server designs). The source operand is a byte memory location.

The availability of the CLDEMOTE instruction is indicated by the presence of the CPUID feature flag CLDEMOTE (bit
25 of the ECX register in sub-leaf 07H, see “CPUID—CPU Identification” in Chapter 1). On processors which do not
support the CLDEMOTE instruction (including legacy hardware) the instruction will be treated as a NOP.

A CLDEMOTE instruction is ordered with respect to stores to the same cache line, but unordered with respect to
other instructions including memory fences, CLDEMOTE, CLWB or CLFLUSHOPT instructions to a different cache
line. Since CLDEMOTE will retire in order with respect to stores to the same cache line, software should ensure that
after issuing CLDEMOTE the line is not accessed again immediately by the same core to avoid cache data move-
ment penalties.

The effective memory type of the page containing the affected line determines the effect; cacheable types are likely
to generate a data movement operation, while uncacheable types may cause the instruction to be ignored.

Speculative fetching can occur at any time and is not tied to instruction execution. The CLDEMOTE instruction is not
ordered with respect to PREFETCHh instructions or any of the speculative fetching mechanisms. That is, data can
be speculatively loaded into a cache line just before, during, or after the execution of a CLDEMOTE instruction that
references the cache line.

Unlike CLFLUSH, CLFLUSHOPT and CLWB instructions, CLDEMOTE is not guaranteed to write back modified data to
memory.

The CLDEMOTE instruction may be ignored by hardware in certain cases and is not a guarantee.

The CLDEMOTE instruction can be used at all privilege levels. In certain processor implementations the CLDEMOTE
instruction may set the A bit but not the D bit in the page tables.

If the line is not found in the cache, the instruction will be treated as a NOP.

In some implementations, the CLDEMOTE instruction may always cause a transactional abort with Transactional
Synchronization Extensions (TSX). However, programmers must not rely on CLDEMOTE instruction to force a trans-
actional abort.

1. ModRM.MOD != 011B

### Operation

```java
Cache_Line_Demote(m8);
```
### Flags Affected
None.

### C/C++ Compiler Intrinsic Equivalent
```c
CLDEMOTE void _cldemote(const void*);
```
### Protected Mode Exceptions

<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#UD
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

Same exceptions as in real address mode.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Instruction Set Extensions and Future Features Programming Reference (May 2018)<br>Generated: 5-6-2018</i></p>
