<b>BLSR</b> —  Reset Lowest Set Bit
<table>
	<tr>
		<td><b>Opcode/Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 -bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.NDD.LZ.0F38.W0 F3 /1 BLSR r32, r/m32</td>
		<td>VM</td>
		<td>V/V</td>
		<td>BMI1</td>
		<td>Reset lowest set bit of r/m32, keep all other bits of r/m32 and write result to r32.</td>
	</tr>
	<tr>
		<td>VEX.NDD.LZ.0F38.W1 F3 /1 BLSR r64, r/m64</td>
		<td>VM</td>
		<td>V/N.E.</td>
		<td>BMI1</td>
		<td>Reset lowest set bit of r/m64, keep all other bits of r/m64 and write result to r64.</td>
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
		<td>VM</td>
		<td>VEX.vvvv (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Copies all bits from the source operand to the destination operand and resets (=0) the bit position in the destination
 operand that corresponds to the lowest set bit of the source operand. If the source operand is zero BLSR sets
CF.

This instruction is not supported in real mode and virtual-8086 mode. The operand size is always 32 bits if not in
64-bit mode. In 64-bit mode operand size 64 requires VEX.W1. VEX.W1 is ignored in non-64-bit modes. An attempt
to execute this instruction with VEX.L not equal to 0 will cause \#UD.

### Operation

```java
temp ← (SRC-1) bitwiseAND ( SRC );
SF ← temp[OperandSize -1];
ZF ← (temp = 0);
IF SRC = 0
    CF ← 1;
ELSE
    CF ← 0;
FI
DEST ← temp;
```
### Flags Affected

ZF and SF flags are updated based on the result. CF is set if the source is zero. OF flag is cleared. AF and PF flags
are undefined.

### Intel C/C++ Compiler Intrinsic Equivalent
```c
BLSR:
unsigned __int32 _blsr_u32(unsigned __int32 src);
BLSR:
unsigned __int64 _blsr_u64(unsigned __int64 src);
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