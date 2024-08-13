<b>RCL / RCR / ROL / ROR</b> — Rotate
<table>
	<tr>
		<td><b>Opcode**</b></td>
		<td><b>Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>D0 /2</td>
		<td>RCL r/m8, 1</td>
		<td>M1</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 9 bits (CF, r/m8) left once.</td>
	</tr>
	<tr>
		<td>REX + D0 /2</td>
		<td>RCL r/m8*, 1</td>
		<td>M1</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 9 bits (CF, r/m8) left once.</td>
	</tr>
	<tr>
		<td>D2 /2</td>
		<td>RCL r/m8, CL</td>
		<td>MC</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 9 bits (CF, r/m8) left CL times.</td>
	</tr>
	<tr>
		<td>REX + D2 /2</td>
		<td>RCL r/m8*, CL</td>
		<td>MC</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 9 bits (CF, r/m8) left CL times.</td>
	</tr>
	<tr>
		<td>C0 /2 ib</td>
		<td>RCL r/m8, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 9 bits (CF, r/m8) left imm8 times.</td>
	</tr>
	<tr>
		<td>REX + C0 /2 ib</td>
		<td>RCL r/m8*, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 9 bits (CF, r/m8) left imm8 times.</td>
	</tr>
	<tr>
		<td>D1 /2</td>
		<td>RCL r/m16, 1</td>
		<td>M1</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 17 bits (CF, r/m16) left once.</td>
	</tr>
	<tr>
		<td>D3 /2</td>
		<td>RCL r/m16, CL</td>
		<td>MC</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 17 bits (CF, r/m16) left CL times.</td>
	</tr>
	<tr>
		<td>C1 /2 ib</td>
		<td>RCL r/m16, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 17 bits (CF, r/m16) left imm8 times.</td>
	</tr>
	<tr>
		<td>D1 /2</td>
		<td>RCL r/m32, 1</td>
		<td>M1</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 33 bits (CF, r/m32) left once.</td>
	</tr>
	<tr>
		<td>REX.W + D1 /2</td>
		<td>RCL r/m64, 1</td>
		<td>M1</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 65 bits (CF, r/m64) left once. Uses a 6 bit count.</td>
	</tr>
	<tr>
		<td>D3 /2</td>
		<td>RCL r/m32, CL</td>
		<td>MC</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 33 bits (CF, r/m32) left CL times.</td>
	</tr>
	<tr>
		<td>REX.W + D3 /2</td>
		<td>RCL r/m64, CL</td>
		<td>MC</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 65 bits (CF, r/m64) left CL times. Uses a 6 bit count.</td>
	</tr>
	<tr>
		<td>C1 /2 ib</td>
		<td>RCL r/m32, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 33 bits (CF, r/m32) left imm8 times.</td>
	</tr>
	<tr>
		<td>REX.W + C1 /2 ib</td>
		<td>RCL r/m64, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 65 bits (CF, r/m64) left imm8 times. Uses a 6 bit count.</td>
	</tr>
	<tr>
		<td>D0 /3</td>
		<td>RCR r/m8, 1</td>
		<td>M1</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 9 bits (CF, r/m8) right once.</td>
	</tr>
	<tr>
		<td>REX + D0 /3</td>
		<td>RCR r/m8*, 1</td>
		<td>M1</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 9 bits (CF, r/m8) right once.</td>
	</tr>
	<tr>
		<td>D2 /3</td>
		<td>RCR r/m8, CL</td>
		<td>MC</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 9 bits (CF, r/m8) right CL times.</td>
	</tr>
	<tr>
		<td>REX + D2 /3</td>
		<td>RCR r/m8*, CL</td>
		<td>MC</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 9 bits (CF, r/m8) right CL times.</td>
	</tr>
	<tr>
		<td>C0 /3 ib</td>
		<td>RCR r/m8, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 9 bits (CF, r/m8) right imm8 times.</td>
	</tr>
	<tr>
		<td>REX + C0 /3 ib</td>
		<td>RCR r/m8*, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 9 bits (CF, r/m8) right imm8 times.</td>
	</tr>
	<tr>
		<td>D1 /3</td>
		<td>RCR r/m16, 1</td>
		<td>M1</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 17 bits (CF, r/m16) right once.</td>
	</tr>
	<tr>
		<td>D3 /3</td>
		<td>RCR r/m16, CL</td>
		<td>MC</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 17 bits (CF, r/m16) right CL times.</td>
	</tr>
	<tr>
		<td>C1 /3 ib</td>
		<td>RCR r/m16, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 17 bits (CF, r/m16) right imm8 times.</td>
	</tr>
	<tr>
		<td>D1 /3</td>
		<td>RCR r/m32, 1</td>
		<td>M1</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 33 bits (CF, r/m32) right once. Uses a 6 bit count.</td>
	</tr>
	<tr>
		<td>REX.W + D1 /3</td>
		<td>RCR r/m64, 1</td>
		<td>M1</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 65 bits (CF, r/m64) right once. Uses a 6 bit count.</td>
	</tr>
	<tr>
		<td>D3 /3</td>
		<td>RCR r/m32, CL</td>
		<td>MC</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 33 bits (CF, r/m32) right CL times.</td>
	</tr>
	<tr>
		<td>REX.W + D3 /3</td>
		<td>RCR r/m64, CL</td>
		<td>MC</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 65 bits (CF, r/m64) right CL times. Uses a 6 bit count.</td>
	</tr>
	<tr>
		<td>C1 /3 ib</td>
		<td>RCR r/m32, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 33 bits (CF, r/m32) right imm8 times.</td>
	</tr>
	<tr>
		<td>REX.W + C1 /3 ib</td>
		<td>RCR r/m64, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 65 bits (CF, r/m64) right imm8 times. Uses a 6 bit count.</td>
	</tr>
	<tr>
		<td>D0 /0</td>
		<td>ROL r/m8, 1</td>
		<td>M1</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 8 bits r/m8 left once.</td>
	</tr>
	<tr>
		<td>REX + D0 /0</td>
		<td>ROL r/m8*, 1</td>
		<td>M1</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 8 bits r/m8 left once</td>
	</tr>
	<tr>
		<td>D2 /0</td>
		<td>ROL r/m8, CL</td>
		<td>MC</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 8 bits r/m8 left CL times.</td>
	</tr>
	<tr>
		<td>REX + D2 /0</td>
		<td>ROL r/m8*, CL</td>
		<td>MC</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 8 bits r/m8 left CL times.</td>
	</tr>
	<tr>
		<td>C0 /0 ib</td>
		<td>ROL r/m8, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 8 bits r/m8 left imm8 times.</td>
	</tr>
	<tr>
		<td>REX + C0 /0 ib</td>
		<td>ROL r/m8*, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 8 bits r/m8 left imm8 times.</td>
	</tr>
	<tr>
		<td>D1 /0</td>
		<td>ROL r/m16, 1</td>
		<td>M1</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 16 bits r/m16 left once.</td>
	</tr>
	<tr>
		<td>D3 /0</td>
		<td>ROL r/m16, CL</td>
		<td>MC</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 16 bits r/m16 left CL times.</td>
	</tr>
	<tr>
		<td>C1 /0 ib</td>
		<td>ROL r/m16, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 16 bits r/m16 left imm8 times.</td>
	</tr>
	<tr>
		<td>D1 /0</td>
		<td>ROL r/m32, 1</td>
		<td>M1</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 32 bits r/m32 left once.</td>
	</tr>
	<tr>
		<td>REX.W + D1 /0</td>
		<td>ROL r/m64, 1</td>
		<td>M1</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 64 bits r/m64 left once. Uses a 6 bit count.</td>
	</tr>
	<tr>
		<td>D3 /0</td>
		<td>ROL r/m32, CL</td>
		<td>MC</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 32 bits r/m32 left CL times.</td>
	</tr>
	<tr>
		<td>REX.W + D3 /0</td>
		<td>ROL r/m64, CL</td>
		<td>MC</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 64 bits r/m64 left CL times. Uses a 6 bit count.</td>
	</tr>
	<tr>
		<td>C1 /0 ib</td>
		<td>ROL r/m32, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 32 bits r/m32 left imm8 times.</td>
	</tr>
	<tr>
		<td>REX.W + C1 /0 ib</td>
		<td>ROL r/m64, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 64 bits r/m64 left imm8 times. Uses a 6 bit count.</td>
	</tr>
	<tr>
		<td>D0 /1</td>
		<td>ROR r/m8, 1</td>
		<td>M1</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 8 bits r/m8 right once.</td>
	</tr>
	<tr>
		<td>REX + D0 /1</td>
		<td>ROR r/m8*, 1</td>
		<td>M1</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 8 bits r/m8 right once.</td>
	</tr>
	<tr>
		<td>D2 /1</td>
		<td>ROR r/m8, CL</td>
		<td>MC</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 8 bits r/m8 right CL times.</td>
	</tr>
	<tr>
		<td>REX + D2 /1</td>
		<td>ROR r/m8*, CL</td>
		<td>MC</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 8 bits r/m8 right CL times.</td>
	</tr>
	<tr>
		<td>C0 /1 ib</td>
		<td>ROR r/m8, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 8 bits r/m16 right imm8 times.</td>
	</tr>
	<tr>
		<td>REX + C0 /1 ib</td>
		<td>ROR r/m8*, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 8 bits r/m16 right imm8 times.</td>
	</tr>
	<tr>
		<td>D1 /1</td>
		<td>ROR r/m16, 1</td>
		<td>M1</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 16 bits r/m16 right once.</td>
	</tr>
	<tr>
		<td>D3 /1</td>
		<td>ROR r/m16, CL</td>
		<td>MC</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 16 bits r/m16 right CL times.</td>
	</tr>
	<tr>
		<td>C1 /1 ib</td>
		<td>ROR r/m16, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 16 bits r/m16 right imm8 times.</td>
	</tr>
	<tr>
		<td>D1 /1</td>
		<td>ROR r/m32, 1</td>
		<td>M1</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 32 bits r/m32 right once.</td>
	</tr>
	<tr>
		<td>REX.W + D1 /1</td>
		<td>ROR r/m64, 1</td>
		<td>M1</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 64 bits r/m64 right once. Uses a 6 bit count.</td>
	</tr>
	<tr>
		<td>D3 /1</td>
		<td>ROR r/m32, CL</td>
		<td>MC</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 32 bits r/m32 right CL times.</td>
	</tr>
	<tr>
		<td>REX.W + D3 /1</td>
		<td>ROR r/m64, CL</td>
		<td>MC</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 64 bits r/m64 right CL times. Uses a 6 bit count.</td>
	</tr>
	<tr>
		<td>C1 /1 ib</td>
		<td>ROR r/m32, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Rotate 32 bits r/m32 right imm8 times.</td>
	</tr>
	<tr>
		<td>REX.W + C1 /1 ib</td>
		<td>ROR r/m64, imm8</td>
		<td>MI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Rotate 64 bits r/m64 right imm8 times. Uses a 6 bit count.</td>
	</tr>
