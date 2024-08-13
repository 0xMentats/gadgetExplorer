<b>GF2P8AFFINEINVQB</b> —  Galois Field Affine Transformation Inverse
<table>
	<tr>
		<td><b>Opcode/ Instruction</b></td>
		<td><b>Op/ En</b></td>
		<td><b>64/32 bit Mode Support</b></td>
		<td><b>CPUID Feature Flag</b></td>
		<td><b>Description</b></td>
	</tr>
	<tr>
		<td>66 0F3A CF /r /ib GF2P8AFFINEINVQB xmm1, xmm2/m128, imm8</td>
		<td>A</td>
		<td>V/V</td>
		<td>GFNI</td>
		<td>Computes inverse affine transformation in the finite field GF(2^8).</td>
	</tr>
	<tr>
		<td>VEX.128.66.0F3A.W1 CF /r /ib VGF2P8AFFINEINVQB xmm1, xmm2, xmm3/m128, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX GFNI</td>
		<td>Computes inverse affine transformation in the finite field GF(2^8).</td>
	</tr>
	<tr>
		<td>VEX.256.66.0F3A.W1 CF /r /ib VGF2P8AFFINEINVQB ymm1, ymm2, ymm3/m256, imm8</td>
		<td>B</td>
		<td>V/V</td>
		<td>AVX GFNI</td>
		<td>Computes inverse affine transformation in the finite field GF(2^8).</td>
	</tr>
	<tr>
		<td>EVEX.128.66.0F3A.W1 CF /r /ib VGF2P8AFFINEINVQB xmm1{k1}{z}, xmm2, xmm3/m128/m64bcst, imm8</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL GFNI</td>
		<td>Computes inverse affine transformation in the finite field GF(2^8).</td>
	</tr>
	<tr>
		<td>EVEX.256.66.0F3A.W1 CF /r /ib VGF2P8AFFINEINVQB ymm1{k1}{z}, ymm2, ymm3/m256/m64bcst, imm8</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512VL GFNI</td>
		<td>Computes inverse affine transformation in the finite field GF(2^8).</td>
	</tr>
	<tr>
		<td>EVEX.512.66.0F3A.W1 CF /r /ib VGF2P8AFFINEINVQB zmm1{k1}{z}, zmm2, zmm3/m512/m64bcst, imm8</td>
		<td>C</td>
		<td>V/V</td>
		<td>AVX512F GFNI</td>
		<td>Computes inverse affine transformation in the finite field GF(2^8).</td>
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
		<td>ModRM:reg (r, w)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8 (r)</td>
		<td>NA</td>
	</tr>
	<tr>
		<td>B</td>
		<td>NA</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8 (r)</td>
	</tr>
	<tr>
		<td>C</td>
		<td>Full</td>
		<td>ModRM:reg (w)</td>
		<td>EVEX.vvvv (r)</td>
		<td>ModRM:r/m (r)</td>
		<td>imm8 (r)</td>
	</tr>
</table>


### Description
The AFFINEINVB instruction computes an affine transformation in the Galois Field 28. For this instruction, an affine
transformation is defined by A \* inv(x) + b where “A” is an 8 by 8 bit matrix, and “x” and “b” are 8-bit vectors. The
inverse of the bytes in x is defined with respect to the reduction polynomial x8 + x4 + x3 + x + 1.

One SIMD register (operand 1) holds “x” as either 16, 32 or 64 8-bit vectors. A second SIMD (operand 2) register
or memory operand contains 2, 4, or 8 “A” values, which are operated upon by the correspondingly aligned 8 “x”
values in the first register. The “b” vector is constant for all calculations and contained in the immediate byte.

The EVEX encoded form of this instruction does not support memory fault suppression. The SSE encoded forms of
the instruction require 16B alignment on their memory operations.

The inverse of each byte is given by the following table. The upper nibble is on the vertical axis and the lower nibble
is on the horizontal axis. For example, the inverse of 0x95 is 0x8A.

