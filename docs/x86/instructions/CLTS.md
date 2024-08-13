<b>CLTS</b> — Clear Task-Switched Flag in CR0
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64-bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>0F 06</td>
		<td>CLTS</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Clears TS flag in CR0.</td>
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
Clears the task-switched (TS) flag in the CR0 register. This instruction is intended for use in operating-system
procedures. It is a privileged instruction that can only be executed at a CPL of 0. It is allowed to be executed in real-
address mode to allow initialization for protected mode.

The processor sets the TS flag every time a task switch occurs. The flag is used to synchronize the saving of FPU
context in multitasking applications. See the description of the TS flag in the section titled “Control Registers” in
Chapter 2 of the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 3A, for more information
about this flag.

CLTS operation is the same in non-64-bit modes and 64-bit mode.

See Chapter 25, “VMX Non-Root Operation,” of the Intel® 64 and IA-32 Architectures Software Developer’s
Manual, Volume 3C, for more information about the behavior of this instruction in VMX non-root operation.

### Operation

```java
CR0.TS[bit 3] ← 0;
```
### Flags Affected

The TS flag in CR0 register is cleared.

### Protected Mode Exceptions

<p>#GP(0)
If the current privilege level is not 0.
<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#UD
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

<p>#GP(0)
CLTS is not recognized in virtual-8086 mode.
<p>#UD
If the LOCK prefix is used.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#GP(0)
If the CPL is greater than 0.
<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
