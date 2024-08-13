SGX INSTRUCTION REFERENCES
<b>EENTER</b> — Enters an Enclave
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 02H ENCLU[EENTER]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>SGX1</td>
		<td>This leaf function is used to enter an enclave.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td colspan=2><b>EAX</b></td>
		<td><b>RBX</b></td>
		<td colspan=2><b>RCX</b></td>
	</tr>
	<tr>
		<td>IR</td>
		<td>EENTER (In)</td>
		<td>Content of RBX.CSSA (Out)</td>
		<td>Address of a TCS (In)</td>
		<td>Address of AEP (In)</td>
		<td>Address of IP following EENTER (Out)</td>
	</tr>
</table>


### Description
The ENCLU[EENTER] instruction transfers execution to an enclave. At the end of the instruction, the logical
processor is executing in enclave mode at the RIP computed as EnclaveBase + TCS.OENTRY. If the target address
is not within the CS segment (32-bit) or is not canonical (64-bit), a \#GP(0) results.

EENTER Memory Parameter Semantics
<table>
	<tr>
		<td><b>TCS</b></td>
	</tr>
	<tr>
		<td>Enclave access</td>
	</tr>
</table>

EENTER is a serializing instruction. The instruction faults if any of the following occurs:
<table>
	<tr>
		<td><b>Address in RBX is not properly aligned.</b></td>
		<td><b>Any TCS.FLAGS’s must-be-zero bit is not zero.</b></td>
	</tr>
	<tr>
		<td>TCS pointed to by RBX is not valid or available or locked.</td>
		<td>Current 32/64 mode does not match the enclave mode in SECS.ATTRIBUTES.MODE64.</td>
	</tr>
	<tr>
		<td>The SECS is in use.</td>
		<td>Either of TCS-specified FS and GS segment is not a subsets of the current DS segment.</td>
	</tr>
	<tr>
		<td>Any one of DS, ES, CS, SS is not zero.</td>
		<td>If XSAVE available, CR4.OSXSAVE = 0, but SECS.ATTRIBUTES.XFRM ≠ 3.</td>
	</tr>
	<tr>
		<td>CR4.OSFXSR ≠ 1.</td>
		<td>If CR4.OSXSAVE = 1, SECS.ATTRIBUTES.XFRM is not a subset of XCR0.</td>
	</tr>
</table>

The following operations are performed by EENTER:

 *  RSP and RBP are saved in the current SSA frame on EENTER and are automatically restored on EEXIT or

interrupt.

 * The AEP contained in RCX is stored into the TCS for use by AEXs.FS and GS (including hidden portions) are
saved and new values are constructed using TCS.OFSBASE/GSBASE (32 and 64-bit mode) and
TCS.OFSLIMIT/GSLIMIT (32-bit mode only). The resulting segments must be a subset of the DS segment.

 * If CR4.OSXSAVE == 1, XCR0 is saved and replaced by SECS.ATTRIBUTES.XFRM. The effect of RFLAGS.TF
depends on whether the enclave entry is opt-in or opt-out (see Section 42.1.2):

— On opt-out entry, TF is saved and cleared (it is restored on EEXIT or AEX). Any attempt to set TF via a POPF
instruction while inside the enclave clears TF (see Section 42.2.5).

— On opt-in entry, a single-step debug exception is pended on the instruction boundary immediately after
EENTER (see Section 42.2.2).

 *  All code breakpoints that do not overlap with ELRANGE are also suppressed. If the entry is an opt-out entry, all

code and data breakpoints that overlap with the ELRANGE are suppressed.

 *  On opt-out entry, a number of performance monitoring counters and behaviors are modified or suppressed

(see Section 42.2.3):

Vol. 3D 40-93
SGX INSTRUCTION REFERENCES

— All performance monitoring activity on the current thread is suppressed except for incrementing and firing
of FIXED_CTR1 and FIXED_CTR2.

— PEBS is suppressed.

— AnyThread counting on other threads is demoted to MyThread mode and IA32_PERF_GLOBAL_STATUS[60]
on that thread is set

— If the opt-out entry on a hardware thread results in suppression of any performance monitoring, then the
processor sets IA32_PERF_GLOBAL_STATUS[60] and IA32_PERF_GLOBAL_STATUS[63].

Concurrency Restrictions

