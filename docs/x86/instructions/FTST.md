<b>FTST</b> — TEST
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D9 E4</td>
		<td>FTST</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Compare ST(0) with 0.0.</td>
	</tr>
</table>


### Description
Compares the value in the ST(0) register with 0.0 and sets the condition code flags C0, C2, and C3 in the FPU
status word according to the results (see table below).

Table 3-40.  FTST Results
<table>
	<tr>
		<td><b>Condition</b></td>
		<td><b>C3</b></td>
		<td><b>C2</b></td>
		<td><b>C0</b></td>
	</tr>
	<tr>
		<td>ST(0) > 0.0</td>
		<td>0</td>
		<td>0</td>
		<td>0</td>
	</tr>
	<tr>
		<td>ST(0) < 0.0</td>
		<td>0</td>
		<td>0</td>
		<td>1</td>
	</tr>
	<tr>
		<td>ST(0) = 0.0</td>
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

This instruction performs an “unordered comparison.” An unordered comparison also checks the class of the
numbers being compared (see “FXAM—Examine Floating-Point” in this chapter). If the value in register ST(0) is a
NaN or is in an undefined format, the condition flags are set to “unordered” and the invalid operation exception is
generated.
The sign of zero is ignored, so that (– 0.0 ← +0.0).

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
CASE (relation of operands) OF
                    C3, C2, C0 ← 111;
    Not comparable:
    ST(0) > 0.0:
                    C3, C2, C0 ← 000;
    ST(0) < 0.0:
                    C3, C2, C0 ← 001;
    ST(0) = 0.0:
                    C3, C2, C0 ← 100;
ESAC;
```
### FPU Flags Affected

C1
Set to 0.
C0, C2, C3
See Table 3-40.

### Floating-Point Exceptions

<p>#IS
Stack underflow occurred.
<p>#IA
The source operand is a NaN value or is in an unsupported format.
<p>#D
The source operand is a denormal value.

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