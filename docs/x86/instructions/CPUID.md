<b>CPUID</b> — CPU Identification
<table>
	<tr>
		<td><b>Opcode</b></td>
		<td><b>Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64-Bit Mode</b></td>
		<td><b>Compat/ Leg Mode</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>0F A2</td>
		<td>CPUID</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Returns processor identification and feature information to the EAX, EBX, ECX, and EDX registers, as determined by input entered in EAX (in some cases, ECX as well).</td>
	</tr>
</table>


### Instruction Operand Encoding
<table>
	<tr>
		<td><b>Op/En</b></td>
		<td><b>Operand 1</b></td>
		<td><b>Operand 2</b></td>
		<td><b>Operand 3</b></td>
		<td><b>Operand 4</b></td>
	</tr>
	<tr>
		<td>ZO</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
The ID flag (bit 21) in the EFLAGS register indicates support for the CPUID instruction. If a software procedure can
set and clear this flag, the processor executing the procedure supports the CPUID instruction. This instruction
operates the same in non-64-bit modes and 64-bit mode.
CPUID returns processor identification and feature information in the EAX, EBX, ECX, and EDX registers.1 The
instruction’s output is dependent on the contents of the EAX register upon execution (in some cases, ECX as well).
For example, the following pseudocode loads EAX with 00H and causes CPUID to return a Maximum Return Value
and the Vendor Identification String in the appropriate registers:

MOV EAX, 00H
CPUID
Table 3-8 shows information returned, depending on the initial value loaded into the EAX register.

Two types of information are returned: basic and extended function information. If a value entered for CPUID.EAX
is higher than the maximum input value for basic or extended function for that processor then the data for the
highest basic information leaf is returned. For example, using the Intel Core i7 processor, the following is true:

CPUID.EAX = 05H (\* Returns MONITOR/MWAIT leaf. \*)
CPUID.EAX = 0AH (\* Returns Architectural Performance Monitoring leaf. \*)
CPUID.EAX = 0BH (\* Returns Extended Topology Enumeration leaf. \*)
CPUID.EAX = 0CH (\* INVALID: Returns the same information as CPUID.EAX = 0BH. \*)
CPUID.EAX = 80000008H (\* Returns linear/physical address size data. \*)
CPUID.EAX = 8000000AH (\* INVALID: Returns same information as CPUID.EAX = 0BH. \*)
If a value entered for CPUID.EAX is less than or equal to the maximum input value and the leaf is not supported on
that processor then 0 is returned in all the registers.

When CPUID returns the highest basic leaf information as a result of an invalid input EAX value, any dependence
on input ECX value in the basic leaf is honored.

CPUID can be executed at any privilege level to serialize instruction execution. Serializing instruction execution
guarantees that any modifications to flags, registers, and memory for previous instructions are completed before
the next instruction is fetched and executed.

See also:

“Serializing Instructions” in Chapter 8, “Multiple-Processor Management,” in the Intel® 64 and IA-32 Architectures
Software Developer’s Manual, Volume 3A.

“Caching Translation Information” in Chapter 4, “Paging,” in the Intel® 64 and IA-32 Architectures Software Devel-
oper’s Manual, Volume 3A.

1. On Intel 64 processors, CPUID clears the high 32 bits of the RAX/RBX/RCX/RDX registers in all modes.
Table 3-8.  Information Returned by CPUID Instruction
<table>
	<tr>
		<td><b>Initial EAX Value</b></td>
		<td><b>Information Provided about the Processor</b></td>
	</tr>
	<tr>
		<td colspan=2>Basic CPUID Information</td>
	</tr>
	<tr>
		<td>0H</td>
		<td>EAX EBX ECX EDX Maximum Input Value for Basic CPUID Information. “Genu” “ntel” “ineI”</td>
	</tr>
	<tr>
		<td>01H</td>
		<td>ECX EDX EAX EBX Version Information: Type, Family, Model, and Stepping ID (see Figure 3-6). Bits 07 - 00: Brand Index. Bits 15 - 08: CLFLUSH line size (Value ∗ 8 = cache line size in bytes; used also by CLFLUSHOPT). Bits 23 - 16: Maximum number of addressable IDs for logical processors in this physical package*. Bits 31 - 24: Initial APIC ID. Feature Information (see Figure 3-7 and Table 3-10). Feature Information (see Figure 3-8 and Table 3-11). NOTES: * The nearest power-of-2 integer that is not smaller than EBX[23:16] is the number of unique initial APIC IDs reserved for addressing different logical processors in a physical package. This field is only valid if CPUID.1.EDX.HTT[bit 28]= 1.</td>
	</tr>
	<tr>
		<td>02H</td>
		<td>EAX EBX ECX EDX Cache and TLB Information (see Table 3-12). Cache and TLB Information. Cache and TLB Information. Cache and TLB Information.</td>
	</tr>
	<tr>
		<td>03H</td>
		<td>EAX EBX ECX EDX Reserved. Reserved. Bits 00 - 31 of 96 bit processor serial number. (Available in Pentium III processor only; otherwise, the value in this register is reserved.) Bits 32 - 63 of 96 bit processor serial number. (Available in Pentium III processor only; otherwise, the value in this register is reserved.) NOTES: Processor serial number (PSN) is not supported in the Pentium 4 processor or later. On all models, use the PSN flag (returned using CPUID) to check for PSN support before accessing the feature.</td>
	</tr>
	<tr>
		<td colspan=2>CPUID leaves above 2 and below 80000000H are visible only when IA32_MISC_ENABLE[bit 22] has its default value of 0.</td>
	</tr>
	<tr>
		<td colspan=2>Deterministic Cache Parameters Leaf</td>
	</tr>
	<tr>
		<td>04H</td>
		<td>NOTES: Leaf 04H output depends on the initial value in ECX.* See also: “INPUT EAX = 04H: Returns Deterministic Cache Parameters for Each Level” on page 216. EAX Bits 04 - 00: Cache Type Field. 0 = Null - No more caches. 1 = Data Cache. 2 = Instruction Cache. 3 = Unified Cache. 4-31 = Reserved.</td>
	</tr>
</table>

Table 3-8.  Information Returned by CPUID Instruction (Contd.)
<table>
	<tr>
		<td><b>Initial EAX Value</b></td>
		<td><b>Information Provided about the Processor</b></td>
	</tr>
	<tr>
		<td></td>
		<td>EBX ECX EDX Bits 07 - 05: Cache Level (starts at 1). Bit 08: Self Initializing cache level (does not need SW initialization). Bit 09: Fully Associative cache. Bits 13 - 10: Reserved. Bits 25 - 14: Maximum number of addressable IDs for logical processors sharing this cache**, ***. Bits 31 - 26: Maximum number of addressable IDs for processor cores in the physical package**, ****, *****. Bits 11 - 00: L = System Coherency Line Size**. Bits 21 - 12: P = Physical Line partitions**. Bits 31 - 22: W = Ways of associativity**. Bits 31-00: S = Number of Sets**. Bit 00: Write-Back Invalidate/Invalidate. 0 = WBINVD/INVD from threads sharing this cache acts upon lower level caches for threads sharing this cache. 1 = WBINVD/INVD is not guaranteed to act upon lower level caches of non-originating threads sharing this cache. Bit 01: Cache Inclusiveness. 0 = Cache is not inclusive of lower cache levels. 1 = Cache is inclusive of lower cache levels. Bit 02: Complex Cache Indexing. 0 = Direct mapped cache. 1 = A complex function is used to index the cache, potentially using all address bits. Bits 31 - 03: Reserved = 0. NOTES: * If ECX contains an invalid sub leaf index, EAX/EBX/ECX/EDX return 0. Sub-leaf index n+1 is invalid if sub- leaf n returns EAX[4:0] as 0. ** Add one to the return value to get the result. ***The nearest power-of-2 integer that is not smaller than (1 + EAX[25:14]) is the number of unique ini- tial APIC IDs reserved for addressing different logical processors sharing this cache. **** The nearest power-of-2 integer that is not smaller than (1 + EAX[31:26]) is the number of unique Core_IDs reserved for addressing different processor cores in a physical package. Core ID is a subset of bits of the initial APIC ID. ***** The returned value is constant for valid initial values in ECX. Valid ECX values start from 0.</td>
	</tr>
	<tr>
		<td></td>
		<td>MONITOR/MWAIT Leaf</td>
	</tr>
	<tr>
		<td>05H</td>
		<td>EAX EBX ECX Bits 15 - 00: Smallest monitor-line size in bytes (default is processor's monitor granularity). Bits 31 - 16: Reserved = 0. Bits 15 - 00: Largest monitor-line size in bytes (default is processor's monitor granularity). Bits 31 - 16: Reserved = 0. Bit 00: Enumeration of Monitor-Mwait extensions (beyond EAX and EBX registers) supported. Bit 01: Supports treating interrupts as break-event for MWAIT, even when interrupts disabled. Bits 31 - 02: Reserved.</td>
	</tr>
</table>

Table 3-8.  Information Returned by CPUID Instruction (Contd.)
<table>
	<tr>
		<td><b>Initial EAX Value</b></td>
		<td><b>Information Provided about the Processor</b></td>
	</tr>
	<tr>
		<td></td>
		<td>EDX Bits 03 - 00: Number of C0* sub C-states supported using MWAIT. Bits 07 - 04: Number of C1* sub C-states supported using MWAIT. Bits 11 - 08: Number of C2* sub C-states supported using MWAIT. Bits 15 - 12: Number of C3* sub C-states supported using MWAIT. Bits 19 - 16: Number of C4* sub C-states supported using MWAIT. Bits 23 - 20: Number of C5* sub C-states supported using MWAIT. Bits 27 - 24: Number of C6* sub C-states supported using MWAIT. Bits 31 - 28: Number of C7* sub C-states supported using MWAIT. NOTE: *  The definition of C0 through C7 states for MWAIT extension are processor-specific C-states, not ACPI C- states.</td>
	</tr>
	<tr>
		<td colspan=2>Thermal and Power Management Leaf</td>
	</tr>
	<tr>
		<td>06H</td>
		<td>EAX Bit 00: Digital temperature sensor is supported if set. Bit 01: Intel Turbo Boost Technology available (see description of IA32_MISC_ENABLE[38]). Bit 02: ARAT. APIC-Timer-always-running feature is supported if set. Bit 03: Reserved. Bit 04: PLN. Power limit notification controls are supported if set. Bit 05: ECMD. Clock modulation duty cycle extension is supported if set. Bit 06: PTM. Package thermal management is supported if set. Bit 07: HWP. HWP base registers (IA32_PM_ENABLE[bit 0], IA32_HWP_CAPABILITIES, IA32_HWP_REQUEST, IA32_HWP_STATUS) are supported if set. Bit 08: HWP_Notification. IA32_HWP_INTERRUPT MSR is supported if set. Bit 09: HWP_Activity_Window. IA32_HWP_REQUEST[bits 41:32] is supported if set. Bit 10: HWP_Energy_Performance_Preference. IA32_HWP_REQUEST[bits 31:24] is supported if set. Bit 11: HWP_Package_Level_Request. IA32_HWP_REQUEST_PKG MSR is supported if set. Bit 12: Reserved. Bit 13: HDC. HDC base registers IA32_PKG_HDC_CTL, IA32_PM_CTL1, IA32_THREAD_STALL MSRs are supported if set. Bit 14: Intel® Turbo Boost Max Technology 3.0 available. Bit 15: HWP Capabilities. Highest Performance change is supported if set. Bit 16: HWP PECI override is supported if set. Bit 17: Flexible HWP is supported if set. Bit 18: Fast access mode for the IA32_HWP_REQUEST MSR is supported if set. Bit 19: Reserved. Bit 20: Ignoring Idle Logical Processor HWP request is supported if set. Bits 31 - 21: Reserved. Bits 03 - 00: Number of Interrupt Thresholds in Digital Thermal Sensor. Bits 31 - 04: Reserved. Bit 00: Hardware Coordination Feedback Capability (Presence of IA32_MPERF and IA32_APERF). The capability to provide a measure of delivered processor performance (since last reset of the counters), as a percentage of the expected processor performance when running at the TSC frequency. Bits 02 - 01: Reserved = 0. Bit 03: The processor supports performance-energy bias preference if CPUID.06H:ECX.SETBH[bit 3] is set and it also implies the presence of a new architectural MSR called IA32_ENERGY_PERF_BIAS (1B0H). Bits 31 - 04: Reserved = 0. Reserved = 0. EBX ECX EDX</td>
	</tr>
</table>

Table 3-8.  Information Returned by CPUID Instruction (Contd.)
<table>
	<tr>
		<td><b>Initial EAX Value</b></td>
		<td><b>Information Provided about the Processor</b></td>
	</tr>
	<tr>
		<td colspan=2>Structured Extended Feature Flags Enumeration Leaf (Output depends on ECX input value)</td>
	</tr>
	<tr>
		<td colspan=2>07H Sub-leaf 0 (Input ECX = 0). * EAX EBX ECX Bits 31 - 00: Reports the maximum input value for supported leaf 7 sub-leaves. Bit 00: FSGSBASE. Supports RDFSBASE/RDGSBASE/WRFSBASE/WRGSBASE if 1. Bit 01: IA32_TSC_ADJUST MSR is supported if 1. Bit 02: SGX. Supports Intel® Software Guard Extensions (Intel® SGX Extensions) if 1. Bit 03: BMI1. Bit 04: HLE. Bit 05: AVX2. Bit 06: FDP_EXCPTN_ONLY. x87 FPU Data Pointer updated only on x87 exceptions if 1. Bit 07: SMEP. Supports Supervisor-Mode Execution Prevention if 1. Bit 08: BMI2. Bit 09: Supports Enhanced REP MOVSB/STOSB if 1. Bit 10: INVPCID. If 1, supports INVPCID instruction for system software that manages process-context identifiers. Bit 11: RTM. Bit 12: RDT-M. Supports Intel® Resource Director Technology (Intel® RDT) Monitoring capability if 1. Bit 13: Deprecates FPU CS and FPU DS values if 1. Bit 14: MPX. Supports Intel® Memory Protection Extensions if 1. Bit 15: RDT-A. Supports Intel® Resource Director Technology (Intel® RDT) Allocation capability if 1. Bit 16: AVX512F. Bit 17: AVX512DQ. Bit 18: RDSEED. Bit 19: ADX. Bit 20: SMAP. Supports Supervisor-Mode Access Prevention (and the CLAC/STAC instructions) if 1. Bit 21: AVX512_IFMA. Bit 22: Reserved. Bit 23: CLFLUSHOPT. Bit 24: CLWB. Bit 25: Intel Processor Trace. Bit 26: AVX512PF. (Intel® Xeon Phi™ only.) Bit 27: AVX512ER. (Intel® Xeon Phi™ only.) Bit 28: AVX512CD. Bit 29: SHA. supports Intel® Secure Hash Algorithm Extensions (Intel® SHA Extensions) if 1. Bit 30: AVX512BW. Bit 31: AVX512VL. Bit 00: PREFETCHWT1. (Intel® Xeon Phi™ only.) Bit 01: AVX512_VBMI. Bit 02: UMIP. Supports user-mode instruction prevention if 1. Bit 03: PKU. Supports protection keys for user-mode pages if 1. Bit 04: OSPKE. If 1, OS has set CR4.PKE to enable protection keys (and the RDPKRU/WRPKRU instruc- tions). Bits 16 - 5: Reserved. Bits 21 - 17: The value of MAWAU used by the BNDLDX and BNDSTX instructions in 64-bit mode. Bit 22: RDPID and IA32_TSC_AUX are available if 1. Bits 29 - 23: Reserved. Bit 30: SGX_LC. Supports SGX Launch Configuration if 1. Bit 31: Reserved.</td>
	</tr>
