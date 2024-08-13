<b>BNDMK</b> — Make Bounds
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F3 0F 1B /r BNDMK bnd, m32</td>
		<td>RM</td>
		<td>NE/V</td>
		<td>MPX</td>
		<td>Make lower and upper bounds from m32 and store them in bnd.</td>
	</tr>
	<tr>
		<td>F3 0F 1B /r BNDMK bnd, m64</td>
		<td>RM</td>
		<td>V/NE</td>
		<td>MPX</td>
		<td>Make lower and upper bounds from m64 and store them in bnd.</td>
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
</table>


### Description
Makes bounds from the second operand and stores the lower and upper bounds in the bound register bnd. The
second operand must be a memory operand. The content of the base register from the memory operand is stored
in the lower bound bnd.LB. The 1's complement of the effective address of m32/m64 is stored in the upper bound
b.UB. Computation of m32/m64 has identical behavior to LEA.

This instruction does not cause any memory access, and does not read or write any flags.

If the instruction did not specify base register, the lower bound will be zero. The reg-reg form of this instruction
retains legacy behavior (NOP).

The instruction causes an invalid-opcode exception (\#UD) if executed in 64-bit mode with RIP-relative addressing.

### Operation

```java
BND.LB ← SRCMEM.base;
IF 64-bit mode Then
    BND.UB ← NOT(LEA.64_bits(SRCMEM)); 
ELSE
    BND.UB ← Zero_Extend.64_bits(NOT(LEA.32_bits(SRCMEM)));
FI;
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
BNDMKvoid * _bnd_set_ptr_bounds(const void * q, size_t size); 
```
### Flags Affected

None

### Protected Mode Exceptions

<p>#UD
If the LOCK prefix is used.
If ModRM.r/m encodes BND4-BND7 when Intel MPX is enabled.
If 67H prefix is not used and CS.D=0.
If 67H prefix is used and CS.D=1.

### Real-Address Mode Exceptions

<p>#UD
If the LOCK prefix is used.
If ModRM.r/m encodes BND4-BND7 when Intel MPX is enabled.
If 16-bit addressing is used.

### Virtual-8086 Mode Exceptions
<p>#UD
If the LOCK prefix is used.
If ModRM.r/m encodes BND4-BND7 when Intel MPX is enabled.
If 16-bit addressing is used.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#UD
If the LOCK prefix is used.
If ModRM.r/m and REX encodes BND4-BND15 when Intel MPX is enabled.
If RIP-relative addressing is used.
<p>#SS(0)
If the memory address referencing the SS segment is in a non-canonical form.
<p>#GP(0)
If the memory address is in a non-canonical form.
Same exceptions as in protected mode.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
