<b>MULX</b> —  Unsigned Multiply Without Affecting Flags
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 -bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.NDD.LZ.F2.0F38.W0 F6 /r MULX r32a, r32b, r/m32</td>
		<td>RVM</td>
		<td>V/V</td>
		<td>BMI2</td>
		<td>Unsigned multiply of r/m32 with EDX without affecting arithmetic flags.</td>
	</tr>
	<tr>
		<td>VEX.NDD.LZ.F2.0F38.W1 F6 /r MULX r64a, r64b, r/m64</td>
		<td>RVM</td>
		<td>V/N.E.</td>
		<td>BMI2</td>
		<td>Unsigned multiply of r/m64 with RDX without affecting arithmetic flags.</td>
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
		<td>VEX.vvvv (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>RDX/EDX is implied 64/32 bits source</td>
	</tr>
</table>


### Description
Performs an unsigned multiplication of the implicit source operand (EDX/RDX) and the specified source operand
(the third operand) and stores the low half of the result in the second destination (second operand), the high half
of the result in the first destination operand (first operand), without reading or writing the arithmetic flags. This
enables efficient programming where the software can interleave add with carry operations and multiplications.

If the first and second operand are identical, it will contain the high half of the multiplication result.

This instruction is not supported in real mode and virtual-8086 mode. The operand size is always 32 bits if not in
64-bit mode. In 64-bit mode operand size 64 requires VEX.W1. VEX.W1 is ignored in non-64-bit modes. An attempt
to execute this instruction with VEX.L not equal to 0 will cause \#UD.

### Operation

```java
// DEST1: ModRM:reg
// DEST2: VEX.vvvv
IF (OperandSize = 32)
    SRC1 ← EDX;
    DEST2 ← (SRC1*SRC2)[31:0];
    DEST1 ← (SRC1*SRC2)[63:32];
ELSE IF (OperandSize = 64)
    SRC1 ← RDX;
        DEST2 ← (SRC1*SRC2)[63:0];
        DEST1 ← (SRC1*SRC2)[127:64];
FI
```
### Flags Affected

None

### Intel C/C++ Compiler Intrinsic Equivalent
```c
Auto-generated from high-level language when possible.
unsigned int mulx_u32(unsigned int a, unsigned int b, unsigned int * hi);
unsigned __int64 mulx_u64(unsigned __int64 a, unsigned __int64 b, unsigned __int64 * hi);
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