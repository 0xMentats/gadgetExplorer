SGX INSTRUCTION REFERENCES
<b>ERDINFO</b> — Read Type and Status Information About an EPC Page
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 10H ENCLS[ERDINFO]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>EAX[6]</td>
		<td>This leaf function returns type and status information about an EPC page.</td>
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
		<td>ERDINFO (In)</td>
		<td>Address of a RDINFO structure (In)</td>
		<td>Address of the destination EPC page (In)</td>
	</tr>
</table>


### Description
This instruction reads type and status information about an EPC page and returns it in a RDINFO structure. The
STATUS field of the structure describes the status of the page and determines the validity of the remaining fields.
The FLAGS field returns the EPCM permissions of the page; the page type; and the BLOCKED, PENDING, MODI-
FIED, and PR status of the page. For enclave pages, the ENCLAVECONTEXT field of the structure returns the value
of SECS.ENCLAVECONTEXT. For non-enclave pages (e.g., VA) ENCLAVECONTEXT returns 0.

For invalid or non-EPC pages, the instruction returns an information code indicating the page's status, in addition
to populating the STATUS field.

ERDINFO returns an error code if the destination EPC page is being modified by a concurrent SGX instruction.

RBX contains the effective address of a RDINFO structure while RCX contains the effective address of an EPC page.
The table below provides additional information on the memory parameter of ERDINFO leaf function.

ERDINFO Memory Parameter Semantics
<table>
	<tr>
		<td><b>RDINFO</b></td>
		<td><b>EPCPAGE</b></td>
	</tr>
	<tr>
		<td>Read/Write access permitted by Non Enclave</td>
		<td>Read access permitted by Enclave</td>
	</tr>
</table>

The instruction faults if any of the following:

ERDINFO Faulting Conditions
<table>
	<tr>
		<td><b>A memory operand effective address is outside the DS segment limit (32b mode).</b></td>
		<td><b>A memory operand is not properly aligned.</b></td>
	</tr>
	<tr>
		<td>DS segment is unusable (32b mode).</td>
		<td>A page fault occurs in accessing memory operands.</td>
	</tr>
	<tr>
		<td>A memory address is in a non-canonical form (64b mode).</td>
		<td></td>
	</tr>
</table>

The error codes are:

Table 40-39.  ERDINFO Return Value in RAX
<table>
	<tr>
		<td><b>Error Code</b></td>
		<td><b>Value</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>No Error</td>
		<td>0</td>
		<td>ERDINFO successful.</td>
	</tr>
	<tr>
		<td>SGX_EPC_PAGE_CONFLICT</td>
		<td></td>
		<td>Failure due to concurrent operation of another SGX instruction.</td>
	</tr>
	<tr>
		<td>SGX_PG_INVLD</td>
		<td></td>
		<td>Target page is not a valid EPC page.</td>
	</tr>
	<tr>
		<td>SGX_PG_NONEPC</td>
		<td></td>
		<td>Page is not an EPC page.</td>
	</tr>
</table>

40-64 Vol. 3D
SGX INSTRUCTION REFERENCES

Concurrency Restrictions

Table 40-40.  Base Concurrency Restrictions of ERDINFO
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
		<td>ERDINFO</td>
		<td>Target [DS:RCX]</td>
		<td>Shared</td>
		<td>SGX_EPC_PAGE_ CONFLICT</td>
		<td></td>
	</tr>
</table>

Table 40-41.  Additional Concurrency Restrictions of ERDINFO
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
		<td>ERDINFO</td>
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


