<b>CMOVcc</b> — Conditional Move
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
		<td>0F 47 /r</td>
		<td>CMOVA r16, r/m16</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if above (CF=0 and ZF=0).</td>
	</tr>
	<tr>
		<td>0F 47 /r</td>
		<td>CMOVA r32, r/m32</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if above (CF=0 and ZF=0).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 47 /r</td>
		<td>CMOVA r64, r/m64</td>
		<td>RM</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Move if above (CF=0 and ZF=0).</td>
	</tr>
	<tr>
		<td>0F 43 /r</td>
		<td>CMOVAE r16, r/m16</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if above or equal (CF=0).</td>
	</tr>
	<tr>
		<td>0F 43 /r</td>
		<td>CMOVAE r32, r/m32</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if above or equal (CF=0).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 43 /r</td>
		<td>CMOVAE r64, r/m64</td>
		<td>RM</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Move if above or equal (CF=0).</td>
	</tr>
	<tr>
		<td>0F 42 /r</td>
		<td>CMOVB r16, r/m16</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if below (CF=1).</td>
	</tr>
	<tr>
		<td>0F 42 /r</td>
		<td>CMOVB r32, r/m32</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if below (CF=1).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 42 /r</td>
		<td>CMOVB r64, r/m64</td>
		<td>RM</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Move if below (CF=1).</td>
	</tr>
	<tr>
		<td>0F 46 /r</td>
		<td>CMOVBE r16, r/m16</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if below or equal (CF=1 or ZF=1).</td>
	</tr>
	<tr>
		<td>0F 46 /r</td>
		<td>CMOVBE r32, r/m32</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if below or equal (CF=1 or ZF=1).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 46 /r</td>
		<td>CMOVBE r64, r/m64</td>
		<td>RM</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Move if below or equal (CF=1 or ZF=1).</td>
	</tr>
	<tr>
		<td>0F 42 /r</td>
		<td>CMOVC r16, r/m16</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if carry (CF=1).</td>
	</tr>
	<tr>
		<td>0F 42 /r</td>
		<td>CMOVC r32, r/m32</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if carry (CF=1).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 42 /r</td>
		<td>CMOVC r64, r/m64</td>
		<td>RM</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Move if carry (CF=1).</td>
	</tr>
	<tr>
		<td>0F 44 /r</td>
		<td>CMOVE r16, r/m16</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if equal (ZF=1).</td>
	</tr>
	<tr>
		<td>0F 44 /r</td>
		<td>CMOVE r32, r/m32</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if equal (ZF=1).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 44 /r</td>
		<td>CMOVE r64, r/m64</td>
		<td>RM</td>
		<td>Valid</td>
		<td>N.E.</td>
		<td>Move if equal (ZF=1).</td>
	</tr>
	<tr>
		<td>0F 4F /r</td>
		<td>CMOVG r16, r/m16</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if greater (ZF=0 and SF=OF).</td>
	</tr>
	<tr>
		<td>0F 4F /r</td>
		<td>CMOVG r32, r/m32</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if greater (ZF=0 and SF=OF).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 4F /r</td>
		<td>CMOVG r64, r/m64</td>
		<td>RM</td>
		<td>V/N.E.</td>
		<td>NA</td>
		<td>Move if greater (ZF=0 and SF=OF).</td>
	</tr>
	<tr>
		<td>0F 4D /r</td>
		<td>CMOVGE r16, r/m16</td>
		<td>RM</td>
		<td>Valid</td>
		<td>Valid</td>
		<td>Move if greater or equal (SF=OF).</td>
	</tr>
	<tr>
		<td>0F 4D /r</td>
		<td>CMOVGE r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if greater or equal (SF=OF).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 4D /r</td>
		<td>CMOVGE r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if greater or equal (SF=OF).</td>
	</tr>
	<tr>
		<td>0F 4C /r</td>
		<td>CMOVL r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if less (SF≠ OF).</td>
	</tr>
	<tr>
		<td>0F 4C /r</td>
		<td>CMOVL r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if less (SF≠ OF).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 4C /r</td>
		<td>CMOVL r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if less (SF≠ OF).</td>
	</tr>
	<tr>
		<td>0F 4E /r</td>
		<td>CMOVLE r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if less or equal (ZF=1 or SF≠ OF).</td>
	</tr>
	<tr>
		<td>0F 4E /r</td>
		<td>CMOVLE r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if less or equal (ZF=1 or SF≠ OF).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 4E /r</td>
		<td>CMOVLE r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if less or equal (ZF=1 or SF≠ OF).</td>
	</tr>
	<tr>
		<td>0F 46 /r</td>
		<td>CMOVNA r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not above (CF=1 or ZF=1).</td>
	</tr>
	<tr>
		<td>0F 46 /r</td>
		<td>CMOVNA r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not above (CF=1 or ZF=1).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 46 /r</td>
		<td>CMOVNA r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if not above (CF=1 or ZF=1).</td>
	</tr>
	<tr>
		<td>0F 42 /r</td>
		<td>CMOVNAE r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not above or equal (CF=1).</td>
	</tr>
	<tr>
		<td>0F 42 /r</td>
		<td>CMOVNAE r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not above or equal (CF=1).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 42 /r</td>
		<td>CMOVNAE r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if not above or equal (CF=1).</td>
	</tr>
	<tr>
		<td>0F 43 /r</td>
		<td>CMOVNB r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not below (CF=0).</td>
	</tr>
	<tr>
		<td>0F 43 /r</td>
		<td>CMOVNB r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not below (CF=0).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 43 /r</td>
		<td>CMOVNB r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if not below (CF=0).</td>
	</tr>
	<tr>
		<td>0F 47 /r</td>
		<td>CMOVNBE r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not below or equal (CF=0 and ZF=0).</td>
	</tr>
	<tr>
		<td>0F 47 /r</td>
		<td>CMOVNBE r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not below or equal (CF=0 and ZF=0).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 47 /r</td>
		<td>CMOVNBE r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if not below or equal (CF=0 and ZF=0).</td>
	</tr>
	<tr>
		<td>0F 43 /r</td>
		<td>CMOVNC r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not carry (CF=0).</td>
	</tr>
	<tr>
		<td>0F 43 /r</td>
		<td>CMOVNC r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not carry (CF=0).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 43 /r</td>
		<td>CMOVNC r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if not carry (CF=0).</td>
	</tr>
	<tr>
		<td>0F 45 /r</td>
		<td>CMOVNE r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not equal (ZF=0).</td>
	</tr>
	<tr>
		<td>0F 45 /r</td>
		<td>CMOVNE r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not equal (ZF=0).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 45 /r</td>
		<td>CMOVNE r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if not equal (ZF=0).</td>
	</tr>
	<tr>
		<td>0F 4E /r</td>
		<td>CMOVNG r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not greater (ZF=1 or SF≠ OF).</td>
	</tr>
	<tr>
		<td>0F 4E /r</td>
		<td>CMOVNG r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not greater (ZF=1 or SF≠ OF).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 4E /r</td>
		<td>CMOVNG r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if not greater (ZF=1 or SF≠ OF).</td>
	</tr>
	<tr>
		<td>0F 4C /r</td>
		<td>CMOVNGE r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not greater or equal (SF≠ OF).</td>
	</tr>
	<tr>
		<td>0F 4C /r</td>
		<td>CMOVNGE r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not greater or equal (SF≠ OF).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 4C /r</td>
		<td>CMOVNGE r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if not greater or equal (SF≠ OF).</td>
	</tr>
	<tr>
		<td>0F 4D /r</td>
		<td>CMOVNL r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not less (SF=OF).</td>
	</tr>
	<tr>
		<td>0F 4D /r</td>
		<td>CMOVNL r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not less (SF=OF).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 4D /r</td>
		<td>CMOVNL r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if not less (SF=OF).</td>
	</tr>
	<tr>
		<td>0F 4F /r</td>
		<td>CMOVNLE r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not less or equal (ZF=0 and SF=OF).</td>
	</tr>
	<tr>
		<td>0F 4F /r</td>
		<td>CMOVNLE r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not less or equal (ZF=0 and SF=OF).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 4F /r</td>
		<td>CMOVNLE r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if not less or equal (ZF=0 and SF=OF).</td>
	</tr>
	<tr>
		<td>0F 41 /r</td>
		<td>CMOVNO r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not overflow (OF=0).</td>
	</tr>
	<tr>
		<td>0F 41 /r</td>
		<td>CMOVNO r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not overflow (OF=0).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 41 /r</td>
		<td>CMOVNO r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if not overflow (OF=0).</td>
	</tr>
	<tr>
		<td>0F 4B /r</td>
		<td>CMOVNP r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not parity (PF=0).</td>
	</tr>
	<tr>
		<td>0F 4B /r</td>
		<td>CMOVNP r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not parity (PF=0).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 4B /r</td>
		<td>CMOVNP r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if not parity (PF=0).</td>
	</tr>
	<tr>
		<td>0F 49 /r</td>
		<td>CMOVNS r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not sign (SF=0).</td>
	</tr>
	<tr>
		<td>0F 49 /r</td>
		<td>CMOVNS r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not sign (SF=0).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 49 /r</td>
		<td>CMOVNS r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if not sign (SF=0).</td>
	</tr>
	<tr>
		<td>0F 45 /r</td>
		<td>CMOVNZ r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not zero (ZF=0).</td>
	</tr>
	<tr>
		<td>0F 45 /r</td>
		<td>CMOVNZ r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if not zero (ZF=0).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 45 /r</td>
		<td>CMOVNZ r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if not zero (ZF=0).</td>
	</tr>
	<tr>
		<td>0F 40 /r</td>
		<td>CMOVO r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if overflow (OF=1).</td>
	</tr>
	<tr>
		<td>0F 40 /r</td>
		<td>CMOVO r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if overflow (OF=1).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 40 /r</td>
		<td>CMOVO r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if overflow (OF=1).</td>
	</tr>
	<tr>
		<td>0F 4A /r</td>
		<td>CMOVP r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if parity (PF=1).</td>
	</tr>
	<tr>
		<td>0F 4A /r</td>
		<td>CMOVP r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if parity (PF=1).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 4A /r</td>
		<td>CMOVP r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if parity (PF=1).</td>
	</tr>
	<tr>
		<td>0F 4A /r</td>
		<td>CMOVPE r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if parity even (PF=1).</td>
	</tr>
	<tr>
		<td>0F 4A /r</td>
		<td>CMOVPE r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if parity even (PF=1).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 4A /r</td>
		<td>CMOVPE r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if parity even (PF=1).</td>
	</tr>
	<tr>
		<td>0F 4B /r</td>
		<td>CMOVPO r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if parity odd (PF=0).</td>
	</tr>
	<tr>
		<td>0F 4B /r</td>
		<td>CMOVPO r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if parity odd (PF=0).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 4B /r</td>
		<td>CMOVPO r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if parity odd (PF=0).</td>
	</tr>
	<tr>
		<td>0F 48 /r</td>
		<td>CMOVS r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if sign (SF=1).</td>
	</tr>
	<tr>
		<td>0F 48 /r</td>
		<td>CMOVS r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if sign (SF=1).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 48 /r</td>
		<td>CMOVS r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if sign (SF=1).</td>
	</tr>
	<tr>
		<td>0F 44 /r</td>
		<td>CMOVZ r16, r/m16</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if zero (ZF=1).</td>
	</tr>
	<tr>
		<td>0F 44 /r</td>
		<td>CMOVZ r32, r/m32</td>
		<td>RM Valid</td>
		<td></td>
		<td>Valid</td>
		<td>Move if zero (ZF=1).</td>
	</tr>
	<tr>
		<td>REX.W + 0F 44 /r</td>
		<td>CMOVZ r64, r/m64</td>
		<td>RM Valid</td>
		<td></td>
		<td>N.E.</td>
		<td>Move if zero (ZF=1).</td>
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
		<td>ModRM:reg (r, w)</td>
		<td>ModRM:r/m (r)</td>
		<td>NA</td>
		<td>NA</td>
	</tr>
