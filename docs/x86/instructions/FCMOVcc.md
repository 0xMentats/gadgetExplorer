<b>FCMOVcc</b> — Floating-Point Conditional Move
<table>
	<tr>
		<td><b>Opcode*</b></td>
		<td><b>Instruction</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode*</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>DA C0+i</td>
		<td>FCMOVB ST(0), ST(i)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if below (CF=1).</td>
	</tr>
	<tr>
		<td>DA C8+i</td>
		<td>FCMOVE ST(0), ST(i)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if equal (ZF=1).</td>
	</tr>
	<tr>
		<td>DA D0+i</td>
		<td>FCMOVBE ST(0), ST(i)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if below or equal (CF=1 or ZF=1).</td>
	</tr>
	<tr>
		<td>DA D8+i</td>
		<td>FCMOVU ST(0), ST(i)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if unordered (PF=1).</td>
	</tr>
	<tr>
		<td>DB C0+i</td>
		<td>FCMOVNB ST(0), ST(i)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if not below (CF=0).</td>
	</tr>
	<tr>
		<td>DB C8+i</td>
		<td>FCMOVNE ST(0), ST(i)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if not equal (ZF=0).</td>
	</tr>
	<tr>
		<td>DB D0+i</td>
		<td>FCMOVNBE ST(0), ST(i)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if not below or equal (CF=0 and ZF=0).</td>
	</tr>
	<tr>
		<td>DB D8+i</td>
		<td>FCMOVNU ST(0), ST(i)</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if not unordered (PF=0).</td>
	</tr>
</table>

\* See IA-32 Architecture Compatibility section below.

### Description

Tests the status flags in the EFLAGS register and moves the source operand (second operand) to the destination
operand (first operand) if the given test condition is true. The condition for each mnemonic os given in the Description column above and in Chapter 8 in the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume
1. The source operand is always in the ST(i) register and the destination operand is always ST(0).

The FCMOVcc instructions are useful for optimizing small IF constructions. They also help eliminate branching over-
head for IF operations and the possibility of branch mispredictions by the processor.

A processor may not support the FCMOVcc instructions. Software can check if the FCMOVcc instructions are
supported by checking the processor’s feature information with the CPUID instruction (see “COMISS—Compare
Scalar Ordered Single-Precision Floating-Point Values and Set EFLAGS” in this chapter). If both the CMOV and FPU
feature bits are set, the FCMOVcc instructions are supported.

This instruction’s operation is the same in non-64-bit modes and 64-bit mode.

### IA-32 Architecture Compatibility

The FCMOVcc instructions were introduced to the IA-32 Architecture in the P6 family processors and are not available in earlier IA-32 processors.

### Operation

```java
IF condition TRUE
    THEN ST(0) ← ST(i);
FI;
```
### FPU Flags Affected

C1
Set to 0 if stack underflow occurred.
C0, C2, C3
Undefined.

### Floating-Point Exceptions

<p>#IS
Stack underflow occurred.

Integer Flags Affected
None.

### Protected Mode Exceptions
<p>#NM
CR0.EM[bit 2] or CR0.TS[bit 3] = 1.
<p>#UD
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