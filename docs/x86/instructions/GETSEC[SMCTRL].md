<b>GETSEC[SMCTRL]</b> — SMX Mode Control
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>0F 37 (EAX=7)</td>
		<td>GETSEC[SMCTRL]</td>
		<td>Perform specified SMX mode control as selected with the input EBX.</td>
	</tr>
</table>


### Description
The GETSEC[SMCTRL] instruction is available for performing certain SMX specific mode control operations. The
operation to be performed is selected through the input register EBX. Currently only an input value in EBX of 0 is
supported. All other EBX settings will result in the signaling of a general protection violation.

If EBX is set to 0, then the SMCTRL leaf is used to re-enable SMI events. SMI is masked by the ILP executing the
GETSEC[SENTER] instruction (SMI is also masked in the responding logical processors in response to SENTER
rendezvous messages.). The determination of when this instruction is allowed and the events that are unmasked
is dependent on the processor context (See Table 6-11). For brevity, the usage of SMCTRL where EBX=0 will be
referred to as GETSEC[SMCTRL(0)].

As part of support for launching a measured environment, the SMI, NMI and INIT events are masked after
GETSEC[SENTER], and remain masked after exiting authenticated execution mode. Unmasking these events
should be accompanied by securely enabling these event handlers. These security concerns can be addressed in
VMX operation by a MVMM.

The VM monitor can choose two approaches:

 * In a dual monitor approach, the executive software will set up an SMM monitor in parallel to the executive VMM
(i.e. the MVMM), see Chapter 34, “System Management Mode” of Intel® 64 and IA-32 Architectures Software
Developer’s Manual, Volume 3C. The SMM monitor is dedicated to handling SMI events without compromising
the security of the MVMM. This usage model of handling SMI while a measured environment is active does not
require the use of GETSEC[SMCTRL(0)] as event re-enabling after the VMX environment launch is handled
implicitly and through separate VMX based controls.

 * If a dedicated SMM monitor will not be established and SMIs are to be handled within the measured
environment, then GETSEC[SMCTRL(0)] can be used by the executive software to re-enable SMI that has been
masked as a result of SENTER.

Table 6-11 defines the processor context in which GETSEC[SMCTRL(0)] can be used and which events will be
unmasked. Note that the events that are unmasked are dependent upon the currently operating processor context.

Table 6-11.  Supported Actions for GETSEC[SMCTRL(0)]
<table>
	<tr>
		<td><b>ILP Mode of Operation In VMX non-root operation SENTERFLAG = 0 In authenticated code execution mode (ACMODEFLAG = 1) SENTERFLAG = 1, not in VMX operation, not in SMM SENTERFLAG = 1, in VMX root operation, not in SMM SENTERFLAG = 1, In VMX root operation, in SMM</b></td>
		<td><b>SMCTRL execution action VM exit #GP(0), illegal context #GP(0), illegal context Unmask SMI Unmask SMI if SMM monitor is not configured, otherwise #GP(0) #GP(0), illegal context</b></td>
	</tr>
</table>


### Operation

```java
(* The state of the internal flag ACMODEFLAG and SENTERFLAG persist across instruction boundary *)
IF (CR4.SMXE=0)
    THEN #UD;
ELSE IF (in VMX non-root operation)
    THEN VM Exit (reason=”GETSEC instruction”);
ELSE IF (GETSEC leaf unsupported)
    THEN #UD;
ELSE IF ((CR0.PE=0) or (CPL>0) OR (EFLAGS.VM=1))
    THEN #GP(0);
ELSE IF((EBX=0) and (SENTERFLAG=1) and (ACMODEFLAG=0) and (IN_SMM=0) and
         (((in VMX root operation) and (SMM monitor not configured)) or (not in VMX operation)) )
    THEN unmask SMI;
ELSE
    #GP(0);
END
```
### Flags Affected
None.

Use of Prefixes
LOCK
Causes \#UD.
REP\*
Cause \#UD (includes REPNE/REPNZ and REP/REPE/REPZ).
Operand size
Causes \#UD.
Segment overrides Ignored.
Address size
Ignored.
REX
Ignored.

### Protected Mode Exceptions

<p>#UD
If CR4.SMXE = 0.
If GETSEC[SMCTRL] is not reported as supported by GETSEC[CAPABILITIES].
<p>#GP(0)
If CR0.PE = 0 or CPL > 0 or EFLAGS.VM = 1.
If in VMX root operation.
If a protected partition is not already active or the processor is currently in authenticated code
mode.
If the processor is in SMM.
If the SMM monitor is not configured.

### Real-Address Mode Exceptions

<p>#UD
If CR4.SMXE = 0.
If GETSEC[SMCTRL] is not reported as supported by GETSEC[CAPABILITIES].
<p>#GP(0)
GETSEC[SMCTRL] is not recognized in real-address mode.

### Virtual-8086 Mode Exceptions

<p>#UD
If CR4.SMXE = 0.
If GETSEC[SMCTRL] is not reported as supported by GETSEC[CAPABILITIES].
<p>#GP(0)
GETSEC[SMCTRL] is not recognized in virtual-8086 mode.

### Compatibility Mode Exceptions
All protected mode exceptions apply.

### 64-Bit Mode Exceptions

All protected mode exceptions apply.

VM-exit Condition
Reason (GETSEC)
IF in VMX non-root operation.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
