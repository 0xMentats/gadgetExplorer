<b>BNDCL</b> — Check Lower Bound
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F3 0F 1A /r BNDCL bnd, r/m32</td>
		<td>RM</td>
		<td>NE/V</td>
		<td>MPX</td>
		<td>Generate a #BR if the address in r/m32 is lower than the lower bound in bnd.LB.</td>
	</tr>
	<tr>
		<td>F3 0F 1A /r BNDCL bnd, r/m64</td>
		<td>RM</td>
		<td>V/NE</td>
		<td>MPX</td>
		<td>Generate a #BR if the address in r/m64 is lower than the lower bound in bnd.LB.</td>
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
Compare the address in the second operand with the lower bound in bnd. The second operand can be either a
register or memory operand. If the address is lower than the lower bound in bnd.LB, it will set BNDSTATUS to 01H
and signal a \#BR exception.

This instruction does not cause any memory access, and does not read or write any flags.

### Operation


#### BNDCL BND, reg
```java
IF reg < BND.LB Then
    BNDSTATUS ← 01H; 
    #BR; 
FI;
```
#### BNDCL BND, mem
```java
TEMP ← LEA(mem); 
IF TEMP < BND.LB Then
    BNDSTATUS ← 01H; 
    #BR; 
FI;
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
BNDCL void   _bnd_chk_ptr_lbounds(const void *q)
```
### Flags Affected

None

### Protected Mode Exceptions

<p>#BR
If lower bound check fails.
<p>#UD
If the LOCK prefix is used.
If ModRM.r/m encodes BND4-BND7 when Intel MPX is enabled.
If 67H prefix is not used and CS.D=0.
If 67H prefix is used and CS.D=1.

### Real-Address Mode Exceptions
<p>#BR
If lower bound check fails.
<p>#UD
If the LOCK prefix is used.
If ModRM.r/m encodes BND4-BND7 when Intel MPX is enabled.
If 16-bit addressing is used.

### Virtual-8086 Mode Exceptions

<p>#BR
If lower bound check fails.
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