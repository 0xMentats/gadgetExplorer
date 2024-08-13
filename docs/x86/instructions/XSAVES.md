<b>XSAVES / XSAVES64</b> — Save Processor Extended States Supervisor
<table>
	<tr>
		<td><b>Opcode / Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F C7 /5 XSAVES mem</td>
		<td>M</td>
		<td>V/V</td>
		<td>XSS</td>
		<td>Save state components specified by EDX:EAX to mem with compaction, optimizing if possible.</td>
	</tr>
	<tr>
		<td>NP REX.W + 0F C7 /5 XSAVES64 mem</td>
		<td>M</td>
		<td>V/N.E.</td>
		<td>XSS</td>
		<td>Save state components specified by EDX:EAX to mem with compaction, optimizing if possible.</td>
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
Performs a full or partial save of processor state components to the XSAVE area located at the memory address
specified by the destination operand. The implicit EDX:EAX register pair specifies a 64-bit instruction mask. The
specific state components saved correspond to the bits set in the requested-feature bitmap (RFBM), the logical-
AND of EDX:EAX and the logical-OR of XCR0 with the IA32_XSS MSR. XSAVES may be executed only if CPL = 0.

The format of the XSAVE area is detailed in Section 13.4, “XSAVE Area,” of Intel® 64 and IA-32 Architectures Soft-
ware Developer’s Manual, Volume 1.

Section 13.11, “Operation of XSAVES,” of Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume
1 provides a detailed description of the operation of the XSAVES instruction. The following items provide a high-
level outline:

 * Execution of XSAVES is similar to that of XSAVEC. XSAVES differs from XSAVEC in that it can save state
components corresponding to bits set in the IA32_XSS MSR and that it may use the modified optimization.

 *  XSAVES saves state component i only if RFBM[i] = 1 and XINUSE[i] = 1.1 (XINUSE is a bitmap by which the

processor tracks the status of various state components. See Section 13.6, “Processor Tracking of XSAVE-
Managed State.”) Even if both bits are 1, XSAVES may optimize and not save state component i if (1) state
component i has not been modified since the last execution of XRSTOR or XRSTORS; and (2) this execution of
XSAVES correspond to that last execution of XRSTOR or XRSTORS as determined by XRSTOR_INFO (see the
Operation section below).

 *  XSAVES does not modify bytes 511:464 of the legacy region of the XSAVE area (see Section 13.4.1, “Legacy

Region of an XSAVE Area”).

 *  XSAVES writes the logical AND of RFBM and XINUSE to the XSTATE_BV field of the XSAVE header.2 (See Section

13.4.2, “XSAVE Header.”) XSAVES sets bit 63 of the XCOMP_BV field and sets bits 62:0 of that field to
RFBM[62:0]. XSAVES does not write to any parts of the XSAVE header other than the XSTATE_BV and
XCOMP_BV fields.

 *  XSAVES always uses the compacted format of the extended region of the XSAVE area (see Section 13.4.3,

“Extended Region of an XSAVE Area”).

