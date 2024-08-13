SGX INSTRUCTION REFERENCES
<b>EACCEPT</b> — Accept Changes to an EPC Page
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 05H ENCLU[EACCEPT]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>SGX2</td>
		<td>This leaf function accepts changes made by system software to an EPC page in the running enclave.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td colspan=2><b>EAX</b></td>
		<td><b>RBX</b></td>
		<td><b>RCX</b></td>
	</tr>
	<tr>
		<td>IR</td>
		<td>EACCEPT (In)</td>
		<td>Return Error Code (Out)</td>
		<td>Address of a SECINFO (In)</td>
		<td>Address of the destination EPC page (In)</td>
	</tr>
</table>


### Description
This leaf function accepts changes to a page in the running enclave by verifying that the security attributes specified
 in the SECINFO match the security attributes of the page in the EPCM. This instruction leaf can only be
executed when inside the enclave.

RBX contains the effective address of a SECINFO structure while RCX contains the effective address of an EPC
page. The table below provides additional information on the memory parameter of the EACCEPT leaf function.

EACCEPT Memory Parameter Semantics
<table>
	<tr>
		<td><b>SECINFO</b></td>
		<td><b>EPCPAGE (Destination)</b></td>
	</tr>
	<tr>
		<td>Read access permitted by Non Enclave</td>
		<td>Read access permitted by Enclave</td>
	</tr>
</table>

The instruction faults if any of the following:

EACCEPT Faulting Conditions
<table>
	<tr>
		<td><b>The operands are not properly aligned.</b></td>
		<td><b>RBX does not contain an effective address in an EPC page in the running enclave.</b></td>
	</tr>
	<tr>
		<td>The EPC page is locked by another thread.</td>
		<td>RCX does not contain an effective address of an EPC page in the running enclave.</td>
	</tr>
	<tr>
		<td>The EPC page is not valid.</td>
		<td>Page type is PT_REG and MODIFIED bit is 0.</td>
	</tr>
	<tr>
		<td>SECINFO contains an invalid request.</td>
		<td>Page type is PT_TCS or PT_TRIM and PENDING bit is 0 and MODIFIED bit is 1.</td>
	</tr>
	<tr>
		<td>If security attributes of the SECINFO page make the page inaccessible.</td>
		<td></td>
	</tr>
</table>

The error codes are:

Table 40-54.  EACCEPT Return Value in RAX
<table>
	<tr>
		<td><b>Error Code (see Table 40-4)</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>No Error</td>
		<td>EACCEPT successful.</td>
	</tr>
	<tr>
		<td>SGX_PAGE_ATTRIBUTES_MISMATCH</td>
		<td>The attributes of the target EPC page do not match the expected values.</td>
	</tr>
	<tr>
		<td>SGX_NOT_TRACKED</td>
		<td>The OS did not complete an ETRACK on the target page.</td>
	</tr>
</table>

Vol. 3D 40-85
SGX INSTRUCTION REFERENCES

Concurrency Restrictions

Table 40-55.  Base Concurrency Restrictions of EACCEPT
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
		<td rowspan=2>EACCEPT</td>
		<td>Target [DS:RCX]</td>
		<td>Shared</td>
		<td>#GP</td>
		<td></td>
	</tr>
	<tr>
		<td>SECINFO [DS:RBX]</td>
		<td>Concurrent</td>
		<td></td>
		<td></td>
	</tr>
</table>

Table 40-56.  Additional Concurrency Restrictions of EACCEPT
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
		<td rowspan=2>EACCEPT</td>
		<td>Target [DS:RCX]</td>
		<td>Exclusive</td>
		<td>#GP</td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
	</tr>
	<tr>
		<td>SECINFO [DS:RBX]</td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
	</tr>
</table>


### Operation


#### Temp Variables in EACCEPT Operational Flow
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
		<td>Physical address of SECS to which EPC operands belongs.</td>
	</tr>
	<tr>
		<td>SCRATCH_SECINFO</td>
		<td>SECINFO</td>
		<td>512</td>
		<td>Scratch storage for holding the contents of DS:RBX.</td>
	</tr>
</table>

IF (DS:RBX is not 64Byte Aligned)
    THEN #GP(0); FI;
IF (DS:RBX is not within CR_ELRANGE) 
    THEN #GP(0); FI;
IF (DS:RBX does not resolve within an EPC) 
    THEN #PF(DS:RBX); FI;
IF ( (EPCM(DS:RBX &~FFFH).VALID = 0) or (EPCM(DS:RBX &~FFFH).R = 0) or (EPCM(DS:RBX &~FFFH).PENDING ≠ 0) or 
    (EPCM(DS:RBX &~FFFH).MODIFIED ≠ 0) or (EPCM(DS:RBX &~FFFH).BLOCKED ≠ 0) or 
    (EPCM(DS:RBX &~FFFH).PT ≠ PT_REG) or (EPCM(DS:RBX &~FFFH).ENCLAVESECS ≠ CR_ACTIVE_SECS) or
    (EPCM(DS:RBX &~FFFH).ENCLAVEADDRESS ≠ (DS:RBX & FFFH)) )
    THEN #PF(DS:RBX); FI;
(* Copy 64 bytes of contents *)
SCRATCH_SECINFO ← DS:RBX; 
(* Check for misconfigured SECINFO flags*)
IF (SCRATCH_SECINFO reserved fields are not zero )
    THEN #GP(0); FI;
IF (DS:RCX is not 4KByte Aligned)
    THEN #GP(0); FI;
