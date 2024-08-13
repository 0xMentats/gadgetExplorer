SGX INSTRUCTION REFERENCES
<b>ETRACKC</b> — Activates EBLOCK Checks
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 11H ENCLS[ETRACKC]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>EAX[6]</td>
		<td>This leaf function activates EBLOCK checks.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td colspan=2><b>EAX</b></td>
		<td colspan=2><b>RCX</b></td>
	</tr>
	<tr>
		<td>IR</td>
		<td>ETRACK (In)</td>
		<td>Return error code (Out)</td>
		<td>Address of the destination EPC page (In, EA)</td>
		<td>Address of the SECS page (In, EA)</td>
	</tr>
</table>


### Description
The ETRACKC instruction is thread safe variant of ETRACK leaf and can be executed concurrently with other CPU
threads operating on the same SECS.

This leaf function provides the mechanism for hardware to track that software has completed the required TLB
address clears successfully. The instruction can only be executed when the current privilege level is 0.

The content of RCX is an effective address of an EPC page.

The table below provides additional information on the memory parameter of ETRACK leaf function.

ETRACKC Memory Parameter Semantics
<table>
	<tr>
		<td><b>EPCPAGE</b></td>
	</tr>
	<tr>
		<td>Read/Write access permitted by Enclave</td>
	</tr>
</table>

The error codes are:

Table 40-48.  ETRACKC Return Value in RAX
<table>
	<tr>
		<td><b>Error Code</b></td>
		<td><b>Value</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>No Error</td>
		<td>0</td>
		<td>ETRACKC successful.</td>
	</tr>
	<tr>
		<td>SGX_EPC_PAGE_CONFLICT</td>
		<td>7</td>
		<td>Failure due to concurrent operation of another SGX instruction.</td>
	</tr>
	<tr>
		<td>SGX_PG_INVLD</td>
		<td>6</td>
		<td>Target page is not a VALID EPC page.</td>
	</tr>
	<tr>
		<td>SGX_PREV_TRK_INCMPL</td>
		<td>17</td>
		<td>All processors did not complete the previous tracking sequence.</td>
	</tr>
	<tr>
		<td>SGX_TRACK_NOT_REQUIRED</td>
		<td>27</td>
		<td>Target page type does not require tracking.</td>
	</tr>
</table>

Concurrency Restrictions

Table 40-49.  Base Concurrency Restrictions of ETRACKC
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
		<td rowspan=2>ETRACKC</td>
		<td>Target [DS:RCX]</td>
		<td>Shared</td>
		<td>SGX_EPC_PAGE_ CONFLICT</td>
		<td></td>
	</tr>
	<tr>
		<td>SECS implicit</td>
		<td>Concurrent</td>
		<td></td>
		<td></td>
	</tr>
</table>

Vol. 3D 40-75
SGX INSTRUCTION REFERENCES

Table 40-50.  Additional Concurrency Restrictions of ETRACKC
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
		<td rowspan=2>ETRACKC</td>
		<td>Target [DS:RCX]</td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
	</tr>
	<tr>
		<td>SECS implicit</td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td>Exclusive</td>
		<td>SGX_EPC_PAGE _CONFLICT</td>
	</tr>
</table>


### Operation


#### Temp Variables in ETRACKC Operational Flow
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
		<td>Physical Address</td>
		<td>64</td>
		<td>Physical address of the SECS of the page being modified.</td>
	</tr>
</table>

(* check alignment of EPCPAGE (RCX) *)
IF (DS:RCX is not 4KByte Aligned) THEN
#GP(0); FI;
(* check that EPCPAGE (DS:RCX) is the address of an EPC page *)
IF (DS:RCX does not resolve within an EPC) THEN
#PF(DS:RCX, PFEC.SGX); FI;
(* Check the EPC page for concurrency *)
IF (EPC page is being modified) THEN
    RFLAGS.ZF ← 1;
    RFLAGS.CF ← 0;
    RAX ← SGX_EPC_PAGE_CONFLICT;
    goto DONE_POST_LOCK_RELEASE;
