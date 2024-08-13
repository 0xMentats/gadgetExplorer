<b>PAUSE</b> — Spin Loop Hint
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
		<td>F3 90</td>
		<td>PAUSE</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Gives hint to processor that improves performance of spin-wait loops.</td>
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
Improves the performance of spin-wait loops. When executing a “spin-wait loop,” processors will suffer a severe
performance penalty when exiting the loop because it detects a possible memory order violation. The PAUSE
instruction provides a hint to the processor that the code sequence is a spin-wait loop. The processor uses this hint
to avoid the memory order violation in most situations, which greatly improves processor performance. For this
reason, it is recommended that a PAUSE instruction be placed in all spin-wait loops.

An additional function of the PAUSE instruction is to reduce the power consumed by a processor while executing a
spin loop. A processor can execute a spin-wait loop extremely quickly, causing the processor to consume a lot of
power while it waits for the resource it is spinning on to become available. Inserting a pause instruction in a spin-
wait loop greatly reduces the processor’s power consumption.

This instruction was introduced in the Pentium 4 processors, but is backward compatible with all IA-32 processors.
In earlier IA-32 processors, the PAUSE instruction operates like a NOP instruction. The Pentium 4 and Intel Xeon
processors implement the PAUSE instruction as a delay. The delay is finite and can be zero for some processors.
This instruction does not change the architectural state of the processor (that is, it performs essentially a delaying
no-op operation).

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
Execute_Next_Instruction(DELAY);
```
### Numeric Exceptions

None.

### Exceptions (All Operating Modes)

<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
