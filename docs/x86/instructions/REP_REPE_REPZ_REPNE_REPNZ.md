<b>REP / REPE / REPZ / REPNE / REPNZ</b> — Repeat String Operation Prefix
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
		<td>F3 6C</td>
		<td>REP INS m8, DX</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Input (E)CX bytes from port DX into ES:[(E)DI].</td>
	</tr>
	<tr>
		<td>F3 6C</td>
		<td>REP INS m8, DX</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Input RCX bytes from port DX into [RDI].</td>
	</tr>
	<tr>
		<td>F3 6D</td>
		<td>REP INS m16, DX</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Input (E)CX words from port DX into ES:[(E)DI.]</td>
	</tr>
	<tr>
		<td>F3 6D</td>
		<td>REP INS m32, DX</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Input (E)CX doublewords from port DX into ES:[(E)DI].</td>
	</tr>
	<tr>
		<td>F3 6D</td>
		<td>REP INS r/m32, DX</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Input RCX default size from port DX into [RDI].</td>
	</tr>
	<tr>
		<td>F3 A4</td>
		<td>REP MOVS m8, m8</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move (E)CX bytes from DS:[(E)SI] to ES:[(E)DI].</td>
	</tr>
	<tr>
		<td>F3 REX.W A4</td>
		<td>REP MOVS m8, m8</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Move RCX bytes from [RSI] to [RDI].</td>
	</tr>
	<tr>
		<td>F3 A5</td>
		<td>REP MOVS m16, m16</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move (E)CX words from DS:[(E)SI] to ES:[(E)DI].</td>
	</tr>
	<tr>
		<td>F3 A5</td>
		<td>REP MOVS m32, m32</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move (E)CX doublewords from DS:[(E)SI] to ES:[(E)DI].</td>
	</tr>
	<tr>
		<td>F3 REX.W A5</td>
		<td>REP MOVS m64, m64</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Move RCX quadwords from [RSI] to [RDI].</td>
	</tr>
	<tr>
		<td>F3 6E</td>
		<td>REP OUTS DX, r/m8</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Output (E)CX bytes from DS:[(E)SI] to port DX.</td>
	</tr>
	<tr>
		<td>F3 REX.W 6E</td>
		<td>REP OUTS DX, r/m8*</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Output RCX bytes from [RSI] to port DX.</td>
	</tr>
	<tr>
		<td>F3 6F</td>
		<td>REP OUTS DX, r/m16</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Output (E)CX words from DS:[(E)SI] to port DX.</td>
	</tr>
	<tr>
		<td>F3 6F</td>
		<td>REP OUTS DX, r/m32</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Output (E)CX doublewords from DS:[(E)SI] to port DX.</td>
	</tr>
	<tr>
		<td>F3 REX.W 6F</td>
		<td>REP OUTS DX, r/m32</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Output RCX default size from [RSI] to port DX.</td>
	</tr>
	<tr>
		<td>F3 AC</td>
		<td>REP LODS AL</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Load (E)CX bytes from DS:[(E)SI] to AL.</td>
	</tr>
	<tr>
		<td>F3 REX.W AC</td>
		<td>REP LODS AL</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Load RCX bytes from [RSI] to AL.</td>
	</tr>
	<tr>
		<td>F3 AD</td>
		<td>REP LODS AX</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Load (E)CX words from DS:[(E)SI] to AX.</td>
	</tr>
	<tr>
		<td>F3 AD</td>
		<td>REP LODS EAX</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Load (E)CX doublewords from DS:[(E)SI] to EAX.</td>
	</tr>
	<tr>
		<td>F3 REX.W AD</td>
		<td>REP LODS RAX</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Load RCX quadwords from [RSI] to RAX.</td>
	</tr>
	<tr>
		<td>F3 AA</td>
		<td>REP STOS m8</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Fill (E)CX bytes at ES:[(E)DI] with AL.</td>
	</tr>
	<tr>
		<td>F3 REX.W AA</td>
		<td>REP STOS m8</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Fill RCX bytes at [RDI] with AL.</td>
	</tr>
	<tr>
		<td>F3 AB</td>
		<td>REP STOS m16</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Fill (E)CX words at ES:[(E)DI] with AX.</td>
	</tr>
	<tr>
		<td>F3 AB</td>
		<td>REP STOS m32</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Fill (E)CX doublewords at ES:[(E)DI] with EAX.</td>
	</tr>
	<tr>
		<td>F3 REX.W AB</td>
		<td>REP STOS m64</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Fill RCX quadwords at [RDI] with RAX.</td>
	</tr>
	<tr>
		<td>F3 A6</td>
		<td>REPE CMPS m8, m8</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Find nonmatching bytes in ES:[(E)DI] and DS:[(E)SI].</td>
	</tr>
	<tr>
		<td>F3 REX.W A6</td>
		<td>REPE CMPS m8, m8</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Find non-matching bytes in [RDI] and [RSI].</td>
	</tr>
	<tr>
		<td>F3 A7</td>
		<td>REPE CMPS m16, m16</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Find nonmatching words in ES:[(E)DI] and DS:[(E)SI].</td>
	</tr>
	<tr>
		<td>F3 A7</td>
		<td>REPE CMPS m32, m32</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Find nonmatching doublewords in ES:[(E)DI] and DS:[(E)SI].</td>
	</tr>
	<tr>
		<td>F3 REX.W A7</td>
		<td>REPE CMPS m64, m64</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Find non-matching quadwords in [RDI] and [RSI].</td>
	</tr>
	<tr>
		<td>F3 AE</td>
		<td>REPE SCAS m8</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Find non-AL byte starting at ES:[(E)DI].</td>
	</tr>
	<tr>
		<td>F3 REX.W AE</td>
		<td>REPE SCAS m8</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Find non-AL byte starting at [RDI].</td>
	</tr>
	<tr>
		<td>F3 AF</td>
		<td>REPE SCAS m16</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Find non-AX word starting at ES:[(E)DI].</td>
	</tr>
	<tr>
		<td>F3 AF</td>
		<td>REPE SCAS m32</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Find non-EAX doubleword starting at ES:[(E)DI].</td>
	</tr>
	<tr>
		<td>F3 REX.W AF</td>
		<td>REPE SCAS m64</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Find non-RAX quadword starting at [RDI].</td>
	</tr>
	<tr>
		<td>F2 A6</td>
		<td>REPNE CMPS m8, m8</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Find matching bytes in ES:[(E)DI] and DS:[(E)SI].</td>
	</tr>
	<tr>
		<td>F2 REX.W A6</td>
		<td>REPNE CMPS m8, m8</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Find matching bytes in [RDI] and [RSI].</td>
	</tr>
	<tr>
		<td>F2 A7</td>
		<td>REPNE CMPS m16, m16</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Find matching words in ES:[(E)DI] and DS:[(E)SI].</td>
	</tr>
	<tr>
		<td>F2 A7</td>
		<td>REPNE CMPS m32, m32</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Find matching doublewords in ES:[(E)DI] and DS:[(E)SI].</td>
	</tr>
	<tr>
		<td>F2 REX.W A7</td>
		<td>REPNE CMPS m64, m64</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Find matching doublewords in [RDI] and [RSI].</td>
	</tr>
	<tr>
		<td>F2 AE</td>
		<td>REPNE SCAS m8</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Find AL, starting at ES:[(E)DI].</td>
	</tr>
	<tr>
		<td>F2 REX.W AE</td>
		<td>REPNE SCAS m8</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Find AL, starting at [RDI].</td>
	</tr>
	<tr>
		<td>F2 AF</td>
		<td>REPNE SCAS m16</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Find AX, starting at ES:[(E)DI].</td>
	</tr>
	<tr>
		<td>F2 AF</td>
		<td>REPNE SCAS m32</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Find EAX, starting at ES:[(E)DI].</td>
	</tr>
	<tr>
		<td>F2 REX.W AF</td>
		<td>REPNE SCAS m64</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Find RAX, starting at [RDI].</td>
	</tr>
