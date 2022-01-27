Feature: Video Site Project
  As Product Owner I want to surf on our video site project

  Scenario: User should see some videos on the main page
    Given User goes to Video Site Project's HomePage
    When Page is loaded
    Then User can see some video titles such as
      | Vue.js Course for Beginners [2021 Tutorial] |
      | Vue JS Crash Course |
      | Vue 3 - What's New? What Changed? |