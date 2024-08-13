SGX INSTRUCTION REFERENCES
<b>ECREATE</b> — Create an SECS page in the Enclave Page Cache
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 00H ENCLS[ECREATE]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>SGX1</td>
		<td>This leaf function begins an enclave build by creating an SECS page in EPC.</td>
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
		<td>ECREATE (In)</td>
		<td>Address of a PAGEINFO (In)</td>
		<td>Address of the destination SECS page (In)</td>
	</tr>
</table>


### Description
ENCLS[ECREATE] is the first instruction executed in the enclave build process. ECREATE copies an SECS structure
outside the EPC into an SECS page inside the EPC. The internal structure of SECS is not accessible to software.

ECREATE will set up fields in the protected SECS and mark the page as valid inside the EPC. ECREATE initializes or
checks unused fields.

Software sets the following fields in the source structure: SECS:BASEADDR, SECS:SIZE in bytes, ATTRIBUTES,
CONFIGID and CONFIGSVN. SECS:BASEADDR must be naturally aligned on an SECS.SIZE boundary. SECS.SIZE
must be at least 2 pages (8192).

The source operand RBX contains an effective address of a PAGEINFO structure. PAGEINFO contains an effective
address of a source SECS and an effective address of an SECINFO. The SECS field in PAGEINFO is not used.

The RCX register is the effective address of the destination SECS. It is an address of an empty slot in the EPC. The
SECS structure must be page aligned. SECINFO flags must specify the page as an SECS page.

ECREATE Memory Parameter Semantics
<table>
	<tr>
		<td><b>PAGEINFO</b></td>
		<td><b>PAGEINFO.SRCPGE</b></td>
		<td><b>PAGEINFO.SECINFO</b></td>
		<td><b>EPCPAGE</b></td>
	</tr>
	<tr>
		<td>Read access permitted by Non Enclave</td>
		<td>Read access permitted by Non Enclave</td>
		<td>Read access permitted by Non Enclave</td>
		<td>Write access permitted by Enclave</td>
	</tr>
</table>

ECREATE will fault if the SECS target page is in use; already valid; outside the EPC. It will also fault if addresses are
not aligned; unused PAGEINFO fields are not zero.

If the amount of space needed to store the SSA frame is greater than the amount specified in SECS.SSAFRAME-
SIZE, a \#GP(0) results. The amount of space needed for an SSA frame is computed based on
DS:TMP_SECS.ATTRIBUTES.XFRM size. Details of computing the size can be found Section 41.7.

Concurrency Restrictions

Table 40-15.  Base Concurrency Restrictions of ECREATE
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
		<td>ECREATE</td>
		<td>SECS [DS:RCX]</td>
		<td>Exclusive</td>
		<td>#GP</td>
		<td>EPC_PAGE_CONFLICT_EXCEPTION</td>
	</tr>
</table>

40-28 Vol. 3D
SGX INSTRUCTION REFERENCES

Table 40-16.  Additional Concurrency Restrictions of ECREATE
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
		<td>ECREATE</td>
		<td>SECS [DS:RCX]</td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
	</tr>
</table>


### Operation


#### Temp Variables in ECREATE Operational Flow
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
		<td>Effective Address</td>
		<td>32/64</td>
		<td>Effective address of the SECS source page.</td>
	</tr>
	<tr>
		<td>TMP_SECS</td>
		<td>Effective Address</td>
		<td>32/64</td>
		<td>Effective address of the SECS destination page.</td>
	</tr>
	<tr>
		<td>TMP_SECINFO</td>
		<td>Effective Address</td>
		<td>32/64</td>
		<td>Effective address of an SECINFO structure which contains security attributes of the SECS page to be added.</td>
	</tr>
	<tr>
		<td>TMP_XSIZE</td>
		<td>SSA Size</td>
		<td>64</td>
		<td>The size calculation of SSA frame.</td>
	</tr>
	<tr>
		<td>TMP_MISC_SIZE</td>
		<td>MISC Field Size</td>
		<td>64</td>
		<td>Size of the selected MISC field components.</td>
	</tr>
	<tr>
		<td>TMPUPDATEFIELD</td>
		<td>SHA256 Buffer</td>
		<td>512</td>
		<td>Buffer used to hold data being added to TMP_SECS.MRENCLAVE.</td>
	</tr>
