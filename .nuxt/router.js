import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5e949326 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
const _6539e0f7 = () => interopDefault(import('..\\pages\\index\\backup\\download.vue' /* webpackChunkName: "pages_index_backup_download" */))
const _5a704bb0 = () => interopDefault(import('..\\pages\\index\\backup\\upload.vue' /* webpackChunkName: "pages_index_backup_upload" */))
const _3896c96c = () => interopDefault(import('..\\pages\\index\\downloads\\agreement.vue' /* webpackChunkName: "pages_index_downloads_agreement" */))
const _65d43922 = () => interopDefault(import('..\\pages\\index\\downloads\\magazine.vue' /* webpackChunkName: "pages_index_downloads_magazine" */))
const _59df6919 = () => interopDefault(import('..\\pages\\index\\downloads\\magazineMini.vue' /* webpackChunkName: "pages_index_downloads_magazineMini" */))
const _736e994e = () => interopDefault(import('..\\pages\\index\\downloads\\magazineNew.vue' /* webpackChunkName: "pages_index_downloads_magazineNew" */))
const _5c7bd842 = () => interopDefault(import('..\\pages\\index\\downloads\\report.vue' /* webpackChunkName: "pages_index_downloads_report" */))
const _59fdc10c = () => interopDefault(import('..\\pages\\_prefix.vue' /* webpackChunkName: "pages__prefix" */))
const _73b26ac4 = () => interopDefault(import('..\\pages\\_prefix\\new.vue' /* webpackChunkName: "pages__prefix_new" */))
const _63688186 = () => interopDefault(import('..\\pages\\_prefix\\profile\\_id.vue' /* webpackChunkName: "pages__prefix_profile__id" */))

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
    component: _5e949326,
    name: "index",
    children: [{
      path: "backup/download",
      component: _6539e0f7,
      name: "index-backup-download"
    }, {
      path: "backup/upload",
      component: _5a704bb0,
      name: "index-backup-upload"
    }, {
      path: "downloads/agreement",
      component: _3896c96c,
      name: "index-downloads-agreement"
    }, {
      path: "downloads/magazine",
      component: _65d43922,
      name: "index-downloads-magazine"
    }, {
      path: "downloads/magazineMini",
      component: _59df6919,
      name: "index-downloads-magazineMini"
    }, {
      path: "downloads/magazineNew",
      component: _736e994e,
      name: "index-downloads-magazineNew"
    }, {
      path: "downloads/report",
      component: _5c7bd842,
      name: "index-downloads-report"
    }]
  }, {
    path: "/:prefix",
    component: _59fdc10c,
    name: "prefix",
    children: [{
      path: "new",
      component: _73b26ac4,
      name: "prefix-new"
    }, {
      path: "profile/:id?",
      component: _63688186,
      name: "prefix-profile-id"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
