<b>PUSH</b> — Push Word, Doubleword or Quadword Onto the Stack
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
		<td>FF /6</td>
		<td>PUSH r/m16</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Push r/m16.</td>
	</tr>
	<tr>
		<td>FF /6</td>
		<td>PUSH r/m32</td>
		<td>M</td>
		<td>N.E.</td>
		<td>Valid</td>
		<td>Push r/m32.</td>
	</tr>
	<tr>
		<td>FF /6</td>
		<td>PUSH r/m64</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Push r/m64.</td>
	</tr>
	<tr>
		<td>50+rw</td>
		<td>PUSH r16</td>
		<td>O</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Push r16.</td>
	</tr>
	<tr>
		<td>50+rd</td>
		<td>PUSH r32</td>
		<td>O</td>
		<td>N.E.</td>
		<td>Valid</td>
		<td>Push r32.</td>
	</tr>
	<tr>
		<td>50+rd</td>
		<td>PUSH r64</td>
		<td>O</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Push r64.</td>
	</tr>
	<tr>
		<td>6A ib</td>
		<td>PUSH imm8</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Push imm8.</td>
	</tr>
	<tr>
		<td>68 iw</td>
		<td>PUSH imm16</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Push imm16.</td>
	</tr>
	<tr>
		<td>68 id</td>
		<td>PUSH imm32</td>
		<td>I</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Push imm32.</td>
	</tr>
	<tr>
		<td>0E</td>
		<td>PUSH CS</td>
		<td>ZO</td>
		<td>Invalid</td>
		<td>Valid</td>
		<td>Push CS.</td>
	</tr>
	<tr>
		<td>16</td>
		<td>PUSH SS</td>
		<td>ZO</td>
		<td>Invalid</td>
		<td>Valid</td>
		<td>Push SS.</td>
	</tr>
	<tr>
		<td>1E</td>
		<td>PUSH DS</td>
		<td>ZO</td>
		<td>Invalid</td>
		<td>Valid</td>
		<td>Push DS.</td>
	</tr>
	<tr>
		<td>06</td>
		<td>PUSH ES</td>
		<td>ZO</td>
		<td>Invalid</td>
		<td>Valid</td>
		<td>Push ES.</td>
	</tr>
	<tr>
		<td>0F A0</td>
		<td>PUSH FS</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Push FS.</td>
	</tr>
	<tr>
		<td>0F A8</td>
		<td>PUSH GS</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Push GS.</td>
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
		<td>M</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>O</td>
		<td>opcode + rd (r)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>I</td>
		<td>imm8/16/32</td>
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
Decrements the stack pointer and then stores the source operand on the top of the stack. Address and operand
sizes are determined and used as follows:

 *  Address size. The D flag in the current code-segment descriptor determines the default address size; it may be

overridden by an instruction prefix (67H).

The address size is used only when referencing a source operand in memory.

 *  Operand size. The D flag in the current code-segment descriptor determines the default operand size; it may

be overridden by instruction prefixes (66H or REX.W).

The operand size (16, 32, or 64 bits) determines the amount by which the stack pointer is decremented (2, 4
or 8).

If the source operand is an immediate of size less than the operand size, a sign-extended value is pushed on
the  stack.  If  the  source  operand  is  a  segment  register  (16  bits)  and  the  operand  size  is  64-bits,  a  zero-
extended value is pushed on the stack; if the operand size is 32-bits, either a zero-extended value is pushed
on the stack or the segment selector is written on the stack using a 16-bit move. For the last case, all recent
Core and Atom processors perform a 16-bit move, leaving the upper portion of the stack location unmodified.

 *  Stack-address size. Outside of 64-bit mode, the B flag in the current stack-segment descriptor determines the

size of the stack pointer (16 or 32 bits); in 64-bit mode, the size of the stack pointer is always 64 bits.
The stack-address size determines the width of the stack pointer when writing to the stack in memory and
when  decrementing  the  stack  pointer.  (As  stated  above,  the  amount  by  which  the  stack  pointer  is
decremented is determined by the operand size.)

If the operand size is less than the stack-address size, the PUSH instruction may result in a misaligned stack
pointer (a stack pointer that is not aligned on a doubleword or quadword boundary).

The PUSH ESP instruction pushes the value of the ESP register as it existed before the instruction was executed. If
a PUSH instruction uses a memory operand in which the ESP register is used for computing the operand address,
the address of the operand is computed before the ESP register is decremented.

If the ESP or SP register is 1 when the PUSH instruction is executed in real-address mode, a stack-fault exception
(\#SS) is generated (because the limit of the stack segment is violated). Its delivery encounters a second stack-
fault exception (for the same reason), causing generation of a double-fault exception (\#DF). Delivery of the
double-fault exception encounters a third stack-fault exception, and the logical processor enters shutdown mode.
See the discussion of the double-fault exception in Chapter 6 of the Intel® 64 and IA-32 Architectures Software
Developer’s Manual, Volume 3A.

### IA-32 Architecture Compatibility

For IA-32 processors from the Intel 286 on, the PUSH ESP instruction pushes the value of the ESP register as it
existed before the instruction was executed. (This is also true for Intel 64 architecture, real-address and virtual-
8086 modes of IA-32 architecture.) For the Intel® 8086 processor, the PUSH SP instruction pushes the new value
of the SP register (that is the value after it has been decremented by 2).

### Operation

```java
(* See Description section for possible sign-extension or zero-extension of source operand and for *)
(* a case in which the size of the memory store may be smaller than the instruction’s operand size *)
IF StackAddrSize = 64
    THEN
        IF OperandSize = 64
            THEN
                RSP ← RSP – 8;
                Memory[SS:RSP] ← SRC;
                            (* push quadword *)
        ELSE IF OperandSize = 32
            THEN
                RSP ← RSP – 4;
                Memory[SS:RSP] ← SRC;
                            (* push dword *)
            ELSE (* OperandSize = 16 *)
                RSP ← RSP – 2;
                Memory[SS:RSP] ← SRC;
                            (* push word *)
        FI;
ELSE IF StackAddrSize = 32
    THEN
        IF OperandSize = 64
            THEN
                ESP ← ESP – 8;
                Memory[SS:ESP] ← SRC;
                            (* push quadword *)
        ELSE IF OperandSize = 32
            THEN
                ESP ← ESP – 4;
                Memory[SS:ESP] ← SRC;
                            (* push dword *)
            ELSE (* OperandSize = 16 *)
                ESP ← ESP – 2;
                Memory[SS:ESP] ← SRC;
                            (* push word *)
        FI;
    ELSE (* StackAddrSize = 16 *)
        IF OperandSize = 32
            THEN
                SP ← SP – 4;
                Memory[SS:SP] ← SRC;
                            (* push dword *)
            ELSE (* OperandSize = 16 *)
                SP ← SP – 2;
                Memory[SS:SP] ← SRC;
                            (* push word *)
        FI;
FI;
```
### Flags Affected
None.

### Protected Mode Exceptions

<p>#GP(0)
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

<p>#GP
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS
If a memory operand effective address is outside the SS segment limit.
If the new value of the SP or ESP register is outside the stack segment limit.
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

<p>#GP(0)
If the memory address is in a non-canonical form.
<p>#SS(0)
If the stack address is in a non-canonical form.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.
<p>#UD
If the LOCK prefix is used.
If the PUSH is of CS, SS, DS, or ES.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
