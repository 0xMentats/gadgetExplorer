<b>MUL</b> — Unsigned Multiply
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
		<td>F6 /4</td>
		<td>MUL r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Unsigned multiply (AX ← AL ∗ r/m8).</td>
	</tr>
	<tr>
		<td>REX + F6 /4</td>
		<td>MUL r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Unsigned multiply (AX ← AL ∗ r/m8).</td>
	</tr>
	<tr>
		<td>F7 /4</td>
		<td>MUL r/m16</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Unsigned multiply (DX:AX ← AX ∗ r/m16).</td>
	</tr>
	<tr>
		<td>F7 /4</td>
		<td>MUL r/m32</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Unsigned multiply (EDX:EAX ← EAX ∗ r/m32).</td>
	</tr>
	<tr>
		<td>REX.W + F7 /4</td>
		<td>MUL r/m64</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Unsigned multiply (RDX:RAX ← RAX ∗ r/m64).</td>
	</tr>
</table>

\* In 64-bit mode, r/m8 can not be encoded to access the following byte registers if a REX prefix is used: AH, BH, CH, DH.

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
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Performs an unsigned multiplication of the first operand (destination operand) and the second operand (source
operand) and stores the result in the destination operand. The destination operand is an implied operand located in
register AL, AX or EAX (depending on the size of the operand); the source operand is located in a general-purpose
register or a memory location. The action of this instruction and the location of the result depends on the opcode
and the operand size as shown in Table 4-9.

The result is stored in register AX, register pair DX:AX, or register pair EDX:EAX (depending on the operand size),
with the high-order bits of the product contained in register AH, DX, or EDX, respectively. If the high-order bits of
the product are 0, the CF and OF flags are cleared; otherwise, the flags are set.

In 64-bit mode, the instruction’s default operation size is 32 bits. Use of the REX.R prefix permits access to additional
 registers (R8-R15). Use of the REX.W prefix promotes operation to 64 bits.

See the summary chart at the beginning of this section for encoding data and limits.

Table 4-9.  MUL Results
<table>
	<tr>
		<td><b>Operand Size</b></td>
		<td><b>Source 1</b></td>
		<td><b>Source 2</b></td>
		<td><b>Destination</b></td>
	</tr>
	<tr>
		<td>Byte</td>
		<td>AL</td>
		<td>r/m8</td>
		<td>AX</td>
	</tr>
	<tr>
		<td>Word</td>
		<td>AX</td>
		<td>r/m16</td>
		<td>DX:AX</td>
	</tr>
	<tr>
		<td>Doubleword</td>
		<td>EAX</td>
		<td>r/m32</td>
		<td>EDX:EAX</td>
	</tr>
	<tr>
		<td>Quadword</td>
		<td>RAX</td>
		<td>r/m64</td>
		<td>RDX:RAX</td>
	</tr>
</table>


### Operation

```java
IF (Byte operation)
    THEN 
        AX ← AL ∗ SRC;
    ELSE (* Word or doubleword operation *)
        IF OperandSize = 16
            THEN 
                DX:AX ← AX ∗ SRC;
            ELSE IF OperandSize = 32
                THEN EDX:EAX ← EAX ∗ SRC; FI;
            ELSE (* OperandSize = 64 *)
                RDX:RAX ← RAX ∗ SRC;
        FI;
FI;
```
### Flags Affected
The OF and CF flags are set to 0 if the upper half of the result is 0; otherwise, they are set to 1. The SF, ZF, AF, and
PF flags are undefined.

### Protected Mode Exceptions

<p>#GP(0)
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
If the memory address is in a non-canonical form.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
