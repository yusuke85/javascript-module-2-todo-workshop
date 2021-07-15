# JavaScript-Module-2-Todo-Workshop

## Getting started
* Fork and Clone this repo.
## Part-1 JavaScript in the browser
After working on a black screen for few weeks, with the only output of ```console.log``` But JavaScript was not meant to be run in ```console.log``` It was meant to make web pages dynamic. Lots of websites are powered by JavaScript today, and some (like Facebook) cannot function at all without it. It's become that important to the look and feel of the website.

Today we will learn how to combine all this JavaScript knowledge with HTML and CSS in a browser, changing elements dynamically from user actions.
#### By the end of this section students should be able to:
- Differences between Node.js and the Browser
- Define what the DOM is and what it does
- Use query selectors to retrieve elements from the DOM
- Use event listeners to respond to events that happen on the DOM
- Create DOM elements using JavaScript and add them to the DOM
- Manipulate DOM elements using JavaScript to change their properties
### Node.js vs Browser
Both the browser and Node.js use JavaScript as their programming language.

Building apps that run in the browser is a completely different thing than building a Node.js application.

Despite the fact that it's always JavaScript, there are some key differences that make the experience radically different.

1. **Full user-level system access.**
This is one of the most exciting things about node.js. Unlike the browser where Javascript is sandboxed for your safety, node.js has full access to the system like any other native application. This means you can read and write directly to/from the file system, have unrestricted access to the network, can execute software and more. This means writing full desktop software is possible with node.js even including a UI through modules like electron. This means that javascript ran through node.js needs to be treated with the same level of caution as running C++, java, or any other language directly on your system. Never run untrusted javascript in node.js.
&nbsp;
2. **Global instead of Window**
In the browser, most of the time what you are doing is interacting with the DOM, or other Web Platform APIs like Cookies. Those do not exist in Node.js, of course. You don't have the `document`, `window` and all the other objects that are provided by the browser.
&nbsp;
3. **CommonJS**
Another difference is that Node.js uses the CommonJS module system, while in the browser we are starting to see the ES Modules standard being implemented.
In practice, this means that for the time being you use `require()` in Node.js and `import` in the browser.
### The DOM
Your webpages are made up of a bunch of HTML elements, nested within each other (parents and children). But JavaScript doesn't know about any of that.
Thankfully, in JavaScript we have access to this "DOM" object (Document Object Model) which is actually a representation of our webpage that JavaScript can work with.

Here is an example of how the DOM might look like:

```html
<!doctype html>
<html>
  <head>
    <title>My home page</title>
  </head>
  <body>
    <h1>My home page</h1>
    <p>Hello, I am Yogi and this is my home page.</p>
    <p>I also wrote a book! Read it
      <a href="#">here</a>.</p>
  </body>
</html>
```

This is how we would represent the document hierarchy above as a tree of nodes:

<img src="/images/dom.png" />

But how can we combine HTML and JavaScript? The `<script>` tag allows us to include a piece of JavaScript in a HTML document.
```html
<script>
    alert("hello!");
</script>
```
Such a script will run as soon as its `<script>` tag is encountered while the browser reads the HTML. This page will pop up a dialog when opened—the alert function resembles prompt, in that it pops up a little window, only shows a message.

