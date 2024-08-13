<b>CMPPD</b> — Compare Packed Double-Precision Floating-Point Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F C2 /r ib CMPPD xmm1, xmm2/m128, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Compare packed double-precision floating-point values in xmm2/m128 and xmm1 using bits 2:0 of imm8 as a comparison predicate.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F.WIG C2 /r ib VCMPPD xmm1, xmm2, xmm3/m128, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Compare packed double-precision floating-point values in xmm3/m128 and xmm2 using bits 4:0 of imm8 as a comparison predicate.</td>
	</tr>
	<tr>
		<td>VEX.NDS.256.66.0F.WIG C2 /r ib VCMPPD ymm1, ymm2, ymm3/m256, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Compare packed double-precision floating-point values in ymm3/m256 and ymm2 using bits 4:0 of imm8 as a comparison predicate.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.128.66.0F.W1 C2 /r ib VCMPPD k1 {k2}, xmm2, xmm3/m128/m64bcst, imm8</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Compare packed double-precision floating-point values in xmm3/m128/m64bcst and xmm2 using bits 4:0 of imm8 as a comparison predicate with writemask k2 and leave the result in mask register k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.256.66.0F.W1 C2 /r ib VCMPPD k1 {k2}, ymm2, ymm3/m256/m64bcst, imm8</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL AVX512F</td>
		<td>Compare packed double-precision floating-point values in ymm3/m256/m64bcst and ymm2 using bits 4:0 of imm8 as a comparison predicate with writemask k2 and leave the result in mask register k1.</td>
	</tr>
	<tr>
		<td>EVEX.NDS.512.66.0F.W1 C2 /r ib VCMPPD k1 {k2}, zmm2, zmm3/m512/m64bcst{sae}, imm8</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Compare packed double-precision floating-point values in zmm3/m512/m64bcst and zmm2 using bits 4:0 of imm8 as a comparison predicate with writemask k2 and leave the result in mask register k1.</td>
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
		<td>Full</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv</td>
		<td>ModRM:r/m (r)</td>
		<td>Imm8</td>
	</tr>
</table>


### Description
Performs a SIMD compare of the packed double-precision floating-point values in the second source operand and
the first source operand and returns the results of the comparison to the destination operand. The comparison
predicate operand (immediate byte) specifies the type of comparison performed on each pair of packed values in
the two source operands.

EVEX encoded versions: The first source operand (second operand) is a ZMM/YMM/XMM register. The second
source operand can be a ZMM/YMM/XMM register, a 512/256/128-bit memory location or a 512/256/128-bit vector
broadcasted from a 64-bit memory location. The destination operand (first operand) is an opmask register.
Comparison results are written to the destination operand under the writemask k2. Each comparison result is a
single mask bit of 1 (comparison true) or 0 (comparison false).

VEX.256 encoded version: The first source operand (second operand) is a YMM register. The second source
operand (third operand) can be a YMM register or a 256-bit memory location. The destination operand (first
operand) is a YMM register. Four comparisons are performed with results written to the destination operand. The
result of each comparison is a quadword mask of all 1s (comparison true) or all 0s (comparison false).

128-bit Legacy SSE version: The first source and destination operand (first operand) is an XMM register. The
second source operand (second operand) can be an XMM register or 128-bit memory location. Bits (MAXVL-1:128)
of the corresponding ZMM destination register remain unchanged. Two comparisons are performed with results
written to bits 127:0 of the destination operand. The result of each comparison is a quadword mask of all 1s
(comparison true) or all 0s (comparison false).
VEX.128 encoded version: The first source operand (second operand) is an XMM register. The second source
operand (third operand) can be an XMM register or a 128-bit memory location. Bits (MAXVL-1:128) of the destination
 ZMM register are zeroed. Two comparisons are performed with results written to bits 127:0 of the destination
operand.

The comparison predicate operand is an 8-bit immediate:

 * For instructions encoded using the VEX or EVEX prefix, bits 4:0 define the type of comparison to be performed
(see Table 3-1). Bits 5 through 7 of the immediate are reserved.

 * For instruction encodings that do not use VEX prefix, bits 2:0 define the type of comparison to be made (see the
first 8 rows of Table 3-1). Bits 3 through 7 of the immediate are reserved.

