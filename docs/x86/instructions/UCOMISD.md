<b>UCOMISD</b> — Unordered Compare Scalar Double-Precision Floating-Point Values and Set EFLAGS
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 2E /r UCOMISD xmm1, xmm2/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>SSE2</td>
		<td>Compare low double-precision floating-point values in xmm1 and xmm2/mem64 and set the EFLAGS flags accordingly.</td>
	</tr>
	<tr>
		<td>VEX.LIG.66.0F.WIG 2E /r VUCOMISD xmm1, xmm2/m64</td>
		<td>A</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Compare low double-precision floating-point values in xmm1 and xmm2/mem64 and set the EFLAGS flags accordingly.</td>
	</tr>
	<tr>
		<td>EVEX.LIG.66.0F.W1 2E /r VUCOMISD xmm1, xmm2/m64{sae}</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Compare low double-precision floating-point values in xmm1 and xmm2/m64 and set the EFLAGS flags accordingly.</td>
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
Performs an unordered compare of the double-precision floating-point values in the low quadwords of operand 1
(first operand) and operand 2 (second operand), and sets the ZF, PF, and CF flags in the EFLAGS register according
to the result (unordered, greater than, less than, or equal). The OF, SF and AF flags in the EFLAGS register are set
to 0. The unordered result is returned if either source operand is a NaN (QNaN or SNaN).

Operand 1 is an XMM register; operand 2 can be an XMM register or a 64 bit memory

location.

The UCOMISD instruction differs from the COMISD instruction in that it signals a SIMD floating-point invalid oper-
ation exception (\#I) only when a source operand is an SNaN. The COMISD instruction signals an invalid numeric
exception only if a source operand is either an SNaN or a QNaN.

The EFLAGS register is not updated if an unmasked SIMD floating-point exception is generated.

Note: VEX.vvvv and EVEX.vvvv are reserved and must be 1111b, otherwise instructions will \#UD.

Software should ensure VCOMISD is encoded with VEX.L=0. Encoding VCOMISD with VEX.L=1 may encounter
unpredictable behavior across different processor generations.

### Operation


#### (V)UCOMISD (all versions)
```java
RESULT ←UnorderedCompare(DEST[63:0] <> SRC[63:0]) {
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
VUCOMISD int _mm_comi_round_sd(__m128d a, __m128d b, int imm, int sae); 
UCOMISD int _mm_ucomieq_sd(__m128d a, __m128d b)
UCOMISD int _mm_ucomilt_sd(__m128d a, __m128d b)
UCOMISD int _mm_ucomile_sd(__m128d a, __m128d b)
UCOMISD int _mm_ucomigt_sd(__m128d a, __m128d b)
UCOMISD int _mm_ucomige_sd(__m128d a, __m128d b)
UCOMISD int _mm_ucomineq_sd(__m128d a, __m128d b)
```
### SIMD Floating-Point Exceptions
Invalid (if SNaN operands), Denormal

### Other Exceptions

VEX-encoded instructions, see Exceptions Type 3; additionally
<p>#UD
If VEX.vvvv != 1111B.
EVEX-encoded instructions, see Exceptions Type E3NF.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
