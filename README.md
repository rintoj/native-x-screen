# native-x-screen

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A wrapper components for screens

## Install

### Yarn

```sh
yarn add native-x-screen
```

### NPM

```sh
npm install native-x-screen
```

## Usage

```tsx
import { Screen } from 'native-x-screen'

function HomeScreen() {
  const header = (
    <View>
      <Text>HEADER</Text>
    </View>
  )
  return (
    <Screen header={header} hasForm scrollable keepKeyboard>
      ...
    </Screen>
  )
}
```

## API

| Property               | Default Value | Usage                                                 |
| ---------------------- | ------------- | ----------------------------------------------------- |
| fill?: boolean         | true          | Fill container or available space                     |
| scrollable?: boolean   | false         | Set true if the screen is scrollable                  |
| hasForm?: boolean      | false         | Set true if the screen has a form                     |
| header?: ReactNode     |               | Header component                                      |
| children?: ReactNode[] |               | Content of the screen                                 |
| keepKeyboard?: boolean | false         | If set to true, keyboard will stay up while scrolling |

## Automatic Release

Here is an example of the release type that will be done based on a commit messages:

| Commit message      | Release type          |
| ------------------- | --------------------- |
| fix: [comment]      | Patch Release         |
| feat: [comment]     | Minor Feature Release |
| perf: [comment]     | Major Feature Release |
| doc: [comment]      | No Release            |
| refactor: [comment] | No Release            |
| chore: [comment]    | No Release            |
