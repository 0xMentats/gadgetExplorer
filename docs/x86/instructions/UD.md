<b>UD01 / UD1 / UD2</b> — Undefined Instruction
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>0F FF /r</td>
		<td>UD01 r32, r/m32</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Raise invalid opcode exception.</td>
	</tr>
	<tr>
		<td>0F B9 /r</td>
		<td>UD1 r32, r/m32</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Raise invalid opcode exception.</td>
	</tr>
	<tr>
		<td>0F 0B</td>
		<td>UD2</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Raise invalid opcode exception.</td>
	</tr>
</table>

NOTES: 1. Some older processors decode the UD0 instruction without a ModR/M byte. As a result, those processors would deliver an 
invalid-opcode exception instead of a fault on instruction fetch when the instruction with a ModR/M byte (and any implied bytes) would
cross a page or segment boundary.

### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand 2</b></td>
		<td><b>Operand 3</b></td>
		<td><b>Operand 4</b></td>
	</tr>
	<tr>
		<td>ZO</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>RM</td>
		<td>ModRM:reg (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Generates an invalid opcode exception. This instruction is provided for software testing to explicitly generate an
invalid opcode exception. The opcodes for this instruction are reserved for this purpose.

Other than raising the invalid opcode exception, this instruction has no effect on processor state or memory.

Even though it is the execution of the UD instruction that causes the invalid opcode exception, the instruction
pointer saved by delivery of the exception references the UD instruction (and not the following instruction).

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
#UD (* Generates invalid opcode exception *);
```
### Flags Affected

None.

### Exceptions (All Operating Modes)

<p>#UD
Raises an invalid opcode exception in all operating modes.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
