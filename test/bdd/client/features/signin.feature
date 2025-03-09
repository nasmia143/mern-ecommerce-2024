Feature: Login
As user, i would like to connect to my account

Scenario: Login succes
    Given I'm in sign in page
    And I enter the email "anne.test@gmail.com"
    And I enter the password "@@anne@@"
    When I click the Sign In button
    Then I'm redirected to the home page 

Scenario: Login with invatlid email
    Given I'm in sign in page
    And I enter the email "anne.testgmail.com"
    And I enter the password "@@anne@@"
    When I click the Sign In button
    Then I'm staying on the sign in page
    And I have the error message "Sign in to your account"

Scenario: Login with wrong password
    Given I'm in sign in page
    And I enter the email "anne.test@gmail.com"
    And I enter the password "@@appwrite@"
    When I click the Sign In button
    Then I'm staying on the sign in page 
    And I have the error message "Incorrect password! Please try again"

Scenario: Login with wrong password
    Given I'm in sign in page
    And I enter the email "nasmia@gmail.com"
    And I enter the password "nasmia"
    When I click the Sign In button
    Then I'm staying on the sign in page 
    And I have the error message "User doesn't exists! Please register first"