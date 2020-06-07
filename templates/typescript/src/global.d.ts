type simpleObject = { [key: string]: string };

type nestedObject = { [key: string]: string | simpleObject };

declare interface Window {
  __R_DATA: {
    initialData: nestedObject;
  };
}
