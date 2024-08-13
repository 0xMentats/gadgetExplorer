<b>WBINVD</b> — Write Back and Invalidate Cache
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
		<td>0F 09</td>
		<td>WBINVD</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Write back and flush Internal caches; initiate writing-back and flushing of external caches.</td>
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
Writes back all modified cache lines in the processor’s internal cache to main memory and invalidates (flushes) the
internal caches. The instruction then issues a special-function bus cycle that directs external caches to also write
back modified data and another bus cycle to indicate that the external caches should be invalidated.

After executing this instruction, the processor does not wait for the external caches to complete their write-back
and flushing operations before proceeding with instruction execution. It is the responsibility of hardware to respond
to the cache write-back and flush signals. The amount of time or cycles for WBINVD to complete will vary due to
size and other factors of different cache hierarchies. As a consequence, the use of the WBINVD instruction can have
an impact on logical processor interrupt/event response time. Additional information of WBINVD behavior in a
cache hierarchy with hierarchical sharing topology can be found in Chapter 2 of the Intel® 64 and IA-32 Architec-
tures Software Developer’s Manual, Volume 3A.

The WBINVD instruction is a privileged instruction. When the processor is running in protected mode, the CPL of a
program or procedure must be 0 to execute this instruction. This instruction is also a serializing instruction (see
“Serializing Instructions” in Chapter 8 of the Intel® 64 and IA-32 Architectures Software Developer’s Manual,
Volume 3A).

In situations where cache coherency with main memory is not a concern, software can use the INVD instruction.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### IA-32 Architecture Compatibility

The WBINVD instruction is implementation dependent, and its function may be implemented differently on future
Intel 64 and IA-32 processors. The instruction is not supported on IA-32 processors earlier than the Intel486
processor.

### Operation

```java
WriteBack(InternalCaches);
Flush(InternalCaches);
SignalWriteBack(ExternalCaches);
SignalFlush(ExternalCaches);
Continue; (* Continue execution *)
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
WBINVD void _wbinvd(void);
```
### Flags Affected

None.

### Protected Mode Exceptions

<p>#GP(0)
If the current privilege level is not 0.
<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions
<p>#UD
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

<p>#GP(0)
WBINVD cannot be executed at the virtual-8086 mode.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

Same exceptions as in protected mode.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
