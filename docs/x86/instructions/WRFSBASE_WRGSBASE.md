<b>WRFSBASE / WRGSBASE</b> — Write FS/GS Segment Base
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32- bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F3 0F AE /2 WRFSBASE r32</td>
		<td>M</td>
		<td>V/I</td>
		<td>FSGSBASE</td>
		<td>Load the FS base address with the 32-bit value in the source register.</td>
	</tr>
	<tr>
		<td>F3 REX.W 0F AE /2 WRFSBASE r64</td>
		<td>M</td>
		<td>V/I</td>
		<td>FSGSBASE</td>
		<td>Load the FS base address with the 64-bit value in the source register.</td>
	</tr>
	<tr>
		<td>F3 0F AE /3 WRGSBASE r32</td>
		<td>M</td>
		<td>V/I</td>
		<td>FSGSBASE</td>
		<td>Load the GS base address with the 32-bit value in the source register.</td>
	</tr>
	<tr>
		<td>F3 REX.W 0F AE /3 WRGSBASE r64</td>
		<td>M</td>
		<td>V/I</td>
		<td>FSGSBASE</td>
		<td>Load the GS base address with the 64-bit value in the source register.</td>
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
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Loads the FS or GS segment base address with the general-purpose register indicated by the modR/M:r/m field.

The source operand may be either a 32-bit or a 64-bit general-purpose register. The REX.W prefix indicates the
operand size is 64 bits. If no REX.W prefix is used, the operand size is 32 bits; the upper 32 bits of the source
register are ignored and upper 32 bits of the base address (for FS or GS) are cleared.

This instruction is supported only in 64-bit mode.

### Operation

```java
FS/GS segment base address ← SRC;
```
### Flags Affected

None

### C/C++ Compiler Intrinsic Equivalent
```c
WRFSBASE:
 void _writefsbase_u32( unsigned int );
WRFSBASE:
 _writefsbase_u64( unsigned __int64 );
WRGSBASE:
 void _writegsbase_u32( unsigned int );
WRGSBASE:
 _writegsbase_u64( unsigned __int64 );
```
### Protected Mode Exceptions

<p>#UD
The WRFSBASE and WRGSBASE instructions are not recognized in protected mode.

### Real-Address Mode Exceptions

<p>#UD
The WRFSBASE and WRGSBASE instructions are not recognized in real-address mode.

### Virtual-8086 Mode Exceptions

<p>#UD
The WRFSBASE and WRGSBASE instructions are not recognized in virtual-8086 mode.

### Compatibility Mode Exceptions

<p>#UD
The WRFSBASE and WRGSBASE instructions are not recognized in compatibility mode.

### 64-Bit Mode Exceptions
<p>#UD
If the LOCK prefix is used.
If CR4.FSGSBASE[bit 16] = 0.
If CPUID.07H.0H:EBX.FSGSBASE[bit 0] = 0
<p>#GP(0)
If the source register contains a non-canonical address.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
