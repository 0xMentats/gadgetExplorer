<b>XRSTORS / XRSTORS64</b> — Restore Processor Extended States Supervisor
<table>
	<tr>
		<td><b>Opcode / Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F C7 /3 XRSTORS mem</td>
		<td>M</td>
		<td>V/V</td>
		<td>XSS</td>
		<td>Restore state components specified by EDX:EAX from mem.</td>
	</tr>
	<tr>
		<td>NP REX.W + 0F C7 /3 XRSTORS64 mem</td>
		<td>M</td>
		<td>V/N.E.</td>
		<td>XSS</td>
		<td>Restore state components specified by EDX:EAX from mem.</td>
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
Performs a full or partial restore of processor state components from the XSAVE area located at the memory
address specified by the source operand. The implicit EDX:EAX register pair specifies a 64-bit instruction mask.
The specific state components restored correspond to the bits set in the requested-feature bitmap (RFBM), which
is the logical-AND of EDX:EAX and the logical-OR of XCR0 with the IA32_XSS MSR. XRSTORS may be executed only
if CPL = 0.

The format of the XSAVE area is detailed in Section 13.4, “XSAVE Area,” of Intel® 64 and IA-32 Architectures Soft-
ware Developer’s Manual, Volume 1.

Section 13.12, “Operation of XRSTORS,” of Intel® 64 and IA-32 Architectures Software Developer’s Manual,
Volume 1 provides a detailed description of the operation of the XRSTOR instruction. The following items provide a
high-level outline:

 * Execution of XRSTORS is similar to that of the compacted form of XRSTOR; XRSTORS cannot restore from an
XSAVE area in which the extended region is in the standard format (see Section 13.4.3, “Extended Region of an
XSAVE Area”).

 *  XRSTORS differs from XRSTOR in that it can restore state components corresponding to bits set in the

IA32_XSS MSR.

 * If RFBM[i] = 0, XRSTORS does not update state component i.

 * If RFBM[i] = 1 and bit i is clear in the XSTATE_BV field in the XSAVE header, XRSTORS initializes state
