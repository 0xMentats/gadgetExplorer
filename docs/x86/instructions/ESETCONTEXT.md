SGX INSTRUCTION REFERENCES
<b>ESETCONTEXT</b> — Set the ENCLAVECONTEXT Field in SECS
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 02H ENCLV[ESETCONTEXT]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>EAX[5]</td>
		<td>This leaf function sets the ENCLAVECONTEXT field in SECS.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>EAX</b></td>
		<td><b>RCX</b></td>
		<td><b>RDX</b></td>
	</tr>
	<tr>
		<td>IR</td>
		<td>ESETCONTEXT (In)</td>
		<td>Address of the destination EPC page (In, EA)</td>
		<td>Context Value (In, EA)</td>
	</tr>
</table>


### Description
The ESETCONTEXT leaf overwrites the ENCLAVECONTEXT field in the SECS. ECREATE and ELD of an SECS set the
ENCLAVECONTEXT field in the SECS to the address of the SECS (for access later in ERDINFO). The ESETCONTEXT
instruction allows a VMM to overwrite the default context value if necessary, for example, if the VMM is emulating
ECREATE or ELD on behalf of the guest.

The content of RCX is an effective address of the SECS page to be updated, RDX contains the address pointing to
the value to be stored in the SECS. The DS segment is used to create linear address. Segment override is not
supported.

The instruction fails if:

 * The operand is not properly aligned.

 *  RCX does not refer to an SECS page.

ESETCONTEXT Memory Parameter Semantics
<table>
	<tr>
		<td><b>EPCPAGE</b></td>
		<td><b>CONTEXT</b></td>
	</tr>
	<tr>
		<td>Read access permitted by Enclave</td>
		<td>Read/Write access permitted by Non Enclave</td>
	</tr>
</table>

The instruction faults if any of the following:

ESETCONTEXT Faulting Conditions
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

Concurrency Restrictions

Table 40-78.  Base Concurrency Restrictions of ESETCONTEXT
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
		<td>ESETCONTEXT</td>
		<td>SECS [DS:RCX]</td>
		<td>Shared</td>
		<td>SGX_EPC_PAGE_ CONFLICT</td>
		<td></td>
	</tr>
</table>

Vol. 3D 40-137
SGX INSTRUCTION REFERENCES

Table 40-79.  Additional Concurrency Restrictions of ESETCONTEXT
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
		<td>ESETCONTEXT</td>
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


#### Temp Variables in ESETCONTEXT Operational Flow
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
		<td>TMP_CONTEXT</td>
		<td>CONTEXT</td>
		<td>64</td>
		<td>Data Value of CONTEXT.</td>
	</tr>
</table>

```
#### ESETCONTEXT Return Value in RAX
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
		<td>ESETCONTEXT Successful.</td>
	</tr>
	<tr>
		<td>SGX_EPC_PAGE_CONFLICT</td>
		<td></td>
		<td>Failure due to concurrent operation of another SGX instruction.</td>
	</tr>
</table>

(* check alignment of the EPCPAGE (RCX) *)
IF (DS:RCX is not 4KByte Aligned) THEN
    #GP(0); FI;
 (* check that EPCPAGE (DS:RCX) is the address of an EPC page *)
IF (DS:RCX does not resolve within an EPC)THEN 
    #PF(DS:RCX, PFEC.SGX); FI;
(* check alignment of the CONTEXT field (RDX) *)
IF (DS:RDX is not 8Byte Aligned) THEN
    #GP(0); FI;
 (* Load CONTEXT into local variable *)
TMP_CONTEXT ← DS:RDX
(* Check the EPC page for concurrency *)
IF (EPC page is being modified) THEN
    RFLAGS.ZF ← 1;
    RFLAGS.CF ← 0;
    RAX ← SGX_EPC_PAGE_CONFLICT;
    goto DONE;
FI;
(* check page validity *)
IF (EPCM(DS:RCX).VALID = 0) THEN
    #PF(DS:RCX, PFEC.SGX);
FI;
(* check EPC page is an SECS page *)
40-138 Vol. 3D
                            SGX INSTRUCTION REFERENCES
IF (EPCM(DS:RCX).PT is not PT_SECS) THEN
    #PF(DS:RCX, PFEC.SGX);
FI;
(* load the context value into SECS(DS:RCX).ENCLAVECONTEXT *)
SECS(DS:RCX).ENCLAVECONTEXT ← TMP_CONTEXT;
RAX ← 0;
RFLAGS.ZF ← 0;
DONE:
(* clear flags *)
RFLAGS.CF,PF,AF,OF,SF ← 0;
```
### Flags Affected
ZF is set if ESETCONTEXT fails due to concurrent operation with another SGX instruction; otherwise cleared.

CF, PF, AF, OF and SF are cleared.

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the DS segment limit.
If DS segment is unusable.
If a memory operand is not properly aligned.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.

### 64-Bit Mode Exceptions

<p>#GP(0)
If a memory address is in a non-canonical form.
If a memory operand is not properly aligned.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.

Vol. 3D 40-139

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