Table 3-1. Comparison Predicate for CMPPD and CMPPS Instructions
<table>
	<tr>
		<td rowspan=2><b>Predicate</b></td>
		<td rowspan=2><b>imm8 Value</b></td>
		<td rowspan=2><b>Description</b></td>
		<td colspan=4><b>Result: A Is 1st Operand, B Is 2nd Operand Signals</b></td>
		<td rowspan=2><b>#IA on QNAN</b></td>
	</tr>
	<tr>
		<td>A > B</td>
		<td>A < B</td>
		<td>A = B</td>
		<td>Unordered<sup>1</sup></td>
	</tr>
	<tr>
		<td>EQ_OQ (EQ)</td>
		<td>0H</td>
		<td>Equal (ordered, non-signaling)</td>
		<td>False</td>
		<td>False</td>
		<td>True</td>
		<td>False</td>
		<td>No</td>
	</tr>
	<tr>
		<td>LT_OS (LT)</td>
		<td>1H</td>
		<td>Less-than (ordered, signaling)</td>
		<td>False</td>
		<td>True</td>
		<td>False</td>
		<td>False</td>
		<td>Yes</td>
	</tr>
	<tr>
		<td>LE_OS (LE)</td>
		<td>2H</td>
		<td>Less-than-or-equal (ordered, signaling)</td>
		<td>False</td>
		<td>True</td>
		<td>True</td>
		<td>False</td>
		<td>Yes</td>
	</tr>
	<tr>
		<td>UNORD_Q (UNORD) 3H</td>
		<td></td>
		<td>Unordered (non-signaling)</td>
		<td>False</td>
		<td>False</td>
		<td>False</td>
		<td>True</td>
		<td>No</td>
	</tr>
	<tr>
		<td>NEQ_UQ (NEQ)</td>
		<td>4H</td>
		<td>Not-equal (unordered, non-signaling)</td>
		<td>True</td>
		<td>True</td>
		<td>False</td>
		<td>True</td>
		<td>No</td>
	</tr>
	<tr>
		<td>NLT_US (NLT)</td>
		<td>5H</td>
		<td>Not-less-than (unordered, signaling)</td>
		<td>True</td>
		<td>False</td>
		<td>True</td>
		<td>True</td>
		<td>Yes</td>
	</tr>
	<tr>
		<td>NLE_US (NLE)</td>
		<td>6H</td>
		<td>Not-less-than-or-equal (unordered, signaling) True</td>
		<td></td>
		<td>False</td>
		<td>False</td>
		<td>True</td>
		<td>Yes</td>
	</tr>
	<tr>
		<td>ORD_Q (ORD)</td>
		<td>7H</td>
		<td>Ordered (non-signaling)</td>
		<td>True</td>
		<td>True</td>
		<td>True</td>
		<td>False</td>
		<td>No</td>
	</tr>
	<tr>
		<td>EQ_UQ</td>
		<td>8H</td>
		<td>Equal (unordered, non-signaling)</td>
		<td>False</td>
		<td>False</td>
		<td>True</td>
		<td>True</td>
		<td>No</td>
	</tr>
	<tr>
		<td>NGE_US (NGE)</td>
		<td>9H</td>
		<td>Not-greater-than-or-equal (unordered, signaling)</td>
		<td>False</td>
		<td>True</td>
		<td>False</td>
		<td>True</td>
		<td>Yes</td>
	</tr>
	<tr>
		<td>NGT_US (NGT)</td>
		<td>AH</td>
		<td>Not-greater-than (unordered, signaling)</td>
		<td>False</td>
		<td>True</td>
		<td>True</td>
		<td>True</td>
		<td>Yes</td>
	</tr>
	<tr>
		<td>FALSE_OQ(FALSE)</td>
		<td>BH</td>
		<td>False (ordered, non-signaling)</td>
		<td>False</td>
		<td>False</td>
		<td>False</td>
		<td>False</td>
		<td>No</td>
	</tr>
	<tr>
		<td>NEQ_OQ</td>
		<td>CH</td>
		<td>Not-equal (ordered, non-signaling)</td>
		<td>True</td>
		<td>True</td>
		<td>False</td>
		<td>False</td>
		<td>No</td>
	</tr>
	<tr>
		<td>GE_OS (GE)</td>
		<td>DH</td>
		<td>Greater-than-or-equal (ordered, signaling)</td>
		<td>True</td>
		<td>False</td>
		<td>True</td>
		<td>False</td>
		<td>Yes</td>
	</tr>
	<tr>
		<td>GT_OS (GT)</td>
		<td>EH</td>
		<td>Greater-than (ordered, signaling)</td>
		<td>True</td>
		<td>False</td>
		<td>False</td>
		<td>False</td>
		<td>Yes</td>
	</tr>
	<tr>
		<td>TRUE_UQ(TRUE)</td>
		<td>FH</td>
		<td>True (unordered, non-signaling)</td>
		<td>True</td>
		<td>True</td>
		<td>True</td>
		<td>True</td>
		<td>No</td>
	</tr>
	<tr>
		<td>EQ_OS</td>
		<td>10H</td>
		<td>Equal (ordered, signaling)</td>
		<td>False</td>
		<td>False</td>
		<td>True</td>
		<td>False</td>
		<td>Yes</td>
	</tr>
	<tr>
		<td>LT_OQ</td>
		<td>11H</td>
		<td>Less-than (ordered, non-signaling)</td>
		<td>False</td>
		<td>True</td>
		<td>False</td>
		<td>False</td>
		<td>No</td>
	</tr>
	<tr>
		<td>LE_OQ</td>
		<td>12H</td>
		<td>Less-than-or-equal (ordered, non-signaling)</td>
		<td>False</td>
		<td>True</td>
		<td>True</td>
		<td>False</td>
		<td>No</td>
	</tr>
	<tr>
		<td>UNORD_S</td>
		<td>13H</td>
		<td>Unordered (signaling)</td>
		<td>False</td>
		<td>False</td>
		<td>False</td>
		<td>True</td>
		<td>Yes</td>
	</tr>
	<tr>
		<td>NEQ_US</td>
		<td>14H</td>
		<td>Not-equal (unordered, signaling)</td>
		<td>True</td>
		<td>True</td>
		<td>False</td>
		<td>True</td>
		<td>Yes</td>
	</tr>
	<tr>
		<td>NLT_UQ</td>
		<td>15H</td>
		<td>Not-less-than (unordered, non-signaling)</td>
		<td>True</td>
		<td>False</td>
		<td>True</td>
		<td>True</td>
		<td>No</td>
	</tr>
	<tr>
		<td>NLE_UQ</td>
		<td>16H</td>
		<td>Not-less-than-or-equal (unordered, non-signaling)</td>
		<td>True</td>
		<td>False</td>
		<td>False</td>
		<td>True</td>
		<td>No</td>
	</tr>
	<tr>
		<td>ORD_S</td>
		<td>17H</td>
		<td>Ordered (signaling)</td>
		<td>True</td>
		<td>True</td>
		<td>True</td>
		<td>False</td>
		<td>Yes</td>
	</tr>
	<tr>
		<td>EQ_US</td>
		<td>18H</td>
		<td>Equal (unordered, signaling)</td>
		<td>False</td>
		<td>False</td>
		<td>True</td>
		<td>True</td>
		<td>Yes</td>
	</tr>
	<tr>
		<td>NGE_UQ</td>
		<td>19H</td>
		<td>Not-greater-than-or-equal (unordered, non-signaling)</td>
		<td>False</td>
		<td>True</td>
		<td>False</td>
		<td>True</td>
		<td>No</td>
	</tr>
