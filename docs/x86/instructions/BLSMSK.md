<b>BLSMSK</b> —  Get Mask Up to Lowest Set Bit
<table>
	<tr>
		<td><b>Opcode/Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 -bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.NDD.LZ.0F38.W0 F3 /2 BLSMSK r32, r/m32</td>
		<td>VM</td>
		<td>V/V</td>
		<td>BMI1</td>
		<td>Set all lower bits in r32 to “1” starting from bit 0 to lowest set bit in r/m32.</td>
	</tr>
	<tr>
		<td>VEX.NDD.LZ.0F38.W1 F3 /2 BLSMSK r64, r/m64</td>
		<td>VM</td>
		<td>V/N.E.</td>
		<td>BMI1</td>
		<td>Set all lower bits in r64 to “1” starting from bit 0 to lowest set bit in r/m64.</td>
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
Sets all the lower bits of the destination operand to “1” up to and including lowest set bit (=1) in the source
operand. If source operand is zero, BLSMSK sets all bits of the destination operand to 1 and also sets CF to 1.

This instruction is not supported in real mode and virtual-8086 mode. The operand size is always 32 bits if not in
64-bit mode. In 64-bit mode operand size 64 requires VEX.W1. VEX.W1 is ignored in non-64-bit modes. An
attempt to execute this instruction with VEX.L not equal to 0 will cause \#UD.

### Operation

```java
temp ← (SRC-1) XOR (SRC) ;
SF ← temp[OperandSize -1];
ZF ← 0;
IF SRC = 0
    CF ← 1;
ELSE
    CF ← 0;
FI
DEST ← temp;
```
### Flags Affected

SF is updated based on the result. CF is set if the source if zero. ZF and OF flags are cleared. AF and PF flag are
undefined.

### Intel C/C++ Compiler Intrinsic Equivalent
```c
BLSMSK:
unsigned __int32 _blsmsk_u32(unsigned __int32 src);
BLSMSK:
unsigned __int64 _blsmsk_u64(unsigned __int64 src);
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