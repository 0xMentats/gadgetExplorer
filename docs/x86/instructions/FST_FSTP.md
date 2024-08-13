<b>FST / FSTP</b> — Store Floating Point Value
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D9 /2</td>
		<td>FST m32fp</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Copy ST(0) to m32fp.</td>
	</tr>
	<tr>
		<td>DD /2</td>
		<td>FST m64fp</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Copy ST(0) to m64fp.</td>
	</tr>
	<tr>
		<td>DD D0+i</td>
		<td>FST ST(i)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Copy ST(0) to ST(i).</td>
	</tr>
	<tr>
		<td>D9 /3</td>
		<td>FSTP m32fp</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Copy ST(0) to m32fp and pop register stack.</td>
	</tr>
	<tr>
		<td>DD /3</td>
		<td>FSTP m64fp</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Copy ST(0) to m64fp and pop register stack.</td>
	</tr>
	<tr>
		<td>DB /7</td>
		<td>FSTP m80fp</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Copy ST(0) to m80fp and pop register stack.</td>
	</tr>
	<tr>
		<td>DD D8+i</td>
		<td>FSTP ST(i)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Copy ST(0) to ST(i) and pop register stack.</td>
	</tr>
</table>


### Description
The FST instruction copies the value in the ST(0) register to the destination operand, which can be a memory location
 or another register in the FPU register stack. When storing the value in memory, the value is converted to
single-precision or double-precision floating-point format.

The FSTP instruction performs the same operation as the FST instruction and then pops the register stack. To pop
the register stack, the processor marks the ST(0) register as empty and increments the stack pointer (TOP) by 1.
The FSTP instruction can also store values in memory in double extended-precision floating-point format.

If the destination operand is a memory location, the operand specifies the address where the first byte of the destination
 value is to be stored. If the destination operand is a register, the operand specifies a register in the register
stack relative to the top of the stack.

If the destination size is single-precision or double-precision, the significand of the value being stored is rounded to
the width of the destination (according to the rounding mode specified by the RC field of the FPU control word), and
the exponent is converted to the width and bias of the destination format. If the value being stored is too large for
the destination format, a numeric overflow exception (\#O) is generated and, if the exception is unmasked, no
value is stored in the destination operand. If the value being stored is a denormal value, the denormal exception
(\#D) is not generated. This condition is simply signaled as a numeric underflow exception (\#U) condition.
If the value being stored is ±0, ±∞, or a NaN, the least-significant bits of the significand and the exponent are trun-
cated to fit the destination format. This operation preserves the value’s identity as a 0, ∞, or NaN.

If the destination operand is a non-empty register, the invalid-operation exception is not generated.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
DEST ← ST(0);
IF Instruction = FSTP 
    THEN 
        PopRegisterStack; 
FI;
```
### FPU Flags Affected

C1
Set to 0 if stack underflow occurred.
Indicates rounding direction of if the floating-point inexact exception (\#P) is generated: 0 ←
not roundup; 1 ← roundup.

C0, C2, C3
Undefined.

### Floating-Point Exceptions
<p>#IS
Stack underflow occurred.
<p>#IA
If destination result is an SNaN value or unsupported format, except when the destination
format is in double extended-precision floating-point format.
<p>#U
Result is too small for the destination format.
<p>#O
Result is too large for the destination format.
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