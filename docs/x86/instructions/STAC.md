<b>STAC</b> — Set AC Flag in EFLAGS Register
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 01 CB STAC</td>
		<td>ZO</td>
		<td>V/V</td>
		<td>SMAP</td>
		<td>Set the AC flag in the EFLAGS register.</td>
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
		<td>ZO</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Sets the AC flag bit in EFLAGS register. This may enable alignment checking of user-mode data accesses. This
allows explicit supervisor-mode data accesses to user-mode pages even if the SMAP bit is set in the CR4 register.

This instruction's operation is the same in non-64-bit modes and 64-bit mode. Attempts to execute STAC when
CPL > 0 cause \#UD.

### Operation

```java
EFLAGS.AC ← 1;
```
### Flags Affected

AC set. Other flags are unaffected.

### Protected Mode Exceptions

<p>#UD
If the LOCK prefix is used.
If the CPL > 0.
If CPUID.(EAX=07H, ECX=0H):EBX.SMAP[bit 20] = 0.

### Real-Address Mode Exceptions

<p>#UD
If the LOCK prefix is used.
If CPUID.(EAX=07H, ECX=0H):EBX.SMAP[bit 20] = 0.

### Virtual-8086 Mode Exceptions

<p>#UD
The STAC instruction is not recognized in virtual-8086 mode.

### Compatibility Mode Exceptions

<p>#UD
If the LOCK prefix is used.
If the CPL > 0.
If CPUID.(EAX=07H, ECX=0H):EBX.SMAP[bit 20] = 0.

### 64-Bit Mode Exceptions

<p>#UD
If the LOCK prefix is used.
If the CPL > 0.
If CPUID.(EAX=07H, ECX=0H):EBX.SMAP[bit 20] = 0.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
