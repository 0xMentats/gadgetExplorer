<b>POPF / POPFD / POPFQ</b> — Pop Stack into EFLAGS Register
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
		<td>9D</td>
		<td>POPF</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Pop top of stack into lower 16 bits of EFLAGS.</td>
	</tr>
	<tr>
		<td>9D</td>
		<td>POPFD</td>
		<td>ZO</td>
		<td>N.E.</td>
		<td>Valid</td>
		<td>Pop top of stack into EFLAGS.</td>
	</tr>
	<tr>
		<td>9D</td>
		<td>POPFQ</td>
		<td>ZO</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Pop top of stack and zero-extend into RFLAGS.</td>
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
Pops a doubleword (POPFD) from the top of the stack (if the current operand-size attribute is 32) and stores the
value in the EFLAGS register, or pops a word from the top of the stack (if the operand-size attribute is 16) and
stores it in the lower 16 bits of the EFLAGS register (that is, the FLAGS register). These instructions reverse the
operation of the PUSHF/PUSHFD/PUSHFQ instructions.

The POPF (pop flags) and POPFD (pop flags double) mnemonics reference the same opcode. The POPF instruction
is intended for use when the operand-size attribute is 16; the POPFD instruction is intended for use when the
operand-size attribute is 32. Some assemblers may force the operand size to 16 for POPF and to 32 for POPFD.
Others may treat the mnemonics as synonyms (POPF/POPFD) and use the setting of the operand-size attribute to
determine the size of values to pop from the stack.

The effect of POPF/POPFD on the EFLAGS register changes, depending on the mode of operation. See Table 4-15
and the key below for details.

When operating in protected, compatibility, or 64-bit mode at privilege level 0 (or in real-address mode, the equiv-
alent to privilege level 0), all non-reserved flags in the EFLAGS register except RF1, VIP, VIF, and VM may be modi-
fied. VIP, VIF and VM remain unaffected.

When operating in protected, compatibility, or 64-bit mode with a privilege level greater than 0, but less than or
equal to IOPL, all flags can be modified except the IOPL field and RF, IF, VIP, VIF, and VM; these remain unaffected.
The AC and ID flags can only be modified if the operand-size attribute is 32. The interrupt flag (IF) is altered only
when executing at a level at least as privileged as the IOPL. If a POPF/POPFD instruction is executed with insuffi-
cient privilege, an exception does not occur but privileged bits do not change.

