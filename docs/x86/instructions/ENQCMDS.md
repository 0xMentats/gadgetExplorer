<b>ENQCMDS</b> —  Enqueue Command Supervisor
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F3 0F 38 F8 /r ENQCMDS r32/64, m512</td>
		<td>A</td>
		<td>V/V</td>
		<td>ENQCMD</td>
		<td>Atomically enqueue 64-byte command from source memory operand to destination offset in ES segment specified in register operand as offset in ES segment.</td>
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
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
The ENQCMDS instruction allows system software to write commands to enqueue registers, which are special
device registers accessed using memory-mapped I/O (MMIO).

Enqueue registers expect writes to have the format given in Figure 2-1 and explained in the section on “ENQCMD — Enqueue Command.”

The ENQCMDS instruction begins by reading 64 bytes of command data from its source memory operand. (The
source operand is a normal memory operand; ModR/M.mod ≠ 11b.) This is an ordinary load with cacheability and
memory ordering implied normally by the memory type. The source operand need not be aligned, and there is no
guarantee that all 64 bytes are loaded atomically.
ENQCMDS formats its source data differently from ENQCMD. Specifically, it formats them into command data as
follows:

 *  Command[19:0] get bits 19:0 of the source operand that was read from memory. These 20 bits communicate a process address-space identifier (PASID). Chapter 3 provides more details regarding how ENQCMDS uses
PASIDs.

 *  Command[30:20] are zero.

 *  Command[511:31] get bits 511:31 of the source operand that was read from memory. Bit 31 communicates a privilege identification (0 = user; 1 = supervisor)

(The instruction ignores bits 30:20 of the source operand.)

The ENQCMDS instruction then uses an enqueue store (defined below) to write these command data to the destination operand. The address of the destination operand is specified in a general purpose register as an offset into
the ES segment (the segment cannot be overridden).<sup>1</sup> The destination linear address must be 64-byte aligned. The
operation of an enqueue store disregards the memory type f the destination memory address.

An enqueue store is not ordered relative to older stores to WB or WC memory (including non-temporal stores) or
to executions of the CLFLUSHOPT or CLWB (when applied to addresses other than that of the enqueue store). Software can enforce such ordering by executing a fencing instruction such as SFENCE or MFENCE before the enqueue
store.

An enqueue store does not write the data into the cache hierarchy, nor does it fetch any data into the cache hierarchy. An enqueue store’s command data is never combined with that of any other store to the same address.

Unlike other stores, an enqueue store returns a status, which the ENQCMDS instruction loads into the ZF flag in the
RFLAGS register:

 *  ZF = 0 (success) reports that the 64-byte command data was written atomically to a device’s enqueue register and has been accepted by the device. (It does not guarantee that the device has acted on the command; it may
have queued it for later execution.)

 *  ZF = 1 (retry) reports that the command data was not accepted. This status is returned if the destination address is an enqueue register but the command was not accepted due to capacity or other temporal reasons.
This status is also returned if the destination address was not an enqueue register (including the case of a
memory address); in these cases, the store is dropped and is written neither to MMIO nor to memory.

The ENQCMDS instruction may be executed only if CPL = 0. Availability of the ENQCMDS instruction is indicated by
the presence of the CPUID feature flag ENQCMD (bit 29 of the ECX register, see “CPUID Instruction” in Chapter 1).

<sup>1</sup>. In 64-bit mode, the width of the register operand is 64 bits (32 bits with a 67H prefix). Outside 64-bit mode when CS.D =1, the width is 32 bits (16 bits with a 67H prefix). Outside 64-bit mode when CS.D=0, the width is 16 bits (32 bits with a 67H prefix).


### Operation

```java
DEST ← SRC & ~7FF00000H;
                            // clear bits 30:20
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
ENQCMDS int_enqcmds(void *dst, const void *src)
```
### Flags Affected

The ZF flag is set if the enqueue-store completion returns the retry status; otherwise it is cleared. All other flags
are cleared.

### SIMD Floating-Point Exceptions

None.

### Protected Mode Exceptions

<p>#GP(0)
For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.
If destination linear address is not aligned to a 64-byte boundary.
If the current privilege level is not 0.
<p>#SS(0)
For an illegal address in the SS segment.
<p>#PF(fault-code)
For a page fault.
<p>#UD
If CPUID.07H.0H:ECX.ENQCMD[bit 29] = 0.
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#GP
If any part of the operand lies outside the effective address space from 0 to FFFFH.
If destination linear address is not aligned to a 64-byte boundary.
<p>#UD
If CPUID.07H.0H:ECX.ENQCMD[bit 29] = 0.
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

<p>#GP(0)
The ENQCMDS instruction is not recognized in virtual-8086 mode.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#SS(0)
If a memory address referencing the SS segment is in non-canonical form.
<p>#GP(0)
If the memory address is in non-canonical form.
If destination linear address is not aligned to a 64-byte boundary.
If the current privilege level is not 0.
<p>#PF(fault-code)
For a page fault.
<p>#UD
If CPUID.07H.0H:ECX.ENQCMD[bit 29].
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Instruction Set Extensions and Future Features Programming Reference (May 2019)<br>Generated: 28-5-2019</i></p>
