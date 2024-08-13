<b>FCOM / FCOMP / FCOMPP</b> — Compare Floating Point Values
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D8 /2</td>
		<td>FCOM m32fp</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare ST(0) with m32fp.</td>
	</tr>
	<tr>
		<td>DC /2</td>
		<td>FCOM m64fp</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare ST(0) with m64fp.</td>
	</tr>
	<tr>
		<td>D8 D0+i</td>
		<td>FCOM ST(i)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare ST(0) with ST(i).</td>
	</tr>
	<tr>
		<td>D8 D1</td>
		<td>FCOM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare ST(0) with ST(1).</td>
	</tr>
	<tr>
		<td>D8 /3</td>
		<td>FCOMP m32fp</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare ST(0) with m32fp and pop register stack.</td>
	</tr>
	<tr>
		<td>DC /3</td>
		<td>FCOMP m64fp</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare ST(0) with m64fp and pop register stack.</td>
	</tr>
	<tr>
		<td>D8 D8+i</td>
		<td>FCOMP ST(i)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare ST(0) with ST(i) and pop register stack.</td>
	</tr>
	<tr>
		<td>D8 D9</td>
		<td>FCOMP</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare ST(0) with ST(1) and pop register stack.</td>
	</tr>
	<tr>
		<td>DE D9</td>
		<td>FCOMPP</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare ST(0) with ST(1) and pop register stack twice.</td>
	</tr>
</table>


### Description
Compares the contents of register ST(0) and source value and sets condition code flags C0, C2, and C3 in the FPU
status word according to the results (see the table below). The source operand can be a data register or a memory
location. If no source operand is given, the value in ST(0) is compared with the value in ST(1). The sign of zero is
ignored, so that –0.0 is equal to +0.0.

Table 3-21.  FCOM/FCOMP/FCOMPP Results
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
		<td>Unordered*</td>
		<td>1</td>
		<td>1</td>
		<td>1</td>
	</tr>
</table>

\* Flags not set if unmasked invalid-arithmetic-operand (\#IA) exception is generated.

This instruction checks the class of the numbers being compared (see “FXAM—Examine Floating-Point” in this
chapter). If either operand is a NaN or is in an unsupported format, an invalid-arithmetic-operand exception (\#IA)
is raised and, if the exception is masked, the condition flags are set to “unordered.” If the invalid-arithmetic-
operand exception is unmasked, the condition code flags are not set.

The FCOMP instruction pops the register stack following the comparison operation and the FCOMPP instruction
pops the register stack twice following the comparison operation. To pop the register stack, the processor marks
the ST(0) register as empty and increments the stack pointer (TOP) by 1.

The FCOM instructions perform the same operation as the FUCOM instructions. The only difference is how they
handle QNaN operands. The FCOM instructions raise an invalid-arithmetic-operand exception (\#IA) when either or
both of the operands is a NaN value or is in an unsupported format. The FUCOM instructions perform the same
operation as the FCOM instructions, except that they do not generate an invalid-arithmetic-operand exception for
QNaNs.

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
IF ST(0) or SRC = NaN or unsupported format
    THEN 
        #IA
        IF FPUControlWord.IM = 1
            THEN 
                C3, C2, C0 ← 111;
        FI;
FI;
IF Instruction = FCOMP 
    THEN 
        PopRegisterStack;
FI;
IF Instruction = FCOMPP 
    THEN 
        PopRegisterStack;
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
Register is marked empty.
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