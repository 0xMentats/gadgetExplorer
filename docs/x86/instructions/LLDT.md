<b>LLDT</b> — Load Local Descriptor Table Register
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
		<td>0F 00 /2</td>
		<td>LLDT r/m16</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Load segment selector r/m16 into LDTR.</td>
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
		<td>M</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Loads the source operand into the segment selector field of the local descriptor table register (LDTR). The source
operand (a general-purpose register or a memory location) contains a segment selector that points to a local
descriptor table (LDT). After the segment selector is loaded in the LDTR, the processor uses the segment selector
to locate the segment descriptor for the LDT in the global descriptor table (GDT). It then loads the segment limit
and base address for the LDT from the segment descriptor into the LDTR. The segment registers DS, ES, SS, FS,
GS, and CS are not affected by this instruction, nor is the LDTR field in the task state segment (TSS) for the current
task.

If bits 2-15 of the source operand are 0, LDTR is marked invalid and the LLDT instruction completes silently.
However, all subsequent references to descriptors in the LDT (except by the LAR, VERR, VERW or LSL instructions)
cause a general protection exception (\#GP).

The operand-size attribute has no effect on this instruction.

The LLDT instruction is provided for use in operating-system software; it should not be used in application
programs. This instruction can only be executed in protected mode or 64-bit mode.

In 64-bit mode, the operand size is fixed at 16 bits.

### Operation

```java
IF SRC(Offset) > descriptor table limit 
    THEN #GP(segment selector); FI;
IF segment selector is valid
    Read segment descriptor;
    IF SegmentDescriptor(Type) ≠ LDT 
        THEN #GP(segment selector); FI;
    IF segment descriptor is not present 
        THEN #NP(segment selector); FI;
    LDTR(SegmentSelector) ← SRC;
    LDTR(SegmentDescriptor) ← GDTSegmentDescriptor;
ELSE LDTR ← INVALID
FI;
```
### Flags Affected

None

### Protected Mode Exceptions
<p>#GP(0)
If the current privilege level is not 0.
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register contains a NULL segment selector.
<p>#GP(selector)
If the selector operand does not point into the Global Descriptor Table or if the entry in the GDT
is not a Local Descriptor Table.
Segment selector is beyond GDT limit.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#NP(selector)
If the LDT descriptor is not present.
<p>#PF(fault-code)
If a page fault occurs.
<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#UD
The LLDT instruction is not recognized in real-address mode.

### Virtual-8086 Mode Exceptions

<p>#UD
The LLDT instruction is not recognized in virtual-8086 mode.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#SS(0)
If a memory address referencing the SS segment is in a non-canonical form.
<p>#GP(0)
If the current privilege level is not 0.
If the memory address is in a non-canonical form.
<p>#GP(selector)
If the selector operand does not point into the Global Descriptor Table or if the entry in the GDT
is not a Local Descriptor Table.
Segment selector is beyond GDT limit.
<p>#NP(selector)
If the LDT descriptor is not present.
<p>#PF(fault-code)
If a page fault occurs.
<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
