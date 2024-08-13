SGX INSTRUCTION REFERENCES
<b>EINIT</b> — Initialize an Enclave for Execution
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>EAX = 02H ENCLS[EINIT]</td>
		<td>IR</td>
		<td>V/V</td>
		<td>SGX1</td>
		<td>This leaf function initializes the enclave and makes it ready to execute enclave code.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td colspan=2><b>EAX</b></td>
		<td><b>RBX</b></td>
		<td><b>RCX</b></td>
		<td><b>RDX</b></td>
	</tr>
	<tr>
		<td>IR</td>
		<td>EINIT (In)</td>
		<td>Error code (Out)</td>
		<td>Address of SIGSTRUCT (In)</td>
		<td>Address of SECS (In)</td>
		<td>Address of EINITTOKEN (In)</td>
	</tr>
</table>


### Description
This leaf function is the final instruction executed in the enclave build process. After EINIT, the MRENCLAVE
measurement is complete, and the enclave is ready to start user code execution using the EENTER instruction.

EINIT takes the effective address of a SIGSTRUCT and EINITTOKEN. The SIGSTRUCT describes the enclave
including MRENCLAVE, ATTRIBUTES, ISVSVN, a 3072 bit RSA key, and a signature using the included key.
SIGSTRUCT must be populated with two values, q1 and q2. These are calculated using the formulas shown below:
q1 = floor(Signature2 / Modulus);
q2 = floor((Signature3 - q1 \* Signature \* Modulus) / Modulus);

The EINITTOKEN contains the MRENCLAVE, MRSIGNER, and ATTRIBUTES. These values must match the corresponding
 values in the SECS. If the EINITTOKEN was created with a debug launch key, the enclave must be in
debug mode as well.
<table>
	<tr>
		<td colspan=29 rowspan=11><b>Verify Signature PubKey ATTRIBUTES ATTRIBUTEMASK MRENCLAVE SIGSTRUCT DS:RBX EINIT DS:RDX DS:RCX SECS ENCLAVE EPC Hashed Check MRSIGNER ATTRIBUTES MRENCLAVE EINITTOKEN Check If VALID=1, Check MRSIGNER If VALID=1, Check Copy ATTRIBUTES MRENCLAVE</b></td>
	</tr>
	<tr>
	</tr>
	<tr>
		<td colspan=2 rowspan=9></td>
	</tr>
	<tr>
	</tr>
	<tr>
	</tr>
	<tr>
		<td colspan=16 rowspan=3>MRENCLAVE EINITTOKEN If VALID=1, Check</td>
	</tr>
	<tr>
		<td colspan=2 rowspan=2></td>
	</tr>
	<tr>
	</tr>
	<tr>
	</tr>
	<tr>
	</tr>
	<tr>
	</tr>
</table>

Figure 40-1.  Relationships Between SECS, SIGSTRUCT and EINITTOKEN

Vol. 3D 40-43
SGX INSTRUCTION REFERENCES

EINIT Memory Parameter Semantics
<table>
	<tr>
		<td><b>SECS</b></td>
		<td><b>EINITTOKEN</b></td>
	</tr>
	<tr>
		<td>Read/Write access by Enclave</td>
		<td>Access by non-Enclave</td>
	</tr>
</table>

EINIT performs the following steps, which can be seen in Figure 40-1:

Validates that SIGSTRUCT is signed using the enclosed public key.

Checks that the completed computation of SECS.MRENCLAVE equals SIGSTRUCT.HASHENCLAVE.

Checks that no reserved bits are set to 1 in SIGSTRUCT.ATTRIBUTES and no reserved bits in SIGSTRUCT.ATTRI-
BUTESMASK are set to 0.

Checks that no controlled ATTRIBUTES bits are set in SIGSTRUCT.ATTRIBUTES unless the SHA256 digest of
SIGSTRUCT.MODULUS equals IA32_SGX_LEPUBKEYHASH.

Checks that SIGSTRUCT.ATTRIBUTES equals the result of logically and-ing SIGSTRUCT.ATTRIBUTEMASK with
SECS.ATTRIBUTES.

If EINITTOKEN.VALID is 0, checks that the SHA256 digest of SIGSTRUCT.MODULUS equals
IA32_SGX_LEPUBKEYHASH.

If EINITTOKEN.VALID is 1, checks the validity of EINITTOKEN.

