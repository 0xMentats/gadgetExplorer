<b>LEA</b> — Load Effective Address
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
		<td>8D /r</td>
		<td>LEA r16,m</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Store effective address for m in register r16.</td>
	</tr>
	<tr>
		<td>8D /r</td>
		<td>LEA r32,m</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Store effective address for m in register r32.</td>
	</tr>
	<tr>
		<td>REX.W + 8D /r</td>
		<td>LEA r64,m</td>
		<td>RM</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Store effective address for m in register r64.</td>
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
		<td>RM</td>
		<td>ModRM:reg (w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Computes the effective address of the second operand (the source operand) and stores it in the first operand
(destination operand). The source operand is a memory address (offset part) specified with one of the processors
addressing modes; the destination operand is a general-purpose register. The address-size and operand-size attributes
affect the action performed by this instruction, as shown in the following table. The operand-size attribute of
the instruction is determined by the chosen register; the address-size attribute is determined by the attribute of
the code segment.

Table 3-53.  Non-64-bit Mode LEA Operation with Address and Operand Size Attributes
<table>
	<tr>
		<td><b>Operand Size</b></td>
		<td><b>Address Size</b></td>
		<td><b>Action Performed</b></td>
	</tr>
	<tr>
		<td>16</td>
		<td>16</td>
		<td>16-bit effective address is calculated and stored in requested 16-bit register destination.</td>
	</tr>
	<tr>
		<td>16</td>
		<td>32</td>
		<td>32-bit effective address is calculated. The lower 16 bits of the address are stored in the requested 16-bit register destination.</td>
	</tr>
	<tr>
		<td>32</td>
		<td>16</td>
		<td>16-bit effective address is calculated. The 16-bit address is zero-extended and stored in the requested 32-bit register destination.</td>
	</tr>
	<tr>
		<td>32</td>
		<td>32</td>
		<td>32-bit effective address is calculated and stored in the requested 32-bit register destination.</td>
	</tr>
</table>

Different assemblers may use different algorithms based on the size attribute and symbolic reference of the source
operand.

In 64-bit mode, the instruction’s destination operand is governed by operand size attribute, the default operand
size is 32 bits. Address calculation is governed by address size attribute, the default address size is 64-bits. In 64-bit
 mode, address size of 16 bits is not encodable. See Table 3-54.

Table 3-54.  64-bit Mode LEA Operation with Address and Operand Size Attributes
<table>
	<tr>
		<td><b>Operand Size</b></td>
		<td><b>Address Size</b></td>
		<td><b>Action Performed</b></td>
	</tr>
	<tr>
		<td>16</td>
		<td>32</td>
		<td>32-bit effective address is calculated (using 67H prefix). The lower 16 bits of the address are stored in the requested 16-bit register destination (using 66H prefix).</td>
	</tr>
	<tr>
		<td>16</td>
		<td>64</td>
		<td>64-bit effective address is calculated (default address size). The lower 16 bits of the address are stored in the requested 16-bit register destination (using 66H prefix).</td>
	</tr>
	<tr>
		<td>32</td>
		<td>32</td>
		<td>32-bit effective address is calculated (using 67H prefix) and stored in the requested 32-bit register destination.</td>
	</tr>
	<tr>
		<td>32</td>
		<td>64</td>
		<td>64-bit effective address is calculated (default address size) and the lower 32 bits of the address are stored in the requested 32-bit register destination.</td>
	</tr>
	<tr>
		<td>64</td>
		<td>32</td>
		<td>32-bit effective address is calculated (using 67H prefix), zero-extended to 64-bits, and stored in the requested 64-bit register destination (using REX.W).</td>
	</tr>
	<tr>
		<td>64</td>
		<td>64</td>
		<td>64-bit effective address is calculated (default address size) and all 64-bits of the address are stored in the requested 64-bit register destination (using REX.W).</td>
	</tr>
</table>


### Operation

```java
IF OperandSize = 16 and AddressSize = 16
    THEN 
        DEST ← EffectiveAddress(SRC); (* 16-bit address *)
    ELSE IF OperandSize = 16 and AddressSize = 32
        THEN
            temp ← EffectiveAddress(SRC); (* 32-bit address *)
            DEST ← temp[0:15]; (* 16-bit address *)
        FI;
    ELSE IF OperandSize = 32 and AddressSize = 16
        THEN
            temp ← EffectiveAddress(SRC); (* 16-bit address *)
            DEST ← ZeroExtend(temp); (* 32-bit address *)
        FI;
    ELSE IF OperandSize = 32 and AddressSize = 32
        THEN 
            DEST ← EffectiveAddress(SRC); (* 32-bit address *)
        FI;
    ELSE IF OperandSize = 16 and AddressSize = 64
        THEN 
            temp ← EffectiveAddress(SRC); (* 64-bit address *)
            DEST ← temp[0:15]; (* 16-bit address *)
        FI;
    ELSE IF OperandSize = 32 and AddressSize = 64
        THEN 
            temp ← EffectiveAddress(SRC); (* 64-bit address *)
            DEST ← temp[0:31]; (* 16-bit address *)
        FI;
    ELSE IF OperandSize = 64 and AddressSize = 64
        THEN 
            DEST ← EffectiveAddress(SRC); (* 64-bit address *)
        FI;
FI;
```
### Flags Affected
None

### Protected Mode Exceptions

<p>#UD
If source operand is not a memory location.
If the LOCK prefix is used.

### Real-Address Mode Exceptions

Same exceptions as in protected mode.

### Virtual-8086 Mode Exceptions

Same exceptions as in protected mode.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

Same exceptions as in protected mode.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
