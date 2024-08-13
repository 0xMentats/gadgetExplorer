SGX INSTRUCTION REFERENCES
<b>EEXTEND</b> — Extend Uninitialized Enclave Measurement by 256 Bytes
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 06H ENCLS[EEXTEND]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>SGX1</td>
		<td>This leaf function measures 256 bytes of an uninitialized enclave page.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>EAX</b></td>
		<td><b>EBX</b></td>
		<td><b>RCX</b></td>
	</tr>
	<tr>
		<td>IR</td>
		<td>EEXTEND (In)</td>
		<td>Effective address of the SECS of the data chunk (In)</td>
		<td>Effective address of a 256-byte chunk in the EPC (In)</td>
	</tr>
</table>


### Description
This leaf function updates the MRENCLAVE measurement register of an SECS with the measurement of an EXTEND
string compromising of “EEXTEND” || ENCLAVEOFFSET || PADDING || 256 bytes of the enclave page. This instruction
 can only be executed when current privilege level is 0 and the enclave is uninitialized.

RBX contains the effective address of the SECS of the region to be measured. The address must be the same as the
one used to add the page into the enclave.

RCX contains the effective address of the 256 byte region of an EPC page to be measured. The DS segment is used
to create linear addresses. Segment override is not supported.

EEXTEND Memory Parameter Semantics
<table>
	<tr>
		<td><b>EPC[RCX]</b></td>
	</tr>
	<tr>
		<td>Read access by Enclave</td>
	</tr>
</table>

The instruction faults if any of the following:

EEXTEND Faulting Conditions
<table>
	<tr>
		<td><b>RBX points to an address not 4KBytes aligned.</b></td>
		<td colspan=2><b>RBX does not resolve to an SECS.</b></td>
	</tr>
	<tr>
		<td>RBX does not point to an SECS page.</td>
		<td colspan=2>RBX does not point to the SECS page of the data chunk.</td>
	</tr>
	<tr>
		<td>RCX points to an address not 256B aligned.</td>
		<td>RCX points to an unused page or a SECS.</td>
	</tr>
	<tr>
		<td>RCX does not resolve in an EPC page.</td>
		<td>If SECS is locked.</td>
	</tr>
	<tr>
		<td>If the SECS is already initialized.</td>
		<td>May page fault.</td>
	</tr>
	<tr>
		<td>CPL > 0.</td>
		<td></td>
	</tr>
</table>

Concurrency Restrictions

Table 40-23.  Base Concurrency Restrictions of EEXTEND
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
		<td rowspan=2>EEXTEND</td>
		<td>Target [DS:RCX]</td>
		<td>Shared</td>
		<td>#GP</td>
		<td></td>
	</tr>
	<tr>
		<td>SECS [DS:RBX]</td>
		<td>Concurrent</td>
		<td></td>
		<td></td>
	</tr>
</table>

40-40 Vol. 3D
SGX INSTRUCTION REFERENCES

Table 40-24.  Additional Concurrency Restrictions of EEXTEND
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
		<td rowspan=2>EEXTEND</td>
		<td>Target [DS:RCX]</td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
	</tr>
	<tr>
		<td>SECS [DS:RBX]</td>
		<td>Concurrent</td>
		<td></td>
		<td>Exclusive</td>
		<td>#GP</td>
		<td>Concurrent</td>
		<td></td>
	</tr>
</table>


### Operation


#### Temp Variables in EEXTEND Operational Flow
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
		<td></td>
		<td>64</td>
		<td>Physical address of SECS of the enclave to which source operand belongs.</td>
	</tr>
	<tr>
		<td>TMP_ENCLAVEOFFS ET</td>
		<td>Enclave Offset</td>
		<td>64</td>
		<td>The page displacement from the enclave base address.</td>
	</tr>
	<tr>
		<td>TMPUPDATEFIELD</td>
		<td>SHA256 Buffer</td>
		<td>512</td>
		<td>Buffer used to hold data being added to TMP_SECS.MRENCLAVE.</td>
	</tr>
</table>

TMP_MODE64 ← ((IA32_EFER.LMA = 1) && (CS.L = 1));
IF (DS:RBX is not 4096 Byte Aligned)
    THEN #GP(0); FI;
