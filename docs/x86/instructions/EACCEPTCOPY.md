<b>EACCEPTCOPY</b> — Initialize a Pending Page
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 07H ENCLU[EACCEPTCOPY]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>SGX2</td>
		<td>This leaf function initializes a dynamically allocated EPC page from another page in the EPC.</td>
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
		<td>EACCEPTCOPY (In)</td>
		<td>Return Error Code (Out)</td>
		<td>Address of a SECINFO (In)</td>
		<td>Address of the destina- tion EPC page (In)</td>
		<td>Address of the source EPC page (In)</td>
	</tr>
</table>


### Description
This leaf function copies the contents of an existing EPC page into an uninitialized EPC page (created by EAUG).
After initialization, the instruction may also modify the access rights associated with the destination EPC page. This
instruction leaf can only be executed when inside the enclave.

RBX contains the effective address of a SECINFO structure while RCX and RDX each contain the effective address
of an EPC page. The table below provides additional information on the memory parameter of the EACCEPTCOPY
leaf function.

EACCEPTCOPY Memory Parameter Semantics
<table>
	<tr>
		<td><b>SECINFO</b></td>
		<td><b>EPCPAGE (Destination)</b></td>
		<td><b>EPCPAGE (Source)</b></td>
	</tr>
	<tr>
		<td>Read access permitted by Non Enclave</td>
		<td>Read/Write access permitted by Enclave</td>
		<td>Read access permitted by Enclave</td>
	</tr>
</table>

The instruction faults if any of the following:

EACCEPTCOPY Faulting Conditions
<table>
	<tr>
		<td><b>The operands are not properly aligned.</b></td>
		<td><b>If security attributes of the SECINFO page make the page inaccessible.</b></td>
	</tr>
	<tr>
		<td>The EPC page is locked by another thread.</td>
		<td>If security attributes of the source EPC page make the page inaccessible.</td>
	</tr>
	<tr>
		<td>The EPC page is not valid.</td>
		<td>RBX does not contain an effective address in an EPC page in the running enclave.</td>
	</tr>
	<tr>
		<td>SECINFO contains an invalid request.</td>
		<td>RCX/RDX does not contain an effective address of an EPC page in the running enclave.</td>
	</tr>
</table>

The error codes are:

Table 40-57.  EACCEPTCOPY Return Value in RAX
<table>
	<tr>
		<td><b>Error Code (see Table 40-4)</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>No Error</td>
		<td>EACCEPTCOPY successful.</td>
	</tr>
	<tr>
		<td>SGX_PAGE_ATTRIBUTES_MISMATCH</td>
		<td>The attributes of the target EPC page do not match the expected values.</td>
	</tr>
</table>

Concurrency Restrictions

Table 40-58.  Base Concurrency Restrictions of EACCEPTCOPY
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
		<td rowspan=3>EACCEPTCOPY Target [DS:RCX]</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td>Source [DS:RDX]</td>
		<td>Concurrent</td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td>SECINFO [DS:RBX]</td>
		<td>Concurrent</td>
		<td></td>
		<td></td>
	</tr>
</table>

Table 40-59.  Additional Concurrency Restrictions of EACCEPTCOPY
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
		<td rowspan=3>EACCEPTCOPY Target [DS:RCX]</td>
		<td></td>
		<td>Exclusive</td>
		<td>#GP</td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
	</tr>
	<tr>
		<td>Source [DS:RDX]</td>
		<td>Concurrent</td>
		<td></td>
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


