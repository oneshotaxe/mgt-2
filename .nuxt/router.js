import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7b20e20a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
const _dca01bf6 = () => interopDefault(import('..\\pages\\index\\backup\\download.vue' /* webpackChunkName: "pages_index_backup_download" */))
const _68996f84 = () => interopDefault(import('..\\pages\\index\\backup\\upload.vue' /* webpackChunkName: "pages_index_backup_upload" */))
const _2a61a37a = () => interopDefault(import('..\\pages\\index\\downloads\\agreement.vue' /* webpackChunkName: "pages_index_downloads_agreement" */))
const _655ee554 = () => interopDefault(import('..\\pages\\index\\downloads\\magazine.vue' /* webpackChunkName: "pages_index_downloads_magazine" */))
const _0216a76a = () => interopDefault(import('..\\pages\\index\\downloads\\magazineMini.vue' /* webpackChunkName: "pages_index_downloads_magazineMini" */))
const _1deb27dc = () => interopDefault(import('..\\pages\\index\\downloads\\magazineNew.vue' /* webpackChunkName: "pages_index_downloads_magazineNew" */))
const _82702e18 = () => interopDefault(import('..\\pages\\index\\downloads\\report.vue' /* webpackChunkName: "pages_index_downloads_report" */))
const _76b8a3cc = () => interopDefault(import('..\\pages\\_prefix.vue' /* webpackChunkName: "pages__prefix" */))
const _6c9c7676 = () => interopDefault(import('..\\pages\\_prefix\\new.vue' /* webpackChunkName: "pages__prefix_new" */))
const _3f8ebbcb = () => interopDefault(import('..\\pages\\_prefix\\profile\\_id.vue' /* webpackChunkName: "pages__prefix_profile__id" */))

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
    component: _7b20e20a,
    name: "index",
    children: [{
      path: "backup/download",
      component: _dca01bf6,
      name: "index-backup-download"
    }, {
      path: "backup/upload",
      component: _68996f84,
      name: "index-backup-upload"
    }, {
      path: "downloads/agreement",
      component: _2a61a37a,
      name: "index-downloads-agreement"
    }, {
      path: "downloads/magazine",
      component: _655ee554,
      name: "index-downloads-magazine"
    }, {
      path: "downloads/magazineMini",
      component: _0216a76a,
      name: "index-downloads-magazineMini"
    }, {
      path: "downloads/magazineNew",
      component: _1deb27dc,
      name: "index-downloads-magazineNew"
    }, {
      path: "downloads/report",
      component: _82702e18,
      name: "index-downloads-report"
    }]
  }, {
    path: "/:prefix",
    component: _76b8a3cc,
    name: "prefix",
    children: [{
      path: "new",
      component: _6c9c7676,
      name: "prefix-new"
    }, {
      path: "profile/:id?",
      component: _3f8ebbcb,
      name: "prefix-profile-id"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
