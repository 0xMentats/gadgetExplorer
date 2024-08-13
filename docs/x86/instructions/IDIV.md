<b>IDIV</b> — Signed Divide
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
		<td>F6 /7</td>
		<td>IDIV r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Signed divide AX by r/m8, with result stored in: AL ← Quotient, AH ← Remainder.</td>
	</tr>
	<tr>
		<td>REX + F6 /7</td>
		<td>IDIV r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Signed divide AX by r/m8, with result stored in AL ← Quotient, AH ← Remainder.</td>
	</tr>
	<tr>
		<td>F7 /7</td>
		<td>IDIV r/m16</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Signed divide DX:AX by r/m16, with result stored in AX ← Quotient, DX ← Remainder.</td>
	</tr>
	<tr>
		<td>F7 /7</td>
		<td>IDIV r/m32</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Signed divide EDX:EAX by r/m32, with result stored in EAX ← Quotient, EDX ← Remainder.</td>
	</tr>
	<tr>
		<td>REX.W + F7 /7</td>
		<td>IDIV r/m64</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Signed divide RDX:RAX by r/m64, with result stored in RAX ← Quotient, RDX ← Remainder.</td>
	</tr>
</table>

\* In 64-bit mode, r/m8 can not be encoded to access the following byte registers if a REX prefix is used: AH, BH, CH, DH.

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
Divides the (signed) value in the AX, DX:AX, or EDX:EAX (dividend) by the source operand (divisor) and stores the
result in the AX (AH:AL), DX:AX, or EDX:EAX registers. The source operand can be a general-purpose register or a
memory location. The action of this instruction depends on the operand size (dividend/divisor).

Non-integral results are truncated (chopped) towards 0. The remainder is always less than the divisor in magni-
tude. Overflow is indicated with the \#DE (divide error) exception rather than with the CF flag.

In 64-bit mode, the instruction’s default operation size is 32 bits. Use of the REX.R prefix permits access to additional
 registers (R8-R15). Use of the REX.W prefix promotes operation to 64 bits. In 64-bit mode when REX.W is
applied, the instruction divides the signed value in RDX:RAX by the source operand. RAX contains a 64-bit
quotient; RDX contains a 64-bit remainder.

See the summary chart at the beginning of this section for encoding data and limits. See Table 3-50.

Table 3-50.  IDIV Results
<table>
	<tr>
		<td><b>Operand Size</b></td>
		<td><b>Dividend</b></td>
		<td><b>Divisor</b></td>
		<td><b>Quotient</b></td>
		<td><b>Remainder</b></td>
		<td><b>Quotient Range</b></td>
	</tr>
	<tr>
		<td>Word/byte Doubleword/word Quadword/doubleword Doublequadword/ quadword</td>
		<td>AX DX:AX EDX:EAX RDX:RAX</td>
		<td>r/m8 r/m16 r/m32 r/m64</td>
		<td>AL AX EAX RAX</td>
		<td>AH DX EDX RDX</td>
		<td>−128 to +127 −32,768 to +32,767 −231 to 231 − 1 −263 to 263 − 1</td>
	</tr>
</table>


### Operation

```java
IF SRC = 0
    THEN #DE; (* Divide error *) 
FI;
IF OperandSize = 8 (* Word/byte operation *)
    THEN
        temp ← AX / SRC; (* Signed division *)
        IF (temp > 7FH) or (temp < 80H) 
        (* If a positive result is greater than 7FH or a negative result is less than 80H *)
            THEN #DE; (* Divide error *) 
            ELSE
                AL ← temp;
                AH ← AX SignedModulus SRC;
        FI;
    ELSE IF OperandSize = 16 (* Doubleword/word operation *)
        THEN
            temp ← DX:AX / SRC; (* Signed division *)
            IF (temp > 7FFFH) or (temp < 8000H) 
            (* If a positive result is greater than 7FFFH 
            or a negative result is less than 8000H *)
                THEN
                    #DE; (* Divide error *) 
                ELSE
                    AX ← temp;
                    DX ← DX:AX SignedModulus SRC;
            FI;
        FI;
    ELSE IF OperandSize = 32 (* Quadword/doubleword operation *)
            temp ← EDX:EAX / SRC; (* Signed division *)
            IF (temp > 7FFFFFFFH) or (temp < 80000000H) 
            (* If a positive result is greater than 7FFFFFFFH 
            or a negative result is less than 80000000H *)
                THEN 
                    #DE; (* Divide error *) 
                ELSE
                    EAX ← temp;
                    EDX ← EDXE:AX SignedModulus SRC;
            FI;
        FI;
    ELSE IF OperandSize = 64 (* Doublequadword/quadword operation *)
            temp ← RDX:RAX / SRC; (* Signed division *)
            IF (temp > 7FFFFFFFFFFFFFFFH) or (temp < 8000000000000000H) 
            (* If a positive result is greater than 7FFFFFFFFFFFFFFFH 
            or a negative result is less than 8000000000000000H *)
                THEN 
                    #DE; (* Divide error *) 
                ELSE
                    RAX ← temp;
                    RDX ← RDE:RAX SignedModulus SRC;
            FI;
        FI;
FI;
```
### Flags Affected
The CF, OF, SF, ZF, AF, and PF flags are undefined.

### Protected Mode Exceptions

<p>#DE
If the source operand (divisor) is 0.
The signed result (quotient) is too large for the destination.
<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register is used to access memory and it contains a NULL segment
selector.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.
<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#DE
If the source operand (divisor) is 0.

The signed result (quotient) is too large for the destination.
<p>#GP
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS
If a memory operand effective address is outside the SS segment limit.
<p>#UD
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

<p>#DE
If the source operand (divisor) is 0.

The signed result (quotient) is too large for the destination.
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

<p>#SS(0)
If a memory address referencing the SS segment is in a non-canonical form.
<p>#GP(0)
If the memory address is in a non-canonical form.
<p>#DE
If the source operand (divisor) is 0
If the quotient is too large for the designated register.
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