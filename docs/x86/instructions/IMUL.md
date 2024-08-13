<b>IMUL</b> — Signed Multiply
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F6 /5</td>
		<td>IMUL r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>AX ← AL ∗ r/m byte.</td>
	</tr>
	<tr>
		<td>F7 /5</td>
		<td>IMUL r/m16</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>DX:AX ← AX ∗ r/m word.</td>
	</tr>
	<tr>
		<td>F7 /5</td>
		<td>IMUL r/m32</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>EDX:EAX ← EAX ∗ r/m32.</td>
	</tr>
	<tr>
		<td>REX.W + F7 /5</td>
		<td>IMUL r/m64</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>RDX:RAX ← RAX ∗ r/m64.</td>
	</tr>
	<tr>
		<td>0F AF /r</td>
		<td>IMUL r16, r/m16</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>word register ← word register ∗ r/m16.</td>
	</tr>
	<tr>
		<td>0F AF /r</td>
		<td>IMUL r32, r/m32</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>doubleword register ← doubleword register ∗ r/m32.</td>
	</tr>
	<tr>
		<td>REX.W + 0F AF /r</td>
		<td>IMUL r64, r/m64</td>
		<td>RM</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Quadword register ← Quadword register ∗ r/m64.</td>
	</tr>
	<tr>
		<td>6B /r ib</td>
		<td>IMUL r16, r/m16, imm8</td>
		<td>RMI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>word register ← r/m16 ∗ sign-extended immediate byte.</td>
	</tr>
	<tr>
		<td>6B /r ib</td>
		<td>IMUL r32, r/m32, imm8</td>
		<td>RMI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>doubleword register ← r/m32 ∗ sign-extended immediate byte.</td>
	</tr>
	<tr>
		<td>REX.W + 6B /r ib</td>
		<td>IMUL r64, r/m64, imm8</td>
		<td>RMI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Quadword register ← r/m64 ∗ sign-extended immediate byte.</td>
	</tr>
	<tr>
		<td>69 /r iw</td>
		<td>IMUL r16, r/m16, imm16</td>
		<td>RMI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>word register ← r/m16 ∗ immediate word.</td>
	</tr>
	<tr>
		<td>69 /r id</td>
		<td>IMUL r32, r/m32, imm32</td>
		<td>RMI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>doubleword register ← r/m32 ∗ immediate doubleword.</td>
	</tr>
	<tr>
		<td>REX.W + 69 /r id</td>
		<td>IMUL r64, r/m64, imm32</td>
		<td>RMI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Quadword register ← r/m64 ∗ immediate doubleword.</td>
	</tr>
