<b>Jcc</b> — Jump if Condition Is Met
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
		<td>77 cb</td>
		<td>JA rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if above (CF=0 and ZF=0).</td>
	</tr>
	<tr>
		<td>73 cb</td>
		<td>JAE rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if above or equal (CF=0).</td>
	</tr>
	<tr>
		<td>72 cb</td>
		<td>JB rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if below (CF=1).</td>
	</tr>
	<tr>
		<td>76 cb</td>
		<td>JBE rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if below or equal (CF=1 or ZF=1).</td>
	</tr>
	<tr>
		<td>72 cb</td>
		<td>JC rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if carry (CF=1).</td>
	</tr>
	<tr>
		<td>E3 cb</td>
		<td>JCXZ rel8</td>
		<td>D</td>
		<td>N.E.</td>
		<td>Valid</td>
		<td>Jump short if CX register is 0.</td>
	</tr>
	<tr>
		<td>E3 cb</td>
		<td>JECXZ rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if ECX register is 0.</td>
	</tr>
	<tr>
		<td>E3 cb</td>
		<td>JRCXZ rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Jump short if RCX register is 0.</td>
	</tr>
	<tr>
		<td>74 cb</td>
		<td>JE rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if equal (ZF=1).</td>
	</tr>
	<tr>
		<td>7F cb</td>
		<td>JG rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if greater (ZF=0 and SF=OF).</td>
	</tr>
	<tr>
		<td>7D cb</td>
		<td>JGE rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if greater or equal (SF=OF).</td>
	</tr>
	<tr>
		<td>7C cb</td>
		<td>JL rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if less (SF≠ OF).</td>
	</tr>
	<tr>
		<td>7E cb</td>
		<td>JLE rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if less or equal (ZF=1 or SF≠ OF).</td>
	</tr>
	<tr>
		<td>76 cb</td>
		<td>JNA rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if not above (CF=1 or ZF=1).</td>
	</tr>
	<tr>
		<td>72 cb</td>
		<td>JNAE rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if not above or equal (CF=1).</td>
	</tr>
	<tr>
		<td>73 cb</td>
		<td>JNB rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if not below (CF=0).</td>
	</tr>
	<tr>
		<td>77 cb</td>
		<td>JNBE rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if not below or equal (CF=0 and ZF=0).</td>
	</tr>
	<tr>
		<td>73 cb</td>
		<td>JNC rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if not carry (CF=0).</td>
	</tr>
	<tr>
		<td>75 cb</td>
		<td>JNE rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if not equal (ZF=0).</td>
	</tr>
	<tr>
		<td>7E cb</td>
		<td>JNG rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if not greater (ZF=1 or SF≠ OF).</td>
	</tr>
	<tr>
		<td>7C cb</td>
		<td>JNGE rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if not greater or equal (SF≠ OF).</td>
	</tr>
	<tr>
		<td>7D cb</td>
		<td>JNL rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if not less (SF=OF).</td>
	</tr>
	<tr>
		<td>7F cb</td>
		<td>JNLE rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if not less or equal (ZF=0 and SF=OF).</td>
	</tr>
	<tr>
		<td>71 cb</td>
		<td>JNO rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if not overflow (OF=0).</td>
	</tr>
	<tr>
		<td>7B cb</td>
		<td>JNP rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if not parity (PF=0).</td>
	</tr>
	<tr>
		<td>79 cb</td>
		<td>JNS rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if not sign (SF=0).</td>
	</tr>
	<tr>
		<td>75 cb</td>
		<td>JNZ rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if not zero (ZF=0).</td>
	</tr>
	<tr>
		<td>70 cb</td>
		<td>JO rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if overflow (OF=1).</td>
	</tr>
	<tr>
		<td>7A cb</td>
		<td>JP rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if parity (PF=1).</td>
	</tr>
	<tr>
		<td>7A cb</td>
		<td>JPE rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if parity even (PF=1).</td>
	</tr>
	<tr>
		<td>7B cb</td>
		<td>JPO rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if parity odd (PF=0).</td>
	</tr>
	<tr>
		<td>78 cb</td>
		<td>JS rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if sign (SF=1).</td>
	</tr>
	<tr>
		<td>74 cb</td>
		<td>JZ rel8</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump short if zero (ZF = 1).</td>
	</tr>
	<tr>
		<td>0F 87 cw</td>
		<td>JA rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if above (CF=0 and ZF=0). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 87 cd</td>
		<td>JA rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if above (CF=0 and ZF=0).</td>
	</tr>
	<tr>
		<td>0F 83 cw</td>
		<td>JAE rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if above or equal (CF=0). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 83 cd</td>
		<td>JAE rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if above or equal (CF=0).</td>
	</tr>
	<tr>
		<td>0F 82 cw</td>
		<td>JB rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if below (CF=1). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 82 cd</td>
		<td>JB rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if below (CF=1).</td>
	</tr>
	<tr>
		<td>0F 86 cw</td>
		<td>JBE rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if below or equal (CF=1 or ZF=1). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 86 cd</td>
		<td>JBE rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if below or equal (CF=1 or ZF=1).</td>
	</tr>
	<tr>
		<td>0F 82 cw</td>
		<td>JC rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if carry (CF=1). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 82 cd</td>
		<td>JC rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if carry (CF=1).</td>
	</tr>
	<tr>
		<td>0F 84 cw</td>
		<td>JE rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if equal (ZF=1). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 84 cd</td>
		<td>JE rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if equal (ZF=1).</td>
	</tr>
	<tr>
		<td>0F 84 cw</td>
		<td>JZ rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if 0 (ZF=1). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 84 cd</td>
		<td>JZ rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if 0 (ZF=1).</td>
	</tr>
	<tr>
		<td>0F 8F cw</td>
		<td>JG rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if greater (ZF=0 and SF=OF). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 8F cd</td>
		<td>JG rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if greater (ZF=0 and SF=OF).</td>
	</tr>
	<tr>
		<td>0F 8D cw</td>
		<td>JGE rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if greater or equal (SF=OF). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 8D cd</td>
		<td>JGE rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if greater or equal (SF=OF).</td>
	</tr>
	<tr>
		<td>0F 8C cw</td>
		<td>JL rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if less (SF≠ OF). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 8C cd</td>
		<td>JL rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if less (SF≠ OF).</td>
	</tr>
	<tr>
		<td>0F 8E cw</td>
		<td>JLE rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if less or equal (ZF=1 or SF≠ OF). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 8E cd</td>
		<td>JLE rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if less or equal (ZF=1 or SF≠ OF).</td>
	</tr>
	<tr>
		<td>0F 86 cw</td>
		<td>JNA rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if not above (CF=1 or ZF=1). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 86 cd</td>
		<td>JNA rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if not above (CF=1 or ZF=1).</td>
	</tr>
	<tr>
		<td>0F 82 cw</td>
		<td>JNAE rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if not above or equal (CF=1). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 82 cd</td>
		<td>JNAE rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if not above or equal (CF=1).</td>
	</tr>
	<tr>
		<td>0F 83 cw</td>
		<td>JNB rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if not below (CF=0). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 83 cd</td>
		<td>JNB rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if not below (CF=0).</td>
	</tr>
	<tr>
		<td>0F 87 cw</td>
		<td>JNBE rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if not below or equal (CF=0 and ZF=0). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 87 cd</td>
		<td>JNBE rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if not below or equal (CF=0 and ZF=0).</td>
	</tr>
	<tr>
		<td>0F 83 cw</td>
		<td>JNC rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if not carry (CF=0). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 83 cd</td>
		<td>JNC rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if not carry (CF=0).</td>
	</tr>
	<tr>
		<td>0F 85 cw</td>
		<td>JNE rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if not equal (ZF=0). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 85 cd</td>
		<td>JNE rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if not equal (ZF=0).</td>
	</tr>
	<tr>
		<td>0F 8E cw</td>
		<td>JNG rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if not greater (ZF=1 or SF≠ OF). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 8E cd</td>
		<td>JNG rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if not greater (ZF=1 or SF≠ OF).</td>
	</tr>
	<tr>
		<td>0F 8C cw</td>
		<td>JNGE rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if not greater or equal (SF≠ OF). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 8C cd</td>
		<td>JNGE rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if not greater or equal (SF≠ OF).</td>
	</tr>
	<tr>
		<td>0F 8D cw</td>
		<td>JNL rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if not less (SF=OF). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 8D cd</td>
		<td>JNL rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if not less (SF=OF).</td>
	</tr>
	<tr>
		<td>0F 8F cw</td>
		<td>JNLE rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if not less or equal (ZF=0 and SF=OF). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 8F cd</td>
		<td>JNLE rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if not less or equal (ZF=0 and SF=OF).</td>
	</tr>
	<tr>
		<td>0F 81 cw</td>
		<td>JNO rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if not overflow (OF=0). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 81 cd</td>
		<td>JNO rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if not overflow (OF=0).</td>
	</tr>
	<tr>
		<td>0F 8B cw</td>
		<td>JNP rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if not parity (PF=0). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 8B cd</td>
		<td>JNP rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if not parity (PF=0).</td>
	</tr>
	<tr>
		<td>0F 89 cw</td>
		<td>JNS rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if not sign (SF=0). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 89 cd</td>
		<td>JNS rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if not sign (SF=0).</td>
	</tr>
	<tr>
		<td>0F 85 cw</td>
		<td>JNZ rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if not zero (ZF=0). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 85 cd</td>
		<td>JNZ rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if not zero (ZF=0).</td>
	</tr>
	<tr>
		<td>0F 80 cw</td>
		<td>JO rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if overflow (OF=1). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 80 cd</td>
		<td>JO rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if overflow (OF=1).</td>
	</tr>
	<tr>
		<td>0F 8A cw</td>
		<td>JP rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if parity (PF=1). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 8A cd</td>
		<td>JP rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if parity (PF=1).</td>
	</tr>
	<tr>
		<td>0F 8A cw</td>
		<td>JPE rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if parity even (PF=1). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 8A cd</td>
		<td>JPE rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if parity even (PF=1).</td>
	</tr>
	<tr>
		<td>0F 8B cw</td>
		<td>JPO rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if parity odd (PF=0). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 8B cd</td>
		<td>JPO rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if parity odd (PF=0).</td>
	</tr>
	<tr>
		<td>0F 88 cw</td>
		<td>JS rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if sign (SF=1). Not supported in 64- bit mode.</td>
	</tr>
	<tr>
		<td>0F 88 cd</td>
		<td>JS rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if sign (SF=1).</td>
	</tr>
	<tr>
		<td>0F 84 cw</td>
		<td>JZ rel16</td>
		<td>D</td>
		<td>N.S.</td>
		<td>Valid</td>
		<td>Jump near if 0 (ZF=1). Not supported in 64-bit mode.</td>
	</tr>
	<tr>
		<td>0F 84 cd</td>
		<td>JZ rel32</td>
		<td>D</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Jump near if 0 (ZF=1).</td>
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
		<td>D</td>
		<td>Offset</td>
		<td>NA</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
