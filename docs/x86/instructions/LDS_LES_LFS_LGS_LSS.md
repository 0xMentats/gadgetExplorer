<b>LDS / LES / LFS / LGS / LSS</b> — Load Far Pointer
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
		<td>C5 /r</td>
		<td>LDS r16,m16:16</td>
		<td>RM Invalid</td>
		<td></td>
		<td>Valid</td>
		<td>Load DS:r16 with far pointer from memory.</td>
	</tr>
	<tr>
		<td>C5 /r</td>
		<td>LDS r32,m16:32</td>
		<td>RM Invalid</td>
		<td></td>
		<td>Valid</td>
		<td>Load DS:r32 with far pointer from memory.</td>
	</tr>
	<tr>
		<td>0F B2 /r</td>
		<td>LSS r16,m16:16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Load SS:r16 with far pointer from memory.</td>
	</tr>
	<tr>
		<td>0F B2 /r</td>
		<td>LSS r32,m16:32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Load SS:r32 with far pointer from memory.</td>
	</tr>
	<tr>
		<td>REX + 0F B2 /r</td>
		<td>LSS r64,m16:64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Load SS:r64 with far pointer from memory.</td>
	</tr>
	<tr>
		<td>C4 /r</td>
		<td>LES r16,m16:16</td>
		<td>RM Invalid</td>
		<td></td>
		<td>Valid</td>
		<td>Load ES:r16 with far pointer from memory.</td>
	</tr>
	<tr>
		<td>C4 /r</td>
		<td>LES r32,m16:32</td>
		<td>RM Invalid</td>
		<td></td>
		<td>Valid</td>
		<td>Load ES:r32 with far pointer from memory.</td>
	</tr>
	<tr>
		<td>0F B4 /r</td>
		<td>LFS r16,m16:16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Load FS:r16 with far pointer from memory.</td>
	</tr>
	<tr>
		<td>0F B4 /r</td>
		<td>LFS r32,m16:32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Load FS:r32 with far pointer from memory.</td>
	</tr>
	<tr>
		<td>REX + 0F B4 /r</td>
		<td>LFS r64,m16:64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Load FS:r64 with far pointer from memory.</td>
	</tr>
	<tr>
		<td>0F B5 /r</td>
		<td>LGS r16,m16:16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Load GS:r16 with far pointer from memory.</td>
	</tr>
	<tr>
		<td>0F B5 /r</td>
		<td>LGS r32,m16:32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Load GS:r32 with far pointer from memory.</td>
	</tr>
	<tr>
		<td>REX + 0F B5 /r</td>
		<td>LGS r64,m16:64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Load GS:r64 with far pointer from memory.</td>
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
		<td>RM</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Loads a far pointer (segment selector and offset) from the second operand (source operand) into a segment
register and the first operand (destination operand). The source operand specifies a 48-bit or a 32-bit pointer in
memory depending on the current setting of the operand-size attribute (32 bits or 16 bits, respectively). The
instruction opcode and the destination operand specify a segment register/general-purpose register pair. The 16-
bit segment selector from the source operand is loaded into the segment register specified with the opcode (DS,
SS, ES, FS, or GS). The 32-bit or 16-bit offset is loaded into the register specified with the destination operand.

If one of these instructions is executed in protected mode, additional information from the segment descriptor
pointed to by the segment selector in the source operand is loaded in the hidden part of the selected segment
register.

