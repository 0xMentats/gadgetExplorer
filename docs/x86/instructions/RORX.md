<b>RORX</b> —  Rotate Right Logical Without Affecting Flags
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 -bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.LZ.F2.0F3A.W0 F0 /r ib RORX r32, r/m32, imm8</td>
		<td>RMI</td>
		<td>V/V</td>
		<td>BMI2</td>
		<td>Rotate 32-bit r/m32 right imm8 times without affecting arithmetic flags.</td>
	</tr>
	<tr>
		<td>VEX.LZ.F2.0F3A.W1 F0 /r ib RORX r64, r/m64, imm8</td>
		<td>RMI</td>
		<td>V/N.E.</td>
		<td>BMI2</td>
		<td>Rotate 64-bit r/m64 right imm8 times without affecting arithmetic flags.</td>
	</tr>
</table>


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
		<td>RMI</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>Imm8</td>
		<td>NA</td>
	</tr>
</table>


### Description
Rotates the bits of second operand right by the count value specified in imm8 without affecting arithmetic flags.
The RORX instruction does not read or write the arithmetic flags.

This instruction is not supported in real mode and virtual-8086 mode. The operand size is always 32 bits if not in
64-bit mode. In 64-bit mode operand size 64 requires VEX.W1. VEX.W1 is ignored in non-64-bit modes. An
attempt to execute this instruction with VEX.L not equal to 0 will cause \#UD.

### Operation

```java
IF (OperandSize = 32)
    y ← imm8 AND 1FH;
    DEST ← (SRC >> y) | (SRC << (32-y));
ELSEIF (OperandSize = 64 ) 
    y ← imm8 AND 3FH;
    DEST ← (SRC >> y) | (SRC << (64-y));
ENDIF
```
### Flags Affected

None

### Intel C/C++ Compiler Intrinsic Equivalent
```c
Auto-generated from high-level language.
```
### SIMD Floating-Point Exceptions

None

### Other Exceptions

See Section 2.5.1, “Exception Conditions for VEX-Encoded GPR Instructions”, Table 2-29; additionally
<p>#UD
If VEX.W = 1.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