</table>

IF (DS:RBX is not 32Byte Aligned)
    THEN #GP(0); FI;
IF (DS:RCX is not 4KByte Aligned)
    THEN #GP(0); FI;
IF (DS:RCX does not resolve within an EPC)
    THEN #PF(DS:RCX); FI;
TMP_SRCPGE ← DS:RBX.SRCPGE;
TMP_SECINFO ← DS:RBX.SECINFO;
IF (DS:TMP_SRCPGE is not 4KByte aligned or DS:TMP_SECINFO is not 64Byte aligned)
    THEN #GP(0); FI;
IF (DS:RBX.LINADDR ! = 0 or DS:RBX.SECS ≠ 0)
    THEN #GP(0); FI;
(* Check for misconfigured SECINFO flags*)
IF (DS:TMP_SECINFO reserved fields are not zero or DS:TMP_SECINFO.FLAGS.PT ≠ PT_SECS) 
    THEN #GP(0); FI;
TMP_SECS ← RCX;
IF (EPC entry in use) 
    THEN 
        IF (<<VMX non-root operation>> AND <<ENABLE_EPC_VIRTUALIZATION_EXTENSIONS>>)
            THEN
                VMCS.Exit_reason ← SGX_CONFLICT;
                            Vol. 3D 40-29
SGX INSTRUCTION REFERENCES
                VMCS.Exit_qualification.code ← EPC_PAGE_CONFLICT_EXCEPTION;
                VMCS.Exit_qualification.error ← 0;
                VMCS.Guest-physical_address ← 
                    << translation of DS:TMP_SECS produced by paging >>;
                VMCS.Guest-linear_address ← DS:TMP_SECS;
        
            Deliver VMEXIT;
 
            ELSE
                #GP(0);
        FI;
FI;
IF (EPC entry in use) 
    THEN #GP(0); FI;
IF (EPCM(DS:RCX).VALID = 1) 
    THEN #PF(DS:RCX); FI;
(* Copy 4KBytes from source page to EPC page*)
DS:RCX[32767:0] ← DS:TMP_SRCPGE[32767:0];
(* Check lower 2 bits of XFRM are set *)
IF ( ( DS:TMP_SECS.ATTRIBUTES.XFRM BitwiseAND 03H) ≠ 03H) 
    THEN #GP(0); FI;
IF (XFRM is illegal) 
    THEN #GP(0); FI;
(* Make sure that the SECS does not have any unsupported MISCSELECT options*)
IF ( !(CPUID.(EAX=12H, ECX=0):EBX[31:0] & DS:TMP_SECS.MISCSELECT[31:0]) )
    THEN
        EPCM(DS:TMP_SECS).EntryLock.Release();
        #GP(0);
FI;
( * Compute size of MISC area *)
TMP_MISC_SIZE ← compute_misc_region_size();
(* Compute the size required to save state of the enclave on async exit, see Section 41.7.2.2*)
TMP_XSIZE ← compute_xsave_size(DS:TMP_SECS.ATTRIBUTES.XFRM) + GPR_SIZE + TMP_MISC_SIZE;
(* Ensure that the declared area is large enough to hold XSAVE and GPR stat *)
IF ( DS:TMP_SECS.SSAFRAMESIZE*4096 < TMP_XSIZE) 
    THEN #GP(0); FI;
IF ( (DS:TMP_SECS.ATTRIBUTES.MODE64BIT = 1) and (DS:TMP_SECS.BASEADDR is not canonical) )
    THEN #GP(0); FI;
IF ( (DS:TMP_SECS.ATTRIBUTES.MODE64BIT = 0) and (DS:TMP_SECS.BASEADDR and 0FFFFFFFF00000000H) )
    THEN #GP(0); FI;
IF ( (DS:TMP_SECS.ATTRIBUTES.MODE64BIT = 0) and (DS:TMP_SECS.SIZE ≥ 2 ^ (CPUID.(EAX=12H, ECX=0):.EDX[7:0]) ) )
    THEN #GP(0); FI;
IF ( (DS:TMP_SECS.ATTRIBUTES.MODE64BIT = 1) and (DS:TMP_SECS.SIZE ≥ 2 ^ (CPUID.(EAX=12H, ECX=0):.EDX[15:8]) ) )
40-30 Vol. 3D
                            SGX INSTRUCTION REFERENCES
    THEN #GP(0); FI;
