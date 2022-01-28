import {shallowMount} from "@vue/test-utils"
import CardVideo from "../../src/components/CardVideo"

describe("CardVideo.vue", () => {
    let wrapper

    beforeEach(() => {
        const $router = {
            push: jest.fn()
        }

        wrapper = shallowMount(CardVideo, {
            propsData: {
                video: {}
            },
            mocks: {
                $router
            }
        })
    })
    test("Rendered correctly check", () => {
        const card = wrapper.find("#card-video")
        const image = wrapper.find("img")
        const title = wrapper.find("#title")

        expect(wrapper.exists()).toBeTruthy()
        expect(card.exists()).toBeTruthy()
        expect(image.exists()).toBeTruthy()
        expect(title.exists()).toBeTruthy()
    })

    test("Image click event works correctly", async () => {
        const image = wrapper.find("img")
        await image.trigger("click")

        expect(wrapper.vm.$router.push).toBeCalled()
    })
})