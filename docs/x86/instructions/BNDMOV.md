<b>BNDMOV</b> — Move Bounds
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 1A /r BNDMOV bnd1, bnd2/m64</td>
		<td>RM</td>
		<td>NE/V</td>
		<td>MPX</td>
		<td>Move lower and upper bound from bnd2/m64 to bound register bnd1.</td>
	</tr>
	<tr>
		<td>66 0F 1A /r BNDMOV bnd1, bnd2/m128</td>
		<td>RM</td>
		<td>V/NE</td>
		<td>MPX</td>
		<td>Move lower and upper bound from bnd2/m128 to bound register bnd1.</td>
	</tr>
	<tr>
		<td>66 0F 1B /r BNDMOV bnd1/m64, bnd2</td>
		<td>MR</td>
		<td>NE/V</td>
		<td>MPX</td>
		<td>Move lower and upper bound from bnd2 to bnd1/m64.</td>
	</tr>
	<tr>
		<td>66 0F 1B /r BNDMOV bnd1/m128, bnd2</td>
		<td>MR</td>
		<td>V/NE</td>
		<td>MPX</td>
		<td>Move lower and upper bound from bnd2 to bound register bnd1/m128.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand 2</b></td>
		<td><b>Operand 3</b></td>
	</tr>
	<tr>
		<td>RM</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>MR</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
BNDMOV moves a pair of lower and upper bound values from the source operand (the second operand) to the
destination (the first operand). Each operation is 128-bit move. The exceptions are same as the MOV instruction.
The memory format for loading/store bounds in 64-bit mode is shown in Figure 3-5.
<table>
	<tr>
		<td colspan=15 rowspan=9><b>Upper Bound (UB) Lower Bound (LB) BNDMOV to memory in 64-bit mode 16 8 0 Byte offset Upper Bound (UB) Lower Bound (LB) BNDMOV to memory in 32-bit mode 16 8 4 0 Byte offset</b></td>
	</tr>
	<tr>
		<td colspan=5>Upper Bound (UB)</td>
		<td colspan=4>Lower Bound (LB)</td>
	</tr>
	<tr>
	</tr>
	<tr>
		<td colspan=5></td>
		<td colspan=5></td>
	</tr>
	<tr>
	</tr>
	<tr>
		<td colspan=5>Upper Bound (UB)</td>
		<td colspan=4>Lower Bound (LB)</td>
		<td colspan=5 rowspan=4>BNDMOV to memory in 32-bit mode 4 0 Byte offset</td>
	</tr>
	<tr>
	</tr>
	<tr>
		<td colspan=2></td>
		<td colspan=3></td>
		<td colspan=4></td>
		<td></td>
		<td colspan=2 rowspan=2></td>
	</tr>
	<tr>
	</tr>
</table>

Figure 3-5.  Memory Layout of BNDMOV to/from Memory

This instruction does not change flags.

### Operation


#### BNDMOV register to register
```java
DEST.LB ← SRC.LB; 
DEST.UB ← SRC.UB; 
```
#### BNDMOV from memory
```java
IF 64-bit mode THEN
        DEST.LB ← LOAD_QWORD(SRC); 
        DEST.UB ← LOAD_QWORD(SRC+8); 
    ELSE
        DEST.LB ← LOAD_DWORD_ZERO_EXT(SRC); 
        DEST.UB ← LOAD_DWORD_ZERO_EXT(SRC+4); 
FI;
```
#### BNDMOV to memory
```java
IF 64-bit mode THEN
        DEST[63:0] ← SRC.LB; 
        DEST[127:64] ← SRC.UB; 
    ELSE
        DEST[31:0] ← SRC.LB; 
        DEST[63:32] ← SRC.UB; 
FI;
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
BNDMOV 
void * _bnd_copy_ptr_bounds(const void *q, const void *r)
```
### Flags Affected
None

### Protected Mode Exceptions

<p>#UD
If the LOCK prefix is used but the destination is not a memory operand.
If ModRM.r/m encodes BND4-BND7 when Intel MPX is enabled.
If 67H prefix is not used and CS.D=0.
If 67H prefix is used and CS.D=1.
<p>#SS(0)
If the memory operand effective address is outside the SS segment limit.
<p>#GP(0)
If the memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the destination operand points to a non-writable segment
If the DS, ES, FS, or GS segment register contains a NULL segment selector.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while CPL is 3.
<p>#PF(fault code)
If a page fault occurs.

### Real-Address Mode Exceptions

<p>#UD
If the LOCK prefix is used but the destination is not a memory operand.
If ModRM.r/m encodes BND4-BND7 when Intel MPX is enabled.
If 16-bit addressing is used.
<p>#GP(0)
If the memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS
If the memory operand effective address is outside the SS segment limit.

### Virtual-8086 Mode Exceptions
<p>#UD
If the LOCK prefix is used but the destination is not a memory operand.
If ModRM.r/m encodes BND4-BND7 when Intel MPX is enabled.
If 16-bit addressing is used.
<p>#GP(0)
If the memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS(0)
If the memory operand effective address is outside the SS segment limit.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while CPL is 3.
<p>#PF(fault code)
If a page fault occurs.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#UD
If the LOCK prefix is used but the destination is not a memory operand.
If ModRM.r/m and REX encodes BND4-BND15 when Intel MPX is enabled.
<p>#SS(0)
If the memory address referencing the SS segment is in a non-canonical form.
<p>#GP(0)
If the memory address is in a non-canonical form.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while CPL is 3.
<p>#PF(fault code)
If a page fault occurs.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
