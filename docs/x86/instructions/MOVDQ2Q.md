<b>MOVDQ2Q</b> — Move Quadword from XMM to MMX Technology Register
<table>
	<tr>
		<td><b>Opcode/Instruction</b></td>
		<td><b></b></td>
		<td><b>Op/ En</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F3 0F D6 /r MOVDQ2Q mm, xmm </td>
		<td></td>
		<td>RM</td>
		<td>SSE</td>
		<td>Move low quadword from xmm to mmx register.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En RM Operand 1 ModRM:reg (w) Operand 2 ModRM:r/m (r) Operand 3 NA Operand 4 NA</b></td>
	</tr>
</table>


### Description
Moves the low quadword from the source operand (second operand) to the destination operand (first operand). The
source operand is an XMM register and the destination operand is an MMX technology register.

This instruction causes a transition from x87 FPU to MMX technology operation (that is, the x87 FPU top-of-stack
pointer is set to 0 and the x87 FPU tag word is set to all 0s [valid]). If this instruction is executed while an x87 FPU
floating-point exception is pending, the exception is handled before the MOVDQ2Q instruction is executed.

In 64-bit mode, use of the REX.R prefix permits this instruction to access additional registers (XMM8-XMM15).

### Operation

```java
DEST ← SRC[63:0];
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
MOVDQ2Q:
__m64 _mm_movepi64_pi64 ( __m128i a)
```
### SIMD Floating-Point Exceptions

None.

### Protected Mode Exceptions

<p>#NM
If CR0.TS[bit 3] = 1.
<p>#UD
If CR0.EM[bit 2] = 1.
If CR4.OSFXSR[bit 9] = 0.
If CPUID.01H:EDX.SSE2[bit 26] = 0.
If the LOCK prefix is used.
<p>#MF
If there is a pending x87 FPU exception.

### Real-Address Mode Exceptions

Same exceptions as in protected mode.

### Virtual-8086 Mode Exceptions

Same exceptions as in protected mode.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

Same exceptions as in protected mode.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
