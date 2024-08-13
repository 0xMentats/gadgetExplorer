<b>TPAUSE</b> — Timed PAUSE
<table>
	<tr>
		<td><b>Opcode / Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F AE /6 TPAUSE r32</td>
		<td>A</td>
		<td>V/V</td>
		<td>WAITPKG</td>
		<td>Directs the processor to enter an implementation-dependent optimized state until the TSC reaches the value in EDX:EAX.</td>
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
TPAUSE instructs the processor to enter an implementation-dependent optimized state. There are two such optimized 
states to choose from: light-weight power/performance optimized state, and improved power/performance
optimized state. The selection between the two is governed by the explicit input register bit[0] source operand.

TPAUSE is available when CPUID.7.0:ECX.WAITPKG[bit 5] is enumerated as 1. TPAUSE may be executed at any
privilege level. This instruction’s operation is the same in non-64-bit modes and in 64-bit mode.

Unlike PAUSE, the TPAUSE instruction will not cause an abort when used inside a transactional region, described in
the chapter “Programming with Intel Transactional Synchronization Extensions” of the Intel 64 and IA-32 Architectures
Software Developer’s Manual, Volume 1.

The input register contains information such as the preferred optimized state the processor should enter as
described in the following table. Bits other than bit 0 are reserved and will result in \#GP if non-zero.

Table 2-7.  TPAUSE Input Register Bit Definitions
<table>
	<tr>
		<td><b>Bit Value</b></td>
		<td><b>State Name</b></td>
		<td><b>Wakeup Time</b></td>
		<td><b>Power Savings</b></td>
		<td><b>Other Benefits</b></td>
	</tr>
	<tr>
		<td>bit[0] = 0</td>
		<td>C0.2</td>
		<td>Slower</td>
		<td>Larger</td>
		<td>Improves performance of the other SMT thread(s).</td>
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

The instruction execution wakes up when the time-stamp counter reaches or exceeds the implicit EDX:EAX 64-bit
input value.

Prior to executing the TPAUSE instruction, an operating system may specify the maximum delay it allows the
processor to suspend its operation. It can do so by writing TSC-quanta value to the following 32-bit MSR
(IA32_UMWAIT_CONTROL at MSR index E1H):

 * IA32_UMWAIT_CONTROL[31:2] — Determines the maximum time in TSC-quanta that the processor can reside
in either C0.1 or C0.2. A zero value indicates no maximum time. The maximum time value is a 32-bit value
where the upper 30 bits come from this field and the lower two bits are zero.

 * IA32_UMWAIT_CONTROL[1] — Reserved.

 * IA32_UMWAIT_CONTROL[0] — C0.2 is not allowed by the OS. Value of “1” means all C0.2 requests revert to
C0.1.

If the processor that executed a TPAUSE instruction wakes due to the expiration of the operating system time-limit,
the instructions sets RFLAGS.CF; otherwise, that flag is cleared.

The following additional events cause the processor to exit the implementation-dependent optimized state: a store
to the read-set range within the transactional region, an NMI or SMI, a debug exception, a machine check excep-
tion, the BINIT\# signal, the INIT\# signal, and the RESET\# signal.

Other implementation-dependent events may cause the processor to exit the implementation-dependent opti-
mized state proceeding to the instruction following TPAUSE. In addition, an external interrupt causes the processor
to exit the implementation-dependent optimized state regardless of whether maskable-interrupts are inhibited

(EFLAGS.IF =0). It should be noted that if maskable-interrupts are inhibited execution will proceed to the instruction
 following TPAUSE.

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
WHILE TSC < deadline:
    implementation_dependent_optimized_state(Source register, deadline, IA32_UMWAIT_CONTROL[0])
IF using_os_deadline AND TSC > deadline:
    RFLAGS.CF ← 1
ELSE:
    RFLAGS.CF ← 0
RFLAGS.AF,PF,SF,ZF,OF ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
TPAUSE uint8_t _tpause(uint32_t control, uint64_t counter);
```
### Numeric Exceptions

None.

### Exceptions (All Operating Modes)

<p>#GP(0)
If src[31:1] != 0.
<p>#UD
If CPUID.7.0:ECX.WAITPKG[bit 5]=0.
If MODRM.MOD != 0b11.

 --- 
<p align="right"><i>Source: Intel® Architecture Instruction Set Extensions and Future Features Programming Reference (May 2018)<br>Generated: 5-6-2018</i></p>