</table>
NOTES: * In 64-bit mode, r/m8 can not be encoded to access the following byte registers if a REX prefix is used: AH, BH, CH, DH.


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
Repeats a string instruction the number of times specified in the count register or until the indicated condition of
the ZF flag is no longer met. The REP (repeat), REPE (repeat while equal), REPNE (repeat while not equal), REPZ
(repeat while zero), and REPNZ (repeat while not zero) mnemonics are prefixes that can be added to one of the
string instructions. The REP prefix can be added to the INS, OUTS, MOVS, LODS, and STOS instructions, and the
REPE, REPNE, REPZ, and REPNZ prefixes can be added to the CMPS and SCAS instructions. (The REPZ and REPNZ
prefixes are synonymous forms of the REPE and REPNE prefixes, respectively.) The F3H prefix is defined for the
following instructions and undefined for the rest:

 * F3H as REP/REPE/REPZ for string and input/output instruction.

 * F3H is a mandatory prefix for POPCNT, LZCNT, and ADOX.

The REP prefixes apply only to one string instruction at a time. To repeat a block of instructions, use the LOOP
instruction or another looping construct. All of these repeat prefixes cause the associated instruction to be repeated
until the count in register is decremented to 0. See Table 4-17.

Table 4-17.  Repeat Prefixes
<table>
	<tr>
		<td><b>Repeat Prefix</b></td>
		<td><b>Termination Condition 1*</b></td>
		<td><b>Termination Condition 2</b></td>
	</tr>
	<tr>
		<td>REP</td>
		<td>RCX or (E)CX = 0</td>
		<td>None</td>
	</tr>
	<tr>
		<td>REPE/REPZ</td>
		<td>RCX or (E)CX = 0</td>
		<td>ZF = 0</td>
	</tr>
	<tr>
		<td>REPNE/REPNZ</td>
		<td>RCX or (E)CX = 0</td>
		<td>ZF = 1</td>
	</tr>