Including large programs directly in HTML documents is often impractical. The `<script>` tag can be given an src attribute to fetch a script file (a text file containing a JavaScript program) from a URL.
```html
<script src="scripts/script.js"></script>
```
The script.js file includes a line alert("hello!");, and the result is exactly the same.
### Exercise 1:
1. Look the file `index.html` and `script.js` in the folder ***scripts***
2. Open `index.html` with the Visual Studio Live Server and See how the alert appears
3. Right a name in the input `Something to do` and click **Create** button, right know you don't have to understand the code, but, what do you think the code is doing?
### Access DOM elements
The DOM offers a lot of useful functions we can use to find elements on the page. Here are some we'll be using today:
```js
document.querySelector("#mainHeader");
document.querySelectorAll("p");
```
Both `.querySelector()` and `.querySelectorAll()` accept a CSS selector as an input. `.querySelector()` selects only the first element it finds, `.querySelectorAll()` selects all elements (it returns a NodeList, which you can think of as being similar to an array; it is an ordered sequence of DOM elements which you can loop through like with an array. The difference is that many common array methods like `.map` or `.concat` can't be used on a NodeList. To turn a NodeList into an array, you can use `Array.from`, e.g. 
```js
let elementArray = Array.from(document.querySelectorAll("div"));
```
### Exercise 2:
1. Delete all the existing code in `script.js` in the folder ***scripts***
2. Write code to access **Create** button element using `document.querySelector()`
3. Log this element using `console.log()`

&nbsp;
The elements returned by `document.querySelector()` have the same properties as a normal HTML element: for example, you can get access to their css styles.
```js
let myElement = document.querySelector("#myElement");
myElement.style.backgroundColor = "red";
```
### Exercise 3:
1. Change background color of **Create** button to *green* using `.style` property
### Attach events to DOM elements
Once you retrieve an element using `.querySelector()`, you can attach an event to it. An event is any action that can be performed on that element. For now, we will just use the click event:
```js
let myButton = document.querySelector("#myButton");
myButton.addEventListener("click", alertSomething);

function alertSomething() {
  alert("Something");
}
```
You will notice in the example that we passed a second argument to `.addEventListener()`. That second argument is the function that we want to invoke when that event has happened.
### Exercise 4:
1. Delete all the existing code in `script.js` in the folder ***scripts***
2. Write code to access the form with id `#new-todo` using `document.querySelector()`
3. Add a `submit` event to this form using `.addEventListener()` which will trim the value of the input `Something to do` and log it when you click **Create** button

```js
document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.text.value.trim()
    console.log(text)
})
```
### Exercise 5:
1. Create an empty array called `todos`
2. In the next line create a function called `createTodo` which takes one paramter named `text`.
3. This function should add the value of `text` parameter to the `todos` array using `.push()`
4. Modify the event created in **Exercise 4** to validate `text` and then call `createTodo` whenever the form is submitted.
   **Hint** Use `createTodo` function inside second parameter of `addEventListener()`
5. Clear the value of the input `Something to do` once a new todo is created
6. Log the todos array.

**Your code should look like this**

```js
let todos = []

const createTodo = (text) => {
    todos.push(text)
}

document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.text.value.trim()

    if (text.length > 0) {
        createTodo(text)
        e.target.elements.text.value = ''
    }

    console.log(todos)
})
```
### Create and Manipulate DOM elements
Using the `document`, you can also create new elements. These elements will not appear until you append them as a child of another element though
&nbsp;
```js
let paragraph = document.createElement("p"); // here we're just creating it, element is not visible yet
myElement.appendChild(paragraph); // now the element is added to our view, but it's empty
```
&nbsp;

`document.createElement()` accepts as an input any element type. So for example `document.createElement("article")` will create a new article element.

You can then change the text displayed inside elements using the `textContent` or `innerText` property:
&nbsp;
```js
paragraph.innerText = "How are you?"; // now we can see the text displaying on the screen
```
&nbsp;
### Exercise 6:
1. Create a function `generateTodoDOM` which will take one parameter `todo`
2. Create a `label` element and store it into `todoEl` variable using `document.createElement('label')`
3. Similarly create a `div` element and store it into `containerEl`
4. Now create a `span` element and store it into `todoText`
5. Assign `todo` value to `todoText` using `textContent` property
6. Once `todoText` has been assigned `todo` value, append it to `containerEl` using `.appendChild()`
7. Add `'list-item'` class to `todoEl` and `'list-item__container'` class to `containerEl` using `.classList.add()`
   **Note:** While it's really easy to change styles directly on elements using the `style` property, it is not usually a good idea to mix JavaScript and CSS. To solve this, we can use the `.classList.add()` or `.classList.remove()` property to set or remove the class for an element instead of changing its styles directly
8. Append `containerEl` to `todoEl` using `.appendChild()` 
9.  Finally return `todoEl`

```js
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const todoText = document.createElement('span')


    // Setup the todo text
    todoText.textContent = todo
    containerEl.appendChild(todoText)

    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    return todoEl
}
```
&nbsp;
In **Exercise 6** we have created a function called `generateTodoDOM` which takes a todo and creates HTML elements with some classes for the respective todo. Although most of the work is done but we still can not see any todo listed on the screen. This is normal since we have not appended any of these elements to **DOM**.
### Exercise 7:
1. Create a function `renderTodos` which will take one parameter an array of `todos`
2. Write code to access `div` with id `'todos'` and store it into `todoList` variable
3. Remove everything inside this `todoList` using `innerHTML` property
   **Hint**: Otherwise we will append items multiple times.
4. Create DOM elements for all items of `todos` array by using `forEach` method and `generateTodoDOM` function and append return value of `generateTodoDOM` to `todoList` using `.appendChild()`
5. Use `renderTodos` function instead of `console.log(todos)` in step 6 of **Exercise 5**.

```js
const renderTodos = (todos) => {
    const todoList = document.querySelector('#todos')
    todoList.innerHTML = ''

    todos.forEach((todo) => {
            todoList.appendChild(generateTodoDOM(todo))
    })
}
```
&nbsp;
Now we will be able to see all todos on the screen. Whenever a new todo will be added, we will call this `renderTodos` function with the `todos` array as an argument.

Lets add a message to the screen when there is no todos to show
### Exercise 8:
1. Modify `renderTodos` function using conditional statement to check whether `todos` array is empty.
2. If its not empty then `generateTodoDOM` for each todo and append them to `todoList`
3. Else create a `p` element and store it into `messageEl` variable.
   3.1 Add `'empty-message'` class to `messageEl`  
   3.2 Assign `'There are no todos to show'` string to `messageEl` using `textContent`
   3.3 Append `messageEl` to `todoList`
4. Invoke `renderTodos` function with `todos` array as an argument at the end of `script.js` file

```js
const renderTodos = (todos) => {
    const todoList = document.querySelector('#todos')
    todoList.innerHTML = ''

    if (todos.length > 0) {
        todos.forEach((todo) => {
            todoList.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'There are no todos to show'
        todoList.appendChild(messageEl)
    }
}

renderTodos(todos);
```
### Delete todos
Now that we are able to create new todo items and add them to `todoList`, Let's create a function to remove todo item from `todoList`
### Exercise 9:
1. Create a function called `removeTodo` which will take a parameter `todoEl`
2. Find the index of this `todoEl` in `todos` array using `.findIndex()` and store the index value into `todoIndex` variable
3. Check whether `todoIndex > -1`, if true then remove the element from `todos` array using `.splice()`
```js
const removeTodo = (todoEl) => {
    const todoIndex = todos.findIndex((todo) => {
        return todo.toLowerCase() === todoEl.textContent.toLowerCase()
    })
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}
```
&nbsp;
Once the `removeTodo` function is created, let's add a delete button with a `click` event to remove todo item from `todoList`
### Exercise 10:
1. Modify `generateTodoDOM` function to add a remove button.
2. Create a `button` element and store it into `removeButton` variable
3. Assign `'remove'` string to `removeButton` using `textContent`
4. Add `'button'`, `'button--text'` classes to `removeButton`  
5. Append `removeButton` to `todoEl`
6. Add a `click` event to `removeButton` using `.addEventListener()` which will invoke `removeTodo` function with `todoText` as an argument.
7. Invoke `renderTodos` function as well inside the `click` event handler function to update the list of todos on the screen

```js
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const todoText = document.createElement('span')

    // Setup the todo text
    todoText.textContent = todo
    containerEl.appendChild(todoText)

    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Setup the remove button
    const removeButton = document.createElement('button')
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todoText)
        renderTodos(todos)
    })

    return todoEl
}
```
&nbsp;
## Part-2 Objects in JavaScript
When you look at the world around you, what do you see? You see objects. In programming, objects are nothing more than representations of things. In this section you will learn how to manage objects, and arrays of objects.
#### By the end of this section students should be able to:
- Define what an object is in JavaScript
- Be able to write code that can use an object to store data
- Be able to write code that changes the properties of an object
- Be able to write code that can retrieve data from an object
- Write and call methods inside JavaScript objects
- Use Objects when contained inside an array
- Write code that uses objects built-in methods
- Write code that can iterate through an object
### Object Basics
###### [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics#object_basics)
An object is a collection of related data and/or functionality (which usually consists of several variables and functions — which are called properties and methods when they are inside objects.) Let's work through an example to understand what they look like.

As with many things in JavaScript, creating an object often begins with defining and initializing a variable. During this section we will work in `oop.js` file inside `scripts` folder, write the following code and run in the terminal using `node`:
```js
const person = {};
console.log(person)
console.log(typeof(person))
```
Congratulations, you've just created your first object. Job done! But this is an empty object, so we can't really do much with it. Let's update the JavaScript object in our file to look like this:
```js
const person = {
  name: ['Bob', 'Smith'],
  age: 32,
  gender: 'male',
  interests: ['music', 'skiing'],

  bio: function() {
    console.log(this.name[0] + ' ' + this.name[1] + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
  },

  greeting: function() {
    console.log('Hi! I\'m ' + this.name[0] + '.');
  }
};
```
After adding all this code to `person` object, add the following code below this object and run `oop.js` file in the terminal using `node`:
```js
console.log(person.name)
console.log(person.name[0])
console.log(person.age)
console.log(person.interests[1])
person.bio()
person.greeting()
```
You have now got some data and functionality inside your object, and are now able to access them with some nice simple syntax!

So what is going on here? Well, an object is made up of multiple members, each of which has a name (e.g. `name` and `age` above), and a value (e.g. `['Bob', 'Smith']` and `32`). Each name/value pair must be separated by a comma, and the name and value in each case are separated by a colon. The syntax always follows this pattern:
```js
const objectName = {
  member1Name: member1Value,
  member2Name: member2Value,
  member3Name: member3Value
};
```
The value of an object member can be pretty much anything — in our person object we've got a string, a number, two arrays, and two functions. The first four items are data items, and are referred to as the object's **properties**. The last two items are functions that allow the object to do something with that data, and are referred to as the object's **methods**.

An object like this is referred to as an **object literal** — we've literally written out the object contents as we've come to create it. This is in contrast to objects instantiated from classes, which we'll look at later on.

It is very common to create an object using an object literal when you want to transfer a series of structured, related data items in some manner, for example sending a request to the server to be put into a database. Sending a single object is much more efficient than sending several items individually, and it is easier to work with than an array, when you want to identify individual items by name.
### Dot notation
Above, you accessed the object's properties and methods using **dot notation**. The object name (person) acts as the **namespace** — it must be entered first to access anything **encapsulated** inside the object. Next you write a dot, then the item you want to access — this can be the name of a simple property, an item of an array property, or a call to one of the object's methods, for example:
```js
person.age
person.interests[1]
person.bio()
```
#### Sub-namespaces
It is even possible to make the value of an object member another object. For example, try changing the name member from
```js
name: ['Bob', 'Smith'],
```
to
```js
name : {
  first: 'Bob',
  last: 'Smith'
},
```
Here we are effectively creating a **sub-namespace**. This sounds complex, but really it's not — to access these items you just need to chain the extra step onto the end with another dot. Replace previous `console.log()` statements with these and run it in terminal using `node`:
```js
console.log(person.name.first)
console.log(person.name.last)
```
**Important:** At this point you'll also need to go through your method code and change any instances of
```js
name[0]
name[1]
```
to
```js
name.first
name.last
```
Otherwise your methods will no longer work.
### Bracket notation
There is another way to access object properties — using bracket notation. Instead of using these:
```js
person.age
person.name.first
```
You can use
```js
person['age']
person['name']['first']
```
This looks very similar to how you access the items in an array, and it is basically the same thing — instead of using an index number to select an item, you are using the name associated with each member's value. It is no wonder that objects are sometimes called **associative arrays** — they map strings to values in the same way that arrays map numbers (indices) to values.
### Setting object members
So far we've only looked at retrieving (or **getting**) object members — you can also **set** (update) the value of object members by declaring the member you want to set (using dot or bracket notation), like this:
```js
person.age = 45;
person['name']['last'] = 'Cratchit';
```
Try entering the above lines, and then getting the members again to see how they've changed, like so:
```js
console.log(person.age)
console.log(person['name']['last'])
```
Setting members doesn't just stop at updating the values of existing properties and methods; you can also create completely new members. Try these:
```js
person['eyes'] = 'hazel';
person.farewell = function() { console.log("Bye everybody!"); }
```
You can now test out your new members:
```js
console.log(person['eyes'])
person.farewell()
```
One useful aspect of bracket notation is that it can be used to set not only member values dynamically, but member names too. Let's say we wanted users to be able to store custom value types in their people data, by typing the member name and value into two text inputs. We could get those values like this:
```js
let myDataName = nameInput.value;
let myDataValue = nameValue.value;
```
We could then add this new member name and value to the `person` object like this:
```js
person[myDataName] = myDataValue;
```
To test this, try adding the following lines into your code, just below the closing curly brace of the `person` object:
```js
let myDataName = 'height';
let myDataValue = '1.75m';
person[myDataName] = myDataValue;
console.log(person.height);
```
Now try saving and running it in terminal using `node`

**Note:** Adding a property to an object using the method above isn't possible with dot notation, which can only accept a literal member name, not a variable value pointing to a name.
### What is "this"?
You may have noticed something slightly strange in our methods. Look at this one for example:
```js
greeting: function() {
  console.log('Hi! I\'m ' + this.name.first + '.');
}
```
You are probably wondering what "this" is. The `this` keyword refers to the current object the code is being written inside — so in this case `this` is equivalent to `person`. So why not just write `person` instead? As you'll see in the following section of **Object-oriented JavaScript**, when we start creating constructors and so on, `this` is very useful — it always ensures that the correct values are used when a member's context changes (for example, two different person object instances may have different names, but we want to use their own name when saying their greeting).

Let's illustrate what we mean with a simplified pair of person objects:
```js
const person1 = {
  name: 'Chris',
  greeting: function() {
    console.log('Hi! I\'m ' + this.name + '.');
  }
}

const person2 = {
  name: 'Deepti',
  greeting: function() {
    console.log('Hi! I\'m ' + this.name + '.');
  }
}
```
In this case, `person1.greeting()` outputs **"Hi! I'm Chris."**; `person2.greeting()` on the other hand outputs **"Hi! I'm Deepti."**, even though the method's code is exactly the same in each case. As we said earlier, `this` is equal to the object the code is inside — this isn't hugely useful when you are writing out object literals by hand, but it really comes into its own when you are dynamically generating objects (for example using constructors). It will all become clearer later on.
### Object built-in methods
Since we started JavaScript, we have used `console.log()` to print things to our console.

In JavaScript module I, you learned about array methods like `.map()`, and `.filter()`. These are what we call built-in methods, and they're part of the JavaScript language. Someone else created these methods, and we can use them in our code.

Like arrays, objects have built-in methods that can help us. In this section, we will learn about `Object.keys()` and `Object.values()`.
#### Object.keys()
`Object.keys()` returns an array whose elements are strings corresponding to the enumerable properties found directly upon `object`. The ordering of the properties is the same as that given by looping over the properties of the object manually.
##### Examples:
```js
// simple array
const arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

// array-like object
const obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

// array-like object with random key ordering
const anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj)); // console: ['2', '7', '100']

// getFoo is a property which isn't enumerable
const myObj = Object.create({}, {
  getFoo: {
    value: function () { return this.foo; }
  }
});
myObj.foo = 1;
console.log(Object.keys(myObj)); // console: ['foo']
```
#### Object.values()
`Object.values()` returns an array whose elements are the enumerable property values found on the object. The ordering of the properties is the same as that given by looping over the property values of the object manually.
##### Examples:
```js
const obj = { foo: 'bar', baz: 42 };
console.log(Object.values(obj)); // ['bar', 42]

// Array-like object
const arrayLikeObj1 = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.values(arrayLikeObj1 )); // ['a', 'b', 'c']

// Array-like object with random key ordering
// When using numeric keys, the values are returned in the keys' numerical order
const arrayLikeObj2 = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.values(arrayLikeObj2 )); // ['b', 'c', 'a']

// getFoo is property which isn't enumerable
const my_obj = Object.create({}, { getFoo: { value: function() { return this.foo; } } });
my_obj.foo = 'bar';
console.log(Object.values(my_obj)); // ['bar']

// non-object argument will be coerced to an object
console.log(Object.values('foo')); // ['f', 'o', 'o']
```
### Loop through an Object
The `for...in` statement iterates over all enumerable properties of an object that are keyed by strings (ignoring ones keyed by Symbols), including inherited enumerable properties.
##### Examples:
```js
var obj = {a: 1, b: 2, c: 3};

for (const prop in obj) {
  console.log(`obj.${prop} = ${obj[prop]}`);
}

// Output:
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"
```
&nbsp;
Now that we know what are Objects in JavaScript and how to work with them. Let's continue with Todo application by creating an Object for each todo item instead of storing them as Strings.
### Exercise 11:
1. Modify `createTodo` function
2. Create an Object with two properties:
   2.1 `title` which will contain `text` value
   2.2 And `completed` which is a boolean to represent status of todo item 
```js
const createTodo = (text) => {
    todos.push({
        title: text,
        completed: false
    })
}
```
Since we are not working with Array of strings, we need to change how we generate DOM elements for each todo object and how to render todos on the screen.
### Exercise 12:
1. Modify `generateTodoDOM` function with parameter `todoObj` instead of `todo`
2. First create an `input` element to represent `completed` property of `todoObj` and store it into `checkbox` variable
3. Set attribute `type = 'checkbox'` of this `input` element by using `.setAttribute('type', 'checkbox')`
4. Assign `checked` property of `checkbox` equal to `todoObj.completed` property value
5. Append `checkbox` to `containerEl` by using `.appendChild()`
   **Note:** It is important in which order you append different element to a parent element. This is why `checkbox` code inside `generateTodoDOM` function comes before rest of the code.
6. Add a `change` event to `checkbox` by using `.addEventListener()` with a callback function
7. Inside this callback function invoke `toggleTodo` function with `todoObj.title` as an argument.
   **Note:** `toggleTodo` function doesn't exist but we will create it in next step 
9.  Now invoke the `renderTodos()` function inside this callback function to update view on the screen
10. Change `todoText` content to `todoObj.title` because we are working with an object not a string.
11. Finally modify `removeButton` button event listener to call `removeTodo` function with `todoObj.title` instead of `todoText` element


```js
const generateTodoDOM = (todoObj) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const todoText = document.createElement('span')

    // Setup todo checkbox
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todoObj.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todoObj.title)
        renderTodos(todos)
    })

    // Setup the todo text
    todoText.textContent = todoObj.title
    containerEl.appendChild(todoText)

    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Setup the remove button
    const removeButton = document.createElement('button')
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todoObj.title)
        renderTodos(todos)
    })

    return todoEl
}
```
Now we need to create `toggleTodo` function with a parameter `title` and update `removeTodo` function as well to accept a parameter `title`
### Exercise 13:
1. Create `toggleTodo` function with `title` parameter
2. Find the todo object with title equal to `title` parameter in `todos` array using `.find()` and store it into `todo` variable
3. Check whether `todo` exists, if true then change `completed` property value to opposite of what it is
   **Hint:** `todo.completed = !todo.completed`
4. Modify `removeTodo` function with a parameter `title` instead of `todoEl`
5. Modify callback function of `.findIndex()` to compare `todo.title` with `title` parameter since we are working with an array of objects instead of array of strings
```js
const toggleTodo = (title) => {
    const todo = todos.find((todo) => todo.title.toLowerCase() === title.toLowerCase())

    if (todo) {
        todo.completed = !todo.completed
    }
}

const removeTodo = (title) => {
    const todoIndex = todos.findIndex((todo) => todo.title.toLowerCase() === title.toLowerCase())

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}
```
### Filter Todos
Let's create some filters to search todos by title and/or by completed status
### Exercise 14:
1. Create a `filters` object by using object literal `{...}`
2. Add `searchTitle` property with value empty string
3. Add `finished`, `unfinished` properties with value `false`
```js
const filters = {
    searchTitle: '',
    finished: false,
    unfinished: false
}
```
Let's create a function which will modify the `filters` object when filters are applied
### Exercise 15:
1. Create `setFilters` function with one parameter `updates` which is an object
2. Check whether `updates` object contains a property `searchTitle` of type `string`, if yes then set `filters.searchTitle = updates.searchTitle`
3. Similarly check whether `updates` object contains a property `finished` of type `boolean`, if yes then set `filters.finished = updates.finished`
4. Repeat step 3. for `unfinished` property
```js
const setFilters = (updates) => {
    if (typeof updates.searchTitle === 'string') {
        filters.searchTitle = updates.searchTitle
    }
    if (typeof updates.finished === 'boolean') {
        filters.finished = updates.finished
    }
    if (typeof updates.unfinished === 'boolean') {
        filters.unfinished = updates.unfinished
    }
}
```
Now let's add event listeners to HTML elements to set filters using `setFilters` function when search input is provided and/or finished/unfinished checkboxes are checked/unchecked
### Exercise 16:
1. Add `input` event to input element with id `search-text` by using `.addEventListener()`
2. Inside callback function
   2.1 Invoke `setFilters` function with an object as an argument with property `searchTitle` and property's value equal to `e.target.value`
   2.2 Invoke `renderTodos` function to update the view on the screen
3. Add `change` event to input element with id `finished` by using `.addEventListener()`
4. Inside callback function
   4.1 Invoke `setFilters` function with an object as an argument with property `finished` and property's value equal to `e.target.checked`
   4.2 Invoke `renderTodos` function to update the view on the screen
5. Repeat step 3. and 4. for input element with id `unfinished`
```js
document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchTitle: e.target.value
    })
    renderTodos(todos)
})

document.querySelector('#finished').addEventListener('change', (e) => {
    setFilters({
        finished: e.target.checked
    })
    renderTodos(todos)
})

document.querySelector('#unfinished').addEventListener('change', (e) => {
    setFilters({
        unfinished: e.target.checked
    })
    renderTodos(todos)
})
```
&nbsp;
We have successfully created `filters` object and `setFilters` function and added event listeners to update `filters` object. The last step is to apply these filters while rendering Todos on the screen. To achieve that we need to modify `renderTodos` function and then our application will be fully functional.
### Exercise 17:
1. Modify `renderTodos` function to filter `todos` array by using `.filter()` and checking for each todo whether `todo.title` includes `filters.searchTitle`
2. Create `filteredTodos` variable and store the result of step 1. in it
3. Using conditional to check whether `filters.finished && filters.unfinished` is true, if yes then do nothing
4. Else if `filters.finished` is true, then filter `filteredTodos` array using `.filter()` for todo's which are completed and reassign the result to `filteredTodos`
5. Repeat step 4. for `filters.unfinished`
6. Replace `todos` array with `filteredTodos` array in the rest of the code inside `renderTodos` function

```js
// Render application todos based on filters
const renderTodos = (todos) => {
    // filtered Todos
    let filteredTodos = todos.filter((todo) => todo.title.toLowerCase().includes(filters.searchTitle.toLowerCase()))
    if(filters.finished && filters.unfinished) {
      // do nothing
    } else if(filters.finished) {
      filteredTodos = filteredTodos.filter((todo) => todo.completed)
    } else if(filters.unfinished) {
      filteredTodos = filteredTodos.filter((todo) => !todo.completed)
    }
    
    const todoList = document.querySelector('#todos')
    todoList.innerHTML = ''

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoList.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'There are no todos to show'
        todoList.appendChild(messageEl)
    }
}
```