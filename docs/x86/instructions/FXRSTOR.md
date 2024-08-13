<b>FXRSTOR</b> — Restore x87 FPU, MMX, XMM, and MXCSR State
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F AE /1 FXRSTOR m512byte</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Restore the x87 FPU, MMX, XMM, and MXCSR register state from m512byte.</td>
	</tr>
	<tr>
		<td>NP REX.W + 0F AE /1 FXRSTOR64 m512byte</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Restore the x87 FPU, MMX, XMM, and MXCSR register state from m512byte.</td>
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
		<td>M</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Reloads the x87 FPU, MMX technology, XMM, and MXCSR registers from the 512-byte memory image specified in
the source operand. This data should have been written to memory previously using the FXSAVE instruction, and in
the same format as required by the operating modes. The first byte of the data should be located on a 16-byte
boundary. There are three distinct layouts of the FXSAVE state map: one for legacy and compatibility mode, a
second format for 64-bit mode FXSAVE/FXRSTOR with REX.W=0, and the third format is for 64-bit mode with
FXSAVE64/FXRSTOR64. Table 3-43 shows the layout of the legacy/compatibility mode state information in memory
and describes the fields in the memory image for the FXRSTOR and FXSAVE instructions. Table 3-46 shows the
layout of the 64-bit mode state information when REX.W is set (FXSAVE64/FXRSTOR64). Table 3-47 shows the
layout of the 64-bit mode state information when REX.W is clear (FXSAVE/FXRSTOR).

The state image referenced with an FXRSTOR instruction must have been saved using an FXSAVE instruction or be
in the same format as required by Table 3-43, Table 3-46, or Table 3-47. Referencing a state image saved with an
FSAVE, FNSAVE instruction or incompatible field layout will result in an incorrect state restoration.

The FXRSTOR instruction does not flush pending x87 FPU exceptions. To check and raise exceptions when loading
x87 FPU state information with the FXRSTOR instruction, use an FWAIT instruction after the FXRSTOR instruction.

If the OSFXSR bit in control register CR4 is not set, the FXRSTOR instruction may not restore the states of the XMM
and MXCSR registers. This behavior is implementation dependent.

If the MXCSR state contains an unmasked exception with a corresponding status flag also set, loading the register
with the FXRSTOR instruction will not result in a SIMD floating-point error condition being generated. Only the next
occurrence of this unmasked exception will result in the exception being generated.

Bits 16 through 32 of the MXCSR register are defined as reserved and should be set to 0. Attempting to write a 1 in
any of these bits from the saved state image will result in a general protection exception (\#GP) being generated.

Bytes 464:511 of an FXSAVE image are available for software use. FXRSTOR ignores the content of bytes 464:511
in an FXSAVE state image.

### Operation

```java
IF 64-Bit Mode
      THEN               
             (x87 FPU, MMX, XMM15-XMM0, MXCSR)     Load(SRC);
      ELSE
        (x87 FPU, MMX, XMM7-XMM0, MXCSR) ← Load(SRC);
FI;
```
#### x87 FPU and SIMD Floating-Point Exceptions
```java
None.
```
### Protected Mode Exceptions
<p>#GP(0)
For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.
If a memory operand is not aligned on a 16-byte boundary, regardless of segment. (See align-
ment check exception [<p>#AC] below.)
For an attempt to set reserved bits in MXCSR.
<p>#SS(0)
For an illegal address in the SS segment.
<p>#PF(fault-code)
For a page fault.
<p>#NM
If CR0.TS[bit 3] = 1.
If CR0.EM[bit 2] = 1.
<p>#UD
If CPUID.01H:EDX.FXSR[bit 24] = 0.
If instruction is preceded by a LOCK prefix.
<p>#AC
If this exception is disabled a general protection exception (<p>#GP) is signaled if the memory
operand is not aligned on a 16-byte boundary, as described above. If the alignment check
exception (<p>#AC) is enabled (and the CPL is 3), signaling of <p>#AC is not guaranteed and may
vary with implementation, as follows. In all implementations where <p>#AC is not signaled, a
general protection exception is signaled in its place. In addition, the width of the alignment
check may also vary with implementation. For instance, for a given implementation, an align-
ment check exception might be signaled for a 2-byte misalignment, whereas a general protec-
tion exception might be signaled for all other misalignments (4-, 8-, or 16-byte
misalignments).
<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#GP
If a memory operand is not aligned on a 16-byte boundary, regardless of segment.
If any part of the operand lies outside the effective address space from 0 to FFFFH.
For an attempt to set reserved bits in MXCSR.
<p>#NM
If CR0.TS[bit 3] = 1.
If CR0.EM[bit 2] = 1.
<p>#UD
If CPUID.01H:EDX.FXSR[bit 24] = 0.
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

Same exceptions as in real address mode.
<p>#PF(fault-code)
For a page fault.
<p>#AC
For unaligned memory reference.
<p>#UD
If the LOCK prefix is used.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions
<p>#SS(0)
If a memory address referencing the SS segment is in a non-canonical form.
<p>#GP(0)
If the memory address is in a non-canonical form.
If memory operand is not aligned on a 16-byte boundary, regardless of segment.
For an attempt to set reserved bits in MXCSR.
<p>#PF(fault-code)
For a page fault.
<p>#NM
If CR0.TS[bit 3] = 1.
If CR0.EM[bit 2] = 1.
<p>#UD
If CPUID.01H:EDX.FXSR[bit 24] = 0.
If instruction is preceded by a LOCK prefix.
<p>#AC
If this exception is disabled a general protection exception (<p>#GP) is signaled if the memory
operand is not aligned on a 16-byte boundary, as described above. If the alignment check
exception (<p>#AC) is enabled (and the CPL is 3), signaling of <p>#AC is not guaranteed and may
vary with implementation, as follows. In all implementations where <p>#AC is not signaled, a
general protection exception is signaled in its place. In addition, the width of the alignment
check may also vary with implementation. For instance, for a given implementation, an align-
ment check exception might be signaled for a 2-byte misalignment, whereas a general protec-
tion exception might be signaled for all other misalignments (4-, 8-, or 16-byte
misalignments).

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
