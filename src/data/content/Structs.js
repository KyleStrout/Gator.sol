export const content = `
## Structs

Structs are custom data sctructures that are used to model data in solidity. They can model any arbitrary data like a car or a person.

Structs are useful because it allows the user to create any custom data type that they want. To access elements of the struct, the user can use the dot operator.

### Syntax

<pre>
<code class="language-solidity">
struct Name {
    uint fieldName;
    bool fieldName2 = true;
}
// initialize struct
Name variableName = Name(fieldName, fieldName2);
Name variableName;
// access/update field
Name.fieldName = value;
</code>
</pre>
 

`;