</table>

\* In 64-bit mode, r/m8 can not be encoded to access the following byte registers if a REX prefix is used: AH, BH, CH, DH.
\*\* See IA-32 Architecture Compatibility section below.

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
		<td>M1</td>
		<td>ModRM:r/m (w)</td>
		<td>1</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>MC</td>
		<td>ModRM:r/m (w)</td>
		<td>CL</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>MI</td>
		<td>ModRM:r/m (w)</td>
		<td>imm8</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Shifts (rotates) the bits of the first operand (destination operand) the number of bit positions specified in the
second operand (count operand) and stores the result in the destination operand. The destination operand can be
a register or a memory location; the count operand is an unsigned integer that can be an immediate or a value in
the CL register. The count is masked to 5 bits (or 6 bits if in 64-bit mode and REX.W = 1).

The rotate left (ROL) and rotate through carry left (RCL) instructions shift all the bits toward more-significant bit
positions, except for the most-significant bit, which is rotated to the least-significant bit location. The rotate right
(ROR) and rotate through carry right (RCR) instructions shift all the bits toward less significant bit positions, except
for the least-significant bit, which is rotated to the most-significant bit location.

The RCL and RCR instructions include the CF flag in the rotation. The RCL instruction shifts the CF flag into the
least-significant bit and shifts the most-significant bit into the CF flag. The RCR instruction shifts the CF flag into the
most-significant bit and shifts the least-significant bit into the CF flag. For the ROL and ROR instructions, the orig-
inal value of the CF flag is not a part of the result, but the CF flag receives a copy of the bit that was shifted from
one end to the other.