</table>


### Description
The CMOVcc instructions check the state of one or more of the status flags in the EFLAGS register (CF, OF, PF, SF,
and ZF) and perform a move operation if the flags are in a specified state (or condition). A condition code (cc) is
associated with each instruction to indicate the condition being tested for. If the condition is not satisfied, a move
is not performed and execution continues with the instruction following the CMOVcc instruction.

These instructions can move 16-bit, 32-bit or 64-bit values from memory to a general-purpose register or from one
general-purpose register to another. Conditional moves of 8-bit register operands are not supported.

The condition for each CMOVcc mnemonic is given in the description column of the above table. The terms “less”
and “greater” are used for comparisons of signed integers and the terms “above” and “below” are used for
unsigned integers.

Because a particular state of the status flags can sometimes be interpreted in two ways, two mnemonics are
defined for some opcodes. For example, the CMOVA (conditional move if above) instruction and the CMOVNBE
(conditional move if not below or equal) instruction are alternate mnemonics for the opcode 0F 47H.

The CMOVcc instructions were introduced in P6 family processors; however, these instructions may not be
supported by all IA-32 processors. Software can determine if the CMOVcc instructions are supported by checking
the processor’s feature information with the CPUID instruction (see “CPUID—CPU Identification” in this chapter).

In 64-bit mode, the instruction’s default operation size is 32 bits. Use of the REX.R prefix permits access to additional
 registers (R8-R15). Use of the REX.W prefix promotes operation to 64 bits. See the summary chart at the
