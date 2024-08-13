<b>XGETBV</b> — Get Value of Extended Control Register
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
		<td>NP 0F 01 D0</td>
		<td>XGETBV</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Reads an XCR specified by ECX into EDX:EAX.</td>
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
Reads the contents of the extended control register (XCR) specified in the ECX register into registers EDX:EAX. (On
processors that support the Intel 64 architecture, the high-order 32 bits of RCX are ignored.) The EDX register is
loaded with the high-order 32 bits of the XCR and the EAX register is loaded with the low-order 32 bits. (On proces-
sors that support the Intel 64 architecture, the high-order 32 bits of each of RAX and RDX are cleared.) If fewer
than 64 bits are implemented in the XCR being read, the values returned to EDX:EAX in unimplemented bit locations
 are undefined.

XCR0 is supported on any processor that supports the XGETBV instruction. If
CPUID.(EAX=0DH,ECX=1):EAX.XG1[bit 2] = 1, executing XGETBV with ECX = 1 returns in EDX:EAX the logical-
AND of XCR0 and the current value of the XINUSE state-component bitmap. This allows software to discover the
state of the init optimization used by XSAVEOPT and XSAVES. See Chapter 13, “Managing State Using the XSAVE
Feature Set‚” in Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 1.

Use of any other value for ECX results in a general-protection (\#GP) exception.

### Operation

```java
EDX:EAX ← XCR[ECX];
```
### Flags Affected

None.

### Intel C/C++ Compiler Intrinsic Equivalent
```c
XGETBV:
unsigned __int64 _xgetbv( unsigned int);
```
### Protected Mode Exceptions

<p>#GP(0)
If an invalid XCR is specified in ECX (includes ECX = 1 if
CPUID.(EAX=0DH,ECX=1):EAX.XG1[bit 2] = 0).
<p>#UD
If CPUID.01H:ECX.XSAVE[bit 26] = 0.
If CR4.OSXSAVE[bit 18] = 0.
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#GP(0)
If an invalid XCR is specified in ECX (includes ECX = 1 if
CPUID.(EAX=0DH,ECX=1):EAX.XG1[bit 2] = 0).
<p>#UD
If CPUID.01H:ECX.XSAVE[bit 26] = 0.
If CR4.OSXSAVE[bit 18] = 0.
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

Same exceptions as in protected mode.

### Compatibility Mode Exceptions
Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

Same exceptions as in protected mode.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
