import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
  json: () => Promise.resolve([]),
}))

describe('App', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('My DailyPlanner')
  })
})
