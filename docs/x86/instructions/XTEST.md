<b>XTEST</b> —  Test If In Transactional Execution
<table>
	<tr>
		<td><b>Opcode/Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 01 D6 XTEST</td>
		<td>A</td>
		<td>V/V</td>
		<td>HLE or RTM</td>
		<td>Test if executing in a transactional region</td>
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
The XTEST instruction queries the transactional execution status. If the instruction executes inside a transactionally executing RTM region or a transactionally executing HLE region, then the ZF flag is cleared, else it is set.

### Operation


#### XTEST
```java
IF (RTM_ACTIVE = 1 OR HLE_ACTIVE = 1)
    THEN
        ZF ← 0
    ELSE
        ZF ← 1
FI;
```
### Flags Affected

The ZF flag is cleared if the instruction is executed transactionally; otherwise it is set to 1. The CF, OF, SF, PF, and
AF, flags are cleared.

### Intel C/C++ Compiler Intrinsic Equivalent
```c
XTEST:
int _xtest( void );
```
### SIMD Floating-Point Exceptions

None

### Other Exceptions

<p>#UD
CPUID.(EAX=7, ECX=0):EBX.HLE[bit 4] = 0 and CPUID.(EAX=7, ECX=0):EBX.RTM[bit 11] =
0.
If LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
