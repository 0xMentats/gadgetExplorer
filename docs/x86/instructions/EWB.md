SGX INSTRUCTION REFERENCES
<b>EWB</b> — Invalidate an EPC Page and Write out to Main Memory
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 0BH ENCLS[EWB]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>SGX1</td>
		<td>This leaf function invalidates an EPC page and writes it out to main memory.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td colspan=2><b>EAX</b></td>
		<td><b>RBX</b></td>
		<td><b>RCX</b></td>
		<td><b>RDX</b></td>
	</tr>
	<tr>
		<td>IR</td>
		<td>EWB (In)</td>
		<td>Error code (Out) Address of an PAGEINFO (In) Address of the EPC page (In)</td>
		<td></td>
		<td></td>
		<td>Address of a VA slot (In)</td>
	</tr>
</table>


### Description
This leaf function copies a page from the EPC to regular main memory. As part of the copying process, the page is
cryptographically protected. This instruction can only be executed when current privilege level is 0.

The table below provides additional information on the memory parameter of EPA leaf function.

EWB Memory Parameter Semantics
<table>
	<tr>
		<td><b>PAGEINFO</b></td>
		<td><b>PAGEINFO.SRCPGE</b></td>
		<td><b>PAGEINFO.PCMD</b></td>
		<td><b>EPCPAGE</b></td>
		<td><b>VASLOT</b></td>
	</tr>
	<tr>
		<td>Non-EPC R/W access</td>
		<td>Non-EPC R/W access</td>
		<td>Non-EPC R/W access</td>
		<td>EPC R/W access</td>
		<td>EPC R/W access</td>
	</tr>
</table>

The error codes are:

Table 40-51.  EWB Return Value in RAX
<table>
	<tr>
		<td><b>Error Code (see Table 40-4)</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>No Error</td>
		<td>EWB successful.</td>
	</tr>
	<tr>
		<td>SGX_PAGE_NOT_BLOCKED</td>
		<td>If page is not marked as blocked.</td>
	</tr>
	<tr>
		<td>SGX_NOT_TRACKED</td>
		<td>If EWB is racing with ETRACK instruction.</td>
	</tr>
	<tr>
		<td>SGX_VA_SLOT_OCCUPIED</td>
		<td>Version array slot contained valid entry.</td>
	</tr>
	<tr>
		<td>SGX_CHILD_PRESENT</td>
		<td>Child page present while attempting to page out enclave.</td>
	</tr>
</table>

Concurrency Restrictions

Table 40-52.  Base Concurrency Restrictions of EWB
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
		<td rowspan=2>EWB</td>
		<td>Source [DS:RCX]</td>
		<td>Exclusive</td>
		<td>#GP</td>
		<td>EPC_PAGE_CONFLICT_EXCEPTION</td>
	</tr>
	<tr>
		<td>VA [DS:RDX]</td>
		<td>Shared</td>
		<td>#GP</td>
		<td></td>
	</tr>
</table>

Table 40-53.  Additional Concurrency Restrictions of EWB
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
		<td rowspan=2>EWB</td>
		<td>Source [DS:RCX]</td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
	</tr>
	<tr>
		<td>VA [DS:RDX]</td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td>Exclusive</td>
		<td></td>
	</tr>
</table>

Vol. 3D 40-79
SGX INSTRUCTION REFERENCES

### Operation


