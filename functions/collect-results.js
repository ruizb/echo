!(function (e, t) {
  for (var r in t) e[r] = t[r]
})(
  exports,
  (function (e) {
    var t = {}
    function r(n) {
      if (t[n]) return t[n].exports
      var s = (t[n] = { i: n, l: !1, exports: {} })
      return e[n].call(s.exports, s, s.exports, r), (s.l = !0), s.exports
    }
    return (
      (r.m = e),
      (r.c = t),
      (r.d = function (e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n })
      }),
      (r.r = function (e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 })
      }),
      (r.t = function (e, t) {
        if ((1 & t && (e = r(e)), 8 & t)) return e
        if (4 & t && 'object' == typeof e && e && e.__esModule) return e
        var n = Object.create(null)
        if (
          (r.r(n),
          Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
          2 & t && 'string' != typeof e)
        )
          for (var s in e)
            r.d(
              n,
              s,
              function (t) {
                return e[t]
              }.bind(null, s)
            )
        return n
      }),
      (r.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default
              }
            : function () {
                return e
              }
        return r.d(t, 'a', t), t
      }),
      (r.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
      }),
      (r.p = ''),
      r((r.s = 87))
    )
  })([
    function (e, t, r) {
      'use strict'
      var n = r(11),
        s = Object.prototype.toString
      function o(e) {
        return '[object Array]' === s.call(e)
      }
      function i(e) {
        return void 0 === e
      }
      function a(e) {
        return null !== e && 'object' == typeof e
      }
      function c(e) {
        return '[object Function]' === s.call(e)
      }
      function u(e, t) {
        if (null != e)
          if (('object' != typeof e && (e = [e]), o(e)))
            for (var r = 0, n = e.length; r < n; r++) t.call(null, e[r], r, e)
          else
            for (var s in e)
              Object.prototype.hasOwnProperty.call(e, s) &&
                t.call(null, e[s], s, e)
      }
      e.exports = {
        isArray: o,
        isArrayBuffer: function (e) {
          return '[object ArrayBuffer]' === s.call(e)
        },
        isBuffer: function (e) {
          return (
            null !== e &&
            !i(e) &&
            null !== e.constructor &&
            !i(e.constructor) &&
            'function' == typeof e.constructor.isBuffer &&
            e.constructor.isBuffer(e)
          )
        },
        isFormData: function (e) {
          return 'undefined' != typeof FormData && e instanceof FormData
        },
        isArrayBufferView: function (e) {
          return 'undefined' != typeof ArrayBuffer && ArrayBuffer.isView
            ? ArrayBuffer.isView(e)
            : e && e.buffer && e.buffer instanceof ArrayBuffer
        },
        isString: function (e) {
          return 'string' == typeof e
        },
        isNumber: function (e) {
          return 'number' == typeof e
        },
        isObject: a,
        isUndefined: i,
        isDate: function (e) {
          return '[object Date]' === s.call(e)
        },
        isFile: function (e) {
          return '[object File]' === s.call(e)
        },
        isBlob: function (e) {
          return '[object Blob]' === s.call(e)
        },
        isFunction: c,
        isStream: function (e) {
          return a(e) && c(e.pipe)
        },
        isURLSearchParams: function (e) {
          return (
            'undefined' != typeof URLSearchParams &&
            e instanceof URLSearchParams
          )
        },
        isStandardBrowserEnv: function () {
          return (
            ('undefined' == typeof navigator ||
              ('ReactNative' !== navigator.product &&
                'NativeScript' !== navigator.product &&
                'NS' !== navigator.product)) &&
            'undefined' != typeof window &&
            'undefined' != typeof document
          )
        },
        forEach: u,
        merge: function e() {
          var t = {}
          function r(r, n) {
            'object' == typeof t[n] && 'object' == typeof r
              ? (t[n] = e(t[n], r))
              : (t[n] = r)
          }
          for (var n = 0, s = arguments.length; n < s; n++) u(arguments[n], r)
          return t
        },
        deepMerge: function e() {
          var t = {}
          function r(r, n) {
            'object' == typeof t[n] && 'object' == typeof r
              ? (t[n] = e(t[n], r))
              : (t[n] = 'object' == typeof r ? e({}, r) : r)
          }
          for (var n = 0, s = arguments.length; n < s; n++) u(arguments[n], r)
          return t
        },
        extend: function (e, t, r) {
          return (
            u(t, function (t, s) {
              e[s] = r && 'function' == typeof t ? n(t, r) : t
            }),
            e
          )
        },
        trim: function (e) {
          return e.replace(/^\s*/, '').replace(/\s*$/, '')
        }
      }
    },
    function (e, t, r) {
      'use strict'
      const n = r(6),
        s = r(65)
      e.exports = function (e, t) {
        return n(e, s, t)
      }
    },
    function (e, t, r) {
      'use strict'
      e.exports = function (e) {
        return JSON.parse(JSON.stringify(e))
      }
    },
    function (e, t, r) {
      'use strict'
      const n = r(6),
        s = r(66)
      e.exports = function (e, t) {
        return n(e, s, t)
      }
    },
    function (e, t, r) {
      'use strict'
      var n = r(0)
      function s(e) {
        return encodeURIComponent(e)
          .replace(/%40/gi, '@')
          .replace(/%3A/gi, ':')
          .replace(/%24/g, '$')
          .replace(/%2C/gi, ',')
          .replace(/%20/g, '+')
          .replace(/%5B/gi, '[')
          .replace(/%5D/gi, ']')
      }
      e.exports = function (e, t, r) {
        if (!t) return e
        var o
        if (r) o = r(t)
        else if (n.isURLSearchParams(t)) o = t.toString()
        else {
          var i = []
          n.forEach(t, function (e, t) {
            null != e &&
              (n.isArray(e) ? (t += '[]') : (e = [e]),
              n.forEach(e, function (e) {
                n.isDate(e)
                  ? (e = e.toISOString())
                  : n.isObject(e) && (e = JSON.stringify(e)),
                  i.push(s(t) + '=' + s(e))
              }))
          }),
            (o = i.join('&'))
        }
        if (o) {
          var a = e.indexOf('#')
          ;-1 !== a && (e = e.slice(0, a)),
            (e += (-1 === e.indexOf('?') ? '?' : '&') + o)
        }
        return e
      }
    },
    function (e, t, r) {
      'use strict'
      var n = r(15)
      e.exports = function (e, t, r, s, o) {
        var i = new Error(e)
        return n(i, t, r, s, o)
      }
    },
    function (e, t, r) {
      'use strict'
      e.exports = function e(t, r, n) {
        if ('object' != typeof t || null === t)
          throw new Error('Non object passed to convertKeys: ' + t)
        if (Array.isArray(t)) return t
        Array.isArray(n) || (n = [])
        for (const s in t)
          if (t.hasOwnProperty(s)) {
            const o = r(s)
            'object' == typeof t[s] &&
              null !== t[s] &&
              (n.includes(s) || n.includes(o) || (t[s] = e(t[s], r, n))),
              o !== s && ((t[o] = t[s]), delete t[s])
          }
        return t
      }
    },
    function (e, t, r) {
      'use strict'
      const n = r(27)
      class s {
        constructor(e) {
          e && this.fromData(e)
        }
        fromData(e) {
          if ('string' == typeof e) {
            const [t, r] = n(e)
            e = { name: t, email: r }
          }
          if ('object' != typeof e)
            throw new Error('Expecting object or string for EmailAddress data')
          const { name: t, email: r } = e
          this.setEmail(r), this.setName(t)
        }
        setName(e) {
          if (void 0 === e) return
          if ('string' != typeof e)
            throw new Error('String expected for `name`')
          const t = '"' === e[0] && '"' === e[e.length - 1],
            r = e.includes(',') && !t
          this.name = r ? `"${e}"` : e
        }
        setEmail(e) {
          if (void 0 === e) throw new Error('Must provide `email`')
          if ('string' != typeof e)
            throw new Error('String expected for `email`')
          this.email = e
        }
        toJSON() {
          const { email: e, name: t } = this,
            r = { email: e }
          return '' !== t && (r.name = t), r
        }
        static create(e) {
          return Array.isArray(e)
            ? e.filter(e => !!e).map(e => this.create(e))
            : e instanceof s
            ? e
            : new s(e)
        }
      }
      e.exports = s
    },
    function (e, t, r) {
      'use strict'
      const n = r(32),
        s = r(9)
      ;(e.exports = n), (e.exports.MailService = s)
    },
    function (e, t, r) {
      'use strict'
      const { Client: n } = r(33),
        {
          classes: { Mail: s }
        } = r(26)
      e.exports = class {
        constructor() {
          this.setClient(new n()),
            this.setSubstitutionWrappers('{{', '}}'),
            (this.secretRules = [])
        }
        setClient(e) {
          this.client = e
        }
        setApiKey(e) {
          this.client.setApiKey(e)
        }
        setTwilioEmailAuth(e, t) {
          this.client.setTwilioEmailAuth(e, t)
        }
        setTimeout(e) {
          void 0 !== e && this.client.setDefaultRequest('timeout', e)
        }
        setSubstitutionWrappers(e, t) {
          if (void 0 === e || void 0 === t)
            throw new Error('Must provide both left and right side wrappers')
          Array.isArray(this.substitutionWrappers) ||
            (this.substitutionWrappers = []),
            (this.substitutionWrappers[0] = e),
            (this.substitutionWrappers[1] = t)
        }
        setSecretRules(e) {
          e instanceof Array || (e = [e])
          const t = e.map(function (e) {
            const t = typeof e
            if ('string' === t) return { pattern: new RegExp(e) }
            if ('object' === t) {
              e instanceof RegExp
                ? (e = { pattern: e })
                : e.hasOwnProperty('pattern') &&
                  'string' == typeof e.pattern &&
                  (e.pattern = new RegExp(e.pattern))
              try {
                return e.pattern.test(''), e
              } catch (e) {}
            }
          })
          this.secretRules = t.filter(function (e) {
            return e
          })
        }
        filterSecrets(e) {
          if ('object' == typeof e && !e.hasOwnProperty('content')) return
          const t = this
          e.content.forEach(function (e) {
            t.secretRules.forEach(function (t) {
              if (t.hasOwnProperty('pattern') && !t.pattern.test(e.value))
                return
              let r = `The pattern '${t.pattern}'`
              throw (
                (t.name && (r += `identified by '${t.name}'`),
                (r += ' was found in the Mail content!'),
                new Error(r))
              )
            })
          })
        }
        send(e, t = !1, r) {
          if (
            ('function' == typeof t && ((r = t), (t = !1)), Array.isArray(e))
          ) {
            const n = Promise.all(e.map(e => this.send(e, t)))
            return r && n.then(e => r(null, e)).catch(e => r(e, null)), n
          }
          try {
            void 0 === e.isMultiple && (e.isMultiple = t),
              void 0 === e.substitutionWrappers &&
                (e.substitutionWrappers = this.substitutionWrappers)
            const n = s.create(e).toJSON()
            this.filterSecrets(n)
            const o = { method: 'POST', url: '/v3/mail/send', body: n }
            return this.client.request(o, r)
          } catch (e) {
            return r && r(e, null), Promise.reject(e)
          }
        }
        sendMultiple(e, t) {
          return this.send(e, !0, t)
        }
      }
    },
    function (e, t, r) {
      'use strict'
      const n = r(35),
        s = r(62),
        {
          helpers: { mergeData: o },
          classes: { Response: i, ResponseError: a }
        } = r(26)
      e.exports = class {
        constructor() {
          ;(this.auth = ''),
            (this.impersonateSubuser = ''),
            (this.defaultHeaders = {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'User-Agent': 'sendgrid/' + s.version + ';nodejs'
            }),
            (this.defaultRequest = {
              baseUrl: 'https://api.sendgrid.com/',
              url: '',
              method: 'GET',
              headers: {},
              maxContentLength: 1 / 0
            })
        }
        setApiKey(e) {
          ;(this.auth = 'Bearer ' + e),
            this.setDefaultRequest('baseUrl', 'https://api.sendgrid.com/'),
            this.isValidApiKey(e) ||
              console.warn('API key does not start with "SG.".')
        }
        setTwilioEmailAuth(e, t) {
          const r = Buffer.from(e + ':' + t).toString('base64')
          ;(this.auth = 'Basic ' + r),
            this.setDefaultRequest('baseUrl', 'https://email.twilio.com/'),
            this.isValidTwilioAuth(e, t) ||
              console.warn(
                'Twilio Email credentials must be non-empty strings.'
              )
        }
        isValidApiKey(e) {
          return this.isString(e) && e.trim().startsWith('SG.')
        }
        isValidTwilioAuth(e, t) {
          return this.isString(e) && e && this.isString(t) && t
        }
        isString(e) {
          return 'string' == typeof e || e instanceof String
        }
        setImpersonateSubuser(e) {
          this.impersonateSubuser = e
        }
        setDefaultHeader(e, t) {
          return (this.defaultHeaders[e] = t), this
        }
        setDefaultRequest(e, t) {
          return (this.defaultRequest[e] = t), this
        }
        createHeaders(e) {
          const t = o(this.defaultHeaders, e)
          return (
            void 0 === t.Authorization &&
              this.auth &&
              (t.Authorization = this.auth),
            this.impersonateSubuser &&
              (t['On-Behalf-Of'] = this.impersonateSubuser),
            t
          )
        }
        createRequest(e) {
          let t = {
            url: e.uri || e.url,
            baseUrl: e.baseUrl,
            method: e.method,
            data: e.body,
            params: e.qs,
            headers: e.headers
          }
          return (
            (t = o(this.defaultRequest, t)),
            (t.headers = this.createHeaders(t.headers)),
            (t.baseURL = t.baseUrl),
            delete t.baseUrl,
            t
          )
        }
        request(e, t) {
          e = this.createRequest(e)
          const r = new Promise((t, r) => {
            n(e)
              .then(e => t([new i(e.status, e.data, e.headers), e.data]))
              .catch(e =>
                e.response && e.response.status >= 400
                  ? r(new a(e.response))
                  : r(e)
              )
          })
          if (t && 'function' != typeof t)
            throw new Error('Callback passed is not a function.')
          return t ? r.then(e => t(null, e)).catch(e => t(e, null)) : r
        }
      }
    },
    function (e, t, r) {
      'use strict'
      e.exports = function (e, t) {
        return function () {
          for (var r = new Array(arguments.length), n = 0; n < r.length; n++)
            r[n] = arguments[n]
          return e.apply(t, r)
        }
      }
    },
    function (e, t, r) {
      'use strict'
      e.exports = function (e) {
        return !(!e || !e.__CANCEL__)
      }
    },
    function (e, t, r) {
      'use strict'
      var n = r(0),
        s = r(41),
        o = { 'Content-Type': 'application/x-www-form-urlencoded' }
      function i(e, t) {
        !n.isUndefined(e) &&
          n.isUndefined(e['Content-Type']) &&
          (e['Content-Type'] = t)
      }
      var a,
        c = {
          adapter:
            ('undefined' != typeof XMLHttpRequest
              ? (a = r(42))
              : 'undefined' != typeof process &&
                '[object process]' ===
                  Object.prototype.toString.call(process) &&
                (a = r(48)),
            a),
          transformRequest: [
            function (e, t) {
              return (
                s(t, 'Accept'),
                s(t, 'Content-Type'),
                n.isFormData(e) ||
                n.isArrayBuffer(e) ||
                n.isBuffer(e) ||
                n.isStream(e) ||
                n.isFile(e) ||
                n.isBlob(e)
                  ? e
                  : n.isArrayBufferView(e)
                  ? e.buffer
                  : n.isURLSearchParams(e)
                  ? (i(t, 'application/x-www-form-urlencoded;charset=utf-8'),
                    e.toString())
                  : n.isObject(e)
                  ? (i(t, 'application/json;charset=utf-8'), JSON.stringify(e))
                  : e
              )
            }
          ],
          transformResponse: [
            function (e) {
              if ('string' == typeof e)
                try {
                  e = JSON.parse(e)
                } catch (e) {}
              return e
            }
          ],
          timeout: 0,
          xsrfCookieName: 'XSRF-TOKEN',
          xsrfHeaderName: 'X-XSRF-TOKEN',
          maxContentLength: -1,
          validateStatus: function (e) {
            return e >= 200 && e < 300
          }
        }
      ;(c.headers = {
        common: { Accept: 'application/json, text/plain, */*' }
      }),
        n.forEach(['delete', 'get', 'head'], function (e) {
          c.headers[e] = {}
        }),
        n.forEach(['post', 'put', 'patch'], function (e) {
          c.headers[e] = n.merge(o)
        }),
        (e.exports = c)
    },
    function (e, t, r) {
      'use strict'
      var n = r(5)
      e.exports = function (e, t, r) {
        var s = r.config.validateStatus
        !s || s(r.status)
          ? e(r)
          : t(
              n(
                'Request failed with status code ' + r.status,
                r.config,
                null,
                r.request,
                r
              )
            )
      }
    },
    function (e, t, r) {
      'use strict'
      e.exports = function (e, t, r, n, s) {
        return (
          (e.config = t),
          r && (e.code = r),
          (e.request = n),
          (e.response = s),
          (e.isAxiosError = !0),
          (e.toJSON = function () {
            return {
              message: this.message,
              name: this.name,
              description: this.description,
              number: this.number,
              fileName: this.fileName,
              lineNumber: this.lineNumber,
              columnNumber: this.columnNumber,
              stack: this.stack,
              config: this.config,
              code: this.code
            }
          }),
          e
        )
      }
    },
    function (e, t, r) {
      'use strict'
      var n = r(43),
        s = r(44)
      e.exports = function (e, t) {
        return e && !n(t) ? s(e, t) : t
      }
    },
    function (e, t) {
      e.exports = require('http')
    },
    function (e, t) {
      e.exports = require('https')
    },
    function (e, t, r) {
      var n = r(20),
        s = r(17),
        o = r(18),
        i = r(49),
        a = r(50).Writable,
        c = r(51)('follow-redirects'),
        u = { GET: !0, HEAD: !0, OPTIONS: !0, TRACE: !0 },
        l = Object.create(null)
      function f(e, t) {
        a.call(this),
          (e.headers = e.headers || {}),
          (this._options = e),
          (this._redirectCount = 0),
          (this._redirects = []),
          (this._requestBodyLength = 0),
          (this._requestBodyBuffers = []),
          e.host && (e.hostname || (e.hostname = e.host), delete e.host),
          t && this.on('response', t)
        var r = this
        if (
          ((this._onNativeResponse = function (e) {
            r._processResponse(e)
          }),
          !e.pathname && e.path)
        ) {
          var n = e.path.indexOf('?')
          n < 0
            ? (e.pathname = e.path)
            : ((e.pathname = e.path.substring(0, n)),
              (e.search = e.path.substring(n)))
        }
        this._performRequest()
      }
      function h(e) {
        var t = { maxRedirects: 21, maxBodyLength: 10485760 },
          r = {}
        return (
          Object.keys(e).forEach(function (s) {
            var o = s + ':',
              a = (r[o] = e[s]),
              u = (t[s] = Object.create(a))
            ;(u.request = function (e, s) {
              return (
                'string' == typeof e
                  ? ((e = n.parse(e)).maxRedirects = t.maxRedirects)
                  : (e = Object.assign(
                      {
                        protocol: o,
                        maxRedirects: t.maxRedirects,
                        maxBodyLength: t.maxBodyLength
                      },
                      e
                    )),
                (e.nativeProtocols = r),
                i.equal(e.protocol, o, 'protocol mismatch'),
                c('options', e),
                new f(e, s)
              )
            }),
              (u.get = function (e, t) {
                var r = u.request(e, t)
                return r.end(), r
              })
          }),
          t
        )
      }
      ;['abort', 'aborted', 'error', 'socket', 'timeout'].forEach(function (e) {
        l[e] = function (t) {
          this._redirectable.emit(e, t)
        }
      }),
        (f.prototype = Object.create(a.prototype)),
        (f.prototype.write = function (e, t, r) {
          if (
            !('string' == typeof e || ('object' == typeof e && 'length' in e))
          )
            throw new Error('data should be a string, Buffer or Uint8Array')
          'function' == typeof t && ((r = t), (t = null)),
            0 !== e.length
              ? this._requestBodyLength + e.length <=
                this._options.maxBodyLength
                ? ((this._requestBodyLength += e.length),
                  this._requestBodyBuffers.push({ data: e, encoding: t }),
                  this._currentRequest.write(e, t, r))
                : (this.emit(
                    'error',
                    new Error('Request body larger than maxBodyLength limit')
                  ),
                  this.abort())
              : r && r()
        }),
        (f.prototype.end = function (e, t, r) {
          'function' == typeof e
            ? ((r = e), (e = t = null))
            : 'function' == typeof t && ((r = t), (t = null))
          var n = this._currentRequest
          this.write(e || '', t, function () {
            n.end(null, null, r)
          })
        }),
        (f.prototype.setHeader = function (e, t) {
          ;(this._options.headers[e] = t), this._currentRequest.setHeader(e, t)
        }),
        (f.prototype.removeHeader = function (e) {
          delete this._options.headers[e], this._currentRequest.removeHeader(e)
        }),
        [
          'abort',
          'flushHeaders',
          'getHeader',
          'setNoDelay',
          'setSocketKeepAlive',
          'setTimeout'
        ].forEach(function (e) {
          f.prototype[e] = function (t, r) {
            return this._currentRequest[e](t, r)
          }
        }),
        ['aborted', 'connection', 'socket'].forEach(function (e) {
          Object.defineProperty(f.prototype, e, {
            get: function () {
              return this._currentRequest[e]
            }
          })
        }),
        (f.prototype._performRequest = function () {
          var e = this._options.protocol,
            t = this._options.nativeProtocols[e]
          if (t) {
            if (this._options.agents) {
              var r = e.substr(0, e.length - 1)
              this._options.agent = this._options.agents[r]
            }
            var s = (this._currentRequest = t.request(
              this._options,
              this._onNativeResponse
            ))
            for (var o in ((this._currentUrl = n.format(this._options)),
            (s._redirectable = this),
            l))
              o && s.on(o, l[o])
            if (this._isRedirect) {
              var i = 0,
                a = this._requestBodyBuffers
              !(function e() {
                if (i < a.length) {
                  var t = a[i++]
                  s.write(t.data, t.encoding, e)
                } else s.end()
              })()
            }
          } else this.emit('error', new Error('Unsupported protocol ' + e))
        }),
        (f.prototype._processResponse = function (e) {
          this._options.trackRedirects &&
            this._redirects.push({
              url: this._currentUrl,
              headers: e.headers,
              statusCode: e.statusCode
            })
          var t = e.headers.location
          if (
            t &&
            !1 !== this._options.followRedirects &&
            e.statusCode >= 300 &&
            e.statusCode < 400
          ) {
            if (++this._redirectCount > this._options.maxRedirects)
              return void this.emit(
                'error',
                new Error('Max redirects exceeded.')
              )
            var r,
              s = this._options.headers
            if (307 !== e.statusCode && !(this._options.method in u))
              for (r in ((this._options.method = 'GET'),
              (this._requestBodyBuffers = []),
              s))
                /^content-/i.test(r) && delete s[r]
            if (!this._isRedirect) for (r in s) /^host$/i.test(r) && delete s[r]
            var o = n.resolve(this._currentUrl, t)
            c('redirecting to', o),
              Object.assign(this._options, n.parse(o)),
              (this._isRedirect = !0),
              this._performRequest(),
              e.destroy()
          } else
            (e.responseUrl = this._currentUrl),
              (e.redirects = this._redirects),
              this.emit('response', e),
              (this._requestBodyBuffers = [])
        }),
        (e.exports = h({ http: s, https: o })),
        (e.exports.wrap = h)
    },
    function (e, t) {
      e.exports = require('url')
    },
    function (e, t, r) {
      function n(e) {
        var r
        function n() {
          if (n.enabled) {
            var e = n,
              s = +new Date(),
              o = s - (r || s)
            ;(e.diff = o), (e.prev = r), (e.curr = s), (r = s)
            for (var i = new Array(arguments.length), a = 0; a < i.length; a++)
              i[a] = arguments[a]
            ;(i[0] = t.coerce(i[0])), 'string' != typeof i[0] && i.unshift('%O')
            var c = 0
            ;(i[0] = i[0].replace(/%([a-zA-Z%])/g, function (r, n) {
              if ('%%' === r) return r
              c++
              var s = t.formatters[n]
              if ('function' == typeof s) {
                var o = i[c]
                ;(r = s.call(e, o)), i.splice(c, 1), c--
              }
              return r
            })),
              t.formatArgs.call(e, i)
            var u = n.log || t.log || console.log.bind(console)
            u.apply(e, i)
          }
        }
        return (
          (n.namespace = e),
          (n.enabled = t.enabled(e)),
          (n.useColors = t.useColors()),
          (n.color = (function (e) {
            var r,
              n = 0
            for (r in e) (n = (n << 5) - n + e.charCodeAt(r)), (n |= 0)
            return t.colors[Math.abs(n) % t.colors.length]
          })(e)),
          (n.destroy = s),
          'function' == typeof t.init && t.init(n),
          t.instances.push(n),
          n
        )
      }
      function s() {
        var e = t.instances.indexOf(this)
        return -1 !== e && (t.instances.splice(e, 1), !0)
      }
      ;((t = e.exports = n.debug = n.default = n).coerce = function (e) {
        return e instanceof Error ? e.stack || e.message : e
      }),
        (t.disable = function () {
          t.enable('')
        }),
        (t.enable = function (e) {
          var r
          t.save(e), (t.names = []), (t.skips = [])
          var n = ('string' == typeof e ? e : '').split(/[\s,]+/),
            s = n.length
          for (r = 0; r < s; r++)
            n[r] &&
              ('-' === (e = n[r].replace(/\*/g, '.*?'))[0]
                ? t.skips.push(new RegExp('^' + e.substr(1) + '$'))
                : t.names.push(new RegExp('^' + e + '$')))
          for (r = 0; r < t.instances.length; r++) {
            var o = t.instances[r]
            o.enabled = t.enabled(o.namespace)
          }
        }),
        (t.enabled = function (e) {
          if ('*' === e[e.length - 1]) return !0
          var r, n
          for (r = 0, n = t.skips.length; r < n; r++)
            if (t.skips[r].test(e)) return !1
          for (r = 0, n = t.names.length; r < n; r++)
            if (t.names[r].test(e)) return !0
          return !1
        }),
        (t.humanize = r(53)),
        (t.instances = []),
        (t.names = []),
        (t.skips = []),
        (t.formatters = {})
    },
    function (e, t) {
      e.exports = require('tty')
    },
    function (e, t) {
      e.exports = require('os')
    },
    function (e, t, r) {
      'use strict'
      var n = r(0)
      e.exports = function (e, t) {
        t = t || {}
        var r = {},
          s = ['url', 'method', 'params', 'data'],
          o = ['headers', 'auth', 'proxy'],
          i = [
            'baseURL',
            'url',
            'transformRequest',
            'transformResponse',
            'paramsSerializer',
            'timeout',
            'withCredentials',
            'adapter',
            'responseType',
            'xsrfCookieName',
            'xsrfHeaderName',
            'onUploadProgress',
            'onDownloadProgress',
            'maxContentLength',
            'validateStatus',
            'maxRedirects',
            'httpAgent',
            'httpsAgent',
            'cancelToken',
            'socketPath'
          ]
        n.forEach(s, function (e) {
          void 0 !== t[e] && (r[e] = t[e])
        }),
          n.forEach(o, function (s) {
            n.isObject(t[s])
              ? (r[s] = n.deepMerge(e[s], t[s]))
              : void 0 !== t[s]
              ? (r[s] = t[s])
              : n.isObject(e[s])
              ? (r[s] = n.deepMerge(e[s]))
              : void 0 !== e[s] && (r[s] = e[s])
          }),
          n.forEach(i, function (n) {
            void 0 !== t[n] ? (r[n] = t[n]) : void 0 !== e[n] && (r[n] = e[n])
          })
        var a = s.concat(o).concat(i),
          c = Object.keys(t).filter(function (e) {
            return -1 === a.indexOf(e)
          })
        return (
          n.forEach(c, function (n) {
            void 0 !== t[n] ? (r[n] = t[n]) : void 0 !== e[n] && (r[n] = e[n])
          }),
          r
        )
      }
    },
    function (e, t, r) {
      'use strict'
      function n(e) {
        this.message = e
      }
      ;(n.prototype.toString = function () {
        return 'Cancel' + (this.message ? ': ' + this.message : '')
      }),
        (n.prototype.__CANCEL__ = !0),
        (e.exports = n)
    },
    function (e, t, r) {
      'use strict'
      const n = r(63),
        s = r(85)
      e.exports = { classes: n, helpers: s }
    },
    function (e, t, r) {
      'use strict'
      e.exports = function (e) {
        if (-1 === e.indexOf('<')) return ['', e]
        let [t, r] = e.split('<')
        return (t = t.trim()), (r = r.replace('>', '').trim()), [t, r]
      }
    },
    function (e, t, r) {
      'use strict'
      const n = r(7),
        s = r(1),
        o = r(3),
        i = r(2),
        a = r(70),
        c = r(29)
      e.exports = class {
        constructor(e) {
          ;(this.to = []),
            (this.cc = []),
            (this.bcc = []),
            (this.headers = {}),
            (this.customArgs = {}),
            (this.substitutions = {}),
            (this.substitutionWrappers = ['{{', '}}']),
            (this.dynamicTemplateData = {}),
            e && this.fromData(e)
        }
        fromData(e) {
          if ('object' != typeof e)
            throw new Error('Expecting object for Mail data')
          ;(e = i(e)),
            (e = s(e, [
              'substitutions',
              'dynamicTemplateData',
              'customArgs',
              'headers'
            ]))
          const {
            to: t,
            cc: r,
            bcc: n,
            subject: o,
            headers: a,
            customArgs: c,
            sendAt: u,
            substitutions: l,
            substitutionWrappers: f,
            dynamicTemplateData: h
          } = e
          this.setTo(t),
            this.setCc(r),
            this.setBcc(n),
            this.setSubject(o),
            this.setHeaders(a),
            this.setSubstitutions(l),
            this.setSubstitutionWrappers(f),
            this.setCustomArgs(c),
            this.setDynamicTemplateData(h),
            this.setSendAt(u)
        }
        setSubject(e) {
          if (void 0 !== e) {
            if ('string' != typeof e)
              throw new Error('String expected for `subject`')
            this.subject = e
          }
        }
        setSendAt(e) {
          if (void 0 !== e) {
            if (!Number.isInteger(e))
              throw new Error('Integer expected for `sendAt`')
            this.sendAt = e
          }
        }
        setTo(e) {
          void 0 !== e &&
            (Array.isArray(e) || (e = [e]), (this.to = n.create(e)))
        }
        addTo(e) {
          void 0 !== e && this.to.push(n.create(e))
        }
        setCc(e) {
          void 0 !== e &&
            (Array.isArray(e) || (e = [e]), (this.cc = n.create(e)))
        }
        addCc(e) {
          void 0 !== e && this.cc.push(n.create(e))
        }
        setBcc(e) {
          void 0 !== e &&
            (Array.isArray(e) || (e = [e]), (this.bcc = n.create(e)))
        }
        addBcc(e) {
          void 0 !== e && this.bcc.push(n.create(e))
        }
        setHeaders(e) {
          if (void 0 !== e) {
            if ('object' != typeof e || null === e)
              throw new Error('Object expected for `headers`')
            this.headers = e
          }
        }
        addHeader(e, t) {
          if ('string' != typeof e)
            throw new Error('String expected for header key')
          if ('string' != typeof t)
            throw new Error('String expected for header value')
          this.headers[e] = t
        }
        setCustomArgs(e) {
          if (void 0 !== e) {
            if ('object' != typeof e || null === e)
              throw new Error('Object expected for `customArgs`')
            this.customArgs = e
          }
        }
        addCustomArg(e, t) {
          if ('string' != typeof e)
            throw new Error('String expected for custom arg key')
          if ('string' != typeof t)
            throw new Error('String expected for custom arg value')
          this.customArgs[e] = t
        }
        setSubstitutions(e) {
          if (void 0 !== e) {
            if ('object' != typeof e)
              throw new Error('Object expected for `substitutions`')
            this.substitutions = e
          }
        }
        addSubstitution(e, t) {
          if ('string' != typeof e)
            throw new Error('String expected for substitution key')
          if ('string' != typeof t && 'number' != typeof t)
            throw new Error('String or Number expected for substitution value')
          this.substitutions[e] = t
        }
        reverseMergeSubstitutions(e) {
          if (null != e) {
            if ('object' != typeof e)
              throw new Error(
                'Object expected for `substitutions` in reverseMergeSubstitutions'
              )
            this.substitutions = Object.assign({}, e, this.substitutions)
          }
        }
        setSubstitutionWrappers(e) {
          if (null != e) {
            if (!Array.isArray(e) || 2 !== e.length)
              throw new Error(
                'Array expected with two elements for `substitutionWrappers`'
              )
            this.substitutionWrappers = e
          }
        }
        deepMergeDynamicTemplateData(e) {
          if (null != e) {
            if ('object' != typeof e)
              throw new Error(
                'Object expected for `dynamicTemplateData` in deepMergeDynamicTemplateData'
              )
            this.dynamicTemplateData = a(e, this.dynamicTemplateData)
          }
        }
        setDynamicTemplateData(e) {
          if (void 0 !== e) {
            if ('object' != typeof e)
              throw new Error('Object expected for `dynamicTemplateData`')
            this.dynamicTemplateData = e
          }
        }
        toJSON() {
          const {
              to: e,
              cc: t,
              bcc: r,
              subject: n,
              headers: s,
              customArgs: i,
              sendAt: a,
              substitutions: u,
              substitutionWrappers: l,
              dynamicTemplateData: f
            } = this,
            h = { to: e }
          if (
            (Array.isArray(t) && t.length > 0 && (h.cc = t),
            Array.isArray(r) && r.length > 0 && (h.bcc = r),
            Object.keys(s).length > 0 && (h.headers = s),
            u && Object.keys(u).length > 0)
          ) {
            const [e, t] = l
            h.substitutions = c(u, e, t)
          }
          return (
            Object.keys(i).length > 0 && (h.customArgs = i),
            f && Object.keys(f).length > 0 && (h.dynamicTemplateData = f),
            void 0 !== n && (h.subject = n),
            void 0 !== a && (h.sendAt = a),
            o(h, [
              'substitutions',
              'dynamicTemplateData',
              'customArgs',
              'headers'
            ])
          )
        }
      }
    },
    function (e, t, r) {
      'use strict'
      e.exports = function e(t, r = '{{', n = '}}') {
        if (Array.isArray(t)) return t.map(t => e(t, r, n))
        const s = {}
        for (const e in t) t.hasOwnProperty(e) && (s[r + e + n] = String(t[e]))
        return s
      }
    },
    function (e, t, r) {
      'use strict'
      e.exports = function (e) {
        return e.map(e =>
          'object' == typeof e && null !== e && 'function' == typeof e.toJSON
            ? e.toJSON()
            : e
        )
      }
    },
    function (e, t, r) {
      var n = r(79),
        s = {}
      for (var o in n) n.hasOwnProperty(o) && (s[n[o]] = o)
      var i = (e.exports = {
        rgb: { channels: 3, labels: 'rgb' },
        hsl: { channels: 3, labels: 'hsl' },
        hsv: { channels: 3, labels: 'hsv' },
        hwb: { channels: 3, labels: 'hwb' },
        cmyk: { channels: 4, labels: 'cmyk' },
        xyz: { channels: 3, labels: 'xyz' },
        lab: { channels: 3, labels: 'lab' },
        lch: { channels: 3, labels: 'lch' },
        hex: { channels: 1, labels: ['hex'] },
        keyword: { channels: 1, labels: ['keyword'] },
        ansi16: { channels: 1, labels: ['ansi16'] },
        ansi256: { channels: 1, labels: ['ansi256'] },
        hcg: { channels: 3, labels: ['h', 'c', 'g'] },
        apple: { channels: 3, labels: ['r16', 'g16', 'b16'] },
        gray: { channels: 1, labels: ['gray'] }
      })
      for (var a in i)
        if (i.hasOwnProperty(a)) {
          if (!('channels' in i[a]))
            throw new Error('missing channels property: ' + a)
          if (!('labels' in i[a]))
            throw new Error('missing channel labels property: ' + a)
          if (i[a].labels.length !== i[a].channels)
            throw new Error('channel and label counts mismatch: ' + a)
          var c = i[a].channels,
            u = i[a].labels
          delete i[a].channels,
            delete i[a].labels,
            Object.defineProperty(i[a], 'channels', { value: c }),
            Object.defineProperty(i[a], 'labels', { value: u })
        }
      ;(i.rgb.hsl = function (e) {
        var t,
          r,
          n = e[0] / 255,
          s = e[1] / 255,
          o = e[2] / 255,
          i = Math.min(n, s, o),
          a = Math.max(n, s, o),
          c = a - i
        return (
          a === i
            ? (t = 0)
            : n === a
            ? (t = (s - o) / c)
            : s === a
            ? (t = 2 + (o - n) / c)
            : o === a && (t = 4 + (n - s) / c),
          (t = Math.min(60 * t, 360)) < 0 && (t += 360),
          (r = (i + a) / 2),
          [
            t,
            100 * (a === i ? 0 : r <= 0.5 ? c / (a + i) : c / (2 - a - i)),
            100 * r
          ]
        )
      }),
        (i.rgb.hsv = function (e) {
          var t,
            r,
            n,
            s,
            o,
            i = e[0] / 255,
            a = e[1] / 255,
            c = e[2] / 255,
            u = Math.max(i, a, c),
            l = u - Math.min(i, a, c),
            f = function (e) {
              return (u - e) / 6 / l + 0.5
            }
          return (
            0 === l
              ? (s = o = 0)
              : ((o = l / u),
                (t = f(i)),
                (r = f(a)),
                (n = f(c)),
                i === u
                  ? (s = n - r)
                  : a === u
                  ? (s = 1 / 3 + t - n)
                  : c === u && (s = 2 / 3 + r - t),
                s < 0 ? (s += 1) : s > 1 && (s -= 1)),
            [360 * s, 100 * o, 100 * u]
          )
        }),
        (i.rgb.hwb = function (e) {
          var t = e[0],
            r = e[1],
            n = e[2]
          return [
            i.rgb.hsl(e)[0],
            100 * ((1 / 255) * Math.min(t, Math.min(r, n))),
            100 * (n = 1 - (1 / 255) * Math.max(t, Math.max(r, n)))
          ]
        }),
        (i.rgb.cmyk = function (e) {
          var t,
            r = e[0] / 255,
            n = e[1] / 255,
            s = e[2] / 255
          return [
            100 *
              ((1 - r - (t = Math.min(1 - r, 1 - n, 1 - s))) / (1 - t) || 0),
            100 * ((1 - n - t) / (1 - t) || 0),
            100 * ((1 - s - t) / (1 - t) || 0),
            100 * t
          ]
        }),
        (i.rgb.keyword = function (e) {
          var t = s[e]
          if (t) return t
          var r,
            o,
            i,
            a = 1 / 0
          for (var c in n)
            if (n.hasOwnProperty(c)) {
              var u = n[c],
                l =
                  ((o = e),
                  (i = u),
                  Math.pow(o[0] - i[0], 2) +
                    Math.pow(o[1] - i[1], 2) +
                    Math.pow(o[2] - i[2], 2))
              l < a && ((a = l), (r = c))
            }
          return r
        }),
        (i.keyword.rgb = function (e) {
          return n[e]
        }),
        (i.rgb.xyz = function (e) {
          var t = e[0] / 255,
            r = e[1] / 255,
            n = e[2] / 255
          return [
            100 *
              (0.4124 *
                (t =
                  t > 0.04045
                    ? Math.pow((t + 0.055) / 1.055, 2.4)
                    : t / 12.92) +
                0.3576 *
                  (r =
                    r > 0.04045
                      ? Math.pow((r + 0.055) / 1.055, 2.4)
                      : r / 12.92) +
                0.1805 *
                  (n =
                    n > 0.04045
                      ? Math.pow((n + 0.055) / 1.055, 2.4)
                      : n / 12.92)),
            100 * (0.2126 * t + 0.7152 * r + 0.0722 * n),
            100 * (0.0193 * t + 0.1192 * r + 0.9505 * n)
          ]
        }),
        (i.rgb.lab = function (e) {
          var t = i.rgb.xyz(e),
            r = t[0],
            n = t[1],
            s = t[2]
          return (
            (n /= 100),
            (s /= 108.883),
            (r =
              (r /= 95.047) > 0.008856
                ? Math.pow(r, 1 / 3)
                : 7.787 * r + 16 / 116),
            [
              116 *
                (n = n > 0.008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116) -
                16,
              500 * (r - n),
              200 *
                (n -
                  (s =
                    s > 0.008856 ? Math.pow(s, 1 / 3) : 7.787 * s + 16 / 116))
            ]
          )
        }),
        (i.hsl.rgb = function (e) {
          var t,
            r,
            n,
            s,
            o,
            i = e[0] / 360,
            a = e[1] / 100,
            c = e[2] / 100
          if (0 === a) return [(o = 255 * c), o, o]
          ;(t = 2 * c - (r = c < 0.5 ? c * (1 + a) : c + a - c * a)),
            (s = [0, 0, 0])
          for (var u = 0; u < 3; u++)
            (n = i + (1 / 3) * -(u - 1)) < 0 && n++,
              n > 1 && n--,
              (o =
                6 * n < 1
                  ? t + 6 * (r - t) * n
                  : 2 * n < 1
                  ? r
                  : 3 * n < 2
                  ? t + (r - t) * (2 / 3 - n) * 6
                  : t),
              (s[u] = 255 * o)
          return s
        }),
        (i.hsl.hsv = function (e) {
          var t = e[0],
            r = e[1] / 100,
            n = e[2] / 100,
            s = r,
            o = Math.max(n, 0.01)
          return (
            (r *= (n *= 2) <= 1 ? n : 2 - n),
            (s *= o <= 1 ? o : 2 - o),
            [
              t,
              100 * (0 === n ? (2 * s) / (o + s) : (2 * r) / (n + r)),
              100 * ((n + r) / 2)
            ]
          )
        }),
        (i.hsv.rgb = function (e) {
          var t = e[0] / 60,
            r = e[1] / 100,
            n = e[2] / 100,
            s = Math.floor(t) % 6,
            o = t - Math.floor(t),
            i = 255 * n * (1 - r),
            a = 255 * n * (1 - r * o),
            c = 255 * n * (1 - r * (1 - o))
          switch (((n *= 255), s)) {
            case 0:
              return [n, c, i]
            case 1:
              return [a, n, i]
            case 2:
              return [i, n, c]
            case 3:
              return [i, a, n]
            case 4:
              return [c, i, n]
            case 5:
              return [n, i, a]
          }
        }),
        (i.hsv.hsl = function (e) {
          var t,
            r,
            n,
            s = e[0],
            o = e[1] / 100,
            i = e[2] / 100,
            a = Math.max(i, 0.01)
          return (
            (n = (2 - o) * i),
            (r = o * a),
            [
              s,
              100 * (r = (r /= (t = (2 - o) * a) <= 1 ? t : 2 - t) || 0),
              100 * (n /= 2)
            ]
          )
        }),
        (i.hwb.rgb = function (e) {
          var t,
            r,
            n,
            s,
            o,
            i,
            a,
            c = e[0] / 360,
            u = e[1] / 100,
            l = e[2] / 100,
            f = u + l
          switch (
            (f > 1 && ((u /= f), (l /= f)),
            (n = 6 * c - (t = Math.floor(6 * c))),
            0 != (1 & t) && (n = 1 - n),
            (s = u + n * ((r = 1 - l) - u)),
            t)
          ) {
            default:
            case 6:
            case 0:
              ;(o = r), (i = s), (a = u)
              break
            case 1:
              ;(o = s), (i = r), (a = u)
              break
            case 2:
              ;(o = u), (i = r), (a = s)
              break
            case 3:
              ;(o = u), (i = s), (a = r)
              break
            case 4:
              ;(o = s), (i = u), (a = r)
              break
            case 5:
              ;(o = r), (i = u), (a = s)
          }
          return [255 * o, 255 * i, 255 * a]
        }),
        (i.cmyk.rgb = function (e) {
          var t = e[0] / 100,
            r = e[1] / 100,
            n = e[2] / 100,
            s = e[3] / 100
          return [
            255 * (1 - Math.min(1, t * (1 - s) + s)),
            255 * (1 - Math.min(1, r * (1 - s) + s)),
            255 * (1 - Math.min(1, n * (1 - s) + s))
          ]
        }),
        (i.xyz.rgb = function (e) {
          var t,
            r,
            n,
            s = e[0] / 100,
            o = e[1] / 100,
            i = e[2] / 100
          return (
            (r = -0.9689 * s + 1.8758 * o + 0.0415 * i),
            (n = 0.0557 * s + -0.204 * o + 1.057 * i),
            (t =
              (t = 3.2406 * s + -1.5372 * o + -0.4986 * i) > 0.0031308
                ? 1.055 * Math.pow(t, 1 / 2.4) - 0.055
                : 12.92 * t),
            (r =
              r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r),
            (n =
              n > 0.0031308 ? 1.055 * Math.pow(n, 1 / 2.4) - 0.055 : 12.92 * n),
            [
              255 * (t = Math.min(Math.max(0, t), 1)),
              255 * (r = Math.min(Math.max(0, r), 1)),
              255 * (n = Math.min(Math.max(0, n), 1))
            ]
          )
        }),
        (i.xyz.lab = function (e) {
          var t = e[0],
            r = e[1],
            n = e[2]
          return (
            (r /= 100),
            (n /= 108.883),
            (t =
              (t /= 95.047) > 0.008856
                ? Math.pow(t, 1 / 3)
                : 7.787 * t + 16 / 116),
            [
              116 *
                (r = r > 0.008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116) -
                16,
              500 * (t - r),
              200 *
                (r -
                  (n =
                    n > 0.008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116))
            ]
          )
        }),
        (i.lab.xyz = function (e) {
          var t,
            r,
            n,
            s = e[0]
          ;(t = e[1] / 500 + (r = (s + 16) / 116)), (n = r - e[2] / 200)
          var o = Math.pow(r, 3),
            i = Math.pow(t, 3),
            a = Math.pow(n, 3)
          return (
            (r = o > 0.008856 ? o : (r - 16 / 116) / 7.787),
            (t = i > 0.008856 ? i : (t - 16 / 116) / 7.787),
            (n = a > 0.008856 ? a : (n - 16 / 116) / 7.787),
            [(t *= 95.047), (r *= 100), (n *= 108.883)]
          )
        }),
        (i.lab.lch = function (e) {
          var t,
            r = e[0],
            n = e[1],
            s = e[2]
          return (
            (t = (360 * Math.atan2(s, n)) / 2 / Math.PI) < 0 && (t += 360),
            [r, Math.sqrt(n * n + s * s), t]
          )
        }),
        (i.lch.lab = function (e) {
          var t,
            r = e[0],
            n = e[1]
          return (
            (t = (e[2] / 360) * 2 * Math.PI),
            [r, n * Math.cos(t), n * Math.sin(t)]
          )
        }),
        (i.rgb.ansi16 = function (e) {
          var t = e[0],
            r = e[1],
            n = e[2],
            s = 1 in arguments ? arguments[1] : i.rgb.hsv(e)[2]
          if (0 === (s = Math.round(s / 50))) return 30
          var o =
            30 +
            ((Math.round(n / 255) << 2) |
              (Math.round(r / 255) << 1) |
              Math.round(t / 255))
          return 2 === s && (o += 60), o
        }),
        (i.hsv.ansi16 = function (e) {
          return i.rgb.ansi16(i.hsv.rgb(e), e[2])
        }),
        (i.rgb.ansi256 = function (e) {
          var t = e[0],
            r = e[1],
            n = e[2]
          return t === r && r === n
            ? t < 8
              ? 16
              : t > 248
              ? 231
              : Math.round(((t - 8) / 247) * 24) + 232
            : 16 +
                36 * Math.round((t / 255) * 5) +
                6 * Math.round((r / 255) * 5) +
                Math.round((n / 255) * 5)
        }),
        (i.ansi16.rgb = function (e) {
          var t = e % 10
          if (0 === t || 7 === t)
            return e > 50 && (t += 3.5), [(t = (t / 10.5) * 255), t, t]
          var r = 0.5 * (1 + ~~(e > 50))
          return [
            (1 & t) * r * 255,
            ((t >> 1) & 1) * r * 255,
            ((t >> 2) & 1) * r * 255
          ]
        }),
        (i.ansi256.rgb = function (e) {
          if (e >= 232) {
            var t = 10 * (e - 232) + 8
            return [t, t, t]
          }
          var r
          return (
            (e -= 16),
            [
              (Math.floor(e / 36) / 5) * 255,
              (Math.floor((r = e % 36) / 6) / 5) * 255,
              ((r % 6) / 5) * 255
            ]
          )
        }),
        (i.rgb.hex = function (e) {
          var t = (
            ((255 & Math.round(e[0])) << 16) +
            ((255 & Math.round(e[1])) << 8) +
            (255 & Math.round(e[2]))
          )
            .toString(16)
            .toUpperCase()
          return '000000'.substring(t.length) + t
        }),
        (i.hex.rgb = function (e) {
          var t = e.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i)
          if (!t) return [0, 0, 0]
          var r = t[0]
          3 === t[0].length &&
            (r = r
              .split('')
              .map(function (e) {
                return e + e
              })
              .join(''))
          var n = parseInt(r, 16)
          return [(n >> 16) & 255, (n >> 8) & 255, 255 & n]
        }),
        (i.rgb.hcg = function (e) {
          var t,
            r = e[0] / 255,
            n = e[1] / 255,
            s = e[2] / 255,
            o = Math.max(Math.max(r, n), s),
            i = Math.min(Math.min(r, n), s),
            a = o - i
          return (
            (t =
              a <= 0
                ? 0
                : o === r
                ? ((n - s) / a) % 6
                : o === n
                ? 2 + (s - r) / a
                : 4 + (r - n) / a + 4),
            (t /= 6),
            [360 * (t %= 1), 100 * a, 100 * (a < 1 ? i / (1 - a) : 0)]
          )
        }),
        (i.hsl.hcg = function (e) {
          var t = e[1] / 100,
            r = e[2] / 100,
            n = 1,
            s = 0
          return (
            (n = r < 0.5 ? 2 * t * r : 2 * t * (1 - r)) < 1 &&
              (s = (r - 0.5 * n) / (1 - n)),
            [e[0], 100 * n, 100 * s]
          )
        }),
        (i.hsv.hcg = function (e) {
          var t = e[1] / 100,
            r = e[2] / 100,
            n = t * r,
            s = 0
          return n < 1 && (s = (r - n) / (1 - n)), [e[0], 100 * n, 100 * s]
        }),
        (i.hcg.rgb = function (e) {
          var t = e[0] / 360,
            r = e[1] / 100,
            n = e[2] / 100
          if (0 === r) return [255 * n, 255 * n, 255 * n]
          var s,
            o = [0, 0, 0],
            i = (t % 1) * 6,
            a = i % 1,
            c = 1 - a
          switch (Math.floor(i)) {
            case 0:
              ;(o[0] = 1), (o[1] = a), (o[2] = 0)
              break
            case 1:
              ;(o[0] = c), (o[1] = 1), (o[2] = 0)
              break
            case 2:
              ;(o[0] = 0), (o[1] = 1), (o[2] = a)
              break
            case 3:
              ;(o[0] = 0), (o[1] = c), (o[2] = 1)
              break
            case 4:
              ;(o[0] = a), (o[1] = 0), (o[2] = 1)
              break
            default:
              ;(o[0] = 1), (o[1] = 0), (o[2] = c)
          }
          return (
            (s = (1 - r) * n),
            [255 * (r * o[0] + s), 255 * (r * o[1] + s), 255 * (r * o[2] + s)]
          )
        }),
        (i.hcg.hsv = function (e) {
          var t = e[1] / 100,
            r = t + (e[2] / 100) * (1 - t),
            n = 0
          return r > 0 && (n = t / r), [e[0], 100 * n, 100 * r]
        }),
        (i.hcg.hsl = function (e) {
          var t = e[1] / 100,
            r = (e[2] / 100) * (1 - t) + 0.5 * t,
            n = 0
          return (
            r > 0 && r < 0.5
              ? (n = t / (2 * r))
              : r >= 0.5 && r < 1 && (n = t / (2 * (1 - r))),
            [e[0], 100 * n, 100 * r]
          )
        }),
        (i.hcg.hwb = function (e) {
          var t = e[1] / 100,
            r = t + (e[2] / 100) * (1 - t)
          return [e[0], 100 * (r - t), 100 * (1 - r)]
        }),
        (i.hwb.hcg = function (e) {
          var t = e[1] / 100,
            r = 1 - e[2] / 100,
            n = r - t,
            s = 0
          return n < 1 && (s = (r - n) / (1 - n)), [e[0], 100 * n, 100 * s]
        }),
        (i.apple.rgb = function (e) {
          return [
            (e[0] / 65535) * 255,
            (e[1] / 65535) * 255,
            (e[2] / 65535) * 255
          ]
        }),
        (i.rgb.apple = function (e) {
          return [
            (e[0] / 255) * 65535,
            (e[1] / 255) * 65535,
            (e[2] / 255) * 65535
          ]
        }),
        (i.gray.rgb = function (e) {
          return [(e[0] / 100) * 255, (e[0] / 100) * 255, (e[0] / 100) * 255]
        }),
        (i.gray.hsl = i.gray.hsv = function (e) {
          return [0, 0, e[0]]
        }),
        (i.gray.hwb = function (e) {
          return [0, 100, e[0]]
        }),
        (i.gray.cmyk = function (e) {
          return [0, 0, 0, e[0]]
        }),
        (i.gray.lab = function (e) {
          return [e[0], 0, 0]
        }),
        (i.gray.hex = function (e) {
          var t = 255 & Math.round((e[0] / 100) * 255),
            r = ((t << 16) + (t << 8) + t).toString(16).toUpperCase()
          return '000000'.substring(r.length) + r
        }),
        (i.rgb.gray = function (e) {
          return [((e[0] + e[1] + e[2]) / 3 / 255) * 100]
        })
    },
    function (e, t, r) {
      'use strict'
      const n = r(9)
      e.exports = new n()
    },
    function (e, t, r) {
      'use strict'
      const n = r(34),
        s = r(10)
      ;(e.exports = n), (e.exports.Client = s)
    },
    function (e, t, r) {
      'use strict'
      const n = r(10)
      e.exports = new n()
    },
    function (e, t, r) {
      e.exports = r(36)
    },
    function (e, t, r) {
      'use strict'
      var n = r(0),
        s = r(11),
        o = r(37),
        i = r(24)
      function a(e) {
        var t = new o(e),
          r = s(o.prototype.request, t)
        return n.extend(r, o.prototype, t), n.extend(r, t), r
      }
      var c = a(r(13))
      ;(c.Axios = o),
        (c.create = function (e) {
          return a(i(c.defaults, e))
        }),
        (c.Cancel = r(25)),
        (c.CancelToken = r(60)),
        (c.isCancel = r(12)),
        (c.all = function (e) {
          return Promise.all(e)
        }),
        (c.spread = r(61)),
        (e.exports = c),
        (e.exports.default = c)
    },
    function (e, t, r) {
      'use strict'
      var n = r(0),
        s = r(4),
        o = r(38),
        i = r(39),
        a = r(24)
      function c(e) {
        ;(this.defaults = e),
          (this.interceptors = { request: new o(), response: new o() })
      }
      ;(c.prototype.request = function (e) {
        'string' == typeof e
          ? ((e = arguments[1] || {}).url = arguments[0])
          : (e = e || {}),
          (e = a(this.defaults, e)).method
            ? (e.method = e.method.toLowerCase())
            : this.defaults.method
            ? (e.method = this.defaults.method.toLowerCase())
            : (e.method = 'get')
        var t = [i, void 0],
          r = Promise.resolve(e)
        for (
          this.interceptors.request.forEach(function (e) {
            t.unshift(e.fulfilled, e.rejected)
          }),
            this.interceptors.response.forEach(function (e) {
              t.push(e.fulfilled, e.rejected)
            });
          t.length;

        )
          r = r.then(t.shift(), t.shift())
        return r
      }),
        (c.prototype.getUri = function (e) {
          return (
            (e = a(this.defaults, e)),
            s(e.url, e.params, e.paramsSerializer).replace(/^\?/, '')
          )
        }),
        n.forEach(['delete', 'get', 'head', 'options'], function (e) {
          c.prototype[e] = function (t, r) {
            return this.request(n.merge(r || {}, { method: e, url: t }))
          }
        }),
        n.forEach(['post', 'put', 'patch'], function (e) {
          c.prototype[e] = function (t, r, s) {
            return this.request(
              n.merge(s || {}, { method: e, url: t, data: r })
            )
          }
        }),
        (e.exports = c)
    },
    function (e, t, r) {
      'use strict'
      var n = r(0)
      function s() {
        this.handlers = []
      }
      ;(s.prototype.use = function (e, t) {
        return (
          this.handlers.push({ fulfilled: e, rejected: t }),
          this.handlers.length - 1
        )
      }),
        (s.prototype.eject = function (e) {
          this.handlers[e] && (this.handlers[e] = null)
        }),
        (s.prototype.forEach = function (e) {
          n.forEach(this.handlers, function (t) {
            null !== t && e(t)
          })
        }),
        (e.exports = s)
    },
    function (e, t, r) {
      'use strict'
      var n = r(0),
        s = r(40),
        o = r(12),
        i = r(13)
      function a(e) {
        e.cancelToken && e.cancelToken.throwIfRequested()
      }
      e.exports = function (e) {
        return (
          a(e),
          (e.headers = e.headers || {}),
          (e.data = s(e.data, e.headers, e.transformRequest)),
          (e.headers = n.merge(
            e.headers.common || {},
            e.headers[e.method] || {},
            e.headers
          )),
          n.forEach(
            ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
            function (t) {
              delete e.headers[t]
            }
          ),
          (e.adapter || i.adapter)(e).then(
            function (t) {
              return (
                a(e), (t.data = s(t.data, t.headers, e.transformResponse)), t
              )
            },
            function (t) {
              return (
                o(t) ||
                  (a(e),
                  t &&
                    t.response &&
                    (t.response.data = s(
                      t.response.data,
                      t.response.headers,
                      e.transformResponse
                    ))),
                Promise.reject(t)
              )
            }
          )
        )
      }
    },
    function (e, t, r) {
      'use strict'
      var n = r(0)
      e.exports = function (e, t, r) {
        return (
          n.forEach(r, function (r) {
            e = r(e, t)
          }),
          e
        )
      }
    },
    function (e, t, r) {
      'use strict'
      var n = r(0)
      e.exports = function (e, t) {
        n.forEach(e, function (r, n) {
          n !== t &&
            n.toUpperCase() === t.toUpperCase() &&
            ((e[t] = r), delete e[n])
        })
      }
    },
    function (e, t, r) {
      'use strict'
      var n = r(0),
        s = r(14),
        o = r(4),
        i = r(16),
        a = r(45),
        c = r(46),
        u = r(5)
      e.exports = function (e) {
        return new Promise(function (t, l) {
          var f = e.data,
            h = e.headers
          n.isFormData(f) && delete h['Content-Type']
          var p = new XMLHttpRequest()
          if (e.auth) {
            var d = e.auth.username || '',
              g = e.auth.password || ''
            h.Authorization = 'Basic ' + btoa(d + ':' + g)
          }
          var m = i(e.baseURL, e.url)
          if (
            (p.open(
              e.method.toUpperCase(),
              o(m, e.params, e.paramsSerializer),
              !0
            ),
            (p.timeout = e.timeout),
            (p.onreadystatechange = function () {
              if (
                p &&
                4 === p.readyState &&
                (0 !== p.status ||
                  (p.responseURL && 0 === p.responseURL.indexOf('file:')))
              ) {
                var r =
                    'getAllResponseHeaders' in p
                      ? a(p.getAllResponseHeaders())
                      : null,
                  n = {
                    data:
                      e.responseType && 'text' !== e.responseType
                        ? p.response
                        : p.responseText,
                    status: p.status,
                    statusText: p.statusText,
                    headers: r,
                    config: e,
                    request: p
                  }
                s(t, l, n), (p = null)
              }
            }),
            (p.onabort = function () {
              p && (l(u('Request aborted', e, 'ECONNABORTED', p)), (p = null))
            }),
            (p.onerror = function () {
              l(u('Network Error', e, null, p)), (p = null)
            }),
            (p.ontimeout = function () {
              var t = 'timeout of ' + e.timeout + 'ms exceeded'
              e.timeoutErrorMessage && (t = e.timeoutErrorMessage),
                l(u(t, e, 'ECONNABORTED', p)),
                (p = null)
            }),
            n.isStandardBrowserEnv())
          ) {
            var y = r(47),
              b =
                (e.withCredentials || c(m)) && e.xsrfCookieName
                  ? y.read(e.xsrfCookieName)
                  : void 0
            b && (h[e.xsrfHeaderName] = b)
          }
          if (
            ('setRequestHeader' in p &&
              n.forEach(h, function (e, t) {
                void 0 === f && 'content-type' === t.toLowerCase()
                  ? delete h[t]
                  : p.setRequestHeader(t, e)
              }),
            n.isUndefined(e.withCredentials) ||
              (p.withCredentials = !!e.withCredentials),
            e.responseType)
          )
            try {
              p.responseType = e.responseType
            } catch (t) {
              if ('json' !== e.responseType) throw t
            }
          'function' == typeof e.onDownloadProgress &&
            p.addEventListener('progress', e.onDownloadProgress),
            'function' == typeof e.onUploadProgress &&
              p.upload &&
              p.upload.addEventListener('progress', e.onUploadProgress),
            e.cancelToken &&
              e.cancelToken.promise.then(function (e) {
                p && (p.abort(), l(e), (p = null))
              }),
            void 0 === f && (f = null),
            p.send(f)
        })
      }
    },
    function (e, t, r) {
      'use strict'
      e.exports = function (e) {
        return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)
      }
    },
    function (e, t, r) {
      'use strict'
      e.exports = function (e, t) {
        return t ? e.replace(/\/+$/, '') + '/' + t.replace(/^\/+/, '') : e
      }
    },
    function (e, t, r) {
      'use strict'
      var n = r(0),
        s = [
          'age',
          'authorization',
          'content-length',
          'content-type',
          'etag',
          'expires',
          'from',
          'host',
          'if-modified-since',
          'if-unmodified-since',
          'last-modified',
          'location',
          'max-forwards',
          'proxy-authorization',
          'referer',
          'retry-after',
          'user-agent'
        ]
      e.exports = function (e) {
        var t,
          r,
          o,
          i = {}
        return e
          ? (n.forEach(e.split('\n'), function (e) {
              if (
                ((o = e.indexOf(':')),
                (t = n.trim(e.substr(0, o)).toLowerCase()),
                (r = n.trim(e.substr(o + 1))),
                t)
              ) {
                if (i[t] && s.indexOf(t) >= 0) return
                i[t] =
                  'set-cookie' === t
                    ? (i[t] ? i[t] : []).concat([r])
                    : i[t]
                    ? i[t] + ', ' + r
                    : r
              }
            }),
            i)
          : i
      }
    },
    function (e, t, r) {
      'use strict'
      var n = r(0)
      e.exports = n.isStandardBrowserEnv()
        ? (function () {
            var e,
              t = /(msie|trident)/i.test(navigator.userAgent),
              r = document.createElement('a')
            function s(e) {
              var n = e
              return (
                t && (r.setAttribute('href', n), (n = r.href)),
                r.setAttribute('href', n),
                {
                  href: r.href,
                  protocol: r.protocol ? r.protocol.replace(/:$/, '') : '',
                  host: r.host,
                  search: r.search ? r.search.replace(/^\?/, '') : '',
                  hash: r.hash ? r.hash.replace(/^#/, '') : '',
                  hostname: r.hostname,
                  port: r.port,
                  pathname:
                    '/' === r.pathname.charAt(0) ? r.pathname : '/' + r.pathname
                }
              )
            }
            return (
              (e = s(window.location.href)),
              function (t) {
                var r = n.isString(t) ? s(t) : t
                return r.protocol === e.protocol && r.host === e.host
              }
            )
          })()
        : function () {
            return !0
          }
    },
    function (e, t, r) {
      'use strict'
      var n = r(0)
      e.exports = n.isStandardBrowserEnv()
        ? {
            write: function (e, t, r, s, o, i) {
              var a = []
              a.push(e + '=' + encodeURIComponent(t)),
                n.isNumber(r) && a.push('expires=' + new Date(r).toGMTString()),
                n.isString(s) && a.push('path=' + s),
                n.isString(o) && a.push('domain=' + o),
                !0 === i && a.push('secure'),
                (document.cookie = a.join('; '))
            },
            read: function (e) {
              var t = document.cookie.match(
                new RegExp('(^|;\\s*)(' + e + ')=([^;]*)')
              )
              return t ? decodeURIComponent(t[3]) : null
            },
            remove: function (e) {
              this.write(e, '', Date.now() - 864e5)
            }
          }
        : {
            write: function () {},
            read: function () {
              return null
            },
            remove: function () {}
          }
    },
    function (e, t, r) {
      'use strict'
      var n = r(0),
        s = r(14),
        o = r(16),
        i = r(4),
        a = r(17),
        c = r(18),
        u = r(19).http,
        l = r(19).https,
        f = r(20),
        h = r(58),
        p = r(59),
        d = r(5),
        g = r(15),
        m = /https:?/
      e.exports = function (e) {
        return new Promise(function (t, r) {
          var y = function (e) {
              t(e)
            },
            b = function (e) {
              r(e)
            },
            v = e.data,
            w = e.headers
          if (
            (w['User-Agent'] ||
              w['user-agent'] ||
              (w['User-Agent'] = 'axios/' + p.version),
            v && !n.isStream(v))
          ) {
            if (Buffer.isBuffer(v));
            else if (n.isArrayBuffer(v)) v = Buffer.from(new Uint8Array(v))
            else {
              if (!n.isString(v))
                return b(
                  d(
                    'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
                    e
                  )
                )
              v = Buffer.from(v, 'utf-8')
            }
            w['Content-Length'] = v.length
          }
          var x = void 0
          e.auth &&
            (x = (e.auth.username || '') + ':' + (e.auth.password || ''))
          var C = o(e.baseURL, e.url),
            E = f.parse(C),
            O = E.protocol || 'http:'
          if (!x && E.auth) {
            var A = E.auth.split(':')
            x = (A[0] || '') + ':' + (A[1] || '')
          }
          x && delete w.Authorization
          var S = m.test(O),
            j = S ? e.httpsAgent : e.httpAgent,
            R = {
              path: i(E.path, e.params, e.paramsSerializer).replace(/^\?/, ''),
              method: e.method.toUpperCase(),
              headers: w,
              agent: j,
              agents: { http: e.httpAgent, https: e.httpsAgent },
              auth: x
            }
          e.socketPath
            ? (R.socketPath = e.socketPath)
            : ((R.hostname = E.hostname), (R.port = E.port))
          var k,
            M = e.proxy
          if (!M && !1 !== M) {
            var T = O.slice(0, -1) + '_proxy',
              D = process.env[T] || process.env[T.toUpperCase()]
            if (D) {
              var _ = f.parse(D),
                B = process.env.no_proxy || process.env.NO_PROXY,
                N = !0
              if (B)
                N = !B.split(',')
                  .map(function (e) {
                    return e.trim()
                  })
                  .some(function (e) {
                    return (
                      !!e &&
                      ('*' === e ||
                        ('.' === e[0] &&
                          E.hostname.substr(E.hostname.length - e.length) ===
                            e) ||
                        E.hostname === e)
                    )
                  })
              if (N && ((M = { host: _.hostname, port: _.port }), _.auth)) {
                var P = _.auth.split(':')
                M.auth = { username: P[0], password: P[1] }
              }
            }
          }
          if (
            M &&
            ((R.hostname = M.host),
            (R.host = M.host),
            (R.headers.host = E.hostname + (E.port ? ':' + E.port : '')),
            (R.port = M.port),
            (R.path =
              O + '//' + E.hostname + (E.port ? ':' + E.port : '') + R.path),
            M.auth)
          ) {
            var F = Buffer.from(
              M.auth.username + ':' + M.auth.password,
              'utf8'
            ).toString('base64')
            R.headers['Proxy-Authorization'] = 'Basic ' + F
          }
          var I = S && (!M || m.test(M.protocol))
          e.transport
            ? (k = e.transport)
            : 0 === e.maxRedirects
            ? (k = I ? c : a)
            : (e.maxRedirects && (R.maxRedirects = e.maxRedirects),
              (k = I ? l : u)),
            e.maxContentLength &&
              e.maxContentLength > -1 &&
              (R.maxBodyLength = e.maxContentLength)
          var q = k.request(R, function (t) {
            if (!q.aborted) {
              var r = t
              switch (t.headers['content-encoding']) {
                case 'gzip':
                case 'compress':
                case 'deflate':
                  ;(r = 204 === t.statusCode ? r : r.pipe(h.createUnzip())),
                    delete t.headers['content-encoding']
              }
              var n = t.req || q,
                o = {
                  status: t.statusCode,
                  statusText: t.statusMessage,
                  headers: t.headers,
                  config: e,
                  request: n
                }
              if ('stream' === e.responseType) (o.data = r), s(y, b, o)
              else {
                var i = []
                r.on('data', function (t) {
                  i.push(t),
                    e.maxContentLength > -1 &&
                      Buffer.concat(i).length > e.maxContentLength &&
                      (r.destroy(),
                      b(
                        d(
                          'maxContentLength size of ' +
                            e.maxContentLength +
                            ' exceeded',
                          e,
                          null,
                          n
                        )
                      ))
                }),
                  r.on('error', function (t) {
                    q.aborted || b(g(t, e, null, n))
                  }),
                  r.on('end', function () {
                    var t = Buffer.concat(i)
                    'arraybuffer' !== e.responseType &&
                      (t = t.toString(e.responseEncoding)),
                      (o.data = t),
                      s(y, b, o)
                  })
              }
            }
          })
          q.on('error', function (t) {
            q.aborted || b(g(t, e, null, q))
          }),
            e.timeout &&
              q.setTimeout(e.timeout, function () {
                q.abort(),
                  b(
                    d(
                      'timeout of ' + e.timeout + 'ms exceeded',
                      e,
                      'ECONNABORTED',
                      q
                    )
                  )
              }),
            e.cancelToken &&
              e.cancelToken.promise.then(function (e) {
                q.aborted || (q.abort(), b(e))
              }),
            n.isStream(v)
              ? v
                  .on('error', function (t) {
                    b(g(t, e, null, q))
                  })
                  .pipe(q)
              : q.end(v)
        })
      }
    },
    function (e, t) {
      e.exports = require('assert')
    },
    function (e, t) {
      e.exports = require('stream')
    },
    function (e, t, r) {
      'undefined' == typeof process || 'renderer' === process.type
        ? (e.exports = r(52))
        : (e.exports = r(54))
    },
    function (e, t, r) {
      function n() {
        var e
        try {
          e = t.storage.debug
        } catch (e) {}
        return (
          !e &&
            'undefined' != typeof process &&
            'env' in process &&
            (e = process.env.DEBUG),
          e
        )
      }
      ;((t = e.exports = r(21)).log = function () {
        return (
          'object' == typeof console &&
          console.log &&
          Function.prototype.apply.call(console.log, console, arguments)
        )
      }),
        (t.formatArgs = function (e) {
          var r = this.useColors
          if (
            ((e[0] =
              (r ? '%c' : '') +
              this.namespace +
              (r ? ' %c' : ' ') +
              e[0] +
              (r ? '%c ' : ' ') +
              '+' +
              t.humanize(this.diff)),
            !r)
          )
            return
          var n = 'color: ' + this.color
          e.splice(1, 0, n, 'color: inherit')
          var s = 0,
            o = 0
          e[0].replace(/%[a-zA-Z%]/g, function (e) {
            '%%' !== e && (s++, '%c' === e && (o = s))
          }),
            e.splice(o, 0, n)
        }),
        (t.save = function (e) {
          try {
            null == e ? t.storage.removeItem('debug') : (t.storage.debug = e)
          } catch (e) {}
        }),
        (t.load = n),
        (t.useColors = function () {
          if (
            'undefined' != typeof window &&
            window.process &&
            'renderer' === window.process.type
          )
            return !0
          if (
            'undefined' != typeof navigator &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
          )
            return !1
          return (
            ('undefined' != typeof document &&
              document.documentElement &&
              document.documentElement.style &&
              document.documentElement.style.WebkitAppearance) ||
            ('undefined' != typeof window &&
              window.console &&
              (window.console.firebug ||
                (window.console.exception && window.console.table))) ||
            ('undefined' != typeof navigator &&
              navigator.userAgent &&
              navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
              parseInt(RegExp.$1, 10) >= 31) ||
            ('undefined' != typeof navigator &&
              navigator.userAgent &&
              navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
          )
        }),
        (t.storage =
          'undefined' != typeof chrome && void 0 !== chrome.storage
            ? chrome.storage.local
            : (function () {
                try {
                  return window.localStorage
                } catch (e) {}
              })()),
        (t.colors = [
          '#0000CC',
          '#0000FF',
          '#0033CC',
          '#0033FF',
          '#0066CC',
          '#0066FF',
          '#0099CC',
          '#0099FF',
          '#00CC00',
          '#00CC33',
          '#00CC66',
          '#00CC99',
          '#00CCCC',
          '#00CCFF',
          '#3300CC',
          '#3300FF',
          '#3333CC',
          '#3333FF',
          '#3366CC',
          '#3366FF',
          '#3399CC',
          '#3399FF',
          '#33CC00',
          '#33CC33',
          '#33CC66',
          '#33CC99',
          '#33CCCC',
          '#33CCFF',
          '#6600CC',
          '#6600FF',
          '#6633CC',
          '#6633FF',
          '#66CC00',
          '#66CC33',
          '#9900CC',
          '#9900FF',
          '#9933CC',
          '#9933FF',
          '#99CC00',
          '#99CC33',
          '#CC0000',
          '#CC0033',
          '#CC0066',
          '#CC0099',
          '#CC00CC',
          '#CC00FF',
          '#CC3300',
          '#CC3333',
          '#CC3366',
          '#CC3399',
          '#CC33CC',
          '#CC33FF',
          '#CC6600',
          '#CC6633',
          '#CC9900',
          '#CC9933',
          '#CCCC00',
          '#CCCC33',
          '#FF0000',
          '#FF0033',
          '#FF0066',
          '#FF0099',
          '#FF00CC',
          '#FF00FF',
          '#FF3300',
          '#FF3333',
          '#FF3366',
          '#FF3399',
          '#FF33CC',
          '#FF33FF',
          '#FF6600',
          '#FF6633',
          '#FF9900',
          '#FF9933',
          '#FFCC00',
          '#FFCC33'
        ]),
        (t.formatters.j = function (e) {
          try {
            return JSON.stringify(e)
          } catch (e) {
            return '[UnexpectedJSONParseError]: ' + e.message
          }
        }),
        t.enable(n())
    },
    function (e, t) {
      var r = 1e3,
        n = 6e4,
        s = 60 * n,
        o = 24 * s
      function i(e, t, r) {
        if (!(e < t))
          return e < 1.5 * t
            ? Math.floor(e / t) + ' ' + r
            : Math.ceil(e / t) + ' ' + r + 's'
      }
      e.exports = function (e, t) {
        t = t || {}
        var a,
          c = typeof e
        if ('string' === c && e.length > 0)
          return (function (e) {
            if ((e = String(e)).length > 100) return
            var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
              e
            )
            if (!t) return
            var i = parseFloat(t[1])
            switch ((t[2] || 'ms').toLowerCase()) {
              case 'years':
              case 'year':
              case 'yrs':
              case 'yr':
              case 'y':
                return 315576e5 * i
              case 'days':
              case 'day':
              case 'd':
                return i * o
              case 'hours':
              case 'hour':
              case 'hrs':
              case 'hr':
              case 'h':
                return i * s
              case 'minutes':
              case 'minute':
              case 'mins':
              case 'min':
              case 'm':
                return i * n
              case 'seconds':
              case 'second':
              case 'secs':
              case 'sec':
              case 's':
                return i * r
              case 'milliseconds':
              case 'millisecond':
              case 'msecs':
              case 'msec':
              case 'ms':
                return i
              default:
                return
            }
          })(e)
        if ('number' === c && !1 === isNaN(e))
          return t.long
            ? i((a = e), o, 'day') ||
                i(a, s, 'hour') ||
                i(a, n, 'minute') ||
                i(a, r, 'second') ||
                a + ' ms'
            : (function (e) {
                if (e >= o) return Math.round(e / o) + 'd'
                if (e >= s) return Math.round(e / s) + 'h'
                if (e >= n) return Math.round(e / n) + 'm'
                if (e >= r) return Math.round(e / r) + 's'
                return e + 'ms'
              })(e)
        throw new Error(
          'val is not a non-empty string or a valid number. val=' +
            JSON.stringify(e)
        )
      }
    },
    function (e, t, r) {
      var n = r(22),
        s = r(55)
      ;((t = e.exports = r(21)).init = function (e) {
        e.inspectOpts = {}
        for (var r = Object.keys(t.inspectOpts), n = 0; n < r.length; n++)
          e.inspectOpts[r[n]] = t.inspectOpts[r[n]]
      }),
        (t.log = function () {
          return process.stderr.write(s.format.apply(s, arguments) + '\n')
        }),
        (t.formatArgs = function (e) {
          var r = this.namespace
          if (this.useColors) {
            var n = this.color,
              s = '[3' + (n < 8 ? n : '8;5;' + n),
              o = '  ' + s + ';1m' + r + ' [0m'
            ;(e[0] = o + e[0].split('\n').join('\n' + o)),
              e.push(s + 'm+' + t.humanize(this.diff) + '[0m')
          } else
            e[0] =
              (t.inspectOpts.hideDate ? '' : new Date().toISOString() + ' ') +
              r +
              ' ' +
              e[0]
        }),
        (t.save = function (e) {
          null == e ? delete process.env.DEBUG : (process.env.DEBUG = e)
        }),
        (t.load = i),
        (t.useColors = function () {
          return 'colors' in t.inspectOpts
            ? Boolean(t.inspectOpts.colors)
            : n.isatty(process.stderr.fd)
        }),
        (t.colors = [6, 2, 3, 4, 5, 1])
      try {
        var o = r(56)
        o &&
          o.level >= 2 &&
          (t.colors = [
            20,
            21,
            26,
            27,
            32,
            33,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            56,
            57,
            62,
            63,
            68,
            69,
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            81,
            92,
            93,
            98,
            99,
            112,
            113,
            128,
            129,
            134,
            135,
            148,
            149,
            160,
            161,
            162,
            163,
            164,
            165,
            166,
            167,
            168,
            169,
            170,
            171,
            172,
            173,
            178,
            179,
            184,
            185,
            196,
            197,
            198,
            199,
            200,
            201,
            202,
            203,
            204,
            205,
            206,
            207,
            208,
            209,
            214,
            215,
            220,
            221
          ])
      } catch (e) {}
      function i() {
        return process.env.DEBUG
      }
      ;(t.inspectOpts = Object.keys(process.env)
        .filter(function (e) {
          return /^debug_/i.test(e)
        })
        .reduce(function (e, t) {
          var r = t
              .substring(6)
              .toLowerCase()
              .replace(/_([a-z])/g, function (e, t) {
                return t.toUpperCase()
              }),
            n = process.env[t]
          return (
            (n =
              !!/^(yes|on|true|enabled)$/i.test(n) ||
              (!/^(no|off|false|disabled)$/i.test(n) &&
                ('null' === n ? null : Number(n)))),
            (e[r] = n),
            e
          )
        }, {})),
        (t.formatters.o = function (e) {
          return (
            (this.inspectOpts.colors = this.useColors),
            s
              .inspect(e, this.inspectOpts)
              .split('\n')
              .map(function (e) {
                return e.trim()
              })
              .join(' ')
          )
        }),
        (t.formatters.O = function (e) {
          return (
            (this.inspectOpts.colors = this.useColors),
            s.inspect(e, this.inspectOpts)
          )
        }),
        t.enable(i())
    },
    function (e, t) {
      e.exports = require('util')
    },
    function (e, t, r) {
      'use strict'
      const n = r(23),
        s = r(22),
        o = r(57),
        { env: i } = process
      let a
      function c(e) {
        return (
          0 !== e && { level: e, hasBasic: !0, has256: e >= 2, has16m: e >= 3 }
        )
      }
      function u(e, t) {
        if (0 === a) return 0
        if (o('color=16m') || o('color=full') || o('color=truecolor')) return 3
        if (o('color=256')) return 2
        if (e && !t && void 0 === a) return 0
        const r = a || 0
        if ('dumb' === i.TERM) return r
        if ('win32' === process.platform) {
          const e = n.release().split('.')
          return Number(e[0]) >= 10 && Number(e[2]) >= 10586
            ? Number(e[2]) >= 14931
              ? 3
              : 2
            : 1
        }
        if ('CI' in i)
          return ['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(
            e => e in i
          ) || 'codeship' === i.CI_NAME
            ? 1
            : r
        if ('TEAMCITY_VERSION' in i)
          return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(i.TEAMCITY_VERSION)
            ? 1
            : 0
        if ('GITHUB_ACTIONS' in i) return 1
        if ('truecolor' === i.COLORTERM) return 3
        if ('TERM_PROGRAM' in i) {
          const e = parseInt((i.TERM_PROGRAM_VERSION || '').split('.')[0], 10)
          switch (i.TERM_PROGRAM) {
            case 'iTerm.app':
              return e >= 3 ? 3 : 2
            case 'Apple_Terminal':
              return 2
          }
        }
        return /-256(color)?$/i.test(i.TERM)
          ? 2
          : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
              i.TERM
            ) || 'COLORTERM' in i
          ? 1
          : r
      }
      o('no-color') || o('no-colors') || o('color=false') || o('color=never')
        ? (a = 0)
        : (o('color') || o('colors') || o('color=true') || o('color=always')) &&
          (a = 1),
        'FORCE_COLOR' in i &&
          (a =
            'true' === i.FORCE_COLOR
              ? 1
              : 'false' === i.FORCE_COLOR
              ? 0
              : 0 === i.FORCE_COLOR.length
              ? 1
              : Math.min(parseInt(i.FORCE_COLOR, 10), 3)),
        (e.exports = {
          supportsColor: function (e) {
            return c(u(e, e && e.isTTY))
          },
          stdout: c(u(!0, s.isatty(1))),
          stderr: c(u(!0, s.isatty(2)))
        })
    },
    function (e, t, r) {
      'use strict'
      e.exports = (e, t = process.argv) => {
        const r = e.startsWith('-') ? '' : 1 === e.length ? '-' : '--',
          n = t.indexOf(r + e),
          s = t.indexOf('--')
        return -1 !== n && (-1 === s || n < s)
      }
    },
    function (e, t) {
      e.exports = require('zlib')
    },
    function (e) {
      e.exports = JSON.parse(
        '{"name":"axios","version":"0.19.2","description":"Promise based HTTP client for the browser and node.js","main":"index.js","scripts":{"test":"grunt test && bundlesize","start":"node ./sandbox/server.js","build":"NODE_ENV=production grunt build","preversion":"npm test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json","postversion":"git push && git push --tags","examples":"node ./examples/server.js","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","fix":"eslint --fix lib/**/*.js"},"repository":{"type":"git","url":"https://github.com/axios/axios.git"},"keywords":["xhr","http","ajax","promise","node"],"author":"Matt Zabriskie","license":"MIT","bugs":{"url":"https://github.com/axios/axios/issues"},"homepage":"https://github.com/axios/axios","devDependencies":{"bundlesize":"^0.17.0","coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.0.2","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^20.1.0","grunt-karma":"^2.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^1.0.18","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^1.3.0","karma-chrome-launcher":"^2.2.0","karma-coverage":"^1.1.1","karma-firefox-launcher":"^1.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-opera-launcher":"^1.0.0","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^1.2.0","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.7","karma-webpack":"^1.7.0","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^5.2.0","sinon":"^4.5.0","typescript":"^2.8.1","url-search-params":"^0.10.0","webpack":"^1.13.1","webpack-dev-server":"^1.14.1"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"typings":"./index.d.ts","dependencies":{"follow-redirects":"1.5.10"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}],"_resolved":"https://registry.npmjs.org/axios/-/axios-0.19.2.tgz","_integrity":"sha512-fjgm5MvRHLhx+osE2xoekY70AhARk3a6hkN+3Io1jc00jtquGvxYlKlsFUhmUET0V5te6CcZI7lcv2Ym61mjHA==","_from":"axios@0.19.2"}'
      )
    },
    function (e, t, r) {
      'use strict'
      var n = r(25)
      function s(e) {
        if ('function' != typeof e)
          throw new TypeError('executor must be a function.')
        var t
        this.promise = new Promise(function (e) {
          t = e
        })
        var r = this
        e(function (e) {
          r.reason || ((r.reason = new n(e)), t(r.reason))
        })
      }
      ;(s.prototype.throwIfRequested = function () {
        if (this.reason) throw this.reason
      }),
        (s.source = function () {
          var e
          return {
            token: new s(function (t) {
              e = t
            }),
            cancel: e
          }
        }),
        (e.exports = s)
    },
    function (e, t, r) {
      'use strict'
      e.exports = function (e) {
        return function (t) {
          return e.apply(null, t)
        }
      }
    },
    function (e) {
      e.exports = JSON.parse(
        '{"name":"@sendgrid/client","description":"Twilio SendGrid NodeJS API client","version":"7.1.1","author":"Twilio SendGrid <help@twilio.com> (sendgrid.com)","contributors":["Kyle Partridge <kyle.partridge@sendgrid.com>","David Tomberlin <david.tomberlin@sendgrid.com>","Swift <swift@sendgrid.com>","Brandon West <brandon.west@sendgrid.com>","Scott Motte <scott.motte@sendgrid.com>","Robert Acosta <robert.acosta@sendgrid.com>","Elmer Thomas <ethomas@twilio.com>","Adam Reis <adam@reis.nz>"],"license":"MIT","homepage":"https://sendgrid.com","repository":{"type":"git","url":"git://github.com/sendgrid/sendgrid-nodejs.git"},"publishConfig":{"access":"public"},"main":"index.js","engines":{"node":">=6.0.0"},"dependencies":{"@sendgrid/helpers":"^7.0.1","axios":"^0.19.2"},"devDependencies":{"nock":"^10.0.6"},"tags":["http","rest","api","mail","sendgrid"],"_resolved":"https://registry.npmjs.org/@sendgrid/client/-/client-7.1.1.tgz","_integrity":"sha512-V2BmOO81wHNmbTDwTJ07Olb9dWrj1G19xK4crwds68b9R0w05aOWDddZTvpn9mZnHwIJYqcZcBJuhdHDejuSHg==","_from":"@sendgrid/client@7.1.1"}'
      )
    },
    function (e, t, r) {
      'use strict'
      const n = r(64),
        s = r(7),
        o = r(69),
        i = r(28),
        a = r(72),
        c = r(73),
        u = r(84)
      e.exports = {
        Attachment: n,
        EmailAddress: s,
        Mail: o,
        Personalization: i,
        Response: a,
        ResponseError: c,
        Statistics: u
      }
    },
    function (e, t, r) {
      'use strict'
      const n = r(1),
        s = r(3),
        o = r(2),
        i = r(67),
        a = r(68)
      e.exports = class {
        constructor(e) {
          e && this.fromData(e)
        }
        fromData(e) {
          if ('object' != typeof e)
            throw new Error('Expecting object for Mail data')
          ;(e = o(e)), (e = n(e))
          const {
            content: t,
            filename: r,
            type: s,
            disposition: i,
            contentId: a,
            filePath: c
          } = e
          if (void 0 !== t && void 0 !== c)
            throw new Error(
              "The props 'content' and 'filePath' cannot be used together."
            )
          this.setFilename(r),
            this.setType(s),
            this.setDisposition(i),
            this.setContentId(a),
            this.setContent(c ? this.readFile(c) : t)
        }
        readFile(e) {
          return i.readFileSync(a.resolve(e))
        }
        setContent(e) {
          if ('string' != typeof e) {
            if (e instanceof Buffer && void 0 !== e.toString)
              return (
                (this.content = e.toString()),
                void (
                  'attachment' === this.disposition &&
                  (this.content = e.toString('base64'))
                )
              )
            throw new Error('`content` expected to be either Buffer or string')
          }
          this.content = e
        }
        setFileContent(e) {
          if (!(e instanceof Buffer && void 0 !== e.toString))
            throw new Error('`content` expected to be Buffer')
          this.content = e.toString('base64')
        }
        setFilename(e) {
          if (void 0 !== e) {
            if (e && 'string' != typeof e)
              throw new Error('String expected for `filename`')
            this.filename = e
          }
        }
        setType(e) {
          if (void 0 !== e) {
            if ('string' != typeof e)
              throw new Error('String expected for `type`')
            this.type = e
          }
        }
        setDisposition(e) {
          if (void 0 !== e) {
            if ('string' != typeof e)
              throw new Error('String expected for `disposition`')
            this.disposition = e
          }
        }
        setContentId(e) {
          if (void 0 !== e) {
            if ('string' != typeof e)
              throw new Error('String expected for `contentId`')
            this.contentId = e
          }
        }
        toJSON() {
          const {
              content: e,
              filename: t,
              type: r,
              disposition: n,
              contentId: o
            } = this,
            i = { content: e, filename: t }
          return (
            void 0 !== r && (i.type = r),
            void 0 !== n && (i.disposition = n),
            void 0 !== o && (i.contentId = o),
            s(i)
          )
        }
      }
    },
    function (e, t, r) {
      'use strict'
      e.exports = function (e) {
        if ('string' != typeof e)
          throw new Error('String expected for conversion to snake case')
        return e
          .trim()
          .replace(/_+|\-+/g, ' ')
          .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (e, t) {
            return 0 === Number(e)
              ? ''
              : 0 === t
              ? e.toLowerCase()
              : e.toUpperCase()
          })
      }
    },
    function (e, t, r) {
      'use strict'
      e.exports = function (e) {
        if ('string' != typeof e)
          throw new Error('String expected for conversion to snake case')
        return e
          .trim()
          .replace(/(\s*\-*\b\w|[A-Z])/g, function (e) {
            return (
              ('_' === (e = e.trim().toLowerCase().replace('-', ''))[0]
                ? ''
                : '_') + e
            )
          })
          .slice(1)
      }
    },
    function (e, t) {
      e.exports = require('fs')
    },
    function (e, t) {
      e.exports = require('path')
    },
    function (e, t, r) {
      'use strict'
      const n = r(7),
        s = r(28),
        o = r(1),
        i = r(3),
        a = r(2),
        c = r(30),
        { DYNAMIC_TEMPLATE_CHAR_WARNING: u } = r(71)
      class l {
        constructor(e) {
          ;(this.isDynamic = !1),
            (this.hideWarnings = !1),
            (this.personalizations = []),
            (this.attachments = []),
            (this.content = []),
            (this.categories = []),
            (this.headers = {}),
            (this.sections = {}),
            (this.customArgs = {}),
            (this.trackingSettings = {}),
            (this.mailSettings = {}),
            (this.asm = {}),
            (this.substitutions = null),
            (this.substitutionWrappers = null),
            (this.dynamicTemplateData = null),
            e && this.fromData(e)
        }
        fromData(e) {
          if ('object' != typeof e)
            throw new Error('Expecting object for Mail data')
          ;(e = a(e)),
            (e = o(e, [
              'substitutions',
              'dynamicTemplateData',
              'customArgs',
              'headers',
              'sections'
            ]))
          const {
            to: t,
            from: r,
            replyTo: n,
            cc: s,
            bcc: i,
            sendAt: c,
            subject: u,
            text: l,
            html: f,
            content: h,
            templateId: p,
            personalizations: d,
            attachments: g,
            ipPoolName: m,
            batchId: y,
            sections: b,
            headers: v,
            categories: w,
            category: x,
            customArgs: C,
            asm: E,
            mailSettings: O,
            trackingSettings: A,
            substitutions: S,
            substitutionWrappers: j,
            dynamicTemplateData: R,
            isMultiple: k,
            hideWarnings: M
          } = e
          this.setFrom(r),
            this.setReplyTo(n),
            this.setSubject(u),
            this.setSendAt(c),
            this.setTemplateId(p),
            this.setBatchId(y),
            this.setIpPoolName(m),
            this.setAttachments(g),
            this.setContent(h),
            this.setSections(b),
            this.setHeaders(v),
            this.setCategories(x),
            this.setCategories(w),
            this.setCustomArgs(C),
            this.setAsm(E),
            this.setMailSettings(O),
            this.setTrackingSettings(A),
            this.setHideWarnings(M),
            this.isDynamic
              ? this.setDynamicTemplateData(R)
              : (this.setSubstitutions(S), this.setSubstitutionWrappers(j)),
            this.addTextContent(l),
            this.addHtmlContent(f),
            d
              ? this.setPersonalizations(d)
              : k && Array.isArray(t)
              ? t.forEach(e => this.addTo(e, s, i))
              : this.addTo(t, s, i)
        }
        setFrom(e) {
          void 0 !== e && (this.from = n.create(e))
        }
        setReplyTo(e) {
          void 0 !== e && (this.replyTo = n.create(e))
        }
        setSubject(e) {
          if (void 0 !== e) {
            if ('string' != typeof e)
              throw new Error('String expected for `subject`')
            this.subject = e
          }
        }
        setSendAt(e) {
          if (void 0 !== e) {
            if (!Number.isInteger(e))
              throw new Error('Integer expected for `sendAt`')
            this.sendAt = e
          }
        }
        setTemplateId(e) {
          if (void 0 !== e) {
            if ('string' != typeof e)
              throw new Error('String expected for `templateId`')
            0 === e.indexOf('d-') && (this.isDynamic = !0),
              (this.templateId = e)
          }
        }
        setBatchId(e) {
          if (void 0 !== e) {
            if ('string' != typeof e)
              throw new Error('String expected for `batchId`')
            this.batchId = e
          }
        }
        setIpPoolName(e) {
          if (void 0 !== e) {
            if ('string' != typeof e)
              throw new Error('String expected for `ipPoolName`')
            this.ipPoolName = e
          }
        }
        setAsm(e) {
          if (void 0 !== e) {
            if ('object' != typeof e)
              throw new Error('Object expected for `asm`')
            this.asm = e
          }
        }
        setPersonalizations(e) {
          if (void 0 !== e) {
            if (!Array.isArray(e))
              throw new Error('Array expected for `personalizations`')
            ;(this.personalizations = []),
              e.forEach(e => this.addPersonalization(e))
          }
        }
        addPersonalization(e) {
          this.isDynamic && e.substitutions
            ? delete e.substitutions
            : !this.isDynamic &&
              e.dynamicTemplateData &&
              delete e.dynamicTemplateData,
            e instanceof s || (e = new s(e)),
            this.isDynamic
              ? this.applyDynamicTemplateData(e)
              : this.applySubstitutions(e),
            this.personalizations.push(e)
        }
        addTo(e, t, r) {
          if (void 0 === e && void 0 === t && void 0 === r)
            throw new Error('Provide at least one of to, cc or bcc')
          this.addPersonalization(new s({ to: e, cc: t, bcc: r }))
        }
        setSubstitutions(e) {
          if (void 0 !== e) {
            if ('object' != typeof e)
              throw new Error('Object expected for `substitutions`')
            this.substitutions = e
          }
        }
        setSubstitutionWrappers(e) {
          if (void 0 !== e) {
            if (!Array.isArray(e) || 2 !== e.length)
              throw new Error(
                'Array expected with two elements for `substitutionWrappers`'
              )
            this.substitutionWrappers = e
          }
        }
        applySubstitutions(e) {
          e instanceof s &&
            (e.reverseMergeSubstitutions(this.substitutions),
            e.setSubstitutionWrappers(this.substitutionWrappers))
        }
        applyDynamicTemplateData(e) {
          e instanceof s &&
            e.deepMergeDynamicTemplateData(this.dynamicTemplateData)
        }
        setDynamicTemplateData(e) {
          if (void 0 !== e) {
            if ('object' != typeof e)
              throw new Error('Object expected for `dynamicTemplateData`')
            this.hideWarnings ||
              Object.values(e).forEach(e => {
                ;/['"&]/.test(e) && console.warn(u)
              }),
              (this.dynamicTemplateData = e)
          }
        }
        setContent(e) {
          if (void 0 !== e) {
            if (!Array.isArray(e))
              throw new Error('Array expected for `content`')
            this.content = e
          }
        }
        addContent(e) {
          if ('object' != typeof e)
            throw new Error('Object expected for `content`')
          this.content.push(e)
        }
        addTextContent(e) {
          if (void 0 !== e) {
            if ('string' != typeof e)
              throw new Error('String expected for `text`')
            this.addContent({ value: e, type: 'text/plain' })
          }
        }
        addHtmlContent(e) {
          if (void 0 !== e) {
            if ('string' != typeof e)
              throw new Error('String expected for `html`')
            this.addContent({ value: e, type: 'text/html' })
          }
        }
        setAttachments(e) {
          if (void 0 !== e) {
            if (!Array.isArray(e))
              throw new Error('Array expected for `attachments`')
            this.attachments = e
          }
        }
        addAttachment(e) {
          if ('object' != typeof e)
            throw new Error('Object expected for `attachment`')
          this.attachments.push(e)
        }
        setCategories(e) {
          if (void 0 !== e) {
            if (
              ('string' == typeof e && (e = [e]),
              !Array.isArray(e) || !e.every(e => 'string' == typeof e))
            )
              throw new Error('Array of strings expected for `categories`')
            this.categories = e
          }
        }
        addCategory(e) {
          if ('string' != typeof e)
            throw new Error('String expected for `category`')
          this.categories.push(e)
        }
        setHeaders(e) {
          if (void 0 !== e) {
            if ('object' != typeof e)
              throw new Error('Object expected for `headers`')
            this.headers = e
          }
        }
        addHeader(e, t) {
          if ('string' != typeof e)
            throw new Error('String expected for header key')
          if ('string' != typeof t)
            throw new Error('String expected for header value')
          this.headers[e] = t
        }
        setSections(e) {
          if (void 0 !== e) {
            if ('object' != typeof e)
              throw new Error('Object expected for `sections`')
            this.sections = e
          }
        }
        setCustomArgs(e) {
          if (void 0 !== e) {
            if ('object' != typeof e)
              throw new Error('Object expected for `customArgs`')
            this.customArgs = e
          }
        }
        setTrackingSettings(e) {
          if (void 0 !== e) {
            if ('object' != typeof e)
              throw new Error('Object expected for `trackingSettings`')
            this.trackingSettings = e
          }
        }
        setMailSettings(e) {
          if (void 0 !== e) {
            if ('object' != typeof e)
              throw new Error('Object expected for `mailSettings`')
            this.mailSettings = e
          }
        }
        setHideWarnings(e) {
          if (void 0 !== e) {
            if ('boolean' != typeof e)
              throw new Error('Boolean expected for `hideWarnings`')
            this.hideWarnings = e
          }
        }
        toJSON() {
          const {
              from: e,
              replyTo: t,
              sendAt: r,
              subject: n,
              content: s,
              templateId: o,
              personalizations: a,
              attachments: u,
              ipPoolName: l,
              batchId: f,
              asm: h,
              sections: p,
              headers: d,
              categories: g,
              customArgs: m,
              mailSettings: y,
              trackingSettings: b
            } = this,
            v = { from: e, subject: n, personalizations: c(a) }
          return (
            Array.isArray(u) && u.length > 0 && (v.attachments = c(u)),
            Array.isArray(g) &&
              g.length > 0 &&
              (v.categories = g.filter(e => '' !== e)),
            Array.isArray(s) && s.length > 0 && (v.content = c(s)),
            Object.keys(d).length > 0 && (v.headers = d),
            Object.keys(y).length > 0 && (v.mailSettings = y),
            Object.keys(b).length > 0 && (v.trackingSettings = b),
            Object.keys(m).length > 0 && (v.customArgs = m),
            Object.keys(p).length > 0 && (v.sections = p),
            Object.keys(h).length > 0 && (v.asm = h),
            void 0 !== t && (v.replyTo = t),
            void 0 !== r && (v.sendAt = r),
            void 0 !== f && (v.batchId = f),
            void 0 !== o && (v.templateId = o),
            void 0 !== l && (v.ipPoolName = l),
            i(v, [
              'substitutions',
              'dynamicTemplateData',
              'customArgs',
              'headers',
              'sections'
            ])
          )
        }
        static create(e) {
          return Array.isArray(e)
            ? e.filter(e => !!e).map(e => this.create(e))
            : e instanceof l
            ? e
            : new l(e)
        }
      }
      e.exports = l
    },
    function (e, t, r) {
      'use strict'
      var n = function (e) {
        return (
          (function (e) {
            return !!e && 'object' == typeof e
          })(e) &&
          !(function (e) {
            var t = Object.prototype.toString.call(e)
            return (
              '[object RegExp]' === t ||
              '[object Date]' === t ||
              (function (e) {
                return e.$$typeof === s
              })(e)
            )
          })(e)
        )
      }
      var s =
        'function' == typeof Symbol && Symbol.for
          ? Symbol.for('react.element')
          : 60103
      function o(e, t) {
        return !1 !== t.clone && t.isMergeableObject(e)
          ? l(((r = e), Array.isArray(r) ? [] : {}), e, t)
          : e
        var r
      }
      function i(e, t, r) {
        return e.concat(t).map(function (e) {
          return o(e, r)
        })
      }
      function a(e) {
        return Object.keys(e).concat(
          (function (e) {
            return Object.getOwnPropertySymbols
              ? Object.getOwnPropertySymbols(e).filter(function (t) {
                  return e.propertyIsEnumerable(t)
                })
              : []
          })(e)
        )
      }
      function c(e, t) {
        try {
          return t in e
        } catch (e) {
          return !1
        }
      }
      function u(e, t, r) {
        var n = {}
        return (
          r.isMergeableObject(e) &&
            a(e).forEach(function (t) {
              n[t] = o(e[t], r)
            }),
          a(t).forEach(function (s) {
            ;(function (e, t) {
              return (
                c(e, t) &&
                !(
                  Object.hasOwnProperty.call(e, t) &&
                  Object.propertyIsEnumerable.call(e, t)
                )
              )
            })(e, s) ||
              (c(e, s) && r.isMergeableObject(t[s])
                ? (n[s] = (function (e, t) {
                    if (!t.customMerge) return l
                    var r = t.customMerge(e)
                    return 'function' == typeof r ? r : l
                  })(s, r)(e[s], t[s], r))
                : (n[s] = o(t[s], r)))
          }),
          n
        )
      }
      function l(e, t, r) {
        ;((r = r || {}).arrayMerge = r.arrayMerge || i),
          (r.isMergeableObject = r.isMergeableObject || n),
          (r.cloneUnlessOtherwiseSpecified = o)
        var s = Array.isArray(t)
        return s === Array.isArray(e)
          ? s
            ? r.arrayMerge(e, t, r)
            : u(e, t, r)
          : o(t, r)
      }
      l.all = function (e, t) {
        if (!Array.isArray(e))
          throw new Error('first argument should be an array')
        return e.reduce(function (e, r) {
          return l(e, r, t)
        }, {})
      }
      var f = l
      e.exports = f
    },
    function (e, t) {
      e.exports = {
        DYNAMIC_TEMPLATE_CHAR_WARNING:
          '\nContent with characters \', " or & may need to be escaped with three brackets\n{{{ content }}}\nSee https://sendgrid.com/docs/for-developers/sending-email/using-handlebars/ for more information.'
      }
    },
    function (e, t, r) {
      'use strict'
      e.exports = class {
        constructor(e, t, r) {
          ;(this.statusCode = e), (this.body = t), (this.headers = r)
        }
        toString() {
          return 'HTTP ' + this.statusCode + ' ' + this.body
        }
      }
    },
    function (e, t, r) {
      'use strict'
      const n = r(74)
      class s extends Error {
        constructor(e) {
          super()
          const { headers: t, status: r, statusText: n, data: s } = e
          ;(this.code = r),
            (this.message = n),
            (this.response = { headers: t, body: s }),
            this.stack || Error.captureStackTrace(this, this.constructor)
          const o = new RegExp(process.cwd() + '/', 'gi')
          this.stack = this.stack.replace(o, '')
        }
        toString() {
          const { body: e } = this.response
          let t = n.red(`${this.message} (${this.code})`)
          return (
            e &&
              Array.isArray(e.errors) &&
              e.errors.forEach(e => {
                const r = n.yellow(e.message),
                  s = n.grey(e.field),
                  o = n.grey(e.help)
                t += `\n  ${r}\n    ${s}\n    ${o}`
              }),
            t
          )
        }
        toJSON() {
          const { message: e, code: t, response: r } = this
          return { message: e, code: t, response: r }
        }
      }
      e.exports = s
    },
    function (e, t, r) {
      'use strict'
      const n = r(75),
        s = r(76),
        o = r(81).stdout,
        i = r(83),
        a =
          'win32' === process.platform &&
          !(process.env.TERM || '').toLowerCase().startsWith('xterm'),
        c = ['ansi', 'ansi', 'ansi256', 'ansi16m'],
        u = new Set(['gray']),
        l = Object.create(null)
      function f(e, t) {
        t = t || {}
        const r = o ? o.level : 0
        ;(e.level = void 0 === t.level ? r : t.level),
          (e.enabled = 'enabled' in t ? t.enabled : e.level > 0)
      }
      function h(e) {
        if (!this || !(this instanceof h) || this.template) {
          const t = {}
          return (
            f(t, e),
            (t.template = function () {
              const e = [].slice.call(arguments)
              return m.apply(null, [t.template].concat(e))
            }),
            Object.setPrototypeOf(t, h.prototype),
            Object.setPrototypeOf(t.template, t),
            (t.template.constructor = h),
            t.template
          )
        }
        f(this, e)
      }
      a && (s.blue.open = '[94m')
      for (const e of Object.keys(s))
        (s[e].closeRe = new RegExp(n(s[e].close), 'g')),
          (l[e] = {
            get() {
              const t = s[e]
              return d.call(
                this,
                this._styles ? this._styles.concat(t) : [t],
                this._empty,
                e
              )
            }
          })
      ;(l.visible = {
        get() {
          return d.call(this, this._styles || [], !0, 'visible')
        }
      }),
        (s.color.closeRe = new RegExp(n(s.color.close), 'g'))
      for (const e of Object.keys(s.color.ansi))
        u.has(e) ||
          (l[e] = {
            get() {
              const t = this.level
              return function () {
                const r = s.color[c[t]][e].apply(null, arguments),
                  n = {
                    open: r,
                    close: s.color.close,
                    closeRe: s.color.closeRe
                  }
                return d.call(
                  this,
                  this._styles ? this._styles.concat(n) : [n],
                  this._empty,
                  e
                )
              }
            }
          })
      s.bgColor.closeRe = new RegExp(n(s.bgColor.close), 'g')
      for (const e of Object.keys(s.bgColor.ansi)) {
        if (u.has(e)) continue
        l['bg' + e[0].toUpperCase() + e.slice(1)] = {
          get() {
            const t = this.level
            return function () {
              const r = s.bgColor[c[t]][e].apply(null, arguments),
                n = {
                  open: r,
                  close: s.bgColor.close,
                  closeRe: s.bgColor.closeRe
                }
              return d.call(
                this,
                this._styles ? this._styles.concat(n) : [n],
                this._empty,
                e
              )
            }
          }
        }
      }
      const p = Object.defineProperties(() => {}, l)
      function d(e, t, r) {
        const n = function () {
          return g.apply(n, arguments)
        }
        ;(n._styles = e), (n._empty = t)
        const s = this
        return (
          Object.defineProperty(n, 'level', {
            enumerable: !0,
            get: () => s.level,
            set(e) {
              s.level = e
            }
          }),
          Object.defineProperty(n, 'enabled', {
            enumerable: !0,
            get: () => s.enabled,
            set(e) {
              s.enabled = e
            }
          }),
          (n.hasGrey = this.hasGrey || 'gray' === r || 'grey' === r),
          (n.__proto__ = p),
          n
        )
      }
      function g() {
        const e = arguments,
          t = e.length
        let r = String(arguments[0])
        if (0 === t) return ''
        if (t > 1) for (let n = 1; n < t; n++) r += ' ' + e[n]
        if (!this.enabled || this.level <= 0 || !r) return this._empty ? '' : r
        const n = s.dim.open
        a && this.hasGrey && (s.dim.open = '')
        for (const e of this._styles.slice().reverse())
          (r = e.open + r.replace(e.closeRe, e.open) + e.close),
            (r = r.replace(/\r?\n/g, `${e.close}$&${e.open}`))
        return (s.dim.open = n), r
      }
      function m(e, t) {
        if (!Array.isArray(t)) return [].slice.call(arguments, 1).join(' ')
        const r = [].slice.call(arguments, 2),
          n = [t.raw[0]]
        for (let e = 1; e < t.length; e++)
          n.push(String(r[e - 1]).replace(/[{}\\]/g, '\\$&')),
            n.push(String(t.raw[e]))
        return i(e, n.join(''))
      }
      Object.defineProperties(h.prototype, l),
        (e.exports = h()),
        (e.exports.supportsColor = o),
        (e.exports.default = e.exports)
    },
    function (e, t, r) {
      'use strict'
      var n = /[|\\{}()[\]^$+*?.]/g
      e.exports = function (e) {
        if ('string' != typeof e) throw new TypeError('Expected a string')
        return e.replace(n, '\\$&')
      }
    },
    function (e, t, r) {
      'use strict'
      ;(function (e) {
        const t = r(78),
          n = (e, r) =>
            function () {
              const n = e.apply(t, arguments)
              return `[${n + r}m`
            },
          s = (e, r) =>
            function () {
              const n = e.apply(t, arguments)
              return `[${38 + r};5;${n}m`
            },
          o = (e, r) =>
            function () {
              const n = e.apply(t, arguments)
              return `[${38 + r};2;${n[0]};${n[1]};${n[2]}m`
            }
        Object.defineProperty(e, 'exports', {
          enumerable: !0,
          get: function () {
            const e = new Map(),
              r = {
                modifier: {
                  reset: [0, 0],
                  bold: [1, 22],
                  dim: [2, 22],
                  italic: [3, 23],
                  underline: [4, 24],
                  inverse: [7, 27],
                  hidden: [8, 28],
                  strikethrough: [9, 29]
                },
                color: {
                  black: [30, 39],
                  red: [31, 39],
                  green: [32, 39],
                  yellow: [33, 39],
                  blue: [34, 39],
                  magenta: [35, 39],
                  cyan: [36, 39],
                  white: [37, 39],
                  gray: [90, 39],
                  redBright: [91, 39],
                  greenBright: [92, 39],
                  yellowBright: [93, 39],
                  blueBright: [94, 39],
                  magentaBright: [95, 39],
                  cyanBright: [96, 39],
                  whiteBright: [97, 39]
                },
                bgColor: {
                  bgBlack: [40, 49],
                  bgRed: [41, 49],
                  bgGreen: [42, 49],
                  bgYellow: [43, 49],
                  bgBlue: [44, 49],
                  bgMagenta: [45, 49],
                  bgCyan: [46, 49],
                  bgWhite: [47, 49],
                  bgBlackBright: [100, 49],
                  bgRedBright: [101, 49],
                  bgGreenBright: [102, 49],
                  bgYellowBright: [103, 49],
                  bgBlueBright: [104, 49],
                  bgMagentaBright: [105, 49],
                  bgCyanBright: [106, 49],
                  bgWhiteBright: [107, 49]
                }
              }
            r.color.grey = r.color.gray
            for (const t of Object.keys(r)) {
              const n = r[t]
              for (const t of Object.keys(n)) {
                const s = n[t]
                ;(r[t] = { open: `[${s[0]}m`, close: `[${s[1]}m` }),
                  (n[t] = r[t]),
                  e.set(s[0], s[1])
              }
              Object.defineProperty(r, t, { value: n, enumerable: !1 }),
                Object.defineProperty(r, 'codes', { value: e, enumerable: !1 })
            }
            const i = e => e,
              a = (e, t, r) => [e, t, r]
            ;(r.color.close = '[39m'),
              (r.bgColor.close = '[49m'),
              (r.color.ansi = { ansi: n(i, 0) }),
              (r.color.ansi256 = { ansi256: s(i, 0) }),
              (r.color.ansi16m = { rgb: o(a, 0) }),
              (r.bgColor.ansi = { ansi: n(i, 10) }),
              (r.bgColor.ansi256 = { ansi256: s(i, 10) }),
              (r.bgColor.ansi16m = { rgb: o(a, 10) })
            for (let e of Object.keys(t)) {
              if ('object' != typeof t[e]) continue
              const i = t[e]
              'ansi16' === e && (e = 'ansi'),
                'ansi16' in i &&
                  ((r.color.ansi[e] = n(i.ansi16, 0)),
                  (r.bgColor.ansi[e] = n(i.ansi16, 10))),
                'ansi256' in i &&
                  ((r.color.ansi256[e] = s(i.ansi256, 0)),
                  (r.bgColor.ansi256[e] = s(i.ansi256, 10))),
                'rgb' in i &&
                  ((r.color.ansi16m[e] = o(i.rgb, 0)),
                  (r.bgColor.ansi16m[e] = o(i.rgb, 10)))
            }
            return r
          }
        })
      }.call(this, r(77)(e)))
    },
    function (e, t) {
      e.exports = function (e) {
        return (
          e.webpackPolyfill ||
            ((e.deprecate = function () {}),
            (e.paths = []),
            e.children || (e.children = []),
            Object.defineProperty(e, 'loaded', {
              enumerable: !0,
              get: function () {
                return e.l
              }
            }),
            Object.defineProperty(e, 'id', {
              enumerable: !0,
              get: function () {
                return e.i
              }
            }),
            (e.webpackPolyfill = 1)),
          e
        )
      }
    },
    function (e, t, r) {
      var n = r(31),
        s = r(80),
        o = {}
      Object.keys(n).forEach(function (e) {
        ;(o[e] = {}),
          Object.defineProperty(o[e], 'channels', { value: n[e].channels }),
          Object.defineProperty(o[e], 'labels', { value: n[e].labels })
        var t = s(e)
        Object.keys(t).forEach(function (r) {
          var n = t[r]
          ;(o[e][r] = (function (e) {
            var t = function (t) {
              if (null == t) return t
              arguments.length > 1 &&
                (t = Array.prototype.slice.call(arguments))
              var r = e(t)
              if ('object' == typeof r)
                for (var n = r.length, s = 0; s < n; s++)
                  r[s] = Math.round(r[s])
              return r
            }
            return 'conversion' in e && (t.conversion = e.conversion), t
          })(n)),
            (o[e][r].raw = (function (e) {
              var t = function (t) {
                return null == t
                  ? t
                  : (arguments.length > 1 &&
                      (t = Array.prototype.slice.call(arguments)),
                    e(t))
              }
              return 'conversion' in e && (t.conversion = e.conversion), t
            })(n))
        })
      }),
        (e.exports = o)
    },
    function (e, t, r) {
      'use strict'
      e.exports = {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 134, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 250, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 221],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        rebeccapurple: [102, 51, 153],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [112, 128, 144],
        slategrey: [112, 128, 144],
        snow: [255, 250, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 50]
      }
    },
    function (e, t, r) {
      var n = r(31)
      function s(e) {
        var t = (function () {
            for (
              var e = {}, t = Object.keys(n), r = t.length, s = 0;
              s < r;
              s++
            )
              e[t[s]] = { distance: -1, parent: null }
            return e
          })(),
          r = [e]
        for (t[e].distance = 0; r.length; )
          for (
            var s = r.pop(), o = Object.keys(n[s]), i = o.length, a = 0;
            a < i;
            a++
          ) {
            var c = o[a],
              u = t[c]
            ;-1 === u.distance &&
              ((u.distance = t[s].distance + 1), (u.parent = s), r.unshift(c))
          }
        return t
      }
      function o(e, t) {
        return function (r) {
          return t(e(r))
        }
      }
      function i(e, t) {
        for (
          var r = [t[e].parent, e], s = n[t[e].parent][e], i = t[e].parent;
          t[i].parent;

        )
          r.unshift(t[i].parent),
            (s = o(n[t[i].parent][i], s)),
            (i = t[i].parent)
        return (s.conversion = r), s
      }
      e.exports = function (e) {
        for (
          var t = s(e), r = {}, n = Object.keys(t), o = n.length, a = 0;
          a < o;
          a++
        ) {
          var c = n[a]
          null !== t[c].parent && (r[c] = i(c, t))
        }
        return r
      }
    },
    function (e, t, r) {
      'use strict'
      const n = r(23),
        s = r(82),
        o = process.env
      let i
      function a(e) {
        return (function (e) {
          return (
            0 !== e && {
              level: e,
              hasBasic: !0,
              has256: e >= 2,
              has16m: e >= 3
            }
          )
        })(
          (function (e) {
            if (!1 === i) return 0
            if (s('color=16m') || s('color=full') || s('color=truecolor'))
              return 3
            if (s('color=256')) return 2
            if (e && !e.isTTY && !0 !== i) return 0
            const t = i ? 1 : 0
            if ('win32' === process.platform) {
              const e = n.release().split('.')
              return Number(process.versions.node.split('.')[0]) >= 8 &&
                Number(e[0]) >= 10 &&
                Number(e[2]) >= 10586
                ? Number(e[2]) >= 14931
                  ? 3
                  : 2
                : 1
            }
            if ('CI' in o)
              return ['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(
                e => e in o
              ) || 'codeship' === o.CI_NAME
                ? 1
                : t
            if ('TEAMCITY_VERSION' in o)
              return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(o.TEAMCITY_VERSION)
                ? 1
                : 0
            if ('truecolor' === o.COLORTERM) return 3
            if ('TERM_PROGRAM' in o) {
              const e = parseInt(
                (o.TERM_PROGRAM_VERSION || '').split('.')[0],
                10
              )
              switch (o.TERM_PROGRAM) {
                case 'iTerm.app':
                  return e >= 3 ? 3 : 2
                case 'Apple_Terminal':
                  return 2
              }
            }
            return /-256(color)?$/i.test(o.TERM)
              ? 2
              : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
                  o.TERM
                ) || 'COLORTERM' in o
              ? 1
              : (o.TERM, t)
          })(e)
        )
      }
      s('no-color') || s('no-colors') || s('color=false')
        ? (i = !1)
        : (s('color') || s('colors') || s('color=true') || s('color=always')) &&
          (i = !0),
        'FORCE_COLOR' in o &&
          (i = 0 === o.FORCE_COLOR.length || 0 !== parseInt(o.FORCE_COLOR, 10)),
        (e.exports = {
          supportsColor: a,
          stdout: a(process.stdout),
          stderr: a(process.stderr)
        })
    },
    function (e, t, r) {
      'use strict'
      e.exports = (e, t) => {
        t = t || process.argv
        const r = e.startsWith('-') ? '' : 1 === e.length ? '-' : '--',
          n = t.indexOf(r + e),
          s = t.indexOf('--')
        return -1 !== n && (-1 === s || n < s)
      }
    },
    function (e, t, r) {
      'use strict'
      const n = /(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi,
        s = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g,
        o = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/,
        i = /\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi,
        a = new Map([
          ['n', '\n'],
          ['r', '\r'],
          ['t', '\t'],
          ['b', '\b'],
          ['f', '\f'],
          ['v', '\v'],
          ['0', '\0'],
          ['\\', '\\'],
          ['e', ''],
          ['a', '']
        ])
      function c(e) {
        return ('u' === e[0] && 5 === e.length) ||
          ('x' === e[0] && 3 === e.length)
          ? String.fromCharCode(parseInt(e.slice(1), 16))
          : a.get(e) || e
      }
      function u(e, t) {
        const r = [],
          n = t.trim().split(/\s*,\s*/g)
        let s
        for (const t of n)
          if (isNaN(t)) {
            if (!(s = t.match(o)))
              throw new Error(
                `Invalid Chalk template style argument: ${t} (in style '${e}')`
              )
            r.push(s[2].replace(i, (e, t, r) => (t ? c(t) : r)))
          } else r.push(Number(t))
        return r
      }
      function l(e) {
        s.lastIndex = 0
        const t = []
        let r
        for (; null !== (r = s.exec(e)); ) {
          const e = r[1]
          if (r[2]) {
            const n = u(e, r[2])
            t.push([e].concat(n))
          } else t.push([e])
        }
        return t
      }
      function f(e, t) {
        const r = {}
        for (const e of t)
          for (const t of e.styles) r[t[0]] = e.inverse ? null : t.slice(1)
        let n = e
        for (const e of Object.keys(r))
          if (Array.isArray(r[e])) {
            if (!(e in n)) throw new Error('Unknown Chalk style: ' + e)
            n = r[e].length > 0 ? n[e].apply(n, r[e]) : n[e]
          }
        return n
      }
      e.exports = (e, t) => {
        const r = [],
          s = []
        let o = []
        if (
          (t.replace(n, (t, n, i, a, u, h) => {
            if (n) o.push(c(n))
            else if (a) {
              const t = o.join('')
              ;(o = []),
                s.push(0 === r.length ? t : f(e, r)(t)),
                r.push({ inverse: i, styles: l(a) })
            } else if (u) {
              if (0 === r.length)
                throw new Error('Found extraneous } in Chalk template literal')
              s.push(f(e, r)(o.join(''))), (o = []), r.pop()
            } else o.push(h)
          }),
          s.push(o.join('')),
          r.length > 0)
        ) {
          const e = `Chalk template literal is missing ${
            r.length
          } closing bracket${1 === r.length ? '' : 's'} (\`}\`)`
          throw new Error(e)
        }
        return s.join('')
      }
    },
    function (e, t, r) {
      'use strict'
      const n = r(1),
        s = r(2),
        o = ['day', 'week', 'month'],
        i = ['us', 'ca'],
        a = ['desc', 'asc']
      e.exports = class {
        constructor(e) {
          ;(this.startDate = null),
            (this.endDate = null),
            (this.aggregatedBy = null),
            e && this.fromData(e)
        }
        fromData(e) {
          if ('object' != typeof e)
            throw new Error('Expecting object for Statistics data')
          ;(e = s(e)), (e = n(e, ['substitutions', 'customArgs']))
          const { startDate: t, endDate: r, aggregatedBy: o } = e
          this.setStartDate(t), this.setEndDate(r), this.setAggregatedBy(o)
        }
        setStartDate(e) {
          if (void 0 === e) throw new Error('Date expected for `startDate`')
          if ('Invalid Date' === new Date(e) || isNaN(new Date(e)))
            throw new Error('Date expected for `startDate`')
          console.log(e),
            (this.startDate = new Date(e).toISOString().slice(0, 10))
        }
        setEndDate(e) {
          if (void 0 !== e) {
            if ('Invalid Date' === new Date(e) || isNaN(new Date(e)))
              throw new Error('Date expected for `endDate`')
            this.endDate = new Date(e).toISOString().slice(0, 10)
          } else this.endDate = new Date().toISOString().slice(0, 10)
        }
        setAggregatedBy(e) {
          if (void 0 !== e) {
            if ('string' != typeof e || !o.includes(e.toLowerCase()))
              throw new Error('Incorrect value for `aggregatedBy`')
            this.aggregatedBy = e
          }
        }
        getGlobal() {
          const { startDate: e, endDate: t, aggregatedBy: r } = this
          return { startDate: e, endDate: t, aggregatedBy: r }
        }
        getAdvanced(e) {
          const t = this.getGlobal()
          return (
            void 0 === e ||
              ('string' == typeof e &&
                i.includes(e.toLowerCase()) &&
                (t.country = e)),
            t
          )
        }
        getAdvancedMailboxProviders(e) {
          const t = this.getGlobal()
          if (void 0 === e) return t
          if (Array.isArray(e) && e.some(e => 'string' != typeof e))
            throw new Error('Array of strings expected for `mailboxProviders`')
          return (t.mailBoxProviders = e), t
        }
        getAdvancedBrowsers(e) {
          const t = this.getGlobal()
          if (void 0 === e) return t
          if (Array.isArray(e) && e.some(e => 'string' != typeof e))
            throw new Error('Array of strings expected for `browsers`')
          return (t.browsers = e), t
        }
        getCategories(e) {
          if (void 0 === e)
            throw new Error('Array of strings expected for `categories`')
          if (!this._isValidArrayOfStrings(e))
            throw new Error('Array of strings expected for `categories`')
          const t = this.getGlobal()
          return (t.categories = e), t
        }
        getSubuser(e) {
          if (void 0 === e)
            throw new Error('Array of strings expected for `subusers`')
          if (!this._isValidArrayOfStrings(e))
            throw new Error('Array of strings expected for `subusers`')
          const t = this.getGlobal()
          return (t.subusers = e), t
        }
        getSubuserSum(e = 'delivered', t = a[0], r = 5, n = 0) {
          if ('string' != typeof e)
            throw new Error('string expected for `sortByMetric`')
          if (!a.includes(t.toLowerCase()))
            throw new Error('desc or asc expected for `sortByDirection`')
          if ('number' != typeof r)
            throw new Error('number expected for `limit`')
          if ('number' != typeof n)
            throw new Error('number expected for `offset`')
          const s = this.getGlobal()
          return (
            (s.sortByMetric = e),
            (s.sortByDirection = t),
            (s.limit = r),
            (s.offset = n),
            s
          )
        }
        getSubuserMonthly(e = 'delivered', t = a[0], r = 5, n = 0) {
          if ('string' != typeof e)
            throw new Error('string expected for `sortByMetric`')
          if (!a.includes(t.toLowerCase()))
            throw new Error('desc or asc expected for `sortByDirection`')
          if ('number' != typeof r)
            throw new Error('number expected for `limit`')
          if ('number' != typeof n)
            throw new Error('number expected for `offset`')
          const s = this.getGlobal()
          return (
            (s.sortByMetric = e),
            (s.sortByDirection = t),
            (s.limit = r),
            (s.offset = n),
            s
          )
        }
        _isValidArrayOfStrings(e) {
          return (
            !!Array.isArray(e) &&
            !(e.length < 1 || e.some(e => 'string' != typeof e))
          )
        }
      }
    },
    function (e, t, r) {
      'use strict'
      const n = r(30),
        s = r(6),
        o = r(2),
        i = r(86),
        a = r(27),
        c = r(1),
        u = r(3),
        l = r(29)
      e.exports = {
        arrayToJSON: n,
        convertKeys: s,
        deepClone: o,
        mergeData: i,
        splitNameEmail: a,
        toCamelCase: c,
        toSnakeCase: u,
        wrapSubstitutions: l
      }
    },
    function (e, t, r) {
      'use strict'
      e.exports = function (e, t) {
        if ('object' != typeof e || null === e)
          throw new Error('Not an object provided for base')
        if ('object' != typeof t || null === t)
          throw new Error('Not an object provided for data')
        const r = Object.assign({}, e)
        for (const e in t)
          t.hasOwnProperty(e) &&
            (t[e] && Array.isArray(t[e])
              ? (r[e] = t[e])
              : t[e] && 'object' == typeof t[e]
              ? (r[e] = Object.assign({}, t[e]))
              : t[e] && (r[e] = t[e]))
        return r
      }
    },
    function (e, t, r) {
      'use strict'
      r.r(t),
        r.d(t, 'handler', function () {
          return b
        })
      var n = r(8)
      function s(e, t) {
        var r = Object.keys(e)
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e)
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable
            })),
            r.push.apply(r, n)
        }
        return r
      }
      function o(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {}
          t % 2
            ? s(Object(r), !0).forEach(function (t) {
                i(e, t, r[t])
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : s(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                )
              })
        }
        return e
      }
      function i(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (e[t] = r),
          e
        )
      }
      const a = e => e.reduce((e, t) => e + t, 0),
        c = e => e.slice(1),
        u = e => {
          const t =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
          return new Array(e)
            .fill('')
            .map(() => t.charAt(Math.floor(Math.random() * t.length)))
            .join('')
        },
        l = (
          {
            age: e,
            nationality: t,
            device: r,
            hearingIssues: n,
            tinnitus: s,
            hearingHypersensitivity: o,
            soundsReactions: i,
            soundsList: a
          },
          c
        ) => [
          ['user-info-label', 'user-info-value'],
          ['age', e.toString()],
          ['nationality', t],
          ['device', r],
          ['hearing-issues', n],
          ['tinnitus', s],
          ['hearing-hypersens', o],
          ['sounds-reactions', i],
          ['sounds-list', (null != a ? a : []).join('/')],
          ['sound-volume', c.toString()]
        ],
        f = ({ statementsScores: e }) => [
          ['noise-tolerance-label', 'noise-tolerance-value'],
          ...e.map((e, t) => ['statement-' + (t + 1), e])
        ],
        h = e => {
          const t =
            ((r = ({ name: e }) => e),
            e.reduce((e, t) => {
              var n
              return o(
                o({}, e),
                {},
                {
                  [r(t)]: [
                    ...(null !== (n = e[r(t)]) && void 0 !== n ? n : []),
                    t
                  ]
                }
              )
            }, {}))
          var r
          const n = Object.keys(t).sort(),
            s = t[n[0]].length
          return [
            [
              'filename',
              ...new Array(s).fill('').map((e, t) => 'score' + (t + 1))
            ],
            ...n.map(e => [e, ...t[e].map(({ score: e }) => e.toString())])
          ]
        }
      var p = ({
        userInfo: e,
        noiseTolerance: t,
        soundVolume: r,
        soundTests: n
      }) =>
        (e => {
          const t = e.reduce((e, t) => [...e, t[0].length], [])
          return [
            e.reduce((e, t) => [...e, ...t[0]], []),
            ...e.map(c).reduce((e, r, n) => {
              const s = a(t.slice(0, n)),
                o = a(t.slice(n + 1))
              return [
                ...e,
                ...r.map(e => [
                  ...new Array(s).fill(''),
                  ...e,
                  ...new Array(o).fill('')
                ])
              ]
            }, [])
          ]
        })([l(e, r), f(t), h(n)])
          .map(e => e.join(','))
          .join('\n')
      const {
        SENDGRID_API_KEY: d,
        SENDGRID_FROM_EMAIL: g,
        SENDGRID_FROM_NAME: m,
        SENDGRID_TO_EMAIL: y
      } = process.env
      async function b(e, t) {
        if (
          (console.log('context', t),
          console.log('event', e),
          n.setApiKey(d),
          'POST' === e.httpMethod && e.body)
        )
          try {
            const t = JSON.parse(e.body),
              o = await ((r = n),
              (s = [
                {
                  from: { name: m, email: g },
                  to: y,
                  subject: "Résultats de l'expérience sur l'audition en ligne",
                  text: 'Résultats en pièce-jointe au format CSV.',
                  html:
                    'Résultats en pièce-jointe au format <strong>CSV</strong>.',
                  attachments: [
                    {
                      content: new Buffer(p(t)).toString('base64'),
                      filename: `online-hearing-exp-results_${Date.now()}_${u(
                        5
                      )}.csv`,
                      type: 'text/csv',
                      disposition: 'attachment'
                    }
                  ]
                }
              ]),
              new Promise((e, t) => {
                console.log('Sending the email...'),
                  r
                    .send(s)
                    .then(([t, r]) => {
                      console.log('Successfully sent email', t), e(t)
                    })
                    .catch(e => {
                      console.error('Could not send email', e), t(e)
                    })
              }))
            return (
              console.log(o),
              {
                statusCode: 200,
                body: JSON.stringify({
                  message: 'Results successfully collected!'
                })
              }
            )
          } catch (e) {
            return (
              console.error(JSON.stringify(e, null, 2)),
              {
                statusCode: 400,
                body: JSON.stringify({
                  message: 'Results could not be collected.',
                  err: e.message
                })
              }
            )
          }
        var r, s
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Nothing special happened.' })
        }
      }
    }
  ])
)
