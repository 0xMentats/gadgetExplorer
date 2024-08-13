<b>XLAT / XLATB</b> — Table Look-up Translation
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
		<td>D7</td>
		<td>XLAT m8</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set AL to memory byte DS:[(E)BX + unsigned AL].</td>
	</tr>
	<tr>
		<td>D7</td>
		<td>XLATB</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set AL to memory byte DS:[(E)BX + unsigned AL].</td>
	</tr>
	<tr>
		<td>REX.W + D7</td>
		<td>XLATB</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set AL to memory byte [RBX + unsigned AL].</td>
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
Locates a byte entry in a table in memory, using the contents of the AL register as a table index, then copies the
contents of the table entry back into the AL register. The index in the AL register is treated as an unsigned integer.
The XLAT and XLATB instructions get the base address of the table in memory from either the DS:EBX or the DS:BX
registers (depending on the address-size attribute of the instruction, 32 or 16, respectively). (The DS segment may
be overridden with a segment override prefix.)

At the assembly-code level, two forms of this instruction are allowed: the “explicit-operand” form and the “no-
operand” form. The explicit-operand form (specified with the XLAT mnemonic) allows the base address of the table
to be specified explicitly with a symbol. This explicit-operands form is provided to allow documentation; however,
note that the documentation provided by this form can be misleading. That is, the symbol does not have to specify
the correct base address. The base address is always specified by the DS:(E)BX registers, which must be loaded
correctly before the XLAT instruction is executed.

The no-operands form (XLATB) provides a “short form” of the XLAT instructions. Here also the processor assumes
that the DS:(E)BX registers contain the base address of the table.

In 64-bit mode, operation is similar to that in legacy or compatibility mode. AL is used to specify the table index
(the operand size is fixed at 8 bits). RBX, however, is used to specify the table’s base address. See the summary
chart at the beginning of this section for encoding data and limits.

### Operation

```java
IF AddressSize = 16
    THEN
        AL ← (DS:BX + ZeroExtend(AL));
    ELSE IF (AddressSize = 32)
        AL ← (DS:EBX + ZeroExtend(AL)); FI;
    ELSE (AddressSize = 64)
        AL ← (RBX + ZeroExtend(AL));
FI;
```
### Flags Affected

None.

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register contains a NULL segment selector.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF(fault-code)
If a page fault occurs.
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
<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
