<b>FCOS</b> —  Cosine
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D9 FF</td>
		<td>FCOS</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Replace ST(0) with its approximate cosine.</td>
	</tr>
</table>


### Description
Computes the approximate cosine of the source operand in register ST(0) and stores the result in ST(0). The
source operand must be given in radians and must be within the range −263 to +263. The following table shows the
results obtained when taking the cosine of various classes of numbers.

Table 3-23.  FCOS Results
<table>
	<tr>
		<td><b>ST(0) SRC</b></td>
		<td><b>ST(0) DEST</b></td>
	</tr>
	<tr>
		<td>− ∞</td>
		<td>*</td>
	</tr>
	<tr>
		<td>− F</td>
		<td>−1 to +1</td>
	</tr>
	<tr>
		<td>− 0</td>
		<td>+ 1</td>
	</tr>
	<tr>
		<td>+ 0</td>
		<td>+ 1</td>
	</tr>
	<tr>
		<td>+ F</td>
		<td>− 1 to + 1</td>
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
\*  Indicates floating-point invalid-arithmetic-operand (\#IA) exception.

If the source operand is outside the acceptable range, the C2 flag in the FPU status word is set, and the value in
register ST(0) remains unchanged. The instruction does not raise an exception when the source operand is out of
range. It is up to the program to check the C2 flag for out-of-range conditions. Source values outside the range −
263 to +263 can be reduced to the range of the instruction by subtracting an appropriate integer multiple of 2π.
However, even within the range -263 to +263, inaccurate results can occur because the finite approximation of π
used internally for argument reduction is not sufficient in all cases. Therefore, for accurate results it is safe to apply
FCOS only to arguments reduced accurately in software, to a value smaller in absolute value than 3π/8. See the
sections titled “Approximation of Pi” and “Transcendental Instruction Accuracy” in Chapter 8 of the Intel® 64 and
IA-32 Architectures Software Developer’s Manual, Volume 1, for a discussion of the proper value to use for π in
performing such reductions.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
IF |ST(0)| < 263
THEN
    C2 ← 0;
    ST(0) ← FCOS(ST(0)); // approximation of cosine
ELSE (* Source operand is out-of-range *)
    C2 ← 1;
FI;
```
### FPU Flags Affected
C1
Set to 0 if stack underflow occurred.
Set if result was rounded up; cleared otherwise.
Undefined if C2 is 1.
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
Source is a denormal value.
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