#### Temp Variables in EACCEPTCOPY Operational Flow
```java
<table>
	<tr>
		<td><b>Name</b></td>
		<td><b>Type</b></td>
		<td><b>Size (bits)</b></td>
		<td><b>Description</b></td>
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
IF ( (DS:RCX is not 4KByte Aligned) or (DS:RDX is not 4KByte Aligned) )
    THEN #GP(0); FI;
IF ((DS:RBX is not within CR_ELRANGE) or (DS:RCX is not within CR_ELRANGE) or (DS:RDX is not within CR_ELRANGE))
    THEN #GP(0); FI;
IF (DS:RBX does not resolve within an EPC) 
    THEN #PF(DS:RBX); FI;
IF (DS:RCX does not resolve within an EPC) 
    THEN #PF(DS:RCX); FI;
IF (DS:RDX does not resolve within an EPC) 
    THEN #PF(DS:RDX); FI;
IF ( (EPCM(DS:RBX &~FFFH).VALID = 0) or (EPCM(DS:RBX &~FFFH).R = 0) or (EPCM(DS:RBX &~FFFH).PENDING ≠ 0) or 
    (EPCM(DS:RBX &~FFFH).MODIFIED ≠ 0) or (EPCM(DS:RBX &~FFFH).BLOCKED ≠ 0) or (EPCM(DS:RBX &~FFFH).PT ≠ PT_REG) or 
    (EPCM(DS:RBX &~FFFH).ENCLAVESECS ≠ CR_ACTIVE_SECS) or
    (EPCM(DS:RBX &~FFFH).ENCLAVEADDRESS ≠ DS:RBX) )
    THEN #PF(DS:RBX); FI;
(* Copy 64 bytes of contents *)
SCRATCH_SECINFO ← DS:RBX;
(* Check for misconfigured SECINFO flags*)
IF ( (SCRATCH_SECINFO reserved fields are not zero ) or (SCRATCH_SECINFO.FLAGS.R=0) AND(SCRATCH_SECINFO.FLAGS.W≠0 ) or
    (SCRATCH_SECINFO.FLAGS.PT is not PT_REG) ) 
    THEN #GP(0); FI;
(* Check security attributes of the source EPC page *)
IF ( (EPCM(DS:RDX).VALID = 0) or (EPCM(DS:RCX).R = 0) or (EPCM(DS:RDX).PENDING ≠ 0) or (EPCM(DS:RDX).MODIFIED ≠ 0) or 
    (EPCM(DS:RDX).BLOCKED ≠ 0) or (EPCM(DS:RDX).PT ≠ PT_REG) or (EPCM(DS:RDX).ENCLAVESECS ≠ CR_ACTIVE_SECS) or
    (EPCM(DS:RDX).ENCLAVEADDRESS ≠ DS:RDX))
    THEN #PF(DS:RDX); FI;
(* Check security attributes of the destination EPC page *)
IF ( (EPCM(DS:RCX).VALID = 0) or (EPCM(DS:RCX).PENDING ≠ 1) or (EPCM(DS:RCX).MODIFIED ≠ 0) or 
    (EPCM(DS:RDX).BLOCKED ≠ 0) or (EPCM(DS:RCX).PT ≠ PT_REG) or (EPCM(DS:RCX).ENCLAVESECS ≠ CR_ACTIVE_SECS) )
    THEN 
        RFLAGS.ZF ← 1;
        RAX ← SGX_PAGE_ATTRIBUTES_MISMATCH; 
        GOTO DONE;
FI;
(* Check the destination EPC page for concurrency *)
IF (destination EPC page in use ) 
    THEN #GP(0); FI;
(* Re-Check security attributes of the destination EPC page *)
IF ( (EPCM(DS:RCX).VALID = 0) or (EPCM(DS:RCX).PENDING ≠ 1) or (EPCM(DS:RCX).MODIFIED ≠ 0) or 
    (EPCM(DS:RCX).R ≠ 1) or (EPCM(DS:RCX).W ≠ 1) or (EPCM(DS:RCX).X ≠ 0) or 
    (EPCM(DS:RCX).PT ≠ SCRATCH_SECINFO.FLAGS.PT) or (EPCM(DS:RCX).ENCLAVESECS ≠ CR_ACTIVE_SECS) or
    (EPCM(DS:RCX).ENCLAVEADDRESS ≠ DS:RCX))
    THEN 
        RFLAGS.ZF ← 1;
        RAX ← SGX_PAGE_ATTRIBUTES_MISMATCH; 
        GOTO DONE;
FI;
(* Copy 4KBbytes form the source to destination EPC page*)
DS:RCX[32767:0] ← DS:RDX[32767:0];
(* Update EPCM permissions *)
EPCM(DS:RCX).R ← SCRATCH_SECINFO.FLAGS.R;
EPCM(DS:RCX).W ← SCRATCH_SECINFO.FLAGS.W;
EPCM(DS:RCX).X ← SCRATCH_SECINFO.FLAGS.X;
EPCM(DS:RCX).PENDING ← 0;
RFLAGS.ZF ← 0;
RAX ← 0;
DONE:
RFLAGS.CF,PF,AF,OF,SF ← 0;
```
### Flags Affected
Sets ZF if page is not modifiable, otherwise cleared. Clears CF, PF, AF, OF, SF

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

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
