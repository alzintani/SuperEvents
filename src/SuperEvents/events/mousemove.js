/**
 *
 * The mousemove function occurs when the mouse move over the selected element.
 * 
 * @api        mousemove  mousemove(): {object}
 *
 * @return     {Object}   instance            This function will return SuperEvent instance
 * 
 * @example    example    event.mousemove().fromTo({ color: '#FFF' }, { color: '#999' })
 */
mousemove( params = {} ) {

  const mousemove = ( event, playCallBack ) => {

    let width = window.innerWidth / 2
    let height = window.innerHeight / 2

    let x = event.clientX
    let y = event.clientY

    if ( this.eventSource && 'function' === typeof this.eventSource.getBoundingClientRect ) {
      const rect = this.eventSource.getBoundingClientRect()
      width = rect.width / 2
      height = rect.height / 2

      x = event.clientX - rect.left
      y = event.clientY - rect.top
    }

    let positionX = ( width - x ) / width
    positionX = positionX < 0 ? 1 + positionX : 1 - positionX

    let positionY = ( height - y ) / height
    positionY = positionY < 0 ? 1 + positionY : 1 - positionY

    playCallBack(
      positionX < positionY ? positionX : positionY
    )
  }

  this._sourceEvent = ( playCallBack ) => {
    this.eventSource.addEventListener( 'mousemove', event => mousemove( event, playCallBack ) )
    this.eventSource.addEventListener( 'mouseleave', () => playCallBack(0) )
    playCallBack( 0 )
  }

  return this.actions
}
