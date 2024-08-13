<b>PCONFIG</b> —  Platform Configuration
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>NP 0F 01 C5 PCONFIG</td>
		<td>A</td>
		<td>V/V</td>
		<td>PCONFIG</td>
		<td>This instruction is used to execute functions for configuring platform features. EAX: Leaf function to be invoked. RBX/RCX/RDX: Leaf-specific purpose.</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Tuple</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand 2</b></td>
		<td><b>Operand 3</b></td>
		<td><b>Operand 4</b></td>
	</tr>
	<tr>
		<td>A</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
PCONFIG allows software to configure certain platform features. PCONFIG supports multiple leaf functions, with a
leaf function identified by the value in EAX. The registers RBX, RCX, and RDX have leaf-specific purposes.

Each PCONFIG leaf function applies to a specific hardware block called a PCONFIG target, and each PCONFIG target
is associated with a numerical identifier. The identifiers of the PCONFIG targets supported by the CPU (which imply
the supported leaf functions) are enumerated in the sub-leaves of the PCONFIG-information leaf of CPUID (EAX =
1BH). An attempt to execute an undefined leaf function results in a general-protection exception (\#GP).

Addresses and operands are 32 bits outside 64-bit mode (IA32_EFER.LMA = 0 || CS.L = 0) and are 64 bits in 64-bit
 mode (IA32_EFER.LMA = 1 && CS.L = 1). The value of CS.D has no effect on address calculation.

Table 2-2 shows the leaf encodings for PCONFIG.

Table 2-2.  PCONFIG Leaf Encodings
<table>
	<tr>
		<td><b>Leaf</b></td>
		<td><b>Encoding</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>MKTME_KEY_PROGRAM</td>
		<td>00000000H</td>
		<td>This leaf is used to program the key and encryption mode associated with a KeyID.</td>
	</tr>
	<tr>
		<td>RESERVED</td>
		<td>00000001H - FFFFFFFFH</td>
		<td>Reserved for future use (#GP(0) if used).</td>
	</tr>
</table>

The MKTME_KEY_PROGRAM leaf of PCONFIG pertains to the MKTME target, which has target identifier 1. It is used
by software to manage the key associated with a KeyID. The leaf function is invoked by setting the leaf value of 0
in EAX and the address of MKTME_KEY_PROGRAM_STRUCT in RBX. Successful execution of the leaf clears RAX (set
to zero) and ZF, CF, PF, AF, OF, and SF are cleared. In case of failure, the failure reason is indicated in RAX with ZF
set to 1 and CF, PF, AF, OF, and SF are cleared. The MKTME_KEY_PROGRAM leaf uses the
MKTME_KEY_PROGRAM_STRUCT in memory shown in Table 2-3.

Table 2-3.  MKTME_KEY_PROGRAM_STRUCT Format
<table>
	<tr>
		<td><b>Field</b></td>
		<td><b>Offset (bytes)</b></td>
		<td><b>Size (bytes)</b></td>
		<td><b>Comments</b></td>
	</tr>
	<tr>
		<td>KEYID</td>
		<td>0</td>
		<td>2</td>
		<td>Key Identifier.</td>
	</tr>
	<tr>
		<td>KEYID_CTRL</td>
		<td>2</td>
		<td>4</td>
		<td>KeyID control: 
 *  Bits [7:0]: COMMAND. 
 *  Bits [23:8]: ENC_ALG. 
 *  Bits [31:24]: Reserved, must be zero.</td>
	</tr>
	<tr>
		<td>RESERVED</td>
		<td>6</td>
		<td>58</td>
		<td>Reserved, must be zero.</td>
	</tr>
	<tr>
		<td>KEY_FIELD_1</td>
		<td>64</td>
		<td>64</td>
		<td>Software supplied KeyID data key or entropy for KeyID data key.</td>
	</tr>
	<tr>
		<td>KEY_FIELD_2</td>
		<td>128</td>
		<td>64</td>
		<td>Software supplied KeyID tweak key or entropy for KeyID tweak key.</td>
	</tr>
</table>

2-16
A description of each of the fields in MKTME_KEY_PROGRAM_STRUCT is provided below:

 *  KEYID: Key Identifier being programmed to the MKTME engine.

 *  KEYID_CTRL: The KEYID_CTRL field carries two sub-fields used by software to control the behavior of a

KeyID: Command and KeyID encryption algorithm.

The command used controls the encryption mode for a KeyID. Table 2-4 provides a summary of the
commands supported.

Table 2-4.  Supported Key Programming Commands
<table>
	<tr>
		<td><b>Command</b></td>
		<td><b>Encoding</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>KEYID_SET_KEY_DIRECT</td>
		<td>0</td>
		<td>Software uses this mode to directly program a key for use with KeyID.</td>
	</tr>
	<tr>
		<td>KEYID_SET_KEY_RANDOM</td>
		<td>1</td>
		<td>CPU generates and assigns an ephemeral key for use with a KeyID. Each time the instruction is executed, the CPU generates a new key using a hardware random number generator and the keys are discarded on reset.</td>
	</tr>
	<tr>
		<td>KEYID_CLEAR_KEY</td>
		<td>2</td>
		<td>Clear the (software programmed) key associated with the KeyID. On execution of this command, the KeyID gets TME behavior (encrypt with platform TME key).</td>
	</tr>
	<tr>
		<td>KEYID_NO_ENCRYPT</td>
		<td>3</td>
		<td>Do not encrypt memory when this KeyID is in use.</td>
	</tr>
</table>

The encryption algorithm field (ENC_ALG) allows software to select one of the activated encryption algorithms
for the KeyID. The BIOS can activate a set of algorithms to allow for use when programming keys using the
IA32_TME_ACTIVATE MSR (does not apply to KeyID 0 which uses TME policy). The ISA checks to ensure that
the algorithm selected by software is one of the algorithms that has been activated by the BIOS.

 *  KEY_FIELD_1: This field carries the software supplied data key to be used for the KeyID if the direct key

programming option is used (KEYID_SET_KEY_DIRECT). When the random key programming option is used
(KEYID_SET_KEY_RANDOM), this field carries the software supplied entropy to be mixed in the CPU generated
random data key. It is software's responsibility to ensure that the key supplied for the direct programming
option or the entropy supplied for the random programming option does not result in weak keys. There are no
explicit checks in the instruction to detect or prevent weak keys. When AES XTS-128 is used, the upper 48B are
treated as reserved and must be zeroed out by software before executing the instruction.

 *  KEY_FIELD_2: This field carries the software supplied tweak key to be used for the KeyID if the direct key

programming option is used (KEYID_SET_KEY_DIRECT). When the random key programming option is used
(KEYID_SET_KEY_RANDOM), this field carries the software supplied entropy to be mixed in the CPU generated
random tweak key. It is software's responsibility to ensure that the key supplied for the direct programming
option or the entropy supplied for the random programming option does not result in weak keys. There are no
explicit checks in the instruction to detect or prevent weak keys. When AES XTS-128 is used, the upper 48B are
treated as reserved and must be zeroed out by software before executing the instruction.

All KeyIDs use the TME key on MKTME activation. Software can at any point decide to change the key for a
KeyID using the PCONFIG instruction. Change of keys for a KeyID does NOT change the state of the TLB
caches or memory pipeline. It is software's responsibility to take appropriate actions to ensure correct
behavior.
Table 2-5 shows the return values associated with the MKTME_KEY_PROGRAM leaf of PCONFIG. On
instruction execution, RAX is populated with the return value.

Table 2-5.  Supported Key Programming Commands
<table>
	<tr>
		<td><b>Return Value</b></td>
		<td><b>Encoding</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>PROG_SUCCESS</td>
		<td>0</td>
		<td>KeyID was successfully programmed.</td>
	</tr>
	<tr>
		<td>INVALID_PROG_CMD</td>
		<td>1</td>
		<td>Invalid KeyID programming command.</td>
	</tr>
	<tr>
		<td>ENTROPY_ERROR</td>
		<td>2</td>
		<td>Insufficient entropy.</td>
	</tr>
	<tr>
		<td>INVALID_KEYID</td>
		<td>3</td>
		<td>KeyID not valid.</td>
	</tr>
	<tr>
		<td>INVALID_ENC_ALG</td>
		<td>4</td>
		<td>Invalid encryption algorithm chosen (not supported).</td>
	</tr>
	<tr>
		<td>DEVICE_BUSY</td>
		<td>5</td>
		<td>Failure to access key table.</td>
	</tr>
</table>

2-17
PCONFIG Virtualization
Software in VMX root mode can control the execution of PCONFIG in VMX non-root mode using the following execu-
tion controls introduced for PCONFIG:

 * PCONFIG_ENABLE: This control is a single bit control and enables the PCONFIG instruction in VMX non-root
mode. If 0, the execution of PCONFIG in VMX non-root mode causes \#UD. Otherwise, execution of PCONFIG
works according to PCONFIG_EXITING.

 * PCONFIG_EXITING: This is a 64b control and allows VMX root mode to cause a VM-exit for various leaf
functions of PCONFIG. This control does not have any effect if the PCONFIG_ENABLE control is clear.

PCONFIG Concurrency
In a scenario, where the MKTME_KEY_PROGRAM leaf of PCONFIG is executed concurrently on multiple logical
processors, only one logical processor will succeed in updating the key table. PCONFIG execution will return with an
error code (DEVICE_BUSY) on other logical processors and software must retry. In cases where the instruction
execution fails with a DEVICE_BUSY error code, the key table is not updated, thereby ensuring that either the key
table is updated in its entirety with the information for a KeyID, or it is not updated at all. In order to accomplish
this, the MKTME_KEY_PROGRAM leaf of PCONFIG maintains a writer lock for updating the key table. This lock is
referred to as the Key table lock and denoted in the instruction flows as KEY_TABLE_LOCK. The lock can either be
unlocked, when no logical processor is holding the lock (also the initial state of the lock) or be in an exclusive state
where a logical processor is trying to update the key table. There can be only one logical processor holding the lock
in exclusive state. The lock, being exclusive, can only be acquired when the lock is in unlocked state.

PCONFIG uses the following syntax to acquire KEY_TABLE_LOCK in exclusive mode and release the lock:

 *  KEY_TABLE_LOCK.ACQUIRE(WRITE)

 *  KEY_TABLE_LOCK.RELEASE()

### Operation


#### Table 2-6.  PCONFIG Operation Variables
```java
<table>
	<tr>
		<td><b>Variable Name</b></td>
		<td><b>Type</b></td>
		<td><b>Size (Bytes)</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>TMP_KEY_PROGRAM_STRUCT MKTME_KEY_PROGRAM_STRUCT 192</td>
		<td></td>
		<td></td>
		<td>Structure holding the key programming structure.</td>
	</tr>
	<tr>
		<td>TMP_RND_DATA_KEY</td>
		<td>UINT128</td>
		<td>16</td>
		<td>Random data key generated for random key programming option.</td>
	</tr>
	<tr>
		<td>TMP_RND_TWEAK_KEY</td>
		<td>UINT128</td>
		<td>16</td>
		<td>Random tweak key generated for random key programming option.</td>
	</tr>
</table>

(* #UD if PCONFIG is not enumerated or CPL>0 *)
if (CPUID.7.0:EDX[18] == 0 OR CPL > 0) #UD;
if (in VMX non-root mode)
{
    if (VMCS.PCONFIG_ENABLE == 1)
    {
        if ((EAX > 62 AND VMCS.PCONFIG_EXITING[63] ==1) OR 
        
             (EAX < 63 AND VMCS.PCONFIG_EXITING[EAX] == 1))
        {
            Set VMCS.EXIT_REASON = PCONFIG; //No Exit qualification
            Deliver VMEXIT;
        }
    }
    else
    { 
        #UD
    }
}
(* #GP(0) for an unsupported leaf *)
if(EAX != 0) #GP(0)
(* KEY_PROGRAM leaf flow *)
if (EAX == 0)
{
    (* #GP(0) if TME_ACTIVATE MSR is not locked or does not enable TME or multiple keys are not enabled *)
    if (IA32_TME_ACTIVATE.LOCK != 1 OR IA32_TME_ACTIVATE.ENABLE != 1 OR IA32_TME_ACTIVATE.MK_TME_KEYID_BITS == 0) 
#GP(0)
    (* Check MKTME_KEY_PROGRAM_STRUCT is 256B aligned *)
    if(DS:RBX is not 256B aligned) #GP(0);
    (* Check that MKTME_KEY_PROGRAM_STRUCT is read accessible *)
    <<DS: RBX should be read accessible>>
    (* Copy MKTME_KEY_PROGRAM_STRUCT to a temporary variable *)
    TMP_KEY_PROGRAM_STRUCT = DS:RBX.*;
    (* RSVD field check *)
    if(TMP_KEY_PROGRAM_STRUCT.RSVD != 0) #GP(0);
    if(TMP_KEY_PROGRAM_STRUCT.KEYID_CTRL.RSVD !=0) #GP(0);
    if(TMP_KEY_PROGRAM_STRUCT.KEY_FIELD_1.BYTES[63:16] != 0) #GP(0);
    if(TMP_KEY_PROGRAM_STRUCT.KEY_FIELD_2.BYTES[63:16] != 0) #GP(0);
    (* Check for a valid command *)
    if(TMP_KEY_PROGRAM_STRUCT. KEYID_CTRL.COMMAND is not a valid command)
    {
        RFLAGS.ZF = 1;
        RAX = INVALID_PROG_CMD;
        goto EXIT;
    }
    (* Check that the KEYID being operated upon is a valid KEYID *)
    if(TMP_KEY_PROGRAM_STRUCT.KEYID > 
                2^IA32_TME_ACTIVATE.MK_TME_KEYID_BITS - 1
        OR TMP_KEY_PROGRAM_STRUCT.KEYID > 
                IA32_TME_CAPABILITY.MK_TME_MAX_KEYS 
        OR TMP_KEY_PROGRAM_STRUCT.KEYID == 0) 
    {
        RFLAGS.ZF = 1;
        RAX = INVALID_KEYID;
        goto EXIT;
    }
    (* Check that only one algorithm is requested for the KeyID and it is one of the activated algorithms *)
    if(NUM_BITS(TMP_KEY_PROGRAM_STRUCT.KEYID_CTRL.ENC_ALG) != 1 || 
        (TMP_KEY_PROGRAM_STRUCT.KEYID_CTRL.ENC_ALG & 
            IA32_TME_ACTIVATE. MK_TME_CRYPTO_ALGS == 0))
    {
        RFLAGS.ZF = 1;
        RAX = INVALID_ENC_ALG;
        goto EXIT;
    }
    (* Try to acquire exclusive lock *)
    if (NOT KEY_TABLE_LOCK.ACQUIRE(WRITE))
    {
        //PCONFIG failure
        RFLAGS.ZF = 1;
        RAX = DEVICE_BUSY;
        goto EXIT;
    }
    (* Lock is acquired and key table will be updated as per the command 
        Before this point no changes to the key table are made *)
    switch(TMP_KEY_PROGRAM_STRUCT.KEYID_CTRL.COMMAND)
    {
    case KEYID_SET_KEY_DIRECT:
        <<Write 
            DATA_KEY=TMP_KEY_PROGRAM_STRUCT.KEY_FIELD_1,
            TWEAK_KEY=TMP_KEY_PROGRAM_STRUCT.KEY_FIELD_2,
            ENCRYPTION_MODE=ENCRYPT_WITH_KEYID_KEY,
            to MKTME Key table at index TMP_KEY_PROGRAM_STRUCT.KEYID
        >>
        break;
    case KEYID_SET_KEY_RANDOM:
        TMP_RND_DATA_KEY = <<Generate a random key using hardware RNG>>
        if (NOT ENOUGH ENTROPY)
        {
            RFLAGS.ZF = 1;
            RAX = ENTROPY_ERROR;
            goto EXIT;
        }
        TMP_RND_TWEAK_KEY = <<Generate a random key using hardware RNG>>
        if (NOT ENOUGH ENTROPY)
        {
            RFLAGS.ZF = 1;
            RAX = ENTROPY_ERROR;
            goto EXIT;
        }
        (* Mix user supplied entropy to the data key and tweak key *)
        TMP_RND_DATA_KEY = TMP_RND_KEY XOR 
            TMP_KEY_PROGRAM_STRUCT.KEY_FIELD_1.BYTES[15:0];
        TMP_RND_TWEAK_KEY = TMP_RND_TWEAK_KEY XOR 
            TMP_KEY_PROGRAM_STRUCT.KEY_FIELD_2.BYTES[15:0];
        <<Write 
            DATA_KEY=TMP_RND_DATA_KEY, 
            TWEAK_KEY=TMP_RND_TWEAK_KEY,
            ENCRYPTION_MODE=ENCRYPT_WITH_KEYID_KEY,
            to MKTME_KEY_TABLE at index TMP_KEY_PROGRAM_STRUCT.KEYID
        >>
        break;
    case KEYID_CLEAR_KEY:
        <<Write
        DATA_KEY='0,
        TWEAK_KEY='0,
        ENCRYPTION_MODE = ENCRYPT_WITH_TME_KEY,
        to MKTME_KEY_TABLE at index TMP_KEY_PROGRAM_STRUCT.KEYID
        >>
        break;
    case KD_NO_ENCRYPT:
        <<Write 
        ENCRYPTION_MODE=NO_ENCRYPTION,
        to MKTME_KEY_TABLE at index TMP_KEY_PROGRAM_STRUCT.KEYID
        >>
        break;
    }
    RAX = 0;
    RFLAGS.ZF = 0;
    //Release Lock
    KEY_TABLE_LOCK(RELEASE);
    EXIT:
    RFLAGS.CF=0;
    RFLAGS.PF=0;
    RFLAGS.AF=0;
    RFLAGS.OF=0;
    RFLAGS.SF=0;
}
end_of_flow
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
TBD
```
### Protected Mode Exceptions
<p>#GP(0)
If input value in EAX encodes an unsupported leaf.
If IA32_TME_ACTIVATE MSR is not locked.
If TME and MKTME capability are not enabled in IA32_TME_ACTIVATE MSR.
If the memory operand is not 256B aligned.
If any of the reserved bits in MKTME_KEY_PROGRAM_STRUCT are set.
If a memory operand effective address is outside the DS segment limit.
<p>#PF(fault-code)
If a page fault occurs in accessing memory operands.
<p>#UD
If any of the LOCK/REP/OSIZE/VEX prefixes are used.
If current privilege level is not 0.
If CPUID.7.0:EDX[bit 18] = 0
If in VMX non-root mode and VMCS.PCONFIG_ENABLE = 0.

Real Address Mode Exceptions
<p>#GP
If input value in EAX encodes an unsupported leaf.
If IA32_TME_ACTIVATE MSR is not locked.
If TME and MKTME capability is not enabled in IA32_TME_ACTIVATE MSR.
If a memory operand is not 256B aligned.
If any of the reserved bits in MKTME_KEY_PROGRAM_STRUCT are set.
<p>#UD
If any of the LOCK/REP/OSIZE/VEX prefixes are used.
If current privilege level is not 0.
If CPUID.7.0:EDX.PCONFIG[bit 18] = 0
If in VMX non-root mode and VMCS.PCONFIG_ENABLE = 0.

### Virtual 8086 Mode Exceptions

<p>#UD
PCONFIG instruction is not recognized in virtual-8086 mode.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#GP(0)
If input value in EAX encodes an unsupported leaf.
If IA32_TME_ACTIVATE MSR is not locked.
If TME and MKTME capability is not enabled in IA32_TME_ACTIVATE MSR.
If a memory operand is not 256B aligned.
If any of the reserved bits in MKTME_KEY_PROGRAM_STRUCT are set.
If a memory operand is non-canonical form.
<p>#PF(fault-code)
If a page fault occurs in accessing memory operands.
<p>#UD
If any of the LOCK/REP/OSIZE/VEX prefixes are used.
If the current privilege level is not 0.
If CPUID.7.0:EDX.PCONFIG[bit 18] = 0.
If in VMX non-root mode and VMCS.PCONFIG_ENABLE = 0.


 --- 
<p align="right"><i>Source: Intel® Architecture Instruction Set Extensions and Future Features Programming Reference (May 2019)<br>Generated: 28-5-2019</i></p>