The OF flag is defined only for the 1-bit rotates; it is undefined in all other cases (except RCL and RCR instructions
only: a zero-bit rotate does nothing, that is affects no flags). For left rotates, the OF flag is set to the exclusive OR
of the CF bit (after the rotate) and the most-significant bit of the result. For right rotates, the OF flag is set to the
exclusive OR of the two most-significant bits of the result.

In 64-bit mode, using a REX prefix in the form of REX.R permits access to additional registers (R8-R15). Use of
REX.W promotes the first operand to 64 bits and causes the count operand to become a 6-bit counter.

### IA-32 Architecture Compatibility

The 8086 does not mask the rotation count. However, all other IA-32 processors (starting with the Intel 286
processor) do mask the rotation count to 5 bits, resulting in a maximum count of 31. This masking is done in all
operating modes (including the virtual-8086 mode) to reduce the maximum execution time of the instructions.

### Operation

```java
(* RCL and RCR instructions *)
SIZE ← OperandSize;
CASE (determine count) OF
    SIZE ← 8:
                tempCOUNT ← (COUNT AND 1FH) MOD 9;
    SIZE ← 16:
                tempCOUNT ← (COUNT AND 1FH) MOD 17;
    SIZE ← 32:
                tempCOUNT ← COUNT AND 1FH;
    SIZE ← 64:
                tempCOUNT ← COUNT AND 3FH;
ESAC;
(* RCL instruction operation *)
WHILE (tempCOUNT ≠ 0)
    DO
        tempCF ← MSB(DEST);
        DEST ← (DEST ∗ 2) + CF;
        CF ← tempCF;
        tempCOUNT ← tempCOUNT – 1;
    OD;
ELIHW;
IF (COUNT & COUNTMASK) = 1
    THEN OF ← MSB(DEST) XOR CF;
    ELSE OF is undefined;
FI;
(* RCR instruction operation *)
IF (COUNT & COUNTMASK) = 1
    THEN OF ← MSB(DEST) XOR CF;
    ELSE OF is undefined;
FI;
WHILE (tempCOUNT ≠ 0)
    DO
        tempCF ← LSB(SRC);
        DEST ← (DEST / 2) + (CF * 2SIZE);
        CF ← tempCF;
        tempCOUNT ← tempCOUNT – 1;
    OD;
(* ROL and ROR instructions *)
IF OperandSize = 64
    THEN COUNTMASK = 3FH;
    ELSE COUNTMASK = 1FH;
FI;
(* ROL instruction operation *)
tempCOUNT ← (COUNT & COUNTMASK) MOD SIZE
WHILE (tempCOUNT ≠ 0)
    DO
        tempCF ← MSB(DEST);
        DEST ← (DEST ∗ 2) + tempCF;
        tempCOUNT ← tempCOUNT – 1;
    OD;
ELIHW;
IF (COUNT & COUNTMASK) ≠ 0
    THEN CF ← LSB(DEST);
FI;
IF (COUNT & COUNTMASK) = 1
    THEN OF ← MSB(DEST) XOR CF;
    ELSE OF is undefined;
FI;
(* ROR instruction operation *)
tempCOUNT ← (COUNT & COUNTMASK) MOD SIZE
WHILE (tempCOUNT ≠ 0)
    DO
        tempCF ← LSB(SRC);
        DEST ← (DEST / 2) + (tempCF ∗ 2SIZE);
        tempCOUNT ← tempCOUNT – 1;
    OD;
ELIHW;
IF (COUNT & COUNTMASK) ≠ 0
    THEN CF ← MSB(DEST);
FI;
IF (COUNT & COUNTMASK) = 1
    THEN OF ← MSB(DEST) XOR MSB − 1(DEST);
    ELSE OF is undefined;
FI;
```
### Flags Affected
If the masked count is 0, the flags are not affected. If the masked count is 1, then the OF flag is affected, otherwise
(masked count is greater than 1) the OF flag is undefined. The CF flag is affected when the masked count is non-
zero. The SF, ZF, AF, and PF flags are always unaffected.

### Protected Mode Exceptions

<p>#GP(0)
If the source operand is located in a non-writable segment.
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register contains a NULL segment selector.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.
<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#GP
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS
If a memory operand effective address is outside the SS segment limit.
<p>#UD
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made.
<p>#UD
If the LOCK prefix is used.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#SS(0)
If a memory address referencing the SS segment is in a non-canonical form.
<p>#GP(0)
If the source operand is located in a nonwritable segment.
If the memory address is in a non-canonical form.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.
<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
