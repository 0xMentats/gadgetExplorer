SGX INSTRUCTION REFERENCES
<b>EAUG</b> — Add a Page to an Initialized Enclave
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 0DH ENCLS[EAUG]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>SGX2</td>
		<td>This leaf function adds a page to an initialized enclave.</td>
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
		<td>EAUG (In)</td>
		<td>Address of a SECINFO (In)</td>
		<td>Address of the destination EPC page (In)</td>
	</tr>
</table>


### Description
This leaf function zeroes a page of EPC memory, associates the EPC page with an SECS page residing in the EPC,
and stores the linear address and security attributes in the EPCM. As part of the association, the security attributes
are configured to prevent access to the EPC page until a corresponding invocation of the EACCEPT leaf or EACCEPT-
COPY leaf confirms the addition of the new page into the enclave. This instruction can only be executed when
current privilege level is 0.

RBX contains the effective address of a PAGEINFO structure while RCX contains the effective address of an EPC
page. The table below provides additional information on the memory parameter of the EAUG leaf function.

EAUG Memory Parameter Semantics
<table>
	<tr>
		<td><b>PAGEINFO</b></td>
		<td><b>PAGEINFO.SECS</b></td>
		<td><b>PAGEINFO.SRCPGE</b></td>
		<td><b>PAGEINFO.SECINFO</b></td>
		<td><b>EPCPAGE</b></td>
	</tr>
	<tr>
		<td>Read access permit- ted by Non Enclave</td>
		<td>Read/Write access permit- ted by Enclave</td>
		<td>Must be zero</td>
		<td>Read access permitted by Non Enclave</td>
		<td>Write access permitted by Enclave</td>
	</tr>
</table>

The instruction faults if any of the following:

EAUG Faulting Conditions
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
		<td>The specified enclave offset is outside of the enclave address space.</td>
	</tr>
	<tr>
		<td>The SECS has been initialized.</td>
		<td></td>
	</tr>
</table>

Concurrency Restrictions

Table 40-10.  Base Concurrency Restrictions of EAUG
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
		<td rowspan=2>EAUG</td>
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

40-22 Vol. 3D
SGX INSTRUCTION REFERENCES

Table 40-11.  Additional Concurrency Restrictions of EAUG
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
		<td rowspan=2>EAUG</td>
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
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
	</tr>
</table>


### Operation


#### Temp Variables in EAUG Operational Flow
```java
<table>
	<tr>
		<td><b>Name</b></td>
		<td><b>Type</b></td>
		<td><b>Size (bits)</b></td>
		<td><b>Description</b></td>
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
</table>

IF (DS:RBX is not 32Byte Aligned)
    THEN #GP(0); FI;
IF (DS:RCX is not 4KByte Aligned)
    THEN #GP(0); FI;
IF (DS:RCX does not resolve within an EPC)
    THEN #PF(DS:RCX); FI;
TMP_SECS ← DS:RBX.SECS;
TMP_LINADDR ← DS:RBX.LINADDR;
IF ( DS:TMP_SECS is not 4KByte aligned or TMP_LINADDR is not 4KByte aligned )
    THEN #GP(0); FI;
IF ( (DS:RBX.SRCPAGE is not 0) or (DS:RBX.SECINFO is not 0) )
    THEN #GP(0); FI;
IF (DS:TMP_SECS does not resolve within an EPC)
    THEN #PF(DS:TMP_SECS); FI;
(* Check the EPC page for concurrency *)
IF (EPC page in use) 
    THEN #GP(0); FI;
IF (EPCM(DS:RCX).VALID ≠ 0) 
    THEN #PF(DS:RCX); FI;
(* Check the SECS for concurrency *)
                            Vol. 3D 40-23
SGX INSTRUCTION REFERENCES
IF (SECS is not available for EAUG) 
    THEN #GP(0); FI;
IF (EPCM(DS:TMP_SECS).VALID = 0 or EPCM(DS:TMP_SECS).PT ≠ PT_SECS) 
    THEN #PF(DS:TMP_SECS); FI;
(* Check if the enclave to which the page will be added is in the Initialized state *)
IF (DS:TMP_SECS is not initialized) 
    THEN #GP(0); FI;
(* Check the enclave offset is within the enclave linear address space *)
IF ( (TMP_LINADDR < DS:TMP_SECS.BASEADDR) or (TMP_LINADDR ≥ DS:TMP_SECS.BASEADDR + DS:TMP_SECS.SIZE) )
    THEN #GP(0); FI;
(* Clear the content of EPC page*)
DS:RCX[32767:0] ← 0;
(* Set EPCM security attributes *)
EPCM(DS:RCX).R ← 1;
EPCM(DS:RCX).W ← 1;
EPCM(DS:RCX).X ← 0;
EPCM(DS:RCX).PT ← PT_REG;
EPCM(DS:RCX).ENCLAVEADDRESS ← TMP_LINADDR;
EPCM(DS:RCX).BLOCKED ← 0;
EPCM(DS:RCX).PENDING ← 1;
EPCM(DS:RCX).MODIFIED ← 0;
EPCM(DS:RCX).PR ← 0;
(* associate the EPCPAGE with the SECS by storing the SECS identifier of DS:TMP_SECS *)
Update EPCM(DS:RCX) SECS identifier to reference DS:TMP_SECS identifier;
(* Set EPCM valid fields *)
EPCM(DS:RCX).VALID ← 1;
```
### Flags Affected
None

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the DS segment limit.
If a memory operand is not properly aligned.
If a memory operand is locked.
If the enclave is not initialized.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.

### 64-Bit Mode Exceptions

<p>#GP(0)
If a memory operand is non-canonical form.
If a memory operand is not properly aligned.
If a memory operand is locked.
If the enclave is not initialized.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.

40-24 Vol. 3D

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
