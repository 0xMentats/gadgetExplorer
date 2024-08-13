<b>SETcc</b> — Set Byte on Condition
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
		<td>0F 97</td>
		<td>SETA r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if above (CF=0 and ZF=0).</td>
	</tr>
	<tr>
		<td>REX + 0F 97</td>
		<td>SETA r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if above (CF=0 and ZF=0).</td>
	</tr>
	<tr>
		<td>0F 93</td>
		<td>SETAE r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if above or equal (CF=0).</td>
	</tr>
	<tr>
		<td>REX + 0F 93</td>
		<td>SETAE r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if above or equal (CF=0).</td>
	</tr>
	<tr>
		<td>0F 92</td>
		<td>SETB r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if below (CF=1).</td>
	</tr>
	<tr>
		<td>REX + 0F 92</td>
		<td>SETB r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if below (CF=1).</td>
	</tr>
	<tr>
		<td>0F 96</td>
		<td>SETBE r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if below or equal (CF=1 or ZF=1).</td>
	</tr>
	<tr>
		<td>REX + 0F 96</td>
		<td>SETBE r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if below or equal (CF=1 or ZF=1).</td>
	</tr>
	<tr>
		<td>0F 92</td>
		<td>SETC r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if carry (CF=1).</td>
	</tr>
	<tr>
		<td>REX + 0F 92</td>
		<td>SETC r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if carry (CF=1).</td>
	</tr>
	<tr>
		<td>0F 94</td>
		<td>SETE r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if equal (ZF=1).</td>
	</tr>
	<tr>
		<td>REX + 0F 94</td>
		<td>SETE r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if equal (ZF=1).</td>
	</tr>
	<tr>
		<td>0F 9F</td>
		<td>SETG r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if greater (ZF=0 and SF=OF).</td>
	</tr>
	<tr>
		<td>REX + 0F 9F</td>
		<td>SETG r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if greater (ZF=0 and SF=OF).</td>
	</tr>
	<tr>
		<td>0F 9D</td>
		<td>SETGE r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if greater or equal (SF=OF).</td>
	</tr>
	<tr>
		<td>REX + 0F 9D</td>
		<td>SETGE r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if greater or equal (SF=OF).</td>
	</tr>
	<tr>
		<td>0F 9C</td>
		<td>SETL r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if less (SF≠ OF).</td>
	</tr>
	<tr>
		<td>REX + 0F 9C</td>
		<td>SETL r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if less (SF≠ OF).</td>
	</tr>
	<tr>
		<td>0F 9E</td>
		<td>SETLE r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if less or equal (ZF=1 or SF≠ OF).</td>
	</tr>
	<tr>
		<td>REX + 0F 9E</td>
		<td>SETLE r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if less or equal (ZF=1 or SF≠ OF).</td>
	</tr>
	<tr>
		<td>0F 96</td>
		<td>SETNA r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if not above (CF=1 or ZF=1).</td>
	</tr>
	<tr>
		<td>REX + 0F 96</td>
		<td>SETNA r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if not above (CF=1 or ZF=1).</td>
	</tr>
	<tr>
		<td>0F 92</td>
		<td>SETNAE r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if not above or equal (CF=1).</td>
	</tr>
	<tr>
		<td>REX + 0F 92</td>
		<td>SETNAE r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if not above or equal (CF=1).</td>
	</tr>
	<tr>
		<td>0F 93</td>
		<td>SETNB r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if not below (CF=0).</td>
	</tr>
	<tr>
		<td>REX + 0F 93</td>
		<td>SETNB r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if not below (CF=0).</td>
	</tr>
	<tr>
		<td>0F 97</td>
		<td>SETNBE r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if not below or equal (CF=0 and ZF=0).</td>
	</tr>
	<tr>
		<td>REX + 0F 97</td>
		<td>SETNBE r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if not below or equal (CF=0 and ZF=0).</td>
	</tr>
	<tr>
		<td>0F 93</td>
		<td>SETNC r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if not carry (CF=0).</td>
	</tr>
	<tr>
		<td>REX + 0F 93</td>
		<td>SETNC r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if not carry (CF=0).</td>
	</tr>
	<tr>
		<td>0F 95</td>
		<td>SETNE r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if not equal (ZF=0).</td>
	</tr>
	<tr>
		<td>REX + 0F 95</td>
		<td>SETNE r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if not equal (ZF=0).</td>
	</tr>
	<tr>
		<td>0F 9E</td>
		<td>SETNG r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if not greater (ZF=1 or SF≠ OF)</td>
	</tr>
	<tr>
		<td>REX + 0F 9E</td>
		<td>SETNG r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if not greater (ZF=1 or SF≠ OF).</td>
	</tr>
	<tr>
		<td>0F 9C</td>
		<td>SETNGE r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if not greater or equal (SF≠ OF).</td>
	</tr>
	<tr>
		<td>REX + 0F 9C</td>
		<td>SETNGE r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if not greater or equal (SF≠ OF).</td>
	</tr>
	<tr>
		<td>0F 9D</td>
		<td>SETNL r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if not less (SF=OF).</td>
	</tr>
	<tr>
		<td>REX + 0F 9D</td>
		<td>SETNL r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if not less (SF=OF).</td>
	</tr>
	<tr>
		<td>0F 9F</td>
		<td>SETNLE r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if not less or equal (ZF=0 and SF=OF).</td>
	</tr>
	<tr>
		<td>REX + 0F 9F</td>
		<td>SETNLE r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if not less or equal (ZF=0 and SF=OF).</td>
	</tr>
	<tr>
		<td>0F 91</td>
		<td>SETNO r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if not overflow (OF=0).</td>
	</tr>
	<tr>
		<td>REX + 0F 91</td>
		<td>SETNO r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if not overflow (OF=0).</td>
	</tr>
	<tr>
		<td>0F 9B</td>
		<td>SETNP r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if not parity (PF=0).</td>
	</tr>
	<tr>
		<td>REX + 0F 9B</td>
		<td>SETNP r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if not parity (PF=0).</td>
	</tr>
	<tr>
		<td>0F 99</td>
		<td>SETNS r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if not sign (SF=0).</td>
	</tr>
	<tr>
		<td>REX + 0F 99</td>
		<td>SETNS r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if not sign (SF=0).</td>
	</tr>
	<tr>
		<td>0F 95</td>
		<td>SETNZ r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if not zero (ZF=0).</td>
	</tr>
	<tr>
		<td>REX + 0F 95</td>
		<td>SETNZ r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if not zero (ZF=0).</td>
	</tr>
	<tr>
		<td>0F 90</td>
		<td>SETO r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if overflow (OF=1)</td>
	</tr>
	<tr>
		<td>REX + 0F 90</td>
		<td>SETO r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if overflow (OF=1).</td>
	</tr>
	<tr>
		<td>0F 9A</td>
		<td>SETP r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if parity (PF=1).</td>
	</tr>
	<tr>
		<td>REX + 0F 9A</td>
		<td>SETP r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if parity (PF=1).</td>
	</tr>
	<tr>
		<td>0F 9A</td>
		<td>SETPE r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if parity even (PF=1).</td>
	</tr>
	<tr>
		<td>REX + 0F 9A</td>
		<td>SETPE r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if parity even (PF=1).</td>
	</tr>
	<tr>
		<td>0F 9B</td>
		<td>SETPO r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if parity odd (PF=0).</td>
	</tr>
	<tr>
		<td>REX + 0F 9B</td>
		<td>SETPO r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if parity odd (PF=0).</td>
	</tr>
	<tr>
		<td>0F 98</td>
		<td>SETS r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if sign (SF=1).</td>
	</tr>
	<tr>
		<td>REX + 0F 98</td>
		<td>SETS r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if sign (SF=1).</td>
	</tr>
	<tr>
		<td>0F 94</td>
		<td>SETZ r/m8</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Set byte if zero (ZF=1).</td>
	</tr>
	<tr>
		<td>REX + 0F 94</td>
		<td>SETZ r/m8*</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Set byte if zero (ZF=1).</td>
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
		<td>M</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Sets the destination operand to 0 or 1 depending on the settings of the status flags (CF, SF, OF, ZF, and PF) in the
