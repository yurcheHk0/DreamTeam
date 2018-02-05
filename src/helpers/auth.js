import EventBus from '../helpers/event-bus.js';

export default {
  install: (Vue) => {
    Vue.prototype.$session = {
      _isLoggedIn () {
        return !!localStorage.UserAuthHash
      },
      logout (){
        delete localStorage.UserAuthHash;
        EventBus.$emit('logged-in');
      }
    };
  }
};