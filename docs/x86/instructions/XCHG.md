<b>XCHG</b> — Exchange Register/Memory with Register
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
		<td>90+rw</td>
		<td>XCHG AX, r16</td>
		<td>O</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Exchange r16 with AX.</td>
	</tr>
	<tr>
		<td>90+rw</td>
		<td>XCHG r16, AX</td>
		<td>O</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Exchange AX with r16.</td>
	</tr>
	<tr>
		<td>90+rd</td>
		<td>XCHG EAX, r32</td>
		<td>O</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Exchange r32 with EAX.</td>
	</tr>
	<tr>
		<td>REX.W + 90+rd</td>
		<td>XCHG RAX, r64</td>
		<td>O</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Exchange r64 with RAX.</td>
	</tr>
	<tr>
		<td>90+rd</td>
		<td>XCHG r32, EAX</td>
		<td>O</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Exchange EAX with r32.</td>
	</tr>
	<tr>
		<td>REX.W + 90+rd</td>
		<td>XCHG r64, RAX</td>
		<td>O</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Exchange RAX with r64.</td>
	</tr>
	<tr>
		<td>86 /r</td>
		<td>XCHG r/m8, r8</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Exchange r8 (byte register) with byte from r/m8.</td>
	</tr>
	<tr>
		<td>REX + 86 /r</td>
		<td>XCHG r/m8*, r8*</td>
		<td>MR</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Exchange r8 (byte register) with byte from r/m8.</td>
	</tr>
	<tr>
		<td>86 /r</td>
		<td>XCHG r8, r/m8</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Exchange byte from r/m8 with r8 (byte register).</td>
	</tr>
	<tr>
		<td>REX + 86 /r</td>
		<td>XCHG r8*, r/m8*</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Exchange byte from r/m8 with r8 (byte register).</td>
	</tr>
	<tr>
		<td>87 /r</td>
		<td>XCHG r/m16, r16</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Exchange r16 with word from r/m16.</td>
	</tr>
	<tr>
		<td>87 /r</td>
		<td>XCHG r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Exchange word from r/m16 with r16.</td>
	</tr>
	<tr>
		<td>87 /r</td>
		<td>XCHG r/m32, r32</td>
		<td>MR</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Exchange r32 with doubleword from r/m32.</td>
	</tr>
	<tr>
		<td>REX.W + 87 /r</td>
		<td>XCHG r/m64, r64</td>
		<td>MR</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Exchange r64 with quadword from r/m64.</td>
	</tr>
	<tr>
		<td>87 /r</td>
		<td>XCHG r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Exchange doubleword from r/m32 with r32.</td>
	</tr>
	<tr>
		<td>REX.W + 87 /r</td>
		<td>XCHG r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Exchange quadword from r/m64 with r64.</td>
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
		<td>O</td>
		<td>AX/EAX/RAX (r, w)</td>
		<td>opcode + rd (r, w)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>O</td>
		<td>opcode + rd (r, w)</td>
		<td>AX/EAX/RAX (r, w)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>MR</td>
		<td>ModRM:r/m (r, w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>RM</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Exchanges the contents of the destination (first) and source (second) operands. The operands can be two general-
purpose registers or a register and a memory location. If a memory operand is referenced, the processor’s locking
protocol is automatically implemented for the duration of the exchange operation, regardless of the presence or
absence of the LOCK prefix or of the value of the IOPL. (See the LOCK prefix description in this chapter for more
information on the locking protocol.)

This instruction is useful for implementing semaphores or similar data structures for process synchronization. (See
“Bus Locking” in Chapter 8 of the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 3A, for
more information on bus locking.)

The XCHG instruction can also be used instead of the BSWAP instruction for 16-bit operands.

In 64-bit mode, the instruction’s default operation size is 32 bits. Using a REX prefix in the form of REX.R permits
access to additional registers (R8-R15). Using a REX prefix in the form of REX.W promotes operation to 64 bits. See
the summary chart at the beginning of this section for encoding data and limits.
NOTE

XCHG (E)AX, (E)AX (encoded instruction byte is 90H) is an alias for NOP regardless of data size
prefixes, including REX.W.

### Operation

```java
TEMP ← DEST;
DEST ← SRC;
SRC ← TEMP;
```
### Flags Affected

None.

### Protected Mode Exceptions

<p>#GP(0)
If either operand is in a non-writable segment.
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
If the LOCK prefix is used but the destination is not a memory operand.

### Real-Address Mode Exceptions

<p>#GP
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS
If a memory operand effective address is outside the SS segment limit.
<p>#UD
If the LOCK prefix is used but the destination is not a memory operand.

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
If the LOCK prefix is used but the destination is not a memory operand.

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
If the LOCK prefix is used but the destination is not a memory operand.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
