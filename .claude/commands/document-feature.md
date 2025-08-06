# Documentation Creation Command

Generate comprehensive technical documentation for developers and user-friendly guides for end users. Feature to document is specified in $ARGUMENTS.

## Documentation Process

### Phase 1: Analysis & Preparation
1. **Analyze codebase** - Review relevant code files, components, and dependencies
2. **Study existing patterns** - Examine current documentation structure and formatting
3. **Identify stakeholders** - Determine target audiences and use cases
4. **Gather context** - Find related features and integration points

### Phase 2: Content Creation
5. **Create developer documentation** at `docs/dev/<feature-name>-implementation.md`
   - Follow project's existing documentation patterns
   - Focus on implementation details that benefit developers during maintenance and enhancement
   - Include code examples, architecture decisions, and troubleshooting guides

6. **Create user documentation** at `docs/user/how-to-<feature-name>.md`
   - Write clear, step-by-step instructions for end users
   - Take screenshot is possible otherwise include placeholder sections for screenshots and visual guides
   - Focus on practical usage scenarios and common workflows

### Phase 3: Quality & Integration
7. **Add cross-references** between developer and user documentation
8. **Validate completeness** - Ensure all key aspects are covered
9. **Review formatting** - Confirm consistent style and structure

## Content Guidelines

### Developer Documentation Template
```markdown
# <Feature Name> Implementation

**Created:** YYYY-MM-DD  
**Last Updated:** YYYY-MM-DD  
**Version:** X.X.X

## Overview
Brief description and purpose

## Architecture
- Component structure
- Data flow
- Dependencies

## Implementation Details
- Key functions/classes
- Configuration options
- Integration points

## Code Examples
```language
// Practical usage examples
```

## Testing
- Test coverage
- Mock requirements
- Test scenarios

## Troubleshooting
Common issues and solutions

## Related Documentation
- [User Guide](../user/how-to-<feature-name>.md)
- [API Reference](../api/<related-apis>.md)
```

### User Documentation Template
```markdown
# How to Use <Feature Name>

**Last Updated:** YYYY-MM-DD

## What is <Feature Name>?
Simple explanation of the feature's purpose

## Getting Started
Step-by-step initial setup

## Using the Feature
### Basic Usage
1. Step one
2. Step two
   ![Screenshot placeholder: Action description]
3. Step three

### Advanced Features
- Advanced option 1
- Advanced option 2

## Tips & Best Practices
Helpful usage tips

## Troubleshooting
Common user issues and solutions

## Need Help?
- [Developer Documentation](../dev/<feature-name>-implementation.md)
- Support resources
```

## Quality Standards
- **Accuracy:** All code examples must be tested and functional
- **Clarity:** Use simple language and clear explanations
- **Completeness:** Cover all major use cases and edge cases
- **Consistency:** Follow established documentation patterns
- **Maintenance:** Include update procedures and version tracking