</table>

Table 3-8.  Information Returned by CPUID Instruction (Contd.)
<table>
	<tr>
		<td><b>Initial EAX Value</b></td>
		<td><b>Information Provided about the Processor</b></td>
	</tr>
	<tr>
		<td></td>
		<td>EDX Reserved. NOTE: * If ECX contains an invalid sub-leaf index, EAX/EBX/ECX/EDX return 0. Sub-leaf index n is invalid if n exceeds the value that sub-leaf 0 returns in EAX.</td>
	</tr>
	<tr>
		<td colspan=2>Direct Cache Access Information Leaf</td>
	</tr>
	<tr>
		<td>09H</td>
		<td>Value of bits [31:0] of IA32_PLATFORM_DCA_CAP MSR (address 1F8H). Reserved. Reserved. Reserved. EAX EBX ECX EDX</td>
	</tr>
	<tr>
		<td colspan=2>Architectural Performance Monitoring Leaf</td>
	</tr>
	<tr>
		<td colspan=2>0AH EAX EBX Bits 07 - 00: Version ID of architectural performance monitoring. Bits 15 - 08: Number of general-purpose performance monitoring counter per logical processor. Bits 23 - 16: Bit width of general-purpose, performance monitoring counter. Bits 31 - 24: Length of EBX bit vector to enumerate architectural performance monitoring events. Bit 00: Core cycle event not available if 1. Bit 01: Instruction retired event not available if 1. Bit 02: Reference cycles event not available if 1. Bit 03: Last-level cache reference event not available if 1. Bit 04: Last-level cache misses event not available if 1. Bit 05: Branch instruction retired event not available if 1. Bit 06: Branch mispredict retired event not available if 1. Bits 31 - 07: Reserved = 0. Reserved = 0. Bits 04 - 00: Number of fixed-function performance counters (if Version ID > 1). Bits 12 - 05: Bit width of fixed-function performance counters (if Version ID > 1). Bits 14 - 13: Reserved = 0. Bit 15: AnyThread deprecation. Bits 31 - 16: Reserved = 0. ECX EDX</td>
	</tr>
	<tr>
		<td colspan=2>Extended Topology Enumeration Leaf</td>
	</tr>
	<tr>
		<td>0BH</td>
		<td>NOTES: Most of Leaf 0BH output depends on the initial value in ECX. The EDX output of leaf 0BH is always valid and does not vary with input value in ECX. Output value in ECX[7:0] always equals input value in ECX[7:0]. Sub-leaf index 0 enumerates SMT level. Each subsequent higher sub-leaf index enumerates a higher- level topological entity in hierarchical order. For sub-leaves that return an invalid level-type of 0 in ECX[15:8]; EAX and EBX will return 0. If an input value n in ECX returns the invalid level-type of 0 in ECX[15:8], other input values with ECX > n also return 0 in ECX[15:8]. EAX EBX Bits 04 - 00: Number of bits to shift right on x2APIC ID to get a unique topology ID of the next level type*. All logical processors with the same next level ID share current level. Bits 31 - 05: Reserved. Bits 15 - 00: Number of logical processors at this level type. The number reflects configuration as shipped by Intel**. Bits 31- 16: Reserved.</td>
	</tr>
</table>

Table 3-8.  Information Returned by CPUID Instruction (Contd.)
<table>
	<tr>
		<td><b>Initial EAX Value</b></td>
		<td><b>Information Provided about the Processor</b></td>
	</tr>
	<tr>
		<td></td>
		<td>ECX EDX Bits 07 - 00: Level number. Same value in ECX input. Bits 15 - 08: Level type***. Bits 31 - 16: Reserved. Bits 31- 00: x2APIC ID the current logical processor. NOTES: * Software should use this field (EAX[4:0]) to enumerate processor topology of the system. ** Software must not use EBX[15:0] to enumerate processor topology of the system. This value in this field (EBX[15:0]) is only intended for display/diagnostic purposes. The actual number of logical processors available to BIOS/OS/Applications may be different from the value of EBX[15:0], depending on software and platform hardware configurations. *** The value of the “level type” field is not related to level numbers in any way, higher “level type” val- ues do not mean higher levels. Level type field has the following encoding: 0: Invalid. 1: SMT. 2: Core. 3-255: Reserved.</td>
	</tr>
	<tr>
		<td colspan=2>Processor Extended State Enumeration Main Leaf (EAX = 0DH, ECX = 0)</td>
	</tr>
	<tr>
		<td colspan=2>0DH NOTES: Leaf 0DH main leaf (ECX = 0). EAX EBX ECX EDX Bits 31 - 00: Reports the supported bits of the lower 32 bits of XCR0. XCR0[n] can be set to 1 only if EAX[n] is 1. Bit 00: x87 state. Bit 01: SSE state. Bit 02: AVX state. Bits 04 - 03: MPX state. Bits 07 - 05: AVX-512 state. Bit 08: Used for IA32_XSS. Bit 09: PKRU state. Bits 12 - 10: Reserved. Bit 13: Used for IA32_XSS. Bits 31 - 14: Reserved. Bits 31 - 00: Maximum size (bytes, from the beginning of the XSAVE/XRSTOR save area) required by enabled features in XCR0. May be different than ECX if some features at the end of the XSAVE save area are not enabled. Bit 31 - 00: Maximum size (bytes, from the beginning of the XSAVE/XRSTOR save area) of the XSAVE/XRSTOR save area required by all supported features in the processor, i.e., all the valid bit fields in XCR0. Bit 31 - 00: Reports the supported bits of the upper 32 bits of XCR0. XCR0[n+32] can be set to 1 only if EDX[n] is 1. Bits 31 - 00: Reserved.</td>
	</tr>
	<tr>
		<td colspan=2>Processor Extended State Enumeration Sub-leaf (EAX = 0DH, ECX = 1)</td>
	</tr>
	<tr>
		<td>0DH</td>
		<td>EAX Bit 00: XSAVEOPT is available. Bit 01: Supports XSAVEC and the compacted form of XRSTOR if set. Bit 02: Supports XGETBV with ECX = 1 if set. Bit 03: Supports XSAVES/XRSTORS and IA32_XSS if set. Bits 31 - 04: Reserved. Bits 31 - 00: The size in bytes of the XSAVE area containing all states enabled by XCRO | IA32_XSS. EBX</td>
	</tr>
</table>

Table 3-8.  Information Returned by CPUID Instruction (Contd.)
<table>
	<tr>
		<td><b>Initial EAX Value</b></td>
		<td><b>Information Provided about the Processor</b></td>
	</tr>
	<tr>
		<td></td>
		<td>ECX EDX Bits 31 - 00: Reports the supported bits of the lower 32 bits of the IA32_XSS MSR. IA32_XSS[n] can be set to 1 only if ECX[n] is 1. Bits 07 - 00: Used for XCR0. Bit 08: PT state. Bit 09: Used for XCR0. Bits 12 - 10: Reserved. Bit 13: HWP state. Bits 31 - 14: Reserved. Bits 31 - 00: Reports the supported bits of the upper 32 bits of the IA32_XSS MSR. IA32_XSS[n+32] can be set to 1 only if EDX[n] is 1. Bits 31 - 00: Reserved.</td>
	</tr>
	<tr>
		<td colspan=2>Processor Extended State Enumeration Sub-leaves (EAX = 0DH, ECX = n, n > 1)</td>
	</tr>
	<tr>
		<td colspan=2>0DH NOTES: Leaf 0DH output depends on the initial value in ECX. Each sub-leaf index (starting at position 2) is supported if it corresponds to a supported bit in either the XCR0 register or the IA32_XSS MSR. * If ECX contains an invalid sub-leaf index, EAX/EBX/ECX/EDX return 0. Sub-leaf n (0 ≤ n ≤ 31) is invalid if sub-leaf 0 returns 0 in EAX[n] and sub-leaf 1 returns 0 in ECX[n]. Sub-leaf n (32 ≤ n ≤ 63) is invalid if sub-leaf 0 returns 0 in EDX[n-32] and sub-leaf 1 returns 0 in EDX[n-32]. EAX EBX ECX Bits 31 - 0: The size in bytes (from the offset specified in EBX) of the save area for an extended state feature associated with a valid sub-leaf index, n. Bits 31 - 0: The offset in bytes of this extended state component’s save area from the beginning of the XSAVE/XRSTOR area. This field reports 0 if the sub-leaf index, n, does not map to a valid bit in the XCR0 register*. Bit 00 is set if the bit n (corresponding to the sub-leaf index) is supported in the IA32_XSS MSR; it is clear if bit n is instead supported in XCR0. Bit 01 is set if, when the compacted format of an XSAVE area is used, this extended state component located on the next 64-byte boundary following the preceding state component (otherwise, it is located immediately following the preceding state component). Bits 31 - 02 are reserved. This field reports 0 if the sub-leaf index, n, is invalid*. This field reports 0 if the sub-leaf index, n, is invalid*; otherwise it is reserved. EDX</td>
	</tr>
	<tr>
		<td colspan=2>Intel Resource Director Technology (Intel RDT) Monitoring Enumeration Sub-leaf (EAX = 0FH, ECX = 0)</td>
	</tr>
	<tr>
		<td>0FH</td>
		<td>NOTES: Leaf 0FH output depends on the initial value in ECX. Sub-leaf index 0 reports valid resource type starting at bit position 1 of EDX. EAX EBX ECX EDX Reserved. Bits 31 - 00: Maximum range (zero-based) of RMID within this physical processor of all types. Reserved. Bit 00: Reserved. Bit 01: Supports L3 Cache Intel RDT Monitoring if 1. Bits 31 - 02: Reserved.</td>
	</tr>
	<tr>
		<td colspan=2>L3 Cache Intel RDT Monitoring Capability Enumeration Sub-leaf (EAX = 0FH, ECX = 1)</td>
	</tr>
	<tr>
		<td>0FH</td>
		<td>NOTES: Leaf 0FH output depends on the initial value in ECX. EAX Reserved.</td>
	</tr>
</table>

Table 3-8.  Information Returned by CPUID Instruction (Contd.)
<table>
	<tr>
		<td><b>Initial EAX Value</b></td>
		<td><b>Information Provided about the Processor</b></td>
	</tr>
	<tr>
		<td></td>
		<td>EBX ECX EDX Bits 31 - 00: Conversion factor from reported IA32_QM_CTR value to occupancy metric (bytes). Maximum range (zero-based) of RMID of this resource type. Bit 00: Supports L3 occupancy monitoring if 1. Bit 01: Supports L3 Total Bandwidth monitoring if 1. Bit 02: Supports L3 Local Bandwidth monitoring if 1. Bits 31 - 03: Reserved.</td>
	</tr>
	<tr>
		<td colspan=2>Intel Resource Director Technology (Intel RDT) Allocation Enumeration Sub-leaf (EAX = 10H, ECX = 0)</td>
	</tr>
	<tr>
		<td>10H</td>
		<td>NOTES: Leaf 10H output depends on the initial value in ECX. Sub-leaf index 0 reports valid resource identification (ResID) starting at bit position 1 of EBX. EAX EBX Reserved. Bit 00: Reserved. Bit 01: Supports L3 Cache Allocation Technology if 1. Bit 02: Supports L2 Cache Allocation Technology if 1. Bit 03: Supports Memory Bandwidth Allocation if 1. Bits 31 - 04: Reserved. Reserved. Reserved. ECX EDX</td>
	</tr>
	<tr>
		<td colspan=2>L3 Cache Allocation Technology Enumeration Sub-leaf (EAX = 10H, ECX = ResID =1)</td>
	</tr>
	<tr>
		<td colspan=2>10H NOTES: Leaf 10H output depends on the initial value in ECX. EAX EBX ECX EDX Bits 04 - 00: Length of the capacity bit mask for the corresponding ResID using minus-one notation. Bits 31 - 05: Reserved. Bits 31 - 00: Bit-granular map of isolation/contention of allocation units. Bits 01- 00: Reserved. Bit 02: Code and Data Prioritization Technology supported if 1. Bits 31 - 03: Reserved. Bits 15 - 00: Highest COS number supported for this ResID. Bits 31 - 16: Reserved.</td>
	</tr>
	<tr>
		<td colspan=2>L2 Cache Allocation Technology Enumeration Sub-leaf (EAX = 10H, ECX = ResID =2)</td>
	</tr>
	<tr>
		<td colspan=2>10H NOTES: Leaf 10H output depends on the initial value in ECX. EAX EBX ECX EDX Bits 04 - 00: Length of the capacity bit mask for the corresponding ResID using minus-one notation. Bits 31 - 05: Reserved. Bits 31 - 00: Bit-granular map of isolation/contention of allocation units. Bits 31 - 00: Reserved. Bits 15 - 00: Highest COS number supported for this ResID. Bits 31 - 16: Reserved.</td>
	</tr>
	<tr>
		<td colspan=2>Memory Bandwidth Allocation Enumeration Sub-leaf (EAX = 10H, ECX = ResID =3)</td>
	</tr>
	<tr>
		<td>10H</td>
		<td>NOTES: Leaf 10H output depends on the initial value in ECX.</td>
	</tr>
</table>

