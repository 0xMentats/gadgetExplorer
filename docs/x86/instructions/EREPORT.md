SGX INSTRUCTION REFERENCES
<b>EREPORT</b> — Create a Cryptographic Report of the Enclave
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 00H ENCLU[EREPORT]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>SGX1</td>
		<td>This leaf function creates a cryptographic report of the enclave.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>EAX</b></td>
		<td><b>RBX</b></td>
		<td><b>RCX</b></td>
		<td><b>RDX</b></td>
	</tr>
	<tr>
		<td>IR</td>
		<td>EREPORT (In)</td>
		<td>Address of TARGETINFO (In)</td>
		<td>Address of REPORTDATA (In)</td>
		<td>Address where the REPORT is written to in an OUTPUTDATA (In)</td>
	</tr>
</table>


### Description
This leaf function creates a cryptographic REPORT that describes the contents of the enclave. This instruction leaf
can only be executed when inside the enclave. The cryptographic report can be used by other enclaves to deter-
mine that the enclave is running on the same platform.

RBX contains the effective address of the MRENCLAVE value of the enclave that will authenticate the REPORT
output, using the REPORT key delivered by EGETKEY command for that enclave. RCX contains the effective address
of a 64-byte REPORTDATA structure, which allows the caller of the instruction to associate data with the enclave
from which the instruction is called. RDX contains the address where the REPORT will be output by the instruction.

EREPORT Memory Parameter Semantics
<table>
	<tr>
		<td><b>TARGETINFO</b></td>
		<td><b>REPORTDATA</b></td>
		<td><b>OUTPUTDATA</b></td>
	</tr>
	<tr>
		<td>Read access by Enclave</td>
		<td>Read access by Enclave</td>
		<td>Read/Write access by Enclave</td>
	</tr>
</table>

This instruction leaf perform the following:

1. Validate the 3 operands (RBX, RCX, RDX) are inside the enclave.

2. Compute a report key for the target enclave, as indicated by the value located in RBX(TARGETINFO).

3. Assemble the enclave SECS data to complete the REPORT structure (including the data provided using the RCX
(REPORTDATA) operand).

4. Computes a cryptographic hash over REPORT structure.

5. Add the computed hash to the REPORT structure.

6. Output the completed REPORT structure to the address in RDX (OUTPUTDATA).

The instruction fails if the operands are not properly aligned.

CR_REPORT_KEYID, used to provide key wearout protection, is populated with a statistically unique value on boot
of the platform by a trusted entity within the SGX TCB.

The instruction faults if any of the following:

EREPORT Faulting Conditions
<table>
	<tr>
		<td><b>An effective address not properly aligned.</b></td>
		<td><b>An memory address does not resolve in an EPC page.</b></td>
	</tr>
	<tr>
		<td>If accessing an invalid EPC page.</td>
		<td>If the EPC page is blocked.</td>
	</tr>
	<tr>
		<td>May page fault.</td>
		<td></td>
	</tr>
</table>

40-116 Vol. 3D
SGX INSTRUCTION REFERENCES

Concurrency Restrictions

Table 40-70.  Base Concurrency Restrictions of EREPORT
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
		<td rowspan=3>EREPORT</td>
		<td>TARGETINFO [DS:RBX]</td>
		<td>Concurrent</td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td>REPORTDATA [DS:RCX]</td>
		<td>Concurrent</td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td>OUTPUTDATA [DS:RDX]</td>
		<td>Concurrent</td>
		<td></td>
		<td></td>
	</tr>
</table>

Table 40-71.  Additional Concurrency Restrictions of EREPORT
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
		<td rowspan=3>EREPORT</td>
		<td>TARGETINFO [DS:RBX] Concurrent</td>
		<td></td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
	</tr>
	<tr>
		<td>REPORTDATA [DS:RCX]</td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
	</tr>
	<tr>
		<td>OUTPUTDATA [DS:RDX]</td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
	</tr>
</table>


### Operation


