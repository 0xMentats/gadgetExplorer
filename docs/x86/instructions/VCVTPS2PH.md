<b>VCVTPS2PH</b> — Convert Single-Precision FP value to 16-bit FP value
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.128.66.0F3A.W0 1D /r ib VCVTPS2PH xmm1/m64, xmm2, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>F16C</td>
		<td>Convert four packed single-precision floating-point values in xmm2 to packed half-precision (16-bit) floating-point values in xmm1/m64. Imm8 provides rounding controls.</td>
	</tr>
	<tr>
		<td>VEX.256.66.0F3A.W0 1D /r ib VCVTPS2PH xmm1/m128, ymm2, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>F16C</td>
		<td>Convert eight packed single-precision floating-point values in ymm2 to packed half-precision (16-bit) floating-point values in xmm1/m128. Imm8 provides rounding controls.</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F3A.W0 1D /r ib VCVTPS2PH xmm1/m64 {k1}{z}, xmm2, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Convert four packed single-precision floating-point values in xmm2 to packed half-precision (16-bit) floating-point values in xmm1/m64. Imm8 provides rounding controls.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F3A.W0 1D /r ib VCVTPS2PH xmm1/m128 {k1}{z}, ymm2, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Convert eight packed single-precision floating-point values in ymm2 to packed half-precision (16-bit) floating-point values in xmm1/m128. Imm8 provides rounding controls.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F3A.W0 1D /r ib VCVTPS2PH ymm1/m256 {k1}{z}, zmm2{sae}, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Convert sixteen packed single-precision floating-point values in zmm2 to packed half-precision (16-bit) floating- point values in ymm1/m256. Imm8 provides rounding controls.</td>
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
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>Imm8</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>B</td>
		<td>Half Mem</td>
		<td>ModRM:r/m (w)</td>
		<td>ModRM:reg (r)</td>
		<td>Imm8</td>
		<td>NA</td>
	</tr>
</table>


### Description
Convert packed single-precision floating values in the source operand to half-precision (16-bit) floating-point
values and store to the destination operand. The rounding mode is specified using the immediate field (imm8).

Underflow results (i.e., tiny results) are converted to denormals. MXCSR.FTZ is ignored. If a source element is
denormal relative to the input format with DM masked and at least one of PM or UM unmasked; a SIMD exception
will be raised with DE, UE and PE set.
<table>
	<tr>
		<td><b>127                              96 VCVTPS2PH xmm1/mem64, xmm2,  imm8 95                                64 63                                32 VS3 convert VS2 convert VS1 convert 31                                  0 VS0 xmm2 convert 127                              96 95                                64 63           48 47           32 31           16 15             0 VH3 VH2 VH1 VH0 xmm1/mem64</b></td>
	</tr>
</table>

Figure 5-7.  VCVTPS2PH (128-bit Version)

The immediate byte defines several bit fields that control rounding operation. The effect and encoding of the RC
field are listed in Table 5-12.
Table 5-12. Immediate Byte Encoding for 16-bit Floating-Point Conversion Instructions
<table>
	<tr>
		<td><b>Bits</b></td>
		<td><b>Field Name/value</b></td>
		<td><b>Description</b></td>
		<td><b>Comment</b></td>
	</tr>
	<tr>
		<td rowspan=4>Imm[1:0]</td>
		<td>RC=00B</td>
		<td>Round to nearest even</td>
		<td rowspan=4>If Imm[2] = 0</td>
	</tr>
	<tr>
		<td>RC=01B</td>
		<td>Round down</td>
	</tr>
	<tr>
		<td>RC=10B</td>
		<td>Round up</td>
	</tr>
	<tr>
		<td>RC=11B</td>
		<td>Truncate</td>
	</tr>
	<tr>
		<td rowspan=2>Imm[2]</td>
		<td>MS1=0</td>
		<td>Use imm[1:0] for rounding</td>
		<td>Ignore MXCSR.RC</td>
	</tr>
	<tr>
		<td>MS1=1</td>
		<td>Use MXCSR.RC for rounding</td>
		<td></td>
	</tr>
	<tr>
		<td>Imm[7:3]</td>
		<td>Ignored</td>
		<td>Ignored by processor</td>
		<td></td>
	</tr>
</table>

VEX.128 version: The source operand is a XMM register. The destination operand is a XMM register or 64-bit
memory location. If the destination operand is a register then the upper bits (MAXVL-1:64) of corresponding
register are zeroed.

VEX.256 version: The source operand is a YMM register. The destination operand is a XMM register or 128-bit
memory location. If the destination operand is a register, the upper bits (MAXVL-1:128) of the corresponding destination
 register are zeroed.

Note: VEX.vvvv and EVEX.vvvv are reserved (must be 1111b).

