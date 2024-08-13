<b>POP</b> — Pop a Value from the Stack
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
		<td>8F /0</td>
		<td>POP r/m16</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Pop top of stack into m16; increment stack pointer.</td>
	</tr>
	<tr>
		<td>8F /0</td>
		<td>POP r/m32</td>
		<td>M</td>
		<td>N.E.</td>
		<td>Valid</td>
		<td>Pop top of stack into m32; increment stack pointer.</td>
	</tr>
	<tr>
		<td>8F /0</td>
		<td>POP r/m64</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Pop top of stack into m64; increment stack pointer. Cannot encode 32-bit operand size.</td>
	</tr>
	<tr>
		<td>58+ rw</td>
		<td>POP r16</td>
		<td>O</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Pop top of stack into r16; increment stack pointer.</td>
	</tr>
	<tr>
		<td>58+ rd</td>
		<td>POP r32</td>
		<td>O</td>
		<td>N.E.</td>
		<td>Valid</td>
		<td>Pop top of stack into r32; increment stack pointer.</td>
	</tr>
	<tr>
		<td>58+ rd</td>
		<td>POP r64</td>
		<td>O</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Pop top of stack into r64; increment stack pointer. Cannot encode 32-bit operand size.</td>
	</tr>
	<tr>
		<td>1F</td>
		<td>POP DS</td>
		<td>ZO</td>
		<td>Invalid</td>
		<td>Valid</td>
		<td>Pop top of stack into DS; increment stack pointer.</td>
	</tr>
	<tr>
		<td>07</td>
		<td>POP ES</td>
		<td>ZO</td>
		<td>Invalid</td>
		<td>Valid</td>
		<td>Pop top of stack into ES; increment stack pointer.</td>
	</tr>
	<tr>
		<td>17</td>
		<td>POP SS</td>
		<td>ZO</td>
		<td>Invalid</td>
		<td>Valid</td>
		<td>Pop top of stack into SS; increment stack pointer.</td>
	</tr>
	<tr>
		<td>0F A1</td>
		<td>POP FS</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Pop top of stack into FS; increment stack pointer by 16 bits.</td>
	</tr>
	<tr>
		<td>0F A1</td>
		<td>POP FS</td>
		<td>ZO</td>
		<td>N.E.</td>
		<td>Valid</td>
		<td>Pop top of stack into FS; increment stack pointer by 32 bits.</td>
	</tr>
	<tr>
		<td>0F A1</td>
		<td>POP FS</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Pop top of stack into FS; increment stack pointer by 64 bits.</td>
	</tr>
	<tr>
		<td>0F A9</td>
		<td>POP GS</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Pop top of stack into GS; increment stack pointer by 16 bits.</td>
	</tr>
	<tr>
		<td>0F A9</td>
		<td>POP GS</td>
		<td>ZO</td>
		<td>N.E.</td>
		<td>Valid</td>
		<td>Pop top of stack into GS; increment stack pointer by 32 bits.</td>
	</tr>
	<tr>
		<td>0F A9</td>
		<td>POP GS</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Pop top of stack into GS; increment stack pointer by 64 bits.</td>
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
		<td>ModRM:r/m (w)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>O</td>
		<td>opcode + rd (w)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
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
Loads the value from the top of the stack to the location specified with the destination operand (or explicit opcode)
and then increments the stack pointer. The destination operand can be a general-purpose register, memory location, or segment register.

Address and operand sizes are determined and used as follows:

 *  Address size. The D flag in the current code-segment descriptor determines the default address size; it may be overridden by an instruction prefix (67H). The address size is used only when writing to a destination operand in memory.

 *  Operand size. The D flag in the current code-segment descriptor determines the default operand size; it may be overridden by instruction prefixes (66H or REX.W). The operand size (16, 32, or 64 bits) determines the amount by which the stack pointer is incremented (2, 4
or 8).

 *  Stack-address size. Outside of 64-bit mode, the B flag in the current stack-segment descriptor determines the size of the stack pointer (16 or 32 bits); in 64-bit mode, the size of the stack pointer is always 64 bits. The stack-address size determines the width of the stack pointer when reading from the stack in memory and
when incrementing the stack pointer. (As stated above, the amount by which the stack pointer is incremented
is determined by the operand size.)

If the destination operand is one of the segment registers DS, ES, FS, GS, or SS, the value loaded into the register must be a valid segment selector. In protected mode, popping a segment selector into a segment register automatically causes the descriptor information associated with that segment selector to be loaded into the hidden (shadow) part of the segment register and causes the selector and the descriptor information to be validated (see the “Operation” section below).