If EINITTOKEN.VALID is 1, checks that EINITTOKEN.MRENCLAVE equals SECS.MRENCLAVE.

If EINITTOKEN.VALID is 1 and EINITTOKEN.ATTRIBUTES.DEBUG is 1, SECS.ATTRIBUTES.DEBUG must be 1.

Commits SECS.MRENCLAVE, and sets SECS.MRSIGNER, SECS.ISVSVN, and SECS.ISVPRODID based on
SIGSTRUCT.

Update the SECS as Initialized.

Periodically, EINIT polls for certain asynchronous events. If such an event is detected, it completes with failure code
(ZF=1 and RAX = SGX_UNMASKED_EVENT), and RIP is incremented to point to the next instruction. These events
includes external interrupts, non-maskable interrupts, system-management interrupts, machine checks, INIT
signals, and the VMX-preemption timer. EINIT does not fail if the pending event is inhibited (e.g., external inter-
rupts could be inhibited due to blocking by MOV SS blocking or by STI).

The following bits in RFLAGS are cleared: CF, PF, AF, OF, and SF. When the instruction completes with an error,
RFLAGS.ZF is set to 1, and the corresponding error bit is set in RAX. If no error occurs, RFLAGS.ZF is cleared and
RAX is set to 0.

The error codes are:

Table 40-25.  EINIT Return Value in RAX
<table>
	<tr>
		<td><b>Error Code (see Table 40-4)</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>No Error</td>
		<td>EINIT successful.</td>
	</tr>
	<tr>
		<td>SGX_INVALID_SIG_STRUCT</td>
		<td>If SIGSTRUCT contained an invalid value.</td>
	</tr>
	<tr>
		<td>SGX_INVALID_ATTRIBUTE</td>
		<td>If SIGSTRUCT contains an unauthorized attributes mask.</td>
	</tr>
	<tr>
		<td>SGX_INVALID_MEASUREMENT</td>
		<td>If SIGSTRUCT contains an incorrect measurement. If EINITTOKEN contains an incorrect measurement.</td>
	</tr>
	<tr>
		<td>SGX_INVALID_SIGNATURE</td>
		<td>If signature does not validate with enclosed public key.</td>
	</tr>
	<tr>
		<td>SGX_INVALID_LICENSE</td>
		<td>If license is invalid.</td>
	</tr>
	<tr>
		<td>SGX_INVALID_CPUSVN</td>
		<td>If license SVN is unsupported.</td>
	</tr>
	<tr>
		<td>SGX_UNMASKED_EVENT</td>
		<td>If an unmasked event is received before the instruction completes its operation.</td>
	</tr>
</table>

40-44 Vol. 3D
SGX INSTRUCTION REFERENCES

Concurrency Restrictions

Table 40-26.  Base Concurrency Restrictions of EINIT
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
		<td>EINIT</td>
		<td>SECS [DS:RCX]</td>
		<td>Shared</td>
		<td>#GP</td>
		<td></td>
	</tr>
</table>

Table 40-27.  Additional Concurrency Restrictions of ENIT
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
		<td>EINIT</td>
		<td>SECS [DS:RCX]</td>
		<td>Concurrent</td>
		<td></td>
		<td>Exclusive</td>
		<td>#GP</td>
		<td>Concurrent</td>
		<td></td>
	</tr>
</table>


### Operation


