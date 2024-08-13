<b>FISTTP</b> — Store Integer with Truncation
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode Compat/</b></td>
		<td><b>Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>DF /1</td>
		<td>FISTTP m16int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Store ST(0) in m16int with truncation.</td>
	</tr>
	<tr>
		<td>DB /1</td>
		<td>FISTTP m32int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Store ST(0) in m32int with truncation.</td>
	</tr>
	<tr>
		<td>DD /1</td>
		<td>FISTTP m64int</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Store ST(0) in m64int with truncation.</td>
	</tr>
</table>


### Description
FISTTP converts the value in ST into a signed integer using truncation (chop) as rounding mode, transfers the
result to the destination, and pop ST. FISTTP accepts word, short integer, and long integer destinations.

The following table shows the results obtained when storing various classes of numbers in integer format.

Table 3-28.  FISTTP Results
<table>
	<tr>
		<td><b>ST(0)</b></td>
		<td><b>DEST</b></td>
	</tr>
	<tr>
		<td>− ∞  or  Value Too Large for DEST Format</td>
		<td>*</td>
	</tr>
	<tr>
		<td>F ≤  − 1</td>
		<td>− I</td>
	</tr>
	<tr>
		<td>− 1 < F < + 1</td>
		<td>0</td>
	</tr>
	<tr>
		<td>F Š + 1</td>
		<td>+ I</td>
	</tr>
	<tr>
		<td>+ ∞  or Value Too Large for DEST Format</td>
		<td>*</td>
	</tr>
	<tr>
		<td>NaN</td>
		<td>*</td>
	</tr>
</table>

F Means finite floating-point value.
Ι Means integer.
∗ Indicates floating-point invalid-operation (\#IA) exception.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
DEST ←  ST;
pop ST;
```
### Flags Affected

C1 is cleared; C0, C2, C3 undefined.

### Numeric Exceptions

Invalid, Stack Invalid (stack underflow), Precision.

### Protected Mode Exceptions

<p>#GP(0)
If the destination is in a nonwritable segment.
For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.
<p>#SS(0)
For an illegal address in the SS segment.
<p>#PF(fault-code)
For a page fault.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.
<p>#NM
If CR0.EM[bit 2] = 1.
If CR0.TS[bit 3] = 1.
<p>#UD
If CPUID.01H:ECX.SSE3[bit 0] = 0.
If the LOCK prefix is used.
Real Address Mode Exceptions
GP(0)
If any part of the operand would lie outside of the effective address space from 0 to 0FFFFH.
<p>#NM
If CR0.EM[bit 2] = 1.
If CR0.TS[bit 3] = 1.
<p>#UD
If CPUID.01H:ECX.SSE3[bit 0] = 0.
If the LOCK prefix is used.

### Virtual 8086 Mode Exceptions

GP(0)
If any part of the operand would lie outside of the effective address space from 0 to 0FFFFH.
<p>#NM
If CR0.EM[bit 2] = 1.
If CR0.TS[bit 3] = 1.
<p>#UD
If CPUID.01H:ECX.SSE3[bit 0] = 0.
If the LOCK prefix is used.
<p>#PF(fault-code)
For a page fault.
<p>#AC(0)
For unaligned memory reference if the current privilege is 3.

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
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
