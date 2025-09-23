<!-- Paste this before </body> or save as cookieforyou.js and include it -->
<script>
(function () {
  // Default config (can be overridden by window.CookieForYouConfig before this script)
  var cfg = (window.CookieForYouConfig && typeof window.CookieForYouConfig === 'object') ? window.CookieForYouConfig : {};
  var cookieName = cfg.cookieName || 'CookieForYou';
  var expiryDays = Number(cfg.expiryDays || 365);
  var headline = cfg.headline || 'CookieForYou 🍪';
  var message = cfg.message || 'We use cookies to improve your experience. Do you accept?';
  var acceptText = cfg.acceptText || 'Accept';
  var declineText = cfg.declineText || 'Decline';
  var theme = cfg.theme || { bgFrom: '#4b4bff', bgTo: '#00d084', text: '#ffffff' };
  var onAccept = (typeof cfg.onAccept === 'function') ? cfg.onAccept : function() {};
  var onDecline = (typeof cfg.onDecline === 'function') ? cfg.onDecline : function() {};

  // Helpers
  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + "; " + expires + "; path=/";
  }
  function getCookie(name) {
    var v = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return v ? decodeURIComponent(v.pop()) : null;
  }

  // If consent exists, do nothing
  if (getCookie(cookieName)) return;

  // Inject styles (namespaced)
  var style = document.createElement('style');
  style.id = 'cookieforyou-styles';
  style.textContent = '\
  #cookieforyou-banner{position:fixed;left:50%;transform:translateX(-50%);bottom:-360px;z-index:2147483647;width:92%;max-width:680px;border-radius:14px;padding:18px;box-shadow:0 10px 30px rgba(0,0,0,0.35);color:' + theme.text + ';font-family:Arial,Helvetica,sans-serif;transition:bottom .6s ease,opacity .3s ease;opacity:1}\
  #cookieforyou-banner .cf-top{font-weight:700;font-size:18px;margin-bottom:8px}\
  #cookieforyou-banner .cf-msg{font-size:14px;margin-bottom:12px;color:rgba(255,255,255,0.95)}\
  #cookieforyou-banner .cf-actions{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}\
  #cookieforyou-banner .cf-btn{cursor:pointer;padding:9px 14px;border-radius:10px;border:0;font-weight:700}\
  #cookieforyou-banner .cf-accept{background:linear-gradient(90deg,' + theme.bgFrom + ',' + theme.bgTo + ');color:' + theme.text + '}\
  #cookieforyou-banner .cf-decline{background:transparent;border:2px solid rgba(255,255,255,0.18);color:' + theme.text + '}\
  @media (max-width:520px){ #cookieforyou-banner{padding:14px;font-size:14px} #cookieforyou-banner .cf-top{font-size:16px} }';
  document.head.appendChild(style);

  // Create banner
  var banner = document.createElement('div');
  banner.id = 'cookieforyou-banner';
  banner.setAttribute('role','dialog');
  banner.setAttribute('aria-live','polite');
  banner.setAttribute('aria-label','Cookie consent');
  banner.innerHTML = '\
    <div class="cf-top">' + escapeHtml(headline) + '</div>\
    <div class="cf-msg">' + escapeHtml(message) + '</div>\
    <div class="cf-actions">\
      <button class="cf-btn cf-accept" id="cf-accept-btn" type="button">' + escapeHtml(acceptText) + '</button>\
      <button class="cf-btn cf-decline" id="cf-decline-btn" type="button">' + escapeHtml(declineText) + '</button>\
    </div>';
  document.body.appendChild(banner);

  // Slide-in after small delay
  setTimeout(function(){ banner.style.bottom = '30px'; }, 200);

  // Button handlers
  document.getElementById('cf-accept-btn').addEventListener('click', function () {
    setCookie(cookieName, 'accepted', expiryDays);
    banner.style.bottom = '-400px';
    setTimeout(function(){ try{ banner.remove(); }catch(e){} }, 700);
    try { onAccept(); } catch(e) {}
  });
  document.getElementById('cf-decline-btn').addEventListener('click', function () {
    setCookie(cookieName, 'declined', expiryDays);
    banner.style.bottom = '-400px';
    setTimeout(function(){ try{ banner.remove(); }catch(e){} }, 700);
    try { onDecline(); } catch(e) {}
  });

  // Expose API
  window.CookieForYou = {
    config: cfg,
    show: function(){ if(!document.getElementById('cookieforyou-banner')){ document.body.appendChild(banner); setTimeout(function(){ banner.style.bottom='30px'; },50);} },
    hide: function(){ try{ banner.remove(); }catch(e){} },
    getConsent: function(){ return getCookie(cookieName); },
    resetConsent: function(){ setCookie(cookieName,'',-1); }
  };

  // small helper to escape text for safe insertion
  function escapeHtml(s){ if(typeof s !== 'string') return ''; return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

})();
</script>
