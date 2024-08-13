SGX INSTRUCTION REFERENCES
<b>ERESUME</b> — Re-Enters an Enclave
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 03H ENCLU[ERESUME]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>SGX1</td>
		<td>This leaf function is used to re-enter an enclave after an inter- rupt.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>RAX</b></td>
		<td><b>RBX</b></td>
		<td><b>RCX</b></td>
	</tr>
	<tr>
		<td>IR</td>
		<td>ERESUME (In)</td>
		<td>Address of a TCS (In)</td>
		<td>Address of AEP (In)</td>
	</tr>
</table>


### Description
The ENCLU[ERESUME] instruction resumes execution of an enclave that was interrupted due to an exception or
interrupt, using the machine state previously stored in the SSA.

ERESUME Memory Parameter Semantics
<table>
	<tr>
		<td><b>TCS</b></td>
	</tr>
	<tr>
		<td>Enclave read/write access</td>
	</tr>
</table>

The instruction faults if any of the following:
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
		<td>The SECS is in use by another enclave.</td>
		<td>Either of TCS-specified FS and GS segment is not a subset of the current DS segment.</td>
	</tr>
	<tr>
		<td>Any one of DS, ES, CS, SS is not zero.</td>
		<td>If XSAVE available, CR4.OSXSAVE = 0, but SECS.ATTRIBUTES.XFRM ≠ 3.</td>
	</tr>
	<tr>
		<td>CR4.OSFXSR ≠ 1.</td>
		<td>If CR4.OSXSAVE = 1, SECS.ATTRIBUTES.XFRM is not a subset of XCR0.</td>
	</tr>
	<tr>
		<td>Offsets 520-535 of the XSAVE area not 0.</td>
		<td>The bit vector stored at offset 512 of the XSAVE area must be a subset of SECS.ATTRIBUTES.XFRM.</td>
	</tr>
	<tr>
		<td>The SSA frame is not valid or in use.</td>
		<td></td>
	</tr>
</table>

The following operations are performed by ERESUME:

 *  RSP and RBP are saved in the current SSA frame on EENTER and are automatically restored on EEXIT or an

asynchronous exit due to any Interrupt event.

 * The AEP contained in RCX is stored into the TCS for use by AEXs.FS and GS (including hidden portions) are
saved and new values are constructed using TCS.OFSBASE/GSBASE (32 and 64-bit mode) and
TCS.OFSLIMIT/GSLIMIT (32-bit mode only). The resulting segments must be a subset of the DS segment.

 * If CR4.OSXSAVE == 1, XCR0 is saved and replaced by SECS.ATTRIBUTES.XFRM. The effect of RFLAGS.TF
depends on whether the enclave entry is opt-in or opt-out (see Section 42.1.2):

— On opt-out entry, TF is saved and cleared (it is restored on EEXIT or AEX). Any attempt to set TF via a POPF
instruction while inside the enclave clears TF (see Section 42.2.5).

— On opt-in entry, a single-step debug exception is pended on the instruction boundary immediately after
EENTER (see Section 42.2.3).

 *  All code breakpoints that do not overlap with ELRANGE are also suppressed. If the entry is an opt-out entry, all

code and data breakpoints that overlap with the ELRANGE are suppressed.

40-120 Vol. 3D
SGX INSTRUCTION REFERENCES


 *  On opt-out entry, a number of performance monitoring counters and behaviors are modified or suppressed

(see Section 42.2.3):

— All performance monitoring activity on the current thread is suppressed except for incrementing and firing
of FIXED_CTR1 and FIXED_CTR2.

— PEBS is suppressed.

— AnyThread counting on other threads is demoted to MyThread mode and IA32_PERF_GLOBAL_STATUS[60]
on that thread is set.

— If the opt-out entry on a hardware thread results in suppression of any performance monitoring, then the
processor sets IA32_PERF_GLOBAL_STATUS[60] and IA32_PERF_GLOBAL_STATUS[63].

Concurrency Restrictions

Table 40-72.  Base Concurrency Restrictions of ERESUME
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
		<td>ERESUME</td>
		<td>TCS [DS:RBX]</td>
		<td>Shared</td>
		<td>#GP</td>
		<td></td>
	</tr>