Table 3-8.  Information Returned by CPUID Instruction (Contd.)
<table>
	<tr>
		<td><b>Initial EAX Value</b></td>
		<td><b>Information Provided about the Processor</b></td>
	</tr>
	<tr>
		<td colspan=2>EAX EBX ECX EDX Bits 11 - 00: Reports the maximum MBA throttling value supported for the corresponding ResID using minus-one notation. Bits 31 - 12: Reserved. Bits 31 - 00: Reserved. Bits 01 - 00: Reserved. Bit 02: Reports whether the response of the delay values is linear. Bits 31 - 03: Reserved. Bits 15 - 00: Highest COS number supported for this ResID. Bits 31 - 16: Reserved.</td>
	</tr>
	<tr>
		<td colspan=2>Intel SGX Capability Enumeration Leaf, sub-leaf 0 (EAX = 12H, ECX = 0)</td>
	</tr>
	<tr>
		<td>12H</td>
		<td>NOTES: EAX EBX ECX EDX Leaf 12H sub-leaf 0 (ECX = 0) is supported if CPUID.(EAX=07H, ECX=0H):EBX[SGX] = 1. Bit 00: SGX1. If 1, Indicates Intel SGX supports the collection of SGX1 leaf functions. Bit 01: SGX2. If 1, Indicates Intel SGX supports the collection of SGX2 leaf functions. Bits 04 - 02: Reserved. Bit 05: If 1, indicates Intel SGX supports ENCLV instruction leaves EINCVIRTCHILD, EDECVIRTCHILD, and ESETCONTEXT. Bit 06: If 1, indicates Intel SGX supports ENCLS instruction leaves ETRACKC, ERDINFO, ELDBC, and ELDUC. Bits 31 - 02: Reserved. Bits 31 - 00: MISCSELECT. Bit vector of supported extended SGX features. Bits 31 - 00: Reserved. Bits 07 - 00: MaxEnclaveSize_Not64. The maximum supported enclave size in non-64-bit mode is 2^(EDX[7:0]). Bits 15 - 08: MaxEnclaveSize_64. The maximum supported enclave size in 64-bit mode is 2^(EDX[15:8]). Bits 31 - 16: Reserved.</td>
	</tr>
	<tr>
		<td colspan=2>Intel SGX Attributes Enumeration Leaf, sub-leaf 1 (EAX = 12H, ECX = 1)</td>
	</tr>
	<tr>
		<td>12H</td>
		<td>NOTES: Leaf 12H sub-leaf 1 (ECX = 1) is supported if CPUID.(EAX=07H, ECX=0H):EBX[SGX] = 1. Bit 31 - 00: Reports the valid bits of SECS.ATTRIBUTES[31:0] that software can set with ECREATE. Bit 31 - 00: Reports the valid bits of SECS.ATTRIBUTES[63:32] that software can set with ECREATE. Bit 31 - 00: Reports the valid bits of SECS.ATTRIBUTES[95:64] that software can set with ECREATE. Bit 31 - 00: Reports the valid bits of SECS.ATTRIBUTES[127:96] that software can set with ECREATE. EAX EBX ECX EDX</td>
	</tr>
	<tr>
		<td colspan=2>Intel SGX EPC Enumeration Leaf, sub-leaves (EAX = 12H, ECX = 2 or higher)</td>
	</tr>
	<tr>
		<td>12H</td>
		<td>NOTES: Leaf 12H sub-leaf 2 or higher (ECX >= 2) is supported if CPUID.(EAX=07H, ECX=0H):EBX[SGX] = 1. For sub-leaves (ECX = 2 or higher), definition of EDX,ECX,EBX,EAX[31:4] depends on the sub-leaf type listed below. EAX Bit 03 - 00: Sub-leaf Type 0000b: Indicates this sub-leaf is invalid. 0001b: This sub-leaf enumerates an EPC section. EBX:EAX and EDX:ECX provide information on the Enclave Page Cache (EPC) section. All other type encodings are reserved. Type 0000b. This sub-leaf is invalid. EDX:ECX:EBX:EAX return 0.</td>
	</tr>
</table>

Table 3-8.  Information Returned by CPUID Instruction (Contd.)
<table>
	<tr>
		<td><b>Initial EAX Value</b></td>
		<td><b>Information Provided about the Processor</b></td>
	</tr>
	<tr>
		<td></td>
		<td>Type 0001b. This sub-leaf enumerates an EPC sections with EDX:ECX, EBX:EAX defined as follows. EAX[11:04]: Reserved (enumerate 0). EAX[31:12]: Bits 31:12 of the physical address of the base of the EPC section. EBX[19:00]: Bits 51:32 of the physical address of the base of the EPC section. EBX[31:20]: Reserved. ECX[03:00]: EPC section property encoding defined as follows: If EAX[3:0] 0000b, then all bits of the EDX:ECX pair are enumerated as 0. If EAX[3:0] 0001b, then this section has confidentiality and integrity protection. All other encodings are reserved. ECX[11:04]: Reserved (enumerate 0). ECX[31:12]: Bits 31:12 of the size of the corresponding EPC section within the Processor Reserved Memory. EDX[19:00]: Bits 51:32 of the size of the corresponding EPC section within the Processor Reserved Memory. EDX[31:20]: Reserved.</td>
	</tr>
	<tr>
		<td colspan=2>Intel Processor Trace Enumeration Main Leaf (EAX = 14H, ECX = 0)</td>
	</tr>
	<tr>
		<td>14H</td>
		<td>NOTES: Leaf 14H main leaf (ECX = 0). Bits 31 - 00: Reports the maximum sub-leaf supported in leaf 14H. Bit 00: If 1, indicates that IA32_RTIT_CTL.CR3Filter can be set to 1, and that IA32_RTIT_CR3_MATCH MSR can be accessed. Bit 01: If 1, indicates support of Configurable PSB and Cycle-Accurate Mode. Bit 02: If 1, indicates support of IP Filtering, TraceStop filtering, and preservation of Intel PT MSRs across warm reset. Bit 03: If 1, indicates support of MTC timing packet and suppression of COFI-based packets. Bit 04: If 1, indicates support of PTWRITE. Writes can set IA32_RTIT_CTL[12] (PTWEn) and IA32_RTIT_CTL[5] (FUPonPTW), and PTWRITE can generate packets. Bit 05: If 1, indicates support of Power Event Trace. Writes can set IA32_RTIT_CTL[4] (PwrEvtEn), enabling Power Event Trace packet generation. Bit 31 - 06: Reserved. Bit 00: If 1, Tracing can be enabled with IA32_RTIT_CTL.ToPA = 1, hence utilizing the ToPA output scheme; IA32_RTIT_OUTPUT_BASE and IA32_RTIT_OUTPUT_MASK_PTRS MSRs can be accessed. Bit 01: If 1, ToPA tables can hold any number of output entries, up to the maximum allowed by the Mas- kOrTableOffset field of IA32_RTIT_OUTPUT_MASK_PTRS. Bit 02: If 1, indicates support of Single-Range Output scheme. Bit 03: If 1, indicates support of output to Trace Transport subsystem. Bit 30 - 04: Reserved. Bit 31: If 1, generated packets which contain IP payloads have LIP values, which include the CS base com- ponent. Bits 31 - 00: Reserved. EAX EBX ECX EDX</td>
	</tr>
	<tr>
		<td colspan=2>Intel Processor Trace Enumeration Sub-leaf (EAX = 14H, ECX = 1)</td>
	</tr>
	<tr>
		<td>14H</td>
		<td>EBX ECX EAX Bits 02 - 00: Number of configurable Address Ranges for filtering. Bits 15 - 03: Reserved. Bits 31 - 16: Bitmap of supported MTC period encodings. Bits 15 - 00: Bitmap of supported Cycle Threshold value encodings. Bit 31 - 16: Bitmap of supported Configurable PSB frequency encodings. Bits 31 - 00: Reserved.</td>
	</tr>
</table>

Table 3-8.  Information Returned by CPUID Instruction (Contd.)
<table>
	<tr>
		<td><b>Initial EAX Value</b></td>
		<td><b>Information Provided about the Processor</b></td>
	</tr>
	<tr>
		<td></td>
		<td>Bits 31 - 00: Reserved. EDX</td>
	</tr>
	<tr>
		<td colspan=2>Time Stamp Counter and Nominal Core Crystal Clock Information Leaf</td>
	</tr>
	<tr>
		<td>15H</td>
		<td>NOTES: If EBX[31:0] is 0, the TSC/”core crystal clock” ratio is not enumerated. EBX[31:0]/EAX[31:0] indicates the ratio of the TSC frequency and the core crystal clock frequency. If ECX is 0, the nominal core crystal clock frequency is not enumerated. “TSC frequency” = “core crystal clock frequency” * EBX/EAX. The core crystal clock may differ from the reference clock, bus clock, or core clock frequencies. Bits 31 - 00: An unsigned integer which is the denominator of the TSC/”core crystal clock” ratio. EAX Bits 31 - 00: An unsigned integer which is the numerator of the TSC/”core crystal clock” ratio. EBX Bits 31 - 00: An unsigned integer which is the nominal frequency of the core crystal clock in Hz. ECX Bits 31 - 00: Reserved = 0. EDX</td>
	</tr>
	<tr>
		<td colspan=2>Processor Frequency Information Leaf</td>
	</tr>
	<tr>
		<td>16H</td>
		<td>EAX Bits 15 - 00: Processor Base Frequency (in MHz). Bits 31 - 16: Reserved =0. Bits 15 - 00: Maximum Frequency (in MHz). Bits 31 - 16: Reserved = 0. Bits 15 - 00: Bus (Reference) Frequency (in MHz). Bits 31 - 16: Reserved = 0. Reserved. NOTES: * Data is returned from this interface in accordance with the processor's specification and does not reflect actual values. Suitable use of this data includes the display of processor information in like manner to the processor brand string and for determining the appropriate range to use when displaying processor information e.g. frequency history graphs. The returned information should not be used for any other purpose as the returned information does not accurately correlate to information / counters returned by other processor interfaces. EBX ECX EDX While a processor may support the Processor Frequency Information leaf, fields that return a value of zero are not supported.</td>
	</tr>
	<tr>
		<td colspan=2>System-On-Chip Vendor Attribute Enumeration Main Leaf (EAX = 17H, ECX = 0)</td>
	</tr>
	<tr>
		<td>17H</td>
		<td>NOTES: Leaf 17H main leaf (ECX = 0). Leaf 17H output depends on the initial value in ECX. Leaf 17H sub-leaves 1 through 3 reports SOC Vendor Brand String. Leaf 17H is valid if MaxSOCID_Index >= 3. Leaf 17H sub-leaves 4 and above are reserved. EAX EBX ECX EDX Bits 31 - 00: MaxSOCID_Index. Reports the maximum input value of supported sub-leaf in leaf 17H. Bits 15 - 00: SOC Vendor ID. Bit 16: IsVendorScheme. If 1, the SOC Vendor ID field is assigned via an industry standard enumeration scheme. Otherwise, the SOC Vendor ID field is assigned by Intel. Bits 31 - 17: Reserved = 0. Bits 31 - 00: Project ID. A unique number an SOC vendor assigns to its SOC projects. Bits 31 - 00: Stepping ID. A unique number within an SOC project that an SOC vendor assigns.</td>
	</tr>
</table>

Table 3-8.  Information Returned by CPUID Instruction (Contd.)
<table>
	<tr>
		<td><b>Initial EAX Value</b></td>
		<td><b>Information Provided about the Processor</b></td>
	</tr>
	<tr>
		<td colspan=2>System-On-Chip Vendor Attribute Enumeration Sub-leaf (EAX = 17H, ECX = 1..3)</td>
	</tr>
	<tr>
		<td>17H</td>
		<td>EAX EBX ECX EDX Bit 31 - 00: SOC Vendor Brand String. UTF-8 encoded string. Bit 31 - 00: SOC Vendor Brand String. UTF-8 encoded string. Bit 31 - 00: SOC Vendor Brand String. UTF-8 encoded string. Bit 31 - 00: SOC Vendor Brand String. UTF-8 encoded string. NOTES: Leaf 17H output depends on the initial value in ECX. SOC Vendor Brand String is a UTF-8 encoded string padded with trailing bytes of 00H. The complete SOC Vendor Brand String is constructed by concatenating in ascending order of EAX:EBX:ECX:EDX and from the sub-leaf 1 fragment towards sub-leaf 3.</td>
	</tr>
	<tr>
		<td colspan=2>System-On-Chip Vendor Attribute Enumeration Sub-leaves (EAX = 17H, ECX > MaxSOCID_Index)</td>
	</tr>
	<tr>
		<td>17H</td>
		<td>NOTES: Leaf 17H output depends on the initial value in ECX. Bits 31 - 00: Reserved = 0. Bits 31 - 00: Reserved = 0. Bits 31 - 00: Reserved = 0. Bits 31 - 00: Reserved = 0. EAX EBX ECX EDX</td>
	</tr>
	<tr>
		<td colspan=2>Deterministic Address Translation Parameters Main Leaf (EAX = 18H, ECX = 0)</td>
	</tr>
	<tr>
		<td>18H</td>
		<td>NOTES: Each sub-leaf enumerates a different address translation structure. If ECX contains an invalid sub-leaf index, EAX/EBX/ECX/EDX return 0. Sub-leaf index n is invalid if n exceeds the value that sub-leaf 0 returns in EAX. A sub-leaf index is also invalid if EDX[4:0] returns 0. Valid sub-leaves do not need to be contiguous or in any particular order. A valid sub-leaf may be in a higher input ECX value than an invalid sub-leaf or than a valid sub-leaf of a higher or lower-level struc- ture. * Some unified TLBs will allow a single TLB entry to satisfy data read/write and instruction fetches. Others will require separate entries (e.g., one loaded on data read/write and another loaded on an instruction fetch) . Please see the Intel® 64 and IA-32 Architectures Optimization Reference Manual for details of a particular product. ** Add one to the return value to get the result. EAX EBX ECX Bits 31 - 00: Reports the maximum input value of supported sub-leaf in leaf 18H. Bit 00: 4K page size entries supported by this structure. Bit 01: 2MB page size entries supported by this structure. Bit 02: 4MB page size entries supported by this structure. Bit 03: 1 GB page size entries supported by this structure. Bits 07 - 04: Reserved. Bits 10 - 08: Partitioning (0: Soft partitioning between the logical processors sharing this structure). Bits 15 - 11: Reserved. Bits 31 - 16: W = Ways of associativity. Bits 31 - 00: S = Number of Sets.</td>
	</tr>
</table>

