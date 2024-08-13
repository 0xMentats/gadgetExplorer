<b>FPATAN</b> — Partial Arctangent
<table>
	<tr>
		<td><b>Opcode*</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D9 F3</td>
		<td>FPATAN</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Replace ST(1) with arctan(ST(1)/ST(0)) and pop the register stack.</td>
	</tr>
</table>

\* See IA-32 Architecture Compatibility section below.

### Description

Computes the arctangent of the source operand in register ST(1) divided by the source operand in register ST(0),
stores the result in ST(1), and pops the FPU register stack. The result in register ST(0) has the same sign as the
source operand ST(1) and a magnitude less than +π.

The FPATAN instruction returns the angle between the X axis and the line from the origin to the point (X,Y), where
Y (the ordinate) is ST(1) and X (the abscissa) is ST(0). The angle depends on the sign of X and Y independently,
not just on the sign of the ratio Y/X. This is because a point (−X,Y) is in the second quadrant, resulting in an angle
between π/2 and π, while a point (X,−Y) is in the fourth quadrant, resulting in an angle between 0 and −π/2. A point
(−X,−Y) is in the third quadrant, giving an angle between −π/2 and −π.

The following table shows the results obtained when computing the arctangent of various classes of numbers,
assuming that underflow does not occur.

Table 3-30.  FPATAN Results
<table>
	<tr>
		<td colspan=7 rowspan=7><b>ST(1) − ∞ − F − 0 + 0 + F + ∞ NaN − ∞ − 3π/4* -p -p +p +p +3π/4* NaN ST(0) − F − π/2 −π to −π/2 -p + p +π to +π/2 +π/2 − 0 − π/2 −π/2 -p* + π* + π/2 +π/2 + 0 − π/2 −π/2 − 0* + 0* +π/2 +π/2 + F − π/2 −π/2 to −0 − 0 + 0 +π/2 to +0 + π/2 NaN NaN NaN NaN + ∞ − π/4* - 0 − 0 + 0 + 0 + π/4* NaN NaN NaN NaN NaN NaN NaN NaN NaN</b></td>
	</tr>
	<tr>
		<td>−π to −π/2</td>
		<td>−π/2</td>
		<td>−π/2</td>
		<td>−π/2 to −0</td>
		<td>- 0</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>-p</td>
		<td>-p*</td>
		<td>− 0*</td>
		<td>− 0</td>
		<td>− 0</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>+ p</td>
		<td>+ π*</td>
		<td>+ 0*</td>
		<td>+ 0</td>
		<td>+ 0</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>+π to +π/2</td>
		<td>+ π/2</td>
		<td>+π/2</td>
		<td>+π/2 to +0</td>
		<td>+ 0</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>+π/2</td>
		<td>+π/2</td>
		<td>+π/2</td>
		<td>+ π/2</td>
		<td>+ π/4*</td>
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
\* Table 8-10 in the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 1, specifies that the ratios 0/0 and ∞/∞

generate the floating-point invalid arithmetic-operation exception and, if this exception is masked, the floating-point QNaN indefi-
nite value is returned. With the FPATAN instruction, the 0/0 or ∞/∞ value is actually not calculated using division. Instead, the arc-

tangent of the two variables is derived from a standard mathematical formulation that is generalized to allow complex numbers as
arguments. In this complex variable formulation, arctangent(0,0) etc. has well defined values. These values are needed to develop
a library to compute transcendental functions with complex arguments, based on the FPU functions that only allow floating-point
values as arguments.

There is no restriction on the range of source operands that FPATAN can accept.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### IA-32 Architecture Compatibility

The source operands for this instruction are restricted for the 80287 math coprocessor to the following range:

0 ≤ |ST(1)| < |ST(0)| < +∞

### Operation

```java
ST(1) ← arctan(ST(1) / ST(0));
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
Source operand is an SNaN value or unsupported format.
<p>#D
Source operand is a denormal value.
<p>#U
Result is too small for destination format.
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