import { Application } from '@nativescript/core'

import { MagnetViewModel } from './magnet-view-model'

export function onNavigatingTo(args) {
  const page = args.object
  page.bindingContext = new MagnetViewModel()
}

export function onDrawerButtonTap(args) {
  const sideDrawer = Application.getRootView()
  sideDrawer.showDrawer()
}

