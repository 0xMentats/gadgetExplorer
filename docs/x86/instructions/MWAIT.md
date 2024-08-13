<b>MWAIT</b> — Monitor Wait
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
		<td>0F 01 C9</td>
		<td>MWAIT</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>A hint that allows the processor to stop instruction execution and enter an implementation-dependent optimized state until occurrence of a class of events.</td>
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
MWAIT instruction provides hints to allow the processor to enter an implementation-dependent optimized state.
There are two principal targeted usages: address-range monitor and advanced power management. Both usages
of MWAIT require the use of the MONITOR instruction.

CPUID.01H:ECX.MONITOR[bit 3] indicates the availability of MONITOR and MWAIT in the processor. When set,
MWAIT may be executed only at privilege level 0 (use at any other privilege level results in an invalid-opcode
exception). The operating system or system BIOS may disable this instruction by using the IA32_MISC_ENABLE
MSR; disabling MWAIT clears the CPUID feature flag and causes execution to generate an invalid-opcode excep-
tion.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

ECX specifies optional extensions for the MWAIT instruction. EAX may contain hints such as the preferred optimized
state the processor should enter. The first processors to implement MWAIT supported only the zero value for EAX
and ECX. Later processors allowed setting ECX[0] to enable masked interrupts as break events for MWAIT (see
below). Software can use the CPUID instruction to determine the extensions and hints supported by the processor.

MWAIT for Address Range Monitoring

For address-range monitoring, the MWAIT instruction operates with the MONITOR instruction. The two instructions
allow the definition of an address at which to wait (MONITOR) and a implementation-dependent-optimized opera-
tion to commence at the wait address (MWAIT). The execution of MWAIT is a hint to the processor that it can enter
an implementation-dependent-optimized state while waiting for an event or a store operation to the address range
armed by MONITOR.

The following cause the processor to exit the implementation-dependent-optimized state: a store to the address
range armed by the MONITOR instruction, an NMI or SMI, a debug exception, a machine check exception, the
BINIT\# signal, the INIT\# signal, and the RESET\# signal. Other implementation-dependent events may also cause
the processor to exit the implementation-dependent-optimized state.

In addition, an external interrupt causes the processor to exit the implementation-dependent-optimized state
either (1) if the interrupt would be delivered to software (e.g., as it would be if HLT had been executed instead of
MWAIT); or (2) if ECX[0] = 1. Software can execute MWAIT with ECX[0] = 1 only if CPUID.05H:ECX[bit 1] = 1.
(Implementation-specific conditions may result in an interrupt causing the processor to exit the implementation-
dependent-optimized state even if interrupts are masked and ECX[0] = 0.)

Following exit from the implementation-dependent-optimized state, control passes to the instruction following the
MWAIT instruction. A pending interrupt that is not masked (including an NMI or an SMI) may be delivered before
execution of that instruction. Unlike the HLT instruction, the MWAIT instruction does not support a restart at the
MWAIT instruction following the handling of an SMI.

If the preceding MONITOR instruction did not successfully arm an address range or if the MONITOR instruction has
not been executed prior to executing MWAIT, then the processor will not enter the implementation-dependent-opti-
mized state. Execution will resume at the instruction following the MWAIT.
MWAIT for Power Management

MWAIT accepts a hint and optional extension to the processor that it can enter a specified target C state while
waiting for an event or a store operation to the address range armed by MONITOR. Support for MWAIT extensions
for power management is indicated by CPUID.05H:ECX[bit 0] reporting 1.

EAX and ECX are used to communicate the additional information to the MWAIT instruction, such as the kind of
optimized state the processor should enter. ECX specifies optional extensions for the MWAIT instruction. EAX may
contain hints such as the preferred optimized state the processor should enter. Implementation-specific conditions
may cause a processor to ignore the hint and enter a different optimized state. Future processor implementations
may implement several optimized “waiting” states and will select among those states based on the hint argument.

