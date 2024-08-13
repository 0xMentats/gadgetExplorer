<b>POPCNT</b> —  Return the Count of Number of Bits Set to 1
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
		<td>F3 0F B8 /r</td>
		<td>POPCNT r16, r/m16</td>
		<td>RM </td>
		<td>Valid</td>
		<td>Valid</td>
		<td>POPCNT on r/m16</td>
	</tr>
	<tr>
		<td>F3 0F B8 /r</td>
		<td>POPCNT r32, r/m32</td>
		<td>RM </td>
		<td>Valid</td>
		<td>Valid</td>
		<td>POPCNT on r/m32</td>
	</tr>
	<tr>
		<td>F3 REX.W 0F B8 /r</td>
		<td>POPCNT r64, r/m64</td>
		<td>RM </td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>POPCNT on r/m64</td>
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
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
This instruction calculates the number of bits set to 1 in the second operand (source) and returns the count in the
first operand (a destination register).

### Operation

```java
Count = 0;
For (i=0; i < OperandSize; i++) 
{
     
        IF (SRC[ i] = 1) // i’th bit
        THEN Count++; FI;
}
DEST ← Count;
```
### Flags Affected

OF, SF, ZF, AF, CF, PF are all cleared. ZF is set if SRC = 0, otherwise ZF is cleared.

### Intel C/C++ Compiler Intrinsic Equivalent
```c
POPCNT:
 int _mm_popcnt_u32(unsigned int a);
POPCNT:
 int64_t _mm_popcnt_u64(unsigned __int64 a);
```
### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS or GS segments.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF (fault-code)
For a page fault.
<p>#AC(0)
If an unaligned memory reference is made while the current privilege level is 3 and alignment
checking is enabled.
<p>#UD
If CPUID.01H:ECX.POPCNT [Bit 23] = 0.
If LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#GP(0)
If any part of the operand lies outside of the effective address space from 0 to 0FFFFH.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#UD
If CPUID.01H:ECX.POPCNT [Bit 23] = 0.
If LOCK prefix is used.

### Virtual 8086 Mode Exceptions
<p>#GP(0)
If any part of the operand lies outside of the effective address space from 0 to 0FFFFH.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF (fault-code)
For a page fault.
<p>#AC(0)
If an unaligned memory reference is made while alignment checking is enabled.
<p>#UD
If CPUID.01H:ECX.POPCNT [Bit 23] = 0.
If LOCK prefix is used.

### Compatibility Mode Exceptions

Same exceptions as in Protected Mode.

### 64-Bit Mode Exceptions

<p>#GP(0)
If the memory address is in a non-canonical form.
<p>#SS(0)
If a memory address referencing the SS segment is in a non-canonical form.
<p>#PF (fault-code)
For a page fault.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.
<p>#UD
If CPUID.01H:ECX.POPCNT [Bit 23] = 0.
If LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
