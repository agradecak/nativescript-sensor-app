import { Application } from '@nativescript/core'

import { SvjetlostViewModel } from './svjetlost-view-model'

export function onNavigatingTo(args) {
  const page = args.object
  page.bindingContext = new SvjetlostViewModel()
}

export function onDrawerButtonTap(args) {
  const sideDrawer = Application.getRootView()
  sideDrawer.showDrawer()
}