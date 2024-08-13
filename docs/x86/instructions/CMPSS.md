<b>CMPSS</b> — Compare Scalar Single-Precision Floating-Point Value
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F3 0F C2 /r ib CMPSS xmm1, xmm2/m32, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Compare low single-precision floating-point value in xmm2/m32 and xmm1 using bits 2:0 of imm8 as comparison predicate.</td>
	</tr>
	<tr>
		<td>VEX.NDS.LIG.F3.0F.WIG C2 /r ib VCMPSS xmm1, xmm2, xmm3/m32, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Compare low single-precision floating-point value in xmm3/m32 and xmm2 using bits 4:0 of imm8 as comparison predicate.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.LIG.F3.0F.W0 C2 /r ib VCMPSS k1 {k2}, xmm2, xmm3/m32{sae}, imm8</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Compare low single-precision floating-point value in xmm3/m32 and xmm2 using bits 4:0 of imm8 as comparison predicate with writemask k2 and leave the result in mask register k1.</td>
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
		<td>ModRM:reg (r, w)</td>
		<td>ModRM:r/m (r)</td>
		<td>Imm8</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>B</td>
		<td>NA</td>
		<td>ModRM:reg (w)</td>
		<td>VEX.vvvv</td>
		<td>ModRM:r/m (r)</td>
		<td>Imm8</td>
	</tr>
	<tr>
		<td>C</td>
		<td>Tuple1 Scalar</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv</td>
		<td>ModRM:r/m (r)</td>
		<td>Imm8</td>
	</tr>
</table>


### Description
Compares the low single-precision floating-point values in the second source operand and the first source operand
and returns the results of the comparison to the destination operand. The comparison predicate operand (imme-
diate operand) specifies the type of comparison performed.

128-bit Legacy SSE version: The first source and destination operand (first operand) is an XMM register. The
second source operand (second operand) can be an XMM register or 32-bit memory location. Bits (MAXVL-1:32) of
the corresponding YMM destination register remain unchanged. The comparison result is a doubleword mask of all
1s (comparison true) or all 0s (comparison false).

VEX.128 encoded version: The first source operand (second operand) is an XMM register. The second source
operand (third operand) can be an XMM register or a 32-bit memory location. The result is stored in the low 32 bits
of the destination operand; bits 128:32 of the destination operand are copied from the first source operand. Bits
(MAXVL-1:128) of the destination ZMM register are zeroed. The comparison result is a doubleword mask of all 1s
(comparison true) or all 0s (comparison false).

EVEX encoded version: The first source operand (second operand) is an XMM register. The second source operand
can be a XMM register or a 32-bit memory location. The destination operand (first operand) is an opmask register.
The comparison result is a single mask bit of 1 (comparison true) or 0 (comparison false), written to the destination
starting from the LSB according to the writemask k2. Bits (MAX_KL-1:128) of the destination register are cleared.

The comparison predicate operand is an 8-bit immediate:

 * For instructions encoded using the VEX prefix, bits 4:0 define the type of comparison to be performed (see
Table 3-1). Bits 5 through 7 of the immediate are reserved.

 * For instruction encodings that do not use VEX prefix, bits 2:0 define the type of comparison to be made (see
the first 8 rows of Table 3-1). Bits 3 through 7 of the immediate are reserved.

The unordered relationship is true when at least one of the two source operands being compared is a NaN; the
ordered relationship is true when neither source operand is a NaN.

A subsequent computational instruction that uses the mask result in the destination operand as an input operand
will not generate an exception, because a mask of all 0s corresponds to a floating-point value of +0.0 and a mask
of all 1s corresponds to a QNaN.

Note that processors with “CPUID.1H:ECX.AVX =0” do not implement the “greater-than”, “greater-than-or-equal”,
“not-greater than”, and “not-greater-than-or-equal relations” predicates. These comparisons can be made either
by using the inverse relationship (that is, use the “not-less-than-or-equal” to make a “greater-than” comparison)
or by using software emulation. When using software emulation, the program must swap the operands (copying
registers when necessary to protect the data that will now be in the destination), and then perform the compare
using a different predicate. The predicate to be used for these emulations is listed in the first 8 rows of Table 3-7
(Intel 64 and IA-32 Architectures Software Developer’s Manual Volume 2A) under the heading Emulation.

Compilers and assemblers may implement the following two-operand pseudo-ops in addition to the three-operand
CMPSS instruction, for processors with “CPUID.1H:ECX.AVX =0”. See Table 3-8. Compiler should treat reserved
Imm8 values as illegal syntax.

