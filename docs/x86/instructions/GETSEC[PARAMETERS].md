<b>GETSEC[PARAMETERS]</b> — Report the SMX Parameters
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>0F 37 (EAX=6)</td>
		<td>GETSEC[PARAMETERS]</td>
		<td>Report the SMX parameters. The parameters index is input in EBX with the result returned in EAX, EBX, and ECX.</td>
	</tr>
</table>


### Description
The GETSEC[PARAMETERS] instruction returns specific parameter information for SMX features supported by the
processor. Parameter information is returned in EAX, EBX, and ECX, with the input parameter selected using EBX.

Software retrieves parameter information by searching with an input index for EBX starting at 0, and then reading
the returned results in EAX, EBX, and ECX. EAX[4:0] is designated to return a parameter type field indicating if a
parameter is available and what type it is. If EAX[4:0] is returned with 0, this designates a null parameter and indi-
cates no more parameters are available.

Table 6-7 defines the parameter types supported in current and future implementations.

Table 6-7.  SMX Reporting Parameters Format
<table>
	<tr>
		<td><b>Parameter Type EAX[4:0]</b></td>
		<td><b>Parameter Description</b></td>
		<td><b>EAX[31:5]</b></td>
		<td><b>EBX[31:0]</b></td>
		<td><b>ECX[31:0]</b></td>
	</tr>
	<tr>
		<td>0</td>
		<td>NULL</td>
		<td>Reserved (0 returned)</td>
		<td>Reserved (unmodified)</td>
		<td>Reserved (unmodified)</td>
	</tr>
	<tr>
		<td>1</td>
		<td>Supported AC module versions</td>
		<td>Reserved (0 returned)</td>
		<td>Version comparison mask</td>
		<td>Version numbers supported</td>
	</tr>
	<tr>
		<td>2</td>
		<td>Max size of authenticated code execution area</td>
		<td>Multiply by 32 for size in bytes</td>
		<td>Reserved (unmodified)</td>
		<td>Reserved (unmodified)</td>
	</tr>
	<tr>
		<td>3</td>
		<td>External memory types supported during AC mode</td>
		<td>Memory type bit mask</td>
		<td>Reserved (unmodified)</td>
		<td>Reserved (unmodified)</td>
	</tr>
	<tr>
		<td>4</td>
		<td>Selective SENTER functionality control</td>
		<td>EAX[14:8] correspond to available SENTER function disable controls</td>
		<td>Reserved (unmodified)</td>
		<td>Reserved (unmodified)</td>
	</tr>
	<tr>
		<td>5</td>
		<td>TXT extensions support</td>
		<td>TXT Feature Extensions Flags (see Table 6-8)</td>
		<td>Reserved</td>
		<td>Reserved</td>
	</tr>
	<tr>
		<td>6-31</td>
		<td>Undefined</td>
		<td>Reserved (unmodified)</td>
		<td>Reserved (unmodified)</td>
		<td>Reserved (unmodified)</td>
	</tr>
</table>

Table 6-8.  TXT Feature Extensions Flags
<table>
	<tr>
		<td><b>Bit</b></td>
		<td><b>Definition</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>5</td>
		<td>Processor based S-CRTM support</td>
		<td>Returns 1 if this processor implements a processor-rooted S-CRTM capability and 0 if not (S- CRTM is rooted in BIOS). This flag cannot be used to infer whether the chipset supports TXT or whether the processor support SMX.</td>
	</tr>
	<tr>
		<td>6</td>
		<td>Machine Check Handling</td>
		<td>Returns 1 if it machine check status registers can be preserved through ENTERACCS and SENTER. If this bit is 1, the caller of ENTERACCS and SENTER is not required to clear machine check error status bits before invoking these GETSEC leaves. If this bit returns 0, the caller of ENTERACCS and SENTER must clear all machine check error status bits before invoking these GETSEC leaves.</td>
	</tr>
	<tr>
		<td>31:7</td>
		<td>Reserved</td>
		<td>Reserved for future use. Will return 0.</td>
	</tr>
</table>

Supported AC module versions (as defined by the AC module HeaderVersion field) can be determined for a partic-
ular SMX capable processor by the type 1 parameter. Using EBX to index through the available parameters reported
by GETSEC[PARAMETERS] for each unique parameter set returned for type 1, software can determine the complete
list of AC module version(s) supported.

For each parameter set, EBX returns the comparison mask and ECX returns the available HeaderVersion field
values supported, after AND'ing the target HeaderVersion with the comparison mask. Software can then determine
if a particular AC module version is supported by following the pseudo-code search routine given below:

parameter_search_index= 0
do {
EBX= parameter_search_index++
EAX= 6
GETSEC
if (EAX[4:0] = 1) {
if ((version_query & EBX) = ECX) {
version_is_supported= 1
break
}
}
} while (EAX[4:0] ≠ 0)

