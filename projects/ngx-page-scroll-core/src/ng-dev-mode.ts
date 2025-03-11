/** @internal */
declare global {
  // Indicates whether the application is operating in development mode.
  // `ngDevMode` is a global flag set by Angular CLI.
  // https://github.com/angular/angular-cli/blob/9ceca0c4de1f351133c7c7df9e44c4b7a220ae8b/packages/angular/build/src/tools/esbuild/application-code-bundle.ts#L600
  const ngDevMode: boolean;
}

// This will be tree-shaken when built for production, as it is an empty object.
// Thus, the `ng-dev-mode.ts` file could be treated as a module for type
// augmentation (`declare global`) by the bundler.
export default {};