Table 40-60.  Base Concurrency Restrictions of EENTER
<table>
	<tr>
		<td rowspan=2><b>Leaf</b></td>
		<td rowspan=2><b>Parameter</b></td>
		<td colspan=3><b>Base Concurrency Restrictions</b></td>
	</tr>
	<tr>
		<td>Access</td>
		<td>On Conflict</td>
		<td>SGX_CONFLICT VM Exit Qualification</td>
	</tr>
	<tr>
		<td>EENTER</td>
		<td>TCS [DS:RBX]</td>
		<td>Shared</td>
		<td>#GP</td>
		<td></td>
	</tr>
</table>

Table 40-61.  Additional Concurrency Restrictions of EENTER
<table>
	<tr>
		<td rowspan=3><b>Leaf</b></td>
		<td rowspan=3><b>Parameter</b></td>
		<td colspan=6><b>Additional Concurrency Restrictions</b></td>
	</tr>
	<tr>
		<td colspan=2>vs. EACCEPT, EACCEPTCOPY, EMODPE, EMODPR, EMODT</td>
		<td colspan=2>vs. EADD, EEXTEND, EINIT</td>
		<td colspan=2>vs. ETRACK, ETRACKC</td>
	</tr>
	<tr>
		<td>Access</td>
		<td>On Conflict</td>
		<td>Access</td>
		<td>On Conflict</td>
		<td>Access</td>
		<td>On Conflict</td>
	</tr>
	<tr>
		<td>EENTER</td>
		<td>TCS [DS:RBX]</td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
	</tr>
</table>


### Operation