component i.

 * If RFBM[i] = 1 and XSTATE_BV[i] = 1, XRSTORS loads state component i from the XSAVE area.

 * If XRSTORS attempts to load MXCSR with an illegal value, a general-protection exception (\#GP) occurs.

 *  XRSTORS loads the internal value XRSTOR_INFO, which may be used to optimize a subsequent execution of

XSAVEOPT or XSAVES.

 * Immediately following an execution of XRSTORS, the processor tracks as in-use (not in initial configuration)
any state component i for which RFBM[i] = 1 and XSTATE_BV[i] = 1; it tracks as modified any state component
i for which RFBM[i] = 0.

Use of a source operand not aligned to 64-byte boundary (for 64-bit and 32-bit modes) results in a general-protec-
tion (\#GP) exception. In 64-bit mode, the upper 32 bits of RDX and RAX are ignored.

See Section 13.6, “Processor Tracking of XSAVE-Managed State,” of Intel® 64 and IA-32 Architectures Software
Developer’s Manual, Volume 1 for discussion of the bitmaps XINUSE and XMODIFIED and of the quantity
XRSTOR_INFO.

### Operation

```java
RFBM ← (XCR0 OR IA32_XSS) AND EDX:EAX;
                            /* bitwise logical OR and AND */
COMPMASK ← XCOMP_BV field from XSAVE header;
RSTORMASK ← XSTATE_BV field from XSAVE header;
FORMAT = COMPMASK AND 7FFFFFFF_FFFFFFFFH;
RESTORE_FEATURES = FORMAT AND RFBM;
TO_BE_RESTORED ← RESTORE_FEATURES AND RSTORMASK;
FORCE_INIT ← RFBM AND NOT FORMAT;
TO_BE_INITIALIZED = (RFBM AND NOT RSTORMASK) OR FORCE_INIT;
IF TO_BE_RESTORED[0] = 1
    THEN
        load x87 state from legacy region of XSAVE area;
        XINUSE[0] ← 1;
ELSIF TO_BE_INITIALIZED[0] = 1
    THEN
        initialize x87 state;
        XINUSE[0] ← 0;
FI;
IF TO_BE_RESTORED[1] = 1
    THEN
        load SSE state from legacy region of XSAVE area; // this step loads the XMM registers and MXCSR
        XINUSE[1] ← 1;
ELSIF TO_BE_INITIALIZED[1] = 1
    THEN
        set all XMM registers to 0;
        MXCSR ← 1F80H;
        XINUSE[1] ← 0;
FI;
NEXT_FEATURE_OFFSET = 576;
                            // Legacy area and XSAVE header consume 576 bytes
FOR i ← 2 TO 62
    IF FORMAT[i] = 1
        THEN
            IF TO_BE_RESTORED[i] = 1
                THEN
                    load XSAVE state component i at offset NEXT_FEATURE_OFFSET from base of XSAVE area;
                    XINUSE[i] ← 1;
            FI;
            NEXT_FEATURE_OFFSET = NEXT_FEATURE_OFFSET + n (n enumerated by CPUID(EAX=0DH,ECX=i):EAX);
    FI;
    IF TO_BE_INITIALIZED[i] = 1
        THEN
            initialize XSAVE state component i;
            XINUSE[i] ← 0;
    FI;
ENDFOR;
XMODIFIED_BV ← NOT RFBM;
IF in VMX non-root operation
    THEN VMXNR ← 1;
    ELSE VMXNR ← 0;
FI;
LAXA ← linear address of XSAVE area;
XRSTOR_INFO ← CPL,VMXNR,LAXA,COMPMASK;
```
### Flags Affected
None.

### Intel C/C++ Compiler Intrinsic Equivalent
```c
XRSTORS:
void _xrstors( void * , unsigned __int64);
XRSTORS64: void _xrstors64( void * , unsigned __int64);
```
### Protected Mode Exceptions

<p>#GP(0)
If CPL > 0.
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If a memory operand is not aligned on a 64-byte boundary, regardless of segment.
If bit 63 of the XCOMP_BV field of the XSAVE header is 0.
If a bit in XCR0 is 0 and the corresponding bit in the XCOMP_BV field of the XSAVE header is 1.
If a bit in the XCOMP_BV field in the XSAVE header is 0 and the corresponding bit in the
XSTATE_BV field is 1.
If bytes 63:16 of the XSAVE header are not all zero.
If attempting to write any reserved bits of the MXCSR register with 1.
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
vary with implementation, as follows. In all implementations where <p>#AC is not signaled, a <p>#GP
is signaled in its place. In addition, the width of the alignment check may also vary with imple-
mentation. For instance, for a given implementation, an alignment check exception might be
signaled for a 2-byte misalignment, whereas a <p>#GP might be signaled for all other misalign-
ments (4-, 8-, or 16-byte misalignments).

### Real-Address Mode Exceptions
<p>#GP
If a memory operand is not aligned on a 64-byte boundary, regardless of segment.
If any part of the operand lies outside the effective address space from 0 to FFFFH.
If bit 63 of the XCOMP_BV field of the XSAVE header is 0.
If a bit in XCR0 is 0 and the corresponding bit in the XCOMP_BV field of the XSAVE header is 1.
If a bit in the XCOMP_BV field in the XSAVE header is 0 and the corresponding bit in the
XSTATE_BV field is 1.
If bytes 63:16 of the XSAVE header are not all zero.
If attempting to write any reserved bits of the MXCSR register with 1.
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
If a memory address is in a non-canonical form.
If a memory operand is not aligned on a 64-byte boundary, regardless of segment.
If bit 63 of the XCOMP_BV field of the XSAVE header is 0.
If a bit in XCR0 is 0 and the corresponding bit in the XCOMP_BV field of the XSAVE header is 1.
If a bit in the XCOMP_BV field in the XSAVE header is 0 and the corresponding bit in the
XSTATE_BV field is 1.
If bytes 63:16 of the XSAVE header are not all zero.
If attempting to write any reserved bits of the MXCSR register with 1.
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