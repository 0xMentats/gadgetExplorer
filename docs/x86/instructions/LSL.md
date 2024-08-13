<b>LSL</b> — Load Segment Limit
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
		<td>0F 03 /r</td>
		<td>LSL r16, r16/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Load: r16 ← segment limit, selector r16/m16.</td>
	</tr>
	<tr>
		<td>0F 03 /r</td>
		<td>LSL r32, r32/m16*</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Load: r32 ← segment limit, selector r32/m16.</td>
	</tr>
	<tr>
		<td>REX.W + 0F 03 /r</td>
		<td>LSL r64, r32/m16*</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Load: r64 ← segment limit, selector r32/m16</td>
	</tr>
</table>

\* For all loads (regardless of destination sizing), only bits 16-0 are used. Other bits are ignored.

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
Loads the unscrambled segment limit from the segment descriptor specified with the second operand (source
operand) into the first operand (destination operand) and sets the ZF flag in the EFLAGS register. The source
operand (which can be a register or a memory location) contains the segment selector for the segment descriptor
being accessed. The destination operand is a general-purpose register.

The processor performs access checks as part of the loading process. Once loaded in the destination register, soft-
ware can compare the segment limit with the offset of a pointer.

The segment limit is a 20-bit value contained in bytes 0 and 1 and in the first 4 bits of byte 6 of the segment
descriptor. If the descriptor has a byte granular segment limit (the granularity flag is set to 0), the destination
operand is loaded with a byte granular value (byte limit). If the descriptor has a page granular segment limit (the
granularity flag is set to 1), the LSL instruction will translate the page granular limit (page limit) into a byte limit
before loading it into the destination operand. The translation is performed by shifting the 20-bit “raw” limit left 12
bits and filling the low-order 12 bits with 1s.

When the operand size is 32 bits, the 32-bit byte limit is stored in the destination operand. When the operand size
is 16 bits, a valid 32-bit limit is computed; however, the upper 16 bits are truncated and only the low-order 16 bits
are loaded into the destination operand.

This instruction performs the following checks before it loads the segment limit into the destination register:

 *  Checks that the segment selector is not NULL.

 *  Checks that the segment selector points to a descriptor that is within the limits of the GDT or LDT being

accessed

 *  Checks that the descriptor type is valid for this instruction. All code and data segment descriptors are valid for

(can be accessed with) the LSL instruction. The valid special segment and gate descriptor types are given in the
following table.

 * If the segment is not a conforming code segment, the instruction checks that the specified segment descriptor
is visible at the CPL (that is, if the CPL and the RPL of the segment selector are less than or equal to the DPL of
the segment selector).

If the segment descriptor cannot be accessed or is an invalid type for the instruction, the ZF flag is cleared and no
value is loaded in the destination operand.
Table 3-55.  Segment and Gate Descriptor Types
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
		<td>No Yes Yes Yes No No No No No Yes No Yes No No No No</td>
		<td>Reserved Reserved LDT1 Reserved Reserved Reserved Reserved Reserved Reserved 64-bit TSS1 Reserved Busy 64-bit TSS1 64-bit call gate Reserved 64-bit interrupt gate 64-bit trap gate</td>
		<td>No No Yes No No No No No No Yes No Yes No No No No</td>
	</tr>
</table>

NOTES:
1. In this case, the descriptor comprises 16 bytes; bits 12:8 of the upper 4 bytes must be 0.

### Operation

```java
IF SRC(Offset) > descriptor table limit
    THEN ZF ← 0; FI;
Read segment descriptor;
IF SegmentDescriptor(Type) ≠ conforming code segment
and (CPL > DPL) OR (RPL > DPL)
or Segment type is not valid for instruction
        THEN
            ZF ← 0;
        ELSE
            temp ← SegmentLimit([SRC]);
            IF (G ← 1)
                THEN temp ← ShiftLeft(12, temp) OR 00000FFFH;
            ELSE IF OperandSize = 32 
                THEN DEST ← temp; FI;
            ELSE IF OperandSize = 64 (* REX.W used *)
                THEN DEST (* Zero-extended *) ← temp; FI;
            ELSE (* OperandSize = 16 *)
                DEST ← temp AND FFFFH;
            FI;
FI;
```
### Flags Affected
The ZF flag is set to 1 if the segment limit is loaded successfully; otherwise, it is set to 0.

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
The LSL instruction cannot be executed in real-address mode.

### Virtual-8086 Mode Exceptions

<p>#UD
The LSL instruction cannot be executed in virtual-8086 mode.

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