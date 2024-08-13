<b>FYL2X</b> — Compute y ∗ log2x
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D9 F1</td>
		<td>FYL2X</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Replace ST(1) with (ST(1) ∗ log2ST(0)) and pop the register stack.</td>
	</tr>
</table>


### Description
Computes (ST(1) ∗ log2 (ST(0))), stores the result in resister ST(1), and pops the FPU register stack. The source
operand in ST(0) must be a non-zero positive number.

The following table shows the results obtained when taking the log of various classes of numbers, assuming that
neither overflow nor underflow occurs.

Table 3-48.  FYL2X Results
<table>
	<tr>
		<td colspan=8 rowspan=7><b>ST(1) − ∞ − F − 0 + 0 + F + ∞ NaN − ∞ * * * * * * NaN − F * * * * * * NaN ±0 + ∞ ** * * ** − ∞ NaN ST(0) +0<+F<+1 + ∞ + F + 0 − 0 − F − ∞ NaN + 1 * − 0 − 0 + 0 + 0 * NaN + F > + 1 − ∞ − F − 0 + 0 + F + ∞ NaN + ∞ − ∞ − ∞ * * + ∞ + ∞ NaN NaN NaN NaN NaN NaN NaN NaN NaN</b></td>
	</tr>
	<tr>
		<td>*</td>
		<td>**</td>
		<td>+ F</td>
		<td>− 0</td>
		<td>− F</td>
		<td>− ∞</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>*</td>
		<td>*</td>
		<td>+ 0</td>
		<td>− 0</td>
		<td>− 0</td>
		<td>*</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>*</td>
		<td>*</td>
		<td>− 0</td>
		<td>+ 0</td>
		<td>+ 0</td>
		<td>*</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>*</td>
		<td>**</td>
		<td>− F</td>
		<td>+ 0</td>
		<td>+ F</td>
		<td>+ ∞</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>*</td>
		<td>− ∞</td>
		<td>− ∞</td>
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
		<td>NaN</td>
	</tr>
</table>

NOTES:
F Means finite floating-point value.
\* Indicates floating-point invalid-operation (\#IA) exception.
\*\* Indicates floating-point zero-divide (\#Z) exception.

If the divide-by-zero exception is masked and register ST(0) contains ±0, the instruction returns ∞ with a sign that
is the opposite of the sign of the source operand in register ST(1).

The FYL2X instruction is designed with a built-in multiplication to optimize the calculation of logarithms with an
arbitrary positive base (b):

logbx ← (log2b)–1 ∗ log2x

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
ST(1) ← ST(1) ∗ log2ST(0);
PopRegisterStack;
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
Either operand is an SNaN or unsupported format.
Source operand in register ST(0) is a negative finite value
(not -0).
Source operand in register ST(0) is ±0.
<p>#Z
<p>#D
Source operand is a denormal value.
<p>#U
Result is too small for destination format.
<p>#O
Result is too large for destination format.
<p>#P
Value cannot be represented exactly in destination format.

### Protected Mode Exceptions

<p>#NM
CR0.EM[bit 2] or CR0.TS[bit 3] = 1.
<p>#MF
If there is a pending x87 FPU exception.
<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

Same exceptions as in protected mode.

### Virtual-8086 Mode Exceptions

Same exceptions as in protected mode.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

Same exceptions as in protected mode.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