If only AC modules with a HeaderVersion of 0 are supported by the processor, then only one parameter set of type
1 will be returned, as follows: EAX = 00000001H,

EBX = FFFFFFFFH and ECX = 00000000H.

The maximum capacity for an authenticated code execution area supported by the processor is reported with the
parameter type of 2. The maximum supported size in bytes is determined by multiplying the returned size in
EAX[31:5] by 32. Thus, for a maximum supported authenticated RAM size of 32KBytes, EAX returns with
00008002H.

Supportable memory types for memory mapped outside of the authenticated code execution area are reported
with the parameter type of 3. While is active, as initiated by the GETSEC functions SENTER and ENTERACCS and
terminated by EXITAC, there are restrictions on what memory types are allowed for the rest of system memory. It
is the responsibility of the system software to initialize the memory type range register (MTRR) MSRs and/or the
page attribute table (PAT) to only map memory types consistent with the reporting of this parameter. The reporting
of supportable memory types of external memory is indicated using a bit map returned in EAX[31:8]. These bit
positions correspond to the memory type encodings defined for the MTRR MSR and PAT programming. See
Table 6-9.

The parameter type of 4 is used for enumerating the availability of selective GETSEC[SENTER] function disable
controls. If a 1 is reported in bits 14:8 of the returned parameter EAX, then this indicates a disable control capa-
bility exists with SENTER for a particular function. The enumerated field in bits 14:8 corresponds to use of the EDX
input parameter bits 6:0 for SENTER. If an enumerated field bit is set to 1, then the corresponding EDX input
parameter bit of EDX may be set to 1 to disable that designated function. If the enumerated field bit is 0 or this
parameter is not reported, then no disable capability exists with the corresponding EDX input parameter for
SENTER, and EDX bit(s) must be cleared to 0 to enable execution of SENTER. If no selective disable capability for
SENTER exists as enumerated, then the corresponding bits in the IA32_FEATURE_CONTROL MSR bits 14:8 must
also be programmed to 1 if the SENTER global enable bit 15 of the MSR is set. This is required to enable future
extensibility of SENTER selective disable capability with respect to potentially separate software initialization of the
MSR.

Table 6-9.  External Memory Types Using Parameter 3
<table>
	<tr>
		<td><b>EAX Bit Position</b></td>
		<td><b>Parameter Description</b></td>
	</tr>
	<tr>
		<td>8 9 11:10 12 13 14 31:15</td>
		<td>Uncacheable (UC) Write Combining (WC) Reserved Write-through (WT) Write-protected (WP) Write-back (WB) Reserved</td>
	</tr>
</table>

default parameter values should be assumed. These are defined in Table 6-10.

Table 6-10.  Default Parameter Values
<table>
	<tr>
		<td><b>Parameter Type EAX[4:0]</b></td>
		<td><b>Default Setting</b></td>
		<td><b>Parameter Description</b></td>
	</tr>
	<tr>
		<td>1 2 3 4</td>
		<td>0.0 only 32 KBytes UC only None</td>
		<td>Supported AC module versions. Authenticated code execution area size. External memory types supported during AC execution mode. Available SENTER selective disable controls.</td>
	</tr>
</table>


### Operation

```java
(* example of a processor supporting only a 0.0 HeaderVersion, 32K ACRAM size, memory types UC and WC *)
IF (CR4.SMXE=0)
    THEN #UD;
ELSE IF (in VMX non-root operation)
    THEN VM Exit (reason=”GETSEC instruction”);
ELSE IF (GETSEC leaf unsupported)
    THEN #UD;
    (* example of a processor supporting a 0.0 HeaderVersion *)
IF (EBX=0) THEN
    EAX← 00000001h;
    EBX← FFFFFFFFh;
    ECX← 00000000h;
ELSE IF (EBX=1)
    (* example of a processor supporting a 32K ACRAM size *)
    THEN EAX← 00008002h;
ESE IF (EBX= 2)
    (* example of a processor supporting external memory types of UC and WC *)
    THEN EAX← 00000303h;
ESE IF (EBX= other value(s) less than unsupported index value)
    (* EAX value varies. Consult Table 6-7 and Table 6-8*)
ELSE (* unsupported index*)
    EAX¨ 00000000h;
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
If GETSEC[PARAMETERS] is not reported as supported by GETSEC[CAPABILITIES].

### Real-Address Mode Exceptions

<p>#UD
If CR4.SMXE = 0.
If GETSEC[PARAMETERS] is not reported as supported by GETSEC[CAPABILITIES].

### Virtual-8086 Mode Exceptions

<p>#UD
If CR4.SMXE = 0.
If GETSEC[PARAMETERS] is not reported as supported by GETSEC[CAPABILITIES].

### Compatibility Mode Exceptions

All protected mode exceptions apply.

### 64-Bit Mode Exceptions

All protected mode exceptions apply.

VM-Exit Condition
Reason (GETSEC)
IF in VMX non-root operation.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
