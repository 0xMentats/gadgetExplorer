<b>FABS</b> — Absolute Value
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D9 E1</td>
		<td>FABS</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Replace ST with its absolute value.</td>
	</tr>
</table>


### Description
Clears the sign bit of ST(0) to create the absolute value of the operand. The following table shows the results
obtained when creating the absolute value of various classes of numbers.

Table 3-17.  Results Obtained from FABS
<table>
	<tr>
		<td><b>ST(0) SRC</b></td>
		<td><b>ST(0) DEST</b></td>
	</tr>
	<tr>
		<td>− ∞</td>
		<td>+ ∞</td>
	</tr>
	<tr>
		<td>− F</td>
		<td>+ F</td>
	</tr>
	<tr>
		<td>− 0</td>
		<td>+ 0</td>
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

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
ST(0) ← |ST(0)|;
```
### FPU Flags Affected

C1
Set to 0.
C0, C2, C3
Undefined.

### Floating-Point Exceptions

<p>#IS
Stack underflow occurred.

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