Use of a destination operand not aligned to 64-byte boundary (in either 64-bit or 32-bit modes) results in a
general-protection (\#GP) exception. In 64-bit mode, the upper 32 bits of RDX and RAX are ignored.

See Section 13.6, “Processor Tracking of XSAVE-Managed State,” of Intel® 64 and IA-32 Architectures Software
Developer’s Manual, Volume 1 for discussion of the bitmap XMODIFIED and of the quantity XRSTOR_INFO.

1. There is an exception for state component 1 (SSE). MXCSR is part of SSE state, but XINUSE[1] may be 0 even if MXCSR does not
have its initial value of 1F80H. In this case, the init optimization does not apply and XSAVEC will save SSE state as long as RFBM[1] =
1 and the modified optimization is not being applied.
2. There is an exception for state component 1 (SSE). MXCSR is part of SSE state, but XINUSE[1] may be 0 even if MXCSR does not
have its initial value of 1F80H. In this case, XSAVES sets XSTATE_BV[1] to 1 as long as RFBM[1] = 1.

### Operation

```java
RFBM ← (XCR0 OR IA32_XSS) AND EDX:EAX;
                            /* bitwise logical OR and AND */
IF in VMX non-root operation
    THEN VMXNR ← 1;
    ELSE VMXNR ← 0;
FI;
LAXA ← linear address of XSAVE area;
COMPMASK ← RFBM OR 80000000_00000000H;
TO_BE_SAVED ← RFBM AND XINUSE;
IF XRSTOR_INFO = CPL,VMXNR,LAXA,COMPMASK
    THEN TO_BE_SAVED ← TO_BE_SAVED AND XMODIFIED;
FI;
If MXCSR ≠ 1F80H AND RFBM[1]
    TO_BE_SAVED[1] = 1;
FI;
IF TO_BE_SAVED[0] = 1
    THEN store x87 state into legacy region of XSAVE area;
FI;
IF TO_BE_SAVED[1] = 1
    THEN store SSE state into legacy region of XSAVE area; // this step saves the XMM registers, MXCSR, and MXCSR_MASK
FI;
NEXT_FEATURE_OFFSET = 576;
                            // Legacy area and XSAVE header consume 576 bytes
FOR i ← 2 TO 62
    IF RFBM[i] = 1
        THEN
            IF TO_BE_SAVED[i]
                THEN
                    save XSAVE state component i at offset NEXT_FEATURE_OFFSET from base of XSAVE area;
                    IF i = 8
                            // state component 8 is for PT state
                        THEN IA32_RTIT_CTL.TraceEn[bit 0] ← 0;
                    FI;
            FI;
            NEXT_FEATURE_OFFSET = NEXT_FEATURE_OFFSET + n (n enumerated by CPUID(EAX=0DH,ECX=i):EAX);
    FI;
ENDFOR;
XSTATE_BV field in XSAVE header ← TO_BE_SAVED;
XCOMP_BV field in XSAVE header ← COMPMASK;
```
### Flags Affected
None.

### Intel C/C++ Compiler Intrinsic Equivalent
```c
XSAVES:
void _xsaves( void * , unsigned __int64);
XSAVES64:
void _xsaves64( void * , unsigned __int64);
```
### Protected Mode Exceptions
<p>#GP(0)
If CPL > 0.
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If a memory operand is not aligned on a 64-byte boundary, regardless of segment.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF(fault-code)
If a page fault occurs.
<p>#NM
If CR0.TS[bit 3] = 1.
<p>#UD
If CPUID.01H:ECX.XSAVE[bit 26] = 0 or CPUID.(EAX=0DH,ECX=1):EAX.XSS[bit 3] = 0.
If CR4.OSXSAVE[bit 18] = 0.
If the LOCK prefix is used.
<p>#AC
If this exception is disabled a general protection exception (<p>#GP) is signaled if the memory
operand is not aligned on a 64-byte boundary, as described above. If the alignment check
exception (<p>#AC) is enabled (and the CPL is 3), signaling of <p>#AC is not guaranteed and may
vary with implementation, as follows. In all implementations where <p>#AC is not signaled, a
general protection exception is signaled in its place. In addition, the width of the alignment
check may also vary with implementation. For instance, for a given implementation, an align-
ment check exception might be signaled for a 2-byte misalignment, whereas a general protec-
tion exception might be signaled for all other misalignments (4-, 8-, or 16-byte
misalignments).

### Real-Address Mode Exceptions

<p>#GP
If a memory operand is not aligned on a 64-byte boundary, regardless of segment.
If any part of the operand lies outside the effective address space from 0 to FFFFH.
<p>#NM
If CR0.TS[bit 3] = 1.
<p>#UD
If CPUID.01H:ECX.XSAVE[bit 26] = 0 or CPUID.(EAX=0DH,ECX=1):EAX.XSS[bit 3] = 0.
If CR4.OSXSAVE[bit 18] = 0.
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

Same exceptions as in protected mode.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions
<p>#GP(0)
If CPL > 0.
If the memory address is in a non-canonical form.
If a memory operand is not aligned on a 64-byte boundary, regardless of segment.
<p>#SS(0)
If a memory address referencing the SS segment is in a non-canonical form.
<p>#PF(fault-code)
If a page fault occurs.
<p>#NM
If CR0.TS[bit 3] = 1.
<p>#UD
If CPUID.01H:ECX.XSAVE[bit 26] = 0 or CPUID.(EAX=0DH,ECX=1):EAX.XSS[bit 3] = 0.
If CR4.OSXSAVE[bit 18] = 0.
If the LOCK prefix is used.
<p>#AC
If this exception is disabled a general protection exception (<p>#GP) is signaled if the memory
operand is not aligned on a 64-byte boundary, as described above. If the alignment check
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