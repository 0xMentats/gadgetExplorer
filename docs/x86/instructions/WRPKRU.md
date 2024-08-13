<b>WRPKRU</b> — Write Data to User Page Key Register
<table>
	<tr>
		<td><b>Opcode*</b></td>
		<td><b>Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 01 EF</td>
		<td>WRPKRU</td>
		<td>ZO</td>
		<td>V/V</td>
		<td>OSPKE</td>
		<td>Writes EAX into PKRU.</td>
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
Writes the value of EAX into PKRU. ECX and EDX must be 0 when WRPKRU is executed; otherwise, a general-
protection exception (\#GP) occurs.

WRPKRU can be executed only if CR4.PKE = 1; otherwise, an invalid-opcode exception (\#UD) occurs. Software can
discover the value of CR4.PKE by examining CPUID.(EAX=07H,ECX=0H):ECX.OSPKE [bit 4].

On processors that support the Intel 64 Architecture, the high-order 32-bits of RCX, RDX and RAX are ignored.

### Operation

```java
IF (ECX = 0 AND EDX = 0) 
    THEN PKRU ← EAX;
    ELSE #GP(0); 
FI;
```
### Flags Affected

None.

### C/C++ Compiler Intrinsic Equivalent
```c
WRPKRU:
void _wrpkru(uint32_t);
```
### Protected Mode Exceptions

If ECX ≠ 0.
<p>#GP(0)
If EDX ≠ 0.

<p>#UD
If the LOCK prefix is used.
If CR4.PKE = 0.

### Real-Address Mode Exceptions

Same exceptions as in protected mode.

### Virtual-8086 Mode Exceptions

Same exceptions as in protected mode.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

Same exceptions as in protected mode.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