</table>

Table 3-1. Comparison Predicate for CMPPD and CMPPS Instructions  (Contd.)
<table>
	<tr>
		<td rowspan=2><b>Predicate</b></td>
		<td rowspan=2><b>imm8 Value</b></td>
		<td rowspan=2><b>Description</b></td>
		<td colspan=4><b>Result: A Is 1st Operand, B Is 2nd Operand Signals</b></td>
		<td rowspan=2><b>#IA on QNAN</b></td>
	</tr>
	<tr>
		<td>A > B</td>
		<td>A < B</td>
		<td>A = B</td>
		<td>Unordered<sup>1</sup></td>
	</tr>
	<tr>
		<td>NGT_UQ</td>
		<td>1AH</td>
		<td>Not-greater-than (unordered, non-signaling)</td>
		<td>False</td>
		<td>True</td>
		<td>True</td>
		<td>True</td>
		<td>No</td>
	</tr>
	<tr>
		<td>FALSE_OS</td>
		<td>1BH</td>
		<td>False (ordered, signaling)</td>
		<td>False</td>
		<td>False</td>
		<td>False</td>
		<td>False</td>
		<td>Yes</td>
	</tr>
	<tr>
		<td>NEQ_OS</td>
		<td>1CH</td>
		<td>Not-equal (ordered, signaling)</td>
		<td>True</td>
		<td>True</td>
		<td>False</td>
		<td>False</td>
		<td>Yes</td>
	</tr>
	<tr>
		<td>GE_OQ</td>
		<td>1DH</td>
		<td>Greater-than-or-equal (ordered, non-signaling)</td>
		<td>True</td>
		<td>False</td>
		<td>True</td>
		<td>False</td>
		<td>No</td>
	</tr>
	<tr>
		<td>GT_OQ</td>
		<td>1EH</td>
		<td>Greater-than (ordered, non-signaling)</td>
		<td>True</td>
		<td>False</td>
		<td>False</td>
		<td>False</td>
		<td>No</td>
	</tr>
	<tr>
		<td>TRUE_US</td>
		<td>1FH</td>
		<td>True (unordered, signaling)</td>
		<td>True</td>
		<td>True</td>
		<td>True</td>
		<td>True</td>
		<td>Yes</td>
	</tr>
