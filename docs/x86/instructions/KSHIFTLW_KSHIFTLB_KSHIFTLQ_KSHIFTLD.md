<b>KSHIFTLW / KSHIFTLB / KSHIFTLQ / KSHIFTLD</b> — Shift Left Mask Registers
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.L0.66.0F3A.W1 32 /r KSHIFTLW k1, k2, imm8</td>
		<td>RRI</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Shift left 16 bits in k2 by immediate and write result in k1.</td>
	</tr>
	<tr>
		<td>VEX.L0.66.0F3A.W0 32 /r KSHIFTLB k1, k2, imm8</td>
		<td>RRI</td>
		<td>V/V</td>
		<td>AVX512DQ</td>
		<td>Shift left 8 bits in k2 by immediate and write result in k1.</td>
	</tr>
	<tr>
		<td>VEX.L0.66.0F3A.W1 33 /r KSHIFTLQ k1, k2, imm8</td>
		<td>RRI</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Shift left 64 bits in k2 by immediate and write result in k1.</td>
	</tr>
	<tr>
		<td>VEX.L0.66.0F3A.W0 33 /r KSHIFTLD k1, k2, imm8</td>
		<td>RRI</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Shift left 32 bits in k2 by immediate and write result in k1.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand 2</b></td>
		<td><b>Operand 3</b></td>
	</tr>
	<tr>
		<td>RRI</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r, ModRM:[7:6] must be 11b)</td>
		<td>Imm8</td>
	</tr>
</table>


### Description
Shifts 8/16/32/64 bits in the second operand (source operand) left by the count specified in immediate byte and
place the least significant 8/16/32/64 bits of the result in the destination operand. The higher bits of the destination
are zero-extended. The destination is set to zero if the count value is greater than 7 (for byte shift), 15 (for word
shift), 31 (for doubleword shift) or 63 (for quadword shift).

### Operation


#### KSHIFTLW
```java
COUNT ← imm8[7:0]
DEST[MAX_KL-1:0] ← 0
IF COUNT <=15
    THEN DEST[15:0] ← SRC1[15:0] << COUNT;
FI;
```
#### KSHIFTLB
```java
COUNT ← imm8[7:0]
DEST[MAX_KL-1:0] ← 0
IF COUNT <=7
        THEN 
                DEST[7:0] ← SRC1[7:0] << COUNT;
FI;
```
#### KSHIFTLQ
```java
COUNT ← imm8[7:0]
DEST[MAX_KL-1:0] ← 0
IF COUNT <=63
                DEST[63:0] ← SRC1[63:0] << COUNT;
        THEN 
FI;
```
#### KSHIFTLD
```java
COUNT ← imm8[7:0]
DEST[MAX_KL-1:0] ← 0
IF COUNT <=31
                DEST[31:0] ← SRC1[31:0] << COUNT;
        THEN 
FI;
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
Compiler auto generates KSHIFTLW when needed.
```
### Flags Affected
None

### SIMD Floating-Point Exceptions

None

### Other Exceptions

See Exceptions Type K20.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
