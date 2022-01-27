import {shallowMount} from "@vue/test-utils"
import CardVideo from "../../src/components/CardVideo"

describe("CardVideo.vue", () => {
    test("Rendered correctly check", () => {
        const wrapper = shallowMount(CardVideo, {
            propsData: {
                video: {}
            }
        })
        expect(wrapper.exists()).toBeTruthy()

        const card = wrapper.find("#card-video")
        expect(card.exists()).toBeTruthy()

        const image = wrapper.find("img")
        expect(image.exists()).toBeTruthy()
    })
})