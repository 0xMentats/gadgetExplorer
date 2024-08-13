<b>GETSEC[WAKEUP]</b> — Wake up sleeping processors in measured environment
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>0F 37 (EAX=8)</td>
		<td>GETSEC[WAKEUP]</td>
		<td>Wake up the responding logical processors from the SENTER sleep state.</td>
	</tr>
</table>


### Description
The GETSEC[WAKEUP] leaf function broadcasts a wake-up message to all logical processors currently in the
SENTER sleep state. This GETSEC leaf must be executed only by the ILP, in order to wake-up the RLPs. Responding
logical processors (RLPs) enter the SENTER sleep state after completion of the SENTER rendezvous sequence.

The GETSEC[WAKEUP] instruction may only be executed:

 * In a measured environment as initiated by execution of GETSEC[SENTER].

 *  Outside of authenticated code execution mode.


 * Execution is not allowed unless the processor is in protected mode with CPL = 0 and EFLAGS.VM = 0.

 * In addition, the logical processor must be designated as the boot-strap processor as configured by setting
IA32_APIC_BASE.BSP = 1.

If these conditions are not met, attempts to execute GETSEC[WAKEUP] result in a general protection violation.

An RLP exits the SENTER sleep state and start execution in response to a WAKEUP signal initiated by ILP’s execution
of GETSEC[WAKEUP]. The RLP retrieves a pointer to a data structure that contains information to enable execution
from a defined entry point. This data structure is located using a physical address held in the Intel® TXT-capable
chipset configuration register LT.MLE.JOIN. The register is publicly writable in the chipset by all processors and is
not restricted by the Intel® TXT-capable chipset configuration register lock status. The format of this data structure
is defined in Table 6-12.

Table 6-12.  RLP MVMM JOIN Data Structure
<table>
	<tr>
		<td><b>Offset</b></td>
		<td><b>Field</b></td>
	</tr>
	<tr>
		<td>0 4 8 12</td>
		<td>GDT limit GDT base pointer Segment selector initializer EIP</td>
	</tr>
</table>

The MLE JOIN data structure contains the information necessary to initialize RLP processor state and permit the
processor to join the measured environment. The GDTR, LIP, and CS, DS, SS, and ES selector values are initialized
using this data structure. The CS selector index is derived directly from the segment selector initializer field; DS,
SS, and ES selectors are initialized to CS+8. The segment descriptor fields are initialized implicitly with BASE = 0,
LIMIT = FFFFFH, G = 1, D = 1, P = 1, S = 1; read/write/access for DS, SS, and ES; and execute/read/access for
CS. It is the responsibility of external software to establish a GDT pointed to by the MLE JOIN data structure that
contains descriptor entries consistent with the implicit settings initialized by the processor (see Table 6-6). Certain
states from the content of Table 6-12 are checked for consistency by the processor prior to execution. A failure of
any consistency check results in the RLP aborting entry into the protected environment and signaling an Intel® TXT
shutdown condition. The specific checks performed are documented later in this section. After successful comple-
tion of processor consistency checks and subsequent initialization, RLP execution in the measured environment
begins from the entry point at offset 12 (as indicated in Table 6-12).

### Operation

```java
(* The state of the internal flag ACMODEFLAG and SENTERFLAG persist across instruction boundary *)
IF (CR4.SMXE=0)
    THEN #UD;
ELSE IF (in VMX non-root operation)
    THEN VM Exit (reason=”GETSEC instruction”);
ELSE IF (GETSEC leaf unsupported)
    THEN #UD;
ELSE IF ((CR0.PE=0) or (CPL>0) or (EFLAGS.VM=1) or (SENTERFLAG=0) or (ACMODEFLAG=1) or (IN_SMM=0) or (in VMX operation) or 
(IA32_APIC_BASE.BSP=0) or (TXT chipset not present))
    THEN #GP(0);
ELSE
    SignalTXTMsg(WAKEUP);
END;
```
#### RLP_SIPI_WAKEUP_FROM_SENTER_ROUTINE: (RLP only)
```java
WHILE (no SignalWAKEUP event);
IF (IA32_SMM_MONITOR_CTL[0] ≠ ILP.IA32_SMM_MONITOR_CTL[0])
    THEN TXT-SHUTDOWN(#IllegalEvent)
IF (IA32_SMM_MONITOR_CTL[0] = 0)
    THEN Unmask SMI pin event;
ELSE
    Mask SMI pin event;
Mask A20M, and NMI external pin events (unmask INIT);
Mask SignalWAKEUP event;
Invalidate processor TLB(s);
Drain outgoing transactions;
TempGDTRLIMIT← LOAD(LT.MLE.JOIN);
TempGDTRBASE← LOAD(LT.MLE.JOIN+4);
TempSegSel← LOAD(LT.MLE.JOIN+8);
TempEIP← LOAD(LT.MLE.JOIN+12);
IF (TempGDTLimit & FFFF0000h)
    THEN TXT-SHUTDOWN(#BadJOINFormat);
IF ((TempSegSel > TempGDTRLIMIT-15) or (TempSegSel < 8))
    THEN TXT-SHUTDOWN(#BadJOINFormat);
IF ((TempSegSel.TI=1) or (TempSegSel.RPL≠0))
    THEN TXT-SHUTDOWN(#BadJOINFormat);
CR0.[PG,CD,NW,AM,WP]← 0;
CR0.[NE,PE]← 1;
CR4← 00004000h;
EFLAGS← 00000002h;
IA32_EFER← 0;
GDTR.BASE← TempGDTRBASE;
GDTR.LIMIT← TempGDTRLIMIT;
CS.SEL← TempSegSel;
CS.BASE← 0;
CS.LIMIT← FFFFFh;
CS.G← 1;
CS.D← 1;
CS.AR← 9Bh;
DS.SEL← TempSegSel+8;
DS.BASE← 0;
DS.LIMIT← FFFFFh;
DS.G← 1;
DS.D← 1;
DS.AR← 93h;
SS← DS;
ES← DS;
DR7← 00000400h;
IA32_DEBUGCTL← 0;
EIP← TempEIP;
END;
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
If GETSEC[WAKEUP] is not reported as supported by GETSEC[CAPABILITIES].
<p>#GP(0)
If CR0.PE = 0 or CPL > 0 or EFLAGS.VM = 1.
If in VMX operation.
If a protected partition is not already active or the processor is currently in authenticated code
mode.
If the processor is in SMM.
<p>#UD
If CR4.SMXE = 0.
If GETSEC[WAKEUP] is not reported as supported by GETSEC[CAPABILITIES].
<p>#GP(0)
GETSEC[WAKEUP] is not recognized in real-address mode.

### Virtual-8086 Mode Exceptions

<p>#UD
If CR4.SMXE = 0.
If GETSEC[WAKEUP] is not reported as supported by GETSEC[CAPABILITIES].
<p>#GP(0)
GETSEC[WAKEUP] is not recognized in virtual-8086 mode.

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