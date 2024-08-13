<b>SLDT</b> — Store Local Descriptor Table Register
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
		<td>0F 00 /0</td>
		<td>SLDT r/m16</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Stores segment selector from LDTR in r/m16.</td>
	</tr>
	<tr>
		<td>REX.W + 0F 00 /0</td>
		<td>SLDT r64/m16</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Stores segment selector from LDTR in r64/m16.</td>
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
		<td>M</td>
		<td>ModRM:r/m (w)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Stores the segment selector from the local descriptor table register (LDTR) in the destination operand. The destination
 operand can be a general-purpose register or a memory location. The segment selector stored with this
instruction points to the segment descriptor (located in the GDT) for the current LDT. This instruction can only be
executed in protected mode.

Outside IA-32e mode, when the destination operand is a 32-bit register, the 16-bit segment selector is copied into
the low-order 16 bits of the register. The high-order 16 bits of the register are cleared for the Pentium 4, Intel Xeon,
and P6 family processors. They are undefined for Pentium, Intel486, and Intel386 processors. When the destination
 operand is a memory location, the segment selector is written to memory as a 16-bit quantity, regardless of
the operand size.

In compatibility mode, when the destination operand is a 32-bit register, the 16-bit segment selector is copied into
the low-order 16 bits of the register. The high-order 16 bits of the register are cleared. When the destination
operand is a memory location, the segment selector is written to memory as a 16-bit quantity, regardless of the
operand size.

In 64-bit mode, using a REX prefix in the form of REX.R permits access to additional registers (R8-R15). The
behavior of SLDT with a 64-bit register is to zero-extend the 16-bit selector and store it in the register. If the destination
 is memory and operand size is 64, SLDT will write the 16-bit selector to memory as a 16-bit quantity,
regardless of the operand size.

### Operation

```java
DEST ← LDTR(SegmentSelector);
```
### Flags Affected

None.

### Protected Mode Exceptions

<p>#GP(0)
If the destination is located in a non-writable segment.
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register is used to access memory and it contains a NULL segment
selector.
If CR4.UMIP = 1 and CPL > 0.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while CPL = 3.
<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions
<p>#UD
The SLDT instruction is not recognized in real-address mode.

### Virtual-8086 Mode Exceptions

<p>#UD
The SLDT instruction is not recognized in virtual-8086 mode.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#SS(0)
If a memory address referencing the SS segment is in a non-canonical form.
<p>#GP(0)
If the memory address is in a non-canonical form.
If CR4.UMIP = 1 and CPL > 0.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while CPL = 3.
<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
