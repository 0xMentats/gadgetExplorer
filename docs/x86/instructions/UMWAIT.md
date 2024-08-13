<b>UMWAIT</b> — User Level Monitor Wait
<table>
	<tr>
		<td><b>Opcode / Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F2 0F AE /6 UMWAIT r32</td>
		<td>A</td>
		<td>V/V</td>
		<td>WAITPKG</td>
		<td>A hint that allows the processor to stop instruction execution and enter an implementation-dependent optimized state until occurrence of a class of events.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Tuple</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand 2</b></td>
		<td><b>Operand 3</b></td>
		<td><b>Operand 4</b></td>
	</tr>
	<tr>
		<td>A</td>
		<td>NA</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
UMWAIT instructs the processor to enter an implementation-dependent optimized state while monitoring a range
of addresses. The optimized state may be either a light-weight power/performance optimized state or an improved
power/performance optimized state. The selection between the two states is governed by the explicit input register
bit[0] source operand.

UMWAIT is available when CPUID.7.0:ECX.WAITPKG[bit 5] is enumerated as 1. UMWAIT may be executed at any
privilege level. This instruction’s operation is the same in non-64-bit modes and in 64-bit mode.

The input register contains information such as the preferred optimized state the processor should enter as
described in the following table. Bits other than bit 0 are reserved and will result in \#GP if nonzero.

Table 2-8.  UMWAIT Input Register Bit Definitions
<table>
	<tr>
		<td><b>Bit Value</b></td>
		<td><b>State Name Wakeup Time</b></td>
		<td><b></b></td>
		<td><b>Power Savings Other Benefits</b></td>
		<td><b></b></td>
	</tr>
	<tr>
		<td>bit[0] = 0</td>
		<td>C0.2</td>
		<td>Slower</td>
		<td>Larger</td>
		<td>Improves performance of the other SMT thread(s) on the same core.</td>
	</tr>
	<tr>
		<td>bit[0] = 1</td>
		<td>C0.1</td>
		<td>Faster</td>
		<td>Smaller</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>bits[31:1]</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
		<td>Reserved</td>
	</tr>
</table>

The instruction wakes up when the time-stamp counter reaches or exceeds the implicit EDX:EAX 64-bit input value
(if the monitoring hardware did not trigger beforehand).

Prior to executing the UMWAIT instruction, an operating system may specify the maximum delay it allows the
processor to suspend its operation. It can do so by writing TSC-quanta value to the following 32bit MSR
(IA32_UMWAIT_CONTROL at MSR index E1H):

 * IA32_UMWAIT_CONTROL[31:2] — Determines the maximum time in TSC-quanta that the processor can reside
in either C0.1 or C0.2. A zero value indicates no maximum time. The maximum time value is a 32-bit value
where the upper 30 bits come from this field and the lower two bits are zero.

 * IA32_UMWAIT_CONTROL[1] — Reserved.

 * IA32_UMWAIT_CONTROL[0] — C0.2 is not allowed by the OS. Value of “1” means all C0.2 requests revert to C0.1.

If the processor that executed a UMWAIT instruction wakes due to the expiration of the operating system time-limit, the instructions sets RFLAGS.CF; otherwise, that flag is cleared.

The UMWAIT instruction causes a transactional abort when used inside a transactional region.

The UMWAIT instruction operates with the UMONITOR instruction. The two instructions allow the definition of an
address at which to wait (UMONITOR) and an implementation-dependent optimized operation to perform while
waiting (UMWAIT). The execution of UMWAIT is a hint to the processor that it can enter an implementation-dependent-optimized state while waiting for an event or a store operation to the address range armed by UMONITOR.

The following additional events cause the processor to exit the implementation-dependent optimized state: a store
to the address range armed by the UMONITOR instruction, an NMI or SMI, a debug exception, a machine check exception, the BINIT\# signal, the INIT\# signal, and the RESET\# signal. Other implementation-dependent events
may also cause the processor to exit the implementation-dependent optimized state.

In addition, an external interrupt causes the processor to exit the implementation-dependent optimized state
regardless of whether maskable-interrupts are inhibited (EFLAGS.IF =0).

Following exit from the implementation-dependent-optimized state, control passes to the instruction after the
UMWAIT instruction. A pending interrupt that is not masked (including an NMI or an SMI) may be delivered before
execution of that instruction.

Unlike the HLT instruction, the UMWAIT instruction does not restart at the UMWAIT instruction following the
handling of an SMI.

If the preceding UMONITOR instruction did not successfully arm an address range or if UMONITOR was not
executed prior to executing UMWAIT and following the most recent execution of the legacy MONITOR instruction
(UMWAIT does not interoperate with MONITOR), then the processor will not enter an optimized state. Execution
will continue to the instruction following UMWAIT.

A store to the address range armed by the UMONITOR instruction will cause the processor to exit UMWAIT if either
the store was originated by other processor agents or the store was originated by a non-processor agent.

MODRM.MOD must be 0b11 for this instruction.

### Operation

```java
os_deadline ← TSC+(IA32_MWAIT_CONTROL[31:2]<<2)
instr_deadline ← UINT64(EDX:EAX)
IF os_deadline < instr_deadline:
    deadline ← os_deadline
    using_os_deadline ← 1
ELSE:
    deadline ← instr_deadline
    using_os_deadline ← 0
WHILE monitor hardware armed AND TSC < deadline:
    implementation_dependent_optimized_state(Source register, deadline, IA32_UMWAIT_CONTROL[0] )
IF using_os_deadline AND TSC > deadline:
    RFLAGS.CF ← 1
ELSE:
    RFLAGS.CF ← 0
RFLAGS.AF,PF,SF,ZF,OF ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
UMWAIT uint8_t _umwait(uint32_t control, uint64_t counter);
```
### Numeric Exceptions

None

### Exceptions (All Operating Modes)

<p>#GP(0)
If src[31:1] != 0.
<p>#UD
If CPUID.7.0:ECX.WAITPKG[bit 5]=0.
If MODRM.MOD != 0b11.

 --- 
<p align="right"><i>Source: Intel® Architecture Instruction Set Extensions and Future Features Programming Reference (May 2018)<br>Generated: 5-6-2018</i></p>
