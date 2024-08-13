<b>LZCNT</b> — Count the Number of Leading Zero Bits
<table>
	<tr>
		<td><b>Opcode/Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32-bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F3 0F BD /r LZCNT r16, r/m16</td>
		<td>RM</td>
		<td>V/V</td>
		<td>LZCNT</td>
		<td>Count the number of leading zero bits in r/m16, return result in r16.</td>
	</tr>
	<tr>
		<td>F3 0F BD /r LZCNT r32, r/m32</td>
		<td>RM</td>
		<td>V/V</td>
		<td>LZCNT</td>
		<td>Count the number of leading zero bits in r/m32, return result in r32.</td>
	</tr>
	<tr>
		<td>F3 REX.W 0F BD /r LZCNT r64, r/m64</td>
		<td>RM</td>
		<td>V/N.E.</td>
		<td>LZCNT</td>
		<td>Count the number of leading zero bits in r/m64, return result in r64.</td>
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
Counts the number of leading most significant zero bits in a source operand (second operand) returning the result
into a destination (first operand).

LZCNT differs from BSR. For example, LZCNT will produce the operand size when the input operand is zero. It
should be noted that on processors that do not support LZCNT, the instruction byte encoding is executed as BSR.

In 64-bit mode 64-bit operand size requires REX.W=1.

### Operation

```java
temp ← OperandSize - 1
DEST ← 0
WHILE (temp >= 0) AND (Bit(SRC, temp) = 0)
DO
    temp ← temp - 1
    DEST ← DEST+ 1
OD
IF DEST = OperandSize
    CF ← 1
ELSE
    CF ← 0
FI
IF DEST = 0
    ZF ← 1
ELSE
    ZF ← 0
FI
```
### Flags Affected

ZF flag is set to 1 in case of zero output (most significant bit of the source is set), and to 0 otherwise, CF flag is set
to 1 if input was zero and cleared otherwise. OF, SF, PF and AF flags are undefined.

### Intel C/C++ Compiler Intrinsic Equivalent
```c
LZCNT:
unsigned __int32 _lzcnt_u32(unsigned __int32 src);
LZCNT:
unsigned __int64 _lzcnt_u64(unsigned __int64 src);
```
### Protected Mode Exceptions
<p>#GP(0)
For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.
If the DS, ES, FS, or GS register is used to access memory and it contains a null segment
selector.
<p>#SS(0)
For an illegal address in the SS segment.
<p>#PF (fault-code)
For a page fault.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.

### Real-Address Mode Exceptions

<p>#GP(0)
If any part of the operand lies outside of the effective address space from 0 to 0FFFFH.
<p>#SS(0)
For an illegal address in the SS segment.

### Virtual 8086 Mode Exceptions

<p>#GP(0)
If any part of the operand lies outside of the effective address space from 0 to 0FFFFH.
<p>#SS(0)
For an illegal address in the SS segment.
<p>#PF (fault-code)
For a page fault.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.

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

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
