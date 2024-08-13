INSTRUCTION SET REFERENCE UNIQUE TO INTEL® XEON PHI™ PROCESSORS
<b>PREFETCHWT1</b> — Prefetch Vector Data Into Caches with Intent to Write and T1 Hint
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>0F 0D /2 PREFETCHWT1 m8</td>
		<td>M</td>
		<td>V/V</td>
		<td>PREFETCHWT1</td>
		<td>Move data from m8 closer to the processor using T1 hint with intent to write.</td>
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
Fetches the line of data from memory that contains the byte specified with the source operand to a location in the
cache hierarchy specified by an intent to write hint (so that data is brought into ‘Exclusive’ state via a request for
ownership) and a locality hint:


 *  T1 (temporal data with respect to first level cache)—prefetch data into the second level cache.

The source operand is a byte memory location. (The locality hints are encoded into the machine level instruction
using bits 3 through 5 of the ModR/M byte. Use of any ModR/M value other than the specified ones will lead to
unpredictable behavior.)

If the line selected is already present in the cache hierarchy at a level closer to the processor, no data movement
occurs. Prefetches from uncacheable or WC memory are ignored.

The PREFETCHh instruction is merely a hint and does not affect program behavior. If executed, this instruction
moves data closer to the processor in anticipation of future use.

The implementation of prefetch locality hints is implementation-dependent, and can be overloaded or ignored by a
processor implementation. The amount of data prefetched is also processor implementation-dependent. It will,
however, be a minimum of 32 bytes.

It should be noted that processors are free to speculatively fetch and cache data from system memory regions that
are assigned a memory-type that permits speculative reads (that is, the WB, WC, and WT memory types). A
PREFETCHh instruction is considered a hint to this speculative behavior. Because this speculative fetching can occur
at any time and is not tied to instruction execution, a PREFETCHh instruction is not ordered with respect to the
fence instructions (MFENCE, SFENCE, and LFENCE) or locked memory references. A PREFETCHh instruction is also
unordered with respect to CLFLUSH and CLFLUSHOPT instructions, other PREFETCHh instructions, or any other
general instruction. It is ordered with respect to serializing instructions such as CPUID, WRMSR, OUT, and MOV CR.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
PREFETCH(mem, Level, State) Prefetches a byte memory location pointed by ‘mem’ into the cache level specified by ‘Level’; a request 
for exclusive/ownership is done if ‘State’ is 1. Note that the memory location ignore cache line splits. This operation is considered a 
hint for the processor and may be skipped depending on implementation.
Prefetch (m8, Level = 1, EXCLUSIVE=1);
```
### Flags Affected

All flags are affected

### C/C++ Compiler Intrinsic Equivalent
```c
void _mm_prefetch( char const *, int hint= _MM_HINT_ET1);
```
### Protected Mode Exceptions

<p>#UD
If the LOCK prefix is used.
INSTRUCTION SET REFERENCE UNIQUE TO INTEL® XEON PHI™ PROCESSORS

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