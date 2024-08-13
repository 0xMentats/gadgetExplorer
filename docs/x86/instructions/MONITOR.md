<b>MONITOR</b> — Set Up Monitor Address
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
		<td>0F 01 C8</td>
		<td>MONITOR</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Sets up a linear address range to be monitored by hardware and activates the monitor. The address range should be a writeback memory caching type. The address is DS:RAX/EAX/AX.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En ZO Operand 1 NA Operand 2 NA Operand 3 NA Operand 4 NA</b></td>
	</tr>
</table>


### Description
The MONITOR instruction arms address monitoring hardware using an address specified in EAX (the address range
that the monitoring hardware checks for store operations can be determined by using CPUID). A store to an
address within the specified address range triggers the monitoring hardware. The state of monitor hardware is
used by MWAIT.

The address is specified in RAX/EAX/AX and the size is based on the effective address size of the encoded instruction
. By default, the DS segment is used to create a linear address that is monitored. Segment overrides can be
used.

ECX and EDX are also used. They communicate other information to MONITOR. ECX specifies optional extensions.
EDX specifies optional hints; it does not change the architectural behavior of the instruction. For the Pentium 4
processor (family 15, model 3), no extensions or hints are defined. Undefined hints in EDX are ignored by the
processor; undefined extensions in ECX raises a general protection fault.

The address range must use memory of the write-back type. Only write-back memory will correctly trigger the
monitoring hardware. Additional information on determining what address range to use in order to prevent false
wake-ups is described in Chapter 8, “Multiple-Processor Management” of the Intel® 64 and IA-32 Architectures
Software Developer’s Manual, Volume 3A.

The MONITOR instruction is ordered as a load operation with respect to other memory transactions. The instruction
is subject to the permission checking and faults associated with a byte load. Like a load, MONITOR sets the A-bit
but not the D-bit in page tables.

CPUID.01H:ECX.MONITOR[bit 3] indicates the availability of MONITOR and MWAIT in the processor. When set,
MONITOR may be executed only at privilege level 0 (use at any other privilege level results in an invalid-opcode
exception). The operating system or system BIOS may disable this instruction by using the IA32_MISC_ENABLE
MSR; disabling MONITOR clears the CPUID feature flag and causes execution to generate an invalid-opcode excep-
tion.

The instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
MONITOR sets up an address range for the monitor hardware using the content of EAX (RAX in 64-bit mode) as an 
effective address and puts the monitor hardware in armed state. Always use memory of the write-back caching 
type. A store to the specified address range will trigger the monitor hardware. The content of ECX and EDX are 
used to communicate other information to the monitor hardware.
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
MONITOR:
void _mm_monitor(void const *p, unsigned extensions,unsigned hints)
```
### Numeric Exceptions

None

### Protected Mode Exceptions
<p>#GP(0)
If the value in EAX is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register is used to access memory and it contains a NULL segment
selector.
If ECX ≠ 0.

<p>#SS(0)
If the value in EAX is outside the SS segment limit.
<p>#PF(fault-code)
For a page fault.
<p>#UD
If CPUID.01H:ECX.MONITOR[bit 3] = 0.
If current privilege level is not 0.

Real Address Mode Exceptions
<p>#GP
If the CS, DS, ES, FS, or GS register is used to access memory and the value in EAX is outside
of the effective address space from 0 to FFFFH.
If ECX ≠ 0.

<p>#SS
If the SS register is used to access memory and the value in EAX is outside of the effective
address space from 0 to FFFFH.
<p>#UD
If CPUID.01H:ECX.MONITOR[bit 3] = 0.

### Virtual 8086 Mode Exceptions

<p>#UD
The MONITOR instruction is not recognized in virtual-8086 mode (even if
CPUID.01H:ECX.MONITOR[bit 3] = 1).

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#GP(0)
If the linear address of the operand in the CS, DS, ES, FS, or GS segment is in a non-canonical
form.
If RCX ≠ 0.

<p>#SS(0)
If the SS register is used to access memory and the value in EAX is in a non-canonical form.
<p>#PF(fault-code)
For a page fault.
<p>#UD
If the current privilege level is not 0.
If CPUID.01H:ECX.MONITOR[bit 3] = 0.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
