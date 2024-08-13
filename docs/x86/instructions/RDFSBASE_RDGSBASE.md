<b>RDFSBASE / RDGSBASE</b> — Read FS/GS Segment Base
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32- bit Mode</b></td>
		<td><b>CPUID Fea- ture Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F3 0F AE /0 RDFSBASE r32</td>
		<td>M</td>
		<td>V/I</td>
		<td>FSGSBASE</td>
		<td>Load the 32-bit destination register with the FS base address.</td>
	</tr>
	<tr>
		<td>F3 REX.W 0F AE /0 RDFSBASE r64</td>
		<td>M</td>
		<td>V/I</td>
		<td>FSGSBASE</td>
		<td>Load the 64-bit destination register with the FS base address.</td>
	</tr>
	<tr>
		<td>F3 0F AE /1 RDGSBASE r32</td>
		<td>M</td>
		<td>V/I</td>
		<td>FSGSBASE</td>
		<td>Load the 32-bit destination register with the GS base address.</td>
	</tr>
	<tr>
		<td>F3 REX.W 0F AE /1 RDGSBASE r64</td>
		<td></td>
		<td>M</td>
		<td>V/I</td>
		<td>FSGSBASE</td>
		<td>Load the 64-bit destination register with the GS base address.</td>
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
		<td>M</td>
		<td>ModRM:r/m (w)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Loads the general-purpose register indicated by the modR/M:r/m field with the FS or GS segment base address.

The destination operand may be either a 32-bit or a 64-bit general-purpose register. The REX.W prefix indicates the
operand size is 64 bits. If no REX.W prefix is used, the operand size is 32 bits; the upper 32 bits of the source base
address (for FS or GS) are ignored and upper 32 bits of the destination register are cleared.

This instruction is supported only in 64-bit mode.

### Operation

```java
DEST ← FS/GS segment base address;
```
### Flags Affected

None

### C/C++ Compiler Intrinsic Equivalent
```c
RDFSBASE:
unsigned int _readfsbase_u32(void );
RDFSBASE: 
unsigned __int64 _readfsbase_u64(void );
RDGSBASE: 
unsigned int _readgsbase_u32(void );
RDGSBASE:
unsigned __int64 _readgsbase_u64(void );
```
### Protected Mode Exceptions

<p>#UD
The RDFSBASE and RDGSBASE instructions are not recognized in protected mode.

### Real-Address Mode Exceptions

<p>#UD
The RDFSBASE and RDGSBASE instructions are not recognized in real-address mode.

### Virtual-8086 Mode Exceptions

<p>#UD
The RDFSBASE and RDGSBASE instructions are not recognized in virtual-8086 mode.

### Compatibility Mode Exceptions

<p>#UD
The RDFSBASE and RDGSBASE instructions are not recognized in compatibility mode.

### 64-Bit Mode Exceptions
<p>#UD
If the LOCK prefix is used.
If CR4.FSGSBASE[bit 16] = 0.
If CPUID.07H.0H:EBX.FSGSBASE[bit 0] = 0.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
