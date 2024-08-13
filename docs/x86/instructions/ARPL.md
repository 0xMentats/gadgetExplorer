<b>ARPL</b> — Adjust RPL Field of Segment Selector
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64-bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>63 /r</td>
		<td>ARPL r/m16, r16</td>
		<td>ZO</td>
		<td>N. E.</td>
		<td>Valid</td>
		<td>Adjust RPL of r/m16 to not less than RPL of r16.</td>
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
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Compares the RPL fields of two segment selectors. The first operand (the destination operand) contains one
segment selector and the second operand (source operand) contains the other. (The RPL field is located in bits 0
and 1 of each operand.) If the RPL field of the destination operand is less than the RPL field of the source operand,
the ZF flag is set and the RPL field of the destination operand is increased to match that of the source operand.
Otherwise, the ZF flag is cleared and no change is made to the destination operand. (The destination operand can
be a word register or a memory location; the source operand must be a word register.)

The ARPL instruction is provided for use by operating-system procedures (however, it can also be used by applications).
It is generally used to adjust the RPL of a segment selector that has been passed to the operating system by
an application program to match the privilege level of the application program. Here the segment selector passed
to the operating system is placed in the destination operand and segment selector for the application program’s
code segment is placed in the source operand. (The RPL field in the source operand represents the privilege level
of the application program.) Execution of the ARPL instruction then ensures that the RPL of the segment selector
received by the operating system is no lower (does not have a higher privilege) than the privilege level of the 
application program (the segment selector for the application program’s code segment can be read from the stack
following a procedure call).

This instruction executes as described in compatibility mode and legacy mode. It is not encodable in 64-bit mode.

See “Checking Caller Access Privileges” in Chapter 3, “Protected-Mode Memory Management,” of the Intel® 64 and
IA-32 Architectures Software Developer’s Manual, Volume 3A, for more information about the use of this instruction
.

### Operation

```java
IF 64-BIT MODE
    THEN
        See MOVSXD;
    ELSE
        IF DEST[RPL] < SRC[RPL]
            THEN
                ZF ← 1;
                DEST[RPL] ← SRC[RPL];
            ELSE
                ZF ← 0;
        FI;
FI;
```
### Flags Affected

The ZF flag is set to 1 if the RPL field of the destination operand is less than that of the source operand; otherwise,
it is set to 0.

### Protected Mode Exceptions
<p>#GP(0)
If the destination is located in a non-writable segment.
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register is used to access memory and it contains a NULL segment
selector.
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

<p>#UD
The ARPL instruction is not recognized in real-address mode.
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

<p>#UD
The ARPL instruction is not recognized in virtual-8086 mode.
If the LOCK prefix is used.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

Not applicable.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
