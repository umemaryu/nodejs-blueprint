Settings

- Add an eslint settings for auto formatting in vscode
  - Ctrl + Shift + P
  - Preferences: Open User Settings(JSON)
  - {"[typescript]": {"editor.codeActionsOnSave": {"source.fixAll.eslint": true}}}

Prioritized elements

- Readability
- Simplicity
- Maintanability
- Testability

Coding rules in general

-

Coding rules with .eslintrc.json

- Accept only absolute path in import
- Make space between external and internal modules
- Use ~{folderName}/ for import of internal modules
- Forbid to import internal modules with relative path
- Forbid to import internal modules with 'src/{path}' format
- Forbid to use any type
- Forbid to export default
- Add argument and result type

Adding steps

- New folder => Create path for that in ts.config referrencing to the value of 'paths'

Reference

- https://techblog.roxx.co.jp/entry/clean-architecture
- https://medium.com/backenders-club/error-handling-in-node-js-ef5cbfa59992
- https://recruit.gmo.jp/engineer/jisedai/blog/crean_architecture_server_side/
- https://qiita.com/potato4d/items/d22a14ff6fb82d63c742
- https://javascript.plainenglish.io/clean-code-with-node-js-994e9b6b7e56 (clean architecture and di{inversify})



VSCODE Extensions:
Todo Tree
