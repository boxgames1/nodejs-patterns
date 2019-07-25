## Factory pattern

A factory allow us to separate the object creation from its implementation.

```js
function createImage(name){
    return new Image(name)
}
const image = createImage("photo.png")
```

`new` binds our code to a particular type. A factory instead give us more flexibility. For example if we want to reactor the `Image` class in the preceding example. Splitting into some functions, one for each image type.

## Enforce encapsulation

Factory can be used as encapsulation (or information hiding) mechanism due to closures. 

```js
function createPerson(){
    const privateProperties = {}
    const person = {
        setName: name => {
            if (!name) throw new Error("Error")
            privateProperties.name = name
        },
        getName: ()=>{
            return privateProperties.name;
        }
    }

    person.setName(name)
    return person;
}
```

Full example: profiler.js

## Composable factory functions

Example using `stampit`: videogame.js

Other libraries to create factories: 
- Dnode
- Restify

