<b>PEXT</b> —  Parallel Bits Extract
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 -bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.NDS.LZ.F3.0F38.W0 F5 /r PEXT r32a, r32b, r/m32</td>
		<td>RVM</td>
		<td>V/V</td>
		<td>BMI2</td>
		<td>Parallel extract of bits from r32b using mask in r/m32, result is writ- ten to r32a.</td>
	</tr>
	<tr>
		<td>VEX.NDS.LZ.F3.0F38.W1 F5 /r PEXT r64a, r64b, r/m64</td>
		<td>RVM</td>
		<td>V/N.E.</td>
		<td>BMI2</td>
		<td>Parallel extract of bits from r64b using mask in r/m64, result is writ- ten to r64a.</td>
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
PEXT uses a mask in the second source operand (the third operand) to transfer either contiguous or non-contig-
uous bits in the first source operand (the second operand) to contiguous low order bit positions in the destination
(the first operand). For each bit set in the MASK, PEXT extracts the corresponding bits from the first source operand
and writes them into contiguous lower bits of destination operand. The remaining upper bits of destination are
zeroed.
<table>
	<tr>
		<td colspan=2><b>S31 S30 S29 S28 S27</b></td>
		<td><b></b></td>
		<td colspan=2><b></b></td>
		<td colspan=3><b></b></td>
		<td colspan=2><b></b></td>
		<td colspan=2 rowspan=4><b></b></td>
		<td colspan=3><b>S7 S6 S5</b></td>
		<td colspan=2><b></b></td>
		<td colspan=3><b></b></td>
		<td colspan=2><b>S4</b></td>
		<td colspan=2><b>S3</b></td>
		<td colspan=3><b>S2 S1 S0</b></td>
		<td colspan=2><b></b></td>
		<td colspan=2><b></b></td>
		<td colspan=2><b></b></td>
	</tr>
	<tr>
		<td colspan=7 rowspan=3>0 01</td>
		<td colspan=5></td>
		<td colspan=7 rowspan=3>01 0 1</td>
		<td colspan=7 rowspan=3>0 0</td>
	</tr>
	<tr>
		<td>0</td>
		<td colspan=2>100</td>
		<td colspan=2></td>
		<td colspan=3></td>
		<td colspan=2>0</td>
		<td colspan=3>01</td>
		<td colspan=2></td>
		<td colspan=3>01</td>
		<td colspan=2></td>
		<td colspan=2>0</td>
		<td colspan=3>1</td>
		<td colspan=2>0</td>
		<td colspan=2>0</td>
	</tr>
</table>

<table>
	<tr>
		<td><b>0</b></td>
		<td><b>000</b></td>
		<td><b></b></td>
		<td><b></b></td>
		<td><b>0</b></td>
		<td><b>00</b></td>
		<td><b></b></td>
		<td><b>00</b></td>
		<td><b></b></td>
		<td><b>S28</b></td>
		<td><b>S7</b></td>
		<td><b>S5</b></td>
		<td><b>S2</b></td>
	</tr>
</table>

bit 0
bit 31

Figure 4-9.  PEXT Example

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
            DEST[ k] ← TEMP[ m];
            k ← k+ 1;
            
        FI
<table>
</table>

        m ← m+ 1;
OD
```
### Flags Affected
None.

### Intel C/C++ Compiler Intrinsic Equivalent
```c
PEXT:
unsigned __int32 _pext_u32(unsigned __int32 src, unsigned __int32 mask);
PEXT:
unsigned __int64 _pext_u64(unsigned __int64 src, unsigned __int32 mask);
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