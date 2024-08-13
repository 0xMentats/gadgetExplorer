<b>FFREE</b> — Free Floating-Point Register
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>DD C0+i</td>
		<td>FFREE ST(i)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Sets tag for ST(i) to empty.</td>
	</tr>
</table>


### Description
Sets the tag in the FPU tag register associated with register ST(i) to empty (11B). The contents of ST(i) and the FPU
stack-top pointer (TOP) are not affected.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
TAG(i) ← 11B;
```
### FPU Flags Affected

C0, C1, C2, C3 undefined.

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