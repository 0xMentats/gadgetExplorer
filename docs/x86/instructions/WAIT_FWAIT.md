<b>WAIT / FWAIT</b> — Wait
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
		<td>9B</td>
		<td>WAIT</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Check pending unmasked floating-point exceptions.</td>
	</tr>
	<tr>
		<td>9B</td>
		<td>FWAIT</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Check pending unmasked floating-point exceptions.</td>
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
Causes the processor to check for and handle pending, unmasked, floating-point exceptions before proceeding.
(FWAIT is an alternate mnemonic for WAIT.)

This instruction is useful for synchronizing exceptions in critical sections of code. Coding a WAIT instruction after a
floating-point instruction ensures that any unmasked floating-point exceptions the instruction may raise are
handled before the processor can modify the instruction’s results. See the section titled “Floating-Point Exception
Synchronization” in Chapter 8 of the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 1,
for more information on using the WAIT/FWAIT instruction.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
CheckForPendingUnmaskedFloatingPointExceptions;
```
### FPU Flags Affected

The C0, C1, C2, and C3 flags are undefined.

### Floating-Point Exceptions

None.

### Protected Mode Exceptions

<p>#NM
If CR0.MP[bit 1] = 1 and CR0.TS[bit 3] = 1.
<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

Same exceptions as in protected mode.

### Virtual-8086 Mode Exceptions

Same exceptions as in protected mode.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

Same exceptions as in protected mode.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
