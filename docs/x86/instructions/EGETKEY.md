SGX INSTRUCTION REFERENCES
<b>EGETKEY</b> — Retrieves a Cryptographic Key
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 01H ENCLU[EGETKEY]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>SGX1</td>
		<td>This leaf function retrieves a cryptographic key.</td>
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
		<td>EGETKEY (In)</td>
		<td>Address to a KEYREQUEST (In)</td>
		<td>Address of the OUTPUTDATA (In)</td>
	</tr>
</table>


### Description
The ENCLU[EGETKEY] instruction returns a 128-bit secret key from the processor specific key hierarchy. The
register RBX contains the effective address of a KEYREQUEST structure, which the instruction interprets to deter-
mine the key being requested. The Requesting Keys section below provides a description of the keys that can be
requested. The RCX register contains the effective address where the key will be returned. Both the addresses in
RBX & RCX should be locations inside the enclave.

EGETKEY derives keys using a processor unique value to create a specific key based on a number of possible inputs.
This instruction leaf can only be executed inside an enclave.

EEGETKEY Memory Parameter Semantics
<table>
	<tr>
		<td><b>KEYREQUEST</b></td>
		<td><b>OUTPUTDATA</b></td>
	</tr>
	<tr>
		<td>Enclave read access</td>
		<td>Enclave write access</td>
	</tr>
</table>

After validating the operands, the instruction determines which key is to be produced and performs the following
actions:

 * The instruction assembles the derivation data for the key based on the Table 40-64.

 *  Computes derived key using the derivation data and package specific value.

 *  Outputs the calculated key to the address in RCX.

The instruction fails with \#GP(0) if the operands are not properly aligned. Successful completion of the instruction
will clear RFLAGS.{ZF, CF, AF, OF, SF, PF}. The instruction returns an error code if the user tries to request a key
based on an invalid CPUSVN or ISVSVN (when the user request is accepted, see the table below), requests a key
for which it has not been granted the attribute to request, or requests a key that is not supported by the hardware.
These checks may be performed in any order. Thus, an indication by error number of one cause (for example,
invalid attribute) does not imply that there are not also other errors. Different processors may thus give different
error numbers for the same Enclave. The correctness of software should not rely on the order resulting from the
checks documented in this section. In such cases the ZF flag is set and the corresponding error bit
(SGX_INVALID_SVN, SGX_INVALID_ATTRIBUTE, SGX_INVALID_KEYNAME) is set in RAX and the data at the
address specified by RCX is unmodified.
Requesting Keys

The KEYREQUEST structure (see Section 37.17.1) identifies the key to be provided. The Keyrequest.KeyName field
identifies which type of key is requested.
Deriving Keys

Key derivation is based on a combination of the enclave specific values (see Table 40-64) and a processor key.
Depending on the key being requested a field may either be included by definition or the value may be included
from the KeyRequest. A “yes” in Table 40-64 indicates the value for the field is included from its default location,
identified in the source row, and a “request” indicates the values for the field is included from its corresponding
KeyRequest field.

40-104 Vol. 3D
SGX INSTRUCTION REFERENCES