Table 3-8.  Information Returned by CPUID Instruction (Contd.)
<table>
	<tr>
		<td><b>Initial EAX Value</b></td>
		<td><b>Information Provided about the Processor</b></td>
	</tr>
	<tr>
		<td></td>
		<td>EDX Bits 04 - 00: Translation cache type field. 00000b: Null (indicates this sub-leaf is not valid). 00001b: Data TLB. 00010b: Instruction TLB. 00011b: Unified TLB*. All other encodings are reserved. Bits 07 - 05: Translation cache level (starts at 1). Bit 08: Fully associative structure. Bits 13 - 09: Reserved. Bits 25- 14: Maximum number of addressable IDs for logical processors sharing this translation cache** Bits 31 - 26: Reserved.</td>
	</tr>
	<tr>
		<td colspan=2>Deterministic Address Translation Parameters Sub-leaf (EAX = 18H, ECX ≥ 1)</td>
	</tr>
	<tr>
		<td>18H</td>
		<td>NOTES: Each sub-leaf enumerates a different address translation structure. If ECX contains an invalid sub-leaf index, EAX/EBX/ECX/EDX return 0. Sub-leaf index n is invalid if n exceeds the value that sub-leaf 0 returns in EAX. A sub-leaf index is also invalid if EDX[4:0] returns 0. Valid sub-leaves do not need to be contiguous or in any particular order. A valid sub-leaf may be in a higher input ECX value than an invalid sub-leaf or than a valid sub-leaf of a higher or lower-level struc- ture. * Some unified TLBs will allow a single TLB entry to satisfy data read/write and instruction fetches. Others will require separate entries (e.g., one loaded on data read/write and another loaded on an instruction fetch) . Please see the Intel® 64 and IA-32 Architectures Optimization Reference Manual for details of a particular product. ** Add one to the return value to get the result. EAX EBX ECX EDX Bits 31 - 00: Reserved. Bit 00: 4K page size entries supported by this structure. Bit 01: 2MB page size entries supported by this structure. Bit 02: 4MB page size entries supported by this structure. Bit 03: 1 GB page size entries supported by this structure. Bits 07 - 04: Reserved. Bits 10 - 08: Partitioning (0: Soft partitioning between the logical processors sharing this structure). Bits 15 - 11: Reserved. Bits 31 - 16: W = Ways of associativity. Bits 31 - 00: S = Number of Sets. Bits 04 - 00: Translation cache type field. 0000b: Null (indicates this sub-leaf is not valid). 0001b: Data TLB. 0010b: Instruction TLB. 0011b: Unified TLB*. All other encodings are reserved. Bits 07 - 05: Translation cache level (starts at 1). Bit 08: Fully associative structure. Bits 13 - 09: Reserved. Bits 25- 14: Maximum number of addressable IDs for logical processors sharing this translation cache** Bits 31 - 26: Reserved.</td>
	</tr>
	<tr>
		<td colspan=2>Unimplemented CPUID Leaf Functions</td>
	</tr>
	<tr>
		<td>40000000H - 4FFFFFFFH</td>
		<td>Invalid. No existing or future CPU will return processor identification or feature information if the initial EAX value is in the range 40000000H to 4FFFFFFFH.</td>
	</tr>
</table>

Table 3-8.  Information Returned by CPUID Instruction (Contd.)
<table>
	<tr>
		<td><b>Initial EAX Value</b></td>
		<td><b>Information Provided about the Processor</b></td>
	</tr>
	<tr>
		<td colspan=2>Extended Function CPUID Information</td>
	</tr>
	<tr>
		<td>80000000H EAX</td>
		<td>EBX ECX EDX Maximum Input Value for Extended Function CPUID Information. Reserved. Reserved. Reserved.</td>
	</tr>
	<tr>
		<td>80000001H EAX</td>
		<td>EBX ECX EDX Extended Processor Signature and Feature Bits. Reserved. Bit 00: LAHF/SAHF available in 64-bit mode. Bits 04 - 01: Reserved. Bit 05: LZCNT. Bits 07 - 06: Reserved. Bit 08: PREFETCHW. Bits 31 - 09: Reserved. Bits 10 - 00: Reserved. Bit 11: SYSCALL/SYSRET available in 64-bit mode. Bits 19 - 12: Reserved = 0. Bit 20: Execute Disable Bit available. Bits 25 - 21: Reserved = 0. Bit 26: 1-GByte pages are available if 1. Bit 27: RDTSCP and IA32_TSC_AUX are available if 1. Bit 28: Reserved = 0. Bit 29: Intel® 64 Architecture available if 1. Bits 31 - 30: Reserved = 0.</td>
	</tr>
	<tr>
		<td>80000002H EAX</td>
		<td>EBX ECX EDX Processor Brand String. Processor Brand String Continued. Processor Brand String Continued. Processor Brand String Continued.</td>
	</tr>
	<tr>
		<td>80000003H EAX</td>
		<td>EBX ECX EDX Processor Brand String Continued. Processor Brand String Continued. Processor Brand String Continued. Processor Brand String Continued.</td>
	</tr>
	<tr>
		<td>80000004H EAX</td>
		<td>EBX ECX EDX Processor Brand String Continued. Processor Brand String Continued. Processor Brand String Continued. Processor Brand String Continued.</td>
	</tr>
	<tr>
		<td>80000005H EAX</td>
		<td>EBX ECX EDX Reserved = 0. Reserved = 0. Reserved = 0. Reserved = 0.</td>
	</tr>
	<tr>
		<td>80000006H EAX</td>
		<td>EBX ECX EDX Reserved = 0. Reserved = 0. Bits 07 - 00: Cache Line size in bytes. Bits 11 - 08: Reserved. Bits 15 - 12: L2 Associativity field *. Bits 31 - 16: Cache size in 1K units. Reserved = 0.</td>
	</tr>
</table>

Table 3-8.  Information Returned by CPUID Instruction (Contd.)
<table>
	<tr>
		<td><b>Initial EAX Value</b></td>
		<td><b>Information Provided about the Processor</b></td>
	</tr>
	<tr>
		<td></td>
		<td>NOTES: * L2 associativity field encodings: 00H - Disabled. 01H - Direct mapped. 02H - 2-way. 04H - 4-way. 06H - 8-way. 08H - 16-way. 0FH - Fully associative.</td>
	</tr>
	<tr>
		<td>80000007H EAX</td>
		<td>Reserved = 0. Reserved = 0. Reserved = 0. Bits 07 - 00: Reserved = 0. Bit 08: Invariant TSC available if 1. Bits 31 - 09: Reserved = 0. EBX ECX EDX</td>
	</tr>
	<tr>
		<td>80000008H EAX</td>
		<td>Linear/Physical Address size. Bits 07 - 00: #Physical Address Bits*. Bits 15 - 08: #Linear Address Bits. Bits 31 - 16: Reserved = 0. Reserved = 0. Reserved = 0. Reserved = 0. EBX ECX EDX NOTES: *  If CPUID.80000008H:EAX[7:0] is supported, the maximum physical address number supported should come from this field.</td>
	</tr>
</table>

INPUT EAX = 0: Returns CPUID’s Highest Value for Basic Processor Information and the Vendor Identification String
When CPUID executes with EAX set to 0, the processor returns the highest value the CPUID recognizes for
returning basic processor information. The value is returned in the EAX register and is processor specific.

A vendor identification string is also returned in EBX, EDX, and ECX. For Intel processors, the string is “Genuin-
eIntel” and is expressed:
EBX ← 756e6547h (\* “Genu”, with G in the low eight bits of BL \*)
EDX ← 49656e69h (\* “ineI”, with i in the low eight bits of DL \*)
ECX ← 6c65746eh (\* “ntel”, with n in the low eight bits of CL \*)

INPUT EAX = 80000000H: Returns CPUID’s Highest Value for Extended Processor Information

When CPUID executes with EAX set to 80000000H, the processor returns the highest value the processor recog-
nizes for returning extended processor information. The value is returned in the EAX register and is processor
specific.

IA32_BIOS_SIGN_ID Returns Microcode Update Signature

For processors that support the microcode update facility, the IA32_BIOS_SIGN_ID MSR is loaded with the update
signature whenever CPUID executes. The signature is returned in the upper DWORD. For details, see Chapter 9 in
the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 3A.
INPUT EAX = 01H: Returns Model, Family, Stepping Information
When CPUID executes with EAX set to 01H, version information is returned in EAX (see Figure 3-6). For example:
model, family, and processor type for the Intel Xeon processor 5100 series is as follows:

 *  Model — 1111B

 * Family — 0101B

 * Processor Type — 00B

See Table 3-9 for available processor type values. Stepping IDs are provided as needed.
<table>
	<tr>
		<td><b>31 28 27 20 19 16 15 14 13 12 11 78 34 0 EAX Extended Family ID Extended Model ID Family ID Model Stepping ID Extended Family ID (0) Extended Model ID (0) Processor Type Family (0FH for the Pentium 4 Processor Family) Model Reserved OM16525</b></td>
	</tr>
</table>

Figure 3-6.  Version Information Returned by CPUID in EAX

Table 3-9.  Processor Type Field
<table>
	<tr>
		<td><b>Type</b></td>
		<td><b>Encoding</b></td>
	</tr>
	<tr>
		<td>Original OEM Processor</td>
		<td>00B</td>
	</tr>
	<tr>
		<td>Intel OverDrive® Processor</td>
		<td>01B</td>
	</tr>
	<tr>
		<td>Dual processor (not applicable to Intel486 processors)</td>
		<td>10B</td>
	</tr>
	<tr>
		<td>Intel reserved</td>
		<td>11B</td>
	</tr>
</table>

NOTE

See Chapter 19 in the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 1,
for information on identifying earlier IA-32 processors.
The Extended Family ID needs to be examined only when the Family ID is 0FH. Integrate the fields into a display
using the following rule:

IF Family_ID ≠ 0FH

THEN DisplayFamily = Family_ID;
ELSE DisplayFamily = Extended_Family_ID + Family_ID;
(\* Right justify and zero-extend 4-bit field. \*)
FI;
(\* Show DisplayFamily as HEX field. \*)
The Extended Model ID needs to be examined only when the Family ID is 06H or 0FH. Integrate the field into a
display using the following rule:

IF (Family_ID = 06H or Family_ID = 0FH)
THEN DisplayModel = (Extended_Model_ID « 4) + Model_ID;
(\* Right justify and zero-extend 4-bit field; display Model_ID as HEX field.\*)
ELSE DisplayModel = Model_ID;
FI;
(\* Show DisplayModel as HEX field. \*)

INPUT EAX = 01H: Returns Additional Information in EBX

When CPUID executes with EAX set to 01H, additional information is returned to the EBX register:

 *  Brand index (low byte of EBX) — this number provides an entry into a brand string table that contains brand

strings for IA-32 processors. More information about this field is provided later in this section.

 *  CLFLUSH instruction cache line size (second byte of EBX) — this number indicates the size of the cache line

flushed by the CLFLUSH and CLFLUSHOPT instructions in 8-byte increments. This field was introduced in the
Pentium 4 processor.

 * Local APIC ID (high byte of EBX) — this number is the 8-bit ID that is assigned to the local APIC on the
processor during power up. This field was introduced in the Pentium 4 processor.

INPUT EAX = 01H: Returns Feature Information in ECX and EDX
When CPUID executes with EAX set to 01H, feature information is returned in ECX and EDX.

 * Figure 3-7 and Table 3-10 show encodings for ECX.

 * Figure 3-8 and Table 3-11 show encodings for EDX.

For all feature flags, a 1 indicates that the feature is supported. Use Intel to properly interpret feature flags.

NOTE

Software must confirm that a processor feature is present using feature flags returned by CPUID
prior to using the feature. Software should not depend on future offerings retaining all features.
<table>
	<tr>
		<td><b>31 30 29 28 27 26 25 24 23 22 21 20 19 18 17 16 15 14 13 12 11 10 456789 123 0 ECX 0 RDRAND F16C AVX OSXSAVE XSAVE AES TSC-Deadline POPCNT MOVBE x2APIC SSE4_2 —  SSE4.2 SSE4_1 —  SSE4.1 DCA —  Direct Cache Access PCID —  Process-context Identifiers PDCM —  Perf/Debug Capability MSR xTPR Update Control CMPXCHG16B FMA —  Fused Multiply Add SDBG CNXT-ID — L1 Context ID SSSE3 —  SSSE3 Extensions TM2 — Thermal Monitor 2 EIST —  Enhanced  Intel  SpeedStep®  Technology SMX — Safer Mode Extensions VMX — Virtual Machine Extensions DS-CPL — CPL Qualified Debug Store MONITOR — MONITOR/MWAIT DTES64  —  64-bit DS Area PCLMULQDQ  —  Carryless Multiplication SSE3  —  SSE3 Extensions Reserved OM16524b</b></td>
	</tr>
</table>

Figure 3-7.  Feature Information Returned in the ECX Register

Table 3-10.  Feature Information Returned in the ECX Register
<table>
	<tr>
		<td><b>Bit #</b></td>
		<td><b>Mnemonic</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>0</td>
		<td>SSE3</td>
		<td>Streaming SIMD Extensions 3 (SSE3). A value of 1 indicates the processor supports this technology.</td>
	</tr>
	<tr>
		<td>1</td>
		<td>PCLMULQDQ</td>
		<td>PCLMULQDQ. A value of 1 indicates the processor supports the PCLMULQDQ instruction.</td>
	</tr>
	<tr>
		<td>2</td>
		<td>DTES64</td>
		<td>64-bit DS Area. A value of 1 indicates the processor supports DS area using 64-bit layout.</td>
	</tr>
	<tr>
		<td>3</td>
		<td>MONITOR</td>
		<td>MONITOR/MWAIT. A value of 1 indicates the processor supports this feature.</td>
	</tr>
	<tr>
		<td>4</td>
		<td>DS-CPL</td>
		<td>CPL Qualified Debug Store. A value of 1 indicates the processor supports the extensions to the Debug Store feature to allow for branch message storage qualified by CPL.</td>
	</tr>
	<tr>
		<td>5</td>
		<td>VMX</td>
		<td>Virtual Machine Extensions. A value of 1 indicates that the processor supports this technology.</td>
	</tr>
	<tr>
		<td>6</td>
		<td>SMX</td>
		<td>Safer Mode Extensions. A value of 1 indicates that the processor supports this technology. See Chapter 6, “Safer Mode Extensions Reference”.</td>
	</tr>
	<tr>
		<td>7</td>
		<td>EIST</td>
		<td>Enhanced Intel SpeedStep® technology. A value of 1 indicates that the processor supports this technology.</td>
	</tr>
	<tr>
		<td>8</td>
		<td>TM2</td>
		<td>Thermal Monitor 2. A value of 1 indicates whether the processor supports this technology.</td>
	</tr>
	<tr>
		<td>9</td>
		<td>SSSE3</td>
		<td>A value of 1 indicates the presence of the Supplemental Streaming SIMD Extensions 3 (SSSE3). A value of 0 indicates the instruction extensions are not present in the processor.</td>
	</tr>
</table>

