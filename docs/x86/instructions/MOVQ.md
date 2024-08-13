<b>MOVQ</b> — Move Quadword
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En 64/32-bit</b></td>
		<td><b>Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 6F /r MOVQ mm, mm/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>MMX</td>
		<td>Move quadword from mm/m64 to mm.</td>
	</tr>
	<tr>
		<td>NP 0F 7F /r MOVQ mm/m64, mm</td>
		<td>B</td>
		<td>V/V</td>
		<td>MMX</td>
		<td>Move quadword from mm to mm/m64.</td>
	</tr>
	<tr>
		<td>F3 0F 7E /r MOVQ xmm1, xmm2/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Move quadword from xmm2/mem64 to xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.F3.0F.WIG 7E /r VMOVQ xmm1, xmm2/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move quadword from xmm2 to xmm1.</td>
	</tr>
	<tr>
		<td>EVEX.128.F3.0F.W1 7E /r VMOVQ xmm1, xmm2/m64</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move quadword from xmm2/m64 to xmm1.</td>
	</tr>
	<tr>
		<td>66 0F D6 /r MOVQ xmm2/m64, xmm1</td>
		<td>B</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Move quadword from xmm1 to xmm2/mem64.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F.WIG D6 /r VMOVQ xmm1/m64, xmm2</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Move quadword from xmm2 register to xmm1/m64.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F.W1 D6 /r VMOVQ xmm1/m64, xmm2</td>
		<td>D</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move quadword from xmm2 register to xmm1/m64.</td>
	</tr>
</table>


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
Copies a quadword from the source operand (second operand) to the destination operand (first operand). The
source and destination operands can be MMX technology registers, XMM registers, or 64-bit memory locations.
This instruction can be used to move a quadword between two MMX technology registers or between an MMX tech-
nology register and a 64-bit memory location, or to move data between two XMM registers or between an XMM
register and a 64-bit memory location. The instruction cannot be used to transfer data between memory locations.

When the source operand is an XMM register, the low quadword is moved; when the destination operand is an XMM
register, the quadword is stored to the low quadword of the register, and the high quadword is cleared to all 0s.

In 64-bit mode and if not encoded using VEX/EVEX, use of the REX prefix in the form of REX.R permits this instruction
 to access additional registers (XMM8-XMM15).

Note: VEX.vvvv and EVEX.vvvv are reserved and must be 1111b, otherwise instructions will \#UD.

If VMOVQ is encoded with VEX.L= 1, an attempt to execute the instruction encoded with VEX.L= 1 will cause an
\#UD exception.

### Operation


#### MOVQ instruction when operating on MMX technology registers and memory locations
```java
    DEST ← SRC;
```
#### MOVQ instruction when source and destination operands are XMM registers
```java
    DEST[63:0] ← SRC[63:0];
    DEST[127:64] ← 0000000000000000H;
```
#### MOVQ instruction when source operand is XMM register and destination
```java
operand is memory location:
    DEST ← SRC[63:0];
```
#### MOVQ instruction when source operand is memory location and destination
```java
operand is XMM register:
    DEST[63:0] ← SRC;
    DEST[127:64] ← 0000000000000000H;
```
#### VMOVQ (VEX.NDS.128.F3.0F 7E) with XMM register source and destination
```java
DEST[63:0] ← SRC[63:0]
DEST[MAXVL-1:64] ← 0
```
#### VMOVQ (VEX.128.66.0F D6) with XMM register source and destination
```java
DEST[63:0] ← SRC[63:0]
DEST[MAXVL-1:64] ← 0
```
#### VMOVQ (7E - EVEX encoded version) with XMM register source and destination
```java
DEST[63:0] ← SRC[63:0]
DEST[MAXVL-1:64] ← 0
```
#### VMOVQ (D6 - EVEX encoded version) with XMM register source and destination
```java
DEST[63:0] ← SRC[63:0]
DEST[MAXVL-1:64] ← 0
```
#### VMOVQ (7E) with memory source
```java
DEST[63:0] ← SRC[63:0]
DEST[MAXVL-1:64] ← 0
```
#### VMOVQ (7E - EVEX encoded version) with memory source
```java
DEST[63:0] ← SRC[63:0]
DEST[:MAXVL-1:64] ← 0
```
#### VMOVQ (D6) with memory dest
```java
DEST[63:0] ← SRC2[63:0]
```
### Flags Affected
None.

### Intel C/C++ Compiler Intrinsic Equivalent
```c
VMOVQ __m128i _mm_loadu_si64( void * s);
VMOVQ void _mm_storeu_si64( void * d, __m128i s);
MOVQ m128i _mm_move_epi64(__m128i a)
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

See Table 22-8, “Exception Conditions for Legacy SIMD/MMX Instructions without FP Exception,” in the Intel® 64
and IA-32 Architectures Software Developer’s Manual, Volume 3B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
