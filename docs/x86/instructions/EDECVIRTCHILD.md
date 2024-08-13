SGX INSTRUCTION REFERENCES
<b>EDECVIRTCHILD</b> — Decrement VIRTCHILDCNT in SECS
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 00H ENCLV[EDECVIRTCHILD]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>EAX[5]</td>
		<td>This leaf function decrements the SECS VIRTCHILDCNT field.</td>
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
		<td>EDECVIRTCHILD (In)</td>
		<td>Address of an enclave page (In)</td>
		<td>Address of an SECS page (In)</td>
	</tr>
</table>


### Description
This instruction decrements the SECS VIRTCHILDCNT field. This instruction can only be executed when current
privilege level is 0.

The content of RCX is an effective address of an EPC page. The DS segment is used to create linear address.
Segment override is not supported.

EDECVIRTCHILD Memory Parameter Semantics
<table>
	<tr>
		<td><b>EPCPAGE</b></td>
		<td><b>SECS</b></td>
	</tr>
	<tr>
		<td>Read/Write access permitted by Non Enclave</td>
		<td>Read access permitted by Enclave</td>
	</tr>
</table>

The instruction faults if any of the following:

EDECVIRTCHILD Faulting Conditions
<table>
	<tr>
		<td><b>A memory operand effective address is outside the DS segment limit (32b mode).</b></td>
		<td><b>A page fault occurs in accessing memory operands.</b></td>
	</tr>
	<tr>
		<td>DS segment is unusable (32b mode).</td>
		<td>RBX does not refer to an enclave page (REG, TCS, TRIM, SECS).</td>
	</tr>
	<tr>
		<td>A memory address is in a non-canonical form (64b mode).</td>
		<td>RCX does not refer to an SECS page.</td>
	</tr>
	<tr>
		<td>A memory operand is not properly aligned.</td>
		<td>RBX does not refer to an enclave page associated with SECS referenced in RCX.</td>
	</tr>
</table>

Concurrency Restrictions

Table 40-74.  Base Concurrency Restrictions of EDECVIRTCHILD
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
		<td rowspan=2>EDECVIRTCHILD</td>
		<td>Target [DS:RBX]</td>
		<td>Shared</td>
		<td>SGX_EPC_PAGE_ CONFLICT</td>
		<td></td>
	</tr>
	<tr>
		<td>SECS [DS:RCX]</td>
		<td>Concurrent</td>
		<td></td>
		<td></td>
	</tr>
</table>

Vol. 3D 40-129
SGX INSTRUCTION REFERENCES

Table 40-75.  Additional Concurrency Restrictions of EDECVIRTCHILD
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
		<td rowspan=2>EDECVIRTCHILD Target [DS:RBX] Concurrent</td>
		<td></td>
		<td></td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
	</tr>
	<tr>
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


#### Temp Variables in EDECVIRTCHILD Operational Flow
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
		<td>Physical Address</td>
		<td>64</td>
		<td>Physical address of the SECS of the page being modified.</td>
	</tr>
	<tr>
		<td>TMP_VIRTCHILDCNT</td>
		<td>Integer</td>
		<td>64</td>
		<td>Number of virtual child pages.</td>
	</tr>
</table>

```
#### EDECVIRTCHILD Return Value in RAX
```java
<table>
	<tr>
		<td><b>Error</b></td>
		<td><b>Value</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>No Error</td>
		<td>0</td>
		<td>EDECVIRTCHILD Successful.</td>
	</tr>
	<tr>
		<td>SGX_EPC_PAGE_CONFLICT</td>
		<td></td>
		<td>Failure due to concurrent operation of another SGX instruction.</td>
	</tr>
	<tr>
		<td>SGX_INVALID_COUNTER</td>
		<td></td>
		<td>Attempt to decrement counter that is already zero.</td>
	</tr>
</table>

(* check alignment of DS:RBX *)
IF (DS:RBX is not 4K aligned) THEN
    #GP(0); FI;
(* check DS:RBX is an linear address of an EPC page *)
IF (DS:RBX does not resolve within an EPC) THEN
    #PF(DS:RBX, PFEC.SGX); FI;
(* check DS:RCX is an linear address of an EPC page *)
IF (DS:RCX does not resolve within an EPC) THEN
    #PF(DS:RCX, PFEC.SGX); FI;
(* Check the EPCPAGE for concurrency *)
IF (EPCPAGE is being modified) THEN
    RFLAGS.ZF = 1;
    RAX = SGX_EPC_PAGE_CONFLICT;
    goto DONE;
FI;
(* check that the EPC page is valid *)
IF (EPCM(DS:RBX).VALID = 0) THEN
    #PF(DS:RBX, PFEC.SGX); FI;
(* check that the EPC page has the correct type and that the back pointer matches the pointer passed as the pointer to parent *)
IF ((EPCM(DS:RBX).PAGE_TYPE = PT_REG) or
    (EPCM(DS:RBX).PAGE_TYPE = PT_TCS) or
40-130 Vol. 3D
                            SGX INSTRUCTION REFERENCES
    (EPCM(DS:RBX).PAGE_TYPE = PT_TRIM) )
    THEN
    (* get the SECS of DS:RBX *)
    TMP_SECS ← Address of SECS for (DS:RBX);
ELSE IF (EPCM(DS:RBX).PAGE_TYPE = PT_SECS) THEN
    (* get the physical address of DS:RBX *)
    TMP_SECS ← Physical_Address(DS:RBX);
ELSE 
    (* EDECVIRTCHILD called on page of incorrect type *)
    #PF(DS:RBX, PFEC.SGX); FI;
IF (TMP_SECS ≠ Physical_Address(DS:RCX)) THEN
    #GP(0); FI;
(* Atomically decrement virtchild counter and check for underflow *)
Locked_Decrement(SECS(TMP_SECS).VIRTCHILDCNT);
IF (There was an underflow) THEN
    Locked_Increment(SECS(TMP_SECS).VIRTCHILDCNT);
    RFLAGS.ZF ← 1;
    RAX ← SGX_INVALID_COUNTER;
    goto DONE;
FI;
RFLAGS.ZF ← 0;
RAX ← 0;
DONE:
(* clear flags *)
RFLAGS.CF ← 0;
RFLAGS.PF ← 0;
RFLAGS.AF ← 0;
RFLAGS.OF ← 0;
RFLAGS.SF ← 0;
```
### Flags Affected
ZF is set if EDECVIRTCHILD fails due to concurrent operation with another SGX instruction, or if there is a VIRT-
CHILDCNT underflow. Otherwise cleared.

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the DS segment limit.
If DS segment is unusable.
If a memory operand is not properly aligned.
RBX does not refer to an enclave page associated with SECS referenced in RCX.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If RBX does not refer to an enclave page (REG, TCS, TRIM, SECS).
If RCX does not refer to an SECS page.

Vol. 3D 40-131
SGX INSTRUCTION REFERENCES

### 64-Bit Mode Exceptions

<p>#GP(0)
If a memory address is in a non-canonical form.
If a memory operand is not properly aligned.
RBX does not refer to an enclave page associated with SECS referenced in RCX.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If RBX does not refer to an enclave page (REG, TCS, TRIM, SECS).
If RCX does not refer to an SECS page.

40-132 Vol. 3D

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
