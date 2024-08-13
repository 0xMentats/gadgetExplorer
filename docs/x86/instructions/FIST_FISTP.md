<b>FIST / FISTP</b> — Store Integer
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>DF /2</td>
		<td>FIST m16int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Store ST(0) in m16int.</td>
	</tr>
	<tr>
		<td>DB /2</td>
		<td>FIST m32int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Store ST(0) in m32int.</td>
	</tr>
	<tr>
		<td>DF /3</td>
		<td>FISTP m16int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Store ST(0) in m16int and pop register stack.</td>
	</tr>
	<tr>
		<td>DB /3</td>
		<td>FISTP m32int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Store ST(0) in m32int and pop register stack.</td>
	</tr>
	<tr>
		<td>DF /7</td>
		<td>FISTP m64int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Store ST(0) in m64int and pop register stack.</td>
	</tr>
</table>


### Description
The FIST instruction converts the value in the ST(0) register to a signed integer and stores the result in the destination
 operand. Values can be stored in word or doubleword integer format. The destination operand specifies the
address where the first byte of the destination value is to be stored.

The FISTP instruction performs the same operation as the FIST instruction and then pops the register stack. To pop
the register stack, the processor marks the ST(0) register as empty and increments the stack pointer (TOP) by 1.
The FISTP instruction also stores values in quadword integer format.

The following table shows the results obtained when storing various classes of numbers in integer format.

Table 3-27.  FIST/FISTP Results
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
		<td>F ≤ −1</td>
		<td>− I</td>
	</tr>
	<tr>
		<td>−1 < F < −0</td>
		<td>**</td>
	</tr>
	<tr>
		<td>− 0</td>
		<td>0</td>
	</tr>
	<tr>
		<td>+ 0</td>
		<td>0</td>
	</tr>
	<tr>
		<td>+ 0 < F < + 1</td>
		<td>**</td>
	</tr>
	<tr>
		<td>F ≥ + 1</td>
		<td>+ I</td>
	</tr>
	<tr>
		<td>+ ∞ or Value Too Large for DEST Format</td>
		<td>*</td>
	</tr>
	<tr>
		<td>NaN</td>
		<td>*</td>
	</tr>
	<tr>
		<td colspan=2>NOTES: F Means finite floating-point value. I Means integer. * Indicates floating-point invalid-operation (#IA) exception. ** 0 or ±1, depending on the rounding mode.</td>
	</tr>
</table>

If the source value is a non-integral value, it is rounded to an integer value, according to the rounding mode spec-
ified by the RC field of the FPU control word.
If the converted value is too large for the destination format, or if the source operand is an ∞, SNaN, QNAN, or is in
an unsupported format, an invalid-arithmetic-operand condition is signaled. If the invalid-operation exception is
not masked, an invalid-arithmetic-operand exception (\#IA) is generated and no value is stored in the destination
operand. If the invalid-operation exception is masked, the integer indefinite value is stored in memory.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
DEST ← Integer(ST(0));
IF Instruction = FISTP 
    THEN 
        PopRegisterStack;
FI;
```
### FPU Flags Affected
C1
Set to 0 if stack underflow occurred.
Indicates rounding direction of if the inexact exception (\#P) is generated: 0 ← not roundup; 1
← roundup.

Set to 0 otherwise.
C0, C2, C3
Undefined.

### Floating-Point Exceptions

<p>#IS
Stack underflow occurred.
<p>#IA
Converted value is too large for the destination format.
Source operand is an SNaN, QNaN, ±∞, or unsupported format.

<p>#P
Value cannot be represented exactly in destination format.

### Protected Mode Exceptions

<p>#GP(0)
If the destination is located in a non-writable segment.
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