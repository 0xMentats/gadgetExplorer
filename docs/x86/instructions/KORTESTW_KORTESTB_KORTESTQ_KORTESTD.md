<b>KORTESTW / KORTESTB / KORTESTQ / KORTESTD</b> — OR Masks And Set Flags
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.L0.0F.W0 98 /r KORTESTW k1, k2</td>
		<td>RR</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Bitwise OR 16 bits masks k1 and k2 and update ZF and CF accordingly.</td>
	</tr>
	<tr>
		<td>VEX.L0.66.0F.W0 98 /r KORTESTB k1, k2</td>
		<td>RR</td>
		<td>V/V</td>
		<td>AVX512DQ</td>
		<td>Bitwise OR 8 bits masks k1 and k2 and update ZF and CF accordingly.</td>
	</tr>
	<tr>
		<td>VEX.L0.0F.W1 98 /r KORTESTQ k1, k2</td>
		<td>RR</td>
		<td>V/V</td>
		<td>AVX512BW </td>
		<td>Bitwise OR 64 bits masks k1 and k2 and update ZF and CF accordingly.</td>
	</tr>
	<tr>
		<td>VEX.L0.66.0F.W1 98 /r KORTESTD k1, k2</td>
		<td>RR</td>
		<td>V/V</td>
		<td>AVX512BW </td>
		<td>Bitwise OR 32 bits masks k1 and k2 and update ZF and CF accordingly.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand 2</b></td>
	</tr>
	<tr>
		<td>RR</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r, ModRM:[7:6] must be 11b)</td>
	</tr>
</table>


### Description
Performs a bitwise OR between the vector mask register k2, and the vector mask register k1, and sets CF and ZF
based on the operation result.

ZF flag is set if both sources are 0x0. CF is set if, after the OR operation is done, the operation result is all 1’s.

### Operation


#### KORTESTW
```java
TMP[15:0] ← DEST[15:0] BITWISE OR SRC[15:0]
IF(TMP[15:0]=0)
    THEN ZF ← 1
    ELSE ZF ← 0
FI;
IF(TMP[15:0]=FFFFh)
    THEN CF ← 1
    ELSE CF ← 0
FI;
```
#### KORTESTB
```java
TMP[7:0] ← DEST[7:0] BITWISE OR SRC[7:0]
IF(TMP[7:0]=0)
    THEN ZF ← 1
    ELSE ZF ← 0
FI;
IF(TMP[7:0]==FFh)
    THEN CF ← 1
    ELSE CF ← 0
FI;
```
#### KORTESTQ
```java
TMP[63:0] ← DEST[63:0] BITWISE OR SRC[63:0]
IF(TMP[63:0]=0)
    THEN ZF ← 1
    ELSE ZF ← 0
FI;
IF(TMP[63:0]==FFFFFFFF_FFFFFFFFh)
    THEN CF ← 1
    ELSE CF ← 0
FI;
```
#### KORTESTD
```java
TMP[31:0] ← DEST[31:0] BITWISE OR SRC[31:0]
IF(TMP[31:0]=0)
    THEN ZF ← 1
    ELSE ZF ← 0
FI;
IF(TMP[31:0]=FFFFFFFFh)
    THEN CF ← 1
    ELSE CF ← 0
FI;
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
KORTESTW __mmask16 _mm512_kortest[cz](__mmask16 a, __mmask16 b);
```
### Flags Affected
The ZF flag is set if the result of OR-ing both sources is all 0s.
The CF flag is set if the result of OR-ing both sources is all 1s.
The OF, SF, AF, and PF flags are set to 0.

### Other Exceptions

See Exceptions Type K20.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
