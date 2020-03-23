
( function ( root, factory ) {
  'use strict'

  if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(['b'], factory);
  } else if (typeof module === 'object' && module.exports) {
      // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module.exports = factory(require('b'));
  } else {
      // Browser globals (root is window)
      root.SuperEvents = factory(root.b);
  }

}( typeof self !== 'undefined' ? self : this, function ( b ) {
  'use strict'

  /**
   * This class describes SuperEvents.
   *
   * @class      SuperEvents (name)
   */

  return class SuperEvents {

    /**
     * The current version of SuperEvents
     */
    version = '0.1.0'

    /**
     * The current version of SuperEvents
     */
    name = 'SuperEvents'

    /**
     * Description of SuperEvents
     */
    description = 'SuperEvents is a JavaScript library that handling any events in websites. Support all events action like:- Scrolling, Clicking, Hovering, Mouse Moving, Tapping.'

    /**
     * the license of SuperEvents
     */
    license = 'MIT'

    /**
     * Parameters that will pass to event functions {object}
     */
    params = {}

    /**
     * Constructs a new instance.
     *
     * @param      {object}  elements  The elements
     */
    constructor( elements ) {

      // Exit if error in elements
      if ( typeof  elements !== 'object' || elements.source === null || elements.target === null ) {
        throw new TypeError('You must use correct HTML elements.')
      }

      // start initialize SuperEvents
      this.initialize( elements )
    }

    /**
     * Initializes the given elements.
     *
     * @param      {<type>}  elements  The elements
     */
    initialize( elements ) {
      // Set source and target elements

      try {

        // source elements
        this.eventSource = typeof elements.source !== 'undefined'  ? elements.source : window

        // target elements
        this.eventTarget = elements instanceof Element || elements instanceof HTMLDocument || elements[0] instanceof Element ? elements : elements.target

        this.actions()

      } catch ( e ) {
        console.log( 'ERROR01:', e )
      }
    }

    /**
     * { function_description }
     *
     * @return     {boolean}  { description_of_the_return_value }
     */
    runEvent( playCallBack ) {
      this._sourceEvent( playCallBack )
    }

    /**
     * helper function
     */
    //=require libs/helper.js

    /**
     * Actions
     */
    //=require actions/actions.js

    /**
     * Easing
     */
    //=require actions/easing.js

    /**
     * Scroll Event
     */
    //=require events/scroll.js

    /**
     * Click Event
     */
    //=require events/click.js

    /**
     * Mouseover Event
     */
    //=require events/hover.js

    /**
     * Mouseover Event
     */
    //=require events/mousemove.js

  }

}))
