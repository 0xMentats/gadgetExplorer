<b>BOUND</b> — Check Array Index Against Bounds
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
		<td>62 /r</td>
		<td>BOUND r16, m16&16</td>
		<td>RM</td>
		<td>Invalid</td>
		<td>Valid</td>
		<td>Check if r16 (array index) is within bounds specified by m16&16.</td>
	</tr>
	<tr>
		<td>62 /r</td>
		<td>BOUND r32, m32&32</td>
		<td>RM</td>
		<td>Invalid</td>
		<td>Valid</td>
		<td>Check if r32 (array index) is within bounds specified by m32&32.</td>
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
		<td>RM</td>
		<td>ModRM:reg (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
BOUND determines if the first operand (array index) is within the bounds of an array specified the second operand
(bounds operand). The array index is a signed integer located in a register. The bounds operand is a memory location
 that contains a pair of signed doubleword-integers (when the operand-size attribute is 32) or a pair of signed
word-integers (when the operand-size attribute is 16). The first doubleword (or word) is the lower bound of the
array and the second doubleword (or word) is the upper bound of the array. The array index must be greater than
or equal to the lower bound and less than or equal to the upper bound plus the operand size in bytes. If the index
is not within bounds, a BOUND range exceeded exception (\#BR) is signaled. When this exception is generated, the
saved return instruction pointer points to the BOUND instruction.

The bounds limit data structure (two words or doublewords containing the lower and upper limits of the array) is
usually placed just before the array itself, making the limits addressable via a constant offset from the beginning of
the array. Because the address of the array already will be present in a register, this practice avoids extra bus cycles
to obtain the effective address of the array bounds.

This instruction executes as described in compatibility mode and legacy mode. It is not valid in 64-bit mode.

### Operation

```java
IF 64bit Mode
    THEN
        #UD;
    ELSE
        IF (ArrayIndex < LowerBound OR ArrayIndex > UpperBound) THEN
        (* Below lower bound or above upper bound *)
            IF <equation for PL enabled> THEN BNDSTATUS ← 0
            #BR; 
        FI;
FI;
```
### Flags Affected

None.

### Protected Mode Exceptions
<p>#BR
If the bounds test fails.
<p>#UD
If second operand is not a memory location.
If the LOCK prefix is used.
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

### Real-Address Mode Exceptions

<p>#BR
If the bounds test fails.
<p>#UD
If second operand is not a memory location.
If the LOCK prefix is used.
<p>#GP
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS
If a memory operand effective address is outside the SS segment limit.

### Virtual-8086 Mode Exceptions

<p>#BR
If the bounds test fails.
<p>#UD
If second operand is not a memory location.
If the LOCK prefix is used.
<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#UD
If in 64-bit mode.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
