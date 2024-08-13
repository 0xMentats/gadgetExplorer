<b>XABORT</b> —  Transactional Abort
<table>
	<tr>
		<td><b>Opcode/Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>C6 F8 ib XABORT imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>RTM</td>
		<td>Causes an RTM abort if in RTM execution</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand2</b></td>
		<td><b>Operand3</b></td>
		<td><b>Operand4</b></td>
	</tr>
	<tr>
		<td>A</td>
		<td>imm8</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
XABORT forces an RTM abort. Following an RTM abort, the logical processor resumes execution at the fallback
address computed through the outermost XBEGIN instruction. The EAX register is updated to reflect an XABORT
instruction caused the abort, and the imm8 argument will be provided in bits 31:24 of EAX.

### Operation


#### XABORT
```java
IF RTM_ACTIVE = 0
    THEN 
        Treat as NOP;
    ELSE
        GOTO RTM_ABORT_PROCESSING;
FI;
(* For any RTM abort condition encountered during RTM execution *)
RTM_ABORT_PROCESSING:
    Restore architectural register state;
    Discard memory updates performed in transaction;
    Update EAX with status and XABORT argument;
    RTM_NEST_COUNT ← 0;
    RTM_ACTIVE ← 0;
    IF 64-bit Mode
        THEN
            RIP ← fallbackRIP;
        ELSE
            EIP ← fallbackEIP;
    FI;
END
```
### Flags Affected

None

### Intel C/C++ Compiler Intrinsic Equivalent
```c
XABORT:
void _xabort( unsigned int);
```
### SIMD Floating-Point Exceptions

None

### Other Exceptions
<p>#UD
CPUID.(EAX=7, ECX=0):EBX.RTM[bit 11] = 0.
If LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
