function MyDecorator<T>(cls: T, ...args: any[]) {
  return cls;
}

@MyDecorator
export class Foo {
}
