# Guidelines

These guidelines outline the rules for writing commit messages, managing branches, and naming conventions for CSS and JavaScript in our project.

## Commit Message Rules
1. **Lowercase Only**: All commit message words should be in lowercase.
2. **Descriptive Names**: Use clear, descriptive names that explain the purpose of the commit.
3. **No Pushes to Main Branch Before Testing**: 
    - Ensure all tests are passed before pushing any code.
    - Never push directly to the `main` branch without testing.
4. **No Force Pushes Allowed**: Force pushing (`git push --force`) is prohibited.

### Git Branch Management
- **Main Branch for Final Tested Code Only**:
  - The `main` branch is reserved for the final, fully tested code.
  - Feature branches should be used for development and merged after thorough review and testing.

### Branch Naming
When creating new Branch/tasks, follow the syntax:

```
<PART>/<TASK>
```
- **`<PART>`**: This refers to the name of the design or component.
    - Example: `hero`, `view`, `header`, etc.
- **`<TASK>`**: This specifies the task or feature being worked on.
    - Example: `searchbar`, `movie-card`, etc.

#### Examples
- `hero/searchbar`
- `view/movie-card`

---

## CSS Styling Guidelines

1. **Use Hyphens to Separate Words**: 
   - When naming CSS classes and IDs, always separate words using hyphens (`-`).
   - Example: `main-container`, `card-header`.
2. **Descriptive Names**: 
   - Use clear, descriptive names that reflect the purpose of the class or ID.
   - Example: `nav-bar`, `footer-links`.
3. **No Numbers**: 
   - Do not use numbers in CSS class or ID names.
4. **Applies to**: 
   - All `id` and `class` attributes in HTML should follow the same conventions.

---

## JavaScript Naming Conventions

1. **Camel Case Syntax**: 
   - Use camelCase for JavaScript variable and function names.
   - The first letter is lowercase, and the first letter of each subsequent word is capitalized.
   - Example: `listTasks`, `fetchData`, `getUserInfo`.