EFLAGS register. The destination operand points to a byte register or a byte in memory. The condition code suffix
(cc) indicates the condition being tested for.

The terms “above” and “below” are associated with the CF flag and refer to the relationship between two unsigned
integer values. The terms “greater” and “less” are associated with the SF and OF flags and refer to the relationship
between two signed integer values.

Many of the SETcc instruction opcodes have alternate mnemonics. For example, SETG (set byte if greater) and
SETNLE (set if not less or equal) have the same opcode and test for the same condition: ZF equals 0 and SF equals
OF. These alternate mnemonics are provided to make code more intelligible. Appendix B, “EFLAGS Condition
Codes,” in the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 1, shows the alternate
mnemonics for various test conditions.

Some languages represent a logical one as an integer with all bits set. This representation can be obtained by
choosing the logically opposite condition for the SETcc instruction, then decrementing the result. For example, to
test for overflow, use the SETNO instruction, then decrement the result.
The reg field of the ModR/M byte is not used for the SETCC instruction and those opcode bits are ignored by the
processor.

In IA-64 mode, the operand size is fixed at 8 bits. Use of REX prefix enable uniform addressing to additional byte
registers. Otherwise, this instruction’s operation is the same as in legacy mode and compatibility mode.

### Operation

```java
IF condition
    THEN DEST ← 1; 
    ELSE DEST ← 0; 
FI;
```
### Flags Affected

None.

### Protected Mode Exceptions

<p>#GP(0)
If the destination is located in a non-writable segment.
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register contains a NULL segment selector.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF(fault-code)
If a page fault occurs.
<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#GP
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS
If a memory operand effective address is outside the SS segment limit.
<p>#UD
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF(fault-code)
If a page fault occurs.
<p>#UD
If the LOCK prefix is used.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#SS(0)
If a memory address referencing the SS segment is in a non-canonical form.
<p>#GP(0)
If the memory address is in a non-canonical form.
<p>#PF(fault-code)
If a page fault occurs.
<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
