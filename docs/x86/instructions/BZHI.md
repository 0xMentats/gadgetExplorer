<b>BZHI</b> —  Zero High Bits Starting with Specified Bit Position
<table>
	<tr>
		<td><b>Opcode/Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 -bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.NDS.LZ.0F38.W0 F5 /r BZHI r32a, r/m32, r32b</td>
		<td>RMV</td>
		<td>V/V</td>
		<td>BMI2</td>
		<td>Zero bits in r/m32 starting with the position in r32b, write result to r32a.</td>
	</tr>
	<tr>
		<td>VEX.NDS.LZ.0F38.W1 F5 /r BZHI r64a, r/m64, r64b</td>
		<td>RMV</td>
		<td>V/N.E.</td>
		<td>BMI2</td>
		<td>Zero bits in r/m64 starting with the position in r64b, write result to r64a.</td>
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
		<td>RMV</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>VEX.vvvv (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
BZHI copies the bits of the first source operand (the second operand) into the destination operand (the first
operand) and clears the higher bits in the destination according to the INDEX value specified by the second source
operand (the third operand). The INDEX is specified by bits 7:0 of the second source operand. The INDEX value is
saturated at the value of OperandSize -1. CF is set, if the number contained in the 8 low bits of the third operand
is greater than OperandSize -1.

This instruction is not supported in real mode and virtual-8086 mode. The operand size is always 32 bits if not in
64-bit mode. In 64-bit mode operand size 64 requires VEX.W1. VEX.W1 is ignored in non-64-bit modes. An
attempt to execute this instruction with VEX.L not equal to 0 will cause \#UD.

### Operation

```java
N ← SRC2[7:0]
DEST ← SRC1
IF (N < OperandSize)
    DEST[OperandSize-1:N] ← 0
FI
IF (N > OperandSize - 1)
    CF ← 1
ELSE
    CF ← 0
FI
```
### Flags Affected

ZF, CF and SF flags are updated based on the result. OF flag is cleared. AF and PF flags are undefined.

### Intel C/C++ Compiler Intrinsic Equivalent
```c
BZHI:
unsigned __int32 _bzhi_u32(unsigned __int32 src, unsigned __int32 index);
BZHI:
unsigned __int64 _bzhi_u64(unsigned __int64 src, unsigned __int32 index);
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