<b>FSTSW / FNSTSW</b> — Store x87 FPU Status Word
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>9B DD /7</td>
		<td>FSTSW m2byte</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Store FPU status word at m2byte after checking for pending unmasked floating-point exceptions.</td>
	</tr>
	<tr>
		<td>9B DF E0</td>
		<td>FSTSW AX</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Store FPU status word in AX register after checking for pending unmasked floating-point exceptions.</td>
	</tr>
	<tr>
		<td>DD /7</td>
		<td>FNSTSW* m2byte</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Store FPU status word at m2byte without checking for pending unmasked floating-point exceptions.</td>
	</tr>
	<tr>
		<td>DF E0</td>
		<td>FNSTSW* AX</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Store FPU status word in AX register without checking for pending unmasked floating-point exceptions.</td>
	</tr>
</table>

\* See IA-32 Architecture Compatibility section below.

### Description

Stores the current value of the x87 FPU status word in the destination location. The destination operand can be
either a two-byte memory location or the AX register. The FSTSW instruction checks for and handles pending
unmasked floating-point exceptions before storing the status word; the FNSTSW instruction does not.

The FNSTSW AX form of the instruction is used primarily in conditional branching (for instance, after an FPU
comparison instruction or an FPREM, FPREM1, or FXAM instruction), where the direction of the branch depends on
the state of the FPU condition code flags. (See the section titled “Branching and Conditional Moves on FPU Condi-
tion Codes” in Chapter 8 of the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 1.) This
instruction can also be used to invoke exception handlers (by examining the exception flags) in environments that
do not use interrupts. When the FNSTSW AX instruction is executed, the AX register is updated before the
processor executes any further instructions. The status stored in the AX register is thus guaranteed to be from the
completion of the prior FPU instruction.

The assembler issues two instructions for the FSTSW instruction (an FWAIT instruction followed by an FNSTSW
instruction), and the processor executes each of these instructions separately. If an exception is generated for
either of these instructions, the save EIP points to the instruction that caused the exception.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### IA-32 Architecture Compatibility

When operating a Pentium or Intel486 processor in MS-DOS compatibility mode, it is possible (under unusual
circumstances) for an FNSTSW instruction to be interrupted prior to being executed to handle a pending FPU
exception. See the section titled “No-Wait FPU Instructions Can Get FPU Interrupt in Window” in Appendix D of the
Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 1, for a description of these circum-
stances. An FNSTSW instruction cannot be interrupted in this way on later Intel processors, except for the Intel
QuarkTM X1000 processor.

### Operation

```java
DEST ← FPUStatusWord;
```
### FPU Flags Affected

The C0, C1, C2, and C3 are undefined.

### Floating-Point Exceptions

None

### Protected Mode Exceptions
<p>#GP(0)
If the destination is located in a non-writable segment.
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