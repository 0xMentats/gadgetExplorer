SGX INSTRUCTION REFERENCES
<b>ELDB / ELDU / ELDBC / ELBUC</b> — Load an EPC Page and Mark its State
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 07H ENCLS[ELDB]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>SGX1</td>
		<td>This leaf function loads, verifies an EPC page and marks the page as blocked.</td>
	</tr>
	<tr>
		<td>EAX = 08H ENCLS[ELDU]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>SGX1</td>
		<td>This leaf function loads, verifies an EPC page and marks the page as unblocked.</td>
	</tr>
	<tr>
		<td>EAX = 12H ENCLS[ELDBC]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>EAX[5]</td>
		<td>This leaf function behaves lie ELDB but with improved conflict handling for oversubscription.</td>
	</tr>
	<tr>
		<td>EAX = 13H ENCLS[ELDBC]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>EAX[5]</td>
		<td>This leaf function behaves like ELDU but with improved conflict handling for oversubscription.</td>
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
		<td>ELDB/ELDU (In)</td>
		<td>Return error code (Out)</td>
		<td>Address of the PAGEINFO (In)</td>
		<td>Address of the EPC page (In)</td>
		<td>Address of the version- array slot (In)</td>
	</tr>
</table>


### Description
This leaf function copies a page from regular main memory to the EPC. As part of the copying process, the page is
cryptographically authenticated and decrypted. This instruction can only be executed when current privilege level
is 0.

The ELDB leaf function sets the BLOCK bit in the EPCM entry for the destination page in the EPC after copying. The
ELDU leaf function clears the BLOCK bit in the EPCM entry for the destination page in the EPC after copying.

RBX contains the effective address of a PAGEINFO structure; RCX contains the effective address of the destination
EPC page; RDX holds the effective address of the version array slot that holds the version of the page.

The ELDBC/ELDUC leafs are very similar to ELDB and ELDU. They provide an error code on the concurrency conflict
for any of the pages which need to acquire a lock. These include the destination, SECS, and VA slot.

The table below provides additional information on the memory parameter of ELDB/ELDU leaf functions.

ELDB/ELDU/ELDBC/ELBUC Memory Parameter Semantics
<table>
	<tr>
		<td><b>PAGEINFO</b></td>
		<td><b>PAGEINFO.SRCPGE</b></td>
		<td><b>PAGEINFO.PCMD</b></td>
		<td><b>PAGEINFO.SECS</b></td>
		<td><b>EPCPAGE</b></td>
		<td><b>Version-Array Slot</b></td>
	</tr>
	<tr>
		<td>Non-enclave read access</td>
		<td>Non-enclave read access</td>
		<td>Non-enclave read access</td>
		<td>Enclave read/write access</td>
		<td>Read/Write access permitted by Enclave</td>
		<td>Read/Write access per- mitted by Enclave</td>
	</tr>
</table>

The error codes are:

Table 40-28.  ELDB/ELDU/ELDBC/ELBUC Return Value in RAX
<table>
	<tr>
		<td><b>Error Code (see Table 40-4)</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>No Error</td>
		<td>ELDB/ELDU successful.</td>
	</tr>
	<tr>
		<td>SGX_MAC_COMPARE_FAIL</td>
		<td>If the MAC check fails.</td>
	</tr>
</table>

40-50 Vol. 3D
SGX INSTRUCTION REFERENCES

Concurrency Restrictions

Table 40-29.  Base Concurrency Restrictions of ELDB/ELDU/ELDBC/ELBUC
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
		<td rowspan=3>ELDB/ELDU/</td>
		<td>Target [DS:RCX]</td>
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
	<tr>
		<td>SECS [DS:RBX]PAGEINFO.SECS</td>
		<td>Shared</td>
		<td>#GP</td>
		<td></td>
	</tr>
	<tr>
		<td rowspan=3>ELDBC/ELBUC</td>
		<td>Target [DS:RCX]</td>
		<td>Exclusive</td>
		<td>SGX_EPC_PAGE_ CONFLICT</td>
		<td>EPC_PAGE_CONFLICT_ERROR</td>
	</tr>
	<tr>
		<td>VA [DS:RDX]</td>
		<td>Shared</td>
		<td>SGX_EPC_PAGE_ CONFLICT</td>
		<td></td>
	</tr>
	<tr>
		<td>SECS [DS:RBX]PAGEINFO.SECS</td>
		<td>Shared</td>
		<td>SGX_EPC_PAGE_ CONFLICT</td>
		<td></td>
	</tr>
