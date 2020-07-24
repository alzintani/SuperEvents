
helper( object = null ) {

  this.helper.object = object;

  /**
   * easing function
   *
   * @param    {<type>}  [params={}]  The parameters
   */
  this.helper.easing = ( params = {} ) => {
    let duration = params.duration;
    let cubic = params.cubic;
    let delay = params.delay;

    if ( object instanceof Element ) {
      object.style.transition = `all ${duration}s cubic-bezier(${cubic})`;
    } else if ( object[0] instanceof Element ) {
      let tmpDelay = 0;
      Array.prototype.forEach.call( object, el => {
        let d = ` ${tmpDelay.toFixed(1)}s`;
        if ( delay !== 0 ) {
        tmpDelay = tmpDelay + delay;
        }
        el.style.transition = `all ${duration}s${d} cubic-bezier(${cubic})`;
      })
    }
  }

  /**
   * css function
   *
   * @param    {<type>}  [style1={}]  The style 1
   * @param    {<type>}  [style2={}]  The style 2
   * @return   {<type>}  { description_of_the_return_value }
   */
  this.helper.css = (style1 = {}, style2 = {}) => {

    const object = this.helper.object;

    const setStyle = (element) => {
      if ( ! element ) {
        return;
      }
      if (style1 && typeof style1 === 'object') {
        for (let key in style1) {
          element.style[key] = style1[key];
        }
      }
      if (style2 && typeof style2 === 'object') {
        for (let key in style2) {
          element.style[key] = style2[key];
        }
      }
    }

    if ( object[0] instanceof Element ) {
      Array.prototype.forEach.call( object, el => {
        setStyle(el);
      })
    } else if ( object instanceof Element ) {
      setStyle( object );
    }
    return this.helper;
  }

  /**
   * manage class for elements
   *
   * @param    {<type>}  c     { parameter_description }
   * @return   {<type>}  { description_of_the_return_value }
   */
  this.helper.addClass = (c) => {
    if ( typeof c !== 'string' ) {
      return this.helper;
    }
    
    let object = this.helper.object;

    if ( 'function' === typeof object.forEach ) {
      Array.prototype.forEach.call( object, el => {
        el.classList && el.classList.add(c);
      })
    } else {
      object.classList && object.classList.add(c);
    }
    return this.helper;
  }

  /**
   * remove class for elements
   *
   * @param    {<type>}  c     { parameter_description }
   * @return   {<type>}  { description_of_the_return_value }
   */
  this.helper.removeClass = (c) => {
    if ( typeof c !== 'string' ) {
      return this.helper;
    }

    let object = this.helper.object;
    if ( 'function' === typeof object.forEach ) {
      Array.prototype.forEach.call( object, el => {
        el.classList && el.classList.remove(c);
      })
    } else {
      object.classList && object.classList.remove(c);
    }
    return this.helper;
  }

  /**
   * adding text to element
   *
   * @param    {<type>}  text  The text
   * @return   {<type>}  { description_of_the_return_value }
   */
  this.helper.text = (text) => {
    var textNode = document.createTextNode(text);
    this.helper.object.appendChild(textNode);
    return this.helper;
  }

  /**
   * Calculate color changes
   *
   * @param    {string}  fromValue  The from value
   * @param    {string}  toValue  To value
   * @param    {number}  _progress  The progress
   * @return   {<type>}  { description_of_the_return_value }
   */
  this.helper.colorCalculater = ( fromValue, toValue, _progress ) => {
    fromValue = fromValue.trim();
    toValue = toValue.trim();
    _progress = _progress/100;

    if (
      (fromValue.indexOf('#') !== 0 || toValue.indexOf('#') !== 0) &&
      (fromValue.indexOf('rgb') !== 0 || toValue.indexOf('rgb') !== 0)
    ) {
      return;
    }

    if ( fromValue.indexOf('#') === 0 ) {
      fromValue = this.helper.hexToRgb( fromValue );
    }
    if ( toValue.indexOf('#') === 0) {
      toValue = this.helper.hexToRgb( toValue );
    }

    const getValue = ( fromRGB, toRGB ) => {
      if ( fromRGB && toRGB && fromRGB.indexOf('rgb') !== 0 || toRGB.indexOf('rgb') !== 0 ) {
        return fromRGB;
      }
      const fromSubstr = fromRGB.indexOf('rgba') === 0 ? 5 : 4;
      const toSubstr = toRGB.indexOf('rgba') === 0 ? 5 : 4;
      let value = [];

      fromRGB = fromRGB.substr(fromSubstr).split(")")[0].split(',');
      toRGB = toRGB.substr(toSubstr).split(")")[0].split(',');

      if ( fromRGB.length === toRGB.length ) {
        let i = 0;
        fromRGB.forEach( v => {
          if ( i !== 3 ) {
            value[i] = ((fromRGB[i] - (_progress * fromRGB[i])) + (_progress * toRGB[i])).toFixed(0);
          } else {
            value[i] = ((fromRGB[i] - (_progress * fromRGB[i])) + (_progress * toRGB[i])).toFixed(2);
          }
          i++;
        });
      }
      let type = (fromRGB.length) === 4 ? 'rgba' : 'rgb';

      return `${type}(${value.join(',')})`;
    }

    return getValue(fromValue, toValue);
  }



  /**
   * Convert HEX color to RGB color
   *
   * @param    {string}   hex   The hexadecimal
   * @return   {(string)}       { description_of_the_return_value }
   */
  this.helper.hexToRgb = (h) => {
    let r = 0, g = 0, b = 0;
    // 3 digits
    if (h.length == 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
      // 6 digits
    } else if (h.length == 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }
    return `rgb(${r}, ${g}, ${b})`;
  }

  /**
   * Convert RBG color to HEX
   *
   * @param    {string}   rgb     The rgb color
   * @return   {string}         HEX color
   */
  this.helper.rgbToHex = (rgb) => {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);

    let r = (+rgb[0]).toString(16);
    let g = (+rgb[1]).toString(16);
    let b = (+rgb[2]).toString(16);

    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;

    return "#" + r + g + b;
  }


  return this.helper;
}
