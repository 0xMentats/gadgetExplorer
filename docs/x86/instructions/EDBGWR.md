SGX INSTRUCTION REFERENCES
<b>EDBGWR</b> — Write to a Debug Enclave
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 05H ENCLS[EDBGWR]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>SGX1</td>
		<td>This leaf function writes a dword/quadword to a debug enclave.</td>
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
		<td>EDBGWR (In)</td>
		<td>Data to be written to a debug enclave (In) Address of Target memory in the EPC (In)</td>
		<td></td>
	</tr>
</table>


### Description
This leaf function copies the content in EBX/RBX to an EPC page belonging to a debug enclave. Eight bytes are
written in 64-bit mode, four bytes are written in non-64-bit modes. The size of data cannot be overridden.

The effective address of the source location inside the EPC is provided in the register RCX.

EDBGWR Memory Parameter Semantics
<table>
	<tr>
		<td><b>EPCQW</b></td>
	</tr>
	<tr>
		<td>Write access permitted by Enclave</td>
	</tr>
</table>

The instruction faults if any of the following:

EDBGWR Faulting Conditions
<table>
	<tr>
		<td><b>RCX points into a page that is an SECS.</b></td>
		<td><b>RCX does not resolve to a naturally aligned linear address.</b></td>
	</tr>
	<tr>
		<td>RCX points to a page that does not belong to an enclave that is in debug mode.</td>
		<td>RCX points to a location inside a TCS that is not the FLAGS word.</td>
	</tr>
	<tr>
		<td>An operand causing any segment violation.</td>
		<td>May page fault.</td>
	</tr>
	<tr>
		<td>CPL > 0.</td>
		<td></td>
	</tr>
</table>

The error codes are:

Table 40-20.  EDBGWR Return Value in RAX
<table>
	<tr>
		<td><b>Error Code (see Table 40-4)</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>No Error</td>
		<td>EDBGWR successful.</td>
	</tr>
	<tr>
		<td>SGX_PAGE_NOT_DEBUGGABLE</td>
		<td>The EPC page cannot be accessed because it is in the PENDING or MODIFIED state.</td>
	</tr>
</table>

This instruction ignores the EPCM RWX attributes on the enclave page. Consequently, violation of EPCM RWX attri-
butes via EDBGRD does not result in a \#GP.

Concurrency Restrictions

Table 40-21.  Base Concurrency Restrictions of EDBGWR
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
		<td>EDBGWR</td>
		<td>Target [DS:RCX]</td>
		<td>Shared</td>
		<td>#GP</td>
		<td></td>
	</tr>
</table>

Vol. 3D 40-37
SGX INSTRUCTION REFERENCES

Table 40-22.  Additional Concurrency Restrictions of EDBGWR
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
		<td>EDBGWR</td>
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


#### Temp Variables in EDBGWR Operational Flow
```java
<table>
	<tr>
		<td><b>Name</b></td>
		<td><b>Type</b></td>
		<td><b>Size (Bits)</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>TMP_MODE64</td>
		<td>Binary</td>
		<td>1</td>
		<td>((IA32_EFER.LMA = 1) && (CS.L = 1)).</td>
	</tr>
	<tr>
		<td>TMP_SECS</td>
		<td></td>
		<td>64</td>
		<td>Physical address of SECS of the enclave to which source operand belongs.</td>
	</tr>
</table>

TMP_MODE64 ← ((IA32_EFER.LMA = 1) && (CS.L = 1));
IF ( (TMP_MODE64 = 1) and (DS:RCX is not 8Byte Aligned) )
    THEN #GP(0); FI;
IF ( (TMP_MODE64 = 0) and (DS:RCX is not 4Byte Aligned) )
    THEN #GP(0); FI;
IF (DS:RCX does not resolve within an EPC)
    THEN #PF(DS:RCX); FI;
(* make sure no other Intel SGX instruction is accessing EPCM *)
IF (Other EPCM modifying instructions executing) 
    THEN #GP(0); FI;
IF (EPCM(DS:RCX). VALID = 0)
    THEN #PF(DS:RCX); FI;
(* make sure that DS:RCX (DST) is pointing to a PT_REG or PT_TCS *) 
IF ( (EPCM(DS:RCX).PT ≠ PT_REG) and (EPCM(DS:RCX).PT ≠ PT_TCS) )
    THEN #PF(DS:RCX); FI;
(* make sure that DS:RCX points to an accessible EPC page *)
IF ( (EPCM(DS:RCX).PENDING is not 0) or (EPCM(DS:RCS).MODIFIED is not 0) )
    THEN
        RFLAGS.ZF ← 1;
        RAX ← SGX_PAGE_NOT_DEBUGGABLE;
        GOTO DONE;
FI;
(* If destination is a TCS, then make sure that the offset into the page can only point to the FLAGS field*)
IF ( ( EPCM(DS:RCX). PT = PT_TCS) and ((DS:RCX) & FF8H ≠ offset_of_FLAGS & 0FF8H) )
    THEN #GP(0); FI;
(* Locate the SECS for the enclave to which the DS:RCX page belongs *) 
40-38 Vol. 3D
                            SGX INSTRUCTION REFERENCES
TMP_SECS ← GET_SECS_PHYS_ADDRESS(EPCM(DS:RCX).ENCLAVESECS);
(* make sure the enclave owning the PT_REG or PT_TCS page allow debug *) 
IF (TMP_SECS.ATTRIBUTES.DEBUG = 0) 
    THEN #GP(0); FI;
IF ( (TMP_MODE64 = 1) )
    THEN (DS:RCX)[63:0] ← RBX[63:0]; 
    ELSE (DS:RCX)[31:0] ← EBX[31:0]; 
FI;
(* clear EAX and ZF to indicate successful completion *) 
RAX ← 0;
RFLAGS.ZF ← 0;
DONE:
(* clear flags *)
RFLAGS.CF,PF,AF,OF,SF ← 0
```
### Flags Affected
None

### Protected Mode Exceptions

<p>#GP(0)
If the address in RCS violates DS limit or access rights.
If DS segment is unusable.
If RCX points to a memory location not 4Byte-aligned.
If the address in RCX points to a page belonging to a non-debug enclave.
If the address in RCX points to a page which is not PT_TCS or PT_REG.
If the address in RCX points to a location inside TCS that is not the FLAGS word.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If the address in RCX points to a non-EPC page.
If the address in RCX points to an invalid EPC page.

### 64-Bit Mode Exceptions

<p>#GP(0)
If RCX is non-canonical form.
If RCX points to a memory location not 8Byte-aligned.
If the address in RCX points to a page belonging to a non-debug enclave.
If the address in RCX points to a page which is not PT_TCS or PT_REG.
If the address in RCX points to a location inside TCS that is not the FLAGS word.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If the address in RCX points to a non-EPC page.
If the address in RCX points to an invalid EPC page.

Vol. 3D 40-39

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
