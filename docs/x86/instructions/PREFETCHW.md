<b>PREFETCHW</b> — Prefetch Data into Caches in Anticipation of a Write
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>0F 0D /1 PREFETCHW m8</td>
		<td>A</td>
		<td>V/V</td>
		<td>PRFCHW</td>
		<td>Move data from m8 closer to the processor in anticipation of a write.</td>
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
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Fetches the cache line of data from memory that contains the byte specified with the source operand to a location
in the 1st or 2nd level cache and invalidates other cached instances of the line.

The source operand is a byte memory location. If the line selected is already present in the lowest level cache and
is already in an exclusively owned state, no data movement occurs. Prefetches from non-writeback memory are
ignored.

The PREFETCHW instruction is merely a hint and does not affect program behavior. If executed, this instruction
moves data closer to the processor and invalidates other cached copies in anticipation of the line being written to
in the future.

The characteristic of prefetch locality hints is implementation-dependent, and can be overloaded or ignored by a
processor implementation. The amount of data prefetched is also processor implementation-dependent. It will,
however, be a minimum of 32 bytes. Additional details of the implementation-dependent locality hints are
described in Section 7.4 of Intel® 64 and IA-32 Architectures Optimization Reference Manual.

It should be noted that processors are free to speculatively fetch and cache data with exclusive ownership from
system memory regions that permit such accesses (that is, the WB memory type). A PREFETCHW instruction is
considered a hint to this speculative behavior. Because this speculative fetching can occur at any time and is not
tied to instruction execution, a PREFETCHW instruction is not ordered with respect to the fence instructions
(MFENCE, SFENCE, and LFENCE) or locked memory references. A PREFETCHW instruction is also unordered with
respect to CLFLUSH and CLFLUSHOPT instructions, other PREFETCHW instructions, or any other general instruction

It is ordered with respect to serializing instructions such as CPUID, WRMSR, OUT, and MOV CR.

This instruction's operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
FETCH_WITH_EXCLUSIVE_OWNERSHIP (m8);
```
### Flags Affected

All flags are affected

### C/C++ Compiler Intrinsic Equivalent
```c
void _m_prefetchw( void * );
```
### Protected Mode Exceptions

<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#UD
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions
<p>#UD
If the LOCK prefix is used.

### Compatibility Mode Exceptions

<p>#UD
If the LOCK prefix is used.

### 64-Bit Mode Exceptions

<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
