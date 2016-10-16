import {       Element as ReactElement,
         CreateElement as ReactCreateElement } from 'react/dom'


const dashDirectives = {
    pullTypeTo: "",
    pullChildsTo: "this",
    transformations: {
        type: [["*-*", (node, propName, [type, value]) => { node[type] = value; return type }]],
        props: [
            ["*--*", (node, matches, propName) => {}],
        ]},
    selectors: [// <any pull-type-to="type"/>
        ["has--*",     (node, matches, propName) => {}],// boolean, value
        ["has-not--*", (node, matches, propName) => {}],// boolean, value
        ["has-path",   (node) => {}],// path has-path="grid / button [text=Add]"
        ["has-prev",   (node) => {}],// path, boolean
        ["has-next",   (node) => {}],// path, boolean
        ["has-parent", (node) => {}],// path, boolean
        ["has-child",  (node) => {}],// path, boolean

        ["select-first", (node) => {}],// boolean default
        ["select-all", (node) => {}],  // boolean
        ["merge-this", (node) => {}],// boolean default
        ["replace-this", (node) => {}],// boolean
        ["merge-*", (node) => {}],// value default
        ["replace-*", (node) => {}],// value

        ["is-first-child", (node) => {}], // boolean
        ["is-last-child", (node) => {}], // boolean
        ["is-only-child", (node) => {}], // boolean
        [/^is-([0-9]+n?|even|odd)-child$/, (node) => {}], // boolean
        ["is-empty", (node) => {}], // boolean
        ["is-root", (node) => {}], // boolean
        ["is-node", (node) => {}], // boolean, path
        ["is-prop", (node) => {}], // boolean, path
        ["is-any", (node) => {}], // boolean default
        ["extract-path", (node) => {}], // boolean
    ],
}

/**
 * @example
 *
 *     const layers = createLayers( React => [
 *          layout: () =>
 *              <panel layout="border"></panel>,
 *          stateManagement: () =>
 *              <panel><store/></panel>,
 *     ])
 *     createReactElement( cascadeLayers( layers, this ))
 *
 * @return array of functions — layer elements creators
 */
export function createLayers( createLayersByInjector ){
    return createLayer( createLayersByInjector )()
}

/**
 * Accept function in format: ( React ) => <custom-layer-markup />
 * @return {function} layer — layer elements creator */
export function createLayer( createLayerByInjector ){
    const jsxInjector = {createElement: createLayerElement}
    return () => createLayerByInjector( jsxInjector )
}

/** This is [jsx pragma function](https://babeljs.io/docs/plugins/transform-react-jsx/)
 * @return {object} layerElement plain object */
export function createLayerElement( type, props, ...childs ){
    let layerElement = {type, props, childs}
    return applyDashDirectives( layerElement )
}

/** @return {ReactElement} */
export function createReactElement( layerEl ){
    return ReactCreateElement( layerEl.type, layerEl.props, ...layerEl.childs )
}

/** @return {object} root layer element */
export function cascadeLayers( layers, reactComponent ){
    return layers.map( layer => layer.apply( reactComponent ))
                 .map( applyDashDirectives )
                 .reduce( cascadeLayerElements, {})
}

    function cascadeLayerElements( rootElement, layerElement ){
        //TODO:
    }

function applyDashDirectives( node ){
    const pullType =
        dashDirectives.transformations.type.reduce(  (node, [pattern, transformer]) => {
            //TODO:
        }, node ) || dashDirectives.pullTypeTo
    if( pullType ){
        node[ pullType ] = node.type
    }

    dashDirectives.transformations.props.reduce( (node, [pattern, transformer]) => {
        //TODO:
    }, node )
    return node
}

    function preparePattern(){
        //TODO:
    }