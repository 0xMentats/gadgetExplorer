<b>FSCALE</b> — Scale
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D9 FD</td>
		<td>FSCALE</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Scale ST(0) by ST(1).</td>
	</tr>
</table>


### Description
Truncates the value in the source operand (toward 0) to an integral value and adds that value to the exponent of
the destination operand. The destination and source operands are floating-point values located in registers ST(0)
and ST(1), respectively. This instruction provides rapid multiplication or division by integral powers of 2. The
following table shows the results obtained when scaling various classes of numbers, assuming that neither over-
flow nor underflow occurs.

Table 3-34.  FSCALE Results
<table>
	<tr>
		<td colspan=5 rowspan=7><b>ST(0) ST(1) − ∞ − F − 0 + 0 + F + ∞ NaN − ∞ NaN − 0 − 0 + 0 + 0 NaN NaN − F − ∞ − F − 0 + 0 + F + ∞ NaN − 0 − ∞ − F − 0 + 0 + F + ∞ NaN + 0 − ∞ − F − 0 + 0 + F + ∞ NaN + F − ∞ − F − 0 + 0 + F + ∞ NaN + ∞ − ∞ − ∞ NaN NaN + ∞ + ∞ NaN NaN NaN NaN NaN NaN NaN NaN NaN</b></td>
	</tr>
	<tr>
		<td>− F</td>
		<td>− F</td>
		<td>− F</td>
		<td>− F − ∞ NaN</td>
	</tr>
	<tr>
		<td>− 0</td>
		<td>− 0</td>
		<td>− 0</td>
		<td>− 0 NaN NaN</td>
	</tr>
	<tr>
		<td>+ 0</td>
		<td>+ 0</td>
		<td>+ 0</td>
		<td>+ 0 NaN NaN</td>
	</tr>
	<tr>
		<td>+ F</td>
		<td>+ F</td>
		<td>+ F</td>
		<td>+ F + ∞ NaN</td>
	</tr>
	<tr>
		<td>+ ∞</td>
		<td>+ ∞</td>
		<td>+ ∞</td>
		<td>+ ∞ + ∞ NaN</td>
	</tr>
	<tr>
		<td>NaN</td>
		<td>NaN</td>
		<td>NaN</td>
		<td>NaN NaN NaN</td>
	</tr>
</table>

F Means finite floating-point value.

In most cases, only the exponent is changed and the mantissa (significand) remains unchanged. However, when
the value being scaled in ST(0) is a denormal value, the mantissa is also changed and the result may turn out to be
a normalized number. Similarly, if overflow or underflow results from a scale operation, the resulting mantissa will
differ from the source’s mantissa.

The FSCALE instruction can also be used to reverse the action of the FXTRACT instruction, as shown in the following
example:

FXTRACT;
FSCALE;
FSTP ST(1);
In this example, the FXTRACT instruction extracts the significand and exponent from the value in ST(0) and stores
them in ST(0) and ST(1) respectively. The FSCALE then scales the significand in ST(0) by the exponent in ST(1),
recreating the original value before the FXTRACT operation was performed. The FSTP ST(1) instruction overwrites
the exponent (extracted by the FXTRACT instruction) with the recreated value, which returns the stack to its orig-
inal state with only one register [ST(0)] occupied.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
ST(0) ← ST(0) ∗ 2RoundTowardZero(ST(1));
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