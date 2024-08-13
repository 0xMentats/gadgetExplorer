<b>FXCH</b> — Exchange Register Contents
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D9 C8+i</td>
		<td>FXCH ST(i)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Exchange the contents of ST(0) and ST(i).</td>
	</tr>
	<tr>
		<td>D9 C9</td>
		<td>FXCH</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Exchange the contents of ST(0) and ST(1).</td>
	</tr>
</table>


### Description
Exchanges the contents of registers ST(0) and ST(i). If no source operand is specified, the contents of ST(0) and
ST(1) are exchanged.

This instruction provides a simple means of moving values in the FPU register stack to the top of the stack [ST(0)],
so that they can be operated on by those floating-point instructions that can only operate on values in ST(0). For
example, the following instruction sequence takes the square root of the third register from the top of the register
stack:

FXCH ST(3);
FSQRT;
FXCH ST(3);
This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
IF (Number-of-operands) is 1
    THEN
        temp ← ST(0);
        ST(0) ← SRC;
        SRC ← temp;
    ELSE
        temp ← ST(0);
        ST(0) ← ST(1);
        ST(1) ← temp;
FI;
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