<b>VZEROUPPER</b> — Zero Upper Bits of YMM Registers
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.128.0F.WIG 77 VZEROUPPER</td>
		<td>ZO</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Zero upper 128 bits of all YMM registers.</td>
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
		<td>ZO</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
The instruction zeros the bits in position 128 and higher of all YMM registers. The lower 128-bits of the registers
(the corresponding XMM registers) are unmodified.

This instruction is recommended when transitioning between AVX and legacy SSE code - it will eliminate performance penalties caused by false dependencies.

Note: VEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD. In Compatibility and legacy 32-bit
mode only the lower 8 registers are modified.

### Operation

simd_reg_file[][] is a two dimensional array representing the SIMD register file containing all the overlapping xmm, ymm and zmm 
registers present in that implementation. The major dimension is the register number: 0 for xmm0, ymm0 and zmm0; 1 for xmm1, 
ymm1, and zmm1; etc. The minor dimension size is the width of the implemented SIMD state measured in bits. On a machine 
supporting Intel AVX-512, the width is 512. On a machine supporting Intel AVX but not Intel AVX-512, the width is “MAXVL”.

#### VZEROUPPER
```java
IF (64-bit mode)
    limit ←15
ELSE
    limit ← 7
FOR i in 0 .. limit:
    simd_reg_file[i][MAXVL-1:128] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VZEROUPPER:
 _mm256_zeroupper()
```
### SIMD Floating-Point Exceptions

None.

### Other Exceptions

See Exceptions Type 8.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
