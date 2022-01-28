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
    await this.page.waitForSelector("#watchid")
    this.desiredVideoID = await this.page.$eval(
        "#watchid",
        id => id.textContent
    )
});

Then(/^User should see watch url correctly$/, async function () {
   await checkUrl.call(this, false, `http://localhost:8080/watch?id=${this.desiredVideoID}`)
});

When(/^User hovers "([^"]*)" video$/, async function (videoName) {
    const videoCards = await this.page.$$("#card-video")
    const desiredVideo = videoCards.find(
        async (videoCard) => {
            const videoTitle = await videoCard.$("#title")
            const titleJSHandle = await videoTitle.getProperty("innerHTML")
            const titleText = await titleJSHandle.jsonValue()
            if (titleText === videoName) {
                return videoCard
            }
        }
    )
    const imageElement = await desiredVideo.$("img")

    const srcJSHandleBefore = await imageElement.getProperty("src")
    this.srcAttrBefore = await srcJSHandleBefore.jsonValue()

    await desiredVideo.hover()

    const srcJSHandleAfter = await imageElement.getProperty("src")
    this.srcAttrAfter = await srcJSHandleAfter.jsonValue()
});

Then(/^User should see hovered image$/, function () {
    assert.notEqual(this.srcAttrAfter, this.srcAttrBefore)
});