Also in protected mode, a NULL selector (values 0000 through 0003) can be loaded into DS, ES, FS, or GS registers
without causing a protection exception. (Any subsequent reference to a segment whose corresponding segment
register is loaded with a NULL selector, causes a general-protection exception (\#GP) and no memory reference to
the segment occurs.)

In 64-bit mode, the instruction’s default operation size is 32 bits. Using a REX prefix in the form of REX.W promotes
operation to specify a source operand referencing an 80-bit pointer (16-bit selector, 64-bit offset) in memory. Using
a REX prefix in the form of REX.R permits access to additional registers (R8-R15). See the summary chart at the
beginning of this section for encoding data and limits.

### Operation

```java
64-BIT_MODE
    IF SS is loaded 
        THEN 
            IF SegmentSelector = NULL and ( (RPL = 3) or 
                    (RPL ≠ 3 and RPL ≠ CPL) )
                THEN #GP(0);
            ELSE IF descriptor is in non-canonical space
                THEN #GP(0); FI;
            ELSE IF Segment selector index is not within descriptor table limits
                    or segment selector RPL ≠ CPL
                    or access rights indicate nonwritable data segment
                    or DPL ≠ CPL
                THEN #GP(selector); FI;
            ELSE IF Segment marked not present
                THEN #SS(selector); FI;
            FI;
            SS ← SegmentSelector(SRC);
            SS ← SegmentDescriptor([SRC]);
    ELSE IF attempt to load DS, or ES 
        THEN #UD;
    ELSE IF FS, or GS is loaded with non-NULL segment selector
        THEN IF Segment selector index is not within descriptor table limits
            or access rights indicate segment neither data nor readable code segment
            or segment is data or nonconforming-code segment 
            and ( RPL > DPL or CPL > DPL)
                THEN #GP(selector); FI;
            ELSE IF Segment marked not present
                THEN #NP(selector); FI;
            FI;
            SegmentRegister ← SegmentSelector(SRC) ;
            SegmentRegister ← SegmentDescriptor([SRC]);
        FI;
    ELSE IF FS, or GS is loaded with a NULL selector:
        THEN
            SegmentRegister ← NULLSelector;
            SegmentRegister(DescriptorValidBit) ← 0; FI; (* Hidden flag; 
                not accessible by software *)
    FI;
    DEST ← Offset(SRC);
PREOTECTED MODE OR COMPATIBILITY MODE;
    IF SS is loaded 
        THEN 
            IF SegementSelector = NULL 
                THEN #GP(0);
            ELSE IF Segment selector index is not within descriptor table limits
                    or segment selector RPL ≠ CPL
                    or access rights indicate nonwritable data segment
                    or DPL ≠ CPL
                THEN #GP(selector); FI;
            ELSE IF Segment marked not present
                THEN #SS(selector); FI;
            FI;
            SS ← SegmentSelector(SRC);
            SS ← SegmentDescriptor([SRC]);
    ELSE IF DS, ES, FS, or GS is loaded with non-NULL segment selector
        THEN IF Segment selector index is not within descriptor table limits
            or access rights indicate segment neither data nor readable code segment
            or segment is data or nonconforming-code segment 
            and (RPL > DPL or CPL > DPL) 
                THEN #GP(selector); FI;
            ELSE IF Segment marked not present
                THEN #NP(selector); FI;
            FI;
            SegmentRegister ← SegmentSelector(SRC) AND RPL;
            SegmentRegister ← SegmentDescriptor([SRC]);
        FI;
    ELSE IF DS, ES, FS, or GS is loaded with a NULL selector:
        THEN
            SegmentRegister ← NULLSelector;
            SegmentRegister(DescriptorValidBit) ← 0; FI; (* Hidden flag; 
                not accessible by software *)
    FI;
    DEST ← Offset(SRC);
Real-Address or Virtual-8086 Mode
    SegmentRegister ← SegmentSelector(SRC); FI;
    DEST ← Offset(SRC);
```
### Flags Affected
None

### Protected Mode Exceptions

<p>#UD
If source operand is not a memory location.
If the LOCK prefix is used.
<p>#GP(0)
If a NULL selector is loaded into the SS register.
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register is used to access memory and it contains a NULL segment
selector.
<p>#GP(selector)
If the SS register is being loaded and any of the following is true: the segment selector index
is not within the descriptor table limits, the segment selector RPL is not equal to CPL, the
segment is a non-writable data segment, or DPL is not equal to CPL.
If the DS, ES, FS, or GS register is being loaded with a non-NULL segment selector and any of
the following is true: the segment selector index is not within descriptor table limits, the
segment is neither a data nor a readable code segment, or the segment is a data or noncon-
forming-code segment and both RPL and CPL are greater than DPL.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#SS(selector)
If the SS register is being loaded and the segment is marked not present.
<p>#NP(selector)
If DS, ES, FS, or GS register is being loaded with a non-NULL segment selector and the
segment is marked not present.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.

### Real-Address Mode Exceptions

<p>#GP
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS
If a memory operand effective address is outside the SS segment limit.
<p>#UD
If source operand is not a memory location.
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions
<p>#UD
If source operand is not a memory location.
If the LOCK prefix is used.
<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#GP(0)
If the memory address is in a non-canonical form.
If a NULL selector is attempted to be loaded into the SS register in compatibility mode.
If a NULL selector is attempted to be loaded into the SS register in CPL3 and 64-bit mode.
If a NULL selector is attempted to be loaded into the SS register in non-CPL3 and 64-bit mode
where its RPL is not equal to CPL.
<p>#GP(Selector)
If the FS, or GS register is being loaded with a non-NULL segment selector and any of the
following is true: the segment selector index is not within descriptor table limits, the memory
address of the descriptor is non-canonical, the segment is neither a data nor a readable code
segment, or the segment is a data or nonconforming-code segment and both RPL and CPL are
greater than DPL.
If the SS register is being loaded and any of the following is true: the segment selector index
is not within the descriptor table limits, the memory address of the descriptor is non-canonical,
the segment selector RPL is not equal to CPL, the segment is a nonwritable data segment, or
DPL is not equal to CPL.
<p>#SS(0)
If a memory operand effective address is non-canonical
<p>#SS(Selector)
If the SS register is being loaded and the segment is marked not present.
<p>#NP(selector)
If FS, or GS register is being loaded with a non-NULL segment selector and the segment is
marked not present.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.
<p>#UD
If source operand is not a memory location.
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
