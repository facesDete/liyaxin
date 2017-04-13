;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-shouji" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M743.652476 962.564789 280.406876 962.564789c-34.476209 0-62.47796-28.120454-62.47796-62.657039L217.928916 124.152625c0-34.596959 28.000728-62.717414 62.47796-62.717414l463.245599 0c34.416857 0 62.417585 28.120454 62.417585 62.717414l0 775.754103C806.07006 934.443311 778.069333 962.564789 743.652476 962.564789zM280.406876 92.134397c-17.507746 0-31.778774 14.360056-31.778774 32.018228l0 775.754103c0 17.628496 14.270005 31.957853 31.778774 31.957853l463.245599 0c17.507746 0 31.718399-14.33038 31.718399-31.957853L775.370875 124.152625c0-17.658172-14.210653-32.018228-31.718399-32.018228L280.406876 92.134397z"  ></path>' +
    '' +
    '<path d="M512.029164 895.41032c-22.544459 0-40.831964-18.377556-40.831964-40.952714s18.287505-40.952714 40.831964-40.952714 40.831964 18.377556 40.831964 40.952714S534.573623 895.41032 512.029164 895.41032zM512.029164 844.205101c-5.575995 0-10.132778 4.586458-10.132778 10.253528 0 11.332093 20.266579 11.332093 20.266579 0C522.162966 848.791559 517.60516 844.205101 512.029164 844.205101z"  ></path>' +
    '' +
    '<path d="M731.899804 783.885294 289.400714 783.885294c-8.454556 0-15.349593-6.865361-15.349593-15.349593L274.051121 147.476843c0-8.484232 6.895037-15.349593 15.349593-15.349593l442.500113 0c8.454556 0 15.349593 6.865361 15.349593 15.349593l0 621.058858C747.249397 777.019932 740.35436 783.885294 731.899804 783.885294zM304.750307 753.186108l411.800927 0L716.551234 162.826436 304.750307 162.826436 304.750307 753.186108z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-suo" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M860.8 448l-9.6 0c3.2-19.2 6.4-41.6 6.4-64 0-188.8-153.6-336-345.6-336s-345.6 147.2-345.6 336c0 22.4 3.2 41.6 6.4 64l-12.8 0c-54.4 0-96 41.6-96 96l0 320c0 54.4 41.6 96 96 96l700.8 0c54.4 0 96-41.6 96-96l0-320C956.8 489.6 915.2 448 860.8 448zM220.8 444.8c-3.2-19.2-6.4-38.4-6.4-60.8 0-163.2 131.2-288 294.4-288s294.4 128 294.4 288c0 22.4-3.2 44.8-6.4 64l-32 0L224 448 220.8 444.8zM908.8 864c0 25.6-22.4 48-48 48L160 912c-25.6 0-48-22.4-48-48l0-320c0-25.6 22.4-48 48-48l608 0 89.6 0c25.6 0 48 22.4 48 48L905.6 864z"  ></path>' +
    '' +
    '<path d="M512 592c-12.8 0-25.6 9.6-25.6 25.6l0 195.2c0 12.8 9.6 25.6 25.6 25.6s25.6-9.6 25.6-25.6l0-195.2C537.6 604.8 524.8 592 512 592z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)