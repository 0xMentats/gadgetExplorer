<b>PCMPESTRM</b> —  Packed Compare Explicit Length Strings, Return Mask
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F 3A 60 /r imm8 PCMPESTRM xmm1, xmm2/m128, imm8</td>
		<td>RMI V/V</td>
		<td></td>
		<td>SSE4_2</td>
		<td>Perform a packed comparison of string data with explicit lengths, generating a mask, and storing the result in XMM0.</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F3A 60 /r ib VPCMPESTRM xmm1, xmm2/m128, imm8</td>
		<td>RMI V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Perform a packed comparison of string data with explicit lengths, generating a mask, and storing the result in XMM0.</td>
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
		<td>ModRM:reg (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8</td>
		<td>NA</td>
	</tr>
</table>


### Description
The instruction compares data from two string fragments based on the encoded value in the imm8 contol byte (see
Section 4.1, “Imm8 Control Byte Operation for PCMPESTRI / PCMPESTRM / PCMPISTRI / PCMPISTRM”), and gener-
ates a mask stored to XMM0.

Each string fragment is represented by two values. The first value is an xmm (or possibly m128 for the second
operand) which contains the data elements of the string (byte or word data). The second value is stored in an input
length register. The input length register is EAX/RAX (for xmm1) or EDX/RDX (for xmm2/m128). The length repre-
sents the number of bytes/words which are valid for the respective xmm/m128 data.

The length of each input is interpreted as being the absolute-value of the value in the length register. The absolute-
value computation saturates to 16 (for bytes) and 8 (for words), based on the value of imm8[bit3] when the value
in the length register is greater than 16 (8) or less than -16 (-8).

The comparison and aggregation operations are performed according to the encoded value of Imm8 bit fields (see
Section 4.1). As defined by imm8[6], IntRes2 is then either stored to the least significant bits of XMM0 (zero
extended to 128 bits) or expanded into a byte/word-mask and then stored to XMM0.

Note that the Arithmetic Flags are written in a non-standard manner in order to supply the most relevant informa-
tion:

CFlag – Reset if IntRes2 is equal to zero, set otherwise
ZFlag – Set if absolute-value of EDX is < 16 (8), reset otherwise
SFlag – Set if absolute-value of EAX is < 16 (8), reset otherwise
OFlag –IntRes2[0]
AFlag – Reset
PFlag – Reset

Note: In VEX.128 encoded versions, bits (MAXVL-1:128) of XMM0 are zeroed. VEX.vvvv is reserved and must be
1111b, VEX.L must be 0, otherwise the instruction will \#UD.
Effective Operand Size
<table>
	<tr>
		<td><b>Operating mode/size</b></td>
		<td><b>Operand1</b></td>
		<td><b>Operand 2</b></td>
		<td><b>Length1</b></td>
		<td><b>Length2</b></td>
		<td><b>Result</b></td>
	</tr>
	<tr>
		<td>16 bit</td>
		<td>xmm</td>
		<td>xmm/m128</td>
		<td>EAX</td>
		<td>EDX</td>
		<td>XMM0</td>
	</tr>
	<tr>
		<td>32 bit</td>
		<td>xmm</td>
		<td>xmm/m128</td>
		<td>EAX</td>
		<td>EDX</td>
		<td>XMM0</td>
	</tr>
	<tr>
		<td>64 bit</td>
		<td>xmm</td>
		<td>xmm/m128</td>
		<td>EAX</td>
		<td>EDX</td>
		<td>XMM0</td>
	</tr>
	<tr>
		<td>64 bit + REX.W</td>
		<td>xmm</td>
		<td>xmm/m128</td>
		<td>RAX</td>
		<td>RDX</td>
		<td>XMM0</td>
	</tr>
</table>

Intel C/C++ Compiler Intrinsic Equivalent For Returning Mask

__m128i _mm_cmpestrm (__m128i a, int la, __m128i b, int lb, const int mode);

Intel C/C++ Compiler Intrinsics For Reading EFlag Results

int     _mm_cmpestra (__m128i a, int la, __m128i b, int lb, const int mode);

int     _mm_cmpestrc (__m128i a, int la, __m128i b, int lb, const int mode);

int     _mm_cmpestro (__m128i a, int la, __m128i b, int lb, const int mode);

int     _mm_cmpestrs (__m128i a, int la, __m128i b, int lb, const int mode);

int     _mm_cmpestrz (__m128i a, int la, __m128i b, int lb, const int mode);

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