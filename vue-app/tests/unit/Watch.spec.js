import {shallowMount} from "@vue/test-utils"
import Watch from "../../src/views/Watch"

describe("Watch.vue", () => {
    test("Rendered correctly check", () => {
        const $route = {
            query: {
                id: 7
            }
        }

        const wrapper = shallowMount(Watch, {
            mocks: {
                $route
            }
        })
        const idElement = wrapper.find("#watchid")

        expect(wrapper.exists()).toBeTruthy()
        expect(idElement.exists()).toBeTruthy()
        expect(idElement.text()).toBe("7")
    })
})