FI;
(* check to make sure the page is valid *)
IF (EPCM(DS:RCX).VALID = 0) THEN
    RFLAGS.ZF ← 1;
    RFLAGS.CF ← 0;
    RAX ← SGX_PG_INVLD;
    GOTO DONE;
FI;
(* find out the target SECS page *)
IF (EPCM(DS:RCX).PT is PT_REG or PT_TCS or PT_TRIM) THEN 
    TMP_SECS ← Obtain SECS through EPCM(DS:RCX).ENCLAVESECS;
ELSE IF (EPCM(DS:RCX).PT is PT_SECS) THEN
    TMP_SECS ← Obtain SECS through (DS:RCX);
ELSE 
    RFLAGS.ZF ← 0;
    RFLAGS.CF ← 1;
    RAX ← SGX_TRACK_NOT_REQUIRED;
    GOTO DONE;
FI;
40-76 Vol. 3D
                            SGX INSTRUCTION REFERENCES
(* Check concurrency with other Intel SGX instructions *)
IF (Other Intel SGX instructions using tracking facility on this SECS) THEN
    IF ((VMX non-root mode) and
    (ENABLE_EPC_VIRTUALIZATION_EXTENSIONS Execution Control = 1)) THEN
        
        VMCS.Exit_reason ← SGX_CONFLICT;
        
        VMCS.Exit_qualification.code ← TRACKING_RESOURCE_CONFLICT;
        
        VMCS.Exit_qualification.error ← 0;
        
        VMCS.Guest-physical_address ← 
            SECS(TMP_SECS).ENCLAVECONTEXT;
        
        VMCS.Guest-linear_address ← 0;
        
        Deliver VMEXIT;
     FI;
    RFLAGS.ZF ← 1;
    RFLAGS.CF ← 0;
    RAX ← SGX_EPC_PAGE_CONFLICT;
    GOTO DONE;
FI;
(* All processors must have completed the previous tracking cycle*) 
IF ( (TMP_SECS).TRACKING ≠ 0) )
THEN
    IF ((VMX non-root mode) and
    (ENABLE_EPC_VIRTUALIZATION_EXTENSIONS Execution Control = 1)) THEN
        
        VMCS.Exit_reason ← SGX_CONFLICT;
        
        VMCS.Exit_qualification.code ← TRACKING_REFERENCE_CONFLICT;
        
        VMCS.Exit_qualification.error ← 0;
        
        VMCS.Guest-physical_address ← 
            SECS(TMP_SECS).ENCLAVECONTEXT;
        
        VMCS.Guest-linear_address ← 0;
        
        Deliver VMEXIT;
     FI;
    RFLAGS.ZF ← 1;
    RFLAGS.CF ← 0;
    RAX ← SGX_PREV_TRK_INCMPL;
    GOTO DONE;
FI; 
RFLAGS.ZF ← 0;
RFLAGS.CF ← 0;
RAX ← 0;
DONE:
(* clear flags *)
RFLAGS.PF,AF,OF,SF ← 0;
```
### Flags Affected
ZF is set if ETRACKC fails due to concurrent operations with another SGX instructions or target page is an invalid
EPC page or tracking is not completed on SECS page; otherwise cleared.

CF is set if target page is not of a type that requires tracking; otherwise cleared.

PF, AF, OF and SF are cleared.

Vol. 3D 40-77
SGX INSTRUCTION REFERENCES

### Protected Mode Exceptions

<p>#GP(0)
If the memory operand violates access-control policies of DS segment.
If DS segment is unusable.
If the memory operand is not properly aligned.
<p>#PF(error code)
If the memory operand expected to be in EPC does not resolve to an EPC page.
If a page fault occurs in access memory operand.

### 64-Bit Mode Exceptions

<p>#GP(0)
If a memory address is in a non-canonical form.
If a memory operand is not properly aligned.
<p>#PF(error code)
If the memory operand expected to be in EPC does not resolve to an EPC page.
If a page fault occurs in access memory operand.

40-78 Vol. 3D

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