IF (DS:RBX does resolve to an EPC page) 
    THEN #PF(DS:RBX); FI;
IF (DS:RCX is not 256Byte Aligned) 
    THEN #GP(0); FI;
IF (DS:RCX does not resolve within an EPC)
    THEN #PF(DS:RCX); FI;
(* make sure no other Intel SGX instruction is accessing EPCM *)
IF (Other instructions accessing EPCM) 
    THEN #GP(0); FI;
IF (EPCM(DS:RCX). VALID = 0)
    THEN #PF(DS:RCX); FI;
(* make sure that DS:RCX (DST) is pointing to a PT_REG or PT_TCS *) 
IF ( (EPCM(DS:RCX).PT ≠ PT_REG) and (EPCM(DS:RCX).PT ≠ PT_TCS) )
    THEN #PF(DS:RCX); FI;
TMP_SECS ← Get_SECS_ADDRESS();
IF (DS:RBX does not resolve to TMP_SECS)
    THEN #GP(0); FI;
(* make sure no other instruction is accessing MRENCLAVE or ATTRIBUTES.INIT *) 
IF ( (Other instruction accessing MRENCLAVE) or (Other instructions checking or updating the initialized state of the SECS)) 
    THEN #GP(0); FI;
                            Vol. 3D 40-41
SGX INSTRUCTION REFERENCES
(* Calculate enclave offset *)
TMP_ENCLAVEOFFSET ←EPCM(DS:RCX).ENCLAVEADDRESS - TMP_SECS.BASEADDR;
TMP_ENCLAVEOFFSET ←TMP_ENCLAVEOFFSET + (DS:RCX & 0FFFH)
(* Add EEXTEND message and offset to MRENCLAVE *)
TMPUPDATEFIELD[63:0] ← 00444E4554584545H; // “EEXTEND”
TMPUPDATEFIELD[127:64] ← TMP_ENCLAVEOFFSET;
TMPUPDATEFIELD[511:128] ← 0; // 48 bytes
TMP_SECS.MRENCLAVE ← SHA256UPDATE(TMP_SECS.MRENCLAVE, TMPUPDATEFIELD)
INC enclave’s MRENCLAVE update counter;
(*Add 256 bytes to MRENCLAVE, 64 byte at a time *) 
TMP_SECS.MRENCLAVE ← SHA256UPDATE(TMP_SECS.MRENCLAVE, DS:RCX[511:0] );
TMP_SECS.MRENCLAVE ← SHA256UPDATE(TMP_SECS.MRENCLAVE, DS:RCX[1023: 512] );
TMP_SECS.MRENCLAVE ← SHA256UPDATE(TMP_SECS.MRENCLAVE, DS:RCX[1535: 1024] );
TMP_SECS.MRENCLAVE ← SHA256UPDATE(TMP_SECS.MRENCLAVE, DS:RCX[2047: 1536] );
INC enclave’s MRENCLAVE update counter by 4;
```
### Flags Affected
None

### Protected Mode Exceptions

<p>#GP(0)
If the address in RBX is outside the DS segment limit.
If RBX points to an SECS page which is not the SECS of the data chunk.
If the address in RCX is outside the DS segment limit.
If RCX points to a memory location not 256Byte-aligned.
If another instruction is accessing MRENCLAVE.
If another instruction is checking or updating the SECS.
If the enclave is already initialized.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If the address in RBX points to a non-EPC page.
If the address in RCX points to a page which is not PT_TCS or PT_REG.
If the address in RCX points to a non-EPC page.
If the address in RCX points to an invalid EPC page.

### 64-Bit Mode Exceptions

<p>#GP(0)
If RBX is non-canonical form.
If RBX points to an SECS page which is not the SECS of the data chunk.
If RCX is non-canonical form.
If RCX points to a memory location not 256 Byte-aligned.
If another instruction is accessing MRENCLAVE.
If another instruction is checking or updating the SECS.
If the enclave is already initialized.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If the address in RBX points to a non-EPC page.
If the address in RCX points to a page which is not PT_TCS or PT_REG.
If the address in RCX points to a non-EPC page.
If the address in RCX points to an invalid EPC page.

40-42 Vol. 3D

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
