<b>VFPCLASSPD</b> — Tests Types Of a Packed Float64 Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F3A.W1 66 /r ib VFPCLASSPD k2 {k1}, xmm2/m128/m64bcst, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512DQ</td>
		<td>Tests the input for the following categories:  NaN, +0, -0, +Infinity, -Infinity, denormal, finite negative.  The immediate field provides a mask bit for each of these category tests.  The masked test results are OR-ed together to form a mask result.</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F3A.W1 66 /r ib VFPCLASSPD k2 {k1}, ymm2/m256/m64bcst, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512VL AVX512DQ</td>
		<td>Tests the input for the following categories:  NaN, +0, -0, +Infinity, -Infinity, denormal, finite negative.  The immediate field provides a mask bit for each of these category tests.  The masked test results are OR-ed together to form a mask result.</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F3A.W1 66 /r ib VFPCLASSPD k2 {k1}, zmm2/m512/m64bcst, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX512DQ</td>
		<td>Tests the input for the following categories:  NaN, +0, -0, +Infinity, -Infinity, denormal, finite negative.  The immediate field provides a mask bit for each of these category tests.  The masked test results are OR-ed together to form a mask result.</td>
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
		<td>Full</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
The FPCLASSPD instruction checks the packed double precision floating point values for special categories, specified
 by the set bits in the imm8 byte. Each set bit in imm8 specifies a category of floating-point values that the input
data element is classified against. The classified results of all specified categories of an input value are ORed
together to form the final boolean result for the input element. The result of each element is written to the corresponding
 bit in a mask register k2 according to the writemask k1. Bits [MAX_KL-1:8/4/2] of the destination are
cleared.

The classification categories specified by imm8 are shown in Figure 5-13. The classification test for each category
is listed in Table 5-13.
<table>
	<tr>
		<td colspan=10 rowspan=3><b>7 SNaN 6 5 4 3 2 1 Neg. Finite Denormal Neg. INF +INF Neg. 0 +0 0 QNaN</b></td>
	</tr>
	<tr>
		<td>SNaN</td>
		<td>Neg. Finite</td>
		<td>Denormal</td>
		<td>Neg. INF</td>
		<td>+INF</td>
		<td>Neg. 0</td>
		<td>+0</td>
		<td>QNaN</td>
	</tr>
	<tr>
	</tr>
</table>

Figure 5-13.  Imm8 Byte Specifier of Special Case FP Values for VFPCLASSPD/SD/PS/SS

Table 5-13. Classifier Operations for VFPCLASSPD/SD/PS/SS
<table>
	<tr>
		<td><b>Bits</b></td>
		<td><b>Imm8[0]</b></td>
		<td><b>Imm8[1]</b></td>
		<td><b>Imm8[2]</b></td>
		<td><b>Imm8[3]</b></td>
		<td><b>Imm8[4]</b></td>
		<td><b>Imm8[5]</b></td>
		<td><b>Imm8[6]</b></td>
		<td><b>Imm8[7]</b></td>
	</tr>
	<tr>
		<td>Category</td>
		<td>QNAN</td>
		<td>PosZero</td>
		<td>NegZero</td>
		<td>PosINF</td>
		<td>NegINF</td>
		<td>Denormal</td>
		<td>Negative</td>
		<td>SNAN</td>
	</tr>
	<tr>
		<td>Classifier</td>
		<td>Checks for QNaN</td>
		<td>Checks for +0</td>
		<td>Checks for - 0</td>
		<td>Checks for +INF</td>
		<td>Checks for - INF</td>
		<td>Checks for Denormal</td>
		<td>Checks for Negative finite</td>
		<td>Checks for SNaN</td>
	</tr>
</table>

The source operand is a ZMM/YMM/XMM register, a 512/256/128-bit memory location, or a 512/256/128-bit vector
broadcasted from a 64-bit memory location.

EVEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.

### Operation

```java
CheckFPClassDP (tsrc[63:0], imm8[7:0]){
    //* Start checking the source operand for special type *//
    NegNum  ← tsrc[63];
    IF (tsrc[62:52]=07FFh) Then ExpAllOnes ← 1; FI;
    IF (tsrc[62:52]=0h) Then ExpAllZeros ← 1;
    IF (ExpAllZeros AND MXCSR.DAZ) Then 
        MantAllZeros ← 1;
    ELSIF (tsrc[51:0]=0h) Then
        MantAllZeros ← 1;
    FI;
    ZeroNumber ← ExpAllZeros AND MantAllZeros
    SignalingBit ← tsrc[51];
    sNaN_res ← ExpAllOnes AND  NOT(MantAllZeros) AND NOT(SignalingBit); // sNaN
    qNaN_res ← ExpAllOnes AND  NOT(MantAllZeros) AND SignalingBit; // qNaN
    Pzero_res ← NOT(NegNum) AND ExpAllZeros AND MantAllZeros; // +0
    Nzero_res ← NegNum AND ExpAllZeros AND MantAllZeros; // -0
    PInf_res ← NOT(NegNum) AND ExpAllOnes AND MantAllZeros; // +Inf
    NInf_res ← NegNum AND ExpAllOnes AND MantAllZeros; // -Inf
    Denorm_res ← ExpAllZeros AND  NOT(MantAllZeros); // denorm
    FinNeg_res ← NegNum AND NOT(ExpAllOnes) AND NOT(ZeroNumber); // -finite
    bResult = ( imm8[0] AND qNaN_res ) OR (imm8[1] AND Pzero_res ) OR
            ( imm8[2] AND Nzero_res ) OR ( imm8[3] AND PInf_res ) OR
            ( imm8[4] AND NInf_res ) OR ( imm8[5] AND Denorm_res ) OR
            ( imm8[6] AND FinNeg_res ) OR ( imm8[7] AND sNaN_res );
    Return bResult;
} //* end of CheckFPClassDP() *//
```
#### VFPCLASSPD (EVEX Encoded versions)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 64
    IF k1[j] OR *no writemask*
        THEN 
            IF (EVEX.b == 1) AND (SRC *is memory*)
                THEN
                    DEST[j] ← CheckFPClassDP(SRC1[63:0], imm8[7:0]);
                ELSE 
                    DEST[j] ← CheckFPClassDP(SRC1[i+63:i], imm8[7:0]);
            FI;
        ELSE DEST[j] ← 0
                            ; zeroing-masking only
    FI;
ENDFOR
DEST[MAX_KL-1:KL] ← 0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VFPCLASSPD __mmask8 _mm512_fpclass_pd_mask( __m512d a, int c);
VFPCLASSPD __mmask8 _mm512_mask_fpclass_pd_mask( __mmask8 m, __m512d a, int c)
VFPCLASSPD __mmask8 _mm256_fpclass_pd_mask( __m256d a, int c)
VFPCLASSPD __mmask8 _mm256_mask_fpclass_pd_mask( __mmask8 m, __m256d a, int c)
VFPCLASSPD __mmask8 _mm_fpclass_pd_mask( __m128d a, int c)
VFPCLASSPD __mmask8 _mm_mask_fpclass_pd_mask( __mmask8 m, __m128d a, int c)
```
### SIMD Floating-Point Exceptions
None

### Other Exceptions

See Exceptions Type E4
<p>#UD
If EVEX.vvvv != 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
