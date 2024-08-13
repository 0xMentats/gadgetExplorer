<b>UCOMISS</b> — Unordered Compare Scalar Single-Precision Floating-Point Values and Set EFLAGS
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 2E /r UCOMISS xmm1, xmm2/m32</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE</td>
		<td>Compare low single-precision floating-point values in xmm1 and xmm2/mem32 and set the EFLAGS flags accordingly.</td>
	</tr>
	<tr>
		<td>VEX.LIG.0F.WIG 2E /r VUCOMISS xmm1, xmm2/m32</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Compare low single-precision floating-point values in xmm1 and xmm2/mem32 and set the EFLAGS flags accordingly.</td>
	</tr>
	<tr>
		<td>EVEX.LIG.0F.W0 2E /r VUCOMISS xmm1, xmm2/m32{sae}</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Compare low single-precision floating-point values in xmm1 and xmm2/mem32 and set the EFLAGS flags accordingly.</td>
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
		<td>ModRM:reg (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>B</td>
		<td>Tuple1 Scalar</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Compares the single-precision floating-point values in the low doublewords of operand 1 (first operand) and
operand 2 (second operand), and sets the ZF, PF, and CF flags in the EFLAGS register according to the result (unor-
dered, greater than, less than, or equal). The OF, SF and AF flags in the EFLAGS register are set to 0. The unor-
dered result is returned if either source operand is a NaN (QNaN or SNaN).

Operand 1 is an XMM register; operand 2 can be an XMM register or a 32 bit memory location.

The UCOMISS instruction differs from the COMISS instruction in that it signals a SIMD floating-point invalid opera-
tion exception (\#I) only if a source operand is an SNaN. The COMISS instruction signals an invalid numeric excep-
tion when a source operand is either a QNaN or SNaN.

The EFLAGS register is not updated if an unmasked SIMD floating-point exception is generated.

Note: VEX.vvvv and EVEX.vvvv are reserved and must be 1111b, otherwise instructions will \#UD.

Software should ensure VCOMISS is encoded with VEX.L=0. Encoding VCOMISS with VEX.L=1 may encounter
unpredictable behavior across different processor generations.

### Operation


#### (V)UCOMISS (all versions)
```java
RESULT ←UnorderedCompare(DEST[31:0] <> SRC[31:0]) {
(* Set EFLAGS *) CASE (RESULT) OF
    UNORDERED: ZF,PF,CF ← 111;
    GREATER_THAN: ZF,PF,CF ← 000;
    LESS_THAN: ZF,PF,CF ← 001;
    EQUAL: ZF,PF,CF ← 100;
ESAC;
OF, AF, SF ← 0; }
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
VUCOMISS
int _mm_comi_round_ss(__m128 a, __m128 b, int imm, int sae); 
UCOMISS
int _mm_ucomieq_ss(__m128 a, __m128 b);
UCOMISS 
int _mm_ucomilt_ss(__m128 a, __m128 b);
UCOMISS 
int _mm_ucomile_ss(__m128 a, __m128 b);
UCOMISS 
int _mm_ucomigt_ss(__m128 a, __m128 b);
UCOMISS 
int _mm_ucomige_ss(__m128 a, __m128 b);
UCOMISS
int _mm_ucomineq_ss(__m128 a, __m128 b);
```
### SIMD Floating-Point Exceptions
Invalid (if SNaN Operands), Denormal

### Other Exceptions

VEX-encoded instructions, see Exceptions Type 3; additionally
<p>#UD
If VEX.vvvv != 1111B.
EVEX-encoded instructions, see Exceptions Type E3NF.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
