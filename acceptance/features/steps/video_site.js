const {Given, When, Then} = require("cucumber")
const openUrl = require("../support/action/openUrl")

Given(/^User goes to Video Site Project's HomePage$/, async function () {
    await openUrl.call(this, "/")
});

When(/^Page is loaded$/, async function () {
    await this.page.waitForTimeout(5000)
});

Then(/^User can see some video titles such as$/, async function (array) {
    const selector = "card-video"
    for (let [videoTitle] of array.rawTable) {
        const desiredVideo = await this.page.$$eval(
            selector,
            videos => videos.find(video => video.querySelector("#title") === videoTitle)
            )
        console.log(desiredVideo)
    }
});