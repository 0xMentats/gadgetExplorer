<b>PSUBUSB / PSUBUSW</b> — Subtract Packed Unsigned Integers with Unsigned Saturation
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F D8 /r1 PSUBUSB mm, mm/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>MMX</td>
		<td>Subtract unsigned packed bytes in mm/m64 from unsigned packed bytes in mm and saturate result.</td>
	</tr>
	<tr>
		<td>66 0F D8 /r PSUBUSB xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Subtract packed unsigned byte integers in xmm2/m128 from packed unsigned byte integers in xmm1 and saturate result.</td>
	</tr>
	<tr>
		<td>NP 0F D9 /r1 PSUBUSW mm, mm/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>MMX</td>
		<td>Subtract unsigned packed words in mm/m64 from unsigned packed words in mm and saturate result.</td>
	</tr>
	<tr>
		<td>66 0F D9 /r PSUBUSW xmm1, xmm2/m128</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Subtract packed unsigned word integers in xmm2/m128 from packed unsigned word integers in xmm1 and saturate result.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.WIG D8 /r VPSUBUSB xmm1, xmm2, xmm3/m128</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Subtract packed unsigned byte integers in xmm3/m128 from packed unsigned byte integers in xmm2 and saturate result.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.WIG D9 /r VPSUBUSW xmm1, xmm2, xmm3/m128</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Subtract packed unsigned word integers in xmm3/m128 from packed unsigned word integers in xmm2 and saturate result.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F.WIG D8 /r VPSUBUSB ymm1, ymm2, ymm3/m256</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Subtract packed unsigned byte integers in ymm3/m256 from packed unsigned byte integers in ymm2 and saturate result.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F.WIG D9 /r VPSUBUSW ymm1, ymm2, ymm3/m256</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX2</td>
		<td>Subtract packed unsigned word integers in ymm3/m256 from packed unsigned word integers in ymm2 and saturate result.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F.WIG D8 /r VPSUBUSB xmm1 {k1}{z}, xmm2, xmm3/m128</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Subtract packed unsigned byte integers in xmm3/m128 from packed unsigned byte integers in xmm2, saturate results and store in xmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F.WIG D8 /r VPSUBUSB ymm1 {k1}{z}, ymm2, ymm3/m256</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Subtract packed unsigned byte integers in ymm3/m256 from packed unsigned byte integers in ymm2, saturate results and store in ymm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F.WIG D8 /r VPSUBUSB zmm1 {k1}{z}, zmm2, zmm3/m512</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Subtract packed unsigned byte integers in zmm3/m512 from packed unsigned byte integers in zmm2, saturate results and store in zmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F.WIG D9 /r VPSUBUSW xmm1 {k1}{z}, xmm2, xmm3/m128</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Subtract packed unsigned word integers in xmm3/m128 from packed unsigned word integers in xmm2 and saturate results and store in xmm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F.WIG D9 /r VPSUBUSW ymm1 {k1}{z}, ymm2, ymm3/m256</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512BW</td>
		<td>Subtract packed unsigned word integers in ymm3/m256 from packed unsigned word integers in ymm2, saturate results and store in ymm1 using writemask k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F.WIG D9 /r VPSUBUSW zmm1 {k1}{z}, zmm2, zmm3/m512</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Subtract packed unsigned word integers in zmm3/m512 from packed unsigned word integers in zmm2, saturate results and store in zmm1 using writemask k1.</td>
	</tr>
</table>

