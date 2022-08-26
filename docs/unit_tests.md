## Writing high quality unit tests

#### Unit test

Tests 1 module in isolation. The goal is to test each function or method within a module or class. No calls or assertions should be made to any unit outside the unit under test. With the concept of a “unit” being relatively flexible, sometimes a set of tightly coupled services can be treated as a single unit for the sake of the test.

### Dependencies

A great unit test has no external dependencies. that includes:

- Database or external data store

- Collaborating services

- Collaborating units out of the scope of the test

- Non-deterministic attributes, such as system clock

- Order of execution

In practice these rules can be broken, the decision should be made carefully relative to each suite. The correct approach to dealing with these dependencies is to mock them out.

Some downsides of not being strict about dependency mocking are primarily the following:

- Slower speed - the more dependencies you have, the slower your tests run

- Hard setup - for example, having no DB makes a unit test really easy to run

- Determinism - anything you don’t directly control from your test can behave unpredictably

### Goals of unit testing

#### Asserting correctness

The most obvious function of unit tests are that they assert correctness at a high-level of granularity. A general rule-of-thumb is: The more business-critical the unit, the more numerous and granular tests should be.

#### Refining design through tests

By writing tests, you automatically force a number of attributes on your code:

- Bug proof - you can’t write bugs that you can’t catch when the tests are written first

- Easy to observe - your code has the required hooks to expose its state for verification and debugging

- Clear API - THIS IS A HUGE BENEFIT. They force you to consider what a useful interface is for the consumers of your code. Your test is a sandbox for refining the contract between you and your consumer. How is the unit instantiated? What return values are provided? When are exceptions thrown? How is state encapsulated? How do units integrate with others? All these decisions are explored and decided-upon at the time you write tests.

#### Executable Documentation

Your tests are executable documentation of the implementation rules of your system. Treat them that way – they’re documentation to teach all those who read them why your system is implemented the way it is and what it’s designed to do. Long after wiki content (if any) is completely irrelevant and serving only to confuse the unwary, your passing test suite will provide an accurate understanding to all engineers about the actual business rules your code implements. This is a much, much better way to document app implementation than a wiki. If you cannot read your unit tests and see business logic expressed in them, your unit tests may be testing at too low a level. Ideally, your unit tests will read like a spec.

### What should your tests cover?

#### Inputs

When looking at a public function/method, consider all inputs it may have.

- 0: A container with no elements

- 1: A container with a single element

- null: Null reference

- some: A container with multiple elements

- many: A container with an unexpectedly large number of elements (10 million).

- oops: Incorrect input

#### Results

Are the results basically correct? This is as simple and obvious as it sounds. Check the happy path.

#### Boundaries / Range

Define what your solution domain is – across what domain does your module / function work? When does it not function? Ensure that those boundaries are both documented and tested. Think about such natural constraints as 0, MIN_INT, MAX_INT, integer overflow, etc.

#### Inverse Relationships

If an algorithm can be reversed to validate it, try that. The reason that this is valuable is that it doesn’t just repeat the same code in the test as in the production code, which may just end up asserting that n === n. By inverting the logic, you often will either spot or yield errors. Example:

```
const square = (n) => n*n
const squareTest = (n) => (square(n) / n) === n
```

#### Cross-Checked Results

Let’s say you have a 2nd mechanism to determine a result, and your new implementation is a performance optimization of the former. Make use of the former to assert functional equivalence. Do consider that you’re not reusing an identical algorithm from production code within your test to assert the correctness of the algorithm! This is easy to accidentally do.

#### Errors (forced)

Section on Exceptions below

#### Performance

Often performance of a small unit may not be a significant consideration. However, determine whether it is or not explicitly. If the code iterates over a huge list, especially containing nested loops, do determine that:

- Its performance characteristics (on a unit basis) meet business needs

- If it can be overloaded, it has the ability to timeout to exit processing prematurely. Allow your test to set a trivial time threshold and verify that timeouts work

- It scales predictably and acceptably given input size. For example, a sorting algorithm that works well for small input sets and has a Big-O complexity of O(n^2) will be a problem. Do consider Big-O complexity where it matters.

Unit tests will not be the primary means for performance testing mission critical components – that will normally also happen in a system-level performance test. However, if your architecture depends on the implementation of a unit that simply does not scale correctly, it will be much faster for you as a developer to spot that problem early, than wait for a built system to fail a system-level performance test.

#### Conformance

Do the inputs and output provided by the function conform to the expectations of the class/module/function? (Example: are you returning a list when you should be? Are you returning the right object type? Are you accepting the right type? Etc.)

#### Ordering

Is the set of values ordered or unordered as appropriate? If the output of this function is expected to be ordered, ensure that it is.

#### Reference

Does the code reference anything external that isn't under direct control of the code itself? All dependencies must be under the controllable by the test. Any time that’s not the case, that dependency must be mocked.

#### Existence

Does the value exist (e.g. is not null, non-zero, present in a set)? Null-inputs should be tested for and handled gracefully. Empty containers should be handled gracefully.

#### Cardinality

Are there exactly enough values? If code requires a non-empty set, what’s the behavior of an empty set or an ordinal? Remember cardinality tests described in “0, 1, none, some, many, (and oops, but not relevant here)”

#### Time (absolute and relative)

Is everything happening in order? At the right time? In time? If there is any time component to code, that needs to be exercised, especially for code involving any asynchronous behavior. What happens if input is:

- Early

- On time

- Beyond a time threshold

All blocking calls should have defined semantics for what happens if timeouts occur. Those should be tested, by forcing a 0-duration timeout and observing / validating the appropriate error handling.

### Exceptions

There are two things to consider and test with respect to exceptions:

- Exceptions that your code needs to catch

- Exceptions that your code throws

#### Exceptions That Your Code Needs To Catch

In compiled languages with declared exceptions (Java, for example) the compiler makes it easier to determine that you’ve handled exceptions when they can be thrown. However, even in that case, unchecked exceptions may be thrown as well, and won’t be caught at compile-time. So, look closely at an API you use to determine if exceptions can be thrown that your code needs to handle. For any of these, you should have at least one test validating exception handling.

#### Exceptions That Your Code Throws

If your code throws an exception, a test should exist to exercise it. If multiple types of exceptions can be thrown, likewise, tests should exercise each type. Using discrete exception subtypes appropriately (ie: not just throwing Exception everywhere) should be done to differentiate exceptions, both for generally good practice as well as ease of testing. Different exception behavior is differentiated by exception type and can be verified as such.