#### Temp Variables in EINIT Operational Flow
```java
<table>
	<tr>
		<td><b>Name</b></td>
		<td><b>Type</b></td>
		<td><b>Size</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>TMP_SIG</td>
		<td>SIGSTRUCT</td>
		<td>1808Bytes</td>
		<td>Temp space for SIGSTRUCT.</td>
	</tr>
	<tr>
		<td>TMP_TOKEN</td>
		<td>EINITTOKEN</td>
		<td>304Bytes</td>
		<td>Temp space for EINITTOKEN.</td>
	</tr>
	<tr>
		<td>TMP_MRENCLAVE</td>
		<td></td>
		<td>32Bytes</td>
		<td>Temp space for calculating MRENCLAVE.</td>
	</tr>
	<tr>
		<td>TMP_MRSIGNER</td>
		<td></td>
		<td>32Bytes</td>
		<td>Temp space for calculating MRSIGNER.</td>
	</tr>
	<tr>
		<td>CONTROLLED_ATTRIBU TES</td>
		<td>ATTRIBUTES</td>
		<td>16Bytes</td>
		<td>Constant mask of all ATTRIBUTE bits that can only be set for authorized enclaves.</td>
	</tr>
	<tr>
		<td>TMP_KEYDEPENDENCIE S</td>
		<td>Buffer</td>
		<td>224Bytes</td>
		<td>Temp space for key derivation.</td>
	</tr>
	<tr>
		<td>TMP_EINITTOKENKEY</td>
		<td></td>
		<td>16Bytes</td>
		<td>Temp space for the derived EINITTOKEN Key.</td>
	</tr>
	<tr>
		<td>TMP_SIG_PADDING</td>
		<td>PKCS Padding Buffer</td>
		<td>352Bytes</td>
		<td>The value of the top 352 bytes from the computation of Signature3 modulo MRSIGNER.</td>
	</tr>
</table>

(* make sure SIGSTRUCT and SECS are aligned *)
IF ( (DS:RBX is not 4KByte Aligned) or (DS:RCX is not 4KByte Aligned) )
    THEN #GP(0); FI;
(* make sure the EINITTOKEN is aligned *)
IF (DS:RDX is not 512Byte Aligned) 
    THEN #GP(0); FI;
(* make sure the SECS is inside the EPC *)
IF (DS:RCX does not resolve within an EPC) 
    THEN #PF(DS:RCX); FI;
TMP_SIG[14463:0] ← DS:RBX[14463:0]; // 1808 bytes
TMP_TOKEN[2423:0] ← DS:RDX[2423:0]; // 304 bytes
                            Vol. 3D 40-45
SGX INSTRUCTION REFERENCES
(* Verify SIGSTRUCT Header. *)
IF ( (TMP_SIG.HEADER ≠ 06000000E10000000000010000000000h) or
    ((TMP_SIG.VENDOR ≠ 0) and (TMP_SIG.VENDOR ≠ 00008086h) ) or
    (TMP_SIG HEADER2 ≠ 01010000600000006000000001000000h) or
    (TMP_SIG.EXPONENT   ≠ 00000003h) or (Reserved space is not 0’s) )
    THEN 
        RFLAGS.ZF ← 1;
        RAX ← SGX_INVALID_SIG_STRUCT;
        GOTO EXIT;
FI;
(* Open “Event Window” Check for Interrupts. Verify signature using embedded public key, q1, and q2. Save upper 352 bytes of the 
PKCS1.5 encoded message into the TMP_SIG_PADDING*)
IF (interrupt was pending) THEN
    RFLAGS.ZF ← 1;
    RAX ← SGX_UNMASKED_EVENT;
    GOTO EXIT;
FI
IF (signature failed to verify) THEN
    RFLAGS.ZF ← 1;
    RAX ← SGX_INVALID_SIGNATURE;
    GOTO EXIT;
FI;
(*Close “Event Window” *)
(* make sure no other Intel SGX instruction is modifying SECS*)
IF (Other instructions modifying SECS) 
    THEN #GP(0); FI;
IF ( (EPCM(DS:RCX). VALID = 0) or (EPCM(DS:RCX).PT ≠ PT_SECS) )
    THEN #PF(DS:RCX); FI;
(* Verify ISVFAMILYID is not used on an enclave with KSS disabled *)
IF ((TMP_SIG.ISVFAMILYID != 0) AND (DS:RCX.ATTRIBUTES.KSS == 0))
    THEN 
        RFLAGS.ZF ← 1;
        RAX ← SGX_INVALID_SIG_STRUCT;
        GOTO EXIT;
FI;
(* make sure no other instruction is accessing MRENCLAVE or ATTRIBUTES.INIT *) 
IF ( (Other instruction modifying MRENCLAVE) or (Other instructions modifying the SECS’s Initialized state)) 
    THEN #GP(0); FI;
(* Calculate finalized version of MRENCLAVE *)
(* SHA256 algorithm requires one last update that compresses the length of the hashed message into the output SHA256 digest *)
TMP_ENCLAVE ←SHA256FINAL( (DS:RCX).MRENCLAVE, enclave’s MRENCLAVE update count *512);
(* Verify MRENCLAVE from SIGSTRUCT *)
IF (TMP_SIG.ENCLAVEHASH ≠ TMP_MRENCLAVE)
    RFLAGS.ZF ← 1;
    RAX ← SGX_INVALID_MEASUREMENT;
    GOTO EXIT;
FI;
40-46 Vol. 3D
                            SGX INSTRUCTION REFERENCES
TMP_MRSIGNER ← SHA256(TMP_SIG.MODULUS)
(* if controlled ATTRIBUTES are set, SIGSTRUCT must be signed using an authorized key *)
CONTROLLED_ATTRIBUTES ← 0000000000000020H;
IF ( ( (DS:RCX.ATTRIBUTES & CONTROLLED_ATTRIBUTES) ≠ 0) and (TMP_MRSIGNER ≠ IA32_SGXLEPUBKEYHASH) )
    RFLAGS.ZF ← 1;
    RAX ← SGX_INVALID_ATTRIBUTE;
    GOTO EXIT;
FI;
(* Verify SIGSTRUCT.ATTRIBUTE requirements are met *)
IF ( (DS:RCX.ATTRIBUTES & TMP_SIG.ATTRIBUTEMASK) ≠ (TMP_SIG.ATTRIBUTE & TMP_SIG.ATTRIBUTEMASK) )
    RFLAGS.ZF ← 1;
    RAX ← SGX_INVALID_ATTRIBUTE;
    GOTO EXIT;
FI;
( *Verify SIGSTRUCT.MISCSELECT requirements are met *)
IF ( (DS:RCX.MISCSELECT & TMP_SIG.MISCMASK) ≠ (TMP_SIG.MISCSELECT & TMP_SIG.MISCMASK) )
    THEN
        RFLAGS.ZF ← 1;
        RAX ← SGX_INVALID_ATTRIBUTE;
    GOTO EXIT
FI;
(* if EINITTOKEN.VALID[0] is 0, verify the enclave is signed by an authorized key *)
IF (TMP_TOKEN.VALID[0] = 0)
    IF (TMP_MRSIGNER ≠ IA32_SGXLEPUBKEYHASH)
        RFLAGS.ZF ← 1;
        RAX ← SGX_INVALID_EINITTOKEN;
        GOTO EXIT;
    FI;
    GOTO COMMIT;
FI;
(* Debug Launch Enclave cannot launch Production Enclaves *)
IF ( (DS:RDX.MASKEDATTRIBUTESLE.DEBUG = 1) and (DS:RCX.ATTRIBUTES.DEBUG = 0) )
    RFLAGS.ZF ← 1;
    RAX ← SGX_INVALID_EINITTOKEN;
    GOTO EXIT;
FI;
(* Check reserve space in EINIT token includes reserved regions and upper bits in valid field *)
IF (TMP_TOKEN reserved space is not clear)
    RFLAGS.ZF ← 1;
    RAX ← SGX_INVALID_EINITTOKEN;
    GOTO EXIT;
FI;
(* EINIT token must be ≤ CR_CPUSVN *)
IF (TMP_TOKEN.CPUSVN > CR_CPUSVN)
    RFLAGS.ZF ← 1;
    RAX ← SGX_INVALID_CPUSVN;
                            Vol. 3D 40-47
SGX INSTRUCTION REFERENCES
    GOTO EXIT;
FI;
(* Derive Launch key used to calculate EINITTOKEN.MAC *)
HARDCODED_PKCS1_5_PADDING[15:0] ← 0100H;
HARDCODED_PKCS1_5_PADDING[2655:16] ← SignExtend330Byte(-1); // 330 bytes of 0FFH
HARDCODED_PKCS1_5_PADDING[2815:2656] ← 2004000501020403650148866009060D30313000H;
TMP_KEYDEPENDENCIES.KEYNAME ← EINITTOKEN_KEY;
TMP_KEYDEPENDENCIES.ISVFAMILYID ← 0;
TMP_KEYDEPENDENCIES.ISVEXTPRODID ← 0;
TMP_KEYDEPENDENCIES.ISVPRODID ← TMP_TOKEN.ISVPRODIDLE;
TMP_KEYDEPENDENCIES.ISVSVN ← TMP_TOKEN.ISVSVN;
TMP_KEYDEPENDENCIES.SGXOWNEREPOCH ← CR_SGXOWNEREPOCH;
TMP_KEYDEPENDENCIES.ATTRIBUTES ← TMP_TOKEN.MASKEDATTRIBUTESLE;
TMP_KEYDEPENDENCIES.ATTRIBUTESMASK ← 0;
TMP_KEYDEPENDENCIES.MRENCLAVE ← 0;
TMP_KEYDEPENDENCIES.MRSIGNER ← IA32_SGXLEPUBKEYHASH;
TMP_KEYDEPENDENCIES.KEYID ← TMP_TOKEN.KEYID;
TMP_KEYDEPENDENCIES.SEAL_KEY_FUSES ← CR_SEAL_FUSES;
TMP_KEYDEPENDENCIES.CPUSVN ← TMP_TOKEN.CPUSVN;
TMP_KEYDEPENDENCIES.MISCSELECT ← TMP_TOKEN.MASKEDMISCSELECTLE;
TMP_KEYDEPENDENCIES.MISCMASK ← 0;
TMP_KEYDEPENDENCIES.PADDING ← HARDCODED_PKCS1_5_PADDING;
TMP_KEYDEPENDENCIES.KEYPOLICY ← 0;
TMP_KEYDEPENDENCIES.CONFIGID ← 0;
TMP_KEYDEPENDENCIES.CONFIGSVN ← 0;
(* Calculate the derived key*) 
TMP_EINITTOKENKEY ← derivekey(TMP_KEYDEPENDENCIES);
(* Verify EINITTOKEN was generated using this CPU's Launch key and that it has not been modified since issuing by the Launch 
Enclave. Only 192 bytes of EINITTOKEN are CMACed *)
IF (TMP_TOKEN.MAC ≠ CMAC(TMP_EINITTOKENKEY, TMP_TOKEN[1535:0] ) )
    RFLAGS.ZF ← 1;
    RAX ← SGX_INVALID_EINITTOKEN;
    GOTO EXIT;
FI;
(* Verify EINITTOKEN (RDX) is for this enclave *)
IF ( (TMP_TOKEN.MRENCLAVE ≠ TMP_MRENCLAVE) or (TMP_TOKEN.MRSIGNER ≠ TMP_MRSIGNER) )
    RFLAGS.ZF ← 1;
    RAX ← SGX_INVALID_MEASUREMENT;
    GOTO EXIT;
FI;
(* Verify ATTRIBUTES in EINITTOKEN are the same as the enclave’s *)
IF (TMP_TOKEN.ATTRIBUTES ≠ DS:RCX.ATTRIBUTES)
    RFLAGS.ZF ← 1;
    RAX ← SGX_INVALID_EINIT_ATTRIBUTE;
    GOTO EXIT;
FI;
COMMIT:
40-48 Vol. 3D
                            SGX INSTRUCTION REFERENCES
(* Commit changes to the SECS; Set ISVPRODID, ISVSVN, MRSIGNER, INIT ATTRIBUTE fields in SECS (RCX) *) 
DS:RCX.MRENCLAVE ← TMP_MRENCLAVE;
(* MRSIGNER stores a SHA256 in little endian implemented natively on x86 *) 
DS:RCX.MRSIGNER ← TMP_MRSIGNER;
DS:RCX.ISVEXTPRODID ← TMP_SIG.ISVEXTPRODID;
DS:RCX.ISVPRODID ← TMP_SIG.ISVPRODID;
DS:RCX.ISVSVN ← TMP_SIG.ISVSVN;
DS:RCX.ISVFAMILYID ← TMP_SIG.ISVFAMILYID;
DS:RCX.PADDING ← TMP_SIG_PADDING;
(* Mark the SECS as initialized *)
Update DS:RCX to initialized;
(* Set RAX and ZF for success*) 
    RFLAGS.ZF ← 0;
    RAX ← 0;
EXIT:
RFLAGS.CF,PF,AF,OF,SF ← 0;
```
### Flags Affected
ZF is cleared if successful, otherwise ZF is set and RAX contains the error code. CF, PF, AF, OF, SF are cleared.

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand is not properly aligned.
If another instruction is modifying the SECS.
If the enclave is already initialized.
If the SECS.MRENCLAVE is in use.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If RCX does not resolve in an EPC page.
If the memory address is not a valid, uninitialized SECS.

### 64-Bit Mode Exceptions

<p>#GP(0)
If a memory operand is not properly aligned.
If another instruction is modifying the SECS.
If the enclave is already initialized.
If the SECS.MRENCLAVE is in use.
<p>#PF(error code)
If a page fault occurs in accessing memory operands.
If RCX does not resolve in an EPC page.
If the memory address is not a valid, uninitialized SECS.

Vol. 3D 40-49

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
