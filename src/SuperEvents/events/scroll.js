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
    
  let listener = false

  /*
   * { function_description }
   *
   * @params      {Function}  playCallBack  The play call back
   */
  this._sourceEvent = playCallBack => {
    document.addEventListener( params.listener && params.listener !== 'load' ? params.listener : 'DOMContentLoaded', () => runScrollEvent( playCallBack ) )
    window.addEventListener('load', getScrollingPosition )
    window.addEventListener( 'resize', getScrollingPosition )
  }

  /*
   * 
   * { function_description }
   * 
   */
  const runScrollEvent = call => {
    getScrollingPosition()
    scrollEvent( call )
  }

  /*
   * { function_description }
   *
   * @param      {Function}  call    The call
   * @param      {number}    top     The top
   */
  const eventScrollTop = ( call ) => {
    const { indicator, runnigArea, start } = this.params._sourceScrolling
    const top = ( typeof this.eventSource.scrollY === 'number' ? this.eventSource.scrollY : this.eventSource.scrollTop ) + indicator
    let _progress = ( top - start ) /  runnigArea // get _progress when start element in viewport from 0 to 1

    if ( _progress > 1 ) {
      _progress = 1
    } else if ( _progress < 0 ) {
      _progress = 0
    }

    call( _progress.toFixed(5) )
  }

  /*
   * 
   * { function_description }
   * 
   */
  const scrollEvent = call => {

    eventScrollTop( call )

    const eventListener = () => {
      const { indicator, start, end } = this.params._sourceScrolling
      const top = ( typeof this.eventSource.scrollY === 'number' ? this.eventSource.scrollY : this.eventSource.scrollTop ) + indicator

      if ( top < start ) {
        call(0)
      } else if ( top > end ) {
        call(1)
      } else {
        eventScrollTop( call )
      }
      listener = true
    }

    ! listener && this.eventSource.addEventListener( 'scroll', eventListener, true )
  }

  /*
   * Gets the scrolling position.
   *
   * @param      {<type>}  params       The parameters
   * @param      {<type>}  eventTarget  The event target
   */
  const getScrollingPosition = () => {

    const scrollableHeight =  typeof this.eventSource.innerHeight === 'number' ? this.eventSource.innerHeight : this.eventSource.offsetHeight
    const el        = this.eventTarget instanceof Element ? this.eventTarget : this.eventTarget[0]
    const rect      = el.getBoundingClientRect()

    const indicator = getIndicatorsPosition( params.indicator ?? 90 ) // get indicator value
    const duration  = getIndicatorsPosition( isNaN( parseInt( params.duration ) ) ? 0 : params.duration )

    const start     = el.offsetTop
    const end       = start + el.offsetHeight
    const _end      = isNaN( parseInt( params.duration ) ) ? end + scrollableHeight : start + duration

    this.params._sourceScrolling = {
      indicator:  indicator,
      runnigArea: _end - start,
      start:      start,
      end:        _end
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
    let height =  typeof this.eventSource.innerHeight === 'number' ? this.eventSource.innerHeight : this.eventSource.offsetHeight
    num = Math.abs( parseInt(num) )

    num = num <= 100 ? num : 0
    return Math.round(
      (num / 100) * height
    )
  }

  /*
   * 
   * debug.
   * 
   */
  const scrollDebugging = () => {
    let debug = document.querySelectorAll('.suprescrolling-debug')
    if ( debug ) {
      Array.prototype.forEach.call( debug, el => {
        el.parentNode.removeChild( el )
      })
    }
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

    const { indicator, duration } = this.params._sourceScrolling
    const _indicator = document.createElement('HR')
    let parent = document.body

    const style = {
      textAlign: 'left',
      position: 'absolute',
      color: '#FF0000',
      border: '0',
      borderBottom: '1px solid #FF0000',
      zIndex: '99999',
      width: '95%',
      opacity: '0.9',
      left: '0',
      height: '20px',
      padding: '0 10px',
      fontSize: '14px',
    }

    this.helper(_indicator).addClass('suprescrolling-debug').css(style, {
      top: (indicator - 20) + 'px',
    }).text('Indicator')

    if ( typeof this.eventSource.parentNode !== 'undefined' ) {
      parent = this.eventSource.parentNode
      this.helper(parent).css({
        position: 'relative',
      })
    } else {
      this.helper(_indicator).css({
        position: 'fixed',
      })
    }

    parent.appendChild(_indicator)

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
      color: '#FF0000',
      left: '50px',
      top: '0',
      fontSize: '0.8rem',
    }
    
    let parent = document.body

    const start   = document.createElement('HR')
    const end     = document.createElement('HR')

    const _start  = this.params._sourceScrolling.start
    const _end    = this.params._sourceScrolling.end
    
    this.helper(start).addClass('suprescrolling-debug').css(style, { top: `${_start}px` }).text( 'Start' )
    this.helper(end).addClass('suprescrolling-debug').css(style, { top: `${_end}px` }).text( 'End' )

    if ( this.eventTarget instanceof Element ) {
      parent = this.eventTarget.parentNode
    } else {
      parent = this.eventTarget[0].parentNode
    }
    parent.appendChild(start)
    parent.appendChild(end)

  }

  return this.actions

}
