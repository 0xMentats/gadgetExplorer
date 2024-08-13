<b>FDIV / FDIVP / FIDIV</b> — Divide
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D8 /6</td>
		<td>FDIV m32fp</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Divide ST(0) by m32fp and store result in ST(0).</td>
	</tr>
	<tr>
		<td>DC /6</td>
		<td>FDIV m64fp</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Divide ST(0) by m64fp and store result in ST(0).</td>
	</tr>
	<tr>
		<td>D8 F0+i</td>
		<td>FDIV ST(0), ST(i)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Divide ST(0) by ST(i) and store result in ST(0).</td>
	</tr>
	<tr>
		<td>DC F8+i</td>
		<td>FDIV ST(i), ST(0)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Divide ST(i) by ST(0) and store result in ST(i).</td>
	</tr>
	<tr>
		<td>DE F8+i</td>
		<td>FDIVP ST(i), ST(0)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Divide ST(i) by ST(0), store result in ST(i), and pop the register stack.</td>
	</tr>
	<tr>
		<td>DE F9</td>
		<td>FDIVP</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Divide ST(1) by ST(0), store result in ST(1), and pop the register stack.</td>
	</tr>
	<tr>
		<td>DA /6</td>
		<td>FIDIV m32int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Divide ST(0) by m32int and store result in ST(0).</td>
	</tr>
	<tr>
		<td>DE /6</td>
		<td>FIDIV m16int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Divide ST(0) by m16int and store result in ST(0).</td>
	</tr>
</table>


### Description
Divides the destination operand by the source operand and stores the result in the destination location. The destination
 operand (dividend) is always in an FPU register; the source operand (divisor) can be a register or a memory
location. Source operands in memory can be in single-precision or double-precision floating-point format, word or
doubleword integer format.

The no-operand version of the instruction divides the contents of the ST(1) register by the contents of the ST(0)
register. The one-operand version divides the contents of the ST(0) register by the contents of a memory location
(either a floating-point or an integer value). The two-operand version, divides the contents of the ST(0) register by
the contents of the ST(i) register or vice versa.

The FDIVP instructions perform the additional operation of popping the FPU register stack after storing the result.
To pop the register stack, the processor marks the ST(0) register as empty and increments the stack pointer (TOP)
by 1. The no-operand version of the floating-point divide instructions always results in the register stack being
popped. In some assemblers, the mnemonic for this instruction is FDIV rather than FDIVP.

The FIDIV instructions convert an integer source operand to double extended-precision floating-point format
before performing the division. When the source operand is an integer 0, it is treated as a +0.

If an unmasked divide-by-zero exception (\#Z) is generated, no result is stored; if the exception is masked, an ∞ of
the appropriate sign is stored in the destination operand.

The following table shows the results obtained when dividing various classes of numbers, assuming that neither
overflow nor underflow occurs.
Table 3-24.  FDIV/FDIVP/FIDIV Results
<table>
	<tr>
		<td colspan=8 rowspan=10><b>SRC − ∞ − F − I − 0 + 0 + I + F + ∞ NaN − ∞ * + ∞ + ∞ + ∞ − ∞ − ∞ − ∞ * NaN − F + 0 + F + F ** ** − F − F − 0 NaN − 0 + 0 + 0 + 0 * * − 0 − 0 − 0 NaN DEST + 0 − 0 − 0 − 0 * * + 0 + 0 + 0 NaN + F − 0 − F − F ** ** + F + F + 0 NaN + ∞ * − ∞ − ∞ − ∞ + ∞ + ∞ + ∞ * NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN</b></td>
	</tr>
	<tr>
		<td>+ F</td>
		<td>+ 0</td>
		<td>− 0</td>
		<td>− F</td>
		<td>− ∞</td>
		<td colspan=2>NaN</td>
	</tr>
	<tr>
		<td>+ F</td>
		<td>+ 0</td>
		<td>− 0</td>
		<td>− F</td>
		<td>− ∞</td>
		<td colspan=2>NaN</td>
	</tr>
	<tr>
		<td>**</td>
		<td>*</td>
		<td>*</td>
		<td>**</td>
		<td>− ∞</td>
		<td colspan=2>NaN</td>
	</tr>
	<tr>
		<td>**</td>
		<td>*</td>
		<td>*</td>
		<td>**</td>
		<td>+ ∞</td>
		<td colspan=2>NaN</td>
	</tr>
	<tr>
		<td>− F</td>
		<td>− 0</td>
		<td>+ 0</td>
		<td>+ F</td>
		<td>+ ∞</td>
		<td colspan=2>NaN</td>
	</tr>
	<tr>
		<td>− F</td>
		<td>− 0</td>
		<td>+ 0</td>
		<td>+ F</td>
		<td>+ ∞</td>
		<td colspan=2>NaN</td>
	</tr>
	<tr>
		<td>− 0</td>
		<td>− 0</td>
		<td>+ 0</td>
		<td>+ 0</td>
		<td>*</td>
		<td colspan=2>NaN</td>
	</tr>
	<tr>
		<td rowspan=2>NaN</td>
		<td rowspan=2>NaN</td>
		<td rowspan=2>NaN</td>
		<td rowspan=2>NaN</td>
		<td rowspan=2>NaN</td>
		<td colspan=2 rowspan=2>NaN</td>
	</tr>
</table>

NOTES:
F Means finite floating-point value.
I Means integer.
\* Indicates floating-point invalid-arithmetic-operand (\#IA) exception.
\*\* Indicates floating-point zero-divide (\#Z) exception.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
IF SRC = 0
    THEN
        #Z;
    ELSE
        IF Instruction is FIDIV
            THEN
                DEST ← DEST / ConvertToDoubleExtendedPrecisionFP(SRC);
            ELSE (* Source operand is floating-point value *)
                DEST ← DEST / SRC;
        FI;
FI;
IF Instruction = FDIVP 
    THEN 
        PopRegisterStack;
FI;
```
### FPU Flags Affected

C1
Set to 0 if stack underflow occurred.
Set if result was rounded up; cleared otherwise.
C0, C2, C3
Undefined.

### Floating-Point Exceptions
<p>#IS
Stack underflow occurred.
<p>#IA
Operand is an SNaN value or unsupported format.
±∞ / ±∞; ±0 / ±0

<p>#D
Source is a denormal value.
DEST / ±0, where DEST is not equal to ±0.
<p>#Z
<p>#U
Result is too small for destination format.
<p>#O
Result is too large for destination format.
<p>#P
Value cannot be represented exactly in destination format.

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register contains a NULL segment selector.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#NM
CR0.EM[bit 2] or CR0.TS[bit 3] = 1.
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
<p>#NM
CR0.EM[bit 2] or CR0.TS[bit 3] = 1.
<p>#UD
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#NM
CR0.EM[bit 2] or CR0.TS[bit 3] = 1.
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
<p>#NM
CR0.EM[bit 2] or CR0.TS[bit 3] = 1.
<p>#MF
If there is a pending x87 FPU exception.
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