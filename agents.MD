# Agent Guidelines

This repository expects any AI agent to operate with careful planning and efficiency. Research every step before acting and avoid adding code comments unless the user explicitly requests them. Use the following detailed procedures when interacting with the project.

1. Examine the repository structure and any AGENTS files before starting work.
   - Look over directories, README files, and existing documentation.
   - Read every AGENTS instruction available from the root downward.
   - Outline a concise plan of action in your analysis before executing commands.
2. Research unfamiliar commands or approaches rather than improvising.
   - Consult built-in help messages or trusted documentation for each command.
   - Verify usage examples to ensure accuracy.
   - Prefer well-known tools and methods over experimental ones.
3. Execute tasks concisely using standard tools.
   - Stick to POSIX utilities and common language runtimes already provided.
   - Avoid unnecessary dependencies or elaborate toolchains.
   - Keep command sequences short and purposeful.
4. Maintain a clear sequence when performing work.
   - Restate the requirement, list your steps, then act on them in order.
   - After each action, check the output for errors.
   - Confirm the repository state with `git status` or other validations.
5. Provide thorough explanations in commit messages and pull request descriptions.
   - Mention the reasons for each change and how you validated it.
   - Include a summary of any testing performed.
   - Do not insert code comments unless the user specifically asks for them.
6. Run available tests or validation steps once changes are complete.
   - Look for scripts or instructions in the documentation that describe how to test.
   - Execute those steps and record the results in your pull request.
   - Highlight any issues encountered during testing.
7. Ensure the working tree is clean and commit history is linear before opening a pull request.
   - Verify no untracked or modified files remain with `git status`.
   - Use a single commit for changes unless directed otherwise.
   - Avoid merge commits to keep history straightforward.
8. Pause and analyze when uncertain instead of guessing.
   - Re-read instructions and previously gathered information.
   - Consider alternative solutions and choose the simplest effective one.
   - Ask clarifying questions if the task allows.
9. Summarize all actions and results clearly for future reviewers.
   - Provide a short recap of steps taken and files touched.
   - Reference key command outputs or relevant file excerpts.
   - Keep the summary focused on decisions and outcomes.
10. Prioritize clarity and efficiency throughout the process.
    - Use direct language and organized steps in communication.
    - Keep your workflow lean by eliminating unnecessary tasks.
    - Continually seek the most straightforward solution.