</table>

Table 40-30.  Additional Concurrency Restrictions of ELDB/ELDU/ELDBC/ELBUC
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
		<td rowspan=3>ELDB/ELDU/</td>
		<td>Target [DS:RCX]</td>
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
		<td>Concurrent</td>
		<td></td>
	</tr>
	<tr>
		<td>SECS [DS:RBX]PAGEINFO.SECS Concurrent</td>
		<td></td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
	</tr>
	<tr>
		<td rowspan=3>ELDBC/ELBUC Target [DS:RCX]</td>
		<td></td>
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
		<td>Concurrent</td>
		<td></td>
	</tr>
	<tr>
		<td>SECS [DS:RBX]PAGEINFO.SECS Concurrent</td>
		<td></td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
	</tr>
</table>


### Operation


#### Temp Variables in ELDB/ELDU/ELDBC/ELBUC Operational Flow
```java
<table>
	<tr>
		<td><b>Name</b></td>
		<td><b>Type</b></td>
		<td><b>Size (Bits)</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>TMP_SRCPGE</td>
		<td>Memory page</td>
		<td>4KBytes</td>
		<td></td>
	</tr>
	<tr>
		<td>TMP_SECS</td>
		<td>Memory page</td>
		<td>4KBytes</td>
		<td></td>
	</tr>
	<tr>
		<td>TMP_PCMD</td>
		<td>PCMD</td>
		<td>128 Bytes</td>
		<td></td>
	</tr>
	<tr>
		<td>TMP_HEADER</td>
		<td>MACHEADER</td>
		<td>128 Bytes</td>
		<td></td>
	</tr>
	<tr>
		<td>TMP_VER</td>
		<td>UINT64</td>
		<td>64</td>
		<td></td>
	</tr>
	<tr>
		<td>TMP_MAC</td>
		<td>UINT128</td>
		<td>128</td>
		<td></td>
	</tr>
	<tr>
		<td>TMP_PK</td>
		<td>UINT128</td>
		<td>128</td>
		<td>Page encryption/MAC key.</td>
	</tr>
	<tr>
		<td>SCRATCH_PCMD</td>
		<td>PCMD</td>
		<td>128 Bytes</td>
		<td></td>
	</tr>
</table>

(* Check PAGEINFO and EPCPAGE alignment *)
IF ( (DS:RBX is not 32Byte Aligned) or (DS:RCX is not 4KByte Aligned) )
    THEN #GP(0); FI;
                            Vol. 3D 40-51
SGX INSTRUCTION REFERENCES
IF (DS:RCX does not resolve within an EPC)
    THEN #PF(DS:RCX); FI;
(* Check VASLOT alignment *)
IF (DS:RDX is not 8Byte aligned)
    THEN #GP(0); FI;
IF (DS:RDX does not resolve within an EPC)
    THEN #PF(DS:RDX); FI;
TMP_SRCPGE ← DS:RBX.SRCPGE;
TMP_SECS ← DS:RBX.SECS;
TMP_PCMD ← DS:RBX.PCMD;
(* Check alignment of PAGEINFO (RBX) linked parameters. Note: PCMD pointer is overlaid on top of PAGEINFO.SECINFO field *)
IF ( (DS:TMP_PCMD is not 128Byte aligned) or (DS:TMP_SRCPGE is not 4KByte aligned) )
    THEN #GP(0); FI;
(* Check concurrency of EPC by other Intel SGX instructions *)
IF (other instructions accessing EPC)
    THEN
    
    IF ((EAX==07h) OR (EAX==08h))   (* ELDB/ELDU *)
    
        THEN
        
            IF (<<VMX non-root operation>> AND  
                    <<ENABLE_EPC_VIRTUALIZATION_EXTENSIONS>>)
                    THEN 
                        VMCS.Exit_reason ← SGX_CONFLICT;
                        VMCS.Exit_qualification.code ← EPC_PAGE_CONFLICT_EXCEPTION;
                        VMCS.Exit_qualification.error ← 0;
                        VMCS.Guest-physical_address ← 
                              << translation of DS:RCX produced by paging >>;
                        VMCS.Guest-linear_address ← DS:RCX;
                        Deliver VMEXIT;
                    ELSE
                        #GP(0);
                FI;
            ELSE (* ELDBC/ELDUC *)
        
            IF (<<VMX non-root operation>> AND  
                    <<ENABLE_EPC_VIRTUALIZATION_EXTENSIONS>>)
                    THEN 
                        VMCS.Exit_reason ← SGX_CONFLICT;
                        VMCS.Exit_qualification.code ← EPC_PAGE_CONFLICT_ERROR;
                        VMCS.Exit_qualification.error ← SGX_EPC_PAGE_CONFLICT;
                        VMCS.Guest-physical_address ← 
                              << translation of DS:RCX produced by paging >>;
                        VMCS.Guest-linear_address ← DS:RCX;
                        Deliver VMEXIT;
                    ELSE
            
                RFLAGS.ZF ← 1;
                        RFLAGS.CF ← 0; 
            
                RAX ← SGX_EPC_PAGE_CONFLICT;
            
                GOTO ERROR_EXIT;
                FI;
40-52 Vol. 3D
                            SGX INSTRUCTION REFERENCES
        FI;
FI;
(* Check concurrency of EPC and VASLOT by other Intel SGX instructions *)
IF (Other instructions modifying VA slot) 
    THEN
        IF ((EAX==07h) OR (EAX==08h))   (* ELDB/ELDU *)
        #GP(0);
        FI;
    ELSE (* ELDBC/ELDUC *)
        RFLAGS.ZF ← 1;
        RFLAGS.CF ← 0; 
        RAX ← SGX_EPC_PAGE_CONFLICT;
        GOTO ERROR_EXIT;
FI; 
(* Verify EPCM attributes of EPC page, VA, and SECS *)
IF (EPCM(DS:RCX).VALID = 1) 
    THEN #PF(DS:RCX); FI;
IF ( (EPCM(DS:RDX & ~0FFFH).VALID = 0) or (EPCM(DS:RDX & ~0FFFH).PT ≠ PT_VA) )
    THEN #PF(DS:RDX); FI;
(* Copy PCMD into scratch buffer *)
SCRATCH_PCMD[1023: 0]← DS:TMP_PCMD[1023:0];
(* Zero out TMP_HEADER*)
TMP_HEADER[sizeof(TMP_HEADER)-1: 0]← 0;
TMP_HEADER.SECINFO ← SCRATCH_PCMD.SECINFO;
TMP_HEADER.RSVD ← SCRATCH_PCMD.RSVD;
TMP_HEADER.LINADDR ← DS:RBX.LINADDR;
(* Verify various attributes of SECS parameter *)
IF ( (TMP_HEADER.SECINFO.FLAGS.PT = PT_REG) or (TMP_HEADER.SECINFO.FLAGS.PT = PT_TCS) or 
     (TMP_HEADER.SECINFO.FLAGS.PT = PT_TRIM) )
    THEN 
        IF ( DS:TMP_SECS is not 4KByte aligned) 
            THEN #GP(0) FI;
        IF (DS:TMP_SECS does not resolve within an EPC) 
            THEN #PF(DS:TMP_SECS) FI;
        IF ( Other instructions modifying SECS) 
            THEN 
                IF ((EAX==07h) OR (EAX==08h))   (* ELDB/ELDU *)
        
                #GP(0);
                FI;
            ELSE (* ELDBC/ELDUC *)
                RFLAGS.ZF ← 1;
        
            RFLAGS.CF ← 0; 
        
            RAX ← SGX_EPC_PAGE_CONFLICT;
        
            GOTO ERROR_EXIT;
        FI;
FI;
                            Vol. 3D 40-53
SGX INSTRUCTION REFERENCES
IF ( (TMP_HEADER.SECINFO.FLAGS.PT = PT_REG) or (TMP_HEADER.SECINFO.FLAGS.PT = PT_TCS) or 
     (TMP_HEADER.SECINFO.FLAGS.PT = PT_TRIM) )
    THEN 
        TMP_HEADER.EID ← DS:TMP_SECS.EID;
    ELSE
        (* These pages do not have any parent, and hence no EID binding *)
        TMP_HEADER.EID ← 0;
FI;
(* Copy 4KBytes SRCPGE to secure location *)
DS:RCX[32767: 0]← DS:TMP_SRCPGE[32767: 0];
TMP_VER ← DS:RDX[63:0];
(* Decrypt and MAC page. AES_GCM_DEC has 2 outputs, {plain text, MAC} *)
(* Parameters for AES_GCM_DEC {Key, Counter, ..} *)
{DS:RCX, TMP_MAC} ← AES_GCM_DEC(CR_BASE_PK, TMP_VER << 32, TMP_HEADER, 128, DS:RCX, 4096);
IF ( (TMP_MAC ≠ DS:TMP_PCMD.MAC) )
    THEN 
        RFLAGS.ZF ← 1;
        RAX← SGX_MAC_COMPARE_FAIL;
        GOTO ERROR_EXIT;
FI;
(* Check version before committing *)
IF (DS:RDX ≠ 0)
    THEN #GP(0); 
    ELSE
        DS:RDX← TMP_VER;
FI;
(* Commit EPCM changes *)
EPCM(DS:RCX).PT ← TMP_HEADER.SECINFO.FLAGS.PT;
EPCM(DS:RCX).RWX ← TMP_HEADER.SECINFO.FLAGS.RWX;
EPCM(DS:RCX).PENDING ← TMP_HEADER.SECINFO.FLAGS.PENDING;
EPCM(DS:RCX).MODIFIED ← TMP_HEADER.SECINFO.FLAGS.MODIFIED;
EPCM(DS:RCX).PR ← TMP_HEADER.SECINFO.FLAGS.PR;
EPCM(DS:RCX).ENCLAVEADDRESS ← TMP_HEADER.LINADDR;
IF ( ((EAX = 07H) or (EAX = 12H)) and (TMP_HEADER.SECINFO.FLAGS.PT is NOT PT_SECS or PT_VA))
    THEN 
        EPCM(DS:RCX).BLOCKED ← 1;
    ELSE
        EPCM(DS:RCX).BLOCKED ← 0;
FI;
IF (TMP_HEADER.SECINFO.FLAGS.PT is PT_SECS)
    << store translation of DS:RCX produced by paging in SECS(DS:RCX).ENCLAVECONTEXT >>
FI;
EPCM(DS:RCX). VALID ← 1;
RAX← 0;
RFLAGS.ZF ← 0;
40-54 Vol. 3D
                            SGX INSTRUCTION REFERENCES
ERROR_EXIT:
RFLAGS.CF,PF,AF,OF,SF ← 0;
```
### Flags Affected
Sets ZF if unsuccessful, otherwise cleared and RAX returns error code. Clears CF, PF, AF, OF, SF.

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the DS segment limit.
If a memory operand is not properly aligned.
If the instruction’s EPC resource is in use by others.
If the instruction fails to verify MAC.
If the version-array slot is in use.
If the parameters fail consistency checks.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If a memory operand expected to be in EPC does not resolve to an EPC page.
If one of the EPC memory operands has incorrect page type.
If the destination EPC page is already valid.

### 64-Bit Mode Exceptions

<p>#GP(0)
If a memory operand is non-canonical form.
If a memory operand is not properly aligned.
If the instruction’s EPC resource is in use by others.
If the instruction fails to verify MAC.
If the version-array slot is in use.
If the parameters fail consistency checks.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If a memory operand expected to be in EPC does not resolve to an EPC page.
If one of the EPC memory operands has incorrect page type.
If the destination EPC page is already valid.

Vol. 3D 40-55

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
