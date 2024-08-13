<b>IN</b> — Input from Port
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
		<td>E4 ib</td>
		<td>IN AL, imm8</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Input byte from imm8 I/O port address into AL.</td>
	</tr>
	<tr>
		<td>E5 ib</td>
		<td>IN AX, imm8</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Input word from imm8 I/O port address into AX.</td>
	</tr>
	<tr>
		<td>E5 ib</td>
		<td>IN EAX, imm8</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Input dword from imm8 I/O port address into EAX.</td>
	</tr>
	<tr>
		<td>EC</td>
		<td>IN AL,DX</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Input byte from I/O port in DX into AL.</td>
	</tr>
	<tr>
		<td>ED</td>
		<td>IN AX,DX</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Input word from I/O port in DX into AX.</td>
	</tr>
	<tr>
		<td>ED</td>
		<td>IN EAX,DX</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Input doubleword from I/O port in DX into EAX.</td>
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
		<td>I</td>
		<td>imm8</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
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
Copies the value from the I/O port specified with the second operand (source operand) to the destination operand
(first operand). The source operand can be a byte-immediate or the DX register; the destination operand can be
register AL, AX, or EAX, depending on the size of the port being accessed (8, 16, or 32 bits, respectively). Using the
DX register as a source operand allows I/O port addresses from 0 to 65,535 to be accessed; using a byte immediate
allows I/O port addresses 0 to 255 to be accessed.

When accessing an 8-bit I/O port, the opcode determines the port size; when accessing a 16- and 32-bit I/O port,
the operand-size attribute determines the port size. At the machine code level, I/O instructions are shorter when
accessing 8-bit I/O ports. Here, the upper eight bits of the port address will be 0.

This instruction is only useful for accessing I/O ports located in the processor’s I/O address space. See Chapter 18,
“Input/Output,” in the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 1, for more information
 on accessing I/O ports in the I/O address space.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
IF ((PE = 1) and ((CPL > IOPL) or (VM = 1)))
    THEN (* Protected mode with CPL > IOPL or virtual-8086 mode *)
        IF (Any I/O Permission Bit for I/O port being accessed = 1)
            THEN (* I/O operation is not allowed *)
                #GP(0);
            ELSE ( * I/O operation is allowed *) 
                DEST ← SRC; (* Read from selected I/O port *)
        FI;
    ELSE (Real Mode or Protected Mode with CPL ≤ IOPL *)
        DEST ← SRC; (* Read from selected I/O port *)
FI;
```
### Flags Affected

None

### Protected Mode Exceptions
<p>#GP(0)
If the CPL is greater than (has less privilege) the I/O privilege level (IOPL) and any of the
corresponding I/O permission bits in TSS for the I/O port being accessed is 1.
<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#UD
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

<p>#GP(0)
If any of the I/O permission bits in the TSS for the I/O port being accessed is 1.
<p>#PF(fault-code)
If a page fault occurs.
<p>#UD
If the LOCK prefix is used.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#GP(0)
If the CPL is greater than (has less privilege) the I/O privilege level (IOPL) and any of the
corresponding I/O permission bits in TSS for the I/O port being accessed is 1.
<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
