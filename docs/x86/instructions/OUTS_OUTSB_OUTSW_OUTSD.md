<b>OUTS / OUTSB / OUTSW / OUTSD</b> — Output String to Port
<table>
	<tr>
		<td><b>Opcode*</b></td>
		<td><b>Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>6E</td>
		<td>OUTS DX, m8</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Output byte from memory location specified in DS:(E)SI or RSI to I/O port specified in DX**.</td>
	</tr>
	<tr>
		<td>6F</td>
		<td>OUTS DX, m16</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Output word from memory location specified in DS:(E)SI or RSI to I/O port specified in DX**.</td>
	</tr>
	<tr>
		<td>6F</td>
		<td>OUTS DX, m32</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Output doubleword from memory location specified in DS:(E)SI or RSI to I/O port specified in DX**.</td>
	</tr>
	<tr>
		<td>6E</td>
		<td>OUTSB</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Output byte from memory location specified in DS:(E)SI or RSI to I/O port specified in DX**.</td>
	</tr>
	<tr>
		<td>6F</td>
		<td>OUTSW</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Output word from memory location specified in DS:(E)SI or RSI to I/O port specified in DX**.</td>
	</tr>
	<tr>
		<td>6F</td>
		<td>OUTSD</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Output doubleword from memory location specified in DS:(E)SI or RSI to I/O port specified in DX**.</td>
	</tr>
</table>

\* See IA-32 Architecture Compatibility section below.
\*\* In 64-bit mode, only 64-bit (RSI) and 32-bit (ESI) address sizes are supported. In non-64-bit mode, only 32-bit (ESI) and 16-bit (SI)
address sizes are supported.

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
		<td>ZO</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Copies data from the source operand (second operand) to the I/O port specified with the destination operand (first
operand). The source operand is a memory location, the address of which is read from either the DS:SI, DS:ESI or
the RSI registers (depending on the address-size attribute of the instruction, 16, 32 or 64, respectively). (The DS
segment may be overridden with a segment override prefix.) The destination operand is an I/O port address (from
0 to 65,535) that is read from the DX register. The size of the I/O port being accessed (that is, the size of the source
and destination operands) is determined by the opcode for an 8-bit I/O port or by the operand-size attribute of the
instruction for a 16- or 32-bit I/O port.

At the assembly-code level, two forms of this instruction are allowed: the “explicit-operands” form and the “no-
operands” form. The explicit-operands form (specified with the OUTS mnemonic) allows the source and destination
operands to be specified explicitly. Here, the source operand should be a symbol that indicates the size of the I/O
port and the source address, and the destination operand must be DX. This explicit-operands form is provided to
allow documentation; however, note that the documentation provided by this form can be misleading. That is, the
source operand symbol must specify the correct type (size) of the operand (byte, word, or doubleword), but it does
not have to specify the correct location. The location is always specified by the DS:(E)SI or RSI registers, which
must be loaded correctly before the OUTS instruction is executed.

The no-operands form provides “short forms” of the byte, word, and doubleword versions of the OUTS instructions.
Here also DS:(E)SI is assumed to be the source operand and DX is assumed to be the destination operand. The size
of the I/O port is specified with the choice of mnemonic: OUTSB (byte), OUTSW (word), or OUTSD (doubleword).

After the byte, word, or doubleword is transferred from the memory location to the I/O port, the SI/ESI/RSI
register is incremented or decremented automatically according to the setting of the DF flag in the EFLAGS register.
(If the DF flag is 0, the (E)SI register is incremented; if the DF flag is 1, the SI/ESI/RSI register is decremented.)
The SI/ESI/RSI register is incremented or decremented by 1 for byte operations, by 2 for word operations, and by
4 for doubleword operations.
The OUTS, OUTSB, OUTSW, and OUTSD instructions can be preceded by the REP prefix for block input of ECX
bytes, words, or doublewords. See “REP/REPE/REPZ/REPNE/REPNZ—Repeat String Operation Prefix” in this
chapter for a description of the REP prefix. This instruction is only useful for accessing I/O ports located in the
processor’s I/O address space. See Chapter 18, “Input/Output,” in the Intel® 64 and IA-32 Architectures Software
Developer’s Manual, Volume 1, for more information on accessing I/O ports in the I/O address space.

In 64-bit mode, the default operand size is 32 bits; operand size is not promoted by the use of REX.W. In 64-bit
mode, the default address size is 64 bits, and 64-bit address is specified using RSI by default. 32-bit address using
ESI is support using the prefix 67H, but 16-bit address is not supported in 64-bit mode.