Table 2-1.  Inverse Byte Listings
<table>
	<tr>
		<td><b>-</b></td>
		<td><b>0</b></td>
		<td><b>1</b></td>
		<td><b>2</b></td>
		<td><b>3</b></td>
		<td><b>4</b></td>
		<td><b>5</b></td>
		<td><b>6</b></td>
		<td><b>7</b></td>
		<td><b>8</b></td>
		<td><b>9</b></td>
		<td><b>A</b></td>
		<td><b>B</b></td>
		<td><b>C</b></td>
		<td><b>D</b></td>
		<td><b>E</b></td>
		<td><b>F</b></td>
	</tr>
	<tr>
		<td>0</td>
		<td>0</td>
		<td>1</td>
		<td>8D</td>
		<td>F6</td>
		<td>CB</td>
		<td>52</td>
		<td>7B</td>
		<td>D1</td>
		<td>E8</td>
		<td>4F</td>
		<td>29</td>
		<td>C0</td>
		<td>B0</td>
		<td>E1</td>
		<td>E5</td>
		<td>C7</td>
	</tr>
	<tr>
		<td>1</td>
		<td>74</td>
		<td>B4</td>
		<td>AA</td>
		<td>4B</td>
		<td>99</td>
		<td>2B</td>
		<td>60</td>
		<td>5F</td>
		<td>58</td>
		<td>3F</td>
		<td>FD</td>
		<td>CC</td>
		<td>FF</td>
		<td>40</td>
		<td>EE</td>
		<td>B2</td>
	</tr>
	<tr>
		<td>2</td>
		<td>3A</td>
		<td>6E</td>
		<td>5A</td>
		<td>F1</td>
		<td>55</td>
		<td>4D</td>
		<td>A8</td>
		<td>C9</td>
		<td>C1</td>
		<td>A</td>
		<td>98</td>
		<td>15</td>
		<td>30</td>
		<td>44</td>
		<td>A2</td>
		<td>C2</td>
	</tr>
	<tr>
		<td>3</td>
		<td>2C</td>
		<td>45</td>
		<td>92</td>
		<td>6C</td>
		<td>F3</td>
		<td>39</td>
		<td>66</td>
		<td>42</td>
		<td>F2</td>
		<td>35</td>
		<td>20</td>
		<td>6F</td>
		<td>77</td>
		<td>BB</td>
		<td>59</td>
		<td>19</td>
	</tr>
	<tr>
		<td>4</td>
		<td>1D</td>
		<td>FE</td>
		<td>37</td>
		<td>67</td>
		<td>2D</td>
		<td>31</td>
		<td>F5</td>
		<td>69</td>
		<td>A7</td>
		<td>64</td>
		<td>AB</td>
		<td>13</td>
		<td>54</td>
		<td>25</td>
		<td>E9</td>
		<td>9</td>
	</tr>
	<tr>
		<td>5</td>
		<td>ED</td>
		<td>5C</td>
		<td>5</td>
		<td>CA</td>
		<td>4C</td>
		<td>24</td>
		<td>87</td>
		<td>BF</td>
		<td>18</td>
		<td>3E</td>
		<td>22</td>
		<td>F0</td>
		<td>51</td>
		<td>EC</td>
		<td>61</td>
		<td>17</td>
	</tr>
	<tr>
		<td>6</td>
		<td>16</td>
		<td>5E</td>
		<td>AF</td>
		<td>D3</td>
		<td>49</td>
		<td>A6</td>
		<td>36</td>
		<td>43</td>
		<td>F4</td>
		<td>47</td>
		<td>91</td>
		<td>DF</td>
		<td>33</td>
		<td>93</td>
		<td>21</td>
		<td>3B</td>
	</tr>
	<tr>
		<td>7</td>
		<td>79</td>
		<td>B7</td>
		<td>97</td>
		<td>85</td>
		<td>10</td>
		<td>B5</td>
		<td>BA</td>
		<td>3C</td>
		<td>B6</td>
		<td>70</td>
		<td>D0</td>
		<td>6</td>
		<td>A1</td>
		<td>FA</td>
		<td>81</td>
		<td>82</td>
	</tr>
	<tr>
		<td>8</td>
		<td>83</td>
		<td>7E</td>
		<td>7F</td>
		<td>80</td>
		<td>96</td>
		<td>73</td>
		<td>BE</td>
		<td>56</td>
		<td>9B</td>
		<td>9E</td>
		<td>95</td>
		<td>D9</td>
		<td>F7</td>
		<td>2</td>
		<td>B9</td>
		<td>A4</td>
	</tr>
	<tr>
		<td>9</td>
		<td>DE</td>
		<td>6A</td>
		<td>32</td>
		<td>6D</td>
		<td>D8</td>
		<td>8A</td>
		<td>84</td>
		<td>72</td>
		<td>2A</td>
		<td>14</td>
		<td>9F</td>
		<td>88</td>
		<td>F9</td>
		<td>DC</td>
		<td>89</td>
		<td>9A</td>
	</tr>
	<tr>
		<td>A</td>
		<td>FB</td>
		<td>7C</td>
		<td>2E</td>
		<td>C3</td>
		<td>8F</td>
		<td>B8</td>
		<td>65</td>
		<td>48</td>
		<td>26</td>
		<td>C8</td>
		<td>12</td>
		<td>4A</td>
		<td>CE</td>
		<td>E7</td>
		<td>D2</td>
		<td>62</td>
	</tr>
	<tr>
		<td>B</td>
		<td>C</td>
		<td>E0</td>
		<td>1F</td>
		<td>EF</td>
		<td>11</td>
		<td>75</td>
		<td>78</td>
		<td>71</td>
		<td>A5</td>
		<td>8E</td>
		<td>76</td>
		<td>3D</td>
		<td>BD</td>
		<td>BC</td>
		<td>86</td>
		<td>57</td>
	</tr>
	<tr>
		<td>C</td>
		<td>B</td>
		<td>28</td>
		<td>2F</td>
		<td>A3</td>
		<td>DA</td>
		<td>D4</td>
		<td>E4</td>
		<td>F</td>
		<td>A9</td>
		<td>27</td>
		<td>53</td>
		<td>4</td>
		<td>1B</td>
		<td>FC</td>
		<td>AC</td>
		<td>E6</td>
	</tr>
	<tr>
		<td>D</td>
		<td>7A</td>
		<td>7</td>
		<td>AE</td>
		<td>63</td>
		<td>C5</td>
		<td>DB</td>
		<td>E2</td>
		<td>EA</td>
		<td>94</td>
		<td>8B</td>
		<td>C4</td>
		<td>D5</td>
		<td>9D</td>
		<td>F8</td>
		<td>90</td>
		<td>6B</td>
	</tr>
	<tr>
		<td>E</td>
		<td>B1</td>
		<td>D</td>
		<td>D6</td>
		<td>EB</td>
		<td>C6</td>
		<td>E</td>
		<td>CF</td>
		<td>AD</td>
		<td>8</td>
		<td>4E</td>
		<td>D7</td>
		<td>E3</td>
		<td>5D</td>
		<td>50</td>
		<td>1E</td>
		<td>B3</td>
	</tr>
	<tr>
		<td>F</td>
		<td>5B</td>
		<td>23</td>
		<td>38</td>
		<td>34</td>
		<td>68</td>
		<td>46</td>
		<td>3</td>
		<td>8C</td>
		<td>DD</td>
		<td>9C</td>
		<td>7D</td>
		<td>A0</td>
		<td>CD</td>
		<td>1A</td>
		<td>41</td>
		<td>1C</td>
	</tr>
