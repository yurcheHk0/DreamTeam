export default {
  install: (Vue) => {
    Vue.prototype.$dom = {
      hasClass(el, className) {
        if (el.classList)
          return el.classList.contains(className)
        else
          return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
      },
      addClass(el, className) {
        if (el.classList)
          el.classList.add(className)
        else if (!hasClass(el, className)) el.className += " " + className
      },
      removeClass(el, className) {
        if (el.classList)
          el.classList.remove(className)
        else if (hasClass(el, className)) {
          var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
          el.className=el.className.replace(reg, ' ')
        }
      },
      //https://www.w3schools.com/howto/howto_js_toggle_class.asp
      toggleClass(el, className){
        if (el.classList) { 
          el.classList.toggle(className);
        } else {
            // For IE9
            var classes = el.className.split(" ");
            var i = classes.indexOf(className);
        
            if (i >= 0) 
                classes.splice(i, 1);
            else 
                classes.push(className);
                el.className = classes.join(" "); 
        }
      },
      getElements(selector) {
        var selectorType = 'querySelectorAll';
    
        if (selector.indexOf('#') === 0) {
            selectorType = 'getElementById';
            selector = selector.substr(1, selector.length);
        }
    
        return document[selectorType](selector);
      }
    };
  }
};