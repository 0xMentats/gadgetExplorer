SGX INSTRUCTION REFERENCES
<b>EMODPE</b> — Extend an EPC Page Permissions
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 06H ENCLU[EMODPE]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>SGX2</td>
		<td>This leaf function extends the access rights of an existing EPC page.</td>
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
		<td>EMODPE (In)</td>
		<td>Address of a SECINFO (In)</td>
		<td>Address of the destination EPC page (In)</td>
	</tr>
</table>


### Description
This leaf function extends the access rights associated with an existing EPC page in the running enclave. THE RWX
bits of the SECINFO parameter are treated as a permissions mask; supplying a value that does not extend the page
permissions will have no effect. This instruction leaf can only be executed when inside the enclave.

RBX contains the effective address of a SECINFO structure while RCX contains the effective address of an EPC
page. The table below provides additional information on the memory parameter of the EMODPE leaf function.

EMODPE Memory Parameter Semantics
<table>
	<tr>
		<td><b>SECINFO</b></td>
		<td><b>EPCPAGE</b></td>
	</tr>
	<tr>
		<td>Read access permitted by Non Enclave</td>
		<td>Read access permitted by Enclave</td>
	</tr>
</table>

The instruction faults if any of the following:

EMODPE Faulting Conditions
<table>
	<tr>
		<td><b>The operands are not properly aligned.</b></td>
		<td><b>If security attributes of the SECINFO page make the page inaccessible.</b></td>
	</tr>
	<tr>
		<td>The EPC page is locked by another thread.</td>
		<td>RBX does not contain an effective address in an EPC page in the running enclave.</td>
	</tr>
	<tr>
		<td>The EPC page is not valid.</td>
		<td>RCX does not contain an effective address of an EPC page in the running enclave.</td>
	</tr>
	<tr>
		<td>SECINFO contains an invalid request.</td>
		<td></td>
	</tr>
</table>

Concurrency Restrictions

Table 40-68.  Base Concurrency Restrictions of EMODPE
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
		<td rowspan=2>EMODPE</td>
		<td>Target [DS:RCX]</td>
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

Table 40-69.  Additional Concurrency Restrictions of EMODPE
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
		<td rowspan=2>EMODPE</td>
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

Vol. 3D 40-113
SGX INSTRUCTION REFERENCES

### Operation


#### Temp Variables in EMODPE Operational Flow
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
IF (DS:RCX is not 4KByte Aligned)
    THEN #GP(0); FI;
IF ((DS:RBX is not within CR_ELRANGE) or (DS:RCX is not within CR_ELRANGE) )
    THEN #GP(0); FI;
IF (DS:RBX does not resolve within an EPC) 
    THEN #PF(DS:RBX); FI;
IF (DS:RCX does not resolve within an EPC) 
    THEN #PF(DS:RCX); FI;
IF ( (EPCM(DS:RBX).VALID = 0) or (EPCM(DS:RBX).R = 0) or (EPCM(DS:RBX).PENDING ≠ 0) or (EPCM(DS:RBX).MODIFIED ≠ 0) or
    (EPCM(DS:RBX).BLOCKED ≠ 0) or (EPCM(DS:RBX).PT ≠ PT_REG) or (EPCM(DS:RBX).ENCLAVESECS ≠ CR_ACTIVE_SECS) or
    (EPCM(DS:RBX).ENCLAVEADDRESS ≠ (DS:RBX & ~0xFFF)) )
    THEN #PF(DS:RBX); FI;
SCRATCH_SECINFO ← DS:RBX;
(* Check for misconfigured SECINFO flags*)
IF (SCRATCH_SECINFO reserved fields are not zero ) 
    THEN #GP(0); FI;
(* Check security attributes of the EPC page *)
IF ( (EPCM(DS:RCX).VALID = 0) or (EPCM(DS:RCX).PENDING ≠ 0) or (EPCM(DS:RCX).MODIFIED ≠ 0) or 
    (EPCM(DS:RCX).BLOCKED ≠ 0) or (EPCM(DS:RCX).PT ≠ PT_REG) or (EPCM(DS:RCX).ENCLAVESECS ≠ CR_ACTIVE_SECS) )
    THEN #PF(DS:RCX); FI;
(* Check the EPC page for concurrency *)
IF (EPC page in use by another SGX2 instruction) 
    THEN #GP(0); FI;
(* Re-Check security attributes of the EPC page *)
IF ( (EPCM(DS:RCX).VALID = 0) or (EPCM(DS:RCX).PENDING ≠ 0) or (EPCM(DS:RCX).MODIFIED ≠ 0) or 
    (EPCM(DS:RCX).PT ≠ PT_REG) or (EPCM(DS:RCX).ENCLAVESECS ≠ CR_ACTIVE_SECS) or
    (EPCM(DS:RCX).ENCLAVEADDRESS ≠ DS:RCX))
    THEN #PF(DS:RCX); FI;
(* Check for misconfigured SECINFO flags*)
IF ( (EPCM(DS:RCX).R = 0) and (SCRATCH_SECINFO.FLAGS.R = 0) and (SCRATCH_SECINFO.FLAGS.W ≠ 0) ) 
    THEN #GP(0); FI;
40-114 Vol. 3D
                            SGX INSTRUCTION REFERENCES
(* Update EPCM permissions *)
EPCM(DS:RCX).R ← EPCM(DS:RCX).R | SCRATCH_SECINFO.FLAGS.R;
EPCM(DS:RCX).W ← EPCM(DS:RCX).W | SCRATCH_SECINFO.FLAGS.W;
EPCM(DS:RCX).X ← EPCM(DS:RCX).X | SCRATCH_SECINFO.FLAGS.X;
```
### Flags Affected
None

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the DS segment limit.
If a memory operand is not properly aligned.
If a memory operand is locked.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.

### 64-Bit Mode Exceptions

<p>#GP(0)
If a memory operand is non-canonical form.
If a memory operand is not properly aligned.
If a memory operand is locked.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.

Vol. 3D 40-115

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
