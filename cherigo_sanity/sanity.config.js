import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {dashboardTool} from '@sanity/dashboard'
import {schemaTypes} from './schemaTypes'
import {orderStatsWidget} from './widgets/orderStatsWidget.jsx'

export default defineConfig({
  name: 'default',
  title: 'CheriGO',

  projectId: 'h21935xi',
  dataset: 'production',

  plugins: [deskTool(), visionTool(), dashboardTool({
    widgets: [orderStatsWidget]
  })],

  schema: {
    types: schemaTypes
  },
})