Table 4-10 describes the meaning of ECX and EAX registers for MWAIT extensions.

Table 4-10.  MWAIT Extension Register (ECX)
<table>
	<tr>
		<td><b>Bits</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>0</td>
		<td>Treat interrupts as break events even if masked (e.g., even if EFLAGS.IF=0). May be set only if CPUID.05H:ECX[bit 1] = 1.</td>
	</tr>
	<tr>
		<td>31: 1</td>
		<td>Reserved</td>
	</tr>
</table>

Table 4-11.  MWAIT Hints Register (EAX)
<table>
	<tr>
		<td><b>Bits</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>3 : 0</td>
		<td>Sub C-state within a C-state, indicated by bits [7:4]</td>
	</tr>
	<tr>
		<td>7 : 4</td>
		<td>Target C-state* Value of 0 means C1; 1 means C2 and so on Value of 01111B means C0 Note: Target C states for MWAIT extensions are processor-specific C-states, not ACPI C-states</td>
	</tr>
	<tr>
		<td>31: 8</td>
		<td>Reserved</td>
	</tr>
</table>

Note that if MWAIT is used to enter any of the C-states that are numerically higher than C1, a store to the address
range armed by the MONITOR instruction will cause the processor to exit MWAIT only if the store was originated by
other processor agents. A store from non-processor agent might not cause the processor to exit MWAIT in such
cases.

For additional details of MWAIT extensions, see Chapter 14, “Power and Thermal Management,” of Intel® 64 and
IA-32 Architectures Software Developer’s Manual, Volume 3A.

### Operation

```java
(* MWAIT takes the argument in EAX as a hint extension and is architected to take the argument in ECX as an instruction extension 
MWAIT EAX, ECX *)
{
WHILE ( (“Monitor Hardware is in armed state”)) {
    implementation_dependent_optimized_state(EAX, ECX); }
Set the state of Monitor Hardware as triggered;
}
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
MWAIT:
void _mm_mwait(unsigned extensions, unsigned hints)
Example
MONITOR/MWAIT instruction pair must be coded in the same loop because execution of the MWAIT instruction will 
trigger the monitor hardware. It is not a proper usage to execute MONITOR once and then execute MWAIT in a 
loop. Setting up MONITOR without executing MWAIT has no adverse effects.
Typically the MONITOR/MWAIT pair is used in a sequence, such as:
EAX = Logical Address(Trigger)
ECX = 0 (*Hints *)
EDX = 0 (* Hints *)
IF ( !trigger_store_happened) {
MONITOR EAX, ECX, EDX
IF ( !trigger_store_happened ) {
MWAIT EAX, ECX
}
}
The above code sequence makes sure that a triggering store does not happen between the first check of the trigger 
and the execution of the monitor instruction. Without the second check that triggering store would go un-noticed. 
Typical usage of MONITOR and MWAIT would have the above code sequence within a loop.
```
### Numeric Exceptions
None

### Protected Mode Exceptions

If ECX[31:1] ≠ 0.
<p>#GP(0)
If ECX[0] = 1 and CPUID.05H:ECX[bit 1] = 0.
<p>#UD
If CPUID.01H:ECX.MONITOR[bit 3] = 0.
If current privilege level is not 0.

Real Address Mode Exceptions
If ECX[31:1] ≠ 0.
<p>#GP
If ECX[0] = 1 and CPUID.05H:ECX[bit 1] = 0.
<p>#UD
If CPUID.01H:ECX.MONITOR[bit 3] = 0.

### Virtual 8086 Mode Exceptions

<p>#UD
The MWAIT instruction is not recognized in virtual-8086 mode (even if
CPUID.01H:ECX.MONITOR[bit 3] = 1).

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

If RCX[63:1] ≠ 0.
<p>#GP(0)
If RCX[0] = 1 and CPUID.05H:ECX[bit 1] = 0.
<p>#UD
If the current privilege level is not 0.
If CPUID.01H:ECX.MONITOR[bit 3] = 0.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
