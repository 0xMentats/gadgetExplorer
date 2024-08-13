<b>DIV</b> — Unsigned Divide
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
		<td>F6 /6</td>
		<td>DIV r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Unsigned divide AX by r/m8, with result stored in AL ← Quotient, AH ← Remainder.</td>
	</tr>
	<tr>
		<td>REX + F6 /6</td>
		<td>DIV r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Unsigned divide AX by r/m8, with result stored in AL ← Quotient, AH ← Remainder.</td>
	</tr>
	<tr>
		<td>F7 /6</td>
		<td>DIV r/m16</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Unsigned divide DX:AX by r/m16, with result stored in AX ← Quotient, DX ← Remainder.</td>
	</tr>
	<tr>
		<td>F7 /6</td>
		<td>DIV r/m32</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Unsigned divide EDX:EAX by r/m32, with result stored in EAX ← Quotient, EDX ← Remainder.</td>
	</tr>
	<tr>
		<td>REX.W + F7 /6</td>
		<td>DIV r/m64</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Unsigned divide RDX:RAX by r/m64, with result stored in RAX ← Quotient, RDX ← Remainder.</td>
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
		<td>ModRM:r/m (w)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Divides unsigned the value in the AX, DX:AX, EDX:EAX, or RDX:RAX registers (dividend) by the source operand
(divisor) and stores the result in the AX (AH:AL), DX:AX, EDX:EAX, or RDX:RAX registers. The source operand can
be a general-purpose register or a memory location. The action of this instruction depends on the operand size
(dividend/divisor). Division using 64-bit operand is available only in 64-bit mode.

Non-integral results are truncated (chopped) towards 0. The remainder is always less than the divisor in magni-
tude. Overflow is indicated with the \#DE (divide error) exception rather than with the CF flag.

In 64-bit mode, the instruction’s default operation size is 32 bits. Use of the REX.R prefix permits access to additional
 registers (R8-R15). Use of the REX.W prefix promotes operation to 64 bits. In 64-bit mode when REX.W is
applied, the instruction divides the unsigned value in RDX:RAX by the source operand and stores the quotient in
RAX, the remainder in RDX.

See the summary chart at the beginning of this section for encoding data and limits. See Table 3-15.

Table 3-15.  DIV Action
<table>
	<tr>
		<td><b>Operand Size</b></td>
		<td><b>Dividend</b></td>
		<td><b>Divisor</b></td>
		<td><b>Quotient</b></td>
		<td><b>Remainder</b></td>
		<td><b>Maximum Quotient</b></td>
	</tr>
	<tr>
		<td>Word/byte</td>
		<td>AX</td>
		<td>r/m8</td>
		<td>AL</td>
		<td>AH</td>
		<td>255</td>
	</tr>
	<tr>
		<td>Doubleword/word</td>
		<td>DX:AX</td>
		<td>r/m16</td>
		<td>AX</td>
		<td>DX</td>
		<td>65,535</td>
	</tr>
	<tr>
		<td>Quadword/doubleword</td>
		<td>EDX:EAX</td>
		<td>r/m32</td>
		<td>EAX</td>
		<td>EDX</td>
		<td>232 − 1</td>
	</tr>
	<tr>
		<td>Doublequadword/ quadword</td>
		<td>RDX:RAX</td>
		<td>r/m64</td>
		<td>RAX</td>
		<td>RDX</td>
		<td>264 − 1</td>
	</tr>
</table>


### Operation

```java
IF SRC = 0
    THEN #DE; FI; (* Divide Error *) 
IF OperandSize = 8 (* Word/Byte Operation *)
    THEN
        temp ← AX / SRC;
        IF temp > FFH
            THEN #DE; (* Divide error *) 
            ELSE
                AL ← temp;
                AH ← AX MOD SRC;
        FI;
    ELSE IF OperandSize = 16 (* Doubleword/word operation *)
        THEN
            temp ← DX:AX / SRC;
            IF temp > FFFFH
                THEN #DE; (* Divide error *) 
            ELSE
                AX ← temp;
                DX ← DX:AX MOD SRC;
            FI;
        FI;
    ELSE IF Operandsize = 32 (* Quadword/doubleword operation *)
        THEN
            temp ← EDX:EAX / SRC;
            IF temp > FFFFFFFFH
                THEN #DE; (* Divide error *) 
            ELSE
                EAX ← temp;
                EDX ← EDX:EAX MOD SRC;
            FI;
        FI;
    ELSE IF 64-Bit Mode and Operandsize = 64 (* Doublequadword/quadword operation *)
        THEN
            temp ← RDX:RAX / SRC;
            IF temp > FFFFFFFFFFFFFFFFH
                THEN #DE; (* Divide error *) 
            ELSE
                RAX ← temp;
                RDX ← RDX:RAX MOD SRC;
            FI;
        FI;
FI;
```
### Flags Affected
The CF, OF, SF, ZF, AF, and PF flags are undefined.

### Protected Mode Exceptions
<p>#DE
If the source operand (divisor) is 0
If the quotient is too large for the designated register.
<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register contains a NULL segment selector.
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
If the quotient is too large for the designated register.
<p>#GP
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register contains a NULL segment selector.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#UD
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

<p>#DE
If the source operand (divisor) is 0.
If the quotient is too large for the designated register.
<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS
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