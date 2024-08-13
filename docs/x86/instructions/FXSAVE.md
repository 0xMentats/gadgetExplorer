<b>FXSAVE</b> — Save x87 FPU, MMX Technology, and SSE State
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F AE /0 FXSAVE m512byte</td>
		<td>M</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Save the x87 FPU, MMX, XMM, and MXCSR register state to m512byte.</td>
	</tr>
	<tr>
		<td>NP REX.W + 0F AE /0 FXSAVE64 m512byte</td>
		<td>M</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Save the x87 FPU, MMX, XMM, and MXCSR register state to m512byte.</td>
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
		<td>ModRM:r/m (w)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Saves the current state of the x87 FPU, MMX technology, XMM, and MXCSR registers to a 512-byte memory location
 specified in the destination operand. The content layout of the 512 byte region depends on whether the
processor is operating in non-64-bit operating modes or 64-bit sub-mode of IA-32e mode.

Bytes 464:511 are available to software use. The processor does not write to bytes 464:511 of an FXSAVE area.

The operation of FXSAVE in non-64-bit modes is described first.

Non-64-Bit Mode Operation

Table 3-43 shows the layout of the state information in memory when the processor is operating in legacy modes.

Table 3-43.  Non-64-bit-Mode Layout of FXSAVE and FXRSTOR
Memory Region
<table>
	<tr>
		<td colspan=2><b>MXCSR_MASK</b></td>
		<td colspan=2><b>MXCSR</b></td>
		<td><b>Rsrvd</b></td>
		<td colspan=2><b>FDS</b></td>
		<td colspan=3><b>FDP[31:0]</b></td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST0/MM0</td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST1/MM1</td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST2/MM2</td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST3/MM3</td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST4/MM4</td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST5/MM5</td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST6/MM6</td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST7/MM7</td>
	</tr>
	<tr>
		<td colspan=10>XMM0</td>
	</tr>
	<tr>
		<td colspan=10>XMM1</td>
	</tr>
	<tr>
		<td colspan=10>XMM2</td>
	</tr>
	<tr>
		<td colspan=10>XMM3</td>
	</tr>
	<tr>
		<td colspan=10>XMM4</td>
	</tr>
	<tr>
		<td colspan=10>XMM5</td>
	</tr>
	<tr>
		<td colspan=10>XMM6</td>
	</tr>
	<tr>
		<td colspan=10>XMM7</td>
	</tr>
	<tr>
		<td colspan=10>Reserved</td>
	</tr>
</table>

Table 3-43.  Non-64-bit-Mode Layout of FXSAVE and FXRSTOR
Memory Region (Contd.)
<table>
	<tr>
		<td colspan=10><b>Reserved</b></td>
	</tr>
	<tr>
		<td colspan=10>Reserved</td>
	</tr>
	<tr>
		<td colspan=10>Reserved</td>
	</tr>
	<tr>
		<td colspan=10>Reserved</td>
	</tr>
	<tr>
		<td colspan=10>Reserved</td>
	</tr>
	<tr>
		<td colspan=10>Reserved</td>
	</tr>
	<tr>
		<td colspan=10>Reserved</td>
	</tr>
	<tr>
		<td colspan=10>Reserved</td>
	</tr>
	<tr>
		<td colspan=10>Reserved</td>
	</tr>
	<tr>
		<td colspan=10>Reserved</td>
	</tr>
	<tr>
		<td colspan=10>Available</td>
	</tr>
	<tr>
		<td colspan=10>Available</td>
	</tr>
	<tr>
		<td colspan=10>Available</td>
	</tr>
</table>

