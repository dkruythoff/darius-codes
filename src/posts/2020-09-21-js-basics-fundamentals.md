---
title: "JS from the ground up: Fundamentals"
summary: "Seeing how many people struggle to learn JS, and how long I've been working with it myself, I've decided to help out a bit. Here's how to get started added JS to a static HTML document."
date: 2020-09-21
tags:
  - js
  - fundamentals
---

## Adding JS to an existing document

Imagine having just learned HTML and maybe even CSS. You got this sweet static document, but you want to add some behaviour to it. That's where JS comes in.

Let's say you created the following clock:
```html
<!doctype html>
<html lang=en>
<title>clock example</title>
<meta charset=utf-8>
<style>
:root {
  font-size: 10vw;
  font-family: Verdana, Arial, sans-serif;
}
.clock {
  font-weight: bold;
  color: #ddd;
  display: inline;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.5rem;
  white-space: nowrap;
  background: #333;
  padding: 0.25rem;
}
</style>
<span class="clock">
  <span class="hours">19</span>:<span class="minutes">27</span>:<span class="seconds">33</span>
</span>
```
Which gives us this:  
![clock image](/images/clock.png)  
Not too shabby!

Ok, so this thing will only be right once per day.  
Let's make it dynamic with some JS. 

With this being a short and simple demo, we'll add the script to the page itself.  
For more complex stuff, it's better to put script in its own file though.
Since I used extremely simplified (yet valid) HTML, we can just add a `<script>` tag at the end of the document.

Inside the `<script>` tag, we'll need the current time.  
To get the current time, we can use Javascript's `Date` object.  

```javascript
const time = new Date()
```

## Getting the time

Great, now we have the current time.  
We'll need the hours, minutes, and seconds, like so:  

```javascript
const hours = time.getHours()
const minutes = time.getMinutes()
const seconds = time.getSeconds()
```

For more on the `Date` object check the [doc page for JS's Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

Now we have everything we need to update our clock.
Our `<script>` tag at the end of the document should look like this:

```javascript
const time = new Date()
const hours = time.getHours()
const minutes = time.getMinutes()
const seconds = time.getSeconds()
```

## Getting the HTML elements to update

Now we can update our clock HTML.  
In order to do that, we need to retrieve the HTML elements that we want to update.  
This can be done with `document.querySelector`, like so:

```javascript
const hoursElement = document.querySelector('.hours')
const minutesElement = document.querySelector('.minutes')
const secondsElement = document.querySelector('.seconds')
```

Since these classes are unique in this document, we can use them to retrieve the elements with a class (dot) selector. The variables `hoursElement`, `minutesElement`, and `secondsElement` now reference the three elements in our HTML, so we can update them from the script.

For more info on `document.querySelector` see the [doc page for document.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)

So, now we have the values for the clock, and the clock elements on the page.  
Our script should look like the following:

```javascript
const time = new Date()
const hours = time.getHours()
const minutes = time.getMinutes()
const seconds = time.getSeconds()
const hoursElement = document.querySelector('.hours')
const minutesElement = document.querySelector('.minutes')
const secondsElement = document.querySelector('.seconds')
```

## Updating HTML elements

Now we can set the element values to the current time. We can do this by setting the `innerText` property of our elements to the corresponding value from the `Date` object instance, like so: 

```javascript
hoursElement.innerText = hours
minutesElement.innerText = minutes
seconds Element.innerText = seconds
```

The full script should look like this:

```javascript
const time = new Date()
const hours = time.getHours()
const minutes = time.getMinutes()
const seconds = time.getSeconds()
const hoursElement = document.querySelector('.hours')
const minutesElement = document.querySelector('.minutes')
const secondsElement = document.querySelector('.seconds')

hoursElement.innerText = hours
minutesElement.innerText = minutes
secondsElement.innerText = seconds
```

If you run this, you might notice that the clock isn't showing 19:27:33 any more. Our clock is being updated!  

## Updating the time

You might notice that this only happens once. This makes perfect sense, since we only wrote code to update the clock once.  If we want to keep it updated, we'll have to update it every second, the smallest time unit on our clock.  
In order to run similar code multiple times, we'd best create a function.  
You know, one of these:

```javascript
function() {
  // do stuff
}
```

Now, we could jam all our code into a function, but we'll only need to update the same elements. Therefore, we could leave the element lookups outside of the function, like so: 

```javascript
const hoursElement = document.querySelector('.hours')
const minutesElement = document.querySelector('.minutes')
const secondsElement = document.querySelector('.seconds')

function updateClock() {
  const time = new Date()
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  hoursElement.innerText = hours
  minutesElement.innerText = minutes
  secondsElement.innerText = seconds
}
```

Since JS's function context allows access to stuff right outside the function, we can access variables right outside the function, so we only need to look up the elements once.  
Now that we have our function, we'll need to call it, like so:

```javascript
updateClock()
```

More about function can be found at the [doc page for Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/function#Constructor)

The entire script should now look like this: 

```javascript
const hoursElement = document.querySelector('.hours')
const minutesElement = document.querySelector('.minutes')
const secondsElement = document.querySelector('.seconds')

function updateClock() {
  const time = new Date()
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  hoursElement.innerText = hours
  minutesElement.innerText = minutes
  secondsElement.innerText = seconds
}

updateClock()
```

If you run this the clock should update, but still only once.  
We'll need to fun this function every second. For that we can use JS's built-in `setInterval` function:

```javascript
const timeout = setInterval(updateClock, 1000)
```

This will keep running the `updateClock` function every second (1000 milliseconds) indefinitely. Indefinite is a very long time, so we grab the output of the `setInterval` function to use it as a reference in case we ever want to stop the timeout.

Our entire script should now look like this and function the way we'd like:

```javascript
const hoursElement = document.querySelector('.hours')
const minutesElement = document.querySelector('.minutes')
const secondsElement = document.querySelector('.seconds')

function updateClock() {
  const time = new Date()
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  hoursElement.innerText = hours
  minutesElement.innerText = minutes
  secondsElement.innerText = seconds
}

const timeout = setInterval(updateClock, 1000)
```

## Bonus: Zero pad numbers

Now that we have a working clock, you might be as annoyed as I am about any number below 10 deforming our clock. It makes sense, since they are numbers and those aren't prefixed. We'll add a `zeropad` function:

```javascript
function zeropad(number) {
  return number < 10 ? `0${number}` : number
}
```

This function takes a number and checks if it's below 10. If it is, it returns a string with 0 and the number. If it's not, it returns the original number.  
We can just add the function to our script, and call it upon the setting of innerText on the digits. The whole thing would look like this:

```javascript
const hoursElement = document.querySelector('.hours')
const minutesElement = document.querySelector('.minutes')
const secondsElement = document.querySelector('.seconds')

function updateClock() {
  const time = new Date()
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  hoursElement.innerText = zeropad(hours)
  minutesElement.innerText = zeropad(minutes)
  secondsElement.innerText = zeropad(seconds)
}

function zeropad(number) {
  return number < 10 ? `0${number}` : number
}

const timeout = setInterval(updateClock, 1000)
```

Our clock is now updating properly and not jumping when numbers fall below 10.  
We've touched on the basics of adding JS to an existing HTML document, manipulating the document from the JS code, writing functions, and repeating functionality.

Stay tuned for the Death Clock update that might or might not happen...  

![Death Clock](/images/death-clock.jpg)
