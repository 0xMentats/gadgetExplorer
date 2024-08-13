<b>FUCOM / FUCOMP / FUCOMPP</b> — Unordered Compare Floating Point Values
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>DD E0+i</td>
		<td>FUCOM ST(i)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare ST(0) with ST(i).</td>
	</tr>
	<tr>
		<td>DD E1</td>
		<td>FUCOM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare ST(0) with ST(1).</td>
	</tr>
	<tr>
		<td>DD E8+i</td>
		<td>FUCOMP ST(i)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare ST(0) with ST(i) and pop register stack.</td>
	</tr>
	<tr>
		<td>DD E9</td>
		<td>FUCOMP</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare ST(0) with ST(1) and pop register stack.</td>
	</tr>
	<tr>
		<td>DA E9</td>
		<td>FUCOMPP</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare ST(0) with ST(1) and pop register stack twice.</td>
	</tr>
</table>


### Description
Performs an unordered comparison of the contents of register ST(0) and ST(i) and sets condition code flags C0, C2,
and C3 in the FPU status word according to the results (see the table below). If no operand is specified, the
contents of registers ST(0) and ST(1) are compared. The sign of zero is ignored, so that –0.0 is equal to +0.0.

Table 3-41.  FUCOM/FUCOMP/FUCOMPP Results
<table>
	<tr>
		<td><b>Comparison Results*</b></td>
		<td><b>C3</b></td>
		<td><b>C2</b></td>
		<td><b>C0</b></td>
	</tr>
	<tr>
		<td>ST0 > ST(i)</td>
		<td>0</td>
		<td>0</td>
		<td>0</td>
	</tr>
	<tr>
		<td>ST0 < ST(i)</td>
		<td>0</td>
		<td>0</td>
		<td>1</td>
	</tr>
	<tr>
		<td>ST0 = ST(i)</td>
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

\* Flags not set if unmasked invalid-arithmetic-operand (\#IA) exception is generated.

An unordered comparison checks the class of the numbers being compared (see “FXAM—Examine Floating-Point”
in this chapter). The FUCOM/FUCOMP/FUCOMPP instructions perform the same operations as the
FCOM/FCOMP/FCOMPP instructions. The only difference is that the FUCOM/FUCOMP/FUCOMPP instructions raise
the invalid-arithmetic-operand exception (\#IA) only when either or both operands are an SNaN or are in an unsup-
ported format; QNaNs cause the condition code flags to be set to unordered, but do not cause an exception to be
generated. The FCOM/FCOMP/FCOMPP instructions raise an invalid-operation exception when either or both of the
operands are a NaN value of any kind or are in an unsupported format.

As with the FCOM/FCOMP/FCOMPP instructions, if the operation results in an invalid-arithmetic-operand exception
being raised, the condition code flags are set only if the exception is masked.

The FUCOMP instruction pops the register stack following the comparison operation and the FUCOMPP instruction
pops the register stack twice following the comparison operation. To pop the register stack, the processor marks
the ST(0) register as empty and increments the stack pointer (TOP) by 1.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
CASE (relation of operands) OF
    ST > SRC:
                    C3, C2, C0 ← 000;
    ST < SRC:
                    C3, C2, C0 ← 001;
    ST = SRC:
                    C3, C2, C0 ← 100;
ESAC;
IF ST(0) or SRC = QNaN, but not SNaN or unsupported format
    THEN 
        C3, C2, C0 ← 111;
    ELSE (* ST(0) or SRC is SNaN or unsupported format *)
         #IA;
        IF FPUControlWord.IM = 1
            THEN 
                C3, C2, C0 ← 111;
        FI;
FI;
IF Instruction = FUCOMP 
    THEN 
        PopRegisterStack;
FI;
IF Instruction = FUCOMPP 
    THEN 
        PopRegisterStack; 
FI;
```
### FPU Flags Affected
C1
Set to 0 if stack underflow occurred.
C0, C2, C3
See Table 3-41.

### Floating-Point Exceptions

<p>#IS
Stack underflow occurred.
<p>#IA
One or both operands are SNaN values or have unsupported formats. Detection of a QNaN
value in and of itself does not raise an invalid-operand exception.
<p>#D
One or both operands are denormal values.

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