<b>LDDQU</b> — Load Unaligned Integer 128 Bits
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32-bit Mode</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>F2 0F F0 /r LDDQU xmm1, mem</td>
		<td>RM V/V</td>
		<td></td>
		<td>SSE3</td>
		<td>Load unaligned data from mem and return double quadword in xmm1.</td>
	</tr>
	<tr>
		<td>VEX.128.F2.0F.WIG F0 /r VLDDQU xmm1, m128</td>
		<td>RM V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Load unaligned packed integer values from mem to xmm1.</td>
	</tr>
	<tr>
		<td>VEX.256.F2.0F.WIG F0 /r VLDDQU ymm1, m256</td>
		<td>RM V/V</td>
		<td></td>
		<td>AVX</td>
		<td>Load unaligned packed integer values from mem to ymm1.</td>
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
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
The instruction is functionally similar to (V)MOVDQU ymm/xmm, m256/m128 for loading from memory. That is:
32/16 bytes of data starting at an address specified by the source memory operand (second operand) are fetched
from memory and placed in a destination register (first operand). The source operand need not be aligned on a
32/16-byte boundary. Up to 64/32 bytes may be loaded from memory; this is implementation dependent.

This instruction may improve performance relative to (V)MOVDQU if the source operand crosses a cache line
boundary. In situations that require the data loaded by (V)LDDQU be modified and stored to the same location, use
(V)MOVDQU or (V)MOVDQA instead of (V)LDDQU. To move a double quadword to or from memory locations that
are known to be aligned on 16-byte boundaries, use the (V)MOVDQA instruction.

Implementation Notes

 * If the source is aligned to a 32/16-byte boundary, based on the implementation, the 32/16 bytes may be
loaded more than once. For that reason, the usage of (V)LDDQU should be avoided when using uncached or
write-combining (WC) memory regions. For uncached or WC memory regions, keep using (V)MOVDQU.

 * This instruction is a replacement for (V)MOVDQU (load) in situations where cache line splits significantly affect
performance. It should not be used in situations where store-load forwarding is performance critical. If
performance of store-load forwarding is critical to the application, use (V)MOVDQA store-load pairs when data
is 256/128-bit aligned or (V)MOVDQU store-load pairs when data is 256/128-bit unaligned.

 * If the memory address is not aligned on 32/16-byte boundary, some implementations may load up to 64/32
bytes and return 32/16 bytes in the destination. Some processor implementations may issue multiple loads to
access the appropriate 32/16 bytes. Developers of multi-threaded or multi-processor software should be aware
that on these processors the loads will be performed in a non-atomic way.

 * If alignment checking is enabled (CR0.AM = 1, RFLAGS.AC = 1, and CPL = 3), an alignment-check exception
(\#AC) may or may not be generated (depending on processor implementation) when the memory address is
not aligned on an 8-byte boundary.

In 64-bit mode, use of the REX.R prefix permits this instruction to access additional registers (XMM8-XMM15).

Note: In VEX-encoded versions, VEX.vvvv is reserved and must be 1111b otherwise instructions will \#UD.

### Operation


#### LDDQU (128-bit Legacy SSE version)
```java
DEST[127:0] ← SRC[127:0]
DEST[MAXVL-1:128] (Unmodified)
```
#### VLDDQU (VEX.128 encoded version)
```java
DEST[127:0] ← SRC[127:0]
DEST[MAXVL-1:128] ← 0
```
#### VLDDQU (VEX.256 encoded version)
```java
DEST[255:0] ← SRC[255:0]
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
LDDQU:
__m128i _mm_lddqu_si128 (__m128i * p);
VLDDQU: __m256i _mm256_lddqu_si256 (__m256i * p);
```
### Numeric Exceptions
None

### Other Exceptions

See Exceptions Type 4;
Note treatment of <p>#AC varies.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
