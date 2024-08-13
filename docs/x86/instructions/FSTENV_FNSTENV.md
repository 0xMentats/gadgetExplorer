<b>FSTENV / FNSTENV</b> — Store x87 FPU Environment
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>9B D9 /6</td>
		<td>FSTENV m14/28byte</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Store FPU environment to m14byte or m28byte after checking for pending unmasked floating-point exceptions. Then mask all floating-point exceptions.</td>
	</tr>
	<tr>
		<td>D9 /6</td>
		<td>FNSTENV* m14/28byte</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Store FPU environment to m14byte or m28byte without checking for pending unmasked floating- point exceptions. Then mask all floating- point exceptions.</td>
	</tr>
</table>

\* See IA-32 Architecture Compatibility section below.

### Description

Saves the current FPU operating environment at the memory location specified with the destination operand, and
then masks all floating-point exceptions. The FPU operating environment consists of the FPU control word, status
word, tag word, instruction pointer, data pointer, and last opcode. Figures 8-9 through 8-12 in the Intel® 64 and
IA-32 Architectures Software Developer’s Manual, Volume 1, show the layout in memory of the stored environ-
ment, depending on the operating mode of the processor (protected or real) and the current operand-size attribute
(16-bit or 32-bit). In virtual-8086 mode, the real mode layouts are used.

The FSTENV instruction checks for and handles any pending unmasked floating-point exceptions before storing
the FPU environment; the FNSTENV instruction does not. The saved image reflects the state of the FPU after all
floating-point instructions preceding the FSTENV/FNSTENV instruction in the instruction stream have been
executed.

These instructions are often used by exception handlers because they provide access to the FPU instruction and
data pointers. The environment is typically saved in the stack. Masking all exceptions after saving the environment
prevents floating-point exceptions from interrupting the exception handler.

The assembler issues two instructions for the FSTENV instruction (an FWAIT instruction followed by an FNSTENV
instruction), and the processor executes each of these instructions separately. If an exception is generated for
either of these instructions, the save EIP points to the instruction that caused the exception.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### IA-32 Architecture Compatibility

When operating a Pentium or Intel486 processor in MS-DOS compatibility mode, it is possible (under unusual
circumstances) for an FNSTENV instruction to be interrupted prior to being executed to handle a pending FPU
exception. See the section titled “No-Wait FPU Instructions Can Get FPU Interrupt in Window” in Appendix D of the
Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 1, for a description of these circum-
stances. An FNSTENV instruction cannot be interrupted in this way on later Intel processors, except for the Intel
QuarkTM X1000 processor.

### Operation

```java
DEST[FPUControlWord] ← FPUControlWord;
DEST[FPUStatusWord] ← FPUStatusWord;
DEST[FPUTagWord] ← FPUTagWord;
DEST[FPUDataPointer] ← FPUDataPointer;
DEST[FPUInstructionPointer] ← FPUInstructionPointer;
DEST[FPULastInstructionOpcode] ← FPULastInstructionOpcode;
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