/**
 *
 * Execute a JavaScript when moving the mouse pointer onto an image:
 * 
 * @api        click      click(): {object}
 *
 * @return     {Object}   instance            This function will return SuperEvent instance
 * 
 * @example    example    event.click().fromTo({ color: '#FFF' }, { color: '#999' })
 * 
 */
click( params = {} ) {

  this._sourceEvent = ( playCallBack ) => {
    const toggle = typeof params.toggle !== 'undefined' ? params.toggle : true

    this._click_progress = 1
    playCallBack( 0 )

    const click = () => {
      playCallBack(  this._click_progress )

      if ( toggle ) {
        this._click_progress = + !this._click_progress
      }
    }

    this.eventSource.addEventListener( 'click', click)
  }

  return this.actions
}
