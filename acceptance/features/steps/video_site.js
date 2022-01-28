const {Given, When, Then} = require("cucumber")
const openUrl = require("../support/action/openUrl")
const checkUrl = require("../support/check/checkUrl")
const assert = require("assert")

Given(/^User goes to Video Site Project's HomePage$/, async function () {
    await openUrl.call(this, "/")
});

When(/^Page is loaded$/, async function () {
    await this.page.waitForTimeout(5000)
});

Then(/^User can see some video titles such as$/, async function (videoTitles) {
    const titles = await this.page.$$eval(
        "#title",
        titleElements => titleElements.map(titleElement => titleElement.textContent))

    for (let [videoTitle] of videoTitles.rawTable) {
        assert.ok(titles.includes(videoTitle))
    }
});

Given(/^User is on Video Site Project's HomePage$/, async function () {
    await openUrl.call(this, "/")
    await this.page.waitForTimeout(5000)
});

When(/^User clicks "([^"]*)" video$/, async function (videoName) {
    await this.page.$$eval(
        "#card-video",
        async (videos, name) => {
            const desiredVideo = videos.find(video => video.querySelector("#title").textContent === name)
            const desiredImage = desiredVideo.querySelector("img")
            await desiredImage.click()
        },
        videoName
    )
    await this.page.waitForNavigation({timeout: 5000})
    this.desiredVideoID = await this.page.$eval(
        "#watchid",
        id => id.textContent
    )
});

Then(/^User should see watch url correctly$/, async function () {
   await checkUrl.call(this, false, `?id=${this.desiredVideoID}`)
});