</table>
NOTES: * In 64-bit mode, r/m8 can not be encoded to access the following byte registers if a REX prefix is used: AH, BH, CH, DH.


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
		<td>M</td>
		<td>ModRM:r/m (r, w)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>RM</td>
		<td>ModRM:reg (r, w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>RMI</td>
		<td>ModRM:reg (r, w)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8/16/32</td>
		<td>NA</td>
	</tr>
</table>


### Description
Performs a signed multiplication of two operands. This instruction has three forms, depending on the number of
operands.

 *  One-operand form — This form is identical to that used by the MUL instruction. Here, the source operand (in
a general-purpose register or memory location) is multiplied by the value in the AL, AX, EAX, or RAX register
(depending on the operand size) and the product (twice the size of the input operand) is stored in the AX,
DX:AX, EDX:EAX, or RDX:RAX registers, respectively.

 *  Two-operand form — With this form the destination operand (the first operand) is multiplied by the source
operand (second operand). The destination operand is a general-purpose register and the source operand is an
immediate value, a general-purpose register, or a memory location. The intermediate product (twice the size of
the input operand) is truncated and stored in the destination operand location.

 *  Three-operand form — This form requires a destination operand (the first operand) and two source operands
(the second and the third operands). Here, the first source operand (which can be a general-purpose register
or a memory location) is multiplied by the second source operand (an immediate value). The intermediate
product (twice the size of the first source operand) is truncated and stored in the destination operand (a
general-purpose register).
When an immediate value is used as an operand, it is sign-extended to the length of the destination operand
format.

The CF and OF flags are set when the signed integer value of the intermediate product differs from the sign
extended operand-size-truncated product, otherwise the CF and OF flags are cleared.

The three forms of the IMUL instruction are similar in that the length of the product is calculated to twice the length
of the operands. With the one-operand form, the product is stored exactly in the destination. With the two- and
three-operand forms, however, the result is truncated to the length of the destination before it is stored in the
destination register. Because of this truncation, the CF or OF flag should be tested to ensure that no significant bits
are lost.

The two- and three-operand forms may also be used with unsigned operands because the lower half of the product
is the same regardless if the operands are signed or unsigned. The CF and OF flags, however, cannot be used to
determine if the upper half of the result is non-zero.

In 64-bit mode, the instruction’s default operation size is 32 bits. Use of the REX.R prefix permits access to additional
 registers (R8-R15). Use of the REX.W prefix promotes operation to 64 bits. Use of REX.W modifies the three
forms of the instruction as follows.

 *  One-operand form — The source operand (in a 64-bit general-purpose register or memory location) is
multiplied by the value in the RAX register and the product is stored in the RDX:RAX registers.

 *  Two-operand form — The source operand is promoted to 64 bits if it is a register or a memory location. The
destination operand is promoted to 64 bits.

 *  Three-operand form — The first source operand (either a register or a memory location) and destination
operand are promoted to 64 bits. If the source operand is an immediate, it is sign extended to 64 bits.

### Operation

```java
IF (NumberOfOperands = 1)
    THEN IF (OperandSize = 8)
        THEN
            TMP_XP ← AL ∗ SRC (* Signed multiplication; TMP_XP is a signed integer at twice the width of the SRC *); 
            AX ← TMP_XP[15:0];
            IF SignExtend(TMP_XP[7:0]) = TMP_XP
                THEN CF ← 0; OF ← 0;
                ELSE CF ← 1; OF ← 1; FI;
        ELSE IF OperandSize = 16
            THEN 
                TMP_XP ← AX ∗ SRC (* Signed multiplication; TMP_XP is a signed integer at twice the width of the SRC *) 
                DX:AX ← TMP_XP[31:0];
                IF SignExtend(TMP_XP[15:0]) = TMP_XP
                    THEN CF ← 0; OF ← 0;
                    ELSE CF ← 1; OF ← 1; FI;
            ELSE IF OperandSize = 32 
                THEN 
                    TMP_XP ← EAX ∗ SRC (* Signed multiplication; TMP_XP is a signed integer at twice the width of the SRC*) 
                    EDX:EAX ← TMP_XP[63:0];
                    IF SignExtend(TMP_XP[31:0]) = TMP_XP
                        THEN CF ← 0; OF ← 0;
                        ELSE CF ← 1; OF ← 1; FI;
                ELSE (* OperandSize = 64 *)
                    TMP_XP ← RAX ∗ SRC (* Signed multiplication; TMP_XP is a signed integer at twice the width of the SRC *)
                    EDX:EAX ← TMP_XP[127:0];
                    IF SignExtend(TMP_XP[63:0]) = TMP_XP
                        THEN CF ← 0; OF ← 0;
                        ELSE CF ← 1; OF ← 1; FI;
                FI;
        FI;
    ELSE IF (NumberOfOperands = 2)
        THEN 
            TMP_XP ← DEST ∗ SRC (* Signed multiplication; TMP_XP is a signed integer at twice the width of the SRC *)
            DEST ← TruncateToOperandSize(TMP_XP);
            IF SignExtend(DEST) ≠ TMP_XP
                THEN CF ← 1; OF ← 1;
                ELSE CF ← 0; OF ← 0; FI;
        ELSE (* NumberOfOperands = 3 *)
            TMP_XP ← SRC1 ∗ SRC2 (* Signed multiplication; TMP_XP is a signed integer at twice the width of the SRC1 *)
            DEST ← TruncateToOperandSize(TMP_XP);
            IF SignExtend(DEST) ≠ TMP_XP
                THEN CF ← 1; OF ← 1;
                ELSE CF ← 0; OF ← 0; FI;
    FI;
FI;
```
### Flags Affected
For the one operand form of the instruction, the CF and OF flags are set when significant bits are carried into the
upper half of the result and cleared when the result fits exactly in the lower half of the result. For the two- and
three-operand forms of the instruction, the CF and OF flags are set when the result must be truncated to fit in the
destination operand size and cleared when the result fits exactly in the destination operand size. The SF, ZF, AF, and
PF flags are undefined.

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register is used to access memory and it contains a NULL NULL
segment selector.
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