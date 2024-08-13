<b>LAR</b> — Load Access Rights Byte
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
		<td>0F 02 /r</td>
		<td>LAR r16, r16/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>r16 ← access rights referenced by r16/m16</td>
	</tr>
	<tr>
		<td>0F 02 /r</td>
		<td>LAR reg, r32/m16*</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>reg ← access rights referenced by r32/m16</td>
	</tr>
</table>
Note: /* For all loads (regardless of source or destination sizing) only bits 16-0 are used. Other bits are ignored.

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
		<td>RM</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Loads the access rights from the segment descriptor specified by the second operand (source operand) into the
first operand (destination operand) and sets the ZF flag in the flag register. The source operand (which can be a
register or a memory location) contains the segment selector for the segment descriptor being accessed. If the
source operand is a memory address, only 16 bits of data are accessed. The destination operand is a general-
purpose register.

The processor performs access checks as part of the loading process. Once loaded in the destination register, soft-
ware can perform additional checks on the access rights information.

The access rights for a segment descriptor include fields located in the second doubleword (bytes 4–7) of the
segment descriptor. The following fields are loaded by the LAR instruction:

 *  Bits 7:0 are returned as 0

 *  Bits 11:8 return the segment type.

 *  Bit 12 returns the S flag.

 *  Bits 14:13 return the DPL.

 *  Bit 15 returns the P flag.

 * The following fields are returned only if the operand size is greater than 16 bits:

— Bits 19:16 are undefined.

— Bit 20 returns the software-available bit in the descriptor.

— Bit 21 returns the L flag.

— Bit 22 returns the D/B flag.

— Bit 23 returns the G flag.

— Bits 31:24 are returned as 0.

This instruction performs the following checks before it loads the access rights in the destination register:

 *  Checks that the segment selector is not NULL.

 *  Checks that the segment selector points to a descriptor that is within the limits of the GDT or LDT being

accessed

 *  Checks that the descriptor type is valid for this instruction. All code and data segment descriptors are valid for

(can be accessed with) the LAR instruction. The valid system segment and gate descriptor types are given in
Table 3-52.

 * If the segment is not a conforming code segment, it checks that the specified segment descriptor is visible at
the CPL (that is, if the CPL and the RPL of the segment selector are less than or equal to the DPL of the segment
selector).

If the segment descriptor cannot be accessed or is an invalid type for the instruction, the ZF flag is cleared and no
access rights are loaded in the destination operand.
The LAR instruction can only be executed in protected mode and IA-32e mode.

Table 3-52.  Segment and Gate Types
<table>
	<tr>
		<td rowspan=2><b>Type</b></td>
		<td colspan=2><b>Protected Mode</b></td>
		<td colspan=2><b>IA-32e Mode</b></td>
	</tr>
	<tr>
		<td>Name</td>
		<td>Valid</td>
		<td>Name</td>
		<td>Valid</td>
	</tr>
	<tr>
		<td>0 1 2 3 4 5 6 7 8 9 A B C D E F</td>
		<td>Reserved Available 16-bit TSS LDT Busy 16-bit TSS 16-bit call gate 16-bit/32-bit task gate 16-bit interrupt gate 16-bit trap gate Reserved Available 32-bit TSS Reserved Busy 32-bit TSS 32-bit call gate Reserved 32-bit interrupt gate 32-bit trap gate</td>
		<td>No Yes Yes Yes Yes Yes No No No Yes No Yes Yes No No No</td>
		<td>Reserved Reserved LDT Reserved Reserved Reserved Reserved Reserved Reserved Available 64-bit TSS Reserved Busy 64-bit TSS 64-bit call gate Reserved 64-bit interrupt gate 64-bit trap gate</td>
		<td>No No Yes No No No No No No Yes No Yes Yes No No No</td>
	</tr>
</table>


### Operation

```java
IF Offset(SRC) > descriptor table limit
    THEN 
        ZF ← 0; 
    ELSE
        SegmentDescriptor ← descriptor referenced by SRC;
        IF SegmentDescriptor(Type) ≠ conforming code segment
        and (CPL > DPL) or (RPL > DPL)
        or SegmentDescriptor(Type) is not valid for instruction
            THEN
                ZF ← 0;
            ELSE
                DEST ← access rights from SegmentDescriptor as given in Description section;
                ZF ← 1;
        FI;
FI;
```
### Flags Affected
The ZF flag is set to 1 if the access rights are loaded successfully; otherwise, it is cleared to 0.

### Protected Mode Exceptions
<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register is used to access memory and it contains a NULL segment
selector.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and the memory operand effective address is unaligned while
the current privilege level is 3.
<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#UD
The LAR instruction is not recognized in real-address mode.

### Virtual-8086 Mode Exceptions

<p>#UD
The LAR instruction cannot be executed in virtual-8086 mode.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#SS(0)
If the memory operand effective address referencing the SS segment is in a non-canonical
form.
<p>#GP(0)
If the memory operand effective address is in a non-canonical form.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and the memory operand effective address is unaligned while
the current privilege level is 3.
<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
