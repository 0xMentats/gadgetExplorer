<b>PCMPISTRI</b> —  Packed Compare Implicit Length Strings, Return Index
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 3A 63 /r imm8 PCMPISTRI xmm1, xmm2/m128, imm8</td>
		<td>RM</td>
		<td>V/V</td>
		<td>SSE4_2</td>
		<td>Perform a packed comparison of string data with implicit lengths, generating an index, and storing the result in ECX.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F3A.WIG 63 /r ib VPCMPISTRI xmm1, xmm2/m128, imm8</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX</td>
		<td>Perform a packed comparison of string data with implicit lengths, generating an index, and storing the result in ECX.</td>
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
		<td>imm8</td>
		<td>NA</td>
	</tr>
</table>


### Description
The instruction compares data from two strings based on the encoded value in the Imm8 Control Byte (see Section
4.1, “Imm8 Control Byte Operation for PCMPESTRI / PCMPESTRM / PCMPISTRI / PCMPISTRM”), and generates an
index stored to ECX.

Each string is represented by a single value. The value is an xmm (or possibly m128 for the second operand) which
contains the data elements of the string (byte or word data). Each input byte/word is augmented with a
valid/invalid tag. A byte/word is considered valid only if it has a lower index than the least significant null
byte/word. (The least significant null byte/word is also considered invalid.)

The comparison and aggregation operations are performed according to the encoded value of Imm8 bit fields (see
Section 4.1). The index of the first (or last, according to imm8[6]) set bit of IntRes2 is returned in ECX. If no bits
are set in IntRes2, ECX is set to 16 (8).

Note that the Arithmetic Flags are written in a non-standard manner in order to supply the most relevant information:

* CFlag – Reset if IntRes2 is equal to zero, set otherwise
* ZFlag – Set if any byte/word of xmm2/mem128 is null, reset otherwise
* SFlag – Set if any byte/word of xmm1 is null, reset otherwise
* OFlag – IntRes2[0]
* AFlag – Reset
* PFlag – Reset

Note: In VEX.128 encoded version, VEX.vvvv is reserved and must be 1111b, VEX.L must be 0, otherwise the
instruction will \#UD.

### Effective Operand Size
<table>
	<tr>
		<td><b>Operating mode/size</b></td>
		<td><b>Operand1</b></td>
		<td><b>Operand 2</b></td>
		<td><b>Result</b></td>
	</tr>
	<tr>
		<td>16 bit</td>
		<td>xmm</td>
		<td>xmm/m128</td>
		<td>ECX</td>
	</tr>
	<tr>
		<td>32 bit</td>
		<td>xmm</td>
		<td>xmm/m128</td>
		<td>ECX</td>
	</tr>
	<tr>
		<td>64 bit</td>
		<td>xmm</td>
		<td>xmm/m128</td>
		<td>ECX</td>
	</tr>
</table>

### Intel C/C++ Compiler Intrinsic Equivalent For Returning Index
```c
int     _mm_cmpistri (__m128i a, __m128i b, const int mode);
```
### Intel C/C++ Compiler Intrinsics For Reading EFlag Results
```c
int     _mm_cmpistra (__m128i a, __m128i b, const int mode);

int     _mm_cmpistrc (__m128i a, __m128i b, const int mode);

int     _mm_cmpistro (__m128i a, __m128i b, const int mode);

int     _mm_cmpistrs (__m128i a, __m128i b, const int mode);

int     _mm_cmpistrz (__m128i a, __m128i b, const int mode);
```
### SIMD Floating-Point Exceptions

None.

### Other Exceptions

See Exceptions Type 4; additionally, this instruction does not cause <p>#GP if the memory operand is not aligned to 16
Byte boundary, and
<p>#UD
If VEX.L = 1.
If VEX.vvvv ≠ 1111B.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
