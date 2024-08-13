<b>RDPKRU</b> — Read Protection Key Rights for User Pages
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
		<td>NP 0F 01 EE</td>
		<td>RDPKRU</td>
		<td>ZO</td>
		<td>V/V</td>
		<td>OSPKE</td>
		<td>Reads PKRU into EAX.</td>
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
Reads the value of PKRU into EAX and clears EDX. ECX must be 0 when RDPKRU is executed; otherwise, a general-
protection exception (\#GP) occurs.

RDPKRU can be executed only if CR4.PKE = 1; otherwise, an invalid-opcode exception (\#UD) occurs. Software can
discover the value of CR4.PKE by examining CPUID.(EAX=07H,ECX=0H):ECX.OSPKE [bit 4].

On processors that support the Intel 64 Architecture, the high-order 32-bits of RCX are ignored and the high-order
32-bits of RDX and RAX are cleared.

### Operation

```java
IF (ECX = 0) 
    THEN
        EAX ← PKRU;
        EDX ← 0;
    ELSE #GP(0); 
FI;
```
### Flags Affected

None.

### C/C++ Compiler Intrinsic Equivalent
```c
RDPKRU:
uint32_t _rdpkru_u32(void);
```
### Protected Mode Exceptions

If ECX ≠ 0.
<p>#GP(0)
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