#### Temp Variables in EENTER Operational Flow
```java
<table>
	<tr>
		<td><b>Name</b></td>
		<td><b>Type</b></td>
		<td><b>Size (Bits)</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>TMP_FSBASE</td>
		<td>Effective Address</td>
		<td>32/64</td>
		<td>Proposed base address for FS segment.</td>
	</tr>
	<tr>
		<td>TMP_GSBASE</td>
		<td>Effective Address</td>
		<td>32/64</td>
		<td>Proposed base address for FS segment.</td>
	</tr>
	<tr>
		<td>TMP_FSLIMIT</td>
		<td>Effective Address</td>
		<td>32/64</td>
		<td>Highest legal address in proposed FS segment.</td>
	</tr>
	<tr>
		<td>TMP_GSLIMIT</td>
		<td>Effective Address</td>
		<td>32/64</td>
		<td>Highest legal address in proposed GS segment.</td>
	</tr>
	<tr>
		<td>TMP_XSIZE</td>
		<td>integer</td>
		<td>64</td>
		<td>Size of XSAVE area based on SECS.ATTRIBUTES.XFRM.</td>
	</tr>
	<tr>
		<td>TMP_SSA_PAGE</td>
		<td>Effective Address</td>
		<td>32/64</td>
		<td>Pointer used to iterate over the SSA pages in the current frame.</td>
	</tr>
	<tr>
		<td>TMP_GPR</td>
		<td>Effective Address</td>
		<td>32/64</td>
		<td>Address of the GPR area within the current SSA frame.</td>
	</tr>
</table>

TMP_MODE64 ← ((IA32_EFER.LMA = 1) && (CS.L = 1));
(* Make sure DS is usable, expand up *)
IF (TMP_MODE64 = 0 and (DS not usable or ( ( DS[S] = 1) and (DS[bit 11] = 0) and DS[bit 10] = 1) ) ) 
    THEN #GP(0); FI;
(* Check that CS, SS, DS, ES.base is 0 *)
IF (TMP_MODE64 = 0)
    THEN 
        IF(CS.base ≠ 0 or DS.base ≠ 0) #GP(0); FI;
        IF(ES usable and ES.base ≠ 0) #GP(0); FI;
        IF(SS usable and SS.base ≠ 0) #GP(0); FI;
        IF(SS usable and SS.B = 0) #GP(0); FI;
40-94 Vol. 3D
                            SGX INSTRUCTION REFERENCES
FI;
IF (DS:RBX is not 4KByte Aligned)
    THEN #GP(0); FI;
IF (DS:RBX does not resolve within an EPC)
    THEN #PF(DS:RBX); FI;
(* Check AEP is canonical*)
IF (TMP_MODE64 = 1 and (CS:RCX is not canonical) )
    THEN #GP(0); FI;
(* Check concurrency of TCS operation*)
IF (Other Intel SGX instructions is operating on TCS) 
    THEN #GP(0); FI;
(* TCS verification *)
IF (EPCM(DS:RBX).VALID = 0) 
    THEN #PF(DS:RBX); FI;
IF (EPCM(DS:RBX).BLOCKED = 1) 
    THEN #PF(DS:RBX); FI;
IF ( (EPCM(DS:RBX).ENCLAVEADDRESS ≠ DS:RBX) or (EPCM(DS:RBX).PT ≠ PT_TCS) )
    THEN #PF(DS:RBX); FI;
IF ((EPCM(DS:RBX).PENDING = 1) or (EPCM(DS:RBX).MODIFIED = 1))
    THEN #PF(DS:RBX); FI;
IF ( (DS:RBX).OSSA is not 4KByte Aligned)
    THEN #GP(0); FI;
(* Check proposed FS and GS *)
IF ( ( (DS:RBX).OFSBASE is not 4KByte Aligned) or ( (DS:RBX).OGSBASE is not 4KByte Aligned) )
    THEN #GP(0); FI;
(* Get the SECS for the enclave in which the TCS resides *)
TMP_SECS ← Address of SECS for TCS;
(* Check proposed FS/GS segments fall within DS *)
IF (TMP_MODE64 = 0)
    THEN 
        TMP_FSBASE ← (DS:RBX).OFSBASE + TMP_SECS.BASEADDR;
        TMP_FSLIMIT ← (DS:RBX).OFSBASE + TMP_SECS.BASEADDR + (DS:RBX).FSLIMIT;
        TMP_GSBASE ← (DS:RBX).OGSBASE + TMP_SECS.BASEADDR;
        TMP_GSLIMIT ← (DS:RBX).OGSBASE + TMP_SECS.BASEADDR + (DS:RBX).GSLIMIT;
        (* if FS wrap-around, make sure DS has no holes*)
        IF (TMP_FSLIMIT < TMP_FSBASE)
            THEN 
                IF (DS.limit < 4GB) THEN #GP(0); FI;
            ELSE
                IF (TMP_FSLIMIT > DS.limit) THEN #GP(0); FI;
        FI;
        (* if GS wrap-around, make sure DS has no holes*)
                            Vol. 3D 40-95
SGX INSTRUCTION REFERENCES
        IF (TMP_GSLIMIT < TMP_GSBASE)
            THEN 
                IF (DS.limit < 4GB) THEN #GP(0); FI;
            ELSE
                IF (TMP_GSLIMIT > DS.limit) THEN #GP(0); FI;
        FI;
    ELSE
        TMP_FSBASE ← (DS:RBX).OFSBASE + TMP_SECS.BASEADDR;
        TMP_GSBASE ← (DS:RBX).OGSBASE + TMP_SECS.BASEADDR;
        IF ( (TMP_FSBASE is not canonical) or (TMP_GSBASE is not canonical))
            THEN #GP(0); FI;
FI;
(* Ensure that the FLAGS field in the TCS does not have any reserved bits set *)
IF ( ( (DS:RBX).FLAGS & FFFFFFFFFFFFFFFEH) ≠ 0) 
    THEN #GP(0); FI;
(* SECS must exist and enclave must have previously been EINITted *)
IF (the enclave is not already initialized) 
    THEN #GP(0); FI;
(* make sure the logical processor’s operating mode matches the enclave *)
IF ( (TMP_MODE64 ≠ TMP_SECS.ATTRIBUTES.MODE64BIT) )
    THEN #GP(0); FI;
IF (CR4.OSFXSR = 0)
    THEN #GP(0); FI;
(* Check for legal values of SECS.ATTRIBUTES.XFRM *)
IF (CR4.OSXSAVE = 0)
    THEN 
        IF (TMP_SECS.ATTRIBUTES.XFRM ≠ 03H) THEN #GP(0); FI;
    ELSE
        IF ( (TMP_SECS.ATTRIBUTES.XFRM & XCR0) ≠ TMP_SECS.ATTRIBUES.XFRM) THEN #GP(0); FI;
FI;
(* Make sure the SSA contains at least one more frame *)
IF ( (DS:RBX).CSSA ≥ (DS:RBX).NSSA) 
    THEN #GP(0); FI;
(* Compute linear address of SSA frame *)
TMP_SSA ← (DS:RBX).OSSA + TMP_SECS.BASEADDR + 4096 * TMP_SECS.SSAFRAMESIZE * (DS:RBX).CSSA;
TMP_XSIZE ← compute_XSAVE_frame_size(TMP_SECS.ATTRIBUTES.XFRM);
FOR EACH TMP_SSA_PAGE = TMP_SSA to TMP_SSA + TMP_XSIZE
    (* Check page is read/write accessible *)
    Check that DS:TMP_SSA_PAGE is read/write accessible; 
    If a fault occurs, release locks, abort and deliver that fault;
    IF (DS:TMP_SSA_PAGE does not resolve to EPC page) 
        THEN #PF(DS:TMP_SSA_PAGE); FI;
    IF (EPCM(DS:TMP_SSA_PAGE).VALID = 0) 
        THEN #PF(DS:TMP_SSA_PAGE); FI;
    IF (EPCM(DS:TMP_SSA_PAGE).BLOCKED = 1) 
40-96 Vol. 3D
                            SGX INSTRUCTION REFERENCES
        THEN #PF(DS:TMP_SSA_PAGE); FI;
    IF ((EPCM(DS:TMP_SSA_PAGE).PENDING = 1) or (EPCM(DS:TMP_SSA_PAGE).MODIFIED = 1))
        THEN #PF(DS:TMP_SSA_PAGE); FI;
    IF ( ( EPCM(DS:TMP_SSA_PAGE).ENCLAVEADDRESS ≠ DS:TMP_SSA_PAGE) or (EPCM(DS:TMP_SSA_PAGE).PT ≠ PT_REG) or
        (EPCM(DS:TMP_SSA_PAGE).ENCLAVESECS ≠ EPCM(DS:RBX).ENCLAVESECS) or 
        (EPCM(DS:TMP_SSA_PAGE).R = 0) or (EPCM(DS:TMP_SSA_PAGE).W = 0) )
        THEN #PF(DS:TMP_SSA_PAGE); FI;
    CR_XSAVE_PAGE_n ← Physical_Address(DS:TMP_SSA_PAGE);
ENDFOR
(* Compute address of GPR area*)
TMP_GPR ← TMP_SSA + 4096 * DS:TMP_SECS.SSAFRAMESIZE - sizeof(GPRSGX_AREA);
If a fault occurs; release locks, abort and deliver that fault;
IF (DS:TMP_GPR does not resolve to EPC page) 
    THEN #PF(DS:TMP_GPR); FI;
IF (EPCM(DS:TMP_GPR).VALID = 0) 
    THEN #PF(DS:TMP_GPR); FI;
IF (EPCM(DS:TMP_GPR).BLOCKED = 1) 
    THEN #PF(DS:TMP_GPR); FI;
IF ((EPCM(DS:TMP_GPR).PENDING = 1) or (EPCM(DS:TMP_GPR).MODIFIED = 1))
    THEN #PF(DS:TMP_GPR); FI;
IF ( ( EPCM(DS:TMP_GPR).ENCLAVEADDRESS ≠ DS:TMP_GPR) or (EPCM(DS:TMP_GPR).PT ≠ PT_REG) or
    (EPCM(DS:TMP_GPR).ENCLAVESECS EPCM(DS:RBX).ENCLAVESECS) or 
    (EPCM(DS:TMP_GPR).R = 0) or (EPCM(DS:TMP_GPR).W = 0) )
    THEN #PF(DS:TMP_GPR); FI;
IF (TMP_MODE64 = 0)
    THEN 
        IF (TMP_GPR + (GPR_SIZE -1) is not in DS segment) THEN #GP(0); FI;
FI;
CR_GPR_PA ← Physical_Address (DS: TMP_GPR);
(* Validate TCS.OENTRY *)
TMP_TARGET ← (DS:RBX).OENTRY + TMP_SECS.BASEADDR;
IF (TMP_MODE64 = 1)
    THEN 
        IF (TMP_TARGET is not canonical) THEN #GP(0); FI;
    ELSE
        IF (TMP_TARGET > CS limit) THEN #GP(0); FI;
FI;
(* Ensure the enclave is not already active and this thread is the only one using the TCS*)
IF (DS:RBX.STATE = ACTIVE) 
    THEN #GP(0); FI;
CR_ENCLAVE_MODE ← 1;
CR_ACTIVE_SECS ← TMP_SECS;
CR_ELRANGE ← (TMPSECS.BASEADDR, TMP_SECS.SIZE);
(* Save state for possible AEXs *)
CR_TCS_PA ← Physical_Address (DS:RBX);
CR_TCS_LA ← RBX;
                            Vol. 3D 40-97
SGX INSTRUCTION REFERENCES
CR_TCS_LA.AEP ← RCX;
(* Save the hidden portions of FS and GS *)
CR_SAVE_FS_selector ← FS.selector;
CR_SAVE_FS_base ← FS.base;
CR_SAVE_FS_limit ← FS.limit;
CR_SAVE_FS_access_rights ← FS.access_rights;
CR_SAVE_GS_selector ← GS.selector;
CR_SAVE_GS_base ← GS.base;
CR_SAVE_GS_limit ← GS.limit;
CR_SAVE_GS_access_rights ← GS.access_rights;
(* If XSAVE is enabled, save XCR0 and replace it with SECS.ATTRIBUTES.XFRM*)
IF (CR4.OSXSAVE = 1) 
    CR_SAVE_XCR0 ← XCR0;
    XCR0 ← TMP_SECS.ATTRIBUTES.XFRM;
FI;
RCX ← RIP;
RIP ← TMP_TARGET;
RAX ← (DS:RBX).CSSA;
(* Save the outside RSP and RBP so they can be restored on interrupt or EEXIT *)
DS:TMP_SSA.U_RSP ← RSP; 
DS:TMP_SSA.U_RBP ← RBP; 
(* Do the FS/GS swap *)
FS.base ← TMP_FSBASE;
FS.limit ← DS:RBX.FSLIMIT;
FS.type ← 0001b;
FS.W ← DS.W;
FS.S ← 1;
FS.DPL ← DS.DPL;
FS.G ← 1;
FS.B ← 1;
FS.P ← 1;
FS.AVL ← DS.AVL;
FS.L ← DS.L;
FS.unusable ← 0;
FS.selector ← 0BH;
GS.base ← TMP_GSBASE;
GS.limit ← DS:RBX.GSLIMIT;
GS.type ← 0001b;
GS.W ← DS.W;
GS.S ← 1;
GS.DPL ← DS.DPL;
GS.G ← 1;
GS.B ← 1;
GS.P ← 1;
GS.AVL ← DS.AVL;
GS.L ← DS.L;
GS.unusable ← 0;
GS.selector ← 0BH;
40-98 Vol. 3D
                            SGX INSTRUCTION REFERENCES
CR_DBGOPTIN ← TCS.FLAGS.DBGOPTIN;
Suppress_all_code_breakpoints_that_are_outside_ELRANGE;
IF (CR_DBGOPTIN = 0) 
    THEN
        Suppress_all_code_breakpoints_that_overlap_with_ELRANGE;
        CR_SAVE_TF ← RFLAGS.TF;
        RFLAGS.TF ← 0;
        Suppress_monitor_trap_flag for the source of the execution of the enclave;
        Suppress any pending debug exceptions;
        Suppress any pending MTF VM exit;
    ELSE
        IF RFLAGS.TF = 1
            THEN pend a single-step #DB at the end of EENTER; FI;
        IF the “monitor trap flag” VM-execution control is set
            THEN pend an MTF VM exit at the end of EENTER; FI;
FI;
Flush_linear_context;
Allow_front_end_to_begin_fetch_at_new_RIP;
```
### Flags Affected
RFLAGS.TF is cleared on opt-out entry

