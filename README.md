# Holo

![license](https://img.shields.io/github/license/devoinc/holo)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/devoinc/holo/ci.yml)

This is a tool for create dataset structures based on faker and chance.

## Quick start

```sh
npm i -D @devoinc/holo
```

```ts
import { Holo } from '@devoinc/holo';

Holo.of()
  .schema({ name: 'name', last: 'last', phone: 'phone' })
  .repeat(2)
  .generate()
```

## Holo Class

This is intended to be used as chained, we can see in the next example:

```js
Holo.of()
  .schema({ name: 'name', last: 'last', phone: 'phone' })
  .repeat(2)
  .generate()
```

This will return

```js
[
  {
    name: 'Peter',
    last: 'Smith',
    phone: '123456789'
  },
  {
    name: 'Sonya',
    last: 'Anderson',
    phone: '987654321'
  }
]
```

- The first line return the instance of Holo
- The second one define the schema for repetition and use chance as random
  engine generator, so when you see the value of name as name means that the key
  name will hace a value from the ```chance.name()``` function, later on we will
  see more options :)
- The third line prepare the system for create 2 random generated schemas
- The last line generate the array with the object

So let's see this magic in detail...

### of()

This method return the instance to work with.

### schema()

This method is the core of Holo, you can generate almost any structure, let's
see by examples...

```
Holo.of()
  .addType('customName', () => Holo.chance.name())
  .schema({
    name1: 'name',
    name2: 'customName'
    name3: () => Holo.chance.name(),
  })
```

As you can see you could use
- a string with a chance function
- a string with a custom function defined previously by
  [addType](#addtype-and-addtypes) (we will see this in an after section)
- a directly function that return the value

The custom function or the directly function has the same interface

```js
({ input, prevItem, index, path }) -> value
```

- input: this could access to more information (we will see this in the next
  section)
- prevItem: this has the las generated element
- index: the index in the repetition
- path: this has the path to this key in the generated element

Now we can see a more complex example

```js
{
  series: Holo.of()
    .input({ from: Holo.now() - 5 * Holo.day, every: Holo.day, delta: 5 })
    .addType('datetime', typeSequentialTimestamp())
    .addType('number', typeSequentialNumbers({ delta: 5 }))
    .schema({
      data: Holo.of().schema(['datetime', 'number']).repeat(50),
      name: 'name',
    })
    .generate(),
  xAxis: { type: 'datetime' },
}
```

### input()

As you can see in the upper example the input() set parameters for other functions
and as you can see here we can nested Holos element but inner elements can't has
the generate() method for let the upper Holo transfer its inputs (input()) and
custom functions (addType()).

So here we are filling a more complex object with nested Holos and a custom
functions...

### repeat() and generate()

This method is more obvious, we only give a number and the Holo generate this
number of structures an return an array with the result.

### addType() and addTypes()

Here we can extend the Holo with mor types more than the chance ones, the
addType() method (not plural) is for add one method, the interface is

```js
addType(name, fn): Holo
```

We already see examples before, the plural form has a different interface

```js
addTypes({ name: fn, ... }): Holo
```

As you can see this method accept several new types :)

## Examples

```js
{
  series: Holo.of()
    .input({ from: Date.now(), every: Holo.MINUTE })
    .schema({
      data: Holo.of()
        .addType('datetime', Holo.types.sequentialTimestamp())
        .addType('number', Holo.types.sequentialNumbers({ delta: 5 }))
        .schema([
          'datetime',
          ({ holo, ...args }) => {
            return holo.parent.index < 2
              ? Holo.types.sequentialNumbers({
                  min: 0, max: 50, start: 50
                })(args)
              : Holo.types.sequentialNumbers({
                  min: 100, max: 120, start: 120
                })(args);
          },
        ])
        .repeat(30),
      name: 'name',
      type: ({ index }) => (index < 2 ? 'column' : 'spline'),
    })
    .repeat(3)
    .generate(),
  xAxis: { type: 'datetime' },
}
```
