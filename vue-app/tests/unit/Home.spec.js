import {mount} from "@vue/test-utils"
import Home from "../../src/views/Home"
import CardVideo from "../../src/components/CardVideo"

describe("Home.vue", () => {
    test("Rendered correctly check", () => {
        const getters = {
            getVideos: [
                {title: "title1"},
                {title: "title2"},
            ]
        }
        const $store = {
            getters,
            dispatch: jest.fn(),
        }

        const wrapper = mount(Home, {
            mocks: {
                $store,
            }
        })
        expect(wrapper.exists()).toBeTruthy()

        const cardVideoComponents = wrapper.findAllComponents(CardVideo)
        expect(cardVideoComponents.length).toBe(2)
    })
})