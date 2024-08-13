<b>SCAS / SCASB / SCASW / SCASD</b> — Scan String
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
		<td>AE</td>
		<td>SCAS m8</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare AL with byte at ES:(E)DI or RDI, then set status flags.*</td>
	</tr>
	<tr>
		<td>AF</td>
		<td>SCAS m16</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare AX with word at ES:(E)DI or RDI, then set status flags.*</td>
	</tr>
	<tr>
		<td>AF</td>
		<td>SCAS m32</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare EAX with doubleword at ES(E)DI or RDI then set status flags.*</td>
	</tr>
	<tr>
		<td>REX.W + AF</td>
		<td>SCAS m64</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Compare RAX with quadword at RDI or EDI then set status flags.</td>
	</tr>
	<tr>
		<td>AE</td>
		<td>SCASB</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare AL with byte at ES:(E)DI or RDI then set status flags.*</td>
	</tr>
	<tr>
		<td>AF</td>
		<td>SCASW</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare AX with word at ES:(E)DI or RDI then set status flags.*</td>
	</tr>
	<tr>
		<td>AF</td>
		<td>SCASD</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare EAX with doubleword at ES:(E)DI or RDI then set status flags.*</td>
	</tr>
	<tr>
		<td>REX.W + AF</td>
		<td>SCASQ</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Compare RAX with quadword at RDI or EDI then set status flags.</td>
	</tr>
</table>

\* In 64-bit mode, only 64-bit (RDI) and 32-bit (EDI) address sizes are supported. In non-64-bit mode, only 32-bit (EDI) and 16-bit (DI)
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
In non-64-bit modes and in default 64-bit mode: this instruction compares a byte, word, doubleword or quadword
specified using a memory operand with the value in AL, AX, or EAX. It then sets status flags in EFLAGS recording
the results. The memory operand address is read from ES:(E)DI register (depending on the address-size attribute
of the instruction and the current operational mode). Note that ES cannot be overridden with a segment override
prefix.

At the assembly-code level, two forms of this instruction are allowed. The explicit-operand form and the no-operands
 form. The explicit-operand form (specified using the SCAS mnemonic) allows a memory operand to be specified
 explicitly. The memory operand must be a symbol that indicates the size and location of the operand value. The
register operand is then automatically selected to match the size of the memory operand (AL register for byte
comparisons, AX for word comparisons, EAX for doubleword comparisons). The explicit-operand form is provided
to allow documentation. Note that the documentation provided by this form can be misleading. That is, the
memory operand symbol must specify the correct type (size) of the operand (byte, word, or doubleword) but it
does not have to specify the correct location. The location is always specified by ES:(E)DI.

The no-operands form of the instruction uses a short form of SCAS. Again, ES:(E)DI is assumed to be the memory
operand and AL, AX, or EAX is assumed to be the register operand. The size of operands is selected by the
mnemonic: SCASB (byte comparison), SCASW (word comparison), or SCASD (doubleword comparison).

After the comparison, the (E)DI register is incremented or decremented automatically according to the setting of
the DF flag in the EFLAGS register. If the DF flag is 0, the (E)DI register is incremented; if the DF flag is 1, the (E)DI
register is decremented. The register is incremented or decremented by 1 for byte operations, by 2 for word operations
, and by 4 for doubleword operations.

SCAS, SCASB, SCASW, SCASD, and SCASQ can be preceded by the REP prefix for block comparisons of ECX bytes,
words, doublewords, or quadwords. Often, however, these instructions will be used in a LOOP construct that takes
some action based on the setting of status flags. See “REP/REPE/REPZ/REPNE/REPNZ—Repeat String Operation
Prefix” in this chapter for a description of the REP prefix.

In 64-bit mode, the instruction’s default address size is 64-bits, 32-bit address size is supported using the prefix
67H. Using a REX prefix in the form of REX.W promotes operation on doubleword operand to 64 bits. The 64-bit no-
operand mnemonic is SCASQ. Address of the memory operand is specified in either RDI or EDI, and
AL/AX/EAX/RAX may be used as the register operand. After a comparison, the destination register is incremented
or decremented by the current operand size (depending on the value of the DF flag). See the summary chart at the
beginning of this section for encoding data and limits.

### Operation

```java
Non-64-bit Mode:
IF (Byte comparison)
    THEN
        temp ← AL − SRC;
        SetStatusFlags(temp);
            THEN IF DF = 0 
                THEN (E)DI ← (E)DI + 1; 
                ELSE (E)DI ← (E)DI – 1; FI;
    ELSE IF (Word comparison)
        THEN
            temp ← AX − SRC;
            SetStatusFlags(temp);
            IF DF = 0
                THEN (E)DI ← (E)DI + 2; 
                ELSE (E)DI ← (E)DI – 2; FI;
        FI;
    ELSE IF (Doubleword comparison)
        THEN
            temp ← EAX – SRC;
            SetStatusFlags(temp);
            IF DF = 0
                THEN (E)DI ← (E)DI + 4; 
                ELSE (E)DI ← (E)DI – 4; FI;
        FI;
FI;
64-bit Mode:
IF (Byte cmparison)
    THEN
        temp ← AL − SRC;
        SetStatusFlags(temp);
            THEN IF DF = 0 
                THEN (R|E)DI ← (R|E)DI + 1; 
                ELSE (R|E)DI ← (R|E)DI – 1; FI;
    ELSE IF (Word comparison)
        THEN
            temp ← AX − SRC;
            SetStatusFlags(temp);
            IF DF = 0
                THEN (R|E)DI ← (R|E)DI + 2; 
                ELSE (R|E)DI ← (R|E)DI – 2; FI;
        FI;
    ELSE IF (Doubleword comparison)
        THEN
            temp ← EAX – SRC;
            SetStatusFlags(temp);
            IF DF = 0
                THEN (R|E)DI ← (R|E)DI + 4; 
                ELSE (R|E)DI ← (R|E)DI – 4; FI;
        FI;
    ELSE IF (Quadword comparison using REX.W )
        THEN
            temp ← RAX − SRC;
            SetStatusFlags(temp);
            IF DF = 0
                THEN (R|E)DI ← (R|E)DI + 8; 
                ELSE (R|E)DI ← (R|E)DI – 8; 
            FI;
    FI;
F
```
### Flags Affected
The OF, SF, ZF, AF, PF, and CF flags are set according to the temporary result of the comparison.

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the limit of the ES segment.
If the ES register contains a NULL segment selector.
If an illegal memory operand effective address in the ES segment is given.
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
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made.
<p>#UD
If the LOCK prefix is used.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions
<p>#GP(0)
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