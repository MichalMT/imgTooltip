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
|height|80|Height of tooltip (in px)|
|width|80|Width of tooltip (in px)|
|radius|15|Border radius.<br>If you use height 80, width 80 and radius 40, tooltip will be circle. If radius will be 0, tooltip will be square.|
|boxShadow|"0 0 8px #111"|Box shadow around tooltip|
|bgSize|"cover"|Background size.<br>You can also use for example percentage value. See [this link](https://www.w3schools.com/cssref/css3_pr_background-size.asp) for all accepted values.|
|bgPosition|"center center"|Background position|
|bgRepeat|"no-repeat"|Background repeat|
|href||Adds link (href attribute) to tooltip.<br>If trigger element alredy have href attribute you dont have to specify it. The same attribute will be automatically added to tooltip.|
|custom||Custom function.<br>In custom function you can make any additional changes. 
Keyword *'this'* is pointing at tooltip (HTML`<a>`element).|

<br>
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
