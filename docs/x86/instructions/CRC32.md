<b>CRC32</b> —  Accumulate CRC32 Value
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F2 0F 38 F0 /r CRC32 r32, r/m8</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Accumulate CRC32 on r/m8.</td>
	</tr>
	<tr>
		<td>F2 REX 0F 38 F0 /r CRC32 r32, r/m8*</td>
		<td>RM</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Accumulate CRC32 on r/m8.</td>
	</tr>
	<tr>
		<td>F2 0F 38 F1 /r CRC32 r32, r/m16</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Accumulate CRC32 on r/m16.</td>
	</tr>
	<tr>
		<td>F2 0F 38 F1 /r CRC32 r32, r/m32</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Accumulate CRC32 on r/m32.</td>
	</tr>
	<tr>
		<td>F2 REX.W 0F 38 F0 /r CRC32 r64, r/m8</td>
		<td>RM</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Accumulate CRC32 on r/m8.</td>
	</tr>
	<tr>
		<td>F2 REX.W 0F 38 F1 /r CRC32 r64, r/m64</td>
		<td>RM</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Accumulate CRC32 on r/m64.</td>
	</tr>
</table>

\*In 64-bit mode, r/m8 can not be encoded to access the following byte registers if a REX prefix is used: AH, BH, CH, DH.

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
		<td>ModRM:reg (r, w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Starting with an initial value in the first operand (destination operand), accumulates a CRC32 (polynomial
11EDC6F41H) value for the second operand (source operand) and stores the result in the destination operand. The
source operand can be a register or a memory location. The destination operand must be an r32 or r64 register. If
the destination is an r64 register, then the 32-bit result is stored in the least significant double word and
00000000H is stored in the most significant double word of the r64 register.

The initial value supplied in the destination operand is a double word integer stored in the r32 register or the least
significant double word of the r64 register. To incrementally accumulate a CRC32 value, software retains the result
of the previous CRC32 operation in the destination operand, then executes the CRC32 instruction again with new
input data in the source operand. Data contained in the source operand is processed in reflected bit order. This
means that the most significant bit of the source operand is treated as the least significant bit of the quotient, and
so on, for all the bits of the source operand. Likewise, the result of the CRC operation is stored in the destination
operand in reflected bit order. This means that the most significant bit of the resulting CRC (bit 31) is stored in the
least significant bit of the destination operand (bit 0), and so on, for all the bits of the CRC.

### Operation


#### Notes:
```java
    BIT_REFLECT64: DST[63-0] = SRC[0-63]
    BIT_REFLECT32: DST[31-0] = SRC[0-31]
    BIT_REFLECT16: DST[15-0] = SRC[0-15]
    BIT_REFLECT8: DST[7-0] = SRC[0-7]
    MOD2: Remainder from Polynomial division modulus 2
CRC32 instruction for 64-bit source operand and 64-bit destination operand:
    TEMP1[63-0] ← BIT_REFLECT64 (SRC[63-0])
    TEMP2[31-0] ← BIT_REFLECT32 (DEST[31-0])
    TEMP3[95-0] ← TEMP1[63-0] « 32
    TEMP4[95-0] ← TEMP2[31-0] « 64
    TEMP5[95-0] ← TEMP3[95-0] XOR TEMP4[95-0]
    TEMP6[31-0] ← TEMP5[95-0] MOD2 11EDC6F41H
    DEST[31-0] ← BIT_REFLECT (TEMP6[31-0])
    DEST[63-32] ← 00000000H
CRC32 instruction for 32-bit source operand and 32-bit destination operand:
    TEMP1[31-0] ← BIT_REFLECT32 (SRC[31-0])
    TEMP2[31-0] ← BIT_REFLECT32 (DEST[31-0])
    TEMP3[63-0] ← TEMP1[31-0] « 32
    TEMP4[63-0] ← TEMP2[31-0] « 32
    TEMP5[63-0] ← TEMP3[63-0] XOR TEMP4[63-0]
    TEMP6[31-0] ← TEMP5[63-0] MOD2 11EDC6F41H
    DEST[31-0] ← BIT_REFLECT (TEMP6[31-0])
CRC32 instruction for 16-bit source operand and 32-bit destination operand:
    TEMP1[15-0] ← BIT_REFLECT16 (SRC[15-0])
    TEMP2[31-0] ← BIT_REFLECT32 (DEST[31-0])
    TEMP3[47-0] ← TEMP1[15-0] « 32
    TEMP4[47-0] ← TEMP2[31-0] « 16
    TEMP5[47-0] ← TEMP3[47-0] XOR TEMP4[47-0]
    TEMP6[31-0] ← TEMP5[47-0] MOD2 11EDC6F41H
    DEST[31-0] ← BIT_REFLECT (TEMP6[31-0])
CRC32 instruction for 8-bit source operand and 64-bit destination operand:
    TEMP1[7-0] ← BIT_REFLECT8(SRC[7-0])
    TEMP2[31-0] ← BIT_REFLECT32 (DEST[31-0])
    TEMP3[39-0] ← TEMP1[7-0] « 32
    TEMP4[39-0] ← TEMP2[31-0] « 8
    TEMP5[39-0] ← TEMP3[39-0] XOR TEMP4[39-0]
    TEMP6[31-0] ← TEMP5[39-0] MOD2 11EDC6F41H
    DEST[31-0] ← BIT_REFLECT (TEMP6[31-0])
    DEST[63-32] ← 00000000H
CRC32 instruction for 8-bit source operand and 32-bit destination operand:
    TEMP1[7-0] ← BIT_REFLECT8(SRC[7-0])
    TEMP2[31-0] ← BIT_REFLECT32 (DEST[31-0])
    TEMP3[39-0] ← TEMP1[7-0] « 32
    TEMP4[39-0] ← TEMP2[31-0] « 8
    TEMP5[39-0] ← TEMP3[39-0] XOR TEMP4[39-0]
    TEMP6[31-0] ← TEMP5[39-0] MOD2 11EDC6F41H
    DEST[31-0] ← BIT_REFLECT (TEMP6[31-0])
```
### Flags Affected
None

### Intel C/C++ Compiler Intrinsic Equivalent
```c
unsigned int _mm_crc32_u8( unsigned int crc, unsigned char data )
unsigned int _mm_crc32_u16( unsigned int crc, unsigned short data )
unsigned int _mm_crc32_u32( unsigned int crc, unsigned int data )
unsinged __int64 _mm_crc32_u64( unsinged __int64 crc, unsigned __int64 data )
```
### SIMD Floating Point Exceptions
None

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS or GS segments.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF (fault-code)
For a page fault.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.
<p>#UD
If CPUID.01H:ECX.SSE4_2 [Bit 20] = 0.
If LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#GP(0)
If any part of the operand lies outside of the effective address space from 0 to 0FFFFH.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#UD
If CPUID.01H:ECX.SSE4_2 [Bit 20] = 0.
If LOCK prefix is used.

### Virtual 8086 Mode Exceptions

<p>#GP(0)
If any part of the operand lies outside of the effective address space from 0 to 0FFFFH.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF (fault-code)
For a page fault.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made.
<p>#UD
If CPUID.01H:ECX.SSE4_2 [Bit 20] = 0.
If LOCK prefix is used.

### Compatibility Mode Exceptions

Same exceptions as in Protected Mode.

### 64-Bit Mode Exceptions

<p>#GP(0)
If the memory address is in a non-canonical form.
<p>#SS(0)
If a memory address referencing the SS segment is in a non-canonical form.
<p>#PF (fault-code)
For a page fault.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.
<p>#UD
If CPUID.01H:ECX.SSE4_2 [Bit 20] = 0.
If LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
