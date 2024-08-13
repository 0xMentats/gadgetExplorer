<b>MOVSX / MOVSXD</b> — Move with Sign-Extension
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
		<td>0F BE /r</td>
		<td>MOVSX r16, r/m8</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move byte to word with sign-extension.</td>
	</tr>
	<tr>
		<td>0F BE /r</td>
		<td>MOVSX r32, r/m8</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move byte to doubleword with sign- extension.</td>
	</tr>
	<tr>
		<td>REX.W + 0F BE /r</td>
		<td>MOVSX r64, r/m8</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move byte to quadword with sign-extension.</td>
	</tr>
	<tr>
		<td>0F BF /r</td>
		<td>MOVSX r32, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move word to doubleword, with sign- extension.</td>
	</tr>
	<tr>
		<td>REX.W + 0F BF /r</td>
		<td>MOVSX r64, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move word to quadword with sign-extension.</td>
	</tr>
	<tr>
		<td>63 /r*</td>
		<td>MOVSXD r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move word to word with sign-extension.</td>
	</tr>
	<tr>
		<td>63 /r*</td>
		<td>MOVSXD r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move doubleword to doubleword with sign- extension.</td>
	</tr>
	<tr>
		<td>REX.W + 63 /r</td>
		<td>MOVSXD r64, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move doubleword to quadword with sign- extension.</td>
	</tr>
</table>

\* The use of MOVSXD without REX.W in 64-bit mode is discouraged. Regular MOV should be used instead of using MOVSXD without
REX.W.

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
		<td>RM</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Copies the contents of the source operand (register or memory location) to the destination operand (register) and
sign extends the value to 16 or 32 bits (see Figure 7-6 in the Intel® 64 and IA-32 Architectures Software Devel-
oper’s Manual, Volume 1). The size of the converted value depends on the operand-size attribute.

In 64-bit mode, the instruction’s default operation size is 32 bits. Use of the REX.R prefix permits access to additional
 registers (R8-R15). Use of the REX.W prefix promotes operation to 64 bits. See the summary chart at the
beginning of this section for encoding data and limits.

### Operation

```java
DEST ← SignExtend(SRC);
```
### Flags Affected

None.

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register contains a NULL segment selector.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.
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
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.
<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