Table 3-8. Pseudo-Op and CMPSS Implementation
:
<table>
	<tr>
		<td><b>Pseudo-Op</b></td>
		<td><b>CMPSS Implementation</b></td>
	</tr>
	<tr>
		<td>CMPEQSS xmm1, xmm2</td>
		<td>CMPSS xmm1, xmm2, 0</td>
	</tr>
	<tr>
		<td>CMPLTSS xmm1, xmm2</td>
		<td>CMPSS xmm1, xmm2, 1</td>
	</tr>
	<tr>
		<td>CMPLESS xmm1, xmm2</td>
		<td>CMPSS xmm1, xmm2, 2</td>
	</tr>
	<tr>
		<td>CMPUNORDSS xmm1, xmm2</td>
		<td>CMPSS xmm1, xmm2, 3</td>
	</tr>
	<tr>
		<td>CMPNEQSS xmm1, xmm2</td>
		<td>CMPSS xmm1, xmm2, 4</td>
	</tr>
	<tr>
		<td>CMPNLTSS xmm1, xmm2</td>
		<td>CMPSS xmm1, xmm2, 5</td>
	</tr>
	<tr>
		<td>CMPNLESS xmm1, xmm2</td>
		<td>CMPSS xmm1, xmm2, 6</td>
	</tr>
	<tr>
		<td>CMPORDSS xmm1, xmm2</td>
		<td>CMPSS xmm1, xmm2, 7</td>
	</tr>
</table>

The greater-than relations that the processor does not implement require more than one instruction to emulate in
software and therefore should not be implemented as pseudo-ops. (For these, the programmer should reverse the
operands of the corresponding less than relations and use move instructions to ensure that the mask is moved to
the correct destination register and that the source operand is left intact.)

Processors with “CPUID.1H:ECX.AVX =1” implement the full complement of 32 predicates shown in Table 3-7, soft-
ware emulation is no longer needed. Compilers and assemblers may implement the following three-operand
pseudo-ops in addition to the four-operand VCMPSS instruction. See Table 3-9, where the notations of reg1 reg2,
and reg3 represent either XMM registers or YMM registers. Compiler should treat reserved Imm8 values as illegal
syntax. Alternately, intrinsics can map the pseudo-ops to pre-defined constants to support a simpler intrinsic inter-
face. Compilers and assemblers may implement three-operand pseudo-ops for EVEX encoded VCMPSS instructions
in a similar fashion by extending the syntax listed in Table 3-9.

Table 3-9. Pseudo-Op and VCMPSS Implementation
:
<table>
	<tr>
		<td><b>Pseudo-Op</b></td>
		<td><b>CMPSS Implementation</b></td>
	</tr>
	<tr>
		<td>VCMPEQSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 0</td>
	</tr>
	<tr>
		<td>VCMPLTSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 1</td>
	</tr>
	<tr>
		<td>VCMPLESS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 2</td>
	</tr>
	<tr>
		<td>VCMPUNORDSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 3</td>
	</tr>
	<tr>
		<td>VCMPNEQSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 4</td>
	</tr>
	<tr>
		<td>VCMPNLTSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 5</td>
	</tr>
	<tr>
		<td>VCMPNLESS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 6</td>
	</tr>
	<tr>
		<td>VCMPORDSS reg1, reg2, reg3 VCMPEQ_UQSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 7 VCMPSS reg1, reg2, reg3, 8</td>
	</tr>
	<tr>
		<td>VCMPNGESS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 9</td>
	</tr>
	<tr>
		<td>VCMPNGTSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 0AH</td>
	</tr>
	<tr>
		<td>VCMPFALSESS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 0BH</td>
	</tr>
	<tr>
		<td>VCMPNEQ_OQSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 0CH</td>
	</tr>
	<tr>
		<td>VCMPGESS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 0DH</td>
	</tr>
</table>

Table 3-9. Pseudo-Op and VCMPSS Implementation
<table>
	<tr>
		<td><b>Pseudo-Op</b></td>
		<td><b>CMPSS Implementation</b></td>
	</tr>
	<tr>
		<td>VCMPGTSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 0EH</td>
	</tr>
	<tr>
		<td>VCMPTRUESS reg1, reg2, reg3 VCMPEQ_OSSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 0FH VCMPSS reg1, reg2, reg3, 10H</td>
	</tr>
	<tr>
		<td>VCMPLT_OQSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 11H</td>
	</tr>
	<tr>
		<td>VCMPLE_OQSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 12H</td>
	</tr>
	<tr>
		<td>VCMPUNORD_SSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 13H</td>
	</tr>
	<tr>
		<td>VCMPNEQ_USSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 14H</td>
	</tr>
	<tr>
		<td>VCMPNLT_UQSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 15H</td>
	</tr>
	<tr>
		<td>VCMPNLE_UQSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 16H</td>
	</tr>
	<tr>
		<td>VCMPORD_SSS reg1, reg2, reg3 VCMPEQ_USSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 17H VCMPSS reg1, reg2, reg3, 18H</td>
	</tr>
	<tr>
		<td>VCMPNGE_UQSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 19H</td>
	</tr>
	<tr>
		<td>VCMPNGT_UQSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 1AH</td>
	</tr>
	<tr>
		<td>VCMPFALSE_OSSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 1BH</td>
	</tr>
	<tr>
		<td>VCMPNEQ_OSSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 1CH</td>
	</tr>
	<tr>
		<td>VCMPGE_OQSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 1DH</td>
	</tr>
	<tr>
		<td>VCMPGT_OQSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 1EH</td>
	</tr>
	<tr>
		<td>VCMPTRUE_USSS reg1, reg2, reg3</td>
		<td>VCMPSS reg1, reg2, reg3, 1FH</td>
	</tr>
