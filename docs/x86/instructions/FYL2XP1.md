<b>FYL2XP1</b> — Compute y ∗ log2(x +1)
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D9 F9</td>
		<td>FYL2XP1</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Replace ST(1) with ST(1) ∗ log2(ST(0) + 1.0) and pop the register stack.</td>
	</tr>
</table>


### Description
Computes (ST(1) ∗ log2(ST(0) + 1.0)), stores the result in register ST(1), and pops the FPU register stack. The
source operand in ST(0) must be in the range:
–(
2 2⁄
) )to 1
–(
2 2⁄
)
–
1

The source operand in ST(1) can range from −∞ to +∞. If the ST(0) operand is outside of its acceptable range, the
result is undefined and software should not rely on an exception being generated. Under some circumstances
exceptions may be generated when ST(0) is out of range, but this behavior is implementation specific and not
guaranteed.

The following table shows the results obtained when taking the log epsilon of various classes of numbers, assuming
that underflow does not occur.

Table 3-49.  FYL2XP1 Results
<table>
	<tr>
		<td colspan=7 rowspan=7><b>ST(0) −(1 − ( )) to −0 2 2⁄ +∞ +F +0 − 0 − F − ∞ NaN -0 * +0 +0 − 0 − 0 * +0 * -0 -0 +0 +0 * NaN NaN 2 2⁄ )) +0 to +(1 - ( − ∞ − F − 0 +0 +F +∞ NaN NaN NaN NaN NaN NaN NaN NaN NaN ST(1) − ∞ − F − 0 +0 +F +∞ NaN</b></td>
	</tr>
	<tr>
		<td>+0</td>
		<td>-0</td>
		<td colspan=2>− F</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>+0</td>
		<td>-0</td>
		<td colspan=2>− 0</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>− 0</td>
		<td>+0</td>
		<td colspan=2>+0</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>− 0</td>
		<td>+0</td>
		<td colspan=2>+F</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>*</td>
		<td>*</td>
		<td colspan=2>+∞</td>
		<td>NaN</td>
	</tr>
	<tr>
		<td>NaN</td>
		<td>NaN</td>
		<td colspan=2>NaN</td>
		<td>NaN</td>
	</tr>
</table>

NOTES:
F Means finite floating-point value.
\* Indicates floating-point invalid-operation (\#IA) exception.

This instruction provides optimal accuracy for values of epsilon [the value in register ST(0)] that are close to 0. For
small epsilon (ε) values, more significant digits can be retained by using the FYL2XP1 instruction than by using
(ε+1) as an argument to the FYL2X instruction. The (ε+1) expression is commonly found in compound interest and
annuity calculations. The result can be simply converted into a value in another logarithm base by including a scale
factor in the ST(1) source operand. The following equation is used to calculate the scale factor for a particular loga-
rithm base, where n is the logarithm base desired for the result of the FYL2XP1 instruction:

scale factor ← logn 2

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
ST(1) ← ST(1) ∗ log2(ST(0) + 1.0);
PopRegisterStack;
<table>
</table>

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
Either operand is an SNaN value or unsupported format.
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