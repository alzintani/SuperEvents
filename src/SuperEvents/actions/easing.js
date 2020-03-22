/**
 * easing function description
 * 
 * @api        easing       easing( params = {} ): {object}
 * 
 * @params      {object}   [params={object}]   The parameters
 * @return     {Object}   instance            This function will return SuperEvent instance
 * 
 * @example    example    event.click().fromTo({ color: '#FFF' }, { color: '#999' }).easing({ timing: 'linear', duration: 0.5, delay: 0, cubicBezier: false})
 * 
 */
easing( params = {} ) {

  let timing = params.timing || 'linear'
  let duration = params.duration || 0.5
  let delay = params.delay || 0
  let cubicBezier = !!params.cubicBezier || false

  let _cubic

  duration = duration > 10 || duration < 0 ? 0.5 : duration

  _cubic = timing

  if ( cubicBezier === false ) {

    switch ( timing ) {
      case 'ease':
          _cubic = '.25, .1, .25, 1'
        break

      case 'linear':
        _cubic = '.25, .25, .75, .75'
        break

      case 'ease-in':
        _cubic = '.42, 0, 1, 1'
        break

      case 'ease-out':
        _cubic = '0, 0, .58, 1'
        break

      case 'ease-in-out':
        _cubic = '.42, 0, .58, 1'
        break

      case 'easeInQuad':
        _cubic = '.55, .085, .68, .53'
        break

      case 'easeInCubic':
        _cubic = '.55, .055, .675, .19'
        break

      case 'easeInQuart':
        _cubic = '.895, .03, .685, .22'
        break

      case 'easeInQuint':
        _cubic = '.755, .05, .855, .06'
        break

      case 'easeInSine':
        _cubic = '.47, 0, .745, .715'
        break

      case 'easeInExpo':
        _cubic = '.95, .05, .795, .035'
        break

      case 'easeInCirc':
        _cubic = '.6, .04, .98, .335'
        break

      case 'easeInBack':
        _cubic = '.6, -.280, .735, .045'
        break

      case 'easeOutQuad':
        _cubic = '.25, .46, .45, .94'
        break

      case 'easeOutCubic':
        _cubic = '.215, .61, .355, 1'
        break

      case 'easeOutQuart':
        _cubic = '.165, .84, .44, 1'
        break

      case 'easeOutQuint':
        _cubic = '.23, 1, .32, 1'
        break

      case 'easeOutSine':
        _cubic = '.39, .575, .565, 1'
        break

      case 'easeOutExpo':
        _cubic = '.19, 1, .22, 1'
        break

      case 'easeOutCirc':
        _cubic = '.075, .82, .165, 1'
        break

      case 'easeOutBack':
        _cubic = '.175, .885, .32, 1.275'
        break

      case 'easeInOutQuad':
        _cubic = '.455, .03, .515, .955'
        break

      case 'easeInOutCubic':
        _cubic = '.645, .045, .355, 1'
        break

      case 'easeInOutQuart':
        _cubic = '.770, 0, .175, 1'
        break

      case 'easeInOutQuint':
        _cubic = '.86, 0, .07, 1'
        break

      case 'easeInOutSine':
        _cubic = '.445, .05, 0.55, 0.95'
        break

      case 'easeInOutExpo':
        _cubic = '1, 0, 0, 1'
        break

      case 'easeInOutCirc':
        _cubic = '.785, .135, .15, .86'
        break

      case 'easeInOutBack':
        _cubic = '.68, -.55, .265, 1.55'
        break

      default:
        _cubic = '.25, .25, .75, .75'
    }
  }

  _cubic && this.helper( this.eventTarget ).easing({
    duration: duration,
    cubic: _cubic,
    delay: delay
  })

  return this
}