</table>

NOTES:
1. If either operand A or B is a NAN.

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
CMPPD instruction, for processors with “CPUID.1H:ECX.AVX =0”. See Table 3-2. Compiler should treat reserved
Imm8 values as illegal syntax.

Table 3-2. Pseudo-Op and CMPPD Implementation:
<table>
	<tr>
		<td><b>Pseudo-Op</b></td>
		<td><b>CMPPD Implementation</b></td>
	</tr>
	<tr>
		<td>CMPEQPD xmm1, xmm2</td>
		<td>CMPPD xmm1, xmm2, 0</td>
	</tr>
	<tr>
		<td>CMPLTPD xmm1, xmm2</td>
		<td>CMPPD xmm1, xmm2, 1</td>
	</tr>
	<tr>
		<td>CMPLEPD xmm1, xmm2</td>
		<td>CMPPD xmm1, xmm2, 2</td>
	</tr>
	<tr>
		<td>CMPUNORDPD xmm1, xmm2</td>
		<td>CMPPD xmm1, xmm2, 3</td>
	</tr>
	<tr>
		<td>CMPNEQPD xmm1, xmm2</td>
		<td>CMPPD xmm1, xmm2, 4</td>
	</tr>
	<tr>
		<td>CMPNLTPD xmm1, xmm2</td>
		<td>CMPPD xmm1, xmm2, 5</td>
	</tr>
	<tr>
		<td>CMPNLEPD xmm1, xmm2</td>
		<td>CMPPD xmm1, xmm2, 6</td>
	</tr>
	<tr>
		<td>CMPORDPD xmm1, xmm2</td>
		<td>CMPPD xmm1, xmm2, 7</td>
	</tr>
</table>

The greater-than relations that the processor does not implement require more than one instruction to emulate in
software and therefore should not be implemented as pseudo-ops. (For these, the programmer should reverse the
operands of the corresponding less than relations and use move instructions to ensure that the mask is moved to
the correct destination register and that the source operand is left intact.)

Processors with “CPUID.1H:ECX.AVX =1” implement the full complement of 32 predicates shown in Table 3-3, software emulation is no longer needed. Compilers and assemblers may implement the following three-operand
pseudo-ops in addition to the four-operand VCMPPD instruction. See Table 3-3, where the notations of reg1 reg2,
and reg3 represent either XMM registers or YMM registers. Compiler should treat reserved Imm8 values as illegal
syntax. Alternately, intrinsics can map the pseudo-ops to pre-defined constants to support a simpler intrinsic interface. Compilers and assemblers may implement three-operand pseudo-ops for EVEX encoded VCMPPD instructions
in a similar fashion by extending the syntax listed in Table 3-3.

