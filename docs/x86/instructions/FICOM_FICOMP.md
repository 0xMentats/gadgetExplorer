<b>FICOM / FICOMP</b> — Compare Integer
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>DE /2</td>
		<td>FICOM m16int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare ST(0) with m16int.</td>
	</tr>
	<tr>
		<td>DA /2</td>
		<td>FICOM m32int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare ST(0) with m32int.</td>
	</tr>
	<tr>
		<td>DE /3</td>
		<td>FICOMP m16int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare ST(0) with m16int and pop stack register.</td>
	</tr>
	<tr>
		<td>DA /3</td>
		<td>FICOMP m32int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare ST(0) with m32int and pop stack register.</td>
	</tr>
</table>


### Description
Compares the value in ST(0) with an integer source operand and sets the condition code flags C0, C2, and C3 in
the FPU status word according to the results (see table below). The integer value is converted to double extended-
precision floating-point format before the comparison is made.

Table 3-26.  FICOM/FICOMP Results
<table>
	<tr>
		<td><b>Condition</b></td>
		<td><b>C3</b></td>
		<td><b>C2</b></td>
		<td><b>C0</b></td>
	</tr>
	<tr>
		<td>ST(0) > SRC</td>
		<td>0</td>
		<td>0</td>
		<td>0</td>
	</tr>
	<tr>
		<td>ST(0) < SRC</td>
		<td>0</td>
		<td>0</td>
		<td>1</td>
	</tr>
	<tr>
		<td>ST(0) = SRC</td>
		<td>1</td>
		<td>0</td>
		<td>0</td>
	</tr>
	<tr>
		<td>Unordered</td>
		<td>1</td>
		<td>1</td>
		<td>1</td>
	</tr>
</table>

These instructions perform an “unordered comparison.” An unordered comparison also checks the class of the
numbers being compared (see “FXAM—Examine Floating-Point” in this chapter). If either operand is a NaN or is in
an undefined format, the condition flags are set to “unordered.”
The sign of zero is ignored, so that –0.0 ← +0.0.

The FICOMP instructions pop the register stack following the comparison. To pop the register stack, the processor
marks the ST(0) register empty and increments the stack pointer (TOP) by 1.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
CASE (relation of operands) OF
    ST(0) > SRC:
                    C3, C2, C0 ← 000;
    ST(0) < SRC:
                    C3, C2, C0 ← 001;
    ST(0) = SRC:
                    C3, C2, C0 ← 100;
                    C3, C2, C0 ← 111;
    Unordered:
ESAC;
IF Instruction = FICOMP 
    THEN 
        PopRegisterStack; 
FI;
```
### FPU Flags Affected

C1
Set to 0.
C0, C2, C3
See table on previous page.

### Floating-Point Exceptions

<p>#IS
Stack underflow occurred.
<p>#IA
One or both operands are NaN values or have unsupported formats.
<p>#D
One or both operands are denormal values.

### Protected Mode Exceptions
<p>#GP(0)
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