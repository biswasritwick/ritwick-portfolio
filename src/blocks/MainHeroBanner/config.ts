import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const MainHeroBanner: Block = {
  slug: 'mainHeroBannerBlock',
  fields: [
    {
      type: 'upload',
      relationTo: 'media',
      name: 'bgImage',
      label: 'Background Image',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'staticText',
      type: 'text',
      required: true,
      defaultValue: 'I am a developer and I develop',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
      defaultValue: 'About Me',
    },
    {
      name: 'buttonLink',
      type: 'text',
      required: true,
      defaultValue: '#about',
    },
  ],
  interfaceName: 'mainHeroBannerBlock',
}