1. See note in Section 2.4, “AVX and SSE Instruction Exception Specification” in the Intel® 64 and IA-32 Architectures Software
Developer’s Manual, Volume 2A and Section 22.25.3, “Exception Conditions of Legacy SIMD Instructions Operating on MMX Registers”
in the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 3A.

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
		<td>ModRM:reg (r, w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>B</td>
		<td>NA</td>
		<td>ModRM:reg (w)</td>
		<td>VEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>C</td>
		<td>Full Mem</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
	</tr>
</table>


### Description
Performs a SIMD subtract of the packed unsigned integers of the source operand (second operand) from the
packed unsigned integers of the destination operand (first operand), and stores the packed unsigned integer
results in the destination operand. See Figure 9-4 in the Intel® 64 and IA-32 Architectures Software Developer’s
Manual, Volume 1, for an illustration of a SIMD operation. Overflow is handled with unsigned saturation, as
described in the following paragraphs.

These instructions can operate on either 64-bit or 128-bit operands.

The (V)PSUBUSB instruction subtracts packed unsigned byte integers. When an individual byte result is less than
zero, the saturated value of 00H is written to the destination operand.

The (V)PSUBUSW instruction subtracts packed unsigned word integers. When an individual word result is less than
zero, the saturated value of 0000H is written to the destination operand.

In 64-bit mode and not encoded with VEX/EVEX, using a REX prefix in the form of REX.R permits this instruction to
access additional registers (XMM8-XMM15).

Legacy SSE version 64-bit operand: The destination operand must be an MMX technology register and the source
operand can be either an MMX technology register or a 64-bit memory location.

128-bit Legacy SSE version: The second source operand is an XMM register or a 128-bit memory location. The first
source operand and destination operands are XMM registers. Bits (MAXVL-1:128) of the corresponding YMM destination
 register remain unchanged.

VEX.128 encoded version: The second source operand is an XMM register or a 128-bit memory location. The first
source operand and destination operands are XMM registers. Bits (MAXVL-1:128) of the destination YMM register
are zeroed.

VEX.256 encoded versions: The second source operand is an YMM register or an 256-bit memory location. The first
source operand and destination operands are YMM registers. Bits (MAXVL-1:256) of the corresponding ZMM
register are zeroed.

EVEX encoded version: The second source operand is an ZMM/YMM/XMM register or an 512/256/128-bit memory
location. The first source operand and destination operands are ZMM/YMM/XMM registers. The destination is condi-
tionally updated with writemask k1.

### Operation


#### PSUBUSB (with 64-bit operands)
```java
    DEST[7:0] ← SaturateToUnsignedByte (DEST[7:0] − SRC (7:0] );
    (* Repeat add operation for 2nd through 7th bytes *)
    DEST[63:56] ← SaturateToUnsignedByte (DEST[63:56] − SRC[63:56]; 
```
#### PSUBUSW (with 64-bit operands)
```java
    DEST[15:0] ← SaturateToUnsignedWord (DEST[15:0] − SRC[15:0] );
    (* Repeat add operation for 2nd and 3rd words *)
    DEST[63:48] ← SaturateToUnsignedWord (DEST[63:48] − SRC[63:48] );
```
#### VPSUBUSB (EVEX encoded versions)
```java
(KL, VL) = (16, 128), (32, 256), (64, 512)
FOR j ← 0 TO KL-1
    i ← j * 8;
    IF k1[j] OR *no writemask*
        THEN DEST[i+7:i] ← SaturateToUnsignedByte (SRC1[i+7:i] - SRC2[i+7:i])
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+7:i] remains unchanged*
                ELSE *zeroing-masking*
                            ; zeroing-masking
                    DEST[i+7:i] ← 0;
            FI
    FI;
ENDFOR;
DEST[MAXVL-1:VL] ← 0;
```
#### VPSUBUSW (EVEX encoded versions)
```java
(KL, VL) = (8, 128), (16, 256), (32, 512)
FOR j ← 0 TO KL-1
    i ← j * 16;
    IF k1[j] OR *no writemask*
        THEN DEST[i+15:i] ← SaturateToUnsignedWord (SRC1[i+15:i] - SRC2[i+15:i])
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+15:i] remains unchanged*
                ELSE *zeroing-masking*
                            ; zeroing-masking
                    DEST[i+15:i] ← 0;
            FI
    FI;
ENDFOR;
DEST[MAXVL-1:VL] ← 0;
```
#### VPSUBUSB (VEX.256 encoded version)
```java
DEST[7:0] ← SaturateToUnsignedByte (SRC1[7:0] - SRC2[7:0]);
(* Repeat subtract operation for 2nd through 31st bytes *)
DEST[255:148] ← SaturateToUnsignedByte (SRC1[255:248] - SRC2[255:248]);
DEST[MAXVL-1:256] ← 0;
```
#### VPSUBUSB (VEX.128 encoded version)
```java
DEST[7:0] ← SaturateToUnsignedByte (SRC1[7:0] - SRC2[7:0]);
(* Repeat subtract operation for 2nd through 14th bytes *)
DEST[127:120] ← SaturateToUnsignedByte (SRC1[127:120] - SRC2[127:120]);
DEST[MAXVL-1:128] ← 0
```
#### PSUBUSB (128-bit Legacy SSE Version)
```java
DEST[7:0] ← SaturateToUnsignedByte (DEST[7:0] - SRC[7:0]);
(* Repeat subtract operation for 2nd through 14th bytes *)
DEST[127:120] ← SaturateToUnsignedByte (DEST[127:120] - SRC[127:120]);
DEST[MAXVL-1:128] (Unmodified)
```
#### VPSUBUSW (VEX.256 encoded version)
```java
DEST[15:0] ← SaturateToUnsignedWord (SRC1[15:0] - SRC2[15:0]);
(* Repeat subtract operation for 2nd through 15th words *)
DEST[255:240] ← SaturateToUnsignedWord (SRC1[255:240] - SRC2[255:240]);
DEST[MAXVL-1:256] ← 0;
```
#### VPSUBUSW (VEX.128 encoded version)
```java
DEST[15:0] ← SaturateToUnsignedWord (SRC1[15:0] - SRC2[15:0]);
(* Repeat subtract operation for 2nd through 7th words *)
DEST[127:112] ← SaturateToUnsignedWord (SRC1[127:112] - SRC2[127:112]);
DEST[MAXVL-1:128] ← 0
```
#### PSUBUSW (128-bit Legacy SSE Version)
```java
DEST[15:0] ← SaturateToUnsignedWord (DEST[15:0] - SRC[15:0]);
(* Repeat subtract operation for 2nd through 7th words *)
DEST[127:112] ← SaturateToUnsignedWord (DEST[127:112] - SRC[127:112]);
DEST[MAXVL-1:128] (Unmodified)
```
#### Intel C/C++ Compiler Intrinsic Equivalents
```java
VPSUBUSB __m512i _mm512_subs_epu8(__m512i a, __m512i b);
VPSUBUSB __m512i _mm512_mask_subs_epu8(__m512i s, __mmask64 k, __m512i a, __m512i b);
VPSUBUSB __m512i _mm512_maskz_subs_epu8( __mmask64 k, __m512i a, __m512i b);
VPSUBUSB __m256i _mm256_mask_subs_epu8(__m256i s, __mmask32 k, __m256i a, __m256i b);
VPSUBUSB __m256i _mm256_maskz_subs_epu8( __mmask32 k, __m256i a, __m256i b);
VPSUBUSB __m128i _mm_mask_subs_epu8(__m128i s, __mmask16 k, __m128i a, __m128i b);
VPSUBUSB __m128i _mm_maskz_subs_epu8( __mmask16 k, __m128i a, __m128i b);
VPSUBUSW __m512i _mm512_subs_epu16(__m512i a, __m512i b);
VPSUBUSW __m512i _mm512_mask_subs_epu16(__m512i s, __mmask32 k, __m512i a, __m512i b);
VPSUBUSW __m512i _mm512_maskz_subs_epu16( __mmask32 k, __m512i a, __m512i b);
VPSUBUSW __m256i _mm256_mask_subs_epu16(__m256i s, __mmask16 k, __m256i a, __m256i b);
VPSUBUSW __m256i _mm256_maskz_subs_epu16( __mmask16 k, __m256i a, __m256i b);
VPSUBUSW __m128i _mm_mask_subs_epu16(__m128i s, __mmask8 k, __m128i a, __m128i b);
VPSUBUSW __m128i _mm_maskz_subs_epu16( __mmask8 k, __m128i a, __m128i b);
PSUBUSB:__m64 _mm_subs_pu8(__m64 m1, __m64 m2)
(V)PSUBUSB:__m128i _mm_subs_epu8(__m128i m1, __m128i m2)
VPSUBUSB:__m256i _mm256_subs_epu8(__m256i m1, __m256i m2)
PSUBUSW:__m64 _mm_subs_pu16(__m64 m1, __m64 m2)
(V)PSUBUSW:__m128i _mm_subs_epu16(__m128i m1, __m128i m2)
VPSUBUSW:__m256i _mm256_subs_epu16(__m256i m1, __m256i m2)
```
### Flags Affected
None.

### Numeric Exceptions

None.

### Other Exceptions

Non-EVEX-encoded instruction, see Exceptions Type 4.
EVEX-encoded instruction, see Exceptions Type E4.
PTEST- Logical Compare
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 38 17 /r PTEST xmm1, xmm2/m128</td>
		<td>RM V/V</td>
		<td></td>
		<td>SSE4_1</td>
		<td>Set ZF if xmm2/m128 AND xmm1 result is all 0s. Set CF if xmm2/m128 AND NOT xmm1 result is all 0s.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F38.WIG 17 /r VPTEST xmm1, xmm2/m128</td>
		<td>RM V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Set ZF and CF depending on bitwise AND and ANDN of sources.</td>
	</tr>
	<tr>
		<td>VEX.256.66.0F38.WIG 17 /r VPTEST ymm1, ymm2/m256</td>
		<td>RM V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Set ZF and CF depending on bitwise AND and ANDN of sources.</td>
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
		<td>RM</td>
		<td>ModRM:reg (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
PTEST and VPTEST set the ZF flag if all bits in the result are 0 of the bitwise AND of the first source operand (first
operand) and the second source operand (second operand). VPTEST sets the CF flag if all bits in the result are 0 of
the bitwise AND of the second source operand (second operand) and the logical NOT of the destination operand.

The first source register is specified by the ModR/M reg field.

128-bit versions: The first source register is an XMM register. The second source register can be an XMM register
or a 128-bit memory location. The destination register is not modified.

VEX.256 encoded version: The first source register is a YMM register. The second source register can be a YMM
register or a 256-bit memory location. The destination register is not modified.

Note: In VEX-encoded versions, VEX.vvvv is reserved and must be 1111b, otherwise instructions will \#UD.

### Operation


#### (V)PTEST (128-bit version)
```java
IF (SRC[127:0] BITWISE AND DEST[127:0] = 0) 
    THEN ZF ← 1;
    ELSE ZF ← 0;
IF (SRC[127:0] BITWISE AND NOT DEST[127:0] = 0) 
    THEN CF ← 1;
    ELSE CF ← 0;
DEST (unmodified)
AF ← OF ← PF ← SF ← 0;
```
#### VPTEST (VEX.256 encoded version)
```java
IF (SRC[255:0] BITWISE AND DEST[255:0] = 0) THEN ZF ← 1;
    ELSE ZF ← 0;
IF (SRC[255:0] BITWISE AND NOT DEST[255:0] = 0) THEN CF ← 1;
    ELSE CF ← 0;
DEST (unmodified)
AF ← OF ← PF ← SF ← 0;
PTEST- Logical Compare
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
PTEST
int _mm_testz_si128 (__m128i s1, __m128i s2);
int _mm_testc_si128 (__m128i s1, __m128i s2);
int _mm_testnzc_si128 (__m128i s1, __m128i s2);
VPTEST 
int _mm256_testz_si256 (__m256i s1, __m256i s2);
int _mm256_testc_si256 (__m256i s1, __m256i s2);
int _mm256_testnzc_si256 (__m256i s1, __m256i s2);
int _mm_testz_si128 (__m128i s1, __m128i s2);
int _mm_testc_si128 (__m128i s1, __m128i s2);
int _mm_testnzc_si128 (__m128i s1, __m128i s2);
```
### Flags Affected
The 0F, AF, PF, SF flags are cleared and the ZF, CF flags are set according to the operation.

### SIMD Floating-Point Exceptions

None.

### Other Exceptions

See Exceptions Type 4; additionally
<p>#UD
If VEX.vvvv ≠ 1111B.

PTEST- Logical Compare
PTWRITE - Write Data to a Processor Trace Packet
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F3 REX.W 0F AE /4 PTWRITE r64/m64</td>
		<td>RM V/N.E</td>
		<td></td>
		<td></td>
		<td>Reads the data from r64/m64 to encode into a PTW packet if dependencies are met (see details below).</td>
	</tr>
	<tr>
		<td>F3 0F AE /4 PTWRITE r32/m32</td>
		<td>RM V/V</td>
		<td></td>
		<td></td>
		<td>Reads the data from r32/m32 to encode into a PTW packet if dependencies are met (see details below).</td>
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
		<td>RM</td>
		<td>ModRM:rm (r)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
This instruction reads data in the source operand and sends it to the Intel Processor Trace hardware to be encoded
in a PTW packet if TriggerEn, ContextEn, FilterEn, and PTWEn are all set to 1. For more details on these values, see
Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 3C, Section 35.2.2, “Software Trace
Instrumentation with PTWRITE”. The size of data is 64-bit if using REX.W in 64-bit mode, otherwise 32-bits of data
are copied from the source operand.

Note: The instruction will \#UD if prefix 66H is used.

### Operation

```java
IF (IA32_RTIT_STATUS.TriggerEn & IA32_RTIT_STATUS.ContextEn & IA32_RTIT_STATUS.FilterEn & IA32_RTIT_CTL.PTWEn) = 1
    PTW.PayloadBytes ← Encoded payload size;
    PTW.IP ← IA32_RTIT_CTL.FUPonPTW 
    IF IA32_RTIT_CTL.FUPonPTW = 1
        Insert FUP packet with IP of PTWRITE;
    FI;
FI;
```
### Flags Affected

None.

### Other Exceptions

<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS or GS segments.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF (fault-code)
For a page fault.
<p>#AC(0)
If an unaligned memory reference is made while the current privilege level is 3 and alignment
checking is enabled.
<p>#UD
If CPUID.(EAX=14H, ECX=0):EBX.PTWRITE [Bit 4] = 0.
If LOCK prefix is used.
If 66H prefix is used.

PTWRITE - Write Data to a Processor Trace Packet

### Real-Address Mode Exceptions
<p>#GP(0)
If any part of the operand lies outside of the effective address space from 0 to 0FFFFH.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#UD
If CPUID.(EAX=14H, ECX=0):EBX.PTWRITE [Bit 4] = 0.
If LOCK prefix is used.
If 66H prefix is used.

### Virtual 8086 Mode Exceptions

<p>#GP(0)
If any part of the operand lies outside of the effective address space from 0 to 0FFFFH.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF (fault-code)
For a page fault.
<p>#AC(0)
If an unaligned memory reference is made while alignment checking is enabled.
<p>#UD
If CPUID.(EAX=14H, ECX=0):EBX.PTWRITE [Bit 4] = 0.
If LOCK prefix is used.
If 66H prefix is used.

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
If CPUID.(EAX=14H, ECX=0):EBX.PTWRITE [Bit 4] = 0.
If LOCK prefix is used.
If 66H prefix is used.

PTWRITE - Write Data to a Processor Trace Packet

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