</table>


### Operation

```java
define affine_inverse_byte(tsrc2qw, src1byte, imm):
    FOR i ← 0 to 7:
        * parity(x) = 1 if x has an odd number of 1s in it, and 0 otherwise.*
        * inverse(x) is defined in the table above *
        retbyte.bit[i] ← parity(tsrc2qw.byte[7-i] AND inverse(src1byte)) XOR imm8.bit[i]
    return retbyte
```
#### VGF2P8AFFINEINVQB dest, src1, src2, imm8 (EVEX encoded version)
```java
(KL, VL) = (2, 128), (4, 256), (8, 512)
FOR j ← 0 TO KL-1:
    IF SRC2 is memory and EVEX.b==1:
        tsrc2 ← SRC2.qword[0]
    ELSE:
        tsrc2 ← SRC2.qword[j]
FOR b ← 0 to 7:
    IF k1[j*8+b] OR *no writemask*:
        FOR i ← 0 to 7:
            DEST.qword[j].byte[b] ← affine_inverse_byte(tsrc2, SRC1.qword[j].byte[b], imm8)
    ELSE IF *zeroing*:
        DEST.qword[j].byte[b] ← 0
    *ELSE DEST.qword[j].byte[b] remains unchanged*
DEST[MAX_VL-1:VL] ← 0
```
#### VGF2P8AFFINEINVQB dest, src1, src2, imm8 (128b and 256b VEX encoded versions)
```java
(KL, VL) = (2, 128), (4, 256)
FOR j ← 0 TO KL-1:
    FOR b ← 0 to 7:
        DEST.qword[j].byte[b] ← affine_inverse_byte(SRC2.qword[j], SRC1.qword[j].byte[b], imm8)
DEST[MAX_VL-1:VL] ← 0
```
#### GF2P8AFFINEINVQB srcdest, src1, imm8 (128b SSE encoded version)
```java
FOR j ← 0 TO 1:
    FOR b ← 0 to 7:
        SRCDEST.qword[j].byte[b] ← affine_inverse_byte(SRC1.qword[j], SRCDEST.qword[j].byte[b], imm8)
```
### Intel C/C++ Compiler Intrinsic Equivalent
```c
GF2P8AFFINEINVQB __m128i _mm_gf2p8affineinv_epi64_epi8(__m128i, __m128i, int);
GF2P8AFFINEINVQB __m128i _mm_mask_gf2p8affineinv_epi64_epi8(__m128i, __mmask16, __m128i, __m128i, int);
GF2P8AFFINEINVQB __m128i _mm_maskz_gf2p8affineinv_epi64_epi8(__mmask16, __m128i, __m128i, int);
GF2P8AFFINEINVQB __m256i _mm256_gf2p8affineinv_epi64_epi8(__m256i, __m256i, int);
GF2P8AFFINEINVQB __m256i _mm256_mask_gf2p8affineinv_epi64_epi8(__m256i, __mmask32, __m256i, __m256i, int);
GF2P8AFFINEINVQB __m256i _mm256_maskz_gf2p8affineinv_epi64_epi8(__mmask32, __m256i, __m256i, int);
GF2P8AFFINEINVQB __m512i _mm512_gf2p8affineinv_epi64_epi8(__m512i, __m512i, int);
GF2P8AFFINEINVQB __m512i _mm512_mask_gf2p8affineinv_epi64_epi8(__m512i, __mmask64, __m512i, __m512i, int);
GF2P8AFFINEINVQB __m512i _mm512_maskz_gf2p8affineinv_epi64_epi8(__mmask64, __m512i, __m512i, int);
```
### SIMD Floating-Point Exceptions
None.

### Other Exceptions

Legacy-encoded and VEX-encoded: Exceptions Type 4.
EVEX-encoded: See Exceptions Type E4NF.

 --- 
<p align="right"><i>Source: Intel® Architecture Instruction Set Extensions and Future Features Programming Reference (May 2019)<br>Generated: 28-5-2019</i></p>