/*!
  * SuperEvents v0.1 http://superevents.org
  * Copyright 2018 SuperEvents
  * MIT License (URL)
  *
  */

( () => {
  "use strict"

  class superEventsJS {

    constructor() {}

    init() {
      let easing = 'linear'
      let ease = true
      let duration = 0.1
      let eventFrom
      let eventTo
      let source
      let target

      eventFrom = { scale: 0.5 }
      eventTo = { scale: 1 }

      source = document.querySelector('.click-example-source')
      target = document.querySelectorAll('.click-example-target')
      new SuperEvents({ source: source, target: target }).click().fromTo( eventFrom, eventTo ).easing( { timing: 'ease-out', duration: 0.3, delay: 0.1, cubicBezier: false } )

      let eventFrom2 = { backgroundColor: '#FF4971' }
      let eventTo2 = { backgroundColor: '#4693FF' }
      source = document.querySelector('.mousemove-example-source')
      target = document.querySelectorAll('.mousemove-example-target')
      source && new SuperEvents({ source: source, target: target }).mousemove().fromTo( eventFrom2, eventTo2 ).easing( easing, duration, false, ease )

      eventFrom = { translateX: '300px', opacity: 0.1 }
      eventTo = { translateX: '0', opacity: 1 }
      source = document.querySelector('.hover-example-source')
      target = document.querySelectorAll('.hover-example-target')
      source && new SuperEvents({ source: source, target: target }).hover().fromTo( eventFrom, eventTo ).easing( { timing: 'ease-out', duration: 0.3, delay: 0.3, cubicBezier: false } )


      eventFrom = { backgroundColor: '#49FF8E' }
      eventTo = { backgroundColor: '#FFE846' }
      target = document.querySelectorAll('.scroll-example-target')
      target && new SuperEvents(target).scroll({
        indicator: '80%',
        duration: '80%',
      }).fromTo( eventFrom, eventTo ).easing( { timing: 'ease-out', duration: 0.5, delay: 0 } )

      eventFrom = { backgroundColor: '#FF5549', scale: 0.2 }
      eventTo = { backgroundColor: '#464EFF', scale: 1 }
      let target2 = document.querySelectorAll('.scroll-example-target-2')
      target2 && new SuperEvents(target2).scroll({
        indicator: '80%',
        duration: '20%',
      }).fromTo( eventFrom, eventTo ).easing( { timing: 'ease-out', duration: 0.3, delay: 0.1, cubicBezier: false } )



      eventFrom = { backgroundColor: '#FFAAA4' }
      eventTo = { backgroundColor: '#9BA0FF' }
      let source3 = document.querySelector('.scroll-div-container')
      let target3 = source3.querySelectorAll('.scroll2-example-target')

      source3 && new SuperEvents({ source: source3, target: target3}).scroll({
        indicator: '80%',
        duration: '60%',
      }).fromTo( eventFrom, eventTo ).easing( { timing: 'ease-out', duration: 0.3, delay: 0.15, cubicBezier: false } )

    }

  }

  ( new superEventsJS() ).init()

})()
