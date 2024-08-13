<b>FLDCW</b> — Load x87 FPU Control Word
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D9 /5</td>
		<td>FLDCW m2byte</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Load FPU control word from m2byte.</td>
	</tr>
</table>


### Description
Loads the 16-bit source operand into the FPU control word. The source operand is a memory location. This instruction
 is typically used to establish or change the FPU’s mode of operation.

If one or more exception flags are set in the FPU status word prior to loading a new FPU control word and the new
control word unmasks one or more of those exceptions, a floating-point exception will be generated upon execution
of the next floating-point instruction (except for the no-wait floating-point instructions, see the section titled “Soft-
ware Exception Handling” in Chapter 8 of the Intel® 64 and IA-32 Architectures Software Developer’s Manual,
Volume 1). To avoid raising exceptions when changing FPU operating modes, clear any pending exceptions (using
the FCLEX or FNCLEX instruction) before loading the new control word.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
FPUControlWord ← SRC;
```
### FPU Flags Affected

C0, C1, C2, C3 undefined.

### Floating-Point Exceptions

None; however, this operation might unmask a pending exception in the FPU status word. That exception is then
generated upon execution of the next “waiting” floating-point instruction.

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register is used to access memory and it contains a NULL segment
selector.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#NM
CR0.EM[bit 2] or CR0.TS[bit 3] = 1.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.
<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#GP
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS
If a memory operand effective address is outside the SS segment limit.
<p>#NM
CR0.EM[bit 2] or CR0.TS[bit 3] = 1.
<p>#UD
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions
<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#NM
CR0.EM[bit 2] or CR0.TS[bit 3] = 1.
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
If a memory address referencing the SS segment is in a non-canonical form.
<p>#GP(0)
If the memory address is in a non-canonical form.
<p>#NM
CR0.EM[bit 2] or CR0.TS[bit 3] = 1.
<p>#MF
If there is a pending x87 FPU exception.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.
<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
