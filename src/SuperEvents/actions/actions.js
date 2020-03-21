
actions() {
  
  /**
   * call function description
   * 
   * @api        call       call( callback ): {object}
   * 
   * @params      {object}   [params={object}]   The parameters
   * @return     {Object}   instance            This function will return SuperEvent instance
   * 
   * @example    example    event.call(p => document.querySelector('.class').style.top(`${p}px`))
   */
  this.actions.call = ( callback ) => {
    callback()
  }

  /**
   * (From/To) function description
   *
   * @api        call       fromTo( scrollEventFrom = {}, scrollEventTo = {} ): {object}
   * 
   * @param      {object}   [params={object}]   The parameters
   * @return     {Object}   instance            This function will return SuperEvent instance
   * 
   * @example    example    event.fromTo({ color: '#FFF' }, { color: '#999' })
   */
  this.actions.fromTo = ( scrollEventFrom, scrollEventTo ) => {

    let toValue, v, ex = '', value = '', css = {}, trans_value = ''

    const _TRANS  = [ 'translateY', 'translateX', 'scale', 'rotateY', 'rotateX' ] // transform effects
    const _DEG    = [ 'rotateY', 'rotateX' ] // degrees effects
    const _PX     = [ 'translateX', 'translateY'] // pixels effects
    const _ALL    = [ 'opacity', 'backgroundPosition', 'backgroundSize', 'backgroundColor', 'color', 'borderColor', ..._TRANS, ..._DEG, ..._PX ] // all supported effects
    const _EX     = [ 'px', '%', 'deg', 'rem', 'em', 'vh', 'vw' ]

    const getValue = ( fromValue, toValue, i ) => {
      return ( fromValue - ( i/100 * fromValue ) ) + ( i/100 * toValue )
    }

    if ( Object.keys(scrollEventFrom).length ) {

      for ( let i = 0; i <= 100; i++ ) {
        css[i] = {}

        Array.prototype.forEach.call( Object.keys(scrollEventFrom), key => {
          let fromValue = scrollEventFrom[key]

          if ( typeof scrollEventTo[key] === undefined ) return

          if ( _ALL.indexOf(key) > -1 && scrollEventFrom.hasOwnProperty(key) && scrollEventTo.hasOwnProperty(key) ) {

            toValue   = scrollEventTo[key] // to value
            ex        = 'function' === typeof fromValue.match ? fromValue.match(/\D+$/) : ''
            ex        = ex && ex.length ? ex[0] : ''
            v         = i < 50 ? fromValue : toValue
            if ( ! isNaN(fromValue) || ! isNaN(toValue) ) {
              value = getValue(fromValue, toValue, i)
              v = value.toFixed(2)
            }

            if ( key === 'borderColor' || key === 'color' || key === 'backgroundColor' ) {
              v = this.helper().colorCalculater( fromValue, toValue, i )
            } else {
              fromValue = parseFloat(fromValue)
              toValue   = parseFloat(toValue)
              value = getValue(fromValue, toValue, i)
              if ( key === 'backgroundPosition' ) {
                v = `50% ${value.toFixed(2)}${ex}`
              } else if ( _TRANS.indexOf(key) > -1 ) {
                trans_value += ` ${key}( ${value.toFixed(2)}${ex} )`
              }
            }

            if ( v !== undefined && _TRANS.indexOf(key) < 0 ) {
              css[i][key] = v
            }
          }
        })

        if ( trans_value !== '' ) {
          css[i]['transform'] = trans_value;
          trans_value = ''
        }
      }
    }

    this.runEvent( ( _progress = 0 ) => {
      _progress = (_progress * 100).toFixed(0)
      css[_progress] && this.helper(this.eventTarget).css( css[_progress] )
    })

    return this;
  }

  return this;
}