Table 40-64.  Key Derivation
<table>
	<tr>
		<td><b></b></td>
		<td><b>Key Name Attributes</b></td>
		<td><b></b></td>
		<td><b>Owner Epoch</b></td>
		<td><b>CPU SVN</b></td>
		<td><b>ISV SVN</b></td>
		<td><b>ISV PRODID</b></td>
		<td><b>ISVEXT PRODID</b></td>
		<td><b>ISVFAM ILYID</b></td>
		<td><b>MRENCLAVE  MRSIGNER</b></td>
		<td><b></b></td>
		<td><b>CONFIG ID</b></td>
		<td><b>CONFIGS VN</b></td>
		<td><b>RAND</b></td>
	</tr>
	<tr>
		<td rowspan=2>Source</td>
		<td rowspan=2>Key Dependent Constant</td>
		<td>Y SECS.ATTRIBUTES and SECS.MISCSELECT;</td>
		<td rowspan=2>CR_SGX OWNER EPOCH</td>
		<td>Y CPUSVN Register;</td>
		<td rowspan=2>R Req.ISV SVN;</td>
		<td rowspan=2>SECS. ISVID</td>
		<td rowspan=2>SECS.IS VEXTPR ODID</td>
		<td rowspan=2>SECS.IS VFAMIL YID</td>
		<td rowspan=2>SECS. MRENCLAVE</td>
		<td rowspan=2>SECS. MRSIGNER</td>
		<td rowspan=2>SECS.CO NFIGID</td>
		<td rowspan=2>SECS.CO NFIGSVN</td>
		<td rowspan=2>Req. KEYID</td>
	</tr>
	<tr>
		<td>RAttribMask & SECS.ATTRIBUTES and SECS.MISCSELECT;</td>
		<td>R Req.CPU SVN;</td>
	</tr>
	<tr>
		<td>EINITTOKEN Yes</td>
		<td></td>
		<td>Request</td>
		<td>Yes</td>
		<td>Request Request Yes</td>
		<td></td>
		<td></td>
		<td>No</td>
		<td>No</td>
		<td>No</td>
		<td>Yes</td>
		<td>No</td>
		<td>No</td>
		<td>Request</td>
	</tr>
	<tr>
		<td>Report</td>
		<td>Yes</td>
		<td>Yes</td>
		<td>Yes</td>
		<td>Yes</td>
		<td>No</td>
		<td>No</td>
		<td>No</td>
		<td>No</td>
		<td>Yes</td>
		<td>No</td>
		<td>Yes</td>
		<td>Yes</td>
		<td>Request</td>
	</tr>
	<tr>
		<td>Seal</td>
		<td>Yes</td>
		<td>Request</td>
		<td>Yes</td>
		<td>Request Request Request Request Request Request</td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td>Request</td>
		<td>Request Request</td>
		<td></td>
		<td>Request</td>
	</tr>
	<tr>
		<td>Provisioning Yes</td>
		<td></td>
		<td>Request</td>
		<td>No</td>
		<td>Request Request Yes</td>
		<td></td>
		<td></td>
		<td>No</td>
		<td>No</td>
		<td>No</td>
		<td>Yes</td>
		<td>No</td>
		<td>No</td>
		<td>Yes</td>
	</tr>
	<tr>
		<td>Provisioning Seal</td>
		<td>Yes</td>
		<td>Request</td>
		<td>No</td>
		<td>Request Request Request Request Request No</td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td>Yes</td>
		<td>Request Request</td>
		<td></td>
		<td>Yes</td>
	</tr>
</table>

Keys that permit the specification of a CPU or ISV's code's, or enclave configuration's SVNs have additional require-
ments. The caller may not request a key for an SVN beyond the current CPU, ISV or enclave configuration's SVN,
respectively.

Several keys are access controlled. Access to the Provisioning Key and Provisioning Seal key requires the enclave's
ATTRIBUTES.PROVISIONKEY be set. The EINITTOKEN Key requires ATTRIBUTES.EINITTOKEN_KEY be set and
SECS.MRSIGNER equal IA32_SGXLEPUBKEYHASH.

Some keys are derived based on a hardcode PKCS padding constant (352 byte string):

HARDCODED_PKCS1_5_PADDING[15:0]  0100H;

HARDCODED_PKCS1_5_PADDING[2655:16]  SignExtend330Byte(-1); // 330 bytes of 0FFH

HARDCODED_PKCS1_5_PADDING[2815:2656]  2004000501020403650148866009060D30313000H;

The error codes are:

Table 40-65.  EGETKEY Return Value in RAX
<table>
	<tr>
		<td><b>Error Code (see Table 40-4)</b></td>
		<td><b>Value</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>No Error</td>
		<td>0</td>
		<td>EGETKEY successful.</td>
	</tr>
	<tr>
		<td>SGX_INVALID_ATTRIBUTE</td>
		<td></td>
		<td>The KEYREQUEST contains a KEYNAME for which the enclave is not authorized.</td>
	</tr>
	<tr>
		<td>SGX_INVALID_CPUSVN</td>
		<td></td>
		<td>If KEYREQUEST.CPUSVN is an unsupported platforms CPUSVN value.</td>
	</tr>
	<tr>
		<td>SGX_INVALID_ISVSVN</td>
		<td></td>
		<td>If KEYREQUEST software SVN (ISVSVN or CONFIGSVN) is greater than the enclave's corresponding SVN.</td>
	</tr>
	<tr>
		<td>SGX_INVALID_KEYNAME</td>
		<td></td>
		<td>If KEYREQUEST.KEYNAME is an unsupported value.</td>
	</tr>