Table 3-3. Pseudo-Op and VCMPPD Implementation:
<table>
	<tr>
		<td><b>Pseudo-Op</b></td>
		<td><b>CMPPD Implementation</b></td>
	</tr>
	<tr>
		<td>VCMPEQPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 0</td>
	</tr>
	<tr>
		<td>VCMPLTPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 1</td>
	</tr>
	<tr>
		<td>VCMPLEPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 2</td>
	</tr>
	<tr>
		<td>VCMPUNORDPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 3</td>
	</tr>
	<tr>
		<td>VCMPNEQPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 4</td>
	</tr>
	<tr>
		<td>VCMPNLTPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 5</td>
	</tr>
	<tr>
		<td>VCMPNLEPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 6</td>
	</tr>
	<tr>
		<td>VCMPORDPD reg1, reg2, reg3 VCMPEQ_UQPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 7 VCMPPD reg1, reg2, reg3, 8</td>
	</tr>
	<tr>
		<td>VCMPNGEPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 9</td>
	</tr>
	<tr>
		<td>VCMPNGTPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 0AH</td>
	</tr>
	<tr>
		<td>VCMPFALSEPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 0BH</td>
	</tr>
	<tr>
		<td>VCMPNEQ_OQPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 0CH</td>
	</tr>
	<tr>
		<td>VCMPGEPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 0DH</td>
	</tr>
	<tr>
		<td>VCMPGTPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 0EH</td>
	</tr>
	<tr>
		<td>VCMPTRUEPD reg1, reg2, reg3 VCMPEQ_OSPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 0FH VCMPPD reg1, reg2, reg3, 10H</td>
	</tr>
	<tr>
		<td>VCMPLT_OQPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 11H</td>
	</tr>
	<tr>
		<td>VCMPLE_OQPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 12H</td>
	</tr>
	<tr>
		<td>VCMPUNORD_SPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 13H</td>
	</tr>
	<tr>
		<td>VCMPNEQ_USPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 14H</td>
	</tr>
	<tr>
		<td>VCMPNLT_UQPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 15H</td>
	</tr>
	<tr>
		<td>VCMPNLE_UQPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 16H</td>
	</tr>
	<tr>
		<td>VCMPORD_SPD reg1, reg2, reg3 VCMPEQ_USPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 17H VCMPPD reg1, reg2, reg3, 18H</td>
	</tr>
	<tr>
		<td>VCMPNGE_UQPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 19H</td>
	</tr>
	<tr>
		<td>VCMPNGT_UQPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 1AH</td>
	</tr>
	<tr>
		<td>VCMPFALSE_OSPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 1BH</td>
	</tr>
	<tr>
		<td>VCMPNEQ_OSPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 1CH</td>
	</tr>
	<tr>
		<td>VCMPGE_OQPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 1DH</td>
	</tr>
	<tr>
		<td>VCMPGT_OQPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 1EH</td>
	</tr>
	<tr>
		<td>VCMPTRUE_USPD reg1, reg2, reg3</td>
		<td>VCMPPD reg1, reg2, reg3, 1FH</td>
	</tr>
</table>


### Operation

```java
CASE (COMPARISON PREDICATE) OF
0: OP3 ← EQ_OQ; OP5 ← EQ_OQ;
    1: OP3 ← LT_OS; OP5 ← LT_OS;
    2: OP3 ← LE_OS; OP5 ← LE_OS;
    3: OP3 ← UNORD_Q; OP5 ← UNORD_Q;
    4: OP3 ← NEQ_UQ; OP5 ← NEQ_UQ;
    5: OP3 ← NLT_US; OP5 ← NLT_US;
    6: OP3 ← NLE_US; OP5 ← NLE_US;
    7: OP3 ← ORD_Q; OP5 ← ORD_Q;
    8: OP5 ← EQ_UQ;
    9: OP5 ← NGE_US;
    10: OP5 ← NGT_US;
    11: OP5 ← FALSE_OQ;
    12: OP5 ← NEQ_OQ;
    13: OP5 ← GE_OS;
    14: OP5 ← GT_OS;
    15: OP5 ← TRUE_UQ;
    16: OP5 ← EQ_OS;
    17: OP5 ← LT_OQ;
    18: OP5 ← LE_OQ;
    19: OP5 ← UNORD_S;
    20: OP5 ← NEQ_US;
    21: OP5 ← NLT_UQ;
    22: OP5 ← NLE_UQ;
    23: OP5 ← ORD_S;
    24: OP5 ← EQ_US;
    25: OP5 ← NGE_UQ;
    26: OP5 ← NGT_UQ;
    27: OP5 ← FALSE_OS;
    28: OP5 ← NEQ_OS;
    29: OP5 ← GE_OQ;
    30: OP5 ← GT_OQ;
    31: OP5 ← TRUE_US;
    DEFAULT: Reserved;
ESAC;
```
#### VCMPPD (EVEX encoded versions)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1
    i ← j * 64
    IF k2[j] OR *no writemask*
        THEN 
            IF (EVEX.b = 1) AND (SRC2 *is memory*)
                THEN
                    CMP ← SRC1[i+63:i] OP5 SRC2[63:0]
                ELSE 
                    CMP ← SRC1[i+63:i] OP5 SRC2[i+63:i]
            FI;
            IF CMP = TRUE
                THEN DEST[j] ← 1;
                ELSE DEST[j] ← 0; FI;
        ELSE 
                DEST[j] ← 0 
                            ; zeroing-masking only
    FI;
