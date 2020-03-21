# SuperEvents V0.1
JavaScript library that handling any events in websites.


-----

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Quickstart](#quickstart)
- [API Documentation](#api-documentation)
  - [Event Functions](#event-functions)
  - [Action Functions](#action-functions)
  - [Easing](#easing-optional)
- [Contributing](#contributing)
- [Copyright and license](#copyright-and-license)

-----


## Description
Often, when events happen, you may want to do something. SuperEvents allows you applying actions to target elements when events are detected in source element.
SuperEvents right now can handel these events:-
* Click
* Hover
* Mouse Move
* Scroll


-----


## Installation
Download the latest version of SuperEvents from [GitHub repository](https://github.com/alzintani/SuperEvents/releases).
Include SuperEvents.min.js to your HTML file.
```HTML
<script src="/path/to/SuperEvents.min.js"></script>
```
And SuperEvents is ready to use!


-----


## Quickstart

First, you have to create an instance by passing the source element(s) and the target element(s) in object to SuperEvents, for example:-

```javascript
var scrollInstance = new SuperEvents({
  source: document.getElementById('any-element-id'),
  target: document.querySelectorAll('.click-example-target')
});
```
Then you have to call the event function and pass the required parameters (some of functions does't required any parameters or you can keep it empty to use default values) for example for scroll event call this function:
```javascript
var scrollEvent = scrollInstance.scroll({
  indicator: '80%',
  duration: '20%',
});
```
__indicator and duration is the space where you can apply the action.__


Then call the action function:-
```javascript
var scrollAction = scrollEvent.fromTo({ color: '#00FF00' }, { color: '#FF0000' });
```

finally call the easing function like this way:-
```javascript
scrollAction.easing({
  timing:'linear',
  duration: 0.3,
  delay: 0.3,
  cubicBezier: false
});
```
__easing function is Optional__

[See some examples with code](https://superevents.org/examples.html)

-----


## API Documentation

### Event Functions

* **scroll( params = {} ): {object}**
  * **Description**: The scroll event fires when the document view or an element has been scrolled.
  * **Parameters**:-
      params:
      * name: params
      * Description: The parameters
      * type: object
      * optional: true
      * default:

```javascript
{
    indicator: '80%', //
    duration: '20%', //
    listener: 'load', //
    debug: false // Display debug lines for scrolling postion and start and end ponts
}
```

-----

* **mousemove(): {object}**
  * **Description**: The mousemove function occurs when the mouse move over the target element.
  * **Parameters**:-
    null

-----

* **click()**
  * **Description**: Execute a JavaScript when click the target element.
  * **Parameters**:-
    null

-----

* **.mousemove()**
  * **Description**: The hover function occurs when the mouse pointer is over the selected element.
  * **Parameters**:-
    null

-----

### Action Functions

* **call( callback ): {object}**
  * **Description**: Scale in/out target element(s)
  * **Parameters**: Boolean true, default value:- true *(set it to false for scale out)*

-----

* **fromTo( scrollEventFrom = {}, scrollEventTo = {} ): {object}**
  * **Description**: From and To action
  * **Parameters**: Object {}, Object {}
      * example:

```javascript
event.fromTo(
  { color: '#FFF' },
  { color: '#999' }
)
```

-----

### Easing (Optional)
* **easing( params = {} ): {object}**
  * **Parameters**: String '', Float 1, Boolean false
      * example:

```javascript
event.easing({
  timing:'linear',
  duration: 0.3,
  delay: 0.3
});
```


-----


## Contributing
Want to get involved with SuperEvents? Here's how you can help.

[Fork](https://help.github.com/fork-a-repo/) SuperEvents, clone your fork, and configure the remotes:

```BASH
# Get code from repostery
git clone https://github.com/<your-username>/SuperEvents.git

# Change your way to cloned directory
cd SuperEvents

# Configure the remotes
git remote add upstream https://github.com/alzintani/SuperEvents.git
```


Install required packages `npm install` then run `npm run-script build` to build main files and documentation files.

Now you can run `npm start`

To display the documentation go to [http://localhost:3001](http://localhost:3001) from your browser.


-----


## Copyright and license
SuperEvents 2020 Hassan Matooq. Code released under the MIT license.

