import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _31d86ede = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
const _7f5881b0 = () => interopDefault(import('..\\pages\\index\\backup\\download.vue' /* webpackChunkName: "pages_index_backup_download" */))
const _2bc3fbbe = () => interopDefault(import('..\\pages\\index\\backup\\upload.vue' /* webpackChunkName: "pages_index_backup_upload" */))
const _cb77b1c6 = () => interopDefault(import('..\\pages\\index\\downloads\\agreement.vue' /* webpackChunkName: "pages_index_downloads_agreement" */))
const _25c83d5e = () => interopDefault(import('..\\pages\\index\\downloads\\magazine.vue' /* webpackChunkName: "pages_index_downloads_magazine" */))
const _27a961c8 = () => interopDefault(import('..\\pages\\index\\downloads\\magazineMini.vue' /* webpackChunkName: "pages_index_downloads_magazineMini" */))
const _1f3b4ebf = () => interopDefault(import('..\\pages\\index\\downloads\\magazineNew.vue' /* webpackChunkName: "pages_index_downloads_magazineNew" */))
const _649dc031 = () => interopDefault(import('..\\pages\\index\\downloads\\report.vue' /* webpackChunkName: "pages_index_downloads_report" */))
const _0557bd86 = () => interopDefault(import('..\\pages\\_prefix.vue' /* webpackChunkName: "pages__prefix" */))
const _ca14fd9a = () => interopDefault(import('..\\pages\\_prefix\\new.vue' /* webpackChunkName: "pages__prefix_new" */))
const _5df975ae = () => interopDefault(import('..\\pages\\_prefix\\profile\\_id.vue' /* webpackChunkName: "pages__prefix_profile__id" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _31d86ede,
    name: "index",
    children: [{
      path: "backup/download",
      component: _7f5881b0,
      name: "index-backup-download"
    }, {
      path: "backup/upload",
      component: _2bc3fbbe,
      name: "index-backup-upload"
    }, {
      path: "downloads/agreement",
      component: _cb77b1c6,
      name: "index-downloads-agreement"
    }, {
      path: "downloads/magazine",
      component: _25c83d5e,
      name: "index-downloads-magazine"
    }, {
      path: "downloads/magazineMini",
      component: _27a961c8,
      name: "index-downloads-magazineMini"
    }, {
      path: "downloads/magazineNew",
      component: _1f3b4ebf,
      name: "index-downloads-magazineNew"
    }, {
      path: "downloads/report",
      component: _649dc031,
      name: "index-downloads-report"
    }]
  }, {
    path: "/:prefix",
    component: _0557bd86,
    name: "prefix",
    children: [{
      path: "new",
      component: _ca14fd9a,
      name: "prefix-new"
    }, {
      path: "profile/:id?",
      component: _5df975ae,
      name: "prefix-profile-id"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
