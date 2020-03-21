/**
 *
 * The hover function occurs when the mouse pointer is over the selected element.
 * 
 * @api        hover      hover(): {object}
 *
 * @return     {Object}   instance            This function will return SuperEvent instance
 * 
 * @example    example    event.hover().fromTo({ color: '#FFF' }, { color: '#999' })
 * 
 */
hover( params = {} ) {

  this._sourceEvent = ( playCallBack ) => {
    playCallBack(0)
    this.eventSource.addEventListener( 'mouseover', () => playCallBack( 1 ) )
    this.eventSource.addEventListener( 'mouseleave', () => playCallBack( 0 ) )
  }

  return this.actions
}
