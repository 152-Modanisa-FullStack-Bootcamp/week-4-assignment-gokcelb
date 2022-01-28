import {shallowMount} from "@vue/test-utils"
import CardVideo from "../../src/components/CardVideo"

describe("CardVideo.vue", () => {
    let wrapper
    let image

    beforeEach(() => {
        const $router = {
            push: jest.fn()
        }

        wrapper = shallowMount(CardVideo, {
            propsData: {
                video: {
                    title: "imtitle",
                    coverImage: "imcoverimage",
                    hoverImage: "imhoverimage",
                }
            },
            mocks: {
                $router
            }
        })

        image = wrapper.find("img")
    })
    test("Rendered correctly check", () => {
        const card = wrapper.find("#card-video")
        const title = wrapper.find("#title")

        expect(wrapper.exists()).toBeTruthy()
        expect(card.exists()).toBeTruthy()
        expect(image.exists()).toBeTruthy()
        expect(title.exists()).toBeTruthy()

        expect(image.attributes().src).toBe(wrapper.vm.video.coverImage)
        expect(title.text()).toBe(wrapper.vm.video.title)
    })

    test("Image click event works correctly", async () => {
        await image.trigger("click")

        expect(wrapper.vm.$router.push).toBeCalled()
    })

    test("Image changes on hover", async () => {
        await image.trigger("mouseover")

        expect(image.attributes().src).toBe(wrapper.vm.video.hoverImage)
    })
})