#### Temp Variables in EREPORT Operational Flow
```java
<table>
	<tr>
		<td><b>Name</b></td>
		<td><b>Type</b></td>
		<td><b>Size (bits)</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>TMP_ATTRIBUTES</td>
		<td></td>
		<td>32</td>
		<td>Physical address of SECS of the enclave to which source operand belongs.</td>
	</tr>
	<tr>
		<td>TMP_CURRENTSECS</td>
		<td></td>
		<td></td>
		<td>Address of the SECS for the currently executing enclave.</td>
	</tr>
	<tr>
		<td>TMP_KEYDEPENDENCIES</td>
		<td></td>
		<td></td>
		<td>Temp space for key derivation.</td>
	</tr>
	<tr>
		<td>TMP_REPORTKEY</td>
		<td></td>
		<td>128</td>
		<td>REPORTKEY generated by the instruction.</td>
	</tr>
	<tr>
		<td>TMP_REPORT</td>
		<td></td>
		<td>3712</td>
		<td></td>
	</tr>
</table>

TMP_MODE64 ← ((IA32_EFER.LMA = 1) && (CS.L = 1));
(* Address verification for TARGETINFO (RBX) *)
IF ( (DS:RBX is not 512Byte Aligned) or (DS:RBX is not within CR_ELRANGE) )
    THEN #GP(0); FI;
IF (DS:RBX does not resolve within an EPC) 
    THEN #PF(DS:RBX); FI;
IF (EPCM(DS:RBX).VALID = 0)
    THEN #PF(DS:RBX); FI;
IF (EPCM(DS:RBX).BLOCKED = 1) 
    THEN #PF(DS:RBX); FI;
(* Check page parameters for correctness *)
IF ( (EPCM(DS:RBX).PT ≠ PT_REG) or (EPCM(DS:RBX).ENCLAVESECS ≠ CR_ACTIVE_SECS) or (EPCM(DS:RBX).PENDING = 1) or
    (EPCM(DS:RBX).MODIFIED = 1) or (EPCM(DS:RBX).ENCLAVEADDRESS ≠ (DS:RBX & ~0FFFH) ) or (EPCM(DS:RBX).R = 0) ) 
                            Vol. 3D 40-117
SGX INSTRUCTION REFERENCES
    THEN #PF(DS:RBX); 
FI;
(* Address verification for REPORTDATA (RCX) *)
IF ( (DS:RCX is not 128Byte Aligned) or (DS:RCX is not within CR_ELRANGE) )
    THEN #GP(0); FI;
IF (DS:RCX does not resolve within an EPC) 
    THEN #PF(DS:RCX); FI;
IF (EPCM(DS:RCX).VALID = 0)
    THEN #PF(DS:RCX); FI;
IF (EPCM(DS:RCX).BLOCKED = 1) 
    THEN #PF(DS:RCX); FI;
(* Check page parameters for correctness *)
IF ( (EPCM(DS:RCX).PT ≠ PT_REG) or (EPCM(DS:RCX).ENCLAVESECS ≠ CR_ACTIVE_SECS) or (EPCM(DS:RCX).PENDING = 1) or
    (EPCM(DS:RCX).MODIFIED = 1) or (EPCM(DS:RCX).ENCLAVEADDRESS ≠ (DS:RCX & ~0FFFH) ) or (EPCM(DS:RCX).R = 0) ) 
    THEN #PF(DS:RCX); 
FI;
(* Address verification for OUTPUTDATA (RDX) *)
IF ( (DS:RDX is not 512Byte Aligned) or (DS:RDX is not within CR_ELRANGE) )
    THEN #GP(0); FI;
IF (DS:RDX does not resolve within an EPC) 
    THEN #PF(DS:RDX); FI;
IF (EPCM(DS:RDX).VALID = 0)
    THEN #PF(DS:RDX); FI;
IF (EPCM(DS:RDX).BLOCKED = 1) 
    THEN #PF(DS:RDX); FI;
(* Check page parameters for correctness *)
IF ( (EPCM(DS:RDX).PT ≠ PT_REG) or (EPCM(DS:RDX).ENCLAVESECS ≠ CR_ACTIVE_SECS) or (EPCM(DS:RCX).PENDING = 1) or
    (EPCM(DS:RCX).MODIFIED = 1) or (EPCM(DS:RDX).ENCLAVEADDRESS ≠ (DS:RDX & ~0FFFH) ) or (EPCM(DS:RDX).W = 0) ) 
    THEN #PF(DS:RDX); 
FI;
(* REPORT MAC needs to be computed over data which cannot be modified *)
TMP_REPORT.CPUSVN ← CR_CPUSVN;
TMP_REPORT.ISVFAMILYID ← TMP_CURRENTSECS.ISVFAMILYID;
TMP_REPORT.ISVEXTPRODID ← TMP_CURRENTSECS.ISVEXTPRODID;
TMP_REPORT.ISVPRODID ← TMP_CURRENTSECS.ISVPRODID;
TMP_REPORT.ISVSVN ← TMP_CURRENTSECS.ISVSVN;
TMP_REPORT.ATTRIBUTES ← TMP_CURRENTSECS.ATTRIBUTES;
TMP_REPORT.REPORTDATA ← DS:RCX[511:0];
TMP_REPORT.MRENCLAVE ← TMP_CURRENTSECS.MRENCLAVE;
TMP_REPORT.MRSIGNER ← TMP_CURRENTSECS.MRSIGNER;
TMP_REPORT.MRRESERVED ← 0;
TMP_REPORT.KEYID[255:0] ← CR_REPORT_KEYID;
TMP_REPORT.MISCSELECT ← TMP_CURRENTSECS.MISCSELECT;
40-118 Vol. 3D
                            SGX INSTRUCTION REFERENCES
TMP_REPORT.CONFIGID ← TMP_CURRENTSECS.CONFIGID;
TMP_REPORT.CONFIGSVN ← TMP_CURRENTSECS.CONFIGSVN;
(* Derive the report key *)
TMP_KEYDEPENDENCIES.KEYNAME ← REPORT_KEY;
TMP_KEYDEPENDENCIES.ISVFAMILYID ← 0;
TMP_KEYDEPENDENCIES.ISVEXTPRODID ← 0;
TMP_KEYDEPENDENCIES.ISVPRODID ← 0;
TMP_KEYDEPENDENCIES.ISVSVN ← 0;
TMP_KEYDEPENDENCIES.SGXOWNEREPOCH ← CR_SGXOWNEREPOCH;
TMP_KEYDEPENDENCIES.ATTRIBUTES ← DS:RBX.ATTRIBUTES;
TMP_KEYDEPENDENCIES.ATTRIBUTESMASK ← 0;
TMP_KEYDEPENDENCIES.MRENCLAVE ← DS:RBX.MEASUREMENT;
TMP_KEYDEPENDENCIES.MRSIGNER ← 0;
TMP_KEYDEPENDENCIES.KEYID ← TMP_REPORT.KEYID;
TMP_KEYDEPENDENCIES.SEAL_KEY_FUSES ← CR_SEAL_FUSES;
TMP_KEYDEPENDENCIES.CPUSVN ← CR_CPUSVN;
TMP_KEYDEPENDENCIES.PADDING ← TMP_CURRENTSECS.PADDING;
TMP_KEYDEPENDENCIES.MISCSELECT ← DS:RBX.MISCSELECT;
TMP_KEYDEPENDENCIES.MISCMASK ← 0;
TMP_KEYDEPENDENCIES.KEYPOLICY ← 0;
TMP_KEYDEPENDENCIES.CONFIGID ← DS:RBX.CONFIGID;
TMP_KEYDEPENDENCIES.CONFIGSVN ← DS:RBX.CONFIGSVN;
(* Calculate the derived key*)
TMP_REPORTKEY ← derive_key(TMP_KEYDEPENDENCIES);
(* call cryptographic CMAC function, CMAC data are not including MAC&KEYID *)
TMP_REPORT.MAC ← cmac(TMP_REPORTKEY, TMP_REPORT[3071:0] );
DS:RDX[3455: 0] ← TMP_REPORT;
```
### Flags Affected
None

### Protected Mode Exceptions

<p>#GP(0)
If the address in RCS is outside the DS segment limit.
If a memory operand is not properly aligned.
If a memory operand is not in the current enclave.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.

### 64-Bit Mode Exceptions

<p>#GP(0)
If RCX is non-canonical form.
If a memory operand is not properly aligned.
If a memory operand is not in the current enclave.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.

Vol. 3D 40-119

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
