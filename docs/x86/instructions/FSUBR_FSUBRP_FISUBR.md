<b>FSUBR / FSUBRP / FISUBR</b> — Reverse Subtract
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D8 /5</td>
		<td>FSUBR m32fp</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract ST(0) from m32fp and store result in ST(0).</td>
	</tr>
	<tr>
		<td>DC /5</td>
		<td>FSUBR m64fp</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract ST(0) from m64fp and store result in ST(0).</td>
	</tr>
	<tr>
		<td>D8 E8+i</td>
		<td>FSUBR ST(0), ST(i)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract ST(0) from ST(i) and store result in ST(0).</td>
	</tr>
	<tr>
		<td>DC E0+i</td>
		<td>FSUBR ST(i), ST(0)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract ST(i) from ST(0) and store result in ST(i).</td>
	</tr>
	<tr>
		<td>DE E0+i</td>
		<td>FSUBRP ST(i), ST(0)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract ST(i) from ST(0), store result in ST(i), and pop register stack.</td>
	</tr>
	<tr>
		<td>DE E1</td>
		<td>FSUBRP</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract ST(1) from ST(0), store result in ST(1), and pop register stack.</td>
	</tr>
	<tr>
		<td>DA /5</td>
		<td>FISUBR m32int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract ST(0) from m32int and store result in ST(0).</td>
	</tr>
	<tr>
		<td>DE /5</td>
		<td>FISUBR m16int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Subtract ST(0) from m16int and store result in ST(0).</td>
	</tr>
</table>


### Description
Subtracts the destination operand from the source operand and stores the difference in the destination location.
The destination operand is always an FPU register; the source operand can be a register or a memory location.
Source operands in memory can be in single-precision or double-precision floating-point format or in word or
doubleword integer format.

These instructions perform the reverse operations of the FSUB, FSUBP, and FISUB instructions. They are provided
to support more efficient coding.

The no-operand version of the instruction subtracts the contents of the ST(1) register from the ST(0) register and
stores the result in ST(1). The one-operand version subtracts the contents of the ST(0) register from the contents
of a memory location (either a floating-point or an integer value) and stores the result in ST(0). The two-operand
version, subtracts the contents of the ST(i) register from the ST(0) register or vice versa.

The FSUBRP instructions perform the additional operation of popping the FPU register stack following the subtrac-
tion. To pop the register stack, the processor marks the ST(0) register as empty and increments the stack pointer
(TOP) by 1. The no-operand version of the floating-point reverse subtract instructions always results in the register
stack being popped. In some assemblers, the mnemonic for this instruction is FSUBR rather than FSUBRP.

The FISUBR instructions convert an integer source operand to double extended-precision floating-point format
before performing the subtraction.

The following table shows the results obtained when subtracting various classes of numbers from one another,
assuming that neither overflow nor underflow occurs. Here, the DEST value is subtracted from the SRC value (SRC
− DEST = result).

When the difference between two operands of like sign is 0, the result is +0, except for the round toward −∞ mode,
in which case the result is −0. This instruction also guarantees that +0 − (−0) = +0, and that −0 − (+0) = −0. When the
source operand is an integer 0, it is treated as a +0.

When one operand is ∞, the result is ∞ of the expected sign. If both operands are ∞ of the same sign, an invalid-
operation exception is generated.
Table 3-39.  FSUBR/FSUBRP/FISUBR Results
<table>
	<tr>
		<td colspan=7 rowspan=7><b>DEST − ∞ − F − 0 + 0 + F + ∞ NaN − ∞ * − ∞ − ∞ − ∞ − ∞ − ∞ NaN −F or −I + ∞ ±F or ±0 SRC SRC − F − ∞ NaN SRC −0 + ∞ +0 + ∞ −DEST −DEST + 0 ±0 ±0 − 0 −DEST − ∞ NaN +F or +I + ∞ + F SRC SRC −DEST ±F or ±0 − ∞ NaN − ∞ NaN + ∞ + ∞ + ∞ + ∞ + ∞ + ∞ * NaN NaN NaN NaN NaN NaN NaN NaN NaN</b></td>
	</tr>
	<tr>
		<td>±F or ±0</td>
		<td>−DEST</td>
		<td>−DEST</td>
		<td>+ F</td>
		<td>+ ∞</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>SRC</td>
		<td>±0</td>
		<td>+ 0</td>
		<td>SRC</td>
		<td>+ ∞</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>SRC</td>
		<td>− 0</td>
		<td>±0</td>
		<td>SRC</td>
		<td>+ ∞</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>− F</td>
		<td>−DEST</td>
		<td>−DEST</td>
		<td>±F or ±0</td>
		<td>+ ∞</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>− ∞</td>
		<td>− ∞</td>
		<td>− ∞</td>
		<td>− ∞</td>
		<td>*</td>
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
I Means integer.
\* Indicates floating-point invalid-arithmetic-operand (\#IA) exception.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
IF Instruction = FISUBR
    THEN
        DEST ← ConvertToDoubleExtendedPrecisionFP(SRC) − DEST;
    ELSE (* Source operand is floating-point value *)
        DEST ← SRC − DEST; FI;
IF Instruction = FSUBRP 
    THEN 
        PopRegisterStack; FI;
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
Operands are infinities of like sign.
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