### Protected Mode Exceptions

<p>#GP(0)
If DS:RBX is not page aligned.
If the enclave is not initialized.
If part or all of the FS or GS segment specified by TCS is outside the DS segment or not prop-
erly aligned.
If the thread is not in the INACTIVE state.
If CS, DS, ES or SS bases are not all zero.
If executed in enclave mode.
If any reserved field in the TCS FLAG is set.
If the target address is not within the CS segment.
If CR4.OSFXSR = 0.
If CR4.OSXSAVE = 0 and SECS.ATTRIBUTES.XFRM ≠ 3.
If CR4.OSXSAVE = 1and SECS.ATTRIBUTES.XFRM is not a subset of XCR0.
<p>#PF(error code)
If a page fault occurs in accessing memory.
If DS:RBX does not point to a valid TCS.
If one or more pages of the current SSA frame are not readable/writable, or do not resolve to
a valid PT_REG EPC page.

Vol. 3D 40-99
SGX INSTRUCTION REFERENCES

### 64-Bit Mode Exceptions

<p>#GP(0)
If DS:RBX is not page aligned.
If the enclave is not initialized.
If the thread is not in the INACTIVE state.
If CS, DS, ES or SS bases are not all zero.
If executed in enclave mode.
If part or all of the FS or GS segment specified by TCS is outside the DS segment or not prop-
erly aligned.
If the target address is not canonical.
If CR4.OSFXSR = 0.
If CR4.OSXSAVE = 0 and SECS.ATTRIBUTES.XFRM ≠ 3.
If CR4.OSXSAVE = 1and SECS.ATTRIBUTES.XFRM is not a subset of XCR0.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If DS:RBX does not point to a valid TCS.
If one or more pages of the current SSA frame are not readable/writable, or do not resolve to
a valid PT_REG EPC page.

40-100 Vol. 3D

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
