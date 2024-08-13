<b>LFENCE</b> — Load Fence
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
		<td>NP 0F AE E8</td>
		<td>LFENCE</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Serializes load operations.</td>
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
		<td>ZO</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Performs a serializing operation on all load-from-memory instructions that were issued prior the LFENCE instruction
. Specifically, LFENCE does not execute until all prior instructions have completed locally, and no later instruction
 begins execution until LFENCE completes. In particular, an instruction that loads from memory and that
precedes an LFENCE receives data from memory prior to completion of the LFENCE. (An LFENCE that follows an
instruction that stores to memory might complete before the data being stored have become globally visible.)
Instructions following an LFENCE may be fetched from memory before the LFENCE, but they will not execute until
the LFENCE completes.

Weakly ordered memory types can be used to achieve higher processor performance through such techniques as
out-of-order issue and speculative reads. The degree to which a consumer of data recognizes or knows that the
data is weakly ordered varies among applications and may be unknown to the producer of this data. The LFENCE
instruction provides a performance-efficient way of ensuring load ordering between routines that produce weakly-
ordered results and routines that consume that data.

Processors are free to fetch and cache data speculatively from regions of system memory that use the WB, WC,
and WT memory types. This speculative fetching can occur at any time and is not tied to instruction execution.
Thus, it is not ordered with respect to executions of the LFENCE instruction; data can be brought into the caches
speculatively just before, during, or after the execution of an LFENCE instruction.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

Specification of the instruction's opcode above indicates a ModR/M byte of E8. For this instruction, the processor
ignores the r/m field of the ModR/M byte. Thus, LFENCE is encoded by any opcode of the form 0F AE Ex, where x is
in the range 8-F.

### Operation

```java
Wait_On_Following_Instructions_Until(preceding_instructions_complete);
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
void _mm_lfence(void)
Exceptions (All Modes of Operation)
#UD 
If CPUID.01H:EDX.SSE2[bit 26] = 0.
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
