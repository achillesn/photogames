// ----------------------------------------------
// Imports
// ----------------------------------------------
import $ from 'jquery';

// ----------------------------------------------
// Mail Chimp
// ----------------------------------------------
const MailChimp = (() => {
  let s;

  return {
    settings() {
      return {
        form: $('#mc-signup'),
        formAction: $('#mc-signup').attr('action'),
        formSubmit: $('#mc-submit'),
        formMessage: $('.subscribe__error'),
        animation: 'fade-in'
      };
    },

    init() {
      s = this.settings();
      this.bindEvents();
    },

    bindEvents() {
      s.formSubmit.on('click', e => {
        e.preventDefault();

        $.ajax({
          url: s.formAction,
          type: 'POST',
          data: s.form.serialize(),
          dataType: 'jsonp',
          success: response => {
            if (response.result === 'error') {
              setTimeout(() => {
                s.formMessage.text(`${response.msg}.`);
                s.formMessage.removeClass('hidden');
                s.formMessage.addClass(s.animation);
              }, 750);
            } else {
              window.location = `https://photogames.tk/subscribe`;
            }
          },
          error: () => {
            setTimeout(() => {
              s.formMessage.text('Check your email');
              s.formMessage.removeClass('hidden');
              s.formMessage.addClass(s.animation);
            }, 750);
          }
        });
      });
    }
  };
})();

// ----------------------------------------------
// Exports
// ----------------------------------------------
export default MailChimp;
