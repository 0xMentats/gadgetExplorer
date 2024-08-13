<b>F2XM1</b> — Compute 2x–1
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D9 F0</td>
		<td>F2XM1</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Replace ST(0) with (2ST(0) – 1).</td>
	</tr>
</table>


### Description
Computes the exponential value of 2 to the power of the source operand minus 1. The source operand is located in
register ST(0) and the result is also stored in ST(0). The value of the source operand must lie in the range –1.0 to
+1.0. If the source value is outside this range, the result is undefined.

The following table shows the results obtained when computing the exponential value of various classes of
numbers, assuming that neither overflow nor underflow occurs.

Table 3-16.  Results Obtained from F2XM1
<table>
	<tr>
		<td><b>ST(0) SRC</b></td>
		<td><b>ST(0) DEST</b></td>
	</tr>
	<tr>
		<td>− 1.0 to −0</td>
		<td>− 0.5 to − 0</td>
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
		<td>+ 0 to +1.0</td>
		<td>+ 0 to 1.0</td>
	</tr>
</table>

Values other than 2 can be exponentiated using the following formula:

xy ← 2(y ∗ log2x)

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
ST(0) ← (2ST(0) − 1);
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
Source is a denormal value.
<p>#U
Result is too small for destination format.
<p>#P
Value cannot be represented exactly in destination format.

### Protected Mode Exceptions

<p>#NM
CR0.EM[bit 2] or CR0.TS[bit 3] = 1.
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