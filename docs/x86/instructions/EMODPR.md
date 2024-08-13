SGX INSTRUCTION REFERENCES
<b>EMODPR</b> — Restrict the Permissions of an EPC Page
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 0EH ENCLS[EMODPR]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>SGX2</td>
		<td>This leaf function restricts the access rights associated with a EPC page in an initialized enclave.</td>
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
		<td>EMODPR (In)</td>
		<td>Return Error Code (Out)</td>
		<td>Address of a SECINFO (In)</td>
		<td>Address of the destination EPC page (In)</td>
	</tr>
</table>


### Description
This leaf function restricts the access rights associated with an EPC page in an initialized enclave. THE RWX bits of
the SECINFO parameter are treated as a permissions mask; supplying a value that does not restrict the page
permissions will have no effect. This instruction can only be executed when current privilege level is 0.

RBX contains the effective address of a SECINFO structure while RCX contains the effective address of an EPC page.
The table below provides additional information on the memory parameter of the EMODPR leaf function.

EMODPR Memory Parameter Semantics
<table>
	<tr>
		<td><b>SECINFO</b></td>
		<td><b>EPCPAGE</b></td>
	</tr>
	<tr>
		<td>Read access permitted by Non Enclave</td>
		<td>Read/Write access permitted by Enclave</td>
	</tr>
</table>

The instruction faults if any of the following:

EMODPR Faulting Conditions
<table>
	<tr>
		<td><b>The operands are not properly aligned.</b></td>
		<td><b>If unsupported security attributes are set.</b></td>
	</tr>
	<tr>
		<td>The Enclave is not initialized.</td>
		<td>SECS is locked by another thread.</td>
	</tr>
	<tr>
		<td>The EPC page is locked by another thread.</td>
		<td>RCX does not contain an effective address of an EPC page in the running enclave.</td>
	</tr>
	<tr>
		<td>The EPC page is not valid.</td>
		<td></td>
	</tr>
</table>

The error codes are:

Table 40-31.  EMODPR Return Value in RAX
<table>
	<tr>
		<td><b>Error Code (see Table 40-4)</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>No Error</td>
		<td>EMODPR successful.</td>
	</tr>
	<tr>
		<td>SGX_PAGE_NOT_MODIFIABLE</td>
		<td>The EPC page cannot be modified because it is in the PENDING or MODIFIED state.</td>
	</tr>
	<tr>
		<td>SGX_EPC_PAGE_CONFLICT</td>
		<td>Page is being written by EADD, EAUG, ECREATE, ELDU/B, EMODT, or EWB.</td>
	</tr>
</table>

Concurrency Restrictions

Table 40-32.  Base Concurrency Restrictions of EMODPR
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
		<td>EMODPR</td>
		<td>Target [DS:RCX]</td>
		<td>Shared</td>
		<td>#GP</td>
		<td></td>
	</tr>
</table>

40-56 Vol. 3D
SGX INSTRUCTION REFERENCES

Table 40-33.  Additional Concurrency Restrictions of EMODPR
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
		<td>EMODPR</td>
		<td>Target [DS:RCX]</td>
		<td>Exclusive</td>
		<td>SGX_EPC_PAGE _CONFLICT</td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
	</tr>
</table>


### Operation


#### Temp Variables in EMODPR Operational Flow
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
		<td>Physical address of SECS to which EPC operand belongs.</td>
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
IF (DS:RCX does not resolve within an EPC) 
    THEN #PF(DS:RCX); FI;
SCRATCH_SECINFO ← DS:RBX;
(* Check for misconfigured SECINFO flags*)
IF ( (SCRATCH_SECINFO reserved fields are not zero ) or
    (SCRATCH_SECINFO.FLAGS.R is 0 and SCRATCH_SECINFO.FLAGS.W is not 0) )
    THEN #GP(0); FI;
(* Check concurrency with SGX1 or SGX2 instructions on the EPC page *)
IF (SGX1 or other SGX2 instructions accessing EPC page) 
    THEN #GP(0); FI;
IF (EPCM(DS:RCX).VALID is 0 )
    THEN #PF(DS:RCX); FI;
(* Check the EPC page for concurrency *)
IF (EPC page in use by another SGX2 instruction) 
    THEN 
        RFLAGS.ZF ← 1;
        RAX ← SGX_EPC_PAGE_CONFLICT;
        GOTO DONE;
FI;
IF (EPCM(DS:RCX).PENDING is not 0 or (EPCM(DS:RCX).MODIFIED is not 0) )
    THEN 
        RFLAGS.ZF ← 1;
        RAX ← SGX_PAGE_NOT_MODIFIABLE;
                            Vol. 3D 40-57
SGX INSTRUCTION REFERENCES
        GOTO DONE;
FI;
IF (EPCM(DS:RCX).PT is not PT_REG)
    THEN #PF(DS:RCX); FI;
TMP_SECS ← GET_SECS_ADDRESS
IF (TMP_SECS.ATTRIBUTES.INIT = 0)
  THEN #GP(0); FI;
(* Set the PR bit to indicate that permission restriction is in progress *)
EPCM(DS:RCX).PR ← 1;
(* Update EPCM permissions *)
EPCM(DS:RCX).R ← EPCM(DS:RCX).R & SCRATCH_SECINFO.FLAGS.R;
EPCM(DS:RCX).W ← EPCM(DS:RCX).W & SCRATCH_SECINFO.FLAGS.W;
EPCM(DS:RCX).X ← EPCM(DS:RCX).X & SCRATCH_SECINFO.FLAGS.X;
RFLAGS.ZF ← 0;
RAX ← 0;
DONE:
RFLAGS.CF,PF,AF,OF,SF ← 0;
```
### Flags Affected
Sets ZF if page is not modifiable or if other SGX2 instructions are executing concurrently, otherwise cleared. Clears
CF, PF, AF, OF, SF.

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the DS segment limit.
If a memory operand is not properly aligned.
If a memory operand is locked.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If a memory operand is not an EPC page.

### 64-Bit Mode Exceptions

<p>#GP(0)
If a memory operand is non-canonical form.
If a memory operand is not properly aligned.
If a memory operand is locked.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If a memory operand is not an EPC page.

40-58 Vol. 3D

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
