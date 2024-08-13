<b>DPPD</b> —  Dot Product of Packed Double Precision Floating-Point Values
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32-bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 3A 41 /r ib DPPD xmm1, xmm2/m128, imm8</td>
		<td>RMI</td>
		<td>V/V</td>
		<td>SSE4_1</td>
		<td>Selectively multiply packed DP floating-point values from xmm1 with packed DP floating- point values from xmm2, add and selectively store the packed DP floating-point values to xmm1.</td>
	</tr>
	<tr>
		<td>VEX.NDS.128.66.0F3A.WIG 41 /r ib VDPPD xmm1,xmm2, xmm3/m128, imm8</td>
		<td>RVMI V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Selectively multiply packed DP floating-point values from xmm2 with packed DP floating- point values from xmm3, add and selectively store the packed DP floating-point values to xmm1.</td>
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
		<td>RMI</td>
		<td>ModRM:reg (r, w)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>RVMI</td>
		<td>ModRM:reg (w)</td>
		<td>VEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8</td>
	</tr>
</table>


### Description
Conditionally multiplies the packed double-precision floating-point values in the destination operand (first operand)
with the packed double-precision floating-point values in the source (second operand) depending on a mask
extracted from bits [5:4] of the immediate operand (third operand). If a condition mask bit is zero, the corresponding
 multiplication is replaced by a value of 0.0 in the manner described by Section 12.8.4 of Intel® 64 and
IA-32 Architectures Software Developer’s Manual, Volume 1.

The two resulting double-precision values are summed into an intermediate result. The intermediate result is
conditionally broadcasted to the destination using a broadcast mask specified by bits [1:0] of the immediate byte.

If a broadcast mask bit is “1”, the intermediate result is copied to the corresponding qword element in the destination
 operand. If a broadcast mask bit is zero, the corresponding element in the destination is set to zero.

DPPD follows the NaN forwarding rules stated in the Software Developer’s Manual, vol. 1, table 4.7. These rules do
not cover horizontal prioritization of NaNs. Horizontal propagation of NaNs to the destination and the positioning of
those NaNs in the destination is implementation dependent. NaNs on the input sources or computationally gener-
ated NaNs will have at least one NaN propagated to the destination.

128-bit Legacy SSE version: The second source can be an XMM register or an 128-bit memory location. The destination
 is not distinct from the first source XMM register and the upper bits (MAXVL-1:128) of the corresponding
YMM register destination are unmodified.

VEX.128 encoded version: the first source operand is an XMM register or 128-bit memory location. The destination
operand is an XMM register. The upper bits (MAXVL-1:128) of the corresponding YMM register destination are
zeroed.

If VDPPD is encoded with VEX.L= 1, an attempt to execute the instruction encoded with VEX.L= 1 will cause an
\#UD exception.

### Operation


#### DP_primitive (SRC1, SRC2)
```java
IF (imm8[4] = 1) 
    THEN Temp1[63:0] ← DEST[63:0] * SRC[63:0]; // update SIMD exception flags
    ELSE Temp1[63:0] ← +0.0; FI;
IF (imm8[5] = 1) 
    THEN Temp1[127:64] ← DEST[127:64] * SRC[127:64]; // update SIMD exception flags
    ELSE Temp1[127:64] ← +0.0; FI;
/* if unmasked exception reported, execute exception handler*/
Temp2[63:0] ← Temp1[63:0] + Temp1[127:64]; // update SIMD exception flags
/* if unmasked exception reported, execute exception handler*/
IF (imm8[0] = 1) 
    THEN DEST[63:0] ← Temp2[63:0];
    ELSE DEST[63:0] ← +0.0; FI;
IF (imm8[1] = 1) 
    THEN DEST[127:64] ← Temp2[63:0];
    ELSE DEST[127:64] ← +0.0; FI;
```
#### DPPD (128-bit Legacy SSE version)
```java
DEST[127:0]←DP_Primitive(SRC1[127:0], SRC2[127:0]);
DEST[MAXVL-1:128] (Unmodified)
```
#### VDPPD (VEX.128 encoded version)
```java
DEST[127:0]←DP_Primitive(SRC1[127:0], SRC2[127:0]);
DEST[MAXVL-1:128] ← 0
```
### Flags Affected
None

### Intel C/C++ Compiler Intrinsic Equivalent
```c
DPPD:
__m128d _mm_dp_pd ( __m128d a, __m128d b, const int mask);
```
### SIMD Floating-Point Exceptions

Overflow, Underflow, Invalid, Precision, Denormal

Exceptions are determined separately for each add and multiply operation. Unmasked exceptions will leave the
destination untouched.

### Other Exceptions

See Exceptions Type 2; additionally
<p>#UD
If VEX.L= 1.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
