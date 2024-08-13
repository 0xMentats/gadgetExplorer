<b>XSETBV</b> — Set Extended Control Register
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 01 D1</td>
		<td>XSETBV</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Write the value in EDX:EAX to the XCR specified by ECX.</td>
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
Writes the contents of registers EDX:EAX into the 64-bit extended control register (XCR) specified in the ECX
register. (On processors that support the Intel 64 architecture, the high-order 32 bits of RCX are ignored.) The
contents of the EDX register are copied to high-order 32 bits of the selected XCR and the contents of the EAX
register are copied to low-order 32 bits of the XCR. (On processors that support the Intel 64 architecture, the high-
order 32 bits of each of RAX and RDX are ignored.) Undefined or reserved bits in an XCR should be set to values
previously read.

This instruction must be executed at privilege level 0 or in real-address mode; otherwise, a general protection
exception \#GP(0) is generated. Specifying a reserved or unimplemented XCR in ECX will also cause a general
protection exception. The processor will also generate a general protection exception if software attempts to write
to reserved bits in an XCR.

Currently, only XCR0 is supported. Thus, all other values of ECX are reserved and will cause a \#GP(0). Note that
bit 0 of XCR0 (corresponding to x87 state) must be set to 1; the instruction will cause a \#GP(0) if an attempt is
made to clear this bit. In addition, the instruction causes a \#GP(0) if an attempt is made to set XCR0[2] (AVX state)
while clearing XCR0[1] (SSE state); it is necessary to set both bits to use AVX instructions; Section 13.3, “Enabling
the XSAVE Feature Set and XSAVE-Enabled Features,” of Intel® 64 and IA-32 Architectures Software Developer’s
Manual, Volume 1.

### Operation

```java
XCR[ECX] ← EDX:EAX;
```
### Flags Affected

None.

### Intel C/C++ Compiler Intrinsic Equivalent
```c
XSETBV:
void _xsetbv( unsigned int, unsigned __int64);
```
### Protected Mode Exceptions

<p>#GP(0)
If the current privilege level is not 0.
If an invalid XCR is specified in ECX.
If the value in EDX:EAX sets bits that are reserved in the XCR specified by ECX.
If an attempt is made to clear bit 0 of XCR0.
If an attempt is made to set XCR0[2:1] to 10b.
<p>#UD
If CPUID.01H:ECX.XSAVE[bit 26] = 0.
If CR4.OSXSAVE[bit 18] = 0.
If the LOCK prefix is used.

### Real-Address Mode Exceptions
<p>#GP
If an invalid XCR is specified in ECX.
If the value in EDX:EAX sets bits that are reserved in the XCR specified by ECX.
If an attempt is made to clear bit 0 of XCR0.
If an attempt is made to set XCR0[2:1] to 10b.
<p>#UD
If CPUID.01H:ECX.XSAVE[bit 26] = 0.
If CR4.OSXSAVE[bit 18] = 0.
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

<p>#GP(0)
The XSETBV instruction is not recognized in virtual-8086 mode.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

Same exceptions as in protected mode.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
