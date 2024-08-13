<b>BNDCU / BNDCN</b> — Check Upper Bound
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F2 0F 1A /r BNDCU bnd, r/m32</td>
		<td>RM</td>
		<td>NE/V</td>
		<td>MPX</td>
		<td>Generate a #BR if the address in r/m32 is higher than the upper bound in bnd.UB (bnb.UB in 1's complement form).</td>
	</tr>
	<tr>
		<td>F2 0F 1A /r BNDCU bnd, r/m64</td>
		<td>RM</td>
		<td>V/NE</td>
		<td>MPX</td>
		<td>Generate a #BR if the address in r/m64 is higher than the upper bound in bnd.UB (bnb.UB in 1's complement form).</td>
	</tr>
	<tr>
		<td>F2 0F 1B /r BNDCN bnd, r/m32</td>
		<td>RM</td>
		<td>NE/V</td>
		<td>MPX</td>
		<td>Generate a #BR if the address in r/m32 is higher than the upper bound in bnd.UB (bnb.UB not in 1's complement form).</td>
	</tr>
	<tr>
		<td>F2 0F 1B /r BNDCN bnd, r/m64</td>
		<td>RM</td>
		<td>V/NE</td>
		<td>MPX</td>
		<td>Generate a #BR if the address in r/m64 is higher than the upper bound in bnd.UB (bnb.UB not in 1's complement form).</td>
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
Compare the address in the second operand with the upper bound in bnd. The second operand can be either a
register or a memory operand. If the address is higher than the upper bound in bnd.UB, it will set BNDSTATUS to
01H and signal a \#BR exception.

BNDCU perform 1’s complement operation on the upper bound of bnd first before proceeding with address compar-
ison. BNDCN perform address comparison directly using the upper bound in bnd that is already reverted out of 1’s
complement form.

This instruction does not cause any memory access, and does not read or write any flags.

Effective address computation of m32/64 has identical behavior to LEA

### Operation


#### BNDCU BND, reg
```java
IF reg > NOT(BND.UB) Then
    BNDSTATUS ← 01H; 
    #BR; 
FI;
```
#### BNDCU BND, mem
```java
TEMP ← LEA(mem); 
IF TEMP > NOT(BND.UB) Then
    BNDSTATUS ← 01H; 
    #BR; 
FI;
```
#### BNDCN BND, reg
```java
IF reg > BND.UB Then
    BNDSTATUS ← 01H; 
    #BR; 
FI;
```
#### BNDCN BND, mem
```java
TEMP ← LEA(mem); 
IF TEMP > BND.UB Then
    BNDSTATUS ← 01H; 
    #BR; 
FI;
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
BNDCU .void   _bnd_chk_ptr_ubounds(const void *q)
```
### Flags Affected
None

### Protected Mode Exceptions

<p>#BR
If upper bound check fails.
<p>#UD
If the LOCK prefix is used.
If ModRM.r/m encodes BND4-BND7 when Intel MPX is enabled.
If 67H prefix is not used and CS.D=0.
If 67H prefix is used and CS.D=1.

### Real-Address Mode Exceptions

<p>#BR
If upper bound check fails.
<p>#UD
If the LOCK prefix is used.
If ModRM.r/m encodes BND4-BND7 when Intel MPX is enabled.
If 16-bit addressing is used.

### Virtual-8086 Mode Exceptions

<p>#BR
If upper bound check fails.
<p>#UD
If the LOCK prefix is used.
If ModRM.r/m encodes BND4-BND7 when Intel MPX is enabled.
If 16-bit addressing is used.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#UD
If ModRM.r/m and REX encodes BND4-BND15 when Intel MPX is enabled.
Same exceptions as in protected mode.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
