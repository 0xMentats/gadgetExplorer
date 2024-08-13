<b>PINSRB / PINSRD / PINSRQ</b> —  Insert Byte/Dword/Qword
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En 64/32 bit</b></td>
		<td><b>Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 3A 20 /r ib PINSRB xmm1, r32/m8, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE4_1</td>
		<td>Insert a byte integer value from r32/m8 into xmm1 at the destination element in xmm1 specified by imm8.</td>
	</tr>
	<tr>
		<td>66 0F 3A 22 /r ib PINSRD xmm1, r/m32, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE4_1</td>
		<td>Insert a dword integer value from r/m32 into the xmm1 at the destination element specified by imm8.</td>
	</tr>
	<tr>
		<td>66 REX.W 0F 3A 22 /r ib PINSRQ xmm1, r/m64, imm8</td>
		<td>A</td>
		<td>V/N. E.</td>
		<td>SSE4_1</td>
		<td>Insert a qword integer value from r/m64 into the xmm1 at the destination element specified by imm8.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F3A.W0 20 /r ib VPINSRB xmm1, xmm2, r32/m8, imm8</td>
		<td>B</td>
		<td>V1/V</td>
		<td>AVX</td>
		<td>Merge a byte integer value from r32/m8 and rest from xmm2 into xmm1 at the byte offset in imm8.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F3A.W0 22 /r ib VPINSRD xmm1, xmm2, r/m32, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Insert a dword integer value from r32/m32 and rest from xmm2 into xmm1 at the dword offset in imm8.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F3A.W1 22 /r ib VPINSRQ xmm1, xmm2, r/m64, imm8</td>
		<td>B</td>
		<td>V/I2</td>
		<td>AVX</td>
		<td>Insert a qword integer value from r64/m64 and rest from xmm2 into xmm1 at the qword offset in imm8.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F3A.WIG 20 /r ib VPINSRB xmm1, xmm2, r32/m8, imm8</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512BW </td>
		<td>Merge a byte integer value from r32/m8 and rest from xmm2 into xmm1 at the byte offset in imm8.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F3A.W0 22 /r ib VPINSRD xmm1, xmm2, r32/m32, imm8</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512DQ </td>
		<td>Insert a dword integer value from r32/m32 and rest from xmm2 into xmm1 at the dword offset in imm8.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F3A.W1 22 /r ib VPINSRQ xmm1, xmm2, r64/m64, imm8</td>
		<td>C</td>
		<td>V/N.E.2</td>
		<td>AVX512DQ </td>
		<td>Insert a qword integer value from r64/m64 and rest from xmm2 into xmm1 at the qword offset in imm8.</td>
	</tr>
</table>

NOTES:
1. In 64-bit mode, VEX.W1 is ignored for VPINSRB (similar to legacy REX.W=1 prefix with PINSRB).
2. VEX.W/EVEX.W in non-64 bit is ignored; the instructions behaves as if the W0 version is used.

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
Copies a byte/dword/qword from the source operand (second operand) and inserts it in the destination operand
(first operand) at the location specified with the count operand (third operand). (The other elements in the destination
 register are left untouched.) The source operand can be a general-purpose register or a memory location.
(When the source operand is a general-purpose register, PINSRB copies the low byte of the register.) The destination
 operand is an XMM register. The count operand is an 8-bit immediate. When specifying a qword[dword, byte]
location in an XMM register, the [2, 4] least-significant bit(s) of the count operand specify the location.
In 64-bit mode and not encoded with VEX/EVEX, using a REX prefix in the form of REX.R permits this instruction to
access additional registers (XMM8-XMM15, R8-15). Use of REX.W permits the use of 64 bit general purpose registers
.

128-bit Legacy SSE version: Bits (MAXVL-1:128) of the corresponding YMM destination register remain unchanged.

VEX.128 encoded version: Bits (MAXVL-1:128) of the destination register are zeroed. VEX.L must be 0, otherwise
the instruction will \#UD. Attempt to execute VPINSRQ in non-64-bit mode will cause \#UD.

EVEX.128 encoded version: Bits (MAXVL-1:128) of the destination register are zeroed. EVEX.L’L must be 0, other-
wise the instruction will \#UD.

### Operation

```java
CASE OF
    PINSRB: SEL ← COUNT[3:0];
            MASK ← (0FFH << (SEL * 8)); 
            TEMP ← (((SRC[7:0] << (SEL *8)) AND MASK);
    PINSRD: SEL ← COUNT[1:0];
            MASK ← (0FFFFFFFFH << (SEL * 32)); 
            TEMP ← (((SRC << (SEL *32)) AND MASK)
                            ;
    PINSRQ: SEL ← COUNT[0]
            MASK ← (0FFFFFFFFFFFFFFFFH << (SEL * 64)); 
            TEMP ← (((SRC << (SEL *64)) AND MASK)
                            ;
ESAC;
        DEST ← ((DEST AND NOT MASK) OR TEMP); 
```
#### VPINSRB (VEX/EVEX encoded version)
```java
SEL ← imm8[3:0]
DEST[127:0] ← write_b_element(SEL, SRC2, SRC1)
DEST[MAXVL-1:128] ← 0
```
#### VPINSRD (VEX/EVEX encoded version)
```java
SEL ← imm8[1:0]
DEST[127:0] ← write_d_element(SEL, SRC2, SRC1)
DEST[MAXVL-1:128] ← 0
```
#### VPINSRQ (VEX/EVEX encoded version)
```java
SEL ← imm8[0]
DEST[127:0] ← write_q_element(SEL, SRC2, SRC1)
DEST[MAXVL-1:128] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
PINSRB: 
__m128i _mm_insert_epi8 (__m128i s1, int s2, const int ndx);
PINSRD:
 __m128i _mm_insert_epi32 (__m128i s2, int s, const int ndx);
PINSRQ:
 __m128i _mm_insert_epi64(__m128i s2, __int64 s, const int ndx);
```
### Flags Affected

None.

### SIMD Floating-Point Exceptions

None.

### Other Exceptions

EVEX-encoded instruction, see Exceptions Type 5;
EVEX-encoded instruction, see Exceptions Type E9NF.
<p>#UD
If VEX.L = 1 or EVEX.L’L > 0.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