A NULL value (0000-0003) may be popped into the DS, ES, FS, or GS register without causing a general protection
fault. However, any subsequent attempt to reference a segment whose corresponding segment register is loaded
with a NULL value causes a general protection exception (\#GP). In this situation, no memory reference occurs and the saved value of the segment register is NULL.

The POP instruction cannot pop a value into the CS register. To load the CS register from the stack, use the RET
instruction.

If the ESP register is used as a base register for addressing a destination operand in memory, the POP instruction computes the effective address of the operand after it increments the ESP register. For the case of a 16-bit stack where ESP wraps to 0H as a result of the POP instruction, the resulting location of the memory write is processor-family-specific.

The POP ESP instruction increments the stack pointer (ESP) before data at the old top of stack is written into the destination.

Loading the SS register with a POP instruction suppresses or inhibits some debug exceptions and inhibits interrupts
on the following instruction boundary. (The inhibition ends after delivery of an exception or the execution of the
next instruction.) This behavior allows a stack pointer to be loaded into the ESP register with the next instruction
(POP ESP) before an event can be delivered. See Section 6.8.3, “Masking Exceptions and Interrupts When
Switching Stacks,” in Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 3A. Intel recommends that software use the LSS instruction to load the SS register and ESP together.

In 64-bit mode, using a REX prefix in the form of REX.R permits access to additional registers (R8-R15). When in
64-bit mode, POPs using 32-bit operands are not encodable and POPs to DS, ES, SS are not valid. See the
summary chart at the beginning of this section for encoding data and limits.

### Operation

```java
IF StackAddrSize = 32
    THEN
        IF OperandSize = 32
            THEN
                DEST ← SS:ESP; (* Copy a doubleword *)
                ESP ← ESP + 4;
            ELSE (* OperandSize = 16*)
                DEST ← SS:ESP; (* Copy a word *)
                ESP ← ESP + 2;
        FI;
    ELSE IF StackAddrSize = 64
        THEN
            IF OperandSize = 64
                THEN
                    DEST ← SS:RSP; (* Copy quadword *)
                    RSP ← RSP + 8;
                ELSE (* OperandSize = 16*)
                    DEST ← SS:RSP; (* Copy a word *)
                    RSP ← RSP + 2;
            FI;
        FI;
    ELSE StackAddrSize = 16
        THEN
            IF OperandSize = 16
                THEN
                    DEST ← SS:SP; (* Copy a word *)
                    SP ← SP + 2;
                ELSE (* OperandSize = 32 *)
                    DEST ← SS:SP; (* Copy a doubleword *)
                    SP ← SP + 4;
            FI;
FI;
Loading a segment register while in protected mode results in special actions, as described in the following listing. 
These checks are performed on the segment selector and the segment descriptor it points to.
64-BIT_MODE
IF FS, or GS is loaded with non-NULL selector;
    THEN
        IF segment selector index is outside descriptor table limits
            OR segment is not a data or readable code segment
            OR ((segment is a data or nonconforming code segment)
                AND (both RPL and CPL > DPL))
                    THEN #GP(selector);
            IF segment not marked present
                THEN #NP(selector);
        ELSE
            SegmentRegister ← segment selector;
            SegmentRegister ← segment descriptor;
        FI;
FI;
IF FS, or GS is loaded with a NULL selector;
        THEN
            SegmentRegister ← segment selector;
            SegmentRegister ← segment descriptor;
FI;
PREOTECTED MODE OR COMPATIBILITY MODE;
IF SS is loaded;
    THEN
        IF segment selector is NULL
            THEN #GP(0); 
        FI;
        IF segment selector index is outside descriptor table limits 
            or segment selector's RPL ≠ CPL
            or segment is not a writable data segment
            or DPL ≠ CPL
                THEN #GP(selector); 
        FI;
        IF segment not marked present 
            THEN #SS(selector); 
            ELSE
                SS ← segment selector;
                SS ← segment descriptor; 
        FI;
FI;
IF DS, ES, FS, or GS is loaded with non-NULL selector;
    THEN
        IF segment selector index is outside descriptor table limits
            or segment is not a data or readable code segment
            or ((segment is a data or nonconforming code segment)
            and (both RPL and CPL > DPL))
                THEN #GP(selector); 
        FI;
        IF segment not marked present
            THEN #NP(selector);
            ELSE
                SegmentRegister ← segment selector;
                SegmentRegister ← segment descriptor;
         FI;
FI;
IF DS, ES, FS, or GS is loaded with a NULL selector
    THEN
        SegmentRegister ← segment selector;
        SegmentRegister ← segment descriptor;
FI;
```
### Flags Affected
None.

### Protected Mode Exceptions

<p>#GP(0)
If attempt is made to load SS register with NULL segment selector.
If the destination operand is in a non-writable segment.
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register is used to access memory and it contains a NULL segment
selector.
<p>#GP(selector)
If segment selector index is outside descriptor table limits.
If the SS register is being loaded and the segment selector's RPL and the segment descriptor’s
DPL are not equal to the CPL.
If the SS register is being loaded and the segment pointed to is a
non-writable data segment.
If the DS, ES, FS, or GS register is being loaded and the segment pointed to is not a data or
readable code segment.
If the DS, ES, FS, or GS register is being loaded and the segment pointed to is a data or
nonconforming code segment, but both the RPL and the CPL are greater than the DPL.
<p>#SS(0)
If the current top of stack is not within the stack segment.
If a memory operand effective address is outside the SS segment limit.
<p>#SS(selector)
If the SS register is being loaded and the segment pointed to is marked not present.
<p>#NP
If the DS, ES, FS, or GS register is being loaded and the segment pointed to is marked not
present.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If an unaligned memory reference is made while the current privilege level is 3 and alignment
checking is enabled.
<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#GP
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#UD
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If an unaligned memory reference is made while alignment checking is enabled.
<p>#UD
If the LOCK prefix is used.

### Compatibility Mode Exceptions

Same as for protected mode exceptions.

### 64-Bit Mode Exceptions

<p>#GP(0)
If the memory address is in a non-canonical form.
<p>#SS(0)
If the stack address is in a non-canonical form.
<p>#GP(selector)
If the descriptor is outside the descriptor table limit.
If the FS or GS register is being loaded and the segment pointed to is not a data or readable
code segment.
If the FS or GS register is being loaded and the segment pointed to is a data or nonconforming
code segment, but both the RPL and the CPL are greater than the DPL.
<p>#AC(0)
If an unaligned memory reference is made while alignment checking is enabled.
<p>#PF(fault-code)
If a page fault occurs.
<p>#NP
If the FS or GS register is being loaded and the segment pointed to is marked not present.
<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