Table 3-10.  Feature Information Returned in the ECX Register  (Contd.)
<table>
	<tr>
		<td><b>Bit #</b></td>
		<td><b>Mnemonic</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>10</td>
		<td>CNXT-ID</td>
		<td>L1 Context ID. A value of 1 indicates the L1 data cache mode can be set to either adaptive mode or shared mode. A value of 0 indicates this feature is not supported. See definition of the IA32_MISC_ENABLE MSR Bit 24 (L1 Data Cache Context Mode) for details.</td>
	</tr>
	<tr>
		<td>11</td>
		<td>SDBG</td>
		<td>A value of 1 indicates the processor supports IA32_DEBUG_INTERFACE MSR for silicon debug.</td>
	</tr>
	<tr>
		<td>12</td>
		<td>FMA</td>
		<td>A value of 1 indicates the processor supports FMA extensions using YMM state.</td>
	</tr>
	<tr>
		<td>13</td>
		<td>CMPXCHG16B</td>
		<td>CMPXCHG16B Available. A value of 1 indicates that the feature is available. See the “CMPXCHG8B/CMPXCHG16B—Compare and Exchange Bytes” section in this chapter for a description.</td>
	</tr>
	<tr>
		<td>14</td>
		<td>xTPR Update Control</td>
		<td>xTPR Update Control. A value of 1 indicates that the processor supports changing IA32_MISC_ENABLE[bit 23].</td>
	</tr>
	<tr>
		<td>15</td>
		<td>PDCM</td>
		<td>Perfmon and Debug Capability: A value of 1 indicates the processor supports the performance and debug feature indication MSR IA32_PERF_CAPABILITIES.</td>
	</tr>
	<tr>
		<td>16</td>
		<td>Reserved</td>
		<td>Reserved</td>
	</tr>
	<tr>
		<td>17</td>
		<td>PCID</td>
		<td>Process-context identifiers. A value of 1 indicates that the processor supports PCIDs and that software may set CR4.PCIDE to 1.</td>
	</tr>
	<tr>
		<td>18</td>
		<td>DCA</td>
		<td>A value of 1 indicates the processor supports the ability to prefetch data from a memory mapped device.</td>
	</tr>
	<tr>
		<td>19</td>
		<td>SSE4.1</td>
		<td>A value of 1 indicates that the processor supports SSE4.1.</td>
	</tr>
	<tr>
		<td>20</td>
		<td>SSE4.2</td>
		<td>A value of 1 indicates that the processor supports SSE4.2.</td>
	</tr>
	<tr>
		<td>21</td>
		<td>x2APIC</td>
		<td>A value of 1 indicates that the processor supports x2APIC feature.</td>
	</tr>
	<tr>
		<td>22</td>
		<td>MOVBE</td>
		<td>A value of 1 indicates that the processor supports MOVBE instruction.</td>
	</tr>
	<tr>
		<td>23</td>
		<td>POPCNT</td>
		<td>A value of 1 indicates that the processor supports the POPCNT instruction.</td>
	</tr>
	<tr>
		<td>24</td>
		<td>TSC-Deadline</td>
		<td>A value of 1 indicates that the processor’s local APIC timer supports one-shot operation using a TSC deadline value.</td>
	</tr>
	<tr>
		<td>25</td>
		<td>AESNI</td>
		<td>A value of 1 indicates that the processor supports the AESNI instruction extensions.</td>
	</tr>
	<tr>
		<td>26</td>
		<td>XSAVE</td>
		<td>A value of 1 indicates that the processor supports the XSAVE/XRSTOR processor extended states feature, the XSETBV/XGETBV instructions, and XCR0.</td>
	</tr>
	<tr>
		<td>27</td>
		<td>OSXSAVE</td>
		<td>A value of 1 indicates that the OS has set CR4.OSXSAVE[bit 18] to enable XSETBV/XGETBV instructions to access XCR0 and to support processor extended state management using XSAVE/XRSTOR.</td>
	</tr>
	<tr>
		<td>28</td>
		<td>AVX</td>
		<td>A value of 1 indicates the processor supports the AVX instruction extensions.</td>
	</tr>
	<tr>
		<td>29</td>
		<td>F16C</td>
		<td>A value of 1 indicates that processor supports 16-bit floating-point conversion instructions.</td>
	</tr>
	<tr>
		<td>30</td>
		<td>RDRAND</td>
		<td>A value of 1 indicates that processor supports RDRAND instruction.</td>
	</tr>
	<tr>
		<td>31</td>
		<td>Not Used</td>
		<td>Always returns 0.</td>
	</tr>
</table>


<table>
	<tr>
		<td><b>31 30 29 28 27 26 25 24 23 22 21 20 19 18 17 16 15 14 13 12 11 12345678910 0 EDX PBE–Pend. Brk. EN. TM–Therm. Monitor HTT–Multi-threading SS–Self Snoop SSE2–SSE2 Extensions SSE–SSE Extensions FXSR–FXSAVE/FXRSTOR MMX–MMX Technology ACPI–Thermal Monitor and Clock Ctrl DS–Debug Store CLFSH–CLFLUSH instruction PSN–Processor Serial Number PSE-36 – Page Size Extension PAT–Page Attribute Table CMOV–Conditional Move/Compare Instruction MCA–Machine Check Architecture PGE–PTE Global Bit MTRR–Memory Type Range Registers SEP–SYSENTER and SYSEXIT APIC–APIC on Chip CX8–CMPXCHG8B Inst. MCE–Machine Check Exception PAE–Physical Address Extensions MSR–RDMSR and WRMSR Support TSC–Time Stamp Counter PSE–Page Size Extensions DE–Debugging Extensions VME–Virtual-8086 Mode Enhancement FPU–x87 FPU on Chip Reserved OM16523</b></td>
	</tr>
</table>

Figure 3-8.  Feature Information Returned in the EDX Register
Table 3-11.  More on Feature Information Returned in the EDX Register
<table>
	<tr>
		<td><b>Bit #  Mnemonic  Description</b></td>
		<td><b></b></td>
		<td><b></b></td>
	</tr>
	<tr>
		<td>0</td>
		<td>FPU</td>
		<td>Floating Point Unit On-Chip. The processor contains an x87 FPU.</td>
	</tr>
	<tr>
		<td>1</td>
		<td>VME</td>
		<td>Virtual 8086 Mode Enhancements. Virtual 8086 mode enhancements, including CR4.VME for controlling the feature, CR4.PVI for protected mode virtual interrupts, software interrupt indirection, expansion of the TSS with the software indirection bitmap, and EFLAGS.VIF and EFLAGS.VIP flags.</td>
	</tr>
	<tr>
		<td>2</td>
		<td>DE</td>
		<td>Debugging Extensions. Support for I/O breakpoints, including CR4.DE for controlling the feature, and optional trapping of accesses to DR4 and DR5.</td>
	</tr>
	<tr>
		<td>3</td>
		<td>PSE</td>
		<td>Page Size Extension. Large pages of size 4 MByte are supported, including CR4.PSE for controlling the feature, the defined dirty bit in PDE (Page Directory Entries), optional reserved bit trapping in CR3, PDEs, and PTEs.</td>
	</tr>
	<tr>
		<td>4</td>
		<td>TSC</td>
		<td>Time Stamp Counter. The RDTSC instruction is supported, including CR4.TSD for controlling privilege.</td>
	</tr>
	<tr>
		<td>5</td>
		<td>MSR</td>
		<td>Model Specific Registers RDMSR and WRMSR Instructions. The RDMSR and WRMSR instructions are supported. Some of the MSRs are implementation dependent.</td>
	</tr>
	<tr>
		<td>6</td>
		<td>PAE</td>
		<td>Physical Address Extension. Physical addresses greater than 32 bits are supported: extended page table entry formats, an extra level in the page translation tables is defined, 2-MByte pages are supported instead of 4 Mbyte pages if PAE bit is 1.</td>
	</tr>
	<tr>
		<td>7</td>
		<td>MCE</td>
		<td>Machine Check Exception. Exception 18 is defined for Machine Checks, including CR4.MCE for controlling the feature. This feature does not define the model-specific implementations of machine-check error logging, reporting, and processor shutdowns. Machine Check exception handlers may have to depend on processor version to do model specific processing of the exception, or test for the presence of the Machine Check feature.</td>
	</tr>
	<tr>
		<td>8</td>
		<td>CX8</td>
		<td>CMPXCHG8B Instruction. The compare-and-exchange 8 bytes (64 bits) instruction is supported (implicitly locked and atomic).</td>
	</tr>
	<tr>
		<td>9</td>
		<td>APIC</td>
		<td>APIC On-Chip. The processor contains an Advanced Programmable Interrupt Controller (APIC), responding to memory mapped commands in the physical address range FFFE0000H to FFFE0FFFH (by default - some processors permit the APIC to be relocated).</td>
	</tr>
	<tr>
		<td>10</td>
		<td>Reserved</td>
		<td>Reserved</td>
	</tr>
	<tr>
		<td>11</td>
		<td>SEP</td>
		<td>SYSENTER and SYSEXIT Instructions. The SYSENTER and SYSEXIT and associated MSRs are supported.</td>
	</tr>
	<tr>
		<td>12  MTRR</td>
		<td></td>
		<td>Memory Type Range Registers. MTRRs are supported. The MTRRcap MSR contains feature bits that describe what memory types are supported, how many variable MTRRs are supported, and whether fixed MTRRs are supported.</td>
	</tr>
	<tr>
		<td>13</td>
		<td>PGE</td>
		<td>Page Global Bit. The global bit is supported in paging-structure entries that map a page, indicating TLB entries that are common to different processes and need not be flushed. The CR4.PGE bit controls this feature.</td>
	</tr>
	<tr>
		<td>14  MCA</td>
		<td></td>
		<td>Machine Check Architecture. A value of 1 indicates the Machine Check Architecture of reporting machine errors is supported. The MCG_CAP MSR contains feature bits describing how many banks of error reporting MSRs are supported.</td>
	</tr>
	<tr>
		<td>15</td>
		<td>CMOV</td>
		<td>Conditional Move Instructions. The conditional move instruction CMOV is supported. In addition, if x87 FPU is present as indicated by the CPUID.FPU feature bit, then the FCOMI and FCMOV instructions are supported</td>
	</tr>
	<tr>
		<td>16</td>
		<td>PAT</td>
		<td>Page Attribute Table. Page Attribute Table is supported. This feature augments the Memory Type Range Registers (MTRRs), allowing an operating system to specify attributes of memory accessed through a linear address on a 4KB granularity.</td>
	</tr>
	<tr>
		<td>17</td>
		<td>PSE-36</td>
		<td>36-Bit Page Size Extension. 4-MByte pages addressing physical memory beyond 4 GBytes are supported with 32-bit paging. This feature indicates that upper bits of the physical address of a 4-MByte page are encoded in bits 20:13 of the page-directory entry. Such physical addresses are limited by MAXPHYADDR and may be up to 40 bits in size.</td>
	</tr>
	<tr>
		<td>18</td>
		<td>PSN</td>
		<td>Processor Serial Number. The processor supports the 96-bit processor identification number feature and the feature is enabled.</td>
	</tr>
	<tr>
		<td>19</td>
		<td>CLFSH</td>
		<td>CLFLUSH Instruction. CLFLUSH Instruction is supported.</td>
	</tr>
	<tr>
		<td>20</td>
		<td>Reserved</td>
		<td>Reserved</td>
	</tr>
</table>

Table 3-11.  More on Feature Information Returned in the EDX Register (Contd.)
<table>
	<tr>
		<td><b>Bit #  Mnemonic  Description</b></td>
		<td><b></b></td>
		<td><b></b></td>
	</tr>
	<tr>
		<td>21</td>
		<td>DS</td>
		<td>Debug Store. The processor supports the ability to write debug information into a memory resident buffer. This feature is used by the branch trace store (BTS) and processor event-based sampling (PEBS) facilities (see Chapter 23, “Introduction to Virtual-Machine Extensions,” in the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 3C).</td>
	</tr>
	<tr>
		<td>22</td>
		<td>ACPI</td>
		<td>Thermal Monitor and Software Controlled Clock Facilities. The processor implements internal MSRs that allow processor temperature to be monitored and processor performance to be modulated in predefined duty cycles under software control.</td>
	</tr>
	<tr>
		<td>23  MMX</td>
		<td></td>
		<td>Intel MMX Technology. The processor supports the Intel MMX technology.</td>
	</tr>
	<tr>
		<td>24</td>
		<td>FXSR</td>
		<td>FXSAVE and FXRSTOR Instructions. The FXSAVE and FXRSTOR instructions are supported for fast save and restore of the floating point context. Presence of this bit also indicates that CR4.OSFXSR is available for an operating system to indicate that it supports the FXSAVE and FXRSTOR instructions.</td>
	</tr>
	<tr>
		<td>25</td>
		<td>SSE</td>
		<td>SSE. The processor supports the SSE extensions.</td>
	</tr>
	<tr>
		<td>26</td>
		<td>SSE2</td>
		<td>SSE2. The processor supports the SSE2 extensions.</td>
	</tr>
	<tr>
		<td>27</td>
		<td>SS</td>
		<td>Self Snoop. The processor supports the management of conflicting memory types by performing a snoop of its own cache structure for transactions issued to the bus.</td>
	</tr>
	<tr>
		<td>28</td>
		<td>HTT</td>
		<td>Max APIC IDs reserved field is Valid. A value of 0 for HTT indicates there is only a single logical processor in the package and software should assume only a single APIC ID is reserved. A value of 1 for HTT indicates the value in CPUID.1.EBX[23:16] (the Maximum number of addressable IDs for logical processors in this package) is valid for the package.</td>
	</tr>
	<tr>
		<td>29</td>
		<td>TM</td>
		<td>Thermal Monitor. The processor implements the thermal monitor automatic thermal control circuitry (TCC).</td>
	</tr>
	<tr>
		<td>30</td>
		<td>Reserved</td>
		<td>Reserved</td>
	</tr>
	<tr>
		<td>31</td>
		<td>PBE</td>
		<td>Pending Break Enable. The processor supports the use of the FERR#/PBE# pin when the processor is in the stop-clock state (STPCLK# is asserted) to signal the processor that an interrupt is pending and that the processor should return to normal operation to handle the interrupt. Bit 10 (PBE enable) in the IA32_MISC_ENABLE MSR enables this capability.</td>
	</tr>
</table>

INPUT EAX = 02H: TLB/Cache/Prefetch Information Returned in EAX, EBX, ECX, EDX

When CPUID executes with EAX set to 02H, the processor returns information about the processor’s internal TLBs,
cache and prefetch hardware in the EAX, EBX, ECX, and EDX registers. The information is reported in encoded form
and fall into the following categories:

 * The least-significant byte in register EAX (register AL) will always return 01H. Software should ignore this value
and not interpret it as an informational descriptor.

 * The most significant bit (bit 31) of each register indicates whether the register contains valid information (set
to 0) or is reserved (set to 1).

 * If a register contains valid information, the information is contained in 1 byte descriptors. There are four types
