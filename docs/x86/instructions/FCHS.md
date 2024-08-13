<b>FCHS</b> — Change Sign
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D9 E0</td>
		<td>FCHS</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Complements sign of ST(0).</td>
	</tr>
</table>


### Description
Complements the sign bit of ST(0). This operation changes a positive value into a negative value of equal magni-
tude or vice versa. The following table shows the results obtained when changing the sign of various classes of
numbers.

Table 3-20.  FCHS Results
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
		<td>− 0</td>
	</tr>
	<tr>
		<td>+ F</td>
		<td>− F</td>
	</tr>
	<tr>
		<td>+ ∞</td>
		<td>− ∞</td>
	</tr>
	<tr>
		<td>NaN</td>
		<td>NaN</td>
	</tr>
</table>

\* F means finite floating-point value.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
SignBit(ST(0)) ← NOT (SignBit(ST(0)));
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