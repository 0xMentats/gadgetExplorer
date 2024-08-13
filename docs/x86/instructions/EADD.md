SGX INSTRUCTION REFERENCES
<b>EADD</b> — Add a Page to an Uninitialized Enclave
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 01H ENCLS[EADD]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>SGX1</td>
		<td>This leaf function adds a page to an uninitialized enclave.</td>
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
		<td>EADD (In)</td>
		<td>Address of a PAGEINFO (In)</td>
		<td>Address of the destination EPC page (In)</td>
	</tr>
</table>


### Description
This leaf function copies a source page from non-enclave memory into the EPC, associates the EPC page with an
SECS page residing in the EPC, and stores the linear address and security attributes in EPCM. As part of the asso-
ciation, the enclave offset and the security attributes are measured and extended into the SECS.MRENCLAVE. This
instruction can only be executed when current privilege level is 0.

RBX contains the effective address of a PAGEINFO structure while RCX contains the effective address of an EPC
page. The table below provides additional information on the memory parameter of EADD leaf function.

EADD Memory Parameter Semantics
<table>
	<tr>
		<td><b>PAGEINFO</b></td>
		<td><b>PAGEINFO.SECS</b></td>
		<td><b>PAGEINFO.SRCPGE</b></td>
		<td><b>PAGEINFO.SECINFO</b></td>
		<td><b>EPCPAGE</b></td>
	</tr>
	<tr>
		<td>Read access permitted by Non Enclave</td>
		<td>Read/Write access permit- ted by Enclave</td>
		<td>Read access permitted by Non Enclave</td>
		<td>Read access permitted by Non Enclave</td>
		<td>Write access permitted by Enclave</td>
	</tr>
</table>

The instruction faults if any of the following:

EADD Faulting Conditions
<table>
	<tr>
		<td><b>The operands are not properly aligned.</b></td>
		<td><b>Unsupported security attributes are set.</b></td>
	</tr>
	<tr>
		<td>Refers to an invalid SECS.</td>
		<td>Reference is made to an SECS that is locked by another thread.</td>
	</tr>
	<tr>
		<td>The EPC page is locked by another thread.</td>
		<td>RCX does not contain an effective address of an EPC page.</td>
	</tr>
	<tr>
		<td>The EPC page is already valid.</td>
		<td>If security attributes specifies a TCS and the source page specifies unsupported TCS values or fields.</td>
	</tr>
	<tr>
		<td>The SECS has been initialized.</td>
		<td>The specified enclave offset is outside of the enclave address space.</td>
	</tr>
</table>

Concurrency Restrictions

Table 40-8.  Base Concurrency Restrictions of EADD
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
		<td rowspan=2>EADD</td>
		<td>Target [DS:RCX]</td>
		<td>Exclusive</td>
		<td>#GP</td>
		<td>EPC_PAGE_CONFLICT_EXCEPTION</td>
	</tr>
	<tr>
		<td>SECS [DS:RBX]PAGEINFO.SECS</td>
		<td>Shared</td>
		<td>#GP</td>
		<td></td>
	</tr>
</table>

Vol. 3D 40-17
SGX INSTRUCTION REFERENCES

Table 40-9.  Additional Concurrency Restrictions of EADD
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
		<td rowspan=2>EADD</td>
		<td>Target [DS:RCX]</td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
	</tr>
	<tr>
		<td>SECS [DS:RBX]PAGE- INFO.SECS</td>
		<td>Concurrent</td>
		<td></td>
		<td>Exclusive</td>
		<td>#GP</td>
		<td>Concurrent</td>
		<td></td>
	</tr>
</table>


### Operation


