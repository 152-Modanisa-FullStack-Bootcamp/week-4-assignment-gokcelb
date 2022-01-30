const {Given, When, Then} = require("cucumber")
const openUrl = require("../support/action/openUrl")
const checkUrl = require("../support/check/checkUrl")
const assert = require("assert")

Given(/^User goes to Video Site Project's HomePage$/, async function () {
    await openUrl.call(this, "/")
});

When(/^Page is loaded$/, async function () {
    await this.page.waitForSelector("#home")
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
    await this.page.waitForSelector("#home")
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
});

Then(/^User should see watch url correctly$/, async function () {
    await this.page.waitForSelector("#watchid")
    const desiredVideoID = await this.page.$eval(
        "#watchid",
        id => id.textContent
    )
   await checkUrl.call(this, false, `http://localhost:8080/watch?id=${desiredVideoID}`)
});

When(/^User hovers "([^"]*)" video$/, async function (videoName) {
    const videoCards = await this.page.$$("#card-video")
    let desiredVideo
    for (let videoCard of videoCards) {
        const videoTitle = await videoCard.$("#title")
        const titleJSHandle = await videoTitle.getProperty("innerHTML")
        const titleText = await titleJSHandle.jsonValue()
        if (titleText === videoName) {
            desiredVideo = videoCard
        }
    }
    this.imageElement = await desiredVideo.$("img")
    const srcJSHandleBefore = await this.imageElement.getProperty("src")
    this.srcAttrBefore = await srcJSHandleBefore.jsonValue()
    console.log(this.srcAttrBefore)
    await this.imageElement.hover()
});

Then(/^User should see hovered image$/, async function () {
    const srcJSHandleAfter = await this.imageElement.getProperty("src")
    const srcAttrAfter = await srcJSHandleAfter.jsonValue()
    console.log(srcAttrAfter)
    assert.notEqual(srcAttrAfter, this.srcAttrBefore)
});