of encoding values for the byte descriptor, the encoding type is noted in the second column of Table 3-12. Table
3-12 lists the encoding of these descriptors. Note that the order of descriptors in the EAX, EBX, ECX, and EDX
registers is not defined; that is, specific bytes are not designated to contain descriptors for specific cache,
prefetch, or TLB types. The descriptors may appear in any order. Note also a processor may report a general
descriptor type (FFH) and not report any byte descriptor of “cache type” via CPUID leaf 2.
Table 3-12.  Encoding of CPUID Leaf 2 Descriptors
<table>
	<tr>
		<td><b>Value</b></td>
		<td><b>Type</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>00H</td>
		<td>General</td>
		<td>Null descriptor, this byte contains no information</td>
	</tr>
	<tr>
		<td>01H</td>
		<td>TLB</td>
		<td>Instruction TLB: 4 KByte pages, 4-way set associative, 32 entries</td>
	</tr>
	<tr>
		<td>02H</td>
		<td>TLB</td>
		<td>Instruction TLB: 4 MByte pages, fully associative, 2 entries</td>
	</tr>
	<tr>
		<td>03H</td>
		<td>TLB</td>
		<td>Data TLB: 4 KByte pages, 4-way set associative, 64 entries</td>
	</tr>
	<tr>
		<td>04H</td>
		<td>TLB</td>
		<td>Data TLB: 4 MByte pages, 4-way set associative, 8 entries</td>
	</tr>
	<tr>
		<td>05H</td>
		<td>TLB</td>
		<td>Data TLB1: 4 MByte pages, 4-way set associative, 32 entries</td>
	</tr>
	<tr>
		<td>06H</td>
		<td>Cache</td>
		<td>1st-level instruction cache: 8 KBytes, 4-way set associative, 32 byte line size</td>
	</tr>
	<tr>
		<td>08H</td>
		<td>Cache</td>
		<td>1st-level instruction cache: 16 KBytes, 4-way set associative, 32 byte line size</td>
	</tr>
	<tr>
		<td>09H</td>
		<td>Cache</td>
		<td>1st-level instruction cache: 32KBytes, 4-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>0AH</td>
		<td>Cache</td>
		<td>1st-level data cache: 8 KBytes, 2-way set associative, 32 byte line size</td>
	</tr>
	<tr>
		<td>0BH</td>
		<td>TLB</td>
		<td>Instruction TLB: 4 MByte pages, 4-way set associative, 4 entries</td>
	</tr>
	<tr>
		<td>0CH</td>
		<td>Cache</td>
		<td>1st-level data cache: 16 KBytes, 4-way set associative, 32 byte line size</td>
	</tr>
	<tr>
		<td>0DH</td>
		<td>Cache</td>
		<td>1st-level data cache: 16 KBytes, 4-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>0EH</td>
		<td>Cache</td>
		<td>1st-level data cache: 24 KBytes, 6-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>1DH</td>
		<td>Cache</td>
		<td>2nd-level cache: 128 KBytes, 2-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>21H</td>
		<td>Cache</td>
		<td>2nd-level cache: 256 KBytes, 8-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>22H</td>
		<td>Cache</td>
		<td>3rd-level cache: 512 KBytes, 4-way set associative, 64 byte line size, 2 lines per sector</td>
	</tr>
	<tr>
		<td>23H</td>
		<td>Cache</td>
		<td>3rd-level cache: 1 MBytes, 8-way set associative, 64 byte line size, 2 lines per sector</td>
	</tr>
	<tr>
		<td>24H</td>
		<td>Cache</td>
		<td>2nd-level cache: 1 MBytes, 16-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>25H</td>
		<td>Cache</td>
		<td>3rd-level cache: 2 MBytes, 8-way set associative, 64 byte line size, 2 lines per sector</td>
	</tr>
	<tr>
		<td>29H</td>
		<td>Cache</td>
		<td>3rd-level cache: 4 MBytes, 8-way set associative, 64 byte line size, 2 lines per sector</td>
	</tr>
	<tr>
		<td>2CH</td>
		<td>Cache</td>
		<td>1st-level data cache: 32 KBytes, 8-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>30H</td>
		<td>Cache</td>
		<td>1st-level instruction cache: 32 KBytes, 8-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>40H</td>
		<td>Cache</td>
		<td>No 2nd-level cache or, if processor contains a valid 2nd-level cache, no 3rd-level cache</td>
	</tr>
	<tr>
		<td>41H</td>
		<td>Cache</td>
		<td>2nd-level cache: 128 KBytes, 4-way set associative, 32 byte line size</td>
	</tr>
	<tr>
		<td>42H</td>
		<td>Cache</td>
		<td>2nd-level cache: 256 KBytes, 4-way set associative, 32 byte line size</td>
	</tr>
	<tr>
		<td>43H</td>
		<td>Cache</td>
		<td>2nd-level cache: 512 KBytes, 4-way set associative, 32 byte line size</td>
	</tr>
	<tr>
		<td>44H</td>
		<td>Cache</td>
		<td>2nd-level cache: 1 MByte, 4-way set associative, 32 byte line size</td>
	</tr>
	<tr>
		<td>45H</td>
		<td>Cache</td>
		<td>2nd-level cache: 2 MByte, 4-way set associative, 32 byte line size</td>
	</tr>
	<tr>
		<td>46H</td>
		<td>Cache</td>
		<td>3rd-level cache: 4 MByte, 4-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>47H</td>
		<td>Cache</td>
		<td>3rd-level cache: 8 MByte, 8-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>48H</td>
		<td>Cache</td>
		<td>2nd-level cache: 3MByte, 12-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>49H</td>
		<td>Cache</td>
		<td>3rd-level cache: 4MB, 16-way set associative, 64-byte line size (Intel Xeon processor MP, Family 0FH, Model 06H); 2nd-level cache: 4 MByte, 16-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>4AH</td>
		<td>Cache</td>
		<td>3rd-level cache: 6MByte, 12-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>4BH</td>
		<td>Cache</td>
		<td>3rd-level cache: 8MByte, 16-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>4CH</td>
		<td>Cache</td>
		<td>3rd-level cache: 12MByte, 12-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>4DH</td>
		<td>Cache</td>
		<td>3rd-level cache: 16MByte, 16-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>4EH</td>
		<td>Cache</td>
		<td>2nd-level cache: 6MByte, 24-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>4FH</td>
		<td>TLB</td>
		<td>Instruction TLB: 4 KByte pages, 32 entries</td>
	</tr>
</table>

Table 3-12.  Encoding of CPUID Leaf 2 Descriptors  (Contd.)
<table>
	<tr>
		<td><b>Value</b></td>
		<td><b>Type</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>50H</td>
		<td>TLB</td>
		<td>Instruction TLB: 4 KByte and 2-MByte or 4-MByte pages, 64 entries</td>
	</tr>
	<tr>
		<td>51H</td>
		<td>TLB</td>
		<td>Instruction TLB: 4 KByte and 2-MByte or 4-MByte pages, 128 entries</td>
	</tr>
	<tr>
		<td>52H</td>
		<td>TLB</td>
		<td>Instruction TLB: 4 KByte and 2-MByte or 4-MByte pages, 256 entries</td>
	</tr>
	<tr>
		<td>55H</td>
		<td>TLB</td>
		<td>Instruction TLB: 2-MByte or 4-MByte pages, fully associative, 7 entries</td>
	</tr>
	<tr>
		<td>56H</td>
		<td>TLB</td>
		<td>Data TLB0: 4 MByte pages, 4-way set associative, 16 entries</td>
	</tr>
	<tr>
		<td>57H</td>
		<td>TLB</td>
		<td>Data TLB0: 4 KByte pages, 4-way associative, 16 entries</td>
	</tr>
	<tr>
		<td>59H</td>
		<td>TLB</td>
		<td>Data TLB0: 4 KByte pages, fully associative, 16 entries</td>
	</tr>
	<tr>
		<td>5AH</td>
		<td>TLB</td>
		<td>Data TLB0: 2 MByte or 4 MByte pages, 4-way set associative, 32 entries</td>
	</tr>
	<tr>
		<td>5BH</td>
		<td>TLB</td>
		<td>Data TLB: 4 KByte and 4 MByte pages, 64 entries</td>
	</tr>
	<tr>
		<td>5CH</td>
		<td>TLB</td>
		<td>Data TLB: 4 KByte and 4 MByte pages,128 entries</td>
	</tr>
	<tr>
		<td>5DH</td>
		<td>TLB</td>
		<td>Data TLB: 4 KByte and 4 MByte pages,256 entries</td>
	</tr>
	<tr>
		<td>60H</td>
		<td>Cache</td>
		<td>1st-level data cache: 16 KByte, 8-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>61H</td>
		<td>TLB</td>
		<td>Instruction TLB: 4 KByte pages, fully associative, 48 entries</td>
	</tr>
	<tr>
		<td>63H</td>
		<td>TLB</td>
		<td>Data TLB: 2 MByte or 4 MByte pages, 4-way set associative, 32 entries and a separate array with 1 GByte pages, 4-way set associative, 4 entries</td>
	</tr>
	<tr>
		<td>64H</td>
		<td>TLB</td>
		<td>Data TLB: 4 KByte pages, 4-way set associative, 512 entries</td>
	</tr>
	<tr>
		<td>66H</td>
		<td>Cache</td>
		<td>1st-level data cache: 8 KByte, 4-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>67H</td>
		<td>Cache</td>
		<td>1st-level data cache: 16 KByte, 4-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>68H</td>
		<td>Cache</td>
		<td>1st-level data cache: 32 KByte, 4-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>6AH</td>
		<td>Cache</td>
		<td>uTLB: 4 KByte pages, 8-way set associative, 64 entries</td>
	</tr>
	<tr>
		<td>6BH</td>
		<td>Cache</td>
		<td>DTLB: 4 KByte pages, 8-way set associative, 256 entries</td>
	</tr>
	<tr>
		<td>6CH</td>
		<td>Cache</td>
		<td>DTLB: 2M/4M pages, 8-way set associative, 128 entries</td>
	</tr>
	<tr>
		<td>6DH</td>
		<td>Cache</td>
		<td>DTLB: 1 GByte pages, fully associative, 16 entries</td>
	</tr>
	<tr>
		<td>70H</td>
		<td>Cache</td>
		<td>Trace cache: 12 K-μop, 8-way set associative</td>
	</tr>
	<tr>
		<td>71H</td>
		<td>Cache</td>
		<td>Trace cache: 16 K-μop, 8-way set associative</td>
	</tr>
	<tr>
		<td>72H</td>
		<td>Cache</td>
		<td>Trace cache: 32 K-μop, 8-way set associative</td>
	</tr>
	<tr>
		<td>76H</td>
		<td>TLB</td>
		<td>Instruction TLB: 2M/4M pages, fully associative, 8 entries</td>
	</tr>
	<tr>
		<td>78H</td>
		<td>Cache</td>
		<td>2nd-level cache: 1 MByte, 4-way set associative, 64byte line size</td>
	</tr>
	<tr>
		<td>79H</td>
		<td>Cache</td>
		<td>2nd-level cache: 128 KByte, 8-way set associative, 64 byte line size, 2 lines per sector</td>
	</tr>
	<tr>
		<td>7AH</td>
		<td>Cache</td>
		<td>2nd-level cache: 256 KByte, 8-way set associative, 64 byte line size, 2 lines per sector</td>
	</tr>
	<tr>
		<td>7BH</td>
		<td>Cache</td>
		<td>2nd-level cache: 512 KByte, 8-way set associative, 64 byte line size, 2 lines per sector</td>
	</tr>
	<tr>
		<td>7CH</td>
		<td>Cache</td>
		<td>2nd-level cache: 1 MByte, 8-way set associative, 64 byte line size, 2 lines per sector</td>
	</tr>
	<tr>
		<td>7DH</td>
		<td>Cache</td>
		<td>2nd-level cache: 2 MByte, 8-way set associative, 64byte line size</td>
	</tr>
	<tr>
		<td>7FH</td>
		<td>Cache</td>
		<td>2nd-level cache: 512 KByte, 2-way set associative, 64-byte line size</td>
	</tr>
	<tr>
		<td>80H</td>
		<td>Cache</td>
		<td>2nd-level cache: 512 KByte, 8-way set associative, 64-byte line size</td>
	</tr>
	<tr>
		<td>82H</td>
		<td>Cache</td>
		<td>2nd-level cache: 256 KByte, 8-way set associative, 32 byte line size</td>
	</tr>
	<tr>
		<td>83H</td>
		<td>Cache</td>
		<td>2nd-level cache: 512 KByte, 8-way set associative, 32 byte line size</td>
	</tr>
	<tr>
		<td>84H</td>
		<td>Cache</td>
		<td>2nd-level cache: 1 MByte, 8-way set associative, 32 byte line size</td>
	</tr>
	<tr>
		<td>85H</td>
		<td>Cache</td>
		<td>2nd-level cache: 2 MByte, 8-way set associative, 32 byte line size</td>
	</tr>
	<tr>
		<td>86H</td>
		<td>Cache</td>
		<td>2nd-level cache: 512 KByte, 4-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>87H</td>
		<td>Cache</td>
		<td>2nd-level cache: 1 MByte, 8-way set associative, 64 byte line size</td>
	</tr>
</table>