#### Temp Variables in EADD Operational Flow
```java
<table>
	<tr>
		<td><b>Name</b></td>
		<td><b>Type</b></td>
		<td><b>Size (bits)</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>TMP_SRCPGE</td>
		<td>Effective Address</td>
		<td>32/64</td>
		<td>Effective address of the source page.</td>
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
		<td>Effective address of an SECINFO structure which contains security attributes of the page to be added.</td>
	</tr>
	<tr>
		<td>SCRATCH_SECINFO</td>
		<td>SECINFO</td>
		<td>512</td>
		<td>Scratch storage for holding the contents of DS:TMP_SECINFO.</td>
	</tr>
	<tr>
		<td>TMP_LINADDR</td>
		<td>Unsigned Integer</td>
		<td>64</td>
		<td>Holds the linear address to be stored in the EPCM and used to calculate TMP_ENCLAVEOFFSET.</td>
	</tr>
	<tr>
		<td>TMP_ENCLAVEOFFSET</td>
		<td>Enclave Offset</td>
		<td>64</td>
		<td>The page displacement from the enclave base address.</td>
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
TMP_SECS ← DS:RBX.SECS;
TMP_SECINFO ← DS:RBX.SECINFO;
TMP_LINADDR ← DS:RBX.LINADDR;
IF (DS:TMP_SRCPGE is not 4KByte aligned or DS:TMP_SECS is not 4KByte aligned or
    DS:TMP_SECINFO is not 64Byte aligned or TMP_LINADDR is not 4KByte aligned)
    THEN #GP(0); FI;
IF (DS:TMP_SECS does not resolve within an EPC)
    THEN #PF(DS:TMP_SECS); FI;
SCRATCH_SECINFO ← DS:TMP_SECINFO;
(* Check for misconfigured SECINFO flags*)
IF (SCRATCH_SECINFO reserved fields are not zero or 
40-18 Vol. 3D
                            SGX INSTRUCTION REFERENCES
    ! (SCRATCH_SECINFO.FLAGS.PT is PT_REG or SCRATCH_SECINFO.FLAGS.PT is PT_TCS) ) 
    THEN #GP(0); FI;
(* Check the EPC page for concurrency *)
IF (EPC page is not available for EADD) 
    THEN 
        IF (<<VMX non-root operation>> AND <<ENABLE_EPC_VIRTUALIZATION_EXTENSIONS>>)
            THEN
                VMCS.Exit_reason ← SGX_CONFLICT;
                VMCS.Exit_qualification.code ← EPC_PAGE_CONFLICT_EXCEPTION;
                VMCS.Exit_qualification.error ← 0;
                VMCS.Guest-physical_address ← << translation of DS:RCX produced by paging >>;
                VMCS.Guest-linear_address ← DS:RCX;
        
            Deliver VMEXIT;
 
            ELSE
                #GP(0);
        FI;
FI;
IF (EPCM(DS:RCX).VALID ≠ 0) 
    THEN #PF(DS:RCX); FI;
(* Check the SECS for concurrency *)
IF (SECS is not available for EADD) 
    THEN #GP(0); FI;
IF (EPCM(DS:TMP_SECS).VALID = 0 or EPCM(DS:TMP_SECS).PT ≠ PT_SECS) 
    THEN #PF(DS:TMP_SECS); FI;
(* Copy 4KBytes from source page to EPC page*)
DS:RCX[32767:0] ← DS:TMP_SRCPGE[32767:0];
CASE (SCRATCH_SECINFO.FLAGS.PT) 
    PT_TCS:
        IF (DS:RCX.RESERVED ≠ 0) #GP(0); FI;
        IF ( (DS:TMP_SECS.ATTRIBUTES.MODE64BIT = 0) and 
            ((DS:TCS.FSLIMIT & 0FFFH ≠ 0FFFH) or (DS:TCS.GSLIMIT & 0FFFH ≠ 0FFFH) )) #GP(0); FI;
        BREAK;
    PT_REG:
        IF (SCRATCH_SECINFO.FLAGS.W = 1 and SCRATCH_SECINFO.FLAGS.R = 0) #GP(0); FI;
        BREAK;
ESAC;
(* Check the enclave offset is within the enclave linear address space *)
IF (TMP_LINADDR < DS:TMP_SECS.BASEADDR or TMP_LINADDR ≥ DS:TMP_SECS.BASEADDR + DS:TMP_SECS.SIZE) 
    THEN #GP(0); FI;
(* Check concurrency of measurement resource*)
IF (Measurement being updated) 
    THEN #GP(0); FI;
(* Check if the enclave to which the page will be added is already in Initialized state *)
IF (DS:TMP_SECS already initialized) 
                            Vol. 3D 40-19
SGX INSTRUCTION REFERENCES
    THEN #GP(0); FI;
(* For TCS pages, force EPCM.rwx bits to 0 and no debug access *)
IF (SCRATCH_SECINFO.FLAGS.PT = PT_TCS) 
    THEN
        SCRATCH_SECINFO.FLAGS.R ← 0;
        SCRATCH_SECINFO.FLAGS.W ← 0;
        SCRATCH_SECINFO.FLAGS.X ← 0;
        (DS:RCX).FLAGS.DBGOPTIN ← 0; // force TCS.FLAGS.DBGOPTIN off
        DS:RCX.CSSA ← 0;
        DS:RCX.AEP ← 0;
        DS:RCX.STATE ← 0;
FI;
(* Add enclave offset and security attributes to MRENCLAVE *)
TMP_ENCLAVEOFFSET ← TMP_LINADDR - DS:TMP_SECS.BASEADDR;
TMPUPDATEFIELD[63:0] ← 0000000044444145H; // “EADD”
TMPUPDATEFIELD[127:64] ← TMP_ENCLAVEOFFSET;
TMPUPDATEFIELD[511:128] ← SCRATCH_SECINFO[375:0]; // 48 bytes
DS:TMP_SECS.MRENCLAVE ← SHA256UPDATE(DS:TMP_SECS.MRENCLAVE, TMPUPDATEFIELD)
INC enclave’s MRENCLAVE update counter;
(* Add enclave offset and security attributes to MRENCLAVE *)
EPCM(DS:RCX).R ← SCRATCH_SECINFO.FLAGS.R;
EPCM(DS:RCX).W ← SCRATCH_SECINFO.FLAGS.W;
EPCM(DS:RCX).X ← SCRATCH_SECINFO.FLAGS.X;
EPCM(DS:RCX).PT ← SCRATCH_SECINFO.FLAGS.PT;
EPCM(DS:RCX).ENCLAVEADDRESS ← TMP_LINADDR;
(* associate the EPCPAGE with the SECS by storing the SECS identifier of DS:TMP_SECS *)
Update EPCM(DS:RCX) SECS identifier to reference DS:TMP_SECS identifier;
(* Set EPCM entry fields *)
EPCM(DS:RCX).BLOCKED ← 0;
EPCM(DS:RCX).PENDING ← 0;
EPCM(DS:RCX).MODIFIED ← 0;
EPCM(DS:RCX).VALID ← 1;
```
### Flags Affected
None

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the DS segment limit.
If a memory operand is not properly aligned.
If an enclave memory operand is outside of the EPC.
If an enclave memory operand is the wrong type.
If a memory operand is locked.
If the enclave is initialized.
If the enclave's MRENCLAVE is locked.
If the TCS page reserved bits are set.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If the EPC page is valid.

40-20 Vol. 3D
SGX INSTRUCTION REFERENCES

### 64-Bit Mode Exceptions

<p>#GP(0)
If a memory operand is non-canonical form.
If a memory operand is not properly aligned.
If an enclave memory operand is outside of the EPC.
If an enclave memory operand is the wrong type.
If a memory operand is locked.
If the enclave is initialized.
If the enclave's MRENCLAVE is locked.
If the TCS page reserved bits are set.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If the EPC page is valid.

Vol. 3D 40-21

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
