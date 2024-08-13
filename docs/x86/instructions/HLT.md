<b>HLT</b> — Halt
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
		<td>F4</td>
		<td>HLT</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Halt</td>
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
Stops instruction execution and places the processor in a HALT state. An enabled interrupt (including NMI and
SMI), a debug exception, the BINIT\# signal, the INIT\# signal, or the RESET\# signal will resume execution. If an
interrupt (including NMI) is used to resume execution after a HLT instruction, the saved instruction pointer
(CS:EIP) points to the instruction following the HLT instruction.

When a HLT instruction is executed on an Intel 64 or IA-32 processor supporting Intel Hyper-Threading Technology,
only the logical processor that executes the instruction is halted. The other logical processors in the physical
processor remain active, unless they are each individually halted by executing a HLT instruction.

The HLT instruction is a privileged instruction. When the processor is running in protected or virtual-8086 mode,
the privilege level of a program or procedure must be 0 to execute the HLT instruction.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
Enter Halt state;
```
### Flags Affected

None

### Protected Mode Exceptions

<p>#GP(0)
If the current privilege level is not 0.
<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

None.

### Virtual-8086 Mode Exceptions

Same exceptions as in protected mode.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

Same exceptions as in protected mode.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
