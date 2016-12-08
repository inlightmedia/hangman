declare var app: {
  environment: string;
};

interface WebpackRequire {
  (id: string): any;
  context(dir: string, useSubdirs: boolean, pattern: RegExp):any
}

// Tells Typescript that the require object has a context method
declare var require: WebpackRequire;