<b>FINCSTP</b> — Increment Stack-Top Pointer
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D9 F7</td>
		<td>FINCSTP</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Increment the TOP field in the FPU status register.</td>
	</tr>
</table>


### Description
Adds one to the TOP field of the FPU status word (increments the top-of-stack pointer). If the TOP field contains a
7, it is set to 0. The effect of this instruction is to rotate the stack by one position. The contents of the FPU data
registers and tag register are not affected. This operation is not equivalent to popping the stack, because the tag
for the previous top-of-stack register is not marked empty.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
IF TOP = 7
    THEN TOP ← 0;
    ELSE TOP ← TOP + 1;
FI;
```
### FPU Flags Affected

The C1 flag is set to 0. The C0, C2, and C3 flags are undefined.

### Floating-Point Exceptions

None

### Protected Mode Exceptions

<p>#NM
CR0.EM[bit 2] or CR0.TS[bit 3] = 1.
<p>#MF
If there is a pending x87 FPU exception.
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