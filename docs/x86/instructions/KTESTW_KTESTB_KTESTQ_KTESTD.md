<b>KTESTW / KTESTB / KTESTQ / KTESTD</b> — Packed Bit Test Masks and Set Flags
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.L0.0F.W0 99 /r KTESTW k1, k2</td>
		<td>RR</td>
		<td>V/V</td>
		<td>AVX512DQ</td>
		<td>Set ZF and CF depending on sign bit AND and ANDN of 16 bits mask register sources.</td>
	</tr>
	<tr>
		<td>VEX.L0.66.0F.W0 99 /r KTESTB k1, k2</td>
		<td>RR</td>
		<td>V/V</td>
		<td>AVX512DQ</td>
		<td>Set ZF and CF depending on sign bit AND and ANDN of 8 bits mask register sources.</td>
	</tr>
	<tr>
		<td>VEX.L0.0F.W1 99 /r KTESTQ k1, k2</td>
		<td>RR</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Set ZF and CF depending on sign bit AND and ANDN of 64 bits mask register sources.</td>
	</tr>
	<tr>
		<td>VEX.L0.66.0F.W1 99 /r KTESTD k1, k2</td>
		<td>RR</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Set ZF and CF depending on sign bit AND and ANDN of 32 bits mask register sources.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand2</b></td>
	</tr>
	<tr>
		<td>RR</td>
		<td>ModRM:reg (r)</td>
		<td>ModRM:r/m (r, ModRM:[7:6] must be 11b)</td>
	</tr>
</table>


### Description
Performs a bitwise comparison of the bits of the first source operand and corresponding bits in the second source
operand. If the AND operation produces all zeros, the ZF is set else the ZF is clear. If the bitwise AND operation of
the inverted first source operand with the second source operand produces all zeros the CF is set else the CF is
clear. Only the EFLAGS register is updated.

Note: In VEX-encoded versions, VEX.vvvv is reserved and must be 1111b, otherwise instructions will \#UD.

### Operation


#### KTESTW
```java
TEMP[15:0] ← SRC2[15:0] AND SRC1[15:0]
IF (TEMP[15:0] = = 0)
    THEN ZF ←1;
    ELSE ZF ← 0;
FI;
TEMP[15:0] ← SRC2[15:0] AND NOT SRC1[15:0]
IF (TEMP[15:0] = = 0)
    THEN CF ←1;
    ELSE CF ← 0;
FI;
AF ← OF ← PF ← SF ← 0;
```
#### KTESTB
```java
TEMP[7:0] ← SRC2[7:0] AND SRC1[7:0]
IF (TEMP[7:0] = = 0)
    THEN ZF ←1;
    ELSE ZF ← 0;
FI;
TEMP[7:0] ← SRC2[7:0] AND NOT SRC1[7:0]
IF (TEMP[7:0] = = 0)
    THEN CF ←1;
    ELSE CF ← 0;
FI;
AF ← OF ← PF ← SF ← 0;
```
#### KTESTQ
```java
TEMP[63:0] ← SRC2[63:0] AND SRC1[63:0]
IF (TEMP[63:0] = = 0)
    THEN ZF ←1;
    ELSE ZF ← 0;
FI;
TEMP[63:0] ← SRC2[63:0] AND NOT SRC1[63:0]
IF (TEMP[63:0] = = 0)
    THEN CF ←1;
    ELSE CF ← 0;
FI;
AF ← OF ← PF ← SF ← 0;
```
#### KTESTD
```java
TEMP[31:0] ← SRC2[31:0] AND SRC1[31:0]
IF (TEMP[31:0] = = 0)
    THEN ZF ←1;
    ELSE ZF ← 0;
FI;
TEMP[31:0] ← SRC2[31:0] AND NOT SRC1[31:0]
IF (TEMP[31:0] = = 0)
    THEN CF ←1;
    ELSE CF ← 0;
FI;
AF ← OF ← PF ← SF ← 0;
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

See Exceptions Type K20.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
