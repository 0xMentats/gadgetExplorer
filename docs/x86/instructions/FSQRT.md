<b>FSQRT</b> — Square Root
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D9 FA</td>
		<td>FSQRT</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Computes square root of ST(0) and stores the result in ST(0).</td>
	</tr>
</table>


### Description
Computes the square root of the source value in the ST(0) register and stores the result in ST(0).

The following table shows the results obtained when taking the square root of various classes of numbers,
assuming that neither overflow nor underflow occurs.

Table 3-37.  FSQRT Results
<table>
	<tr>
		<td><b>SRC (ST(0))</b></td>
		<td><b>DEST (ST(0))</b></td>
	</tr>
	<tr>
		<td>− ∞</td>
		<td>*</td>
	</tr>
	<tr>
		<td>− F</td>
		<td>*</td>
	</tr>
	<tr>
		<td>− 0</td>
		<td>− 0</td>
	</tr>
	<tr>
		<td>+ 0</td>
		<td>+ 0</td>
	</tr>
	<tr>
		<td>+ F</td>
		<td>+ F</td>
	</tr>
	<tr>
		<td>+ ∞</td>
		<td>+ ∞</td>
	</tr>
	<tr>
		<td>NaN</td>
		<td>NaN</td>
	</tr>
</table>

F Means finite floating-point value.
\* Indicates floating-point invalid-arithmetic-operand (\#IA) exception.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
ST(0) ← SquareRoot(ST(0));
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
Source operand is a negative value (except for −0).

<p>#D
Source operand is a denormal value.
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