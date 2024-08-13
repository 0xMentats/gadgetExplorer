<b>FADD / FADDP / FIADD</b> — Add
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D8 /0</td>
		<td>FADD m32fp</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add m32fp to ST(0) and store result in ST(0).</td>
	</tr>
	<tr>
		<td>DC /0</td>
		<td>FADD m64fp</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add m64fp to ST(0) and store result in ST(0).</td>
	</tr>
	<tr>
		<td>D8 C0+i</td>
		<td>FADD ST(0), ST(i)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add ST(0) to ST(i) and store result in ST(0).</td>
	</tr>
	<tr>
		<td>DC C0+i</td>
		<td>FADD ST(i), ST(0)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add ST(i) to ST(0) and store result in ST(i).</td>
	</tr>
	<tr>
		<td>DE C0+i</td>
		<td>FADDP ST(i), ST(0)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add ST(0) to ST(i), store result in ST(i), and pop the register stack.</td>
	</tr>
	<tr>
		<td>DE C1</td>
		<td>FADDP</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add ST(0) to ST(1), store result in ST(1), and pop the register stack.</td>
	</tr>
	<tr>
		<td>DA /0</td>
		<td>FIADD m32int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add m32int to ST(0) and store result in ST(0).</td>
	</tr>
	<tr>
		<td>DE /0</td>
		<td>FIADD m16int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Add m16int to ST(0) and store result in ST(0).</td>
	</tr>
</table>


### Description
Adds the destination and source operands and stores the sum in the destination location. The destination operand
is always an FPU register; the source operand can be a register or a memory location. Source operands in memory
can be in single-precision or double-precision floating-point format or in word or doubleword integer format.

The no-operand version of the instruction adds the contents of the ST(0) register to the ST(1) register. The one-
operand version adds the contents of a memory location (either a floating-point or an integer value) to the contents
of the ST(0) register. The two-operand version, adds the contents of the ST(0) register to the ST(i) register or vice
versa. The value in ST(0) can be doubled by coding:

FADD ST(0), ST(0);
The FADDP instructions perform the additional operation of popping the FPU register stack after storing the result.
To pop the register stack, the processor marks the ST(0) register as empty and increments the stack pointer (TOP)
by 1. (The no-operand version of the floating-point add instructions always results in the register stack being
popped. In some assemblers, the mnemonic for this instruction is FADD rather than FADDP.)

The FIADD instructions convert an integer source operand to double extended-precision floating-point format
before performing the addition.

The table on the following page shows the results obtained when adding various classes of numbers, assuming that
neither overflow nor underflow occurs.
When the sum of two operands with opposite signs is 0, the result is +0, except for the round toward −∞ mode, in
which case the result is −0. When the source operand is an integer 0, it is treated as a +0.

When both operand are infinities of the same sign, the result is ∞ of the expected sign. If both operands are infini-
ties of opposite signs, an invalid-operation exception is generated. See Table 3-18.
Table 3-18.  FADD/FADDP/FIADD Results
<table>
	<tr>
		<td colspan=8 rowspan=8><b>SRC − ∞ − F or − I −0 + 0 + F or + I + ∞ NaN − ∞ − ∞ − ∞ − ∞ − ∞ − ∞ * NaN − F − ∞ − F DEST DEST ± F or ± 0 + ∞ NaN − 0 − ∞ SRC − 0 ± 0 SRC + ∞ NaN DEST + 0 − ∞ SRC ± 0 + 0 SRC + ∞ NaN + F − ∞ ± F or ± 0 DEST DEST + F + ∞ NaN + ∞ * + ∞ + ∞ + ∞ + ∞ + ∞ NaN NaN NaN NaN NaN NaN NaN NaN NaN</b></td>
	</tr>
	<tr>
		<td>− F</td>
		<td>SRC</td>
		<td>SRC</td>
		<td>± F or ± 0</td>
		<td>+ ∞</td>
		<td colspan=2>NaN</td>
	</tr>
	<tr>
		<td>DEST</td>
		<td>− 0</td>
		<td>± 0</td>
		<td>DEST</td>
		<td>+ ∞</td>
		<td colspan=2>NaN</td>
	</tr>
	<tr>
		<td>DEST</td>
		<td>± 0</td>
		<td>+ 0</td>
		<td>DEST</td>
		<td>+ ∞</td>
		<td colspan=2>NaN</td>
	</tr>
	<tr>
		<td>± F or ± 0</td>
		<td>SRC</td>
		<td>SRC</td>
		<td>+ F</td>
		<td>+ ∞</td>
		<td colspan=2>NaN</td>
	</tr>
	<tr>
		<td>+ ∞</td>
		<td>+ ∞</td>
		<td>+ ∞</td>
		<td>+ ∞</td>
		<td>+ ∞</td>
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

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
IF Instruction = FIADD
    THEN
        DEST ← DEST + ConvertToDoubleExtendedPrecisionFP(SRC);
    ELSE (* Source operand is floating-point value *)
        DEST ← DEST + SRC;
FI;
IF Instruction = FADDP 
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
Operands are infinities of unlike sign.
<p>#D
Source operand is a denormal value.
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