### IA-32 Architecture Compatibility

After executing an OUTS, OUTSB, OUTSW, or OUTSD instruction, the Pentium processor ensures that the EWBE\#
pin has been sampled active before it begins to execute the next instruction. (Note that the instruction can be
prefetched if EWBE\# is not active, but it will not be executed until the EWBE\# pin is sampled active.) Only the
Pentium processor family has the EWBE\# pin.
For the Pentium 4, Intel® Xeon®, and P6 processor family, upon execution of an OUTS, OUTSB, OUTSW, or OUTSD
instruction, the processor will not execute the next instruction until the data phase of the transaction is complete.

### Operation

```java
IF ((PE = 1) and ((CPL > IOPL) or (VM = 1)))
    THEN (* Protected mode with CPL > IOPL or virtual-8086 mode *)
        IF (Any I/O Permission Bit for I/O port being accessed = 1)
            THEN (* I/O operation is not allowed *)
                #GP(0);
            ELSE (* I/O operation is allowed *) 
                DEST ← SRC; (* Writes to I/O port *)
        FI;
    ELSE (Real Mode or Protected Mode or 64-Bit Mode with CPL ≤ IOPL *)
        DEST ← SRC; (* Writes to I/O port *)
FI;
Byte transfer:
    IF 64-bit mode
        Then
            IF 64-Bit Address Size 
                THEN 
                    IF DF = 0
                        THEN RSI ← RSI RSI + 1; 
                        ELSE RSI ← RSI or – 1; 
                    FI;
                ELSE (* 32-Bit Address Size *)
                    IF DF = 0
                            ESI ← ESI + 1; 
                        THEN 
                            ESI ← ESI – 1; 
                        ELSE 
                    FI;
            FI;
        ELSE 
            IF DF = 0
                        (E)SI ← (E)SI + 1; 
                THEN 
                ELSE (E)SI ← (E)SI – 1; 
            FI;
    FI;
Word transfer:
    IF 64-bit mode
        Then
            IF 64-Bit Address Size 
                THEN 
                    IF DF = 0
                        THEN RSI ← RSI RSI + 2; 
                        ELSE RSI ← RSI or – 2; 
                    FI;
                ELSE (* 32-Bit Address Size *)
                    IF DF = 0
                            ESI ← ESI + 2; 
                        THEN 
                            ESI ← ESI – 2; 
                        ELSE 
                    FI;
            FI;
        ELSE 
            IF DF = 0
                        (E)SI ← (E)SI + 2; 
                THEN 
                ELSE (E)SI ← (E)SI – 2; 
            FI;
    FI;
Doubleword transfer:
    IF 64-bit mode
        Then
            IF 64-Bit Address Size 
                THEN 
                    IF DF = 0
                        THEN RSI ← RSI RSI + 4; 
                        ELSE RSI ← RSI or – 4; 
                    FI;
                ELSE (* 32-Bit Address Size *)
                    IF DF = 0
                            ESI ← ESI + 4; 
                        THEN 
                            ESI ← ESI – 4; 
                        ELSE 
                    FI;
            FI;
        ELSE 
            IF DF = 0
                        (E)SI ← (E)SI + 4; 
                THEN 
                ELSE (E)SI ← (E)SI – 4; 
            FI;
    FI;
```
### Flags Affected
None

### Protected Mode Exceptions
<p>#GP(0)
If the CPL is greater than (has less privilege) the I/O privilege level (IOPL) and any of the
corresponding I/O permission bits in TSS for the I/O port being accessed is 1.
If a memory operand effective address is outside the limit of the CS, DS, ES, FS, or GS
segment.
If the segment register contains a NULL segment selector.
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
<p>#UD
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

<p>#GP(0)
If any of the I/O permission bits in the TSS for the I/O port being accessed is 1.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made.
<p>#UD
If the LOCK prefix is used.

### Compatibility Mode Exceptions

Same as for protected mode exceptions.

### 64-Bit Mode Exceptions

<p>#SS(0)
If a memory address referencing the SS segment is in a non-canonical form.
<p>#GP(0)
If the CPL is greater than (has less privilege) the I/O privilege level (IOPL) and any of the
corresponding I/O permission bits in TSS for the I/O port being accessed is 1.
If the memory address is in a non-canonical form.
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