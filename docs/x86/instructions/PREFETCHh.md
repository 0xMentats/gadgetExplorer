<b>PREFETCHh</b> — Prefetch Data Into Caches
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
		<td>0F 18 /1</td>
		<td>PREFETCHT0 m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move data from m8 closer to the processor using T0 hint.</td>
	</tr>
	<tr>
		<td>0F 18 /2</td>
		<td>PREFETCHT1 m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move data from m8 closer to the processor using T1 hint.</td>
	</tr>
	<tr>
		<td>0F 18 /3</td>
		<td>PREFETCHT2 m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move data from m8 closer to the processor using T2 hint.</td>
	</tr>
	<tr>
		<td>0F 18 /0</td>
		<td>PREFETCHNTA m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move data from m8 closer to the processor using NTA hint.</td>
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
cache hierarchy specified by a locality hint:

 * T0 (temporal data)—prefetch data into all levels of the cache hierarchy.

 * T1 (temporal data with respect to first level cache misses)—prefetch data into level 2 cache and higher.

 * T2 (temporal data with respect to second level cache misses)—prefetch data into level 3 cache and higher, or
an implementation-specific choice.

 *  NTA (non-temporal data with respect to all cache levels)—prefetch data into non-temporal cache structure and

into a location close to the processor, minimizing cache pollution.

The source operand is a byte memory location. (The locality hints are encoded into the machine level instruction
using bits 3 through 5 of the ModR/M byte.)

If the line selected is already present in the cache hierarchy at a level closer to the processor, no data movement
occurs. Prefetches from uncacheable or WC memory are ignored.

The PREFETCHh instruction is merely a hint and does not affect program behavior. If executed, this instruction
moves data closer to the processor in anticipation of future use.

The implementation of prefetch locality hints is implementation-dependent, and can be overloaded or ignored by a
processor implementation. The amount of data prefetched is also processor implementation-dependent. It will,
however, be a minimum of 32 bytes. Additional details of the implementation-dependent locality hints are
described in Section 7.4 of Intel® 64 and IA-32 Architectures Optimization Reference Manual.

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
FETCH (m8);
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
void _mm_prefetch(char *p, int i)
The argument “*p” gives the address of the byte (and corresponding cache line) to be prefetched. The value “i” 
gives a constant (_MM_HINT_T0, _MM_HINT_T1, _MM_HINT_T2, or _MM_HINT_NTA) that specifies the type of 
prefetch operation to be performed.
```
### Numeric Exceptions
None.

### Exceptions (All Operating Modes)

<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
