<b>BLSI</b> —  Extract Lowest Set Isolated Bit
<table>
	<tr>
		<td><b>Opcode/Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 -bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.NDD.LZ.0F38.W0 F3 /3 BLSI r32, r/m32</td>
		<td>VM</td>
		<td>V/V</td>
		<td>BMI1</td>
		<td>Extract lowest set bit from r/m32 and set that bit in r32.</td>
	</tr>
	<tr>
		<td>VEX.NDD.LZ.0F38.W1 F3 /3 BLSI r64, r/m64</td>
		<td>VM</td>
		<td>V/N.E.</td>
		<td>BMI1</td>
		<td>Extract lowest set bit from r/m64, and set that bit in r64.</td>
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
Extracts the lowest set bit from the source operand and set the corresponding bit in the destination register. All
other bits in the destination operand are zeroed. If no bits are set in the source operand, BLSI sets all the bits in the
destination to 0 and sets ZF and CF.

This instruction is not supported in real mode and virtual-8086 mode. The operand size is always 32 bits if not in
64-bit mode. In 64-bit mode operand size 64 requires VEX.W1. VEX.W1 is ignored in non-64-bit modes. An attempt
to execute this instruction with VEX.L not equal to 0 will cause \#UD.

### Operation

```java
temp ← (-SRC) bitwiseAND (SRC); 
SF ← temp[OperandSize -1];
ZF ← (temp = 0);
IF SRC = 0
    CF ← 0;
ELSE
    CF ← 1;
FI
DEST ← temp;
```
### Flags Affected

ZF and SF are updated based on the result. CF is set if the source is not zero. OF flags are cleared. AF and PF
flags are undefined.

### Intel C/C++ Compiler Intrinsic Equivalent
```c
BLSI:
unsigned __int32 _blsi_u32(unsigned __int32 src);
BLSI:
unsigned __int64 _blsi_u64(unsigned __int64 src);
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