40-86 Vol. 3D
                            SGX INSTRUCTION REFERENCES
IF (DS:RCX is not within CR_ELRANGE) 
    THEN #GP(0); FI;
IF (DS:RCX does not resolve within an EPC) 
    THEN #PF(DS:RCX); FI;
(* Check that the combination of requested PT, PENDING and MODIFIED is legal *)
IF (NOT (((SCRATCH_SECINFO.FLAGS.PT is PT_REG) and
    ((SCRATCH_SECINFO.FLAGS.PR is 1) or 
    (SCRATCH_SECINFO.FLAGS.PENDING is 1)) and
    (SCRATCH_SECINFO.FLAGS.MODIFIED is 0)) or
    ((SCRATCH_SECINFO.FLAGS.PT is PT_TCS or PT_TRIM) and
    (SCRATCH_SECINFO.FLAGS.PR is 0) and
    (SCRATCH_SECINFO.FLAGS.PENDING is 0) and 
    (SCRATCH_SECINFO.FLAGS.MODIFIED is 1) )))
        THEN #GP(0); FI
(* Check security attributes of the destination EPC page *)
If ( (EPCM(DS:RCX).VALID is 0) or (EPCM(DS:RCX).BLOCKED is not 0) or
    ((EPCM(DS:RCX).PT is not PT_REG) and (EPCM(DS:RCX).PT is not PT_TCS) and (EPCM(DS:RCX).PT is not PT_TRIM)) or
    (EPCM(DS:RCX).ENCLAVESECS ≠ CR_ACTIVE_SECS))
    THEN #PF((DS:RCX); FI;
(* Check the destination EPC page for concurrency *)
IF ( EPC page in use ) 
    THEN #GP(0); FI;
(* Re-Check security attributes of the destination EPC page *)
IF ( (EPCM(DS:RCX).VALID is 0) or (EPCM(DS:RCX).ENCLAVESECS ≠ CR_ACTIVE_SECS) )
    THEN #PF(DS:RCX); FI;
(* Verify that accept request matches current EPC page settings *)
IF ( (EPCM(DS:RCX).ENCLAVEADDRESS ≠ DS:RCX) or (EPCM(DS:RCX).PENDING ≠ SCRATCH_SECINFO.FLAGS.PENDING) or
    (EPCM(DS:RCX).MODIFIED ≠ SCRATCH_SECINFO.FLAGS.MODIFIED) or (EPCM(DS:RCX).R ≠ SCRATCH_SECINFO.FLAGS.R) or
    (EPCM(DS:RCX).W ≠ SCRATCH_SECINFO.FLAGS.W) or (EPCM(DS:RCX).X ≠ SCRATCH_SECINFO.FLAGS.X) or
    (EPCM(DS:RCX).PT ≠ SCRATCH_SECINFO.FLAGS.PT) )
    THEN
        RFLAGS.ZF ← 1;
        RAX ← SGX_PAGE_ATTRIBUTES_MISMATCH;
        GOTO DONE;
FI;
(* Check that all required threads have left enclave *)
IF (Tracking not correct)
    THEN
        RFLAGS.ZF ← 1;
        RAX ← SGX_NOT_TRACKED;
        GOTO DONE;
FI;
(* Get pointer to the SECS to which the EPC page belongs *)
TMP_SECS = << Obtain physical address of SECS through EPCM(DS:RCX)>>
(* For TCS pages, perform additional checks *)
IF (SCRATCH_SECINFO.FLAGS.PT = PT_TCS) 
    THEN
                            Vol. 3D 40-87
SGX INSTRUCTION REFERENCES
        IF (DS:RCX.RESERVED ≠ 0) #GP(0); FI;
FI;
(* Check that TCS.FLAGS.DBGOPTIN, TCS stack, and TCS status are correctly initialized *)
IF ( ((DS:RCX).FLAGS.DBGOPTIN is not 0) or ((DS:RCX).CSSA ≥ (DS:RCX).NSSA) or ((DS:RCX).AEP is not 0) or ((DS:RCX).STATE is not 0))
    THEN #GP(0); FI;
(* Check consistency of FS & GS Limit *)
IF ( (TMP_SECS.ATTRIBUTES.MODE64BIT is 0) and ((DS:RCX.FSLIMIT & FFFH ≠ FFFH) or (DS:RCX.GSLIMIT & FFFH ≠ FFFH)) )
    THEN #GP(0); FI;
(* Clear PENDING/MODIFIED flags to mark accept operation complete *)
EPCM(DS:RCX).PENDING ← 0;
EPCM(DS:RCX).MODIFIED ← 0;
EPCM(DS:RCX).PR ← 0;
(* Clear EAX and ZF to indicate successful completion *)
RFLAGS.ZF ← 0;
RAX ← 0;
DONE:
RFLAGS.CF,PF,AF,OF,SF ← 0;
```
### Flags Affected
Sets ZF if page cannot be accepted, otherwise cleared. Clears CF, PF, AF, OF, SF

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the DS segment limit.
If a memory operand is not properly aligned.
If a memory operand is locked.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If a memory operand is not an EPC page.
If EPC page has incorrect page type or security attributes.

### 64-Bit Mode Exceptions

<p>#GP(0)
If a memory operand is non-canonical form.
If a memory operand is not properly aligned.
If a memory operand is locked.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If a memory operand is not an EPC page.
If EPC page has incorrect page type or security attributes.

40-88 Vol. 3D

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
