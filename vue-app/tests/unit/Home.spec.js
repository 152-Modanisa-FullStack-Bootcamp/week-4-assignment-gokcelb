import {mount} from "@vue/test-utils"
import Home from "../../src/views/Home"
import CardVideo from "../../src/components/CardVideo"

describe("Home.vue", () => {
    let wrapper

    beforeEach(() => {
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
        wrapper = mount(Home, {
            mocks: {
                $store,
            }
        })
    })

    test("Rendered correctly check", () => {
        const cardVideoComponents = wrapper.findAllComponents(CardVideo)

        expect(wrapper.exists()).toBeTruthy()
        expect(cardVideoComponents.length).toBe(2)
    })

    test("Functionality check", () => {
        expect(wrapper.vm.$store.dispatch).toHaveBeenCalled()
    })
})