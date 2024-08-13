<b>RSM</b> — Resume from System Management Mode
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
		<td>0F AA</td>
		<td>RSM</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Resume operation of interrupted program.</td>
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
Returns program control from system management mode (SMM) to the application program or operating-system
procedure that was interrupted when the processor received an SMM interrupt. The processor’s state is restored
from the dump created upon entering SMM. If the processor detects invalid state information during state restora-
tion, it enters the shutdown state. The following invalid information can cause a shutdown:

 *  Any reserved bit of CR4 is set to 1.

 *  Any illegal combination of bits in CR0, such as (PG=1 and PE=0) or (NW=1 and CD=0).

 * (Intel Pentium and Intel486™ processors only.) The value stored in the state dump base field is not a 32-KByte
aligned address.

The contents of the model-specific registers are not affected by a return from SMM.

The SMM state map used by RSM supports resuming processor context for non-64-bit modes and 64-bit mode.

See Chapter 34, “System Management Mode,” in the Intel® 64 and IA-32 Architectures Software Developer’s
Manual, Volume 3C, for more information about SMM and the behavior of the RSM instruction.

### Operation

```java
ReturnFromSMM;
IF (IA-32e mode supported) or (CPUID DisplayFamily_DisplayModel = 06H_0CH )
    THEN
        ProcessorState ← Restore(SMMDump(IA-32e SMM STATE MAP));
    Else
        ProcessorState ← Restore(SMMDump(Non-32-Bit-Mode SMM STATE MAP));
FI
```
### Flags Affected

All.

### Protected Mode Exceptions

<p>#UD
If an attempt is made to execute this instruction when the processor is not in SMM.
If the LOCK prefix is used.

### Real-Address Mode Exceptions

Same exceptions as in protected mode.

### Virtual-8086 Mode Exceptions

Same exceptions as in protected mode.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions
Same exceptions as in protected mode.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
