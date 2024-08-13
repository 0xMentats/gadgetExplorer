SGX INSTRUCTION REFERENCES
<b>EBLOCK</b> — Mark a page in EPC as Blocked
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 09H ENCLS[EBLOCK]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>SGX1</td>
		<td>This leaf function marks a page in the EPC as blocked.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td colspan=2><b>EAX</b></td>
		<td><b>RCX</b></td>
	</tr>
	<tr>
		<td>IR</td>
		<td>EBLOCK (In)</td>
		<td>Return error code (Out)</td>
		<td>Effective address of the EPC page (In)</td>
	</tr>
</table>


### Description
This leaf function causes an EPC page to be marked as BLOCKED. This instruction can only be executed when
current privilege level is 0.

The content of RCX is an effective address of an EPC page. The DS segment is used to create linear address.
Segment override is not supported.

An error code is returned in RAX.

The table below provides additional information on the memory parameter of EBLOCK leaf function.

EBLOCK Memory Parameter Semantics
<table>
	<tr>
		<td><b>EPCPAGE</b></td>
	</tr>
	<tr>
		<td>Read/Write access permitted by Enclave</td>
	</tr>
</table>

The error codes are:

Table 40-12.  EBLOCK Return Value in RAX
<table>
	<tr>
		<td><b>Error Code (see Table 40-4)</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>No Error</td>
		<td>EBLOCK successful.</td>
	</tr>
	<tr>
		<td>SGX_BLKSTATE</td>
		<td>Page already blocked. This value is used to indicate to a VMM that the page was already in BLOCKED state as a result of EBLOCK and thus will need to be restored to this state when it is eventually reloaded (using ELDB).</td>
	</tr>
	<tr>
		<td>SGX_ENTRYEPOCH_LOCKED</td>
		<td>SECS locked for Entry Epoch update. This value indicates that an ETRACK is currently executing on the SECS. The EBLOCK should be reattempted.</td>
	</tr>
	<tr>
		<td>SGX_NOTBLOCKABLE</td>
		<td>Page type is not one which can be blocked.</td>
	</tr>
	<tr>
		<td>SGX_PG_INVLD</td>
		<td>Page is not valid and cannot be blocked.</td>
	</tr>
	<tr>
		<td>SGX_EPC_PAGE_CONFLICT</td>
		<td>Page is being written by EADD, EAUG, ECREATE, ELDU/B, EMODT, or EWB.</td>
	</tr>
</table>

Concurrency Restrictions

Table 40-13.  Base Concurrency Restrictions of EBLOCK
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
		<td>EBLOCK</td>
		<td>Target [DS:RCX]</td>
		<td>Shared</td>
		<td>SGX_EPC_PAGE_ CONFLICT</td>
		<td></td>
	</tr>
</table>

Vol. 3D 40-25
SGX INSTRUCTION REFERENCES

Table 40-14.  Additional Concurrency Restrictions of EBLOCK
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
		<td>EBLOCK</td>
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


#### Temp Variables in EBLOCK Operational Flow
```java
<table>
	<tr>
		<td><b>Name</b></td>
		<td><b>Type</b></td>
		<td><b>Size (Bits)</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>TMP_BLKSTATE</td>
		<td>Integer</td>
		<td>64</td>
		<td>Page is already blocked.</td>
	</tr>
</table>

IF (DS:RCX is not 4KByte Aligned)
    THEN #GP(0); FI;
IF (DS:RCX does not resolve within an EPC)
    THEN #PF(DS:RCX); FI;
RFLAGS.ZF,CF,PF,AF,OF,SF ← 0;
RAX← 0;
(* Check the EPC page for concurrency*)
IF (EPC page in use)
    THEN
        RFLAGS.ZF ← 1;
        RAX← SGX_EPC_PAGE_CONFLICT;
        GOTO DONE;
FI;
IF (EPCM(DS:RCX). VALID = 0)
    THEN 
        RFLAGS.ZF ← 1;
        RAX← SGX_PG_INVLD;
        GOTO DONE;
FI;
IF ( (EPCM(DS:RCX).PT ≠ PT_REG) and (EPCM(DS:RCX).PT ≠ PT_TCS) and (EPCM(DS:RCX).PT ≠ PT_TRIM) )
    THEN 
        RFLAGS.CF ← 1;
        IF (EPCM(DS:RCX).PT = PT_SECS) 
            THEN RAX← SGX_PG_IS_SECS;
            ELSE RAX← SGX_NOTBLOCKABLE;
        FI;
        GOTO DONE;
FI;
(* Check if the page is already blocked and report blocked state *)
TMP_BLKSTATE ← EPCM(DS:RCX).BLOCKED;
40-26 Vol. 3D
                            SGX INSTRUCTION REFERENCES
(* at this point, the page must be valid and PT_TCS or PT_REG or PT_TRIM*)
IF (TMP_BLKSTATE = 1) 
    THEN 
        RFLAGS.CF ← 1;
        RAX← SGX_BLKSTATE;
    ELSE
        EPCM(DS:RCX).BLOCKED ← 1
FI;
DONE:
```
### Flags Affected
Sets ZF if SECS is in use or invalid, otherwise cleared. Sets CF if page is BLOCKED or not blockable, otherwise
cleared. Clears PF, AF, OF, SF.

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the DS segment limit.
If a memory operand is not properly aligned.
If the specified EPC resource is in use.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If a memory operand is not an EPC page.

### 64-Bit Mode Exceptions

<p>#GP(0)
If a memory operand is non-canonical form.
If a memory operand is not properly aligned.
If the specified EPC resource is in use.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If a memory operand is not an EPC page.

Vol. 3D 40-27

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
