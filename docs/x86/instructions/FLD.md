<b>FLD</b> — Load Floating Point Value
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D9 /0</td>
		<td>FLD m32fp</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Push m32fp onto the FPU register stack.</td>
	</tr>
	<tr>
		<td>DD /0</td>
		<td>FLD m64fp</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Push m64fp onto the FPU register stack.</td>
	</tr>
	<tr>
		<td>DB /5</td>
		<td>FLD m80fp</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Push m80fp onto the FPU register stack.</td>
	</tr>
	<tr>
		<td>D9 C0+i</td>
		<td>FLD ST(i)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Push ST(i) onto the FPU register stack.</td>
	</tr>
</table>


### Description
Pushes the source operand onto the FPU register stack. The source operand can be in single-precision, double-
precision, or double extended-precision floating-point format. If the source operand is in single-precision or
double-precision floating-point format, it is automatically converted to the double extended-precision floating-
point format before being pushed on the stack.

The FLD instruction can also push the value in a selected FPU register [ST(i)] onto the stack. Here, pushing register
ST(0) duplicates the stack top.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
IF SRC is ST(i)
    THEN
        temp ← ST(i);
FI;
TOP ← TOP − 1;
IF SRC is memory-operand
    THEN
        ST(0) ← ConvertToDoubleExtendedPrecisionFP(SRC);
    ELSE (* SRC is ST(i) *)
        ST(0) ← temp;
FI;
```
### FPU Flags Affected

C1
Set to 1 if stack overflow occurred; otherwise, set to 0.
C0, C2, C3
Undefined.

### Floating-Point Exceptions

<p>#IS
Stack underflow or overflow occurred.
<p>#IA
Source operand is an SNaN. Does not occur if the source operand is in double extended-precision
 floating-point format (FLD m80fp or FLD ST(i)).
<p>#D
Source operand is a denormal value. Does not occur if the source operand is in double
extended-precision floating-point format.

### Protected Mode Exceptions
<p>#GP(0)
If destination is located in a non-writable segment.
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