Checks the state of one or more of the status flags in the EFLAGS register (CF, OF, PF, SF, and ZF) and, if the flags
are in the specified state (condition), performs a jump to the target instruction specified by the destination
operand. A condition code (cc) is associated with each instruction to indicate the condition being tested for. If the
condition is not satisfied, the jump is not performed and execution continues with the instruction following the Jcc
instruction.

The target instruction is specified with a relative offset (a signed offset relative to the current value of the instruction
 pointer in the EIP register). A relative offset (rel8, rel16, or rel32) is generally specified as a label in assembly
code, but at the machine code level, it is encoded as a signed, 8-bit or 32-bit immediate value, which is added to
the instruction pointer. Instruction coding is most efficient for offsets of –128 to +127. If the operand-size attribute
is 16, the upper two bytes of the EIP register are cleared, resulting in a maximum instruction pointer size of 16 bits.

The conditions for each Jcc mnemonic are given in the “Description” column of the table on the preceding page. The
terms “less” and “greater” are used for comparisons of signed integers and the terms “above” and “below” are used
for unsigned integers.

Because a particular state of the status flags can sometimes be interpreted in two ways, two mnemonics are
defined for some opcodes. For example, the JA (jump if above) instruction and the JNBE (jump if not below or
equal) instruction are alternate mnemonics for the opcode 77H.

