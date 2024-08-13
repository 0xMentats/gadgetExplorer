<b>FLDENV</b> — Load x87 FPU Environment
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D9 /4</td>
		<td>FLDENV m14/28byte</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Load FPU environment from m14byte or m28byte.</td>
	</tr>
</table>


### Description
Loads the complete x87 FPU operating environment from memory into the FPU registers. The source operand spec-
ifies the first byte of the operating-environment data in memory. This data is typically written to the specified
memory location by a FSTENV or FNSTENV instruction.

The FPU operating environment consists of the FPU control word, status word, tag word, instruction pointer, data
pointer, and last opcode. Figures 8-9 through 8-12 in the Intel® 64 and IA-32 Architectures Software Developer’s
Manual, Volume 1, show the layout in memory of the loaded environment, depending on the operating mode of the
processor (protected or real) and the current operand-size attribute (16-bit or 32-bit). In virtual-8086 mode, the
real mode layouts are used.

The FLDENV instruction should be executed in the same operating mode as the corresponding FSTENV/FNSTENV
instruction.

If one or more unmasked exception flags are set in the new FPU status word, a floating-point exception will be
generated upon execution of the next floating-point instruction (except for the no-wait floating-point instructions,
see the section titled “Software Exception Handling” in Chapter 8 of the Intel® 64 and IA-32 Architectures Soft-
ware Developer’s Manual, Volume 1). To avoid generating exceptions when loading a new environment, clear all
the exception flags in the FPU status word that is being loaded.

If a page or limit fault occurs during the execution of this instruction, the state of the x87 FPU registers as seen by
the fault handler may be different than the state being loaded from memory. In such situations, the fault handler
should ignore the status of the x87 FPU registers, handle the fault, and return. The FLDENV instruction will then
complete the loading of the x87 FPU registers with no resulting context inconsistency.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
FPUControlWord ← SRC[FPUControlWord];
FPUStatusWord ← SRC[FPUStatusWord];
FPUTagWord ← SRC[FPUTagWord];
FPUDataPointer ← SRC[FPUDataPointer];
FPUInstructionPointer ← SRC[FPUInstructionPointer];
FPULastInstructionOpcode ← SRC[FPULastInstructionOpcode];
```
### FPU Flags Affected

The C0, C1, C2, C3 flags are loaded.

### Floating-Point Exceptions

None; however, if an unmasked exception is loaded in the status word, it is generated upon execution of the next
“waiting” floating-point instruction.

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