beginning of this section for encoding data and limits.

### Operation

```java
temp ← SRC
IF condition TRUE
    THEN 
        DEST ← temp;
    FI;
ELSE
    IF (OperandSize = 32 and IA-32e mode active)
        THEN
            DEST[63:32] ← 0;
    FI;
FI;
```
### Flags Affected
None.

### Protected Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
If the DS, ES, FS, or GS register contains a NULL segment selector.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made while the
current privilege level is 3.
<p>#UD
If the LOCK prefix is used.

### Real-Address Mode Exceptions

<p>#GP
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS
If a memory operand effective address is outside the SS segment limit.
<p>#UD
If the LOCK prefix is used.

### Virtual-8086 Mode Exceptions

<p>#GP(0)
If a memory operand effective address is outside the CS, DS, ES, FS, or GS segment limit.
<p>#SS(0)
If a memory operand effective address is outside the SS segment limit.
<p>#PF(fault-code)
If a page fault occurs.
<p>#AC(0)
If alignment checking is enabled and an unaligned memory reference is made.
<p>#UD
If the LOCK prefix is used.

### Compatibility Mode Exceptions

Same exceptions as in protected mode.

### 64-Bit Mode Exceptions

<p>#SS(0)
If a memory address referencing the SS segment is in a non-canonical form.
<p>#GP(0)
If the memory address is in a non-canonical form.
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