<b>OUT</b> — Output to Port
<table>
	<tr>
		<td><b>Opcode*</b></td>
		<td><b>Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>E6 ib</td>
		<td>OUT imm8, AL</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Output byte in AL to I/O port address imm8.</td>
	</tr>
	<tr>
		<td>E7 ib</td>
		<td>OUT imm8, AX</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Output word in AX to I/O port address imm8.</td>
	</tr>
	<tr>
		<td>E7 ib</td>
		<td>OUT imm8, EAX</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Output doubleword in EAX to I/O port address imm8.</td>
	</tr>
	<tr>
		<td>EE</td>
		<td>OUT DX, AL</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Output byte in AL to I/O port address in DX.</td>
	</tr>
	<tr>
		<td>EF</td>
		<td>OUT DX, AX</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Output word in AX to I/O port address in DX.</td>
	</tr>
	<tr>
		<td>EF</td>
		<td>OUT DX, EAX</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Output doubleword in EAX to I/O port address in DX.</td>
	</tr>
</table>

\* See IA-32 Architecture Compatibility section below.

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
Copies the value from the second operand (source operand) to the I/O port specified with the destination operand
(first operand). The source operand can be register AL, AX, or EAX, depending on the size of the port being
accessed (8, 16, or 32 bits, respectively); the destination operand can be a byte-immediate or the DX register.
Using a byte immediate allows I/O port addresses 0 to 255 to be accessed; using the DX register as a source
operand allows I/O ports from 0 to 65,535 to be accessed.

The size of the I/O port being accessed is determined by the opcode for an 8-bit I/O port or by the operand-size
attribute of the instruction for a 16- or 32-bit I/O port.

At the machine code level, I/O instructions are shorter when accessing 8-bit I/O ports. Here, the upper eight bits
of the port address will be 0.

This instruction is only useful for accessing I/O ports located in the processor’s I/O address space. See Chapter 18,
“Input/Output,” in the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 1, for more information
 on accessing I/O ports in the I/O address space.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### IA-32 Architecture Compatibility

After executing an OUT instruction, the Pentium® processor ensures that the EWBE\# pin has been sampled active
before it begins to execute the next instruction. (Note that the instruction can be prefetched if EWBE\# is not active,
but it will not be executed until the EWBE\# pin is sampled active.) Only the Pentium processor family has the
EWBE\# pin.

### Operation

```java
IF ((PE = 1) and ((CPL > IOPL) or (VM = 1)))
    THEN (* Protected mode with CPL > IOPL or virtual-8086 mode *)
        IF (Any I/O Permission Bit for I/O port being accessed = 1)
            THEN (* I/O operation is not allowed *)
                #GP(0);
            ELSE ( * I/O operation is allowed *) 
                DEST ← SRC; (* Writes to selected I/O port *)
        FI;
    ELSE (Real Mode or Protected Mode with CPL ≤ IOPL *)
        DEST ← SRC; (* Writes to selected I/O port *)
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

Same as protected mode exceptions.

### 64-Bit Mode Exceptions

Same as protected mode exceptions.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
