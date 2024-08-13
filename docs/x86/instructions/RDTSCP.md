<b>RDTSCP</b> — Read Time-Stamp Counter and Processor ID
<table>
	<tr>
		<td><b>Opcode*</b></td>
		<td><b>Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>0F 01 F9</td>
		<td>RDTSCP</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Read 64-bit time-stamp counter and IA32_TSC_AUX value into EDX:EAX and ECX.</td>
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
Reads the current value of the processor’s time-stamp counter (a 64-bit MSR) into the EDX:EAX registers and also
reads the value of the IA32_TSC_AUX MSR (address C0000103H) into the ECX register. The EDX register is loaded
with the high-order 32 bits of the IA32_TSC MSR; the EAX register is loaded with the low-order 32 bits of the
IA32_TSC MSR; and the ECX register is loaded with the low-order 32-bits of IA32_TSC_AUX MSR. On processors
that support the Intel 64 architecture, the high-order 32 bits of each of RAX, RDX, and RCX are cleared.

The processor monotonically increments the time-stamp counter MSR every clock cycle and resets it to 0 whenever
the processor is reset. See “Time Stamp Counter” in Chapter 17 of the Intel® 64 and IA-32 Architectures Software
Developer’s Manual, Volume 3B, for specific details of the time stamp counter behavior.

The time stamp disable (TSD) flag in register CR4 restricts the use of the RDTSCP instruction as follows. When the
flag is clear, the RDTSCP instruction can be executed at any privilege level; when the flag is set, the instruction can
only be executed at privilege level 0.

The RDTSCP instruction is not a serializing instruction, but it does wait until all previous instructions have executed
and all previous loads are globally visible.1 But it does not wait for previous stores to be globally visible, and subse-
quent instructions may begin execution before the read operation is performed. The following items may guide
software seeking to order executions of RDTSCP:

 * If software requires RDTSCP to be executed only after all previous stores are globally visible, it can execute
MFENCE immediately before RDTSCP.

 * If software requires RDTSCP to be executed prior to execution of any subsequent instruction (including any
memory accesses), it can execute LFENCE immediately after RDTSCP.

See “Changes to Instruction Behavior in VMX Non-Root Operation” in Chapter 25 of the Intel® 64 and IA-32 Archi-
tectures Software Developer’s Manual, Volume 3C, for more information about the behavior of this instruction in
VMX non-root operation.

### Operation

```java
IF (CR4.TSD = 0) or (CPL = 0) or (CR0.PE = 0) 
    THEN 
        EDX:EAX ← TimeStampCounter;
        ECX ← IA32_TSC_AUX[31:0];
    ELSE (* CR4.TSD = 1 and (CPL = 1, 2, or 3) and CR0.PE = 1 *)
        #GP(0);
FI;
```
### Flags Affected

None.

1. A load is considered to become globally visible when the value to be loaded is determined.

### Protected Mode Exceptions
<p>#GP(0)
If the TSD flag in register CR4 is set and the CPL is greater than 0.
<p>#UD
If the LOCK prefix is used.
If CPUID.80000001H:EDX.RDTSCP[bit 27] = 0.

### Real-Address Mode Exceptions

<p>#UD
If the LOCK prefix is used.
If CPUID.80000001H:EDX.RDTSCP[bit 27] = 0.

### Virtual-8086 Mode Exceptions

<p>#GP(0)
If the TSD flag in register CR4 is set.
<p>#UD
If the LOCK prefix is used.
If CPUID.80000001H:EDX.RDTSCP[bit 27] = 0.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

Same exceptions as in protected mode.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
