Cascading Component Layers for React
------------------------------------
Design pattern to slice complex component trees.


#### [Introduction at Medium](https://medium.com/@alexandershvets_97490/cascading-component-layers-for-react-b958f9cdee7e)


### Usage

```jsx
import {createLayers, composeLayers, createReactElement} from 'cascading-component-layers-react'

function render(){
     const layers = createLayers( React => [
        layout: () =>
            <panel layout="border" height="100" />,
        stateManagement: () =>
            <panel onClick={doSomething()}>
                <store/>
            </panel>,
    ])
    return createReactElement( composeLayers( layers, props ))
}
```
Will behave like:
```jsx
function render(){
    return (
        <panel layout="border" height="100" onClick={doSomething()}>
            <store/>
        </panel>
    )
}
```

### Install

Please star this repo, and I will create and publish the npm package.

### License

ISC
