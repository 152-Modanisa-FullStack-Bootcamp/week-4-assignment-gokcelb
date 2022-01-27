import {pactWith} from "jest-pact"
import {Matchers} from "@pact-foundation/pact"
const {like} = Matchers
import API from "../../../src/api"
import {eachLike} from "@pact-foundation/pact/src/dsl/matchers"

pactWith({ consumer: "vue-app", provider: "vue-service" }, provider => {
    let client;

    beforeEach(() => {
        client = new API(provider.mockService.baseUrl)
    })

    describe("Videos data endpoint", () => {
        test("Returns videos data", async () => {
            await provider.addInteraction({
                state: "Successfully retrieved videos data",
                uponReceiving: "A request for videos data",
                willRespondWith: {
                    status: 200,
                    body: eachLike(
                        {
                            id: like(1),
                            videoAddress: like("address"),
                            coverImage: like("img"),
                            hoverImage: like("img"),
                            ownerImage: like("img"),
                            ownerName: like("name"),
                            title: like("title"),
                            viewCount: like(100),
                            publishDateInMonth: like(4),
                            description: like("desc")
                        },
                    )
                },
                withRequest: {
                    method: "GET",
                    path: "/videos"
                },
            })

            const videos = await client.pullVideos()
            expect(videos.length).toEqual(1)
        })
    })
})