<b>FILD</b> — Load Integer
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>DF /0</td>
		<td>FILD m16int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Push m16int onto the FPU register stack.</td>
	</tr>
	<tr>
		<td>DB /0</td>
		<td>FILD m32int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Push m32int onto the FPU register stack.</td>
	</tr>
	<tr>
		<td>DF /5</td>
		<td>FILD m64int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Push m64int onto the FPU register stack.</td>
	</tr>
</table>


### Description
Converts the signed-integer source operand into double extended-precision floating-point format and pushes the
value onto the FPU register stack. The source operand can be a word, doubleword, or quadword integer. It is loaded
without rounding errors. The sign of the source operand is preserved.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
TOP ← TOP − 1;
ST(0) ← ConvertToDoubleExtendedPrecisionFP(SRC);
```
### FPU Flags Affected

C1
Set to 1 if stack overflow occurred; set to 0 otherwise.
C0, C2, C3
Undefined.

### Floating-Point Exceptions

<p>#IS
Stack overflow occurred.

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