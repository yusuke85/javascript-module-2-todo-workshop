# Javascript-Module-2-Todo-Workshop

### Getting started
Fork and Clone this repo.
&nbsp;
### Part-1 Javascript in the browser
After working on a black screen for few weeks, with the only output of ```console.log``` But JavaScript was not meant to be run in ```console.log``` It was meant to make web pages dynamic. Lots of websites are powered by JavaScript today, and some (like Facebook) cannot function at all without it. It's become that important to the look and feel of the website.

Today we will learn how to combine all this javascript knowledge with HTML and CSS in a browser, changing elements dynamically from user actions.
##### By the end of this section students should be able to:
- Define what the DOM is and what it does
- Use query selectors to retrieve elements from the DOM
- Use event listeners to respond to events that happen on the DOM
- Create DOM elements using JavaScript and add them to the DOM
- Manipulate DOM elements using JavaScript to change their properties
&nbsp;
#### The DOM
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

But how can we combine HTML and Javascript? The `<script>` tag allows us to include a piece of JavaScript in a HTML document.
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
&nbsp;
#### Exercise 1:
1. Look the file `index.html` and `script.js` in the folder ***scripts***
2. Open `index.html` with the Visual Studio Live Server and See how the alert appears
3. Right a name in the input `Something to do` and click **Create** button, right know you don't have to understand the code, but, what do you think the code is doing?
&nbsp;
#### Access DOM elements
The DOM offers a lot of useful functions we can use to find elements on the page. Here are some we'll be using today:
```js
document.querySelector("#mainHeader");
document.querySelectorAll("p");
```
Both `.querySelector()` and `.querySelectorAll()` accept a CSS selector as an input. `.querySelector()` selects only the first element it finds, `.querySelectorAll()` selects all elements (it returns a NodeList, which you can think of as being similar to an array; it is an ordered sequence of DOM elements which you can loop through like with an array. The difference is that many common array methods like `.map` or `.concat` can't be used on a NodeList. To turn a NodeList into an array, you can use `Array.from`, e.g. 
```js
let elementArray = Array.from(document.querySelectorAll("div"));
```
&nbsp;
#### Exercise 2:
1. Delete all the existing code in `script.js` in the folder ***scripts***
2. Write code to access **Create** button element using `document.querySelector()`
3. Log this element using `console.log()`

The elements returned by document.querySelector have the same properties as a normal HTML element: for example, you can get access to their css styles.
```js
let myElement = document.querySelector("#myElement");
myElement.style.backgroundColor = "red";
```
&nbsp;
#### Exercise 3:
1. Change background color of **Create** button to *green* using `.style` property
&nbsp;
#### Attach events to DOM elements
Once you retrieve an element using `.querySelector()`, you can attach an event to it. An event is any action that can be performed on that element. For now, we will just use the click event:
```js
let myButton = document.querySelector("#myButton");
myButton.addEventListener("click", alertSomething);

function alertSomething() {
  alert("Something");
}
```
You will notice in the example that we passed a second argument to `.addEventListener()`. That second argument is the function that we want to invoke when that event has happened.
&nbsp;
#### Exercise 4:
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
&nbsp;
#### Exercise 5:
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
    console.log(text)

    if (text.length > 0) {
        createTodo(text)
        e.target.elements.text.value = ''
    }

    console.log(todos)
})
```
&nbsp;
#### Create and Manipulate DOM elements
Using the `document`, you can also create new elements. These elements will not appear until you append them as a child of another element though
```js
let paragraph = document.createElement("p"); // here we're just creating it, element is not visible yet
myElement.appendChild(paragraph); // now the element is added to our view, but it's empty
```
`document.createElement()` accepts as an input any element type. So for example `document.createElement("article")` will create a new article element.

You can then change the text displayed inside elements using the `textContent` property:
```js
paragraph.innerText = "How are you?"; // now we can see the text displaying on the screen
```
&nbsp;
#### Exercise 6:
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
&nbsp;
#### Exercise 7:
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
&nbsp;
#### Exercise 8:
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