<b>PDEP</b> —  Parallel Bits Deposit
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 -bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.NDS.LZ.F2.0F38.W0 F5 /r PDEP r32a, r32b, r/m32</td>
		<td>RVM</td>
		<td>V/V</td>
		<td>BMI2</td>
		<td>Parallel deposit of bits from r32b using mask in r/m32, result is writ- ten to r32a.</td>
	</tr>
	<tr>
		<td>VEX.NDS.LZ.F2.0F38.W1 F5 /r PDEP r64a, r64b, r/m64</td>
		<td>RVM</td>
		<td>V/N.E.</td>
		<td>BMI2</td>
		<td>Parallel deposit of bits from r64b using mask in r/m64, result is writ- ten to r64a.</td>
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
PDEP uses a mask in the second source operand (the third operand) to transfer/scatter contiguous low order bits in
the first source operand (the second operand) into the destination (the first operand). PDEP takes the low bits from
the first source operand and deposit them in the destination operand at the corresponding bit locations that are set
in the second source operand (mask). All other bits (bits not set in mask) in destination are set to zero.
<table>
	<tr>
		<td><b>S31 S30 S29 S28 S27</b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b>S7 S6 S5</b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b>S4</b></td>
		<td><b>S3</b></td>
		<td><b>S2 S1 S0</b></td>
		<td><b></b></td>
		<td><b></b></td>
	</tr>
</table>

<table>
	<tr>
		<td><b>0</b></td>
		<td><b>100</b></td>
		<td><b></b></td>
		<td colspan=2><b></b></td>
		<td><b>0</b></td>
		<td colspan=2><b>01</b></td>
		<td><b></b></td>
		<td colspan=2><b>01</b></td>
		<td><b></b></td>
		<td><b>0</b></td>
		<td colspan=2><b>1</b></td>
		<td><b>0</b></td>
		<td><b>0</b></td>
	</tr>
	<tr>
		<td colspan=4 rowspan=2></td>
		<td colspan=3 rowspan=2></td>
		<td colspan=4 rowspan=2></td>
		<td colspan=4 rowspan=2></td>
	</tr>
</table>

<table>
	<tr>
		<td colspan=4 rowspan=3><b>0 S2</b></td>
		<td colspan=3 rowspan=3><b>0 S1</b></td>
		<td colspan=4 rowspan=3><b>0 0 S0</b></td>
		<td colspan=4 rowspan=3><b>0 0</b></td>
	</tr>
	<tr>
		<td>0 0</td>
		<td></td>
		<td>0</td>
		<td colspan=2>S3</td>
		<td>0</td>
		<td colspan=2>S2</td>
		<td>0</td>
		<td colspan=2>S1</td>
		<td>0</td>
		<td>0</td>
		<td colspan=2>S0</td>
		<td>0</td>
		<td>0</td>
	</tr>
</table>

bit 31

Figure 4-8.  PDEP Example

This instruction is not supported in real mode and virtual-8086 mode. The operand size is always 32 bits if not in
64-bit mode. In 64-bit mode operand size 64 requires VEX.W1. VEX.W1 is ignored in non-64-bit modes. An attempt
to execute this instruction with VEX.L not equal to 0 will cause \#UD.

### Operation

```java
TEMP ← SRC1;
MASK ← SRC2;
DEST ← 0 ;
m← 0, k← 0;
DO WHILE m< OperandSize
        IF MASK[ m] = 1 THEN
            DEST[ m] ← TEMP[ k];
            k ← k+ 1;
            
        FI
        m ← m+ 1;
OD
<table>
</table>

```
### Flags Affected
None.

### Intel C/C++ Compiler Intrinsic Equivalent
```c
PDEP:
unsigned __int32 _pdep_u32(unsigned __int32 src, unsigned __int32 mask);
unsigned __int64 _pdep_u64(unsigned __int64 src, unsigned __int32 mask);
PDEP:
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