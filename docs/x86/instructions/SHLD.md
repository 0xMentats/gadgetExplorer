<b>SHLD</b> — Double Precision Shift Left
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
		<td>0F A4 /r ib</td>
		<td>SHLD r/m16, r16, imm8</td>
		<td>MRI Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Shift r/m16 to left imm8 places while shifting bits from r16 in from the right.</td>
	</tr>
	<tr>
		<td>0F A5 /r</td>
		<td>SHLD r/m16, r16, CL</td>
		<td>MRC Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Shift r/m16 to left CL places while shifting bits from r16 in from the right.</td>
	</tr>
	<tr>
		<td>0F A4 /r ib</td>
		<td>SHLD r/m32, r32, imm8</td>
		<td>MRI Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Shift r/m32 to left imm8 places while shifting bits from r32 in from the right.</td>
	</tr>
	<tr>
		<td>REX.W + 0F A4 /r ib</td>
		<td>SHLD r/m64, r64, imm8</td>
		<td>MRI Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Shift r/m64 to left imm8 places while shifting bits from r64 in from the right.</td>
	</tr>
	<tr>
		<td>0F A5 /r</td>
		<td>SHLD r/m32, r32, CL</td>
		<td>MRC Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Shift r/m32 to left CL places while shifting bits from r32 in from the right.</td>
	</tr>
	<tr>
		<td>REX.W + 0F A5 /r</td>
		<td>SHLD r/m64, r64, CL</td>
		<td>MRC Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Shift r/m64 to left CL places while shifting bits from r64 in from the right.</td>
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
		<td>MRI</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>imm8</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>MRC</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>CL</td>
		<td>NA</td>
	</tr>
</table>


### Description
The SHLD instruction is used for multi-precision shifts of 64 bits or more.

The instruction shifts the first operand (destination operand) to the left the number of bits specified by the third
operand (count operand). The second operand (source operand) provides bits to shift in from the right (starting
with bit 0 of the destination operand).

The destination operand can be a register or a memory location; the source operand is a register. The count
operand is an unsigned integer that can be stored in an immediate byte or in the CL register. If the count operand
is CL, the shift count is the logical AND of CL and a count mask. In non-64-bit modes and default 64-bit mode; only
bits 0 through 4 of the count are used. This masks the count to a value between 0 and 31. If a count is greater than
the operand size, the result is undefined.

If the count is 1 or greater, the CF flag is filled with the last bit shifted out of the destination operand. For a 1-bit
shift, the OF flag is set if a sign change occurred; otherwise, it is cleared. If the count operand is 0, flags are not
affected.

In 64-bit mode, the instruction’s default operation size is 32 bits. Using a REX prefix in the form of REX.R permits
access to additional registers (R8-R15). Using a REX prefix in the form of REX.W promotes operation to 64 bits
(upgrading the count mask to 6 bits). See the summary chart at the beginning of this section for encoding data and
limits.

### Operation

```java
IF (In 64-Bit Mode and REX.W = 1) 
    THEN COUNT ← COUNT MOD 64;
    ELSE COUNT ← COUNT MOD 32;
FI
SIZE ← OperandSize;
IF COUNT = 0
    THEN 
        No operation;
    ELSE
        IF COUNT > SIZE
            THEN (* Bad parameters *)
                DEST is undefined;
                CF, OF, SF, ZF, AF, PF are undefined;
            ELSE (* Perform the shift *)
                CF ← BIT[DEST, SIZE – COUNT];
                (* Last bit shifted out on exit *)
                FOR i ← SIZE – 1 DOWN TO COUNT
                    DO
                        Bit(DEST, i) ← Bit(DEST, i – COUNT);
                    OD;
                FOR i ← COUNT – 1 DOWN TO 0
                    DO
                        BIT[DEST, i] ← BIT[SRC, i – COUNT + SIZE];
                    OD;
        FI;
FI;
```
### Flags Affected
If the count is 1 or greater, the CF flag is filled with the last bit shifted out of the destination operand and the SF, ZF,
and PF flags are set according to the value of the result. For a 1-bit shift, the OF flag is set if a sign change occurred;
otherwise, it is cleared. For shifts greater than 1 bit, the OF flag is undefined. If a shift occurs, the AF flag is unde-
fined. If the count operand is 0, the flags are not affected. If the count is greater than the operand size, the flags
are undefined.

### Protected Mode Exceptions

<p>#GP(0)
If the destination is located in a non-writable segment.
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
<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