The Jcc instruction does not support far jumps (jumps to other code segments). When the target for the conditional
jump is in a different segment, use the opposite condition from the condition being tested for the Jcc instruction,
and then access the target with an unconditional far jump (JMP instruction) to the other segment. For example, the
following conditional far jump is illegal:

JZ FARLABEL;
To accomplish this far jump, use the following two instructions:

JNZ BEYOND;
JMP FARLABEL;
BEYOND:
The JRCXZ, JECXZ and JCXZ instructions differ from other Jcc instructions because they do not check status flags.
Instead, they check RCX, ECX or CX for 0. The register checked is determined by the address-size attribute. These
instructions are useful when used at the beginning of a loop that terminates with a conditional loop instruction
(such as LOOPNE). They can be used to prevent an instruction sequence from entering a loop when RCX, ECX or
CX is 0. This would cause the loop to execute 264, 232 or 64K times (not zero times).

All conditional jumps are converted to code fetches of one or two cache lines, regardless of jump address or cache-
ability.

In 64-bit mode, operand size is fixed at 64 bits. JMP Short is RIP = RIP + 8-bit offset sign extended to 64 bits. JMP
Near is RIP = RIP + 32-bit offset sign extended to 64 bits.

### Operation

```java
IF condition
    THEN
        tempEIP ← EIP + SignExtend(DEST);
 
 
        IF OperandSize = 16
            THEN tempEIP ← tempEIP AND 0000FFFFH;
 
        FI;
    IF tempEIP is not within code segment limit
        THEN #GP(0);
        ELSE EIP ← tempEIP
 
 
    FI;
FI;
```
### Flags Affected
None

### Protected Mode Exceptions

<p>#GP(0)
If the offset being jumped to is beyond the limits of the CS segment.
<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#GP
If the offset being jumped to is beyond the limits of the CS segment or is outside of the effec-
tive address space from 0 to FFFFH. This condition can occur if a 32-bit address size override
prefix is used.
<p>#UD
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

Same exceptions as in real address mode.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#GP(0)
If the memory address is in a non-canonical form.
<p>#UD
If the LOCK prefix is used.

 --- 
<p align="right"><i>Source: Intel® Architecture Software Developer's Manual (May 2018)<br>Generated: 5-6-2018</i></p>
