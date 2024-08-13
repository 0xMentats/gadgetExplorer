<b>FMUL / FMULP / FIMUL</b> — Multiply
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D8 /1</td>
		<td>FMUL m32fp</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Multiply ST(0) by m32fp and store result in ST(0).</td>
	</tr>
	<tr>
		<td>DC /1</td>
		<td>FMUL m64fp</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Multiply ST(0) by m64fp and store result in ST(0).</td>
	</tr>
	<tr>
		<td>D8 C8+i</td>
		<td>FMUL ST(0), ST(i)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Multiply ST(0) by ST(i) and store result in ST(0).</td>
	</tr>
	<tr>
		<td>DC C8+i</td>
		<td>FMUL ST(i), ST(0)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Multiply ST(i) by ST(0) and store result in ST(i).</td>
	</tr>
	<tr>
		<td>DE C8+i</td>
		<td>FMULP ST(i), ST(0)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Multiply ST(i) by ST(0), store result in ST(i), and pop the register stack.</td>
	</tr>
	<tr>
		<td>DE C9</td>
		<td>FMULP</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Multiply ST(1) by ST(0), store result in ST(1), and pop the register stack.</td>
	</tr>
	<tr>
		<td>DA /1</td>
		<td>FIMUL m32int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Multiply ST(0) by m32int and store result in ST(0).</td>
	</tr>
	<tr>
		<td>DE /1</td>
		<td>FIMUL m16int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Multiply ST(0) by m16int and store result in ST(0).</td>
	</tr>
</table>


### Description
Multiplies the destination and source operands and stores the product in the destination location. The destination
operand is always an FPU data register; the source operand can be an FPU data register or a memory location.
Source operands in memory can be in single-precision or double-precision floating-point format or in word or
doubleword integer format.

The no-operand version of the instruction multiplies the contents of the ST(1) register by the contents of the ST(0)
register and stores the product in the ST(1) register. The one-operand version multiplies the contents of the ST(0)
register by the contents of a memory location (either a floating point or an integer value) and stores the product in
the ST(0) register. The two-operand version, multiplies the contents of the ST(0) register by the contents of the
ST(i) register, or vice versa, with the result being stored in the register specified with the first operand (the destination
 operand).

The FMULP instructions perform the additional operation of popping the FPU register stack after storing the
product. To pop the register stack, the processor marks the ST(0) register as empty and increments the stack
pointer (TOP) by 1. The no-operand version of the floating-point multiply instructions always results in the register
stack being popped. In some assemblers, the mnemonic for this instruction is FMUL rather than FMULP.

The FIMUL instructions convert an integer source operand to double extended-
precision floating-point format before performing the multiplication.

The sign of the result is always the exclusive-OR of the source signs, even if one or more of the values being multi-
plied is 0 or ∞. When the source operand is an integer 0, it is treated as a +0.

The following table shows the results obtained when multiplying various classes of numbers, assuming that neither
overflow nor underflow occurs.
Table 3-29.  FMUL/FMULP/FIMUL Results
<table>
	<tr>
		<td colspan=7 rowspan=9><b>DEST − F + ∞ + F + F + 0 − 0 − F − F − ∞ NaN − 0 * + 0 + 0 + 0 − 0 − 0 − 0 * + 0 * − 0 − 0 − 0 + 0 + 0 + 0 * NaN NaN + F − ∞ − F − F − 0 + 0 + F + F + ∞ NaN − ∞ + ∞ + ∞ + ∞ * * − ∞ − ∞ − ∞ NaN + ∞ − ∞ − ∞ − ∞ * * + ∞ + ∞ + ∞ NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN SRC − ∞ − F − I − 0 + 0 + I + F + ∞ NaN</b></td>
	</tr>
	<tr>
		<td>+ F</td>
		<td>+ 0</td>
		<td>− 0</td>
		<td>− F</td>
		<td>− ∞</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>+ F</td>
		<td>+ 0</td>
		<td>− 0</td>
		<td>− F</td>
		<td>− ∞</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>+ 0</td>
		<td>+ 0</td>
		<td>− 0</td>
		<td>− 0</td>
		<td>*</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>− 0</td>
		<td>− 0</td>
		<td>+ 0</td>
		<td>+ 0</td>
		<td>*</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>− F</td>
		<td>− 0</td>
		<td>+ 0</td>
		<td>+ F</td>
		<td>+ ∞</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>− F</td>
		<td>− 0</td>
		<td>+ 0</td>
		<td>+ F</td>
		<td>+ ∞</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>− ∞</td>
		<td>*</td>
		<td>*</td>
		<td>+ ∞</td>
		<td>+ ∞</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>NaN</td>
		<td>NaN</td>
		<td>NaN</td>
		<td>NaN</td>
		<td>NaN</td>
		<td>NaN</td>
	</tr>
</table>

NOTES:
F Means finite floating-point value.
I Means Integer.
\* Indicates invalid-arithmetic-operand (\#IA) exception.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
IF Instruction = FIMUL
    THEN
        DEST ← DEST ∗ ConvertToDoubleExtendedPrecisionFP(SRC);
    ELSE (* Source operand is floating-point value *)
        DEST ← DEST ∗ SRC;
FI;
IF Instruction = FMULP 
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
One operand is ±0 and the other is ±∞.

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
If the DS, ES, FS, or GS register is used to access memory and it contains a NULL segment
selector.
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