</table>

Table 40-73.  Additional Concurrency Restrictions of ERESUME
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
		<td>ERESUME</td>
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


#### Temp Variables in ERESUME Operational Flow
```java
<table>
	<tr>
		<td><b>Name</b></td>
		<td><b>Type</b></td>
		<td><b>Size</b></td>
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
		<td>TMP_TARGET</td>
		<td>Effective Address</td>
		<td>32/64</td>
		<td>Address of first instruction inside enclave at which execution is to resume.</td>
	</tr>
	<tr>
		<td>TMP_SECS</td>
		<td>Effective Address</td>
		<td>32/64</td>
		<td>Physical address of SECS for this enclave.</td>
	</tr>
	<tr>
		<td>TMP_SSA</td>
		<td>Effective Address</td>
		<td>32/64</td>
		<td>Address of current SSA frame.</td>
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
	<tr>
		<td>TMP_BRANCH_RECORD</td>
		<td>LBR Record</td>
		<td></td>
		<td>From/to addresses to be pushed onto the LBR stack.</td>
	</tr>
</table>

TMP_MODE64 ← ((IA32_EFER.LMA = 1) && (CS.L = 1));
(* Make sure DS is usable, expand up *)
IF (TMP_MODE64 = 0 and (DS not usable or ( ( DS[S] = 1) and (DS[bit 11] = 0) and DS[bit 10] = 1) ) ) )
    THEN #GP(0); FI;
                            Vol. 3D 40-121
SGX INSTRUCTION REFERENCES
(* Check that CS, SS, DS, ES.base is 0 *)
IF (TMP_MODE64 = 0)
    THEN 
        IF(CS.base ≠ 0 or DS.base ≠ 0) #GP(0); FI;
        IF(ES usable and ES.base ≠ 0) #GP(0); FI;
        IF(SS usable and SS.base ≠ 0) #GP(0); FI;
        IF(SS usable and SS.B = 0) #GP(0); FI;
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
IF ((EPCM(DS:RBX).PENDING = 1) or (EPCM(DS:RBX).MODIFIED = 1))
    THEN #PF(DS:RBX); FI;
IF ( (EPCM(DS:RBX).ENCLAVEADDRESS ≠ DS:RBX) or (EPCM(DS:RBX).PT ≠ PT_TCS) )
    THEN #PF(DS:RBX); FI;
IF ( (DS:RBX).OSSA is not 4KByte Aligned)
    THEN #GP(0); FI;
(* Check proposed FS and GS *)
IF ( ( (DS:RBX).OFSBASE is not 4KByte Aligned) or ( (DS:RBX).OGSBASE is not 4KByte Aligned) )
    THEN #GP(0); FI;
(* Get the SECS for the enclave in which the TCS resides *)
TMP_SECS ← Address of SECS for TCS;
(* Make sure that the FLAGS field in the TCS does not have any reserved bits set *)
IF ( ( (DS:RBX).FLAGS & FFFFFFFFFFFFFFFEH) ≠ 0) 
    THEN #GP(0); FI;
(* SECS must exist and enclave must have previously been EINITted *)
IF (the enclave is not already initialized) 
    THEN #GP(0); FI;
40-122 Vol. 3D
                            SGX INSTRUCTION REFERENCES
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
        IF ( (TMP_SECS.ATTRIBUTES.XFRM & XCR0) ≠ TMP_SECS.ATTRIBUTES.XFRM) THEN #GP(0); FI;
FI;
(* Make sure the SSA contains at least one active frame *)
IF ( (DS:RBX).CSSA = 0) 
    THEN #GP(0); FI;
(* Compute linear address of SSA frame *)
TMP_SSA ← (DS:RBX).OSSA + TMP_SECS.BASEADDR + 4096 * TMP_SECS.SSAFRAMESIZE * ( (DS:RBX).CSSA - 1);
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
        THEN #PF(DS:TMP_SSA_PAGE); FI;
    IF ((EPCM(DS:TMP_SSA_PAGE).PENDING = 1) or (EPCM(DS:TMP_SSA_PAGE_.MODIFIED = 1))
        THEN #PF(DS:TMP_SSA_PAGE); FI;
    IF ( ( EPCM(DS:TMP_SSA_PAGE).ENCLAVEADDRESS ≠ DS:TMPSSA_PAGE) or (EPCM(DS:TMP_SSA_PAGE).PT ≠ PT_REG) or
        (EPCM(DS:TMP_SSA_PAGE).ENCLAVESECS ≠ EPCM(DS:RBX).ENCLAVESECS) or 
        (EPCM(DS:TMP_SSA_PAGE).R = 0) or (EPCM(DS:TMP_SSA_PAGE).W = 0) )
        THEN #PF(DS:TMP_SSA_PAGE); FI;
    CR_XSAVE_PAGE_n ← Physical_Address(DS:TMP_SSA_PAGE);
ENDFOR
(* Compute address of GPR area*)
TMP_GPR ← TMP_SSA + 4096 * DS:TMP_SECS.SSAFRAMESIZE - sizeof(GPRSGX_AREA);
Check that DS:TMP_SSA_PAGE is read/write accessible; 
If a fault occurs, release locks, abort and deliver that fault;
IF (DS:TMP_GPR does not resolve to EPC page) 
    THEN #PF(DS:TMP_GPR); FI;
IF (EPCM(DS:TMP_GPR).VALID = 0) 
    THEN #PF(DS:TMP_GPR); FI;
IF (EPCM(DS:TMP_GPR).BLOCKED = 1) 
    THEN #PF(DS:TMP_GPR); FI;
IF ((EPCM(DS:TMP_GPR).PENDING = 1) or (EPCM(DS:TMP_GPR).MODIFIED = 1))
    THEN #PF(DS:TMP_GPR); FI;
                            Vol. 3D 40-123
SGX INSTRUCTION REFERENCES
IF ( ( EPCM(DS:TMP_GPR).ENCLAVEADDRESS ≠ DS:TMP_GPR) or (EPCM(DS:TMP_GPR).PT ≠ PT_REG) or
    (EPCM(DS:TMP_GPR).ENCLAVESECS ≠ EPCM(DS:RBX).ENCLAVESECS) or 
    (EPCM(DS:TMP_GPR).R = 0) or (EPCM(DS:TMP_GPR).W = 0) )
    THEN #PF(DS:TMP_GPR); FI;
IF (TMP_MODE64 = 0)
    THEN 
        IF (TMP_GPR + (GPR_SIZE -1) is not in DS segment) THEN #GP(0); FI;
FI;
CR_GPR_PA ← Physical_Address (DS: TMP_GPR);
TMP_TARGET ← (DS:TMP_GPR).RIP;
IF (TMP_MODE64 = 1)
    THEN 
        IF (TMP_TARGET is not canonical) THEN #GP(0); FI;
    ELSE
        IF (TMP_TARGET > CS limit) THEN #GP(0); FI;
FI;
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
        IF (TMP_GSLIMIT < TMP_GSBASE)
            THEN 
                IF (DS.limit < 4GB) THEN #GP(0); FI;
            ELSE
                IF (TMP_GSLIMIT > DS.limit) THEN #GP(0); FI;
        FI;
    ELSE
        TMP_FSBASE ← DS:TMP_GPR.FSBASE;
        TMP_GSBASE ← DS:TMP_GPR.GSBASE;
        IF ( (TMP_FSBASE is not canonical) or (TMP_GSBASE is not canonical))
            THEN #GP(0); FI;
FI;
(* Ensure the enclave is not already active and this thread is the only one using the TCS*)
IF (DS:RBX.STATE = ACTIVE))
    THEN #GP(0); FI;
(* SECS.ATTRIBUTES.XFRM selects the features to be saved. *)
(* CR_XSAVE_PAGE_n: A list of 1 or more physical address of pages that contain the XSAVE area. *)
40-124 Vol. 3D
                            SGX INSTRUCTION REFERENCES
XRSTOR(TMP_MODE64, SECS.ATTRIBUTES.XFRM, CR_XSAVE_PAGE_n);
IF (XRSTOR failed with #GP) 
    THEN
        DS:RBX.STATE ← INACTIVE;
        #GP(0);
FI;
CR_ENCLAVE_MODE ← 1;
CR_ACTIVE_SECS ← TMP_SECS;
CR_ELRANGE ← (TMP_SECS.BASEADDR, TMP_SECS.SIZE);
(* Save sate for possible AEXs *)
CR_TCS_PA ← Physical_Address (DS:RBX);
CR_TCS_LA ← RBX;
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
RIP ← TMP_TARGET;
Restore_GPRs from DS:TMP_GPR;
(*Restore the RFLAGS values from SSA*)
RFLAGS.CF ← DS:TMP_GPR.RFLAGS.CF;
RFLAGS.PF ← DS:TMP_GPR.RFLAGS.PF;
RFLAGS.AF ← DS:TMP_GPR.RFLAGS.AF;
RFLAGS.ZF ← DS:TMP_GPR.RFLAGS.ZF;
RFLAGS.SF ← DS:TMP_GPR.RFLAGS.SF;
RFLAGS.DF ← DS:TMP_GPR.RFLAGS.DF;
RFLAGS.OF ← DS:TMP_GPR.RFLAGS.OF;
RFLAGS.NT ← DS:TMP_GPR.RFLAGS.NT;
RFLAGS.AC ← DS:TMP_GPR.RFLAGS.AC;
RFLAGS.ID ← DS:TMP_GPR.RFLAGS.ID;
RFLAGS.RF ← DS:TMP_GPR.RFLAGS.RF;
RFLAGS.VM ← 0;
IF (RFLAGS.IOPL = 3) 
    THEN RFLAGS.IF ← DS:TMP_GPR.RFLAGS.IF; FI;
IF (TCS.FLAGS.OPTIN = 0) 
    THEN RFLAGS.TF ← 0; FI;
(* If XSAVE is enabled, save XCR0 and replace it with SECS.ATTRIBUTES.XFRM*)
IF (CR4.OSXSAVE = 1) 
    CR_SAVE_XCR0 ← XCR0;
    XCR0 ← TMP_SECS.ATTRIBUTES.XFRM;
                            Vol. 3D 40-125
SGX INSTRUCTION REFERENCES
FI;
(* Pop the SSA stack*)
(DS:RBX).CSSA ← (DS:RBX).CSSA -1;
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
CR_DBGOPTIN ← TCS.FLAGS.DBGOPTIN;
Suppress all code breakpoints that are outside ELRANGE;
IF (CR_DBGOPTIN = 0) 
    THEN
        Suppress all code breakpoints that overlap with ELRANGE;
        CR_SAVE_TF ← RFLAGS.TF;
        RFLAGS.TF ← 0;
        Suppress any MTF VM exits during execution of the enclave;
        Clear all pending debug exceptions;
        Clear any pending MTF VM exit;
    ELSE
        Clear all pending debug exceptions;
        Clear pending MTF VM exits;
FI;
(* Assure consistent translations *)
Flush_linear_context;
Clear_Monitor_FSM;
Allow_front_end_to_begin_fetch_at_new_RIP;
40-126 Vol. 3D
                            SGX INSTRUCTION REFERENCES
```
### Flags Affected
RFLAGS.TF is cleared on opt-out entry

### Protected Mode Exceptions

<p>#GP(0)
If DS:RBX is not page aligned.
If the enclave is not initialized.
If the thread is not in the INACTIVE state.
If CS, DS, ES or SS bases are not all zero.
If executed in enclave mode.
If part or all of the FS or GS segment specified by TCS is outside the DS segment.
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

### 64-Bit Mode Exceptions

<p>#GP(0)
If DS:RBX is not page aligned.
If the enclave is not initialized.
If the thread is not in the INACTIVE state.
If CS, DS, ES or SS bases are not all zero.
If executed in enclave mode.
If part or all of the FS or GS segment specified by TCS is outside the DS segment.
If any reserved field in the TCS FLAG is set.
If the target address is not canonical.
If CR4.OSFXSR = 0.
If CR4.OSXSAVE = 0 and SECS.ATTRIBUTES.XFRM ≠ 3.
If CR4.OSXSAVE = 1and SECS.ATTRIBUTES.XFRM is not a subset of XCR0.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If DS:RBX does not point to a valid TCS.
If one or more pages of the current SSA frame are not readable/writable, or do not resolve to
a valid PT_REG EPC page.

Vol. 3D 40-127

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