Table 3-12.  Encoding of CPUID Leaf 2 Descriptors  (Contd.)
<table>
	<tr>
		<td><b>Value</b></td>
		<td><b>Type</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>A0H</td>
		<td>DTLB</td>
		<td>DTLB: 4k pages, fully associative, 32 entries</td>
	</tr>
	<tr>
		<td>B0H</td>
		<td>TLB</td>
		<td>Instruction TLB: 4 KByte pages, 4-way set associative, 128 entries</td>
	</tr>
	<tr>
		<td>B1H</td>
		<td>TLB</td>
		<td>Instruction TLB: 2M pages, 4-way, 8 entries or 4M pages, 4-way, 4 entries</td>
	</tr>
	<tr>
		<td>B2H</td>
		<td>TLB</td>
		<td>Instruction TLB: 4KByte pages, 4-way set associative, 64 entries</td>
	</tr>
	<tr>
		<td>B3H</td>
		<td>TLB</td>
		<td>Data TLB: 4 KByte pages, 4-way set associative, 128 entries</td>
	</tr>
	<tr>
		<td>B4H</td>
		<td>TLB</td>
		<td>Data TLB1: 4 KByte pages, 4-way associative, 256 entries</td>
	</tr>
	<tr>
		<td>B5H</td>
		<td>TLB</td>
		<td>Instruction TLB: 4KByte pages, 8-way set associative, 64 entries</td>
	</tr>
	<tr>
		<td>B6H</td>
		<td>TLB</td>
		<td>Instruction TLB: 4KByte pages, 8-way set associative, 128 entries</td>
	</tr>
	<tr>
		<td>BAH</td>
		<td>TLB</td>
		<td>Data TLB1: 4 KByte pages, 4-way associative, 64 entries</td>
	</tr>
	<tr>
		<td>C0H</td>
		<td>TLB</td>
		<td>Data TLB: 4 KByte and 4 MByte pages, 4-way associative, 8 entries</td>
	</tr>
	<tr>
		<td>C1H</td>
		<td>STLB</td>
		<td>Shared 2nd-Level TLB: 4 KByte/2MByte pages, 8-way associative, 1024 entries</td>
	</tr>
	<tr>
		<td>C2H</td>
		<td>DTLB</td>
		<td>DTLB: 4 KByte/2 MByte pages, 4-way associative, 16 entries</td>
	</tr>
	<tr>
		<td>C3H</td>
		<td>STLB</td>
		<td>Shared 2nd-Level TLB: 4 KByte /2 MByte pages, 6-way associative, 1536 entries. Also 1GBbyte pages, 4-way, 16 entries.</td>
	</tr>
	<tr>
		<td>C4H</td>
		<td>DTLB</td>
		<td>DTLB: 2M/4M Byte pages, 4-way associative, 32 entries</td>
	</tr>
	<tr>
		<td>CAH</td>
		<td>STLB</td>
		<td>Shared 2nd-Level TLB: 4 KByte pages, 4-way associative, 512 entries</td>
	</tr>
	<tr>
		<td>D0H</td>
		<td>Cache</td>
		<td>3rd-level cache: 512 KByte, 4-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>D1H</td>
		<td>Cache</td>
		<td>3rd-level cache: 1 MByte, 4-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>D2H</td>
		<td>Cache</td>
		<td>3rd-level cache: 2 MByte, 4-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>D6H</td>
		<td>Cache</td>
		<td>3rd-level cache: 1 MByte, 8-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>D7H</td>
		<td>Cache</td>
		<td>3rd-level cache: 2 MByte, 8-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>D8H</td>
		<td>Cache</td>
		<td>3rd-level cache: 4 MByte, 8-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>DCH</td>
		<td>Cache</td>
		<td>3rd-level cache: 1.5 MByte, 12-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>DDH</td>
		<td>Cache</td>
		<td>3rd-level cache: 3 MByte, 12-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>DEH</td>
		<td>Cache</td>
		<td>3rd-level cache: 6 MByte, 12-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>E2H</td>
		<td>Cache</td>
		<td>3rd-level cache: 2 MByte, 16-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>E3H</td>
		<td>Cache</td>
		<td>3rd-level cache: 4 MByte, 16-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>E4H</td>
		<td>Cache</td>
		<td>3rd-level cache: 8 MByte, 16-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>EAH</td>
		<td>Cache</td>
		<td>3rd-level cache: 12MByte, 24-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>EBH</td>
		<td>Cache</td>
		<td>3rd-level cache: 18MByte, 24-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>ECH</td>
		<td>Cache</td>
		<td>3rd-level cache: 24MByte, 24-way set associative, 64 byte line size</td>
	</tr>
	<tr>
		<td>F0H</td>
		<td>Prefetch 64-Byte prefetching</td>
		<td></td>
	</tr>
	<tr>
		<td>F1H</td>
		<td>Prefetch 128-Byte prefetching</td>
		<td></td>
	</tr>
	<tr>
		<td>FEH</td>
		<td>General</td>
		<td>CPUID leaf 2 does not report TLB descriptor information; use CPUID leaf 18H to query TLB and other address translation parameters.</td>
	</tr>
	<tr>
		<td>FFH</td>
		<td>General</td>
		<td>CPUID leaf 2 does not report cache descriptor information, use CPUID leaf 4 to query cache parameters</td>
	</tr>
</table>

Example 3-1.  Example of Cache and TLB Interpretation

The first member of the family of Pentium 4 processors returns the following information about caches and TLBs
when the CPUID executes with an input value of 2:

EAX
66 5B 50 01H
EBX
0H
ECX
0H
EDX
00 7A 70 00H
Which means:

 * The least-significant byte (byte 0) of register EAX is set to 01H. This value should be ignored.

 * The most-significant bit of all four registers (EAX, EBX, ECX, and EDX) is set to 0, indicating that each register
contains valid 1-byte descriptors.

 *  Bytes 1, 2, and 3 of register EAX indicate that the processor has:

— 50H - a 64-entry instruction TLB, for mapping 4-KByte and 2-MByte or 4-MByte pages.

— 5BH - a 64-entry data TLB, for mapping 4-KByte and 4-MByte pages.

— 66H - an 8-KByte 1st level data cache, 4-way set associative, with a 64-Byte cache line size.

 * The descriptors in registers EBX and ECX are valid, but contain NULL descriptors.

 *  Bytes 0, 1, 2, and 3 of register EDX indicate that the processor has:

— 00H - NULL descriptor.
— 70H - Trace cache: 12 K-μop, 8-way set associative.

— 7AH - a 256-KByte 2nd level cache, 8-way set associative, with a sectored, 64-byte cache line size.

— 00H - NULL descriptor.

INPUT EAX = 04H: Returns Deterministic Cache Parameters for Each Level

When CPUID executes with EAX set to 04H and ECX contains an index value, the processor returns encoded data
that describe a set of deterministic cache parameters (for the cache level associated with the input in ECX). Valid
index values start from 0.

Software can enumerate the deterministic cache parameters for each level of the cache hierarchy starting with an
index value of 0, until the parameters report the value associated with the cache type field is 0. The architecturally
defined fields reported by deterministic cache parameters are documented in Table 3-8.

This Cache Size in Bytes

= (Ways + 1) \* (Partitions + 1) \* (Line_Size + 1) \* (Sets + 1)

= (EBX[31:22] + 1) \* (EBX[21:12] + 1) \* (EBX[11:0] + 1) \* (ECX + 1)

The CPUID leaf 04H also reports data that can be used to derive the topology of processor cores in a physical
package. This information is constant for all valid index values. Software can query the raw data reported by
executing CPUID with EAX=04H and ECX=0 and use it as part of the topology enumeration algorithm described in
Chapter 8, “Multiple-Processor Management,” in the Intel® 64 and IA-32 Architectures Software Developer’s
Manual, Volume 3A.

INPUT EAX = 05H: Returns MONITOR and MWAIT Features
When CPUID executes with EAX set to 05H, the processor returns information about features available to
MONITOR/MWAIT instructions. The MONITOR instruction is used for address-range monitoring in conjunction with
MWAIT instruction. The MWAIT instruction optionally provides additional extensions for advanced power manage-
ment. See Table 3-8.

INPUT EAX = 06H: Returns Thermal and Power Management Features
When CPUID executes with EAX set to 06H, the processor returns information about thermal and power manage-
ment features. See Table 3-8.
INPUT EAX = 07H: Returns Structured Extended Feature Enumeration Information
When CPUID executes with EAX set to 07H and ECX = 0, the processor returns information about the maximum
input value for sub-leaves that contain extended feature flags. See Table 3-8.

When CPUID executes with EAX set to 07H and the input value of ECX is invalid (see leaf 07H entry in Table 3-8),
the processor returns 0 in EAX/EBX/ECX/EDX. In subleaf 0, EAX returns the maximum input value of the highest
leaf 7 sub-leaf, and EBX, ECX & EDX contain information of extended feature flags.

INPUT EAX = 09H: Returns Direct Cache Access Information
When CPUID executes with EAX set to 09H, the processor returns information about Direct Cache Access capabili-
ties. See Table 3-8.

INPUT EAX = 0AH: Returns Architectural Performance Monitoring Features
When CPUID executes with EAX set to 0AH, the processor returns information about support for architectural
performance monitoring capabilities. Architectural performance monitoring is supported if the version ID (see
Table 3-8) is greater than Pn 0. See Table 3-8.

For each version of architectural performance monitoring capability, software must enumerate this leaf to discover
the programming facilities and the architectural performance events available in the processor. The details are
described in Chapter 23, “Introduction to Virtual-Machine Extensions,” in the Intel® 64 and IA-32 Architectures
Software Developer’s Manual, Volume 3C.

INPUT EAX = 0BH: Returns Extended Topology Information

When CPUID executes with EAX set to 0BH, the processor returns information about extended topology enumera-
tion data. Software must detect the presence of CPUID leaf 0BH by verifying (a) the highest leaf index supported
by CPUID is >= 0BH, and (b) CPUID.0BH:EBX[15:0] reports a non-zero value. See Table 3-8.

INPUT EAX = 0DH: Returns Processor Extended States Enumeration Information

When CPUID executes with EAX set to 0DH and ECX = 0, the processor returns information about the bit-vector
representation of all processor state extensions that are supported in the processor and storage size requirements
of the XSAVE/XRSTOR area. See Table 3-8.

When CPUID executes with EAX set to 0DH and ECX = n (n > 1, and is a valid sub-leaf index), the processor returns
information about the size and offset of each processor extended state save area within the XSAVE/XRSTOR area.
See Table 3-8. Software can use the forward-extendable technique depicted below to query the valid sub-leaves
and obtain size and offset information for each processor extended state save area:

For i = 2 to 62 // sub-leaf 1 is reserved
IF (CPUID.(EAX=0DH, ECX=0):VECTOR[i] = 1 ) // VECTOR is the 64-bit value of EDX:EAX
Execute CPUID.(EAX=0DH, ECX = i) to examine size and offset for sub-leaf i;
FI;

INPUT EAX = 0FH: Returns Intel Resource Director Technology (Intel RDT) Monitoring Enumeration Information
When CPUID executes with EAX set to 0FH and ECX = 0, the processor returns information about the bit-vector
representation of QoS monitoring resource types that are supported in the processor and maximum range of RMID
values the processor can use to monitor of any supported resource types. Each bit, starting from bit 1, corresponds
to a specific resource type if the bit is set. The bit position corresponds to the sub-leaf index (or ResID) that soft-
ware must use to query QoS monitoring capability available for that type. See Table 3-8.

When CPUID executes with EAX set to 0FH and ECX = n (n >= 1, and is a valid ResID), the processor returns information
 software can use to program IA32_PQR_ASSOC, IA32_QM_EVTSEL MSRs before reading QoS data from the
IA32_QM_CTR MSR.

INPUT EAX = 10H: Returns Intel Resource Director Technology (Intel RDT) Allocation Enumeration Information
When CPUID executes with EAX set to 10H and ECX = 0, the processor returns information about the bit-vector
representation of QoS Enforcement resource types that are supported in the processor. Each bit, starting from bit
1, corresponds to a specific resource type if the bit is set. The bit position corresponds to the sub-leaf index (or
ResID) that software must use to query QoS enforcement capability available for that type. See Table 3-8.

When CPUID executes with EAX set to 10H and ECX = n (n >= 1, and is a valid ResID), the processor returns information
 about available classes of service and range of QoS mask MSRs that software can use to configure each
class of services using capability bit masks in the QoS Mask registers, IA32_resourceType_Mask_n.

INPUT EAX = 12H: Returns Intel SGX Enumeration Information
When CPUID executes with EAX set to 12H and ECX = 0H, the processor returns information about Intel SGX capa-
bilities. See Table 3-8.

When CPUID executes with EAX set to 12H and ECX = 1H, the processor returns information about Intel SGX attri-
butes. See Table 3-8.

When CPUID executes with EAX set to 12H and ECX = n (n > 1), the processor returns information about Intel SGX
Enclave Page Cache. See Table 3-8.

INPUT EAX = 14H: Returns Intel Processor Trace Enumeration Information

When CPUID executes with EAX set to 14H and ECX = 0H, the processor returns information about Intel Processor
Trace extensions. See Table 3-8.

When CPUID executes with EAX set to 14H and ECX = n (n > 0 and less than the number of non-zero bits in
CPUID.(EAX=14H, ECX= 0H).EAX), the processor returns information about packet generation in Intel Processor
Trace. See Table 3-8.

INPUT EAX = 15H: Returns Time Stamp Counter and Nominal Core Crystal Clock Information

When CPUID executes with EAX set to 15H and ECX = 0H, the processor returns information about Time Stamp
Counter and Core Crystal Clock. See Table 3-8.

INPUT EAX = 16H: Returns Processor Frequency Information

When CPUID executes with EAX set to 16H, the processor returns information about Processor Frequency Informa-
tion. See Table 3-8.

INPUT EAX = 17H: Returns System-On-Chip Information
When CPUID executes with EAX set to 17H, the processor returns information about the System-On-Chip Vendor
Attribute Enumeration. See Table 3-8.

INPUT EAX = 18H: Returns Deterministic Address Translation Parameters Information

When CPUID executes with EAX set to 18H, the processor returns information about the Deterministic Address
Translation Parameters. See Table 3-8.

METHODS FOR RETURNING BRANDING INFORMATION

Use the following techniques to access branding information:

1. Processor brand string method.

2. Processor brand index; this method uses a software supplied brand string table.

These two methods are discussed in the following sections. For methods that are available in early processors, see
Section: “Identification of Earlier IA-32 Processors” in Chapter 19 of the Intel® 64 and IA-32 Architectures Soft-
ware Developer’s Manual, Volume 1.

The Processor Brand String Method

Figure 3-9 describes the algorithm used for detection of the brand string. Processor brand identification software
should execute this algorithm on all Intel 64 and IA-32 processors.

This method (introduced with Pentium 4 processors) returns an ASCII brand identification string and the Processor
Base frequency of the processor to the EAX, EBX, ECX, and EDX registers.
<table>
	<tr>
		<td><b>Input: EAX= 0x80000000 CPUID IF (EAX & 0x80000000) False Processor Brand String Not Supported CPUID Function Supported True ≥ Extended EAX Return Value = Max. Extended CPUID Function Index IF (EAX Return Value ≥ 0x80000004) True Processor Brand String Supported OM15194</b></td>
	</tr>
</table>

Figure 3-9.  Determination of Support for the Processor Brand String

How Brand Strings Work
To use the brand string method, execute CPUID with EAX input of 8000002H through 80000004H. For each input
value, CPUID returns 16 ASCII characters using EAX, EBX, ECX, and EDX. The returned string will be NULL-termi-
nated.
Table 3-13 shows the brand string that is returned by the first processor in the Pentium 4 processor family.

Table 3-13.  Processor Brand String Returned with Pentium 4 Processor
<table>
	<tr>
		<td><b>EAX Input Value</b></td>
		<td><b>Return Values</b></td>
		<td><b>ASCII Equivalent</b></td>
	</tr>
	<tr>
		<td>80000002H</td>
		<td>EAX = 20202020H EBX = 20202020H ECX = 20202020H EDX = 6E492020H</td>
		<td>” “ ” “ “ ” “nI  ”</td>
	</tr>
	<tr>
		<td>80000003H</td>
		<td>EAX = 286C6574H EBX = 50202952H ECX = 69746E65H EDX = 52286D75H</td>
		<td>“(let” “P )R” “itne” “R(mu”</td>
	</tr>
	<tr>
		<td>80000004H</td>
		<td>EAX = 20342029H EBX = 20555043H ECX = 30303531H EDX = 007A484DH</td>
		<td>“ 4 )” “ UPC” “0051” “\0zHM”</td>
	</tr>
</table>

Extracting the Processor Frequency from Brand Strings

Figure 3-10 provides an algorithm which software can use to extract the Processor Base frequency from the
processor brand string.
<table>
	<tr>
		<td><b>Scan "Brand String" in Reverse Byte Order "zHM", or "zHG", or "zHT" Match Substring IF Substring Matched False Report Error Determine "Freq" and "Multiplier" True Determine "Multiplier" If "zHM" If "zHG" If "zHT" Determine "Freq" Scan Digits Until Blank In Reverse Order Multiplier = 1 x 106 Multiplier = 1 x 109 Multiplier = 1 x 1012 Reverse Digits To Decimal Value Processor Base Frequency = "Freq" x "Multiplier" "Freq" = X.YZ if Digits = "ZY.X" OM15195</b></td>
	</tr>
