<b>LEAVE</b> — High Level Procedure Exit
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
		<td>C9</td>
		<td>LEAVE</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set SP to BP, then pop BP.</td>
	</tr>
	<tr>
		<td>C9</td>
		<td>LEAVE</td>
		<td>ZO</td>
		<td>N.E.</td>
		<td>Valid</td>
		<td>Set ESP to EBP, then pop EBP.</td>
	</tr>
	<tr>
		<td>C9</td>
		<td>LEAVE</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set RSP to RBP, then pop RBP.</td>
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
Releases the stack frame set up by an earlier ENTER instruction. The LEAVE instruction copies the frame pointer (in
the EBP register) into the stack pointer register (ESP), which releases the stack space allocated to the stack frame.
The old frame pointer (the frame pointer for the calling procedure that was saved by the ENTER instruction) is then
popped from the stack into the EBP register, restoring the calling procedure’s stack frame.

A RET instruction is commonly executed following a LEAVE instruction to return program control to the calling
procedure.

See “Procedure Calls for Block-Structured Languages” in Chapter 7 of the Intel® 64 and IA-32 Architectures Soft-
ware Developer’s Manual, Volume 1, for detailed information on the use of the ENTER and LEAVE instructions.

In 64-bit mode, the instruction’s default operation size is 64 bits; 32-bit operation cannot be encoded. See the
summary chart at the beginning of this section for encoding data and limits.

### Operation

```java
IF StackAddressSize = 32
    THEN
        ESP ← EBP;
    ELSE IF StackAddressSize = 64
        THEN RSP ← RBP; FI;
    ELSE IF StackAddressSize = 16
        THEN SP ← BP; FI;
FI;
IF OperandSize = 32
    THEN EBP ← Pop();
    ELSE IF OperandSize = 64
        THEN RBP ← Pop(); FI;
    ELSE IF OperandSize = 16
        THEN BP ← Pop(); FI;
FI;
```
### Flags Affected

None

### Protected Mode Exceptions
<p>#SS(0)
If the EBP register points to a location that is not within the limits of the current stack
segment.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.
<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#GP
If the EBP register points to a location outside of the effective address space from 0 to FFFFH.
<p>#UD
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

<p>#GP(0)
If the EBP register points to a location outside of the effective address space from 0 to FFFFH.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made.
<p>#UD
If the LOCK prefix is used.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#SS(0)
If the stack address is in a non-canonical form.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.
<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