When operating in virtual-8086 mode (EFLAGS.VM = 1) without the virtual-8086 mode extensions (CR4.VME = 0),
the POPF/POPFD instructions can be used only if IOPL = 3; otherwise, a general-protection exception (\#GP)
occurs. If the virtual-8086 mode extensions are enabled (CR4.VME = 1), POPF (but not POPFD) can be executed in
virtual-8086 mode with IOPL < 3.

(The protected-mode virtual-interrupt feature — enabled by setting CR4.PVI — affects the CLI and STI instructions
in the same manner as the virtual-8086 mode extensions. POPF, however, is not affected by CR4.PVI.)

In 64-bit mode, the mnemonic assigned is POPFQ (note that the 32-bit operand is not encodable). POPFQ pops 64
bits from the stack. Reserved bits of RFLAGS (including the upper 32 bits of RFLAGS) are not affected.

See Chapter 3 of the Intel® 64 and IA-32 Architectures Software Developer’s Manual, Volume 1, for more informa-
tion about the EFLAGS registers.

1. RF is always zero after the execution of POPF. This is because POPF, like all instructions, clears RF as it begins to execute.
Table 4-15.  Effect of POPF/POPFD on the EFLAGS Register
<table>
	<tr>
		<td rowspan=3><b>Mode</b></td>
		<td rowspan=3><b>Operand Size</b></td>
		<td rowspan=3><b>CPL</b></td>
		<td rowspan=3><b>IOPL</b></td>
		<td colspan=17><b>Flags</b></td>
		<td rowspan=3><b>Notes</b></td>
	</tr>
	<tr>
		<td>21</td>
		<td>20</td>
		<td>19</td>
		<td>18 17 16 14 13:12 11</td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td>10</td>
		<td>9</td>
		<td>8</td>
		<td>7</td>
		<td>6</td>
		<td>4</td>
		<td>2</td>
		<td>0</td>
	</tr>
	<tr>
		<td>ID VIP VIF AC VM RF NT</td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td>IOPL</td>
		<td>OF DF</td>
		<td></td>
		<td>IF</td>
		<td>TF</td>
		<td>SF ZF AF PF</td>
		<td></td>
		<td></td>
		<td></td>
		<td>CF</td>
	</tr>
	<tr>
		<td rowspan=2>Real-Address Mode (CR0.PE = 0)</td>
		<td>16</td>
		<td>0</td>
		<td>0-3</td>
		<td>N</td>
		<td>N</td>
		<td>N</td>
		<td>N</td>
		<td>N</td>
		<td>0</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td></td>
	</tr>
	<tr>
		<td>32</td>
		<td>0</td>
		<td>0-3</td>
		<td>S</td>
		<td>N</td>
		<td>N</td>
		<td>S</td>
		<td>N</td>
		<td>0</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td></td>
	</tr>
	<tr>
		<td rowspan=6>Protected, Compatibility, and 64-Bit Modes (CR0.PE = 1 EFLAGS.VM = 0)</td>
		<td>16</td>
		<td>0</td>
		<td>0-3</td>
		<td>N</td>
		<td>N</td>
		<td>N</td>
		<td>N</td>
		<td>N</td>
		<td>0</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td></td>
	</tr>
	<tr>
		<td>16</td>
		<td>1-3</td>
		<td><CPL</td>
		<td>N</td>
		<td>N</td>
		<td>N</td>
		<td>N</td>
		<td>N</td>
		<td>0</td>
		<td>S</td>
		<td>N</td>
		<td>S</td>
		<td>S</td>
		<td>N</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td></td>
	</tr>
	<tr>
		<td>16</td>
		<td>1-3</td>
		<td>≥CPL</td>
		<td>N</td>
		<td>N</td>
		<td>N</td>
		<td>N</td>
		<td>N</td>
		<td>0</td>
		<td>S</td>
		<td>N</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td></td>
	</tr>
	<tr>
		<td>32, 64</td>
		<td>0</td>
		<td>0-3</td>
		<td>S</td>
		<td>N</td>
		<td>N</td>
		<td>S</td>
		<td>N</td>
		<td>0</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td></td>
	</tr>
	<tr>
		<td>32, 64</td>
		<td>1-3</td>
		<td><CPL</td>
		<td>S</td>
		<td>N</td>
		<td>N</td>
		<td>S</td>
		<td>N</td>
		<td>0</td>
		<td>S</td>
		<td>N</td>
		<td>S</td>
		<td>S</td>
		<td>N</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td></td>
	</tr>
	<tr>
		<td>32, 64</td>
		<td>1-3</td>
		<td>≥CPL</td>
		<td>S</td>
		<td>N</td>
		<td>N</td>
		<td>S</td>
		<td>N</td>
		<td>0</td>
		<td>S</td>
		<td>N</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td></td>
	</tr>
	<tr>
		<td rowspan=4>Virtual-8086 (CR0.PE = 1 EFLAGS.VM = 1 CR4.VME = 0)</td>
		<td>16</td>
		<td>3</td>
		<td>0-2</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>1</td>
	</tr>
	<tr>
		<td>16</td>
		<td>3</td>
		<td>3</td>
		<td>N</td>
		<td>N</td>
		<td>N</td>
		<td>N</td>
		<td>N</td>
		<td>0</td>
		<td>S</td>
		<td>N</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td></td>
	</tr>
	<tr>
		<td>32</td>
		<td>3</td>
		<td>0-2</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>1</td>
	</tr>
	<tr>
		<td>32</td>
		<td>3</td>
		<td>3</td>
		<td>S</td>
		<td>N</td>
		<td>N</td>
		<td>S</td>
		<td>N</td>
		<td>0</td>
		<td>S</td>
		<td>N</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td></td>
	</tr>
	<tr>
		<td rowspan=4>VME (CR0.PE = 1 EFLAGS.VM = 1 CR4.VME = 1)</td>
		<td>16</td>
		<td>3</td>
		<td>0-2</td>
		<td>N/ X</td>
		<td>N/ X</td>
		<td>SV/ X</td>
		<td>N/ X</td>
		<td>N/ X</td>
		<td>0/ X</td>
		<td>S/ X</td>
		<td>N/X</td>
		<td>S/ X</td>
		<td>S/ X</td>
		<td>N/ X</td>
		<td>S/ X</td>
		<td>S/ X</td>
		<td>S/ X</td>
		<td>S/ X</td>
		<td>S/ X</td>
		<td>S/ X</td>
		<td>2,3</td>
	</tr>
	<tr>
		<td>16</td>
		<td>3</td>
		<td>3</td>
		<td>N</td>
		<td>N</td>
		<td>N</td>
		<td>N</td>
		<td>N</td>
		<td>0</td>
		<td>S</td>
		<td>N</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td></td>
	</tr>
	<tr>
		<td>32</td>
		<td>3</td>
		<td>0-2</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>X</td>
		<td>1</td>
	</tr>
	<tr>
		<td>32</td>
		<td>3</td>
		<td>3</td>
		<td>S</td>
		<td>N</td>
		<td>N</td>
		<td>S</td>
		<td>N</td>
		<td>0</td>
		<td>S</td>
		<td>N</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td>S</td>
		<td></td>
	</tr>
</table>

NOTES:
1. \#GP fault - no flag update
2. \#GP fault with no flag update if VIP=1 in EFLAGS register and IF=1 in FLAGS value on stack
3. \#GP fault with no flag update if TF=1 in FLAGS value on stack
<table>
	<tr>
		<td colspan=2 rowspan=6><b>Key S SV N X 0 Updated from stack Updated from IF (bit 9) in FLAGS value on stack No change in value No EFLAGS update Value is cleared</b></td>
	</tr>
	<tr>
		<td>S</td>
		<td>Updated from stack</td>
	</tr>
	<tr>
		<td>SV</td>
		<td>Updated from IF (bit 9) in FLAGS value on stack</td>
	</tr>
	<tr>
		<td>N</td>
		<td>No change in value</td>
	</tr>
	<tr>
		<td>X</td>
		<td>No EFLAGS update</td>
	</tr>
	<tr>
		<td>0</td>
		<td>Value is cleared</td>
	</tr>
</table>


### Operation

```java
IF EFLAGS.VM = 0 (* Not in Virtual-8086 Mode *)
    THEN IF CPL = 0 OR CR0.PE = 0
        THEN
            IF OperandSize = 32;
                THEN 
                    EFLAGS ← Pop(); (* 32-bit pop *)
                    (* All non-reserved flags except RF, VIP, VIF, and VM can be modified; 
                    VIP, VIF, VM, and all reserved bits are unaffected. RF is cleared. *)
                ELSE IF (Operandsize = 64)
                    RFLAGS = Pop(); (* 64-bit pop *)
                    (* All non-reserved flags except RF, VIP, VIF, and VM can be modified; 
                    VIP, VIF, VM, and all reserved bits are unaffected. RF is cleared. *)
                ELSE (* OperandSize = 16 *)
                    EFLAGS[15:0] ← Pop(); (* 16-bit pop *)
                    (* All non-reserved flags can be modified. *)
            FI;
        ELSE (* CPL > 0 *)
            IF OperandSize = 32
                THEN 
                    IF CPL > IOPL
                        THEN
                            EFLAGS ← Pop(); (* 32-bit pop *)
                            (* All non-reserved bits except IF, IOPL, VIP, VIF, VM and RF can be modified; 
                            IF, IOPL, VIP, VIF, VM and all reserved bits are unaffected; RF is cleared. *)
                        ELSE
                            EFLAGS ← Pop(); (* 32-bit pop *)
                            (* All non-reserved bits except IOPL, VIP, VIF, VM and RF can be modified; 
                            IOPL, VIP, VIF, VM and all reserved bits are unaffected; RF is cleared. *)
                    FI;
                ELSE IF (Operandsize = 64)
                    IF CPL > IOPL
                        THEN
                            RFLAGS ← Pop(); (* 64-bit pop *)
                            (* All non-reserved bits except IF, IOPL, VIP, VIF, VM and RF can be modified; 
                            IF, IOPL, VIP, VIF, VM and all reserved bits are unaffected; RF is cleared. *)
                        ELSE
                            RFLAGS ← Pop(); (* 64-bit pop *)
                            (* All non-reserved bits except IOPL, VIP, VIF, VM and RF can be modified; 
                            IOPL, VIP, VIF, VM and all reserved bits are unaffected; RF is cleared. *)
                    FI;
                ELSE (* OperandSize = 16 *)
                    EFLAGS[15:0] ← Pop(); (* 16-bit pop *)
                    (* All non-reserved bits except IOPL can be modified; IOPL and all
                    reserved bits are unaffected. *)
            FI;
        FI;
    ELSE (* In virtual-8086 mode *)
        IF IOPL = 3
            THEN
                IF OperandSize = 32 
                    THEN 
                        EFLAGS ← Pop();
                        (* All non-reserved bits except IOPL, VIP, VIF, VM, and RF can be modified; 
                        VIP, VIF, VM, IOPL and all reserved bits are unaffected. RF is cleared. *)
                    ELSE 
                        EFLAGS[15:0] ← Pop(); FI;
                        (* All non-reserved bits except IOPL can be modified; IOPL and all reserved bits are unaffected. *)
                FI;
            ELSE (* IOPL < 3 *)
                IF (Operandsize = 32) OR (CR4.VME = 0)
                    THEN #GP(0); (* Trap to virtual-8086 monitor. *)
                    ELSE (* Operandsize = 16 and CR4.VME = 1 *)
                        tempFLAGS ← Pop();
                        IF (EFLAGS.VIP = 1 AND tempFLAGS[9] = 1) OR tempFLAGS[8] = 1
      
                            THEN #GP(0);
      
                            ELSE
                            EFLAGS.VIF ← tempFLAGS[9];
                  
                            EFLAGS[15:0] ← tempFLAGS;
                  
                  
                            (* All non-reserved bits except IOPL and IF can be modified;
                            IOPL, IF, and all reserved bits are unaffected. *)
                        FI;
                FI;
        FI;
FI;
```
### Flags Affected
All flags may be affected; see the Operation section for details.

### Protected Mode Exceptions

<p>#SS(0)
If the top of stack is not within the stack segment.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If an unaligned memory reference is made while CPL = 3 and alignment checking is enabled.
<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#SS
If the top of stack is not within the stack segment.
<p>#UD
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

<p>#GP(0)
If IOPL < 3 and VME is not enabled.
If IOPL < 3 and the 32-bit operand size is used.
If IOPL < 3, EFLAGS.VIP = 1, and bit 9 (IF) is set in the FLAGS value on the stack.
If IOPL < 3 and bit 8 (TF) is set in the FLAGS value on the stack.
If an attempt is made to execute the POPF/POPFD instruction with an operand-size override
prefix.
<p>#SS(0)
If the top of stack is not within the stack segment.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If an unaligned memory reference is made while alignment checking is enabled.
<p>#UD
If the LOCK prefix is used.

### Compatibility Mode Exceptions

Same as for protected mode exceptions.

### 64-Bit Mode Exceptions

<p>#GP(0)
If the memory address is in a non-canonical form.
<p>#SS(0)
If the stack address is in a non-canonical form.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.
<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