</table>

Figure 3-10.  Algorithm for Extracting Processor Frequency
The Processor Brand Index Method
The brand index method (introduced with Pentium® III Xeon® processors) provides an entry point into a brand
identification table that is maintained in memory by system software and is accessible from system- and user-level
code. In this table, each brand index is associate with an ASCII brand identification string that identifies the official
Intel family and model number of a processor.

When CPUID executes with EAX set to 1, the processor returns a brand index to the low byte in EBX. Software can
then use this index to locate the brand identification string for the processor in the brand identification table. The
first entry (brand index 0) in this table is reserved, allowing for backward compatibility with processors that do not
support the brand identification feature. Starting with processor signature family ID = 0FH, model = 03H, brand
index method is no longer supported. Use brand string method instead.

Table 3-14 shows brand indices that have identification strings associated with them.

Table 3-14.  Mapping of Brand Indices; and Intel 64 and IA-32 Processor Brand Strings
<table>
	<tr>
		<td><b>Brand Index</b></td>
		<td><b>Brand String</b></td>
	</tr>
	<tr>
		<td>00H</td>
		<td>This processor does not support the brand identification feature</td>
	</tr>
	<tr>
		<td>01H</td>
		<td>Intel(R) Celeron(R) processor1</td>
	</tr>
	<tr>
		<td>02H</td>
		<td>Intel(R) Pentium(R) III processor1</td>
	</tr>
	<tr>
		<td>03H</td>
		<td>Intel(R) Pentium(R) III Xeon(R) processor; If processor signature = 000006B1h, then Intel(R) Celeron(R) processor</td>
	</tr>
	<tr>
		<td>04H</td>
		<td>Intel(R) Pentium(R) III processor</td>
	</tr>
	<tr>
		<td>06H</td>
		<td>Mobile Intel(R) Pentium(R) III processor-M</td>
	</tr>
	<tr>
		<td>07H</td>
		<td>Mobile Intel(R) Celeron(R) processor1</td>
	</tr>
	<tr>
		<td>08H</td>
		<td>Intel(R) Pentium(R) 4 processor</td>
	</tr>
	<tr>
		<td>09H</td>
		<td>Intel(R) Pentium(R) 4 processor</td>
	</tr>
	<tr>
		<td>0AH</td>
		<td>Intel(R) Celeron(R) processor1</td>
	</tr>
	<tr>
		<td>0BH</td>
		<td>Intel(R) Xeon(R) processor; If processor signature = 00000F13h, then Intel(R) Xeon(R) processor MP</td>
	</tr>
	<tr>
		<td>0CH</td>
		<td>Intel(R) Xeon(R) processor MP</td>
	</tr>
	<tr>
		<td>0EH</td>
		<td>Mobile Intel(R) Pentium(R) 4 processor-M; If processor signature = 00000F13h, then Intel(R) Xeon(R) processor</td>
	</tr>
	<tr>
		<td>0FH</td>
		<td>Mobile Intel(R) Celeron(R) processor1</td>
	</tr>
	<tr>
		<td>11H</td>
		<td>Mobile Genuine Intel(R) processor</td>
	</tr>
	<tr>
		<td>12H</td>
		<td>Intel(R) Celeron(R) M processor</td>
	</tr>
	<tr>
		<td>13H</td>
		<td>Mobile Intel(R) Celeron(R) processor1</td>
	</tr>
	<tr>
		<td>14H</td>
		<td>Intel(R) Celeron(R) processor</td>
	</tr>
	<tr>
		<td>15H</td>
		<td>Mobile Genuine Intel(R) processor</td>
	</tr>
	<tr>
		<td>16H</td>
		<td>Intel(R) Pentium(R) M processor</td>
	</tr>
	<tr>
		<td>17H</td>
		<td>Mobile Intel(R) Celeron(R) processor1</td>
	</tr>
	<tr>
		<td>18H – 0FFH</td>
		<td>RESERVED</td>
	</tr>
</table>

NOTES:
1. Indicates versions of these processors that were introduced after the Pentium III

### IA-32 Architecture Compatibility

CPUID is not supported in early models of the Intel486 processor or in any IA-32 processor earlier than the
Intel486 processor.

### Operation

```java
IA32_BIOS_SIGN_ID MSR ← Update with installed microcode revision number;
CASE (EAX) OF
    EAX = 0:
        EAX ← Highest basic function input value understood by CPUID;
        EBX ← Vendor identification string;
        EDX ← Vendor identification string;
        ECX ← Vendor identification string;
    BREAK;
    EAX = 1H:
        EAX[3:0] ← Stepping ID; 
        EAX[7:4] ← Model; 
        EAX[11:8] ← Family; 
        EAX[13:12] ← Processor type; 
        EAX[15:14] ← Reserved;
        EAX[19:16] ← Extended Model;
        EAX[27:20] ← Extended Family;
        EAX[31:28] ← Reserved;
        EBX[7:0] ← Brand Index; (* Reserved if the value is zero. *)
        EBX[15:8] ← CLFLUSH Line Size;
        EBX[16:23] ← Reserved; (* Number of threads enabled = 2 if MT enable fuse set. *)
        EBX[24:31] ← Initial APIC ID;
        ECX ← Feature flags; (* See Figure 3-7. *)
        EDX ← Feature flags; (* See Figure 3-8. *)
    BREAK;
    EAX = 2H:
        EAX ← Cache and TLB information; 
        EBX ← Cache and TLB information; 
 
        ECX ← Cache and TLB information; 
 
        EDX ← Cache and TLB information; 
    BREAK;
    EAX = 3H:
        EAX ← Reserved; 
        EBX ← Reserved; 
 
        ECX ← ProcessorSerialNumber[31:0]; 
 
        (* Pentium III processors only, otherwise reserved. *)
        EDX ← ProcessorSerialNumber[63:32]; 
        (* Pentium III processors only, otherwise reserved. *
    BREAK
    EAX = 4H:
        EAX ← Deterministic Cache Parameters Leaf; (* See Table 3-8. *)
        EBX ← Deterministic Cache Parameters Leaf; 
        ECX ← Deterministic Cache Parameters Leaf; 
 
        EDX ← Deterministic Cache Parameters Leaf; 
    BREAK;
    EAX = 5H:
        EAX ← MONITOR/MWAIT Leaf; (* See Table 3-8. *)
        EBX ← MONITOR/MWAIT Leaf; 
 
        ECX ← MONITOR/MWAIT Leaf; 
 
        EDX ← MONITOR/MWAIT Leaf; 
    BREAK;
    EAX = 6H:
        EAX ← Thermal and Power Management Leaf; (* See Table 3-8. *)
        EBX ← Thermal and Power Management Leaf; 
 
        ECX ← Thermal and Power Management Leaf; 
 
        EDX ← Thermal and Power Management Leaf; 
    BREAK;
    EAX = 7H:
        EAX ← Structured Extended Feature Flags Enumeration Leaf; (* See Table 3-8. *)
        EBX ← Structured Extended Feature Flags Enumeration Leaf; 
        ECX ← Structured Extended Feature Flags Enumeration Leaf; 
 
        EDX ← Structured Extended Feature Flags Enumeration Leaf; 
    BREAK;
    EAX = 8H:
        EAX ← Reserved = 0;
        EBX ← Reserved = 0; 
 
        ECX ← Reserved = 0; 
 
        EDX ← Reserved = 0; 
    BREAK;
    EAX = 9H:
        EAX ← Direct Cache Access Information Leaf; (* See Table 3-8. *)
        EBX ← Direct Cache Access Information Leaf; 
 
        ECX ← Direct Cache Access Information Leaf; 
 
        EDX ← Direct Cache Access Information Leaf; 
    BREAK;
    EAX = AH:
        EAX ← Architectural Performance Monitoring Leaf; (* See Table 3-8. *)
        EBX ← Architectural Performance Monitoring Leaf; 
 
        ECX ← Architectural Performance Monitoring Leaf; 
 
        EDX ← Architectural Performance Monitoring Leaf; 
        BREAK
    EAX = BH:
        EAX ← Extended Topology Enumeration Leaf; (* See Table 3-8. *)
        EBX ← Extended Topology Enumeration Leaf; 
        ECX ← Extended Topology Enumeration Leaf; 
 
        EDX ← Extended Topology Enumeration Leaf; 
    BREAK;
    EAX = CH:
        EAX ← Reserved = 0;
        EBX ← Reserved = 0; 
 
        ECX ← Reserved = 0; 
 
        EDX ← Reserved = 0; 
    BREAK;
    EAX = DH:
        EAX ← Processor Extended State Enumeration Leaf; (* See Table 3-8. *)
        EBX ← Processor Extended State Enumeration Leaf; 
 
        ECX ← Processor Extended State Enumeration Leaf; 
 
        EDX ← Processor Extended State Enumeration Leaf; 
    BREAK;
    EAX = EH:
        EAX ← Reserved = 0;
        EBX ← Reserved = 0; 
 
        ECX ← Reserved = 0; 
 
        EDX ← Reserved = 0; 
    BREAK;
    EAX = FH:
        EAX ← Intel Resource Director Technology Monitoring Enumeration Leaf; (* See Table 3-8. *)
        EBX ← Intel Resource Director Technology Monitoring Enumeration Leaf; 
 
        ECX ← Intel Resource Director Technology Monitoring Enumeration Leaf; 
 
        EDX ← Intel Resource Director Technology Monitoring Enumeration Leaf; 
    BREAK;
    EAX = 10H:
        EAX ← Intel Resource Director Technology Allocation Enumeration Leaf; (* See Table 3-8. *)
        EBX ← Intel Resource Director Technology Allocation Enumeration Leaf; 
 
        ECX ← Intel Resource Director Technology Allocation Enumeration Leaf; 
 
        EDX ← Intel Resource Director Technology Allocation Enumeration Leaf; 
    BREAK;
        EAX = 12H:
        EAX ← Intel SGX Enumeration Leaf; (* See Table 3-8. *)
        EBX ← Intel SGX Enumeration Leaf; 
 
        ECX ← Intel SGX Enumeration Leaf; 
 
        EDX ← Intel SGX Enumeration Leaf; 
    BREAK;
    EAX = 14H:
        EAX ← Intel Processor Trace Enumeration Leaf; (* See Table 3-8. *)
        EBX ← Intel Processor Trace Enumeration Leaf; 
 
        ECX ← Intel Processor Trace Enumeration Leaf; 
 
        EDX ← Intel Processor Trace Enumeration Leaf; 
    BREAK;
    EAX = 15H:
        EAX ← Time Stamp Counter and Nominal Core Crystal Clock Information Leaf; (* See Table 3-8. *)
        EBX ← Time Stamp Counter and Nominal Core Crystal Clock Information Leaf; 
 
        ECX ← Time Stamp Counter and Nominal Core Crystal Clock Information Leaf; 
 
        EDX ← Time Stamp Counter and Nominal Core Crystal Clock Information Leaf; 
    BREAK;
    EAX = 16H:
        EAX ← Processor Frequency Information Enumeration Leaf; (* See Table 3-8. *)
        EBX ← Processor Frequency Information Enumeration Leaf; 
 
        ECX ← Processor Frequency Information Enumeration Leaf; 
 
        EDX ← Processor Frequency Information Enumeration Leaf; 
    BREAK;
    EAX = 17H:
        EAX ← System-On-Chip Vendor Attribute Enumeration Leaf; (* See Table 3-8. *)
        EBX ← System-On-Chip Vendor Attribute Enumeration Leaf; 
 
        ECX ← System-On-Chip Vendor Attribute Enumeration Leaf; 
 
        EDX ← System-On-Chip Vendor Attribute Enumeration Leaf; 
    BREAK;
        EAX = 18H:
        EAX ← Deterministic Address Translation Parameters Enumeration Leaf; (* See Table 3-8. *)
        EBX ← Deterministic Address Translation Parameters Enumeration Leaf; 
 
        ECX ←Deterministic Address Translation Parameters Enumeration Leaf; 
 
        EDX ← Deterministic Address Translation Parameters Enumeration Leaf; 
    BREAK;
    EAX = 80000000H:
        EAX ← Highest extended function input value understood by CPUID;
        EBX ← Reserved; 
        ECX ← Reserved; 
        EDX ← Reserved; 
    BREAK;
    EAX = 80000001H:
        EAX ← Reserved; 
        EBX ← Reserved; 
        ECX ← Extended Feature Bits (* See Table 3-8.*); 
        EDX ← Extended Feature Bits (* See Table 3-8. *); 
    BREAK;
    EAX = 80000002H:
        EAX ← Processor Brand String; 
        EBX ← Processor Brand String, continued;
        ECX ← Processor Brand String, continued; 
        EDX ← Processor Brand String, continued; 
    BREAK;
    EAX = 80000003H:
        EAX ← Processor Brand String, continued; 
        EBX ← Processor Brand String, continued; 
        ECX ← Processor Brand String, continued; 
        EDX ← Processor Brand String, continued; 
    BREAK;
    EAX = 80000004H:
        EAX ← Processor Brand String, continued; 
        EBX ← Processor Brand String, continued; 
        ECX ← Processor Brand String, continued; 
        EDX ← Processor Brand String, continued;
    BREAK;
    EAX = 80000005H:
        EAX ← Reserved = 0; 
        EBX ← Reserved = 0; 
        ECX ← Reserved = 0; 
        EDX ← Reserved = 0; 
    BREAK;
    EAX = 80000006H:
        EAX ← Reserved = 0; 
        EBX ← Reserved = 0; 
        ECX ← Cache information; 
        EDX ← Reserved = 0; 
    BREAK;
    EAX = 80000007H:
        EAX ← Reserved = 0; 
        EBX ← Reserved = 0; 
        ECX ← Reserved = 0; 
        EDX ← Reserved = Misc Feature Flags; 
    BREAK;
    EAX = 80000008H:
        EAX ← Reserved = Physical Address Size Information; 
        EBX ← Reserved = Virtual Address Size Information; 
        ECX ← Reserved = 0; 
        EDX ← Reserved = 0; 
    BREAK;
    EAX >= 40000000H and EAX <= 4FFFFFFFH:
    DEFAULT: (* EAX = Value outside of recognized range for CPUID. *)
        (* If the highest basic information leaf data depend on ECX input value, ECX is honored.*)
        EAX ← Reserved; (* Information returned for highest basic information leaf. *)
        EBX ← Reserved; (* Information returned for highest basic information leaf. *)
        ECX ← Reserved; (* Information returned for highest basic information leaf. *)
        EDX ← Reserved; (* Information returned for highest basic information leaf. *)
    BREAK;
ESAC;
```
### Flags Affected
None.

### Exceptions (All Operating Modes)

<p>#UD
If the LOCK prefix is used.
In earlier IA-32 processors that do not support the CPUID instruction, execution of the instruction
 results in an invalid opcode (<p>#UD) exception being generated.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
