SGX INSTRUCTION REFERENCES
<b>EEXIT</b> — Exits an Enclave
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op / En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 04H ENCLU[EEXIT]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>SGX1</td>
		<td>This leaf function is used to exit an enclave.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>EAX</b></td>
		<td><b>RBX</b></td>
		<td><b>RCX</b></td>
	</tr>
	<tr>
		<td>IR</td>
		<td>EEXIT (In)</td>
		<td>Target address outside the enclave (In)</td>
		<td>Address of the current AEP (In)</td>
	</tr>
</table>


### Description
The ENCLU[EEXIT] instruction exits the currently executing enclave and branches to the location specified in RBX.
RCX receives the current AEP. If RBX is not within the CS (32-bit mode) or is not canonical (64-bit mode) a \#GP(0)
results.

EEXIT Memory Parameter Semantics
<table>
	<tr>
		<td><b>Target Address</b></td>
	</tr>
	<tr>
		<td>Non-Enclave read and execute access</td>
	</tr>
</table>

If RBX specifies an address that is inside the enclave, the instruction will complete normally. The fetch of the next
instruction will occur in non-enclave mode, but will attempt to fetch from inside the enclave. This fetch returns a
fixed data pattern.

If secrets are contained in any registers, it is responsibility of enclave software to clear those registers.

If XCR0 was modified on enclave entry, it is restored to the value it had at the time of the most recent EENTER or
ERESUME.

If the enclave is opt-out, RFLAGS.TF is loaded from the value previously saved on EENTER.

Code and data breakpoints are unsuppressed.

Performance monitoring counters are unsuppressed.

Concurrency Restrictions

Table 40-62.  Base Concurrency Restrictions of EEXIT
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
		<td>EEXIT</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td></td>
	</tr>
</table>

Table 40-63.  Additional Concurrency Restrictions of EEXIT
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
		<td>EEXIT</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
	</tr>
</table>

Vol. 3D 40-101
SGX INSTRUCTION REFERENCES

### Operation


#### Temp Variables in EEXIT Operational Flow
```java
<table>
	<tr>
		<td><b>Name</b></td>
		<td><b>Type</b></td>
		<td><b>Size (Bits)</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>TMP_RIP</td>
		<td>Effective Address</td>
		<td>32/64</td>
		<td>Saved copy of CRIP for use when creating LBR.</td>
	</tr>
</table>

TMP_MODE64 ← ((IA32_EFER.LMA = 1) && (CS.L = 1));
IF (TMP_MODE64 = 1)
    THEN 
        IF (RBX is not canonical) THEN #GP(0); FI;
    ELSE
        IF (RBX > CS limit) THEN #GP(0); FI;
FI;
TMP_RIP ← CRIP;
RIP ← RBX;
(* Return current AEP in RCX *)
RCX ← CR_TCS_PA.AEP;
(* Do the FS/GS swap *)
FS.selector ← CR_SAVE_FS.selector;
FS.base ← CR_SAVE_FS.base;
FS.limit ← CR_SAVE_FS.limit;
FS.access_rights ← CR_SAVE_FS.access_rights;
GS.selector ← CR_SAVE_GS.selector;
GS.base ← CR_SAVE_GS.base;
GS.limit ← CR_SAVE_GS.limit;
GS.access_rights ← CR_SAVE_GS.access_rights;
(* Restore XCR0 if needed *)
IF (CR4.OSXSAVE = 1) 
    XCR0 ← CR_SAVE__XCR0;
FI;
Unsuppress_all_code_breakpoints_that_are_outside_ELRANGE;
IF (CR_DBGOPTIN = 0) 
    THEN
        UnSuppress_all_code_breakpoints_that_overlap_with_ELRANGE;
        Restore suppressed breakpoint matches;
        RFLAGS.TF ← CR_SAVE_TF;
        UnSuppress_montior_trap_flag;
        UnSuppress_LBR_Generation;
        UnSuppress_performance monitoring_activity;
        Restore performance monitoring counter AnyThread demotion to MyThread in enclave back to AnyThread
FI;
IF RFLAGS.TF = 1
    THEN Pend Single-Step #DB at the end of EEXIT;
FI;
40-102 Vol. 3D
                            SGX INSTRUCTION REFERENCES
IF the “monitor trap flag” VM-execution control is set
    THEN pend a MTF VM exit at the end of EEXIT;
FI;
CR_ENCLAVE_MODE ← 0;
CR_TCS_PA.STATE ← INACTIVE;
(* Assure consistent translations *)
Flush_linear_context;
```
### Flags Affected
RFLAGS.TF is restored from the value previously saved in EENTER or ERESUME.

### Protected Mode Exceptions

<p>#GP(0)
If executed outside an enclave.
If RBX is outside the CS segment.
<p>#PF(error code)
If a page fault occurs in accessing memory.

### 64-Bit Mode Exceptions

<p>#GP(0)
If executed outside an enclave.
If RBX is not canonical.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.

Vol. 3D 40-103

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
