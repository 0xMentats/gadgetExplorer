<b>SHRD</b> — Double Precision Shift Right
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
		<td>0F AC /r ib</td>
		<td>SHRD r/m16, r16, imm8</td>
		<td>MRI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Shift r/m16 to right imm8 places while shifting bits from r16 in from the left.</td>
	</tr>
	<tr>
		<td>0F AD /r</td>
		<td>SHRD r/m16, r16, CL</td>
		<td>MRC</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Shift r/m16 to right CL places while shifting bits from r16 in from the left.</td>
	</tr>
	<tr>
		<td>0F AC /r ib</td>
		<td>SHRD r/m32, r32, imm8</td>
		<td>MRI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Shift r/m32 to right imm8 places while shifting bits from r32 in from the left.</td>
	</tr>
	<tr>
		<td>REX.W + 0F AC /r ib</td>
		<td>SHRD r/m64, r64, imm8</td>
		<td>MRI</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Shift r/m64 to right imm8 places while shifting bits from r64 in from the left.</td>
	</tr>
	<tr>
		<td>0F AD /r</td>
		<td>SHRD r/m32, r32, CL</td>
		<td>MRC</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Shift r/m32 to right CL places while shifting bits from r32 in from the left.</td>
	</tr>
	<tr>
		<td>REX.W + 0F AD /r</td>
		<td>SHRD r/m64, r64, CL</td>
		<td>MRC</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Shift r/m64 to right CL places while shifting bits from r64 in from the left.</td>
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
The SHRD instruction is useful for multi-precision shifts of 64 bits or more.

The instruction shifts the first operand (destination operand) to the right the number of bits specified by the third
operand (count operand). The second operand (source operand) provides bits to shift in from the left (starting with
the most significant bit of the destination operand).

The destination operand can be a register or a memory location; the source operand is a register. The count
operand is an unsigned integer that can be stored in an immediate byte or the CL register. If the count operand is
CL, the shift count is the logical AND of CL and a count mask. In non-64-bit modes and default 64-bit mode, the
width of the count mask is 5 bits. Only bits 0 through 4 of the count register are used (masking the count to a value
between 0 and 31). If the count is greater than the operand size, the result is undefined.

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
                CF ← BIT[DEST, COUNT – 1]; (* Last bit shifted out on exit *)
                FOR i ← 0 TO SIZE – 1 – COUNT
                    DO
                        BIT[DEST, i] ← BIT[DEST, i + COUNT];
                    OD;
                FOR i ← SIZE – COUNT TO SIZE – 1
                    DO
                        BIT[DEST,i] ← BIT[SRC, i + COUNT – SIZE];
                    OD;
        FI;
FI;
```
### Flags Affected
If the count is 1 or greater, the CF flag is filled with the last bit shifted out of the destination operand and the SF,
ZF, and PF flags are set according to the value of the result. For a 1-bit shift, the OF flag is set if a sign change
occurred; otherwise, it is cleared. For shifts greater than 1 bit, the OF flag is undefined. If a shift occurs, the AF flag
is undefined. If the count operand is 0, the flags are not affected. If the count is greater than the operand size, the
flags are undefined.

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