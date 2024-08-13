SGX INSTRUCTION REFERENCES
<b>ETRACK</b> — Activates EBLOCK Checks
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 0CH ENCLS[ETRACK]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>SGX1</td>
		<td>This leaf function activates EBLOCK checks.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td colspan=2><b>EAX</b></td>
		<td><b>RCX</b></td>
	</tr>
	<tr>
		<td>IR</td>
		<td>ETRACK (In)</td>
		<td>Return error code (Out)</td>
		<td>Pointer to the SECS of the EPC page (In)</td>
	</tr>
</table>


### Description
This leaf function provides the mechanism for hardware to track that software has completed the required TLB
address clears successfully. The instruction can only be executed when the current privilege level is 0.

The content of RCX is an effective address of an EPC page.

The table below provides additional information on the memory parameter of ETRACK leaf function.

ETRACK Memory Parameter Semantics
<table>
	<tr>
		<td><b>EPCPAGE</b></td>
	</tr>
	<tr>
		<td>Read/Write access permitted by Enclave</td>
	</tr>
</table>

The error codes are:

Table 40-45.  ETRACK Return Value in RAX
<table>
	<tr>
		<td><b>Error Code (see Table 40-4)</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>No Error</td>
		<td>ETRACK successful.</td>
	</tr>
	<tr>
		<td>SGX_PREV_TRK_INCMPL</td>
		<td>All processors did not complete the previous shoot-down sequence.</td>
	</tr>
</table>

Concurrency Restrictions

Table 40-46.  Base Concurrency Restrictions of ETRACK
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
		<td>ETRACK</td>
		<td>SECS [DS:RCX]</td>
		<td>Shared</td>
		<td>#GP</td>
		<td></td>
	</tr>
</table>

Table 40-47.  Additional Concurrency Restrictions of ETRACK
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
		<td>ETRACK</td>
		<td>SECS [DS:RCX]</td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td>Exclusive</td>
		<td>SGX_EPC_PAGE _CONFLICT</td>
	</tr>
</table>

40-72 Vol. 3D
SGX INSTRUCTION REFERENCES

### Operation

```java
IF (DS:RCX is not 4KByte Aligned)
    THEN #GP(0); FI;
IF (DS:RCX does not resolve within an EPC)
    THEN #PF(DS:RCX); FI;
(* Check concurrency with other Intel SGX instructions *)
IF (Other Intel SGX instructions using tracking facility on this SECS) 
    THEN 
        IF (<<VMX non-root operation>> AND <<ENABLE_EPC_VIRTUALIZATION_EXTENSIONS>>)
            THEN
                VMCS.Exit_reason ← SGX_CONFLICT;
                VMCS.Exit_qualification.code ← TRACKING_RESOURCE_CONFLICT;
                VMCS.Exit_qualification.error ← 0;
                VMCS.Guest-physical_address ← SECS(TMP_SECS).ENCLAVECONTEXT;
                VMCS.Guest-linear_address ← 0;
        
            Deliver VMEXIT;
 
            ELSE
                #GP(0);
        FI;
FI;
IF (EPCM(DS:RCX). VALID = 0)
    THEN #PF(DS:RCX); FI;
IF (EPCM(DS:RCX).PT ≠ PT_SECS) 
    THEN #PF(DS:RCX); FI;
(* All processors must have completed the previous tracking cycle*)
IF ( (DS:RCX).TRACKING ≠ 0) ) 
    THEN 
        IF (<<VMX non-root operation>> AND <<ENABLE_EPC_VIRTUALIZATION_EXTENSIONS>>)
            THEN
                VMCS.Exit_reason ← SGX_CONFLICT;
                VMCS.Exit_qualification.code ← TRACKING_REFERENCE_CONFLICT;
                VMCS.Exit_qualification.error ← 0;
                VMCS.Guest-physical_address ← SECS(TMP_SECS).ENCLAVECONTEXT;
                VMCS.Guest-linear_address ← 0;
        
            Deliver VMEXIT;
        FI;
    RFLAGS.ZF ← 1;
        RAX← SGX_PREV_TRK_INCMPL;
        GOTO DONE;
    ELSE
        RAX← 0;
        RFLAGS.ZF ← 0;
FI;
DONE:
RFLAGS.CF,PF,AF,OF,SF ← 0;
```
### Flags Affected

Sets ZF if SECS is in use or invalid, otherwise cleared. Clears CF, PF, AF, OF, SF.

Vol. 3D 40-73
SGX INSTRUCTION REFERENCES

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the DS segment limit.
If a memory operand is not properly aligned.
If another thread is concurrently using the tracking facility on this SECS.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If a memory operand is not an EPC page.

### 64-Bit Mode Exceptions

<p>#GP(0)
If a memory operand is non-canonical form.
If a memory operand is not properly aligned.
If the specified EPC resource is in use.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If a memory operand is not an EPC page.

40-74 Vol. 3D

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
