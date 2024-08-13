<b>SFENCE</b> — Store Fence
<table>
	<tr>
		<td><b>Opcode*</b></td>
		<td><b>Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F AE F8</td>
		<td>SFENCE</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Serializes store operations.</td>
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
Orders processor execution relative to all memory stores prior to the SFENCE instruction. The processor ensures
that every store prior to SFENCE is globally visible before any store after SFENCE becomes globally visible. The
SFENCE instruction is ordered with respect to memory stores, other SFENCE instructions, MFENCE instructions,
and any serializing instructions (such as the CPUID instruction). It is not ordered with respect to memory loads or
the LFENCE instruction.

Weakly ordered memory types can be used to achieve higher processor performance through such techniques as
out-of-order issue, write-combining, and write-collapsing. The degree to which a consumer of data recognizes or
knows that the data is weakly ordered varies among applications and may be unknown to the producer of this data.
The SFENCE instruction provides a performance-efficient way of ensuring store ordering between routines that
produce weakly-ordered results and routines that consume this data.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

Specification of the instruction's opcode above indicates a ModR/M byte of F8. For this instruction, the processor
ignores the r/m field of the ModR/M byte. Thus, SFENCE is encoded by any opcode of the form 0F AE Fx, where x
is in the range 8-F.

### Operation

```java
Wait_On_Following_Stores_Until(preceding_stores_globally_visible);
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
void _mm_sfence(void)
```
### Exceptions (All Operating Modes)

<p>#UD
If CPUID.01H:EDX.SSE[bit 25] = 0.
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
