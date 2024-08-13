<b>INVLPG</b> — Invalidate TLB Entries
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
		<td>0F 01/7</td>
		<td>INVLPG m</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Invalidate TLB entries for page containing m.</td>
	</tr>
</table>

\* See the IA-32 Architecture Compatibility section below.

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
		<td>M</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Invalidates any translation lookaside buffer (TLB) entries specified with the source operand. The source operand is
a memory address. The processor determines the page that contains that address and flushes all TLB entries for
that page.1

The INVLPG instruction is a privileged instruction. When the processor is running in protected mode, the CPL must
be 0 to execute this instruction.

The INVLPG instruction normally flushes TLB entries only for the specified page; however, in some cases, it may
flush more entries, even the entire TLB. The instruction is guaranteed to invalidates only TLB entries associated
with the current PCID. (If PCIDs are disabled — CR4.PCIDE = 0 — the current PCID is 000H.) The instruction also
invalidates any global TLB entries for the specified page, regardless of PCID.

For more details on operations that flush the TLB, see “MOV—Move to/from Control Registers” in the Intel® 64 and
IA-32 Architectures Software Developer’s Manual, Volume 2B and Section 4.10.4.1, “Operations that Invalidate
TLBs and Paging-Structure Caches,” in the Intel® 64 and IA-32 Architectures Software Developer’s Manual,
Volume 3A.

This instruction’s operation is the same in all non-64-bit modes. It also operates the same in 64-bit mode, except
if the memory address is in non-canonical form. In this case, INVLPG is the same as a NOP.

### IA-32 Architecture Compatibility

The INVLPG instruction is implementation dependent, and its function may be implemented differently on different
families of Intel 64 or IA-32 processors. This instruction is not supported on IA-32 processors earlier than the
Intel486 processor.

### Operation

```java
Invalidate(RelevantTLBEntries);
Continue; (* Continue execution *)
```
### Flags Affected

None.

### Protected Mode Exceptions

<p>#GP(0)
If the current privilege level is not 0.
<p>#UD
Operand is a register.
If the LOCK prefix is used.

1.
If the paging structures map the linear address using a page larger than 4 KBytes and there are multiple TLB entries for that page
(see Section 4.10.2.3, “Details of TLB Use,” in the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 3A), the
instruction invalidates all of them.

### Real-Address Mode Exceptions
<p>#UD
Operand is a register.
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

<p>#GP(0)
The INVLPG instruction cannot be executed at the virtual-8086 mode.

### 64-Bit Mode Exceptions

<p>#GP(0)
If the current privilege level is not 0.
<p>#UD
Operand is a register.
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