(* Enclave size must be at least 8192 bytes and must be power of 2 in bytes*)
IF (DS:TMP_SECS.SIZE < 8192 or popcnt(DS:TMP_SECS.SIZE) > 1) 
    THEN #GP(0); FI;
(* Ensure base address of an enclave is aligned on size*)
IF ( ( DS:TMP_SECS.BASEADDR and (DS:TMP_SECS.SIZE-1) ) )
    THEN #GP(0); FI;
(* Ensure the SECS does not have any unsupported attributes*)
IF ( DS:TMP_SECS.ATTRIBUTES and (~CR_SGX_ATTRIBUTES_MASK) )
    THEN #GP(0); FI;
IF ( DS:TMP_SECS reserved fields are not zero) 
    THEN #GP(0); FI;
(* Verify that CONFIGID/CONFIGSVN are not set with attribute *)
IF ( ((DS:TMP_SECS.CONFIGID ≠ 0) or (DS:TMP_SECS.CONFIGSVN ≠0)) AND (DS:TMP_SECS.ATTRIBUTES.KSS == 0 ))
    THEN #GP(0); FI;
Clear DS:TMP_SECS to Uninitialized;
DS:TMP_SECS.MRENCLAVE ← SHA256INITIALIZE(DS:TMP_SECS.MRENCLAVE);
DS:TMP_SECS.ISVSVN ← 0;
DS:TMP_SECS.ISVPRODID ← 0;
(* Initialize hash updates etc*)
Initialize enclave’s MRENCLAVE update counter;
(* Add “ECREATE” string and SECS fields to MRENCLAVE *)
TMPUPDATEFIELD[63:0] ← 0045544145524345H; // “ECREATE”
TMPUPDATEFIELD[95:64] ← DS:TMP_SECS.SSAFRAMESIZE;
TMPUPDATEFIELD[159:96] ← DS:TMP_SECS.SIZE;
TMPUPDATEFIELD[511:160] ← 0; 
DS:TMP_SECS.MRENCLAVE ← SHA256UPDATE(DS:TMP_SECS.MRENCLAVE, TMPUPDATEFIELD)
INC enclave’s MRENCLAVE update counter;
(* Set EID *)
DS:TMP_SECS.EID ← LockedXAdd(CR_NEXT_EID, 1);
(* Initialize the virtual child count to zero *)
DS:TMP_SECS.VIRTCHILDCNT ← 0;
(* Load ENCLAVECONTEXT with Address out of paging of SECS *)
<< store translation of DS:RCX produced by paging in SECS(DS:RCX).ENCLAVECONTEXT >>
(* Set the EPCM entry, first create SECS identifier and store the identifier in EPCM *)
EPCM(DS:TMP_SECS).PT ← PT_SECS;
EPCM(DS:TMP_SECS).ENCLAVEADDRESS ← 0;
EPCM(DS:TMP_SECS).R ← 0;
EPCM(DS:TMP_SECS).W ← 0;
EPCM(DS:TMP_SECS).X ← 0;
(* Set EPCM entry fields *)
                            Vol. 3D 40-31
SGX INSTRUCTION REFERENCES
EPCM(DS:RCX).BLOCKED ← 0;
EPCM(DS:RCX).PENDING ← 0;
EPCM(DS:RCX).MODIFIED ← 0;
EPCM(DS:RCX).PR ← 0;
EPCM(DS:RCX).VALID ← 1;
```
### Flags Affected
None

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the DS segment limit.
If a memory operand is not properly aligned.
If the reserved fields are not zero.
If PAGEINFO.SECS is not zero.
If PAGEINFO.LINADDR is not zero.
If the SECS destination is locked.
If SECS.SSAFRAMESIZE is insufficient.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If the SECS destination is outside the EPC.

### 64-Bit Mode Exceptions

<p>#GP(0)
If a memory address is non-canonical form.
If a memory operand is not properly aligned.
If the reserved fields are not zero.
If PAGEINFO.SECS is not zero.
If PAGEINFO.LINADDR is not zero.
If the SECS destination is locked.
If SECS.SSAFRAMESIZE is insufficient.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If the SECS destination is outside the EPC.

40-32 Vol. 3D

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
