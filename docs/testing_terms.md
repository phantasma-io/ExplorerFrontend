### Some general terms used in software testing.

#### The goal is to define a consistent vocabulary for us to discuss testing.

<b>Unit test:</b> Tests 1 module in isolation. The goal is to test each function or method within a module or class. No calls or assertions should be made to any unit outside the unit under test. With the concept of a “unit” being relatively flexible, sometimes a set of tightly coupled services can be treated as a single unit for the sake of the test.

<b>Narrow integration tests:</b> Tests that determine that one particular service behaves correctly with another service. The other side is mocked out and the only rule is that the service under test must obey its contract as specified.

<b>Broad integration tests:</b> Tests that determine that multiple services work correctly as actually implemented and deployed, not just with respect to a contract. Mocks are not used.
