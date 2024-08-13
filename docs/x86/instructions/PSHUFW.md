<b>PSHUFW</b> — Shuffle Packed Words
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 70 /r ib PSHUFW mm1, mm2/m64, imm8</td>
		<td>RMI</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Shuffle the words in mm2/m64 based on the encoding in imm8 and store the result in mm1.</td>
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
		<td>RMI</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8</td>
		<td>NA</td>
	</tr>
</table>


### Description
Copies words from the source operand (second operand) and inserts them in the destination operand (first
operand) at word locations selected with the order operand (third operand). This operation is similar to the opera-
tion used by the PSHUFD instruction, which is illustrated in Figure 4-16. For the PSHUFW instruction, each 2-bit
field in the order operand selects the contents of one word location in the destination operand. The encodings of the
order operand fields select words from the source operand to be copied to the destination operand.

The source operand can be an MMX technology register or a 64-bit memory location. The destination operand is an
MMX technology register. The order operand is an 8-bit immediate. Note that this instruction permits a word in the
source operand to be copied to more than one word location in the destination operand.

In 64-bit mode, using a REX prefix in the form of REX.R permits this instruction to access additional registers
(XMM8-XMM15).

### Operation

```java
DEST[15:0] ← (SRC >> (ORDER[1:0] * 16))[15:0];
DEST[31:16] ← (SRC >> (ORDER[3:2] * 16))[15:0];
DEST[47:32] ← (SRC >> (ORDER[5:4] * 16))[15:0];
DEST[63:48] ← (SRC >> (ORDER[7:6] * 16))[15:0];
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
PSHUFW:
__m64 _mm_shuffle_pi16(__m64 a, int n)
```
### Flags Affected

None.

### Numeric Exceptions

None.

### Other Exceptions

See Table 22-7, “Exception Conditions for SIMD/MMX Instructions with Memory Reference,” in the Intel® 64 and
IA-32 Architectures Software Developer’s Manual, Volume 3A.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
