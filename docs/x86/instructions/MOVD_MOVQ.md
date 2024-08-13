<b>MOVD / MOVQ</b> — Move Doubleword/Move Quadword
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En 64/32-bit</b></td>
		<td><b>Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 6E /r MOVD mm, r/m32</td>
		<td>A</td>
		<td>V/V</td>
		<td>MMX</td>
		<td>Move doubleword from r/m32 to mm.</td>
	</tr>
	<tr>
		<td>NP REX.W + 0F 6E /r MOVQ mm, r/m64</td>
		<td>A</td>
		<td>V/N.E.</td>
		<td>MMX</td>
		<td>Move quadword from r/m64 to mm.</td>
	</tr>
	<tr>
		<td>NP 0F 7E /r MOVD r/m32, mm</td>
		<td>B</td>
		<td>V/V</td>
		<td>MMX</td>
		<td>Move doubleword from mm to r/m32.</td>
	</tr>
	<tr>
		<td>NP REX.W + 0F 7E /r MOVQ r/m64, mm</td>
		<td>B</td>
		<td>V/N.E.</td>
		<td>MMX</td>
		<td>Move quadword from mm to r/m64.</td>
	</tr>
	<tr>
		<td>66 0F 6E /r MOVD xmm, r/m32</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Move doubleword from r/m32 to xmm.</td>
	</tr>
	<tr>
		<td>66 REX.W 0F 6E /r MOVQ xmm, r/m64</td>
		<td>A</td>
		<td>V/N.E.</td>
		<td>SSE2</td>
		<td>Move quadword from r/m64 to xmm.</td>
	</tr>
	<tr>
		<td>66 0F 7E /r MOVD r/m32, xmm</td>
		<td>B</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Move doubleword from xmm register to r/m32.</td>
	</tr>
	<tr>
		<td>66 REX.W 0F 7E /r MOVQ r/m64, xmm</td>
		<td>B</td>
		<td>V/N.E.</td>
		<td>SSE2</td>
		<td>Move quadword from xmm register to r/m64.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F.W0 6E / VMOVD xmm1, r32/m32</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move doubleword from r/m32 to xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F.W1 6E /r VMOVQ xmm1, r64/m64</td>
		<td>A</td>
		<td>V/N.E1.</td>
		<td>AVX</td>
		<td>Move quadword from r/m64 to xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F.W0 7E /r VMOVD r32/m32, xmm1</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move doubleword from xmm1 register to r/m32.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F.W1 7E /r VMOVQ r64/m64, xmm1</td>
		<td>B</td>
		<td>V/N.E1.</td>
		<td>AVX</td>
		<td>Move quadword from xmm1 register to r/m64.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F.W0 6E /r VMOVD xmm1, r32/m32</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512F </td>
		<td>Move doubleword from r/m32 to xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F.W1 6E /r VMOVQ xmm1, r64/m64</td>
		<td>C</td>
		<td>V/N.E.1</td>
		<td>AVX512F </td>
		<td>Move quadword from r/m64 to xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F.W0 7E /r VMOVD r32/m32, xmm1</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512F </td>
		<td>Move doubleword from xmm1 register to r/m32.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F.W1 7E /r VMOVQ r64/m64, xmm1</td>
		<td>D</td>
		<td>V/N.E.1</td>
		<td>AVX512F </td>
		<td>Move quadword from xmm1 register to r/m64.</td>
	</tr>
</table>

NOTES:
1. For this specific instruction, VEX.W/EVEX.W in non-64 bit is ignored; the instructions behaves as if the W0 ver-
sion is used.

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
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>B</td>
		<td>NA</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>C</td>
		<td>Tuple1 Scalar</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>D</td>
		<td>Tuple1 Scalar</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Copies a doubleword from the source operand (second operand) to the destination operand (first operand). The
source and destination operands can be general-purpose registers, MMX technology registers, XMM registers, or
32-bit memory locations. This instruction can be used to move a doubleword to and from the low doubleword of an
MMX technology register and a general-purpose register or a 32-bit memory location, or to and from the low
doubleword of an XMM register and a general-purpose register or a 32-bit memory location. The instruction cannot
be used to transfer data between MMX technology registers, between XMM registers, between general-purpose
registers, or between memory locations.

When the destination operand is an MMX technology register, the source operand is written to the low doubleword
of the register, and the register is zero-extended to 64 bits. When the destination operand is an XMM register, the
source operand is written to the low doubleword of the register, and the register is zero-extended to 128 bits.

