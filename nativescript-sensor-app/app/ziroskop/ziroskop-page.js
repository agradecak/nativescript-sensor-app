import { Application } from '@nativescript/core'

import { ZiroskopViewModel } from './ziroskop-view-model'

export function onNavigatingTo(args) {
  const page = args.object
  page.bindingContext = new ZiroskopViewModel()
}

export function onDrawerButtonTap(args) {
  const sideDrawer = Application.getRootView()
  sideDrawer.showDrawer()
}