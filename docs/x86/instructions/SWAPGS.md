<b>SWAPGS</b> — Swap GS Base Register
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
		<td>0F 01 F8</td>
		<td>SWAPGS</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Invalid</td>
		<td>Exchanges the current GS base register value with the value contained in MSR address C0000102H.</td>
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
SWAPGS exchanges the current GS base register value with the value contained in MSR address C0000102H
(IA32_KERNEL_GS_BASE). The SWAPGS instruction is a privileged instruction intended for use by system software.

When using SYSCALL to implement system calls, there is no kernel stack at the OS entry point. Neither is there a
straightforward method to obtain a pointer to kernel structures from which the kernel stack pointer could be read.
Thus, the kernel cannot save general purpose registers or reference memory.

By design, SWAPGS does not require any general purpose registers or memory operands. No registers need to be
saved before using the instruction. SWAPGS exchanges the CPL 0 data pointer from the IA32_KERNEL_GS_BASE
MSR with the GS base register. The kernel can then use the GS prefix on normal memory references to access
kernel data structures. Similarly, when the OS kernel is entered using an interrupt or exception (where the kernel
stack is already set up), SWAPGS can be used to quickly get a pointer to the kernel data structures.

The IA32_KERNEL_GS_BASE MSR itself is only accessible using RDMSR/WRMSR instructions. Those instructions
are only accessible at privilege level 0. The WRMSR instruction ensures that the IA32_KERNEL_GS_BASE MSR
contains a canonical address.

### Operation

```java
IF CS.L ≠ 1 (* Not in 64-Bit Mode *)
    THEN
        #UD; FI;
IF CPL ≠ 0
    THEN #GP(0); FI;
tmp ← GS.base;
GS.base ← IA32_KERNEL_GS_BASE;
IA32_KERNEL_GS_BASE ← tmp;
```
### Flags Affected

None

### Protected Mode Exceptions

If Mode ≠ 64-Bit.
<p>#UD

### Real-Address Mode Exceptions

If Mode ≠ 64-Bit.
<p>#UD

### Virtual-8086 Mode Exceptions

If Mode ≠ 64-Bit.
<p>#UD

### Compatibility Mode Exceptions
If Mode ≠ 64-Bit.
<p>#UD

### 64-Bit Mode Exceptions

If CPL ≠ 0.
<p>#GP(0)
<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
