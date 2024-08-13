<b>FBSTP</b> — Store BCD Integer and Pop
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>DF /6</td>
		<td>FBSTP m80bcd</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Store ST(0) in m80bcd and pop ST(0).</td>
	</tr>
</table>


### Description
Converts the value in the ST(0) register to an 18-digit packed BCD integer, stores the result in the destination
operand, and pops the register stack. If the source value is a non-integral value, it is rounded to an integer value,
according to rounding mode specified by the RC field of the FPU control word. To pop the register stack, the
processor marks the ST(0) register as empty and increments the stack pointer (TOP) by 1.

The destination operand specifies the address where the first byte destination value is to be stored. The BCD value
(including its sign bit) requires 10 bytes of space in memory.

The following table shows the results obtained when storing various classes of numbers in packed BCD format.

Table 3-19.  FBSTP Results
<table>
	<tr>
		<td><b>ST(0)</b></td>
		<td><b>DEST</b></td>
	</tr>
	<tr>
		<td>− ∞ or Value Too Large for DEST Format</td>
		<td>*</td>
	</tr>
	<tr>
		<td>F ≤ − 1</td>
		<td>− D</td>
	</tr>
	<tr>
		<td>−1 < F < -0</td>
		<td>**</td>
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
		<td>+ 0 < F < +1</td>
		<td>**</td>
	</tr>
	<tr>
		<td>F ≥ +1</td>
		<td>+ D</td>
	</tr>
	<tr>
		<td>+ ∞ or Value Too Large for DEST Format</td>
		<td>*</td>
	</tr>
	<tr>
		<td>NaN</td>
		<td>*</td>
	</tr>
</table>

F Means finite floating-point value.
D Means packed-BCD number.
\* Indicates floating-point invalid-operation (\#IA) exception.
\*\* ±0 or ±1, depending on the rounding mode.

If the converted value is too large for the destination format, or if the source operand is an ∞, SNaN, QNAN, or is in
an unsupported format, an invalid-arithmetic-operand condition is signaled. If the invalid-operation exception is
not masked, an invalid-arithmetic-operand exception (\#IA) is generated and no value is stored in the destination
operand. If the invalid-operation exception is masked, the packed BCD indefinite value is stored in memory.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
DEST ← BCD(ST(0));
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
Converted value that exceeds 18 BCD digits in length.
Source operand is an SNaN, QNaN, ±∞, or in an unsupported format.

<p>#P
Value cannot be represented exactly in destination format.

### Protected Mode Exceptions

<p>#GP(0)
If a segment register is being loaded with a segment selector that points to a non-writable
segment.
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register contains a NULL segment selector.
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