ENDFOR
DEST[MAX_KL-1:KL] ← 0
```
#### VCMPPD (VEX.256 encoded version)
```java
CMP0 ← SRC1[63:0] OP5 SRC2[63:0];
CMP1 ← SRC1[127:64] OP5 SRC2[127:64];
CMP2 ← SRC1[191:128] OP5 SRC2[191:128];
CMP3 ← SRC1[255:192] OP5 SRC2[255:192];
IF CMP0 = TRUE
    THEN DEST[63:0] ← FFFFFFFFFFFFFFFFH;
    ELSE DEST[63:0] ← 0000000000000000H; FI;
IF CMP1 = TRUE
    THEN DEST[127:64] ← FFFFFFFFFFFFFFFFH;
    ELSE DEST[127:64] ← 0000000000000000H; FI;
IF CMP2 = TRUE
    THEN DEST[191:128] ← FFFFFFFFFFFFFFFFH;
    ELSE DEST[191:128] ← 0000000000000000H; FI;
IF CMP3 = TRUE
    THEN DEST[255:192] ← FFFFFFFFFFFFFFFFH;
    ELSE DEST[255:192] ← 0000000000000000H; FI;
DEST[MAXVL-1:256] ← 0
```
#### VCMPPD (VEX.128 encoded version)
```java
CMP0 ← SRC1[63:0] OP5 SRC2[63:0];
CMP1 ← SRC1[127:64] OP5 SRC2[127:64];
IF CMP0 = TRUE
    THEN DEST[63:0] ← FFFFFFFFFFFFFFFFH;
    ELSE DEST[63:0] ← 0000000000000000H; FI;
IF CMP1 = TRUE
    THEN DEST[127:64] ← FFFFFFFFFFFFFFFFH;
    ELSE DEST[127:64] ← 0000000000000000H; FI;
DEST[MAXVL-1:128] ← 0
```
#### CMPPD (128-bit Legacy SSE version)
```java
CMP0 ← SRC1[63:0] OP3 SRC2[63:0];
CMP1 ← SRC1[127:64] OP3 SRC2[127:64];
IF CMP0 = TRUE
    THEN DEST[63:0] ← FFFFFFFFFFFFFFFFH;
    ELSE DEST[63:0] ← 0000000000000000H; FI;
IF CMP1 = TRUE
    THEN DEST[127:64] ← FFFFFFFFFFFFFFFFH;
    ELSE DEST[127:64] ← 0000000000000000H; FI;
DEST[MAXVL-1:128] (Unmodified)
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VCMPPD __mmask8 _mm512_cmp_pd_mask( __m512d a, __m512d b, int imm);
VCMPPD __mmask8 _mm512_cmp_round_pd_mask( __m512d a, __m512d b, int imm, int sae);
VCMPPD __mmask8 _mm512_mask_cmp_pd_mask( __mmask8 k1, __m512d a, __m512d b, int imm);
VCMPPD __mmask8 _mm512_mask_cmp_round_pd_mask( __mmask8 k1, __m512d a, __m512d b, int imm, int sae);
VCMPPD __mmask8 _mm256_cmp_pd_mask( __m256d a, __m256d b, int imm);
VCMPPD __mmask8 _mm256_mask_cmp_pd_mask( __mmask8 k1, __m256d a, __m256d b, int imm);
VCMPPD __mmask8 _mm_cmp_pd_mask( __m128d a, __m128d b, int imm);
VCMPPD __mmask8 _mm_mask_cmp_pd_mask( __mmask8 k1, __m128d a, __m128d b, int imm);
VCMPPD __m256 _mm256_cmp_pd(__m256d a, __m256d b, int imm)
(V)CMPPD __m128 _mm_cmp_pd(__m128d a, __m128d b, int imm)
```
### SIMD Floating-Point Exceptions
Invalid if SNaN operand and invalid if QNaN and predicate as listed in Table 3-1.

Denormal

### Other Exceptions

VEX-encoded instructions, see Exceptions Type 2.
EVEX-encoded instructions, see Exceptions Type E2.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
