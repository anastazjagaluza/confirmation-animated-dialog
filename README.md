<h1 align="center">confirmation-animated-dialog</h1>
<p align="center">
<a href="https://www.npmjs.com/package/confirmation-animated-dialog"><img src="https://i.pinimg.com/originals/0d/59/22/0d5922d05bf2866c850a470f3ee84c0b.png" height="30"/></a>
</p>
<br/>

* Simple API that can return an animated, accessible dialog window
* ARIA-standardized
* Returns the answer from the user in form of a boolean
* Can have either two choice butttons or just one
* All styling and content can be easily customized!

<img src="https://user-images.githubusercontent.com/38051431/67273586-0f0dbc00-f4bf-11e9-9f11-b98e5c662544.gif">

## ➤ Table of Contents
* [➤ Description](#-description)
* [➤ 0. Installation](#-0-installation)
* [➤ 1. Customize content](#-1-customize-content)
* [➤ 2. Customize styling](#-2-customize-styling)
* [➤ 3. Default settings](#-3-default-settings)
* [➤ 4. Reading the response](#-4-reading-the-response)
* [➤ License](#-license)

## ➤ Description
This is a simple and user-friendly dialog window, created according to the ARIA accessibility standards. The dialog has a backdrop shadow and can handle a yes/no question. It passes the response further as a boolean, so the developer can display next part of the website depending on whether the user pressed "yes" or "no", or just closed the window, which is also interpreted as "no".

The dialog can be customized to displaying only one button, f.ex. "Accept" or "Next". In that case, pressing that button give the response of "true", and closing the window is interpreted as "false".

After closing the window the focus is back to the element, that was focused right before opening the dialog.
In order to avoid user's mistakes, the dialog is always focused on the "no" option once opened if there are two buttons, and if there is only one - the initial focus is on the "close".
	
## ➤ 0. Installation
Install the component...
```javascript
npm i confirmation-animated-dialog
```
...and import it afterwards
```javascript
<script type="module">
    import { showModal } from './lib/index.js';
  </script> 
```
## ➤ 1. Customize content

Within the modal you can customize almost everything. Let's start with the text content of the header, description and buttons.
In order to open the open the dialog window, you need to call a function, to which you will pass the parameters responsible for the text content and for the information whether your dialog should have 2 buttons, or only one.

Here you can see in which order you should pass which arguments:
```javascript
showModal(headline, content, buttons, yes, no)
```
<b>Let's try it on an example.</b>
Let's say, you are taking care of a virtual cat, so you are building a tool to feed him.
Let's say, you also want the tool to have a header, that says "I am hungry", and the content: "Will you feed me?". It should also have two buttons "Feed" and "Decline". Let's say, you want the dialog to be open on the click of the only button you have on your website.
This is how you would create this dialog:
```javascript
document.querySelector("button").addEventListener("click", function(){
        let openModal = showModal("I am hungry", "Will you feed me?", true, "Feed", "Decline");
    });
```
<img src="https://user-images.githubusercontent.com/38051431/67272481-ea184980-f4bc-11e9-93b1-89a938fdbc98.png">

The boolean "buttons" is responsible for managing whether there should be two buttons or only one. If f.ex. you want to always only feed the cat and never decline the food to him, you could create only one button instead. Then you can pass only the argument for the "yes" button:

```javascript
document.querySelector("button").addEventListener("click", function(){
        let openModal = showModal("I am hungry", "Will you feed me?", false, "Always feed");
    });
```
<img src="https://user-images.githubusercontent.com/38051431/67272542-0ddb8f80-f4bd-11e9-8535-101eda28c4a3.png">

## ➤ 2. Customize styling
The module can be easily customized according to your style needs, just like in the example below:
<img src="https://user-images.githubusercontent.com/38051431/67274868-a6740e80-f4c1-11e9-8a6f-814dd59948d8.png">

In order to implement your own styling, all you need is to define the css variables mentioned in the code below.
The "--close-button-top" and "--close-button-right" are regarding the distance of the "x" close button from the edge of the dialog window. "--general-padding" sets the padding for the dialog window and responds to distances between the buttons and the text, so that the modal looks proportional.
```css
:host{
 --yes-button-background-color: pink;
 --yes-button-text-color: antiquewhite;
 --no-button-background-color: violet;
 --no-button-text-color: lightyellow;
 --dialog-background-color: black;
 --general-text-color: white;
 --close-button-text-color: white;
 --close-button-top: 1rem;
 --close-button-right: 1rem;
 --general-padding: 3rem;}

```
## ➤ 3. Default settings
If you decide not to apply any styling and not to add any values to the text of the buttons, the module will fallback to the default as in the demo:<br/>
```javascript
   document.querySelector("button").addEventListener("click", function(){
        let openModal = showModal("I am hungry", "Will you feed me?");
    });
```
<img src="https://user-images.githubusercontent.com/38051431/67275105-29956480-f4c2-11e9-9c98-03b044e61371.png">

## ➤ 4. Reading the response
The point of the dialog is obviously to get some information from the user. This kind of dialog is mainly for user to accept or decline some conditions, it could be also used f.ex. as a confirmation to change some data.
Whatever your needs are, you can retrieve the actual response from the dialog by reading the boolean, passed in the detail.
<b>Back to our example:</b><br/>
Let's say, you want to change the picture of the cat, depending on the user's response. If the user accepts to feed the cat, the response is "true", if the user declines or just closes the window, it's "no".
<br/>Here is how the response is handled in our hungry-cat example:
```javascript
    window.addEventListener("answer", e =>{
        if(e.detail.text()){ // meaning if the user's response is positive
            document.querySelector("img").src = "assets/cat1.png"
            document.querySelector("button").textContent = "The cat is very happy!"
        }else{ // if the user's response is negative
            document.querySelector("img").src = "assets/cat0.png"
            document.querySelector("button").textContent = "Try again!"
        }
    }
    });
```
## ➤ License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).
