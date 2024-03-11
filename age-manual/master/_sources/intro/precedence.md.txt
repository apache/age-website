# Operator Precedence

Operator precedence in AGE is shown below:


<table>
  <tr>
   <td>Precedence
   </td>
   <td>Operator
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>1
   </td>
   <td>.
   </td>
   <td>Property Access
   </td>
  </tr>
  <tr>
   <td rowspan="2" >2
   </td>
   <td>[]
   </td>
   <td>Map and List Subscripting
   </td>
  </tr>
  <tr>
   <td>()
   </td>
   <td>Function Call
   </td>
  </tr>
  <tr>
   <td rowspan="4" >3
   </td>
   <td>STARTS WITH
   </td>
   <td>Case-sensitive prefix searching on strings
   </td>
  </tr>
  <tr>
   <td>ENDS WITH
   </td>
   <td>Case-sensitive suffix searching on strings
   </td>
  </tr>
  <tr>
   <td>CONTAINS
   </td>
   <td>Case-sensitive inclusion searching on strings
   </td>
  </tr>
  <tr>
   <td>=~
   </td>
   <td>Regular expression string matching
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>-
   </td>
   <td>Unary Minus
   </td>
  </tr>
  <tr>
   <td rowspan="3" >5
   </td>
   <td>IN
   </td>
   <td>Checking if an element exists in a list
   </td>
  </tr>
  <tr>
   <td>IS NULL
   </td>
   <td>Checking a value is NULL
   </td>
  </tr>
  <tr>
   <td>IS NOT NULL
   </td>
   <td>Checking a value is not NULL
   </td>
  </tr>
  <tr>
   <td>6
   </td>
   <td>^
   </td>
   <td>Exponentiation
   </td>
  </tr>
  <tr>
   <td>7
   </td>
   <td>* / %
   </td>
   <td>Multiplication, division and remainder
   </td>
  </tr>
  <tr>
   <td>8
   </td>
   <td>+ -
   </td>
   <td>Addition and Subtraction
   </td>
  </tr>
  <tr>
   <td rowspan="3" >9
   </td>
   <td>= &lt;>
   </td>
   <td>For relational = and ≠ respectively
   </td>
  </tr>
  <tr>
   <td>&lt; &lt;=
   </td>
   <td>For relational &lt; and ≤ respectively
   </td>
  </tr>
  <tr>
   <td>> >=
   </td>
   <td>For relational > and ≥ respectively
   </td>
  </tr>
  <tr>
   <td>10
   </td>
   <td>NOT
   </td>
   <td>Logical NOT
   </td>
  </tr>
  <tr>
   <td>11
   </td>
   <td>AND
   </td>
   <td>Logical AND
   </td>
  </tr>
  <tr>
   <td>12
   </td>
   <td>OR
   </td>
   <td>Logical OR
   </td>
  </tr>
</table>
