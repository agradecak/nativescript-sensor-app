import { Application } from '@nativescript/core'

import { OrijentacijaViewModel } from './orijentacija-view-model'

export function onNavigatingTo(args) {
  const page = args.object
  page.bindingContext = new OrijentacijaViewModel()
}

export function onDrawerButtonTap(args) {
  const sideDrawer = Application.getRootView()
  sideDrawer.showDrawer()
}