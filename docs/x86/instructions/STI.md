<b>STI</b> — Set Interrupt Flag
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
		<td>FB</td>
		<td>STI</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set interrupt flag; external, maskable interrupts enabled at the end of the next instruction.</td>
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
In most cases, STI sets the interrupt flag (IF) in the EFLAGS register. This allows the processor to respond to maskable
hardware interrupts.

If IF = 0, maskable hardware interrupts remain inhibited on the instruction boundary following an execution of STI.
(The delayed effect of this instruction is provided to allow interrupts to be enabled just before returning from a
procedure or subroutine. For instance, if an STI instruction is followed by an RET instruction, the RET instruction is
allowed to execute before external interrupts are recognized. No interrupts can be recognized if an execution of CLI
immediately follow such an execution of STI.) The inhibition ends after delivery of another event (e.g., exception)
or the execution of the next instruction.

The IF flag and the STI and CLI instructions do not prohibit the generation of exceptions and nonmaskable inter-
rupts (NMIs). However, NMIs (and system-management interrupts) may be inhibited on the instruction boundary
following an execution of STI that begins with IF = 0.

Operation is different in two modes defined as follows:

 *  PVI mode (protected-mode virtual interrupts): CR0.PE = 1, EFLAGS.VM = 0, CPL = 3, and CR4.PVI = 1;

 *  VME mode (virtual-8086 mode extensions): CR0.PE = 1, EFLAGS.VM = 1, and CR4.VME = 1.

If IOPL < 3, EFLAGS.VIP = 1, and either VME mode or PVI mode is active, STI sets the VIF flag in the EFLAGS
register, leaving IF unaffected.

Table 4-19 indicates the action of the STI instruction depending on the processor operating mode, IOPL, CPL, and
EFLAGS.VIP.

Table 4-19.  Decision Table for STI Results
<table>
	<tr>
		<td><b>Mode</b></td>
		<td><b>IOPL</b></td>
		<td><b>EFLAGS.VIP</b></td>
		<td><b>STI Result</b></td>
	</tr>
	<tr>
		<td>Real-address</td>
		<td>X1</td>
		<td>X</td>
		<td>IF = 1</td>
	</tr>
	<tr>
		<td rowspan=2>Protected, not PVI2</td>
		<td>≥ CPL</td>
		<td>X</td>
		<td>IF = 1</td>
	</tr>
	<tr>
		<td>< CPL</td>
		<td>X</td>
		<td>#GP fault</td>
	</tr>
	<tr>
		<td rowspan=3>Protected, PVI3</td>
		<td>3</td>
		<td>X</td>
		<td>IF = 1</td>
	</tr>
	<tr>
		<td rowspan=2>0–2</td>
		<td>0</td>
		<td>VIF = 1</td>
	</tr>
	<tr>
		<td>1</td>
		<td>#GP fault</td>
	</tr>
	<tr>
		<td rowspan=2>Virtual-8086, not VME3</td>
		<td>3</td>
		<td>X</td>
		<td>IF = 1</td>
	</tr>
	<tr>
		<td>0–2</td>
		<td>X</td>
		<td>#GP fault</td>
	</tr>
	<tr>
		<td rowspan=3>Virtual-8086, VME3</td>
		<td>3</td>
		<td>X</td>
		<td>IF = 1</td>
	</tr>
	<tr>
		<td rowspan=2>0–2</td>
		<td>0</td>
		<td>VIF = 1</td>
	</tr>
	<tr>
		<td>1</td>
		<td>#GP fault</td>
	</tr>
</table>

NOTES:
1. X = This setting has no effect on instruction operation.
2. For this table, “protected mode” applies whenever CR0.PE = 1 and EFLAGS.VM = 0; it includes compatibility mode and 64-bit mode.
3. PVI mode and virtual-8086 mode each imply CPL = 3.

### Operation

```java
IF CR0.PE = 0  (* Executing in real-address mode *)
    THEN IF ← 1; (* Set Interrupt Flag *)
    ELSE
        IF IOPL ≥ CPL (* CPL = 3 if EFLAGS.VM = 1 *)
            THEN IF ← 1; (* Set Interrupt Flag *)
            ELSE
                IF VME mode OR PVI mode
                    THEN
                        IF EFLAGS.VIP = 0
                            THEN VIF ← 1; (* Set Virtual Interrupt Flag *)
                            ELSE #GP(0); 
                        FI;
                    ELSE #GP(0); 
                FI;
        FI;
FI;
```
### Flags Affected

Either the IF flag or the VIF flag is set to 1. Other flags are unaffected.

### Protected Mode Exceptions

<p>#GP(0)
If CPL is greater than IOPL and PVI mode is not active.
If CPL is greater than IOPL and EFLAGS.VIP = 1.
<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#UD
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

<p>#GP(0)
If IOPL is less than 3 and VME mode is not active.
If IOPL is less than 3 and EFLAGS.VIP = 1.
<p>#UD
If the LOCK prefix is used.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

Same exceptions as in protected mode.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
