<b>XEND</b> —  Transactional End
<table>
	<tr>
		<td><b>Opcode/Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 01 D5 XEND</td>
		<td>A</td>
		<td>V/V</td>
		<td>RTM</td>
		<td>Specifies the end of an RTM code region.</td>
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
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
The instruction marks the end of an RTM code region. If this corresponds to the outermost scope (that is, including
this XEND instruction, the number of XBEGIN instructions is the same as number of XEND instructions), the logical
processor will attempt to commit the logical processor state atomically. If the commit fails, the logical processor will
rollback all architectural register and memory updates performed during the RTM execution. The logical processor
will resume execution at the fallback address computed from the outermost XBEGIN instruction. The EAX register
is updated to reflect RTM abort information.

XEND executed outside a transactional region will cause a \#GP (General Protection Fault).

### Operation


#### XEND
```java
IF (RTM_ACTIVE = 0) THEN
    SIGNAL #GP
ELSE
    RTM_NEST_COUNT--
    IF (RTM_NEST_COUNT = 0) THEN
        Try to commit transaction
        IF fail to commit transactional execution
            THEN
                GOTO RTM_ABORT_PROCESSING;
            ELSE (* commit success *)
                RTM_ACTIVE ← 0
        FI;
    FI;
FI;
(* For any RTM abort condition encountered during RTM execution *)
RTM_ABORT_PROCESSING:
    Restore architectural register state
    Discard memory updates performed in transaction
    Update EAX with status
    RTM_NEST_COUNT ← 0
    RTM_ACTIVE ← 0
    IF 64-bit Mode
        THEN
            RIP ← fallbackRIP
        ELSE
            EIP ← fallbackEIP
    FI;
END
```
### Flags Affected
None

### Intel C/C++ Compiler Intrinsic Equivalent
```c
XEND:
void _xend( void );
```
### SIMD Floating-Point Exceptions

None

### Other Exceptions

<p>#UD
CPUID.(EAX=7, ECX=0):EBX.RTM[bit 11] = 0.
If LOCK or 66H or F2H or F3H prefix is used.
<p>#GP(0)
If RTM_ACTIVE = 0.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