</table>

Concurrency Restrictions

Table 40-66.  Base Concurrency Restrictions of EGETKEY
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
		<td rowspan=2>EGETKEY</td>
		<td>KEYREQUEST [DS:RBX]</td>
		<td>Concurrent</td>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td>OUTPUTDATA [DS:RCX]</td>
		<td>Concurrent</td>
		<td></td>
		<td></td>
	</tr>
</table>

Vol. 3D 40-105
SGX INSTRUCTION REFERENCES

Table 40-67.  Additional Concurrency Restrictions of EGETKEY
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
		<td rowspan=2>EGETKEY</td>
		<td>KEYREQUEST [DS:RBX]</td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
	</tr>
	<tr>
		<td>OUTPUTDATA [DS:RCX]</td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
		<td>Concurrent</td>
		<td></td>
	</tr>
</table>


### Operation


#### Temp Variables in EGETKEY Operational Flow
```java
<table>
	<tr>
		<td><b>Name</b></td>
		<td><b>Type</b></td>
		<td><b>Size (Bits)</b></td>
		<td><b>Description</b></td>
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
		<td>TMP_ATTRIBUTES</td>
		<td></td>
		<td>128</td>
		<td>Temp Space for the calculation of the sealable Attributes.</td>
	</tr>
	<tr>
		<td>TMP_ISVEXTPRODID</td>
		<td></td>
		<td>16 bytes</td>
		<td>Temp Space for ISVEXTPRODID.</td>
	</tr>
	<tr>
		<td>TMP_ISVPRODID</td>
		<td></td>
		<td>2 bytes</td>
		<td>Temp Space for ISVPRODID.</td>
	</tr>
	<tr>
		<td>TMP_ISVFAMILYID</td>
		<td></td>
		<td>16 bytes</td>
		<td>Temp Space for ISVFAMILYID.</td>
	</tr>
	<tr>
		<td>TMP_CONFIGID</td>
		<td></td>
		<td>64 bytes</td>
		<td>Temp Space for CONFIGID.</td>
	</tr>
	<tr>
		<td>TMP_CONFIGSVN</td>
		<td></td>
		<td>2 bytes</td>
		<td>Temp Space for CONFIGSVN.</td>
	</tr>
	<tr>
		<td>TMP_OUTPUTKEY</td>
		<td></td>
		<td>128</td>
		<td>Temp Space for the calculation of the key.</td>
	</tr>
</table>

(* Make sure KEYREQUEST is properly aligned and inside the current enclave *)
IF ( (DS:RBX is not 512Byte aligned) or (DS:RBX is within CR_ELRANGE) ) 
    THEN #GP(0); FI;
(* Make sure DS:RBX is an EPC address and the EPC page is valid *)
IF ( (DS:RBX does not resolve to an EPC address) or (EPCM(DS:RBX).VALID = 0) ) 
    THEN #PF(DS:RBX); FI;
IF (EPCM(DS:RBX).BLOCKED = 1) 
    THEN #PF(DS:RBX); FI;
(* Check page parameters for correctness *)
IF ( (EPCM(DS:RBX).PT ≠ PT_REG) or (EPCM(DS:RBX).ENCLAVESECS ≠ CR_ACTIVE_SECS) or (EPCM(DS:RBX).PENDING = 1) or
    (EPCM(DS:RBX).MODIFIED = 1) or (EPCM(DS:RBX).ENCLAVEADDRESS ≠ (DS:RBX & ~0FFFH) ) or (EPCM(DS:RBX).R = 0) ) 
    THEN #PF(DS:RBX); 
FI;
(* Make sure OUTPUTDATA is properly aligned and inside the current enclave *)
IF ( (DS:RCX is not 16Byte aligned) or (DS:RCX is not within CR_ELRANGE) ) 
    THEN #GP(0); FI;
(* Make sure DS:RCX is an EPC address and the EPC page is valid *)
IF ( (DS:RCX does not resolve to an EPC address) or (EPCM(DS:RCX).VALID = 0) ) 
40-106 Vol. 3D
                            SGX INSTRUCTION REFERENCES
    THEN #PF(DS:RCX); FI;
IF (EPCM(DS:RCX).BLOCKED = 1) 
    THEN #PF(DS:RCX); FI;
(* Check page parameters for correctness *)
IF ( (EPCM(DS:RCX).PT ≠ PT_REG) or (EPCM(DS:RCX).ENCLAVESECS ≠ CR_ACTIVE_SECS) or (EPCM(DS:RCX).PENDING = 1) or
    (EPCM(DS:RCX).MODIFIED = 1) or (EPCM(DS:RCX).ENCLAVEADDRESS ≠ (DS:RCX & ~0FFFH) ) or (EPCM(DS:RCX).W = 0) ) 
    THEN #PF(DS:RCX); 
FI;
(* Verify RESERVED spaces in KEYREQUEST are valid *)
IF ( (DS:RBX).RESERVED ≠ 0) or (DS:RBX.KEYPOLICY.RESERVED ≠ 0) ) 
    THEN #GP(0); FI;
TMP_CURRENTSECS ← CR_ACTIVE_SECS;
(* Verify that CONFIGSVN & New Policy bits are not used if KSS is not enabled *)
IF ((TMP_CURRENTSECS.ATTRIBUTES.KSS == 0) AND ((DS:RBX.KEYPOLICY & 0x003C ≠ 0) OR (DS:RBX.CONFIGSVN > 0)))
    THEN #GP(0); FI;
(* Determine which enclave attributes that must be included in the key. Attributes that must always be include INIT & DEBUG *)
REQUIRED_SEALING_MASK[127:0] ← 00000000 00000000 00000000 00000003H;
TMP_ATTRIBUTES ← (DS:RBX.ATTRIBUTEMASK | REQUIRED_SEALING_MASK) & TMP_CURRENTSECS.ATTRIBUTES;
(* Compute MISCSELECT fields to be included *)
TMP_MISCSELECT ← DS:RBX.MISCMASK & TMP_CURRENTSECS.MISCSELECT
CASE (DS:RBX.KEYNAME)
    SEAL_KEY:
        IF (DS:RBX.CPUSVN is beyond current CPU configuration)
            THEN
                RFLAGS.ZF ← 1;
                RAX ← SGX_INVALID_CPUSVN;
                GOTO EXIT;
        FI;
        IF (DS:RBX.ISVSVN > TMP_CURRENTSECS.ISVSVN)
            THEN
                RFLAGS.ZF ← 1;
                RAX ← SGX_INVALID_ISVSVN;
                GOTO EXIT;
        FI;
        IF (DS:RBX.CONFIGSVN > TMP_CURRENTSECS.CONFIGSVN)
            THEN
                RFLAGS.ZF ← 1;
                RAX ← SGX_INVALID_ISVSVN;
                GOTO EXIT;
        FI;
        (*Include enclave identity?*)
        TMP_MRENCLAVE ← 0;
        IF (DS:RBX.KEYPOLICY.MRENCLAVE = 1)
            THEN TMP_MRENCLAVE ← TMP_CURRENTSECS.MRENCLAVE;
        FI;
        (*Include enclave author?*)
                            Vol. 3D 40-107
SGX INSTRUCTION REFERENCES
        TMP_MRSIGNER ← 0;
        IF (DS:RBX.KEYPOLICY.MRSIGNER = 1)
            THEN TMP_MRSIGNER ← TMP_CURRENTSECS.MRSIGNER;
        FI;
(* Include enclave product family ID? *)
    TMP_ISVFAMILYID ← 0;
    IF (DS:RBX.KEYPOLICY.ISVFAMILYID = 1)
        THEN TMP_ISVFAMILYID ← TMP_CURRENTSECS.ISVFAMILYID;
        FI;
    (* Include enclave product ID? *)
    TMP_ISVPRODID ← 0;
    IF (DS:RBX.KEYPOLICY.NOISVPRODID = 0)
        TMP_ISVPRODID ←TMP_CURRENTSECS.ISVPRODID;
        FI;
    (* Include enclave Config ID? *)
    TMP_CONFIGID ← 0;
    TMP_CONFIGSVN ← 0;
    IF (DS:RBX.KEYPOLICY.CONFIGID = 1)
        TMP_CONFIGID ← TMP_CURRENTSECS.CONFIGID;
        TMP_CONFIGSVN ← DS:RBX.CONFIGSVN; 
        FI;
    (* Include enclave extended product ID? *)
    TMP_ISVEXTPRODID ← 0;
    IF (DS:RBX.KEYPOLICY.ISVEXTPRODID = 1 )
        TMP_ISVEXTPRODID ← TMP_CURRENTSECS.ISVEXTPRODID;
    FI;
        //Determine values key is based on
        TMP_KEYDEPENDENCIES.KEYNAME ← SEAL_KEY;
        TMP_KEYDEPENDENCIES.ISVFAMILYID ← TMP_ISVFAMILYID;
        TMP_KEYDEPENDENCIES.ISVEXTPRODID ← TMP_ISVEXTPRODID;
        TMP_KEYDEPENDENCIES.ISVPRODID ← TMP_ISVPRODID;
        TMP_KEYDEPENDENCIES.ISVSVN ← DS:RBX.ISVSVN;
        TMP_KEYDEPENDENCIES.SGXOWNEREPOCH ← CR_SGXOWNEREPOCH;
        TMP_KEYDEPENDENCIES.ATTRIBUTES ← TMP_ATTRIBUTES;
        TMP_KEYDEPENDENCIES.ATTRIBUTESMASK ← DS:RBX.ATTRIBUTEMASK;
        TMP_KEYDEPENDENCIES.MRENCLAVE ← TMP_MRENCLAVE;
        TMP_KEYDEPENDENCIES.MRSIGNER ← TMP_MRSIGNER;
        TMP_KEYDEPENDENCIES.KEYID ← DS:RBX.KEYID;
        TMP_KEYDEPENDENCIES.SEAL_KEY_FUSES ← CR_SEAL_FUSES;
        TMP_KEYDEPENDENCIES.CPUSVN ← DS:RBX.CPUSVN;
        TMP_KEYDEPENDENCIES.PADDING ← TMP_CURRENTSECS.PADDING;
        TMP_KEYDEPENDENCIES.MISCSELECT ← TMP_MISCSELECT;
        TMP_KEYDEPENDENCIES.MISCMASK ← ~DS:RBX.MISCMASK;
        TMP_KEYDEPENDENCIES.KEYPOLICY ← DS:RBX.KEYPOLICY;
        TMP_KEYDEPENDENCIES.CONFIGID ← TMP_CONFIGID;
        TMP_KEYDEPENDENCIES.CONFIGSVN ← TMP_CONFIGSVN;
        BREAK;
    REPORT_KEY:
        //Determine values key is based on
        TMP_KEYDEPENDENCIES.KEYNAME ← REPORT_KEY;
40-108 Vol. 3D
                            SGX INSTRUCTION REFERENCES
        TMP_KEYDEPENDENCIES.ISVFAMILYID ← 0;
        TMP_KEYDEPENDENCIES.ISVEXTPRODID ← 0;
        TMP_KEYDEPENDENCIES.ISVPRODID ← 0;
        TMP_KEYDEPENDENCIES.ISVSVN ← 0;
        TMP_KEYDEPENDENCIES.SGXOWNEREPOCH ← CR_SGXOWNEREPOCH;
        TMP_KEYDEPENDENCIES.ATTRIBUTES ← TMP_CURRENTSECS.ATTRIBUTES;
        TMP_KEYDEPENDENCIES.ATTRIBUTESMASK ← 0;
        TMP_KEYDEPENDENCIES.MRENCLAVE ← TMP_CURRENTSECS.MRENCLAVE;
        TMP_KEYDEPENDENCIES.MRSIGNER ← 0;
        TMP_KEYDEPENDENCIES.KEYID ← DS:RBX.KEYID;
        TMP_KEYDEPENDENCIES.SEAL_KEY_FUSES ← CR_SEAL_FUSES;
        TMP_KEYDEPENDENCIES.CPUSVN ← CR_CPUSVN;
        TMP_KEYDEPENDENCIES.PADDING ← HARDCODED_PKCS1_5_PADDING;
        TMP_KEYDEPENDENCIES.MISCSELECT ← TMP_CURRENTSECS.MISCSELECT;
        TMP_KEYDEPENDENCIES.MISCMASK ← 0;
        TMP_KEYDEPENDENCIES.KEYPOLICY ← 0;
        TMP_KEYDEPENDENCIES.CONFIGID ← TMP_CURRENTSECS.CONFIGID;
        TMP_KEYDEPENDENCIES.CONFIGSVN ← TMP_CURRENTSECS.CONFIGSVN;
        BREAK;
    EINITTOKEN_KEY:
        (* Check ENCLAVE has LAUNCH capability *)
        IF (TMP_CURRENTSECS.ATTRIBUTES.LAUNCHKEY = 0)
            THEN 
                RFLAGS.ZF ← 1;
                RAX ← SGX_INVALID_ATTRIBUTE;
                GOTO EXIT;
        FI;
        IF (DS:RBX.CPUSVN is beyond current CPU configuration)
            THEN 
                RFLAGS.ZF ← 1;
                RAX ← SGX_INVALID_CPUSVN;
                GOTO EXIT;
        FI;
        IF (DS:RBX.ISVSVN > TMP_CURRENTSECS.ISVSVN)
            THEN
                RFLAGS.ZF ← 1;
                RAX ← SGX_INVALID_ISVSVN;
                GOTO EXIT;
        FI;
        (* Determine values key is based on *)
        TMP_KEYDEPENDENCIES.KEYNAME ← EINITTOKEN_KEY;
        TMP_KEYDEPENDENCIES.ISVFAMILYID ← 0;
        TMP_KEYDEPENDENCIES.ISVEXTPRODID ← 0;
        TMP_KEYDEPENDENCIES.ISVPRODID ← TMP_CURRENTSECS.ISVPRODID
        TMP_KEYDEPENDENCIES.ISVSVN ← DS:RBX.ISVSVN;
        TMP_KEYDEPENDENCIES.SGXOWNEREPOCH ← CR_SGXOWNEREPOCH;
        TMP_KEYDEPENDENCIES.ATTRIBUTES ← TMP_ATTRIBUTES;
        TMP_KEYDEPENDENCIES.ATTRIBUTESMASK ← 0;
        TMP_KEYDEPENDENCIES.MRENCLAVE ← 0;
        TMP_KEYDEPENDENCIES.MRSIGNER ← TMP_CURRENTSECS.MRSIGNER;
        TMP_KEYDEPENDENCIES.KEYID ← DS:RBX.KEYID; 
        TMP_KEYDEPENDENCIES.SEAL_KEY_FUSES ← CR_SEAL_FUSES;
        TMP_KEYDEPENDENCIES.CPUSVN ← DS:RBX.CPUSVN;
        TMP_KEYDEPENDENCIES.PADDING ← TMP_CURRENTSECS.PADDING;
                            Vol. 3D 40-109
SGX INSTRUCTION REFERENCES
        TMP_KEYDEPENDENCIES.MISCSELECT ← TMP_MISCSELECT;
        TMP_KEYDEPENDENCIES.MISCMASK ← 0;
        TMP_KEYDEPENDENCIES.KEYPOLICY ← 0;
        TMP_KEYDEPENDENCIES.CONFIGID ← 0;
        TMP_KEYDEPENDENCIES.CONFIGSVN ← 0;
        BREAK;
    PROVISION_KEY: 
    (* Check ENCLAVE has PROVISIONING capability *)
        IF (TMP_CURRENTSECS.ATTRIBUTES.PROVISIONKEY = 0) 
            THEN
                RFLAGS.ZF ← 1;
                RAX ← SGX_INVALID_ATTRIBUTE;
                GOTO EXIT;
        FI;
        IF (DS:RBX.CPUSVN is beyond current CPU configuration)
            THEN
                RFLAGS.ZF ← 1;
                RAX ← SGX_INVALID_CPUSVN;
                GOTO EXIT;
        FI;
        IF (DS:RBX.ISVSVN > TMP_CURRENTSECS.ISVSVN)
            THEN
                RFLAGS.ZF ← 1;
                RAX ← SGX_INVALID_ISVSVN;
                GOTO EXIT;
        FI;
        (* Determine values key is based on *)
        TMP_KEYDEPENDENCIES.KEYNAME ← PROVISION_KEY;
        TMP_KEYDEPENDENCIES.ISVFAMILYID ← 0;
        TMP_KEYDEPENDENCIES.ISVEXTPRODID ← 0;
        TMP_KEYDEPENDENCIES.ISVPRODID ← TMP_CURRENTSECS.ISVPRODID;
        TMP_KEYDEPENDENCIES.ISVSVN ← DS:RBX.ISVSVN;
        TMP_KEYDEPENDENCIES.SGXOWNEREPOCH ← 0;
        TMP_KEYDEPENDENCIES.ATTRIBUTES ← TMP_ATTRIBUTES;
        TMP_KEYDEPENDENCIES.ATTRIBUTESMASK ← DS:RBX.ATTRIBUTEMASK;
        TMP_KEYDEPENDENCIES.MRENCLAVE ← 0;
        TMP_KEYDEPENDENCIES.MRSIGNER ← TMP_CURRENTSECS.MRSIGNER;
        TMP_KEYDEPENDENCIES.KEYID ← 0;
        TMP_KEYDEPENDENCIES.SEAL_KEY_FUSES ← 0;
        TMP_KEYDEPENDENCIES.CPUSVN ← DS:RBX.CPUSVN;
        TMP_KEYDEPENDENCIES.PADDING ← TMP_CURRENTSECS.PADDING;
        TMP_KEYDEPENDENCIES.MISCSELECT ← TMP_MISCSELECT;
        TMP_KEYDEPENDENCIES.MISCMASK ← ~DS:RBX.MISCMASK;
        TMP_KEYDEPENDENCIES.KEYPOLICY ← 0;
        TMP_KEYDEPENDENCIES.CONFIGID ← 0;
        BREAK;
    PROVISION_SEAL_KEY:
        (* Check ENCLAVE has PROVISIONING capability *)
        IF (TMP_CURRENTSECS.ATTRIBUTES.PROVISIONKEY = 0) 
            THEN
                RFLAGS.ZF ← 1;
                RAX ← SGX_INVALID_ATTRIBUTE;
                GOTO EXIT;
        FI;
40-110 Vol. 3D
                            SGX INSTRUCTION REFERENCES
        IF (DS:RBX.CPUSVN is beyond current CPU configuration)
            THEN
                RFLAGS.ZF ← 1;
                RAX ← SGX_INVALID_CPUSVN;
                GOTO EXIT;
        FI;
        IF (DS:RBX.ISVSVN > TMP_CURRENTSECS.ISVSVN)
            THEN
                RFLAGS.ZF ← 1;
                RAX ← SGX_INVALID_ISVSVN;
                GOTO EXIT;
        FI;
(* Include enclave product family ID? *)
    TMP_ISVFAMILYID ← 0;
    IF (DS:RBX.KEYPOLICY.ISVFAMILYID = 1)
        THEN TMP_ISVFAMILYID ← TMP_CURRENTSECS.ISVFAMILYID;
        FI;
    (* Include enclave product ID? *)
    TMP_ISVPRODID ← 0;
    IF (DS:RBX.KEYPOLICY.NOISVPRODID = 0)
        TMP_ISVPRODID ←TMP_CURRENTSECS.ISVPRODID;
        FI;
    (* Include enclave Config ID? *)
    TMP_CONFIGID ← 0;
    TMP_CONFIGSVN ← 0;
    IF (DS:RBX.KEYPOLICY.CONFIGID = 1)
        TMP_CONFIGID ← TMP_CURRENTSECS.CONFIGID;
        TMP_CONFIGSVN ← DS:RBX.CONFIGSVN; 
        FI;
    (* Include enclave extended product ID? *)
    TMP_ISVEXTPRODID ← 0;
    IF (DS:RBX.KEYPOLICY.ISVEXTPRODID = 1)
        TMP_ISVEXTPRODID ← TMP_CURRENTSECS.ISVEXTPRODID;
    FI;
        (* Determine values key is based on *)
        TMP_KEYDEPENDENCIES.KEYNAME ← PROVISION_SEAL_KEY;
        TMP_KEYDEPENDENCIES.ISVFAMILYID ← TMP_ISVFAMILYID;
        TMP_KEYDEPENDENCIES.ISVEXTPRODID ← TMP_ISVEXTPRODID;
        TMP_KEYDEPENDENCIES.ISVPRODID ← TMP_ISVPRODID;
        TMP_KEYDEPENDENCIES.ISVSVN ← DS:RBX.ISVSVN;
        TMP_KEYDEPENDENCIES.SGXOWNEREPOCH ← 0;
        TMP_KEYDEPENDENCIES.ATTRIBUTES ← TMP_ATTRIBUTES;
        TMP_KEYDEPENDENCIES.ATTRIBUTESMASK ← DS:RBX.ATTRIBUTEMASK;
        TMP_KEYDEPENDENCIES.MRENCLAVE ← 0;
        TMP_KEYDEPENDENCIES.MRSIGNER ← TMP_CURRENTSECS.MRSIGNER;
        TMP_KEYDEPENDENCIES.KEYID ← 0;
        TMP_KEYDEPENDENCIES.SEAL_KEY_FUSES ← CR_SEAL_FUSES;
        TMP_KEYDEPENDENCIES.CPUSVN ← DS:RBX.CPUSVN;
        TMP_KEYDEPENDENCIES.PADDING ← TMP_CURRENTSECS.PADDING;
        TMP_KEYDEPENDENCIES.MISCSELECT ← TMP_MISCSELECT;
                            Vol. 3D 40-111
SGX INSTRUCTION REFERENCES
        TMP_KEYDEPENDENCIES.MISCMASK ← ~DS:RBX.MISCMASK;
        TMP_KEYDEPENDENCIES.KEYPOLICY ← DS:RBX.KEYPOLICY;
        TMP_KEYDEPENDENCIES.CONFIGID ← TMP_CONFIGID;
        TMP_KEYDEPENDENCIES.CONFIGSVN ← TMP_CONFIGSVN;
        BREAK;
    DEFAULT:
        (* The value of KEYNAME is invalid *)
        RFLAGS.ZF ← 1;
        RAX ← SGX_INVALID_KEYNAME;
        GOTO EXIT:
ESAC;
(* Calculate the final derived key and output to the address in RCX *)
TMP_OUTPUTKEY ← derivekey(TMP_KEYDEPENDENCIES);
DS:RCX[15:0] ← TMP_OUTPUTKEY;
RAX ← 0;
RFLAGS.ZF ← 0;
EXIT:
RFLAGS.CF ← 0;
RFLAGS.PF ← 0;
RFLAGS.AF ← 0;
RFLAGS.OF ← 0;
RFLAGS.SF ← 0;
```
### Flags Affected
ZF is cleared if successful, otherwise ZF is set. CF, PF, AF, OF, SF are cleared.

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the current enclave.
If an effective address is not properly aligned.
If an effective address is outside the DS segment limit.
If KEYREQUEST format is invalid.
<p>#PF(error code)
If a page fault occurs in accessing memory.

### 64-Bit Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the current enclave.
If an effective address is not properly aligned.
If an effective address is not canonical.
If KEYREQUEST format is invalid.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.

40-112 Vol. 3D

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
