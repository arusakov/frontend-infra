
export function main() {
  console.log('Hello, world!');
}

if (process.env.NODE_ENV !== 'test') {
  main();
}
