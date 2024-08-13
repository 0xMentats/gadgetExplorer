<b>ANDN</b> —  Logical AND NOT
<table>
	<tr>
		<td><b>Opcode/Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 -bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.NDS.LZ.0F38.W0 F2 /r ANDN r32a, r32b, r/m32</td>
		<td>RVM V/V</td>
		<td></td>
		<td>BMI1</td>
		<td>Bitwise AND of inverted r32b with r/m32, store result in r32a.</td>
	</tr>
	<tr>
		<td>VEX.NDS.LZ. 0F38.W1 F2 /r ANDN r64a, r64b, r/m64</td>
		<td>RVM V/NE</td>
		<td></td>
		<td>BMI1</td>
		<td>Bitwise AND of inverted r64b with r/m64, store result in r64a.</td>
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
		<td>RVM</td>
		<td>ModRM:reg (w)</td>
		<td>VEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
Performs a bitwise logical AND of inverted second operand (the first source operand) with the third operand (the
second source operand). The result is stored in the first operand (destination operand).
This instruction is not supported in real mode and virtual-8086 mode. The operand size is always 32 bits if not in
64-bit mode. In 64-bit mode operand size 64 requires VEX.W1. VEX.W1 is ignored in non-64-bit modes. An
attempt to execute this instruction with VEX.L not equal to 0 will cause \#UD.

### Operation

```java
DEST ← (NOT SRC1) bitwiseAND SRC2;
SF ← DEST[OperandSize -1];
ZF ← (DEST = 0);
```
### Flags Affected

SF and ZF are updated based on result. OF and CF flags are cleared. AF and PF flags are undefined.

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