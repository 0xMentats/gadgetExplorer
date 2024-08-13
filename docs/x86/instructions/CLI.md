<b>CLI</b> —  Clear Interrupt Flag
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
		<td>FA</td>
		<td>CLI</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Clear interrupt flag; interrupts disabled when interrupt flag cleared.</td>
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
In most cases, CLI clears the IF flag in the EFLAGS register and no other flags are affected. Clearing the IF flag
causes the processor to ignore maskable external interrupts. The IF flag and the CLI and STI instruction have no
effect on the generation of exceptions and NMI interrupts.

Operation is different in two modes defined as follows:

 *  PVI mode (protected-mode virtual interrupts): CR0.PE = 1, EFLAGS.VM = 0, CPL = 3, and CR4.PVI = 1;


 *  VME mode (virtual-8086 mode extensions): CR0.PE = 1, EFLAGS.VM = 1, and CR4.VME = 1.

If IOPL < 3 and either VME mode or PVI mode is active, CLI clears the VIF flag in the EFLAGS register, leaving IF
unaffected.

Table 3-7 indicates the action of the CLI instruction depending on the processor operating mode, IOPL, and CPL.

Table 3-7.  Decision Table for CLI Results
<table>
	<tr>
		<td><b>Mode</b></td>
		<td><b>IOPL</b></td>
		<td><b>CLI Result</b></td>
	</tr>
	<tr>
		<td>Real-address</td>
		<td>X1</td>
		<td>IF = 0</td>
	</tr>
	<tr>
		<td rowspan=2>Protected, not PVI2</td>
		<td>≥ CPL</td>
		<td>IF = 0</td>
	</tr>
	<tr>
		<td>< CPL</td>
		<td>#GP fault</td>
	</tr>
	<tr>
		<td rowspan=2>Protected, PVI3</td>
		<td>3</td>
		<td>IF = 0</td>
	</tr>
	<tr>
		<td>0–2</td>
		<td>VIF = 0</td>
	</tr>
	<tr>
		<td rowspan=2>Virtual-8086, not VME3</td>
		<td>3</td>
		<td>IF = 0</td>
	</tr>
	<tr>
		<td>0–2</td>
		<td>#GP fault</td>
	</tr>
	<tr>
		<td rowspan=2>Virtual-8086, VME3</td>
		<td>3</td>
		<td>IF = 0</td>
	</tr>
	<tr>
		<td>0–2</td>
		<td>VIF = 0</td>
	</tr>
</table>

NOTES:
1. X = This setting has no effect on instruction operation.
2. For this table, “protected mode” applies whenever CR0.PE = 1 and EFLAGS.VM = 0; it includes compatibility mode and 64-bit mode.
3. PVI mode and virtual-8086 mode each imply CPL = 3.

### Operation

```java
IF CR0.PE = 0
    THEN IF ← 0; (* Reset Interrupt Flag *)
    ELSE
        IF IOPL ≥ CPL (* CPL = 3 if EFLAGS.VM = 1 *)
            THEN IF ← 0; (* Reset Interrupt Flag *)
            ELSE
                IF VME mode OR PVI mode
                    THEN VIF ← 0; (* Reset Virtual Interrupt Flag *)
                    ELSE #GP(0);
                FI;
        FI;
FI;
```
### Flags Affected
Either the IF flag or the VIF flag is cleared to 0. Other flags are unaffected.

### Protected Mode Exceptions

<p>#GP(0)
If CPL is greater than IOPL and PVI mode is not active.
If CPL is greater than IOPL and less than 3.
<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#UD
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

<p>#GP(0)
If IOPL is less than 3 and VME mode is not active.
<p>#UD
If the LOCK prefix is used.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

Same exceptions as in protected mode.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
