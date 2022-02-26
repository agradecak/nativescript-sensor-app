import { Application } from '@nativescript/core'

import { SenzoriViewModel } from './senzori-view-model'

export function onNavigatingTo(args) {
  const page = args.object
  page.bindingContext = new SenzoriViewModel()
}

export function onDrawerButtonTap(args) {
  const sideDrawer = Application.getRootView()
  sideDrawer.showDrawer()
}