In 64-bit mode, the instruction’s default operation size is 32 bits. Use of the REX.R prefix permits access to additional
 registers (R8-R15). Use of the REX.W prefix promotes operation to 64 bits. See the summary chart at the
beginning of this section for encoding data and limits.

MOVD/Q with XMM destination:
Moves a dword/qword integer from the source operand and stores it in the low 32/64-bits of the destination XMM
register. The upper bits of the destination are zeroed. The source operand can be a 32/64-bit register or 32/64-bit
memory location.

128-bit Legacy SSE version: Bits (MAXVL-1:128) of the corresponding YMM destination register remain unchanged.
Qword operation requires the use of REX.W=1.

VEX.128 encoded version: Bits (MAXVL-1:128) of the destination register are zeroed. Qword operation requires the
use of VEX.W=1.

EVEX.128 encoded version: Bits (MAXVL-1:128) of the destination register are zeroed. Qword operation requires
the use of EVEX.W=1.

MOVD/Q with 32/64 reg/mem destination:
Stores the low dword/qword of the source XMM register to 32/64-bit memory location or general-purpose register.
Qword operation requires the use of REX.W=1, VEX.W=1, or EVEX.W=1.

Note: VEX.vvvv and EVEX.vvvv are reserved and must be 1111b otherwise instructions will \#UD.

If VMOVD or VMOVQ is encoded with VEX.L= 1, an attempt to execute the instruction encoded with VEX.L= 1 will
cause an \#UD exception.

### Operation


#### MOVD (when destination operand is MMX technology register)
```java
    DEST[31:0] ← SRC;
    DEST[63:32] ← 00000000H;
```
#### MOVD (when destination operand is XMM register)
```java
    DEST[31:0] ← SRC;
    DEST[127:32] ← 000000000000000000000000H;
    DEST[MAXVL-1:128] (Unmodified)
```
#### MOVD (when source operand is MMX technology or XMM register)
```java
    DEST ← SRC[31:0];
```
#### VMOVD (VEX-encoded version when destination is an XMM register)
```java
    DEST[31:0] ← SRC[31:0]
    DEST[MAXVL-1:32] ← 0
```
#### MOVQ (when destination operand is XMM register)
```java
    DEST[63:0] ← SRC[63:0];
    DEST[127:64] ← 0000000000000000H;
    DEST[MAXVL-1:128] (Unmodified)
```
#### MOVQ (when destination operand is r/m64)
```java
    DEST[63:0] ← SRC[63:0];
```
#### MOVQ (when source operand is XMM register or r/m64)
```java
    DEST ← SRC[63:0];
```
#### VMOVQ (VEX-encoded version when destination is an XMM register)
```java
    DEST[63:0] ← SRC[63:0]
    DEST[MAXVL-1:64] ← 0
```
#### VMOVD (EVEX-encoded version when destination is an XMM register)
```java
DEST[31:0] ← SRC[31:0]
DEST[MAXVL-1:32] ← 0
```
#### VMOVQ (EVEX-encoded version when destination is an XMM register)
```java
DEST[63:0] ← SRC[63:0]
DEST[MAXVL-1:64] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
MOVD:
__m64 _mm_cvtsi32_si64 (int i )
MOVD:
int _mm_cvtsi64_si32 ( __m64m ) 
MOVD:
__m128i _mm_cvtsi32_si128 (int a) 
MOVD:
int _mm_cvtsi128_si32 ( __m128i a)
MOVQ:
__int64 _mm_cvtsi128_si64(__m128i); 
MOVQ:
__m128i _mm_cvtsi64_si128(__int64);
VMOVD
 __m128i _mm_cvtsi32_si128( int);
VMOVD
 int _mm_cvtsi128_si32( __m128i );
VMOVQ
 __m128i _mm_cvtsi64_si128 (__int64);
VMOVQ
 __int64 _mm_cvtsi128_si64(__m128i );
VMOVQ
 __m128i _mm_loadl_epi64( __m128i * s);
VMOVQ
 void _mm_storel_epi64( __m128i * d, __m128i s);
```
### Flags Affected
None

### SIMD Floating-Point Exceptions

None

### Other Exceptions
Non-EVEX-encoded instruction, see Exceptions Type 5.
EVEX-encoded instruction, see Exceptions Type E9NF.
<p>#UD
If VEX.L = 1.
If VEX.vvvv != 1111B or EVEX.vvvv != 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
