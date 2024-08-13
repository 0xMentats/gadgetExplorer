<b>PEXTRW</b> — Extract Word
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En 64/32 bit</b></td>
		<td><b>Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F C5 /r ib1 PEXTRW reg, mm, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Extract the word specified by imm8 from mm and move it to reg, bits 15-0. The upper bits of r32 or r64 is zeroed.</td>
	</tr>
	<tr>
		<td>66 0F C5 /r ib PEXTRW reg, xmm, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Extract the word specified by imm8 from xmm and move it to reg, bits 15-0. The upper bits of r32 or r64 is zeroed.</td>
	</tr>
	<tr>
		<td>66 0F 3A 15 /r ib PEXTRW reg/m16, xmm, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>SSE4_1</td>
		<td>Extract the word specified by imm8 from xmm and copy it to lowest 16 bits of reg or m16. Zero-extend the result in the destination, r32 or r64.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F.W0 C5 /r ib VPEXTRW reg, xmm1, imm8</td>
		<td>A</td>
		<td>V2/V</td>
		<td>AVX</td>
		<td>Extract the word specified by imm8 from xmm1 and move it to reg, bits 15:0. Zero- extend the result. The upper bits of r64/r32 is filled with zeros.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F3A.W0 15 /r ib VPEXTRW reg/m16, xmm2, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Extract a word integer value from xmm2 at the source word offset specified by imm8 into reg or m16. The upper bits of r64/r32 is filled with zeros.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F.WIG C5 /r ib VPEXTRW reg, xmm1, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Extract the word specified by imm8 from xmm1 and move it to reg, bits 15:0. Zero-extend the result. The upper bits of r64/r32 is filled with zeros.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F3A.WIG 15 /r ib VPEXTRW reg/m16, xmm2, imm8</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Extract a word integer value from xmm2 at the source word offset specified by imm8 into reg or m16. The upper bits of r64/r32 is filled with zeros.</td>
	</tr>
</table>

1. See note in Section 2.4, “AVX and SSE Instruction Exception Specification” in the Intel® 64 and IA-32 Architectures Software
Developer’s Manual, Volume 2A and Section 22.25.3, “Exception Conditions of Legacy SIMD Instructions Operating on MMX Registers”
in the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 3A.
2. In 64-bit mode, VEX.W1 is ignored for VPEXTRW (similar to legacy REX.W=1 prefix in PEXTRW).

### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Tuple Type</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand 2</b></td>
		<td><b>Operand 3</b></td>
		<td><b>Operand 4</b></td>
	</tr>
	<tr>
		<td>A</td>
		<td>NA</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>B</td>
		<td>NA</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>imm8</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>C</td>
		<td>Tuple1 Scalar</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>imm8</td>
		<td>NA</td>
	</tr>
</table>


### Description
Copies the word in the source operand (second operand) specified by the count operand (third operand) to the
destination operand (first operand). The source operand can be an MMX technology register or an XMM register.
The destination operand can be the low word of a general-purpose register or a 16-bit memory address. The count
operand is an 8-bit immediate. When specifying a word location in an MMX technology register, the 2 least-signifi-
cant bits of the count operand specify the location; for an XMM register, the 3 least-significant bits specify the location
. The content of the destination register above bit 16 is cleared (set to all 0s).
In 64-bit mode, using a REX prefix in the form of REX.R permits this instruction to access additional registers
(XMM8-XMM15, R8-15). If the destination operand is a general-purpose register, the default operand size is 64-bits
in 64-bit mode.

Note: In VEX.128 encoded versions, VEX.vvvv is reserved and must be 1111b, VEX.L must be 0, otherwise the
instruction will \#UD. In EVEX.128 encoded versions, EVEX.vvvv is reserved and must be 1111b, EVEX.L must be 0,
otherwise the instruction will \#UD. If the destination operand is a register, the default operand size in 64-bit mode
for VPEXTRW is 64 bits, the bits above the least significant byte/word/dword data are filled with zeros.

### Operation

```java
IF (DEST = Mem16)
THEN
    SEL ← COUNT[2:0];
    TEMP ← (Src >> SEL*16) AND FFFFH;
    Mem16 ← TEMP[15:0];
ELSE IF (64-Bit Mode and destination is a general-purpose register)
    THEN
        FOR (PEXTRW instruction with 64-bit source operand)
            { SEL ← COUNT[1:0];
            TEMP ← (SRC >> (SEL ∗ 16)) AND FFFFH;
            r64[15:0] ← TEMP[15:0];
            r64[63:16] ← ZERO_FILL; };
        FOR (PEXTRW instruction with 128-bit source operand)
            { SEL ← COUNT[2:0];
         
            TEMP ← (SRC >> (SEL ∗ 16)) AND FFFFH;
            r64[15:0] ← TEMP[15:0];
            r64[63:16] ← ZERO_FILL; }
    ELSE
        FOR (PEXTRW instruction with 64-bit source operand)
            { SEL ← COUNT[1:0];
            TEMP ← (SRC >> (SEL ∗ 16)) AND FFFFH;
            r32[15:0] ← TEMP[15:0];
            r32[31:16] ← ZERO_FILL; };
        FOR (PEXTRW instruction with 128-bit source operand)
            { SEL ← COUNT[2:0];
            TEMP ← (SRC >> (SEL ∗ 16)) AND FFFFH;
            r32[15:0] ← TEMP[15:0];
            r32[31:16] ← ZERO_FILL; };
    FI;
FI;
```
#### VPEXTRW ( dest=m16)
```java
SRC_Offset ← Imm8[2:0]
Mem16 ← (Src >> Src_Offset*16)
```
#### VPEXTRW ( dest=reg)
```java
IF (64-Bit Mode )
THEN
    SRC_Offset ← Imm8[2:0]
    DEST[15:0] ← ((Src >> Src_Offset*16) AND 0FFFFh)
    DEST[63:16] ←ZERO_FILL;
ELSE
    SRC_Offset ← Imm8[2:0]
    DEST[15:0] ← ((Src >> Src_Offset*16) AND 0FFFFh)
    DEST[31:16] ←ZERO_FILL;
FI
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
PEXTRW:
int _mm_extract_pi16 (__m64 a, int n)
PEXTRW:
int _mm_extract_epi16 ( __m128i a, int imm) 
```
### Flags Affected
None.

### Numeric Exceptions

None.

### Other Exceptions

Non-EVEX-encoded instruction, see Exceptions Type 5;
EVEX-encoded instruction, see Exceptions Type E9NF.
<p>#UD
If VEX.L = 1 or EVEX.L’L > 0.
If VEX.vvvv != 1111B or EVEX.vvvv != 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
