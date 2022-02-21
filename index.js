/**
 * Copyright (c) myl7 2022
 * SPDX-License-Identifier: Apache-2.0
 */

import puppeteer from 'puppeteer'

export default class WosSpider {
  /**
   * @param {object} config
   * @param {boolean} config.headless
   * @param {string} config.ua
   */
  constructor({ headless, ua }) {
    this.headless = headless ?? false
    this.ua =
      ua ?? 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'
  }

  async launch() {
    this.browser = await puppeteer.launch({ headless: this.headless })
  }

  /**
   * @param {string} url
   * @returns {string}
   */
  async crawl(url) {
    const page = await browser.newPage()
    await page.setUserAgent(this.ua)
    await page.goto(url, { waitUntil: 'networkidle0' })
    const info = await page.evaluate(() => document.querySelector('#snMainArticle').textContent)
    return info
  }

  async close() {
    await this.browser.close()
  }
}
