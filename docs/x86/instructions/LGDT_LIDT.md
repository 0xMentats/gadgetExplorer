<b>LGDT / LIDT</b> — Load Global/Interrupt Descriptor Table Register
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
		<td>0F 01 /2</td>
		<td>LGDT m16&32</td>
		<td>M</td>
		<td>N.E.</td>
		<td>Valid</td>
		<td>Load m into GDTR.</td>
	</tr>
	<tr>
		<td>0F 01 /3</td>
		<td>LIDT m16&32</td>
		<td>M</td>
		<td>N.E.</td>
		<td>Valid</td>
		<td>Load m into IDTR.</td>
	</tr>
	<tr>
		<td>0F 01 /2</td>
		<td>LGDT m16&64</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Load m into GDTR.</td>
	</tr>
	<tr>
		<td>0F 01 /3</td>
		<td>LIDT m16&64</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Load m into IDTR.</td>
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
Loads the values in the source operand into the global descriptor table register (GDTR) or the interrupt descriptor
table register (IDTR). The source operand specifies a 6-byte memory location that contains the base address (a
linear address) and the limit (size of table in bytes) of the global descriptor table (GDT) or the interrupt descriptor
table (IDT). If operand-size attribute is 32 bits, a 16-bit limit (lower 2 bytes of the 6-byte data operand) and a 32-
bit base address (upper 4 bytes of the data operand) are loaded into the register. If the operand-size attribute
is 16 bits, a 16-bit limit (lower 2 bytes) and a 24-bit base address (third, fourth, and fifth byte) are loaded. Here,
the high-order byte of the operand is not used and the high-order byte of the base address in the GDTR or IDTR is
filled with zeros.

The LGDT and LIDT instructions are used only in operating-system software; they are not used in application
programs. They are the only instructions that directly load a linear address (that is, not a segment-relative
address) and a limit in protected mode. They are commonly executed in real-address mode to allow processor
initialization prior to switching to protected mode.

In 64-bit mode, the instruction’s operand size is fixed at 8+2 bytes (an 8-byte base and a 2-byte limit). See the
summary chart at the beginning of this section for encoding data and limits.

See “SGDT—Store Global Descriptor Table Register” in Chapter 4, Intel® 64 and IA-32 Architectures Software
Developer’s Manual, Volume 2B, for information on storing the contents of the GDTR and IDTR.

### Operation

IF Instruction is LIDT
    THEN
        IF OperandSize = 16
            THEN 
                IDTR(Limit) ← SRC[0:15];
                IDTR(Base) ← SRC[16:47] AND 00FFFFFFH; 
            ELSE IF 32-bit Operand Size
                THEN
                    IDTR(Limit) ← SRC[0:15];
                    IDTR(Base) ← SRC[16:47]; 
                FI;
            ELSE IF 64-bit Operand Size (* In 64-Bit Mode *)
                THEN
                    IDTR(Limit) ← SRC[0:15];
                    IDTR(Base) ← SRC[16:79]; 
                FI;
        FI;
    ELSE (* Instruction is LGDT *)
        IF OperandSize = 16
            THEN 
                GDTR(Limit) ← SRC[0:15];
                GDTR(Base) ← SRC[16:47] AND 00FFFFFFH; 
            ELSE IF 32-bit Operand Size
                THEN
                    GDTR(Limit) ← SRC[0:15];
                    GDTR(Base) ← SRC[16:47]; 
                FI;
            ELSE IF 64-bit Operand Size (* In 64-Bit Mode *)
                THEN
                    GDTR(Limit) ← SRC[0:15];
                    GDTR(Base) ← SRC[16:79]; 
                FI;
        FI; 
FI;
```
### Flags Affected
None

### Protected Mode Exceptions

<p>#UD
If the LOCK prefix is used.
<p>#GP(0)
If the current privilege level is not 0.
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register is used to access memory and it contains a NULL segment
selector.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF(fault-code)
If a page fault occurs.

### Real-Address Mode Exceptions
<p>#UD
If the LOCK prefix is used.
<p>#GP
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS
If a memory operand effective address is outside the SS segment limit.

### Virtual-8086 Mode Exceptions

<p>#UD
If the LOCK prefix is used.
<p>#GP
If the current privilege level is not 0.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#SS(0)
If a memory address referencing the SS segment is in a non-canonical form.
<p>#GP(0)
If the current privilege level is not 0.
If the memory address is in a non-canonical form.
<p>#UD
If the LOCK prefix is used.
<p>#PF(fault-code)
If a page fault occurs.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