The destination operand contains the first byte of the memory image, and it must be aligned on a 16-byte
boundary. A misaligned destination operand will result in a general-protection (\#GP) exception being generated (or
in some cases, an alignment check exception [\#AC]).

The FXSAVE instruction is used when an operating system needs to perform a context switch or when an exception
handler needs to save and examine the current state of the x87 FPU, MMX technology, and/or XMM and MXCSR
registers.

The fields in Table 3-43 are defined in Table 3-44.

Table 3-44.  Field Definitions
<table>
	<tr>
		<td><b>Field</b></td>
		<td><b>Definition</b></td>
	</tr>
	<tr>
		<td>FCW</td>
		<td>x87 FPU Control Word (16 bits). See Figure 8-6 in the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 1, for the layout of the x87 FPU control word.</td>
	</tr>
	<tr>
		<td>FSW</td>
		<td>x87 FPU Status Word (16 bits). See Figure 8-4 in the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 1, for the layout of the x87 FPU status word.</td>
	</tr>
	<tr>
		<td>Abridged FTW</td>
		<td>x87 FPU Tag Word (8 bits). The tag information saved here is abridged, as described in the following paragraphs.</td>
	</tr>
	<tr>
		<td>FOP</td>
		<td>x87 FPU Opcode (16 bits). The lower 11 bits of this field contain the opcode, upper 5 bits are reserved. See Figure 8-8 in the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 1, for the layout of the x87 FPU opcode field.</td>
	</tr>
	<tr>
		<td>FIP</td>
		<td>x87 FPU Instruction Pointer Offset (64 bits). The contents of this field differ depending on the current addressing mode (32-bit, 16-bit, or 64-bit) of the processor when the FXSAVE instruction was executed: 32-bit mode — 32-bit IP offset. 16-bit mode — low 16 bits are IP offset; high 16 bits are reserved. 64-bit mode with REX.W — 64-bit IP offset. 64-bit mode without REX.W — 32-bit IP offset. See “x87 FPU Instruction and Operand (Data) Pointers” in Chapter 8 of the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 1, for a description of the x87 FPU instruction pointer.</td>
	</tr>
</table>

Table 3-44.  Field Definitions  (Contd.)
<table>
	<tr>
		<td><b>Field</b></td>
		<td><b>Definition</b></td>
	</tr>
	<tr>
		<td>FCS</td>
		<td>x87 FPU Instruction Pointer Selector (16 bits). If CPUID.(EAX=07H,ECX=0H):EBX[bit 13] = 1, the processor deprecates FCS and FDS, and this field is saved as 0000H.</td>
	</tr>
	<tr>
		<td>FDP</td>
		<td>x87 FPU Instruction Operand (Data) Pointer Offset (64 bits). The contents of this field differ depending on the current addressing mode (32-bit, 16-bit, or 64-bit) of the processor when the FXSAVE instruction was executed: 32-bit mode — 32-bit DP offset. 16-bit mode — low 16 bits are DP offset; high 16 bits are reserved. 64-bit mode with REX.W — 64-bit DP offset. 64-bit mode without REX.W — 32-bit DP offset. See “x87 FPU Instruction and Operand (Data) Pointers” in Chapter 8 of the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 1, for a description of the x87 FPU operand pointer.</td>
	</tr>
	<tr>
		<td>FDS</td>
		<td>x87 FPU Instruction Operand (Data) Pointer Selector (16 bits). If CPUID.(EAX=07H,ECX=0H):EBX[bit 13] = 1, the processor deprecates FCS and FDS, and this field is saved as 0000H.</td>
	</tr>
	<tr>
		<td>MXCSR</td>
		<td>MXCSR Register State (32 bits). See Figure 10-3 in the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 1, for the layout of the MXCSR register. If the OSFXSR bit in control register CR4 is not set, the FXSAVE instruction may not save this register. This behavior is implementation dependent.</td>
	</tr>
	<tr>
		<td>MXCSR_ MASK</td>
		<td>MXCSR_MASK (32 bits). This mask can be used to adjust values written to the MXCSR register, ensuring that reserved bits are set to 0. Set the mask bits and flags in MXCSR to the mode of operation desired for SSE and SSE2 SIMD floating-point instructions. See “Guidelines for Writing to the MXCSR Register” in Chapter 11 of the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 1, for instructions for how to determine and use the MXCSR_MASK value.</td>
	</tr>
	<tr>
		<td>ST0/MM0 through ST7/MM7</td>
		<td>x87 FPU or MMX technology registers. These 80-bit fields contain the x87 FPU data registers or the MMX technology registers, depending on the state of the processor prior to the execution of the FXSAVE instruction. If the processor had been executing x87 FPU instruction prior to the FXSAVE instruction, the x87 FPU data registers are saved; if it had been executing MMX instructions (or SSE or SSE2 instructions that operated on the MMX technology registers), the MMX technology registers are saved. When the MMX technology registers are saved, the high 16 bits of the field are reserved.</td>
	</tr>
	<tr>
		<td>XMM0 through XMM7</td>
		<td>XMM registers (128 bits per field). If the OSFXSR bit in control register CR4 is not set, the FXSAVE instruction may not save these registers. This behavior is implementation dependent.</td>
	</tr>
</table>

The FXSAVE instruction saves an abridged version of the x87 FPU tag word in the FTW field (unlike the FSAVE
instruction, which saves the complete tag word). The tag information is saved in physical register order (R0
through R7), rather than in top-of-stack (TOS) order. With the FXSAVE instruction, however, only a single bit (1 for
valid or 0 for empty) is saved for each tag. For example, assume that the tag word is currently set as follows:

R7 R6 R5 R4 R3 R2 R1 R0
11 xx xx xx 11 11 11 11
Here, 11B indicates empty stack elements and “xx” indicates valid (00B), zero (01B), or special (10B).

For this example, the FXSAVE instruction saves only the following 8 bits of information:

R7 R6 R5 R4 R3 R2 R1 R0
0
1
1
1
0
0
0
0
Here, a 1 is saved for any valid, zero, or special tag, and a 0 is saved for any empty tag.

The operation of the FXSAVE instruction differs from that of the FSAVE instruction, the as follows:

 * FXSAVE instruction does not check for pending unmasked floating-point exceptions. (The FXSAVE operation in
this regard is similar to the operation of the FNSAVE instruction).

 *  After the FXSAVE instruction has saved the state of the x87 FPU, MMX technology, XMM, and MXCSR registers,

the processor retains the contents of the registers. Because of this behavior, the FXSAVE instruction cannot be
used by an application program to pass a “clean” x87 FPU state to a procedure, since it retains the current
state. To clean the x87 FPU state, an application must explicitly execute an FINIT instruction after an FXSAVE
instruction to reinitialize the x87 FPU state.

 * The format of the memory image saved with the FXSAVE instruction is the same regardless of the current
addressing mode (32-bit or 16-bit) and operating mode (protected, real address, or system management).
This behavior differs from the FSAVE instructions, where the memory image format is different depending on
the addressing mode and operating mode. Because of the different image formats, the memory image saved
with the FXSAVE instruction cannot be restored correctly with the FRSTOR instruction, and likewise the state
saved with the FSAVE instruction cannot be restored correctly with the FXRSTOR instruction.

The FSAVE format for FTW can be recreated from the FTW valid bits and the stored 80-bit FP data (assuming the
stored data was not the contents of MMX technology registers) using Table 3-45.

Table 3-45.  Recreating FSAVE Format
<table>
	<tr>
		<td><b>Exponent all 1’s</b></td>
		<td><b>Exponent all 0’s</b></td>
		<td><b>Fraction all 0’s</b></td>
		<td><b>J and M bits</b></td>
		<td><b>FTW valid bit</b></td>
		<td><b>x87 FTW</b></td>
	</tr>
	<tr>
		<td>0 0</td>
		<td>0 0</td>
		<td>0 0</td>
		<td>0x 1x</td>
		<td>1 1</td>
		<td>Special Valid 10 00</td>
	</tr>
	<tr>
		<td>0 0</td>
		<td>0 0</td>
		<td>1 1</td>
		<td>00 10</td>
		<td>1 1</td>
		<td>Special Valid 10 00</td>
	</tr>
	<tr>
		<td>0 0</td>
		<td>1 1</td>
		<td>0 0</td>
		<td>0x 1x</td>
		<td>1 1</td>
		<td>Special Special 10 10</td>
	</tr>
	<tr>
		<td>0 0</td>
		<td>1 1</td>
		<td>1 1</td>
		<td>00 10</td>
		<td>1 1</td>
		<td>Zero Special 01 10</td>
	</tr>
	<tr>
		<td>1 1</td>
		<td>0 0</td>
		<td>0 0</td>
		<td>1x 1x</td>
		<td>1 1</td>
		<td>Special Special 10 10</td>
	</tr>
	<tr>
		<td>1 1</td>
		<td>0 0</td>
		<td>1 1</td>
		<td>00 10</td>
		<td>1 1</td>
		<td>Special Special 10 10</td>
	</tr>
	<tr>
		<td colspan=4>For all legal combinations above.</td>
		<td>0</td>
		<td>Empty 11</td>
	</tr>
</table>

The J-bit is defined to be the 1-bit binary integer to the left of the decimal place in the significand. The M-bit is
defined to be the most significant bit of the fractional portion of the significand (i.e., the bit immediately to the right
of the decimal place).

When the M-bit is the most significant bit of the fractional portion of the significand, it must be 0 if the fraction is all
0’s.

IA-32e Mode Operation
In compatibility sub-mode of IA-32e mode, legacy SSE registers, XMM0 through XMM7, are saved according to the
legacy FXSAVE map. In 64-bit mode, all of the SSE registers, XMM0 through XMM15, are saved. Additionally, there
are two different layouts of the FXSAVE map in 64-bit mode, corresponding to FXSAVE64 (which requires
REX.W=1) and FXSAVE (REX.W=0). In the FXSAVE64 map (Table 3-46), the FPU IP and FPU DP pointers are 64-bit
wide. In the FXSAVE map for 64-bit mode (Table 3-47), the FPU IP and FPU DP pointers are 32-bits.
Table 3-46.  Layout of the 64-bit-mode FXSAVE64 Map
(requires REX.W = 1)
<table>
	<tr>
		<td colspan=2><b>MXCSR_MASK</b></td>
		<td colspan=2><b>MXCSR</b></td>
		<td colspan=6><b>FDP</b></td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST0/MM0</td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST1/MM1</td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST2/MM2</td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST3/MM3</td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST4/MM4</td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST5/MM5</td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST6/MM6</td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST7/MM7</td>
	</tr>
	<tr>
		<td colspan=10>XMM0</td>
	</tr>
	<tr>
		<td colspan=10>XMM1</td>
	</tr>
	<tr>
		<td colspan=10>XMM2</td>
	</tr>
	<tr>
		<td colspan=10>XMM3</td>
	</tr>
	<tr>
		<td colspan=10>XMM4</td>
	</tr>
	<tr>
		<td colspan=10>XMM5</td>
	</tr>
	<tr>
		<td colspan=10>XMM6</td>
	</tr>
	<tr>
		<td colspan=10>XMM7</td>
	</tr>
	<tr>
		<td colspan=10>XMM8</td>
	</tr>
	<tr>
		<td colspan=10>XMM9</td>
	</tr>
	<tr>
		<td colspan=10>XMM10</td>
	</tr>
	<tr>
		<td colspan=10>XMM11</td>
	</tr>
	<tr>
		<td colspan=10>XMM12</td>
	</tr>
	<tr>
		<td colspan=10>XMM13</td>
	</tr>
	<tr>
		<td colspan=10>XMM14</td>
	</tr>
	<tr>
		<td colspan=10>XMM15</td>
	</tr>
	<tr>
		<td colspan=10>Reserved</td>
	</tr>
	<tr>
		<td colspan=10>Reserved</td>
	</tr>
	<tr>
		<td colspan=10>Reserved</td>
	</tr>
	<tr>
		<td colspan=10>Available</td>
	</tr>
	<tr>
		<td colspan=10>Available</td>
	</tr>
	<tr>
		<td colspan=10>Available</td>
	</tr>
</table>

Table 3-47.  Layout of the 64-bit-mode FXSAVE Map (REX.W = 0)
<table>
	<tr>
	</tr>
	<tr>
		<td colspan=2>MXCSR_MASK</td>
		<td colspan=2>MXCSR</td>
		<td>Reserved</td>
		<td colspan=2>FDS</td>
		<td colspan=3>FDP[31:0]</td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST0/MM0</td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST1/MM1</td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST2/MM2</td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST3/MM3</td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST4/MM4</td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST5/MM5</td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST6/MM6</td>
	</tr>
	<tr>
		<td colspan=3>Reserved</td>
		<td colspan=7>ST7/MM7</td>
	</tr>
	<tr>
		<td colspan=10>XMM0</td>
	</tr>
	<tr>
		<td colspan=10>XMM1</td>
	</tr>
	<tr>
		<td colspan=10>XMM2</td>
	</tr>
	<tr>
		<td colspan=10>XMM3</td>
	</tr>
	<tr>
		<td colspan=10>XMM4</td>
	</tr>
	<tr>
		<td colspan=10>XMM5</td>
	</tr>
	<tr>
		<td colspan=10>XMM6</td>
	</tr>
	<tr>
		<td colspan=10>XMM7</td>
	</tr>
	<tr>
		<td colspan=10>XMM8</td>
	</tr>
	<tr>
		<td colspan=10>XMM9</td>
	</tr>
	<tr>
		<td colspan=10>XMM10</td>
	</tr>
	<tr>
		<td colspan=10>XMM11</td>
	</tr>
	<tr>
		<td colspan=10>XMM12</td>
	</tr>
	<tr>
		<td colspan=10>XMM13</td>
	</tr>
	<tr>
		<td colspan=10>XMM14</td>
	</tr>
	<tr>
		<td colspan=10>XMM15</td>
	</tr>
	<tr>
		<td colspan=10>Reserved</td>
	</tr>
	<tr>
		<td colspan=10>Reserved</td>
	</tr>
	<tr>
		<td colspan=10>Reserved</td>
	</tr>
	<tr>
		<td colspan=10>Available</td>
	</tr>
	<tr>
		<td colspan=10>Available</td>
	</tr>
	<tr>
		<td colspan=10>Available</td>
	</tr>
</table>


### Operation

```java
IF 64-Bit Mode
    THEN
        IF REX.W = 1
            THEN
                DEST ← Save64BitPromotedFxsave(x87 FPU, MMX, XMM15-XMM0,
                MXCSR);
            ELSE
                DEST ← Save64BitDefaultFxsave(x87 FPU, MMX, XMM15-XMM0, MXCSR);
        FI;
    ELSE
        DEST ← SaveLegacyFxsave(x87 FPU, MMX, XMM7-XMM0, MXCSR);
FI;
```
### Protected Mode Exceptions
<p>#GP(0)
For an illegal memory operand effective address in the CS, DS, ES, FS or GS segments.
If a memory operand is not aligned on a 16-byte boundary, regardless of segment. (See the
description of the alignment check exception [<p>#AC] below.)
<p>#SS(0)
For an illegal address in the SS segment.
<p>#PF(fault-code)
For a page fault.
<p>#NM
If CR0.TS[bit 3] = 1.
If CR0.EM[bit 2] = 1.
<p>#UD
If CPUID.01H:EDX.FXSR[bit 24] = 0.
<p>#UD
If the LOCK prefix is used.
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

### Real-Address Mode Exceptions

<p>#GP
If a memory operand is not aligned on a 16-byte boundary, regardless of segment.
If any part of the operand lies outside the effective address space from 0 to FFFFH.
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
<p>#PF(fault-code)
For a page fault.
<p>#NM
If CR0.TS[bit 3] = 1.
If CR0.EM[bit 2] = 1.
<p>#UD
If CPUID.01H:EDX.FXSR[bit 24] = 0.
If the LOCK prefix is used.
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

Implementation Note
The order in which the processor signals general-protection (<p>#GP) and page-fault (<p>#PF) exceptions when they both
occur on an instruction boundary is given in Table 5-2 in the Intel® 64 and IA-32 Architectures Software Devel-
oper’s Manual, Volume 3B. This order vary for FXSAVE for different processor implementations.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
