<b>FXAM</b> — Examine Floating-Point
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D9 E5</td>
		<td>FXAM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Classify value or number in ST(0).</td>
	</tr>
</table>


### Description
Examines the contents of the ST(0) register and sets the condition code flags C0, C2, and C3 in the FPU status word
to indicate the class of value or number in the register (see the table below).

Table 3-42.  FXAM Results
.
<table>
	<tr>
		<td><b>Class</b></td>
		<td><b>C3</b></td>
		<td><b>C2</b></td>
		<td><b>C0</b></td>
	</tr>
	<tr>
		<td>Unsupported</td>
		<td>0</td>
		<td>0</td>
		<td>0</td>
	</tr>
	<tr>
		<td>NaN</td>
		<td>0</td>
		<td>0</td>
		<td>1</td>
	</tr>
	<tr>
		<td>Normal finite number</td>
		<td>0</td>
		<td>1</td>
		<td>0</td>
	</tr>
	<tr>
		<td>Infinity</td>
		<td>0</td>
		<td>1</td>
		<td>1</td>
	</tr>
	<tr>
		<td>Zero</td>
		<td>1</td>
		<td>0</td>
		<td>0</td>
	</tr>
	<tr>
		<td>Empty</td>
		<td>1</td>
		<td>0</td>
		<td>1</td>
	</tr>
	<tr>
		<td>Denormal number</td>
		<td>1</td>
		<td>1</td>
		<td>0</td>
	</tr>
</table>

The C1 flag is set to the sign of the value in ST(0), regardless of whether the register is empty or full.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
C1 ← sign bit of ST; (* 0 for positive, 1 for negative *)
CASE (class of value or number in ST(0)) OF
    Unsupported:C3, C2, C0 ← 000;
                C3, C2, C0 ← 001;
    NaN:
                C3, C2, C0 ← 010;
    Normal:
                C3, C2, C0 ← 011;
    Infinity:
                C3, C2, C0 ← 100;
    Zero:
                C3, C2, C0 ← 101;
    Empty:
                C3, C2, C0 ← 110;
    Denormal:
ESAC;
```
### FPU Flags Affected

C1
Sign of value in ST(0).
C0, C2, C3
See Table 3-42.

### Floating-Point Exceptions

None

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