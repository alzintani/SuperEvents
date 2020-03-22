/**
 * The scroll event fires when the document view or an element has been scrolled.
 * 
 * @api        scroll       scroll( params = {} ): {object}
 *
 * @params      {object}   [params={object}]   The parameters
 * @return     {Object}   instance            This function will return SuperEvent instance
 * 
 * @example    example    event.scroll({ indicator: '90%', duration: '60%', debug: false }).fromTo({ color: '#FFF' }, { color: '#999' })
 * 
 */
scroll( params = {} ) {

  /*
   * { function_description }
   *
   * @params      {Function}  playCallBack  The play call back
   */
  this._sourceEvent = playCallBack => {
    document.addEventListener( params.listener && params.listener !== 'load' ? params.listener : 'DOMContentLoaded', () => runScrollEvent( playCallBack ) )
    window.addEventListener( 'resize', getScrollingPosition )
    playCallBack(0)
  }

  /*
   * 
   * { function_description }
   * 
   */
  const runScrollEvent = call => {
    getScrollingPosition()
    this.eventSource.addEventListener( 'scroll', () => scrollEvent( call ) )
  }

  /*
   * 
   * { function_description }
   * 
   */
  const scrollEvent = call => {

    const { _indicator, _duration, _runnigArea } = this.params._sourceScrolling
    const { _start, _end } = this.params._targetScrolling
    let { _in, _out } = inAout( _indicator, _duration )

    let runnig = true
    let _progress = 0
    let _height = getOffset( this.eventSource ).height // (eventSource) space height

    if ('OutOfViewPort' === _duration) {
      _out = this.eventSource.scrollY
      _in = _out + _height

      if ( _in > _start && _out < _end) {
        _progress = ( _in - _start ) / ( _height + getOffset( this.eventTarget ).height )
        call(
          _progress.toFixed(5)
        )
        runnig = true
      }

    } else {

      if (_in < _start ) call(0) // TODO: check this one
      else if ( _out > _start) call(1)

      if ( _in > _start && _out < _start ) {
        _progress = (_in - _start) / ( _runnigArea ) // get _progress when start element in viewport from 0 to 1

        call(
          _progress.toFixed(5)
        )
        runnig = true
      } else if (runnig) {
        call(
          +( _in > _start )
        )
        runnig = false
      }
    }
  }

  /*
   * { function_description }
   *
   * @param      {<type>}  _indicator  The indicator
   * @param      {<type>}  _duration   The duration
   * @return     {Object}  { description_of_the_return_value }
   */
  const inAout = ( _indicator, _duration ) => {
    let eventScrollTop = typeof this.eventSource.scrollY === 'number' ? this.eventSource.scrollY : this.eventSource.scrollTop
    return {
      _in: _indicator + eventScrollTop, // get real position of (_indicator) in page,
      _out: _duration + eventScrollTop // get real position of (_duration) in page,
    }
  }

  /*
   * Gets the scrolling position.
   *
   * @param      {<type>}  params       The parameters
   * @param      {<type>}  eventTarget  The event target
   */
  const getScrollingPosition = () => {

    let indicator = getIndicatorsPosition( params.indicator || 90 ) // get indicator value
    let duration = params.duration || 60
    duration = isNaN(parseInt(duration)) ? 'OutOfViewPort' : getIndicatorsPosition(duration) // get duration value

    { // get indicator and duration position 

      let scrollingPosition = {
        _indicator: indicator,
        _duration: duration,
        _runnigArea: indicator - duration,
      }

      this.params._sourceScrolling = scrollingPosition
    }

    {

      const setTargetArgs = el => {
        let offsetTop = typeof this.eventSource.offsetTop === 'number' ? el.offsetTop - this.eventSource.offsetTop : el.offsetTop
        let scrollableHeight =  typeof this.eventSource.innerHeight === 'number' ? this.eventSource.innerHeight : this.eventSource.offsetHeight

        let start = offsetTop > scrollableHeight ? offsetTop  : indicator + 1
        let height = el.offsetHeight > scrollableHeight ? scrollableHeight : el.offsetHeight

        let args = {
          _start: start,
          _end: start + height,
          _height: height,
          _left: el.offsetLeft,
        }

        this.params._targetScrolling = args
      }

      let element = this.eventTarget instanceof Element ? this.eventTarget : this.eventTarget[0]

      setTargetArgs( element )

    }
    params.debug === true && scrollDebugging()
  }

  /*
   * claculate indicators Position from percentage of window height
   *
   * @param    {number}  num   The number
   * @return   {<type>}  The indicators position.
   */
  const getIndicatorsPosition = num => {
    num = Math.abs(
      parseInt(num)
    )
    let height =  typeof this.eventSource.innerHeight === 'number' ? this.eventSource.innerHeight : this.eventSource.offsetHeight
    return Math.round(
      (num / 100) * height
    )
  }

  /**
   * Gets the offset.
   *
   * @param      {<type>}  object  The object
   * @return     {<type>}  The offset.
   */
  const getOffset = object => {
    let offset = {
      height: this.helper.object.innerHeight ? this.helper.object.innerHeight : this.helper.object.scrollHeight, // innerHeight for window
      width: this.helper.object.innerWidth ? this.helper.object.innerWidth : this.helper.object.scrollWidth,
      top: this.helper.object.innerHeight ? 0 : this.helper.object.offsetTop,
      left: this.helper.object.innerWidth ? 0 : this.helper.object.offsetLeft
    }
    return offset;
  }

  /*
   * 
   * debug.
   * 
   */
  const scrollDebugging = () => {
    // let debug = document.querySelectorAll('.suprescrolling-debug')
    // if ( debug ) {
    //   Array.prototype.forEach.call( debug, el => {
    //     el.parentNode.removeChild( el )
    //   })
    // }
    scrollingPositionDebug()
    targetPositionDebug()
  }

  /*
   * DEBUG
   *
   * @param    {string}  id    The identifier
   * @param    {<type>}  args  The arguments
   * @return   {Object}  { description_of_the_return_value }
   */
  const scrollingPositionDebug = () => {
    const { _indicator, _duration } = this.params._sourceScrolling
    const indicator = document.createElement('HR')
    const duration  = document.createElement('HR')

    const style = {
      textAlign: 'left',
      position: 'absolute',
      border: 'none',
      borderTop: '1px solid #FF0000',
      zIndex: '99999',
      width: '95%',
      opacity: '0.7',
      left: '0',
      fontSize: '0.8rem',
    }
    let parent = document.body

    this.helper(indicator).addClass('suprescrolling-debug').css(style, {
      top: _indicator + 'px',
    }).text('Indicator')

    this.helper(duration).addClass('suprescrolling-debug').css(style, {
      top: _duration + 'px',
    }).text('Duration')

    if ( typeof this.eventSource.parentNode !== 'undefined' ) {
      parent = this.eventSource.parentNode
      this.helper(parent).css({
        position: 'relative',
      })
    } else {
      this.helper(indicator).css({
        position: 'fixed',
      })

      this.helper(duration).css({
        position: 'fixed',
      })
    }

    parent.appendChild(indicator)
    parent.appendChild(duration)

  }

  /*
   * DEBUG
   * { function_description }
   */
  const targetPositionDebug = () => {

    const style = {
      textAlign: 'left',
      position: 'absolute',
      width: '50px',
      border: 'none',
      borderTop: '1px solid #FF0000',
      zIndex: '99999',
      opacity: '0.7',
      margin: '0',
      padding: '0',
      // left: '0',
      // top: '0',
      fontSize: '0.8rem',
    }

    const start   = document.createElement('HR')
    const end     = document.createElement('HR')

    this.helper(start).addClass('suprescrolling-debug').css(style).text( 'Start ' )
    this.helper(end).addClass('suprescrolling-debug').css(style).text( 'End' )


    if ( this.eventTarget instanceof Element ) {
      this.helper(end).addClass('suprescrolling-debug').css(style, {
        top: this.params._targetScrolling._start + 'px',
      }).text( 'End' )
      this.eventTarget.appendChild(start)
      this.eventTarget.appendChild(end)
    } else if ( this.eventTarget[0] instanceof Element ) {

      Array.prototype.forEach.call( this.eventTarget, el => {
        this.helper(this.eventSource).css({
          position: 'relative',
        })
        let start2 = start.cloneNode(true)
        let end2 = end.cloneNode(true)
        this.helper(start2).css({
          top: this.params._targetScrolling._start + 'px',
        })
        this.helper(end2).css({
          top: this.params._targetScrolling._end + 'px',
        })
        el.appendChild(start2)
        el.appendChild(end2)
      })

       // start.remove()
       // end.remove()
    }
  }

  return this.actions

}
