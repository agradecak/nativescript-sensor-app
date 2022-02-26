import { Application } from '@nativescript/core'

import { AkcelerometarViewModel } from './akcelerometar-view-model'

export function onNavigatingTo(args) {
  const page = args.object
  page.bindingContext = new AkcelerometarViewModel()
}

export function onDrawerButtonTap(args) {
  const sideDrawer = Application.getRootView()
  sideDrawer.showDrawer()
}