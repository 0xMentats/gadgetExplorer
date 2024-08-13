SGX INSTRUCTION REFERENCES
<b>EPA</b> — Add Version Array
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 0AH ENCLS[EPA]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>SGX1</td>
		<td>This leaf function adds a Version Array to the EPC.</td>
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
		<td>EPA (In)</td>
		<td>PT_VA (In, Constant)</td>
		<td>Effective address of the EPC page (In)</td>
	</tr>
</table>


### Description
This leaf function creates an empty version array in the EPC page whose logical address is given by DS:RCX, and
sets up EPCM attributes for that page. At the time of execution of this instruction, the register RBX must be set to
PT_VA.

The table below provides additional information on the memory parameter of EPA leaf function.

EPA Memory Parameter Semantics
<table>
	<tr>
		<td><b>EPCPAGE</b></td>
	</tr>
	<tr>
		<td>Write access permitted by Enclave</td>
	</tr>
</table>

Concurrency Restrictions

Table 40-37.  Base Concurrency Restrictions of EPA
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
		<td>EPA</td>
		<td>VA [DS:RCX]</td>
		<td>Exclusive</td>
		<td>#GP</td>
		<td>EPC_PAGE_CONFLICT_EXCEPTION</td>
	</tr>
</table>

Table 40-38.  Additional Concurrency Restrictions of EPA
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
		<td>EPA</td>
		<td>VA [DS:RCX]</td>
		<td>Concurrent</td>
		<td>L</td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
	</tr>
</table>


### Operation

```java
IF (RBX ≠ PT_VA or DS:RCX is not 4KByte Aligned)
    THEN #GP(0); FI;
IF (DS:RCX does not resolve within an EPC)
    THEN #PF(DS:RCX); FI;
(* Check concurrency with other Intel SGX instructions *)
IF (Other Intel SGX instructions accessing the page) 
    THEN 
        IF (<<VMX non-root operation>> AND <<ENABLE_EPC_VIRTUALIZATION_EXTENSIONS>>)
40-62 Vol. 3D
                            SGX INSTRUCTION REFERENCES
            THEN
                VMCS.Exit_reason ← SGX_CONFLICT;
                VMCS.Exit_qualification.code ← EPC_PAGE_CONFLICT_EXCEPTION;
                VMCS.Exit_qualification.error ← 0;
                VMCS.Guest-physical_address ←<< translation of DS:RCX produced by paging >>;
                VMCS.Guest-linear_address ← DS:RCX;
        
            Deliver VMEXIT;
 
            ELSE
                #GP(0);
        FI;
FI;
(* Check EPC page must be empty *)
IF (EPCM(DS:RCX). VALID ≠ 0)
    THEN #PF(DS:RCX); FI;
(* Clears EPC page *)
DS:RCX[32767:0] ← 0;
EPCM(DS:RCX).PT ← PT_VA;
EPCM(DS:RCX).ENCLAVEADDRESS ← 0;
EPCM(DS:RCX).BLOCKED ← 0;
EPCM(DS:RCX).PENDING ← 0;
EPCM(DS:RCX).MODIFIED ← 0;
EPCM(DS:RCX).PR ← 0;
EPCM(DS:RCX).RWX ← 0;
EPCM(DS:RCX).VALID ← 1;
```
### Flags Affected
None

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the DS segment limit.
If a memory operand is not properly aligned.
If another Intel SGX instruction is accessing the EPC page.
If RBX is not set to PT_VA.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If a memory operand is not an EPC page.
If the EPC page is valid.

### 64-Bit Mode Exceptions

<p>#GP(0)
If a memory operand is non-canonical form.
If a memory operand is not properly aligned.
If another Intel SGX instruction is accessing the EPC page.
If RBX is not set to PT_VA.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If a memory operand is not an EPC page.
If the EPC page is valid.

Vol. 3D 40-63

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
