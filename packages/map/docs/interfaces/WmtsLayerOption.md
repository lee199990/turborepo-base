[@jmrepo/gismap](../README.md) / [Exports](../modules.md) / WmtsLayerOption

# Interface: WmtsLayerOption

wmts图层配置选项

## Hierarchy

-   [`LayerOptions`](LayerOptions.md)

    ↳ **`WmtsLayerOption`**

## Table of contents

### Properties

-   [bounds](WmtsLayerOption.md#bounds)
-   [format](WmtsLayerOption.md#format)
-   [groupId](WmtsLayerOption.md#groupid)
-   [id](WmtsLayerOption.md#id)
-   [layer](WmtsLayerOption.md#layer)
-   [maxZoom](WmtsLayerOption.md#maxzoom)
-   [minZoom](WmtsLayerOption.md#minzoom)
-   [requestStyle](WmtsLayerOption.md#requeststyle)
-   [requestVersion](WmtsLayerOption.md#requestversion)
-   [subdomains](WmtsLayerOption.md#subdomains)
-   [url](WmtsLayerOption.md#url)
-   [vectorType](WmtsLayerOption.md#vectortype)
-   [zIndex](WmtsLayerOption.md#zindex)

## Properties

### bounds

• `Optional` **bounds**: [`number`, `number`, `number`, `number`]

#### Inherited from

[LayerOptions](LayerOptions.md).[bounds](LayerOptions.md#bounds)

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:25

---

### format

• **format**: [`LayerFormat`](../enums/LayerFormat.md)

#### Inherited from

[LayerOptions](LayerOptions.md).[format](LayerOptions.md#format)

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:31

---

### groupId

• `Optional` **groupId**: `string`

#### Inherited from

[LayerOptions](LayerOptions.md).[groupId](LayerOptions.md#groupid)

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:19

---

### id

• **id**: `string`

#### Inherited from

[LayerOptions](LayerOptions.md).[id](LayerOptions.md#id)

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:15

---

### layer

• **layer**: `string`

#### Overrides

[LayerOptions](LayerOptions.md).[layer](LayerOptions.md#layer)

#### Defined in

lib/controllers/layer-controller/services/wmts.ts:77

---

### maxZoom

• `Optional` **maxZoom**: `number`

#### Inherited from

[LayerOptions](LayerOptions.md).[maxZoom](LayerOptions.md#maxzoom)

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:29

---

### minZoom

• `Optional` **minZoom**: `number`

#### Inherited from

[LayerOptions](LayerOptions.md).[minZoom](LayerOptions.md#minzoom)

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:27

---

### requestStyle

• `Optional` **requestStyle**: `string`

#### Defined in

lib/controllers/layer-controller/services/wmts.ts:78

---

### requestVersion

• `Optional` **requestVersion**: `string`

#### Defined in

lib/controllers/layer-controller/services/wmts.ts:79

---

### subdomains

• `Optional` **subdomains**: `string`[]

#### Inherited from

[LayerOptions](LayerOptions.md).[subdomains](LayerOptions.md#subdomains)

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:21

---

### url

• **url**: `string`

#### Inherited from

[LayerOptions](LayerOptions.md).[url](LayerOptions.md#url)

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:13

---

### vectorType

• `Optional` **vectorType**: [`VectorType`](../enums/VectorType.md)

#### Inherited from

[LayerOptions](LayerOptions.md).[vectorType](LayerOptions.md#vectortype)

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:33

---

### zIndex

• `Optional` **zIndex**: `number`

#### Inherited from

[LayerOptions](LayerOptions.md).[zIndex](LayerOptions.md#zindex)

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:23