</table>

Software should ensure VCMPSS is encoded with VEX.L=0. Encoding VCMPSS with VEX.L=1 may encounter 
unpredictable behavior across different processor generations.

### Operation

```java
CASE (COMPARISON PREDICATE) OF
    0: OP3 ←EQ_OQ; OP5 ←EQ_OQ;
    1: OP3 ←LT_OS; OP5 ←LT_OS;
    2: OP3 ←LE_OS; OP5 ←LE_OS;
    3: OP3 ←UNORD_Q; OP5 ←UNORD_Q;
    4: OP3 ←NEQ_UQ; OP5 ←NEQ_UQ;
    5: OP3 ←NLT_US; OP5 ←NLT_US;
    6: OP3 ←NLE_US; OP5 ←NLE_US;
    7: OP3 ←ORD_Q; OP5 ←ORD_Q;
    8: OP5 ←EQ_UQ;
    9: OP5 ←NGE_US;
    10: OP5 ←NGT_US;
    11: OP5 ←FALSE_OQ;
    12: OP5 ←NEQ_OQ;
    13: OP5 ←GE_OS;
    14: OP5 ←GT_OS;
    15: OP5 ←TRUE_UQ;
    16: OP5 ←EQ_OS;
    17: OP5 ←LT_OQ;
    18: OP5 ←LE_OQ;
    19: OP5 ←UNORD_S;
    20: OP5 ←NEQ_US;
    21: OP5 ←NLT_UQ;
    22: OP5 ←NLE_UQ;
    23: OP5 ←ORD_S;
    24: OP5 ←EQ_US;
    25: OP5 ←NGE_UQ;
    26: OP5 ←NGT_UQ;
    27: OP5 ←FALSE_OS;
    28: OP5 ←NEQ_OS;
    29: OP5 ←GE_OQ;
    30: OP5 ←GT_OQ;
    31: OP5 ←TRUE_US;
    DEFAULT: Reserved
ESAC;
```
#### VCMPSS (EVEX encoded version)
```java
CMP0 ← SRC1[31:0] OP5 SRC2[31:0];
IF k2[0] or *no writemask*
    THEN
            IF CMP0 = TRUE
                THEN DEST[0] ← 1;
                ELSE DEST[0] ← 0; FI;
    ELSE 
            DEST[0] ← 0
                            ; zeroing-masking only
FI;
DEST[MAX_KL-1:1] ← 0
```
#### CMPSS (128-bit Legacy SSE version)
```java
CMP0 ←DEST[31:0] OP3 SRC[31:0];
IF CMP0 = TRUE
THEN DEST[31:0] ←FFFFFFFFH;
ELSE DEST[31:0] ←00000000H; FI;
DEST[MAXVL-1:32] (Unmodified)
```
#### VCMPSS (VEX.128 encoded version)
```java
CMP0 ←SRC1[31:0] OP5 SRC2[31:0];
IF CMP0 = TRUE
THEN DEST[31:0] ←FFFFFFFFH;
ELSE DEST[31:0] ←00000000H; FI;
DEST[127:32] ←SRC1[127:32]
DEST[MAXVL-1:128] ←0
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VCMPSS __mmask8 _mm_cmp_ss_mask( __m128 a, __m128 b, int imm);
VCMPSS __mmask8 _mm_cmp_round_ss_mask( __m128 a, __m128 b, int imm, int sae);
VCMPSS __mmask8 _mm_mask_cmp_ss_mask( __mmask8 k1, __m128 a, __m128 b, int imm);
VCMPSS __mmask8 _mm_mask_cmp_round_ss_mask( __mmask8 k1, __m128 a, __m128 b, int imm, int sae);
(V)CMPSS __m128 _mm_cmp_ss(__m128 a, __m128 b, const int imm)
```
### SIMD Floating-Point Exceptions
Invalid if SNaN operand, Invalid if QNaN and predicate as listed in Table 3-1, Denormal.

### Other Exceptions

VEX-encoded instructions, see Exceptions Type 3.
EVEX-encoded instructions, see Exceptions Type E3.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
