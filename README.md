# imgTooltip
Create tooltips that contains images instead of text.


## How to use
### Basics
```javascript
imgTooltip.init({
  tooltips: [
    {
      el: 'classOfTriggerElement',
      img: 'image.jpg'
    }
  ]
});
```
**el** : Class of your HTML element(s). When you hover over this element, tooltip will appear. If more elements have this class, the same tooltip will appear when hovering over any of this elements.

**img** : Name and path to image that will be placed in this tooltip. Also could look like `/assets/images/0123.png` or `www.someDomain.com/img.png`.

### Options
**el** and **img** are required, but you can use other properties to customize tooltip

||default|description|
|---|---|---|
|height|80|height of tooltip (in px)|
|width|80|width of tooltip (in px)|
|radius|15|border radius *|
|boxShadow|"0 0 8px #111"||
|href||adds link (href attribute) to tooltip \**|
|custom||custom function ***|

#### \* radius
If you use height 80, width 80 and radius 40, tooltip will be circle. If radius will be 0, tooltip will be square.

#### \** href
If trigger element alredy have href attribute you dont have to specify it. The same attribute will be automatically added to tooltip.

#### *** custom
In custom function you can make any additional changes.<br>
Tooltip contains from two HTML elements. Parent `<a>` element with child element `<img>`.<br>
In custom function, keyword *'this'* is pointing at root element of tooltip (`<a>`).<br>
You can access `<img>` element with `this.firstChild`.

example with all options
```javascript
imgTooltip.init({
  tooltips: [
    {
      el: 'classOfTriggerElement',
      img: 'image.jpg',
      height: 100,
      width: 100,
      radius: 50,
      boxShadow: '1px 1px 5px #333',
      href: 'www.domain.com/xyz',
      custom: function(){
        this.style.border = 'solid 2px #111';
      }
    }
  ]
});
```

### Create 2 (or more) tooltips
```javascript
imgTooltip.init({
  tooltips: [
    {
      el: 'tooltip1',
      img: 'img1.jpg'
    },
    {
      el: 'tooltip2',
      img: 'img2.jpg'
    }
  ]
});
```

### Set options for all tooltips
In this example all tooltips will have radius 50px
```javascript
imgTooltip.init({
  radius: 50,
  tooltips: [
    {
      el: 'tooltip1',
      img: 'img1.jpg'
    },
    {
      el: 'tooltip2',
      img: 'img2.jpg'
    }
  ]
});
```

You can still change options for some tooltip(s). In this example first tooltip will have radius 25px and all others 50px.
```javascript
imgTooltip.init({
  radius: 50,
  tooltips: [
    {
      el: 'tooltip1',
      img: 'img1.jpg',
      radius: 25
    },
    {
      el: 'tooltip2',
      img: 'img2.jpg'
    },
    {
      el: 'tooltip3',
      img: 'img3.jpg'
    }
  ]
});
```

### Remove
You can remove all tooltips from DOM by calling remove method.
```javascript
imgTooltip.remove();
```
