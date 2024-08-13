<b>FLD1 / FLDL2T / FLDL2E / FLDPI / FLDLG2 / FLDLN2 / FLDZ</b> — Load Constant
<table>
	<tr>
		<td><b>Opcode*</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D9 E8</td>
		<td>FLD1</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Push +1.0 onto the FPU register stack.</td>
	</tr>
	<tr>
		<td>D9 E9</td>
		<td>FLDL2T</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Push log210 onto the FPU register stack.</td>
	</tr>
	<tr>
		<td>D9 EA</td>
		<td>FLDL2E</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Push log2e onto the FPU register stack.</td>
	</tr>
	<tr>
		<td>D9 EB</td>
		<td>FLDPI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Push π onto the FPU register stack.</td>
	</tr>
	<tr>
		<td>D9 EC</td>
		<td>FLDLG2</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Push log102 onto the FPU register stack.</td>
	</tr>
	<tr>
		<td>D9 ED</td>
		<td>FLDLN2</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Push loge2 onto the FPU register stack.</td>
	</tr>
	<tr>
		<td>D9 EE</td>
		<td>FLDZ</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Push +0.0 onto the FPU register stack.</td>
	</tr>
</table>

\* See IA-32 Architecture Compatibility section below.

### Description

Push one of seven commonly used constants (in double extended-precision floating-point format) onto the FPU
register stack. The constants that can be loaded with these instructions include +1.0, +0.0, log210, log2e, π, log102,
and loge2. For each constant, an internal 66-bit constant is rounded (as specified by the RC field in the FPU control
word) to double extended-precision floating-point format. The inexact-result exception (\#P) is not generated as a
result of the rounding, nor is the C1 flag set in the x87 FPU status word if the value is rounded up.

See the section titled “Approximation of Pi” in Chapter 8 of the Intel® 64 and IA-32 Architectures Software Devel-
oper’s Manual, Volume 1, for a description of the π constant.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### IA-32 Architecture Compatibility

When the RC field is set to round-to-nearest, the FPU produces the same constants that is produced by the Intel
8087 and Intel 287 math coprocessors.

### Operation

```java
TOP ← TOP − 1;
ST(0) ← CONSTANT;
```
### FPU Flags Affected

C1
Set to 1 if stack overflow occurred; otherwise, set to 0.
C0, C2, C3
Undefined.

### Floating-Point Exceptions

<p>#IS
Stack overflow occurred.

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

### Virtual-8086 Mode Exceptions
Same exceptions as in protected mode.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

Same exceptions as in protected mode.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
