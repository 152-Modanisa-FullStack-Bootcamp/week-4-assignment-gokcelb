const {Given, When, Then} = require("cucumber")
const openUrl = require("../support/action/openUrl")
const assert = require("assert")

Given(/^User goes to Video Site Project's HomePage$/, async function () {
    await openUrl.call(this, "/")
});

When(/^Page is loaded$/, async function () {
    await this.page.waitForTimeout(5000)
});

Then(/^User can see some video titles such as$/, async function (videoTitles) {
    const titles = await this.page.$$eval("#title", els => els.map(el => el.textContent))
    for (let [videoTitle] of videoTitles.rawTable) {
        assert.ok(titles.includes(videoTitle))
    }
});