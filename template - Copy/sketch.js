System.register(["./vendor.js", "./frameworks.js"], (function() {
  "use strict";
  var t, e, n, s, o, a, i, r, c, d, l, u, m, p, g, f, h, j;
  return {
      setters: [function(c) {
          t = c.r,
          e = c.q,
          n = c.o,
          s = c.l,
          o = c.n,
          a = c.a,
          i = c.m,
          r = c.w
      }
      , function(t) {
          c = t.I,
          d = t.U,
          l = t.o,
          u = t.a,
          m = t.R,
          p = t._,
          g = t.n,
          f = t.V,
          h = t.T,
          j = t.b
      }
      ],
      execute: function() {
          async function v(t, n, s) {
              const o = e(document, t)
                , a = e(document, n);
              function i(t) {
                  a.hidden = t,
                  a.open = !1,
                  o.hidden = !t
              }
              let r;
              i(!0);
              try {
                  r = await s.json()
              } catch (u) {
                  return i(!1),
                  void c()
              }
              const l = r.json;
              try {
                  await d(l.job_url)
              } catch (u) {
                  return i(!1),
                  void c()
              }
              i(!1),
              window.location = l.export_url
          }
          async function L(t) {
              await function(t) {
                  return new Promise((function(e) {
                      function n() {
                          t.hasFocus() && (e(),
                          t.removeEventListener("visibilitychange", n),
                          window.removeEventListener("focus", n),
                          window.removeEventListener("blur", n))
                      }
                      t.addEventListener("visibilitychange", n),
                      window.addEventListener("focus", n),
                      window.addEventListener("blur", n),
                      n()
                  }
                  ))
              }(document),
              await new Promise(t=>setTimeout(t, 1e3)),
              t instanceof HTMLButtonElement && (t.disabled = !1)
          }
          function b(t) {
              t.preventDefault()
          }
          t(".js-audit-log-export-form", (async function(t, e) {
              await v(".js-audit-log-exporting", ".js-audit-log-export-menu", e)
          }
          )),
          t(".js-audit-log-git-event-export-form", (async function(t, e) {
              await v(".js-audit-log-git-event-exporting", ".js-audit-log-git-event-export-menu", e)
          }
          )),
          n("#js-oauth-authorize-btn", t=>{
              L(t)
          }
          ),
          n("#js-manual-authorize-redirect", t=>{
              !async function(t) {
                  t.addEventListener("click", b),
                  t.classList.add("text-gray"),
                  await new Promise(t=>setTimeout(t, 3e3)),
                  t.classList.remove("text-gray"),
                  t.removeEventListener("click", b)
              }(t)
          }
          ),
          t(".js-toggler-container .js-set-approval-state", (async function(t, e) {
              const n = s(t, ".js-toggler-container");
              n.classList.add("loading");
              const o = await e.json();
              "approved" === o.json.approval_state ? n.classList.add("on") : "denied" === o.json.approval_state && (n.classList.add("revoked"),
              n.classList.remove("on")),
              n.classList.remove("loading")
          }
          )),
          t(".js-request-access-approval-form", (async function(t, n) {
              await n.text();
              const s = o(t, "data-container-id");
              e(document, `#${s}`).classList.add("on")
          }
          )),
          a("details-menu-selected", ".js-select-plan-menu", (function(t) {
              const e = t.detail.relatedTarget
                , n = document.querySelectorAll(".js-plan-card-section");
              for (const i of n)
                  i instanceof HTMLElement && (i.hidden = !0);
              const s = t.currentTarget.querySelectorAll("[role^=menuitem]")
                , o = Array.from(s).indexOf(e)
                , a = Array.from(n)[o];
              a instanceof HTMLElement && (a.hidden = !1)
          }
          ), {
              capture: !0
          }),
          n(".js-suggested-usernames-container", (function(t) {
              const e = i(t, ".js-suggested-username", HTMLInputElement)
                , n = document.querySelector(".js-signup-form");
              if (n && 0 !== e.length)
                  for (const s of e)
                      n.appendChild(s)
          }
          )),
          l(".js-email-notice-trigger", (function(t) {
              const e = i(document, ".js-email-notice");
              for (const n of e)
                  n.classList.add("notice-highlight");
              t.addEventListener("blur", (function() {
                  for (const t of e)
                      t.classList.remove("notice-highlight")
              }
              ))
          }
          )),
          n(".js-plan-choice:checked", {
              add(t) {
                  const e = t.closest(".plan-row");
                  e && e.classList.add("selected")
              },
              remove(t) {
                  const e = t.closest(".plan-row");
                  e && e.classList.remove("selected")
              }
          });
          const w = new WeakMap;
          function y(t) {
              const n = t.target
                , o = s(n, "form");
              if (n.closest("input[type=text]") && !w.get(o)) {
                  const t = e(o, ".js-signup-source", HTMLInputElement);
                  let n = t.value;
                  t.hasAttribute("data-ga-label") && (n = `${n}${t.getAttribute("data-ga-label")}`),
                  m({
                      category: "Sign up",
                      action: "Attempt",
                      label: n
                  }),
                  w.set(o, !0)
              }
          }
          function E() {
              const t = e(document, ".js-password-with-confirmation", HTMLInputElement)
                , n = e(document, ".js-password-confirm", HTMLInputElement);
              n.value !== t.value ? function(t) {
                  const e = s(t, ".js-form-group");
                  e.classList.add("errored");
                  const n = t.getAttribute("data-validity-message");
                  if (n) {
                      t.setCustomValidity(n);
                      const e = s(t, "form", HTMLFormElement);
                      f(e)
                  }
                  const o = e.querySelector(".error")
                    , a = t.getAttribute("data-error-message");
                  if (!o && a) {
                      const t = document.createElement("dd");
                      t.classList.add("error"),
                      t.innerHTML = a,
                      e.appendChild(t)
                  }
              }(n) : function(t) {
                  const e = s(t, ".js-form-group");
                  t.setCustomValidity(""),
                  e.classList.remove("errored");
                  const n = s(t, "form", HTMLFormElement);
                  f(n);
                  const o = e.querySelector(".error");
                  o && e.removeChild(o)
              }(n)
          }
          function T(t, e, n) {
              const s = t.getBoundingClientRect().height
                , o = e.getBoundingClientRect()
                , a = n.getBoundingClientRect();
              let i = a.top;
              i + o.height + 10 >= s && (i = Math.max(s - o.height - 10, 0));
              let r = a.right;
              null != n.closest(".js-build-status-to-the-left") && (r = Math.max(a.left - o.width - 10, 0)),
              e.style.top = `${i}px`,
              e.style.left = `${r}px`,
              e.style.right = "auto"
          }
          async function q(t) {
              const e = t.querySelector(".js-dropdown-details")
                , n = t.querySelector(".js-status-dropdown-menu") || t.closest(".js-status-dropdown-menu");
              if (!(n instanceof HTMLElement))
                  return;
              const s = n.querySelector(".js-status-loader");
              if (!s)
                  return;
              const o = n.querySelector(".js-status-loading")
                , a = n.querySelector(".js-status-error")
                , i = s.getAttribute("data-contents-url");
              let r;
              o.classList.remove("d-none"),
              a.classList.add("d-none");
              try {
                  await h(),
                  r = await j(document, i)
              } catch (c) {
                  o.classList.add("d-none"),
                  a.classList.remove("d-none")
              }
              r && (s.replaceWith(r),
              n.querySelector(".js-details-container").classList.add("open"),
              e && n.classList.contains("js-append-menu-to-body") && T(document.body, n, e))
          }
          function M(t) {
              q(t.currentTarget)
          }
          n(".js-signup-form", {
              subscribe: t=>u(t, "input", y)
          }),
          a("submit", ".js-signup-form-submit", (function(t) {
              const n = t.currentTarget
                , s = e(n, ".js-signup-source", HTMLInputElement);
              let o = s.value;
              s.hasAttribute("data-ga-label") && (o = `${o}${s.getAttribute("data-ga-label")}`),
              m({
                  category: "Sign up",
                  action: "Submit",
                  label: o
              })
          }
          )),
          a("submit", ".js-org-survey", (function(t) {
              const e = t.currentTarget
                , n = i(e, ".js-other-text", HTMLInputElement);
              for (const s of n) {
                  const t = p(s, "js-other-hidden-input");
                  t instanceof HTMLInputElement && (t.checked = s.value.length > 0)
              }
          }
          )),
          n(".js-show-next-question-trigger:checked", {
              constructor: HTMLElement,
              add(t) {
                  const e = t.closest(".js-show-next-question");
                  if (e instanceof HTMLElement) {
                      const t = p(e, "js-hidden-question");
                      t && (t.hidden = !1)
                  }
              },
              remove(t) {
                  const e = t.closest(".js-show-next-question");
                  if (e instanceof HTMLElement) {
                      const t = p(e, "js-hidden-question");
                      t && (t.hidden = !0)
                  }
              }
          }),
          n(".js-octocaptcha-parent", (function(t) {
              const n = e(t, ".js-octocaptcha-spinner")
                , s = e(t, ".js-octocaptcha-success")
                , o = e(t, ".js-octocaptcha-token", HTMLInputElement)
                , a = e(t, ".js-octocaptcha-form-submit", HTMLButtonElement)
                , i = e(t, ".js-octocaptcha-frame-container")
                , r = e(t, ".js-octocaptcha-frame", HTMLIFrameElement)
                , c = o.getAttribute("data-octocaptcha-url")
                , d = o.getAttribute("data-octocaptcha-timeout")
                , l = d ? parseInt(d) : 3e4;
              let u = !1;
              const p = ()=>{
                  u || (u = !0,
                  n.classList.add("d-none"),
                  s.classList.remove("d-none"),
                  f())
              }
                , g = ()=>{
                  if (u)
                      return;
                  const e = document.createElement("input");
                  e.type = "hidden",
                  e.id = "error_loading_captcha",
                  e.name = "error_loading_captcha",
                  e.value = "1",
                  t.appendChild(e),
                  o.required = !1,
                  p()
              }
                , f = ()=>{
                  t.checkValidity() && (a.disabled = !1)
              }
              ;
              setTimeout(g, l),
              r.addEventListener("error", g),
              window.addEventListener("message", t=>{
                  if (t.origin !== c)
                      return;
                  const e = t.data && t.data.event;
                  var s;
                  "captcha-loaded" === e ? u || (u = !0,
                  n.classList.add("d-none"),
                  i.classList.remove("v-hidden", "zero-height"),
                  null === (s = r.contentWindow) || void 0 === s || s.postMessage({
                      event: "captcha-loaded-ack"
                  }, c || "")) : "captcha-complete" === e ? (o.value = t.data.sessionToken,
                  (()=>{
                      const t = i.getAttribute("data-ga-event-category");
                      t && m({
                          category: t,
                          action: "success",
                          label: "captcha verified"
                      })
                  }
                  )(),
                  f()) : "captcha-suppressed" === e && p()
              }
              )
          }
          )),
          n(".js-survey-answer-choice:checked", {
              add(t) {
                  const e = t.closest(".js-answer");
                  if (e) {
                      const t = e.querySelector(".js-answer-choice");
                      t && (t.classList.remove("border-black-fade", "bg-white"),
                      t.classList.add("border-blue", "bg-blue-light"))
                  }
                  const n = document.querySelector(`.js-other-input-box[data-other-input-for=${t.getAttribute("data-question-short-text")}]`);
                  n instanceof HTMLElement && t.classList.contains("js-other-choice") && (n.hidden = !1)
              },
              remove(t) {
                  const e = t.closest(".js-answer");
                  if (e) {
                      const t = e.querySelector(".js-answer-choice");
                      t && (t.classList.remove("border-blue", "bg-blue-light"),
                      t.classList.add("border-black-fade", "bg-white"))
                  }
                  const n = document.querySelector(`.js-other-input-box[data-other-input-for=${t.getAttribute("data-question-short-text")}]`);
                  n instanceof HTMLElement && t.classList.contains("js-other-choice") && (n.hidden = !0)
              }
          }),
          n(".js-allow-multiple:checked", {
              constructor: HTMLInputElement,
              add(t) {
                  const e = parseInt(t.getAttribute("data-max-choices") || "")
                    , n = s(t, ".js-question")
                    , o = i(n, ".js-allow-multiple", HTMLInputElement);
                  if (o.filter(t=>!0 === t.checked).length >= e)
                      for (const s of o)
                          !1 === s.checked && (s.disabled = !0)
              },
              remove(t) {
                  const e = s(t, ".js-question");
                  for (const n of i(e, ".js-allow-multiple", HTMLInputElement))
                      n.disabled = !1
              }
          }),
          g("keyup", ".js-password-with-confirmation", ()=>{
              "" !== e(document, ".js-password-confirm", HTMLInputElement).value && E()
          }
          ),
          g("keyup", ".js-password-confirm", E),
          n(".js-site-status-template", {
              constructor: HTMLTemplateElement,
              initialize(t) {
                  !async function(t) {
                      var e, n;
                      const s = null === (n = null === (e = document.head) || void 0 === e ? void 0 : e.querySelector('meta[name="site-status-api-url"]')) || void 0 === n ? void 0 : n.content;
                      if (!s)
                          return;
                      const o = await (await window.fetch(s)).json()
                        , a = o.status.indicator;
                      "none" !== a && t.before(new r(t,{
                          time: o.page.updated_at,
                          description: o.status.description,
                          class: "minor" === a ? "flash-warn" : "flash-error"
                      }))
                  }(t)
              }
          }),
          n(".js-contact-javascript-flag", {
              constructor: HTMLInputElement,
              add(t) {
                  t.value = "true"
              }
          }),
          a("toggle", ".js-build-status .js-dropdown-details", (function(t) {
              const e = t.currentTarget
                , n = e.querySelector(".js-status-dropdown-menu");
              function s() {
                  e.hasAttribute("open") || a()
              }
              function o(t) {
                  n.contains(t.target) || a()
              }
              function a() {
                  e.removeAttribute("open"),
                  n.classList.add("d-none"),
                  e.appendChild(n),
                  e.removeEventListener("toggle", s),
                  window.removeEventListener("scroll", o)
              }
              n && (e.addEventListener("toggle", s),
              n.classList.contains("js-close-menu-on-scroll") && window.addEventListener("scroll", o, {
                  capture: !0
              }),
              n.classList.remove("d-none"),
              n.querySelector(".js-details-container").classList.add("open"),
              n.classList.contains("js-append-menu-to-body") && (document.body.appendChild(n),
              T(document.body, n, e)))
          }
          ), {
              capture: !0
          }),
          a("click", ".js-status-retry", ({currentTarget: t})=>{
              q(t)
          }
          ),
          n(".js-build-status", {
              add(t) {
                  t.addEventListener("mouseenter", M, {
                      once: !0
                  })
              },
              remove(t) {
                  t.removeEventListener("mouseenter", M)
              }
          }),
          a("upload:setup", ".js-upload-enterprise-installation-user-accounts-upload", (function(t) {
              const {form: e} = t.detail
                , n = t.currentTarget.getAttribute("data-business-id");
              n && e.append("business_id", n);
              const s = t.currentTarget.getAttribute("data-enterprise-installation-id");
              s && e.append("enterprise_installation_id", s)
          }
          )),
          a("upload:complete", ".js-upload-enterprise-installation-user-accounts-upload", (function(t) {
              const {attachment: e} = t.detail
                , n = t.currentTarget.querySelector(".js-enterprise-installation-user-accounts-upload-id");
              n.value = e.id;
              const s = t.currentTarget.querySelector(".js-enterprise-installation-id")
                , o = t.currentTarget.getAttribute("data-enterprise-installation-id");
              o && (s.value = o);
              const a = n.form;
              a && a.submit()
          }
          ))
      }
  }
}
));
//# sourceMappingURL=github-c16df000.js.map
