<b>PINSRW</b> — Insert Word
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En 64/32 bit</b></td>
		<td><b>Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F C4 /r ib1 PINSRW mm, r32/m16, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Insert the low word from r32 or from m16 into mm at the word position specified by imm8.</td>
	</tr>
	<tr>
		<td>66 0F C4 /r ib PINSRW xmm, r32/m16, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Move the low word of r32 or from m16 into xmm at the word position specified by imm8.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.W0 C4 /r ib VPINSRW xmm1, xmm2, r32/m16, imm8</td>
		<td>B</td>
		<td>V2/V</td>
		<td>AVX</td>
		<td>Insert a word integer value from r32/m16 and rest from xmm2 into xmm1 at the word offset in imm8.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F.WIG C4 /r ib VPINSRW xmm1, xmm2, r32/m16, imm8</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Insert a word integer value from r32/m16 and rest from xmm2 into xmm1 at the word offset in imm8.</td>
	</tr>
</table>

1. See note in Section 2.4, “AVX and SSE Instruction Exception Specification” in the Intel® 64 and IA-32 Architectures Software
Developer’s Manual, Volume 2A and Section 22.25.3, “Exception Conditions of Legacy SIMD Instructions Operating on MMX Registers”
in the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 3A.
2. In 64-bit mode, VEX.W1 is ignored for VPINSRW (similar to legacy REX.W=1 prefix in PINSRW).

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
		<td>ModRM:reg (w)</td>
		<td>VEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8</td>
	</tr>
	<tr>
		<td>C</td>
		<td>Tuple1 Scalar</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>Imm8</td>
	</tr>
</table>


### Description
Copies a word from the source operand (second operand) and inserts it in the destination operand (first operand)
at the location specified with the count operand (third operand). (The other words in the destination register are
left untouched.) The source operand can be a general-purpose register or a 16-bit memory location. (When the
source operand is a general-purpose register, the low word of the register is copied.) The destination operand can
be an MMX technology register or an XMM register. The count operand is an 8-bit immediate. When specifying a
word location in an MMX technology register, the 2 least-significant bits of the count operand specify the location;
for an XMM register, the 3 least-significant bits specify the location.

In 64-bit mode and not encoded with VEX/EVEX, using a REX prefix in the form of REX.R permits this instruction to
access additional registers (XMM8-XMM15, R8-15).

128-bit Legacy SSE version: Bits (MAXVL-1:128) of the corresponding YMM destination register remain unchanged.

VEX.128 encoded version: Bits (MAXVL-1:128) of the destination YMM register are zeroed. VEX.L must be 0, other-
wise the instruction will \#UD.

EVEX.128 encoded version: Bits (MAXVL-1:128) of the destination register are zeroed. EVEX.L’L must be 0, other-
wise the instruction will \#UD.

### Operation


#### PINSRW (with 64-bit source operand)
```java
    SEL ← COUNT AND 3H;
        CASE (Determine word position) OF
            SEL ← 0:
                        MASK ← 000000000000FFFFH;
            SEL ← 1:
                        MASK ← 00000000FFFF0000H;
            SEL ← 2:
                        MASK ← 0000FFFF00000000H;
            SEL ← 3:
                        MASK ← FFFF000000000000H;
    DEST ← (DEST AND NOT MASK) OR (((SRC << (SEL ∗ 16)) AND MASK);
```
#### PINSRW (with 128-bit source operand)
```java
    SEL ← COUNT AND 7H;
        CASE (Determine word position) OF
            SEL ← 0:
                        MASK ← 0000000000000000000000000000FFFFH;
            SEL ← 1:
                        MASK ← 000000000000000000000000FFFF0000H;
            SEL ← 2:
                        MASK ← 00000000000000000000FFFF00000000H;
            SEL ← 3:
                        MASK ← 0000000000000000FFFF000000000000H;
            SEL ← 4:
                        MASK ← 000000000000FFFF0000000000000000H;
            SEL ← 5:
                        MASK ← 00000000FFFF00000000000000000000H;
            SEL ← 6:
                        MASK ← 0000FFFF000000000000000000000000H;
            SEL ← 7:
                        MASK ← FFFF0000000000000000000000000000H;
    DEST ← (DEST AND NOT MASK) OR (((SRC << (SEL ∗ 16)) AND MASK);
```
#### VPINSRW (VEX/EVEX encoded version)
```java
SEL ← imm8[2:0]
DEST[127:0] ← write_w_element(SEL, SRC2, SRC1)
DEST[MAXVL-1:128] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
PINSRW:
 __m64 _mm_insert_pi16 (__m64 a, int d, int n)
PINSRW:
 __m128i _mm_insert_epi16 ( __m128i a, int b, int imm)
```
### Flags Affected
None.

### Numeric Exceptions

None.

### Other Exceptions

EVEX-encoded instruction, see Exceptions Type 5;
EVEX-encoded instruction, see Exceptions Type E9NF.
<p>#UD
If VEX.L = 1 or EVEX.L’L > 0.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