EVEX encoded versions: The source operand is a ZMM/YMM/XMM register. The destination operand is a
YMM/XMM/XMM (low 64-bits) register or a 256/128/64-bit memory location, conditionally updated with writemask
k1. Bits (MAXVL-1:256/128/64) of the corresponding destination register are zeroed.

### Operation

```java
vCvt_s2h(SRC1[31:0])
{
IF Imm[2] = 0
THEN 
        ; using Imm[1:0] for rounding control, see Table 5-12
    RETURN Cvt_Single_Precision_To_Half_Precision_FP_Imm(SRC1[31:0]);
ELSE 
        ; using MXCSR.RC for rounding control
    RETURN Cvt_Single_Precision_To_Half_Precision_FP_Mxcsr(SRC1[31:0]);
FI;
}
```
#### VCVTPS2PH (EVEX encoded versions) when dest is a register
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
FOR j ← 0 TO KL-1
    i ← j * 16
    k ← j * 32
    IF k1[j] OR *no writemask*
        THEN DEST[i+15:i] ←
            vCvt_s2h(SRC[k+31:k])
        ELSE 
            IF *merging-masking*
                            ; merging-masking
                THEN *DEST[i+15:i] remains unchanged*
                ELSE 
                            ; zeroing-masking
                    DEST[i+15:i] ← 0
            FI
    FI;
ENDFOR
DEST[MAXVL-1:VL/2] ← 0
```
#### VCVTPS2PH (EVEX encoded versions) when dest is memory
```java
(KL, VL) = (4, 128), (8, 256), (16, 512)
FOR j ← 0 TO KL-1
    i ← j * 16
    k ← j * 32
    IF k1[j] OR *no writemask*
        THEN DEST[i+15:i] ←
            vCvt_s2h(SRC[k+31:k])
        ELSE 
            *DEST[i+15:i] remains unchanged*
                            ; merging-masking
    FI;
ENDFOR
```
#### VCVTPS2PH (VEX.256 encoded version)
```java
DEST[15:0] ←vCvt_s2h(SRC1[31:0]);
DEST[31:16] ←vCvt_s2h(SRC1[63:32]);
DEST[47:32] ←vCvt_s2h(SRC1[95:64]);
DEST[63:48] ←vCvt_s2h(SRC1[127:96]);
DEST[79:64] ←vCvt_s2h(SRC1[159:128]);
DEST[95:80] ←vCvt_s2h(SRC1[191:160]);
DEST[111:96] ←vCvt_s2h(SRC1[223:192]);
DEST[127:112] ←vCvt_s2h(SRC1[255:224]);
DEST[MAXVL-1:128] ← 0
```
#### VCVTPS2PH (VEX.128 encoded version)
```java
DEST[15:0] ←vCvt_s2h(SRC1[31:0]);
DEST[31:16] ←vCvt_s2h(SRC1[63:32]);
DEST[47:32] ←vCvt_s2h(SRC1[95:64]);
DEST[63:48] ←vCvt_s2h(SRC1[127:96]);
DEST[MAXVL-1:64] ← 0
```
### Flags Affected
None

### Intel C/C++ Compiler Intrinsic Equivalent
```c
VCVTPS2PH __m256i _mm512_cvtps_ph(__m512 a);
VCVTPS2PH __m256i _mm512_mask_cvtps_ph(__m256i s, __mmask16 k,__m512 a);
VCVTPS2PH __m256i _mm512_maskz_cvtps_ph(__mmask16 k,__m512 a);
VCVTPS2PH __m256i _mm512_cvt_roundps_ph(__m512 a, const int imm);
VCVTPS2PH __m256i _mm512_mask_cvt_roundps_ph(__m256i s, __mmask16 k,__m512 a, const int imm);
VCVTPS2PH __m256i _mm512_maskz_cvt_roundps_ph(__mmask16 k,__m512 a, const int imm);
VCVTPS2PH __m128i _mm256_mask_cvtps_ph(__m128i s, __mmask8 k,__m256 a);
VCVTPS2PH __m128i _mm256_maskz_cvtps_ph(__mmask8 k,__m256 a);
VCVTPS2PH __m128i _mm_mask_cvtps_ph(__m128i s, __mmask8 k,__m128 a);
VCVTPS2PH __m128i _mm_maskz_cvtps_ph(__mmask8 k,__m128 a);
VCVTPS2PH __m128i _mm_cvtps_ph ( __m128 m1, const int imm);
VCVTPS2PH __m128i _mm256_cvtps_ph(__m256 m1, const int imm);
```
### SIMD Floating-Point Exceptions

Invalid, Underflow, Overflow, Precision, Denormal (if MXCSR.DAZ=0);

### Other Exceptions
VEX-encoded instructions, see Exceptions Type 11 (do not report <p>#AC);

EVEX-encoded instructions, see Exceptions Type E11.
<p>#UD
If VEX.W=1.
<p>#UD
If VEX.vvvv != 1111B or EVEX.vvvv != 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
