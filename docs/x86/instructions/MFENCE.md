<b>MFENCE</b> — Memory Fence
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
		<td>NP 0F AE F0</td>
		<td>MFENCE</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Serializes load and store operations.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En ZO Operand 1 NA Operand 2 NA Operand 3 NA Operand 4 NA</b></td>
	</tr>
</table>


### Description
Performs a serializing operation on all load-from-memory and store-to-memory instructions that were issued prior
the MFENCE instruction. This serializing operation guarantees that every load and store instruction that precedes
the MFENCE instruction in program order becomes globally visible before any load or store instruction that follows
the MFENCE instruction.1 The MFENCE instruction is ordered with respect to all load and store instructions, other
MFENCE instructions, any LFENCE and SFENCE instructions, and any serializing instructions (such as the CPUID
instruction). MFENCE does not serialize the instruction stream.

Weakly ordered memory types can be used to achieve higher processor performance through such techniques as
out-of-order issue, speculative reads, write-combining, and write-collapsing. The degree to which a consumer of
data recognizes or knows that the data is weakly ordered varies among applications and may be unknown to the
producer of this data. The MFENCE instruction provides a performance-efficient way of ensuring load and store
ordering between routines that produce weakly-ordered results and routines that consume that data.

Processors are free to fetch and cache data speculatively from regions of system memory that use the WB, WC, and
WT memory types. This speculative fetching can occur at any time and is not tied to instruction execution. Thus, it
is not ordered with respect to executions of the MFENCE instruction; data can be brought into the caches specula-
tively just before, during, or after the execution of an MFENCE instruction.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

Specification of the instruction's opcode above indicates a ModR/M byte of F0. For this instruction, the processor
ignores the r/m field of the ModR/M byte. Thus, MFENCE is encoded by any opcode of the form 0F AE Fx, where x
is in the range 0-7.

### Operation

```java
Wait_On_Following_Loads_And_Stores_Until(preceding_loads_and_stores_globally_visible);
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
void _mm_mfence(void)
Exceptions (All Modes of Operation)
#UD 
If CPUID.01H:EDX.SSE2[bit 26] = 0.
If the LOCK prefix is used.
1. A load instruction is considered to become globally visible when the value to be loaded into its destination register is determined.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