#### Temp Variables in ERDINFO Operational Flow
```java
<table>
	<tr>
		<td><b>Name Type Size (Bits) Description</b></td>
	</tr>
	<tr>
		<td>TMP_SECS Physical Address 64 Physical address of the SECS of the page being modified.</td>
	</tr>
	<tr>
		<td>TMP_RDINFO Linear Address 64 Address of the RDINFO structure.</td>
	</tr>
</table>

(* check alignment of RDINFO structure (RBX) *)
IF (DS:RBX is not 32Byte Aligned) THEN
    #GP(0); FI;
(* check alignment of the EPCPAGE (RCX) *)
IF (DS:RCX is not 4KByte Aligned) THEN
    #GP(0); FI;
(* check that EPCPAGE (DS:RCX) is the address of an EPC page *)
IF (DS:RCX does not resolve within EPC) THEN
    RFLAGS.CF ← 1;
    RFLAGS.ZF ← 0;
    RAX ← SGX_PG_NONEPC;
    goto DONE;
FI;
(* Check the EPC page for concurrency *)
IF (EPC page is being modified) THEN
    RFLAGS.ZF = 1;
    RFLAGS.CF = 0;
    RAX = SGX_EPC_PAGE_CONFLICT;
    goto DONE;
FI;
(* check page validity *)
IF (EPCM(DS:RCX).VALID = 0) THEN
    RFLAGS.CF = 1;
                            Vol. 3D 40-65
SGX INSTRUCTION REFERENCES
    RFLAGS.ZF = 0;
    RAX = SGX_PG_INVLD;
    goto DONE;
FI;
(* clear the fields of the RDINFO structure *)
TMP_RDINFO ← DS:RBX;
TMP_RDINFO.STATUS ← 0;
TMP_RDINFO.FLAGS ← 0;
TMP_RDINFO.ENCLAVECONTEXT ← 0;
(* store page info in RDINFO structure *)
TMP_RDINFO.FLAGS.RWX ← EPCM(DS:RCX).RWX;
TMP_RDINFO.FLAGS.PENDING ← EPCM(DS:RCX).PENDING;
TMP_RDINFO.FLAGS.MODIFIED ← EPCM(DS:RCX).MODIFIED;
TMP_RDINFO.FLAGS.PR ← EPCM(DS:RCX).PR;
TMP_RDINFO.FLAGS.PAGE_TYPE ← EPCM(DS:RCX).PAGE_TYPE;
TMP_RDINFO.FLAGS.BLOCKED ← EPCM(DS:RCX).BLOCKED;
(* read SECS.ENCLAVECONTEXT for enclave child pages *)
IF ((EPCM(DS:RCX).PAGE_TYPE = PT_REG) or
    (EPCM(DS:RCX).PAGE_TYPE = PT_TCS) or
    (EPCM(DS:RCX).PAGE_TYPE = PT_TRIM)
   ) THEN
    TMP_SECS ← Address of SECS for (DS:RCX);
    TMP_RDINFO.ENCLAVECONTEXT ← SECS(TMP_SECS).ENCLAVECONTEXT;
FI;
(* populate enclave information for SECS pages *)
IF (EPCM(DS:RCX).PAGE_TYPE = PT_SECS) THEN
    IF ((VMX non-root mode) and
        (ENABLE_EPC_VIRTUALIZATION_EXTENSIONS Execution Control = 1)
       ) THEN
        TMP_RDINFO.STATUS.CHILDPRESENT ←
                            ((SECS(DS:RCX).CHLDCNT ≠ 0) or
                              SECS(DS:RCX).VIRTCHILDCNT ≠ 0);
    ELSE
        TMP_RDINFO.STATUS.CHILDPRESENT ← (SECS(DS:RCX).CHLDCNT ≠ 0);
        TMP_RDINFO.STATUS.VIRTCHILDPRESENT ←
                            (SECS(DS:RCX).VIRTCHILDCNT ≠ 0);
        TMP_RDINFO.ENCLAVECONTEXT ← SECS(DS_RCX).ENCLAVECONTEXT;
    FI;
FI;
RAX ← 0;
RFLAGS.ZF ← 0;
RFLAGS.CF ← 0;
DONE:
(* clear flags *)
RFLAGS.PF ← 0;
RFLAGS.AF ← 0;
RFLAGS.OF ← 0;
RFLAGS.SF ←? 0;
40-66 Vol. 3D
                            SGX INSTRUCTION REFERENCES
```
### Flags Affected
ZF is set if ERDINFO fails due to concurrent operation with another SGX instruction; otherwise cleared.

CF is set if page is not a valid EPC page or not an EPC page; otherwise cleared.

PF, AF, OF and SF are cleared.

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the DS segment limit.
If DS segment is unusable.
If a memory operand is not properly aligned.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.

### 64-Bit Mode Exceptions

<p>#GP(0)
If the memory address is in a non-canonical form.
If a memory operand is not properly aligned.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.

Vol. 3D 40-67

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
