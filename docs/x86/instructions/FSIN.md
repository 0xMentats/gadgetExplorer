<b>FSIN</b> — Sine
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D9 FE</td>
		<td>FSIN</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Replace ST(0) with the approximate of its sine.</td>
	</tr>
</table>


### Description
Computes an approximation of the sine of the source operand in register ST(0) and stores the result in ST(0). The
source operand must be given in radians and must be within the range −263 to +263. The following table shows the
results obtained when taking the sine of various classes of numbers, assuming that underflow does not occur.

Table 3-35.  FSIN Results
<table>
	<tr>
		<td><b>SRC (ST(0))</b></td>
		<td><b>DEST (ST(0))</b></td>
	</tr>
	<tr>
		<td>− ∞</td>
		<td>*</td>
	</tr>
	<tr>
		<td>− F</td>
		<td>− 1 to + 1</td>
	</tr>
	<tr>
		<td>− 0</td>
		<td>−0</td>
	</tr>
	<tr>
		<td>+ 0</td>
		<td>+ 0</td>
	</tr>
	<tr>
		<td>+ F</td>
		<td>− 1 to +1</td>
	</tr>
	<tr>
		<td>+ ∞</td>
		<td>*</td>
	</tr>
	<tr>
		<td>NaN</td>
		<td>NaN</td>
	</tr>
</table>

F Means finite floating-point value.
\* Indicates floating-point invalid-arithmetic-operand (\#IA) exception.

If the source operand is outside the acceptable range, the C2 flag in the FPU status word is set, and the value in
register ST(0) remains unchanged. The instruction does not raise an exception when the source operand is out of
range. It is up to the program to check the C2 flag for out-of-range conditions. Source values outside the range −
263 to +263 can be reduced to the range of the instruction by subtracting an appropriate integer multiple of 2π.
However, even within the range -263 to +263, inaccurate results can occur because the finite approximation of π
used internally for argument reduction is not sufficient in all cases. Therefore, for accurate results it is safe to apply
FSIN only to arguments reduced accurately in software, to a value smaller in absolute value than 3π/4. See the
sections titled “Approximation of Pi” and “Transcendental Instruction Accuracy” in Chapter 8 of the Intel® 64 and
IA-32 Architectures Software Developer’s Manual, Volume 1, for a discussion of the proper value to use for π in
performing such reductions.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
IF -263 < ST(0) < 263
    THEN
        C2 ← 0;
        ST(0) ← fsin(ST(0)); // approximation of the mathematical sin function
    ELSE (* Source operand out of range *)
        C2 ← 1;
FI;
```
### FPU Flags Affected

C1
Set to 0 if stack underflow occurred.
Set if result was rounded up; cleared otherwise.
Set to 1 if outside range (−263 < source operand < +263); otherwise, set to 0.
C2
C0, C3
Undefined.

### Floating-Point Exceptions
<p>#IS
Stack underflow occurred.
Source operand is an SNaN value, ∞, or unsupported format.
<p>#IA
<p>#D
Source operand is a denormal value.
<p>#P
Value cannot be represented exactly in destination format.

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