SGX INSTRUCTION REFERENCES
<b>EREMOVE</b> — Remove a page from the EPC
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 03H ENCLS[EREMOVE]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>SGX1</td>
		<td>This leaf function removes a page from the EPC.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>EAX</b></td>
		<td><b>RCX</b></td>
	</tr>
	<tr>
		<td>IR</td>
		<td>EREMOVE (In)</td>
		<td>Effective address of the EPC page (In)</td>
	</tr>
</table>


### Description
This leaf function causes an EPC page to be un-associated with its SECS and be marked as unused. This instruction
leaf can only be executed when the current privilege level is 0.

The content of RCX is an effective address of an EPC page. The DS segment is used to create linear address.
Segment override is not supported.

The instruction fails if the operand is not properly aligned or does not refer to an EPC page or the page is in use by
another thread, or other threads are running in the enclave to which the page belongs. In addition the instruction
fails if the operand refers to an SECS with associations.

EREMOVE Memory Parameter Semantics
<table>
	<tr>
		<td><b>EPCPAGE</b></td>
	</tr>
	<tr>
		<td>Write access permitted by Enclave</td>
	</tr>
</table>

The instruction faults if any of the following:

EREMOVE Faulting Conditions
<table>
	<tr>
		<td><b>The memory operand is not properly aligned.</b></td>
		<td><b>The memory operand does not resolve in an EPC page.</b></td>
	</tr>
	<tr>
		<td>Refers to an invalid SECS.</td>
		<td>Refers to an EPC page that is locked by another thread.</td>
	</tr>
	<tr>
		<td>Another Intel SGX instruction is accessing the EPC page.</td>
		<td>RCX does not contain an effective address of an EPC page.</td>
	</tr>
	<tr>
		<td>the EPC page refers to an SECS with associations.</td>
		<td></td>
	</tr>
</table>

The error codes are:

Table 40-42.  EREMOVE Return Value in RAX
<table>
	<tr>
		<td><b>Error Code (see Table 40-4)</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>No Error</td>
		<td>EREMOVE successful.</td>
	</tr>
	<tr>
		<td>SGX_CHILD_PRESENT</td>
		<td>If the SECS still have enclave pages loaded into EPC.</td>
	</tr>
	<tr>
		<td>SGX_ENCLAVE_ACT</td>
		<td>If there are still logical processors executing inside the enclave.</td>
	</tr>
</table>

40-68 Vol. 3D
SGX INSTRUCTION REFERENCES

Concurrency Restrictions

Table 40-43.  Base Concurrency Restrictions of EREMOVE
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
		<td>EREMOVE</td>
		<td>Target [DS:RCX]</td>
		<td>Exclusive</td>
		<td>#GP</td>
		<td>EPC_PAGE_CONFLICT_EXCEPTION</td>
	</tr>
</table>

Table 40-44.  Additional Concurrency Restrictions of EREMOVE
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
		<td>EREMOVE</td>
		<td>Target [DS:RCX]</td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
	</tr>
</table>


### Operation


#### Temp Variables in EREMOVE Operational Flow
```java
<table>
	<tr>
		<td><b>Name</b></td>
		<td><b>Type</b></td>
		<td><b>Size (Bits)</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>TMP_SECS</td>
		<td>Effective Address</td>
		<td>32/64</td>
		<td>Effective address of the SECS destination page.</td>
	</tr>
</table>

IF (DS:RCX is not 4KByte Aligned)
    THEN #GP(0); FI;
IF (DS:RCX does not resolve to an EPC page)
    THEN #PF(DS:RCX); FI;
TMP_SECS ← Get_SECS_ADDRESS();
(* Check the EPC page for concurrency *)
IF (EPC page being referenced by another Intel SGX instruction) 
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
(* if DS:RCX is already unused, nothing to do*)
IF ( (EPCM(DS:RCX).VALID = 0) or (EPCM(DS:RCX).PT = PT_TRIM AND EPCM(DS:RCX).MODIFIED = 0))
    THEN GOTO DONE; 
FI;
                            Vol. 3D 40-69
SGX INSTRUCTION REFERENCES
IF ( (EPCM(DS:RCX).PT = PT_VA) OR
    ((EPCM(DS:RCX).PT = PT_TRIM) AND (EPCM(DS:RCX).MODIFIED = 0)) )
    THEN 
        EPCM(DS:RCX).VALID ← 0;
        GOTO DONE; 
FI;
IF (EPCM(DS:RCX).PT = PT_SECS) 
    THEN 
        IF (DS:RCX has an EPC page associated with it) 
            THEN 
                RFLAGS.ZF ← 1;
                RAX← SGX_CHILD_PRESENT;
                GOTO ERROR_EXIT;
        FI;
        (* treat SECS as having a child page when VIRTCHILDCNT is non-zero *)
        IF (<<in VMX non-root operation>> AND 
             <<ENABLE_EPC_VIRTUALIZATION_EXTENSIONS>> AND 
             (SECS(DS:RCX).VIRTCHILDCNT ≠ 0))
            THEN
                RFLAGS.ZF ← 1;
   
                RAX ← SGX_CHILD_PRESENT
                GOTO ERROR_EXIT
        FI;
        EPCM(DS:RCX).VALID ← 0;
        GOTO DONE; 
FI;
IF (Other threads active using SECS) 
    THEN 
        RFLAGS.ZF ← 1;
        RAX← SGX_ENCLAVE_ACT;
        GOTO ERROR_EXIT;
FI;
IF ( (EPCM(DS:RCX).PT is PT_REG) or (EPCM(DS:RCX).PT is PT_TCS) or (EPCM(DS:RCX).PT is PT_TRIM) )
    THEN
        EPCM(DS:RCX).VALID ← 0;
        GOTO DONE;
FI;
DONE:
RAX← 0;
RFLAGS.ZF ← 0;
ERROR_EXIT:
RFLAGS.CF,PF,AF,OF,SF ← 0;
```
### Flags Affected
Sets ZF if unsuccessful, otherwise cleared and RAX returns error code. Clears CF, PF, AF, OF, SF.

40-70 Vol. 3D
SGX INSTRUCTION REFERENCES

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the DS segment limit.
If a memory operand is not properly aligned.
If another Intel SGX instruction is accessing the page.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If the memory operand is not an EPC page.

### 64-Bit Mode Exceptions

<p>#GP(0)
If the memory operand is non-canonical form.
If a memory operand is not properly aligned.
If another Intel SGX instruction is accessing the page.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If the memory operand is not an EPC page.

Vol. 3D 40-71

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
