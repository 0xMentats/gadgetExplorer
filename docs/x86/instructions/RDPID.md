<b>RDPID</b> — Read Processor ID
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32- bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F3 0F C7 /7 RDPID r32</td>
		<td>R</td>
		<td>N.E./V</td>
		<td>RDPID</td>
		<td>Read IA32_TSC_AUX into r32.</td>
	</tr>
	<tr>
		<td>F3 0F C7 /7 RDPID r64</td>
		<td>R</td>
		<td>V/N.E.</td>
		<td>RDPID</td>
		<td>Read IA32_TSC_AUX into r64.</td>
	</tr>
</table>

Instruction Operand Encoding1
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand 2</b></td>
		<td><b>Operand 3</b></td>
		<td><b>Operand 4</b></td>
	</tr>
	<tr>
		<td>R</td>
		<td>ModRM:r/m (w)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Reads the value of the IA32_TSC_AUX MSR (address C0000103H) into the destination register. The value of CS.D
and operand-size prefixes (66H and REX.W) do not affect the behavior of the RDPID instruction.

### Operation

```java
DEST ← IA32_TSC_AUX 
```
### Flags Affected

None.

### Protected Mode Exceptions

<p>#UD
If the LOCK prefix is used.
If CPUID.7H.0:ECX.RDPID[bit 22] = 0.

### Real-Address Mode Exceptions

Same exceptions as in protected mode.

### Virtual-8086 Mode Exceptions

Same exceptions as in protected mode.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

Same exceptions as in protected mode.

1.ModRM.MOD = 011B required

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
