<b>WBNOINVD</b> — Write Back and Do Not Invalidate Cache
<table>
	<tr>
		<td><b>Opcode / Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F3 0F 09 WBNOINVD</td>
		<td>A</td>
		<td>V/V</td>
		<td>WBNOINVD</td>
		<td>Write back and do not flush internal caches; initiate writing-back without flushing of external caches.</td>
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
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
The WBNOINVD instruction writes back all modified cache lines in the processor’s internal cache to main memory
but does not invalidate (flush) the internal caches.

After executing this instruction, the processor does not wait for the external caches to complete their write-back
operation before proceeding with instruction execution. It is the responsibility of hardware to respond to the cache
write-back signal. The amount of time or cycles for WBNOINVD to complete will vary due to size and other factors
of different cache hierarchies. As a consequence, the use of the WBNOINVD instruction can have an impact on
logical processor interrupt/event response time.

The WBNOINVD instruction is a privileged instruction. When the processor is running in protected mode, the CPL of
a program or procedure must be 0 to execute this instruction. This instruction is also a serializing instruction (see
“Serializing Instructions” in Chapter 8 of the Intel® 64 and IA-32 Architectures Software Developer’s Manual,
Volume 3A).

In situations where cache coherency with main memory is not a concern, software can use the INVD instruction.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### IA-32 Architecture Compatibility

The WBNOINVD instruction is implementation dependent, and its function may be implemented differently on
future Intel 64 and IA-32 processors.

### Operation
```java
WriteBack(InternalCaches);
Continue; (* Continue execution *)
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
WBNOINVD void _wbnoinvd(void);
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
WBNOINVD cannot be executed at the virtual-8086 mode.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

Same exceptions as in protected mode.

 --- 
<p align="right"><i>Source: Intel® Architecture Instruction Set Extensions and Future Features Programming Reference (May 2019)<br>Generated: 28-5-2019</i></p>