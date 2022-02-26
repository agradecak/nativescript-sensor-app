import { Application } from '@nativescript/core'

import { SenzorViewModel } from './senzor-view-model'

export function onNavigatingTo(args) {
  const page = args.object
  page.bindingContext = new SenzorViewModel()
}

export function onDrawerButtonTap(args) {
  const sideDrawer = Application.getRootView()
  sideDrawer.showDrawer()
}

