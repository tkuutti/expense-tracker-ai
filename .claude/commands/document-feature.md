# Documentation creation command

Generate both technical documentation for developers and user-friendly guide for end user for a feature. Feature to document is given in $ARGUMENTS.

## Documentation process

1. Analyze relevant code files
2. Create developer documentation to docs/dev/<feature-name>-implementation.md
    - Follow projec's exsisting documentation patterns.
    - Focus on generating documentation that you think that would benefit developers most when they need to change the code.
3. Create user documentation to docs/user/how-to-<feature-name>.md
    - End user should be able to use the feature after reading this documentation.
    - Have placeholders for screenshots.
4. Add proper cross-references between the two doc types