</table>

NOTES:
\* Count register is CX, ECX or RCX by default, depending on attributes of the operating modes.
The REPE, REPNE, REPZ, and REPNZ prefixes also check the state of the ZF flag after each iteration and terminate
the repeat loop if the ZF flag is not in the specified state. When both termination conditions are tested, the cause
of a repeat termination can be determined either by testing the count register with a JECXZ instruction or by
testing the ZF flag (with a JZ, JNZ, or JNE instruction).

When the REPE/REPZ and REPNE/REPNZ prefixes are used, the ZF flag does not require initialization because both
the CMPS and SCAS instructions affect the ZF flag according to the results of the comparisons they make.

A repeating string operation can be suspended by an exception or interrupt. When this happens, the state of the
registers is preserved to allow the string operation to be resumed upon a return from the exception or interrupt
handler. The source and destination registers point to the next string elements to be operated on, the EIP register
points to the string instruction, and the ECX register has the value it held following the last successful iteration of
the instruction. This mechanism allows long string operations to proceed without affecting the interrupt response
time of the system.

When a fault occurs during the execution of a CMPS or SCAS instruction that is prefixed with REPE or REPNE, the
EFLAGS value is restored to the state prior to the execution of the instruction. Since the SCAS and CMPS instructions
 do not use EFLAGS as an input, the processor can resume the instruction after the page fault handler.

Use the REP INS and REP OUTS instructions with caution. Not all I/O ports can handle the rate at which these
instructions execute. Note that a REP STOS instruction is the fastest way to initialize a large block of memory.

In 64-bit mode, the operand size of the count register is associated with the address size attribute. Thus the default
count register is RCX; REX.W has no effect on the address size and the count register. In 64-bit mode, if 67H is
used to override address size attribute, the count register is ECX and any implicit source/destination operand will
use the corresponding 32-bit index register. See the summary chart at the beginning of this section for encoding
data and limits.

REP INS may read from the I/O port without writing to the memory location if an exception or VM exit occurs due
to the write (e.g. \#PF). If this would be problematic, for example because the I/O port read has side-effects, soft-
ware should ensure the write to the memory location does not cause an exception or VM exit.

### Operation

```java
IF AddressSize = 16
    THEN
        Use CX for CountReg;
        Implicit Source/Dest operand for memory use of SI/DI;
    ELSE IF AddressSize = 64
        THEN Use RCX for CountReg; 
        Implicit Source/Dest operand for memory use of RSI/RDI;
    ELSE
        Use ECX for CountReg;
        Implicit Source/Dest operand for memory use of ESI/EDI;
FI;
WHILE CountReg ≠ 0
    DO
        Service pending interrupts (if any);
        Execute associated string instruction;
        CountReg ← (CountReg – 1);
        IF CountReg = 0
            THEN exit WHILE loop; FI;
        IF (Repeat prefix is REPZ or REPE) and (ZF = 0)
        or (Repeat prefix is REPNZ or REPNE) and (ZF = 1)
            THEN exit WHILE loop; FI;
    OD;
```
### Flags Affected

None; however, the CMPS and SCAS instructions do set the status flags in the EFLAGS register.

### Exceptions (All Operating Modes)
Exceptions may be generated by an instruction associated with the prefix.

### 64-Bit Mode Exceptions

<p>#GP(0)
If the memory address is in a non-canonical form.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
