<b>KMOVW / KMOVB / KMOVQ / KMOVD</b> — Move from and to Mask Registers
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>VEX.L0.0F.W0 90 /r KMOVW k1, k2/m16</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move 16 bits mask from k2/m16 and store the result in k1.</td>
	</tr>
	<tr>
		<td>VEX.L0.66.0F.W0 90 /r KMOVB k1, k2/m8</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512DQ</td>
		<td>Move 8 bits mask from k2/m8 and store the result in k1.</td>
	</tr>
	<tr>
		<td>VEX.L0.0F.W1 90 /r KMOVQ k1, k2/m64</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Move 64 bits mask from k2/m64 and store the result in k1.</td>
	</tr>
	<tr>
		<td>VEX.L0.66.0F.W1 90 /r KMOVD k1, k2/m32</td>
		<td>RM</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Move 32 bits mask from k2/m32 and store the result in k1.</td>
	</tr>
	<tr>
		<td>VEX.L0.0F.W0 91 /r KMOVW m16, k1</td>
		<td>MR</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move 16 bits mask from k1 and store the result in m16.</td>
	</tr>
	<tr>
		<td>VEX.L0.66.0F.W0 91 /r KMOVB m8, k1</td>
		<td>MR</td>
		<td>V/V</td>
		<td>AVX512DQ</td>
		<td>Move 8 bits mask from k1 and store the result in m8.</td>
	</tr>
	<tr>
		<td>VEX.L0.0F.W1 91 /r KMOVQ m64, k1</td>
		<td>MR</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Move 64 bits mask from k1 and store the result in m64.</td>
	</tr>
	<tr>
		<td>VEX.L0.66.0F.W1 91 /r KMOVD m32, k1</td>
		<td>MR</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Move 32 bits mask from k1 and store the result in m32.</td>
	</tr>
	<tr>
		<td>VEX.L0.0F.W0 92 /r KMOVW k1, r32</td>
		<td>RR</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move 16 bits mask from r32 to k1.</td>
	</tr>
	<tr>
		<td>VEX.L0.66.0F.W0 92 /r KMOVB k1, r32</td>
		<td>RR</td>
		<td>V/V</td>
		<td>AVX512DQ</td>
		<td>Move 8 bits mask from r32 to k1.</td>
	</tr>
	<tr>
		<td>VEX.L0.F2.0F.W1 92 /r KMOVQ k1, r64</td>
		<td>RR</td>
		<td>V/I</td>
		<td>AVX512BW</td>
		<td>Move 64 bits mask from r64 to k1.</td>
	</tr>
	<tr>
		<td>VEX.L0.F2.0F.W0 92 /r KMOVD k1, r32</td>
		<td>RR</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Move 32 bits mask from r32 to k1.</td>
	</tr>
	<tr>
		<td>VEX.L0.0F.W0 93 /r KMOVW r32, k1</td>
		<td>RR</td>
		<td>V/V</td>
		<td>AVX512F</td>
		<td>Move 16 bits mask from k1 to r32.</td>
	</tr>
	<tr>
		<td>VEX.L0.66.0F.W0 93 /r KMOVB r32, k1</td>
		<td>RR</td>
		<td>V/V</td>
		<td>AVX512DQ</td>
		<td>Move 8 bits mask from k1 to r32.</td>
	</tr>
	<tr>
		<td>VEX.L0.F2.0F.W1 93 /r KMOVQ r64, k1</td>
		<td>RR</td>
		<td>V/I</td>
		<td>AVX512BW</td>
		<td>Move 64 bits mask from k1 to r64.</td>
	</tr>
	<tr>
		<td>VEX.L0.F2.0F.W0 93 /r KMOVD r32, k1</td>
		<td>RR</td>
		<td>V/V</td>
		<td>AVX512BW</td>
		<td>Move 32 bits mask from k1 to r32.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand 2</b></td>
	</tr>
	<tr>
		<td>RM</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
	</tr>
	<tr>
		<td>MR</td>
		<td>ModRM:r/m (w, ModRM:[7:6] must not be 11b)</td>
		<td>ModRM:reg (r)</td>
	</tr>
	<tr>
		<td>RR</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r, ModRM:[7:6] must be 11b)</td>
	</tr>
</table>


### Description
Copies values from the source operand (second operand) to the destination operand (first operand). The source
and destination operands can be mask registers, memory location or general purpose. The instruction cannot be
used to transfer data between general purpose registers and or memory locations.

When moving to a mask register, the result is zero extended to MAX_KL size (i.e., 64 bits currently). When moving
to a general-purpose register (GPR), the result is zero-extended to the size of the destination. In 32-bit mode, the
default GPR destination’s size is 32 bits. In 64-bit mode, the default GPR destination’s size is 64 bits. Note that
VEX.W can only be used to modify the size of the GPR operand in 64b mode.

### Operation


#### KMOVW
```java
IF *destination is a memory location*
    DEST[15:0] ← SRC[15:0]
IF *destination is a mask register or a GPR *
    DEST ← ZeroExtension(SRC[15:0])
```
#### KMOVB
```java
IF *destination is a memory location*
    DEST[7:0] ← SRC[7:0]
IF *destination is a mask register or a GPR *
    DEST ← ZeroExtension(SRC[7:0])
```
#### KMOVQ
```java
IF *destination is a memory location or a GPR*
    DEST[63:0] ← SRC[63:0]
IF *destination is a mask register*
    DEST ← ZeroExtension(SRC[63:0])
```
#### KMOVD
```java
IF *destination is a memory location*
    DEST[31:0] ← SRC[31:0]
IF *destination is a mask register or a GPR *
    DEST ← ZeroExtension(SRC[31:0])
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
KMOVW __mmask16 _mm512_kmov(__mmask16 a);
```
### Flags Affected
None

### SIMD Floating-Point Exceptions

None

### Other Exceptions

Instructions with RR operand encoding See Exceptions Type K20.
Instructions with RM or MR operand encoding See Exceptions Type K21.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
