<b>NOP</b> — No Operation
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
		<td>NP 90</td>
		<td>NOP</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>One byte no-operation instruction.</td>
	</tr>
	<tr>
		<td>NP 0F 1F /0</td>
		<td>NOP r/m16</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Multi-byte no-operation instruction.</td>
	</tr>
	<tr>
		<td>NP 0F 1F /0</td>
		<td>NOP r/m32</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Multi-byte no-operation instruction.</td>
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
	<tr>
		<td>M</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
This instruction performs no operation. It is a one-byte or multi-byte NOP that takes up space in the instruction
stream but does not impact machine context, except for the EIP register.

The multi-byte form of NOP is available on processors with model encoding:

 *  CPUID.01H.EAX[Bytes 11:8] = 0110B or 1111B

The multi-byte NOP instruction does not alter the content of a register and will not issue a memory operation. The
instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### Operation

```java
The one-byte NOP instruction is an alias mnemonic for the XCHG (E)AX, (E)AX instruction.
The multi-byte NOP instruction performs no operation on supported processors and generates undefined opcode 
exception on processors that do not support the multi-byte NOP instruction.
The memory operand form of the instruction allows software to create a byte sequence of “no operation” as one 
instruction. For situations where multiple-byte NOPs are needed, the recommended operations (32-bit mode and 
64-bit mode) are: 
```
#### Table 4-12.  Recommended Multi-Byte Sequence of NOP Instruction
```java
<table>
	<tr>
		<td><b>Length</b></td>
		<td><b>Assembly</b></td>
		<td><b>Byte Sequence</b></td>
	</tr>
	<tr>
		<td>2 bytes 3 bytes 4 bytes 5 bytes 6 bytes 7 bytes 8 bytes 9 bytes</td>
		<td>66 NOP NOP DWORD ptr [EAX] NOP DWORD ptr [EAX + 00H] NOP DWORD ptr [EAX + EAX*1 + 00H] 66 NOP DWORD ptr [EAX + EAX*1 + 00H] NOP DWORD ptr [EAX + 00000000H] NOP DWORD ptr [EAX + EAX*1 + 00000000H] 66 NOP DWORD ptr [EAX + EAX*1 + 00000000H]</td>
		<td>66 90H 0F 1F 00H 0F 1F 40 00H 0F 1F 44 00 00H 66 0F 1F 44 00 00H 0F 1F 80 00 00 00 00H 0F 1F 84 00 00 00 00 00H 66 0F 1F 84 00 00 00 00 00H</td>
	</tr>
</table>

```
### Flags Affected
None

### Exceptions (All Operating Modes)

<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
