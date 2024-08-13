<b>RDRAND</b> — Read Random Number
<table>
	<tr>
		<td><b>Opcode*/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>0F C7 /6 RDRAND r16</td>
		<td>M</td>
		<td>V/V</td>
		<td>RDRAND</td>
		<td>Read a 16-bit random number and store in the destination register.</td>
	</tr>
	<tr>
		<td>0F C7 /6 RDRAND r32</td>
		<td>M</td>
		<td>V/V</td>
		<td>RDRAND</td>
		<td>Read a 32-bit random number and store in the destination register.</td>
	</tr>
	<tr>
		<td>REX.W + 0F C7 /6 RDRAND r64</td>
		<td>M</td>
		<td>V/I</td>
		<td>RDRAND</td>
		<td>Read a 64-bit random number and store in the destination register.</td>
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
		<td>M</td>
		<td>ModRM:r/m (w)</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Loads a hardware generated random value and store it in the destination register. The size of the random value is
determined by the destination register size and operating mode. The Carry Flag indicates whether a random value
is available at the time the instruction is executed. CF=1 indicates that the data in the destination is valid. Other-
wise CF=0 and the data in the destination operand will be returned as zeros for the specified width. All other flags
are forced to 0 in either situation. Software must check the state of CF=1 for determining if a valid random value
has been returned, otherwise it is expected to loop and retry execution of RDRAND (see Intel® 64 and IA-32 Archi-
tectures Software Developer’s Manual, Volume 1, Section 7.3.17, “Random Number Generator Instructions”).

This instruction is available at all privilege levels.

In 64-bit mode, the instruction's default operation size is 32 bits. Using a REX prefix in the form of REX.B permits
access to additional registers (R8-R15). Using a REX prefix in the form of REX.W promotes operation to 64 bit operands
. See the summary chart at the beginning of this section for encoding data and limits.

### Operation

```java
IF HW_RND_GEN.ready = 1
    THEN 
        CASE of
            osize is 64: DEST[63:0] ← HW_RND_GEN.data;
            osize is 32: DEST[31:0] ← HW_RND_GEN.data;
            osize is 16: DEST[15:0] ← HW_RND_GEN.data;
        ESAC
        CF ← 1;
    ELSE
        CASE of
            osize is 64: DEST[63:0] ← 0;
            osize is 32: DEST[31:0] ← 0;
            osize is 16: DEST[15:0] ← 0;
        ESAC
        CF ← 0;
FI
OF, SF, ZF, AF, PF ← 0;
```
### Flags Affected

The CF flag is set according to the result (see the “Operation” section above). The OF, SF, ZF, AF, and PF flags are
set to 0.

### Intel C/C++ Compiler Intrinsic Equivalent
```c
RDRAND:
 int _rdrand16_step( unsigned short * );
RDRAND:
 int _rdrand32_step( unsigned int * );
RDRAND:
 int _rdrand64_step( unsigned __int64 *);
```
### Protected Mode Exceptions
<p>#UD
If the LOCK prefix is used.
If the F2H or F3H prefix is used.
If CPUID.01H:ECX.RDRAND[bit 30] = 0.

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