#### Temp Variables in EWB Operational Flow
```java
<table>
	<tr>
		<td><b>Name</b></td>
		<td><b>Type</b></td>
		<td><b>Size (Bytes) Description</b></td>
		<td><b></b></td>
	</tr>
	<tr>
		<td>TMP_SRCPGE</td>
		<td>Memory page</td>
		<td>4096</td>
		<td></td>
	</tr>
	<tr>
		<td>TMP_PCMD</td>
		<td>PCMD</td>
		<td>128</td>
		<td></td>
	</tr>
	<tr>
		<td>TMP_SECS</td>
		<td>SECS</td>
		<td>4096</td>
		<td></td>
	</tr>
	<tr>
		<td>TMP_BPEPOCH</td>
		<td>UINT64</td>
		<td>8</td>
		<td></td>
	</tr>
	<tr>
		<td>TMP_BPREFCOUNT</td>
		<td>UINT64</td>
		<td>8</td>
		<td></td>
	</tr>
	<tr>
		<td>TMP_HEADER</td>
		<td>MAC Header</td>
		<td>128</td>
		<td></td>
	</tr>
	<tr>
		<td>TMP_PCMD_ENCLAVEID</td>
		<td>UINT64</td>
		<td>8</td>
		<td></td>
	</tr>
	<tr>
		<td>TMP_VER</td>
		<td>UINT64</td>
		<td>8</td>
		<td></td>
	</tr>
	<tr>
		<td>TMP_PK</td>
		<td>UINT128</td>
		<td>16</td>
		<td></td>
	</tr>
</table>

IF ( (DS:RBX is not 32Byte Aligned) or (DS:RCX is not 4KByte Aligned) )
    THEN #GP(0); FI;
IF (DS:RCX does not resolve within an EPC)
    THEN #PF(DS:RCX); FI;
IF (DS:RDX is not 8Byte Aligned)
    THEN #GP(0); FI;
IF (DS:RDX does not resolve within an EPC)
    THEN #PF(DS:RDX); FI;
(* EPCPAGE and VASLOT should not resolve to the same EPC page*)
IF (DS:RCX and DS:RDX resolve to the same EPC page)
    THEN #GP(0); FI;
TMP_SRCPGE ← DS:RBX.SRCPGE;
(* Note PAGEINFO.PCMD is overlaid on top of PAGEINFO.SECINFO *)
TMP_PCMD ← DS:RBX.PCMD;
If (DS:RBX.LINADDR ≠ 0) OR (DS:RBX.SECS ≠ 0) 
    THEN #GP(0); FI;
IF ( (DS:TMP_PCMD is not 128Byte Aligned) or (DS:TMP_SRCPGE is not 4KByte Aligned) )
    THEN #GP(0); FI;
(* Check for concurrent Intel SGX instruction access to the page *)
IF (Other Intel SGX instruction is accessing page) 
    THEN 
        IF (<<VMX non-root operation>> AND <<ENABLE_EPC_VIRTUALIZATION_EXTENSIONS>>)
            THEN
                VMCS.Exit_reason ← SGX_CONFLICT;
                VMCS.Exit_qualification.code ← EPC_PAGE_CONFLICT_EXCEPTION;
                VMCS.Exit_qualification.error ← 0;
                VMCS.Guest-physical_address ← << translation of DS:RCX produced by paging >>;
40-80 Vol. 3D
                            SGX INSTRUCTION REFERENCES
                VMCS.Guest-linear_address ← DS:RCX;
     
            Deliver VMEXIT;
 
            ELSE
                #GP(0);
        FI;
FI;
(*Check if the VA Page is being removed or changed*)
IF (VA Page is being modified)
    THEN #GP(0); FI;
(* Verify that EPCPAGE and VASLOT page are valid EPC pages and DS:RDX is VA *)
IF (EPCM(DS:RCX).VALID = 0) 
    THEN #PF(DS:RCX); FI;
IF ( (EPCM(DS:RDX & ~0FFFH).VALID = 0) or (EPCM(DS:RDX & ~FFFH).PT is not PT_VA) )
    THEN #PF(DS:RDX); FI;
(* Perform page-type-specific exception checks *)
IF ( (EPCM(DS:RCX).PT is PT_REG) or (EPCM(DS:RCX).PT is PT_TCS) or (EPCM(DS:RCX).PT is PT_TRIM ) )
    THEN
        TMP_SECS = Obtain SECS through EPCM(DS:RCX)
    (* Check that EBLOCK has occurred correctly *)
    IF (EBLOCK is not correct)
        THEN #GP(0); FI;
FI;
RFLAGS.ZF,CF,PF,AF,OF,SF ← 0;
RAX ← 0;
(* Perform page-type-specific checks *)
IF ( (EPCM(DS:RCX).PT is PT_REG) or (EPCM(DS:RCX).PT is PT_TCS) or (EPCM(DS:RCX).PT is PT_TRIM ))
    THEN
        (* check to see if the page is evictable *)
        IF (EPCM(DS:RCX).BLOCKED = 0) 
            THEN
                RAX ← SGX_PAGE NOT_BLOCKED;
                RFLAGS.ZF ← 1;
                GOTO ERROR_EXIT;
        FI;
        (* Check if tracking done correctly *)
        IF (Tracking not correct)
            THEN
                RAX ← SGX_NOT_TRACKED;
                RFLAGS.ZF ← 1;
                GOTO ERROR_EXIT;
        FI;
        (* Obtain EID to establish cryptographic binding between the paged-out page and the enclave *)
        TMP_HEADER.EID ← TMP_SECS.EID;
        (* Obtain EID as an enclave handle for software *)
        TMP_PCMD_ENCLAVEID ← TMP_SECS.EID;
    ELSE IF (EPCM(DS:RCX).PT is PT_SECS)
                            Vol. 3D 40-81
SGX INSTRUCTION REFERENCES
        (*check that there are no child pages inside the enclave *)
        IF (DS:RCX has an EPC page associated with it)
            THEN
                RAX ← SGX_CHILD_PRESENT;
                RFLAGS.ZF ← 1;
                GOTO ERROR_EXIT;
        FI:
        (* treat SECS as having a child page when VIRTCHILDCNT is non-zero *)
        IF (<<in VMX non-root operation>> AND 
        <<ENABLE_EPC_VIRTUALIZATION_EXTENSIONS>> AND 
        (SECS(DS:RCX).VIRTCHILDCNT ≠ 0))
            THEN
                RFLAGS.ZF ← 1;
   
                RAX ← SGX_CHILD_PRESENT;
                GOTO ERROR_EXIT;
        FI;
        TMP_HEADER.EID ← 0; 
        (* Obtain EID as an enclave handle for software *)
        TMP_PCMD_ENCLAVEID ← (DS:RCX).EID;
    ELSE IF (EPCM(DS:RCX).PT is PT_VA)
        TMP_HEADER.EID ← 0; // Zero is not a special value
        (* No enclave handle for VA pages*)
        TMP_PCMD_ENCLAVEID ← 0;
FI;
(* Zero out TMP_HEADER*)
TMP_HEADER[ sizeof(TMP_HEADER)-1 : 0] ← 0;
TMP_HEADER.LINADDR ← EPCM(DS:RCX).ENCLAVEADDRESS;
TMP_HEADER.SECINFO.FLAGS.PT ← EPCM(DS:RCX).PT;
TMP_HEADER.SECINFO.FLAGS.RWX ← EPCM(DS:RCX).RWX;
TMP_HEADER.SECINFO.FLAGS.PENDING ← EPCM(DS:RCX).PENDING;
TMP_HEADER.SECINFO.FLAGS.MODIFIED ← EPCM(DS:RCX).MODIFIED;
TMP_HEADER.SECINFO.FLAGS.PR ← EPCM(DS:RCX).PR;
(* Encrypt the page, DS:RCX could be encrypted in place. AES-GCM produces 2 values, {ciphertext, MAC}. *)
(* AES-GCM input parameters: key, GCM Counter, MAC_HDR, MAC_HDR_SIZE, SRC, SRC_SIZE)*)
{DS:TMP_SRCPGE, DS:TMP_PCMD.MAC} ← AES_GCM_ENC(CR_BASE_PK), (TMP_VER << 32), 
    TMP_HEADER, 128, DS:RCX, 4096);
(* Write the output *)
Zero out DS:TMP_PCMD.SECINFO 
DS:TMP_PCMD.SECINFO.FLAGS.PT ← EPCM(DS:RCX).PT;
DS:TMP_PCMD.SECINFO.FLAGS.RWX ← EPCM(DS:RCX).RWX;
DS:TMP_PCMD.SECINFO.FLAGS.PENDING ← EPCM(DS:RCX).PENDING;
DS:TMP_PCMD.SECINFO.FLAGS.MODIFIED ← EPCM(DS:RCX).MODIFIED;
DS:TMP_PCMD.SECINFO.FLAGS.PR ← EPCM(DS:RCX).PR;
DS:TMP_PCMD.RESERVED ← 0;
DS:TMP_PCMD.ENCLAVEID ← TMP_PCMD_ENCLAVEID;
DS:RBX.LINADDR ← EPCM(DS:RCX).ENCLAVEADDRESS;
(*Check if version array slot was empty *)
IF ([DS.RDX]) 
    THEN
40-82 Vol. 3D
                            SGX INSTRUCTION REFERENCES
        RAX ← SGX_VA_SLOT_OCCUPIED
        RFLAGS.CF ← 1;
FI;
(* Write version to Version Array slot *)
[DS.RDX] ← TMP_VER; 
(* Free up EPCM Entry *)
EPCM.(DS:RCX).VALID ← 0;
ERROR_EXIT:
```
### Flags Affected
ZF is set if page is not blocked, not tracked, or a child is present. Otherwise cleared.

CF is set if VA slot is previously occupied, Otherwise cleared.

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the DS segment limit.
If a memory operand is not properly aligned.
If the EPC page and VASLOT resolve to the same EPC page.
If another Intel SGX instruction is concurrently accessing either the target EPC, VA, or SECS
pages.
If the tracking resource is in use.
If the EPC page or the version array page is invalid.
If the parameters fail consistency checks.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If a memory operand is not an EPC page.
If one of the EPC memory operands has incorrect page type.

### 64-Bit Mode Exceptions

<p>#GP(0)
If a memory operand is non-canonical form.
If a memory operand is not properly aligned.
If the EPC page and VASLOT resolve to the same EPC page.
If another Intel SGX instruction is concurrently accessing either the target EPC, VA, or SECS
pages.
If the tracking resource is in use.
If the EPC page or the version array page in invalid.
If the parameters fail consistency checks.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If a memory operand is not an EPC page.
If one of the EPC memory operands has incorrect page type.

Vol. 3D 40-83

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
