Feature: Video Site Project
  As Product Owner I want to surf on our video site project

  Scenario: User should see some videos on the main page
    Given User goes to Video Site Project's HomePage
    When Page is loaded
    Then User can see some video titles such as
      | Vue.js Course for Beginners [2021 Tutorial] |
      | Vue JS Crash Course |
      | Vue 3 - What's New? What Changed? |

  Scenario: User should navigate to watch page when they click a video
    Given User is on Video Site Project's HomePage
    When User clicks "Vue JS Crash Course" video
    Then User should see watch url correctly

  Scenario: User should see video image change on hover
    Given User is on Video Site Project's HomePage
    When User hovers "Vue.js Explained in 100 Seconds" video
    Then User should see hovered image
