var cookie_enabled = function () {
  return (document.cookie = "tcax"), -1 !== document.cookie.indexOf("tcax");
};
(window.ax =
  window.ax ||
  function () {
    return window.ax.factory("track").apply(this, arguments);
  }),
  (window.ax.methods = [
    "identify",
    "goal",
    "query",
    "track",
    "recommend",
    "spa",
    "purchase",
    "subscribe",
    "unsubscribe",
    "ready",
  ]),
  (window.ax._container = []),
  (window.ax.factory = function (e) {
    return function () {
      var t = Array.prototype.slice.call(arguments);
      return window.ax._container.unshift({ method: e, args: t }), window.ax;
    };
  }),
  !(function (e, t) {
    var r = function () {
        return r.get.apply(r, arguments);
      },
      i = (r.utils = {
        isArray:
          Array.isArray ||
          function (e) {
            return "[object Array]" === Object.prototype.toString.call(e);
          },
        isPlainObject: function (e) {
          return !!e && "[object Object]" === Object.prototype.toString.call(e);
        },
        toArray: function (e) {
          return Array.prototype.slice.call(e);
        },
        getKeys:
          Object.keys ||
          function (e) {
            var t = [],
              r = "";
            for (r in e) e.hasOwnProperty(r) && t.push(r);
            return t;
          },
        escape: function (e) {
          return String(e).replace(/[,;"\\=\s%]/g, function (e) {
            return encodeURIComponent(e);
          });
        },
        retrieve: function (e, t) {
          return null == e ? t : e;
        },
      });
    (r.defaults = {}),
      (r.expiresMultiplier = 86400),
      (r.set = function (r, n, a) {
        if (i.isPlainObject(r))
          for (var o in r) r.hasOwnProperty(o) && this.set(o, r[o], n);
        else {
          a = i.isPlainObject(a) ? a : { expires: a };
          var s = a.expires !== t ? a.expires : this.defaults.expires || "",
            c = typeof s;
          "string" === c && "" !== s
            ? (s = new Date(s))
            : "number" === c &&
              (s = new Date(+new Date() + 1e3 * this.expiresMultiplier * s)),
            "" !== s &&
              "toGMTString" in s &&
              (s = ";expires=" + s.toGMTString());
          var u = a.path || this.defaults.path;
          u = u ? ";path=" + u : "";
          var f = a.domain || this.defaults.domain;
          f = f ? ";domain=" + f : "";
          var p = a.secure || this.defaults.secure ? ";secure" : "";
          e.cookie = i.escape(r) + "=" + i.escape(n) + s + u + f + p;
        }
        return this;
      }),
      (r.remove = function (e) {
        e = i.isArray(e) ? e : i.toArray(arguments);
        for (var t = 0, r = e.length; r > t; t++) this.set(e[t], "", -1);
        return this;
      }),
      (r.empty = function () {
        return this.remove(i.getKeys(this.all()));
      }),
      (r.get = function (e, r) {
        r = r || t;
        var n = this.all();
        if (i.isArray(e)) {
          for (var a = {}, o = 0, s = e.length; s > o; o++) {
            var c = e[o];
            a[c] = i.retrieve(n[c], r);
          }
          return a;
        }
        return i.retrieve(n[e], r);
      }),
      (r.all = function () {
        if ("" === e.cookie) return {};
        for (
          var t = e.cookie.split("; "), r = {}, i = 0, n = t.length;
          n > i;
          i++
        ) {
          var a = t[i].split("=");
          try {
            r[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
          } catch (o) {
            r[a[0]] = a[1];
          }
        }
        return r;
      }),
      (r.enabled = function () {
        if (cookie_enabled()) return !0;
        var e = "_" === r.set("_", "_").get("_");
        return r.remove("_"), e;
      }),
      "function" == typeof define && define.amd
        ? define(function () {
            return r;
          })
        : "undefined" != typeof exports
        ? (exports.cookie = r)
        : (window.cookie = r);
  })(document),
  (window.ax.is_unique = function () {
    return !cookie.get("aidax_unique");
  }),
  (window.ax.clear_ab = function (e) {
    if (e) {
      if ("string" == typeof e && "" !== e) {
        var t = cookie.get("aidax_ab");
        if (t) {
          var r = JSON.parse(t);
          delete r[e],
            cookie.set("aidax_ab", JSON.stringify(r), {
              expires: 3,
              path: "/",
            });
        }
      }
    } else cookie.remove("aidax_ab");
  }),
  (window.ax.ab = function (e, t) {
    if (
      "string" == typeof e &&
      "" === e &&
      "object" == typeof t &&
      Array.isArray(t)
    ) {
      var r,
        i = cookie.get("aidax_ab"),
        n = {},
        a = function (e, t) {
          return Math.floor(Math.random() * (t - e + 1)) + e;
        },
        o = function () {
          var i,
            o,
            s = [],
            c = 0,
            u = 0;
          if (Array.isArray(t)) r = t[Math.floor(Math.random() * t.length)];
          else {
            for (var f in t)
              t.hasOwnProperty(f) &&
                (s.push([f, [0 === u ? u : u + 1, r[f] + u]]),
                (u = r[f]),
                (c += +r[f]));
            for (
              o = a(0, c),
                s.sort(function (e, t) {
                  return e[1] - t[1];
                }),
                i = 0;
              i < s.length;
              i++
            )
              if (o >= s[i][1][0] && o <= s[i][1][1]) {
                r = s[i][0];
                break;
              }
          }
          n[e] = r;
        };
      if (i) {
        if (((n = JSON.parse(i)), n[e])) return n[e];
        o();
      } else o();
      return (
        cookie.set("aidax_ab", JSON.stringify(n), { expires: 30, path: "/" }), r
      );
    }
    throw "[AIDAX] Missing ab parameters.";
  });
for (var i = 0; i < window.ax.methods.length; i++) {
  var method = window.ax.methods[i];
  window.ax[method] = window.ax.factory(method);
}
var script = document.createElement("script");
(script.type = "text/javascript"),
  (script.async = !0),
  (script.src =
    "//api.aidax.com.br/aidax.js?key=YOUR_CLIENT_KEY&ce=" + cookie_enabled());
var firstScript = document.getElementsByTagName("script")[0];
firstScript.parentNode.insertBefore(script, firstScript);
function Enviar() {
  var nome = document.getElementById("nomeid");
  var email = document.getElementById("emailid");
  if (nome.value != "" && email.value != "") {
    /* identificando o usuário anonimo */
    ax.identify(email.value, { first_name: nome.value });
    /* track visitor goal */
    ax.goal("Newsletter", true, true);
    /* retornando resposta ao usuário de registro efetuado com sucesso */
    alert(
      "Obrigado sr(a) " +
        nome.value +
        " os seus dados foram encaminhados com sucesso"
    );
  }
}
